import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom'
import App from './App.jsx'

ReactDOM.render((
  <HashRouter>
     <Route path="/:id" component={App} />
  </HashRouter>
), document.getElementById('app'));