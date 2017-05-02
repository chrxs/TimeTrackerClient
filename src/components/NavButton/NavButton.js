import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import styles from './NavButton.scss'

const NavButton = ({
  to,
  exact,
  label,
  onClick
}) => {
  if (to) {
    return (
      <NavLink
        to={to}
        className={styles.NavButton}
        activeClassName={styles.NavButtonSelected}
        exact={exact}
      >
        <div className={styles.icon} />
        <div className={styles.label}>{ label }</div>
      </NavLink>
    )
  }
  return (
    <button
      type='button'
      className={styles.NavButton}
      onClick={onClick}
    >
      <div className={styles.icon} />
      <div className={styles.label}>{ label }</div>
    </button>
  )
}

NavButton.displayName = 'NavButton'

NavButton.propTypes = {
  to: PropTypes.string,
  exact: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func
}

NavButton.defaultProps = {
  label: '',
  exact: true,
  onClick: () => {}
}

export default NavButton
