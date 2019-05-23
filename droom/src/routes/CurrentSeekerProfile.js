import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { getCurrentUser, updateCurrentUser } from "../actions/index";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class CurrentSeekerProfile extends Component {
    state = {
        init: false,
        edit: false,
        newInterest: '',
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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.seeker.id &&
            !this.state.init &&
            this.props.seeker !== this.state.updatedProfile) {
            console.log(`IF YOU SEE THIS MORE THAN ONCE YOU HAVE A PROBLEM`)
            this.setState({
                ...this.state,
                updatedProfile: { ...this.props.seeker },
                init: true,
            })
        }
    }

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

    handleContactChanges = e => {
        this.setState({
            updatedProfile: {
                ...this.state.updatedProfile,
                contact_info: {
                    ...this.state.updatedProfile.contact_info,
                    [e.target.name]: e.target.value
                }
            }
        });
    };


    //THIS INTEREST STUFF IS BROKE, DUDE
    //Well, this one works
    handleInterestChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
    }

    //BUT NOT THIS ONE
    addInterest = e => {
        e.preventDefault();
        console.log("I HATE YOU")
        const somethingElse = [...this.state.updatedProfile.interests, this.state.newInterest];
        console.log(somethingElse);
        //THIS DOESN'T WORK, DUDE, I'M SO MAD, DUDE, REEEEEEEEEEEEEE
        this.setState({
            ...this.state,
            updatedProfile: {
                ...this.state.updatedProfile,
                interests: somethingElse
            },
            newInterest: ''
        })
        console.log('LOOK HERE')
        console.log(this.state.updatedProfile.interests);
        this.props.updateCurrentUser(this.state.updatedProfile);
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.seeker,
            }
        })
    }

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

    handleEducationChanges = (e, i) => {
        const saveEventTarget = e.target;
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: {
                ...prevState.updatedProfile,
                education: prevState.updatedProfile.education.map((education, index) => {
                    if (index === i) {
                        return {
                            ...education,
                            [saveEventTarget.name]: saveEventTarget.value
                        }
                    } else {
                        return education
                    }
                })
            }
        }))
    }

    handleReferenceChanges = (e, i) => {
        const saveEventTarget = e.target;
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: {
                ...prevState.updatedProfile,
                references: prevState.updatedProfile.references.map((reference, index) => {
                    if (index === i) {
                        return {
                            ...reference,
                            [saveEventTarget.name]: saveEventTarget.value
                        }
                    } else {
                        return reference
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
        this.props.getCurrentUser();
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
                                    <form onSubmit={this.updateUser}>
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
                                        <input type="submit" style={{ display: 'none' }} />
                                    </form>
                                )}
                        </div>
                        <div className="position">
                            {!this.state.edit ? (<>
                                {this.props.seeker.position}
                            </>) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="position"
                                            type="text"
                                            value={this.state.updatedProfile.position}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: 'none' }} />
                                    </form>
                                )}
                        </div>
                        <div className="location">
                            {!this.state.edit ? (<>
                                {this.props.seeker.location}
                            </>) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="location"
                                            type="text"
                                            value={this.state.updatedProfile.location}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: 'none' }} />
                                    </form>
                                )}
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div className="bio">
                        {!this.state.edit ? (
                            <>{this.props.seeker.bio}</>
                        ) : (
                                <form onSubmit={this.updateUser}>
                                    <textarea
                                        name="bio"
                                        type="text"
                                        value={this.state.updatedProfile.bio}
                                        onChange={this.handleChanges}
                                    />
                                    <input type="submit" style={{ display: 'none' }} />
                                </form>
                            )}
                    </div>
                    <div className="job-type">
                        {!this.state.edit ? (<>
                            JOB TYPE?
                            </>) : (<></>)}
                    </div>
                    {this.props.seeker.contact_info &&
                        <div className="contact">
                            {!this.state.edit ? (<>
                                <p><strong>Phone: </strong>{this.props.seeker.contact_info.phone_number}</p>
                                <p><strong>Email: </strong>{this.props.seeker.contact_info.email}</p>
                            </>) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="phone_number"
                                            type="text"
                                            value={this.state.updatedProfile.contact_info.phone_number}
                                            onChange={this.handleContactChanges}
                                        />
                                        <input
                                            name="email"
                                            type="text"
                                            value={this.state.updatedProfile.contact_info.email}
                                            onChange={this.handleContactChanges}
                                        />
                                        <input type="submit" style={{ display: 'none' }} />
                                    </form>
                                )}
                        </div>
                    }
                    <div className="interests">
                        <div className="add-interest">
                            <form onSubmit={this.addInterest}>
                                <input
                                    name="newInterest"
                                    type="text"
                                    value={this.state.newInterest}
                                    onChange={this.handleInterestChanges}
                                />
                                <input
                                    type="submit"
                                    value="+"
                                />
                            </form>
                        </div>
                        {this.props.seeker.interests &&
                            this.props.seeker.interests.map((interest, index) => (<>
                                <h2>INTERESTS MAY NOT MAKE IT IN, BUGGY</h2>
                                <div className="interest" key={`interest ${index}`}>{interest}</div><button>X</button>
                            </>))
                        }
                    </div>
                    <div className="experiences">
                        {this.props.seeker.past_experience &&
                            this.props.seeker.past_experience.map((experience, index) => (
                                <div className="experience" key={`experience ${index}`}>
                                    {!this.state.edit ? (
                                        <>
                                            <h3>{experience.name}</h3>
                                            <h5>{experience.title}</h5>
                                            <p>{experience.description}</p>
                                        </>
                                    ) : (
                                            <form onSubmit={this.updateUser}>
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
                                                <input type="submit" style={{ display: 'none' }} />
                                            </form>
                                        )}
                                </div>
                            ))}
                    </div>
                    <div className="education">
                        {this.props.seeker.education &&
                            this.props.seeker.education.map((education, index) => (
                                <div className="education" key={`education-${index}`}>
                                    {!this.state.edit ? (
                                        <>
                                            <h3>{education.school}</h3>
                                            <p>{education.certificate}</p>
                                        </>
                                    ) : (
                                            <form onSubmit={this.updateUser}>
                                                <input
                                                    name="school"
                                                    id={index}
                                                    type="text"
                                                    value={this.state.updatedProfile.education[index].school}
                                                    onChange={(e) => this.handleEducationChanges(e, index)}
                                                />
                                                <input
                                                    name="certificate"
                                                    id={index}
                                                    type="text"
                                                    value={this.state.updatedProfile.education[index].certificate}
                                                    onChange={(e) => this.handleEducationChanges(e, index)}
                                                />
                                                <input type="submit" style={{ display: 'none' }} />
                                            </form>
                                        )}
                                </div>
                            ))}
                    </div>
                    <div className="skills">
                        <h2>SAME BUG AS INTERESTS</h2>
                        {this.props.seeker.skills &&
                            this.props.seeker.skills.map((skill, index) => (
                                <div className="skill" key={`skill ${index}`}>
                                    <p>{skill}</p>
                                </div>
                            ))}
                    </div>
                    <div className="references">
                        {this.props.seeker.references &&
                            this.props.seeker.references.map((reference, index) => (
                                <div className="reference" key={`reference-${index}`}>
                                    {!this.state.edit ? (
                                        <>
                                            <h3>{reference.name}</h3>
                                            <p><strong>Relationship: </strong>{reference.relationship}</p>
                                            <p><strong>Phone: </strong>{reference.phone}</p>
                                            <p><strong>Email: </strong>{reference.email}</p>
                                        </>
                                    ) : (
                                            <form onSubmit={this.updateUser}>
                                                <input
                                                    name="name"
                                                    id={index}
                                                    type="text"
                                                    value={this.state.updatedProfile.references[index].name}
                                                    onChange={(e) => this.handleReferenceChanges(e, index)}
                                                />
                                                <input
                                                    name="relationship"
                                                    id={index}
                                                    type="text"
                                                    value={this.state.updatedProfile.references[index].relationship}
                                                    onChange={(e) => this.handleReferenceChanges(e, index)}
                                                />
                                                <input
                                                    name="phone"
                                                    id={index}
                                                    type="text"
                                                    value={this.state.updatedProfile.references[index].phone}
                                                    onChange={(e) => this.handleReferenceChanges(e, index)}
                                                />
                                                <input
                                                    name="email"
                                                    id={index}
                                                    type="text"
                                                    value={this.state.updatedProfile.references[index].email}
                                                    onChange={(e) => this.handleReferenceChanges(e, index)}
                                                />
                                                <input type="submit" style={{ display: 'none' }} />
                                            </form>
                                        )}
                                </div>
                            ))}
                        <div className="social">
                            I DON'T KNOW WHAT TO DO WITH SOCIAL MEDIA
                        </div>
                        <div className="portfolio">
                            {!this.state.edit ? (<>
                                <p><strong>Portfolio: </strong>{this.props.seeker.portfolio}</p>
                            </>) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="portfolio"
                                            type="text"
                                            value={this.state.updatedProfile.portfolio}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: 'none' }} />
                                    </form>
                                )}
                        </div>
                        <div className="resume">
                            {!this.state.edit ? (<>
                                <p><strong>Resume: </strong>{this.props.seeker.resume}</p>
                            </>) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="resume"
                                            type="text"
                                            value={this.state.updatedProfile.resume}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: 'none' }} />
                                    </form>
                                )}
                        </div>
                        <div className="projects">
                            THIS IS AN ARRAY, SAME PROBLEM, WORK ON TOMORROW
                        </div>
                    </div>
                </div>
                {!this.state.edit ? (
                    <input type="button" value="EDIT" onClick={this.edit} />
                ) : (
                        <form onSubmit={this.updateUser}>
                            <input type="submit" value="SUBMIT" />
                            <input type="button" value="CANCEL" onClick={this.cancel} />
                        </form>
                    )}
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
