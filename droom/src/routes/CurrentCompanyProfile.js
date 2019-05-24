import React, { Component } from 'react'
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';

import { getCurrentUser, updateCurrentUser, getEmployerJobs, SERVER_BASE_URL } from '../actions/index';

import './CurrentCompanyProfile.scss'

class CurrentCompanyProfile extends Component {
    state = {
        edit: false,
        init: false,
        updatedProfile: {
            name: 'string',
            about: 'string',
            location: 'string',
            contact_info: {
                phone_number: 'string',
                email: 'string'
            },
            social_media: {},
            website: 'string'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.company.id &&
            !this.state.init &&
            this.props.company !== this.state.updatedProfile) {
            console.log(`IF YOU SEE THIS MORE THAN ONCE OR LESS THAN ONCE, YOU HAVE A PROBLEM`)
            this.setState({
                ...this.state,
                updatedProfile: { ...this.props.company },
                init: true,
            })
            this.props.getEmployerJobs(this.props.company.user_id);
        }
    }

    componentWillMount() {
        this.props.getCurrentUser();
    }

    edit = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: true,
            updatedProfile: { ...this.props.company }
        });
    };

    updateUser = event => {
        event.preventDefault();
        this.props.getCurrentUser();
        this.setState({
            ...this.state,
            updatedProfile: {
                ...this.props.company,
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
                ...this.props.company,
            }
        })
    };

    cancel = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.company,
            }
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

    createJob = e => {
        e.preventDefault();
        axiosWithAuth(localStorage.getItem('userID'))
            .post(`${SERVER_BASE_URL}/jobs`)
            .then(res => {
                console.log('CREATE JOB')
                console.log(res)
                this.props.history.push(`job/${res.data.id}/edit`)
            })
            .catch(err => {
                console.log('CREATE JOB ERROR')
                console.log(err)
            })
    }

    deleteJob = id => {
        console.log(id);
        axiosWithAuth(localStorage.getItem('userID'))
            .delete(`${SERVER_BASE_URL}/jobs/${id}`)
            .then(res => {
                console.log(res)
            })
            .then(() => {
                this.props.getEmployerJobs(this.props.company.user_id);
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSocialMediaChanges = e => {
        this.setState({
            updatedProfile: {
                ...this.state.updatedProfile,
                social_media: {
                    ...this.state.updatedProfile.social_media,
                    [e.target.name]: e.target.value
                }
            }
        });
    };

    render() {
        if (!this.props.company.name) {
            return <div>LOADING</div>
        }
        return (
            <div className="company">
                <Link to="/my-profile/accepted">Accepted</Link>
                <div className="img">
                    <h1>{this.props.company.name.charAt(0)}</h1>
                </div>
                <div className="name">
                    {!this.state.edit ? (<>
                        <h3>{this.props.company.name}</h3>
                    </>) : (
                            <form onSubmit={this.updateUser}>
                                <input
                                    name="name"
                                    type="text"
                                    value={this.state.updatedProfile.name}
                                    onChange={this.handleChanges}
                                />
                                <input type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                </div>
                <div className="location">
                    {!this.state.edit ? (<>
                        <h3>{this.props.company.location}</h3>
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
                {!this.state.edit ? (
                    <div className='edit-btn'>
                        <input type="button" value="EDIT" onClick={this.edit} />
                    </div>
                ) : (
                        <form onSubmit={this.updateUser}>
                            <input type="submit" value="SUBMIT" />
                            <input type="button" value="CANCEL" onClick={this.cancel} />
                        </form>
                    )}
                <div className="about">
                    {!this.state.edit ? (<>
                        <strong><p>About</p></strong>
                        <p>{this.props.company.about}</p>
                    </>) : (
                            <form onSubmit={this.updateUser}>
                                <textarea
                                    name="about"
                                    type="text"
                                    value={this.state.updatedProfile.about}
                                    onChange={this.handleChanges}
                                />
                                <input type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                </div>
                {this.props.company.contact_info &&
                    <div className="contact">
                        {!this.state.edit ? (<>
                            <strong><p>Contact Info</p></strong>
                            <p>{this.props.company.contact_info.phone}</p>
                            <p>{this.props.company.contact_info.email}</p>
                        </>) : (
                                <form onSubmit={this.updateUser}>
                                    <input
                                        name="phone"
                                        type="text"
                                        value={this.state.updatedProfile.contact_info.phone}
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
                <div className="social">
                    <strong><p>Social Media</p></strong>
                    <div className="social-logos">
                        {this.props.company.social_media && (<>
                            {!this.state.edit ? (
                                <>
                                    {this.props.company.social_media.facebook &&
                                        this.props.company.social_media.facebook.includes('://www.facebook.com') && (
                                            <a href={`${this.props.company.social_media.facebook}`}>
                                                <img src={require("../assets/social/f_logo_RGB-Blue_72.png")} alt="facebook" />
                                            </a>
                                        )}
                                    {this.props.company.social_media.linkedin &&
                                        this.props.company.social_media.linkedin.includes('://www.linkedin.com') && (
                                            <a href={`${this.props.company.social_media.linkedin}`}>
                                                <img src={require("../assets/social/In-Blue-48@2x.png")} alt="linked in" />
                                            </a>
                                        )}
                                    {this.props.company.social_media.twitter &&
                                        this.props.company.social_media.twitter.includes('://www.twitter.com') && (
                                            <a href={`${this.props.company.social_media.twitter}`}>
                                                <img src={require("../assets/social/Twitter_Logo_Blue.png")} alt="twitter" />
                                            </a>
                                        )}
                                    {this.props.company.social_media.github &&
                                        this.props.company.social_media.github.includes('://www.github.com') && (
                                            <a href={`${this.props.company.social_media.github}`}>
                                                <img src={require("../assets/social/GitHub-Mark-64px.png")} alt="git hub" />
                                            </a>
                                        )}
                                </>
                            ) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="facebook"
                                            type="text"
                                            value={this.state.updatedProfile.social_media.facebook}
                                            placeholder="Facebook"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input
                                            name="linkedin"
                                            type="text"
                                            value={this.state.updatedProfile.social_media.linkedin}
                                            placeholder="LinkedIn"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input
                                            name="twitter"
                                            type="text"
                                            value={this.state.updatedProfile.social_media.twitter}
                                            placeholder="Twitter"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input
                                            name="github"
                                            type="text"
                                            value={this.state.updatedProfile.social_media.github}
                                            placeholder="GitHub"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input type="submit" style={{ display: "none" }} />
                                    </form>
                                )}</>)}
                    </div>
                </div>
                <div className="website">
                    <strong><p>Company Website</p></strong>
                    {!this.state.edit ? (<>
                        <a href={`${this.props.company.website}`}><p>{this.props.company.website}</p></a>
                    </>) : (
                            <form onSubmit={this.updateUser}>
                                <input
                                    name="website"
                                    type="text"
                                    value={this.state.updatedProfile.website}
                                    onChange={this.handleChanges}
                                />
                                <input type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                </div>
                <div className="jobs">
                    {!this.state.edit ? (
                        <></>
                    ) : (
                            <button onClick={this.createJob}>Create Job</button>
                        )}
                    {this.props.jobs.map(job => (
                        <div className="job" onClick={()=>this.props.history.push(`/job/${job.id}`)}>
                            <div className="job-info">
                                <h3>{job.job_title}</h3>
                                <p>{job.location}</p>
                            </div>
                            {!this.state.edit ? (
                                <></>
                            ) : (
                                    <button onClick={() => this.deleteJob(job.id)}>X</button>
                                )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        company: state.userReducer.currentUser,
        jobs: state.employerJobReducer.jobs,
        gettingJobs: state.employerJobReducer.gettingJobs
    };
};

export default connect(
    mapStateToProps,
    {
        getCurrentUser,
        updateCurrentUser,
        getEmployerJobs,
    }
)(CurrentCompanyProfile);