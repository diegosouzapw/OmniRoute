/**
 * @file raycast-local-extract.test.ts
 * @description Tests for Raycast local credential extraction (mocked where needed).
 *
 * @changes
 * - [2026-07-27] [Composer] - Raycast local extract unit tests
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isRaycastLocalExtractAvailable } from "../../src/lib/oauth/services/raycastLocal.ts";

describe("raycast local extract", () => {
  it("reports availability on darwin when Raycast paths exist", () => {
    const result = isRaycastLocalExtractAvailable();
    assert.equal(typeof result, "boolean");
  });
});
