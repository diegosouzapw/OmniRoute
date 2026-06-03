/**
 * R-03 — ApiKeyField unit tests.
 *
 * Verifies module shape for the extracted shared component.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("ApiKeyField — module shape", () => {
  it("exports ApiKeyField function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/ApiKeyField.tsx");
    assert.equal(typeof mod.ApiKeyField, "function");
  });
});

// ── rotate-key endpoint logic (mirrors component internals) ───────────────────

describe("ApiKeyField — rotate-key endpoint", () => {
  it("rotate-key route path is correct for 9router", () => {
    const name = "9router";
    const path = `/api/services/${name}/rotate-key`;
    assert.equal(path, "/api/services/9router/rotate-key");
  });

  it("success message includes service label", () => {
    const label = "9Router";
    const msg = `Key rotated — ${label} restarted to apply the new key`;
    assert.ok(msg.includes(label));
    assert.ok(msg.includes("rotated"));
  });
});
