export const CHATGPT_WEB_CODEX_CONNECTOR_NAME = "OmniRoute Codex v2";
export const CHATGPT_WEB_CODEX_PROVIDER_ID = "chatgpt-web-codex";
export const CHATGPT_WEB_CODEX_MODEL_PREFIX = `${CHATGPT_WEB_CODEX_PROVIDER_ID}/`;

export function isChatGptWebCodexModel(model: unknown): boolean {
  return typeof model === "string" && model.startsWith(CHATGPT_WEB_CODEX_MODEL_PREFIX);
}

// ChatGPT's Cloudflare challenge rejects the true-headless Chrome shape even when the
// persisted account session is valid. Keep runtime turns aligned with the headed browser
// used to verify that same storage state.
export const CHATGPT_WEB_CODEX_RUNTIME_HEADED = true;
