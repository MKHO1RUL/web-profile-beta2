import { GoogleGenAI } from "@google/genai";
import { knowledgeBase } from "./lib/knowledge-base.ts";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

// Load .env automatically if API key not provided as argument
function getApiKey() {
  if (process.argv[2]) return process.argv[2];
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  
  const envPath = path.resolve(process.cwd(), ".env");
  if (fsSync.existsSync(envPath)) {
    const content = fsSync.readFileSync(envPath, "utf-8");
    const match = content.match(/GEMINI_API_KEY=['"]?([^'"\r\n]+)/);
    if (match) return match[1];
  }
  return null;
}

const API_KEY = getApiKey();

if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY not found in arguments or .env file.");
  process.exit(1);
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

async function generateEmbeddings() {
  console.log("Starting to generate embeddings for updated knowledge base...");
  const embeddings = [];

  for (const chunk of knowledgeBase) {
    try {
      const result = await genAI.models.embedContent({
        model: "gemini-embedding-001",
        contents: [chunk.text],
      });
      embeddings.push({
        id: chunk.id,
        text: chunk.text,
        embedding: result.embeddings[0].values,
      });
      console.log(`✓ Generated embedding for chunk: ${chunk.id}`);
    } catch (error) {
      console.error(`✗ Failed to generate embedding for chunk: ${chunk.id}`, error);
    }
  }

  try {
    await fs.writeFile(
      "./lib/knowledge-base-embeddings.json",
      JSON.stringify(embeddings, null, 2)
    );
    console.log("\n🎉 Embeddings successfully regenerated and saved to ./lib/knowledge-base-embeddings.json");
  } catch (error) {
    console.error("Failed to write embeddings file:", error);
  }
}

generateEmbeddings();
