import { denormalize } from 'normalizr'
import { isArray, difference, sortBy } from 'lodash'
import { combineReducers } from 'redux'

import * as schema from 'state/schema'

import {
  USERS_FETCH_SUCCESS,
  SIGN_IN_SUCCESS,
  CURRENT_USER_FETCH_SUCCESS,
  SIGN_OUT_SUCCESS
} from './actions'

function isAuthenticated (state = Boolean(window.localStorage.getItem('AUTH_TOKEN')), action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case CURRENT_USER_FETCH_SUCCESS:
      return true
    case SIGN_OUT_SUCCESS:
      return false
    default:
      return state
  }
}

function currentUserId (state = null, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case CURRENT_USER_FETCH_SUCCESS:
      return action.response.result
    case SIGN_OUT_SUCCESS:
      return null
    default:
      return state
  }
}

function ids (state = [], action) {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
    case SIGN_IN_SUCCESS:
    case CURRENT_USER_FETCH_SUCCESS:
      let results = isArray(action.response.result)
        ? action.response.result
        : [action.response.result]
      results = difference(results, state)
      return [...state, ...results]
    case SIGN_OUT_SUCCESS:
      return []
    default:
      return state
  }
}

function byId (state = {}, action) {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
    case SIGN_IN_SUCCESS:
    case CURRENT_USER_FETCH_SUCCESS:
      return {...state, ...action.response.entities.users}
    case SIGN_OUT_SUCCESS:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated,
  currentUserId,
  ids,
  byId
})

// =============================================================================
// SELECTORS
// =============================================================================
export const getUsers = (state) => {
  const users = denormalize(
    state.users.ids,
    schema.users,
    {
      users: state.users.byId,
      teams: state.teams.byId
    }
  )
  return sortBy(users, 'name')
}

export const getUser = (state, id) => {
  return denormalize(
    id,
    schema.user,
    {
      users: state.users.byId,
      teams: state.teams.byId
    }
  )
}

export const getCurrentUser = (state) => {
  return getUser(state, state.users.currentUserId)
}

export const getIsAuthenticated = (state) => {
  return state.users.isAuthenticated
}
