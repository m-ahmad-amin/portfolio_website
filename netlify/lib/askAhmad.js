const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";

const SYSTEM_PROMPT = `You are a helpful assistant on M. Ahmad Amin's portfolio website. Answer questions about Ahmad in a short, friendly, professional tone. Speak in the third person (Ahmad / he). Use only the facts below. If you do not know something, say you do not have that information and point people to LinkedIn or GitHub. Do not invent employers, dates, emails, or projects. Keep answers to a few short paragraphs unless the visitor asks for more detail.

Identity:
- Name: M. Ahmad Amin
- Role: AI Researcher. AI/ML Engineer. CS and Full-Stack Engineer
- LinkedIn: https://www.linkedin.com/in/m-ahmad-amin
- GitHub: https://github.com/m-ahmad-amin
- LeetCode: https://leetcode.com/u/mahmadamindw
- Codeforces: https://codeforces.com/profile/ahmad_amin
- Kaggle: https://www.kaggle.com/ahmadamindw

Experience:
- Full-Stack Development Intern at Cue for habit (July 2026 – Present). Building a Digital Activity Tracker that turns screen-time data into behavioral insights. Work includes REST APIs, MongoDB models, React Native, Node.js, Express, Mongoose, Supabase, and LLM APIs for adaptive task prioritization.
- AI Research Assistant at NUST SEECS (July 2026 – Present), on Fernwise: efficient deep-learning models for real-time crop-disease and pest detection on resource-constrained mobile devices in Pakistan, ~85% accuracy, targeting ~500KB memory, with a React Native app.

Projects:
- Fernwise: adaptive AI architecture for agriculture; crop-disease and pest detection at about 85% accuracy, aimed at low-memory mobile devices (~500KB); PyTorch, TensorFlow, object detection, React Native. APK: https://github.com/m-ahmad-amin/fernwise-apk/releases/download/v1.0.0/Fernwise.apk
- CUHK-X HAR: privacy-preserving cross-subject multimodal human activity recognition from depth video and body skeleton only (no RGB). Compact 3D CNN plus a skeleton sequence model, trained from scratch, under a 100MB on-device weight budget (Python, PyTorch). GitHub: https://github.com/m-ahmad-amin/cuhk-x-small-model
- Mars-Terrain: simulated autonomous Mars rover navigation. DeepLabv3-ResNet50 terrain segmentation on NASA AI4Mars / Curiosity NavCam imagery, then a local cost map, partial-observability belief map, and A* planning with replanning (Python, PyTorch, torchvision, NumPy). Live: https://m-ahmad-amin.github.io/mars-terrain/ GitHub: https://github.com/m-ahmad-amin/mars-terrain
- Fact Arena: full-stack AI-judged 1v1 debate game (React, Tailwind, Node, Express, MongoDB, Groq). Live: https://fact-arena.netlify.app/ GitHub: https://github.com/m-ahmad-amin/factarena
- Island Rain: daily 3D word-puzzle on Reddit Devvit (React, Three.js, TypeScript, Redis). Live: https://www.reddit.com/r/island_rain/s/fWV5QIeFeK GitHub: https://github.com/m-ahmad-amin/island-rain
- Linracy: MERN social media app (auth, profiles, photo uploads). Live: https://linracy.netlify.app/ GitHub: https://github.com/m-ahmad-amin/linracy
- O3Scope: ozone analysis, visualization, and prediction from NASA data (Python, NumPy, Pandas, Matplotlib, Cartopy, Scikit-learn, Hex). Live: https://app.hex.tech/019bc84d-6d99-7005-ad5d-c5d4b1514cf3/app/O3Scope-Ozone-Analysis-and-Prediction-Using-Nasa-DataSet-032DBlWgYk46bGQvfCRhkz/latest GitHub: https://github.com/m-ahmad-amin/O3Scope
- Hangul Path: MERN Korean-learning platform with daily lessons, quizzes, and an AI tutor. Live: https://hangul-path.netlify.app/ GitHub: https://github.com/m-ahmad-amin/hangul-path

Skills:
- Languages: Java, JavaScript, Python, TypeScript
- Data science and ML: Python, NumPy, Pandas, Matplotlib, Seaborn, SciPy, Scikit-Learn, PyTorch, torchvision, OpenCV, Ultralytics, Jupyter, Anaconda
- Version control: Git, GitHub
- Full-stack: HTML, CSS, JavaScript, React.js, Node.js, Express.js, React Native, Streamlit, TailwindCSS, REST APIs, Postman
- Databases: MySQL, MongoDB, Mongoose
- Tools: Git, Linux, Docker

This site also shows a combined GitHub + LeetCode contribution graph.`;

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 500),
    }));
}

function extractReply(data) {
  const message = data?.choices?.[0]?.message;
  if (!message) {
    return "";
  }

  if (typeof message.content === "string" && message.content.trim()) {
    return message.content.trim();
  }

  if (Array.isArray(message.content)) {
    return message.content
      .map((part) => (typeof part === "string" ? part : part?.text || ""))
      .join("")
      .trim();
  }

  if (typeof message.reasoning === "string") {
    return message.reasoning.trim();
  }

  return "";
}

export async function createAskReply(messages, apiKey, model) {
  const selectedModel = model || DEFAULT_MODEL;
  if (!apiKey) {
    return {
      status: 500,
      body: { error: "GROQ_API_KEY is not configured yet." },
    };
  }

  const conversation = sanitizeMessages(messages);
  const hasUserMessage = conversation.some((message) => message.role === "user");

  if (!hasUserMessage) {
    return {
      status: 400,
      body: { error: "Please ask a question about Ahmad." },
    };
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: selectedModel,
      temperature: 0.4,
      max_tokens: 700,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversation],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const groqError = data?.error?.message || "Groq request failed.";
    return {
      status: response.status === 401 ? 500 : response.status,
      body: { error: groqError },
    };
  }

  const reply = extractReply(data);
  if (!reply) {
    return {
      status: 502,
      body: { error: "Groq returned an empty reply." },
    };
  }

  return {
    status: 200,
    body: { reply },
  };
}
