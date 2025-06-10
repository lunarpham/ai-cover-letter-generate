import { GoogleGenAI } from "@google/genai";
import { Constants } from "@/lib/constants";
import type { FormDataType } from "@/lib/types/inputTypes";
import { formatHeaderDate } from "@/lib/utils";

class GeminiClient {
  private client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateCoverLetter(
    formData: FormDataType,
    onTextChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const formattedUserData = `
APPLICANT INFO:
- Name: ${formData.contents.basicInfo.name}
- Email: ${formData.contents.basicInfo.email}
- Phone: ${formData.contents.basicInfo.phone}
- Gender: ${formData.contents.basicInfo.gender}
- Birthday: ${formData.contents.basicInfo.birthday}

JOB APPLICATION:
- Company: ${formData.contents.jobApplication.companyName}
- Position: ${formData.contents.jobApplication.position}
- How I found this job: ${formData.contents.jobApplication.sourceOfInfoAboutJob}

PRIMARY MOTIVATION (Important to emphasize in the letter):
${formData.contents.jobApplication.motivation}

WORK EXPERIENCE:
${formData.contents.workExperience
  .map(
    (exp, index) => `
Experience #${index + 1}:
- Company: ${exp.companyName}
- Position: ${exp.position}
- Duration: ${exp.startTime} - ${exp.endTime}
- Description: ${exp.description}
`
  )
  .join("")}
`;

      const formattingInstructions = `
Create a cover letter using this applicant information:
${formattedUserData}

The cover letter should include:
1. Format the header in this exact order:
   [Applicant Name]
   [Email]
   [Phone]

  ${formatHeaderDate()}

2. Start body with a formal greeting like "Dear Hiring Manager" 
3. Write a professional cover letter based on the provided information
4. IMPORTANT: Dedicate a specific paragraph to the applicant's motivation. This should explain:
   - Why they are specifically interested in this company/position
   - How their personal values or career goals align with the position
   - What excites them about the opportunity
5. Connect the motivation to relevant work experience to show qualifications
6. DO NOT use placeholder text or mention this is an example
7. Use the ${formData.contents.preferredTone} tone throughout
8. End with a formal closing like "Sincerely" or "Best regards"
9. Ensure the letter is concise and to the point, ideally one page long
10. Show the result only in the response, without any additional text or instructions
11. Use proper grammar and spelling, no typos or errors
`;
      const newChat = this.client.chats.create({
        model: formData.model,
        config: {
          temperature: 0.5,
          maxOutputTokens: 1024,
        },
      });

      const result = await newChat.sendMessage({
        message: `${formattingInstructions}`,
      });
      const response = result.text;
      if (response) {
        onTextChunk(response);
      } else {
        throw new Error("No response received from Gemini API");
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      throw error;
    }
  }
}

const geminiClient = new GeminiClient(Constants.GEMINI_API_KEY);
export default geminiClient;
