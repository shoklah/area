import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "../styles/Landing.css";
import fetch from 'isomorphic-fetch';
import HeaderComponent from './Header';
import { Link } from "react-router-dom";
import { firebaseAuth } from "./Authentication";

class SettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    if (!this.props
      || !this.props.location
      || !this.props.location.state
      || !this.props.location.state.action
      || !this.props.location.state.reaction
      || !(typeof this.props.location.state.action.getSentence === "function")) {
        this.props.history.push("home");
        return;
    }
    this.action = this.props.location.state.action;
    this.reaction = this.props.location.state.reaction;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.actionParam === ''
      || this.state.reactionParam === ''
      || this.state.actionParam === undefined
      || this.state.reactionParam === undefined
    ) {
      this.setState({
        "informations" : "Sélection invalide"
      });
    } else {
      const settings = this;
      firebaseAuth.currentUser.getIdToken(true).then(function(idToken) {
        fetch(
          'http://localhost:8080/services/',
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
        );
      });
      this.props.history.push("home");
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.action || !this.reaction) {
      // this message never shows up, the page is always going to home instantly
      return (
        <Link to="/home">
          <p>Une erreur est survenue. Retournez à la page d'accueil en cliquant sur ce message.</p>
        </Link>
      );
    }
    return (
      <div>
        {}
          <HeaderComponent />
          <form onSubmit={this.handleSubmit}>
          <div class="wrapper">
            <div class="one mybox">
              <h2>Action</h2>
              <label>
                "{this.action.getSentence()}" avec "{this.action.getVariable()}" étant :
                <input name="actionParam" type="text" onChange={this.handleInputChange}/>
                <div class="grey">{this.action.getTips() !== ""?this.action.getTips():""}</div>
              </label>
            </div>
            <div class="two mybox">
              <h2>Reactions</h2>
              <label>
                "{this.reaction.getSentence()}" avec "{this.reaction.getVariable()}" étant :
                <input name="reactionParam" type="text" onChange={this.handleInputChange}/>
                <div class="grey">{this.reaction.getTips() !== ""?this.reaction.getTips():""}</div>
              </label>
            </div>
          </div>
          <div class='res'>
            <input type="submit" value="Finaliser la création" class="button"/>
            <div class="informations">{ this.state.informations }</div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(SettingsComponent);