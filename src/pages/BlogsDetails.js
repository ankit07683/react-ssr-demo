import React, { useEffect, useState } from "react";
import { httpservice } from "../Services/axiosConfig";
import { constants } from "../constants/api-endpoints";
import Emitter from "../Services/EventEmitter";
import PrettyPrintJson from "../Components/SEOHandler/PrintJSON";
import { useParams } from "react-router";
import moment from "moment";

export default function Home() {
  const [blogData, setBlogData] = useState({});
  let { slug } = useParams();

  useEffect(() => {
    if (slug) {
      httpservice()
        .get(`${constants.API.BLOGS_LIST}/${slug}`)
        .then((response) => {
          if (response && response.data && response.data.status === 200) {
            Emitter.emit("UPDATE_METADATA", response.data.response);
            setBlogData(response.data.response);
          }
        })
        .catch((error) => {
          console.log("error occured", error);
        });
    }
  }, [slug]);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-7 shadow-sm">
          <div className="mb-4">
            <h2>{blogData.title}</h2>
          </div>
          <div className="mt-4 mb-4">
            <img
              src={`${constants.host}/blog-images/${blogData.image}`}
              alt={`${constants.host}/images/logo_square.jpg`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="mt-4 mb-4">
            <h6>Posted By : {blogData.author}</h6>
            <h6>
              Published On :{" "}
              {moment(parseInt(blogData.createdAt)).format("DD-MM-YYYY")}
            </h6>
            <h6>
              last Updated :{" "}
              {moment(parseInt(blogData.updatedAt)).format("DD-MM-YYYY")}
            </h6>
          </div>

          {blogData && blogData.body && (
            <div dangerouslySetInnerHTML={{ __html: blogData.body }}></div>
          )}
        </div>
        <div className="col-md-5 shadow-sm">
          <h2>Inspect in DOM, You should see below data</h2>
          <hr />
          <div>
            <PrettyPrintJson data={blogData} />
          </div>
        </div>
      </div>
    </div>
  );
}
