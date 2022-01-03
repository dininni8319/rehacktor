import classes from './Genres.module.css';

export default function GenresList(props) {
      return (
        <div className={classes['genres-wrapper']}>
            {
                props.data.map(genre => {
                        return <button key={genre.id} className="btn btn-outline-info rounded-0 d-block w-100 mb-2 text-start">{genre.name}</button>
                })
            }
        </div>

      )

}