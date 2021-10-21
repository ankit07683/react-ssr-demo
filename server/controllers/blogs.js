const Message = require("../constants/error-message");
const MessageCode = require("../constants/status-message");
const db = require("../db");
const { Response } = require("../utils");

module.exports.getAllBlogs = async (req, res) => {
  try {
    let { limit } = req.query;
    let blogsList = db.blogs.getAllBlogs(limit);
    return Response.commonResponse(
      res,
      MessageCode.SUCCESS,
      Message.SUCCESS,
      blogsList
    );
  } catch (e) {
    console.log('error occured in getAllBlogs',e);
    return Response.commonResponse(
      res,
      MessageCode.INTERNAL_ERROR,
      Message.INTERNAL_SERVER
    );
  }
};

module.exports.getBlogDetails = async (req, res) => {
  try {
    let { slug } = req.params;
    if (slug) {
      let blogData = db.blogs.getBlogDetails(slug);

      return Response.commonResponse(
        res,
        MessageCode.SUCCESS,
        Message.SUCCESS,
        blogData
      );
    }

    return Response.commonResponse(
      res,
      MessageCode.NOT_EXIST,
      Message.NOT_EXIST
    );
  } catch (e) {
    console.log('error occured in getBlogDetails',e);
    return Response.commonResponse(
      res,
      MessageCode.INTERNAL_ERROR,
      Message.INTERNAL_SERVER
    );
  }
};
