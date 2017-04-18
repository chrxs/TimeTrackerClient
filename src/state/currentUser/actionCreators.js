import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS
} from './actions.js'

export function signIn (email, password) {
  return (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: SIGN_IN_SUCCESS })
        resolve()
      }, 1000)
    })
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
