import { combineReducers }         from "redux";
import { routerReducer as router } from "react-router-redux";

import example                     from "./example";

export default combineReducers({
  router,
  example
});
