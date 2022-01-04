import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import classes from './Featured.module.css';
import Card from '../Card/Card';
import { useContext } from 'react';
import { ConfigContext } from './../../../Contexts/Config/index';

export default function Featured() {
    const [featured, setFeatured ] = useState(null);

    let { api_urls, api_secrets } = useContext(ConfigContext);

    let mostPopularGame2019 = `${api_urls.games}/api/games?dates=2010-01-01,2019-12-31&ordering=-added&key=${api_secrets.games}`;
    

    useEffect(() => {
         fetch(mostPopularGame2019)
          .then(resp => resp.json())
          .then(data => {
              console.log(data.results.slice(0, 4), 'test');
              setFeatured(data.results.slice(0, 4))
          })
    },[])

    return (
        <>
          <div className="container">
              <div className="row">
                  {
                   featured !== null && featured.map(el => {
                          return (
                            <div key={el.id} className="col-12 col-md-6 col-lg-3"
                            >
                                <Card 
                                  image={el.background_image}
                                  name={el.name}
                                  playtime={el.playtime}
                                  slug={el.slug}
                                />
                            </div>
                              
                      )})
                  }
              </div>
          </div>
        </>
    )
}