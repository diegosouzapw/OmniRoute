import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");
const zhCn = require("../../src/i18n/messages/zh-CN.json");

const requiredSettingsKeys = [
  "adaptiveVolumeRouting",
  "adaptiveVolumeRoutingDesc",
  "lkgpToggleTitle",
  "lkgpToggleDesc",
  "clearLkgpCache",
  "lkgpCacheCleared",
  "lkgpCacheClearFailed",
  "maintenance",
  "cacheCleared",
  "clearCacheFailed",
  "purgeExpiredLogs",
  "purgeLogsFailed",
];

test("settings translations include LKGP and maintenance keys in English and Simplified Chinese", () => {
  for (const key of requiredSettingsKeys) {
    assert.equal(typeof en.settings?.[key], "string", `en.settings.${key} should exist`);
    assert.equal(typeof zhCn.settings?.[key], "string", `zh-CN.settings.${key} should exist`);
  }
});
