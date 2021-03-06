import classes from './Search.module.css';
import { useEffect, useState } from 'react';
import GenresList from '../../UI/GenresList/GenresList';
import Card from '../../UI/Card/Card';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../UI/Loader/Loader';
import { useContext } from 'react';
import { ConfigContext } from '../../../Contexts/Config/index';

// import Game from '../Game/Game';

export default function Search() {
     
    const [genres, setGenres] = useState(null);
    
    let  { genre } = useParams();

    let { num } = useParams();
    
    const [ games, setGames ] = useState(null);

    const [ searched, setSearched ] = useState('');

    let { api_urls, api_secrets } = useContext(ConfigContext);

    let searchGenre = `${api_urls.games}/api/genres?&key=${api_secrets.games}`;

    let searchGame = `${api_urls.games}/api/games?&key=${api_secrets.games}&genres=${genre}&page=${num}&page_size=12`;

    useEffect(() => {
        fetch(searchGenre)
          .then(resp => resp.json())
          .then(data => {
              setGenres(data.results)
          })
    },[])


    useEffect(() => {
        fetch(`${api_urls.games}/api/games?&key=${api_secrets.games}&genres=${genre}&page=${num}&page_size=12`)
          .then(resp => resp.json())
          .then(data => {
            //   console.log(data.results, 'test the results');
             setGames(data.results)
          })
    },[genre, num])

    useEffect(() => {

        if(searched.length > 4) {
            fetch(`${api_urls.games}/api/games?&key=${api_secrets.games}&page_size=12&search=${searched}&search_precise=true`)
            .then(response => response.json())
            .then(data => setGames(data.results))
        }
    },[searched])

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
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className='input-group mb-3'>
                                <input type='text'
                                  placeholder="Search by name" 
                                  className='mt-5 form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                                  onChange={(ev) => setSearched(ev.target.value)}
                                  value={searched}
                                />
                                <button className="btn border-0" type='button'>
                                  <FontAwesomeIcon icon={faChevronRight} className='fa-1x text-white text-decoration-none pb-0'/>  
                                </button>
                                {/* {searched} */}
                            </div>
                        </div>
                    </div>
                    {
                        !searched && (
                                <div className="row justify-content-between mb-5 mt-5">
                                <div className='col-2'>
                                    {/* <Link to={`/search/${genre}/${+num  > 0 ? +num - 1 : 0}`} className="text-decoration-none">Next</Link> */}
                                    { 
                                    num > 1 ? <Link to={`/search/${genre}/${+num - 1}`} className="text-decoration-none text-white"> 
                                            <FontAwesomeIcon icon={faChevronCircleLeft} className='fa-2x text-white text-decoration-none'/>
                                    </Link> : ""

                                    }
                                </div>
                                <div className="col-2">
                                    {/* <Link to={`/search/${genre}/${+num < 11 ? +num + 1 : 11}`} className="text-decoration-none">Next</Link> */}
                                    { 
                                    num < 11 ? <Link to={`/search/${genre}/${+num + 1}`} className="text-decoration-none text-white">
                                        <FontAwesomeIcon icon={faChevronCircleRight} className='fa-2x text-white text-decoration-none'/> {num} 
                                    </Link> : ""

                                    }
                                </div>
                            </div>

                        )
                    }
                    <div className="row">
                        {
                           games ? games.map(game => {
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
                           }) : <Loader />

                        }
                    </div>
                  </div>

              </div>
          </div>
      )
}