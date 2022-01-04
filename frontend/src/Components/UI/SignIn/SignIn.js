
export default function SignIn(params) {
   
    return (
        <>
            <form className={`${'sign-form'}`}>
                <div className={`${'sign-top'}`}></div>
                <div className={`${'sign-bottom'}`}></div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userName'>Enter your User Name</label>
                    <input type="text" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userName"/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userMail'>Enter your Email</label>
                    <input type="email" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userMail"/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userPassword'>Enter a new Password</label>
                    <input type="password" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userPassword"/>
                </div>
                <div className="mb-5">
                    <label className="form-label" htmlFor='userPasswordConfirm'>Confirm the entered Password</label>
                    <input type="password" className="form-control bg-transparent border-0 border-bottom border-info rounded-0" id="userPasswordConfirm"/>
                </div>
                <div className="mb-5">
                    <button type='submit' className="btn btn-outline-info px-5 rounded-0">Register</button>
                </div>
            </form>
        </>
    );
};