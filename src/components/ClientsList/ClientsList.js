import React from 'react'
import PropTypes from 'prop-types'

import ClientsListItem from './ClientsListItem'
import styles from './styles'

export class ClientsList extends React.Component {
  render () {
    return (
      <div className={styles.clientsList}>
        {this.props.clients.map((client) => (
          <ClientsListItem
            key={client.id}
            client={client}
          />
        ))}
      </div>
    )
  }
}

ClientsList.displayName = 'ClientsList'

ClientsList.propTypes = {
  clients: PropTypes.array.isRequired
}
