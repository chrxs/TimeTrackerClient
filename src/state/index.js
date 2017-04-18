import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import currentUser from './currentUser'
const { currentUserReducer } = currentUser

export const reducers = {
  currentUser: currentUserReducer
}

export const actions = {
  ...currentUser.actions
}

export const actionCreators = {
  ...currentUser.actionCreators
}

export const store = createStore(
  combineReducers(
    reducers
  ),
  applyMiddleware(thunk)
)

const state = {
  store,
  reducers,
  actions
}

export default state
