import React from 'react'
import PropTypes from 'prop-types'

import styles from './GoogleSignInButton.scss'

const GoogleSignInButton = ({
  disabled,
  onClick,
  ...otherProps
}) => {
  return (
    <div
      className={styles.GoogleSignInButton}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    />
  )
}

GoogleSignInButton.displayName = 'GoogleSignInButton'

GoogleSignInButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

GoogleSignInButton.defaultProps = {
  disabled: false,
  onClick: () => {}
}

export default GoogleSignInButton
