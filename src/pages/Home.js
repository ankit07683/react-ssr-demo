import React, { useEffect, useState } from "react";
import { httpservice } from "../Services/axiosConfig";
import { constants } from "../constants/api-endpoints";
import Emitter from "../Services/EventEmitter";
import { BlogListRow } from "../Components/Blogs";
import PrettyPrintJson from "../Components/SEOHandler/PrintJSON";

export default function Home() {
  const [pageData, setPageData] = useState({});
  const [recentBlogs, setRecentBlogs] = useState([]);

  let limit = 3;
  useEffect(() => {
    httpservice()
      .get(constants.API.HOME)
      .then((response) => {
        if (response && response.data && response.data.status === 200) {
          Emitter.emit("UPDATE_METADATA", response.data.response);
          setPageData(response.data.response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });

    httpservice()
      .get(`${constants.API.BLOGS_LIST}?limit=${limit}`)
      .then((response) => {
        if (response && response.data && response.data.status === 200) {
          setRecentBlogs(response.data.response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  }, []);

  return (
    <div class="container">
      <div class="row mb-4">
        <div class="col-xs-12 mt-4 shadow-sm">
          <h1>Home Page</h1>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-7 shadow-sm">
          <h2>Recent Posted Blogs</h2>
          <hr />
          {recentBlogs &&
            recentBlogs.length &&
            recentBlogs.map((blog) => {
              return <BlogListRow {...blog} />;
            })}
        </div>
        <div class="col-md-5 shadow-sm">
          <h2>Inspect in DOM, Upu should see below data</h2>
          <hr />
          <div>
            <PrettyPrintJson data={pageData} />
          </div>
        </div>
      </div>
    </div>
  );
}
