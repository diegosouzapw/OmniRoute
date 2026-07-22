/**
 * Registry of all AgentBridge MITM targets.
 *
 * Exports:
 *   - `ALL_TARGETS`: canonical ordered list (one entry per supported agent).
 *   - `resolveTarget(hostname)`: returns the target whose hosts list contains
 *     `hostname` (case-insensitive exact match), or `null`.
 *   - `routeConnection(hostname, userBypass)`: bypass > target > passthrough
 *     decision per plan 11 §4.6.
 */
import { shouldBypass } from "../passthrough";
import type { MitmTarget } from "../types";
import { ANTIGRAVITY_TARGET } from "./antigravity";
import { KIRO_TARGET } from "./kiro";
import { COPILOT_TARGET } from "./copilot";
import { GHE_COPILOT_TARGET } from "./ghe-copilot";
import { CODEX_TARGET } from "./codex";
import { CURSOR_TARGET } from "./cursor";
import { ZED_TARGET } from "./zed";
import { CLAUDE_CODE_TARGET } from "./claudeCode";
import { OPEN_CODE_TARGET } from "./openCode";
import { TRAE_TARGET } from "./trae";

export { GHE_COPILOT_TARGET } from "./ghe-copilot";

export const ALL_TARGETS: MitmTarget[] = [
  ANTIGRAVITY_TARGET,
  KIRO_TARGET,
  COPILOT_TARGET,
  GHE_COPILOT_TARGET,
  CODEX_TARGET,
  CURSOR_TARGET,
  ZED_TARGET,
  CLAUDE_CODE_TARGET,
  OPEN_CODE_TARGET,
  TRAE_TARGET,
];

/**
 * Find the target whose `hosts` list contains the given hostname.
 * Lookup is case-insensitive and uses exact equality (no glob).
 */
export function resolveTarget(hostname: string): MitmTarget | null {
  if (!hostname) return null;
  const h = hostname.toLowerCase();
  for (const target of ALL_TARGETS) {
    if (target.hosts.some((host) => host.toLowerCase() === h)) {
      return target;
    }
  }
  return null;
}

export type ConnectionRoute =
  | { kind: "bypass"; reason: "bypass" }
  | { kind: "target"; target: MitmTarget }
  | { kind: "passthrough" };

/**
 * Decide what to do with a CONNECT/TLS connection to the given hostname.
 *
 * Precedence (plan 11 §4.6):
 *   1. bypass list (default + user) — never decrypt
 *   2. known target host — decrypt and dispatch to the matching handler
 *   3. anything else — passthrough (transparent TCP forward)
 */
export function routeConnection(
  hostname: string,
  userBypass: string[] = []
): ConnectionRoute {
  if (shouldBypass(hostname, userBypass)) {
    return { kind: "bypass", reason: "bypass" };
  }
  const target = resolveTarget(hostname);
  if (target) {
    return { kind: "target", target };
  }
  return { kind: "passthrough" };
}
