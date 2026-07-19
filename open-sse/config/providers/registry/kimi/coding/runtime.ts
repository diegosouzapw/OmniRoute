export const KIMI_CODING_BASE_URL = "https://api.kimi.com/coding/v1";
export const KIMI_CODING_MODELS_URL = `${KIMI_CODING_BASE_URL}/models`;
export const KIMI_CODING_OPENAI_URL = `${KIMI_CODING_BASE_URL}/chat/completions`;
export const KIMI_CODING_ANTHROPIC_URL = `${KIMI_CODING_BASE_URL}/messages?beta=true`;

export const KIMI_CODE_CLI_PLATFORM = "kimi_code_cli";
export const KIMI_CODE_CLI_VERSION = "0.26.0";

export type KimiCodeThinkingPolicy = {
  supportsThinking: boolean;
  alwaysThinking?: boolean;
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
};

// Kimi Code's public model contract can move ahead of the packaged CLI release.
// Keep offline fallback policy here; live /models metadata still takes precedence.
const KIMI_CODE_STATIC_THINKING_POLICIES: Record<string, KimiCodeThinkingPolicy> = {
  k3: {
    supportsThinking: true,
    supportedThinkingEfforts: ["max"],
    defaultThinkingEffort: "max",
  },
};

export function getKimiCodeStaticThinkingPolicy(modelId: unknown): KimiCodeThinkingPolicy | null {
  if (typeof modelId !== "string") return null;
  return KIMI_CODE_STATIC_THINKING_POLICIES[modelId] || null;
}

export type KimiCodeDeviceIdentity = {
  deviceId?: unknown;
  deviceName?: unknown;
  deviceModel?: unknown;
  osVersion?: unknown;
};

export function sanitizeKimiHeaderValue(value: unknown, fallback = "unknown"): string {
  const text = String(value ?? "").trim();
  if (!text) return fallback;
  return text.replace(/[^\x20-\x7e]/g, "").trim() || fallback;
}

export function normalizeKimiDeviceId(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const deviceId = sanitizeKimiHeaderValue(raw);
  if (!/^[0-9a-f]{32}$/i.test(deviceId)) return deviceId;
  return [
    deviceId.slice(0, 8),
    deviceId.slice(8, 12),
    deviceId.slice(12, 16),
    deviceId.slice(16, 20),
    deviceId.slice(20),
  ].join("-");
}

export function getKimiCodeCliVersion(): string {
  return sanitizeKimiHeaderValue(process.env.KIMI_CLI_VERSION, KIMI_CODE_CLI_VERSION);
}

export function getKimiCodeCliUserAgent(): string {
  return `kimi-code-cli/${getKimiCodeCliVersion()}`;
}

export function buildKimiCodeIdentityHeaders(
  identity: KimiCodeDeviceIdentity,
  version = getKimiCodeCliVersion()
): Record<string, string> {
  return {
    "X-Msh-Platform": KIMI_CODE_CLI_PLATFORM,
    "X-Msh-Version": sanitizeKimiHeaderValue(version, KIMI_CODE_CLI_VERSION),
    "X-Msh-Device-Name": sanitizeKimiHeaderValue(identity.deviceName),
    "X-Msh-Device-Model": sanitizeKimiHeaderValue(identity.deviceModel),
    "X-Msh-Os-Version": sanitizeKimiHeaderValue(identity.osVersion),
    "X-Msh-Device-Id": sanitizeKimiHeaderValue(normalizeKimiDeviceId(identity.deviceId)),
  };
}
