import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
    this.validator = new SimpleReactValidator()
  }

  //Call final submit
  submitForm = () => {
    if (this.validator.allValid()) {
      this.setState({
        loading: true
      })
      this.props.submitHandler()
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render() {
    const { password, confirmPassword, handle, email, store_location, role, inputHandler, submitHandler } = this.props
    return (
      <div>
        {/* <Navbar /> */}
        <div className="container " style={{ position: 'relative' }}>
          <div className="container" style={{ marginTop: '90px', position: 'absolute' }}>
            <form className="vertical-center" onSubmit={submitHandler}>
              <h5 className="title">Sign up</h5>
              <div className="form-group vertical-center">
                <label htmlFor="handle">Username</label>
                <input
                  type="text"
                  name="handle"
                  value={handle}
                  placeholder="Select Username..."
                  onChange={inputHandler}
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
                  onChange={inputHandler}
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
                  onChange={inputHandler}
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
                  onChange={inputHandler}
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
                  onChange={inputHandler}
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
                <select className="custom-select mb-3" id="role" name="role" value={role} onChange={inputHandler}>
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="Sales Representative">Sales Representative</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
                {this.validator.message('role', role, 'required|string')}
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
          {/* Customer error message, if applicable */}
          {/* {message && <p>{message}</p>} */}
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}
