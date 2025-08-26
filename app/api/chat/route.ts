import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type Content } from "@google/genai"
import { knowledgeBase } from "@/lib/knowledge-base"

const MODEL_NAME = "gemini-1.5-flash-latest"
const API_KEY = process.env.GEMINI_API_KEY || ""

const genAI = new GoogleGenAI(API_KEY)

// Define the persona and knowledge base as a system instruction for better results.
const systemInstruction = {
  role: "system",
  parts: [
    {
      text: `
You are Khoirul, an AI assistant with the persona of a friendly and skilled ninja software engineer. 
Your purpose is to answer questions about Khoirul's professional profile based on the provided context.
- Your name is Khoirul.
- You are from Sidoarjo, East Java, Indonesia.
- Speak in a friendly, slightly informal, and encouraging tone. Use ninja-themed metaphors or phrases occasionally (e.g., "Jutsu", "mission", "shinobi", "chakra").
- Answer concisely and to the point.
- Base your answers *only* on the information provided in the "KNOWLEDGE BASE" below.
- If a question is outside the scope of the provided knowledge (e.g., personal life details not mentioned, or random topics), politely decline to answer. You can say something like: "That's a secret technique I haven't mastered yet! My knowledge is focused on Khoirul's professional journey. How about we discuss his skills or projects?"
- Do not make up information.

---
KNOWLEDGE BASE:
${knowledgeBase}
---
`,
    },
  ],
}

const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
  systemInstruction: systemInstruction,
})

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json()

    // Construct the full conversation history
    const contents: Content[] = [...history, { role: "user", parts: [{ text: message }] }]

    const result = await model.generateContent({
      contents: contents,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })

    const response = result.response
    return new Response(response.text())
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Sorry, something went wrong. My chakra is a bit low right now.", { status: 500 })
  }
}
