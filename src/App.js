import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './App.scss'
import 'babel-polyfill'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import ApplicationLayout from 'views/ApplicationLayout'
import SignInView from 'views/SignInView'

import { store } from 'state'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signin' component={SignInView} />
          <Route path='/' component={ApplicationLayout} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

App.displayName = 'App'

export default App
