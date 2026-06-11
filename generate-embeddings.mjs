import { GoogleGenAI } from "@google/genai";
import { knowledgeBase } from "./lib/knowledge-base.ts";
import fs from "fs/promises";

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.error("Error: Please provide your GEMINI_API_KEY as a command-line argument.");
  console.log("Usage: node generate-embeddings.mjs YOUR_API_KEY");
  process.exit(1);
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

async function generateEmbeddings() {
  console.log("Starting to generate embeddings...");
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
      console.log(`- Generated embedding for chunk: ${chunk.id}`);
    } catch (error) {
      console.error(`Failed to generate embedding for chunk: ${chunk.id}`, error);
    }
  }

  try {
    await fs.writeFile(
      "./lib/knowledge-base-embeddings.json",
      JSON.stringify(embeddings, null, 2)
    );
    console.log("\nEmbeddings successfully generated and saved to ./lib/knowledge-base-embeddings.json");
  } catch (error) {
    console.error("Failed to write embeddings file:", error);
  }
}

generateEmbeddings();

