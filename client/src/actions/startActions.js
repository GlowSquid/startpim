import axios from "axios";

import {
  GET_START,
  START_LOADING,
  // GET_ERRORS,
  CLEAR_CURRENT_START
} from "./types";

export const getCurrentStart = () => dispatch => {
  dispatch(setStartLoading());
  axios
    .get("/api/start")
    .then(res =>
      dispatch({
        type: GET_START,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_START,
        // Create your first bookmark interface
        payload: {}
      })
    );
};

export const setStartLoading = () => {
  return {
    type: START_LOADING
  };
};

export const clearCurrentStart = () => {
  return {
    type: CLEAR_CURRENT_START
  };
};
