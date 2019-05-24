import React from "react";
import {connect} from "react-redux";
import {getMatches} from "../../../actions";

class MatchEmployer extends React.Component
{
    componentDidMount()
    {
        this.props.getMatches(1);
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

export default connect(mapStateToProps, {getMatches})(MatchEmployer);

const MatchProfile = props =>
{
    return(<div>Employer</div>)
}