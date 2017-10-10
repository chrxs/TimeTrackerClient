import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as userActions from 'state/users/actionCreators'
import SlackSignInButton from 'components/SlackSignInButton'
import styles from './styles.scss'

const SignInView = ({
  history,
  signInViaSlack
}) => {
  function handleOnClick () {
    signInViaSlack().then(() => history.push('/'))
  }

  return (
    <div className={styles.SignInView}>
      <SlackSignInButton
        onClick={handleOnClick}
      />
    </div>
  )
}

SignInView.displayName = 'SignInView'

SignInView.propTypes = {
  history: PropTypes.object.isRequired,
  signInViaSlack: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInViaSlack () {
      return dispatch(userActions.signInViaSlack())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInView)
)
