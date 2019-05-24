import React from "react";
import "./sass/reset.scss";
import "./sass/global.scss";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { login, getCurrentUser } from "./actions/index";
import SignUpApp from "./views/SignUp/SignUpApp";

import LoginPage from "./routes/LoginPage";

import CurrentCompanyProfile from "./routes/CurrentCompanyProfile";
import JobProfile from "./routes/JobProfile";
import NavComponent from "./views/Nav/navComponent.js";
import MatchingApp from "./views/matching/MatchingApp";
import CurrentSeekerProfile from "./routes/CurrentSeekerProfile";
import SeekerProfileByID from './routes/SeekerProfileByID';
import CompanyProfileByID from './routes/CompanyProfileByID';
import CompanyAccepted from './routes/CompanyAccepted';

import initialPage from './views/InitialPage/initialPage.js';


/* import LandingPage from './routes/LandingPage';
import DebugRouteBobby from './DebugRouteBobby';
import DebugRouteChase from './DebugRouteChase'; */

var user_type = localStorage.getItem('userType');

class App extends React.Component {
    componentWillMount() {
        this.props.getCurrentUser();
    }

    componentWillUpdate()
    {
      user_type = localStorage.getItem('userType');
      if(Object.keys(this.props.currentUser).length === 0 && !this.props.gettingUser) this.props.getCurrentUser();
    }
    logout = () => {
        localStorage.clear();
        this.window.refresh();
    }
    render() {
        //if(this.props.isLogging) return <div></div>;
        return (
            <div className="App">
                {localStorage.getItem("userToken") ? <NavComponent/> : ""}
                {localStorage.getItem("userToken") ? <Link to="/login" onClick={this.logout}>LOGOUT</Link> : ""}
                <Route exact path="/login" component={LoginPage} />
                <InPrivateRoute exact path="/" component={initialPage} />
                {/* <ul>
                    <li key="1">
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li key="2">
                        <Link to="/protected">Matches</Link>
                    </li>
                    <li key="3">
                        <Link to="/my-profile">My Profile</Link>
                    </li>
                    <li>
                        <Link to="/intial">Initial Page</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>

                </ul> */}
                <Route path="/my-profile/" exact component={user_type === 'seeker' ? CurrentSeekerProfile : CurrentCompanyProfile} />

                <Route path="/signup" component={SignUpApp} />
                <PrivateRoute path="/match" component={MatchingApp} />
                <PrivateRoute path="/job/:id" exact component={JobProfile}/>
                <PrivateRoute path="/job/:id/:edit" component={JobProfile}/> 
                <Route
                  path="/seeker/:id"
                  render={props => (
                   <SeekerProfileByID {...props} />
                    )}
                 />
                <Route
                 path="/employer/:id"
                  render={props => (
                    <CompanyProfileByID {...props} />
                 )}
                />
                <Route path="/my-profile/accepted" component={CompanyAccepted}/>
                {/* 
                        Commented out routes for debuging
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="debug-bobby" component={DebugRouteBobby} />
                    <Route exact path="debug-chase" component={DebugRouteChase} /> 
                    
                    */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.loginReducer,
    ...state.userReducer
  };
};

export default connect(
  mapStateToProps,
  { login, getCurrentUser }
)(App);

const InPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("userToken")) {
          return <Redirect to="/match" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("userToken")) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

function Public() {
    return <Redirect to="/match"/>;
}

function Protected() {
    return <Redirect to="/match"/>;
}

function LogOut(props)
{
    return <button onClick={props.logout}>LOGOUT</button>;
}