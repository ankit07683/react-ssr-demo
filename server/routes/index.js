const blogs = require("./blogs");
const pages = require("./pages");
const siteSettings = require("./site_settings");

module.exports = (appInstance) => {
  blogs(appInstance);
  pages(appInstance);
  siteSettings(appInstance);
};
