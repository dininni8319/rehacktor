// import { createContext } from "react";
// // import { url, secret } from './Help';

// export const ConfigContext = createContext();

// export function ConfigProvider(props) {
//   const api_urls = {
//     backend: process.env.REACT_APP_API_URL,
//     games: process.env.REACT_APP_GAMES_API_URL,
//     // games: url,
//   };

//   const api_secrets = {
//     games: process.env.REACT_APP_GAMES_SECRET,
//     // game: secret,
//   };

//   return (
//     <ConfigContext.Provider value={{ api_urls, api_secrets }}>
//       {props.children}
//     </ConfigContext.Provider>
//   );
// }

import { createContext } from 'react';

export const ConfigContext = createContext()

export function ConfigProvider(props) {
    
    const { 
      REACT_APP_API_URL,
      REACT_APP_PROD,
      NODE_ENV,
      REACT_APP_GAMES_SECRET,
      REACT_APP_GAMES_API_URL
    } = process.env

    const api_urls = {
      backend: 
        NODE_ENV === 'development' ?
          REACT_APP_API_URL :
          REACT_APP_PROD,
      games: REACT_APP_GAMES_API_URL
    };

    const api_secrets = {
        games: REACT_APP_GAMES_SECRET
    }

    return (
        <ConfigContext.Provider value={{api_urls, api_secrets}}>{props.children}</ConfigContext.Provider>
    )
}
