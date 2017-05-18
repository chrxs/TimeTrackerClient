import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'

import NavButton from 'components/NavButton'
import UserMenu from 'components/UserMenu'
import styles from './Navigation.scss'

const Navigation = ({
  currentUser,
  signOut,
  className
}) => {
  return (
    <nav className={compact([styles.Navigation, className]).join(' ')}>
      <ul>
        <li>
          <NavButton to='/' label='MY TIME' icon='clock-o' />
        </li>
        <li>
          <NavButton to='/people' label='PEOPLE' icon='users' />
        </li>
        <li>
          <NavButton exact={false} to='/projects' label='PROJECTS' icon='folder-o' />
        </li>
        <li>
          <UserMenu currentUser={currentUser} signOut={signOut} />
        </li>
      </ul>
    </nav>
  )
}

Navigation.displayName = 'Navigation'

Navigation.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  signOut: PropTypes.func.isRequired,
  className: PropTypes.string
}

Navigation.defaultProps = {
  className: ''
}

export default Navigation
