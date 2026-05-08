import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");
const zhCn = require("../../src/i18n/messages/zh-CN.json");
const { SIDEBAR_SECTIONS } = await import("../../src/shared/constants/sidebarVisibility.ts");

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

const requestBodyLimitSettingsKeys = [
  "requestBodyLimitTitle",
  "requestBodyLimitDescription",
  "requestBodyLimitInputLabel",
  "requestBodyLimitEmptyError",
  "requestBodyLimitWholeNumberError",
  "requestBodyLimitMinimumError",
  "requestBodyLimitMaximumError",
  "requestBodyLimitLoadFailed",
  "requestBodyLimitSaveSuccess",
  "requestBodyLimitSaveFailed",
  "requestBodyLimitSaving",
  "requestBodyLimitSave",
  "requestBodyLimitCurrent",
];

const proxyPageSettingsKeys = ["httpProxy", "1proxy", "proxySubTabsAria"];

test("settings translations include LKGP and maintenance keys in English and Simplified Chinese", () => {
  for (const key of requiredSettingsKeys) {
    assert.equal(typeof en.settings?.[key], "string", `en.settings.${key} should exist`);
    assert.equal(typeof zhCn.settings?.[key], "string", `zh-CN.settings.${key} should exist`);
  }
});

test("English sidebar translations include every configured sidebar item", () => {
  const sidebarKeys = new Set(
    SIDEBAR_SECTIONS.flatMap((section) => [
      section.titleKey,
      ...section.items.map((item) => item.i18nKey),
    ])
  );

  for (const key of sidebarKeys) {
    assert.equal(typeof en.sidebar?.[key], "string", `en.sidebar.${key} should exist`);
  }
});

test("all locales include the proxy sidebar label", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of messageFiles) {
    const messages = require(path.join(messagesDir, file));

    assert.equal(typeof messages.sidebar?.proxy, "string", `${file}: sidebar.proxy should exist`);
  }
});

test("all locales include request body limit settings labels", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of messageFiles) {
    const messages = require(path.join(messagesDir, file));

    for (const key of requestBodyLimitSettingsKeys) {
      assert.equal(
        typeof messages.settings?.[key],
        "string",
        `${file}: settings.${key} should exist`
      );
    }
  }
});

test("all locales include proxy page tab labels", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of messageFiles) {
    const messages = require(path.join(messagesDir, file));

    for (const key of proxyPageSettingsKeys) {
      assert.equal(
        typeof messages.settings?.[key],
        "string",
        `${file}: settings.${key} should exist`
      );
    }
  }
});
