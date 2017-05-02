import React from 'react'
import PropTypes from 'prop-types'

import DateHeader from 'components/DateHeader'

const MonthView = (props) => {
  const { params } = props.match
  console.log('MonthView', params)

  return (
    <div>
      <DateHeader
        year={params.year}
        month={params.month}
      />
      <div>...</div>
    </div>
  )
}

MonthView.displayName = 'MonthView'

MonthView.propTypes = {
  match: PropTypes.object.isRequired
}

export default MonthView
