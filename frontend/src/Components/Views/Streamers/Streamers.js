import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConfigContext } from "../../../Contexts/Config";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { millToHour } from "../../../utilities/functions";
import { getActiveRooms } from "../../../Services/streamService";

export default function Streamers(params) {
  const [rooms, setRooms] = useState(null);
  const { api_urls } = useContext(ConfigContext);

  useEffect(() => {
    const fetchActiveRooms = async () => {
      try {
        const url = `${api_urls.backend}/api/users/room/roomsActive`
        const response = await getActiveRooms(url);
        const data = await response.json();
  
        if (response.ok) {
          setRooms(data);
        } else {
          alert('Rooms not found!');
        }
      } catch (error) {
        alert("An error occured!");
      }
    }
    fetchActiveRooms();
  }, []);
  
  return (
    <div className="container pt-5 min-vh-100">
      <div className="row mt-5 pt-5">
        <div className="col-12 pt-5">
          <h1>Choose your streamer</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table-dark table table-hover">
              <thead>
                <tr className="text-main">
                  <th scope="col">Username</th>
                  <th scope="col">Game</th>
                  <th scope="col">Seats</th>
                  <th scope="col">Time</th>
                  <th scope="col">Links</th>
                </tr>
              </thead>
              <tbody>
                {rooms &&
                  rooms.map((room) => {
                    return (
                      <tr key={room.id}>
                        <td className="pt-3 text-white ">{room.user.id}</td>
                        <td className="pt-3 text-white">
                          {room.game_name.replace(/-/g, "").toUpperCase()}
                        </td>
                        <td className="pt-3">{room.max_seats_available}</td>
                        <td className="pt-3">
                          {millToHour(new Date() - new Date(room.created_at))}
                        </td>
                        <td className="pt-3 text-white">
                          <Link
                            to={`/join-room/${room.id}`}
                            className="text-decoration-none text-white"
                          >
                            Join
                            <FontAwesomeIcon
                              icon={faChevronCircleRight}
                              className="fa-1x ms-3 text-main"
                            ></FontAwesomeIcon>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
