import Video from './../../../Assets/video.mp4';
import classes from './Header.module.css';

export default function Header(params) {
   
    return (
        <header>
           <div className={classes.overlay}>
               <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <h1 className="font-exan text-main">REHACkTOR</h1>
                  <p>Explore Rehacktor, the only site that allow you to discover new games</p>
                  <p>and share experience with your friends!</p>
               </div>
           </div>
          
            <video playsInline autoPlay muted loop>
               <source src={Video} type="video/mp4" />
            </video>

            <div className={classes.container + 'h-100'}>
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                     {/* <h1 className="display-3">Video Header</h1>
                         <p className="lead mb-0">Using HTML5 Video and Bootstrap</p> */}
                    </div>
                </div>
            </div>
        </header>

   )  
}