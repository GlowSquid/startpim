import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { createStart, getCurrentStart } from "../../actions/startActions";

class CreateHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentStart();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.start.start) {
      const start = nextProps.start.start;

      this.setState({
        handle: start.handle
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const startData = {
      handle: this.state.handle
    };

    // console.log("submit");
    this.props.createStart(startData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-handle">
        <h1 className="head">Edit Handle</h1>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
          />

          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
    );
  }
}

CreateHandle.propTypes = {
  createStart: PropTypes.func.isRequired,
  getCurrentStart: PropTypes.func.isRequired,
  start: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  start: state.start,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createStart, getCurrentStart }
)(withRouter(CreateHandle));
