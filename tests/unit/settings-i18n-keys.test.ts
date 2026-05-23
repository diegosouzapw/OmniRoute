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
const focusedPortugueseLocales = ["pt.json", "pt-BR.json"];
const focusedTranslatedPaths = [
  "providers",
  "cloudAgents",
  "webhooks",
  "oauthModal",
  "cursorAuthModal",
  "pricingModal",
  "proxyConfigModal",
  "proxyRegistry",
  "telemetry",
  "mitm",
  "combos.resetAware",
  "combos.resetAwareDesc",
  "combos.strategyGuide.reset-aware",
  "combos.strategyGuide.fill-first",
  "combos.strategyGuide.auto",
  "combos.strategyGuide.lkgp",
  "combos.strategyGuide.context-optimized",
  "combos.strategyRecommendations.reset-aware",
  "combos.strategyRecommendations.fill-first",
  "combos.strategyRecommendations.auto",
  "combos.strategyRecommendations.lkgp",
  "combos.strategyRecommendations.context-optimized",
  "combos.strategyRecommendations.context-relay",
  "combos.strategyRecommendations.p2c",
  "combos.builderDuplicateExact",
  "combos.builderStagesDescription",
  "combos.builderStepsDescription",
  "combos.selectProvider",
  "combos.selectProviderPlaceholder",
  "combos.selectModel",
  "combos.selectModelPlaceholder",
  "combos.selectAccount",
  "combos.selectComboToReference",
  "combos.comboReference",
  "combos.addComboReference",
  "combos.addStepBeforeContinue",
  "combos.previewNextStep",
  "combos.autoSelectAccount",
  "combos.modePackBalanced",
  "combos.modePackBudget",
  "combos.modePackPerformance",
  "combos.modePackCustom",
  "combos.browseLegacyCatalog",
  "combos.agentFeaturesTitle",
  "combos.agentFeaturesDescription",
  "combos.agentFeaturesSystemMessageOverride",
  "combos.agentFeaturesSystemMessagePlaceholder",
  "combos.agentFeaturesSystemMessageHint",
  "combos.agentFeaturesToolFilterRegex",
  "combos.agentFeaturesToolFilterHint",
  "combos.agentFeaturesContextCacheHint",
  "combos.agentFeaturesContextCacheProtection",
  "combos.agentFeaturesContextLength",
  "combos.agentFeaturesContextLengthPlaceholder",
  "combos.agentFeaturesContextLengthHint",
  "combos.agentFeaturesContextLengthErrorInteger",
  "combos.agentFeaturesContextLengthErrorRange",
];

function getPathValue(source: Record<string, unknown>, targetPath: string): unknown {
  return targetPath.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, source);
}

function collectMissingPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return value.startsWith("__MISSING__:") ? [prefix] : [];
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    collectMissingPaths(nested, prefix ? `${prefix}.${key}` : key)
  );
}

test("settings translations include LKGP and maintenance keys in English and Simplified Chinese", () => {
  for (const key of requiredSettingsKeys) {
    assert.equal(typeof en.settings?.[key], "string", `en.settings.${key} should exist`);
    assert.equal(typeof zhCn.settings?.[key], "string", `zh-CN.settings.${key} should exist`);
  }
});

test("English sidebar translations include every configured sidebar item", () => {
  const sidebarKeys = new Set<string>();

  const visitSidebarNode = (node: unknown) => {
    if (!node || typeof node !== "object") return;

    const record = node as Record<string, unknown>;
    if (typeof record.titleKey === "string") sidebarKeys.add(record.titleKey);
    if (typeof record.i18nKey === "string") sidebarKeys.add(record.i18nKey);

    if (Array.isArray(record.items)) {
      for (const item of record.items) visitSidebarNode(item);
    }

    if (Array.isArray(record.children)) {
      for (const child of record.children) visitSidebarNode(child);
    }
  };

  for (const section of SIDEBAR_SECTIONS) {
    visitSidebarNode(section);
  }

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

test("pt and pt-BR do not expose __MISSING__ markers in focused dashboard namespaces", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");

  for (const file of focusedPortugueseLocales) {
    const messages = require(path.join(messagesDir, file));

    for (const targetPath of focusedTranslatedPaths) {
      const value = getPathValue(messages, targetPath);
      const missingPaths = collectMissingPaths(value, targetPath);
      assert.deepEqual(missingPaths, [], `${file}: ${targetPath} still has missing translations`);
    }
  }
});
