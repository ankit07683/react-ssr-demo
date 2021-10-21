import React, { useEffect, useState } from "react";
import { httpservice } from "../Services/axiosConfig";
import { constants } from "../constants/api-endpoints";
import Emitter from "../Services/EventEmitter";
import PrettyPrintJson from "../Components/SEOHandler/PrintJSON";

export default function Home() {
  const [pageData, setPageData] = useState({});
  const [socialData, setSocialLinks] = useState({});

  useEffect(() => {
    httpservice()
      .get(constants.API.CONTACT_US)
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
      .get(`${constants.API.SOCIAL_LINKS}`)
      .then((response) => {
        if (response && response.data && response.data.status === 200) {
          setSocialLinks(response.data.response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  }, []);

  return (
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-7 shadow-sm mb-4">
          {pageData && pageData.html && (
            <div dangerouslySetInnerHTML={{ __html: pageData.html }}></div>
          )}
          <div className="mt-4">
            <hr />
            <h2>You can folow me on :</h2>
            {socialData &&
              socialData.SOCIAL &&
              Object.keys(socialData.SOCIAL).length > 0 && (
                <ul>
                  {Object.keys(socialData.SOCIAL).map((link) => {
                    return (
                      <li>
                        {link} :{" "}
                        <a
                          href={socialData.SOCIAL[link]}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {socialData.SOCIAL[link]}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
          </div>
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
