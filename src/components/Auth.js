import { useState } from "react";
import Router from "next/router";
// import Link from "next/link";
import { connect } from "react-redux";
import { register } from "../actions/account";
import { login } from "../actions/account";

import "../styles/Form.css";

let clicked = false;

const Auth = ({ register, login, account }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const [showLogin, setShowLogin] = useState(false);

  const [showData, setShowData] = useState();

  const { email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowData("");
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!showLogin) {
      if (password !== password2) {
        setShowData("Passwords doesn't match");
      } else {
        register(formData);
        clicked = true;
      }
    } else {
      login(formData);
      clicked = true;
    }
  };

  if (
    clicked === true &&
    (account.message !== null ||
      account.message === "Incorrect email or password") &&
    account.status === "error"
  ) {
    setShowData(account.message);
    clicked = false;
  }

  if (account.loggedIn === true) {
    Router.push("/");
  }

  return (
    <div className="auth">
      <header className="auth-header">
        <button
          onClick={() => setShowLogin(false)}
          className={showLogin ? "btn-inactive" : "btn-active"}
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className={
            showLogin ? "btn-active btn-active__login" : "btn-inactive"
          }
        >
          Login
        </button>
      </header>
      <h2 className="center">
        {showLogin ? "Already registered? Login" : "Sign Up for Free"}
      </h2>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="email"
          placeholder="Email*"
          value={email}
          onChange={e => onChange(e)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password*"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password*"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
          className={showLogin ? "input__hidden" : "input"}
        />

        <p className="error center">{showData}</p>
        <br />
        <input
          type="submit"
          className={
            showLogin ? "btn-landing btn-landing__login" : "btn-landing"
          }
          value={showLogin ? "Login" : "Register"}
        />
      </form>
    </div>
  );
};

export default connect(
  ({ account }) => ({ account }),
  { register, login }
)(Auth);
