import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Emitter from "../../Services/EventEmitter";
import { constants } from "../../constants/api-endpoints";

let defaultData = {
  title: "HOME | Native SSR by Ankit Jain",
  meta_title: "Hi, this is the meta title for home page",
  meta_description: "Hi, this is the meta description for home page",
  meta_image: `${constants.host}/images/logo_square.jpg`,
};
export default function SEOHandler() {
  const [metaData, setMetaData] = useState(defaultData);
  useEffect(() => {
    Emitter.on("UPDATE_METADATA", (newMetaData) => setMetaData(newMetaData));
    return () => Emitter.off("UPDATE_METADATA");
  }, []);

  return (
    <Helmet>
      <title>{metaData.title}</title>
      <link rel="canonical" href={constants.host} />
      <meta name="title" content={metaData.meta_title} />
      <meta name="description" content={metaData.meta_description} />
      <meta name="og:title" content={metaData.meta_title} />
      <meta name="og:description" content={metaData.meta_description} />
      {metaData.meta_image && (
        <meta
          name="og:image"
          itemprop="image"
          content={`${constants.host}/images/${metaData.meta_image}`}
        />
      )}
    </Helmet>
  );
}
