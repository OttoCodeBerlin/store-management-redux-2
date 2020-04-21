import axios from 'axios'
import { AUTH_CHANGE, LOAD_CUSTOMERS, LOGIN } from './actionTypes'

export const authAction = (payload) => {
  return {
    type: AUTH_CHANGE,
    payload,
  }
}

export const fetchCustomers = () => {
  return (dispatch) => {
    return axios
      .get(process.env.REACT_APP_API_URL + '/customers')
      .then((res) => {
        dispatch(setCustomers(res.data))
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export const loginUser = (userData) => {
  console.log(userData)
  return (dispatch) => {
    axios
      .post(process.env.REACT_APP_API_URL + '/login', userData)
      .then((res) => {
        console.log(res)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        dispatch(login(true))
        dispatch({ type: LOGIN, userData: res.data })
        // this.props.authAction(true)
      })
      .catch((err) => {
        dispatch(authAction(false))
        console.error(err)
      })
  }
}

export const setCustomers = (data) => {
  return {
    type: LOAD_CUSTOMERS,
    payload: data,
  }
}

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  }
}
