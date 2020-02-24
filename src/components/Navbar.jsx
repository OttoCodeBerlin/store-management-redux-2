import React, { Component } from 'react'
import logo from '../images/ocb_logo_200x200.png'

export default class Navbar extends Component {
  render() {
    const { authenticated } = this.props
    // console.log(localStorage.FBIdToken) 
    let hyperlinkString
    authenticated  ? hyperlinkString="/profile" : hyperlinkString="/"
    return (
      <div>
        <nav className="navbar fixed-top navbar-light pt-1 pb-0" style={{ backgroundColor: '#D2D3D6' }}>
          <a className="navbar-brand" style={{ fontSize: '1.5rem' }} 
         href={hyperlinkString}
          >
            <img src={logo} width="50" height="50" alt="" className="d-inline-block mr-3" />
            Customer Management System
          </a>

          {/* {authenticated ? ( */}
            {/* <small> */}
              {/* Logged in as <b>{user.handle}</b>{' '} */}
            {/* </small> */}
          {/* ) : ( */}
            {/* <small> */}
              {/* Logged Out */}
              {/* Logged Out - Login <a href="/login">here</a>{' '} */}
            {/* </small> */}
          {/* )} */}
        </nav>
      </div>
    )
  }
}
