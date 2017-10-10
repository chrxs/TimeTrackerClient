import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const TimeRecord = ({
  timeRecord
}) => {
  return (
    <div className={styles.TimeRecord}>
      { timeRecord.client.name }
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
