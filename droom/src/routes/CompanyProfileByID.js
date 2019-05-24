import React, { Component } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import { SERVER_BASE_URL } from '../actions/index';

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
        if (!this.state.company.name || !this.state.jobs.length > 0) {
            return <div>LOADING</div>
        }
        return (
            <>
                <div className="name">
                    <h1>{this.state.company.name}</h1>
                </div>
                <div className="location">
                    <h1>{this.state.company.location}</h1>
                </div>
                <div className="about">
                    <h3>About</h3>
                    <p>{this.state.company.about}</p>
                </div>
                {this.state.company.contact_info &&
                    <div className="contact">
                        <h3>Contact Info</h3>
                        <p>{this.state.company.contact_info.phone}</p>
                        <p>{this.state.company.contact_info.email}</p>
                    </div>
                }
                <div className="social">
                    {this.state.company.social_media && (<>
                        {this.state.company.social_media.facebook && (
                            <p>{this.state.company.social_media.facebook}</p>
                        )}
                        {this.state.company.social_media.linkedin && (
                            <p>{this.state.company.social_media.linkedin}</p>
                        )}
                        {this.state.company.social_media.twitter && (
                            <p>{this.state.company.social_media.twitter}</p>
                        )}
                        {this.state.company.social_media.github && (
                            <p>{this.state.company.social_media.github}</p>
                        )}
                    </>)}
                </div>
                <div className="name">
                    <p>{this.state.company.website}</p>
                </div>
                <div className="jobs">
                    {this.state.jobs.map(job => (
                        <div onClick={()=>this.props.history.push(`/job/${job.id}`)}>
                            <h3>{job.job_title}</h3>
                            <p>{job.location}</p>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}