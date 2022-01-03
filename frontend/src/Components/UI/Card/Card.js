import classes from './Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
        <div className={classes['card-game']}>
            <img src={props.image} alt='test' />
            <p>{props.name}</p>          
            <Link to={`/game/${props.slug}`} className="d-flex">
                <FontAwesomeIcon icon={faChevronCircleRight} className='fa-2x text-white text-decoration-none'/> 
            </Link>
            <div></div>
            <div></div>
        </div>
    )
}