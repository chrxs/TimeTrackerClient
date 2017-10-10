import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './App.scss'
import 'babel-polyfill'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import SignInView from 'views/SignIn/SignInView'
import AppRoutes from 'views/AppRoutes'

import { store } from 'state'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signin' component={SignInView} />
          <Route path='/' component={AppRoutes} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

App.displayName = 'App'

export default App
