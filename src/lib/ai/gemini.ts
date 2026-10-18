import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AIProvider,
  TutorContext,
  TaskContext,
  ExplainBackResult,
  QuizQuestion,
} from "./provider";
import { MockAIProvider } from "./mock";

export class GeminiAIProvider implements AIProvider {
  private genAI: GoogleGenerativeAI | null = null;
  private fallback: MockAIProvider;

  constructor(apiKey?: string) {
    this.fallback = new MockAIProvider();
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (key) {
      try {
        this.genAI = new GoogleGenerativeAI(key);
      } catch (err) {
        console.warn("Failed to initialize GoogleGenerativeAI, using mock fallback:", err);
      }
    }
  }

  async getTutorResponse(
    question: string,
    context: TutorContext,
    hintLevel?: number
  ): Promise<string> {
    if (!this.genAI) return this.fallback.getTutorResponse(question, context, hintLevel);

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are "Mentor", an expert, encouraging programming tutor.
Your core teaching philosophy is Socratic: teach the learner how to think and guide them toward understanding rather than immediately handing out complete copy-paste solutions.

Current Task: "${context.taskTitle}"
Task Overview: "${context.taskDescription}"
Concepts being practiced: ${context.concepts.join(", ")}
Learner's current code:
\`\`\`
${context.currentCode}
\`\`\`
Current hint level unlocked: ${hintLevel ?? 0} (1=question, 2=nudge, 3=skeleton, 4=example)

Learner says: "${question}"

Respond in friendly, concise markdown. If they ask for direct code answers, nudge them with guiding questions or small conceptual analogies first according to their hint level.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return text || this.fallback.getTutorResponse(question, context, hintLevel);
    } catch (err) {
      console.warn("Gemini tutor error, using mock fallback:", err);
      return this.fallback.getTutorResponse(question, context, hintLevel);
    }
  }

  async evaluateExplainBack(
    response: string,
    question: string,
    taskId: string
  ): Promise<ExplainBackResult> {
    if (!this.genAI) return this.fallback.evaluateExplainBack(response, question, taskId);

    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `Evaluate this student's explanation for task "${taskId}".
Prompt Question: "${question}"
Student Response: "${response}"

Evaluate their conceptual understanding of React state, immutability, and rendering.
Return a valid JSON object matching this structure:
{
  "score": number between 0 and 100,
  "feedback": "string summarizing evaluation",
  "strengths": ["array", "of", "positives"],
  "areasToImprove": ["array", "of", "improvement points"]
}`;

      const res = await model.generateContent(prompt);
      const json = JSON.parse(res.response.text()) as ExplainBackResult;
      return {
        score: json.score || 75,
        feedback: json.feedback || "Good conceptual reasoning.",
        strengths: json.strengths || ["Understood core flow"],
        areasToImprove: json.areasToImprove || [],
      };
    } catch (err) {
      console.warn("Gemini evaluation error, using mock fallback:", err);
      return this.fallback.evaluateExplainBack(response, question, taskId);
    }
  }

  async generateQuiz(code: string, concepts: string[]): Promise<QuizQuestion[]> {
    if (!this.genAI) return this.fallback.generateQuiz(code, concepts);

    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });

      const prompt = `Generate 3 multiple-choice quiz questions based on the following concepts: ${concepts.join(
        ", "
      )} and code:
\`\`\`
${code}
\`\`\`

Return a JSON array of questions matching this schema:
[
  {
    "id": "q1",
    "type": "multiple-choice",
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0, // 0-based index
    "explanation": "string explaining why the answer is correct",
    "concept": "relevant concept name"
  }
]`;

      const res = await model.generateContent(prompt);
      const questions = JSON.parse(res.response.text()) as QuizQuestion[];
      return questions.length > 0 ? questions : this.fallback.generateQuiz(code, concepts);
    } catch (err) {
      console.warn("Gemini quiz generation error, using mock fallback:", err);
      return this.fallback.generateQuiz(code, concepts);
    }
  }

  async getPredictionFeedback(prediction: string, actual: string, code?: string): Promise<string> {
    if (!this.genAI) return this.fallback.getPredictionFeedback(prediction, actual, code);

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `A student made this prediction about code execution:
Student predicted: "${prediction}"
Actual runtime outcome: "${actual}"
${code ? `Code snippet: \n${code}` : ""}

Give concise (1-2 sentences) encouraging feedback explaining why the actual behavior occurred.`;

      const res = await model.generateContent(prompt);
      return res.response.text();
    } catch (err) {
      return this.fallback.getPredictionFeedback(prediction, actual, code);
    }
  }

  async getHintContent(level: number, task: TaskContext): Promise<string> {
    if (!this.genAI) return this.fallback.getHintContent(level, task);

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a hint at Level ${level} (1-4) for this task:
Task: "${task.taskTitle}" - ${task.taskDescription}
Concepts: ${task.concepts.join(", ")}
Current Code:
\`\`\`
${task.currentCode}
\`\`\`

Strict rules for hint level:
Level 1: Only a guiding question, no code.
Level 2: A conceptual nudge explaining the mechanism, no direct solution.
Level 3: A code skeleton with TODO comments outlining the structure.
Level 4: A focused code snippet example illustrating the exact syntax.`;

      const res = await model.generateContent(prompt);
      return res.response.text();
    } catch (err) {
      return this.fallback.getHintContent(level, task);
    }
  }
}
