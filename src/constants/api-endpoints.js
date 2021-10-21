let domain = "https://react-ssr-demo.herokuapp.com";
let host = "https://react-ssr-demo.herokuapp.com";
let api_version = "api/v1";
let PORT = 4300;

if (typeof window !== "undefined") {
  /**check if its a local server */
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    host = `http://localhost:${PORT}`;
    domain = `http://localhost:${PORT}`;
  }
}

export const constants = {
  domain,
  host,
  api_version,
  API: {
    HOME: "/pages/home",
    ABOUT_US: "/pages/about-us",
    BLOGS: "/pages/blogs",
    CONTACT_US: "/pages/contact-us",
    BLOGS_LIST: "/blogs",
    SOCIAL_LINKS: "/social-links",
  },
};
