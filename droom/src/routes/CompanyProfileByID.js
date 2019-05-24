import React, { Component } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import { SERVER_BASE_URL } from '../actions/index';
import './CurrentCompanyProfile.scss';

export default class CurrentCompanyProfile extends Component {
    state = {
        company: {},
        jobs: {},
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchCompany(id);
        this.fetchJobs(id);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.match.params.id !== newProps.match.params.id) {
            this.fetchCompany(newProps.match.params.id);
            this.fetchJobs(newProps.match.params.id);
        }
    }

    fetchCompany = id => {
        console.log(id);
        axiosWithAuth(id)
            .get(`${SERVER_BASE_URL}/profile/employer`)
            .then(res => {
                console.log('hiyo')
                // console.log(res)
                this.setState(() => ({ company: res.data }))
            })
            .catch(err => {
                console.log('hey')
                console.log(err)
            })
    }

    fetchJobs = id => {
        axios
            .get(`${SERVER_BASE_URL}/jobs/employer/${id}`)
            .then(res => {
                this.setState(() => ({ jobs: res.data }))
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (!this.state.company.name) {
            return <div>LOADING</div>
        }
        return (
            <div className="company">
                <div className="img">
                    <h1>{this.state.company.name.charAt(0)}</h1>
                </div>
                <div className="name">
                        <h3>{this.state.company.name}</h3>
                </div>
                <div className="location">
                        <h3>{this.state.company.location}</h3>
                </div>
                <div className="about">
                        <strong><p>About</p></strong>
                        <p>{this.state.company.about}</p>
                </div>
                {this.state.company.contact_info &&
                    <div className="contact">
                            <strong><p>Contact Info</p></strong>
                            <p>{this.state.company.contact_info.phone}</p>
                            <p>{this.state.company.contact_info.email}</p>
                    </div>
                }
                <div className="social">
                    <strong><p>Social Media</p></strong>
                    <div className="social-logos">
                        {this.state.company.social_media && (
                                <>
                                    {this.state.company.social_media.facebook &&
                                        this.state.company.social_media.facebook.includes('://www.facebook.com') && (
                                            <a href={`${this.state.company.social_media.facebook}`}>
                                                <img src={require("../assets/social/f_logo_RGB-Blue_72.png")} alt="facebook" />
                                            </a>
                                        )}
                                    {this.state.company.social_media.linkedin &&
                                        this.state.company.social_media.linkedin.includes('://www.linkedin.com') && (
                                            <a href={`${this.state.company.social_media.linkedin}`}>
                                                <img src={require("../assets/social/In-Blue-48@2x.png")} alt="linked in" />
                                            </a>
                                        )}
                                    {this.state.company.social_media.twitter &&
                                        this.state.company.social_media.twitter.includes('://www.twitter.com') && (
                                            <a href={`${this.state.company.social_media.twitter}`}>
                                                <img src={require("../assets/social/Twitter_Logo_Blue.png")} alt="twitter" />
                                            </a>
                                        )}
                                    {this.state.company.social_media.github &&
                                        this.state.company.social_media.github.includes('://www.github.com') && (
                                            <a href={`${this.state.company.social_media.github}`}>
                                                <img src={require("../assets/social/GitHub-Mark-64px.png")} alt="git hub" />
                                            </a>
                                        )}
                                </>)}
                    </div>
                </div>
                <div className="website">
                    <strong><p>Company Website</p></strong>
                        <a href={`${this.state.company.website}`}><p>{this.state.company.website}</p></a>
                </div>
                <div className="jobs">
                    {this.state.jobs.map(job => (
                        <div className="job">
                            <div className="job-info">
                                <h3>{job.job_title}</h3>
                                <p>{job.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}