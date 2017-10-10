import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as clientSelectors from 'state/clients/selectors'
import { fetchAllClients } from 'state/clients/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'
import LoadingSpinner from 'components/LoadingSpinner'
import { ClientsList } from 'components/ClientsList'

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
        <ClientsList clients={this.props.clients} />
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
