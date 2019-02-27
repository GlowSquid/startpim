import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
// import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
// import SelectListGroup from "../common/SelectListGroup";
import { createStart } from "../../actions/startActions";

class CreateHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "", // switch this or delete
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const startData = {
      handle: this.state.handle
      // title: this.state.title,
      // url: this.state.url,
      // icon: this.state.icon,
      // tag: this.state.tag,
      // color: this.state.color,
      // description: this.state.description
    };

    // console.log("submit");
    this.props.createStart(startData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // const options = [
    //   { label: "Select Tag", value: 0 },
    //   { label: "Chopsticks", value: "Chopsticks" },
    //   { label: "Bubblegum", value: "Bubblegum" }
    // ];

    return (
      <div className="create-handle">
        <h1 className="head">Create Handle</h1>
        <p>I like to move it move it</p>
        <form onSubmit={this.onSubmit}>
          {/* <SelectListGroup
            placeholder="Tags/Folder"
            name="tags"
            value={this.state.tags}
            onChange={this.onChange}
            options={options}
            error={errors.tags}
          /> */}

          {/* <TextFieldGroup
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
            // info="Pick a title for your bookmark"
          /> */}

          <TextFieldGroup
            placeholder="Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
          />

          {/* <TextAreaFieldGroup
            placeholder="Description"
            name="description"
            value={this.state.description} // or desc?
            onChange={this.onChange}
            error={errors.description}
            info="blah blah"
          /> */}

          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
    );
  }
}

CreateHandle.propTypes = {
  start: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  start: state.start,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createStart }
)(withRouter(CreateHandle));
