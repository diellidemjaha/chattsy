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
    public function search(Request $request)
{
    $keyword = $request->input('search');
    
    // Perform a search query based on your user model
    $users = User::where('name', 'like', "%$keyword%")->get();

    return response()->json(['users' => $users]);
}
}
