import React from "react"

class About extends React.Component
{
    constructor(props)
    {
        super(props);
        let data = props.getData();
        this.state =
        {
            first_name: data.first_name,
            last_name: data.last_name,
            location: data.location,
            bio: data.bio
        }
    }
    handleChange(e)
    {
        this.setState(
        {
            ...this.state,
            [e.target.name] : e.target.value
        });
    }
    validate(cb)
    {
        this.props.setData(this.state);
        cb();
    }
    render()
    {
        //{this.props.next()}
        return (
        <div style={{maxWidth: "400px", margin: "0 auto"}}>
            <div>About</div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <input autoFocus onChange={(e)=> this.handleChange(e)} value={this.state.first_name} placeholder="First Name..." name="first_name" />
                <input onChange={(e)=> this.handleChange(e)} value={this.state.last_name} placeholder="Last Name..." name="last_name" />
                <input onChange={(e)=> this.handleChange(e)} value={this.state.location} placeholder="Location..." name="location" />
                <textarea onChange={(e)=> this.handleChange(e)} style={{resize: "none"}} placeholder="Bio..." value={this.state.bio} name="bio" rows="10" cols="50" maxLength="5000" draggable="false" />
            </div>
            {/* this.props.index() !== 0 ? <button onClick={()=>this.validate(this.props.prev)}>Prev</button> : "" */}
            <button onClick={()=>this.validate(this.props.next)}>Next</button>
        </div>
        )
    }
}

export default About;