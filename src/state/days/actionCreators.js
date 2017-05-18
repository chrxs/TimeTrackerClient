import { compact } from 'lodash'
import { normalize } from 'normalizr'

import * as schema from 'state/schema'
import fetch from 'services/fetch'

import {
  DAYS_FETCH_BEGIN,
  DAYS_FETCH_SUCCESS,
  DAYS_FETCH_FAILED,
  DAYS_SAVE_BEGIN,
  DAYS_SAVE_SUCCESS,
  DAYS_SAVE_FAILED
} from './actions'

export function fetchDays (year, month, day) {
  const dateString = compact([year, month, day]).join('/')
  return (dispatch) => {
    dispatch({ type: DAYS_FETCH_BEGIN })
    return fetch(`/api/v1/${dateString}`)
      .then((response) => {
        dispatch({
          type: DAYS_FETCH_SUCCESS,
          response: normalize(response, schema.dayList)
        })
        return response
      })
      .catch(() => {
        dispatch({ type: DAYS_FETCH_FAILED })
      })
  }
}

export function saveDay (data = {}) {
  const { year, month, day, ...rest } = data
  const date = `${year}/${month}/${day}`
  return (dispatch) => {
    dispatch({ type: DAYS_SAVE_BEGIN })
    return fetch(`/api/v1/${date}`, {
      method: 'POST',
      body: rest
    }).then((response) => {
      dispatch({
        type: DAYS_SAVE_SUCCESS,
        response: normalize(response, schema.day)
      })
      return response
    })
    .catch(() => {
      dispatch({ type: DAYS_SAVE_FAILED })
    })
  }
}
