import { denormalize } from 'normalizr'
import { combineReducers } from 'redux'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

import * as schema from 'state/schema'

import { DAYS_FETCH_SUCCESS, DAYS_SAVE_SUCCESS } from './actions'
import { SIGN_OUT_SUCCESS } from '../users/actions'

const moment = extendMoment(Moment)

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
    case SIGN_OUT_SUCCESS:
      return []
    default:
      return state
  }
}

function byUserIdAndDate (state = {}, action) {
  switch (action.type) {
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
      return addDays(state, action.response.entities.days)
    case SIGN_OUT_SUCCESS:
      return {}
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
export const getDays = (state, userId, startDate, endDate) => {
  let dayIds = state.days.userIdAndDates

  if (userId) {
    dayIds = dayIds.filter(dayId => dayId.indexOf(`user-${userId}`) === 0)
  }

  if (startDate && endDate) {
    const dateRange = moment.range(startDate, endDate)
    dayIds = dayIds.filter(dayId => {
      const date = moment(dayId.match(/user-\d+_(\d{4}-\d{2}-\d{2})/)[1], 'YYYY-MM-DD')
      return dateRange.contains(date)
    })
  }

  return denormalize(
    dayIds,
    schema.days,
    {
      days: state.days.byUserIdAndDate,
      timeRecords: state.timeRecords.byId,
      clients: state.clients.byId
    }
  )
}

export const getDay = (state, userId, date) => {
  const dayId = `user-${userId}_${date}`
  return denormalize(
    dayId,
    schema.day,
    {
      days: state.days.byUserIdAndDate,
      timeRecords: state.timeRecords.byId,
      clients: state.clients.byId
    }
  )
}
