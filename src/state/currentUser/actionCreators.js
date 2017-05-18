import fetch from 'services/fetch'
import { SLACK_CLIENT_ID, SLACK_SCOPE, SLACK_REDIRECT_URI } from 'config'

import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  CURRENT_USER_FETCH_BEGIN,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILED
} from './actions.js'

export function signInViaSlack () {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    const url = `https://slack.com/oauth/authorize?&client_id=${SLACK_CLIENT_ID}&scope=${SLACK_SCOPE}&redirect_uri=${SLACK_REDIRECT_URI}`
    return new Promise((resolve, reject) => {
      window.signInViaSlackCallback = (params) => {
        fetch(`/api/v1/auth/slack?code=${params.code}&state=${params.state}&redirect_uri=${SLACK_REDIRECT_URI}`)
          .then((user) => {
            dispatch({ type: SIGN_IN_SUCCESS, user })
            resolve()
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
      .then((user) => { dispatch({ type: CURRENT_USER_FETCH_SUCCESS, user }) })
      .catch(() => { dispatch({ type: CURRENT_USER_FETCH_FAILED }) })
  }
}
