import React from "react";
import { Switch, Route } from "react-router-dom";
import allRoutes from "./routes.json";
import { Home, ContactUs, AboutUS, Blogs, BlogsDetails } from "../pages";
import NotFound from "../Components/ErrorPages/404";

function AppRoutes() {
  return (
    <Switch>
      <Route exact path={allRoutes.ABOUT_US} render={() => <AboutUS />} />
      <Route exact path={allRoutes.CONTACT_US} render={() => <ContactUs />} />
      <Route
        exact
        path={`${allRoutes.BLOGS}/:slug`}
        render={() => <BlogsDetails />}
      />
      <Route exact path={allRoutes.BLOGS} render={() => <Blogs />} />
      <Route exact path={allRoutes.HOME} render={() => <Home />} />
      <Route path={allRoutes.ALL} component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;
