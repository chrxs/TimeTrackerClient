import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import currentUser from './currentUser'
const { currentUserReducer } = currentUser
import projectsReducer from 'state/projects/reducer'
import daysReducer from 'state/days/reducer'
import timeRecordsReducer from 'state/timeRecords/reducer'

export const reducers = combineReducers({
  currentUser: currentUserReducer,
  projects: projectsReducer,
  days: daysReducer,
  timeRecords: timeRecordsReducer
})

export const actions = {
  ...currentUser.actions
}

export const actionCreators = {
  ...currentUser.actionCreators
}

const composeEnhancers = composeWithDevTools({})

export const store = createStore(
  reducers,
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
