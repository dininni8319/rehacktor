import classes from './Info.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faTag, faUsers, faPlayCircle, faBars, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

export default function Info() {
    return (

          <div className={`${'container-fluid'} ${'my-5'} ${classes["bg-info"]}`}>
              <div className="container">
                  <div className={"row px-3 pt-5" + classes.info}>

                  <div className="col-12 col-lg-4 my-5 px-3">
                          <h3 className={classes['info-title']}>
                              Register Now
                          </h3>
                          <p className='pt-2'>Register now, it's totally free!</p>
                      </div>
                      <div className="col-12 col-lg-4 my-5 px-3">
                          <h3 className={classes['info-title']}>
                              Choose your game..
                          </h3>
                          <p className='pt-2'>Choose a game you possess and start playing.</p>
                      </div>
                      <div className="col-12 col-lg-4 my-5 px-3">
                          <h3 className={ classes['info-title']}>
                              ... start your stream!
                          </h3>
                          <p className='pt-2'>Share your game experience with your friends!</p>
                      </div>
                  </div>
              </div>
              <div className={"row px-3 pt-5" + classes.info}>
              <div className="col-6 col-md-4 my-5 text-center text-md-start">
                      <FontAwesomeIcon icon={faGamepad} className='fa-2x text-main' />
                      {/* <i className='fal fa-gamepad-alt fa-2x text-main'></i> */}
                      <p className="h2 my-2 text-main">19</p>
                      <p>Games</p>
                  </div>
                  <div className="col-6 col-md-4 my-5 text-center text-md-center">
                      <FontAwesomeIcon icon={faBars} className='fa-2x text-main' />
                      {/* <i className='fal fa-stream fa-2x text-main'></i> */}
                      <p className="h2 my-2 text-main">19</p>
                      <p>Categories</p>
                  </div>
                  <div className="col-6 col-md-4 my-5 text-center text-md-end">
                      <FontAwesomeIcon icon={faPlayCircle} className='fa-2x text-main' />
                      {/* <i className='fal fa-joystick fa-2x text-main'></i> */}
                      <p className="h2 my-2 text-main">51</p>
                      <p>Platforms</p>
                  </div>
                  <div className="col-6 col-md-4 my-5 text-center text-md-start">
                      <FontAwesomeIcon icon={faUsers} className='fa-2x text-main' />
                      {/* <i className='fal fa-users fa-2x text-main'></i> */}
                      <p className="h2 my-2 text-main">48674</p>
                      <p>Publishers</p>
                  </div>
                  <div className="col-6 col-md-4 my-5 text-center text-md-center">
                      <FontAwesomeIcon icon={faTag} className='fa-2x text-main' />
                      {/* <i className='fal fa-tag fa-2x text-main'></i> */}
                      <p className="h2 my-2 text-main">7363</p>
                      <p>Tags</p>
                  </div>
                  <div className="col-6 col-md-4 my-5 text-center text-md-end">
                      <FontAwesomeIcon icon={faHandsHelping} className='fa-2x text-main' />
                      {/* <i className='fal fa-hands-helping fa-2x text-main'></i> */}
                      <p className="h2 my-2 text-main">24935</p>
                      <p>Creaters</p>
                  </div>
              </div>
          </div>
    )
}