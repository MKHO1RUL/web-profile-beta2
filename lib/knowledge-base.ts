export interface KnowledgeChunk {
  id: string;
  text: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "about-me",
    text: "I'm Khoirul, my full name is Muhammad Khoirul Irsyadul Ibad. I'm a passionate AI Engineer from Sidoarjo, East Java, Indonesia. My journey into the world of programming began in 2021 when I first entered university. I graduated with a degree in Mathematics from Universitas Airlangga, where I focused on computational mathematics.",
  },
  {
    id: "quick-facts",
    text: "I started learning programming with C++, which introduced me to object-oriented programming. My very first project during university was developing a full-stack online bookstore website using PHP and MySQL. As time went on, I took a course in artificial intelligence, and that was the moment I became deeply interested in the field of machine learning. Beyond academic projects, I have developed strong technical skills in modern frameworks and tools. I work extensively with React and Next.js for building responsive and dynamic user interfaces, while leveraging Node.js for backend services. I also utilize Tailwind CSS to streamline UI development and ensure clean, maintainable styling. These experiences have strengthened my ability to deliver full-stack applications efficiently. In addition, my focus lies in the field of machine learning and AI development. I am proficient in Python and its data science ecosystem, including libraries such as TensorFlow, PyTorch, and scikit-learn. I have experience in tasks ranging from forecasting and classification to image processing. I approach every project with a mindset of continuous learning, aiming to create solutions that are both technically sound and impactful.",
  },
  {
  id: "skills-ml",
  text: "My core AI & ML skills include: Machine Learning (95%) with expertise in Forecasting, Classification, Clustering, and Computer Vision; Deep Learning (90%) covering RNN/LSTM/GRU, CNN, and Transformer; Natural Language Processing (NLP) (95%) including Text Classification, Sentiment Analysis, and Chatbot; and Generative AI (85%) such as LLM Fine-tuning and RAG."
  },
  {
    id: "skills-mlops",
    text: "For MLOps & Deployment, my skills are: Model Deployment (80%) using FastAPI and Flask; Model Monitoring & Logging (70%) with Grafana and ELK Stack; Experiment Tracking & Workflow (70%) with MLflow, DVC, and Airflow; and Vector Database & Orchestration (85%) leveraging Pinecone and LangChain."
  },
  {
    id: "skills-programming",
    text: "In Programming & Tools, I'm proficient in Programming Languages (90%) including Python, C++, PHP, and JavaScript; Libraries (90%) such as NumPy, Pandas, and Scikit-learn; Version Control (95%) with Git and GitHub; and Dev Tools (90%) like VS Code and Jupyter Notebook."
  },
  {
    id: "skills-datascience",
    text: "For Data Science & Analytics, my expertise covers Data Collection & Cleaning (95%) with Pandas and NumPy; Exploratory Data Analysis (85%) using Matplotlib, Seaborn, and Pandas Profiling; Feature Engineering (70%) with Scikit-learn and Featuretools; and Data Visualization (85%) using Matplotlib, Seaborn, and Plotly."
  },
  {
    id: "skills-support",
    text: "My foundation skills/soft skills include a strong foundation in Mathematics and Statistics, expertise in Optimization, a chill and collaborative mindset, and a commitment to Continuous Learning.",
  },
  {
    id: "projects",
    text: "I have completed several projects (missions): Online Bookstore (S-Rank), AI Chat Assistant (A-Rank), Task Management App (B-Rank), Data Visualization Tool (A-Rank), Mobile Fitness App (B-Rank), and a RSA-OTP Login System (S-Rank).",
  },
  {
    id: "contact",
    text: "You can contact me via Email at irulkhoirul414@gmail.com, Whatsapp at +6287896218227, LinkedIn at linkedin.com/mkhoirulii, GitHub at github.com/MKHO1RUL, Twitter at twitter.com/m_khoiruli, or directly through the contact form provided on this website.",
  },
];
