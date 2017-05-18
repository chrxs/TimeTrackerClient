import React from 'react'
import PropTypes from 'prop-types'

import TimeRecordField from './TimeRecordField'

class TimeRecordsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timeRecords: []
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renderTimeRecordField = this.renderTimeRecordField.bind(this)
  }

  componentDidMount () {
    this.prepareDataFromProps(this.props.timeRecords)
  }

  componentWillReceiveProps (nextProps) {
    this.prepareDataFromProps(nextProps.timeRecords)
  }

  prepareDataFromProps (timeRecords) {
    timeRecords = timeRecords.map(timeRecord => {
      return {
        id: timeRecord.id,
        projectId: timeRecord.project.id.toString(),
        amount: timeRecord.amount.toString()
      }
    })
    timeRecords.push({ projectId: '', amount: '0' })
    this.setState({ timeRecords })
  }

  handleOnSubmit (evt) {
    evt.preventDefault()
    const { year, month, day } = this.props
    this.props.saveDay({
      year,
      month,
      day,
      timeRecords: this.state.timeRecords.filter(timeRecord => Boolean(timeRecord.projectId) && timeRecord.amount > 0)
    })
  }

  handleOnChange (timeRecordIndex, name, value) {
    const timeRecords = [
      ...this.state.timeRecords.slice(0, timeRecordIndex),
      {
        ...this.state.timeRecords[timeRecordIndex],
        [name]: value
      },
      ...this.state.timeRecords.slice(timeRecordIndex + 1)
    ]
    const lastTimeRecord = timeRecords[timeRecords.length - 1]
    if (lastTimeRecord.projectId.length && lastTimeRecord.amount > 0) {
      timeRecords.push({ projectId: '', amount: '0' })
    }
    this.setState({ timeRecords })
  }

  renderTimeRecordFields () {
    return this.state.timeRecords.map(this.renderTimeRecordField)
  }

  renderTimeRecordField (timeRecord, index) {
    return <TimeRecordField
      key={index}
      index={index}
      projectId={timeRecord.projectId}
      amount={timeRecord.amount}
      projects={this.props.projects}
      onChange={this.handleOnChange}
    />
  }

  render () {
    return (
      <form onSubmit={this.handleOnSubmit}>
        { this.renderTimeRecordFields() }
        <button type='submit'>SAVE</button>
      </form>
    )
  }
}

TimeRecordsForm.displayName = 'TimeRecordsForm'

TimeRecordsForm.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  timeRecords: PropTypes.array.isRequired,
  saveDay: PropTypes.func.isRequired
}

export default TimeRecordsForm
