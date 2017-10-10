import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as clientSelectors from 'state/clients/selectors'
import { fetchAllClients } from 'state/clients/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'
import LoadingSpinner from 'components/LoadingSpinner'

import styles from './styles'

class ClientsIndexView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    this.setState({ isLoading: true })
    this.props.fetchAllClients()
      .then(() => this.setState({ isLoading: false }))
  }

  renderContent () {
    return (
      <main className={styles.main}>
        <div className={styles.clientsList}>
          {this.props.clients.map((client) => (
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
          ))}
        </div>
      </main>
    )
  }

  render () {
    const { isLoading } = this.state
    return (
      <ApplicationLayout
        title='Clients'
        headerRightActions={<Link to='/clients/new'>New Client</Link>}>
        <div className={styles.view}>
          { isLoading && <LoadingSpinner size={50} strokeWidth={3} centered /> }
          { !isLoading && this.renderContent() }
        </div>
      </ApplicationLayout>
    )
  }
}

ClientsIndexView.displayName = 'ClientsIndexView'

ClientsIndexView.propTypes = {
  clients: PropTypes.array.isRequired,
  fetchAllClients: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    clients: clientSelectors.getClients(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClients () {
      return dispatch(fetchAllClients())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClientsIndexView)
)
