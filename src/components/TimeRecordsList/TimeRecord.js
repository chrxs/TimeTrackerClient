import React from 'react'
import PropTypes from 'prop-types'

const TimeRecord = ({
  timeRecord
}) => {
  return (
    <div>
      { timeRecord.project.name }
      { Math.floor(timeRecord.amount / 60) }H
      { Math.floor(timeRecord.amount % 60) }m
    </div>
  )
}

TimeRecord.displayName = 'TimeRecord'

TimeRecord.propTypes = {
  timeRecord: PropTypes.object.isRequired
}

export default TimeRecord
