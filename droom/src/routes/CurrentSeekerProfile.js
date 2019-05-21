import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getCurrentUser } from '../actions/index';

class CurrentSeekerProfile extends Component {

    componentWillMount() {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <>
                <div className="seeker-head">
                    <div className="profile-pic"></div>
                    <div className="key-info">
                        <div className="name">{this.props.seeker.first_name}, {this.props.seeker.last_name}</div>
                    </div>
                </div>
                <div className="description">
                    <div className="bio">{this.props.seeker.bio}</div>
                    <div className="info">Basic Info</div>
                    <div className="experience">{this.props.seeker.past_experience}</div>
                    <div className="education">Education</div>
                    <div className="skills">{this.props.seeker.interests}</div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		seeker: state.getUser.currentUser
	};
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(CurrentSeekerProfile);