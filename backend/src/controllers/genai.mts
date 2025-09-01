import { GoogleGenAI, GoogleGenAIOptions } from "@google/genai";

let genAI: GoogleGenAI | null = null;

export async function getGenAI(): Promise<GoogleGenAI> {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

    genAI = new GoogleGenAI({ apiKey } as GoogleGenAIOptions);
  }
  return genAI;
}
