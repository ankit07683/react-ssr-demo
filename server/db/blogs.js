const mockData = require("../db_mock_data/blogs.json");

module.exports.getAllBlogs = (limit) => {
  try {
    let allBlogs = [];
    if (mockData && mockData.length > 0) {
      allBlogs = [...mockData];
      if (limit && limit > 0) {
        allBlogs = allBlogs.splice(0, limit);
      }
    }
    return allBlogs;
  } catch (e) {
    console.log("Error occured while fetching blog list", e);
  }
};

module.exports.getBlogDetails = (slug) => {
  try {
    let blogDetails;
    if (slug && mockData && mockData.length > 0) {
      blogDetails = mockData.find((blog) => blog.url.trim() === slug.trim());
    }
    console.log("slug", slug);
    console.log("blogDetails", blogDetails);

    return blogDetails;
  } catch (e) {
    console.log("Error occured while fetching blog details", e);
  }
};
