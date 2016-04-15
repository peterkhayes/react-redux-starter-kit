import ih            from "ih";
import matchesAction from "./utils/matches_action";
import TYPES         from "action_types";

const initialState = {
  items: null,
  query: null
};

export default function googleReducer (state = initialState, action) {

  if (matchesAction(action, TYPES.EXAMPLE_API_ACTION.request)) {
    state = ih.set(state, "query", action.payload.query);
    state = ih.without(state, "items"); 
  }

  if (matchesAction(action, TYPES.EXAMPLE_API_ACTION.done)) {
    if (action.payload.query === state.query) {
      state = ih.set(state, "items", action.apiResponse);
    }
  }

  return state;
}