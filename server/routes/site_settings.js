const { seoData } = require("../controllers");

module.exports = (routes) => {
  routes.get("/api/v1/social-links", seoData.getSocialData);
};
