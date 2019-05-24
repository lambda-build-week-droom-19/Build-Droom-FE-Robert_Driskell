import React from "react"
import "../../../sass/SignUpAbout.scss";
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
        <div className="signin-main-about">
            <h2>Tell me about yourself?</h2>
            <div className="signin-input-about" >
                <label for="firstname1">First Name</label>
                <input id="firstname1" autoFocus onChange={(e)=> this.handleChange(e)} value={this.state.first_name} placeholder="First Name..." name="first_name" />
                <label for="lastname1">Last Name</label>
                <input id="lastname1" onChange={(e)=> this.handleChange(e)} value={this.state.last_name} placeholder="Last Name..." name="last_name" />
                <label for="location1">Address</label>
                <input id="location1" onChange={(e)=> this.handleChange(e)} value={this.state.location} placeholder="Location..." name="location" />
                <label for="bio1">Biography</label>
                <textarea id="bio1" onChange={(e)=> this.handleChange(e)} style={{resize: "none"}} placeholder="Bio..." value={this.state.bio} name="bio" rows="10" cols="50" maxLength="5000" draggable="false" />
            </div>
            {/* this.props.index() !== 0 ? <button onClick={()=>this.validate(this.props.prev)}>Prev</button> : "" */}
            <button onClick={()=>this.validate(this.props.next)}>Next</button>
        </div>
        )
    }
}

export default About;