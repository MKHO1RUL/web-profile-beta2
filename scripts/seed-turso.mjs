import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";

// Simple .env parser if not using dotenv
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("❌ Error: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in .env");
  process.exit(1);
}

const turso = createClient({ url, authToken });

async function seed() {
  console.log("🚀 Connecting to Turso and creating tables...");

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT (datetime('now')),
      title TEXT,
      description TEXT,
      tech TEXT,
      category TEXT,
      difficulty TEXT,
      status TEXT,
      image TEXT,
      github TEXT,
      live TEXT,
      display_order INTEGER
    );
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS skill_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT (datetime('now')),
      title TEXT,
      icon_name TEXT,
      color TEXT,
      display_order INTEGER
    );
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT (datetime('now')),
      name TEXT,
      tech TEXT,
      level INTEGER,
      category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE,
      display_order INTEGER
    );
  `);

  console.log("🧹 Clearing old data (if any)...");
  await turso.execute("DELETE FROM skills");
  await turso.execute("DELETE FROM skill_categories");
  await turso.execute("DELETE FROM projects");

  console.log("📦 Seeding Projects...");
  const projects = [
    {
      id: 1,
      created_at: "2025-09-10 03:05:31.149997+00",
      title: "GRU-HHO Forex Prediction",
      description: "Forecasting app using hybrid model of Gated Recurrent Unit and Harris Hawks Optimization for Forex Market",
      tech: JSON.stringify(["GRU", "Python", "FastAPI", "Next.js", "Railway"]),
      category: "ai",
      difficulty: "S-Rank",
      status: "Completed",
      image: "/proj-forecast.png",
      github: "https://github.com/MKHO1RUL/forecast-gru-hho",
      live: "https://mkii-forecast.vercel.app/",
      display_order: 1,
    },
    {
      id: 2,
      created_at: "2025-09-10 06:23:23.157783+00",
      title: "RSA-OTP Login Authentication System",
      description: "A custom authentication system that leverages RSA cryptography to generate and validate One-Time Passwords (OTP). In this system, OTPs are derived from RSA key pairs, ensuring that only users with the correct credentials can produce the valid code. The server verifies the OTP using RSA operations, allowing access only if the generated OTP matches the expected result.",
      tech: JSON.stringify(["RSA", "PHP", "CSS", "Fonnte API"]),
      category: "blockchain",
      difficulty: "S-Rank",
      status: "Completed",
      image: "/proj-forecast.png",
      github: "https://github.com/MKHO1RUL/FinEduPro",
      live: null,
      display_order: 2,
    },
  ];

  for (const p of projects) {
    await turso.execute({
      sql: `INSERT INTO projects (id, created_at, title, description, tech, category, difficulty, status, image, github, live, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [p.id, p.created_at, p.title, p.description, p.tech, p.category, p.difficulty, p.status, p.image, p.github, p.live, p.display_order],
    });
  }

  console.log("📦 Seeding Skill Categories...");
  const categories = [
    { id: 1, created_at: "2025-09-10 01:44:31.102469+00", title: "AI & ML", icon_name: "BrainCog", color: "naruto", display_order: 1 },
    { id: 2, created_at: "2025-09-10 01:45:52.973034+00", title: "MLOps & Deployment", icon_name: "Database", color: "sasuke", display_order: 2 },
    { id: 3, created_at: "2025-09-10 01:46:54.346079+00", title: "Programming & Tools", icon_name: "CodeXml", color: "sakutrash", display_order: 3 },
    { id: 4, created_at: "2025-09-10 01:47:48.750672+00", title: "Data Science & Analytics", icon_name: "ChartArea", color: "kakashi", display_order: 4 },
  ];

  for (const c of categories) {
    await turso.execute({
      sql: `INSERT INTO skill_categories (id, created_at, title, icon_name, color, display_order) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [c.id, c.created_at, c.title, c.icon_name, c.color, c.display_order],
    });
  }

  console.log("📦 Seeding Skills...");
  const skills = [
    { id: 4, created_at: "2025-09-10 01:53:05.867101+00", name: "Machine Learning", tech: "Forecasting, Classification, Clustering, Computer Vision", level: 95, category_id: 1, display_order: 1 },
    { id: 5, created_at: "2025-09-10 01:53:58.585843+00", name: "Deep Learning", tech: "RNN/LSTM/GRU, CNN, Transformer", level: 90, category_id: 1, display_order: 2 },
    { id: 6, created_at: "2025-09-10 01:54:57.279298+00", name: "NLP", tech: "Text Classification, Sentiment Analysis, Chatbot", level: 95, category_id: 1, display_order: 3 },
    { id: 7, created_at: "2025-09-10 01:55:35.352053+00", name: "Generative AI", tech: "LLM Fine-tuning, RAG", level: 85, category_id: 1, display_order: 4 },
    { id: 8, created_at: "2025-09-10 02:05:10.687612+00", name: "Model Deployment", tech: "FastAPI, Flask, Vercel, Railway", level: 80, category_id: 2, display_order: 1 },
    { id: 9, created_at: "2025-09-10 02:05:50.754642+00", name: "Model Monitoring & Logging", tech: "Grafana, ELK Stack", level: 10, category_id: 2, display_order: 2 },
    { id: 10, created_at: "2025-09-10 02:06:29.367843+00", name: "Experiment Tracking & Workflow", tech: "MLflow, DVC, Airflow", level: 10, category_id: 2, display_order: 3 },
    { id: 11, created_at: "2025-09-10 02:07:27.235053+00", name: "Vector Database & Orchestration", tech: "Pinecone, LangChain", level: 80, category_id: 2, display_order: 4 },
    { id: 12, created_at: "2025-09-10 02:18:00.659337+00", name: "Programming Language", tech: "Python, C++, PHP, JavaScript", level: 90, category_id: 3, display_order: 1 },
    { id: 13, created_at: "2025-09-10 02:18:33.498132+00", name: "Libraries", tech: "NumPy, Pandas, Scikit-learn", level: 90, category_id: 3, display_order: 2 },
    { id: 14, created_at: "2025-09-10 02:19:25.016074+00", name: "Version Control", tech: "Git, Github", level: 95, category_id: 3, display_order: 3 },
    { id: 15, created_at: "2025-09-10 02:19:57.800562+00", name: "Dev Tools", tech: "VS Code, Jupyter Notebook", level: 90, category_id: 3, display_order: 4 },
    { id: 16, created_at: "2025-09-10 02:21:18.914412+00", name: "Data Collection & Cleaning", tech: "Pandas, NumPy", level: 95, category_id: 4, display_order: 1 },
    { id: 17, created_at: "2025-09-10 02:22:09.790131+00", name: "Exploratory Data Analysis", tech: "Matplotlib, Seaborn, Pandas Profiling", level: 85, category_id: 4, display_order: 2 },
    { id: 18, created_at: "2025-09-10 02:22:52.745387+00", name: "Feature Engineering", tech: "Scikit-learn, Featuretools", level: 70, category_id: 4, display_order: 3 },
    { id: 19, created_at: "2025-09-10 02:24:36.817814+00", name: "Data Visualization", tech: "Matplotlib, Seaborn, Plotly, ChartJS", level: 85, category_id: 4, display_order: 4 },
  ];

  for (const s of skills) {
    await turso.execute({
      sql: `INSERT INTO skills (id, created_at, name, tech, level, category_id, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [s.id, s.created_at, s.name, s.tech, s.level, s.category_id, s.display_order],
    });
  }

  console.log("🔍 Verifying counts in Turso...");
  const pCount = await turso.execute("SELECT COUNT(*) as count FROM projects");
  const cCount = await turso.execute("SELECT COUNT(*) as count FROM skill_categories");
  const sCount = await turso.execute("SELECT COUNT(*) as count FROM skills");

  console.log(`✅ Projects: ${pCount.rows[0].count}`);
  console.log(`✅ Skill Categories: ${cCount.rows[0].count}`);
  console.log(`✅ Skills: ${sCount.rows[0].count}`);
  console.log("🎉 Migration to Turso successfully completed!");
}

seed().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
