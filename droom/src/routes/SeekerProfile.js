import React, { Component } from 'react'

export default class SeekerProfile extends Component {
    state = {
        seeker: {
            seeker_id: 1,
            first_name: 'John',
            last_name: 'Doe',
            location: 'Los Angeles, CA',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur a lacus et iaculis. Duis pretium dictum diam in rutrum.',
            past_experience: 'Senior Developer at Lambda School',
            interests: 'Javascript',
            niche: 1,
            seen: false
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <>
                <div className="seeker-head">
                    <div className="profile-pic"></div>
                    <div className="key-info">
                        <div className="name">{this.state.seeker.first_name}, {this.state.seeker.last_name}</div>
                        <div className="occupation">this.state.seeker.occupation</div>
                    </div>
                </div>
                <div className="description">
                    <div className="bio">{this.state.seeker.bio}</div>
                    <div className="info">Basic Info</div>
                    <div className="experience">{this.state.seeker.past_experience}</div>
                    <div className="education">education</div>
                    <div className="skills">{this.state.seeker.interests}</div>
                </div>
            </>
        )
    }
}
