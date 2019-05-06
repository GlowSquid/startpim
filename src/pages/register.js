import { Fragment, useState } from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import Layout from "../components/Layout";

import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  });

  const { email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [showData, setShowData] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setShowData("Passwords doesn't match");
    } else {
      console.log(formData);

      const options = {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      };

      fetch("/api/register", options)
        .then(async res => await res.json())
        .then(data => {
          if (data.type === "error") {
            setShowData("Email already exist");
          } else {
            setShowData("");
            console.log(data.message);
            Router.push("/login");
          }
        })
        .catch(Error => {
          console.log("Error: ", Error);
        });
    }
  };

  return (
    <Layout>
      <Fragment>
        <h1 className="bumper">Register</h1>
        <p>Create your account</p>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
          <p className="error">{showData}</p>
          <input type="submit" className="btn" value="Register" />
        </form>
        <p>Already a registered user? Login</p>
      </Fragment>
    </Layout>
  );
};

export default Register;
