import Video from './../../../Assets/video.mp4';
import classes from './Header.module.css';

export default function Header(params) {
   
    return (
        <header>
           <div className={classes.overlay}>
           <h1 className="font-exan">REHACTOR</h1>
          <p className="text-wrap">Explore Rehacktor, the only site that alloe you to discover new games and share experience with your friends!</p>
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