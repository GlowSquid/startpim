import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBookmark } from "../../actions/startActions";

class AddBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "", // if no title, fetch it from link
      url: "", // should be only required field
      description: "", // text area field
      // icon: "", // autofetch favicon
      // tag: "", // complicated folder structure. do later
      // color: "", // maybe useless
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const bmData = {
      title: this.state.title,
      url: this.state.url,
      description: this.state.description
    };

    this.props.addBookmark(bmData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="row">
          <h1 className="head">Add bookmark</h1>
          <Link to="/dashboard">
            <button className="btn">Go back</button>
          </Link>

          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Paste full URL"
              name="url"
              type="url"
              value={this.state.url}
              onChange={this.onChange}
              error={errors.url}
            />

            <TextFieldGroup
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
            />

            <TextAreaFieldGroup
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
            />
            {/* value="submit" */}
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddBookmark.propTypes = {
  addBookmark: PropTypes.func.isRequired,
  start: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  start: state.start,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBookmark }
)(withRouter(AddBookmark));
