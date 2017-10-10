import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import * as userSelectors from 'state/users/reducer'
import * as userActions from 'state/users/actionCreators'
import * as clientActions from 'state/clients/actionCreators'

import LoadingSpinner from 'components/LoadingSpinner'
import UsersIndexView from 'views/users/index'
import OverviewView from 'views/OverviewView'
import ClientsIndexView from 'views/clients/index'
import ClientsShowView from 'views/clients/show'
import ClientsNewView from 'views/clients/new'
import ClientsEditView from 'views/clients/edit'
import DayView from 'views/days/DayView'
import MonthView from 'views/days/MonthView'
import YearView from 'views/days/YearView'

class AppRoutes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
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
      .then(this.props.fetchAllClients)
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  render () {
    const { isAuthenticated } = this.props

    if (this.state.isLoading) {
      return <LoadingSpinner size={50} strokeWidth={3} centered />
    }

    if (!isAuthenticated) {
      return <Route render={props => <Redirect to='/signin' />} />
    }

    return (
      <Switch>
        <Route exact path='/clients/new' component={ClientsNewView} />
        <Route exact path='/clients/:id/edit' component={ClientsEditView} />
        <Route exact path='/clients/:id' component={ClientsShowView} />
        <Route exact path='/clients' component={ClientsIndexView} />

        <Route exact path='/overview' component={OverviewView} />

        <Route exact path='/users' component={UsersIndexView} />

        <Route path='/:year/:month/:day' component={DayView} />
        <Route path='/:year/:month' component={MonthView} />
        <Route path='/:year' component={YearView} />

        <Route exact path='/' render={props => <Redirect to={moment(new Date()).format('YYYY/MM/DD')} />} />
      </Switch>
    )
  }
}

AppRoutes.displayName = 'AppRoutes'

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchAllClients: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: userSelectors.getIsAuthenticated(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser () {
      return dispatch(userActions.fetchCurrentUser())
    },
    fetchAllClients () {
      return dispatch(clientActions.fetchAllClients())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoutes)
