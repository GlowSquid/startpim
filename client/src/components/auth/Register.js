import React, { Component } from "react";

import styles from "./Register.module.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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

  onSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // console.log(newUser);
    this.setState({ newUser });
  };

  render() {
    return (
      <div>
        <h1 className={styles.head}>Sign Up</h1>
        <p>Create your StartPIM account</p>
        <div className="row">
          <form onSubmit={this.onSubmit} className={styles.auth__form}>
            <div>
              <input
                className={styles.input}
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" className={styles.btn} id="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
