import React, { Component } from 'react';
import { View, TouchableOpacity, Button, Text, TextInput } from 'react-native';

class EmailSignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            verifPassword: "",
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.hidePassword = this.hidePassword.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.hideVerifPassword = this.hideVerifPassword.bind(this)
        this.hidePassword = this.hidePassword.bind(this)
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.verifPassword === this.state.password) {
            this.props.onSignUp(this.state.email, this.state.password)
        }
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

    hideVerifPassword = () => {
        let hash = ""
        let length = this.state.verifPassword.length
        for (let i = 0; i !== length; i++) {
            hash = hash + "*"
        }
        return hash
    }

    updateVerifPassword = (text) => {
        let password = ""
        if (this.state.verifPassword.length < text.length) {
            let end = text.slice(this.state.verifPassword.length, text.length)
            password = this.state.verifpassword.concat(end[end.length - 1])
        } else {
            password = this.state.verifPassword.slice(0, text.length)
        }
        this.setState({
            verifPassword: password
        })
    }

    render() {
        return (
            <View>
                <TextInput placeholder={"E-Mail Address"} value={this.state.email} onChangeText={(text) => {this.setState({email: text})}}/>
                <TextInput placeholder={"Password"} textContentType={"password"} value={this.hidePassword(this.state.password)} onChangeText={this.updatePassword}/>
                <TextInput placeholder={"Verify Password"} textContentType={"password"} value={this.hideVerifPassword(this.state.verifPassword)} onChangeText={this.updateVerifPassword}/>
                <Button title={"Sign Up"} onPress={this.onSubmit}/>
                {this.props.isWrong ? <Text className="signin-error">connection fail</Text> : null}
            </View>
        )
    }
}

export default EmailSignupComponent;