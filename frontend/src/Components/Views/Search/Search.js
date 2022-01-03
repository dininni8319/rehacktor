import classes from './Search.module.css';
import { useEffect, useState } from 'react';
import GenresList from '../../UI/GenresList/GenresList';
import Card from '../../UI/Card/Card';
import { useParams } from 'react-router';
import Game from '../Game/Game';

export default function Search() {
     
    const [genres, setGenres] = useState(null);
    
    let  { genre } = useParams();

    let { num } = useParams();
    
    const [ games, setGames ] = useState(null)
    console.log(games, 'test num 2 ');
    
    let apiKey = 'ad5b7cec7a4a46e0ab7b381e029adf29';

    let searchGenre = `https://api.rawg.io/api/genres?&key=${apiKey}`;

    let searchGame = `https://api.rawg.io/api/games?&key=${apiKey}&genres=${genre}&page=${num}&page_size=12`;

    useEffect(() => {
        fetch(searchGenre)
          .then(resp => resp.json())
          .then(data => {
              setGenres(data.results)
          })
    },[])


    useEffect(() => {
        fetch(`https://api.rawg.io/api/games?&key=${apiKey}&genres=${genre}&page=${num}&page_size=12`)
          .then(resp => resp.json())
          .then(data => {
            //   console.log(data.results, 'test the results');
             setGames(data.results)
          })
    },[])

    return (
          <div className={`${'container-fluid'} ${'py-5'} ${'min-vh-100'} ${classes['bg-info']}`}>
              <div className="row">
                <div className="col-12 col-md-3 col-lg-2">
                    <div className={classes['genres-wrapper']}>
                    {
                       genres && <GenresList data={genres}/>
                    }
                    </div>
                </div>
                <div className="col-12 col-md-9 col-lg-10">
                    <div className="row">
                        {
                           games && games.map(game => {
                               return (
                                    <div className='col-12 col-md-6 col-lg-4 mb-5' key={game.id}>
                                        <Card 
                                            image={game.background_image}
                                            name={game.name}
                                            playtime={game.playtime}
                                            slug={game.slug}
                                        />
                                    </div>
                               )
                           })
                        }
                    </div>
                  </div>

              </div>
          </div>
      )
}