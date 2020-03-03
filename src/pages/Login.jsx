import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  submitForm = () => {
    this.setState({
      loading: true
    })
    this.props.submitHandler()
  }

  render() {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '80px' }}>
        <form onSubmit={this.props.submitHandler}>
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
                value={this.props.email}
                onChange={this.props.inputHandler}
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
                value={this.props.password}
                onChange={this.props.inputHandler}
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
