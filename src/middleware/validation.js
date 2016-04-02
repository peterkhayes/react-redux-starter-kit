import _ from "lodash";

export default () => (next) => (action) => {
  if (action.type == null) {
    console.error("Action is missing type, will not continue with dispatch:", action);
    return;
  } else if (action.payload == null) {
    console.error("Action is missing payload, will not continue with dispatch:", action);
    return;
  }

  if (action.apiCall) {
    if (!_.isString(action.type.request)) {
      console.error("Action has an api call but no `request` subtype, will not continue with dispatch:", action);
      return;
    } else if (!_.isString(action.type.done)) {
      console.error("Action has an api call but no `done` subtype, will not continue with dispatch:", action);
      return;
    } else if (!_.isString(action.type.fail)) {
      console.error("Action has an api call but no `fail` subtype, will not continue with dispatch:", action);
      return;
    }
  } else if (!_.isString(action.type)) {
    console.error("Action has invalid type:", action);
    return;
  }

  return next(action);
};