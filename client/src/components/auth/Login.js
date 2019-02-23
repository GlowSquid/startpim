import React, { Component } from "react";

import styles from "./Auth.module.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  }

  render() {
    return (
      <div>
        <h1 className={styles.head}>Login</h1>
        <div className="row">
          <form className={styles.auth__form} onSubmit={this.onSubmit}>
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
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" className={styles.btn} />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
