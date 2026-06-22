import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeVscDbValue,
  extractCursorTokensFromRows,
  fuzzyExtractCursorTokensFromRows,
  cursorDbCandidatePaths,
} from "../../src/app/api/oauth/cursor/auto-import/route";

describe("normalizeVscDbValue", () => {
  it("unwraps a JSON-encoded string", () => {
    assert.equal(normalizeVscDbValue('"abc"'), "abc");
  });

  it("returns the raw string when JSON parse fails", () => {
    assert.equal(normalizeVscDbValue("not-json"), "not-json");
  });

  it("returns the raw string when JSON parses to non-string", () => {
    assert.equal(normalizeVscDbValue("123"), "123");
    assert.equal(normalizeVscDbValue("{}"), "{}");
  });

  it("passes non-strings through unchanged", () => {
    assert.equal(normalizeVscDbValue(42 as unknown as string), 42);
    assert.equal(normalizeVscDbValue(null as unknown as string), null);
  });
});

describe("extractCursorTokensFromRows", () => {
  it("extracts tokens using exact primary keys", () => {
    const tokens = extractCursorTokensFromRows([
      { key: "cursorAuth/accessToken", value: "tok-1" },
      { key: "storage.serviceMachineId", value: "machine-1" },
    ]);
    assert.equal(tokens.accessToken, "tok-1");
    assert.equal(tokens.machineId, "machine-1");
  });

  it("accepts the alternative `cursorAuth/token` key", () => {
    const tokens = extractCursorTokensFromRows([
      { key: "cursorAuth/token", value: "tok-2" },
      { key: "storage.machineId", value: "machine-2" },
    ]);
    assert.equal(tokens.accessToken, "tok-2");
    assert.equal(tokens.machineId, "machine-2");
  });

  it("accepts the alternative `telemetry.machineId` key", () => {
    const tokens = extractCursorTokensFromRows([
      { key: "cursorAuth/accessToken", value: "tok-3" },
      { key: "telemetry.machineId", value: "machine-3" },
    ]);
    assert.equal(tokens.machineId, "machine-3");
  });

  it("prefers the first match and ignores duplicates", () => {
    const tokens = extractCursorTokensFromRows([
      { key: "cursorAuth/accessToken", value: "first" },
      { key: "cursorAuth/token", value: "second" },
    ]);
    assert.equal(tokens.accessToken, "first");
  });

  it("normalizes JSON-encoded values", () => {
    const tokens = extractCursorTokensFromRows([
      { key: "cursorAuth/accessToken", value: '"json-token"' },
      { key: "storage.serviceMachineId", value: '"json-machine"' },
    ]);
    assert.equal(tokens.accessToken, "json-token");
    assert.equal(tokens.machineId, "json-machine");
  });

  it("returns empty on no matches", () => {
    const tokens = extractCursorTokensFromRows([{ key: "irrelevant", value: "x" }]);
    assert.equal(tokens.accessToken, undefined);
    assert.equal(tokens.machineId, undefined);
  });
});

describe("fuzzyExtractCursorTokensFromRows", () => {
  it("matches keys by substring containing `accesstoken` and `machineid`", () => {
    const tokens = fuzzyExtractCursorTokensFromRows([
      { key: "cursorAuth/someOtherAccessTokenKey", value: "fallback-token" },
      { key: "storage.someMachineId", value: "fallback-machine" },
    ]);
    assert.equal(tokens.accessToken, "fallback-token");
    assert.equal(tokens.machineId, "fallback-machine");
  });

  it("preserves already-found tokens (passes existing through)", () => {
    const tokens = fuzzyExtractCursorTokensFromRows(
      [
        { key: "cursorAuth/someOtherAccessTokenKey", value: "fallback-token" },
        { key: "storage.someMachineId", value: "fallback-machine" },
      ],
      { accessToken: "already-have-it" }
    );
    assert.equal(tokens.accessToken, "already-have-it");
    assert.equal(tokens.machineId, "fallback-machine");
  });

  it("is case-insensitive on the key match", () => {
    const tokens = fuzzyExtractCursorTokensFromRows([
      { key: "Some.ACCESSTOKEN.suffix", value: "tok" },
      { key: "Some.MACHINEID.suffix", value: "mid" },
    ]);
    assert.equal(tokens.accessToken, "tok");
    assert.equal(tokens.machineId, "mid");
  });
});

describe("cursorDbCandidatePaths", () => {
  it("returns standard + Insiders paths on macOS", () => {
    const paths = cursorDbCandidatePaths("darwin", { home: "/Users/test" });
    assert.equal(paths.length, 2);
    assert.ok(paths[0].includes("Cursor/User/globalStorage/state.vscdb"));
    assert.ok(paths[1].includes("Cursor - Insiders/User/globalStorage/state.vscdb"));
  });

  it("returns a single path on Linux", () => {
    const paths = cursorDbCandidatePaths("linux", { home: "/home/test" });
    assert.deepEqual(paths, [
      "/home/test/.config/Cursor/User/globalStorage/state.vscdb",
    ]);
  });

  it("returns a single path on Windows using APPDATA", () => {
    const paths = cursorDbCandidatePaths("win32", {
      home: "C:/Users/test",
      appdata: "C:/Users/test/AppData/Roaming",
    });
    assert.equal(paths.length, 1);
    assert.ok(paths[0].includes("Cursor/User/globalStorage/state.vscdb"));
  });

  it("returns empty array for unsupported platforms", () => {
    assert.deepEqual(cursorDbCandidatePaths("freebsd" as NodeJS.Platform, { home: "/x" }), []);
  });
});
