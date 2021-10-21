import React, { useEffect, useState } from "react";
import { httpservice } from "../Services/axiosConfig";
import { constants } from "../constants/api-endpoints";
import { BlogListRow } from "../Components/Blogs";
import Emitter from "../Services/EventEmitter";
import PrettyPrintJson from "../Components/SEOHandler/PrintJSON";

export default function Home() {
  const [pageData, setPageData] = useState({});
  const [blogsList, setBlogsList] = useState({});

  useEffect(() => {
    httpservice()
      .get(constants.API.BLOGS)
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
      .get(`${constants.API.BLOGS_LIST}`)
      .then((response) => {
        if (response && response.data && response.data.status === 200) {
          setBlogsList(response.data.response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  }, []);

  return (
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-7 shadow-sm">
          {pageData && pageData.html && (
            <div dangerouslySetInnerHTML={{ __html: pageData.html }}></div>
          )}
          <h2>Blogs List:</h2>
          <hr />
          {blogsList &&
            blogsList.length &&
            blogsList.map((blog) => {
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
