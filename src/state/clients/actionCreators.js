import { normalize } from 'normalizr'

import * as schema from 'state/schema'
import fetch from 'services/fetch'

import {
  CLIENTS_FETCH_ALL_BEGIN,
  CLIENTS_FETCH_ALL_SUCCESS,
  CLIENTS_FETCH_ALL_FAILED,
  CLIENT_FETCH_BEGIN,
  CLIENT_FETCH_SUCCESS,
  CLIENT_FETCH_FAILED,
  CLIENT_CREATE_BEGIN,
  CLIENT_CREATE_SUCCESS,
  CLIENT_CREATE_FAILED,
  CLIENT_UPDATE_BEGIN,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_UPDATE_FAILED
} from './actions'

export function fetchAllClients () {
  return (dispatch) => {
    dispatch({ type: CLIENTS_FETCH_ALL_BEGIN })
    return fetch('/api/v1/clients')
      .then((response) => {
        dispatch({
          type: CLIENTS_FETCH_ALL_SUCCESS,
          response: normalize(response, schema.clients)
        })
        return response
      }).catch(() => {
        dispatch({ type: CLIENTS_FETCH_ALL_FAILED })
      })
  }
}

export function fetchClient (id) {
  return (dispatch) => {
    dispatch({ type: CLIENT_FETCH_BEGIN })
    return fetch(`/api/v1/clients/${id}`)
      .then((response) => {
        dispatch({
          type: CLIENT_FETCH_SUCCESS,
          response: normalize(response, schema.client)
        })
        return response
      }).catch(() => {
        dispatch({ type: CLIENT_FETCH_FAILED })
      })
  }
}

export function createClient (client = {}) {
  return (dispatch) => {
    dispatch({ type: CLIENT_CREATE_BEGIN })
    return fetch('/api/v1/clients', {
      method: 'POST',
      body: client
    }).then((response) => {
      dispatch({
        type: CLIENT_CREATE_SUCCESS,
        response: normalize(response, schema.client)
      })
      return response
    }).catch(() => {
      dispatch({ type: CLIENT_CREATE_FAILED })
    })
  }
}

export function updateClient (client = {}) {
  return (dispatch) => {
    dispatch({ type: CLIENT_UPDATE_BEGIN })
    return fetch(`/api/v1/clients/${client.id}`, {
      method: 'PUT',
      body: client
    }).then((response) => {
      dispatch({
        type: CLIENT_UPDATE_SUCCESS,
        response: normalize(response, schema.client)
      })
      return response
    }).catch(() => {
      dispatch({ type: CLIENT_UPDATE_FAILED })
    })
  }
}
