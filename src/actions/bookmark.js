import { BOOKMARK } from "./types";
import { BACKEND } from "../config";
// import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";

// id              SERIAL PRIMARY KEY,
// title           CHARACTER(128),
// url             CHARACTER(255),
// icon            CHARACTER(36),
// folder          CHARACTER(36),
// description     CHARACTER(255),
// added           TIMESTAMP NOT NULL,
// updated         TIMESTAMP NOT NULL

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
