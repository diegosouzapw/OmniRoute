import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function readSrc(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function assertInOrder(source: string, labels: string[]) {
  let lastIndex = -1;
  for (const label of labels) {
    const index = source.indexOf(label);
    assert.notEqual(index, -1, `Expected to find ${label}`);
    assert.ok(index > lastIndex, `Expected ${label} to appear after previous marker`);
    lastIndex = index;
  }
}

test("Appearance page keeps theme color above branding and removes sidebar item controls", () => {
  const source = readSrc("src/app/(dashboard)/dashboard/settings/components/AppearanceTab.tsx");

  assert.doesNotMatch(source, /SidebarVisibilitySetting/);
  assertInOrder(source, ['t("themeAccent")', 't("whitelabeling")']);
});

test("Usage Token Buffer lives in AI settings instead of General storage", () => {
  const aiPage = readSrc("src/app/(dashboard)/dashboard/settings/ai/page.tsx");
  const generalStorage = readSrc(
    "src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx"
  );

  assert.match(aiPage, /UsageTokenBufferTab/);
  assert.doesNotMatch(generalStorage, /storageUsageTokenBuffer/);
});

test("Storage settings page uses the requested section order", () => {
  const source = readSrc("src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx");

  assertInOrder(source, [
    't("databasePath")',
    "{renderDatabaseStatistics()}",
    't("export")',
    't("maintenance")',
    't("lastBackup")',
    "{renderRetentionSettings()}",
    "{renderOptimizationSettings()}",
    "{renderCompressionAggregationSettings()}",
  ]);
  assert.doesNotMatch(source, /debugToggle/);
});

test("Debug mode moved to the top of Advanced settings", () => {
  const advancedPage = readSrc("src/app/(dashboard)/dashboard/settings/advanced/page.tsx");

  assertInOrder(advancedPage, ["<DebugModeCard", "<PayloadRulesTab"]);
});

test("Log Tool Sources toggle is mounted in Advanced settings next to Debug mode", () => {
  const advancedPage = readSrc("src/app/(dashboard)/dashboard/settings/advanced/page.tsx");

  assertInOrder(advancedPage, ["<DebugModeCard", "<LogToolSourcesCard", "<PayloadRulesTab"]);

  const card = readSrc(
    "src/app/(dashboard)/dashboard/settings/components/LogToolSourcesCard.tsx"
  );
  assert.match(card, /t\("logToolSourcesToggle"\)/);
  assert.match(card, /t\("logToolSourcesDescription"\)/);
  assert.match(card, /logToolSources: value/);

  const schema = readSrc("src/shared/validation/settingsSchemas.ts");
  assert.match(schema, /logToolSources: z\.boolean\(\)\.optional\(\)/);

  const en = readSrc("src/i18n/messages/en.json");
  assert.match(en, /"logToolSourcesToggle": "Log Tool Sources"/);
});

test("Proxy Logs table uses the same blue row hover emphasis as Logs", () => {
  const proxyLogger = readSrc("src/shared/components/ProxyLogger.tsx");
  const requestLogger = readSrc("src/shared/components/RequestLoggerV2.tsx");

  assert.match(proxyLogger, /hover:bg-sky-500\/10 dark:hover:bg-sky-400\/10/);
  assert.match(requestLogger, /hover:bg-sky-500\/10 dark:hover:bg-sky-400\/10/);
  assert.doesNotMatch(proxyLogger, /hover:bg-primary\/5/);
});

test("General settings navigation is labeled Storage in English", () => {
  const en = readSrc("src/i18n/messages/en.json");

  assert.match(en, /"settingsGeneral": "Storage"/);
  assert.match(en, /"systemStorage": "Storage"/);
});

test("Global Routing page renders top-level modules in the requested order", () => {
  const page = readSrc("src/app/(dashboard)/dashboard/settings/routing/page.tsx");
  const routingTab = readSrc("src/app/(dashboard)/dashboard/settings/components/RoutingTab.tsx");

  assertInOrder(page, [
    "<RoutingStrategyCard",
    "<ComboDefaultsTab",
    "<ModelAliasesUnified",
    "<FallbackChainsEditor",
    "<ModelRoutingSection",
    "<RoutingTab",
    "<BackgroundDegradationTab",
  ]);

  assertInOrder(routingTab, [
    't("routingZeroConfigTitle")',
    't("systemTransforms")',
    't("cliFingerprint")',
    't("routingClientCacheControlTitle")',
    't("routingAntigravitySignatureTitle")',
    't("lkgpToggleTitle")',
    't("adaptiveVolumeRouting")',
  ]);
});
