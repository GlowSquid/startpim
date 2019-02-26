import {
  GET_START,
  START_LOADING,
  CLEAR_CURRENT_START
} from "../actions/types";

const initialState = {
  start: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_START:
      return {
        ...state,
        start: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_START:
      return {
        ...state,
        start: null
      };
    default:
      return state;
  }
}
