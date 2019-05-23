import React from "react";
import {connect} from "react-redux";
import {getMatches} from "../../../actions";

class MatchSeeker extends React.Component
{
    usertype = "";
    componentDidMount()
    {
        this.props.getMatches(0);
    }
    render()
    {
        console.log(this.props.currentMatches);
        if(this.props.gettingMatch) return <div>Loading...</div>
        if(this.props.currentMatches.length === 0) return <div>ERROR</div>
        return <MatchProfile data={this.props.currentMatches[0]} />
    }
}
const mapStateToProps = state => 
{
    return { ...state.matcher}
}

export default connect(mapStateToProps, {getMatches})(MatchSeeker);


const MatchProfile = props =>
{
    return(<div>{props.data.job_title}</div>)
}