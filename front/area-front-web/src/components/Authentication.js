import React, { Component } from 'react';
import '../styles/App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import EmailAuthContainer from '../containers/authentication/EmailAuthContainer';
import logo from '../public/img/areaLogoBig.jpeg';
import { Link } from 'react-router-dom';
import '../styles/Authentication.css';

firebase.initializeApp({
  apiKey: 'AIzaSyCD0DEjbjHVX4nCgZOY6gocXWI_E2RS7zg',
  authDomain: 'area-firebase.firebaseapp.com',
  databaseURL: 'https://area-firebase.firebaseio.com',
  projectId: 'area-firebase',
  storageBucket: 'area-firebase.appspot.com',
  messagingSenderId: '1012312617919',
  appId: '1:1012312617919:web:8fbeb18de1906c2f73e70a',
  measurementId: 'G-SXT3Y5RPKE'
});

export const firebaseAuth = firebase.auth();

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isWrong: false
    };
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.props.history.push('home');
          this.props.history.go();
          return false;
        }
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({ isSignedIn: true, isWrong: false });
        this.props.history.push('home');
        this.props.history.go();
      })
      .catch(error => {
        console.log(error);
        this.setState({ isWrong: true });
      });
    return firebase;
  };

  render() {
    return (
      <div className="authentication-container">
        <img className="logo" src={logo} alt="" />
        <h3>Connection</h3>
        <EmailAuthContainer
          onSubmit={this.onSubmit}
          isWrong={this.state.isWrong}
        />
        <Link className="signup" to="/signup">
          <span>New user ? Create an account !</span>
        </Link>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default Authentication;
