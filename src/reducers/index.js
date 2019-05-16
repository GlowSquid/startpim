import { combineReducers } from "redux";
import account from "./account";
import bookmark from "./bookmark";
import accountBookmarks from "./accountBookmarks";
import accountInfo from "./accountInfo";

export default combineReducers({
  account,
  bookmark,
  accountBookmarks,
  accountInfo
});
