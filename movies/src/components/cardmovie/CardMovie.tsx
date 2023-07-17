import { Button } from "@mui/material";
import Movie from "../../models/MovieModel";
import "./style.css"
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function CardMovie({ movie } : { movie : Movie}) {
  return (
    <div className="card-movie">
      <div className="content">
        <div className="card-image">
          { movie.image ? <img src={movie.image}></img> : null}
        </div>
        <div className="card-content">
          <div className="card-text">
            <p>{`${movie.title} (${movie.year})`}</p>
          </div>
          <div className="card-action">
            <Link to={`/movie/${movie.id}`}><Button size="small" variant="outlined" startIcon={<Add />}>Details</Button> </Link> 
          </div>
        </div>
      </div>
    </div>
  )
}