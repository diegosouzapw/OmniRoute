import { Hono } from "hono";

/**
 * Batch 1 BFF routes — Protocol Translator.
 *
 * The translator page lets users translate chat requests between
 * OpenAI, Claude, Gemini, Kiro, Cursor, and other formats.
 * It uses SSE streaming for live translation results.
 */
export const translatorRoutes = new Hono()

  /** Translator status and supported formats. */
  .get("/", (c) =>
    c.json({
      status: "ready",
      supportedFormats: [
        "openai",
        "openai-responses",
        "claude",
        "gemini",
        "antigravity",
        "kiro",
        "cursor",
      ],
      pipelineModes: ["direct", "hub-and-spoke", "passthrough"],
      stats: {
        translationsToday: 0,
        totalTranslations: 0,
        avgLatencyMs: 0,
      },
    })
  )

  /** Static format metadata for the translator UI. */
  .get("/formats", (c) =>
    c.json({
      formats: [
        { id: "openai", name: "OpenAI Chat Completions", icon: "smart_toy" },
        { id: "openai-responses", name: "OpenAI Responses API", icon: "smart_toy" },
        { id: "claude", name: "Claude Messages", icon: "psychology" },
        { id: "gemini", name: "Gemini GenerateContent", icon: "auto_awesome" },
        { id: "antigravity", name: "Antigravity", icon: "flight" },
        { id: "kiro", name: "Kiro", icon: "code" },
        { id: "cursor", name: "Cursor", icon: "edit" },
      ],
    })
  );
