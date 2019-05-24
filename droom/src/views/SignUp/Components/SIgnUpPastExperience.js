
import React from "react";
import "../../../sass/SignUpPastExperience.scss";
class PastExperience extends React.Component {
  constructor(props) {
    super(props);
    let data = props.getData();
    this.state = {
      past_experience: data.past_experience
    };
  }
  handleChange(e) {
    let arry = this.state.past_experience;
    let i = parseInt(e.target.id);
    arry[i] = {
      ...arry[i],
      [e.target.name]: e.target.value
    };
    this.setState({ past_experience: arry });
  }
  addItem() {
    if (
      !this.validateItem(
        this.state.past_experience[this.state.past_experience.length - 1]
      )
    )
      return;
    let arry = this.state.past_experience;
    arry.push({ company_name: "", job_title: "", description: "" });
    this.setState({ past_experience: arry });
  }
  removeItem(i) {
    let arry = this.state.past_experience;
    arry.splice(i, 1);
    if (arry.length === 0)
      arry.push({ company_name: "", job_title: "", description: "" });
    this.setState({ past_experience: arry });
  }
  validateItem(obj) {
    return (
      obj.company_name !== "" && obj.job_title !== "" && obj.description !== ""
    );
  }
  validate(cb) {
    let arry = this.state.past_experience;
    arry = arry.filter(x => this.validateItem(x));
    if (!arry.length) return;
    this.setState({ past_exerience: arry });
    this.props.setData(this.state);
    cb();
  }
  render() {
    return (
      <div className="signin-main-exp">
        <h2>Past Work Experience?</h2>
        <button onClick={() => this.addItem()}>Add New Experience</button>
        <div className="signin-input-exp">
          {this.state.past_experience.map((x, i) => (
            <div className="signin-input-exp-sub" key={i}>
              <label for="companyname1">Company Name</label>
              <input
                id="companyname1"
                name="company_name"
                key={`1:${i}`}
                id={i}
                value={x.company_name}
                placeholder="Company..."
                onChange={e => this.handleChange(e)}
              />
              <label for="jobtitle1">Job Title</label>
              <input
                id="jobtitle1"
                name="job_title"
                key={`2:${i}`}
                id={i}
                value={x.job_title}
                placeholder="Job Title..."
                onChange={e => this.handleChange(e)}
              />
              <label for="description1">Description</label>
              <input
                id="description1"
                name="description"
                key={`3:${i}`}
                id={i}
                value={x.description}
                placeholder="Description..."
                onChange={e => this.handleChange(e)}
              />
              {
                <button
                  key={`but:${i}`}
                  onClick={i => this.removeItem(i)}
                >
                  x
                </button> /*maybe add this later*/
              }

            </div>
          ))}
        </div>
        <div className="signin-main-but">
          {this.props.index() !== 0 ? (
            <button
              onClick={() => {
                this.validate(this.props.prev);
              }}
            >
              Prev
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              this.validate(this.props.next);
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default PastExperience;
