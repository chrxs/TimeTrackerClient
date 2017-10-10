import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const TimeRecordsRow = ({
  dateRangeDays,
  user,
  days
}) => {
  function renderDay (day) {
    return (
      <div className={styles.TimeEntry} />
    )
  }

  function renderDayCell (day) {
    const dayString = day.format('YYYY-MM-DD')
    const userDay = days[dayString]
    return (
      <div className={styles.cell} key={`user-${user.id}_${dayString}`}>
        {userDay && renderDay(userDay)}
      </div>
    )
  }

  return (
    <div className={styles.row}>
      {dateRangeDays.map(renderDayCell)}
    </div>
  )
}

TimeRecordsRow.displayName = 'TimeRecordsRow'

TimeRecordsRow.propTypes = {
  dateRangeDays: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  days: PropTypes.object.isRequired
}

export default TimeRecordsRow
