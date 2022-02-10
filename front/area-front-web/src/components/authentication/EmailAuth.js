import React, { Component } from 'react';
import '../../styles/Authentication.css';

class EmailAuthComponent extends Component {
  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSignIn(e.target.email.value, e.target.password.value)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="email-auth">
          <input name={"email"} placeholder={"E-Mail Address"} />
          <input name={"password"} placeholder={"Password"} type={"password"}/>
          <button className="signin-submit" type={"submit"}>Connect</button>
        </form>
        {this.props.isWrong ? <span className="signin-error">connection fail</span> : null}
      </div>
    )
  }
}

export default EmailAuthComponent;