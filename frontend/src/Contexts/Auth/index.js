import { useState, useContext, createContext } from 'react';
import { ConfigContext, configContext } from './../Config';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const initialUser = localStorage.getItem('user')

    let {api_urls} = useContext(ConfigContext)

    const [ user, setUser ] = useState(JSON.parse(initialUser))

    const login = (username, token, id ) => {
        const obj = {
            username: username,
            token: token,
            id: id
        }
        setUser(obj)
        localStorage.setItem('user', JSON.stringify(obj))
    }
    return (
        <AuthContext.Provider value={{login, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}