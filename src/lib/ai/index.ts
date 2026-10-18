import { AIProvider } from "./provider";
import { GeminiAIProvider } from "./gemini";
import { MockAIProvider } from "./mock";

let providerInstance: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (!providerInstance) {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "") {
      providerInstance = new GeminiAIProvider(process.env.GEMINI_API_KEY);
    } else {
      providerInstance = new MockAIProvider();
    }
  }
  return providerInstance;
}

export * from "./provider";
