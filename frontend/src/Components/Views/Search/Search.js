import classes from "./Search.module.css";
import { useEffect, useState } from "react";
import GenresList from "../../UI/GenresList/GenresList";
import Card from "../../UI/Card/Card";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../UI/Loader/Loader";
import { useContext } from "react";
import { ConfigContext } from "../../../Contexts/Config/index";
import { getGames, getGenre, getSearchedGame } from "../../../Services/gameService";

export default function Search() {
  const [genres, setGenres] = useState(null);
  const [searched, setSearched] = useState("");
  const [games, setGames] = useState(null);

  const { genre, num } = useParams();
  const { api_urls, api_secrets } = useContext(ConfigContext);
  const searchGenre = `${api_urls.games}/api/genres?&key=${api_secrets.games}`;

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await getGenre(searchGenre);
        const data = await response.json();
        if (response.ok) {
          setGenres(data.results)
        }
      } catch (error) {
        alert("Error: I did not find any genre");
      }
    }
    fetchGenre();
  }, [genre]);

  useEffect(() => {
    const fetchGames = async() => {
      try {
        const url = `${api_urls.games}/api/games?&key=${api_secrets.games}&genres=${genre}&page=${num}&page_size=12`;
        const response = await getGames(url);
        const data = await response.json();

        if (response.ok) {
          setGames(data.results)
        }
      } catch (error) {
        alert("Error: I did not find any games");
      }
    }
    fetchGames();
  }, [genre, num, api_secrets.games, api_urls.games]);

  useEffect(() => {
    const fetchSearchedGame = async () => {
      if (searched.length > 4) {
        try {
          const url = `${api_urls.games}/api/games?&key=${api_secrets.games}&page_size=12&search=${searched}&search_precise=true`;
          const response = await getSearchedGame(url);
          const data = await response.json();

          if (response.ok) {
            setGames(data.results);
          } else {
            alert("Sorry no game found");
          }
        } catch (error) {
          alert("Error: I did not find any games");
        }
      }
    }
    fetchSearchedGame();
  }, [searched, api_secrets.games, api_urls.games]);

  const renderGames = () => (
    <div className="row">
      {games ? (
        games.map((game) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 mb-5 d-flex justify-content-center" key={game.id}>
              <Card
                image={game.background_image}
                name={game.name}
                playtime={game.playtime}
                slug={game.slug}
              />
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );

  return (
    <div
      className={`${"container-fluid"} ${"py-5"} ${"min-vh-100"} ${
        classes["bg-info"]
      }`}
    >
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2">
          <div className={classes["genres-wrapper"]}>
            {genres && <GenresList data={genres} />}
          </div>
        </div>
        <div className="col-12 col-md-9 col-lg-10">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="mt-5 form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white"
                  onChange={(ev) => setSearched(ev.target.value)}
                  value={searched}
                />
                <button className="btn border-0" type="button">
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="fa-1x text-white text-decoration-none pb-0"
                  />
                </button>

              </div>
            </div>
          </div>
          {!searched && (
            <div className="row justify-content-between mb-5 mt-5">
              <div className="col-2">
                {num > 1 ? (
                  <Link
                    to={`/search/${genre}/${+num - 1}`}
                    className="text-decoration-none text-white"
                  >
                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      className="fa-2x text-white text-decoration-none"
                    />
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="col-2">
                {num < 11 ? (
                  <Link
                    to={`/search/${genre}/${+num + 1}`}
                    className="text-decoration-none text-white"
                  >
                    <FontAwesomeIcon
                      icon={faChevronCircleRight}
                      className="fa-2x text-white text-decoration-none"
                    />{" "}
                    {num}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          {renderGames()}
        </div>
      </div>
    </div>
  );
}
