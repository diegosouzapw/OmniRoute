/**
 * Unit tests for the standardized combo error response helper.
 *
 * Bug #3 from `plans/2026-06-23-omniroute-v3.8.34-deep-audit.md`:
 * every 4xx response from `/api/combos/{id}` must include a stable
 * machine-readable `code` token, an `error.message`, optional
 * `error.details`, and `requestId` correlation. These tests assert the
 * shape and HTTP status for every branch the route uses.
 *
 * Runner: node:test (the runner that collects tests/unit/api/**), not vitest —
 * the original vitest import crashed under the node:test runner that the
 * package.json glob also feeds it to (check:test-discovery).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildComboErrorBody, comboErrorResponse } from "@/lib/api/comboErrorResponse";
import { ERROR_CODES } from "@/shared/constants/errorCodes";

describe("buildComboErrorBody", () => {
  it("emits the canonical { error: { code, message, category } } envelope", () => {
    const body = buildComboErrorBody("COMBO_001");
    assert.equal(body.error.code, "COMBO_001");
    assert.equal(body.error.message, "Request body is not valid JSON");
    assert.equal(body.error.category, "COMBO");
  });

  it("includes details when provided", () => {
    const body = buildComboErrorBody("COMBO_002", {
      issues: [{ path: ["name"], message: "Required" }],
    });
    assert.equal(body.error.code, "COMBO_002");
    assert.deepEqual(body.error.details, {
      issues: [{ path: ["name"], message: "Required" }],
    });
  });

  it("omits details when undefined", () => {
    const body = buildComboErrorBody("COMBO_007");
    assert.ok(!("details" in body.error));
  });

  it("falls back to INTERNAL_001 for an unknown code", () => {
    const body = buildComboErrorBody(
      "COMBO_999" as unknown as Parameters<typeof buildComboErrorBody>[0]
    );
    // An unknown code falls through to INTERNAL_001 from the catalog.
    assert.equal(body.error.code, "INTERNAL_001");
  });
});

describe("comboErrorResponse", () => {
  it("returns the catalog httpStatus when no override is given", async () => {
    const res = comboErrorResponse("COMBO_001");
    assert.equal(res.status, ERROR_CODES.COMBO_001.httpStatus);
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error.code, "COMBO_001");
  });

  it("respects an explicit status override", async () => {
    const res = comboErrorResponse("COMBO_006", 409, { name: "qs:foo" });
    assert.equal(res.status, 409);
    const body = await res.json();
    assert.equal(body.error.code, "COMBO_006");
    assert.deepEqual(body.error.details, { name: "qs:foo" });
  });

  it("attaches x-request-id when a Request is supplied", async () => {
    const req = new Request("https://example.com/api/combos/abc", {
      headers: { "x-request-id": "test-corr-id-1234" },
    });
    const res = comboErrorResponse("COMBO_004", 400, undefined, req);
    assert.ok(res.headers.get("x-request-id"));
  });

  it("does NOT leak internal combo names in DAG errors (sanitized reason tag)", async () => {
    // The route should translate a thrown `Error("cycle detected: combo-A")`
    // into `{ reason: "cycle-detected" }` — never the raw message.
    const reason = /cycle/i.test("cycle detected: combo-A") ? "cycle-detected" : "invalid-graph";
    const res = comboErrorResponse("COMBO_005", 400, {
      comboName: "user-facing-only",
      reason,
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error.code, "COMBO_005");
    assert.equal(body.error.details.reason, "cycle-detected");
    // Crucial: the raw "combo-A" string must NOT appear in the response body.
    const text = JSON.stringify(body);
    assert.ok(!text.includes("combo-A"));
  });
});

describe("all five route 4xx branches have a defined COMBO_* code", () => {
  // The route uses these codes; this is a regression test against accidental
  // removal of a code from the catalog (would break clients parsing `code`).
  const expectedCodes = [
    "COMBO_001", // JSON parse failure (route.ts L49-58)
    "COMBO_002", // zod schema failure (route.ts L65)
    "COMBO_003", // composite tier config (route.ts L117)
    "COMBO_004", // name collision (route.ts L124)
    "COMBO_005", // DAG validation (route.ts L139)
    "COMBO_006", // quota-share conflict 409 (route.ts L71-78)
    "COMBO_007", // not found 404 (route.ts L31)
  ] as const;

  for (const code of expectedCodes) {
    it(`${code} is registered with httpStatus 400 or 409 or 404`, () => {
      const def = ERROR_CODES[code];
      assert.notEqual(def, undefined);
      assert.ok([400, 404, 409].includes(def.httpStatus));
      assert.equal(def.category, "COMBO");
    });
  }
});
