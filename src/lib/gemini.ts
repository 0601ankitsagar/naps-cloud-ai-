export interface AnalysisResult {
  authenticityScore: number;
  aiProbability: number;
  humanProbability: number;
  analysis: string;
  linguisticPatterns: {
    perplexity: "Low" | "Medium" | "High";
    burstiness: "Low" | "Medium" | "High";
    consistency: "Low" | "Medium" | "High";
  };
  verdict: string;
}

export async function analyzeText(text: string): Promise<AnalysisResult> {
  if (!text || text.trim().length < 50) {
    throw new Error("Text is too short for meaningful analysis. Please provide at least 50 characters.");
  }

  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An error occurred during analysis.");
  }

  return response.json();
}
