export const API_KEY_CODEX_SERVICE_MODES = ["inherit", "default", "priority", "flex"] as const;

export type ApiKeyCodexServiceMode = (typeof API_KEY_CODEX_SERVICE_MODES)[number];

export function parseApiKeyCodexServiceMode(value: unknown): ApiKeyCodexServiceMode {
  return API_KEY_CODEX_SERVICE_MODES.includes(value as ApiKeyCodexServiceMode)
    ? (value as ApiKeyCodexServiceMode)
    : "inherit";
}
