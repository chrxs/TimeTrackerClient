import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Navigation from 'components/Navigation'
import { isAuthenticated } from 'state/currentUser/reducer'
import styles from './ApplicationLayout.scss'

const ApplicationLayout = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  if (!isAuthenticated) {
    return <Route {...rest} render={props => <Redirect to='/signin' />} />
  }
  return (
    <Route {...rest} render={matchProps => (
      <div className={styles.applicationLayout}>
        <Component {...matchProps} />
        <Navigation />
      </div>
    )} />
  )
}

ApplicationLayout.displayName = 'ApplicationLayout'

ApplicationLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated()
  }
}

export default withRouter(
  connect(
    mapStateToProps
  )(ApplicationLayout)
)
