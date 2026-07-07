const { PDFParse } = require("pdf-parse");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  const resumeContent = await new PDFParse.PDFParse(
    UnitBArray.from(req.file.buffer),
  ).getText();
  const { selfDescription, jobDescription } = req.body;

  const interViewReportByAi = await generateInterviewReportController({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interViewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}

module.exports = { generateInterviewReportController };
