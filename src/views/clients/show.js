import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchClient } from 'state/clients/actionCreators'
import { getClient } from 'state/clients/selectors'

import ApplicationLayout from 'views/ApplicationLayout'
import LoadingSpinner from 'components/LoadingSpinner'

class ClientsShowView extends React.Component {
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
    this.props.fetchClient()
      .then(() => this.setState({ isLoading: false }))
  }

  renderContent () {
    return (
      <ApplicationLayout title={this.props.client.name}>
        <Link to={`/clients/${this.props.client.id}/edit`}>Edit</Link>
        &nbsp;&nbsp;-&nbsp;&nbsp;
        <Link to='/clients'>Back</Link>
      </ApplicationLayout>
    )
  }

  render () {
    const { isLoading } = this.state
    return (
      <div>
        { isLoading && <LoadingSpinner size={50} strokeWidth={3} centered /> }
        { !isLoading && this.renderContent() }
      </div>
    )
  }
}

ClientsShowView.displayName = 'ClientsShowView'

ClientsShowView.propTypes = {
  client: PropTypes.object,
  fetchClient: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    client: getClient(state, ownProps.match.params.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchClient () {
      return dispatch(fetchClient(ownProps.match.params.id))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClientsShowView)
)
