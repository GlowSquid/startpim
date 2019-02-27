import axios from "axios";

import {
  GET_START,
  START_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_START,
  SET_CURRENT_USER
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

// Create startpage
export const createStart = (startData, history) => dispatch => {
  axios
    .post("/api/start", startData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Bookmark
export const addBookmark = (bmData, history) => dispatch => {
  axios
    .post("/api/start/bookmarks", bmData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteBookmark = id => dispatch => {
  axios
    .delete(`/api/start/bookmarks/${id}`)
    .then(res =>
      dispatch({
        type: GET_START,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This action is irreversible")) {
    axios
      .delete("/api/start")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
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
