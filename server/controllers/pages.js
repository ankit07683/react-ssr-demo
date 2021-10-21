const Message = require("../constants/error-message");
const MessageCode = require("../constants/status-message");
const db = require("../db");
const { Response } = require("../utils");

module.exports.getPageData = (req, res) => {
  try {
    let { pageSlug } = req.params;

    if (pageSlug) {
      let pageData = db.pages.getDataForPage(pageSlug);
      return Response.commonResponse(
        res,
        MessageCode.SUCCESS,
        Message.SUCCESS,
        pageData
      );
    }

    return Response.commonResponse(
      res,
      MessageCode.NOT_EXIST,
      Message.NOT_EXIST
    );
  } catch (e) {
    console.log('error occured in getPageData',e);
    return Response.commonResponse(
      res,
      MessageCode.INTERNAL_ERROR,
      Message.INTERNAL_SERVER
    );
  }
};
