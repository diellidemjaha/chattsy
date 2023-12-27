<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use App\Events\NewMessage;
class MessageController extends Controller
{
    public function index(Conversation $conversation)
    {
        if (!$conversation) {
            // Handle the case where the conversation is not found
            return response()->json(['error' => 'Conversation not found.'], 404);
        }
        $messages = $conversation->messages;
        return response()->json($messages);
    }

    public function store(Request $request, Conversation $conversation)
    {
        $user_id = auth()->user()->id;

        $message = Message::create([
            'user_id' => $user_id,
            'conversation_id' => $request->input('conversation_id'),
            'content' => $request->input('content'),
        ]);

        broadcast(new NewMessage($message))->toOthers();

        return response()->json($message, 201);
    }

    // public function receive(Request $request)
    // {
    //     return response()->json(['message' => $request->get('message')]);
    // }

    // Additional methods for updating and deleting messages
}
