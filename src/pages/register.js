import { Fragment, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { register } from "../actions/account";
// import fetchStates from "../reducers/fetchStates";

import Layout from "../components/Layout";
import "../styles/Auth.css";

let clicked = false;

const Register = ({ register, account }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const [showData, setShowData] = useState();

  const { email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowData("");
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setShowData("Passwords doesn't match");
    } else {
      register(formData);

      clicked = true;
    }
  };

  if (
    clicked === true &&
    account.message !== null &&
    account.status === "error"
  ) {
    setShowData(account.message);
    console.log(account);
    console.log(account.type);
    console.log(account.status);
    console.log(account.error);
    console.log(account.message);
    clicked = false;
  }

  if (account.loggedIn === true) {
    Router.push("/");
  }

  return (
    <Layout>
      <Fragment>
        <div className="auth">
          <h1 className="bumper">Register</h1>
          <p>Create your account</p>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => onChange(e)}
              // error={error.email}
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              required
            />
            <p className="error">{showData}</p>
            <br />
            <input type="submit" className="btn" value="Register" />
          </form>
          <p>
            Already a registered user?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
      </Fragment>
    </Layout>
  );
};

export default connect(
  ({ account }) => ({ account }),
  { register }
)(Register);
