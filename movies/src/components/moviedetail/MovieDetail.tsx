import MovieModel from "../../models/MovieModel";
import './style.css'

interface MovieDetailProps {
  movie?: MovieModel
}

export function MovieDetail( { movie }: MovieDetailProps) {
  return (
    <div className="movie-container">
      <div className="movie-image">
        <img src={movie?.image} alt="" />
      </div>
      <div className="movie-content">
        <div className="movie-title">
          <p><b>{`${movie?.title} (${movie?.year})`}</b></p>
        </div>
        <div className="movie-synopsis">
          <span>{movie?.synopsis}</span>
        </div>
        <div>
          <div>Cast</div>  
        </div>
      </div>
    </div>
  )
}