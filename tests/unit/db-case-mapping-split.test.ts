// Characterization of the db/core.ts column-mapping split (god-file decomposition): the pure
// snake_case ↔ camelCase row helpers moved into db/caseMapping.ts. Behavior-preserving move — these
// locks pin the conversion semantics (boolean coercion for known flag columns, JSON parsing for
// providerSpecificData + `_json` TEXT columns, null-stripping) and that core.ts still re-exports them
// for the historical `from "./core"` import surface.
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../src/lib/db/caseMapping.ts");
const CORE = await import("../../src/lib/db/core.ts");

test("module exposes the five mapping helpers", () => {
  for (const name of ["toSnakeCase", "toCamelCase", "objToSnake", "rowToCamel", "cleanNulls"]) {
    assert.equal(typeof (M as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("core.ts re-exports the same helpers (historical surface preserved)", () => {
  for (const name of ["toSnakeCase", "toCamelCase", "objToSnake", "rowToCamel", "cleanNulls"]) {
    assert.equal((CORE as Record<string, unknown>)[name], (M as Record<string, unknown>)[name]);
  }
});

test("toSnakeCase / toCamelCase round-trip column names", () => {
  assert.equal(M.toSnakeCase("maxRequestsPerDay"), "max_requests_per_day");
  assert.equal(M.toCamelCase("max_requests_per_day"), "maxRequestsPerDay");
});

test("objToSnake converts keys, passes non-objects through", () => {
  assert.deepEqual(M.objToSnake({ providerId: "x", isActive: 1 }), {
    provider_id: "x",
    is_active: 1,
  });
  assert.equal(M.objToSnake(null), null);
  assert.equal(M.objToSnake("str"), "str");
});

test("rowToCamel coerces known boolean flags from 0/1", () => {
  const out = M.rowToCamel({ is_active: 1, proxy_enabled: 0, per_key_proxy_enabled: 1 });
  assert.equal(out?.isActive, true);
  assert.equal(out?.proxyEnabled, false);
  assert.equal(out?.perKeyProxyEnabled, true);
  assert.equal(M.rowToCamel(null), null);
});

test("rowToCamel parses providerSpecificData JSON string", () => {
  const out = M.rowToCamel({ provider_specific_data: '{"a":1}' });
  assert.deepEqual(out?.providerSpecificData, { a: 1 });
  // invalid JSON falls back to the raw string
  const bad = M.rowToCamel({ provider_specific_data: "not json" });
  assert.equal(bad?.providerSpecificData, "not json");
});

test("rowToCamel unwraps `_json` columns to the base key", () => {
  const out = M.rowToCamel({ quota_window_thresholds_json: '{"hi":80}' });
  assert.deepEqual(out?.quotaWindowThresholds, { hi: 80 });
  assert.equal("quotaWindowThresholdsJson" in (out ?? {}), false);
  // NULL `_json` column normalizes the base key to null
  const nul = M.rowToCamel({ quota_window_thresholds_json: null });
  assert.equal(nul?.quotaWindowThresholds, null);
});

test("cleanNulls drops null/undefined, keeps falsy-but-present values", () => {
  assert.deepEqual(M.cleanNulls({ a: 0, b: "", c: null, d: undefined, e: false }), {
    a: 0,
    b: "",
    e: false,
  });
  assert.deepEqual(M.cleanNulls(null), {});
});
