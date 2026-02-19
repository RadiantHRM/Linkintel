
import { GoogleGenAI, Type } from "@google/genai";
import { ProfileAnalysis } from "./types";

const MODEL_NAME = "gemini-3-flash-preview";

export const analyzeLinkedInProfile = async (profileUrl: string): Promise<ProfileAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const prompt = `
    Analyze the following LinkedIn profile URL and extract professional intelligence:
    URL: ${profileUrl}

    Please act as a Senior Executive Recruiter and Talent Analyst. If the direct profile content is restricted, use available public search data to estimate the following details with high accuracy:
    - Name
    - Industry
    - Seniority level (e.g., C-Suite, VP, Director, Senior Individual Contributor)
    - Total Years of experience (estimated)
    - Career trajectory (A brief summary of their professional growth)
    - Leadership scope (Team size, budget responsibility, or strategic impact)
    - Likely compensation tier in their current country (e.g., $150k - $200k USD)
    - Transition likelihood score (0-100, where 100 is "extremely likely to be looking for a new role" based on tenure and patterns)
    - Key professional strengths
    - A summary of their most recent role

    You MUST return the data as a clean JSON object following this exact schema:
    {
      "name": "string",
      "industry": "string",
      "seniorityLevel": "string",
      "yearsExperience": number,
      "careerTrajectory": "string",
      "leadershipScope": "string",
      "likelyCompensationTier": "string",
      "transitionLikelihood": number,
      "keyStrengths": ["string"],
      "recentRoleSummary": "string",
      "country": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response received from the intelligence engine.");
    }

    const jsonResult = JSON.parse(resultText);
    
    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return {
      ...jsonResult,
      sources: sources
    } as ProfileAnalysis;
  } catch (error) {
    console.error("Analysis error:", error);
    throw new Error("Failed to analyze profile. The profile might be private or the URL invalid.");
  }
};
