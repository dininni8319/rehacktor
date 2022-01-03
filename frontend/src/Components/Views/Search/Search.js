import classes from './Search.module.css';
import { useEffect, useState } from 'react';
import GenresList from '../../UI/GenresList/GenresList';

export default function Search() {
     
    const [genres, setGenres] = useState(null);
    
    let apiKey = 'ad5b7cec7a4a46e0ab7b381e029adf29';

    let searchGenre = `https://api.rawg.io/api/genres?&key=${apiKey}`;

    useEffect(() => {
        fetch(searchGenre)
          .then(resp => resp.json())
          .then(data => {
              setGenres(data.results)
          })
    },[])

    return (
          <div className={`${'container-fluid'} ${'py-5'} ${'min-vh-100'} ${classes['bg-info']}`}>
              <div className="row">
                <div className="col-12 col-md-3 col-lg-2">
                    <div className={classes['genres-wrapper']}>
                    {
                       genres && <GenresList data={genres}/>
                       
                    //    genres.map(genre => {
                    //         return <button className="btn btn-outline-info rounded-0 d-block w-100 mb-2 text-start">{genre.name}</button>
                    //     })
                    }
                    </div>
                </div>
                <div className="col-12 col-md-9 col-lg-10">
                    Card dei video giochi filtrati!
                  </div>

              </div>
          </div>
      )
}