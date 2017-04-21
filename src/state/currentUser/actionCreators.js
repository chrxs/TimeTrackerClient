import fetch from '../../services/fetch'

import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  FETCH_CURRENT_USER_BEGIN,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILED
} from './actions.js'

import { GOOGLE_CLIENT_ID } from 'config'
import GoogleOauth from '../../services/GoogleOauth'

export function signInViaGoogle () {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    return GoogleOauth.signIn(
      GOOGLE_CLIENT_ID,
      {
        offline: true
      }
    ).then(({ code }) => {
      return fetch('/users/auth/google_oauth2/callback', {
        method: 'POST',
        body: `code=${code}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    })
    .then((user) => { dispatch({ type: SIGN_IN_SUCCESS, user }) })
    .catch(() => { dispatch({ type: SIGN_IN_FAILED }) })
  }
}

export function signOut () {
  return (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: SIGN_OUT_SUCCESS })
        resolve()
      }, 1000)
    })
  }
}

export function fetchCurrentUser () {
  return (dispatch) => {
    dispatch({ type: FETCH_CURRENT_USER_BEGIN })
    return fetch('/api/v1/myself')
      .then((user) => { dispatch({ type: FETCH_CURRENT_USER_SUCCESS, user }) })
      .catch(() => { dispatch({ type: FETCH_CURRENT_USER_FAILED }) })
  }
}
