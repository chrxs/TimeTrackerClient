import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getCurrentUser, isAuthenticated } from 'state/currentUser/reducer'
import * as currentUserActions from 'state/currentUser/actionCreators'
import * as projectActions from 'state/projects/actionCreators'

import Navigation from 'components/Navigation'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectsIndexView from 'views/projects/index'
import ProjectsShowView from 'views/projects/show'
import ProjectsNewView from 'views/projects/new'
import ProjectsEditView from 'views/projects/edit'
import DayView from 'views/DayView'
import MonthView from 'views/MonthView'
import YearView from 'views/YearView'

import styles from './ApplicationLayout.scss'

class ApplicationLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }

    this.doSignOut = this.doSignOut.bind(this)
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.loadData()
    } else {
      this.setState({ isLoading: false })
    }
  }

  loadData () {
    this.setState({ isLoading: true })
    this.props.fetchCurrentUser()
      .then(this.props.fetchAllProjects)
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  doSignOut () {
    const { signOut, history } = this.props
    signOut().then(() => history.push('/'))
  }

  render () {
    const { currentUser, isAuthenticated } = this.props

    if (this.state.isLoading) {
      return <LoadingSpinner size={50} strokeWidth={3} centered />
    }

    if (!isAuthenticated) {
      return <Route render={props => <Redirect to='/signin' />} />
    }

    return (
      <div className={styles.ApplicationLayout}>
        <Switch>
          <Route exact path='/projects/new' component={ProjectsNewView} />
          <Route exact path='/projects/:id/edit' component={ProjectsEditView} />
          <Route exact path='/projects/:id' component={ProjectsShowView} />
          <Route exact path='/projects' component={ProjectsIndexView} />

          <Route exact path='/:year/:month/:day' component={DayView} />
          <Route exact path='/:year/:month' component={MonthView} />
          <Route exact path='/:year' component={YearView} />
          <Route exact path='/' component={DayView} />
        </Switch>

        <Navigation
          currentUser={currentUser}
          signOut={this.doSignOut}
        />
      </div>
    )
  }
}

ApplicationLayout.displayName = 'ApplicationLayout'

ApplicationLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  history: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchAllProjects: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser () {
      return dispatch(currentUserActions.fetchCurrentUser())
    },
    fetchAllProjects () {
      return dispatch(projectActions.fetchAllProjects())
    },
    signOut () {
      return dispatch(currentUserActions.signOut())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ApplicationLayout)
)
