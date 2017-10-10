import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './styles'

class ClientsListItem extends React.Component {
  render () {
    const { client } = this.props
    return (
      <div key={client.id} className={styles.clientsListItem}>
        <div className={styles.clientsListAvatarContainer}>
          <Link to={`/clients/${client.id}`}>
            <div className={styles.clientsListAvatar} />
          </Link>
        </div>
        <div className={styles.clientsListDetailsContainer}>
          <Link to={`/clients/${client.id}`}>{client.name}</Link>
          <Link to={`/clients/${client.id}/edit`}>edit</Link>

          <div className={styles.projects}>
            {client.projects.map((project) => (
              <div className={styles.project} key={project.id}>
                {project.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

ClientsListItem.displayName = 'ClientsListItem'

ClientsListItem.propTypes = {
  client: PropTypes.object.isRequired
}

export default ClientsListItem
