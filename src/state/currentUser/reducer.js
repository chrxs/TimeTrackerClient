import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_SUCCESS,
  CURRENT_USER_FETCH_BEGIN,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILED
} from './actions'

const initialState = {
  isLoading: false,
  isAuthenticated: Boolean(window.localStorage.getItem('AUTH_TOKEN')),
  data: {}
}

const signInSuccess = (state, user) => {
  return {
    ...state,
    isLoading: false,
    isAuthenticated: true,
    data: user
  }
}

const signOutSuccess = (state) => {
  return {
    isLoading: false,
    isAuthenticated: false,
    data: {}
  }
}

function currentUserReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_BEGIN:
    case CURRENT_USER_FETCH_BEGIN:
      return { ...state, isLoading: true }
    case SIGN_IN_SUCCESS:
    case CURRENT_USER_FETCH_SUCCESS:
      return signInSuccess(state, action.user)
    case SIGN_IN_FAILED:
    case CURRENT_USER_FETCH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      }
    case SIGN_OUT_SUCCESS:
      return signOutSuccess(state)
    default:
      return state
  }
}

export default currentUserReducer

// =============================================================================
// SELECTORS
// =============================================================================
export const isAuthenticated = (state) => {
  return state.currentUser.isAuthenticated
}

export const getCurrentUser = (state) => {
  return state.currentUser.data
}
