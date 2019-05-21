import React from 'react';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import { login } from "./actions/index"

import LoginPage from './routes/LoginPage';

/* import LandingPage from './routes/LandingPage';
import DebugRouteBobby from './DebugRouteBobby';
import DebugRouteChase from './DebugRouteChase'; */


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={LoginPage} />
                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public} />
                <PrivateRoute path="/protected" component={Protected} />
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

export default connect(mapStateToProps, { login })(App)

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

