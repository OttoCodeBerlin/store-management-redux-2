import React, { Component } from 'react'
import logo from '../images/ocb_logo_200x200.png'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, getUser, authAction } from '../actions/actions'

class Navbar extends Component {
  componentDidMount() {
    const token = localStorage.FBIdToken

    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        authAction(false)
      } else {
        authAction(true)
      }
    } else {
      authAction(false)
    }
    this.props.getUser()
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    const { authenticated } = this.props.auth
    let hyperlinkString
    authenticated ? (hyperlinkString = '/profile') : (hyperlinkString = '/')
    return (
      <div>
        <nav
          className="navbar fixed-top navbar-light pt-1 pb-0 justify-content-between"
          style={{ backgroundColor: '#D2D3D6' }}
        >
          <a className="navbar-brand" style={{ fontSize: '1.5rem' }} href={hyperlinkString}>
            <img src={logo} width="50" height="50" alt="" className="d-inline-block mr-3" />
            Customer Management System
          </a>

          {authenticated ? (
            <form className="form-inline mb-1">
              <Link to="/login" className="btn btn-outline-secondary">
                Log Out
              </Link>
            </form>
          ) : (
            <form className="form-inline mb-1">
              <Link to="/signup" className="btn btn-secondary mr-2">
                Sign up
              </Link>

              <Link to="/login" className="btn btn-outline-secondary">
                Log in
              </Link>
            </form>
          )}
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = {
  logout,
  getUser,
  authAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
