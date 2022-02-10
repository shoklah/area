import React, { Component } from 'react';
import { View, TouchableOpacity, Button, Text, TextInput } from 'react-native';

class EmailAuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.hidePassword = this.hidePassword.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
    }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSignIn(this.state.email, this.state.password)
  }

  hidePassword = () => {
    let hash = ""
    let length = this.state.password.length
    for (let i = 0; i !== length; i++) {
      hash = hash + "*"
    }
    return hash
  }

  updatePassword = (text) => {
    let password = ""
    if (this.state.password.length < text.length) {
      let end = text.slice(this.state.password.length, text.length)
      password = this.state.password.concat(end[end.length - 1])
    } else {
      password = this.state.password.slice(0, text.length)
    }
    this.setState({
      password: password
    })
  }

  render() {
    return (
      <View>
        <TextInput placeholder={"E-Mail Address"} value={this.state.email} onChangeText={(text) => {this.setState({email: text})}}/>
    <TextInput placeholder={"Password"} textContentType={"password"} value={this.hidePassword()} onChangeText={this.updatePassword}/>
        <Button onPress={this.onSubmit} className="signin-submit" title={"Connect"} />
        {this.props.isWrong ? <Text className="signin-error">connection fail</Text> : null}
      </View>
    )
  }
}

export default EmailAuthComponent;