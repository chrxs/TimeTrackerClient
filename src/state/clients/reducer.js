import { isArray, uniq } from 'lodash'
import { combineReducers } from 'redux'

import {
  CLIENTS_FETCH_ALL_SUCCESS,
  CLIENT_FETCH_SUCCESS,
  CLIENT_CREATE_SUCCESS,
  CLIENT_UPDATE_SUCCESS
} from './actions'
import {
  DAYS_FETCH_SUCCESS,
  DAYS_SAVE_SUCCESS
} from '../days/actions'
import {
  SIGN_OUT_SUCCESS
} from '../users/actions'

function addClients (state, clients) {
  return {
    ...state,
    ...clients
  }
}

function ids (state = [], action) {
  switch (action.type) {
    case CLIENTS_FETCH_ALL_SUCCESS:
    case CLIENT_FETCH_SUCCESS:
    case CLIENT_CREATE_SUCCESS:
    case CLIENT_UPDATE_SUCCESS:
      const results = isArray(action.response.result)
        ? action.response.result
        : [action.response.result]
      return uniq([...state, ...results])

    case SIGN_OUT_SUCCESS:
      return []

    default:
      return state
  }
}

function byId (state = {}, action) {
  switch (action.type) {
    case CLIENTS_FETCH_ALL_SUCCESS:
    case CLIENT_FETCH_SUCCESS:
    case CLIENT_CREATE_SUCCESS:
    case CLIENT_UPDATE_SUCCESS:
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
      return addClients(state, action.response.entities.clients)

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
