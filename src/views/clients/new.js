import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { createClient } from 'state/clients/actionCreators'

import ApplicationLayout from 'views/ApplicationLayout'
import { ClientForm } from 'components/ClientForm'

class ClientsNewView extends React.Component {
  createClient (values) {
    this.props.createClient(values)
      .then(() => {
        this.props.history.goBack()
      })
  }

  render () {
    return (
      <ApplicationLayout title='New Client'>
        <ClientForm onSubmit={this.createClient} />
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
