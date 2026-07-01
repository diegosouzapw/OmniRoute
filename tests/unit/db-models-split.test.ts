/**
 * Characterization tests for the db/models god-file decomposition (BLOCO E3).
 * The compat-overrides, model-alias, MITM-alias and shared helpers were lifted out
 * of src/lib/db/models.ts verbatim into cohesive leaf modules under db/models/.
 * These tests pin the behavior of the pure extracted helpers AND guard that the
 * host module still re-exports the full public API consumed across the codebase.
 *
 * (Behavioral DB-backed coverage of the moved CRUD/alias paths lives in the
 * existing db-models-crud / db-models-extended / db-model-aliases-cascade suites.)
 */
import test from "node:test";
import assert from "node:assert/strict";

import { asRecord, toNonEmptyString, getKeyValue } from "../../src/lib/db/models/shared.ts";
import {
  sanitizeUpstreamHeadersMap,
  isCompatProtocolKey,
  deepMergeCompatByProtocol,
  compatByProtocolHasEntries,
} from "../../src/lib/db/models/compat.ts";

test("shared: asRecord only unwraps plain objects", () => {
  assert.deepEqual(asRecord({ a: 1 }), { a: 1 });
  assert.deepEqual(asRecord(null), {});
  assert.deepEqual(asRecord([1, 2]), {});
  assert.deepEqual(asRecord("x"), {});
});

test("shared: toNonEmptyString trims and rejects blanks", () => {
  assert.equal(toNonEmptyString("  hi "), "hi");
  assert.equal(toNonEmptyString("   "), null);
  assert.equal(toNonEmptyString(""), null);
  assert.equal(toNonEmptyString(5), null);
});

test("shared: getKeyValue reads key/value strings only", () => {
  assert.deepEqual(getKeyValue({ key: "k", value: "v" }), { key: "k", value: "v" });
  assert.deepEqual(getKeyValue({ key: 1, value: null }), { key: null, value: null });
  assert.deepEqual(getKeyValue(undefined), { key: null, value: null });
});

test("compat: sanitizeUpstreamHeadersMap enforces structural validity", () => {
  assert.deepEqual(sanitizeUpstreamHeadersMap({ "X-Api-Key": "abc" }), { "X-Api-Key": "abc" });
  // names with whitespace or colon are dropped
  assert.deepEqual(sanitizeUpstreamHeadersMap({ "Bad Name": "v" }), {});
  assert.deepEqual(sanitizeUpstreamHeadersMap({ "bad:name": "v" }), {});
  // CRLF in value is rejected
  assert.deepEqual(sanitizeUpstreamHeadersMap({ "X-H": "a\r\nb" }), {});
  // null / non-object => empty
  assert.deepEqual(sanitizeUpstreamHeadersMap(null), {});
  // cap at 16 entries
  const many: Record<string, string> = {};
  for (let i = 0; i < 40; i++) many[`H-${i}`] = "v";
  assert.equal(Object.keys(sanitizeUpstreamHeadersMap(many)).length, 16);
});

test("compat: isCompatProtocolKey recognizes known protocol keys only", () => {
  assert.equal(isCompatProtocolKey("openai"), true);
  assert.equal(isCompatProtocolKey("definitely-not-a-protocol"), false);
});

test("compat: deepMergeCompatByProtocol + compatByProtocolHasEntries", () => {
  const merged = deepMergeCompatByProtocol(undefined, {
    openai: { normalizeToolCallId: true },
  });
  assert.equal(merged.openai?.normalizeToolCallId, true);
  assert.equal(compatByProtocolHasEntries(merged), true);
  assert.equal(compatByProtocolHasEntries(undefined), false);
  assert.equal(compatByProtocolHasEntries({}), false);
  // a later patch deep-merges without clobbering prior fields
  const merged2 = deepMergeCompatByProtocol(merged, {
    openai: { preserveOpenAIDeveloperRole: false },
  });
  assert.equal(merged2.openai?.normalizeToolCallId, true);
  assert.equal(merged2.openai?.preserveOpenAIDeveloperRole, false);
});

test("host db/models.ts preserves its full public API after the split", async () => {
  const host = (await import("../../src/lib/db/models.ts")) as Record<string, unknown>;
  // re-exported from leaves
  for (const name of [
    "sanitizeUpstreamHeadersMap",
    "getModelCompatOverrides",
    "mergeModelCompatOverride",
    "removeModelCompatOverride",
    "MODEL_COMPAT_PROTOCOL_KEYS",
    "getModelAliases",
    "setModelAlias",
    "deleteModelAlias",
    "deleteModelAliasesForProvider",
    "getMitmAlias",
    "setMitmAliasAll",
  ]) {
    assert.ok(host[name] !== undefined, `db/models must still export ${name}`);
  }
  // kept in host (custom / synced / flags)
  for (const name of [
    "getCustomModels",
    "getAllCustomModels",
    "addCustomModel",
    "replaceCustomModels",
    "removeCustomModel",
    "updateCustomModel",
    "getSyncedAvailableModels",
    "getAllSyncedAvailableModels",
    "replaceSyncedAvailableModelsForConnection",
    "getModelNormalizeToolCallId",
    "getModelPreserveOpenAIDeveloperRole",
    "getModelIsHidden",
    "getHiddenModelsByProvider",
    "getModelIsDeleted",
    "setModelIsHidden",
    "getModelUpstreamExtraHeaders",
  ]) {
    assert.equal(typeof host[name], "function", `db/models must still export ${name}`);
  }
});
