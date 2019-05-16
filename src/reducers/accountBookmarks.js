/* eslint-disable indent */
import { ACCOUNT_BOOKMARKS } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_ACCOUNT_BOOKMARKS = { bookmarks: [] };

const accountBookmarks = (state = DEFAULT_ACCOUNT_BOOKMARKS, action) => {
  switch (action.type) {
    case ACCOUNT_BOOKMARKS.FETCH:
      return { ...state, status: fetchStates.fetching };
    case ACCOUNT_BOOKMARKS.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case ACCOUNT_BOOKMARKS.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message,
        bookmarks: action.bookmarks
      };
    default:
      return state;
  }
};

export default accountBookmarks;
