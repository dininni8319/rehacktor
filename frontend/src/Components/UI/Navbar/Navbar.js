import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faUserCircle,
  faSignOutAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/js/src/collapse.js";
import { AuthContext } from "../../../Contexts/Auth";
import { StreamingContext } from "../../../Contexts/Streaming";
import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import { formatUsername } from "../../../utilities/functions";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isStreaming } = useContext(StreamingContext);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  
  const renderNotAuthenticatedLinks = () => (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/search/action/1">
          Search
        </NavLink>
      </li>
      {!user && (
        <li className="nav-item">
          <NavLink className="nav-link" to="/sign">
            Login
          </NavLink>
        </li>
      )}
    </>
  )
  const renderAuthenticatedLinks = () => (
    <>
      <li className="nav-item">
        {modal && (
          <Modal
            closeModal={closeModal}
            title="O no..."
            message="Vuoi gia lasciarci, ricorda che eventuali streeming in corso saranno interrotti"
            confirmMessage="Esci"
            declineMessage="Rimani sulla pagina"
            action={logout}
          />
        )}
      </li>
      <li className="nav-item">
        <NavLink
          to="/streamers"
          
          className="nav-link me-2"
        >
          Streamers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/profile"
          className="me-2 nav-link"
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            className="fa-1x mx-1 text-warning"
          >
          </FontAwesomeIcon>
          <span>
           {user.username ? formatUsername(user.username) : "Welcome User"}
          </span>

          {isStreaming && (
            <FontAwesomeIcon
              icon={faCircle}
              className={`fa-1x mx-1 ${classes["bg-streaming"]}`}
            ></FontAwesomeIcon>
          )}
        </NavLink>
      </li>

      <li className="nav-item">
        <button
          className="text-decoration-none text-white d-flex me-2 bg-transparent"
          onClick={() => setModal(true)}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="fa-1x mx-1 text-main"
          ></FontAwesomeIcon>
        </button>
      </li>
    </>
  )
  return (
    <nav
      className={`${"navbar"} ${"navbar-expand-lg"} ${"navbar-dark"} ${"bg-dark"} ${
        classes.navbar
      }`}
    >
      <div className="container-fluid">
        <Link className={classes["navbar-brand"]} to="/">
          <FontAwesomeIcon icon={faSpinner} className="fa-1x text-main mx-1" />
          REHACkTOR
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex align-items-end ms-md-auto align-items-md-center">
            {renderNotAuthenticatedLinks()}

            {user && (
              renderAuthenticatedLinks()
            )}
          </ul>
        </div>
        <div className={classes.navLogo}></div>
      </div>
    </nav>
  );
}
