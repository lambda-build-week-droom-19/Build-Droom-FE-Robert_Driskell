import React from "react";
import { register } from "../../../actions";
import { connect } from "react-redux";
import "../../../sass/SignUpUserNames.scss";
class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
        confirm: ""
      }
    };
  }
  componentDidMount() {}
  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  authenticate(type, cb) {
    if (
      this.state.credentials === {} ||
      this.state.credentials.password === "" ||
      this.state.credentials.username === ""
    )
      return;
    if (this.state.credentials.password !== this.state.credentials.confirm)
      return;
    this.props.setData({ user_type: parseInt(type) });
    this.props.register(
      {
        username: this.state.credentials.username,
        password: this.state.credentials.password,
        user_type: parseInt(type)
      },
      cb
    );
  }
  render() {
    //bypass
    return (
      <div className="signin-main">
        <h2>Welcome to Droom!</h2>
        <div
          className="signin-Input"
        >
          <label for="username1">User Name</label>
          <input
            id="username1"
            name="username"
            placeholder="User Name"
            onChange={this.handleChange}
          />
          <label for="password1">Password</label>
          <input
            id="password1"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <label for="confirm1">Confirm Password</label>
          <input
            id="confirm1"
            name="confirm"
            placeholder="Comfirm"
            onChange={this.handleChange}
          />
        </div>
        <h3>Who are you?</h3>
        <div className="signin-type">
          {this.props.index() !== 0 ? (
            <button
              onClick={() => {
                this.authenticate(this.props.prev);
              }}
            >
              Prev
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              this.authenticate(0, this.props.next);
            }}
          >
            Seeker
          </button>
          <button
            onClick={() => {
              this.authenticate(1, this.props.next);
            }}
          >
            Empoyeer
          </button>
          <button onClick={() => this.props.next()}> bypass</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Username);
