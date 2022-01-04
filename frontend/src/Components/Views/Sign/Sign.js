import classes from './Sign.module.css';
import { useState } from 'react';

export default function Sign(params) {

    const [signed , setSigned ] = useState(null);

    return (
            <div className={`${'container-fluid'} ${classes.bg}`}> 
                <div className="container">
                    <div className="row justify-content-center align-items-center min-vh-100">
                        <div className="col-12 col-md-8 col-lg-6">
                            <form className={classes.form}>
                                <div className={classes.top}></div>
                                <div className={classes.bottom}></div>
                                <div className="mb-5">
                                    <label className="form-label" htmlFor='userMail'> Inserisci la tua email</label>
                                    <input type="email" className="form-control" id="userMail"/>
                                </div>
                                <div className="mb-5">
                                    <label className="form-label" htmlFor='userPassword'> Inserisci la tua password</label>
                                    <input type="password" className="form-control" id="userPassword"/>
                                </div>
                                <div className="mb-5">
                                    <button type="submit" className="btn btn-outline-info px-5 rounded-0">Login</button>
                                </div>
                                <p> Not a user?Register now!</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}