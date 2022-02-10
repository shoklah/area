import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../styles/header.css";
import firebase from "firebase";
import { withRouter } from 'react-router-dom'

class HeaderComponent extends Component {
  componentDidMount() {}

  onClick() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <div class="main-navbar">
          <h1 class="logo">AREA</h1>
        </div>
        <Link to="/services">
          <button class="button_areas">My areas</button>
        </Link>
        <Link to="/home">
          <button class="button_home">Create area</button>
        </Link>
        <Link to="/">
          <button onClick={this.onClick} class="button_disconnect">
            Disconnect
          </button>
        </Link>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);