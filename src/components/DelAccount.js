import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { drop } from "../actions/account";

import "../styles/Auth.css";

let clicked = false;

const DelAccount = ({ drop, account }) => {
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
    drop(formData);
    clicked = true;
  };

  // execute once per try
  if (
    clicked === true &&
    account.message === "Invalid account credentials" &&
    account.status === "error"
  ) {
    setShowData(account.message);
    clicked = false;
  }

  return (
    <Fragment>
      <h1 className="bumper">Danger Zone</h1>
      <p>Confirm deleting your account</p>
      <p>
        <strong>This action is irreversible!</strong>
      </p>
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
        <input type="submit" className="btn" value="Confirm Delete" />
        <br />
      </form>
      <br />
    </Fragment>
  );
};

export default connect(
  ({ account }) => ({ account }),
  { drop }
)(DelAccount);
