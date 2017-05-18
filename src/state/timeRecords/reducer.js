import { combineReducers } from 'redux'

import {
  DAYS_FETCH_SUCCESS,
  DAYS_SAVE_SUCCESS
} from '../days/actions'

function addTimeRecords (state, timeRecords) {
  return {
    ...state,
    ...timeRecords
  }
}

function ids (state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

function byId (state = {}, action) {
  switch (action.type) {
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
      return addTimeRecords(state, action.response.entities.timeRecords)
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
