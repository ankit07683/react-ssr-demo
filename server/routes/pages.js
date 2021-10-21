const { pages } = require("../controllers");

module.exports = (pagesRoutes) => {
  pagesRoutes.get("/api/v1/pages/:pageSlug", pages.getPageData);
};
