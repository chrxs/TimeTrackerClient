import React from 'react'
import PropTypes from 'prop-types'

import NavButton from 'components/NavButton'
import UserMenu from 'components/UserMenu'
import styles from './Navigation.scss'

const Navigation = ({
  currentUser,
  signOut
}) => {
  return (
    <nav className={styles.Navigation}>
      <ul>
        <li>
          <NavButton to='/' label='MY TIME' />
        </li>
        <li>
          <NavButton to='/people' label='PEOPLE' />
        </li>
        <li>
          <NavButton to='/projects' label='PROJECTS' />
        </li>
        <li>
          <div className={styles.NavButtons}>
            <UserMenu currentUser={currentUser} signOut={signOut} />
          </div>
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
  signOut: PropTypes.func.isRequired
}

export default Navigation
