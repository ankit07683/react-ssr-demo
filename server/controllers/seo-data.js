const db = require("../db");
const config = require("../config");
const Message = require("../constants/error-message");
const MessageCode = require("../constants/status-message");
const { Response } = require("../utils");
const allRoutes = require("../../src/Router/routes.json");
const socialData = require("../db_mock_data/site_settings.json");

const getSEOForSlug = async (location) => {
  let metaData = {
    title: "HOME | Native SSR by Ankit Jain",
    seoTitle: `React SSR By Ankit jain`,
    seoDescription: `React SSR By Ankit jain default meta description`,
    image: `${config.HOST_URL}/images/logo_square.jpg`,
    schema: [],
  };
  let defaultData = db.pages.getDataForPage("home");

  if (defaultData) {
    metaData.title = defaultData.title
      ? defaultData.title
      : defaultData.meta_title;
    metaData.seoTitle = defaultData.meta_title;
    metaData.seoDescription = defaultData.meta_description;
    metaData.image = defaultData.meta_image
      ? `${config.HOST_URL}/images/${defaultData.meta_image}`
      : null;
  }

  let slug = null;
  let seoData = null;
  let detailsPage = false;
  let locationArr = location.split("/");
  locationArr = locationArr.filter((v) => v && v !== "");

  if (
    locationArr.length === 2 &&
    [allRoutes.BLOGS].includes(`/${locationArr[0]}`)
  ) {
    if (`/${locationArr[0]}` === allRoutes.BLOGS) {
      slug = locationArr[1];
      detailsPage = true;
    }
    // console.log(detailsPage, 'details page requested, slug is', slug);
  }

  if (detailsPage) {
    seoData = db.blogs.getBlogDetails(slug.trim());

    if (seoData) {
      metaData.title = seoData.title ? seoData.title : seoData.meta_title;
      metaData.seoTitle = seoData.meta_title;
      metaData.seoDescription = seoData.meta_description;
      if (seoData.image) {
        metaData.image = `${config.HOST_URL}/blog-images/${seoData.image}`;
      }
      /**
       * Schema for Blog Details Page
       */
      metaData.schema = [
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${config.HOST_URL}${allRoutes.BLOGS}/${slug}`,
          },
          headline: `${seoData.title}`,
          image: {
            "@type": "ImageObject",
            url: `${config.HOST_URL}/blog-images/${seoData.image}`,
            height: 400,
            width: 600,
          },
          datePublished: `${seoData.createdAt}`,
          dateModified: `${seoData.updatedAt}`,
          author: {
            "@type": "Person",
            name: `${seoData.author}`,
          },
          publisher: {
            "@type": "Organization",
            name: `${socialData.site_name}`,
            logo: {
              "@type": "ImageObject",
              url: `${config.HOST_URL}/images/logo_square.jpg`,
              width: 300,
              height: 170,
            },
          },
          description: `${seoData.metaDescription}`,
          articleBody: `${seoData.body}`,
        },
      ];
    }
  } else if (
    Object.values(allRoutes).includes(location) ||
    Object.values(allRoutes).includes(`/${location}`)
  ) {
    if (location === "/") {
      location = "home";
    }
    location = location.replace("/", "");

    seoData = db.pages.getDataForPage(location.trim());

    if (seoData) {
      metaData.title = seoData.title ? seoData.title : seoData.meta_title;
      metaData.seoTitle = seoData.meta_title;
      metaData.seoDescription = seoData.meta_description;
      metaData.image = seoData.meta_image
        ? `${config.HOST_URL}/images/${seoData.meta_image}`
        : null;
    }

    if (location === "/") {
      let host = config.HOST_URL;
      metaData.schema = [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: socialData.site_name ? socialData.site_name : "Native SSR",
          url: host,
          logo: `${host}/images/logo_square.jpg`,
          sameAs: [
            socialData.SOCIAL.facebook,
            socialData.SOCIAL.twitter,
            socialData.SOCIAL.linkedin,
            host,
          ],
        },
        {
          "@context": "https://schema.org/",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "ABOUT US",
              item: `${host}${allRoutes.ABOUT_US}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "BLOGS",
              item: `${host}${allRoutes.BLOGS}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "CONTACT US",
              item: `${host}${allRoutes.CONTACT_US}`,
            },
          ],
        },
      ];
    }
  }
  // console.log('metaData', metaData);
  return metaData;
};

module.exports.fetchSEOForSlug = getSEOForSlug;

module.exports.getSocialData = (req, res) => {
  try {
    let siteData = db.siteSettings.fetchSiteSettings();
    return Response.commonResponse(
      res,
      MessageCode.SUCCESS,
      Message.SUCCESS,
      siteData
    );
  } catch (e) {
    console.log("error occured in getSocialData", e);
    return Response.commonResponse(
      res,
      MessageCode.INTERNAL_ERROR,
      Message.INTERNAL_SERVER
    );
  }
};
