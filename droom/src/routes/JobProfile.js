import React from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {getJob,getNiches,changeJob} from "../actions";

class JobProfile extends React.Component
{
    editting;
    constructor(props)
    {
        super(props);
        this.state = {};
        this.editting = props.match.params.edit === "edit";
        this.owner = false;
    }

    componentWillMount()
    {
        this.props.getJob(this.props.match.params.id);
    }
    didfetch = true;
    componentWillUpdate()
    {
        if(this.didfetch && Object.keys(this.props.currentJob).length !== 0)
        {
            this.setState({...this.props.currentJob});
            this.didfetch = false;
        }
    }
    valitdateNewElement(arry)
    {
        if(!arry.length) return true;
        return arry[arry.length-1] !== ""
    }
/*     { 
        job_title: string,
        location: string,
        pay_type: string,
        starting_pay: string,
        description: string,
        responsibilities: [array of responsibilities],
        required_skills: [array of skills],
        niche: integer(references niche id),
        appliers: [array of seeker user_ids that have said yes],
        confirmed: [array of seeker user_ids that are confirmed by employer],
        seen: boolean,
    } */
    handleUpdate()
    {
        if(this.editting)
            this.props.changeJob(this.state, this.props.match.params.id);
    }
    handleChange(name, value)
    {
        this.setState({...this.state, [name] : value});
    }
    render()
    {
        let obj = this.props.currentJob;
        if(this.props.gettingJob) return <div></div>;
        if(this.props.error !== "" || obj.job_title === "" || Object.keys(obj).length <= 0 || obj === {} || obj === undefined) return <Redirect to="/" />;
        this.owner = obj.user_id === parseInt(localStorage.getItem("userID"));
        if (this.editting){
            if(!this.owner) return <Redirect to={`/job/${this.props.match.params.id}`} />
        return(
            <div>
                 {this.owner ? <button onClick={()=> {this.handleUpdate(); this.props.history.push(`/job/${this.props.match.params.id}`)}}>Finished</button> : ""}
                <div>Job Title</div>
                <input onChange={(e)=> this.handleChange(e.target.name, e.target.value)} name="job_title" value={this.state.job_title}/>
                <div>Location</div>
                <input onChange={(e)=> this.handleChange(e.target.name, e.target.value)} name="location" value={this.state.location}/>
                <div>Staring Pay</div>
                <input onChange={(e)=> this.handleChange(e.target.name, e.target.value)} name="starting_pay" value={this.state.starting_pay}/>
                <div>Description</div>
                <input onChange={(e)=> this.handleChange(e.target.name, e.target.value)} name="description" value={this.state.description}/>
                <div>Responsibilities</div>
                <button onClick={()=>{let arry = this.state.responsibilities ? this.state.responsibilities : []; if(!this.valitdateNewElement(arry)) return; arry.push(""); this.handleChange("responsibilities",arry)}}>New Responsibility</button>
                { this.state.responsibilities && this.state.responsibilities.length ? this.state.responsibilities.map((x,i,a)=>
                    {
                        return <div>
                            <input key={i} onChange={(e)=>{let arry = a; arry[i] = e.target.value; this.handleChange(e.target.name, arry)} } placeholder="text..." name="responsibilities" value={x}/>
                            <button onClick={(e) => {let arry = a; arry.splice(i,1); this.handleChange(e.target.name, arry);}}>-</button>
                        </div>
                    }) : <div>{this.handleChange("responsibilities", [""]) ? "" : "" }</div>}
                <div>Required Skills</div>
                <button onClick={()=>{let arry = this.state.required_skills ? this.state.required_skills : []; if(!this.valitdateNewElement(arry)) return; arry.push(""); this.handleChange("required_skills",arry)}}>New Skill</button>
                { this.state.required_skills && this.state.required_skills.length ? this.state.required_skills.map((x,i,a)=>
                    {
                        return <div>
                            <input key={i} onChange={(e)=>{let arry = a; arry[i] = e.target.value; this.handleChange(e.target.name, arry)} } placeholder="text..." name="required_skills" value={x}/>
                            <button onClick={(e) => {let arry = a; arry.splice(i,1); this.handleChange(e.target.name, arry);}}>-</button>
                        </div>
                    }) : <div>{this.handleChange("required_skills", [""]) ? "" : "" }</div>}
            </div>
        );
        }
        return (
        <div>
            {this.owner ? <button onClick={()=> this.props.history.push(`/job/${this.props.match.params.id}/edit`)}>edit</button> : ""}
            <h2 onClick={()=>this.props.history.push(`/employer/${obj.user_id}`)}>{obj.job_title}</h2>
            <div>{obj.location}</div>
            <h5>Staring Pay</h5>
            <div>{obj.starting_pay}</div>
            <div></div> {/* Horizontal line */}
            <h5>Description</h5>
            <div>{obj.description}</div>
            <div></div> {/* Horizontal line */}
            <h5>Responsibilities</h5>
            <ul>
                {   
                obj.responsibilities && obj.responsibilities.length ? obj.responsibilities.map(x=>
                    <li>
                        {x}
                    </li>    
                ) : 
                    <div>None</div>
                }
            </ul>
            <div></div> {/* Horizontal line */}
            <h5>Required Skills</h5>
            {   
                 obj.required_skills && obj.required_skills.length ? obj.required_skills.map(x=>
                    <div>{x}</div>
                ) : 
                <div>None</div>
            }

        </div>);
    }
    componentWillUnmount()
    {
       this.handleUpdate();
    }
}



const mapStateToProps = state =>
{
    return {...state.getJob}
}

export default connect(mapStateToProps, {getJob, getNiches,changeJob})(JobProfile);