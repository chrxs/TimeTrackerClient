import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCurrentUser } from 'state/currentUser/reducer'
import { signOut } from 'state/currentUser/actionCreators'

import Navigation from './Navigation'

const mapStateToProps = (state) => {
  return {
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
  )(Navigation)
)
