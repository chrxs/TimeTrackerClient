import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as currentUserActions from '../state/currentUser/actionCreators'
import Button from '../components/Button'
import styles from './SignInView.scss'

const SignInView = ({
  history,
  isLoading,
  signInViaGoogle
}) => {
  function handleOnClick () {
    signInViaGoogle().then(() => history.push('/'))
  }

  return (
    <div className={styles.SignInView}>
      <Button
        label='Sign In with Google'
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
  signInViaGoogle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.currentUser.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInViaGoogle () {
      return dispatch(currentUserActions.signInViaGoogle())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInView)
)
