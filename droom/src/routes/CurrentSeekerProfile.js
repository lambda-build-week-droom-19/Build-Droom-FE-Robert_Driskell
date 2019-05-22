import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { getCurrentUser } from "../actions/index";

class CurrentSeekerProfile extends Component {
  state = {
    edit: false,
    updatedProfile: {
      first_name: "",
      last_name: "",
      location: "",
      bio: "",
      past_experience: [{}],
      interests: [],
      timestamp: ""
    }
  };

  componentWillMount() {
    this.props.getCurrentUser();
  }

  edit = () => {
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

  handleExperienceChanges = (event) => {
    let experiences = this.state.updatedProfile.past_experience.slice();
    for (let i in experiences) {
      if (experiences[i].name === JSON.parse(event.target.id).name) {
        experiences[i].name = event.target.value;
      }
      this.setState({
        ...this.state,
        updatedProfile: {
          ...this.state.updatedProfile,
          past_experience: experiences
        }
      });
    }
  };

  cancel = () => {
    this.props.getCurrentUser();
    this.setState({
      ...this.state,
      edit: false,
      updatedProfile: {
        ...this.props.seeker
        // past_experience: [...this.props.seeker.past_experience]
      }
    });
  };

  render() {
    return (
      <>
        <div className="seeker-head">
          <div className="profile-pic" />
          <div className="key-info">
            <div className="name">
              {!this.state.edit ? (
                <>
                  {this.props.seeker.first_name}, {this.props.seeker.last_name}
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
                      {/* <input
                        name="name"
                        id={JSON.stringify(experience)}
                        type="text"
                        defaultValue={
                          this.state.updatedProfile.past_experience[index].name
                        }
                        onBlur={this.handleExperienceChanges}
                      /> */}
                      <input
                        name="name"
                        id={JSON.stringify(experience)}
                        type="text"
                        defaultValue={
                          this.state.updatedProfile.past_experience[index].name
                        }
                        onBlur={this.handleExperienceChanges}
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
          <button onClick={this.edit}>EDIT</button>
        ) : (
          <button onClick={this.cancel}>CANCEL</button>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    seeker: state.getUser.currentUser
  };
};

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(CurrentSeekerProfile);
