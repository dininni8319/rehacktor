import { startStreaming } from "../../../utilities/twilio";
import { useParams } from "react-router";
import { AuthContext } from "./../../../Contexts/Auth";
import { ConfigContext } from "./../../../Contexts/Config/index";
import { StreamingContext } from "./../../../Contexts/Streaming";
import { useContext, useRef } from "react";
import useInput from "./../../../Hooks/useInput";

export default function Stream() {
  const myFaceVideo = useRef(null);

  const { game_name, game_id } = useParams();

  const { user } = useContext(AuthContext);

  const { api_urls } = useContext(ConfigContext);

  const { isStreaming, setStreamingOn, setStreamingOff } =
    useContext(StreamingContext);

  const number = useInput(1);

  const token = JSON.parse(localStorage.getItem("user")).token;

  function startStream(ev) {
    ev.preventDefault();

    let object = {
      game_name: game_name,
      game_id: game_id,
      max_seats_available: number.value,
    };

    //creo la stanza  e attengo jwt
    fetch(`${api_urls.backend}/api/users/room/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(object),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("game", JSON.stringify(object));
        //attivare lo streaming
        startStreaming(data.twilio.jwt, data.twilio.room_name, myFaceVideo)
          .then(() => {
            console.log("streaming lanciato");
            setStreamingOn();
          })
          .catch((e) => {
            console.log("errore", e);
            endStream();
          });
      });
  }

  function endStream(params) {
    fetch(`${api_urls.backend}/api/users/room/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Ops....");
        }
        return resp.json();
      })
      .then((data) => {
        localStorage.removeItem("game");

        setStreamingOff();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <div className="container min-vh-100">
      <div className="row pt-5">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-start pt-5 vh-100">
          <h2>Hello, {user.username}</h2>
          <p>You are going to stream {game_name}</p>

          {isStreaming ? (
            <div>
              Already streaming
              <button className="btn btn-danger mt-5" onClick={endStream}>
                Close
              </button>
            </div>
          ) : (
            <div className='d-flex flex-column'>
              <p>Select a the number of people: {number.value}</p>
              <form className="w-25" onSubmit={startStream}>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="10"
                  step="1"
                  id="range"
                  value={number.value}
                  {...number}
                />
                <button className="btn btn-info">Stream now!</button>
              </form>
            </div>
          )}
          <div ref={myFaceVideo}></div>
        </div>
      </div>
    </div>
  );
}
