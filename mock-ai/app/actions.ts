'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateQuestions(role: string, resumeText: string) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("❌ MISSING API KEY in .env.local")
    return ["Describe a project you are proud of.", "How do you handle conflict?", "What are your strengths?"]
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  
  try {
    // 🟢 CHANGED: Switched from 'gemini-1.5-flash' to 'gemini-pro' (Stable)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `
      You are an expert technical interviewer. 
      Candidate applied for: ${role}.
      Resume context: ${resumeText ? resumeText.slice(0, 1000) : "No resume provided"}.
      
      Generate exactly 3 interview questions.
      1. One behavioral question.
      2. One technical question specific to the role.
      3. One situational question.
      
      Return ONLY a JSON array of strings. Example: ["Question 1", "Question 2", "Question 3"].
      Do not add markdown formatting like \`\`\`json.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response // await the response property
    const text = response.text()
    
    // Clean up the response to ensure it's valid JSON
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim()
    
    try {
      return JSON.parse(cleanJson)
    } catch (e) {
      console.error("JSON Parse Error:", e)
      return [
        `Tell me about your experience as a ${role}.`,
        "What is your biggest technical challenge?",
        "How do you prioritize tasks?"
      ]
    }

  } catch (error) {
    console.error("Gemini API Error:", error)
    return [
      "Tell me about a challenging project you worked on.",
      `What are the key skills required for a ${role}?`,
      "How do you handle tight deadlines?"
    ]
  }
}