/* eslint-disable indent */
import { BM } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_BM = { title: "", url: "" };

const bm = (state = DEFAULT_BM, action) => {
  switch (action.type) {
    case BM.FETCH:
      return { ...state, status: fetchStates.fetching };
    case BM.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case BM.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    case BM.FETCH_LOGOUT_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    case BM.FETCH_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message
      };
    default:
      return state;
  }
};

export default bm;
