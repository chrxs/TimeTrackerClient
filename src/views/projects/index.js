import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getProjects } from 'state/projects/reducer'
import { fetchAllProjects } from 'state/projects/actionCreators'

class ProjectsIndexView extends React.Component {
  componentDidMount () {
    this.props.fetchAllProjects()
  }

  render () {
    return (
      <div>
        <h1>ProjectsIndexView</h1>
        <Link to='/projects/new'>New Project</Link>
        <ol>
          {this.props.projects.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/projects/${id}`}>{name}</Link>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

ProjectsIndexView.displayName = 'ProjectsIndexView'

ProjectsIndexView.propTypes = {
  projects: PropTypes.array.isRequired,
  fetchAllProjects: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    projects: getProjects(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProjects () {
      return dispatch(fetchAllProjects())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectsIndexView)
)
