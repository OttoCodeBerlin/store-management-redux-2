import React, { Component } from 'react'
import logo from '../images/ocb_logo_200x200.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
  render() {
    const { authenticated } = this.props.auth
    console.log(authenticated)
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

export default connect(mapStateToProps)(Navbar)
