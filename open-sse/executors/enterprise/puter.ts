import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

/**
 * PuterExecutor — OpenAI-compatible proxy for Puter AI.
 *
 * Puter exposes 500+ models (GPT, Claude, Gemini, Grok, DeepSeek, Qwen, Mistral...)
 * through a single OpenAI-compatible REST endpoint.
 *
 * Endpoint: https://api.puter.com/puterai/openai/v1/chat/completions
 * Auth:     Bearer <puter_auth_token>  (from puter.com/dashboard → Copy Auth Token)
 * Docs:     https://docs.puter.com/AI/
 *
 * Model ID examples:
 *   OpenAI:   "gpt-4o-mini", "gpt-4o", "gpt-4.1"
 *   Claude:   "claude-sonnet-4-5", "claude-opus-4", "claude-haiku-4-5"
 *   Gemini:   "google/gemini-2.0-flash", "google/gemini-2.5-pro"
 *   DeepSeek: "deepseek/deepseek-chat", "deepseek/deepseek-r1"
 *   Grok:     "x-ai/grok-3", "x-ai/grok-4"
 *   Mistral:  "mistralai/mistral-small-3.2"
 *   Meta:     "meta-llama/llama-3.3-70b-instruct"
 *
 * Note: Image generation, TTS, STT, and video are puter.js SDK-only features.
 * Only text chat completions (with streaming SSE) are available via REST.
 */
export class PuterExecutor extends BaseExecutor {
  constructor() {
    super("puter", PROVIDERS["puter"] || { format: "openai" });
  }

  buildUrl(_model: string, _stream: boolean, _urlIndex = 0, _credentials = null): string {
    return "https://api.puter.com/puterai/openai/v1/chat/completions";
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const key = credentials?.apiKey || credentials?.accessToken;
    if (key) {
      headers["Authorization"] = `Bearer ${key}`;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(model: string, body: any, _stream: boolean, _credentials: any): any {
    // Puter accepts model IDs directly from its catalog.
    // No transformation required — model string is passed as-is.
    return body;
  }
}

export default PuterExecutor;
