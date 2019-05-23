import React from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {getJob,getNiches} from "../actions";

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
        if(this.didfetch)
        {
            this.setState({...this.props.currentJob});
            this.didfetch = false;
        }
    }
/*     { 
        user_id: integer(references employer id), 
        job_title: string, 
        location: string, 
        requirements: string, 
        niche: integer(references niche id), 
        seen: boolean 
    } */

    handleChange(e)
    {
        this.setState({...this.state, [e.target.name] : e.target.value});
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
                <div>Job Title</div>
                <input onChange={(e)=> this.handleChange(e)} name="job_title" value={this.state.job_title}/>
                <div>Location</div>
                <input onChange={(e)=> this.handleChange(e)} name="job_title" value={this.state.job_title}/>
                <div>Staring Pay</div>
                <input onChange={(e)=> this.handleChange(e)} name="job_title" value={this.state.job_title}/>
                <div>Description</div>
                <input onChange={(e)=> this.handleChange(e)} name="job_title" value={this.state.job_title}/>
            </div>
        );
        }
        return (
        <div>
            {this.owner ? <button onClick={()=> this.props.history.push(`/job/${this.props.match.params.id}/edit`)}>edit</button> : ""}
            <h2>{obj.job_title}</h2>
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
                obj.responsibilites && obj.responsibilites.length ? obj.responsibilites.map(x=>
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
}

const mapStateToProps = state =>
{
    return {...state.getJob}
}

export default connect(mapStateToProps, {getJob, getNiches})(JobProfile);