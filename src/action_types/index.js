const asyncActions = [

];

const syncActions = [
  "API_UNREACHABLE",
  "API_BAD_RESPONSE",
  "API_UNAUTHENTICATED"
];

export default syncActions.reduce((set, name) => {
  if (set[name]) throw new Error(`Duplicate action name: ${name}`);
  set[name] = name;
  return set;
}, asyncActions.reduce((set, name) => {
  if (set[name]) throw new Error(`Duplicate action name: ${name}`);
  set[name] = {request: `${name}_REQUEST`, done: `${name}_DONE`, fail: `${name}_FAIL`};
  return set;
}, {}));
