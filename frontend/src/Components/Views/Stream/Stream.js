import { startStreaming } from "../../../utilities/twilio";
import { useParams } from "react-router";
import { AuthContext } from "./../../../Contexts/Auth";
import { ConfigContext } from "./../../../Contexts/Config/index";
import { StreamingContext } from "./../../../Contexts/Streaming";
import { useContext, useRef } from "react";
import useInput from "./../../../Hooks/useInput";
import { closeRoom, createRoom } from "../../../Services/streamService";

export default function Stream() {
  const myFaceVideo = useRef(null);
  const { game_name, game_id } = useParams();
  const { user } = useContext(AuthContext);
  const { api_urls } = useContext(ConfigContext);
  const { isStreaming, setStreamingOn, setStreamingOff } =
    useContext(StreamingContext);
  const number = useInput(1);
  const token = JSON.parse(localStorage.getItem("user")).token;

  const startStream = async (ev) => {
    try {
      ev.preventDefault();
  
      let object = {
        game_name: game_name,
        game_id: game_id,
        max_seats_available: number.value,
      };
  
      const response = await createRoom(
        object,
        token,
        api_urls.backend
      )

      const data = await response.json();
      localStorage.setItem("game", JSON.stringify(object));
  
      // Attivare lo streaming
      await startStreaming(data.twilio.jwt, data.twilio.room_name, myFaceVideo);
      console.log("streaming lanciato");
      setStreamingOn();
    } catch (error) {
      console.log("errore", error);
      endStream();
    }
  }
  
  const endStream = async (ev) => {
    try {
      const response = await closeRoom(token, api_urls.backend);
  
      if (!response.ok) {
        throw new Error("Ops....");
      }
      localStorage.removeItem("game");
      setStreamingOff();
    } catch (error) {
      console.log("Error:", error);
    }
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
