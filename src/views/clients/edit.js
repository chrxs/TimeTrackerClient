import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchClient, updateClient } from 'state/clients/actionCreators'
import { getClient } from 'state/clients/selectors'

import ApplicationLayout from 'views/ApplicationLayout'
import LoadingSpinner from 'components/LoadingSpinner'

class ClientsEditView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      isSaving: false,
      client: props.client || {}
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    this.setState({ isLoading: true })
    this.props.fetchClient()
      .then((client) => {
        this.setState({
          isLoading: false,
          client
        })
      })
  }

  handleOnChange (evt) {
    const { name, value } = evt.currentTarget
    this.setState({
      client: {
        ...this.state.client,
        [name]: value
      }
    })
  }

  handleOnSubmit (evt) {
    evt.preventDefault()
    this.setState({ isSaving: true })
    this.props.updateClient(this.state.client)
      .then(() => {
        this.setState({ isSaving: false })
        this.props.history.goBack()
      })
  }

  render () {
    const { client, isLoading, isSaving } = this.state
    if (isLoading) {
      return <LoadingSpinner size={50} strokeWidth={3} centered />
    }

    return (
      <ApplicationLayout title={`Edit ${this.props.client.name}`}>
        { isSaving && <p>Saving...</p>}
        <form onSubmit={this.handleOnSubmit}>
          <input
            type='text'
            name='name'
            value={client.name}
            onChange={this.handleOnChange}
          />
          <button type='submit'>Update</button>
        </form>
        <Link to='/clients'>Back</Link>
      </ApplicationLayout>
    )
  }
}

ClientsEditView.displayName = 'ClientsEditView'

ClientsEditView.propTypes = {
  client: PropTypes.object,
  fetchClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
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
    },
    updateClient (client) {
      return dispatch(updateClient(client))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClientsEditView)
)
