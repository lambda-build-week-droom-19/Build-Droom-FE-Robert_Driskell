import React from "react"

class PastExperience extends React.Component
{

    render()
    {
        return (
        <div>
            <div>PastExperience</div>
            {this.props.index() !== 0 ? <button onClick={()=>this.props.prev()}>Prev</button> : ""}
            <button onClick={()=>this.props.next()}>Next</button>
        </div>
        )
    }
}

export default PastExperience;