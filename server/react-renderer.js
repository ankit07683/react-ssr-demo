const matchPath = require("react-router").matchPath;
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const allRoutes = require("../src/Router/routes.json");
const fetchSEOForSlug = require("./controllers/seo-data").fetchSEOForSlug;

/**
 * Import our main App component
 * Remember it's exported as ES6 module, so to require it, you must call .default
 */
exports = module.exports;

async function renderFullPage(location, template) {
  let seoData = await fetchSEOForSlug(location.trim());

  // return htmlString;
  const $ = cheerio.load(`${template}`);
  $("head").prepend(`<meta charset="UTF-8">`);
  $("head").prepend(`<title>${seoData.title}</title>`);
  $("head").prepend(`<meta name="title" content="${seoData.seoTitle}">`);
  $("head").prepend(
    `<meta name="description" content="${seoData.seoDescription}">`
  );
  $("head").prepend(`<meta name="og:title" content="${seoData.seoTitle}">`);
  $("head").prepend(
    `<meta name="og:description" content="${seoData.seoDescription}">`
  );
  $("head").prepend(
    `<meta name="og:image" itemprop="image" content="${seoData.image}">`
  );

  if (seoData.schema && seoData.schema.length) {
    seoData.schema.forEach((element) => {
      $("head").append(
        `<script type="application/ld+json">${JSON.stringify(
          seoData.schema
        )}</script>`
      );
    });
  }

  let finalHTML = $.html();
  // console.log('finalHTML', finalHTML)
  return finalHTML;
}

exports.render = (routes) => {
  return (req, res, next) => {
    /**
     * Take routes collection and see if it's a valid app's route
     */
    let detailsPage = false;
    let locationArr = req.path.split("/");
    locationArr = locationArr.filter((v) => v && v !== "");
    if (
      locationArr.length === 2 &&
      [allRoutes.BLOGS].includes(`/${locationArr[0]}`)
    ) {
      detailsPage = true;
    }

    var match = routes.find((route) => {
      let isMatchPath = matchPath(req.path, {
        path: route,
        exact: true,
      });
      return isMatchPath;
    });

    if (match || detailsPage) {
      /**
       * Point to the html file created by CRA's build tool and open it
       */
      const filePath = path.resolve(__dirname, "..", "build", "index.html");

      fs.readFile(filePath, "utf8", async (err, htmlData) => {
        if (err) {
          console.error("err", err);
          return res.status(404).end(); // WARNING: This 404 will be handled by Express server and won't be your React 404 component.
        }

        const location = req.url;

        // Send the rendered page back to the client.
        const responseString = await renderFullPage(location, htmlData);

        // console.log('responseString', responseString)
        res.send(responseString);
      });
    } else {
      return next();
    }
  };
};
