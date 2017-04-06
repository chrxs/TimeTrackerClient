import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthenticationService from '../services/AuthenticationService'

const SignInButton = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => {
      AuthenticationService.authenticate(
        () => history.push('/')
      )
    }}
  >
    Sign In
  </button>
))

const SignInView = () => {
  return (
    <div>
      <h3>SIGN IN VIEW</h3>
      <SignInButton />
    </div>
  )
}

export default SignInView
