import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import App from './App.jsx'
import Home from './Home.jsx'

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path="/:id" component={App} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));