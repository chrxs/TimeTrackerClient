import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { keyBy } from 'lodash'

import * as userSelectors from 'state/users/reducer'
import * as daySelectors from 'state/days/reducer'
import * as userActions from 'state/users/actionCreators'
import * as dayActions from 'state/days/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'
import LoadingSpinner from 'components/LoadingSpinner'
import TimeRecordsTable from 'components/TimeRecordsTable'

const moment = extendMoment(Moment)
const DATE_FORMAT = 'YYYY-MM-DD'

class OverviewView extends React.Component {
  constructor (props) {
    super(props)

    this.today = moment(new Date())
    this.state = {
      isLoading: true,
      dateRange: moment.range(
        moment(this.today).startOf('month'),
        moment(this.today).endOf('month')
      )
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    const { dateRange } = this.state
    const {
      fetchUsers,
      fetchDaysForUser
    } = this.props
    this.setState({ isLoading: true })
    fetchUsers()
      .then(users => {
        const promises = users.map(({ id }) => {
          return fetchDaysForUser(id, dateRange.start.format(DATE_FORMAT), dateRange.end.format(DATE_FORMAT))
        })
        return Promise.all(promises)
      })
      .then(() => this.setState({ isLoading: false }))
  }

  renderContent () {
    const { dateRange } = this.state
    const data = this.props.users.map(user => {
      return {
        user,
        days: keyBy(
          this.props.getDays(user.id, dateRange.start.format(DATE_FORMAT), dateRange.end.format(DATE_FORMAT)),
          'date'
        )
      }
    })
    return <TimeRecordsTable
      data={data}
      curentDate={this.today.format(DATE_FORMAT)}
      dateRangeDays={Array.from(dateRange.by('days'))}
    />
  }

  render () {
    const { isLoading, dateRange } = this.state
    return (
      <ApplicationLayout title={dateRange.start.format('MMMM')}>
        { isLoading && <LoadingSpinner size={50} strokeWidth={3} centered /> }
        { !isLoading && this.renderContent() }
      </ApplicationLayout>
    )
  }
}

OverviewView.displayName = 'OverviewView'

OverviewView.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchDaysForUser: PropTypes.func.isRequired,
  getDays: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: userSelectors.getUsers(state),
    getDays: (userId, startDate, endDate) => daySelectors.getDays(state, userId, startDate, endDate)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers () {
      return dispatch(userActions.fetchUsers())
    },
    fetchDaysForUser (userId, start, end) {
      return dispatch(dayActions.fetchDaysForUser(userId, start, end))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OverviewView)
)
