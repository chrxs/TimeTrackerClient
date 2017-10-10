import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { createClient } from 'state/clients/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'

class ClientsNewView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSaving: false,
      name: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnChange (evt) {
    const { name, value } = evt.currentTarget
    this.setState({
      [name]: value
    })
  }

  handleOnSubmit (evt) {
    evt.preventDefault()
    this.setState({ isSaving: true })
    this.props.createClient({
      name: this.state.name
    }).then(() => {
      this.setState({ isSaving: false })
      this.props.history.goBack()
    }).catch(() => {
      this.setState({ isSaving: false })
    })
  }

  render () {
    return (
      <ApplicationLayout title='New Client'>
        { this.state.isSaving && <p>Saving...</p>}
        <form onSubmit={this.handleOnSubmit}>
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={this.handleOnChange}
          />
          <button type='submit'>Save</button>
        </form>
      </ApplicationLayout>
    )
  }
}

ClientsNewView.displayName = 'ClientsNewView'

ClientsNewView.propTypes = {
  createClient: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createClient (client) {
      return dispatch(createClient(client))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClientsNewView)
)
