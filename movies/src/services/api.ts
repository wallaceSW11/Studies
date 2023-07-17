// will consume https://www.themoviedb.org/

import MovieModel from '../models/MovieModel';

const MoviesData: MovieModel[] = [ 
  {
    id: '0',
    title: 'Fast and Furious',
    year: 2001,
    type: 'Action, Crime, Thriller',
    duration: '1h 44m',
    synopsis: 'Um investigador da polícia se infiltra em uma turma de rachas suspeita de roubar caminhões, mas acaba apaixonando-se pela irmã do líder.',
    image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/zIMCfztNwx2rA6XWGaJhcqdG7Wt.jpg'
  }, 
  {
    id: '1',
    title: '+Fast +Furious',
    year: 2003,
    type: 'Action, Crime, Thriller',
    duration: '1h 47m',
    synopsis: 'O ex-policial Brian comete uma grande traição, juntando-se a um amigo ex-presidiário no transporte de dinheiro sujo para uma importadora-exportadora muito suspeita.',
    image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tMUnCAgfARTdAu8ylPw4Wjh3e5N.jpg'
  },
  
  {
    id: '2',
    title: 'Courageous',
    year: 2011,
    type: 'Religion',
    duration: '2h 5m',
    synopsis: 'lorem ipsom adasfasf',
    image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/gvp6uecYSWQn8cV0fGZ6j1g1Kvx.jpg'
  },
  {
    id: '3',
    title: 'Baby Driver',
    year: 2015,
    type: 'Action',
    duration: '1h 55m',
    synopsis: 'lorem ipsom adasfasf',
    image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1rYTtQ14rPB3KOgk5TjkUqiQFch.jpg'
  },
  {
    id: '4',
    title: 'Transformers: O Despertar das Feras',
    year: 2023,
    type: 'Action',
    duration: '2h 7m',
    synopsis: 'Transformers: O Despertar das Feras traz mais uma aventura épica pelo universo dos transformers. Ambientada nos anos 1990, o filme apresentará os Maximals, Predacons e Terrorcons à batalha existente na Terra entre Autobots e Decepticons.',
    image: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/zEqwfO5R2LrrLgV61xm8M9TmNTG.jpg'
  }
]

export default MoviesData;