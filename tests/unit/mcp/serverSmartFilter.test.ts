import { test, before } from "node:test";
import assert from "node:assert/strict";
import { getMcpAccessibilityConfig, setMcpAccessibilityConfig } from "@/lib/db/compression";

before(async () => {
  // Reset to defaults before each test suite
  await setMcpAccessibilityConfig({
    enabled: true,
    maxTextChars: 50000,
    collapseThreshold: 30,
    collapseKeepHead: 10,
    collapseKeepTail: 5,
    minLengthToProcess: 2000,
  });
});

test("config defaults are returned when DB has default values", async () => {
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.enabled, true);
  assert.equal(cfg.maxTextChars, 50000);
  assert.equal(cfg.collapseThreshold, 30);
  assert.equal(cfg.collapseKeepHead, 10);
  assert.equal(cfg.collapseKeepTail, 5);
  assert.equal(cfg.minLengthToProcess, 2000);
});

test("setMcpAccessibilityConfig clamps invalid maxTextChars to default", async () => {
  await setMcpAccessibilityConfig({ maxTextChars: -1 });
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.maxTextChars, 50000);
});

test("setMcpAccessibilityConfig clamps invalid collapseThreshold to default", async () => {
  await setMcpAccessibilityConfig({ collapseThreshold: 0 });
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.collapseThreshold, 30);
});

test("setMcpAccessibilityConfig persists valid custom values", async () => {
  await setMcpAccessibilityConfig({ maxTextChars: 25000, collapseThreshold: 15 });
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.maxTextChars, 25000);
  assert.equal(cfg.collapseThreshold, 15);
});
