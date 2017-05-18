import { isArray, difference } from 'lodash'
import { combineReducers } from 'redux'

import {
  PROJECTS_FETCH_ALL_SUCCESS,
  PROJECT_FETCH_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_UPDATE_SUCCESS
} from './actions'
import {
  DAYS_FETCH_SUCCESS,
  DAYS_SAVE_SUCCESS
} from '../days/actions'

function addProjects (state, projects) {
  return {
    ...state,
    ...projects
  }
}

function ids (state = [], action) {
  switch (action.type) {
    case PROJECTS_FETCH_ALL_SUCCESS:
    case PROJECT_FETCH_SUCCESS:
    case PROJECT_CREATE_SUCCESS:
    case PROJECT_UPDATE_SUCCESS:
      let results = isArray(action.response.result)
        ? action.response.result
        : [action.response.result]
      results = difference(results, state)
      return [...state, ...results]
    default:
      return state
  }
}

function byId (state = {}, action) {
  switch (action.type) {
    case PROJECTS_FETCH_ALL_SUCCESS:
    case PROJECT_FETCH_SUCCESS:
    case PROJECT_CREATE_SUCCESS:
    case PROJECT_UPDATE_SUCCESS:
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
      return addProjects(state, action.response.entities.projects)
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId
})

// =============================================================================
// SELECTORS
// =============================================================================
export const getProjects = (state) => {
  return state.projects.ids.map(id => state.projects.byId[id])
}

export const getProject = (state, id) => {
  return state.projects.byId[id]
}
