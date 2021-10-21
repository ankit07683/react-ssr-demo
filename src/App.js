import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppHeader, AppFooter, AppRoutes } from "./Router";
import SEOHandler from "./Components/SEOHandler/SEOHandler";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppHeader />
        <SEOHandler />
        <AppRoutes />
        <AppFooter />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
