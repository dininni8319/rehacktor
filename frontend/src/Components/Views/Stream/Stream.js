import classes from './Stream.module.css'
import { startStreaming } from '../../../utilities/twilio';
import { useParams } from 'react-router';
import { AuthContext } from './../../../Contexts/Auth';
import { ConfigContext } from './../../../Contexts/Config/index';
import { StreamingContext } from './../../../Contexts/Streaming';

import { useContext, useRef } from 'react';
import useInput from './../../../Hooks/useInput';

export default function Stream() {

    const myFaceVideo = useRef(null);

    const { game_name, game_id } = useParams();

    const { user } = useContext(AuthContext);

    const { api_urls } = useContext(ConfigContext);

    const { isStreaming, setStreamingOn, setStreamingOff } = useContext(StreamingContext);

    const number = useInput(1);

    const token = JSON.parse(localStorage.getItem("user")).token;

    function startStream(ev) {
        ev.preventDefault()

        let object = {
            game_name : game_name,
            game_id : game_id,
            max_seats_available: number.value
        }

        //creo la stanza  e attengo jwt
        fetch(`${api_urls.backend}/api/users/room/`,{
            method: "POST",
            headers: {
               "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`,
            },
            body:JSON.stringify(object)
        })
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("game", JSON.stringify(object))

            //attivare lo streaming
            startStreaming(data.twilio.jwt, data.twilio.room_name, myFaceVideo)
            .then(() => {
                console.log("streaming lanciato");
                setStreamingOn();

            })
            .catch((e) => {
                console.log("errore" , e );
                endStream()
            })
        })
    }

    function endStream(params) {
        fetch(`${api_urls.backend}/api/users/room/close`, {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
                 Authorization : `Bearer ${token}`,
             },
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Ops....")
            }
            return resp.json()
        })
        .then(data => {

            console.log("ending", data);
            localStorage.removeItem("game")

            setStreamingOff();
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    return (
        <div className="container min-vh-100 mt-5">
            <div className="row mt-5">
                <div className="col-12 col-md-6 mt-5">
                    <h2>Hello, {user.username}</h2>
                </div>
            </div>
        </div>
    )
}
