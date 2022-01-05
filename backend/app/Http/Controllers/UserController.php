<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function register(Request $request) {

        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|min:6|confirmed', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                  'success' => false,
                  'message' => $validator->messages()->toArray()
            ], 500);
        }
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $resposeMessage = "Registration Successful";

        return response()->json([
            'success' => true,
            'message' => $resposeMessage
        ],200);
    }
}
