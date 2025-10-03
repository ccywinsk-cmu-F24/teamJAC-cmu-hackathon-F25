import { NextRequest, NextResponse } from "next/server";
import { getSurveyService } from "@/backend/lib/dependency-injection";
import { z } from "zod";

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434/api/generate";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama2";
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;

const requestSchema = z.object({
  userId: z.string().uuid(),
  userQuestion: z.string().min(1).max(1000),
});

interface SurveyAnswer {
  questionId: string;
  answer: string | string[] | Record<string, unknown>;
}

interface SurveyData {
  answers: SurveyAnswer[];
}

function formatSurveyContext(surveyData: SurveyData | null): string {
  if (!surveyData || !surveyData.answers || surveyData.answers.length === 0) {
    return "No survey information available.";
  }

  const contextParts: string[] = [];

  surveyData.answers.forEach((item: SurveyAnswer) => {
    const questionId = item.questionId;
    const answer = item.answer;

    // Map question IDs to readable labels
    const questionMap: Record<string, string> = {
      age: "Age",
      income: "Income Level",
      risk: "Risk Tolerance",
      goals: "Financial Goals",
      savings: "Savings Amount",
      debt: "Debt Status",
      experience: "Investing Experience",
      timeline: "Investment Timeline",
    };

    const label = questionMap[questionId] || questionId;
    const value = typeof answer === "object" ? JSON.stringify(answer) : answer;
    contextParts.push(`${label}: ${value}`);
  });

  return contextParts.join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = requestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validation.error.issues },
        { status: 400 }
      );
    }

    const { userId, userQuestion } = validation.data;

    // Fetch survey context
    const surveyService = getSurveyService();
    const surveyData = await surveyService.getSurveyAnswers(userId);
    const surveyContext = formatSurveyContext(surveyData);

    // Build system prompt
    const systemPrompt = `You are a friendly, encouraging dog financial advisor named Buddy. You provide warm, actionable financial advice in a conversational tone. Keep your responses between 200-300 words and make them practical and easy to understand.

Here is the user's financial profile from their survey:
${surveyContext}

Based on this information, provide personalized advice that's relevant to their situation. If they ask something outside your expertise, gently redirect them to consider consulting a certified financial professional for complex matters. Always maintain a positive, supportive tone.`;

    // Build the full prompt combining system prompt and user question
    const fullPrompt = `${systemPrompt}\n\nUser: ${userQuestion}\n\nAssistant:`;

    // Build headers with optional API key
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (OLLAMA_API_KEY) {
      headers["Authorization"] = `Bearer ${OLLAMA_API_KEY}`;
    }

    // Call Ollama API
    const ollamaResponse = await fetch(OLLAMA_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 500,
        },
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
    }

    const ollamaData = await ollamaResponse.json();
    const response = ollamaData.response || "Sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({
      response,
      tokenUsage: {
        promptTokens: ollamaData.prompt_eval_count || 0,
        completionTokens: ollamaData.eval_count || 0,
        totalTokens: (ollamaData.prompt_eval_count || 0) + (ollamaData.eval_count || 0),
      },
    });

  } catch (error) {
    console.error("Error in advisor API:", error);

    const errorMessage = error && typeof error === "object" && "message" in error
      ? String(error.message)
      : "Unknown error";

    return NextResponse.json(
      { error: "Failed to get advisor response", details: errorMessage },
      { status: 500 }
    );
  }
}
