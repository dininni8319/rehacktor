import classes from './SignUp.module.css';

export default function SignUp(params) {
   
    return (
        <>
            <form className={`${'sign-form'}`}>
                <div className={`${'sign-top'}`}></div>
                <div className={`${'sign-bottom'}`}></div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userMail'> Inserisci la tua email</label>
                    <input type="email" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userMail"/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userPassword'> Inserisci la tua password</label>
                    <input type="password" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userPassword"/>
                </div>
                <div className="mb-5">
                    <button type="submit" className="btn btn-outline-info px-5 rounded-0">Login</button>
                </div>
            </form>
            <p> Not a user?Register now!</p>
        </>
    )
}