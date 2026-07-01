type EnvSource = Record<string, string | undefined>;
type HeaderLike = Headers | Record<string, string | string[] | undefined> | null | undefined;

export type AgentGoalPolicy = {
  detected: boolean;
  readinessMaxTimeoutMs: number;
  streamRecoveryEnabled: boolean;
};

export const DEFAULT_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS = 600_000;

const GOAL_COMMAND_RE = /(^|[\s"'`])\/goal(?=$|[\s"'`:;,.!?])/i;
const MAX_VISITED_NODES = 5_000;
const MAX_STRING_CHARS = 256_000;

function readHeader(headers: HeaderLike, name: string): string | null {
  if (!headers) return null;
  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name);
  }
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() !== lower) continue;
    if (Array.isArray(value)) return value.join(",");
    return typeof value === "string" ? value : null;
  }
  return null;
}

function parseBoolean(value: string | undefined | null, fallback: boolean): boolean {
  if (value == null || value.trim() === "") return fallback;
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;
  return fallback;
}

function readPositiveMs(env: EnvSource, name: string, fallback: number): number {
  const raw = env[name];
  if (raw == null || raw.trim() === "") return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function hasGoalCommandText(value: string): boolean {
  const sample = value.length > MAX_STRING_CHARS ? value.slice(0, MAX_STRING_CHARS) : value;
  return GOAL_COMMAND_RE.test(sample);
}

export function isAgentGoalRequestBody(body: unknown): boolean {
  const seen = new Set<object>();
  let visited = 0;

  const visit = (value: unknown, depth: number): boolean => {
    if (visited++ > MAX_VISITED_NODES || depth > 10) return false;
    if (typeof value === "string") return hasGoalCommandText(value);
    if (!value || typeof value !== "object") return false;
    if (seen.has(value)) return false;
    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) {
        if (visit(item, depth + 1)) return true;
      }
      return false;
    }

    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (key === "metadata" || key === "usage") continue;
      if (visit(child, depth + 1)) return true;
    }
    return false;
  };

  return visit(body, 0);
}

export function resolveAgentGoalPolicy(
  body: unknown,
  headers: HeaderLike = null,
  env: EnvSource = process.env
): AgentGoalPolicy {
  const forcedByHeader = parseBoolean(readHeader(headers, "x-omniroute-agent-goal"), false);
  const detected = forcedByHeader || isAgentGoalRequestBody(body);
  const readinessMaxTimeoutMs = readPositiveMs(
    env,
    "OMNIROUTE_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS",
    DEFAULT_AGENT_GOAL_READINESS_MAX_TIMEOUT_MS
  );
  const streamRecoveryEnabled =
    detected && parseBoolean(env.OMNIROUTE_AGENT_GOAL_STREAM_RECOVERY, true);

  return {
    detected,
    readinessMaxTimeoutMs,
    streamRecoveryEnabled,
  };
}
