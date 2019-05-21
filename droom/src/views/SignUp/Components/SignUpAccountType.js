import React from "react"
import Button from "../../Button"

class AccountType extends React.Component
{

    render()
    {
        //{this.props.next()}
        return (
        <div>
            <div>AccountType</div>
            <button onClick={()=> {this.props.data.userType = 0; this.props.next()}}>Seeker</button>
            <button onClick={()=> {this.props.data.userType = 1; this.props.next()}}>Empoyeer</button>
        </div>
        )
    }
}

export default AccountType;