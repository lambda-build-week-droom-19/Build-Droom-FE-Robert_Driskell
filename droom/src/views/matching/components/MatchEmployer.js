import React from "react";
import { connect } from "react-redux";
import { getMatches, swipeMatch } from "../../../actions";

import '../../../sass/MatchEmployer.scss'

class MatchEmployer extends React.Component {
    componentDidMount() {
        this.props.getMatches(1);
    }
    render() {
        console.log(this.props.currentMatches);
        if (this.props.dontfetch) return <div>No More Matches</div>
        if (this.props.gettingMatch) return <div>Loading...</div>
        if (this.props.currentMatches.length === 0) return <div>No Matches Yet</div>

        return (
            <div className="company-matches">
                <h2>My Matches</h2>
                {this.props.currentMatches.map(x => {
                    //{this.props.swipeMatch(1, x, {user_id: 1}, "employer")}
                    return (
                        <div className="job">
                            <h3>{x.job.title}</h3>
                            <div className="confirmed">
                                <strong><p>Confirmed Applicants</p></strong>
                                {x.usersConfirmed && x.usersConfirmed.length ?
                                    x.usersConfirmed.map(u =>
                                        <div className="confirmed-user">
                                            <div className="left-content">
                                                <div className="img"></div>
                                                <div>
                                                    <h5>{`${u.first_name} ${u.last_name}`}</h5>
                                                    <p>{`${u.position}`}</p>
                                                    <p>{`${u.location}`}</p>
                                                </div>
                                            </div>
                                            <div className="profile-btn">
                                                <button onClick={() => this.props.history.push(`/seeker/${u.user_id}`)}>Profile</button>
                                            </div>
                                        </div>
                                    ) : <div>No Users Yet</div>}
                            </div>
                            <div className="recent">
                                <strong><p>Recent Matches</p></strong>
                                {x.usersAvailable && x.usersAvailable.length ?
                                    x.usersAvailable.map(u =>
                                        <div className="recent-user">
                                            <div className="left-content">
                                                <div className="img"></div>
                                                <div>
                                                    <h5>{`${u.first_name} ${u.last_name} ${u.user_id}`}</h5>
                                                    <p>{`${u.position}`}</p>
                                                    <p>{`${u.location}`}</p>
                                                </div>
                                            </div>
                                            <div className="right-content">
                                                <div className="profile-btn">
                                                    <button onClick={() => this.props.history.push(`/seeker/${u.user_id}`)}>Profile</button>
                                                </div>
                                                <div>{/*(swipe,reciever,user,type)*/}
                                                    <button onClick={() => this.props.swipeMatch(1, x, u, "employer")}>+</button>
                                                    <button onClick={() => this.props.swipeMatch(0, x, u, "employer")}>-</button>
                                                </div>
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

const mapStateToProps = state => {
    return { ...state.matcher }
}

export default connect(mapStateToProps, { getMatches, swipeMatch })(MatchEmployer);