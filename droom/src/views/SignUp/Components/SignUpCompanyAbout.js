import React from "react"

class About extends React.Component
{
    constructor(props)
    {
        super(props);
        let data = props.getData();
        this.state =
        {
            first_name: data.company_name,
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
        if(Object.keys(this.state).filter(x=> x !== "").length === 0) return;
        this.props.setData(this.state);
        cb();
    }
    render()
    {
        //{this.props.next()}
        return (
        <div style={{maxWidth: "400px", margin: "0 auto"}}>
            <div>Tell me about your company?</div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <input autoFocus onChange={(e)=> this.handleChange(e)} value={this.state.company_name} placeholder="Company Name..." name="company_name" />
                <input onChange={(e)=> this.handleChange(e)} value={this.state.location} placeholder="Location..." name="location" />
                
            </div>
            {/* this.props.index() !== 0 ? <button onClick={()=>this.validate(this.props.prev)}>Prev</button> : "" */}
            <button onClick={()=>this.validate(this.props.next)}>Next</button>
        </div>
        )
    }
}

export default About;