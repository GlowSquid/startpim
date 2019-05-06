import { combineReducers } from "redux";
import account from "./account";
import accountInfo from "./accountInfo";

export default combineReducers({
  account,
  accountInfo
});
