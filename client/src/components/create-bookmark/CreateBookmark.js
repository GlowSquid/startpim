import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class CreateBookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "", // if no title, fetch it from link
      url: "", // should be only required field
      icon: "", // autofetch favicon
      tag: "", // complicated folder structure. do later
      color: "", // maybe useless
      description: "", // text area field
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const startData = {
      title: this.state.title,
      url: this.state.url,
      icon: this.state.icon,
      tag: this.state.tag,
      color: this.state.color,
      description: this.state.description
    };

    this.props.createStart(startData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "Select Tag", value: 0 },
      { label: "Chopsticks", value: "Chopsticks" }
    ];

    return (
      <div className="create-bookmark">
        <h1 className="head">Create Bookmark</h1>
        <p>I like to move it move it</p>
        <form onSubmit={this.onSubmit}>
          <SelectListGroup
            placeholder="Tags/Folder"
            name="tags"
            value={this.state.tags}
            onChange={this.onChange}
            options={options}
            error={errors.tags}
          />
          <br />
          <br />
          <br />

          <TextFieldGroup
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
            // info="Pick a title for your bookmark"
          />
        </form>
      </div>
    );
  }
}

CreateBookmark.propTypes = {
  start: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  start: state.start,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateBookmark);
