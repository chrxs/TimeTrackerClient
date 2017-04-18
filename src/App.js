import 'normalize.css'
import './App.scss'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import ApplicationLayout from './views/layouts/ApplicationLayout'
import AuthenticationLayout from './views/layouts/AuthenticationLayout'
import HomeView from './views/HomeView'
import SignInView from './views/SignInView'
import { store } from './state'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <ApplicationLayout exact path='/' component={HomeView} />
          <AuthenticationLayout path='/signin' component={SignInView} />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
