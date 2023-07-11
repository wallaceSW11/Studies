import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"


import Movie from './pages/Movie';
import Movies from './pages/Movies';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <div >
      <NavBar />
      <div className='container'>
        <BrowserRouter >
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/{id}" element={<Movie />} />
        </Routes>
        </BrowserRouter>  
      </div>
    </div>
    
  );
}

export default App;

