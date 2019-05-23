import React from "react"
import Button from "../../Button";
import {connect} from "react-redux";
import {createProfile} from "../../../actions"

class AccountType extends React.Component
{
    authenticate(type,cb)
    {
        this.props.createProfile(type,cb);
        this.props.setData({userType: type})
    }
    render()
    {
        {this.props.next()}
        return (
        <div>
            <div>AccountType</div>
           
        </div>
        )
    }
}

const mapStateToProps = state =>
{
    return{...state};
}

export default connect(mapStateToProps, {createProfile})(AccountType)