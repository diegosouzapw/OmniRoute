/**
 * System Prompt Injection — Phase 10
 *
 * Injects a global system prompt into all requests at proxy level.
 */

// In-memory config
let _config = {
  enabled: false,
  prompt: "",
};

/**
 * Set system prompt config
 */
export function setSystemPromptConfig(config) {
  _config = { ..._config, ...config };
}

/**
 * Get system prompt config
 */
export function getSystemPromptConfig() {
  return { ..._config };
}

/**
 * Inject system prompt into request body.
 *
 * @param {object} body - Request body
 * @param {string} [promptText] - Override prompt text
 * @returns {object} Modified body
 */
export function injectSystemPrompt(body, promptText = null) {
  const text = promptText || _config.prompt;
  if (!text || !_config.enabled) return body;
  if (!body || typeof body !== "object") return body;
  if (body._skipSystemPrompt) return body;

  const result = { ...body };

  // OpenAI/Claude format (messages[])
  if (result.messages && Array.isArray(result.messages)) {
    const sysIdx = result.messages.findIndex((m) => m.role === "system" || m.role === "developer");
    result.messages = [...result.messages];
    if (sysIdx >= 0) {
      // Append after existing system content so the global prompt is the FINAL
      // instruction — provider/agent system blocks (Kiro, OpenCode, Hermes, etc.)
      // are injected into the system message later, and recency bias means the
      // user's global prompt must come after them to take priority (#2468).
      const msg = { ...result.messages[sysIdx] };
      msg.content = (msg.content || "") + "\n\n" + text;
      result.messages[sysIdx] = msg;
    } else {
      result.messages = [{ role: "system", content: text }, ...result.messages];
    }
  }

  // Claude format (system field) — append for the same reason as above (#2468).
  if (result.system !== undefined) {
    if (typeof result.system === "string") {
      result.system = result.system + "\n\n" + text;
    } else if (Array.isArray(result.system)) {
      result.system = [...result.system, { type: "text", text }];
    }
  }

  return result;
}
