import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import landing from '../public/img/landing.png';
import '../styles/Landing.css';

class LandingComponent extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Link to="/signin">
          <img className="landing" src={landing} alt="" />
        </Link>
      </div>
    );
  }
}

export default LandingComponent;
