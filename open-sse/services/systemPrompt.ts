/**
 * System Prompt Injection — Phase 10.1
 *
 * Injects TWO global system prompts into all requests at proxy level:
 *   - prefixPrompt: prepended BEFORE existing system/agent content
 *   - suffixPrompt: appended AFTER existing system/agent content
 *
 * This gives the user full control over instruction priority (#2468):
 *   prefix → agent/provider instructions → suffix (highest recency priority)
 *
 * Uses globalThis to share config across Turbopack module instances (#2470).
 */

const GLOBAL_KEY = "__omniroute_systemPrompt_config__";

interface SystemPromptConfig {
  enabled: boolean;
  prefixPrompt: string;
  suffixPrompt: string;
  prompt: string;
}

// Typed accessor for globalThis storage — avoids `as any` casts (#2470)
const _store = globalThis as unknown as Record<string, SystemPromptConfig | undefined>;

function getConfig(): SystemPromptConfig {
  if (!_store[GLOBAL_KEY]) {
    _store[GLOBAL_KEY] = {
      enabled: false,
      prefixPrompt: "",
      suffixPrompt: "",
      prompt: "",
    };
  }
  return _store[GLOBAL_KEY]!;
}

function setConfig(cfg: SystemPromptConfig): void {
  _store[GLOBAL_KEY] = cfg;
}

/**
 * Set system prompt config (supports legacy `prompt` field for migration)
 */
export function setSystemPromptConfig(config: Partial<SystemPromptConfig>) {
  const current = getConfig();
  const base = { ...current };
  if ("prefixPrompt" in config || "suffixPrompt" in config) {
    base.prompt = "";
  }
  const merged = { ...base, ...config };
  if (merged.prompt && !merged.suffixPrompt && !("suffixPrompt" in config)) {
    merged.suffixPrompt = merged.prompt;
  }
  setConfig(merged);
}

/**
 * Get system prompt config
 */
export function getSystemPromptConfig() {
  const cfg = getConfig();
  return {
    enabled: cfg.enabled,
    prefixPrompt: cfg.prefixPrompt,
    suffixPrompt: cfg.suffixPrompt,
  };
}

/**
 * Inject system prompts into request body.
 *
 * prefixPrompt is prepended before existing system content.
 * suffixPrompt is appended after existing system content.
 * This ensures: prefix → agent instructions → suffix (#2468).
 *
 * @param {object} body - Request body
 * @returns {object} Modified body
 */
export function injectSystemPrompt(body) {
  const cfg = getConfig();
  if (!cfg.enabled) return body;
  const prefix = cfg.prefixPrompt || "";
  const suffix = cfg.suffixPrompt || "";
  if (!prefix && !suffix) return body;
  if (!body || typeof body !== "object") return body;
  if (body._skipSystemPrompt) return body;

  const result = { ...body };

  // OpenAI/Claude format (messages[])
  if (result.messages && Array.isArray(result.messages)) {
    const sysIdx = result.messages.findIndex((m) => m.role === "system" || m.role === "developer");
    result.messages = [...result.messages];
    if (sysIdx >= 0) {
      const msg = { ...result.messages[sysIdx] };
      if (Array.isArray(msg.content)) {
        const content = [...msg.content];
        if (prefix) content.unshift({ type: "text", text: prefix });
        if (suffix) content.push({ type: "text", text: suffix });
        msg.content = content;
      } else {
        let content = msg.content || "";
        if (prefix) content = prefix + "\n\n" + content;
        if (suffix) content = content + "\n\n" + suffix;
        msg.content = content;
      }
      result.messages[sysIdx] = msg;
    } else {
      // No existing system message — combine both into one
      const combined = [prefix, suffix].filter(Boolean).join("\n\n");
      if (combined) {
        result.messages = [{ role: "system", content: combined }, ...result.messages];
      }
    }
  }

  // Claude format (system field)
  if (result.system !== undefined) {
    if (typeof result.system === "string") {
      let sys = result.system;
      if (prefix) sys = prefix + "\n\n" + sys;
      if (suffix) sys = sys + "\n\n" + suffix;
      result.system = sys;
    } else if (Array.isArray(result.system)) {
      let arr = [...result.system];
      if (prefix) arr = [{ type: "text", text: prefix }, ...arr];
      if (suffix) arr = [...arr, { type: "text", text: suffix }];
      result.system = arr;
    }
  }

  return result;
}

/**
 * Inject a per-request custom system prompt into the request body.
 *
 * Unlike injectSystemPrompt (which reads from globalThis config), this
 * function takes an explicit prompt string and appends it as a suffix
 * after any existing system content — mirroring the caveman/ponytail
 * injection pattern but driven by per-endpoint settings.
 *
 * @param body  - Translated request body (OpenAI/Claude/Gemini format)
 * @param prompt - The custom system prompt text to inject
 * @returns Modified body with prompt appended to the system message
 */
export function injectCustomSystemPrompt(body: Record<string, unknown>, prompt: string) {
  if (!prompt || typeof prompt !== "string") return body;
  if (!body || typeof body !== "object") return body;
  if (body._skipSystemPrompt) return body;

  const result = { ...body };

  // OpenAI/Claude messages[] format
  if (result.messages && Array.isArray(result.messages)) {
    const sysIdx = (result.messages as Array<{ role: string; content: unknown }>).findIndex(
      (m) => m.role === "system" || m.role === "developer"
    );
    result.messages = [...(result.messages as Array<{ role: string; content: unknown }>)];
    if (sysIdx >= 0) {
      const msg = { ...(result.messages as Array<{ role: string; content: unknown }>)[sysIdx] };
      if (Array.isArray(msg.content)) {
        msg.content = [...(msg.content as unknown[]), { type: "text", text: prompt }];
      } else {
        msg.content = (msg.content ? msg.content + "\n\n" : "") + prompt;
      }
      (result.messages as Array<{ role: string; content: unknown }>)[sysIdx] = msg;
    } else {
      result.messages = [
        { role: "system", content: prompt },
        ...(result.messages as Array<{ role: string; content: unknown }>),
      ];
    }
  }

  // Claude direct system field
  if (result.system !== undefined) {
    if (typeof result.system === "string") {
      result.system = result.system ? result.system + "\n\n" + prompt : prompt;
    } else if (Array.isArray(result.system)) {
      result.system = [...(result.system as unknown[]), { type: "text", text: prompt }];
    }
  }

  return result;
}
