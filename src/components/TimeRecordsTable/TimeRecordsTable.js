import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/Avatar'
import TimeRecordsRow from './TimeRecordsRow'

import styles from './styles.scss'

const TimeRecordsTable = ({
  data,
  curentDate,
  dateRangeDays
}) => {
  function renderUser (user) {
    return (
      <div key={user.id} className={styles.cell}>
        <Avatar imageUrl={user.image} />
      </div>
    )
  }

  return (
    <div className={styles.TimeRecordsTable}>
      <div className={styles.usersColumn}>
        <div className={[styles.cell, styles.cellDate].join(' ')} />
        {data.map(({user}) => renderUser(user))}
      </div>

      <div className={styles.dataColumn}>
        <div className={styles.row}>
          {dateRangeDays.map(day => <div className={[styles.cell, styles.cellDate].join(' ')} key={`date-header-${day.format('YYYY-MM-DD')}`}>{day.format('dd Do')}</div>)}
        </div>
        <div className='body'>
          {data.map(({user, days}) => (
            <TimeRecordsRow
              key={user.id}
              dateRangeDays={dateRangeDays}
              user={user}
              days={days}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

TimeRecordsTable.displayName = 'TimeRecordsTable'

TimeRecordsTable.propTypes = {
  data: PropTypes.array.isRequired,
  curentDate: PropTypes.string.isRequired,
  dateRangeDays: PropTypes.array.isRequired
}

export default TimeRecordsTable
