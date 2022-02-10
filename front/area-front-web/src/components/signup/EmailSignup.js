import React, { Component } from 'react';
import '../../styles/Signup.css';

class EmailSignupComponent extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    if (e.target.verifPassword.value === e.target.password.value) {
        this.props.onSignUp(e.target.email.value, e.target.password.value)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="email-auth">
          <input name={"email"} placeholder={"E-Mail Address"} />
          <input name={"password"} placeholder={"Password"} type={"password"}/>
          <input name={"verifPassword"} placeholder={"Verify Password"} type={"password"}/>
          <button className="submit" type={"submit"}>Sign Up</button>
        </form>
        {this.props.isWrong ? <span className="signin-error">connection fail</span> : null}
      </div>
    )
  }
}

export default EmailSignupComponent;