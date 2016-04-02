import TYPES from "action_types";

export const fetchItems = (query) => ({
  type: TYPES.EXAMPLE_API_ACTION,
  payload: {query},
  apiCall: {
    method: "GET",
    path: "/items",
    query: {query},
    parser: (res) => {
      if (res.ok) {
        // mock response
        return ["Item 1", "Item 2", "Item 3"];
      }
    }
  }
});