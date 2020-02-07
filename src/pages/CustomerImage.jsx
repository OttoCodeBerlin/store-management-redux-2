import React, { Component } from 'react'
import Webcam from 'react-webcam'
// import { storage } from '../util/firebase-config'
import NavbarCustomer from '../components/NavbarCustomer'
import FooterCustomer from '../components/FooterCustomer'
import axios from 'axios'
import MediaQuery from 'react-responsive'
import SimpleReactValidator from 'simple-react-validator'
import logo from '../images/ocb_logo_200x200.png'

export default class CustomerImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      customerImage_1: null,
      customerImage_2: null,
      customerId: this.props.match.params.id,
      message: null,
      imageData_one: '',
      imageData_two: '',
      image_name: 'default',
      saveImage: false,
      loading: false
    }

    this.validator = new SimpleReactValidator()
  }

  //Handle Customer data input
  handleInput = ({ target: input }) => {
    const { name, value } = input
    this.setState({
      [name]: value
    })
  }

  //Set Webcam reference
  setRef = webcam => {
    this.webcam = webcam
  }

  //Take first shot
  capture_one = () => {
    const imageSrc = this.webcam.getScreenshot()
    this.setState({
      imageData_one: imageSrc
    })
  }

  //Take second shot
  capture_two = () => {
    const imageSrc = this.webcam.getScreenshot()
    this.setState({
      imageData_two: imageSrc
    })
  }

  //Save all data - call image save methods and write customer information to database
  handleSaveSubmit = e => {
    e.preventDefault()

    //Conversion function to write raw data to image file
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

    let img_one = dataURLtoFile(this.state.imageData_one, this.state.image_name + '1.jpg')
    let formData1 = new FormData()
    formData1.append('image1', img_one)
    let img_two = dataURLtoFile(this.state.imageData_two, this.state.image_name + '2.jpg')
    let formData2 = new FormData()
    formData2.append('image2', img_two)

    axios
      .post(process.env.REACT_APP_API_URL + '/customer/' + this.state.customerId + '/image2', formData2, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        return axios.post(process.env.REACT_APP_API_URL + '/customer/' + this.state.customerId + '/image1', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      })
      .then(response => {
        return axios.post(process.env.REACT_APP_API_URL + '/customer/' + this.state.customerId + '/image1', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      })
      .then(response => {
        return axios.post(process.env.REACT_APP_API_URL + '/customer/' + this.state.customerId, {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email
        })
      })
      .then(response => {
        return axios.post(process.env.REACT_APP_API_URL + '/customer/' + this.state.customerId + '/image1', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      })
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push('/thankyou')
      })
      .then(response => {
        return axios.post(process.env.REACT_APP_API_URL + '/customer/' + this.state.customerId + '/image2', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  //Call final submit
  submitForm = e => {
    if (this.validator.allValid()) {
      this.setState({ loading: true })
      this.handleSaveSubmit(e)
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  //RENDER PAGE
  render() {
    const { first_name, last_name, email, message } = this.state

    //Set video settings: Front camera, small picture size
    const videoConstraints = {
      width: 640,
      height: 480,
      facingMode: 'user'
    }

    return (
      <div className="container bg-2">
        <NavbarCustomer />
        {/* Header */}
        <div className="container mt-5">
          {/* View for large devices - Desktop */}
          <MediaQuery minDeviceWidth={1024}>
            <div className="jumbotron" style={{ opacity: '1', marginLeft: '15vw', marginRight: '15vw' }}>
              <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="title" style={{ fontFamily: 'Permanent Marker, cursive' }}>
                  DEAR CUSTOMER
                </h2>
                <h5 className="title">WE NEED SOME MORE INFORMATION.</h5>
                <h5 className="title">LET'S START WITH TWO PHOTOS.</h5>
              </div>
              <div className="container" style={{ textAlign: 'center' }}>
                <button className="btn btn-secondary m-1" onClick={this.capture_one}>
                  CAPTURE PHOTO 1
                </button>
                <button className="btn btn-secondary m-1" onClick={this.capture_two}>
                  CAPTURE PHOTO 2
                </button>
              </div>
              <div className="container" style={{ textAlign: 'center' }}>
                {/* <small>On mobile devices, please turn to LANDSCAPE mode for the photos.</small> */}
              </div>
              {/* Camera image */}
              <div className="container m-1" style={{ textAlign: 'center', opacity: '1' }}>
                <Webcam
                  audio={false}
                  height={336}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  width={448}
                  videoConstraints={videoConstraints}
                  className="rounded "
                  style={{ border: '1px solid #6C757D', opacity: '1' }}
                />
              </div>

              {/* Show image one after it was created */}
              {this.state.imageData_one ? (
                <div className="container m-1" style={{ textAlign: 'center', position: 'relative' }}>
                  <img
                    src={this.state.imageData_one}
                    alt=""
                    className="rounded"
                    style={{ border: '1px solid #6C757D', opacity: '1' }}
                  />
                  <span
                    className="badge badge-secondary"
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    PHOTO 1
                  </span>
                </div>
              ) : null}

              {/* Show image two AND input fields and submit button after second pic was created */}
              {this.state.imageData_two ? (
                <div style={{ textAlign: 'center' }}>
                  <div className="container m-1" style={{ textAlign: 'center' }}>
                    <img
                      src={this.state.imageData_two}
                      alt=""
                      className="rounded mt-1"
                      style={{ border: '1px solid #6C757D', opacity: '1' }}
                    />
                    <span
                      className="badge badge-secondary"
                      style={{ position: 'absolute', top: '116%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                      PHOTO 2
                    </span>
                  </div>
                  <div className="container">
                    <form>
                      <h5 className="title mt-4">MORE ABOUT YOU.</h5>
                      <div className="form-group">
                        <label htmlFor="first_name">FIRST NAME</label>
                        <input
                          id="first_name"
                          type="text"
                          name="first_name"
                          value={first_name}
                          onChange={this.handleInput}
                          className="form-control"
                          required
                        />
                        {this.validator.message('first name', first_name, 'required|alpha')}
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name">LAST NAME</label>
                        <input
                          id="email"
                          type="text"
                          name="last_name"
                          value={last_name}
                          onChange={this.handleInput}
                          className="form-control"
                          required
                        />
                        {this.validator.message('last name', last_name, 'required|alpha')}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <input
                          id="email"
                          type="text"
                          name="email"
                          value={email}
                          onChange={this.handleInput}
                          className="form-control"
                          required
                        />
                        {this.validator.message('email address', email, 'required|email')}
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          {/* <input className="form-check-input" type="checkbox" value={agreement} id="invalidCheck2" required />
                    {this.validator.message('agreement', agreement, 'required|boolean')} */}
                          <label className="form-check-label" htmlFor="invalidCheck2">
                            BY SUBMITTING YOUR DATA YOU AGREE TO{' '}
                            <a
                              href="https://www.termsfeed.com/blog/wp-content/uploads/2019/04/terms-and-conditions-template.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              TERMS AND CONDITIONS
                            </a>
                          </label>
                        </div>
                      </div>
                      {message && <p>{message}</p>}
                    </form>
                  </div>
                  <div className="container">
                    {this.state.loading ? (
                      <button className="btn btn-secondary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{' '}
                        UPLOADING...
                      </button>
                    ) : (
                      <button className="btn btn-secondary" onClick={this.submitForm} type="submit">
                        SAVE &amp; SEND
                      </button>
                    )}

                    <p style={{ fontFamily: 'Barlow, sans-serif' }}>
                      Powered By <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1" />
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </MediaQuery>
          {/* View for mobile devices */}
          <MediaQuery maxDeviceWidth={1023}>
            <div className="jumbotron" style={{ opacity: '1', backgroundColor: '#FFFFFF' }}>
              <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="title" style={{ fontFamily: 'Permanent Marker, cursive' }}>
                  DEAR CUSTOMER
                </h2>
                <h5 className="title">WE NEED SOME MORE INFORMATION.</h5>
                <h5 className="title">LET'S START WITH TWO PHOTOS.</h5>
              </div>
              <div className="container" style={{ textAlign: 'center' }}>
                <button className="btn btn-secondary m-1 ml-1" onClick={this.capture_one}>
                  CAPTURE PHOTO 1
                </button>
                <button className="btn btn-secondary m-1 ml-1" onClick={this.capture_two}>
                  CAPTURE PHOTO 2
                </button>
              </div>
              <div className="container" style={{ textAlign: 'center' }}>
                {/* <small>On mobile devices, please turn to LANDSCAPE mode for the photos.</small> */}
              </div>
              {/* Camera image */}
              <div className="container m-1" style={{ textAlign: 'center', opacity: '1' }}>
                <Webcam
                  audio={false}
                  height={144}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  width={192}
                  videoConstraints={videoConstraints}
                  className="rounded "
                  style={{ border: '1px solid #6C757D', textAlign: 'center' }}
                />
              </div>

              {/* Show image one after it was created */}
              {this.state.imageData_one ? (
                <div className="container m-1" style={{ textAlign: 'center', position: 'relative' }}>
                  <img
                    src={this.state.imageData_one}
                    alt=""
                    className="rounded"
                    style={{ border: '1px solid #6C757D', textAlign: 'center', opacity: '1' }}
                  />
                  {/* <span className="badge badge-secondary" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>PHOTO 1</span> */}
                </div>
              ) : null}

              {/* Show image two AND input fields and submit button after second pic was created */}
              {this.state.imageData_two ? (
                <div style={{ textAlign: 'center' }}>
                  <div className="container m-1" style={{ textAlign: 'center' }}>
                    <img
                      src={this.state.imageData_two}
                      alt=""
                      className="rounded mt-1"
                      style={{ border: '1px solid #6C757D', textAlign: 'center', opacity: '1' }}
                    />
                    {/* <span className="badge badge-secondary" style={{position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)'}}>PHOTO 2</span> */}
                  </div>
                  <div className="container">
                    <form>
                      <h5 className="title mt-4">MORE ABOUT YOU.</h5>
                      <div className="form-group">
                        <label htmlFor="first_name">FIRST NAME</label>
                        <input
                          id="first_name"
                          type="text"
                          name="first_name"
                          value={first_name}
                          onChange={this.handleInput}
                          className="form-control"
                          required
                        />
                        {this.validator.message('first name', first_name, 'required|alpha')}
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name">LAST NAME</label>
                        <input
                          id="email"
                          type="text"
                          name="last_name"
                          value={last_name}
                          onChange={this.handleInput}
                          className="form-control"
                          required
                        />
                        {this.validator.message('last name', last_name, 'required|alpha')}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <input
                          id="email"
                          type="text"
                          name="email"
                          value={email}
                          onChange={this.handleInput}
                          className="form-control"
                          required
                        />
                        {this.validator.message('email address', email, 'required|email')}
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          {/* <input className="form-check-input" type="checkbox" value={agreement} id="invalidCheck2" required />
                    {this.validator.message('agreement', agreement, 'required|boolean')} */}
                          <label className="form-check-label" htmlFor="invalidCheck2">
                            BY SUBMITTING YOUR DATA YOU AGREE TO{' '}
                            <a
                              href="https://www.termsfeed.com/blog/wp-content/uploads/2019/04/terms-and-conditions-template.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              TERMS AND CONDITIONS
                            </a>
                          </label>
                        </div>
                      </div>
                      {message && <p>{message}</p>}
                    </form>
                  </div>
                  <div className="container">
                    {this.state.loading ? (
                      <button className="btn btn-secondary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{' '}
                        UPLOADING...
                      </button>
                    ) : (
                      <button className="btn btn-secondary" onClick={this.submitForm} type="submit">
                        SAVE &amp; SEND
                      </button>
                    )}
                    {/* <button className="btn btn-secondary" onClick={this.submitForm} type="submit">
                      SAVE &amp; SEND
                    </button> */}
                    <p style={{ fontFamily: 'Barlow, sans-serif' }}>
                      Powered By <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1" />
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </MediaQuery>
        </div>
        <FooterCustomer />
      </div>
    )
  }
}
