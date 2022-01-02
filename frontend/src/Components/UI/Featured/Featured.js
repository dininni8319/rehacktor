import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Featured.module.css';

export default function Featured() {
    const [featured, setFeatured ] = useState(null);

    let apiKey = 'ad5b7cec7a4a46e0ab7b381e029adf29';

    let mostPopularGame2019 = `https://api.rawg.io/api/games?dates=2010-01-01,2019-12-31&ordering=-added&key=${apiKey}`;

    // let rating = `https://api.rawg.io/api/games?dates=2001-01-01,2001-12-31ordering=-rating&key=${apiKey}`;

    // fetch(`https://api.rawg.io/api/games?key=ad5b7cec7a4a46e0ab7b381e029adf29&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
    //  .then(resp => resp.json())
    //  .then(data => console.log(data, 'rating'))

    // fetch(rating)
    //  .then(resp => resp.json())
    //  .then(data => console.log(data, 'rating'))

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
                            <div className={` ${'card'} ${'m-2'} ${'bg-transparent'} ${'border-white'} ${classes['card-size']}`}>
                               <img src={el.background_image} className="card-img-top" alt="..." />
                                <div className="card-body ">
                                    <p className="card-title">{el.name}</p>
                                    <p className="card-text">playtime: {el.playtime}</p>
                                    <Link to={`/game/${el.slug}`} className=
                                    'text-decoration-none'>{el.name}</Link>
                                </div>
                                </div>    
                            </div>
                              
                      )})
                  }
              </div>
          </div>
        </>
    )
}