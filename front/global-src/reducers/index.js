import { combineReducers } from 'redux'
import signIn from './signInReducer'


let rootReducer = combineReducers({
  signIn
});

export default rootReducer