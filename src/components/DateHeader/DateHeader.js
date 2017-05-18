import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import styles from './DateHeader.scss'

const DateHeader = ({
  year,
  month,
  day
}) => {
  let interval = 'year'
  let date = year
  let titleFormat = 'YYYY'
  let linkFormat = '/YYYY'

  if (month) {
    interval = 'month'
    linkFormat += '/MM'
    date += `-${month}`
    titleFormat = `MMMM ${titleFormat}`
  } else {
    date += '-01'
  }

  if (day) {
    interval = 'day'
    linkFormat += '/DD'
    date += `-${day}`
    titleFormat = `dddd, Do ${titleFormat}`
  } else {
    date += '-01'
  }

  return (
    <header className={styles.DateHeader}>
      <Link
        to={moment(date).subtract(1, interval).format(linkFormat)}
        className={[styles.Link].join(' ')}
      >
        <i className='fa fa-angle-left' />
      </Link>
      <h1 className={styles.DateHeaderTitle}>
        {moment(date).format(titleFormat)}
      </h1>
      <Link
        to={moment(date).add(1, interval).format(linkFormat)}
        className={[styles.Link].join(' ')}
      >
        <i className='fa fa-angle-right' />
      </Link>
    </header>
  )
}

DateHeader.displayName = 'DateHeader'

DateHeader.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string
}

DateHeader.defaultProps = {
  year: new Date().getFullYear()
}

export default DateHeader
