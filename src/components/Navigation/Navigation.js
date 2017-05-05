import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/Avatar'
import NavButton from 'components/NavButton'
import styles from './Navigation.scss'

const Navigation = ({
  currentUser,
  signOut,
  history
}) => {
  function handleOnClick () {
    signOut().then(() => history.push('/'))
  }

  return (
    <nav className={styles.Navigation}>
      <ul>
        <li>
          <div className={styles.NavButtons}>
            <Avatar imageUrl={currentUser.image} />
            <div className={styles.label}>{currentUser.name.toUpperCase()}</div>
          </div>
        </li>
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
          <NavButton label='SIGN OUT' onClick={handleOnClick} />
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
  history: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
}

export default Navigation
