import { Fragment, useState } from "react";
// import fetch from "isomorphic-unfetch";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { login } from "../actions/account";
// import fetchStates from "../reducers/fetchStates";

import Layout from "../components/Layout";
import "../styles/Auth.css";

let clicked = false;

const Login = ({ login, account }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showData, setShowData] = useState();

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowData("");
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(formData);
    clicked = true;
    // console.log(account.loggedIn);
  };

  // execute this once per try
  if (
    clicked === true &&
    account.message === "Incorrect email or password" &&
    account.status === "error"
  ) {
    setShowData(account.message);
    clicked = false;
  }

  if (account.loggedIn === true) {
    Router.push("/dashboard");
  }

  return (
    <Layout>
      <Fragment>
        <h1 className="bumper">Login</h1>
        <p>Sign in to your account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <p className="error">{showData}</p>
          <br />
          <input type="submit" className="btn" value="Login" />
        </form>
        <p>
          Not yet registered?{" "}
          <Link href="/register">
            <a>Sign Up</a>
          </Link>
        </p>
      </Fragment>
    </Layout>
  );
};

export default connect(
  ({ account }) => ({ account }),
  { login }
)(Login);
