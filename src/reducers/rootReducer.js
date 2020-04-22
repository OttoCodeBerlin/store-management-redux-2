import { combineReducers } from 'redux'
import { AUTH_CHANGE, LOAD_CUSTOMERS, LOGIN, SET_USER } from '../actions/actionTypes'

const authReducer = (state = { authenticated: false }, action) => {
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

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state }
    }
    default:
      return state
  }
}

const userReducer = (
  state = {
    user: {
      handle: '',
      userId: '',
      email: '',
      createdAt: '',
      role: '',
      store_location: '',
    },
  },
  action
) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, user: action.payload }
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  customers: customersReducer,
  login: loginReducer,
  user: userReducer,
})

export default rootReducer
