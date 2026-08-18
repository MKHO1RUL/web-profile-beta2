export interface KnowledgeChunk {
  id: string;
  text: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "about-me",
    text: "My full name is Muhammad Khoirul Irsyadul Ibad, people often call me Khoirul. I'm a passionate AI Engineer from Sidoarjo, East Java, Indonesia. My journey into programming began in 2021 when I entered university. I graduated with a degree in Mathematics from Airlangga University (Universitas Airlangga), where I focused on computational mathematics, mathematical modeling, and optimization algorithms.",
  },
  {
    id: "my-journey",
    text: "I started learning programming with C++, which introduced me to object-oriented programming and algorithmic thinking. My early projects included full-stack web applications using PHP and MySQL. During university, I immersed myself in Artificial Intelligence and Machine Learning, finding a deep synergy between mathematical theory and machine learning models.",
  },
  {
    id: "my-experience",
    text: "Beyond academic research, I have strong full-stack and AI engineering skills. I build responsive frontends and backend services with Next.js, React, TypeScript, Node.js, and Tailwind CSS. In the AI/ML ecosystem, I am proficient in Python, TensorFlow, PyTorch, Scikit-learn, FastAPI, and specialized in time-series forecasting, NLP, computer vision, and Generative AI (LLM Fine-tuning & RAG systems).",
  },
  {
    id: "skills-ml",
    text: "My core AI & ML skills include: Machine Learning (95%) with expertise in Time-Series Forecasting, Classification, Clustering, and Computer Vision; Deep Learning (90%) covering RNN, LSTM, GRU, CNN, and Transformer architectures; Natural Language Processing (NLP) (95%) including Text Classification, Sentiment Analysis, and Conversational Chatbots; and Generative AI (85%) including LLM Fine-tuning, Prompt Engineering, and RAG (Retrieval-Augmented Generation).",
  },
  {
    id: "skills-mlops",
    text: "For MLOps & Deployment, my skills are: Model Deployment (80%) using FastAPI, Flask, Docker, Vercel, and Railway; Model Monitoring & Logging (70%) with Grafana and ELK Stack; Experiment Tracking & Workflow (70%) with MLflow, DVC, and Airflow; and Vector Databases & Orchestration (85%) leveraging Turso (libSQL), Pinecone, and LangChain.",
  },
  {
    id: "skills-programming",
    text: "In Programming & Tools, I am proficient in Languages (90%): Python, TypeScript, JavaScript, C++, and PHP; Libraries & Frameworks (90%): NumPy, Pandas, Scikit-learn, PyTorch; Version Control (95%): Git & GitHub; and Development Tools (90%): VS Code, Jupyter Notebook, and Linux environments.",
  },
  {
    id: "skills-datascience",
    text: "For Data Science & Analytics, my expertise covers Data Collection & Cleaning (95%) with Pandas and NumPy; Exploratory Data Analysis (85%) using Matplotlib, Seaborn, and Pandas Profiling; Feature Engineering (70%) with Scikit-learn and Featuretools; and Data Visualization (85%) using Matplotlib, Seaborn, Plotly, and Chart.js.",
  },
  {
    id: "skills-support",
    text: "My foundational and soft skills include a rigorous background in Pure & Applied Mathematics, Statistics, Metaheuristic Optimization (such as Harris Hawks Optimization and Genetic Algorithms), collaborative problem-solving, and continuous technical curiosity.",
  },
  {
    id: "project-forex-gru-hho",
    text: "My flagship AI project is 'GRU-HHO Forex Prediction' (S-Rank). It is a financial forecasting application powered by a hybrid architecture of Gated Recurrent Unit (GRU) neural network and Harris Hawks Optimization (HHO) metaheuristic algorithm for forex market trend prediction. Tech stack: GRU, Python, FastAPI, Next.js, and Railway. Live Demo: https://mkii-forecast.vercel.app/ | Source code: https://github.com/MKHO1RUL/forecast-gru-hho",
  },
  {
    id: "project-rsa-otp",
    text: "Another featured project is 'RSA-OTP Login Authentication System' (S-Rank). A secure cryptographic authentication system that leverages RSA key pairs to generate and mathematically validate One-Time Passwords (OTP). In this system, server-side RSA operations guarantee authentic token verification. Tech stack: RSA Cryptography, PHP, CSS, and Fonnte API. Source code: https://github.com/MKHO1RUL/FinEduPro",
  },
  {
    id: "projects-overview",
    text: "Khoirul's featured portfolio projects include: 1) GRU-HHO Forex Prediction (S-Rank AI/ML forecasting system with live deployment), 2) RSA-OTP Login Authentication System (S-Rank cryptographic security system), and 3) This interactive Naruto-themed AI Engineer portfolio web application built with Next.js, Turso libSQL Database, and Gemini-powered RAG assistant.",
  },
  {
    id: "contact",
    text: "You can reach Khoirul via Email at irulkhoirul414@gmail.com, WhatsApp at +6287896218227, LinkedIn at linkedin.com/in/mkhoirulii, GitHub at github.com/MKHO1RUL, Twitter/X at twitter.com/m_khoiruli, or directly through the interactive contact scroll on this website.",
  },
];
