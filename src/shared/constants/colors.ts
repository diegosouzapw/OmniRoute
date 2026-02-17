/**
 * Shared UI constants — Single source of truth for provider, protocol, and status colors.
 *
 * Previously duplicated in:
 * - RequestLoggerV2.js (PROTOCOL_COLORS, PROVIDER_COLORS, getStatusStyle)
 * - ProxyLogger.js (PROVIDER_COLORS, TYPE_COLORS, LEVEL_COLORS, getStatusStyle)
 * - UsageAnalytics.js (MODEL_COLORS, getModelColor)
 */

// ═══════════════════════════════════════════
// Provider Colors (used across all logger components)
// ═══════════════════════════════════════════

export const PROVIDER_COLORS = {
  github: { bg: "#6e40c9", text: "#fff", label: "GitHub" },
  kiro: { bg: "#FF9900", text: "#000", label: "Kiro" },
  antigravity: { bg: "#4285F4", text: "#fff", label: "AG" },
  claude: { bg: "#D97757", text: "#fff", label: "Claude" },
  codex: { bg: "#10A37F", text: "#fff", label: "Codex" },
  gemini: { bg: "#34A853", text: "#fff", label: "Gemini" },
  qwen: { bg: "#6366F1", text: "#fff", label: "Qwen" },
  iflow: { bg: "#EC4899", text: "#fff", label: "iFlow" },
  fireworks: { bg: "#F97316", text: "#fff", label: "Fireworks" },
  kimi: { bg: "#06B6D4", text: "#fff", label: "Kimi" },
  "gemini-cli": { bg: "#34A853", text: "#fff", label: "Gemini CLI" },
};

// ═══════════════════════════════════════════
// Protocol Colors (RequestLoggerV2)
// ═══════════════════════════════════════════

export const PROTOCOL_COLORS = {
  openai: { bg: "#10A37F", text: "#fff", label: "OpenAI" },
  claude: { bg: "#D97757", text: "#fff", label: "Claude" },
  gemini: { bg: "#4285F4", text: "#fff", label: "Gemini" },
  warmup: { bg: "#F59E0B", text: "#000", label: "Warmup" },
  bypass: { bg: "#6B7280", text: "#fff", label: "Bypass" },
};

// ═══════════════════════════════════════════
// Proxy Type Colors (ProxyLogger)
// ═══════════════════════════════════════════

export const TYPE_COLORS = {
  http: { bg: "#3B82F6", text: "#fff", label: "HTTP" },
  https: { bg: "#10B981", text: "#fff", label: "HTTPS" },
  socks5: { bg: "#8B5CF6", text: "#fff", label: "SOCKS5" },
};

// ═══════════════════════════════════════════
// Level Colors (ProxyLogger)
// ═══════════════════════════════════════════

export const LEVEL_COLORS = {
  key: { bg: "#F59E0B", text: "#000", label: "Key" },
  combo: { bg: "#8B5CF6", text: "#fff", label: "Combo" },
  provider: { bg: "#3B82F6", text: "#fff", label: "Provider" },
  global: { bg: "#6B7280", text: "#fff", label: "Global" },
  direct: { bg: "#374151", text: "#9CA3AF", label: "Direct" },
};

// ═══════════════════════════════════════════
// Model Colors (charts/analytics)
// ═══════════════════════════════════════════

export const MODEL_COLORS = [
  "#D97757",
  "#60A5FA",
  "#34D399",
  "#A78BFA",
  "#F472B6",
  "#FBBF24",
  "#38BDF8",
  "#FB923C",
  "#818CF8",
  "#2DD4BF",
  "#E879F9",
  "#F87171",
  "#4ADE80",
  "#C084FC",
  "#FB7185",
];

/**
 * Get a model color by index (cycles through palette).
 * @param {number} index
 * @returns {string} Hex color
 */
export function getModelColor(index) {
  return MODEL_COLORS[index % MODEL_COLORS.length];
}

// ═══════════════════════════════════════════
// Status Styling Helpers
// ═══════════════════════════════════════════

/**
 * Get badge style for HTTP status codes (RequestLoggerV2).
 * @param {number} status - HTTP status code
 * @returns {{ bg: string, text: string }}
 */
export function getHttpStatusStyle(status) {
  if (status >= 200 && status < 300) return { bg: "#059669", text: "#fff" };
  if (status >= 400 && status < 500) return { bg: "#D97706", text: "#fff" };
  if (status >= 500) return { bg: "#DC2626", text: "#fff" };
  if (status === 0) return { bg: "#6366F1", text: "#fff" }; // pending
  return { bg: "#6B7280", text: "#fff" };
}

/**
 * Get badge style for string-based status (ProxyLogger).
 * @param {string} status - Status string ("success", "error", "timeout")
 * @returns {{ bg: string, text: string }}
 */
export function getProxyStatusStyle(status) {
  if (status === "success") return { bg: "#059669", text: "#fff" };
  if (status === "error") return { bg: "#DC2626", text: "#fff" };
  if (status === "timeout") return { bg: "#D97706", text: "#fff" };
  return { bg: "#6B7280", text: "#fff" };
}

/**
 * Get default fallback for a provider color lookup.
 * @param {string} provider - Provider key
 * @returns {{ bg: string, text: string, label: string }}
 */
export function getProviderColor(provider) {
  return (
    PROVIDER_COLORS[provider] || {
      bg: "#374151",
      text: "#fff",
      label: (provider || "-").toUpperCase(),
    }
  );
}
