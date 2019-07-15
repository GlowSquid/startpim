import { connect } from "react-redux";
import { fetchAccountInfo } from "../actions/accountInfo";
import { useEffect } from "react";

const AccountInfo = ({ fetchAccountInfo, accountInfo }) => {
  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  return (
    <div className="account-info">
      <p>Logged in as: {accountInfo.email}</p>
    </div>
  );
};

export default connect(
  ({ accountInfo }) => ({ accountInfo }),
  { fetchAccountInfo }
)(AccountInfo);
