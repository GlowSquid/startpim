import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { drop } from "../actions/account";

import "../styles/Form.css";

let clicked = false;

const AccountDelete = ({ drop, account }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    clicked = false;
  }

  return (
    <Fragment>
      <div className="danger-card">
        <h2>Delete Account?</h2>
        <p>Confirm deleting your account and all your bookmarks forever</p>
        <p>
          <strong className="error">This action is irreversible!</strong>
        </p>
        {/* <div className="danger-card"> */}
        <form className="form" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => onChange(e)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            className="input"
            required
          />
          <p className="error center">
            {account.message ? account.message : null}
          </p>

          <input
            type="submit"
            className="btn btn-danger"
            value="Confirm Delete"
          />

          {/* <div className="bumper" /> */}
        </form>
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default connect(
  ({ account }) => ({ account }),
  { drop }
)(AccountDelete);
