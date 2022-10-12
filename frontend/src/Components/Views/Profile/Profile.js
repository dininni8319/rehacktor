import { useContext } from "react";
import { AuthContext } from "./../../../Contexts/Auth";

export default function Profile(params) {
  const { user } = useContext(AuthContext);

  return (
    <div className="container min-vh-100">
      <div className="row min-vh-100">
        <div className="col-12 text-center mt-5">
          <h3 className="mt-5">Welcome, {user ? user.username : "Utente"}</h3>
        </div>
        <div className="col-12">Todo: Statistiche Utente!</div>
      </div>
    </div>
  );
}
