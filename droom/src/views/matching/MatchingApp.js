import React from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";
import MatchEmployer from "./components/MatchEmployer";
import MatchSeeker from "./components/MatchSeeker";
import {swipeMatch} from "../../actions"

class MatchingApp extends React.Component
{
    usertype = "";
    componentWillMount()
    {
        this.usertype = localStorage.getItem('userType');
        if(this.usertype !== "seeker" || this.usertype !== "employer") this.props.history.push({to: "/login"});
    }
    render()
    {
        console.log(this.props.currentMatches)
        var component = <div></div>
        if(this.usertype === "employer") component = <MatchEmployer />; //employer view
        else if(this.usertype === "seeker") component = <MatchSeeker />; //Seker view
        else component = <Redirect to="/login"/>; //Bounce them

        return (
            <div>
                {component}
                <div><button onClick={()=> this.props.swipeMatch(0)}>-</button><button onClick={()=> this.props.swipeMatch(1)}>+</button></div> 
            </div>
        )
    }
}
const mapStateToProps = state => 
{
    return {...state.matcher, user_data: state.userReducer};
}

export default connect(mapStateToProps, {swipeMatch})(MatchingApp);