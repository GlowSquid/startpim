import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import startReducer from "./startReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  start: startReducer
});
