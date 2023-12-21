<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
   public function test() {
    $test = 'Hello World!';
    return response()->json(['test' => $test]);
   }
}
