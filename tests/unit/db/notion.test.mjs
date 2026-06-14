import { test } from "node:test";
import assert from "node:assert";

test("notion DB module exports expected functions", async () => {
  const mod = await import("../../../src/lib/db/notion.ts");
  assert.equal(typeof mod.getNotionToken, "function");
  assert.equal(typeof mod.setNotionToken, "function");
  assert.equal(typeof mod.clearNotionToken, "function");
  assert.equal(typeof mod.getNotionConfig, "function");
});

test("getNotionConfig returns expected shape", async () => {
  const { getNotionConfig } = await import("../../../src/lib/db/notion.ts");
  const config = getNotionConfig();
  assert.ok(typeof config === "object");
  assert.ok("connected" in config);
  assert.ok("token" in config);
  assert.equal(typeof config.connected, "boolean");
});

test("setNotionToken and clearNotionToken are callable without DB", async () => {
  const { setNotionToken, clearNotionToken } = await import("../../../src/lib/db/notion.ts");
  assert.doesNotThrow(() => setNotionToken("test"));
  assert.doesNotThrow(() => clearNotionToken());
});
