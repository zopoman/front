import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import Usuarios from '../pages/Usuarios';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/usuarios" component={Usuarios}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
