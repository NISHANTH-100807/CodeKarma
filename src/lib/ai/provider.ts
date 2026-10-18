export interface TutorContext {
  taskTitle: string;
  taskDescription: string;
  currentCode: string;
  concepts: string[];
  hintLevel?: number;
  recentMessages?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface TaskContext {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  currentCode: string;
  solutionCode?: string;
  concepts: string[];
}

export interface ExplainBackResult {
  score: number;
  feedback: string;
  strengths: string[];
  areasToImprove: string[];
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "short-answer";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  concept: string;
}

export interface AIProvider {
  getTutorResponse(question: string, context: TutorContext, hintLevel?: number): Promise<string>;
  evaluateExplainBack(response: string, question: string, taskId: string): Promise<ExplainBackResult>;
  generateQuiz(code: string, concepts: string[]): Promise<QuizQuestion[]>;
  getPredictionFeedback(prediction: string, actual: string, code?: string): Promise<string>;
  getHintContent(level: number, task: TaskContext): Promise<string>;
}
