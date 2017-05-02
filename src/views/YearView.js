import React from 'react'
import PropTypes from 'prop-types'

import DateHeader from 'components/DateHeader'

const YearView = (props) => {
  const { params } = props.match
  console.log('YearView', params)

  return (
    <div>
      <DateHeader
        year={params.year}
      />
      <div>...</div>
    </div>
  )
}

YearView.displayName = 'YearView'

YearView.propTypes = {
  match: PropTypes.object.isRequired
}

export default YearView
