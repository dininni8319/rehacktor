import useInput from './../../../Hooks/useInput';
import { useNavigate } from 'react-router';
import { AuthContext } from './../../../Contexts/Auth/index';
import { useContext } from 'react';
import { ConfigContext } from './../../../Contexts/Config';

export default function SignUp() {

    const navigate = useNavigate()
    let { login } = useContext(AuthContext);
    let { api_urls } = useContext(ConfigContext);
    // console.log(api_urls.backend, 'backend');
    const email = useInput('');
    const password = useInput('');

    const signUp = (event) => {
        event.preventDefault()
        // console.log({email: email.value, password: password.value}, 'response from the server when we try to login');

        fetch(`${api_urls.backend}/api/users/login`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email: email.value, password: password.value})
        })
          .then(response => response.json())
          .then(data => {
              const token = data.token
            
              /// una volta ricevuto il token, possiamo richiedere informazioni come username e email ad esempio
              //alla rotta view profile
              fetch(`${api_urls.backend}/api/users/view-profile`, {
                  method: 'GET',
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              })
                .then(response => response.json())
                .then(data => {
                    login(data.data.name, token, data.data.id);
                    navigate('/');    //object history;
                });
          });
    }

    return (
        
        <form className={`${'sign-form'}`} onSubmit={signUp}>
            <div className={`${'sign-top'}`}></div>
            <div className={`${'sign-bottom'}`}></div>
            <div className="mb-5">
                <label className="form-label" htmlFor='userMail'> Inserisci la tua email</label>
                <input 
                    type="email" 
                    className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white" 
                    id="userMail"
                    {...email}
                />
            </div>
            <div className="mb-5">
                <label className="form-label" htmlFor='userPassword'> Inserisci la tua password</label>
                <input 
                    type="password" 
                    className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white" 
                    id="userPassword"
                    {...password}
                />
            </div>
            <div className="mb-5">
                <button type="submit" className="btn btn-outline-info px-5 rounded-0">Login</button>
            </div>
        </form>

    )
}