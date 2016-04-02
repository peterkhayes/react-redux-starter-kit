import { applyMiddleware, compose, createStore } from "redux";
import thunk                                     from "redux-thunk";
import rootReducer                               from "reducers";

import validationMiddleware                      from "./middleware/validation";
import apiMiddleware                             from "./middleware/api";

export default function configureStore (initialState = {}) {
  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk, validationMiddleware, apiMiddleware);
  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require("./dev_tools/dev_tools").default.instrument();
    middleware = compose(middleware, devTools);
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept("reducers", () => {
      const nextRootReducer = require("reducers").default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
