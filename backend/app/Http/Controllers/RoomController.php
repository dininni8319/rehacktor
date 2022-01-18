<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Twilio\Rest\Client;
// use Facade\FlareClient\Http\Client;
use Twilio\Jwt\AccessToken;
use Illuminate\Http\Request;
use Twilio\Jwt\Grants\VideoGrant;
use Illuminate\Support\Facades\Auth;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    // public function _construct(){
    //     $this->middleware("auth:api", ["except" => ["roomsByGame", 'roomsActive']]);
    // }
    
    public function create(Request $request) { //abbiamo bisogno della post per inviare delle informazioni 

        $user = Auth::user();
        Debugbar::info($user, 'test');
        // getting the logged user
        // print_r($user->id);
        // here we are checking if the user has a room with null record, will return an error json
        if (Room::where('user_id', $user->id)->where('closed_at', null)->first()) {
            return response()->json([
                'success' => false,
                'message' => 'This user has already an active room'
            ], 400); #bad request
        }
        
        $validator = Validator::make($request->all(), [  //roules of validations
            'game_id' => 'required|numeric',
            'game_name' => 'required|string',
            'max_seats_available' => 'required|numeric|between:1,10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray() //qui andiamo ad accodare tutti i messaggi di errore
            ], 400); #bad request
        }
        // if we get till here, means that everything went well, and i can do the must assigment
        $newRoom = Room::create([
            'user_id' => $user->id,
            'game_id' => $request->game_id,
            'game_name' => $request->game_name,
            'max_seats_available' => $request->max_seats_available,
        ]);
        
        //Account SID and Auth Token at twilio.com/console 
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $userSid = getenv('TWILIO_USER_SID');
        $token = getenv("TWILIO_AUTH_TOKEN");

        $twilio = new Client($sid, $token); //Here we get the Client for comunicate with Twilio
        $room_name = "rehacktor_" . $newRoom->id; // create a room name
        // here we create  a new room with uniquename and roomname
        $room = $twilio->video->v1->rooms->create(["uniqueName" => $room_name]);

        //Genero un access token per Client-Js
        //Anique identifier fro the user
        $identity = $room_name;

        //Create access token, which we will serialize and send to the client
        $token = new AccessToken(  //class to import use Twilio\Jwt\AccessToken;
            $userSid,  # TWILIO USERSID
            $sid,      # TWILIO API SID
            $token,    # TWILIO SECRET
            3600, $identity
        );
        
        // Create a Video grant, an access
        $videoGrant = new VideoGrant();
        $videoGrant->setRoom(($room_name));
        
        //Add grant token, allowing the user to connect to the room
        $token->addGrant($videoGrant);
        // dd($room->name);
        return response()->json([
                "status" => "ok", 
                "room_id" => $newRoom->id,
                "twilio" => [
                    "room_sid" => $room->sid,
                    "room_name" => $room_name,
                    "jwt" => $token->toJWT()
                
                ]
        ],201);
    }
}
