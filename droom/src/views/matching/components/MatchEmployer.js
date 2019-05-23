import React from "react";
import {connect} from "react-redux"

class MatchEmployer extends React.Component
{
    render()
    {
        return <div>employer</div>
    }
}

const mapStateToProps = state => 
{
    return {}
}

export default connect(mapStateToProps, {})(MatchEmployer);