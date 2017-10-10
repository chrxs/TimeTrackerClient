import React from 'react'
import PropTypes from 'prop-types'

import TimeRecord from './TimeRecord'

import styles from './styles.scss'

const TimeRecordsList = ({
  timeRecords
}) => {
  return (
    <div className={styles.TimeRecordsList}>
      { timeRecords.map((timeRecord) => <TimeRecord key={timeRecord.id} timeRecord={timeRecord} />) }
    </div>
  )
}

TimeRecordsList.displayName = 'TimeRecordsList'

TimeRecordsList.propTypes = {
  timeRecords: PropTypes.array.isRequired
}

export default TimeRecordsList
