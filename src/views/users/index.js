import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as userSelectors from 'state/users/reducer'
import * as userActions from 'state/users/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'
import LoadingSpinner from 'components/LoadingSpinner'
import Avatar from 'components/Avatar'

import styles from './styles.scss'

class UsersIndexView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    this.setState({ isLoading: true })
    this.props.fetchUsers()
      .then(() => this.setState({ isLoading: false }))
  }

  renderUsers () {
    const { users } = this.props
    // const users = [
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users,
    //   ...this.props.users
    // ]
    return (
      <div className={styles.Users}>
        { users.map(this.renderUser) }
      </div>
    )
  }

  renderUser (user, index) {
    return (
      <div
        key={user.id * index}
        className={styles.User}
      >
        <Avatar imageUrl={user.image} />
        {user.name}
      </div>
    )
  }

  render () {
    const { isLoading } = this.state
    return (
      <ApplicationLayout title='Users'>
        { isLoading && <LoadingSpinner size={50} strokeWidth={3} centered /> }
        { !isLoading && <div>{this.renderUsers()}</div> }
      </ApplicationLayout>
    )
  }
}

UsersIndexView.displayName = 'UsersIndexView'

UsersIndexView.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: userSelectors.getUsers(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers () {
      return dispatch(userActions.fetchUsers())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersIndexView)
)
