import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'

import styles from './Header.scss'

const Header = ({
  title,
  className,
  leftActions,
  rightActions
}) => {
  const classNames = compact([styles.Header, className])
  return (
    <header className={classNames.join(' ')}>
      {leftActions}
      <h1 className={styles.HeaderTitle}>
        {title}
      </h1>
      {rightActions}
    </header>
  )
}

Header.displayName = 'Header'

Header.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  leftActions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ]),
  rightActions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object
  ])
}

Header.defaultProps = {
  className: ''
}

export default Header
