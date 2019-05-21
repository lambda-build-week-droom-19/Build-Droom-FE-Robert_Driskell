import React from "react"

class Interests extends React.Component
{

    render()
    {
        return (
        <div>
            <div>Interests</div>
            {this.props.index() !== 0 ? <button onClick={()=>this.props.prev()}>Prev</button> : ""}
            <button onClick={()=>this.props.next()}>Next</button>
        </div>
        )
    }
}

export default Interests;