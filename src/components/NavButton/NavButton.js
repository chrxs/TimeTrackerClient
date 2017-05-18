import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import cssClasses from './NavButton.scss'

const NavButton = ({
  to,
  exact,
  label,
  icon,
  onClick
}) => {
  const content = (
    <div>
      <div className={cssClasses.icon}>
        <i className={`fa fa-${icon}`} />
      </div>
      <div className={cssClasses.label}>{ label }</div>
    </div>
  )

  if (to) {
    return (
      <NavLink
        to={to}
        className={cssClasses.NavButton}
        activeClassName={cssClasses.NavButtonSelected}
        exact={exact}
      >
        { content }
      </NavLink>
    )
  }
  return (
    <button
      type='button'
      className={cssClasses.NavButton}
      onClick={onClick}
    >
      { content }
    </button>
  )
}

NavButton.displayName = 'NavButton'

NavButton.propTypes = {
  to: PropTypes.string,
  exact: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func
}

NavButton.defaultProps = {
  label: '',
  icon: '',
  exact: true,
  onClick: () => {}
}

export default NavButton
