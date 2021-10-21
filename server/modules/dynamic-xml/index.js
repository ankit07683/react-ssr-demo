const db = require("../../db");
var sitemap = require("express-sitemap");
const moment = require("moment");
const path = require("path");
const allRoutes = require("../../../src/Router/routes.json");

async function createSitemap() {
  try {
    var siteMapRoutes = [
      {
        route: "",
        lastmod: moment().format("YYYY-MM-DD"),
      },
    ];

    // appending all front end pages to mapping
    Object.keys(allRoutes).forEach((routeName) => {
      if (!["/", "*"].includes(allRoutes[routeName])) {
        siteMapRoutes.push({
          route: allRoutes[routeName],
          lastmod: moment().format("YYYY-MM-DD"),
        });
      }
    });

    // fetching all blogs and adding them to sitemap listing
    let allBlogs = await db.blogs.getAllBlogs();

    allBlogs.forEach((blog) => {
      siteMapRoutes.push({
        route: `${allRoutes.BLOGS}/${blog.url}`,
        lastmod: moment(blog.updatedAt).format("YYYY-MM-DD"),
      });
    });

    const routesMap = siteMapRoutes.reduce(
      (acc, cur) => ({ ...acc, [cur.route]: ["get"] }),
      {}
    );

    /**
     * routes to add in sitemap.xml file,
     */
    let publicURL = siteMapRoutes.filter((url) => {
      /** Add Condition to filter out private url here */
      return true;
    });

    /**
     * routes to hide from XML File,
     * These routes will be added to robot.txt
     */
    let privateRoutes = [];

    const routesOptions = publicURL.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.route]: {
          lastmod: cur.lastmod,
          priority: cur.route === "" ? 1.0 : 0.09,
          changefreq: "daily",
        },
      }),
      {}
    );

    privateRoutes.forEach((url) => {
      routesOptions[url.route] = { disallow: true };
    });

    const HOST_URL = new URL("http://localhost:3000");
    const protocol = HOST_URL.protocol
      ? HOST_URL.protocol.replace(":", "")
      : "https";
    const href = HOST_URL.hostname;

    sitemap({
      http: protocol,
      url: href,
      sitemap: path.join(__dirname, "/../../public/sitemap.xml"), // path for .XMLtoFile
      robots: path.join(__dirname, "/../../public/robots.txt"), // path for .TXTtoFile
      map: routesMap,
      route: routesOptions,
    }).toFile();
    // XMLtoFile

    return "Sitemap created successfully";
  } catch (e) {
    console.log(e);
    return "unable to create sitemap";
  }
}

module.exports = {
  createSitemap,
};
