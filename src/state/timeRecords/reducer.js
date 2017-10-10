import { combineReducers } from 'redux'

import { DAYS_FETCH_SUCCESS, DAYS_SAVE_SUCCESS } from '../days/actions'
import { USERS_FETCH_SUCCESS, SIGN_OUT_SUCCESS } from '../users/actions'

function addTimeRecords (state, timeRecords) {
  return {
    ...state,
    ...timeRecords
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
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
    case USERS_FETCH_SUCCESS:
      return addTimeRecords(state, action.response.entities.timeRecords)
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
