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
        if (this.props.match.params.id !== newProps.match.params.id) {
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
            <div className='Seeker'>
                {this.state.seeker && (<>
                    <div className="seeker-head">
                        <div className="img">
                            <h1>{this.state.seeker.first_name.charAt(0)}</h1>
                        </div>
                        <div className="key-info">
                            <div className="name">
                                {this.state.seeker.first_name}, {this.state.seeker.last_name}
                            </div>
                            <div className="position">
                                <>{this.state.seeker.position}</>
                            </div>
                            <div className="location">
                                <>{this.state.seeker.location}</>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <div className="bio">
                            <strong><p>Biography</p></strong>
                            <p>{this.state.seeker.bio}</p>
                        </div>
                        {this.state.seeker.contact_info && (
                            <div className="contact">
                                <p>
                                    <strong><p>Phone</p></strong>
                                    {this.state.seeker.contact_info.phone_number}
                                </p>
                                <p>
                                    <strong><p>Email</p></strong>
                                    {this.state.seeker.contact_info.email}
                                </p>
                            </div>
                        )}
                        <div className="interests">
                            <strong><p>Interests</p></strong>
                            {this.state.seeker.interests &&
                                this.state.seeker.interests.map((interest, index) => (
                                    <div>
                                        <div className="interest" key={`interest ${index}`}>
                                            {interest}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="experiences">
                            <strong><p>Experiences</p></strong>
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
                        <div className="educations">
                            <strong><p>Education</p></strong>
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
                            <strong><p>Skills</p></strong>
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
                            <strong><p>References</p></strong>
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
                            <strong><p>Social Links</p></strong>
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
                            <strong><p>Portfolio</p></strong>
                            <>
                                <p>
                                    {this.state.seeker.portfolio}
                                </p>
                            </>
                        </div>
                        <div className="resume">
                            <strong><p>Resume</p></strong>
                            <>
                                <p>
                                    {this.state.seeker.resume}
                                </p>
                            </>
                        </div>
                        <div className="projects">
                            <strong><p>Project Links</p></strong>
                            {this.state.seeker.projects &&
                                this.state.seeker.projects.map((project, index) => (
                                    <div>
                                        <div className="project" key={`project ${index}`}>
                                            {project}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>)}
            </div>
        );
    }
}