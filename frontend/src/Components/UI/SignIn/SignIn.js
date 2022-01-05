import useInput from '../../../Hooks/useInput';

import { AuthContext } from './../../../Contexts/Auth';
import { ConfigContext } from './../../../Contexts/Config';

import { useContext, useState } from 'react';

export default function SignIn() {
    const username = useInput('')
    const email = useInput('')
    const password = useInput('')
    const passwordConfirm = useInput('')
    
    let { api_urls } = useContext(ConfigContext)
    let { login } = useContext(AuthContext)

    const Login = event => {

        event.preventDefault()

        if (password.value === passwordConfirm.value) {
              // proseguire 
              //fetch register
              //fetch login
              //fetch view-profile

                fetch(`${api_urls.backend}/api/users/register`, {
                    method: 'POST',
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        name: username.value, 
                        email: email.value,
                        password: password.value,
                        passwordConfirm: passwordConfirm.value,
                    })
                }).then(response => {

                    if (response.ok) {
                        return response.json()
                    } else {
                        alert('ops..')
                    }
                })
            
        } else {
              alert('the passwords are not the same')
        }
    }

    return (
        <>
            <form  className={`${'sign-form'}`} onSubmit={Login}>
                <div className={`${'sign-top'}`}></div>
                <div className={`${'sign-bottom'}`}></div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userName'>Enter your User Name</label>
                    <input type="text" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userName" {...username}/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userMail'>Enter your Email</label>
                    <input type="email" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userMail" {...email}/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userPassword'>Enter a new Password</label>
                    <input type="password" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userPassword" {...password}/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userPasswordConfirm'>Confirm the entered Password</label>
                    <input type="password" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userPasswordConfirm" {...passwordConfirm}/>
                </div>
                <div className="mb-5">
                    <button type='submit' className="btn btn-outline-info px-5 rounded-0">Register</button>
                </div>
            </form>
        </>
    );
};