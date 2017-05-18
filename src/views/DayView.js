import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import moment from 'moment'

import * as currentUserSelectors from 'state/currentUser/reducer'
import * as projectSelectors from 'state/projects/reducer'
import * as daySelectors from 'state/days/reducer'
import * as dayActions from 'state/days/actionCreators'

import DateHeader from 'components/DateHeader'
import TimeRecordsList from 'components/TimeRecordsList'
import TimeRecordsForm from 'components/TimeRecordsForm'

import styles from './DayView.scss'

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
    const { projects } = this.props
    const { timeRecords } = this.props.day
    return <TimeRecordsForm
      year={year}
      month={month}
      day={day}
      projects={projects}
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
      </div>
    )
  }

  render () {
    const [year, month, dayOfMonth] = this.props.date.split('-')
    return (
      <div className={styles.DayView}>
        <DateHeader
          year={year}
          month={month}
          day={dayOfMonth}
        />
        <main className={styles.main}>
          { this.renderMain() }
        </main>
      </div>
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
  projects: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const [year, month, dayOfMonth] = Object.values(pick(ownProps.match.params, ['year', 'month', 'day'])).map(v => parseInt(v, 10))
  const date = !!year && !!month && !!dayOfMonth
    ? moment(new Date(year, month - 1, dayOfMonth)).format('YYYY-MM-DD')
    : moment().format('YYYY-MM-DD')
  const user = currentUserSelectors.getCurrentUser(state)
  return {
    date,
    day: daySelectors.getDay(state, date, user.id),
    projects: projectSelectors.getProjects(state)
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
