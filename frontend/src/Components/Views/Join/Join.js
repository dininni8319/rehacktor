import { useEffect, useState, useRef } from "react";
import classes from "./Join.module.css";
import { useParams } from "react-router";
import { joinStreaming } from "./../../../utilities/twilio";
import Loader from "../../UI/Loader/Loader";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { ConfigContext } from "../../../Contexts/Config";

export default function Join(params) {
  const { room_id } = useParams();

  const StreamerVideo = useRef("video");
  const StreamerFace = useRef("face");

  const [loading, streaming, closed, full] = [
    "loading",
    "streaming",
    "closed",
    "full",
  ];

  const [status, setStatus] = useState(loading);

  const [info, setInfo] = useState();

  let { api_urls } = useContext(ConfigContext);

  const token = JSON.parse(localStorage.getItem("user")).token;

  useEffect(() => {
    fetch(`${api_urls.backend}/api/users/room/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ room_id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data === "room closed") {
          setStatus(closed);
          return;
        }

        if (data === "no more seat available") {
          setStatus(full);
          return;
        }
        // console.log(data.jwt,data.room_name,data, 'checking the token');
        console.log(data, "DATAaaaaaa");
        setStatus(streaming);

        joinStreaming(
          data.jwt,
          data.room_name,
          data.participants,
          (track) => {
            StreamerVideo.current.appendChild(track.attach());
          },
          (track) => {
            StreamerFace.current.appendChild(track.attach());
          },
          () => setStatus(closed)

          // streamerVideoStarted,
          // streamerFaceStarted,
          // streamClosed
        );
      })
      .then(() => {
        fetch(`${api_urls.backend}/api/users/room/streamer/${room_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => setInfo(data));
      });
  }, []);

  const showLoading = () => {
    if (status === loading) return <Loader />;
  };

  const showFull = () => {
    if (status === full) {
      return (
        <div className="">
          <p>Stanza Piena!</p>
          <Link to="/streamers">Torna alla lista</Link>
        </div>
      );
    }
  };

  const showTransmissionInterrupted = () => {
    if (status === closed) {
      return (
        <div className="">
          <p>Lo streamer ha interrotto la trasmissione!</p>
          <Link to="/streamers">Torna alla lista</Link>
        </div>
      );
    }
  };

  return (
    <div className="container min-vh-100 mt-5">
      <div className="row my-5">
        <div className="col-12 position-relative">
          <div className={classes.wrapperTracks}>
            <div className={classes.streamer} ref={StreamerVideo}></div>
            <div className={classes.viewer} ref={StreamerFace}></div>
            <div className={classes.streamerName}>
              {info && <span>{info.streamer}</span>}
            </div>
          </div>
        </div>
        {showLoading()}
        {showFull()}
        {showTransmissionInterrupted()}
      </div>
    </div>
  );
}
