import React from "react";
import { connect } from "react-redux";
import { getNiches } from "../../../actions";
import "../../../sass/SignUpJobInterests.scss";
class Interests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      niches: []
    };
  }
  componentWillMount() {
    this.props.getNiches(
      () => {
        /* this.setState({niches: []}) */
      },
      () => {}
    );
  }

  toggleNiche(obj) {
    let arry = this.state.niches;
    let index = -1;
    arry.forEach((x, i) => {
      if (x === obj) index = i;
    });
    if (index >= 0) arry.splice(index, 1);
    else arry.push(obj);
    this.setState({ niches: arry });
  }
  isClicked(obj) {
    return this.state.niches.includes(obj);
  }
  varification(cb) {
    if (this.state.niches.length === 0) return;
    this.props.setData(this.state);
    cb();
  }
  render() {
    console.log(this.props.niches + " hello");
    if (
      this.props.niches === undefined ||
      this.props.niches === "" ||
      this.props.niches.length === 0
    ) {
      return <div />;
    }
    return (
      <div className="signin-main-int">
        <h2>What are your niches?</h2>
        <div className="signin-input-int">
          {this.props.niches.map(x => (
            <div
              key={x.id}
              className={this.isClicked(x.id) ? "clicked" : "unclicked"}
              onClick={() => this.toggleNiche(x.id)}
            >
              {x.niche}
            </div>
          ))}
        </div>
        <div className="signin-main-but">
          {this.props.index() !== 0 ? (
            <button onClick={() => this.props.prev()}>Prev</button>
          ) : (
            ""
          )}
          <button onClick={() => this.varification(this.props.next)}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { niches: state.loginReducer.niches };
};

export default connect(
  mapStateToProps,
  { getNiches }
)(Interests);
