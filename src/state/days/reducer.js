import { denormalize } from 'normalizr'
import { combineReducers } from 'redux'

import { day, dayList } from 'state/schema'

import {
  DAYS_FETCH_SUCCESS,
  DAYS_SAVE_SUCCESS
} from './actions'

function addDays (state, days) {
  return {
    ...state,
    ...days
  }
}

function userIdAndDates (state = [], action) {
  switch (action.type) {
    case DAYS_FETCH_SUCCESS:
      return [...state, ...action.response.result]
    default:
      return state
  }
}

function byUserIdAndDate (state = {}, action) {
  switch (action.type) {
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
      return addDays(state, action.response.entities.days)
    default:
      return state
  }
}

export default combineReducers({
  userIdAndDates,
  byUserIdAndDate
})

// =============================================================================
// SELECTORS
// =============================================================================
export const getDays = (state, userId = false) => {
  return denormalize(
    state.days.userIdAndDates,
    dayList,
    {
      days: state.days.byUserIdAndDate,
      timeRecords: state.timeRecords.byId,
      projects: state.projects.byId
    }
  )
}

export const getDay = (state, date, userId) => {
  return denormalize(
    `user-${userId}_${date}`,
    day,
    {
      days: state.days.byUserIdAndDate,
      timeRecords: state.timeRecords.byId,
      projects: state.projects.byId
    }
  )
}
