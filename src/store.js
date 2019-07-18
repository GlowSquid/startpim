import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../src/reducers";

export function initializeStore() {
  return createStore(
    rootReducer,
    // initialState,
    // applyMiddleware(thunkMiddleware) // without devtools
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
