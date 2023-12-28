<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Friendship;
use App\Models\User;

class FriendshipController extends Controller
{
    public function sendRequest(Request $request)
    {
        $senderId = auth()->user()->id;
        $receiverId = $request->input('receiver_id');

        // Check if a friendship request already exists
        $existingRequest = Friendship::where('user1_id', $senderId)
            ->where('user2_id', $receiverId)
            ->orWhere('user1_id', $receiverId)
            ->orWhere('user2_id', $senderId)
            ->first();

        if ($existingRequest) {
            return response()->json(['message' => 'Friendship request already sent.'], 422);
        }

        // Create a new friendship request
        Friendship::create([
            'user1_id' => $senderId,
            'user2_id' => $receiverId,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Friendship request sent.']);
    }

    public function acceptRequest(Request $request)
    {
        $receiverId = auth()->user()->id;
        $senderId = $request->input('sender_id');
    
        // Find the friendship request
        $friendship = Friendship::where('user1_id', $senderId)
            ->where('user2_id', $receiverId)
            ->orWhere('user1_id', $receiverId)
            ->where('user2_id', $senderId)
            ->first();
    
        if (!$friendship) {
            return response()->json(['message' => 'Friendship request not found.'], 404);
        }
    
        // Update the status to 'accepted'
        $friendship->update(['status' => 'accepted']);
    
        return response()->json(['message' => 'Friendship request accepted.']);
    }

    public function getFriendList()
{
    $userId = auth()->user()->id;

    // Fetch user's accepted friend list excluding the authenticated user
    $friendList = Friendship::where(function ($query) use ($userId) {
        $query->where('user1_id', $userId)
            ->orWhere('user2_id', $userId);
    })
    ->where('status', 'accepted')
    ->with(['sender', 'receiver'])
    ->get();

    // Transform the response to include sender and receiver names
    $formattedFriendList = $friendList->map(function ($friendship) use ($userId) {
        return [
            'friend_id' => $friendship->user1_id !== $userId ? $friendship->user1_id : $friendship->user2_id,
            'friend_name' => $friendship->user1_id !== $userId ? $friendship->sender->name : $friendship->receiver->name,
        ];
    });

    return response()->json($formattedFriendList);
}
    public function getFriendRequests()
    {
        $userId = auth()->user()->id;

        // Fetch user's friend requests with sender information
        $friendRequests = Friendship::where('user2_id', $userId)
            ->with('sender') // Eager load sender relationship
            ->get();

        // Transform the response to include sender names
        $formattedRequests = $friendRequests->map(function ($request) {
            return [
                'sender_id' => $request->user1_id,
                'sender_name' => $request->sender->name, // Accessing sender's name from the relationship
            ];
        });

        return response()->json($formattedRequests);
    }

}
