import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import ApplicationLayout from 'views/ApplicationLayout'

import styles from './styles.scss'

const DATE_FORMAT = 'YYYY-MM-DD'

const YearView = (props) => {
  const { params } = props.match
  console.log('YearView', params)
  const date = moment(`${params.year}-01-01`, DATE_FORMAT)
  const headerLeftActions = (
    <Link
      to={moment(date).subtract(1, 'year').format('/YYYY')}
      className={styles.headerLink}
    >
      <i className='fa fa-angle-left' />
    </Link>
  )
  const headerRightActions = (
    <Link
      to={moment(date).add(1, 'year').format('/YYYY')}
      className={styles.headerLink}
    >
      <i className='fa fa-angle-right' />
    </Link>
  )
  return (
    <ApplicationLayout
      title={date.format('YYYY')}
      headerLeftActions={headerLeftActions}
      headerRightActions={headerRightActions}
    >
      <div>...</div>
    </ApplicationLayout>
  )
}

YearView.displayName = 'YearView'

YearView.propTypes = {
  match: PropTypes.object.isRequired
}

export default YearView
