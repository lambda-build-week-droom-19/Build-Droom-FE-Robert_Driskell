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
        if(this.usertype === "employer") component = <MatchEmployer {...this.props} />; //employer view
        else if(this.usertype === "seeker") component = <MatchSeeker {...this.props} />; //Seker view
        else component = <Redirect to="/login"/>; //Bounce them
        console.log(this.props.user_data);
        return (
            <div>
                {component}
            </div>
        )
    }
}
const mapStateToProps = state => 
{
    return {...state.matcher, user_data: state.userReducer.currentUser};
}

export default connect(mapStateToProps, {swipeMatch})(MatchingApp);