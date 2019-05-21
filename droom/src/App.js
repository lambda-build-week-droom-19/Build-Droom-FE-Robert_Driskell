import React from 'react';
import './App.css';
import { fakeAuth } from './utils/axiosWithAuth';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom"
import {login} from "./actions/index"
import SignUpApp from './views/SignUp/SignUpApp';
/* import LandingPage from './routes/LandingPage';
import DebugRouteBobby from './DebugRouteBobby';
import DebugRouteChase from './DebugRouteChase'; */

class App extends React.Component {
    render(){
        return (
            <div className="App">
                <AuthButton />
                    <ul>
                        <li>
                            <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected Page</Link>
                        </li>
                    </ul>
                    <Route path="/public" component={Public} />
                    <Route path="/login" exact render={(props)=> (<Login {...props} logincb={this.props.login} />)} />
                    <Route path="/signup" exact render={(props) => (<SignUpApp {...props}/>)} />
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

const mapStateToProps = state => 
{
    return {
        ...state
    }
}

export default connect(mapStateToProps, {login})(App)


const AuthButton = withRouter(
    ({ history }) =>
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              fakeAuth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  );


  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          fakeAuth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }


  function Public() {
    return <h3>Public</h3>;
  }
  
  function Protected() {
    return <h3>Protected</h3>;
  }


  class Login extends React.Component {
    state = { redirectToReferrer: false, credentials: {username: "chase", password: "chase123"}};
  
    login = () => {
        fakeAuth.authenticate(this.state.credentials, this.props.logincb, () => this.props.history.push("/protected"));
    };
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: "/" } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
          <button><Link to="/signup" >Sign Up</Link></button>
        </div>
      );
    }
  }