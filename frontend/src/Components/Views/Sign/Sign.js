import classes from './Sign.module.css';
import { useState } from 'react';
import SignUp from '../../UI/SignUp/SignUp';

export default function Sign(params) {

    const [signed , setSigned ] = useState(null);

    return (
            <div className={`${'container-fluid'} ${classes.bg}`}> 
                <div className="container">
                    <div className="row justify-content-center align-items-center min-vh-100">
                        <div className="col-12 col-md-8 col-lg-6">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>
    )
}