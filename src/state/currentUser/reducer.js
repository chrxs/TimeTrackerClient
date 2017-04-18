import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './actions'

const initialState = {
  isAuthenticated: false
}

const signInSuccess = (state) => {
  return {
    ...state,
    isAuthenticated: true
  }
}

const signOutSuccess = (state) => {
  return {...initialState}
}

function currentUserReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return signInSuccess(state)
    case SIGN_OUT_SUCCESS:
      return signOutSuccess(state)
    default:
      return state
  }
}

export default currentUserReducer
