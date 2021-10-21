const mockData = require("../db_mock_data/site_settings.json");

module.exports.fetchSiteSettings = () => {
  try {
    return mockData;
  } catch (e) {
    console.log("Error occured in fetchSiteSettings", e);
  }
};
