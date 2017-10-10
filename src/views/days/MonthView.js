import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import ApplicationLayout from 'views/ApplicationLayout'

import styles from './styles.scss'

const DATE_FORMAT = 'YYYY-MM-DD'

const MonthView = (props) => {
  const { params } = props.match
  console.log('MonthView', params)
  const date = moment(`${params.year}-${params.month}-01`, DATE_FORMAT)
  const headerLeftActions = (
    <Link
      to={moment(date).subtract(1, 'month').format('/YYYY/MM')}
      className={styles.headerLink}
    >
      <i className='fa fa-angle-left' />
    </Link>
  )
  const headerRightActions = (
    <Link
      to={moment(date).add(1, 'month').format('/YYYY/MM')}
      className={styles.headerLink}
    >
      <i className='fa fa-angle-right' />
    </Link>
  )
  return (
    <ApplicationLayout
      title={date.format('MMMM YYYY')}
      headerLeftActions={headerLeftActions}
      headerRightActions={headerRightActions}
    >
      <div>...</div>
    </ApplicationLayout>
  )
}

MonthView.displayName = 'MonthView'

MonthView.propTypes = {
  match: PropTypes.object.isRequired
}

export default MonthView
