import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { getCurrentUser, updateCurrentUser } from "../actions/index";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class CurrentSeekerProfile extends Component {
    state = {
        edit: false,
        updatedProfile: {
            first_name: 'string',
            last_name: 'string',
            position: 'string',
            location: 'string',
            bio: 'string',
            job_type: 'string',
            contact_info: {
                phone_number: 'string',
                email: 'string'
            },
            interests: [],
            past_experience: [
                {
                    name: 'string',
                    title: 'string',
                    description: 'string'
                }
            ],
            education: [
                {
                    school: 'string',
                    certificate: 'string'
                }
            ],
            skills: [],
            references: [
                {
                    name: 'string',
                    relationship: 'string',
                    phone: 'string',
                    email: 'string'
                }
            ],
            social_media: {},
            portfolio: 'string',
            resume: 'string',
            projects: [],
            niche: -1,
            seen: false,
            timestamp: 'string'
        }
    };

    // componentWillMount() {
    //     this.props.getCurrentUser();
    // }

    edit = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: true,
            updatedProfile: { ...this.props.seeker }
        });
    };

    handleChanges = e => {
        this.setState({
            updatedProfile: {
                ...this.state.updatedProfile,
                [e.target.name]: e.target.value
            }
        });
    };

    handleExperienceChanges = (e, i) => {
        const saveEventTarget = e.target;
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: {
                ...prevState.updatedProfile,
                past_experience: prevState.updatedProfile.past_experience.map((experience, index) => {
                    if (index === i) {
                        return {
                            ...experience,
                            [saveEventTarget.name]: saveEventTarget.value
                        }
                    } else {
                        return experience
                    }
                })
            }
        }))
    }

    cancel = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.seeker,
                // past_experience: [...this.props.seeker.past_experience]
            }
        });
    };

    updateUser = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            updatedProfile: {
                ...this.props.seeker,
                id: undefined,
                user_id: undefined,
            }
        })
        console.log(this.state.updatedProfile);
        this.props.updateCurrentUser(this.state.updatedProfile);
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.seeker,
            }
        })
    };

    render() {
        return (
            <>
                <form onSubmit={this.updateUser}>
                    <div className="seeker-head">
                        <div className="profile-pic">
                            IMG HERE
                        </div>
                        <div className="key-info">
                            <div className="name">
                                {!this.state.edit ? (
                                    <>
                                        {this.props.seeker.first_name},{" "}
                                        {this.props.seeker.last_name}
                                    </>
                                ) : (
                                        <>
                                            <input
                                                name="first_name"
                                                type="text"
                                                value={this.state.updatedProfile.first_name}
                                                onChange={this.handleChanges}
                                            />
                                            <input
                                                name="last_name"
                                                type="text"
                                                value={this.state.updatedProfile.last_name}
                                                onChange={this.handleChanges}
                                            />
                                        </>
                                    )}
                            </div>
                            <div className="position">
                                {!this.state.edit ? (<>
                                    {this.props.seeker.position}
                                </>) : (<>
                                    <input
                                        name="position"
                                        type="text"
                                        value={this.state.updatedProfile.position}
                                        onChange={this.handleChanges}
                                    />
                                </>)}
                            </div>
                            <div className="location">
                                {!this.state.edit ? (<>
                                    {this.props.seeker.location}
                                </>) : (<>
                                    <input
                                        name="location"
                                        type="text"
                                        value={this.state.updatedProfile.location}
                                        onChange={this.handleChanges}
                                    />
                                </>)}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <div className="bio">
                            {!this.state.edit ? (
                                <>{this.props.seeker.bio}</>
                            ) : (
                                    <>
                                        <textarea
                                            name="bio"
                                            type="text"
                                            value={this.state.updatedProfile.bio}
                                            onChange={this.handleChanges}
                                        />
                                    </>
                                )}
                        </div>
                        <div className="job-type">
                            {!this.state.edit ? (<>
                                JOB TYPE?
                            </>) : (<></>)}
                        </div>
                        <div className="experiences">
                            {this.props.seeker.past_experience &&
                                this.props.seeker.past_experience.map((experience, index) => (
                                    <div className="experience" key={experience.name}>
                                        {!this.state.edit ? (
                                            <>
                                                <h3>{experience.name}</h3>
                                                <h5>{experience.title}</h5>
                                                <p>{experience.description}</p>
                                            </>
                                        ) : (
                                                <>
                                                    <input
                                                        name="name"
                                                        id={index}
                                                        type="text"
                                                        value={this.state.updatedProfile.past_experience[index].name}
                                                        onChange={(e) => this.handleExperienceChanges(e, index)}
                                                    />
                                                    <input
                                                        name="title"
                                                        id={index}
                                                        type="text"
                                                        value={this.state.updatedProfile.past_experience[index].title}
                                                        onChange={(e) => this.handleExperienceChanges(e, index)}
                                                    />
                                                    <textarea
                                                        name="description"
                                                        id={index}
                                                        type="text"
                                                        value={this.state.updatedProfile.past_experience[index].description}
                                                        onChange={(e) => this.handleExperienceChanges(e, index)}
                                                    />
                                                </>
                                            )}
                                    </div>
                                ))}
                        </div>
                        <div className="education">
                            <h1>ADD EDUCATION</h1>
                        </div>
                        <div className="interests">
                            {this.props.seeker.interests &&
                                this.props.seeker.interests.map(interest => (
                                    <div className="interest" key={interest}>
                                        <p>{interest}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {!this.state.edit ? (
                        <input type="button" value="EDIT" onClick={this.edit} />
                    ) : (<>
                        <input type="submit" value="SUBMIT" />
                        <input type="button" value="CANCEL" onClick={this.cancel} />
                    </>)}
                </form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        seeker: state.userReducer.currentUser
    };
};

export default connect(
    mapStateToProps,
    { getCurrentUser, updateCurrentUser }
)(CurrentSeekerProfile);
