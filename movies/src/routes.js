import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Movies from './pages/Movies';

export default function Routes() {
  return (
    <BrowserRouter>
     <Switch>
       <Route exact path="/" component={Home} />
       <Route path="/movies" component={Movies} />
       <Route path="/movie" component={Movie} />
     </Switch>
    </BrowserRouter>
  );
}
