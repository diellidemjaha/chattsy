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

    // Additional methods for updating and deleting conversations
}
