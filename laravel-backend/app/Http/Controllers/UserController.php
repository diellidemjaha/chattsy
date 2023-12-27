<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Friendship;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }
    // public function getNotFriends()
    // {
    //     $userId = auth()->user()->id;
    
    //     // Fetch users who are not friends with the current user
    //     $notFriends = User::whereNotIn('id', function ($query) use ($userId) {
    //         $query->select('user2_id')
    //             ->from('friendships')
    //             ->where('user1_id', $userId)
    //             ->unionAll(
    //                 $query->select('user1_id')
    //                     ->from('friendships')
    //                     ->where('user2_id', $userId)
    //             );
    //     })->get();
    
    //     // Check if no not-friends were found
    //     if ($notFriends->isEmpty()) {
    //         return response()->json(['message' => 'No users found who are not friends.'], 404);
    //     }
    
    //     return response()->json($notFriends);
    // }
}
