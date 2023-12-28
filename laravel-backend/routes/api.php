<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FriendshipController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('conversations', ConversationController::class);
    Route::resource('messages', MessageController::class);

    Route::post('/friendships/send-request', [FriendshipController::class, 'sendRequest']);
    Route::post('/friendships/accept-request', [FriendshipController::class, 'acceptRequest']);
    Route::get('/friendships/list', [FriendshipController::class, 'getFriendList']);
    Route::get('/friendships/requests', [FriendshipController::class, 'getFriendRequests']);
    // Route::post('/friendships/accept-request', [FriendshipController::class, 'acceptRequest']);
    // Route::get('/users/not-friends', [UserController::class, 'getNotFriends']);
    // Route::get('/users/get-all-users', [UserController::class, 'index']);

    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/conversations/{conversation}/messages', [MessageController::class, 'index']);
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
    // Route::get('/conversations/{conversation}/messages', [MessageController::class, 'receive']);


});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Other protected routes...
});
