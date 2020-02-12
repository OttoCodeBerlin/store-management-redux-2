import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

//Components
import AuthRoute from './util/AuthRoute'
import Navbar from './components/Navbar'

//Pages
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import Profile from '../src/pages/Profile'
import ThankYou from '../src/pages/ThankYou'
import CustomerImage from '../src/pages/CustomerImage'
import About from '../src/pages/About'


export default class App extends Component {
  state = {
    user: null,
    authenticated: false
  }

  componentDidUpdate() {
    const token = localStorage.FBIdToken
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        // window.location.href = '/login'
        this.setState({
          authenticated: false
        })
      } else {
        this.setState({
          authenticated: true
        })
      }
    } else {
      this.setState({
        authenticated: false
      })
    }

    if (this.state.authenticated) {
      axios
        .get(process.env.REACT_APP_API_URL + '/user')
        .then(res => {
          this.setState({
            user: res.data.credentials
          })
        })
        .catch(err => console.log(err))
    } else {
    }
  }

  render() {
    const { user, authenticated } = this.state
    console.log(user)
    console.log(authenticated)
    return (
      <div className="App">
        <Router>
          <Navbar user={user} authenticated={authenticated} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <AuthRoute exact path="/profile" component={Profile} authenticated={authenticated} user={user} />
              <Route exact path="/thankyou" component={ThankYou} />
              <Route exact path="/about" component={About} />
              <AuthRoute exact path="/confirm/:id" component={CustomerImage} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
