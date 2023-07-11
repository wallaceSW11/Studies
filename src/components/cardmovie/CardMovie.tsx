import Movie from "../../models/MovieModel";
import "./style.css"

export default function CardMovie({ movie } : { movie : Movie}) {
  return (
    <div className="card-movie">
      <div className="content">
        <div className="card-image">
          { movie.image ? <img src={movie.image}></img> : null}
        </div>
        <div className="card-content">
          <div className="card-text">
            <h3>{`${movie.title} (${movie.year})`}</h3>
            <p>{movie.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  )
}