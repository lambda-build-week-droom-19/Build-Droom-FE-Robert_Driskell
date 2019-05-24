import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../sass/initialPage.scss";
import ReactSVG from "react-svg";
import Logo from "../../assets/image.svg";

class initialPage extends Component {
  constructor() {
    super();
    this.state = {
      //   myProActive: "link-active",
      //   matchesActive: "link-inactive",
      //   hamActive: "ham-inactive",
      //   windowWidth: 0,
      //   extendMobileNav: false
    };
  }

  render() {
    return (
      <>
        <div className="container-main-intial">
          <div className="container-sec-intial">
            <div className="container-thr-intial">
              <div className="container-fiv-intial">
                <p>
                  A quick and simple path to your <span>dream</span> job.
                </p>
                <Link
                  to="/signup"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </div>
            <div className="container-fou-intial">
              <div className="container-six-intial">
                <ReactSVG src={Logo} />
                <h1>Droom</h1>
              </div>
            </div>
          </div>
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
  mapStateToProps
  //   { getCurrentUser, updateCurrentUser }
)(initialPage);
