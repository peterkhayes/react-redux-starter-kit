import _ from "lodash";

export default function (action, type) {
  if (!_.isString(type)) {
    console.error("Matching action against invalid type:", type);
  }
  return action.type === type;
}