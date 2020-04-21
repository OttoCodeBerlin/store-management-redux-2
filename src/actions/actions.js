import axios from 'axios'
import { AUTH_CHANGE, LOAD_CUSTOMERS } from './actionTypes'

export const authAction = (payload) => {
  return {
    type: AUTH_CHANGE,
    payload,
  }
}

export const fetchCustomers = () => {
  return function (dispatch) {
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

export const setCustomers = (data) => {
  return {
    type: LOAD_CUSTOMERS,
    payload: data,
  }
}
