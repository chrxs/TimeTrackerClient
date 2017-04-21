import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.scss'

const Button = ({
  type,
  label,
  disabled,
  onClick,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={styles.Button}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      { label }
    </button>
  )
}

Button.displayName = 'Button'

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => {}
}

export default Button
