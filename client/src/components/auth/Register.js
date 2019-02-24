import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser } from "../../actions/authActions";

import styles from "./Auth.module.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 className={styles.head}>Sign Up</h1>
        <p>Create your StartPIM account</p>
        <div className="row">
          <form onSubmit={this.onSubmit} className={styles.auth__form}>
            <div className={styles.input__space}>
              <input
                className={
                  errors.username ? styles.input__warning : styles.input
                }
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
              {errors.username && (
                <div className={styles.input__error}>* {errors.username}</div>
              )}
            </div>
            <div className={styles.input__space}>
              <input
                className={errors.email ? styles.input__warning : styles.input}
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className={styles.input__error}>* {errors.email}</div>
              )}
            </div>
            <div className={styles.input__space}>
              <input
                className={
                  errors.password ? styles.input__warning : styles.input
                }
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className={styles.input__error}>* {errors.password}</div>
              )}
            </div>
            <div className={styles.input__space}>
              <input
                className={
                  errors.password2 ? styles.input__warning : styles.input
                }
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className={styles.input__error}>* {errors.password2}</div>
              )}
            </div>
            <input type="submit" className={styles.btn} id="btn" />
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
