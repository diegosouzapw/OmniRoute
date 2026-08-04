/**
 * #6205 — 9Router embedded service: embed-panel 404 + pre-spawn EADDRINUSE.
 *
 * SUB-BUG A — the embed panel root (`/embed/`, zero segments after `embed/`)
 * 404s because the proxy route was a REQUIRED catch-all `[...path]`, which does
 * not match a segment-less path. Fix: OPTIONAL catch-all `[[...path]]` so the
 * root matches, and `reverseProxy.toUpstreamPath([])` maps the empty segment
 * array to `"/"`.
 *
 * SUB-BUG B — `ServiceSupervisor.start()` spawned the child with no pre-flight
 * port/health probe, so an orphaned prior instance holding the port made the
 * child die with a raw EADDRINUSE stack. Fix: `decidePreSpawn()` — adopt a
 * healthy instance, surface a clear error for a held-but-unhealthy port.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { toUpstreamPath } from "../../src/lib/services/embedPath.ts";
import { decidePreSpawn } from "../../src/lib/services/portProbe.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

// ─── SUB-BUG A: optional catch-all route + empty-segment mapping ──────────────

describe("#6205 A — embed panel root no longer 404s", () => {
  it("the proxy route folder is an OPTIONAL catch-all ([[...path]])", () => {
    const optional = path.join(
      repoRoot,
      "src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts"
    );
    const required = path.join(
      repoRoot,
      "src/app/(dashboard)/dashboard/providers/services/[name]/embed/[...path]/route.ts"
    );
    assert.ok(existsSync(optional), "optional catch-all [[...path]]/route.ts must exist");
    assert.ok(
      !existsSync(required),
      "required catch-all [...path]/route.ts must be gone (it cannot match /embed/)"
    );
  });

  it("maps the segment-less embed root ([]) to upstream '/'", () => {
    // The embed frame links to `/dashboard/providers/services/9router/embed/`,
    // i.e. zero segments after `embed/`. With the optional catch-all matching,
    // Next hands the route an empty segment array — which must map to "/".
    assert.equal(toUpstreamPath([]), "/");
  });

  it("still maps nested segments to their upstream path", () => {
    assert.equal(toUpstreamPath(["ui", "index.html"]), "/ui/index.html");
    assert.equal(toUpstreamPath(["api", "models"]), "/api/models");
  });

  it("derives an empty segment array from the embed frame's constructed path", () => {
    // Mirrors what Next's catch-all does: strip the prefix, split remaining.
    const framePath = "/dashboard/providers/services/9router/embed/";
    const prefix = "/dashboard/providers/services/9router/embed/";
    const rest = framePath.slice(prefix.length); // ""
    const segments = rest.split("/").filter(Boolean); // []
    assert.deepEqual(segments, []);
    assert.equal(toUpstreamPath(segments), "/");
  });
});

// ─── SUB-BUG B: pre-spawn port/health decision ───────────────────────────────

describe("#6205 B — pre-spawn port probe avoids raw EADDRINUSE", () => {
  it("adopts a healthy existing instance (no spawn)", () => {
    const decision = decidePreSpawn({ healthy: true, portInUse: true }, 20130);
    assert.equal(decision.action, "adopt");
  });

  it("returns a clear error object (not a throw) when the port is held but unhealthy", () => {
    let decision;
    assert.doesNotThrow(() => {
      decision = decidePreSpawn({ healthy: false, portInUse: true }, 20130);
    }, "decision must be returned, never thrown");
    assert.equal(decision.action, "error");
    assert.match(decision.message, /already in use/i);
    assert.match(decision.message, /20130/, "error should name the port");
    // The clear message must not be a raw EADDRINUSE stack trace.
    assert.ok(!decision.message.includes("at /"), "must not leak a stack trace");
  });

  it("spawns when the port is free", () => {
    const decision = decidePreSpawn({ healthy: false, portInUse: false }, 20130);
    assert.equal(decision.action, "spawn");
  });

  it("adopts a healthy instance even if the TCP probe missed it", () => {
    // Health is authoritative: a 2xx means a real instance is serving.
    const decision = decidePreSpawn({ healthy: true, portInUse: false }, 20130);
    assert.equal(decision.action, "adopt");
  });
});
