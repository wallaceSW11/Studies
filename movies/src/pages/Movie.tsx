import { useCallback, useEffect, useState } from "react";
import MovieModel from "../models/MovieModel";
import MoviesData from "../services/api";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { MovieDetail } from "../components/moviedetail/MovieDetail";



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
    <>
      <Link to="/" ><Button size="small" variant="outlined" startIcon={<ArrowBack />}>Go back</Button></Link>
      <MovieDetail movie={movie} />
    </>
  )
}