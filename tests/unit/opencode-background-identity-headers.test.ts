/**
 * Regression test — OpenCode operator warning (2026-09-03): background calls
 * to opencode.ai (model-catalog discovery / quota checks) went out on the bare
 * runtime fetch with User-Agent "Bun fetch" and NO `x-opencode-session`.
 * OpenCode announced that from 2026-09-06 such requests "may error".
 *
 * Fix under test:
 * 1. `buildOpencodeBackgroundHeaders()` (open-sse/utils/opencodeHeaders.ts)
 *    synthesizes the OpenCode CLI identity (UA + x-opencode-client/project/
 *    request/session) for non-chat fetches, with a STABLE per-caller session
 *    fingerprint seeded by the calling connection/workspace.
 * 2. `PROVIDER_MODELS_CONFIG` entries for opencode / opencode-zen /
 *    opencode-go (src/app/api/providers/[id]/models/discovery/
 *    providerModelsConfig.ts) route discovery through that helper, and the
 *    seed prefers the connection's `opencodeGoWorkspaceId` so connections
 *    sharing a workspace share one background identity.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { buildOpencodeBackgroundHeaders } from "../../open-sse/utils/opencodeHeaders.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SESSION_HASH_RE = /^[0-9a-f]{16}$/i;

test("background headers carry the OpenCode CLI identity, not the bare runtime UA", () => {
  const headers = buildOpencodeBackgroundHeaders({ seed: "conn-a" });
  assert.equal(headers["User-Agent"], "opencode");
  assert.equal(headers["x-opencode-client"], "desktop");
  assert.equal(headers["x-opencode-project"], "global");
  assert.match(headers["x-opencode-request"] ?? "", UUID_RE);
});

test("background session id is a stable per-seed fingerprint (same hash family as the chat path)", () => {
  const first = buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" });
  const second = buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" });
  assert.match(first["x-opencode-session"] ?? "", SESSION_HASH_RE);
  assert.equal(first["x-opencode-session"], second["x-opencode-session"]);
});

test("background session id differs across seeds (connections do not share an identity)", () => {
  const a = buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" });
  const b = buildOpencodeBackgroundHeaders({ seed: "wrk_01XYZ" });
  assert.notEqual(a["x-opencode-session"], b["x-opencode-session"]);
});

test("seedless background calls still send a session id (random fallback)", () => {
  const headers = buildOpencodeBackgroundHeaders();
  const value = headers["x-opencode-session"] ?? "";
  assert.ok(
    UUID_RE.test(value) || SESSION_HASH_RE.test(value),
    `expected a UUID or fingerprint session id, got ${value}`
  );
});

test("explicit userAgent override wins over the CLI default", () => {
  const headers = buildOpencodeBackgroundHeaders({
    seed: "conn-a",
    userAgent: "opencode-cli/9.9.9",
  });
  assert.equal(headers["User-Agent"], "opencode-cli/9.9.9");
});

test("discovery entries for opencode / opencode-zen / opencode-go attach the session header", () => {
  for (const provider of ["opencode", "opencode-zen", "opencode-go"] as const) {
    const entry = PROVIDER_MODELS_CONFIG[provider];
    assert.ok(entry, `PROVIDER_MODELS_CONFIG missing ${provider}`);
    assert.equal(typeof entry.buildHeaders, "function", `${provider} must use buildHeaders`);
    const headers = entry.buildHeaders!("test-token", {
      providerSpecificData: { opencodeGoWorkspaceId: "wrk_01ABC" },
    });
    assert.equal(headers.Authorization, "Bearer test-token");
    assert.equal(headers["User-Agent"], "opencode");
    assert.match(headers["x-opencode-session"] ?? "", SESSION_HASH_RE);
    // Same workspace → same identity as the raw helper (seed comes from psd).
    assert.equal(
      headers["x-opencode-session"],
      buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" })["x-opencode-session"]
    );
  }
});
