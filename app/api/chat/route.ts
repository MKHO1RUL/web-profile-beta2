import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import knowledgeEmbeddings from "@/lib/knowledge-base-embeddings.json";

const MODEL_NAME = "gemini-1.5-flash-latest";
const EMBEDDING_MODEL = "embedding-001";
const API_KEY = process.env.GEMINI_API_KEY;

const embeddingCache = new Map<string, number[]>();

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Wraps the embedding API call with a retry mechanism.
 * @param embeddingModel The Google Generative AI embedding model instance.
 * @param content The text content to embed.
 * @param retries The maximum number of retries.
 * @param initialDelay The initial delay in milliseconds.
 * @returns The embedding result.
 */
async function embedWithRetry(embeddingModel: any, content: string, retries = 3, initialDelay = 1000) {
  let delay = initialDelay;
  for (let i = 0; i < retries; i++) {
    try {
      return await embeddingModel.embedContent(content);
    } catch (error: any) {
      if (error instanceof Error && error.message.includes("429") && i < retries - 1) {
        console.warn(`Rate limit hit for embedding. Retrying in ${delay / 1000}s... (Attempt ${i + 1}/${retries})`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed to get embedding after multiple retries.");
}

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      throw new Error("The GEMINI_API_KEY environment variable is not set.");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const { history, message } = await req.json();

    let queryEmbedding: number[];

    if (embeddingCache.has(message)) {
      queryEmbedding = embeddingCache.get(message)!;
    } else {
      const embeddingModel = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
      const queryEmbeddingResult = await embedWithRetry(embeddingModel, message);
      queryEmbedding = queryEmbeddingResult.embedding.values; 
      embeddingCache.set(message, queryEmbedding);
    }

    const similarChunks = knowledgeEmbeddings
      .map(chunk => ({
        ...chunk,
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding as number[]),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);

    const relevantContext = similarChunks
      .map(chunk => `- ${chunk.text}`)
      .join("\n");

    const dynamicSystemInstruction = {
      role: "system",
      parts: [
        {
          text: `
You are Khoirul, an AI assistant with the persona of a friendly and skilled ninja AI engineer. 
Your purpose is to answer questions about Khoirul's professional profile based on the provided context.
- Your name is Khoirul.
- You are from Sidoarjo, East Java, Indonesia.
- Speak in a friendly, slightly informal, and encouraging tone. Use ninja-themed metaphors or phrases occasionally (e.g., "Jutsu", "mission", "shinobi", "chakra").
- Answer concisely and to the point.
- Base your answers *only* on the information provided in the "RELEVANT CONTEXT" below.
- If a question is outside the scope of the provided context, politely decline to answer. You can say something like: "That's a secret information I haven't mastered yet! My knowledge is focused on Khoirul's professional journey. How about we discuss his skills or projects?😁"
- Do not make up information.

---
RELEVANT CONTEXT:
${relevantContext}
---
`,
        },
      ],
    };

    const generativeModel = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: dynamicSystemInstruction,
    });

    const contents: Content[] = [...history, { role: "user", parts: [{ text: message }] }];
    const resultStream = await generativeModel.generateContentStream({ contents });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of resultStream.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("Error in chat API:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(`Server Error: ${errorMessage}`, { status: 500 });
  }
}
