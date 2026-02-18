/**
 * Tool-Calling Policy — L-4
 *
 * Allowlist/denylist for tool (function) calling in LLM requests.
 * Controls which tool names can be invoked, preventing dangerous
 * tool use via prompt injection or misconfiguration.
 *
 * Configuration via environment variables:
 *   TOOL_POLICY_MODE=allowlist|denylist|disabled  (default: disabled)
 *   TOOL_ALLOWLIST=tool1,tool2,tool3
 *   TOOL_DENYLIST=dangerous_tool,exec_command
 *
 * @module lib/toolPolicy
 */

// ── Types ──

export interface ToolPolicyResult {
  allowed: boolean;
  denied: string[];
  reason?: string;
}

type PolicyMode = "allowlist" | "denylist" | "disabled";

// ── Configuration ──

function getMode(): PolicyMode {
  return (process.env.TOOL_POLICY_MODE as PolicyMode) || "disabled";
}

function parseList(envKey: string): Set<string> {
  const raw = process.env[envKey];
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

// ── Runtime overrides (for dashboard/API configuration) ──

let _runtimeAllowlist: Set<string> | null = null;
let _runtimeDenylist: Set<string> | null = null;
let _runtimeMode: PolicyMode | null = null;

/**
 * Override the policy at runtime (e.g., from dashboard settings).
 */
export function setRuntimePolicy(config: {
  mode?: PolicyMode;
  allowlist?: string[];
  denylist?: string[];
}): void {
  if (config.mode) _runtimeMode = config.mode;
  if (config.allowlist) _runtimeAllowlist = new Set(config.allowlist.map((s) => s.toLowerCase()));
  if (config.denylist) _runtimeDenylist = new Set(config.denylist.map((s) => s.toLowerCase()));
}

/**
 * Reset runtime overrides.
 */
export function resetRuntimePolicy(): void {
  _runtimeMode = null;
  _runtimeAllowlist = null;
  _runtimeDenylist = null;
}

// ── Core Logic ──

/**
 * Evaluate a list of tool names against the policy.
 */
export function evaluateToolPolicy(toolNames: string[]): ToolPolicyResult {
  const mode = _runtimeMode || getMode();

  if (mode === "disabled" || !toolNames || toolNames.length === 0) {
    return { allowed: true, denied: [] };
  }

  const normalizedNames = toolNames.map((n) => n.toLowerCase());

  if (mode === "allowlist") {
    const allowlist = _runtimeAllowlist || parseList("TOOL_ALLOWLIST");
    if (allowlist.size === 0) {
      return { allowed: true, denied: [], reason: "Allowlist is empty — all tools permitted" };
    }

    const denied = normalizedNames.filter((name) => !allowlist.has(name));
    return {
      allowed: denied.length === 0,
      denied,
      reason: denied.length > 0 ? `Tools not in allowlist: ${denied.join(", ")}` : undefined,
    };
  }

  if (mode === "denylist") {
    const denylist = _runtimeDenylist || parseList("TOOL_DENYLIST");
    const denied = normalizedNames.filter((name) => denylist.has(name));
    return {
      allowed: denied.length === 0,
      denied,
      reason: denied.length > 0 ? `Tools in denylist: ${denied.join(", ")}` : undefined,
    };
  }

  return { allowed: true, denied: [] };
}

/**
 * Extract tool names from an OpenAI-compatible request body.
 */
export function extractToolNames(body: any): string[] {
  const tools: string[] = [];

  // tools array (new format)
  if (Array.isArray(body?.tools)) {
    for (const tool of body.tools) {
      if (tool?.function?.name) {
        tools.push(tool.function.name);
      }
    }
  }

  // functions array (legacy format)
  if (Array.isArray(body?.functions)) {
    for (const fn of body.functions) {
      if (fn?.name) {
        tools.push(fn.name);
      }
    }
  }

  // tool_choice (if specific tool is forced)
  if (body?.tool_choice?.function?.name) {
    tools.push(body.tool_choice.function.name);
  }

  return tools;
}

/**
 * Convenience: validate an entire request body against the tool policy.
 */
export function validateToolsInRequest(body: any): ToolPolicyResult {
  const toolNames = extractToolNames(body);
  return evaluateToolPolicy(toolNames);
}
