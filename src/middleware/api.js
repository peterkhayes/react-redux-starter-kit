import _ from "lodash";
import superagent from "superagent";

import {
  API_UNREACHABLE,
  API_BAD_RESPONSE,
  API_UNAUTHENTICATED
} from "action_types";

export default ({dispatch, getState}) => (next) => (action) => {
  const {type, payload} = action;
  let apiCall = action.apiCall;

  // Ignore sync actions.
  if (!apiCall) return next(action);

  // Dispatch request action.
  dispatch({type: type.request, payload});

  // If API Call property is a thunk, call it with the state.
  if (_.isFunction(apiCall)) apiCall = apiCall(getState());

  const {path, body, query, headers, parser} = apiCall;
  const method = (apiCall.method || "get").toLowerCase().replace("delete", "del");

  return new Promise((resolve, reject) => {
   
    function done (action) {
      dispatch(action);
      return resolve(action);
    }

    function fail (action) {
      dispatch(action);
      return reject(action);
    }

    superagent[method](path)
      .set(headers)
      .query(query)
      .send(body)
      .end((_, response) => {
        if (!response) {
          return fail({type: API_UNREACHABLE, payload});
        }

        // If user has specified a parse function, we call it.
        // If it returns something, we dispatch a `done` action with that response.
        // If it throws, we dispatch a `fail` action with that error.
        if (parser) {
          try {
            const result = parser(response);
            if (result) return done({type: type.done, payload, apiResponse: result});
          } catch (ex) {
            return fail({type: type.fail, payload, apiError: ex});
          }
        }

        // If they do not specify a parser, or their parser did not handle the response,
        // we'll dispatch the response body in case of a 2xx status code, and an error
        // otherwise.
        if (response.ok) {
          return done({type: type.done, payload, apiResponse: response.body});
        } else if (response.unauthorized) {
          return fail({type: API_UNAUTHENTICATED, payload});
        } else if (response.status >= 502 && response.status <= 504) {
          return fail({type: API_UNREACHABLE, payload});
        } else {
          return fail({type: API_BAD_RESPONSE, payload});
        }
      });
  });
};