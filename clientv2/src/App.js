import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import YourRecipes from './pages/YourRecipes';
import AllRecipes from './pages/AllRecipes';
import Recipe from './pages/Recipe';
import EditRecipe from './pages/EditRecipe';

import Navigation from './components/Navigation';
import { loadUser } from './redux/actions/authActions';
import { store } from './redux/store';
import { Container } from '../src/styles/Structure';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Router>
      <Navigation />
      <Switch>
        <Container>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/home" exact component={Home} />
          <Route path="/myrecipes" exact component={YourRecipes} />
          <Route path="/allrecipes" exact component={AllRecipes} />
          <Route path="/recipe" exact component={Recipe} />
          <Route path="/recipe/edit" exact component={EditRecipe} />
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
