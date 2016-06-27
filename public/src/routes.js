import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import LightsIndex from './pages/LightsIndex';
import GroupsIndex from './pages/GroupsIndex';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LightsIndex} />
    <Route path="lights" component={LightsIndex} />
    <Route path="groups" component={GroupsIndex} />
  </Route>
);
