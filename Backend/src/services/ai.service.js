const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidates profile matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "the technical questions that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe("The intention of interview behind asking this question"),
        answer: z
          .string()
          .describe(
            "how to answer this question what points to cover and what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and hwo to answer them",
    ),
  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "the behavioural questions that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe("The intention of interview behind asking this question"),
        answer: z
          .string()
          .describe(
            "how to answer this question what points to cover and what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioural questions that can be asked in the interview along with their intention and hwo to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("the skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe(
      "List of skill gaps int he candidates profile along with their severity level",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan,starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan e.g. data structures,system design",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List the tasks to be done on this day to follow the preparation plan",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate a complete interview report in JSON format.

The response MUST include ALL of the following fields:
- matchScore
- technicalQuestions
- behaviouralQuestions
- skillGaps
- preparationPlan

The preparationPlan should contain a detailed 14-day plan.
Each day must include:
- day
- focus
- tasks (at least 3 tasks)

Candidate Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}

module.exports = generateInterviewReport;
