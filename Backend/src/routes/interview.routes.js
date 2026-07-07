const express = require("express");
const authUser = require("../middlewares/auth.middleware");
const generateInterviewReport = require("../services/ai.service");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on he basis of user self descrption,resume pdf and job description
 * @access private
 */

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterviewReport,
);

module.exports = interviewRouter;
