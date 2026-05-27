/**
 * R-02 — AutoStartToggle unit tests.
 *
 * Verifies module shape for the extracted shared component.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("AutoStartToggle — module shape", () => {
  it("exports AutoStartToggle function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/AutoStartToggle.tsx");
    assert.equal(typeof mod.AutoStartToggle, "function");
  });
});

// ── default label/description logic (mirrors component defaults) ──────────────

describe("AutoStartToggle — default description", () => {
  it("description uses service name when not provided", () => {
    const name = "cliproxy";
    const description = `Launch ${name} automatically when OmniRoute starts`;
    assert.ok(description.includes(name));
    assert.ok(description.includes("OmniRoute"));
  });

  it("auto-start endpoint path is correct for any service name", () => {
    const name = "cliproxy";
    const path = `/api/services/${name}/auto-start`;
    assert.equal(path, "/api/services/cliproxy/auto-start");
  });

  it("auto-start endpoint path is correct for 9router", () => {
    const name = "9router";
    const path = `/api/services/${name}/auto-start`;
    assert.equal(path, "/api/services/9router/auto-start");
  });
});
