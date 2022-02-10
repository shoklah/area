import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Button, TextInput } from 'react-native'
import firebase from "react-native-firebase"
import {firebaseAuth} from "./Authentication";

class SettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionParam: '',
      reactionParam: '',
    };

    this.ipAddress = this.props.route.params.ipAddress;
    this.action = this.props.route.params.action;
    this.reaction = this.props.route.params.reaction;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
  }

  navigate(dest) {
    this.props.navigation.navigate(dest, {userInfo: this.props.route.params.userInfo, ipAddress: this.props.route.params.ipAddress})
  }

  handleSubmit(event) {
    if (this.state.actionParam === ''
      || this.state.reactionParam === ''
      || this.state.actionParam === undefined
      || this.state.reactionParam === undefined
    ) {
      this.setState({
        ["informations"]: "Sélection invalide"
      });
    } else {
      const settings = this;
      firebaseAuth.currentUser.getIdToken(true).then(function(idToken) {
        fetch(
          'http://' + settings.ipAddress + ':8080/services/',
          {
            method: 'POST',
            body: JSON.stringify({
              type: settings.action.getApiName(),
              value: settings.state.actionParam,
              user_id: firebaseAuth.currentUser.uid,
              reaction: settings.reaction.getApiName(),
              reaction_arg: settings.state.reactionParam
            }),
            headers: {'Content-Type': 'application/json', 'authtoken': idToken}
          }
        ).then(res => {
          console.log(res)
          settings.navigate('/home')
        })
        .catch(error => {
          console.log(error)
        })
      })
    }
  }

  handleInputChange(event, type) {
    if (type === "action") {
      this.setState({
        actionParam: event.nativeEvent.text
      });
    } else {
      this.setState({
        reactionParam: event.nativeEvent.text
      });
    }
  }

  navigate(dest) {
    this.props.navigation.navigate(dest, {userInfo: this.props.route.params.userInfo, ipAddress: this.ipAddress})
  }

  render() {
    if (!this.action || !this.reaction) {
      // this message never shows up, the page is always going to home instantly
      return (
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("/home", {userInfo: this.props.route.params.userInfo, ipAddress: this.ipAddress})}}>
          <Text>Une erreur est survenue. Retournez à la page d'acceuil en cliquant sur ce message.</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View>
        {}
          <View>
            <Button title={"My areas"} onPress={() => this.navigate('/services')} class="button_areas"></Button>
            <Button title={"Create area"} onPress={() => this.navigate('/home')} class="button_home"></Button>
            <Button title={"Disconnect"} onPress={() => this.navigate('/signin')} class="button_disconnect"></Button>
          </View>
          <View class="wrapper">
            <View class="one mybox">
              <Text>Action</Text>
                <TextInput placeholder={`${this.action.getSentence()} avec ${this.action.getVariable()} étant :`} name="actionParam" onChange={(event) => this.handleInputChange(event, "action")}/>
                <Text class="grey">{this.action.getTips() !== ""?this.action.getTips():""}</Text>
            </View>
            <View class="two mybox">
              <Text>Reactions</Text>
                <TextInput placeholder={`${this.reaction.getSentence()} avec ${this.reaction.getVariable()} étant :`} name="reactionParam" onChange={(event) => this.handleInputChange(event, "reaction")}/>
                <Text class="grey">{this.reaction.getTips() !== ""?this.reaction.getTips():""}</Text>
            </View>
          </View>
          <View class='res'>
            <Button title={"submit"} onPress={this.handleSubmit} value="Finaliser la création" class="button"/>
            <Text class="informations">{ this.state.informations }</Text>
          </View>
      </View>
    )
  }
}

export default SettingsComponent;