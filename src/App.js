import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

//Components
import AuthRoute from './util/AuthRoute'
// import Navbar from './components/Navbar'

//Pages
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import Profile from '../src/pages/Profile'
import ThankYou from '../src/pages/ThankYou'
import CustomerImage from '../src/pages/CustomerImage'
import About from '../src/pages/About'

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
} else {
  authenticated = false
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: {
        handle: '',
        userId: '',
        email: '',
        createdAt: '',
        role: '',
        store_location: ''
      }
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input
    this.setState({
      [name]: value
    })
  }

  // handleInput = (name, value) => {
  //   console.log(name)
  //   console.log(value)
  //   this.setState({
  //     [name]: value
  //   })
  //   console.log(this.state)
  // }

  //Submit data handler calling Auth Service
  handleSubmit = e => {
    if (e) e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios
      .post(process.env.REACT_APP_API_URL + '/login', userData)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        window.location.href = '/profile'
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    console.log(this.state.user)
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  email={this.state.email}
                  password={this.state.password}
                  submitHandler={this.handleSubmit}
                  inputHandler={this.handleInput}
                />
              )}
            />
            <Route path="/signup" component={Signup} />
            <Route
              path="/profile"
              render={props => <Profile {...props} user_email={this.state.email} authenticated={authenticated} />}
            />
            <Route path="/thankyou" component={ThankYou} />
            <Route path="/about" component={About} />
            <AuthRoute path="/confirm/:id" component={CustomerImage} authenticated={authenticated} />
          </Switch>
        </Router>
      </div>
    )
  }
}
