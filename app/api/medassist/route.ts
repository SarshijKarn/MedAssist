import { NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';

// Initialize Azure OpenAI Client
const client = new AzureOpenAI({
  apiKey: process.env.GPT_API_KEY,
  endpoint: process.env.GPT_ENDPOINT,
  deployment: process.env.GPT_DEPLOYMENT_NAME,
  apiVersion: "2024-05-01-preview", 
});

// The SYSTEM_PROMPT will now be constructed dynamically based on detected language.
// This constant holds the base rules.
const BASE_SYSTEM_PROMPT_RULES = `
You are MedAssist, a medical triage AI.
GOAL: Medical Triage.
OUTPUT FORMAT: JSON ONLY. NO MARKDOWN. NO PRE-TEXT.

STRICT JSON STRUCTURE:
{
  "type": "question" | "mcq" | "final" | "emergency",
  "text": "Your response message here. IN USER LANGUAGE.",
  "speak": boolean,
  "ui": {
    "choices": ["Option A", "Option B"],
    "expect": "choice" | "text" | "yesno"
  },
  "diagnostic": {
    "urgency": "low" | "high",
    "confidence_note": "reasoning"
  }
}

CRITICAL RULES:
1. TONE: BE DIRECT AND CLINICAL. REMOVE EMPATHY.
   - Example: "Describe the pain." NOT "I'm sorry..."
5. URGENCY: Identify urgency (Low/Medium/High/Emergency).
   - If Emergency: Tell them to go to hospital IMMEDIATELY.

6. NEVER output code blocks (\`\`\`). Just the raw JSON object.
7. Keep it short and simple.

Determine the likely condition based on symptoms.
Return the response in the specified JSON structure.
`;

export async function POST(req: Request) {
  try {
    const minireq = await req.json();
    const { message, voice_mode, history, image } = minireq;
    // Alias for the previous code block reference
    const reqBody = minireq;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Detect Language Hint (Client-side would be better but simple regex here works)
    const isNepali = /[\u0900-\u097F]/.test(message);
    const userLanguage = isNepali ? "Nepali" : "English";
    const langInstruction = isNepali 
        ? `1. LANGUAGE: You MUST respond in Nepali ONLY. If the user's Nepali is unclear, fallback to Hindi is allowed but keep it brief.` 
        : `1. LANGUAGE: You MUST respond in English ONLY.`;

    // Construct Messages
    const messages: any[] = [
      { 
        role: "system", 
        content: `Current User Language: ${userLanguage}\n\n${BASE_SYSTEM_PROMPT_RULES}\n\n${langInstruction}\n\nSPECIAL VISION RULE: If an image is provided, it must be a MEDICAL REPORT or PRESCRIPTION. If the user uploads a photo of a body part (wound, rash, injury), YOU MUST POLITELY DECLINE TO ANALYZE IT for safety reasons. Only analyze text-based medical documents. Provide findings/precautions from the report.` 
      },
    ];
    
    if (Array.isArray(history)) {
        messages.push(...history);
    } 

    // Current User Message
    if (reqBody.image) {
        messages.push({ 
            role: "user", 
            content: [
                { type: "text", text: message || "Analyze this medical report." },
                { type: "image_url", image_url: { url: reqBody.image } }
            ]
        });
    } else {
        messages.push({ role: "user", content: message });
    }

    const completion = await client.chat.completions.create({
      messages: messages, 
      model: process.env.GPT_DEPLOYMENT_NAME || "gpt-35-turbo", 
      temperature: 0.3, // Lower temp for strict json
      response_format: { type: "json_object" }, 
    });

    let content = completion.choices[0].message.content || "{}";
    
    // Cleanup: Remove markdown code blocks if present
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Find the outer brace pair to ignore garbage text before/after
    const firstBrace = content.indexOf("{");
    const lastBrace = content.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
    }
    
    let parsedData;
    try {
        parsedData = JSON.parse(content);
    } catch (e) {
        console.error("JSON Parse Error:", content);
        // Emergency Fallback
        parsedData = {
            text: "I encountered an error processing the response. Please try again.",
            speak: true,
            type: "uncertain",
            ui: { expect: "text" }
        };
    }
    
    if (voice_mode) {
        parsedData.speak = true;
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("GPT Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
