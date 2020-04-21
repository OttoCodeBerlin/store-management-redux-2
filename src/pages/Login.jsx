import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { authAction, loginUser } from '../actions/actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: '',
      password: '',
    }
  }

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input
    this.setState({
      [name]: value,
    })
  }

  //Submit data handler for Login
  handleSubmitLogin = (e) => {
    if (e) e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.loginUser(userData)

    window.location.href = '/profile'
  }

  submitForm = () => {
    this.setState({
      loading: true,
    })
    this.handleSubmitLogin()
  }

  render() {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '80px' }}>
        <form onSubmit={this.handleSubmitLogin}>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="email">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInput}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              {' '}
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </div>
          </div>

          {this.state.loading ? (
            <button className="btn btn-secondary" type="submit" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary" onClick={this.submitForm}>
              Log In
            </button>
          )}

          <p className="mt-5">
            If you don't have an account, please sign up <Link to="/signup">here</Link>.
          </p>
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
  loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
