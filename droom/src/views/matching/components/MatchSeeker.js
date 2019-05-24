import React from "react";
import {connect} from "react-redux";
import {getMatches,swipeMatch} from "../../../actions";

import '../../../sass/MatchSeeker.scss';

class MatchSeeker extends React.Component
{
    componentDidMount()
    {
    }
    render()
    {
        console.log(this.props.dontFetch);
        console.log(this.props.currentMatches)
        if(this.props.dontFetch) return <div>No More Matches</div>
        if(this.props.currentMatches.length < 5 && !this.props.gettingMatch){this.props.getMatches(0);}
        if(this.props.gettingMatch && this.props.currentMatches.length === 0) return <div>Loading...</div>
        if(this.props.currentMatches.length === 0) return <div>ERROR</div>
        
        return (
            <div>
                <MatchProfile data={this.props.currentMatches[0]} />
                <div className="swipe-buttons">
                    <button 
                        onClick={()=> this.props.swipeMatch(
                            0,
                            this.props.currentMatches[0],
                            this.props.user_data,"seeker"
                        )}
                    >-</button>
                    <button 
                        onClick={()=> this.props.swipeMatch(
                            1,
                            this.props.currentMatches[0],
                            this.props.user_data,"seeker"
                        )}
                    >+</button>
                </div> 
            </div>
        )
    }
}
const mapStateToProps = state => 
{
    return { ...state.matcher, user_data: state.userReducer.currentUser}
}

export default connect(mapStateToProps, {getMatches, swipeMatch})(MatchSeeker);


const MatchProfile = props =>
{
    return(
    <div className="seeker-match">
        <div className="header">
            <div className="header-left"> {/*Header*/}
                <h3>{"Company Name"+props.data.id}</h3>
                <h4>{props.data.job_title}</h4>
            </div>
            <div/> {/* Vertical line*/}
            <div className="company-description">{props.data.description}</div>
        </div>
        <div> {/*body*/}
            <div> {/*top content*/}
                <div className="basic-info">
                    <h4>Basic Information</h4>
                    <div className="experience">
                        <p><strong>Experience Level:</strong> {'Entry'}</p>
                    </div>
                    <div className="pay">
                        <p><strong>Starting Pay: </strong>{props.data.starting_pay}</p>
                    </div>
                    <div className="location">
                        <p><strong>Location: </strong>{props.data.location}</p>
                    </div>
                    <div className="pay-details">
                        <span className="full-time"><p>{'Full Time'}</p></span> <span className="pay-type"><p>{props.data.pay_type}</p></span>
                    </div>
                </div>
                <div className="req">
                    <h4>Requirements</h4>
                    <div className="education">
                        <p><strong>Education: </strong>{'Degree'}</p>
                    </div>
                    <div className="skills">
                        <p><strong>Skills: </strong></p>
                    </div>
                    <div>
                        {props.data.required_skills ? props.data.required_skills.map(x=><p>{x}</p>) : ""}
                    </div>
                </div>
                <div>
                    <button>View Company Profile</button>
                </div>
            </div>
            <div className="responsibilities">
                <h4>responsibilities</h4>
                <div/> {/*horizontal bar*/}
                <ul>
                    {props.data.responsibilities ? props.data.responsibilities.map(x=> <li><p>{x}</p></li>): ""}
                </ul>
            </div>
        </div>
    </div>
    )
}