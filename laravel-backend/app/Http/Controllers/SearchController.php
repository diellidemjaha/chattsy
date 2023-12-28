<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function FindByName(Request $request)
    {
        $keyword = $request->input('search');
        
        // Perform a search query based on your user model
        $users = User::where('name', 'like', "%$keyword%")->get();
    
        // return response()->json(['users' => 'test']);
        return response()->json(['users' => $users]);
    }
}
