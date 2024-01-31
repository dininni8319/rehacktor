import { useContext } from "react";
import useInput from "../../../Hooks/useInput";
import { useNavigate } from "react-router";
import { AuthContext } from "./../../../Contexts/Auth";
import { ConfigContext } from "./../../../Contexts/Config";
import { 
  registerUser, 
  loginUser, 
  viewProfile
} from "../../../Services/authServices";

export default function SignIn() {
  const navigate = useNavigate();
  const username = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");

  const { api_urls } = useContext(ConfigContext);
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await registerUser(
        api_urls.backend, 
        username.value, 
        email.value, 
        password.value, 
        passwordConfirm.value
      );

      if (response.ok) {
        return true;
      } else {
        alert("Registration failed. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      alert("An error occurred during registration. Please try again.");
      return false;
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(
        api_urls.backend, 
        email.value, 
        password.value
      );
      const data = await response.json();

      if (response.ok) {
        return data.token;
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

      if (response.ok) {
        return data.data;
      } else {
        alert("Failed to fetch user profile.");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while fetching user profile:", error);
      alert("An error occurred while fetching user profile. Please try again.");
      return null;
    }
  };

  const signup = async (event) => {
    event.preventDefault();

    if (password.value === passwordConfirm.value) {
      const isRegistered = await handleRegister();

      if (isRegistered) {
        const token = await handleLogin();

        if (token) {
          const userProfile = await handleViewProfile(token);

          if (userProfile) {
            login(
              userProfile.name, 
              token, 
              userProfile.id
            );
            navigate("/");
          }
        }
      }
    } else {
      alert("The passwords do not match");
    }
  };

  return (
    <>
      <form className={`${"sign-form"}`} onSubmit={signup}>
        <div className={`${"sign-top"}`}></div>
        <div className={`${"sign-bottom"}`}></div>
        <div className="mb-5">
          <label className="form-label" htmlFor="userName">
            Enter your User Name
          </label>
          <input
            type="text"
            className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white"
            id="userName"
            {...username}
          />
        </div>
        <div className="mb-5">
          <label className="form-label" htmlFor="userMail">
            Enter your Email
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
            Enter a new Password
          </label>
          <input
            type="password"
            className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white"
            id="userPassword"
            {...password}
          />
        </div>
        <div className="mb-5">
          <label className="form-label" htmlFor="userPasswordConfirm">
            Confirm the entered Password
          </label>
          <input
            type="password"
            className="form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white"
            id="userPasswordConfirm"
            {...passwordConfirm}
          />
        </div>
        <div className="mb-5">
          <button 
            type="submit" 
            className="btn btn-outline-info px-5 rounded-0"
            disabled={
              !(
                email.value && 
                password.value && 
                password.value 
              ) 
            }
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}
