import { useCallback, useEffect, useState } from "react"
import CardMovie from "../components/cardmovie/CardMovie"
import MovieModel from "../models/MovieModel"
import MoviesData from "../services/api";

export default function Movies() {
  const [list, setList] = useState<MovieModel[]>();

  function getMovies() {
    let movies = MoviesData;
    if (movies && !movies.length) return;
    setList(movies);
  }

  const load = useCallback(() => {
    getMovies();
  }, []);

  useEffect(() => load, [load]);

  return (
    <div className='container'>
      <h1>Tendencies</h1>
      <br />
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "5px"}}>
        {list && list.map(item => <CardMovie key={item.id} movie={item} />) || <p>Ops, no movies found</p>}
      </div>
    </div>
  )
}