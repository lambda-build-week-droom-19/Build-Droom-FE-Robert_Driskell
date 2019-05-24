import React from "react";
import {connect} from "react-redux";
import {getMatches,swipeMatch} from "../../../actions";

class MatchEmployer extends React.Component
{
    componentDidMount()
    {
        this.props.getMatches(1);
    }
    render()
    {
        console.log(this.props.currentMatches);
        if(this.props.dontfetch) return <div>No More Matches</div>
        if(this.props.gettingMatch) return <div>Loading...</div>
        if(this.props.currentMatches.length === 0) return <div>No Matches Yet</div>
        
        return (
            <div>
            <h2>My Matches</h2>
            {this.props.currentMatches.map(x => {
                //{this.props.swipeMatch(1, x, {user_id: 1}, "employer")}
                return(
                <div>
                    <h4>{x.job.title + x.job.id}</h4>
                    <div>
                        <div><span>Confirmed</span></div>
                        {x.usersConfirmed && x.usersConfirmed.length ? 
                        x.usersConfirmed.map(u => 
                        <div>
                            <div/> {/*user profile pic*/}
                            <div>
                                <div>{`${u.first_name} ${u.last_name} ${u.user_id}`}</div>
                                <div>{`${u.position}`}</div>
                                <div>{`${u.location}`}</div>
                            </div>
                            <div>
                                <button onClick={()=>this.props.history.push(`/seeker/${u.user_id}`)}>Profile</button>
                            </div>
                        </div>
                        ) : <div>No Users Yet</div>}
                    </div>
                    <div>
                        <div><span>Recents</span></div>
                        {x.usersAvailable && x.usersAvailable.length ? 
                        x.usersAvailable.map(u => 
                        <div>
                            <div/> {/*user profile pic*/}
                            <div>
                                <div>{`${u.first_name} ${u.last_name} ${u.user_id}`}</div>
                                <div>{`${u.position}`}</div>
                                <div>{`${u.location}`}</div>
                            </div>
                            <div>{/*(swipe,reciever,user,type)*/}
                                <button onClick={()=>this.props.swipeMatch(1, x, u, "employer")}>+</button>
                                <button onClick={()=>this.props.swipeMatch(0, x, u, "employer")}>-</button>
                            </div>
                        </div>
                        ) : <div>No Users Yet</div>}
                    </div>
                            
                </div>
                );
            })}  
        </div>    
        )
    }
}

const mapStateToProps = state => 
{
    return { ...state.matcher}
}

export default connect(mapStateToProps, {getMatches,swipeMatch})(MatchEmployer);