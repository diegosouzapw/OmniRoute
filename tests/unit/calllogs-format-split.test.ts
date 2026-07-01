/**
 * Characterization + API-surface test: callLogs.ts god-file decomposition.
 *
 * The 10 pure formatting/sanitization helpers were extracted verbatim from
 * src/lib/usage/callLogs.ts into the pure leaf src/lib/usage/callLogs/format.ts
 * (no DB, no fs). The DB CRUD / disk-artifact / rotation code stays in the host.
 *
 * Verifies that:
 *   1. The pure helpers behave correctly (DB-free).
 *   2. The host callLogs.ts still exposes the FULL public API (10 functions).
 *   3. The format leaf exports its helpers directly.
 *
 * NOTE: helpers that call sanitizePII are exercised with non-PII text, since PII
 * redaction is opt-in / off by default (Hard Rule #20), so sanitizePII is a
 * pass-through here — the test pins the formatting logic, not PII behaviour.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  asRecord,
  toNumber,
  toStringOrNull,
  truncateText,
  parseInlineError,
  normalizeDetailState,
  toStoredErrorSummary,
  buildRequestSummary,
} from "../../src/lib/usage/callLogs/format.ts";

describe("callLogs/format — coercers", () => {
  it("asRecord keeps plain objects, rejects arrays/primitives/null", () => {
    const o = { a: 1 };
    assert.equal(asRecord(o), o);
    assert.deepEqual(asRecord([1, 2]), {});
    assert.deepEqual(asRecord("x"), {});
    assert.deepEqual(asRecord(null), {});
  });

  it("toNumber parses finite numbers and numeric strings, else 0", () => {
    assert.equal(toNumber(5), 5);
    assert.equal(toNumber("42"), 42);
    assert.equal(toNumber("  7 "), 7);
    assert.equal(toNumber("abc"), 0);
    assert.equal(toNumber(Infinity), 0);
    assert.equal(toNumber(null), 0);
  });

  it("toStringOrNull keeps non-blank strings, else null", () => {
    assert.equal(toStringOrNull("hi"), "hi");
    assert.equal(toStringOrNull("   "), null);
    assert.equal(toStringOrNull(5), null);
  });

  it("truncateText slices only when over the limit", () => {
    assert.equal(truncateText("hello", 10), "hello");
    assert.equal(truncateText("hello", 3), "hel");
  });
});

describe("callLogs/format — parseInlineError", () => {
  it("returns null for non-string / blank", () => {
    assert.equal(parseInlineError(null), null);
    assert.equal(parseInlineError("  "), null);
  });
  it("parses valid JSON, falls back to the raw string on invalid JSON", () => {
    assert.deepEqual(parseInlineError('{"code":429}'), { code: 429 });
    assert.equal(parseInlineError("not json"), "not json");
  });
});

describe("callLogs/format — normalizeDetailState", () => {
  it("passes through the four known states", () => {
    for (const s of ["ready", "missing", "corrupt", "legacy-inline"]) {
      assert.equal(normalizeDetailState(s), s);
    }
  });
  it("maps anything else to 'none'", () => {
    assert.equal(normalizeDetailState("bogus"), "none");
    assert.equal(normalizeDetailState(undefined), "none");
  });
});

describe("callLogs/format — toStoredErrorSummary", () => {
  it("returns null for nullish error", () => {
    assert.equal(toStoredErrorSummary(null), null);
    assert.equal(toStoredErrorSummary(undefined), null);
  });
  it("stringifies a plain-text error (PII pass-through by default)", () => {
    assert.equal(toStoredErrorSummary("boom"), "boom");
  });
  it("JSON-stringifies an Error object's sanitized shape", () => {
    const out = toStoredErrorSummary(new Error("kaboom"));
    assert.equal(typeof out, "string");
    assert.ok(out.includes("kaboom"));
    assert.ok(out.includes("message"));
  });
});

describe("callLogs/format — buildRequestSummary", () => {
  it("returns null for non-search request types", () => {
    assert.equal(buildRequestSummary("chat", { query: "x" }), null);
    assert.equal(buildRequestSummary(null, { query: "x" }), null);
  });
  it("summarizes a search request's query + non-query/provider filters", () => {
    const out = buildRequestSummary("search", { query: "cats", provider: "p", topK: 5 });
    assert.equal(typeof out, "string");
    const parsed = JSON.parse(out);
    assert.equal(parsed.query, "cats");
    assert.deepEqual(parsed.filters, { topK: 5 });
    assert.equal("provider" in (parsed.filters ?? {}), false);
  });
  it("returns null when a search request carries no summarizable fields", () => {
    assert.equal(buildRequestSummary("search", {}), null);
    assert.equal(buildRequestSummary("search", { provider: "only" }), null);
  });
});

// ── host public API surface ──────────────────────────────────────────────────

const host = await import("../../src/lib/usage/callLogs.ts");

describe("callLogs.ts public API surface (10 functions)", () => {
  const expected = [
    "cleanupOrphanCallLogFiles",
    "cleanupOverflowCallLogFiles",
    "deleteCallLogsBefore",
    "exportCallLogsSince",
    "getCallLogById",
    "getCallLogs",
    "rotateCallLogs",
    "saveCallLog",
    "scheduleCallLogRotation",
    "trimCallLogsToMaxRows",
  ];
  for (const name of expected) {
    it(`exposes ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host`);
    });
  }
  it("loses no public function in the split", () => {
    const missing = expected.filter((n) => typeof host[n] !== "function");
    assert.deepEqual(missing, [], `missing: ${missing.join(", ")}`);
  });
});

describe("format.ts exports its helpers directly", () => {
  it("the moved helpers are functions on the leaf", async () => {
    const fmt = await import("../../src/lib/usage/callLogs/format.ts");
    for (const fn of [
      "asRecord",
      "toNumber",
      "sanitizeErrorForLog",
      "protectPipelinePayloads",
      "buildRequestSummary",
    ]) {
      assert.equal(typeof fmt[fn], "function", fn);
    }
  });
});
