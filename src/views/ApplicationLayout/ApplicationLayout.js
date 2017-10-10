import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as userSelectors from 'state/users/reducer'
import * as userActions from 'state/users/actionCreators'

import Header from 'components/Header'
import Navigation from 'components/Navigation'

import styles from './ApplicationLayout.scss'

class ApplicationLayout extends React.Component {
  constructor (props) {
    super(props)
    this.doSignOut = this.doSignOut.bind(this)
  }

  doSignOut () {
    const { signOut, history } = this.props
    signOut().then(() => history.push('/'))
  }

  render () {
    const {
      children,
      title,
      headerLeftActions,
      headerRightActions,
      currentUser
    } = this.props
    return (
      <div className={styles.applicationLayout}>
        <Header
          className={styles.header}
          title={title}
          leftActions={headerLeftActions}
          rightActions={headerRightActions}
        />
        <div className={styles.content}>
          <div className={styles.container}>
            {children}
          </div>
        </div>
        <Navigation
          currentUser={currentUser}
          signOut={this.doSignOut}
          className={styles.navigation}
        />
      </div>
    )
  }
}

ApplicationLayout.displayName = 'ApplicationLayout'

ApplicationLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ]),
  title: PropTypes.string.isRequired,
  headerLeftActions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ]),
  headerRightActions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ]),
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

ApplicationLayout.defaultProps = {
  children: {}
}

const mapStateToProps = (state) => {
  return {
    currentUser: userSelectors.getCurrentUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut () {
      return dispatch(userActions.signOut())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ApplicationLayout)
)
