import test from "node:test";
import assert from "node:assert/strict";
import { ALL_TARGETS, resolveTarget } from "../../src/mitm/targets/index.ts";

test("resolveTarget — antigravity host resolves to antigravity target", () => {
  const t = resolveTarget("cloudcode-pa.googleapis.com");
  assert.ok(t);
  assert.equal(t?.id, "antigravity");
});

test("resolveTarget — kiro host resolves to kiro target (Anthropic)", () => {
  // api.anthropic.com is shared by kiro and claude-code; the first match wins.
  const t = resolveTarget("api.anthropic.com");
  assert.ok(t);
  assert.ok(t?.id === "kiro" || t?.id === "claude-code");
});

test("resolveTarget — copilot host resolves", () => {
  assert.equal(resolveTarget("api.githubcopilot.com")?.id, "copilot");
});

test("resolveTarget — cursor host resolves", () => {
  assert.equal(resolveTarget("api2.cursor.sh")?.id, "cursor");
});

test("resolveTarget — case-insensitive match", () => {
  assert.equal(resolveTarget("API.ZED.DEV")?.id, "zed");
});

test("resolveTarget — unknown host returns null", () => {
  assert.equal(resolveTarget("example.com"), null);
  assert.equal(resolveTarget(""), null);
});

test("ALL_TARGETS — registers exactly nine targets", () => {
  assert.equal(ALL_TARGETS.length, 9);
  const ids = new Set(ALL_TARGETS.map((t) => t.id));
  assert.equal(ids.size, 9);
  assert.ok(ids.has("antigravity"));
  assert.ok(ids.has("kiro"));
  assert.ok(ids.has("copilot"));
  assert.ok(ids.has("codex"));
  assert.ok(ids.has("cursor"));
  assert.ok(ids.has("zed"));
  assert.ok(ids.has("claude-code"));
  assert.ok(ids.has("open-code"));
  assert.ok(ids.has("trae"));
});

test("ALL_TARGETS — trae is marked viability=investigating", () => {
  const trae = ALL_TARGETS.find((t) => t.id === "trae");
  assert.equal(trae?.viability, "investigating");
});
