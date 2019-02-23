import React, { Component } from "react";
import axios from "axios";
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

    this.props.registerUser(newUser);

    // axios
    //   .post("/api/users/register", newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
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

export default connect(
  null,
  { registerUser }
)(Register);
