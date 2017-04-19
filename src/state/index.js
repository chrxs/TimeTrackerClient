import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

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

const composeEnhancers = composeWithDevTools({})

export const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const state = {
  store,
  reducers,
  actions
}

export default state
