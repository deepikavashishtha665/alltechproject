export async function analyzeResume(resumeText, jobDescription, apiKey) {
  // Agar API key nahi hai ya dummy hai, toh mock/demo data return karega
  if (!apiKey || apiKey.startsWith('AQ') || apiKey.length < 20) {
    // 1.5 second delay simulate karega taaki AI processing jaisa lage
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      matchScore: 82,
      summary: "Candidate shows strong core React and frontend fundamentals. Good match for the role with slight gaps in TypeScript and automated testing.",
      missingKeywords: ["TypeScript", "Tailwind CSS", "REST API", "Jest/Testing"],
      strengths: [
        "Hands-on experience with modern React features and Component architecture.",
        "Version control proficiency using Git and GitHub."
      ],
      improvements: [
        "Include measurable impact metrics in project experience.",
        "Add explicit mention of state management libraries if used."
      ],
      optimizedBullets: [
        "Architected responsive UI components using React and CSS, improving page load efficiency by 25%.",
        "Streamlined collaborative development workflows using Git version control and GitHub repositories."
      ]
    };
  }

  // Actual Gemini API Request (Jab sahi AIzaSy key milegi)
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