import { createHash } from "node:crypto";
import type { InterceptedRequest } from "./types";

/**
 * Extract the system prompt string from an intercepted LLM request body.
 * Supports OpenAI/Anthropic chat (messages[0] role=system),
 * Anthropic messages API (top-level `system` field),
 * and Gemini (systemInstruction.parts[].text).
 *
 * @returns Concatenated system prompt string, or null if not found.
 */
export function extractSystemPrompt(req: InterceptedRequest): string | null {
  if (!req.requestBody) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(req.requestBody);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object") return null;

  const body = parsed as Record<string, unknown>;

  // 1. Anthropic messages API — top-level `system` field (string or array)
  if (typeof body.system === "string" && body.system.length > 0) {
    return body.system;
  }
  if (Array.isArray(body.system)) {
    const parts = body.system
      .map((p: unknown) => {
        if (typeof p === "object" && p !== null && "text" in p) {
          return String((p as Record<string, unknown>).text);
        }
        return null;
      })
      .filter(Boolean);
    if (parts.length > 0) return parts.join("\n");
  }

  // 2. OpenAI/Anthropic chat — messages[0] with role=system
  if (Array.isArray(body.messages)) {
    const first = body.messages[0];
    if (
      first &&
      typeof first === "object" &&
      "role" in first &&
      (first as Record<string, unknown>).role === "system"
    ) {
      const content = (first as Record<string, unknown>).content;
      if (typeof content === "string") return content;
      if (Array.isArray(content)) {
        const texts = content
          .map((c: unknown) => {
            if (typeof c === "object" && c !== null && "text" in c) {
              return String((c as Record<string, unknown>).text);
            }
            return null;
          })
          .filter(Boolean);
        if (texts.length > 0) return texts.join("\n");
      }
    }
  }

  // 3. Gemini — systemInstruction.parts[].text
  if (
    body.systemInstruction &&
    typeof body.systemInstruction === "object" &&
    "parts" in body.systemInstruction
  ) {
    const parts = (body.systemInstruction as Record<string, unknown>).parts;
    if (Array.isArray(parts)) {
      const texts = parts
        .map((p: unknown) => {
          if (typeof p === "object" && p !== null && "text" in p) {
            return String((p as Record<string, unknown>).text);
          }
          return null;
        })
        .filter(Boolean);
      if (texts.length > 0) return texts.join("\n");
    }
  }

  return null;
}

/**
 * Compute a 12-hex SHA-256 fingerprint of the system prompt.
 * Returns null if no system prompt is found.
 */
export function computeContextKey(req: InterceptedRequest): string | null {
  const sys = extractSystemPrompt(req);
  if (!sys) return null;
  return createHash("sha256").update(sys).digest("hex").slice(0, 12);
}
