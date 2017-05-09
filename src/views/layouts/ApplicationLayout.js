import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCurrentUser, isAuthenticated } from 'state/currentUser/reducer'
import { signOut } from 'state/currentUser/actionCreators'
import Navigation from 'components/Navigation'
import styles from './ApplicationLayout.scss'

const ApplicationLayout = ({
  isAuthenticated,
  component: Component,
  currentUser,
  signOut,
  history,
  ...rest
}) => {
  function doSignOut () {
    signOut().then(() => history.push('/'))
  }

  if (!isAuthenticated) {
    return <Route {...rest} render={props => <Redirect to='/signin' />} />
  }

  return (
    <Route {...rest} render={matchProps => (
      <div className={styles.applicationLayout}>
        <Component {...matchProps} />
        <Navigation
          currentUser={currentUser}
          signOut={doSignOut}
        />
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
  ]).isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  history: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(),
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut () {
      return dispatch(signOut())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ApplicationLayout)
)
