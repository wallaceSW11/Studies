import { useCallback, useEffect, useState } from "react";
import MovieModel from "../models/MovieModel";
import MoviesData from "../services/api";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";



export default function Movie() {
  const [movie, setMovie] = useState<MovieModel>();
  const { id } = useParams();

  function getMovie() {
    let movie = MoviesData.find(item => item.id == id);

    if (!movie) return;

    setMovie(movie);
  }

  const load = useCallback(() => getMovie(), []);

  useEffect(() => load, [load]);

  return (
    <div className="container">
      <Link to="/" ><Button variant="outlined" startIcon={<ArrowBack />}>Go back</Button></Link>
      <div>
        <div className="movie-image">
          <img src={movie?.image} alt="" />
        </div>
        <div>
          <div className="movie-title">{movie?.title}</div>
          <div className="movie-synpsis">{movie?.synopsis}</div>
          <div>
            <div>elenco</div>  
          </div>
        </div>
      </div>
    </div>
  )
}