import React from "react"

class About extends React.Component
{
    render()
    {
        return (
        <div>
            <div>About</div>
            {this.props.index() !== 0 ? <button onClick={()=>this.props.prev()}>Prev</button> : ""}
            <button onClick={()=>this.props.next()}>Next</button>
        </div>
        )
    }
}

export default About;