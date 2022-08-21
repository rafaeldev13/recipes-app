import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route path="/foods" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
