

import groq from "../config/groq.js";
export async function generateCVFromShortDetails(req,res) {
    let shortDetails=req.body.shortDetails
    console.log(shortDetails)
const prompt = `
You are a CV generator AI.

The user will provide short or incomplete details.
Generate a COMPLETE CV in VALID JSON ONLY.

TITLE RULES (MANDATORY):
- Extract the professional title from the user's text.
- Phrases like "i am", "working as", "role", "developer", "engineer" MUST be converted into a proper title.
- Capitalize and normalize the title.
- Example: "i am full stack developer" → "Full Stack Developer"
- The "title" field MUST NOT be empty.

ABSOLUTE RULES:
- Output ONLY valid JSON.
- No markdown.
- No explanations.
- Follow the schema EXACTLY.
- Do NOT invent new fields or section types.
- Do NOT add sections unless explicitly allowed.

SUMMARY RULES (IMPORTANT):
- If the user provides a summary or profile text, USE IT AS-IS in CVSummary.
- Do NOT rewrite, shorten, or paraphrase user-provided summary.
- If the user does NOT provide a summary, generate one.
- Generated CVSummary MUST be detailed, professional, and 4–6 lines long.

CONTENT RULES:
- Language must sound human, professional, and realistic.
- No buzzword stuffing.
- No fake companies, institutions, or links.

INSTITUTION PARSING RULE (STRICT):
- Institution name must ONLY include the official organization name.
- Any city, state, or geographic words MUST be placed in the "location" field.
- Words that look like places (cities, districts, states) must NEVER be appended to institution names.
- Example:
  "MAKAUT collage Haldia" →
    institution: "MAKAUT collage"
    location: "Haldia"

    EXPERIENCE STRUCTURE RULE:
- CVExperience MUST use an "experienceList" array.
- Each job entry must be inside the array.
- Even if only one job exists, it MUST still be wrapped in an array.
- Never output a single object directly.

SCHEMA (STRICT):

{
  content: [
    {
      type: "CVHeader",
      props: {
        id: "header",
        name: string,
        title: string,
        email: string,
        phone: string,
        location: string,
        imageUrl: string
      }
    },
    {
      type: "CVSummary",
      props: {
        id: "summary",
        summary: string
      }
    },
    {
  "type": "CVExperience",
  "props": {
    "id": "experience",
    "experienceList": [
      {
        "position": "string",
        "company": "string",
        "location": "string",
        "startDate": "string",
        "endDate": "string",
        "responsibilities": "string"
      }
    ]
  }
},
    {
      type: "CVEducation",
      props: {
        id: string,
        degree: string,
        institution: string,
        location: string,
        startDate: string,
        endDate: string,
        description: string
      }
    },
    {
      type: "CVSkills",
      props: {
        id: "skills",
        skills: string
      }
    },
    {
      type: "CVProjects",
      props: {
        id: "projects",
        columns: number,
        items: [
          {
            title: string,
            website: string,
            github: string
          }
        ]
      }
    }
  ],
  root: { props: { title: "My CV" } }
}

LOGIC RULES:
- Include CVExperience ONLY if work experience is mentioned.
- Include CVEducation ONLY if education is mentioned.
- Include CVProjects ONLY if the user mentions projects, apps, GitHub, or websites.
- If CVProjects is included, at least ONE project item is required.
- Do NOT hallucinate URLs or GitHub links.

User details:
${shortDetails}
`;




  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You generate structured CV JSON only." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });

  const result = completion.choices[0].message.content;
   // 🔒 HARDENED PARSER
    const cleaned = result
      .replace(/```json\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.json(parsed);
  // return    res.json(JSON.parse(result)); // important: crash if invalid JSON
}

