import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const messages = JSON.parse(
  fs.readFileSync(new URL("../../../src/i18n/messages/en.json", import.meta.url), "utf8")
) as { settings?: Record<string, unknown> };

test("English settings catalog contains every Audio Bridge UI string", () => {
  const expected = [
    "modalityBridgeAudioTitle",
    "modalityBridgeAudioDesc",
    "modalityBridgeAudioEnabled",
    "modalityBridgeAudioEnabledDesc",
    "modalityBridgeAudioModel",
    "modalityBridgeAudioModelAuto",
    "modalityBridgeAudioMaxClips",
    "modalityBridgeAudioTestButton",
    "modalityBridgeAudioTestRunning",
    "modalityBridgeAudioTestOk",
    "modalityBridgeAudioTestNoop",
    "modalityBridgeAudioTestError",
  ];

  for (const key of expected) {
    assert.equal(typeof messages.settings?.[key], "string", `settings.${key}`);
  }
});
