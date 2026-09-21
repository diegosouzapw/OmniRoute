import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { claude } from "../../src/lib/oauth/providers/claude.ts";
import { codex } from "../../src/lib/oauth/providers/codex.ts";
import { github } from "../../src/lib/oauth/providers/github.ts";
import { gheCopilot } from "../../src/lib/oauth/providers/ghe-copilot.ts";
import { cursor } from "../../src/lib/oauth/providers/cursor.ts";

test("test 8: new OAuth mapTokens set autoSync true for L1 four", () => {
  const tokens = { access_token: "t", refresh_token: "r", expires_in: 3600, scope: "s" };
  assert.equal(claude.mapTokens(tokens, null).providerSpecificData.autoSync, true);
  assert.equal(codex.mapTokens(tokens, {}).providerSpecificData.autoSync, true);
  assert.equal(github.mapTokens(tokens, {}).providerSpecificData.autoSync, true);
  assert.equal(gheCopilot.mapTokens(tokens, {}).providerSpecificData.autoSync, true);
});

test("test 8: Claude mapTokens always emits providerSpecificData.autoSync even if bootstrap is empty", () => {
  const tokens = { access_token: "t", refresh_token: "r", expires_in: 3600, scope: "s" };
  const mapped = claude.mapTokens(tokens, null);
  assert.equal(mapped.providerSpecificData != null, true);
  assert.equal(mapped.providerSpecificData.autoSync, true);
});

test("test 8: cursor / grok-cli mapTokens stay without autoSync default", () => {
  const mapped = cursor.mapTokens({ accessToken: "t" });
  assert.equal(mapped.providerSpecificData.autoSync, undefined);
  const grokSrc = fs.readFileSync(
    path.join(process.cwd(), "src/lib/oauth/providers/grok-cli.ts"),
    "utf8",
  );
  assert.doesNotMatch(grokSrc, /autoSync:\s*true/);
});
