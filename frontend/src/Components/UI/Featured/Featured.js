import { useState } from 'react';

export default function Featured() {
    const [featured, setFeatured ] = useState(null);

    let apiKey = 'ad5b7cec7a4a46e0ab7b381e029adf29';

    let mostPopularGame2019 = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added&key=${apiKey}`;

    // let rating = `https://api.rawg.io/api/games?dates=2001-01-01,2001-12-31ordering=-rating&key=${apiKey}`;

    // fetch(`https://api.rawg.io/api/games?key=ad5b7cec7a4a46e0ab7b381e029adf29&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
    //  .then(resp => resp.json())
    //  .then(data => console.log(data, 'rating'))

    // fetch(rating)
    //  .then(resp => resp.json())
    //  .then(data => console.log(data, 'rating'))

    fetch(mostPopularGame2019)
      .then(resp => resp.json())
      .then(data => {
          console.log(data, 'test');
          setFeatured(data)
      })
    
    return <p>test</p>

}