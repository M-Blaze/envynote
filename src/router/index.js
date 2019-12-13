import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Notebooks from "../views/notebooks";
const Router = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path="/" component={Notebooks} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;
