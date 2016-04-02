import React                 from "react";
import { Route, IndexRoute } from "react-router";

import Home                  from "views/home/home_container";

export default (store) => (
  <Route path='/'>
    <IndexRoute component={Home} />
  </Route>
);
