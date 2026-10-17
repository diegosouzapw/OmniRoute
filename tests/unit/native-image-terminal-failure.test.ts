import assert from "node:assert/strict";
import test from "node:test";
import { resolve, relative } from "node:path";
import "../_setup/nativeImageState.ts";

const workspace = resolve(".ci-work");
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA"]) {
  const value = process.env[key];
  assert.ok(value, `isolated ${key} required before imports`);
  const path = relative(workspace, resolve(value));
  assert.ok(path && !path.startsWith("..") && !resolve(value).includes("omniroute-data"));
}
const { runImageComboTargets } = await import("../../open-sse/services/imageCombo.ts");
const core = await import("../../src/lib/db/core.ts");
const { executeImageWithCredentialFallback } =
  await import("../../src/sse/services/imageCredentialRetry.ts");
test.after(() => core.resetDbInstance());

test(
  "image combos stop after a terminal submitted failure without another model",
  { timeout: 2000 },
  async () => {
    for (const status of [429, 502, 504]) {
      let calls = 0;
      const result = await runImageComboTargets([{ modelStr: "first" }, { modelStr: "second" }], {
        resolveProvider: () => ({ provider: "fixture", model: "fixture-model" }),
        resolveCredentials: async () => ({ connectionId: "fixture" }),
        isRateLimited: () => false,
        dispatch: async () => {
          calls++;
          return { success: false, status, error: "fixture outcome unknown", retryable: false };
        },
      });
      assert.equal(result.outcome, "terminal");
      assert.equal(calls, 1);
    }
  }
);

test(
  "explicit terminal image failure does not rotate the selected account",
  { timeout: 2000 },
  async () => {
    let calls = 0;
    let selections = 0;
    const result = await executeImageWithCredentialFallback({
      provider: "codex",
      requestedModel: "codex/gpt-image-2",
      credentials: { connectionId: "fixture-first", accessToken: "fixture-token" },
      execute: async () => {
        calls++;
        return { success: false, status: 401, error: "fixture failure", retryable: false };
      },
      selectNextCredentials: async () => {
        selections++;
        return null;
      },
    });
    assert.equal(result.result.success, false);
    assert.equal(calls, 1);
    assert.equal(selections, 0);
  }
);
