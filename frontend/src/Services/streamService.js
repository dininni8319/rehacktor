export const getActiveRooms = async (url) => {
  const response = await fetch(url);
  
  return response;
}

export const joinStreamingAction = async (backendUrl,token, room_id) => {
  const response = await fetch(`${backendUrl}/api/users/room/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ room_id }),
  });

  return response;
}

export const getStreamerResponse = async (backendUrl, token, room_id) => {
  const response = await fetch(
    `${backendUrl}/api/users/room/streamer/${room_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export const createRoom = async (object, token, backendUrl) => {
  const response = await fetch(`${backendUrl}/api/users/room/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  });

  return response;
}

export const closeRoom = async (token, backendUrl) => {
  const response = await fetch(`${backendUrl}/api/users/room/close`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
