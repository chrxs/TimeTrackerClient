import React, { PropTypes } from 'react'
import { Link, Route } from 'react-router-dom'

const AuthenticationLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className='DefaultLayout'>
        <header>
          <h1>AUTH LAYOUT</h1>
          <nav>
            <ul>
              <li><Link to='/'>HOME</Link></li>
              <li><Link to='/signin'>Sign In</Link></li>
            </ul>
          </nav>
        </header>
        <Component {...matchProps} />
        <footer>Footer</footer>
      </div>
    )} />
  )
}

AuthenticationLayout.displayName = 'AuthenticationLayout'

AuthenticationLayout.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
}

export default AuthenticationLayout
