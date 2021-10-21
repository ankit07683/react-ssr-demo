const cron = require("node-cron");
const { createSitemap } = require("../../modules/dynamic-xml");

module.exports = (async function () {
  /**
   * CRON to generate XML at a fixes frequency
   * Here we have set it to 11:45 PM everyday
   * https://crontab.guru/
   */
  cron.schedule("45 23 * * *", async () => {
    try {
      createSitemap();
    } catch (e) {
      console.log("Cron job failed for creating sitemap", e);
    }
  });
})();
