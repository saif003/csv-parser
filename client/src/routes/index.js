import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { SlimLayout } from 'layouts';
import { notFound, UserGrid } from 'screens';

const Routes = () => {
  return (
    <BrowserRouter>
      <SlimLayout>
        <Switch>
          <Route path="/" component={UserGrid} exact />
          <Route path="/prn" component={UserGrid} exact />
          <Route path="/404" component={notFound} exact />

          <Redirect from="*" to="/404" />
        </Switch>
      </SlimLayout>
    </BrowserRouter>
  );
};

export default Routes;
