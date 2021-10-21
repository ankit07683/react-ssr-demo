const mockData = require("../db_mock_data/pages.json");

module.exports.getDataForPage = (pageSlug) => {
  try {
    let pageData;
    if (pageSlug && mockData && mockData.length > 0) {
      pageData = mockData.find((page) => page.slug.trim() === pageSlug.trim());
    }
    return pageData;
  } catch (e) {
    console.log("Error occured in getDataForPage", e);
  }
};
