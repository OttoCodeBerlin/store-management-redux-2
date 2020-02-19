import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import axios from 'axios'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
      store_location: '',
      role: '',
      message: null
    }

    this.validator = new SimpleReactValidator()
  }

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input
    this.setState({
      [name]: value
    })
  }

  //Submit handler with AuthService
  handleSubmit = e => {
    if (e) e.preventDefault()

    const newUserData = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      store_location: this.state.store_location,
      role: this.state.role
    }

    axios
      .post('/signup', newUserData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  //Call final submit
  submitForm = () => {
    if (this.validator.allValid()) {
      alert('Thank you!')
      this.handleSubmit()
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render() {
    const { password, confirmPassword, handle, email, store_location, role, message } = this.state
    return (
      <div>
        {/* <Navbar /> */}
        <div className="container " style={{ position: 'relative' }}>
          <div className="container" style={{ marginTop: '90px', position: 'absolute' }}>
            <form className="vertical-center" onSubmit={this.handleSubmit}>
              <h5 className="title">Sign up</h5>
              <div className="form-group vertical-center">
                <label htmlFor="handle">Username</label>
                <input
                  type="text"
                  name="handle"
                  value={handle}
                  placeholder="Select Username..."
                  onChange={this.handleInput}
                  className="form-control"
                  id="handle"
                />
                {this.validator.message('handle', handle, 'required|alpha')}
              </div>
              <div className="form-group vertical-center">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleInput}
                  className="form-control"
                  id="email"
                />
                {this.validator.message('email', email, 'required|email')}
              </div>
              <div className="form-group vertical-center">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password..."
                  value={password}
                  onChange={this.handleInput}
                  className="form-control"
                  id="password"
                />
                {this.validator.message('password', password, 'required|min:3')}
              </div>
              <div className="form-group vertical-center">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password..."
                  value={confirmPassword}
                  onChange={this.handleInput}
                  className="form-control"
                  id="confirmPassword"
                />
                {this.validator.message('confirmPassword', confirmPassword, 'required|min:3')}
              </div>
              <div className="form-group vertical-center">
                <label htmlFor="store-location">Store Location</label>
                <select
                  className="custom-select mb-3"
                  id="store_location"
                  name="store_location"
                  value={store_location}
                  onChange={this.handleInput}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="Reforma">Reforma</option>
                  <option value="Polanco">Polanco</option>
                  <option value="Condesa">Condesa</option>
                  <option value="Cuauhtemoc">Cuauhtemoc</option>
                  <option value="Tacubaya">Tacubaya</option>
                  <option value="Buenos Aires, Argentina">Buenos Aires, Argentina</option>
                  <option value="La Habana, Cuba">La Habana, Cuba</option>
                </select>
                {this.validator.message('store location', store_location, 'required|alpha')}
              </div>
              <div className="form-group vertical-center">
                <label htmlFor="role">Role</label>
                <select className="custom-select mb-3" id="role" name="role" value={role} onChange={this.handleInput}>
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="Sales Representative">Sales Representative</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
                {this.validator.message('role', role, 'required|string')}
              </div>
              <button className="btn btn-secondary" onClick={this.submitForm}>
                Create Account
              </button>
            </form>
          </div>
          {/* Customer error message, if applicable */}
          {message && <p>{message}</p>}
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}
