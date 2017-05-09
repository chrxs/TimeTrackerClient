import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/Avatar'
import Button from 'components/Button'
import styles from './UserMenu.scss'

class UserMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    const classNames = [styles.userMenu]
    if (this.state.isOpen) {
      classNames.push(styles.isOpen)
    }
    return (
      <div className={classNames.join(' ')}>
        <div className={styles.userMenuMenu}>
          <Button
            label='Sign out'
            block
            onClick={this.props.signOut}
          />
        </div>
        <Avatar
          imageUrl={this.props.currentUser.image}
          className={styles.avatar}
          onClick={this.toggle}
        />
      </div>
    )
  }
}

UserMenu.displayName = 'UserMenu'

UserMenu.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  signOut: PropTypes.func.isRequired
}

export default UserMenu
