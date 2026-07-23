"use strict";

// =========================================================================
// Decide where the standalone proxy (server.cjs) forwards an intercepted,
// decrypted request — and which router endpoint speaks its wire format.
//
// The Antigravity IDE sends a cloudcode envelope:
//   { model, project, request: { contents, systemInstruction, tools, ... } }
// and expects a cloudcode SSE reply ({ response: { candidates, ... } }).
// That envelope is forwarded to the antigravity-compatible endpoint
// (/v1/antigravity), where the pipeline translates request antigravity→openai
// and response openai→antigravity, so the IDE gets its own format back
// regardless of which provider actually served it.
//
// Plain OpenAI bodies ({ messages: [...] }) keep going to /v1/chat/completions.
//
// Pure + deterministic so it is unit-testable without the proxy.
// =========================================================================

const CHAT_PATH = "/v1/chat/completions";
const ANTIGRAVITY_PATH = "/v1/antigravity";

/**
 * True when the parsed body is an Antigravity/cloudcode envelope (the IDE wraps
 * the Gemini-style payload under `request`, with a `contents` array).
 */
function isCloudcodeEnvelope(body) {
  return !!(
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    body.request &&
    typeof body.request === "object" &&
    Array.isArray(body.request.contents)
  );
}

/**
 * Resolve the forward URL + the format the IDE expects back. `baseUrl` is the
 * router base (e.g. http://localhost:20128); trailing slashes are trimmed.
 */
function resolveForwardTarget(baseUrl, body) {
  const base = String(baseUrl || "").replace(/\/+$/, "");
  if (isCloudcodeEnvelope(body)) {
    return { url: `${base}${ANTIGRAVITY_PATH}`, format: "antigravity" };
  }
  return { url: `${base}${CHAT_PATH}`, format: "openai" };
}

module.exports = {
  resolveForwardTarget,
  isCloudcodeEnvelope,
  CHAT_PATH,
  ANTIGRAVITY_PATH,
};
