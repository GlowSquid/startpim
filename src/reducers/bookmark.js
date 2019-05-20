/* eslint-disable indent */
import { BOOKMARK } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_BOOKMARK = { title: "", url: "" };

const bookmark = (state = DEFAULT_BOOKMARK, action) => {
  switch (action.type) {
    case BOOKMARK.FETCH:
      return { ...state, status: fetchStates.fetching };
    case BOOKMARK.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case BOOKMARK.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    case BOOKMARK.FETCH_LOGOUT_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    case BOOKMARK.FETCH_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    case BOOKMARK.FETCH_DELETE_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    default:
      return state;
  }
};

export default bookmark;
