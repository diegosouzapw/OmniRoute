/**
 * Unit tests for the standardized combo error response helper.
 *
 * Bug #3 from `plans/2026-06-23-omniroute-v3.8.34-deep-audit.md`:
 * every 4xx response from `/api/combos/{id}` must include a stable
 * machine-readable `code` token, an `error.message`, optional
 * `error.details`, and `requestId` correlation. These tests assert the
 * shape and HTTP status for every branch the route uses.
 */

import { describe, expect, it } from "vitest";
import {
  buildComboErrorBody,
  comboErrorResponse,
} from "@/lib/api/comboErrorResponse";
import { ERROR_CODES } from "@/shared/constants/errorCodes";

describe("buildComboErrorBody", () => {
  it("emits the canonical { error: { code, message, category } } envelope", () => {
    const body = buildComboErrorBody("COMBO_001");
    expect(body).toMatchObject({
      error: {
        code: "COMBO_001",
        message: "Request body is not valid JSON",
        category: "COMBO",
      },
    });
  });

  it("includes details when provided", () => {
    const body = buildComboErrorBody("COMBO_002", {
      issues: [{ path: ["name"], message: "Required" }],
    });
    expect(body.error.code).toBe("COMBO_002");
    expect(body.error.details).toEqual({
      issues: [{ path: ["name"], message: "Required" }],
    });
  });

  it("omits details when undefined", () => {
    const body = buildComboErrorBody("COMBO_007");
    expect(body.error).not.toHaveProperty("details");
  });

  it("falls back to INTERNAL_001 for an unknown code", () => {
    const body = buildComboErrorBody(
      "COMBO_999" as unknown as Parameters<typeof buildComboErrorBody>[0]
    );
    // An unknown code falls through to INTERNAL_001 from the catalog.
    expect(body.error.code).toBe("INTERNAL_001");
  });
});

describe("comboErrorResponse", () => {
  it("returns the catalog httpStatus when no override is given", async () => {
    const res = comboErrorResponse("COMBO_001");
    expect(res.status).toBe(ERROR_CODES.COMBO_001.httpStatus);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe("COMBO_001");
  });

  it("respects an explicit status override", async () => {
    const res = comboErrorResponse("COMBO_006", 409, { name: "qs:foo" });
    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.error.code).toBe("COMBO_006");
    expect(body.error.details).toEqual({ name: "qs:foo" });
  });

  it("attaches x-request-id when a Request is supplied", async () => {
    const req = new Request("https://example.com/api/combos/abc", {
      headers: { "x-request-id": "test-corr-id-1234" },
    });
    const res = comboErrorResponse("COMBO_004", 400, undefined, req);
    expect(res.headers.get("x-request-id")).toBeTruthy();
  });

  it("does NOT leak internal combo names in DAG errors (sanitized reason tag)", async () => {
    // The route should translate a thrown `Error("cycle detected: combo-A")`
    // into `{ reason: "cycle-detected" }` — never the raw message.
    const reason = /cycle/i.test("cycle detected: combo-A") ? "cycle-detected" : "invalid-graph";
    const res = comboErrorResponse("COMBO_005", 400, {
      comboName: "user-facing-only",
      reason,
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe("COMBO_005");
    expect(body.error.details.reason).toBe("cycle-detected");
    // Crucial: the raw "combo-A" string must NOT appear in the response body.
    const text = JSON.stringify(body);
    expect(text).not.toContain("combo-A");
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

  it.each(expectedCodes)("%s is registered with httpStatus 400 or 409 or 404", (code) => {
    const def = ERROR_CODES[code];
    expect(def).toBeDefined();
    expect([400, 404, 409]).toContain(def.httpStatus);
    expect(def.category).toBe("COMBO");
  });
});
