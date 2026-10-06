import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyRuntimeSettings,
  resetRuntimeSettingsStateForTests,
} from "../../src/lib/config/runtimeSettings";
import { getSystemPromptConfig } from "../../open-sse/services/systemPrompt.ts";

test.afterEach(() => {
  resetRuntimeSettingsStateForTests();
});

test("systemPrompt settings hot-reload updates globalThis in-memory config", async () => {
  const newSettings = {
    systemPrompt: {
      enabled: true,
      prefixPrompt: "Prefix rules for agent",
      suffixPrompt: "Suffix rules for agent",
    },
  };

  const changes = await applyRuntimeSettings(newSettings, { force: true, source: "test" });
  assert.ok(
    changes.some((c) => c.section === "systemPrompt"),
    "systemPrompt section must be reported as reloaded"
  );

  const cfg = getSystemPromptConfig();
  assert.equal(cfg.enabled, true, "systemPrompt enabled flag must be updated");
  assert.equal(
    cfg.prefixPrompt,
    "Prefix rules for agent",
    "prefixPrompt must match updated settings"
  );
  assert.equal(
    cfg.suffixPrompt,
    "Suffix rules for agent",
    "suffixPrompt must match updated settings"
  );

  // Hot-reload clearing systemPrompt
  await applyRuntimeSettings({ systemPrompt: null }, { force: true, source: "test" });
  const clearedCfg = getSystemPromptConfig();
  assert.equal(clearedCfg.enabled, false, "systemPrompt must be disabled when set to null");
  assert.equal(clearedCfg.prefixPrompt, "", "prefixPrompt must be cleared when set to null");
});
