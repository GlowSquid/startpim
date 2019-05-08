import { combineReducers } from "redux";
import account from "./account";
import accountInfo from "./accountInfo";
import bm from "./bm";

export default combineReducers({
  account,
  accountInfo,
  bm
});
