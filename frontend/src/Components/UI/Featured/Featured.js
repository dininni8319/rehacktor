import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useContext } from "react";
import { ConfigContext } from "./../../../Contexts/Config/index";
import { getMostPopularGames } from "../../../Services/gameService";

export default function Featured() {
  const [featured, setFeatured] = useState(null);
  const { api_urls, api_secrets } = useContext(ConfigContext);
  const mostPopularGame2019 = `${api_urls.games}/api/games?dates=2010-01-01,2019-12-31&ordering=-added&key=${api_secrets.games}`;

  useEffect(() => {
    const fetchMostPopularGames = async () => {
      try {
        const response = await getMostPopularGames(mostPopularGame2019)
        const data = await response.json();

        if (response.ok) {
          setFeatured(data.results.slice(0, 4));
        } else {
          alert("Error getting most popular games");
        }
      } catch (error) {
        console.error("Error:\t",error);
        alert("Error getting most popular games");
      }
    }
    fetchMostPopularGames();
  }, [mostPopularGame2019]);

  return (
    <>
      <div className="container">
        <div className="row">
          {featured?.map((el) => (
            <div key={el.id} className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
              <Card
                image={el.background_image}
                name={el.name}
                playtime={el.playtime}
                slug={el.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
