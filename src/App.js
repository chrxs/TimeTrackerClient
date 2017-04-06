import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ApplicationLayout from './views/layouts/ApplicationLayout'
import AuthenticationLayout from './views/layouts/AuthenticationLayout'
import HomeView from './views/HomeView'
import SignInView from './views/SignInView'

const App = React.createClass({
  render () {
    return (
      <BrowserRouter>
        <div>
          <ApplicationLayout exact path='/' component={HomeView} />
          <AuthenticationLayout path='/signin' component={SignInView} />
        </div>
      </BrowserRouter>
    )
  }
})

export default App
