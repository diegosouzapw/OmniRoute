/**
 * Security regression (#7948): /api/acp/agents must be classified as LOCAL_ONLY
 * so loopback enforcement runs unconditionally before any auth check.
 *
 * POST registers a CustomAgentDef with a client-chosen `binary`
 * (src/lib/acp/registry.ts:40-48); `resolveVersionProbe()` only checks the
 * tokenized `versionCommand`'s command matches the supplied `binary` — no
 * known-safe allowlist. A later GET (or POST {action:"refresh"}) runs
 * `detectInstalledAgents()` -> `detectAgent()` -> `execFileSync(probe.command,
 * probe.args, { shell: shouldUseShellForVersionProbe(probe.command) })`
 * (registry.ts:320-325), with `shell:true` on Windows for `.cmd`/`.bat`/
 * extensionless commands — the same spawn-capable class already gated for
 * every sibling route (Hard Rules #15 + #17). Classifying it LOCAL_ONLY closes
 * the remote-RCE vector: a leaked JWT over a Cloudflared/Ngrok tunnel cannot
 * trigger process spawning. See docs/security/ROUTE_GUARD_TIERS.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("#7948: /api/acp/agents is LOCAL_ONLY (spawns via registry execFileSync)", () => {
  assert.equal(isLocalOnlyPath("/api/acp/agents"), true);
});

test("#7948: /api/acp/agents with trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/acp/agents/"), true);
});

test("#7948: nested acp agent paths stay LOCAL_ONLY under the same prefix", () => {
  assert.equal(isLocalOnlyPath("/api/acp/agents/sub"), true);
});
