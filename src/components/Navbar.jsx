import React, { Component } from 'react'
import logo from '../images/ocb_logo_200x200.png'
// import axios from 'axios'
// import jwtDecode from 'jwt-decode'

export default class Navbar extends Component {
  // state = {
  //   user: '',
  //   authenticated: false
  // }

  //   componentDidMount() {
  //     const token = localStorage.FBIdToken
  //     if (token) {
  //       const decodedToken = jwtDecode(token)
  //       if (decodedToken.exp * 1000 < Date.now()) {
  //         // window.location.href = '/login'
  //         this.setState({
  //           authenticated: false
  //         })
  //       } else {
  //         this.setState({
  //           authenticated: true
  //         })
  //       }
  //     } else {
  //       this.setState({
  //         authenticated: false
  //       })
  //     }

  // if (this.state.authenticated)
  //    { axios
  //       .get(process.env.REACT_APP_API_URL + '/user')
  //       .then(res => {
  //         this.setState({
  //           user: res.data.credentials.handle
  //         })
  //       })
  //       .catch(err => console.log(err))}
  //       else {

  //       }
  //   }

  render() {
    const { user, authenticated } = this.props
    console.log(this.props)
    return (
      <div>
        <nav className="navbar fixed-top navbar-light pt-1 pb-0" style={{ backgroundColor: '#D2D3D6' }}>
          <a className="navbar-brand" style={{ fontSize: '1.5rem' }} href="/">
            <img src={logo} width="50" height="50" alt="" className="d-inline-block mr-3" />
            Customer Management System
          </a>

          {authenticated ? (
            <small>
              Logged in as <b>{user.handle}</b>{' '}
            </small>
          ) : (
            <small>
              Logged Out
              {/* Logged Out - Login <a href="/login">here</a>{' '} */}
            </small>
          )}
        </nav>
      </div>
    )
  }
}
