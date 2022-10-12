const { connect, createLocalTracks, LocalVideoTrack } = require("twilio-video");

function startStreaming(jwt, room_name, myFaceVideo) {
  return new Promise((resolve, reject) => {
    connect(jwt, { name: room_name }).then((room) => {
      console.log("Joined the room ", room);

      let localAudioVideoTrack = createLocalTracks({
        audio: true,
        video: { width: 640, height: 640 },
      });

      let screenSharingTracks = navigator.mediaDevices.getDisplayMedia();

      Promise.all([localAudioVideoTrack, screenSharingTracks])
        .then(([localTracks, stream]) => {
          //prendo la track dello screen sharing
          let screenTrack = new LocalVideoTrack(stream.getTracks()[0]);

          screenTrack.contentHint = "capture";

          //unisco le tracks
          const tracks = [...localTracks, screenTrack];

          //vedere la preview
          const localVideoTrack = localTracks[1];
          myFaceVideo.current.appendChild(localVideoTrack.attach());

          //mando a twilio le tracks

          return connect(jwt, {
            name: "{{$room_name}}",
            tracks: tracks,
          });
        })
        .then((room) => {
          console.log("Local Tracks with VA connected to the room:", room.name);

          room.on("participantConnected", (participant) => {
            console.log("A participant connected", participant);
          });

          room.on("disconnected", (room) => {
            console.log("Disconnected from", room.name);
            localAudioVideoTrack.then((tracks) => {
              tracks.forEach((track) => {
                track.stop();
                console.log("track stopped", track);
                const attachedElements = track.detach();
                console.log("Element disconnected", attachedElements);

                attachedElements.forEach((element) => {
                  // element.romove()
                  element.parentNode.removeChild(element);
                  console.log("element removed", element);
                });
              });
            });
          });
          resolve("ok");
        })
        .catch((e) => {
          console.log("You must allow screen sharing");
          console.log(e);
          reject("Share screen refused");
        });
    });
  });
}

function joinStreaming(
  jwt,
  room_name,
  streamerVideoStarted,
  streamerFaceStarted,
  streamClosed
) {
  console.log(jwt, room_name, "connect");

  return new Promise((resolve, reject) => {
    connect(jwt, { name: room_name, audio: false, video: false })
      .then((room) => {
        console.log("in the join");
        room.on("participantConnected", (participant) => {
          console.log("A new participant joind the room", participant);
        });

        room.on("participantDisconnected", (participant) => {
          console.log("A participant disconnected", participant);
        });

        console.log(room, "why you dont work");
        room.participants.forEach((participant) => {
          console.log("in the join me ");

          //ci interrassa solo chi trasmette
          console.log("testing the connection with room 74");
          if (participant.identity !== room_name) return;

          participant.on("trackSubscribed", (track) => {
            track.on("started", (track) => {
              const isVideo = track.kind === "video";
              const isBigVideo = isVideo && track.dimensions.with >= 700;

              if (isBigVideo) {
                streamerVideoStarted(track);
              } else {
                streamerFaceStarted(track);
              }
            });
          });

          participant.on("trackUnsubscribed", (track) => {
            console.log("trackUnsubscribed", track);

            // lo streamer chiude
            const attachedElements = track.detach();

            attachedElements.forEach((element) => element.remove());
          });
        });

        room.on("disconnected", (room) => {
          console.log("Room Disconnected", room);
          streamClosed();
        });
      })
      .catch((error) => {
        console.log("Unable to connect to the room", error.message);
      });
  });
}

export { joinStreaming, startStreaming };
