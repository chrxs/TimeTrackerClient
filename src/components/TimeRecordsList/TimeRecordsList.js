import React from 'react'
import PropTypes from 'prop-types'

import TimeRecord from './TimeRecord'

const TimeRecordsList = ({
  timeRecords
}) => {
  return (
    <div>
      { timeRecords.map((timeRecord) => <TimeRecord key={timeRecord.id} timeRecord={timeRecord} />) }
    </div>
  )
}

TimeRecordsList.displayName = 'TimeRecordsList'

TimeRecordsList.propTypes = {
  timeRecords: PropTypes.array.isRequired
}

export default TimeRecordsList
