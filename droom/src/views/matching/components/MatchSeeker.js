import React from "react";
import {connect} from "react-redux";
import {getMatches} from "../../../actions";

class MatchSeeker extends React.Component
{
    usertype = "";
    componentDidMount()
    {
        this.props.getMatches(0);
    }
    render()
    {
        console.log(this.props.currentMatches);
        if(this.props.gettingMatch) return <div>Loading...</div>
        if(this.props.currentMatches.length === 0) return <div>ERROR</div>
        return <MatchProfile data={this.props.currentMatches[0]} />
    }
}
const mapStateToProps = state => 
{
    return { ...state.matcher}
}

export default connect(mapStateToProps, {getMatches})(MatchSeeker);


const MatchProfile = props =>
{
    return(
    <div>
        <div>
            <div> {/*Header*/}
                <div>{"Company Name"}</div>
                <div>{props.data.job_title}</div>
            </div>
            <div/> {/* Vertical line*/}
            <div>{props.data.description}</div>
        </div>
        <div> {/*body*/}
            <div> {/*top content*/}
                <div>
                    <div>Basic Information</div>
                    <div><strong>Experience Level: </strong><span>{'Entry'}</span></div>
                    <div><strong>Starting Pay: </strong><span>{props.data.starting_pay}</span></div>
                    <div><strong>Location: </strong><span>{props.data.location}</span></div>
                    <div><span>{'Full Time'}</span> <span>{props.data.pay_type}</span></div>
                </div>
                <div>
                    <div>Requirements</div>
                    <div><strong>Education: </strong><span>{'Degree'}</span></div>
                    <div><strong>Skills: </strong></div>
                    <div>
                        {props.data.required_skills ? props.data.required_skills.map(x=><div>{x}</div>) : ""}
                    </div>
                </div>
                <div>
                    <button>View Company Profile</button>
                </div>
            </div>
            <div>
                <div>responsibilities</div>
                <div/> {/*horizontal bar*/}
                <ul>
                    {props.data.responsibilities ? props.data.responsibilities.map(x=> <li>{x}</li>): ""}
                </ul>
            </div>
        </div>
    </div>
    )
}