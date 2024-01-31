import useInput from "./../../../Hooks/useInput";
import { useNavigate } from "react-router";
import { AuthContext } from "./../../../Contexts/Auth/index";
import { useContext } from "react";
import { ConfigContext } from "./../../../Contexts/Config";
import { 
  loginUser, 
  viewProfile 
} from "../../../Services/authServices";

export default function SignUp() {
  const navigate = useNavigate();
  let { login } = useContext(AuthContext);
  let { api_urls } = useContext(ConfigContext);

  const email = useInput("");
  const password = useInput("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(
        api_urls.backend,
        email.value,
        password.value
      )
      const data = await response.json();

      if (response.ok) {
        return data.token
      } else {
        alert("Login failed. Please check your credentials.");
        return null;
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred during login. Please try again.");
      return null;
    }
  };

  const handleViewProfile = async (token) => {
    try {
      const response = await viewProfile(api_urls.backend, token);

      const data = await response.json();

      if(response.ok) {
        return data.data
      } else {
        alert("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("An error occurred while fetching user profile:", error);
      alert("An error occurred while fetching user profile. Please try again.");
      return null;
    }
  }

  const signin = async (event) => {
    event.preventDefault();
    const isLoggedIn = await handleLogin();
    if (isLoggedIn) {
       const token = await handleLogin();

      if (token) {
        const userProfile = await handleViewProfile(token);

        if (userProfile) {
          login(
            userProfile.name, 
            token, 
            userProfile.id
          );
          navigate('/');
        }
      }
    }
  };

  return (
    <form className={`${"sign-form"}`} onSubmit={signin}>
      <div className={`${"sign-top"}`}></div>
      <div className={`${"sign-bottom"}`}></div>
      <div className="mb-5">
        <label className="form-label" htmlFor="userMail">
          {" "}
          Inserisci la tua email
        </label>
        <input
          type="email"
          className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white"
          id="userMail"
          {...email}
        />
      </div>
      <div className="mb-5">
        <label className="form-label" htmlFor="userPassword">
          {" "}
          Inserisci la tua password
        </label>
        <input
          type="password"
          className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white"
          id="userPassword"
          {...password}
        />
      </div>
      <div className="mb-5">
        <button 
          type="submit" 
          className="btn btn-outline-info px-5 rounded-0"
          disabled={!email.value || !password.value}
        >
          Login
        </button>
      </div>
    </form>
  );
}
