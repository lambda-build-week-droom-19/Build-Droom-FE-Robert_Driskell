import React from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";
import MatchEmployer from "./components/MatchEmployer";
import MatchSeeker from "./components/MatchSeeker";

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
        if(this.usertype === "employer") return <MatchEmployer/>; //employer view
        else if(this.usertype === "seeker") return <MatchSeeker/>; //Seker view
        else return <Redirect to="/login"/>; //Bounce them
    }
}
const mapStateToProps = state => 
{
    return 
    {
    }
}

export default connect(mapStateToProps, {})(MatchingApp);