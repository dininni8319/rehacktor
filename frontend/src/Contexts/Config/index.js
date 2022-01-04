import { createContext } from 'react';
import { url, secret } from './Help';

export const ConfigContext = createContext()

export function ConfigProvider(props) {
    
    const api_urls = {
        backend: process.env.REACT_APP_API_URL,
        // games: process.env.REACT_APP_GAMES_API_URL,
        games: url,
    }

    const api_secrets = {
        // games: process.env.REACT_APP_GAMES_SECRET,
        game: secret,
    }
    console.log(api_urls, api_secrets, 'test usecontext');
    return (
        <ConfigContext.Provider value={{api_urls, api_secrets}}>{props.children}</ConfigContext.Provider>
    )
}