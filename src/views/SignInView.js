import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { signIn } from '../state/currentUser/actionCreators'
import styles from './SignInView.scss'

let SignInView = ({
  history,
  dispatch
}) => {
  function handleOnClick () {
    dispatch(signIn()).then(() => {
      history.push('/')
    })
  }

  return (
    <div className={styles.SignInView}>
      <button
        type='button'
        onClick={handleOnClick}
        className='btn-google-signin'
      >
        Sign In with Google
      </button>
    </div>
  )
}

SignInView.displayName = 'SignInView'

SignInView.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

SignInView = withRouter(SignInView)

export default connect()(SignInView)
