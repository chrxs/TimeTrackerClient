import { normalize } from 'normalizr'

import * as schema from 'state/schema'
import fetch from 'services/fetch'

import {
  PROJECTS_FETCH_ALL_BEGIN,
  PROJECTS_FETCH_ALL_SUCCESS,
  PROJECTS_FETCH_ALL_FAILED,
  PROJECT_FETCH_BEGIN,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_FAILED,
  PROJECT_CREATE_BEGIN,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAILED,
  PROJECT_UPDATE_BEGIN,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILED
} from './actions'

export function fetchAllProjects () {
  return (dispatch) => {
    dispatch({ type: PROJECTS_FETCH_ALL_BEGIN })
    return fetch('/api/v1/projects')
      .then((response) => {
        dispatch({
          type: PROJECTS_FETCH_ALL_SUCCESS,
          response: normalize(response, schema.projectList)
        })
        return response
      })
      .catch(() => {
        dispatch({ type: PROJECTS_FETCH_ALL_FAILED })
      })
  }
}

export function fetchProject (id) {
  return (dispatch) => {
    dispatch({ type: PROJECT_FETCH_BEGIN })
    return fetch(`/api/v1/projects/${id}`)
      .then((response) => {
        dispatch({
          type: PROJECT_FETCH_SUCCESS,
          response: normalize(response, schema.project)
        })
        return response
      })
      .catch(() => {
        dispatch({ type: PROJECT_FETCH_FAILED })
      })
  }
}

export function createProject (project = {}) {
  return (dispatch) => {
    dispatch({ type: PROJECT_CREATE_BEGIN })
    return fetch('/api/v1/projects', {
      method: 'POST',
      body: project
    }).then((response) => {
      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        response: normalize(response, schema.project)
      })
      return response
    })
    .catch(() => {
      dispatch({ type: PROJECT_CREATE_FAILED })
    })
  }
}

export function updateProject (project = {}) {
  return (dispatch) => {
    dispatch({ type: PROJECT_UPDATE_BEGIN })
    return fetch(`/api/v1/projects/${project.id}`, {
      method: 'PUT',
      body: project
    }).then((response) => {
      dispatch({
        type: PROJECT_UPDATE_SUCCESS,
        response: normalize(response, schema.project)
      })
      return response
    })
    .catch(() => {
      dispatch({ type: PROJECT_UPDATE_FAILED })
    })
  }
}
