import { combineReducers } from 'redux'

import {
  SIGN_IN_SUCCESS,
  CURRENT_USER_FETCH_SUCCESS,
  USERS_FETCH_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../users/actions'

function addTeams (state, teams) {
  return {
    ...state,
    ...teams
  }
}

function ids (state = [], action) {
  switch (action.type) {
    case SIGN_OUT_SUCCESS:
      return []
    default:
      return state
  }
}

function byId (state = {}, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case CURRENT_USER_FETCH_SUCCESS:
    case USERS_FETCH_SUCCESS:
      return addTeams(state, action.response.entities.teams)
    case SIGN_OUT_SUCCESS:
      return {}
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
