import { useState } from "react"
import CardMovie from "../components/cardmovie/CardMovie"
import MovieModel from "../models/MovieModel"

export default function Movies() {
  const [list, setList] = useState<MovieModel[]>(  
  [
    {
      title: '+Fast +Furios',
      year: 2012,
      type: 'Action',
      duration: '2h 15m',
      synopsis: 'lorem ipsom adasfasf',
      image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tMUnCAgfARTdAu8ylPw4Wjh3e5N.jpg'
    },
    
    {
      title: 'Courageous',
      year: 2011,
      type: 'Religion',
      duration: '2h 5m',
      synopsis: 'lorem ipsom adasfasf',
      image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/gvp6uecYSWQn8cV0fGZ6j1g1Kvx.jpg'
    },
    {
      title: 'Baby Driver',
      year: 2015,
      type: 'Action',
      duration: '1h 55m',
      synopsis: 'lorem ipsom adasfasf',
      image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1rYTtQ14rPB3KOgk5TjkUqiQFch.jpg'
    }
  ])


  return (
    <div className='container'>
      <h1>Tendencies</h1>
      <br />
      {list.map(item => <CardMovie movie={item} />)}
    </div>
  )
}