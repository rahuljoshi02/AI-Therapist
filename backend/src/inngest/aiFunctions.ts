import { inngest } from "./index";
import { GoogleGenAI } from "@google/genai";
import { logger } from "../utils/logger";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyCSZfN2lw0abQ9xiqq0toYDQ0p4G4A_g24y"
});

export const processChatMessage = inngest.createFunction(
    {
        id: "process-chat-message",
    },
    { event: "therapy/session.message" },
    async ({event, step}) => {
        try {
            const {
                message,
                history,
                memory = {
                    userProfile: {
                    emotionalState: [],
                    riskLevel: 0,
                    preferences: {},
                },
                    sessionContext: {
                        conversationTheme: [],
                        currentTechnique: [],
                    },
                },
                goals = [],
                systemPrompt,
            } = event.data;
            
            logger.info("Processing chat message:", {
                message,
                historyLength: history?.length,
            });

            const analysis = await step.run("analyze-message", async() => {
                try {
                    const prompt = `Analyze this therapy message and provide insights. Return ONLY a valid JSON object with no markdown formatting or additional text.
                        Message: ${message}
                        Context: ${JSON.stringify({ memory, goals })}
                        
                        Required JSON structure:
                        {
                            "emotionalState": "string",
                            "themes": ["string"],
                            "riskLevel": number,
                            "recommendedApproach": "string",
                            "progressIndicators": ["string"]
                        }`;
                    
                        const response = await genAI.models.generateContent({
                            model: "gemini-2.0-flash",
                            contents: "Explain how AI works in a few words",
                        });

                        const text = response.text;
                        logger.info("Received analysis from Gemini:", { text });

                        const cleanText = text?.replace(/```json\n|\n```/g, "").trim();
                        const parsedAnalysis = JSON.parse(cleanText || "{}|")
                        logger.info("Successfully parsed analysis:", parsedAnalysis);
                        return parsedAnalysis;
                } catch (error) {
                    logger.error("Error in message analysis:", { error, message });

                    return {
                        emotionalState: "neutral",
                        themes: [],
                        riskLevel: 0,
                        recommendedApproach: "supportive",
                        progressIndicators: [],
                    };
                }
            });

            const updatedMemory = await step.run("update-memory", async () => {
                if (analysis.emotionalState) {
                    memory.userProfile.emotionalState.push(analysis.emotionalState);
                }

                if (analysis.themes) {
                    memory.sessionContext.conversationThemes.push(...analysis.themes);
                }

                if (analysis.riskLevel) {
                    memory.userProfile.riskLevel = analysis.riskLevel;
                }
                return memory;
            });

            if (analysis.riskLevel > 4) {
                await step.run("trigger-risk-alert", async () => {
                    logger.warn("High risk level detected in chat message", {
                        message,
                        riskLevel: analysis.riskLevel,
                    });
                });
            }
        } catch (error) {}
    }
);