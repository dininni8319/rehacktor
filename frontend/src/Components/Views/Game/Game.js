import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function Game() {
     
     let { slug } = useParams();
     let apiKey = 'ad5b7cec7a4a46e0ab7b381e029adf29';

     let specificGame = `https://api.rawg.io/api/games/${slug}?&key=${apiKey}`;

     const [game, setGame]= useState(null);

     useEffect(() => {
        fetch(specificGame)
           .then(resp => resp.json())
           .then(data => setGame(data))
     },[])

     return (
          <>
           {
                game && 
                    <div className="container-fluid   pt-5 min-vh-100" style={{background: `linear-gradient(rgba(33, 33, 33, 1), rgba(33, 33, 33, 0.8), rgba(33, 33, 33, 1)),url(${game.background_image})`}}>
                        <div className="container">
                             Informations about the game
                        </div>
                    </div>
           }
          </>

     )
}