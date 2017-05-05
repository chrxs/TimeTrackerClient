import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as currentUserActions from 'state/currentUser/actionCreators'
import SlackSignInButton from 'components/SlackSignInButton'
import styles from './SignInView.scss'

const SignInView = ({
  history,
  isLoading,
  signInViaSlack
}) => {
  function handleOnClick () {
    signInViaSlack().then(() => history.push('/'))
  }

  return (
    <div className={styles.SignInView}>
      <SlackSignInButton
        onClick={handleOnClick}
        disabled={isLoading}
      />
    </div>
  )
}

SignInView.displayName = 'SignInView'

SignInView.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  signInViaSlack: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.currentUser.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInViaSlack () {
      return dispatch(currentUserActions.signInViaSlack())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInView)
)
