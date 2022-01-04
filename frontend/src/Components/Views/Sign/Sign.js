import classes from './Sign.module.css';
import { useState } from 'react';
import SignUp from '../../UI/SignUp/SignUp';
import SignIn from '../../UI/SignIn/SignIn';

export default function Sign(params) {

    const [isLogin, setIsLogin ] = useState(true);

    return (
            <div className={`${'container-fluid'} ${classes.bg}`}> 
                <div className="container">
                    <div className="row justify-content-center align-items-center min-vh-100">
                        <div className="col-12 col-md-8 col-lg-6 text-center">
                          { 
                            isLogin ? <SignUp /> : <SignIn />    
                          }
                          <button className="mt-5 btn btn-outline-info rounded-0 " onClick={() => setIsLogin(!isLogin)}>
                          {
                              isLogin ? 'Not a User? Register Now!' : 'Already a User? Login'
                          }
                          </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}