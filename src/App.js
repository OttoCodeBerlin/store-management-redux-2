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

// if (authenticated) {
//   axios
//     .get(process.env.REACT_APP_API_URL + '/user')
//     .then(res => {
//       this.setState({
//         user: res.data.credentials
//       })
//     })
//     .catch(err => console.log(err))
// } else {
// }

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { email: '', password: '' }
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //Input handler
  // handleInput = ({ target: input }) => {
  //   const { name, value } = input
  //   this.setState({
  //     [name]: value
  //   })
  // }

  handleInput = ({ target: input }) => {
    console.log('Input Called')
    const { name, value } = input
    this.setState({
      user: { [name]: value }
    })
  }

  //Submit data handler calling Auth Service
  handleSubmit = e => {
    console.log('Submit Called')
    if (e) e.preventDefault()

    const userData = {
      email: this.state.user.email,
      password: this.state.user.password
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/login', userData)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        this.props.history.push('/profile')
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { user } = this.state
    console.log(user)
    console.log(authenticated)
    return (
      <div className="App">
        <Router>
          {/* <Navbar user={user} authenticated={authenticated} /> */}
          {/* <div className="container"> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              component={Login}
              email={this.state.user.email}
              password={this.state.user.password}
              submitHandler={this.handleSubmit}
              inputHandler={this.handleInput}
            />
            <Route path="/signup" component={Signup} />
            <AuthRoute path="/profile" component={Profile} authenticated={authenticated} user={user} />
            <Route path="/thankyou" component={ThankYou} />
            <Route path="/about" component={About} />
            <AuthRoute path="/confirm/:id" component={CustomerImage} authenticated={authenticated} />
          </Switch>
          {/* </div> */}
        </Router>
      </div>
    )
  }
}
