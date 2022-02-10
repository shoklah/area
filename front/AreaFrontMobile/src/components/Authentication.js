import firebase from 'react-native-firebase';
import React from 'react';
import logo from '../public/img/areaLogoBig.jpeg';
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import EmailAuthContainer from '../containers/authentication/EmailAuthContainer';

firebase.initializeApp({
  apiKey: "AIzaSyCD0DEjbjHVX4nCgZOY6gocXWI_E2RS7zg",
  authDomain: "area-firebase.firebaseapp.com",
  databaseURL: "https://area-firebase.firebaseio.com",
  projectId: "area-firebase",
  storageBucket: "area-firebase.appspot.com",
  messagingSenderId: "1012312617919",
  appId: "1:1012312617919:web:8fbeb18de1906c2f73e70a",
  measurementId: "G-SXT3Y5RPKE"
})

export let firebaseAuth = firebase.auth();

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn : false,
      isWrong: false,
      ipAddress: ''
    }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeIp = this.onChangeIp.bind(this)
  }

    onSubmit(email, password) {
      if (email !== "" && password !== "") {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          this.setState({isWrong: false})
          this.props.navigation.navigate('/home', {userInfo: res, ipAddress: this.state.ipAddress})
        })
        .catch(error => {
          console.log(error)
          this.setState({isWrong: true})
        })
      }
      return (firebase)
    }

    onWantSignup = () => {
      this.props.navigation.navigate('/signup')
    }

    onChangeIp = (text) => {
      this.setState({
        ipAddress: text
      })
    }

    componentDidUpdate = () => {
    }

    render() {
      return (
        <View style={{flex: 1}}>
            <Image source={logo} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}/>
            <View style={{flex: 2}}>
              <TextInput onChangeText={this.onChangeIp} placeholder={"SERVER IP"}/>
              <EmailAuthContainer onSubmit={this.onSubmit} isWrong={this.state.isWrong}/>
              <TouchableOpacity onPress={this.onWantSignup}>
                <Text>Dont have an account ?</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }
  }

export default Authentication;