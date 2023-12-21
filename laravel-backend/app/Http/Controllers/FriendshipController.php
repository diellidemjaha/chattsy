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

        // Remove the friendship request
        $friendship->delete();

        // Create a friendship record
        Friendship::create([
            'user1_id' => $senderId,
            'user2_id' => $receiverId,
        ]);

        return response()->json(['message' => 'Friendship request accepted.']);
    }

    public function getFriendList()
    {
        $userId = auth()->user()->id;

        // Fetch user's friend list
        $friendList = User::whereHas('friends', function ($query) use ($userId) {
            $query->where('user1_id', $userId)
                ->orWhere('user2_id', $userId);
        })->get();

        return response()->json($friendList);
    }
}
