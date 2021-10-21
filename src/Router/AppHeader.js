import React from "react";
import { Link } from "react-router-dom";
import appRoutes from "./routes.json";

export default function AppHeader() {
  return (
    <div className="container">
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-12 text-center">
            <h2 className="blog-header-logo text-dark">React SSR Demo</h2>
          </div>
        </div>
      </header>

      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-center">
          <Link to={appRoutes.HOME} className="p-2 link-secondary">
            Home
          </Link>
          <Link to={appRoutes.ABOUT_US} className="p-2 link-secondary">
            About US
          </Link>
          <Link to={appRoutes.BLOGS} className="p-2 link-secondary">
            Blogs
          </Link>
          <Link to={appRoutes.CONTACT_US} className="p-2 link-secondary">
            Contact US
          </Link>
        </nav>
      </div>
    </div>
  );
}
