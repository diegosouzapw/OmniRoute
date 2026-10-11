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
 * 2. `PROVIDER_MODELS_CONFIG` entries for opencode-zen /
 *    opencode-go (src/app/api/providers/[id]/models/discovery/
 *    providerModelsConfig.ts) route discovery through that helper, and the
 *    seed prefers the connection's `opencodeGoWorkspaceId` so connections
 *    sharing a workspace share one background identity.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildOpencodeBackgroundHeaders,
  OPENCODE_REQUEST_PATTERN,
  OPENCODE_SESSION_PATTERN,
} from "../../open-sse/utils/opencodeHeaders.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";

test("background headers carry the OpenCode CLI identity, not the bare runtime UA", () => {
  const headers = buildOpencodeBackgroundHeaders({ seed: "conn-a" });
  assert.equal(headers["User-Agent"], "opencode");
  assert.equal(headers["x-opencode-client"], "desktop");
  assert.equal(headers["x-opencode-project"], "global");
  assert.match(headers["x-opencode-request"] ?? "", OPENCODE_REQUEST_PATTERN);
});

test("background session id is a stable per-seed fingerprint (same hash family as the chat path)", () => {
  const first = buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" });
  const second = buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" });
  assert.match(first["x-opencode-session"] ?? "", OPENCODE_SESSION_PATTERN);
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
  assert.match(
    value,
    OPENCODE_SESSION_PATTERN,
    `expected a canonical ses_ session id, got ${value}`
  );
});

test("explicit userAgent override wins over the CLI default", () => {
  const headers = buildOpencodeBackgroundHeaders({
    seed: "conn-a",
    userAgent: "opencode-cli/9.9.9",
  });
  assert.equal(headers["User-Agent"], "opencode-cli/9.9.9");
});

test("discovery entries for opencode-zen / opencode-go attach the session header", () => {
  for (const provider of ["opencode-zen", "opencode-go"] as const) {
    const entry = PROVIDER_MODELS_CONFIG[provider];
    assert.ok(entry, `PROVIDER_MODELS_CONFIG missing ${provider}`);
    assert.equal(typeof entry.buildHeaders, "function", `${provider} must use buildHeaders`);
    const headers = entry.buildHeaders!("test-token", {
      providerSpecificData: { opencodeGoWorkspaceId: "wrk_01ABC" },
    });
    assert.equal(headers.Authorization, "Bearer test-token");
    assert.equal(headers["User-Agent"], "opencode");
    assert.match(headers["x-opencode-session"] ?? "", OPENCODE_SESSION_PATTERN);
    // Same workspace → same identity as the raw helper (seed comes from psd).
    assert.equal(
      headers["x-opencode-session"],
      buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" })["x-opencode-session"]
    );
  }
});

test("discovery seed honours every workspace spelling the validator accepts", () => {
  const entry = PROVIDER_MODELS_CONFIG["opencode-go"];
  const expected = buildOpencodeBackgroundHeaders({ seed: "wrk_01ABC" })["x-opencode-session"];
  for (const key of ["openCodeGoWorkspaceId", "opencodeGoWorkspaceId", "workspaceId"] as const) {
    const headers = entry.buildHeaders!("test-token", {
      providerSpecificData: { [key]: "wrk_01ABC" },
    });
    assert.equal(
      headers["x-opencode-session"],
      expected,
      `${key} must seed the same identity as the canonical workspace key`
    );
  }
});

test("discovery falls back to the connection id, not a random session, when no workspace is set", () => {
  const entry = PROVIDER_MODELS_CONFIG["opencode-go"];
  const first = entry.buildHeaders!("test-token", { id: "conn-42" });
  const second = entry.buildHeaders!("test-token", { id: "conn-42" });
  assert.equal(first["x-opencode-session"], second["x-opencode-session"]);
  assert.equal(
    first["x-opencode-session"],
    buildOpencodeBackgroundHeaders({ seed: "conn-42" })["x-opencode-session"]
  );
});
