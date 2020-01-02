import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Notebooks from "../views/notebooks";
import Notes from "../views/notes";

const Router = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path="/notebook/:id/:slug" component={Notes} />
          <Route path="/" component={Notebooks} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;
