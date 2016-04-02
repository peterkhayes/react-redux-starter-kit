import matchesAction from "./utils/matches_action";
import TYPES         from "action_types";

const initialState = {
  items: null,
  query: null
};

export default function googleReducer (state = initialState, action) {

  if (matchesAction(action, TYPES.EXAMPLE_API_ACTION.request)) {
    return {...state, query: action.payload.query, items: null};
  }

  if (matchesAction(action, TYPES.EXAMPLE_API_ACTION.done)) {
    if (action.payload.query === state.query) {
      return {...state, items: action.apiResponse};
    }
  }

  return state;
}