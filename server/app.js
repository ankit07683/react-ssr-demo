const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const config = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const { throwNotFoundError } = require("./errors");
const { PORT } = config;
const routes = require("./routes");
const dynamicXML = require("./modules/dynamic-xml");
const reactRenderer = require("./react-renderer");
const allRoutes = require("../src/Router/routes.json");
const clientRoutes = Object.values(allRoutes);

app.use(bodyParser.urlencoded({ limit: "500mb", extended: false }));

/**
 * Endpoint to create sitemap manually
 */
app.get("/api/v1/create-sitemap", async function (req, res) {
  let response = await dynamicXML.createSitemap();
  return res.send({ status: 200, message: response });
});

/* Cors */
app.use(cors());
routes(app);

app.get("/*", reactRenderer.render(clientRoutes));

/**
 * Since this is the last non-error-handling
 * middleware use()d, we assume 404, as nothing else
 * responded.
 */
app.use(reactRenderer.render(clientRoutes));

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "../build")));

// catch 404 and forward to error handler
app.use((request, response) => {
  return throwNotFoundError(response, "PAGE NOT FOUND");
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

http.listen(PORT, function () {
  console.log(`server is listening on ${PORT}`);
});
