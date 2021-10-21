const { blogs } = require("../controllers");

module.exports = (blogsRoutes) => {
  blogsRoutes.get("/api/v1/blogs", blogs.getAllBlogs);
  blogsRoutes.get("/api/v1/blogs/:slug", blogs.getBlogDetails);
};
