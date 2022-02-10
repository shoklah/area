import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase';
import logo from '../public/img/areaLogoBig.jpeg';
import EmailSignup from '../containers/signup/EmailSignupContainer';

class SignupComponent extends Component {
  constructor(props) {
    super(props)
    this.state={
      isSignedIn: false,
      isWrong: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        this.props.navigation.navigate('/home')
        this.setState({isSignedIn: true, isWrong: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({isWrong: true})
    })
    return firebase
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image source={logo} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}/>
        <View style={{flex: 2}}>
            <Text>Sign Up to AREA</Text>
            <EmailSignup onSubmit={this.onSubmit} isWrong={this.state.isWrong}/>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('/signin')}}>
                <Text>Already have an account ? Log in</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default SignupComponent;