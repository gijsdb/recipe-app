import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import YourRecipes from './pages/YourRecipes';
import AllRecipes from './pages/AllRecipes';
import EditRecipe from './pages/EditRecipe';

import { loadUser } from './redux/actions/authActions';
import { store } from './redux/store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Home} />
        <Route path="/recipe" exact component={Recipe} />
        <Route path="/recipe/edit" exact component={EditRecipe} />
        <Route path="/myrecipes" exact component={YourRecipes} />
        <Route path="/allrecipes" exact component={AllRecipes} />
      </Switch>
    </Router>
  );
}

export default App;
