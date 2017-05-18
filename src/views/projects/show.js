import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchProject } from 'state/projects/actionCreators'
import { getProject } from 'state/projects/reducer'

import Header from 'components/Header'
import LoadingSpinner from 'components/LoadingSpinner'

class ProjectsShowView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  componentDidMount () {
    if (!this.props.project) {
      this.setState({ isLoading: true })
      this.props.fetchProject()
        .then((project) => {
          this.setState({ isLoading: false })
        })
    }
  }

  render () {
    const { project } = this.props

    if (this.state.isLoading || !project) {
      return <LoadingSpinner
        size={50}
        strokeWidth={3}
        centered
      />
    }

    return (
      <div>
        <Header title={project.name} />
        <Link to={`/projects/${project.id}/edit`}>Edit</Link>
        <Link to='/projects'>Back</Link>
      </div>
    )
  }
}

ProjectsShowView.displayName = 'ProjectsShowView'

ProjectsShowView.propTypes = {
  project: PropTypes.object,
  fetchProject: PropTypes.func.isRequired
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
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectsShowView)
)
