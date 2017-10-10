import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import moment from 'moment'

import * as userSelectors from 'state/users/reducer'
import * as clientSelectors from 'state/clients/selectors'
import * as daySelectors from 'state/days/reducer'
import * as dayActions from 'state/days/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'
import TimeRecordsList from 'components/TimeRecordsList'
import TimeRecordsForm from 'components/TimeRecordsForm'

import styles from './styles.scss'

const DATE_FORMAT = 'YYYY-MM-DD'

class DayView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }

    this.saveDay = this.saveDay.bind(this)
  }

  componentDidMount () {
    const [year, month, dayOfMonth] = this.props.date.split('-')
    this.fetchDay(year, month, dayOfMonth)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.date !== this.props.date) {
      const [year, month, dayOfMonth] = nextProps.date.split('-')
      this.fetchDay(year, month, dayOfMonth)
    }
  }

  fetchDay (year, month, dayOfMonth) {
    this.setState({ isLoading: true })
    this.props.fetchDay(year, month, dayOfMonth)
      .then(() => { this.setState({ isLoading: false }) })
  }

  saveDay (day = {}) {
    return this.props.saveDay(day)
  }

  renderTimeRecords () {
    return <TimeRecordsList
      timeRecords={this.props.day.timeRecords}
    />
  }

  renderDayForm () {
    const [year, month, day] = this.props.date.split('-')
    const { clients } = this.props
    const { timeRecords } = this.props.day
    return <TimeRecordsForm
      year={year}
      month={month}
      day={day}
      clients={clients}
      timeRecords={timeRecords}
      saveDay={this.saveDay}
    />
  }

  renderMain () {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }
    return (
      <div>
        { this.props.day && this.renderTimeRecords() }
        { this.renderDayForm() }
        <Link to={`${this.props.match.url}/edit`}>Edit</Link>
      </div>
    )
  }

  render () {
    const date = moment(this.props.date, DATE_FORMAT)
    const headerLeftActions = (
      <Link
        to={moment(date).subtract(1, 'day').format('/YYYY/MM/DD')}
        className={styles.headerLink}
      >
        <i className='fa fa-angle-left' />
      </Link>
    )
    const headerRightActions = (
      <Link
        to={moment(date).add(1, 'day').format('/YYYY/MM/DD')}
        className={styles.headerLink}
      >
        <i className='fa fa-angle-right' />
      </Link>
    )
    return (
      <ApplicationLayout
        title={date.format('dddd, Do MMMM YYYY')}
        headerLeftActions={headerLeftActions}
        headerRightActions={headerRightActions}
      >
        <main className={styles.main}>
          { this.renderMain() }
        </main>
      </ApplicationLayout>
    )
  }
}

DayView.displayName = 'DayView'

DayView.defaultProps = {
  day: {
    timeRecords: []
  }
}

DayView.propTypes = {
  date: PropTypes.string.isRequired,
  day: PropTypes.object,
  fetchDay: PropTypes.func.isRequired,
  saveDay: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const [year, month, dayOfMonth] = Object.values(pick(ownProps.match.params, ['year', 'month', 'day'])).map(v => parseInt(v, 10))
  const date = moment(new Date(year, month - 1, dayOfMonth)).format(DATE_FORMAT)
  const user = userSelectors.getCurrentUser(state)
  return {
    date,
    day: daySelectors.getDay(state, user.id, date),
    clients: clientSelectors.getClients(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDay (year, month, day) {
      return dispatch(dayActions.fetchDays(year, month, day))
    },
    saveDay (day) {
      return dispatch(dayActions.saveDay(day))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DayView)
)
