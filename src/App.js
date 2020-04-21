import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'

//Redux
// import { authAction } from './actions/actions'
// import { connect } from 'react-redux'

//Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//Pages
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import Profile from '../src/pages/Profile'
import ThankYou from '../src/pages/ThankYou'
import CustomerImage from '../src/pages/CustomerImage'
import About from '../src/pages/About'
import EditUser from '../src/pages/EditUser'

class App extends Component {
  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/thankyou" component={ThankYou} />
          <Route path="/edit" component={EditUser} />
          <Route path="/about" component={About} />
          <Route path="/confirm/:id" component={CustomerImage} />
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   ...state,
// })

// const mapDispatchToProps = (dispatch) => ({
//   authAction: (payload) => dispatch(authAction(payload)),
// })

export default App // connect(mapStateToProps, mapDispatchToProps)(App)
