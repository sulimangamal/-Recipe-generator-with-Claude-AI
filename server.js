import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for local development. In production, lock this down to the app's origin.
app.use(cors());

// Log incoming requests to help debug whether the frontend reaches this server
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path} - Host: ${req.headers.host}`);
  next();
});

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Quick sanity check: print whether an API key was loaded (don't print the key)
console.log('Anthropic API key present:', !!process.env.ANTHROPIC_API_KEY);

app.post("/api/message", async (req, res) => {
  const { prompt } = req.body;
  // Try a list of models as fallbacks in case the API key lacks access to a specific model.
  const candidateModels = [
    "claude-3-haiku-20240307",
    "claude-3",
    "claude-2",
  ];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      console.log(`Attempting Anthropic model: ${model}`);
      const msg = await client.messages.create({
        model,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });

      // Debug: log the full response from Anthropic
      console.log("Anthropic SDK response:", JSON.stringify(msg, null, 2));

      // Extract text from Claude's response format
      const text = msg?.content?.[0]?.text || "";
      console.log("Extracted recipe text:", text);
      return res.json({ model, text });
    } catch (error) {
      lastError = error;
      console.error(`Error from Anthropic when using model ${model}:`, error);
      // If it's a 403, don't try more models — likely a permission issue on the key.
      const status = error?.status || error?.response?.status;
      if (status === 403) {
        console.error("Received 403 Forbidden from Anthropic — stopping further attempts.");
        const message = error?.message || (error?.response && JSON.stringify(error.response)) || "Forbidden";
        return res.status(403).json({ error: message });
      }
      // otherwise try the next model
    }
  }

  // If we reach here, all attempts failed; return the last error
  console.error("All Anthropic model attempts failed:", lastError);
  const status = lastError?.status || lastError?.response?.status || 500;
  const message = lastError?.message || (lastError?.response && JSON.stringify(lastError.response)) || "Unknown error";
  res.status(status).json({ error: message });
});

// Lightweight health endpoint to confirm the server and env
app.get('/health', (req, res) => {
  res.json({ ok: true, apiKeyPresent: !!process.env.ANTHROPIC_API_KEY });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
