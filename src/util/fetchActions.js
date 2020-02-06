import axios from 'axios'

export const getUserData = ()  => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}