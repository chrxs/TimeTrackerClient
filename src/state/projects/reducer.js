import { combineReducers } from 'redux'

import {
  CLIENTS_FETCH_ALL_SUCCESS,
  CLIENT_FETCH_SUCCESS,
  CLIENT_CREATE_SUCCESS,
  CLIENT_UPDATE_SUCCESS
} from '../clients/actions'
import {
  DAYS_FETCH_SUCCESS,
  DAYS_SAVE_SUCCESS
} from '../days/actions'
import {
  SIGN_OUT_SUCCESS
} from '../users/actions'

function byId (state = {}, action) {
  switch (action.type) {
    case CLIENTS_FETCH_ALL_SUCCESS:
    case CLIENT_FETCH_SUCCESS:
    case CLIENT_CREATE_SUCCESS:
    case CLIENT_UPDATE_SUCCESS:
    case DAYS_FETCH_SUCCESS:
    case DAYS_SAVE_SUCCESS:
      return {
        ...state,
        ...action.response.entities.projects
      }
    case SIGN_OUT_SUCCESS:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  byId
})
