export async function analyzeResume(resumeText, jobDescription, apiKey) {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) reviewer. Analyze the following resume text against the provided Job Description (JD).
    
    Resume:
    """${resumeText}"""
    
    Job Description:
    """${jobDescription}"""
    
    Respond STRICTLY in JSON format with the following keys:
    {
      "matchScore": <number between 0 and 100>,
      "summary": "<2-sentence overview>",
      "missingKeywords": ["keyword1", "keyword2", "keyword3"],
      "strengths": ["point1", "point2"],
      "improvements": ["point1", "point2"],
      "optimizedBullets": ["Rewritten action bullet point 1", "Rewritten action bullet point 2"]
    }
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    }
  );

  if (!response.ok) {
    throw new Error("API request failed. Please check your API Key.");
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  return JSON.parse(rawText);
}