import * as actions from './actions.js'
import * as actionCreators from './actionCreators.js'
import currentUserReducer from './reducer.js'

const currentUser = {
  actions,
  actionCreators,
  currentUserReducer
}

export default currentUser
