import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createAskReply } from "./netlify/lib/askAhmad.js";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function askApiPlugin(env) {
  return {
    name: "ask-api",
    configureServer(server) {
      server.middlewares.use("/api/ask", async (req, res, next) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          json(res, 405, { error: "Method not allowed." });
          return;
        }

        try {
          const payload = await readJsonBody(req);
          const result = await createAskReply(
            payload.messages,
            env.GROQ_API_KEY,
            env.GROQ_MODEL
          );
          json(res, result.status, result.body);
        } catch {
          json(res, 400, { error: "Invalid request body." });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    plugins: [react(), askApiPlugin(env)],
    server: {
      proxy: {
        "/api/leetcode": {
          target: "https://leetcode.com",
          changeOrigin: true,
          rewrite: () => "/graphql",
        },
      },
    },
  };
});
