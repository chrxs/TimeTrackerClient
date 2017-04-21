import React from 'react'
import PropTypes from 'prop-types'

import styles from './LoadingSpinner.scss'

const LoadingSpinner = ({
  size,
  strokeWidth,
  centered,
  style,
  ...rest
}) => {
  let loadingSpinnerStyle = {
    width: `${size}px`
  }

  if (centered) {
    loadingSpinnerStyle.position = 'absolute'
    loadingSpinnerStyle.top = '50%'
    loadingSpinnerStyle.left = '50%'
    loadingSpinnerStyle.margin = `-${size / 2}px 0 0 -${size / 2}px`
  }

  loadingSpinnerStyle = {
    ...loadingSpinnerStyle,
    ...style
  }

  return (
    <div
      className={styles.LoadingSpinner}
      style={loadingSpinnerStyle}
      {...rest}
    >
      <svg
        className={styles.circular}
        viewBox='25 25 50 50'
      >
        <circle
          className={styles.path}
          cx='50'
          cy='50'
          r='20'
          fill='none'
          strokeWidth={strokeWidth}
          strokeMiterlimit='10'
        />
      </svg>
    </div>
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  centered: PropTypes.bool,
  style: PropTypes.object
}

LoadingSpinner.defaultProps = {
  size: 100,
  strokeWidth: 2,
  centered: false,
  style: {}
}

export default LoadingSpinner
