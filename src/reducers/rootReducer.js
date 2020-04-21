import { combineReducers } from 'redux'
import { AUTH_CHANGE, LOAD_CUSTOMERS } from '../actions/actionTypes'

const authReducer = (state = { authenticated: true }, action) => {
  console.log(action)
  switch (action.type) {
    case AUTH_CHANGE: {
      console.log('Auth change triggered with signal: ' + action.payload)
      return { ...state, authenticated: action.payload }
    }
    default:
      return state
  }
}

const customersReducer = (state = { customers: [] }, action) => {

  switch (action.type) {
    case LOAD_CUSTOMERS: {
      console.log('Auth change triggered with signal: ' + action.payload)
      return { ...state, customers: action.payload }
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  customers: customersReducer
})

export default rootReducer
