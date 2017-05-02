import React from 'react'
import PropTypes from 'prop-types'

import DateHeader from 'components/DateHeader'

const DayView = (props) => {
  const { params } = props.match
  console.log('DayView', props)

  const year = params.year || (new Date().getFullYear()).toString()
  let month = params.month || (new Date().getMonth() + 1).toString()
  month = month.length === 1 ? `0${month}` : month
  let day = params.day || (new Date().getDate()).toString()
  day = day.length === 1 ? `0${day}` : day

  return (
    <div>
      <DateHeader
        year={year}
        month={month}
        day={day}
      />
      <div>...</div>
    </div>
  )
}

DayView.displayName = 'DayView'

DayView.propTypes = {
  match: PropTypes.object.isRequired
}

export default DayView
