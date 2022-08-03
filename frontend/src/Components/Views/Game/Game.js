     import { useParams } from 'react-router';
     import { useEffect, useState } from 'react';
     import Loader from '../../UI/Loader/Loader';
     import { Link } from 'react-router-dom';
     import { useContext } from 'react';
     import { ConfigContext } from '../../../Contexts/Config/index';
     import { AuthContext } from './../../../Contexts/Auth/index'

     import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
     import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

     export default function Game() {
          
          let { slug } = useParams();

          let { api_urls, api_secrets } = useContext(ConfigContext);

          const [game, setGame] = useState(null);

          let { user } = useContext(AuthContext);

          useEffect(() => {
               fetch(`${api_urls.games}/api/games/${slug}?&key=${api_secrets.games}`)
                    .then(resp => resp.json())
                    .then(data => setGame(data))
          },[])

          return (
               <>
               {
                    game ?   (
                         <div className="container-fluid  pt-5 min-vh-100" style={{background: `linear-gradient(rgba(33, 33, 33, 1), rgba(33, 33, 33, 0.8), rgba(33, 33, 33, 1)),url(${game.background_image})`,
                              backgroundSize: 'cover',
                              backbroudPosition: 'center',
                              backgroundRepeat: 'no-repeat'
                    }}>
                         <div className="container">
                                   <div className="row mt-5">
                                        <div className="col-12">
                                             <h1>{game.name}</h1>
                                             <p className='small'> {game.developers[0].name}</p>
                                        </div>
                                   </div>
                              <div className="row mt-5">
                                        <div className="col-12 col-md-6">
                                             {game.description_raw} 
                                        </div> 
                                   <div className="col-12 col-md-6"> 
                                        <img className='img-fluid' src={game.background_image} alt={game.name}/>  
                                   </div>
     
                              </div>
                              
                              <div className="row mt-5">
                                        <div className="col-12 col-md-6 col-lg-3">
                                             <h3>Genres</h3>
                                             <div className='d-flex'>
                                                  { game.genres && game.genres.map(el => 
                                                       <Link key={el.id} to={`/search/${el.slug}/1`} className='text-decoration-none mx-2'><button className="btn btn-outline-info mt-2">{el.name}</button></Link>
                                                       
                                                  )}
                                             </div>      
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                        <h3>Rating</h3>
                                        <div className='d-flex flex-column'>
                                             { game.ratings && game.ratings.map(el => {
                                                  return (
                                                       <span key={el.id}  className='text-decoration-none mx-2 text-white text-uppercase'>{el.title}</span>
                                                  )
                                             }
                                                       
                                             )}
                                        </div>

                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                        <h3>Streamers</h3>
                                             <ul>
                                                  <li>Salvatore Dininni</li>
                                                  <li>Sandro Corciulo</li>
                                                  <li>Antonio Donofrio</li>
                                                  <li>Giancarlo Vinci</li>
                                             </ul>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3">
                                                  {
                                                       user ? <Link 
                                                                 to={`/stream/${game.slug}/${game.id}`}
                                                                 className='h4 text-main text-decoration-none fts-italic d-flex align-items-center'
                                                              >
                                                                 <FontAwesomeIcon icon={faChevronCircleRight} className='fa-1x mx-1 text-main mb-2 mx-3'>
                                                                 </FontAwesomeIcon>    
                                                                 <h3>Start Your Stream</h3>     
                                                            </Link>
                                                            : 'You must be logged in if you want to stream'
                                                  }
                                        
                                        </div>
                              </div>
                              </div>
                         </div>
                         
                    ) : <Loader />
                    
               
               }
               </>

          )
     }