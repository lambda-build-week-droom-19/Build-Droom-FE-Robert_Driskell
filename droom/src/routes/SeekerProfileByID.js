import React, { Component, useState } from "react";
import { SERVER_BASE_URL } from '../actions/index';

//Styles
import '../sass/CurrentSeekerProfile.scss'
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default class SeekerProfileByID extends Component {
    state = {
        seeker: {},
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchSeeker(id);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.match.params.id !== newProps.match.params.id) {
            this.fetchSeeker(newProps.match.params.id);
        }
    }

    fetchSeeker = id => {
        console.log(id);
        axiosWithAuth(id)
            .get(`${SERVER_BASE_URL}/profile/seeker`)
            .then(res => {
                console.log('hiyo')
                // console.log(res)
                this.setState(() => ({ seeker: res.data }))
            })
            .catch(err => {
                console.log('hey')
                console.log(err)
            })
    }

    render() {
        if (!this.state.seeker.first_name) {
            return <div className="loading">Loading</div>
        }
        return (
            <>
                {this.state.seeker && (<>
                    <div className="seeker-head">
                        <div className="profile-pic">IMG HERE</div>
                        <div className="key-info">
                            <div className="name">
                                {this.state.seeker.first_name}, {this.state.seeker.last_name}
                            </div>
                            <div className="position">
                                {this.state.seeker.position}
                            </div>
                            <div className="location">
                                {this.state.seeker.location}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <div className="bio">
                            {this.state.seeker.bio}
                        </div>
                        {this.state.seeker.contact_info && (
                            <div className="contact">
                                <p>
                                    <strong>Phone: </strong>
                                    {this.state.seeker.contact_info.phone_number}
                                </p>
                                <p>
                                    <strong>Email: </strong>
                                    {this.state.seeker.contact_info.email}
                                </p>
                            </div>
                        )}
                        <div className="interests">
                            {this.state.seeker.interests &&
                                this.state.seeker.interests.map((interest, index) => (
                                    <>
                                        <div className="interest" key={`interest ${index}`}>
                                            {interest}
                                        </div>
                                    </>
                                ))}
                        </div>
                        <div className="experiences">
                            {this.state.seeker.past_experience &&
                                this.state.seeker.past_experience.map((experience, index) => (
                                    <div className="experience" key={`experience ${index}`}>
                                        {this.state.seeker.past_experience[index] && (<>
                                            <h3>{experience.name}</h3>
                                            <h5>{experience.title}</h5>
                                            <p>{experience.description}</p>
                                        </>)}
                                    </div>
                                ))}
                        </div>
                        <div className="education">
                            {this.state.seeker.education &&
                                this.state.seeker.education.map((education, index) => (
                                    <div className="education" key={`education-${index}`}>
                                        {this.state.seeker.education[index] && (<>
                                            <h3>{education.school}</h3>
                                            <p>{education.certificate}</p>
                                        </>)}
                                    </div>
                                ))}
                        </div>
                        <div className="skills">
                            {this.state.seeker.skills &&
                                this.state.seeker.skills.map((skill, index) => (
                                    <>
                                        <div className="skill" key={`Skill ${index}`}>
                                            {skill}
                                        </div>
                                    </>
                                ))}
                        </div>
                        <div className="references">
                            {this.state.seeker.references &&
                                this.state.seeker.references.map((reference, index) => (
                                    <div className="reference" key={`reference-${index}`}>
                                        {this.state.seeker.references[index] && (<>
                                            <h3>{reference.name}</h3>
                                            <h4>{reference.relationship}</h4>
                                            <p><strong>Phone: </strong>{reference.phone}</p>
                                            <p><strong>Email: </strong>{reference.email}</p>
                                        </>)}
                                    </div>
                                ))}
                        </div>
                        <div className="social">
                            {this.state.seeker.social_media && (<>
                                {this.state.seeker.social_media.facebook && (
                                    <p>{this.state.seeker.social_media.facebook}</p>
                                )}
                                {this.state.seeker.social_media.linkedin && (
                                    <p>{this.state.seeker.social_media.linkedin}</p>
                                )}
                                {this.state.seeker.social_media.twitter && (
                                    <p>{this.state.seeker.social_media.twitter}</p>
                                )}
                                {this.state.seeker.social_media.github && (
                                    <p>{this.state.seeker.social_media.github}</p>
                                )}
                            </>)}
                        </div>
                        <div className="portfolio">
                            <p>
                                <strong>Portfolio: </strong>
                                {this.state.seeker.portfolio}
                            </p>
                        </div>
                        <div className="resume">
                            <p>
                                <strong>Resume: </strong>
                                {this.state.seeker.resume}
                            </p>
                        </div>
                        <div className="projects">
                            {this.state.seeker.projects &&
                                this.state.seeker.projects.map((project, index) => (
                                    <>
                                        <div className="project" key={`project ${index}`}>
                                            {project}
                                        </div>
                                    </>
                                ))}
                        </div>
                    </div>
                </>)}
            </>
        )
    }
}