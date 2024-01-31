import { useState, useContext, createContext } from "react";
import { ConfigContext } from "./../Config";
import { logoutUser } from "../../Services/authServices";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const initialUser = localStorage.getItem("user"); // store data across browser section. The data persists even when the browsing session ends.

  let { api_urls } = useContext(ConfigContext);

  const [user, setUser] = useState(JSON.parse(initialUser));

  const login = (username, token, id) => {
    const obj = {
      username: username,
      token: token,
      id: id,
    };
    setUser(obj);
    localStorage.setItem("user", JSON.stringify(obj));
  };

  const logout = async () => {
    try {
      const response = await logoutUser(api_urls.backend, user.token)
      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("user");
        setUser(null);
      } else {
        alert("An error accured while logging out");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
