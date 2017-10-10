import React from 'react'
import PropTypes from 'prop-types'
import { compact } from 'lodash'

import Avatar from 'components/Avatar'
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
          <UserMenu currentUser={currentUser} signOut={signOut} />
        </li>
        <li>
          <NavButton exact to='/' label='MY TIME' icon='clock-o' />
        </li>
        <li>
          <NavButton exact={false} to='/overview' label='OVERVIEW' icon='table' />
        </li>
        <li>
          <NavButton exact={false} to='/users' label='USERS' icon='users' />
        </li>
        <li>
          <NavButton exact={false} to='/clients' label='CLIENTS' icon='folder-o' />
        </li>
        <li>
          <Avatar imageUrl={currentUser.team.image} />
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
