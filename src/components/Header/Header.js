import React from 'react'
import PropTypes from 'prop-types'

import styles from './Header.scss'

const Header = ({
  title
}) => {
  return (
    <header className={styles.Header}>
      <h1 className={styles.HeaderTitle}>
        {title}
      </h1>
    </header>
  )
}

Header.displayName = 'Header'

Header.propTypes = {
  title: PropTypes.string.isRequired
}

Header.defaultProps = {
}

export default Header
