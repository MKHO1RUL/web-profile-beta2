// generate-embeddings.mjs
import { GoogleGenerativeAI } from "@google/generative-ai";
import { knowledgeBase } from "./lib/knowledge-base.ts"; // Pastikan path ini benar
import fs from "fs/promises";

// Ambil API Key dari argumen command line, bukan dari .env
const API_KEY = process.argv[2];

if (!API_KEY) {
  // Beri pesan error yang jelas jika API Key tidak diberikan
  console.error("Error: Please provide your GEMINI_API_KEY as a command-line argument.");
  console.log("Usage: node generate-embeddings.mjs YOUR_API_KEY");
  process.exit(1); // Keluar dari skrip jika tidak ada key
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

async function generateEmbeddings() {
  console.log("Starting to generate embeddings...");
  const embeddings = [];

  for (const chunk of knowledgeBase) {
    try {
      const result = await model.embedContent(chunk.text);
      embeddings.push({
        id: chunk.id,
        text: chunk.text,
        embedding: result.embedding.values,
      });
      console.log(`- Generated embedding for chunk: ${chunk.id}`);
    } catch (error) {
      console.error(`Failed to generate embedding for chunk: ${chunk.id}`, error);
    }
  }

  try {
    // Simpan di dalam folder `lib` agar mudah diakses oleh API route
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
