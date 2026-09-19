const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  title: z.string(),

  matchScore: z.number().min(0).max(100),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
});

const interviewReportResponseSchema = {
  type: Type.OBJECT,

  properties: {
    title: {
      type: Type.STRING,
    },

    matchScore: {
      type: Type.NUMBER,
    },

    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
          },
          intention: {
            type: Type.STRING,
          },
          answer: {
            type: Type.STRING,
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
          },
          intention: {
            type: Type.STRING,
          },
          answer: {
            type: Type.STRING,
          },
        },
        required: ["question", "intention", "answer"],
      },
    },

    skillGaps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: {
            type: Type.STRING,
          },
          severity: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
          },
        },
        required: ["skill", "severity"],
      },
    },

    preparationPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.NUMBER,
          },
          focus: {
            type: Type.STRING,
          },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },

  required: [
    "title",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an AI interview preparation assistant.

Generate an interview preparation report by comparing the candidate's resume
and self-description with the given job description.

The output MUST follow the provided JSON schema exactly.

The report must contain ONLY these fields:

1. title
The exact job title extracted from the job description.

2. matchScore
A number between 0 and 100 representing how closely the candidate's
skills, education, experience, and projects match the job requirements.

3. technicalQuestions
Generate relevant technical interview questions based on:
- the candidate's skills
- the candidate's projects
- the candidate's resume
- the requirements in the job description.

Each technical question must contain:
- question
- intention
- answer

4. behavioralQuestions
Generate relevant behavioral interview questions based on the candidate's
experience, projects, internship, and job requirements.

Each behavioral question must contain:
- question
- intention
- answer

5. skillGaps
Identify important skills mentioned in the job description that the
candidate does not demonstrate strongly in the resume.

Each skill gap must contain:
- skill
- severity

Severity must be one of:
- low
- medium
- high

6. preparationPlan
Create a day-wise interview preparation plan.

Each item must contain:
- day
- focus
- tasks

IMPORTANT:
- Do NOT return candidate_name.
- Do NOT return contact_information.
- Do NOT return company.
- Do NOT return evaluation_summary.
- Do NOT return recommendation.
- Do NOT return strengths.
- Do NOT return weaknesses.
- Do NOT return cultural_fit.
- Do NOT return any fields other than the fields defined in the schema.
- Do NOT evaluate whether the candidate should be hired.
- Do NOT generate a hiring recommendation.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

IMPORTANT OUTPUT FORMAT:

technicalQuestions MUST be an array of objects.

Example:
[
  {
    "question": "What is the difference between state and props in React?",
    "intention": "To test understanding of React fundamentals.",
    "answer": "Props are values passed from a parent component, while state is managed by the component itself."
  }
]

Do NOT return:
["question", "intention", "answer"]

behavioralQuestions MUST also be an array of objects.

Example:
[
  {
    "question": "Tell me about a challenging project you worked on.",
    "intention": "To evaluate problem-solving ability.",
    "answer": "Explain the situation, your role, the challenge, your actions, and the result."
  }
]

skillGaps MUST be an array of objects.

Example:
[
  {
    "skill": "System Design",
    "severity": "medium"
  }
]

preparationPlan MUST be an array of objects.

Example:
[
  {
    "day": 1,
    "focus": "JavaScript",
    "tasks": [
      "Revise closures",
      "Revise promises",
      "Practice JavaScript interview questions"
    ]
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportResponseSchema,
    },
  });

  const rawText = response.text;

  // console.log("AI RESPONSE LENGTH:", rawText.length);

  try {
    const parsedResponse = JSON.parse(rawText);

    const validatedResponse = interviewReportSchema.parse(parsedResponse);

    return validatedResponse;
  } catch (error) {
    console.error("AI RESPONSE IS INVALID:");
    console.error(error.message);

    console.log("Last 2000 characters:");
    console.log(rawText.slice(-2000));

    throw new Error("AI generated invalid interview report JSON");
  }
}

async function generatePdfFromHtml(htmlContent) {
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
