import React from "react"
import Button from "../../Button"

class AccountType extends React.Component
{

    render()
    {
        return (
        <div>
            <div>AccountType</div>
            <button onClick={()=> {this.props.setData({userType: 0}); this.props.next()}}>Seeker</button>
            <button onClick={()=> {this.props.setData({userType: 1}); this.props.next()}}>Empoyeer</button>
        </div>
        )
    }
}

export default AccountType;