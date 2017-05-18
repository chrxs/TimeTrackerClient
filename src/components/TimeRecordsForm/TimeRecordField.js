import React from 'react'
import PropTypes from 'prop-types'

const TimeRecordField = ({
  index,
  projectId,
  amount,
  projects,
  onChange
}) => {
  function handleOnChange (evt) {
    const { name, value } = evt.currentTarget
    onChange(index, name, value)
  }

  return (
    <div>
      <select name='projectId' onChange={handleOnChange} value={projectId}>
        <option value='' />
        { projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>) }
      </select>
      <input type='number' name='amount' value={amount} onChange={handleOnChange} /> minutes
    </div>
  )
}

TimeRecordField.displayName = 'TimeRecordField'

TimeRecordField.propTypes = {
  index: PropTypes.number.isRequired,
  projectId: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  projects: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TimeRecordField
