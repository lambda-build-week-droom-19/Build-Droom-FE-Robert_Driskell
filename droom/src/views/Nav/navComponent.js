import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import { getCurrentUser, updateCurrentUser } from "../actions/index";
// import { axiosWithAuth } from "../utils/axiosWithAuth";

class navComponent extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="container-main-nav">
        {/* <Preferences/> */}
        <nav>
          <Link className="Nav-link" to="/my-profile">
            My Profile
          </Link>
          <Link className="Nav-link" to="/matches">
            Matches
          </Link>
        </nav>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    // seeker: state.userReducer.currentUser
  };
};

export default connect(
  mapStateToProps,
//   { getCurrentUser, updateCurrentUser }
)(navComponent);
