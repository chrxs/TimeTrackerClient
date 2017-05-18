import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchProject, updateProject } from 'state/projects/actionCreators'
import { getProject } from 'state/projects/reducer'

import Header from 'components/Header'
import LoadingSpinner from 'components/LoadingSpinner'

class ProjectsEditView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      isSaving: false,
      project: props.project || {}
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  componentDidMount () {
    if (!this.props.project) {
      this.setState({ isLoading: true })
      this.props.fetchProject()
        .then((project) => {
          this.setState({
            isLoading: false,
            project
          })
        })
    }
  }

  handleOnChange (evt) {
    const { name, value } = evt.currentTarget
    this.setState({
      project: {
        ...this.state.project,
        [name]: value
      }
    })
  }

  handleOnSubmit (evt) {
    evt.preventDefault()
    this.setState({ isSaving: true })
    this.props.updateProject(this.state.project)
      .then(() => {
        this.setState({ isSaving: false })
        this.props.history.goBack()
      })
  }

  render () {
    const { project, isLoading, isSaving } = this.state
    if (isLoading || !project.id) {
      return <LoadingSpinner
        size={50}
        strokeWidth={3}
        centered
      />
    }

    return (
      <div>
        <Header title={`Edit ${project.name}`} />
        { isSaving && <p>Saving...</p>}
        <form onSubmit={this.handleOnSubmit}>
          <input
            type='text'
            name='name'
            value={project.name}
            onChange={this.handleOnChange}
          />
          <button type='submit'>Update</button>
        </form>
        <Link to='/projects'>Back</Link>
      </div>
    )
  }
}

ProjectsEditView.displayName = 'ProjectsEditView'

ProjectsEditView.propTypes = {
  project: PropTypes.object,
  fetchProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    project: getProject(state, ownProps.match.params.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProject () {
      return dispatch(fetchProject(ownProps.match.params.id))
    },
    updateProject (project) {
      return dispatch(updateProject(project))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectsEditView)
)
