import { useEffect, useState, useRef } from "react";
import classes from "./Join.module.css";
import { useParams } from "react-router";
import { joinStreaming } from "./../../../utilities/twilio";
import Loader from "../../UI/Loader/Loader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ConfigContext } from "../../../Contexts/Config";
import { 
  getStreamerResponse, 
  joinStreamingAction 
} from "../../../Services/streamService";

export default function Join() {
  const { room_id } = useParams();
  const { api_urls } = useContext(ConfigContext);
  const StreamerVideo = useRef();
  const StreamerFace = useRef();

  const [status, setStatus] = useState("loading");
  const [info, setInfo] = useState();
  const token = JSON.parse(localStorage.getItem("user")).token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await joinStreamingAction(
          api_urls.backend, 
          token, 
          room_id
        );

        const data = await response.json();

        if (data === "closed") {
          setStatus("closed");
        } else if (data === "not-available") {
          setStatus("full");
        } else {
          setStatus("streaming");

          joinStreaming(
            data.jwt,
            data.room_name,
            data.participants,
            (track) => StreamerVideo.current.appendChild(track.attach()),
            (track) => StreamerFace.current.appendChild(track.attach()),
            () => setStatus("closed")
          );
        }

        const streamerResponse = await getStreamerResponse(
          api_urls.backend, 
          token, 
          room_id
        )

        const streamerData = await streamerResponse.json();
        if (streamerData) {
          setInfo(streamerData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [api_urls.backend, room_id, token]);

  const showLoading = () => (status === "loading" ? <Loader /> : null);

  const showFull = () =>
    status === "full" ? (
      <div className="">
        <h2 className="text-main">Stanza Piena!</h2>
        <Link to="/streamers" className="text-decoration-none">Torna alla lista</Link>
      </div>
    ) : null;

  const showTransmissionInterrupted = () =>
    status === "closed" ? (
      <div>
        <h2 className="text-main">Lo streamer ha interrotto la trasmissione!</h2>
        <Link to="/streamers" className="text-decoration-none">Torna alla lista</Link>
      </div>
    ) : null;

  return (
    <div className="container pt-5 min-vh-100">
      <div className="row mt-5 pt-5">
        <div className="d-flex flex-column">
          {showLoading()}
          {showFull()}
          {showTransmissionInterrupted()}
        </div>
        <div className="col-12">
          <div className={classes.wrapperTracks}>
            <div className={classes.streamer} ref={StreamerVideo}></div>
            <div className={classes.viewer} ref={StreamerFace}></div>
            <div className={classes.streamerName}>{info && <span>{info.streamer}</span>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
