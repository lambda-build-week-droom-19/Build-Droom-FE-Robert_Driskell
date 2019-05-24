import React, { Component } from "react";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import {
  getCurrentUser,
  updateCurrentUser,
  getEmployerJobs,
  SERVER_BASE_URL
} from "../actions/index";

import './CompanyAccepted.scss'

class CurrentCompanyProfile extends Component {
    state = {
        people: [],
        confirmed: []
    }


  componentDidMount() {
    this.fetchAccepted();
  }

    fetchAccepted = () => {
        axiosWithAuth()
            .get(`${SERVER_BASE_URL}/jobs/matches/employer`)
            .then(res => {
                let people = []
                res.data.map(job => {
                    job.usersConfirmed.map(user => {
                        people.push({
                            ...user,
                            job_id: job.job.id
                        })
                    })
                    return job
                })

                this.setState({
                    ...this.state,
                    people
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    removeConfirmed = (id, job_id) => {
        axiosWithAuth()
            .get(`${SERVER_BASE_URL}/jobs/${job_id}`)
            .then(res => {
                this.setState({
                    people: this.state.people.filter(pe => {
                        return pe.user_id !== id
                    })
                    ,
                    confirmed: [
                        ...res.data.confirmed.filter(ap => {
                            console.log(ap, id)
                            return ap !== id
                        })
                    ]
                })
                axiosWithAuth()
                    .put(`${SERVER_BASE_URL}/jobs/${job_id}`, { confirmed: this.state.confirmed })
                this.fetchAccepted()
            })
    }

    render() {
        console.log('confirmed', this.state.confirmed)
        console.log('people', this.state.people)
        return (
            <div className='confirmed-people'>
                <h1>Confirmed Applicants</h1>
                {this.state.people.map(person => (
                    <div className='confirmed-person'>
                        <div className='img'></div>
                        <div>
                            <h2>{`${person.last_name}, ${person.first_name}`}</h2>
                            <h3>{person.position}</h3>
                            <h3>{person.location}</h3>
                        </div>
                        <span onClick={() => this.removeConfirmed(person.user_id, person.job_id)}>X</span>
                    </div>
                ))}
            </div>
        )
    }

}

const mapStateToProps = state => {
  return {
    company: state.userReducer.currentUser
  };
};

export default connect(
    mapStateToProps,
    {
        getCurrentUser,
    }
)(CurrentCompanyProfile);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

