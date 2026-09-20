import { createAskReply } from "../lib/askAhmad.js";

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const result = await createAskReply(
      payload.messages,
      process.env.GROQ_API_KEY,
      process.env.GROQ_MODEL
    );

    return json(result.status, result.body);
  } catch {
    return json(400, { error: "Invalid request body." });
  }
}
