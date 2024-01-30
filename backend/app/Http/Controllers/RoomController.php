<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Twilio\Rest\Client;
use Twilio\Jwt\AccessToken;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Twilio\Jwt\Grants\VideoGrant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Twilio\Exceptions\TwilioException;
use Illuminate\Support\Facades\Session;

class RoomController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api", ["except" => ["roomsByGame", 'roomsActive'] ] );
    }
    
    public function create(Request $request) { //abbiamo bisogno della post per inviare delle informazioni 
        
        $user = Auth::guard('api')->id();
        
        // getting the logged user
      
        // here we are checking if the user has a room with null record, will return an error json
        if (Room::where('user_id', $user)->where('closed_at', null)->first()) {
            return response()->json([
                "test" => $user,
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
            'user_id' => $user,
            'game_id' => $request->game_id,
            'game_name' => $request->game_name,
            'max_seats_available' => $request->max_seats_available,
        ]);
        
        //Account SID and Auth Token at twilio.com/console 
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $userSid = getenv('TWILIO_USER_SID');

        $twilio = new Client($userSid, $token); //Here we get the Client for comunicate with Twilio
        $room_name = "rehacktor_" . $newRoom->id; // create a room name
        // here we create  a new room with uniquename and roomname
        $room = $twilio->video->v1->rooms->create(["uniqueName" => $room_name]);

        //Genero un access token per Client-Js
        //Anique identifier fro the user
        $identity = $room_name;

        //Create access token, which we will serialize and send to the client
        $token = new AccessToken(  //class to import use Twilio\Jwt\AccessToken;
            $sid,      # TWILIO API SID
            $userSid,  # TWILIO USERSID
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
    
    public function close() {
        //recupero la stanza attiva per l'utente loggato
        $activeRoom = Room::where('user_id', Auth::guard('api')->id())->where('closed_at', null)->first();
        
        //controllo se c'è una stanza attiva
        if(!$activeRoom){
            return response()->json(["status", "ok, no room"], 200);
        }
        //recupero la data della chiusura della stanza
        $activeRoom->closed_at = Carbon::now()->format('d-M-Y H:i:s');
        $activeRoom->save();
        //creo il nome della stanza
        $room_name = "rehacktor_" . $activeRoom->id;
        
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");

        //devo lavorare con twilio per chiudere la stanza
        $twilio = new Client($sid, $token);

        try {

            $room = $twilio->video->v1->rooms($room_name)->update('completed');
              //catturo l'errore su twilio

        } catch(TwilioException $e) {
            return response()->json(['status' => "ok, room closed, was already closed on twilio"], 200);
        }

        return response()->json(["status" => "ok, room closed"], 200);

    }

    public function join(Request $request) {
        $user =  Auth::guard('api')->id();
        // $user_id = Auth::guard('api');
        $room_id = $request->input('room_id');
        $room = Room::find($room_id);

        if ($room->closed_at) {
            return response()->json("room closed");
        }

        if ($room->seats == $room->max_seats_available) {
            return response()->json("no more seats available");

        }

        $room->seats++;
        $room->save();

        $room_name = "rehacktor" . $room->id;

        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $userSid = getenv('TWILIO_USER_SID');
        
        $identity = "User Watcher " . $user . " on room" . $room_id;

        $token = new AccessToken(  //class to import use Twilio\Jwt\AccessToken;
            $userSid,  # TWILIO USERSID
            $sid,      # TWILIO API SID
            $token,    # TWILIO SECRET
            3600, $identity
        );
        
        // Create a Video grant, an access
        $videoGrant = new VideoGrant();
        $videoGrant->setRoom(($room_name));

        //Add the grant to the token
        $token->addGrant($videoGrant);

        return response()->json([
            'jwt' => $token->toJWT(),
            'room_name' => $room_name,
            'partecipant' => $user
        ]);

    }

    public function streamerInfo(Room $room) {

        $stremer_id = $room->user->name;
        $game_name = $room->game_name;
        
        return response()->json([
            'stremer' => $stremer_id,
            'room_name' => $game_name,
            // 'partecipant' => 
        ]);
    }

    public function roomsActive(Request $request) {
        //send my the list of all the rooms active and the name  of the user and the id
        $rooms = Room::with('user:id')->where('closed_at', null)->get();
        return response()->json($rooms);
    }
    
    public function roomsByGame(Request $request) {
    
        $rooms = Room::with('user:id,name')->where('game_id', $request->game_id)->where('closed_at', null)->get();
        return response()->json(
           $rooms
        );
    }
    

}
