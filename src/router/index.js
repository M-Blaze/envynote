import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Notebooks from "../views/notebooks";

const Router = props => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Redirect from="/" to="/notebooks/1" exact />
          <Route path="/">
            <Notebooks />
          </Route>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;
