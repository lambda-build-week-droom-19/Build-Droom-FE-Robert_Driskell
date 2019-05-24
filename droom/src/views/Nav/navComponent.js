import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../sass/navigation.scss";

// import { getCurrentUser, updateCurrentUser } from "../actions/index";
// import { axiosWithAuth } from "../utils/axiosWithAuth";

class navComponent extends Component {
    constructor() {
        super();
        this.state = {
            myProActive: "link-active",
            matchesActive: "link-inactive",
            hamActive: "ham-inactive",
            windowWidth: 0,
            extendMobileNav: false
        };
    }

    componentDidMount() {
        let width = window.innerWidth;
        console.log(width);
        this.setState({
            windowWidth: width
        });
        window.addEventListener("resize", () => this.updateWidth());
    }

    // componentDidUpdate(prevProps, prevState){
    //   let width = window.innerWidth;
    //   console.log(width);
    //   if(prevState.windowWidth !== width){
    //     this.setState({
    //       windowWidth: width
    //     });
    //   }
    // }

    updateWidth = () => {
        let width = window.innerWidth;
        console.log(width);
        this.setState({
            windowWidth: width
        });
    };

    clickHamberger = () => {
        let x =
            this.state.hamActive === "ham-active" ? "ham-inactive" : "ham-active";
        this.setState({
            ...this.state,
            extendMobileNav: !this.state.extendMobileNav,
            hamActive: x
        });
    };

    clickLinkInExtended = value => {
        let x =
            this.state.hamActive === "ham-active" ? "ham-inactive" : "ham-active";
        this.setState(
            {
                ...this.state,
                extendMobileNav: !this.state.extendMobileNav,
                hamActive: x
            },
            () => {
                this.link(value);
            }
        );
    };

    link = btn => {
        for (let key in this.state) {
            console.log(key);
            console.log(btn);
            if (key !== "myProActive" && key !== "matchesActive") {
                continue;
            } else if (btn === key) {
                console.log("true");
                this.setState({
                    [key]: "link-active"
                });
            } else {
                console.log("false");
                this.setState({
                    [key]: "link-inactive"
                });
            }
        }
    };

    render() {
        return (
            <>
                <div className="transparent-nav">a</div>
                <div className="main-header">
                    <div className={`container-hamberger ${this.state.hamActive}`}>
                        <i onClick={this.clickHamberger} className={`fas fa-bars `} />
                    </div>
                    <h1>Droom</h1>
                </div>
                {this.state.extendMobileNav === true ? (
                    <div className={`container-main-nav ${this.state.extendMobileNav}`}>
                        <div className="container-sec-pro">{/* <Preferences/> */}</div>
                        <div className="container-sec-nav">
                            <h2>Name</h2>
                            <nav>
                                <Link
                                    onClick={() => {
                                        this.link("myProActive");
                                    }}
                                    className={`nav-link ${this.state.myProActive}`}
                                    to="/my-profile"
                                >
                                    My Profile
                </Link>
                                <Link
                                    onClick={() => {
                                        this.link("matchesActive");
                                    }}
                                    className={`nav-link ${this.state.matchesActive}`}
                                    to="/match"
                                >
                                    Matches
                </Link>
                            </nav>
                        </div>
                    </div>
                ) : (
                        <></>
                    )}
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
)(navComponent);
