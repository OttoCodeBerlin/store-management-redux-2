import { combineReducers } from 'redux'
import { AUTH_CHANGE, LOAD_CUSTOMERS, LOGIN } from '../actions/actionTypes'

const authReducer = (state = { authenticated: true }, action) => {
  switch (action.type) {
    case AUTH_CHANGE: {
      return { ...state, authenticated: action.payload }
    }
    default:
      return state
  }
}

const customersReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS: {
      return { ...state, customers: action.payload }
    }
    default:
      return state
  }
}

const userReducer=(state ={}, action)=> {
  switch (action.type) {
    case LOGIN:  {
      return {...state}
    }
    default: 
    return state
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  customers: customersReducer,
  user: userReducer
})

export default rootReducer
