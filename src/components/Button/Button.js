import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.scss'

const Button = ({
  type,
  label,
  block,
  disabled,
  onClick,
  ...otherProps
}) => {
  const classNames = [styles.Button]
  if (type === 'primary') {
    classNames.push(styles.ButtonPrimary)
  }
  if (type === 'secondary') {
    classNames.push(styles.ButtonSecondary)
  }
  if (block) {
    classNames.push(styles.Block)
  }
  return (
    <button
      type='button'
      className={classNames.join(' ')}
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
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

Button.defaultProps = {
  block: false,
  disabled: false,
  onClick: () => {}
}

export default Button
