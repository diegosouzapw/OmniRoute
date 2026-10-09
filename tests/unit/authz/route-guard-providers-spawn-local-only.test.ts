// Regression tests for #15159 S-01: two spawn-capable /api/providers/ routes
// were missing from LOCAL_ONLY_API_PATTERNS.
//
// The audit verified two spawn sites reached from management routes that
// requireLogin=false waives:
//
//   1. `src/lib/providers/validation/webProvidersB.ts:535` —
//      spawn(bin, ["acp", "--agent-type", "summarizer"], …)
//      reached from POST /api/providers/validate, /api/providers/import,
//      /api/providers/bulk
//
//   2. `src/lib/providerModels/cursorAgent.ts:17` —
//      spawn(binary, args, …)
//      reached from GET /api/providers/[id]/models
//
// Hard Rules #15 and #17 require loopback enforcement unconditionally before
// any auth check. This test asserts isLocalOnlyPath() returns true for all
// spawn-capable paths, and false for the non-spawning siblings (no over-broadening).
import { test } from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";

// ─── S-01: /api/providers/validate, /import, /bulk spawn a child process ──

test("isLocalOnlyPath: /api/providers/validate, /import, /bulk are local-only (S-01, #15159)", () => {
  // webProvidersB.ts:535 spawns `bin` with argv ["acp", "--agent-type", "summarizer"].
  // The binary comes from a fixed candidate list and argv is fixed — not caller-
  // controlled RCE — but Hard Rules #15 + #17 still require loopback enforcement
  // before any auth check so a leaked JWT via tunnel cannot trigger the spawn.
  assert.equal(isLocalOnlyPath("/api/providers/validate"), true);
  assert.equal(isLocalOnlyPath("/api/providers/import"), true);
  assert.equal(isLocalOnlyPath("/api/providers/bulk"), true);
  // Trailing slash must also match (Next.js normalizes but the guard should be safe)
  assert.equal(isLocalOnlyPath("/api/providers/validate/"), true);
  assert.equal(isLocalOnlyPath("/api/providers/import/"), true);
  assert.equal(isLocalOnlyPath("/api/providers/bulk/"), true);
});

// ─── S-01: GET /api/providers/{id}/models is NOT path-gated (deliberate) ──

test("isLocalOnlyPath: /api/providers/{id}/models stays reachable (S-01 design)", () => {
  // The second M-05-era spawn hop (cursorAgent.ts:17) is reached from this route, but
  // `{id}` is a CONNECTION id, not a provider: the spawn only runs inside the
  // `provider === "cursor"` branch. A `[^/]+/models` path pattern would lock remote model
  // discovery for EVERY provider — the over-broadening the /login precedent exists to avoid.
  // The spawn is instead gated at its call site on the trusted peer-locality header.
  assert.equal(isLocalOnlyPath("/api/providers/cursor/models"), false);
  assert.equal(isLocalOnlyPath("/api/providers/openai/models"), false);
  assert.equal(isLocalOnlyPath("/api/providers/abc-123/models"), false);
  // Must still not match the bare path (no [id] segment).
  assert.equal(isLocalOnlyPath("/api/providers/models"), false);
});

// ─── The cursor-agent spawn hop is guarded at its call site ─────────────

test("S-01: the cursor-agent spawn call site requires a loopback peer", async () => {
  // Guards the second hop at the only place that can be accurate: the route source must
  // check the trusted locality header before fetchCursorAgentModels(). This is a source-level
  // regression guard (the runtime test for the route is an integration concern) — it fails if
  // someone removes the guard or reorders the spawn ahead of it.
  const fs = await import("node:fs");
  const source = fs.readFileSync(
    new URL("../../../src/app/api/providers/[id]/models/route.ts", import.meta.url),
    "utf8"
  );
  const guardIndex = source.indexOf("AUTHZ_HEADER_PEER_LOCALITY");
  const spawnIndex = source.indexOf("fetchCursorAgentModels()");
  assert.ok(guardIndex !== -1, "route must read the trusted peer-locality header");
  assert.ok(spawnIndex !== -1, "route must still call fetchCursorAgentModels()");
  assert.ok(
    guardIndex < spawnIndex,
    "the locality guard must appear BEFORE the fetchCursorAgentModels() spawn call"
  );
  assert.ok(
    /AUTHZ_HEADER_PEER_LOCALITY\)\s*!==\s*"loopback"/.test(source),
    'the guard must fail closed: only an explicit "loopback" locality may spawn'
  );
});

// ─── No over-broadening: the rest of /api/providers/ stays reachable ─────

test("isLocalOnlyPath: non-spawn /api/providers/ routes stay remote-reachable (S-01)", () => {
  // The generic provider CRUD surface must NOT be loopback-locked.
  // Only the spawn-capable validate/import/bulk paths are gated.
  assert.equal(isLocalOnlyPath("/api/providers"), false);
  assert.equal(isLocalOnlyPath("/api/providers/"), false);
  assert.equal(isLocalOnlyPath("/api/providers/cursor"), false);
  assert.equal(isLocalOnlyPath("/api/providers/refresh"), false);
  assert.equal(isLocalOnlyPath("/api/providers/batch-status"), false);
  // "validate" must be its own segment, not a prefix of a sibling route name.
  assert.equal(isLocalOnlyPath("/api/providers/validate-batch"), false);
  assert.equal(isLocalOnlyPath("/api/providers/bulk-status"), false);
  assert.equal(isLocalOnlyPath("/api/providers/validate/x"), false);
});
