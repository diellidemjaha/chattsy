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
    $messages = Message::where('conversation_id', $conversation->id)
        ->with('user') // Assuming the user relationship is defined in the Message model
        ->get();

    return response()->json(['messages' => $messages]);
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

}
