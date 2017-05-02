import 'normalize.css'
import './App.scss'
import 'babel-polyfill'
import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Provider, connect } from 'react-redux'

import LoadingSpinner from 'components/LoadingSpinner'
import ApplicationLayout from 'views/layouts/ApplicationLayout'
import AuthenticationLayout from 'views/layouts/AuthenticationLayout'
import DayView from 'views/DayView'
import MonthView from 'views/MonthView'
import YearView from 'views/YearView'
import SignInView from 'views/SignInView'
import { store } from 'state'
import { isAuthenticated } from 'state/currentUser/reducer'
import { fetchCurrentUser } from 'state/currentUser/actionCreators'

class AppRoutes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.fetchCurrentUser()
        .then(() => { this.setState({ isLoading: false }) })
    } else {
      this.setState({ isLoading: false })
    }
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingSpinner
        size={50}
        strokeWidth={3}
        centered
      />
    }
    return (
      <BrowserRouter>
        <div>
          <ApplicationLayout exact path='/' component={DayView} />
          <ApplicationLayout exact path='/:year/:month/:day' component={DayView} />
          <ApplicationLayout exact path='/:year/:month' component={MonthView} />
          <ApplicationLayout exact path='/:year' component={YearView} />
          <AuthenticationLayout path='/signin' component={SignInView} />
        </div>
      </BrowserRouter>
    )
  }
}

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser () {
      return dispatch(fetchCurrentUser())
    }
  }
}

const AppRoutesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoutes)

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutesConnected />
    </Provider>
  )
}

export default App
