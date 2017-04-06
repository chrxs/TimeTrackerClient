import React, { PropTypes } from 'react'
import {
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'

import AuthenticationService from '../../services/AuthenticationService'

const SignOutButton = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => {
      AuthenticationService.signout(
        () => history.push('/')
      )
    }}
  >
    Sign out
  </button>
))

const ApplicationLayout = ({component: Component, ...rest}) => {
  if (!AuthenticationService.isAuthenticated) {
    return <Route {...rest} render={props => <Redirect to='/signin' />} />
  }
  return (
    <Route {...rest} render={matchProps => (
      <div className='application-layout'>
        <header>
          <h1>APPLICATION LAYOUT</h1>
          <nav>
            <ul>
              <li><Link to='/'>HOME</Link></li>
              <li>
                <SignOutButton />
              </li>
            </ul>
          </nav>
        </header>
        <Component {...matchProps} />
        <footer>Footer</footer>
      </div>
    )} />
  )
}

ApplicationLayout.displayName = 'ApplicationLayout'

ApplicationLayout.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
}

export default ApplicationLayout
