import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from "react-native-firebase";

class HeaderComponent extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  onClick() {
    firebase.auth().signOut()
    this.props.navigation('/')
  }

  onServicePress = () => {
    this.props.navigation('/services')
  }

  onHomePress= () => {
    this.props.navigation('/home')
  }

  render() {
    return (
      <View>
        <Button title={"My areas"} onPress={this.onServicePress.bind(this)} class="button_areas"></Button>
        <Button title={"Create area"} onPress={this.onHomePress.bind(this)} class="button_home"></Button>
        <Button title={"Disconnect"} onPress={this.onClick} class="button_disconnect"></Button>
      </View>
    )
  }
}

export default HeaderComponent;