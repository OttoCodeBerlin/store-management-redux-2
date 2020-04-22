import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import { connect } from 'react-redux'
import { authAction, signupUser } from '../actions/actions'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
      store_location: '',
      role: '',
    }

    this.validator = new SimpleReactValidator()

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this)
  }

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input
    this.setState({
      [name]: value,
    })
  }

  //Submit data handler for Signup
  handleSubmitSignup = (e) => {
    if (e) e.preventDefault()
    const userData = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      store_location: this.state.store_location,
      role: this.state.role,
    }
    this.props.signupUser(userData)
  }

  //Call final submit
  submitForm = () => {
    if (this.validator.allValid()) {
      this.setState({
        loading: true,
      })
      this.handleSubmitSignup()
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render() {
    const { password, confirmPassword, handle, email, store_location, role } = this.state

    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '80px' }}>
        <form className="vertical-center" onSubmit={this.handleSubmitSignup}>
          <h5 className="title">Sign up</h5>

          <div className="form-group row">
            <label htmlFor="handle" className="col-sm-5 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
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
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-sm-5 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
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
          </div>

          <div className="form-group row">
            <label htmlFor="password" className="col-sm-5 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
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
          </div>

          <div className="form-group row">
            <label htmlFor="confirmPassword" className="col-sm-5 col-form-label">
              Confirm Password
            </label>
            <div className="col-sm-10">
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
          </div>

          <div className="form-group row">
            <label htmlFor="store-location" className="col-sm-5 col-form-label">
              Store Location
            </label>
            <div className="col-sm-10">
              <select
                className="custom-select"
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
          </div>

          <div className="form-group row">
            <label htmlFor="role" className="col-sm-5 col-form-label">
              Role
            </label>
            <div className="col-sm-10">
              <select className="custom-select" id="role" name="role" value={role} onChange={this.handleInput}>
                <option value="" disabled>
                  Select...
                </option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              {this.validator.message('role', role, 'required|string')}
            </div>
          </div>

          {this.state.loading ? (
            <button className="btn btn-secondary" type="submit" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={this.submitForm}>
              Create Account
            </button>
          )}
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = {
  authAction,
  signupUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
