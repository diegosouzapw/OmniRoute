import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function readRepoFile(relativePath: string): string {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readMessages(locale: string): Record<string, unknown> {
  return JSON.parse(readRepoFile(`src/i18n/messages/${locale}.json`)) as Record<string, unknown>;
}

function getMessage(messages: Record<string, unknown>, dottedKey: string): unknown {
  return dottedKey.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    return (value as Record<string, unknown>)[segment];
  }, messages);
}

const residualKeys = [
  "analytics.autoRoutingNoDataAvailable",
  "analytics.defaultVariantLabel",
  "stats.accountLabel",
  "stats.noAccountUsage",
  "requestLogger.detail.correlationIdValue",
  "requestLogger.detail.detailedPayloadInfo",
  "settings.oneproxyDescription",
  "settings.oneproxyClearAllConfirm",
  "settings.oneproxyGoogle",
  "settings.memorySkillsSkillsmpDescription",
  "settings.memorySkillsActiveProviderDescription",
  "settings.routingCcBridgeCatalogName",
  "settings.routingUnknownOpKind",
  "settings.routingInvalidJson",
  "settings.routingJsonEditorLabel",
  "settings.routingTransformsFootnote",
];

test("hardcoded UI residual keys exist in required catalogs", () => {
  for (const locale of ["en", "fr", "vi", "pt-BR"]) {
    const messages = readMessages(locale);
    for (const key of residualKeys) {
      assert.equal(typeof getMessage(messages, key), "string", `${locale}.${key} must exist`);
    }
  }
});

test("French and Vietnamese residual translations are complete", () => {
  for (const locale of ["fr", "vi"]) {
    const messages = readMessages(locale);
    for (const key of residualKeys) {
      const value = getMessage(messages, key) as string;
      assert.ok(!value.startsWith("__MISSING__:"), `${locale}.${key} must be translated`);
    }
  }
});

test("Oneproxy and SkillsMP messages preserve their runtime values", () => {
  const messages = readMessages("en");
  assert.equal(
    getMessage(messages, "settings.oneproxySyncSuccess"),
    "Synced {total} proxies ({added} new, {updated} updated)"
  );
  assert.equal(getMessage(messages, "settings.oneproxySyncFailed"), "Sync failed: {error}");
  assert.match(getMessage(messages, "settings.skillsmpApiKeyHintAfter") as string, /\{limit\}/);
});

test("request log dates follow the active locale without duplicating rotated account IDs", () => {
  const source = readRepoFile("src/shared/components/RequestLoggerDetail.tsx");
  assert.match(source, /const locale = useLocale\(\)/);
  assert.doesNotMatch(source, /toLocaleDateString\("pt-BR"\)/);
  assert.doesNotMatch(source, /toLocaleTimeString\("en-US"/);
  assert.doesNotMatch(
    source,
    /\}\)\}\s*\{formatConnectionId\(codexAccountRotation\.finalConnectionId\)\}/
  );
});
