<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = auth()->user()->conversations;
        return response()->json($conversations);
    }

    public function store(Request $request)
    {
        $user1_id = auth()->user()->id;
        $user2_id = $request->input('user2_id');

        // Check if a conversation already exists between the two users
        $existingConversation = Conversation::where(function ($query) use ($user1_id, $user2_id) {
            $query->where('user1_id', $user1_id)->where('user2_id', $user2_id);
        })->orWhere(function ($query) use ($user1_id, $user2_id) {
            $query->where('user1_id', $user2_id)->where('user2_id', $user1_id);
        })->first();

        if ($existingConversation) {
            return response()->json($existingConversation, 200);
        }

        // If no existing conversation, create a new one
        $conversation = Conversation::create([
            'user1_id' => $user1_id,
            'user2_id' => $user2_id,
        ]);

        return response()->json($conversation, 201);
    }

    public function show(Conversation $conversation)
    {
        return response()->json($conversation);
    }
}

    // Additional methods for updating and deleting conversations
