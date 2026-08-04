import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";

const ROOT = new URL("../..", import.meta.url).pathname;

const { resolveMcpEntry } = await import("../../bin/mcp-server.mjs");

describe("resolveMcpEntry (#MCP — dist/ path resolution)", () => {
  const FAKE_ROOT = "/fake/omniroute";

  it("returns dist/open-sse/mcp-server/server.js when it exists", () => {
    const distJs = join(FAKE_ROOT, "dist", "open-sse", "mcp-server", "server.js");
    const existsSyncFn = (p: string) => p === distJs;
    const result = resolveMcpEntry(FAKE_ROOT, existsSyncFn);
    assert.equal(result, distJs, "should prefer the compiled dist/ JS entry");
  });

  it("falls back to open-sse/mcp-server/server.ts when dist JS is absent", () => {
    const tsFallback = join(FAKE_ROOT, "open-sse", "mcp-server", "server.ts");
    const existsSyncFn = (p: string) => p === tsFallback;
    const result = resolveMcpEntry(FAKE_ROOT, existsSyncFn);
    assert.equal(result, tsFallback, "should fall back to the TS source entry");
  });

  it("returns null when neither entry exists", () => {
    const existsSyncFn = (_p: string) => false;
    const result = resolveMcpEntry(FAKE_ROOT, existsSyncFn);
    assert.equal(result, null, "should return null when no entry is found");
  });

  it("checks the dist/ candidate before the open-sse/ fallback", () => {
    const checked: string[] = [];
    const existsSyncFn = (p: string) => {
      checked.push(p);
      return true;
    };
    const result = resolveMcpEntry(FAKE_ROOT, existsSyncFn);
    assert.ok(result!.endsWith("server.js"), "should return the first (dist/) match");
    assert.equal(checked.length, 1, "should only call existsSync once when first candidate exists");
  });

  it("checks both candidates when neither exists", () => {
    const checked: string[] = [];
    const existsSyncFn = (p: string) => {
      checked.push(p);
      return false;
    };
    resolveMcpEntry(FAKE_ROOT, existsSyncFn);
    assert.equal(checked.length, 2, "should check both candidates before returning null");
    assert.ok(checked[0].includes("dist"), "first check should be dist/ path");
    assert.ok(checked[1].includes("open-sse"), "second check should be open-sse/ fallback");
  });

  it("only checks paths inside the given rootDir", () => {
    const checked: string[] = [];
    const existsSyncFn = (p: string) => {
      checked.push(p);
      return false;
    };
    resolveMcpEntry(FAKE_ROOT, existsSyncFn);
    for (const path of checked) {
      assert.ok(
        path.startsWith(FAKE_ROOT),
        `checked path "${path}" should be inside rootDir "${FAKE_ROOT}"`
      );
    }
  });

  it("uses the real existsSync when no mock is provided (real filesystem)", () => {
    const result = resolveMcpEntry(ROOT);
    if (result) {
      assert.ok(
        result.endsWith("server.js") || result.endsWith("server.ts"),
        `resolved path "${result}" should end with server.js or server.ts`
      );
    } else {
      assert.equal(result, null, "should return null if no entry exists at the real root");
    }
  });
});
