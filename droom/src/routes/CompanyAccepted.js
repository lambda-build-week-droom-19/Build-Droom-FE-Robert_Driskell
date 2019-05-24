import React, { Component } from "react";
import { connect } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import {
  getCurrentUser,
  updateCurrentUser,
  getEmployerJobs,
  SERVER_BASE_URL
} from "../actions/index";

class CurrentCompanyProfile extends Component {
  state = {
    people: []
  };

  componentDidMount() {
    this.fetchAccepted();
  }

  fetchAccepted = () => {
    axiosWithAuth()
      .get(`${SERVER_BASE_URL}/jobs/matches/employer`)
      .then(res => {
        console.log(res);
        const jobsWithAcceptedPeople = res.data.filter(job => {
          if (job.usersConfirmed.length > 0) {
            return job.usersConfirmed;
          } else {
            return false;
          }
        });
        console.log(jobsWithAcceptedPeople);
        const arrayOfArrays = jobsWithAcceptedPeople.map(job => {
          console.log(job.usersConfirmed);
          return job.usersConfirmed;
        });
        console.log(arrayOfArrays);
        var merged = arrayOfArrays.flat(1);
        console.log("array");
        console.log(merged);
        this.setState({
          people: merged
        });
        console.log("read me");
        console.log(this.state.jobs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return <></>;
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
    getCurrentUser
  }
)(CurrentCompanyProfile);
