import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { createProject } from 'state/projects/actionCreators'

class ProjectsNewView extends React.Component {
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
    this.props.createProject({
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
      <div>
        <h1>ProjectsNewView</h1>
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
      </div>
    )
  }
}

ProjectsNewView.displayName = 'ProjectsNewView'

ProjectsNewView.propTypes = {
  createProject: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject (project) {
      return dispatch(createProject(project))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectsNewView)
)
