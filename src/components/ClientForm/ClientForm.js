import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'

export class ClientForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSaving: false,
      name: props.client.name,
      projects: [
        ...props.client.projects,
        { name: '' }
      ]
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.renderProjectField = this.renderProjectField.bind(this)
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
    const values = pick(this.state, ['name'])
    if (this.props.client.id) {
      values.id = this.props.client.id
    }
    this.props.onSubmit(values)
      .then(() => {
        this.setState({
          isSaving: false,
          name: ''
        })
      }).catch(() => {
        this.setState({ isSaving: false })
      })
  }

  renderProjectField (project, index) {
    return (
      <div>
        <input
          type='text'
          name={`projects.${index}.name`}
          value={project.name}
          onChange={this.handleOnChange}
        />
      </div>
    )
  }

  render () {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div>
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={this.handleOnChange}
          />
        </div>
        <div>
          {this.state.projects.map(this.renderProjectField)}
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    )
  }
}

ClientForm.displayName = 'ClientForm'

ClientForm.defaultProps = {
  client: {
    name: '',
    projects: []
  }
}

ClientForm.propTypes = {
  client: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}
