import classes from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../Contexts/Auth';
import { useState, useContext } from 'react';
import Modal from '../Modal/Modal';

export default function Navbar() {
   
    const { user, logout } = useContext(AuthContext)
    
    const [ modal, setModal ] = useState(false)
    
    const closeModal = () => setModal(false)
    return (
        
        <nav className={`${'navbar'} ${'navbar-expand-lg'} ${'navbar-dark'} ${'bg-dark'} ${classes.navbar}`  }>
        <div className="container-fluid">
          <Link className={classes["navbar-brand"]} to="/">
          <FontAwesomeIcon icon={faSpinner} className='fa-1x text-main mx-1' />
            REHACkTOR
            </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search/action/1">Search</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/game">Game</Link>
              </li> */}
              {
                user === null && <li className="nav-item">
                <Link className="nav-link" to="/sign">Login</Link>
               </li>
              }

              {
                user && (
                  <>
                      <li className='nav-item'>

                          {modal && <Modal  closeModal={closeModal} 
                            title='O no...' 
                            message='Vuoi gia lasciarci, ricorda che eventuali streeming in corso saranno interrotti' 
                            confirmMessage='Esci'
                            declineMessage='Rimani sulla pagina' 
                            action={logout}
                          />}  
                          <Link to='/profile' className='text-decoration-none text-white d-flex me-2'>
                            <FontAwesomeIcon icon={faUserCircle} className='fa-1x mx-1 text-warning'></FontAwesomeIcon>
                            { user.username ? user.username : '' }
                            
                          </Link>
                      </li>
                      <li className='nav-item'>
                          <button className='text-decoration-none text-white d-flex me-2 bg-transparent' onClick={() => setModal(true)}>
                          <FontAwesomeIcon icon={faSignOutAlt} className='fa-1x mx-1 text-main'></FontAwesomeIcon>
                          </button>
                      </li>
                  
                  </>
                )
              }
            </ul>
          </div>
          <div className={classes.navLogo}></div>
        </div>
      </nav>
    )
}