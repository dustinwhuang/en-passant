import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom'
import App from './App.jsx'
import Home from './Home.jsx'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/:id" component={App} />
      <Route path="/" component={Home} />
    </Switch>
  </HashRouter>
), document.getElementById('app'));