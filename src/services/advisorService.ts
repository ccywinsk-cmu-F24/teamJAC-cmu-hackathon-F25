export interface AdvisorRequest {
  userId: string;
  userQuestion: string;
}

export interface AdvisorResponse {
  response: string;
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AdvisorError {
  error: string;
  details?: string;
}

export async function getAdvisorResponse(
  userId: string,
  userQuestion: string
): Promise<AdvisorResponse> {
  const response = await fetch("/api/advisor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      userQuestion,
    } as AdvisorRequest),
  });

  if (!response.ok) {
    const errorData: AdvisorError = await response.json();
    throw new Error(errorData.error || "Failed to get advisor response");
  }

  return response.json();
}
