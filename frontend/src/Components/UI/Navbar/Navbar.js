import classes from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        
        <nav className={`${'navbar'} ${'navbar-expand-lg'} ${'navbar-dark'} ${'bg-dark'} ${classes.navbar}`  }>
        <div className="container-fluid">
          <a className={classes["navbar-brand"]} to="">
          <FontAwesomeIcon icon={faSpinner} className='fa-1x text-main mx-1' />
            REHACkTOR
            </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search/action/1">Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/game">Game</Link>
              </li>
            </ul>
          </div>
          <div className={classes.navLogo}></div>
        </div>
      </nav>
    )
}