import { BOOKMARK } from "./types";
import { BACKEND } from "../config";
import fetch from "isomorphic-unfetch";

export const fetchFromBookmark = ({
  endpoint,
  options,
  FETCH_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE
}) => async dispatch => {
  dispatch({ type: FETCH_TYPE });

  return fetch(`${BACKEND.ADDRESS}/api/bookmark/${endpoint}`, options)
    .then(response => response.json())
    .then(json => {
      if (json.type === "error") {
        dispatch({ type: ERROR_TYPE, message: json.message });
      } else {
        dispatch({ type: SUCCESS_TYPE, ...json });
      }
    })
    .catch(error => dispatch({ type: ERROR_TYPE, message: error.message }));
};

export const addBookmark = ({ title, url }) =>
  fetchFromBookmark({
    endpoint: "add-bookmark",
    options: {
      method: "POST",
      credentials: "include", // æ
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url })
    },
    FETCH_TYPE: BOOKMARK.FETCH,
    ERROR_TYPE: BOOKMARK.FETCH_ERROR,
    SUCCESS_TYPE: BOOKMARK.FETCH_SUCCESS
  });

export const dropBookmark = id =>
  fetchFromBookmark({
    endpoint: "drop-bookmark",
    options: {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
      // body: JSON.stringify(id)
      // body: id
    },
    FETCH_TYPE: BOOKMARK.FETCH,
    ERROR_TYPE: BOOKMARK.FETCH_ERROR,
    SUCCESS_TYPE: BOOKMARK.FETCH_DELETE_SUCCESS
  });
