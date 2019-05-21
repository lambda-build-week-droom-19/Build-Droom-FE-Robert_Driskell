import React from "react"

class AccountType extends React.Component
{

    render()
    {
        return (
        <div>
            <div>AccountType</div>
            {this.props.index() !== 0 ? <button onClick={()=>this.props.prev()}>Prev</button> : ""}
            <button onClick={()=>this.props.next()}>Next</button>
        </div>
        )
    }
}

export default AccountType;