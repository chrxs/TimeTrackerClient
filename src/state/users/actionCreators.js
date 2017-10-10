import { normalize } from 'normalizr'

import * as schema from 'state/schema'
import fetch from 'services/fetch'
import { SLACK_CLIENT_ID, SLACK_SCOPE, SLACK_REDIRECT_URI } from 'config'

import {
  USERS_FETCH_BEGIN,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILED,
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  CURRENT_USER_FETCH_BEGIN,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILED
} from './actions'

export function signInViaSlack () {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    const url = `https://slack.com/oauth/authorize?&client_id=${SLACK_CLIENT_ID}&scope=${SLACK_SCOPE}&redirect_uri=${SLACK_REDIRECT_URI}`
    return new Promise((resolve, reject) => {
      window.signInViaSlackCallback = (params) => {
        console.log(params)
        fetch(`/api/v1/auth/slack?code=${params.code}&state=${params.state}&redirect_uri=${SLACK_REDIRECT_URI}`)
          .then((response) => {
            dispatch({
              type: SIGN_IN_SUCCESS,
              response: normalize(response, schema.user)
            })
            resolve(response)
          })
          .catch((error) => {
            dispatch({ type: SIGN_IN_FAILED })
            reject(error)
          })
      }
      window.open(url, 'SignInWindow', 'width=600,height=600')
    })
  }
}

export function signOut () {
  return (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
    window.localStorage.removeItem('AUTH_TOKEN')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: SIGN_OUT_SUCCESS })
        resolve()
      })
    })
  }
}

export function fetchCurrentUser () {
  return (dispatch) => {
    dispatch({ type: CURRENT_USER_FETCH_BEGIN })
    return fetch('/api/v1/myself')
      .then((response) => {
        dispatch({
          type: CURRENT_USER_FETCH_SUCCESS,
          response: normalize(response, schema.user)
        })
      })
      .catch(() => { dispatch({ type: CURRENT_USER_FETCH_FAILED }) })
  }
}

export function fetchUsers () {
  return (dispatch) => {
    dispatch({ type: USERS_FETCH_BEGIN })
    return fetch('/api/v1/users')
      .then((response) => {
        dispatch({
          type: USERS_FETCH_SUCCESS,
          response: normalize(response, schema.users)
        })
        return response
      })
      .catch(() => {
        dispatch({ type: USERS_FETCH_FAILED })
      })
  }
}
