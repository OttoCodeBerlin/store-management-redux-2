import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

//Components
import AuthRoute from './util/AuthRoute'

//Pages
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import Profile from '../src/pages/Profile'
import ThankYou from '../src/pages/ThankYou'
import CustomerImage from '../src/pages/CustomerImage'
import About from '../src/pages/About'
// import Navbar from './components/Navbar'

// require('dotenv').config()

let authenticated
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

console.log(authenticated)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {/* <Navbar /> */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
              <AuthRoute exact path="/profile" component={Profile} authenticated={authenticated} />
              <Route exact path="/thankyou" component={ThankYou} />
              <Route exact path="/about" component={About} />
              <Route exact path="/confirm/:id" component={CustomerImage} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
