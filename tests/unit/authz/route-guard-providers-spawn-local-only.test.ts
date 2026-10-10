// Regression tests for #15159 S-01 (spawn sites reachable from /api/providers/ routes).
//
// The audit verified two spawn sites reached from management routes that
// requireLogin=false waives:
//
//   1. `src/lib/providers/validation/webProvidersB.ts:535` —
//      spawn(bin, ["acp", "--agent-type", "summarizer"], …)
//      reached from POST /api/providers/validate, /api/providers/import,
//      /api/providers/bulk. These stay remote-reachable (they add provider keys for a
//      tunnel-served dashboard); the spawn is gated at its call site on the peer locality.
//
//   2. `src/lib/providerModels/cursorAgent.ts:17` —
//      spawn(binary, args, …)
//      reached from GET /api/providers/[id]/models
//
// Hard Rules #15 and #17: a leaked JWT via tunnel must not be able to trigger a spawn. For (1) that
// is enforced at the spawn; for (2) likewise at its call site. This test pins both, and that the
// non-spawning siblings are not over-broadened.
import { test } from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";

// ─── S-01: /api/providers/validate, /import, /bulk are gated at the spawn, not by path ──

test("isLocalOnlyPath: /api/providers/validate, /import, /bulk are NOT path-locked", () => {
  // They are how a tunnel-served dashboard verifies, saves and bulk-adds an API key. A path lock
  // answered every remote admin with 403 LOCAL_ONLY, so no provider key could be added through a
  // tunnel. The one spawn they can reach (webProvidersB.ts, Devin CLI fallback) is gated at its
  // call site instead (allowLocalSpawn, see the next test and
  // devin-cli-fallback-spawn-local-only-15159.test.ts).
  assert.equal(isLocalOnlyPath("/api/providers/validate", "POST"), false);
  assert.equal(isLocalOnlyPath("/api/providers/import", "POST"), false);
  assert.equal(isLocalOnlyPath("/api/providers/bulk", "POST"), false);
  assert.equal(isLocalOnlyPath("/api/providers/validate/", "POST"), false);
  assert.equal(isLocalOnlyPath("/api/providers/import/", "POST"), false);
  assert.equal(isLocalOnlyPath("/api/providers/bulk/", "POST"), false);
});

test("S-01: validate, import and bulk derive allowLocalSpawn from the trusted peer locality", async () => {
  // With the path lock gone, these routes are the remote-reachable callers of
  // validateProviderApiKey(): each MUST pass allowLocalSpawn from the request, otherwise the
  // validator's permissive default would let a remote caller trigger the Devin CLI spawn.
  const fs = await import("node:fs");
  for (const rel of [
    "../../../src/app/api/providers/validate/route.ts",
    "../../../src/app/api/providers/bulk/route.ts",
    "../../../src/app/api/providers/import/route.ts",
  ]) {
    const source = fs.readFileSync(new URL(rel, import.meta.url), "utf8");
    assert.ok(source.includes("getRequestPeerLocality"), `${rel} must read the peer locality`);
    assert.ok(
      /getRequestPeerLocality\(request\)\s*!==\s*"remote"/.test(source),
      `${rel} must fail closed: only a non-remote peer may allow the local spawn`
    );
    assert.ok(source.includes("allowLocalSpawn"), `${rel} must pass allowLocalSpawn`);
  }
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
  // Nothing here spawns, so nothing here is path-locked.
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
