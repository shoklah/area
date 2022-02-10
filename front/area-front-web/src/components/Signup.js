import React, { Component } from 'react';
import '../styles/App.css';
import firebase from 'firebase';
import logo from '../public/img/areaLogoBig.jpeg';
import '../styles/Authentication.css';
import EmailSignup from '../containers/signup/EmailSignupContainer';
import { Link } from 'react-router-dom';

class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isWrong: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({ isSignedIn: true, isWrong: false });
        this.props.history.push('home');
        this.props.history.go();
      })
      .catch(error => {
        console.log(error);
        this.setState({ isWrong: true });
      });
  };

  render() {
    return (
      <div className="signup-container">
        <img className="logo" src={logo} alt="" />
        <h3>Sign Up to AREA</h3>
        <EmailSignup onSubmit={this.onSubmit} isWrong={this.state.isWrong} />
        <Link className="signup" to="/signin">
          <span>Already have an account ? Log in</span>
        </Link>
      </div>
    );
  }
}

export default SignupComponent;
