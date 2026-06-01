import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { detectAgent, DETECTORS } from "../../src/mitm/detection/index.ts";
import type { AgentId } from "../../src/mitm/types.ts";

test("DETECTORS — provides an entry for every AgentId", () => {
  const ids: AgentId[] = [
    "antigravity",
    "kiro",
    "copilot",
    "codex",
    "cursor",
    "zed",
    "claude-code",
    "open-code",
    "trae",
  ];
  for (const id of ids) {
    assert.equal(typeof DETECTORS[id], "function", `missing detector for ${id}`);
  }
});

test("detectAgent — trae always reports not installed (investigating)", () => {
  const r = detectAgent("trae");
  assert.equal(r.installed, false);
});

test("detectAgent — returns installed=true when fs.existsSync hits a known path", () => {
  // Inject a mock existsSync that returns true for every probed path so the
  // dispatch path is exercised regardless of host environment.
  const original = fs.existsSync;
  let called = 0;
  (fs as unknown as { existsSync: (p: fs.PathLike) => boolean }).existsSync = () => {
    called++;
    return true;
  };
  try {
    // antigravity uses pure existsSync probes — first hit wins.
    const r = detectAgent("antigravity");
    assert.equal(r.installed, true);
    assert.equal(typeof r.path, "string");
  } finally {
    (fs as unknown as { existsSync: typeof fs.existsSync }).existsSync = original;
  }
  assert.ok(called >= 1);
});

test("detectAgent — antigravity probe returns DetectionResult shape", () => {
  const r = detectAgent("antigravity");
  assert.equal(typeof r.installed, "boolean");
  if (r.installed) assert.equal(typeof r.path, "string");
});

test("detectAgent — gracefully handles thrown detectors", () => {
  // Unknown id falls through to default false branch.
  const r = detectAgent("nonexistent" as AgentId);
  assert.equal(r.installed, false);
});

test("detectAgent — runs all detectors without throwing", () => {
  const ids: AgentId[] = [
    "antigravity",
    "kiro",
    "copilot",
    "codex",
    "cursor",
    "zed",
    "claude-code",
    "open-code",
    "trae",
  ];
  for (const id of ids) {
    const r = detectAgent(id);
    assert.equal(typeof r.installed, "boolean");
  }
});
