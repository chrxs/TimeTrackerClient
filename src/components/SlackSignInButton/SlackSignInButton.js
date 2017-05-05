import React from 'react'
import PropTypes from 'prop-types'

import styles from './SlackSignInButton.scss'

const SlackSignInButton = ({
  disabled,
  onClick,
  ...otherProps
}) => {
  return (
    <div
      className={styles.SlackSignInButton}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    />
  )
}

SlackSignInButton.displayName = 'SlackSignInButton'

SlackSignInButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

SlackSignInButton.defaultProps = {
  disabled: false,
  onClick: () => {}
}

export default SlackSignInButton
