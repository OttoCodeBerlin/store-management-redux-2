import axios from 'axios'

import { AUTH_CHANGE, LOAD_CUSTOMERS, SET_USER } from './actionTypes'

export const authAction = (payload) => {
  return {
    type: AUTH_CHANGE,
    payload,
  }
}

export const fetchCustomers = () => {
  return (dispatch) => {
    axios
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
  return (dispatch) => {
    axios
      .post(process.env.REACT_APP_API_URL + '/login', userData)
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        //dispatch(login(true))
        dispatch(authAction(true))
        window.location.href = '/profile'
      })
      .catch((err) => {
        dispatch(authAction(false))
        console.error(err)
      })
  }
}

export const signupUser = (userData) => {
  return (dispatch) => {
    axios
      .post(process.env.REACT_APP_API_URL + '/signup', userData)
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        //dispatch(login(true))
        dispatch(authAction(true))
        window.location.href = '/profile'
      })
      .catch((err) => {
        dispatch(authAction(false))
        console.error(err)
      })
  }
}

export const getUser = () => {
  return (dispatch) => {
    axios
      .get(process.env.REACT_APP_API_URL + '/user', {
        headers: {
          Authorization: localStorage.FBIdToken,
        },
      })
      .then((res) => {
        dispatch(setUser(res.data))
        dispatch(authAction(true))
      })
      .catch((err) => {
        console.log(err)
        //this.props.history.push('/')
      })
  }
}

export const setCustomers = (data) => {
  return {
    type: LOAD_CUSTOMERS,
    payload: data,
  }
}

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: data,
  }
}

/* export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  }
} */

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch(authAction(false))
  }
}
