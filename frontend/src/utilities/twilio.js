// Step 1: Import necessary Twilio Video components
import { connect, createLocalTracks, LocalVideoTrack } from "twilio-video";

// Function to start streaming with Twilio
async function startStreaming(jwt, room_name, myFaceVideo) {
  try {
    // Step 1: Connect to the Twilio Video room using provided JWT and room name
    const room = await connect(jwt, { name: room_name });
    
    // Step 2: Log successful room connection
    console.log("Joined the room ", room);

    // Step 3: Create local audio and video tracks
    const localAudioVideoTrack = await createLocalTracks({
      audio: true,
      video: { width: 640, height: 640 },
    });

    // Step 4: Capture screen sharing tracks
    const screenSharingTracks = await navigator.mediaDevices.getDisplayMedia();

    // Step 5: Extract the screen sharing track
    const screenTrack = new LocalVideoTrack(screenSharingTracks.getTracks()[0]);
    screenTrack.contentHint = "capture";

    // Step 6: Combine local audio/video tracks with screen sharing track
    const tracks = [...localAudioVideoTrack, screenTrack];

    // Step 7: Display the preview of the local video track
    const localVideoTrack = localAudioVideoTrack[1];
    myFaceVideo.current.appendChild(localVideoTrack.attach());

    // Step 8: Connect to the Twilio Video room with all tracks
    const connectedRoom = await connect(jwt, { name: room_name, tracks });

    // Step 9: Log that local tracks with video attachment are connected to the room
    console.log("Local Tracks with VA connected to the room:", connectedRoom.name);

    // Step 10: Listen for a participant to connect to the room
    connectedRoom.on("participantConnected", (participant) => {
      console.log("A participant connected", participant);
    });

    // Step 11: Listen for the room to be disconnected
    connectedRoom.on("disconnected", (disconnectedRoom) => {
      console.log("Disconnected from", disconnectedRoom.name);

      // Step 12: Stop and detach local audio/video tracks on room disconnect
      localAudioVideoTrack.forEach((track) => {
        track.stop();
        console.log("track stopped", track);
        const attachedElements = track.detach();
        console.log("Element disconnected", attachedElements);

        // Step 13: Remove detached elements from the DOM
        attachedElements.forEach((element) => {
          element.parentNode.removeChild(element);
          console.log("element removed", element);
        });
      });
    });

    // Step 14: Resolve the promise once all steps are successfully completed
    return Promise.resolve("ok");
  } catch (error) {
    // Step 15: Handle errors during the process
    console.log("Error during streaming:", error.message);

    // Step 16: Reject the promise with an error message
    return Promise.reject("Failed to start streaming");
  }
}

function joinStreaming(
  jwt,
  room_name,
  streamerVideoStarted,
  streamerFaceStarted,
  streamClosed
) {
  return new Promise((resolve, reject) => {
    // Step 1: Connect to the Twilio Video room with provided JWT and room name
    connect(jwt, { name: room_name, audio: false, video: false })
      .then((room) => {
        // Step 2: Log when a new participant joins the room
        room.on("participantConnected", (participant) => {
          console.log("A new participant joined the room", participant);
        });

        // Step 3: Log when a participant disconnects from the room
        room.on("participantDisconnected", (participant) => {
          console.log("A participant disconnected", participant);
        });

        // Step 4: Iterate through participants in the room
        room.participants.forEach((participant) => {
          // Step 5: Check if the participant is the streamer
          if (participant.identity !== room_name) return;

          // Step 6: Subscribe to the participant's tracks
          participant.on("trackSubscribed", (track) => {
            track.on("started", (track) => {
              // Step 7: Determine if the track is a big video
              const isVideo = track.kind === "video";
              const isBigVideo = isVideo && track.dimensions.width >= 700;

              // Step 8: Trigger appropriate callbacks based on track type
              if (isBigVideo) {
                streamerVideoStarted(track);
              } else {
                streamerFaceStarted(track);
              }
            });
          });

          // Step 9: Unsubscribe from the participant's tracks if they stop
        participant.on("trackUnsubscribed", (track) => {
          console.log("trackUnsubscribed", track);

          // Step 10: Detach and remove elements when the streamer closes
          const attachedElements = track.detach();
           attachedElements.forEach((element) => element.remove());
          });
        });

        // Step 11: Listen for room disconnection and trigger the streamClosed callback
        room.on("disconnected", (disconnectedRoom) => {
          console.log("Room Disconnected", disconnectedRoom);
          streamClosed();
        });

        // Step 12: Resolve the promise, indicating successful connection to the room
        resolve("ok");
      })
      .catch((error) => {
        // Step 13: Handle errors during the connection process
        console.log("Unable to connect to the room", error.message);

        // Step 14: Reject the promise with an error message
        reject("Failed to join streaming room");
      });
  });
}

// Step 22: Export the function for use in other modules
export { joinStreaming, startStreaming };
