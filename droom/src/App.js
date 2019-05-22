import React from 'react';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import { login, getCurrentUser } from "./actions/index"
import SignUpApp from "./views/SignUp/SignUpApp";

import LoginPage from './routes/LoginPage';

import CurrentCompanyProfile from './routes/CurrentCompanyProfile';
import JobProfile from './routes/JobProfile';

/* import LandingPage from './routes/LandingPage';
import DebugRouteBobby from './DebugRouteBobby';
import DebugRouteChase from './DebugRouteChase'; */


class App extends React.Component {
    logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    componentWillMount() {
        this.props.getCurrentUser();
    }
    
    render() {
        return (
            <div className="App">
                <button onClick={this.logout}>LOGOUT</button>
                <Route exact path="/" component={LoginPage} />
                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                    <li>
                        <Link to="/my-profile">My Profile</Link>
                    </li>
                </ul>
                <Route path="/my-profile" exact component={CurrentCompanyProfile} />
                <Route path="/public" component={Public} />
                <Route path="/signup" component={SignUpApp} />
                <PrivateRoute path="/protected" component={Protected} />
                <Route path="/job/:id" render={props => <JobProfile {...props}/>} />
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
        ...state
    }
}

export default connect(mapStateToProps, { login, getCurrentUser })(App)

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => {
                if (localStorage.getItem('userToken')) {
                    return <Component />;
                } else {
                    return <Redirect to="/" />;
                }
            }}
        />
    );
}


function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}
