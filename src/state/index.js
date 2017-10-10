import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import clientsReducer from 'state/clients/reducer'
import projectsReducer from 'state/projects/reducer'
import teamsReducer from 'state/teams/reducer'
import usersReducer from 'state/users/reducer'
import daysReducer from 'state/days/reducer'
import timeRecordsReducer from 'state/timeRecords/reducer'

export const reducers = combineReducers({
  clients: clientsReducer,
  projects: projectsReducer,
  teams: teamsReducer,
  users: usersReducer,
  days: daysReducer,
  timeRecords: timeRecordsReducer
})

const composeEnhancers = composeWithDevTools({})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const state = {
  store,
  reducers
}

export default state
