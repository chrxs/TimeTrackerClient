import React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut } from '../../state/currentUser/actionCreators'
import { isAuthenticated, getCurrentUser } from '../../state/currentUser/reducer'
import Avatar from '../../components/Avatar'
import styles from './ApplicationLayout.scss'

const ApplicationLayout = ({
  currentUser,
  isAuthenticated,
  history,
  signOut,
  component: Component,
  ...rest
}) => {
  if (!isAuthenticated) {
    return <Route {...rest} render={props => <Redirect to='/signin' />} />
  }

  function handleOnClick () {
    signOut().then(() => history.push('/'))
  }

  return (
    <Route {...rest} render={matchProps => (
      <div className={styles.applicationLayout}>
        <header>
          <h1>Time Tracker</h1>
          <Avatar imageUrl={currentUser.image} />
          {currentUser.name}
          <nav>
            <ul>
              <li><Link to='/'>HOME</Link></li>
              <li><Link to='/signin'>SIGN IN</Link></li>
              <li>
                <button
                  type='button'
                  onClick={handleOnClick}
                  className='btn btn-signout'
                >
                  Sign out
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <Component {...matchProps} />
      </div>
    )} />
  )
}

ApplicationLayout.displayName = 'ApplicationLayout'

ApplicationLayout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUser: getCurrentUser(state),
    isAuthenticated: isAuthenticated()
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
