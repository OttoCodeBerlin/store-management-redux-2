import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    message: null
  }

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input
    this.setState({
      [name]: value
    })
  }

  //Submit data handler calling Auth Service
  handleSubmit = e => {
    if (e) e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    axios
      .post('/login', userData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('FirebaseIdToken', `Bearer ${res.data.token}`)
        this.props.history.push('/')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  submitForm = () => {
    this.handleSubmit()
  }

  render() {
    const { email, password, message } = this.state
    return (
      <div>
        <Navbar />
        <div className="container " style={{ position: 'relative' }}>
          <div className="container" style={{ marginTop: '90px', position: 'absolute' }}>
            <form className="vertical-center" onSubmit={this.handleSubmit}>
              <div className="form-group vertical-center">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleInput}
                />
              </div>
              <button type="submit" className="btn btn-secondary" onClick={this.submitForm}>
                Log In
              </button>
              <div className="mt-3">{message && <p>{message}</p>}</div>
              <p className="mt-5">
                If you don't have an account, please sign up <Link to="/signup">here</Link>.
              </p>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
