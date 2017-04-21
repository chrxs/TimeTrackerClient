import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_SUCCESS,
  FETCH_CURRENT_USER_BEGIN,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILED
} from './actions'

const initialState = {
  isLoading: false,
  data: {}
}

const signInSuccess = (state, user) => {
  return {
    ...state,
    isLoading: false,
    data: user
  }
}

const signOutSuccess = (state) => {
  return {...initialState}
}

function currentUserReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_BEGIN:
    case FETCH_CURRENT_USER_BEGIN:
      return { ...state, isLoading: true }
    case SIGN_IN_SUCCESS:
    case FETCH_CURRENT_USER_SUCCESS:
      return signInSuccess(state, action.user)
    case SIGN_IN_FAILED:
    case FETCH_CURRENT_USER_FAILED:
      return { ...state, isLoading: false }
    case SIGN_OUT_SUCCESS:
      window.localStorage.removeItem('AUTH_TOKEN')
      return signOutSuccess(state)
    default:
      return state
  }
}

export default currentUserReducer

export const isAuthenticated = () => {
  return Boolean(window.localStorage.getItem('AUTH_TOKEN'))
}

export const getCurrentUser = (state) => {
  return state.currentUser.data
}
