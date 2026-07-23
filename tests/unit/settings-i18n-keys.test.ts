import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");
const zhCn = require("../../src/i18n/messages/zh-CN.json");
const { SIDEBAR_SECTIONS, getSectionItems } =
  await import("../../src/shared/constants/sidebarVisibility.ts");

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

const resilienceTabSettingsKeys = [
  "scopeLabel",
  "triggerLabel",
  "effectLabel",
  "statusEnabled",
  "statusDisabled",
  "resilienceDefault",
  "resilienceRequestQueueTitle",
  "resilienceRequestQueueScope",
  "resilienceRequestQueueTrigger",
  "resilienceRequestQueueEffect",
  "resilienceRequestQueueDesc",
  "resilienceAutoEnableApiKeyProviders",
  "resilienceAutoEnableApiKeyProvidersDesc",
  "resilienceRequestsPerMinute",
  "resilienceMinTimeBetweenRequests",
  "resilienceConcurrentRequests",
  "resilienceMaxQueueWait",
  "resilienceConnectionCooldownTitle",
  "resilienceConnectionCooldownScope",
  "resilienceConnectionCooldownTrigger",
  "resilienceConnectionCooldownEffect",
  "resilienceConnectionCooldownDesc",
  "resilienceBaseCooldown",
  "resilienceUseUpstreamRetryHints",
  "resilienceUseUpstreamRetryHintsDesc",
  "resilienceUseUpstream429BreakerHints",
  "resilienceUseUpstream429BreakerHintsShort",
  "resilienceUseUpstream429BreakerHintsDesc",
  "resilienceDefaultPerProvider",
  "resilienceAlwaysOn",
  "resilienceAlwaysOff",
  "resilienceMaxBackoffSteps",
  "resilienceProviderBreakerTitle",
  "resilienceProviderBreakerScope",
  "resilienceProviderBreakerTrigger",
  "resilienceProviderBreakerEffect",
  "resilienceProviderBreakerDesc",
  "resilienceFailureThreshold",
  "resilienceResetTime",
  "resilienceWaitForCooldownTitle",
  "resilienceWaitForCooldownScope",
  "resilienceWaitForCooldownTrigger",
  "resilienceWaitForCooldownEffect",
  "resilienceWaitForCooldownDesc",
  "resilienceEnableServerWait",
  "resilienceEnableServerWaitDesc",
  "resilienceMaxAttempts",
  "resilienceMaxWaitPerAttempt",
];

const quotaShareResilienceSettingsMessages = {
  resilienceComboCooldownWaitTitle: "Quota-share combo cooldown wait",
  resilienceComboCooldownWaitDesc:
    "For quota-share combos only: wait out a short transient cooldown and re-dispatch instead of returning a 429 immediately. Never waits on quota_exhausted.",
  resilienceComboCooldownWaitToggleDesc: "Quota-share combos only; never waits on quota_exhausted.",
  resilienceComboCooldownMaxWaitMs: "Maximum wait per attempt",
  resilienceComboCooldownBudgetMs: "Total wait budget",
  resilienceQuotaShareConcurrencyTitle: "Quota-share per-connection concurrency",
  resilienceQuotaShareConcurrencyDesc:
    "For quota-share combos only: when a connection sets a Max Concurrent cap, serialize concurrent requests to that subscription account so it is never flooded past its ceiling. Excess requests wait in the queue instead of getting a 429. The cap comes from each connection's Max Concurrent field; this switch only enables or disables honoring it.",
  resilienceQuotaShareConcurrencyToggleDesc:
    "Quota-share combos only; honors each connection's Max Concurrent cap.",
};

const sourceScanSkipDirs = new Set([
  ".build",
  ".git",
  ".next",
  "coverage",
  "dist",
  "docs",
  "node_modules",
]);

function lookupMessage(messages, dottedKey) {
  let cursor = messages;
  for (const segment of dottedKey.split(".")) {
    if (
      !cursor ||
      typeof cursor !== "object" ||
      !Object.prototype.hasOwnProperty.call(cursor, segment)
    ) {
      return undefined;
    }
    cursor = cursor[segment];
  }
  return cursor;
}

function stripSourceComments(source) {
  return source.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)/g,
    (match) => (match.startsWith("//") || match.startsWith("/*") ? " ".repeat(match.length) : match)
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function walkSourceFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (sourceScanSkipDirs.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSourceFiles(absolute, files);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(absolute);
    }
  }
  return files;
}

function collectMissingEnglishDirectTranslationKeys() {
  const srcDir = path.resolve(process.cwd(), "src");
  const missing = [];

  for (const file of walkSourceFiles(srcDir)) {
    const raw = fs.readFileSync(file, "utf8");
    if (!raw.includes("useTranslations") && !raw.includes("getTranslations")) continue;

    const source = stripSourceComments(raw);
    const bindings = [];
    const bindingPattern =
      /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\s*\(\s*(?:["']([^"']*)["'])?\s*\)/g;
    for (const match of source.matchAll(bindingPattern)) {
      bindings.push({ varName: match[1], namespace: match[2] ?? "", position: match.index ?? 0 });
    }
    if (bindings.length === 0) continue;

    const variableAlternation = [...new Set(bindings.map((binding) => binding.varName))]
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join("|");
    const callPattern = new RegExp(
      String.raw`(?<![\w$.])(${variableAlternation})(?:\.(?:rich|markup|raw))?\s*\(\s*(["'])([^"'\\]*(?:\\.[^"'\\]*)*)\2`,
      "g"
    );

    for (const match of source.matchAll(callPattern)) {
      const beforeCall = source.slice(Math.max(0, (match.index ?? 0) - 25), match.index);
      if (/\.has\s*$/.test(beforeCall)) continue;

      const binding = [...bindings]
        .reverse()
        .find(
          (candidate) => candidate.varName === match[1] && candidate.position < (match.index ?? 0)
        );
      if (!binding) continue;

      const key = match[3].replace(/\\(['"\\])/g, "$1");
      const fullKey = binding.namespace ? `${binding.namespace}.${key}` : key;
      if (typeof lookupMessage(en, fullKey) === "string") continue;

      const relative = path.relative(process.cwd(), file);
      const line = raw.slice(0, match.index).split(/\r?\n/).length;
      missing.push(`${fullKey} (${relative}:${line})`);
    }
  }

  return missing;
}

const resilienceTabPortugueseFragments = [
  "Fila de Requisições",
  "Escopo:",
  "Gatilho:",
  "Efeito:",
  "Provedores API Key",
  "Ativado",
  "Desativado",
  "Aguardar Cooldown",
  "Tempo máximo de espera",
];

test("settings translations include LKGP and maintenance keys in English and Simplified Chinese", () => {
  for (const key of requiredSettingsKeys) {
    assert.equal(typeof en.settings?.[key], "string", `en.settings.${key} should exist`);
    assert.equal(typeof zhCn.settings?.[key], "string", `zh-CN.settings.${key} should exist`);
  }
});

test("English sidebar translations include every configured sidebar item", () => {
  // Collect section titleKeys and all flat item i18nKeys (getSectionItems flattens groups)
  const sidebarKeys = new Set(
    SIDEBAR_SECTIONS.flatMap((section) => [
      section.titleKey,
      ...getSectionItems(section).map((item) => item.i18nKey),
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

test("all locales include translated resilience tab labels", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of messageFiles) {
    const messages = require(path.join(messagesDir, file));

    for (const key of resilienceTabSettingsKeys) {
      const value = messages.settings?.[key];
      assert.equal(typeof value, "string", `${file}: settings.${key} should exist`);
      assert.ok(value.length > 0, `${file}: settings.${key} should not be empty`);
      assert.ok(!value.startsWith("__MISSING__:"), `${file}: settings.${key} should be translated`);
    }
  }
});

test("English includes quota-share resilience labels", () => {
  for (const [key, expected] of Object.entries(quotaShareResilienceSettingsMessages)) {
    assert.equal(en.settings?.[key], expected, `en.settings.${key} should render correctly`);
    assert.ok(!en.settings[key].startsWith("__MISSING__:"), `en.settings.${key} is not a marker`);
  }
});

test("direct translation scanner preserves slashes inside strings", () => {
  const source = [
    'const url = "https://example.com/a//b"; // strip this comment',
    "const text = 'literal // text';",
    "const template = `literal // template`;",
  ].join("\n");
  const stripped = stripSourceComments(source);

  assert.match(stripped, /https:\/\/example\.com\/a\/\/b/);
  assert.match(stripped, /literal \/\/ text/);
  assert.match(stripped, /literal \/\/ template/);
  assert.doesNotMatch(stripped, /strip this comment/);
});

test("direct translation calls have English messages", () => {
  const missing = collectMissingEnglishDirectTranslationKeys();
  assert.deepEqual(missing, []);
});

test("resilience tab text is sourced from i18n messages", () => {
  const sourcePath = path.resolve(
    process.cwd(),
    "src/app/(dashboard)/dashboard/settings/components/ResilienceTab.tsx"
  );
  const source = fs.readFileSync(sourcePath, "utf8");

  for (const fragment of resilienceTabPortugueseFragments) {
    assert.ok(!source.includes(fragment), `ResilienceTab.tsx should not hardcode ${fragment}`);
  }
});
