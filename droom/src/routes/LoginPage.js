import React, { Component } from "react";
import { connect } from "react-redux";

import { login, getCurrentUser } from "../actions";
import "../sass/Login.scss";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    };
  }

  handleChanges = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .login(this.state.credentials, ()=> this.props.history.push("/match"))
      .then(() => {
        
      })
      .then(() => {
        this.props.getCurrentUser();
      });

    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <div className="login-main">
        <h2>Welcome Back!</h2>
        <form className="signin-input-log" onSubmit={this.handleSubmit}>
          <label for="username2">User Name</label>
          <input
            id="username2"
            name="username"
            type="text"
            value={this.state.credentials.username}
            onChange={this.handleChanges}
            placeholder="Username"
          />
          <label for="password2">Password</label>
          <input
            id="password2"
            name="password"
            type="text"
            value={this.state.credentials.password}
            onChange={this.handleChanges}
            placeholder="Password"
          />
          <input className="inputBTN" type="submit" value="Sign In" />
        </form>
      </div>
    );
  }
}

//ADD STATE AS FUNCTIONALITY IS IMPROVED, NEED ERROR AND AUTH
const mapStateToProps = state => ({
  isLoggingIn: state.isLoggingIn
});

export default connect(
  mapStateToProps,
  { login, getCurrentUser }
)(LoginPage);
