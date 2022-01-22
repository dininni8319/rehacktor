<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'users', 'middleware' => 'CORS'], function ($router){
     //Public Routes
     Route::post('/register', [UserController::class, 'register'])->name('register.user');
     Route::post('/login', [UserController::class, 'login'])->name('login.user');
     Route::post('/count', [UserController::class, 'countUsers'])->name('count.user');

     //Private Route
     Route::get('/view-profile', [UserController::class, 'viewProfile'])->name('profile.user');
     Route::post('/logout', [UserController::class, 'logout'])->name('logout.user');
     
     // //Private Route
     Route::post('/room', [RoomController::class, 'create']); //creare una nuova stanza
     Route::post('/room/close', [RoomController::class, 'close']);
     Route::post('/room/join', [RoomController::class, 'join']);
     Route::get('/room/streamer/{room}', [RoomController::class, 'streamerInfo']);  //informazioni

     // //Public Route
     Route::get('/room/roomsActive', [RoomController::class, 'roomsActive']); //stream attvi
     Route::get('/room/roomsByGame', [RoomController::class, 'roomsByGame']); //stream attvi
});

