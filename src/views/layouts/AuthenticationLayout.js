import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import styles from './AuthenticationLayout.scss'

const AuthenticationLayout = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className={styles.AuthenticationLayout}>
        <Component {...matchProps} />
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
