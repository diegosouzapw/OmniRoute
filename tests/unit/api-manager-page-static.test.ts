import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pagePath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx"
);
const messagesDir = path.join(repoRoot, "src/i18n/messages");

const selfServiceScopeMessageKeys = [
  "selfServiceVisibility",
  "selfServiceVisibilityDesc",
  "ownUsageVisibility",
  "ownUsageVisibilityDesc",
  "sharedAccountQuotaVisibility",
  "sharedAccountQuotaVisibilityDesc",
];

function readApiManagerPage() {
  return fs.readFileSync(pagePath, "utf8");
}

test("permissions modal uses i18n for management access description", () => {
  const source = readApiManagerPage();
  const managementBlock = source.slice(
    source.indexOf("{/* Management Access */}", source.indexOf("const PermissionsModal")),
    source.indexOf("{/* Self-service Visibility */}", source.indexOf("const PermissionsModal"))
  );

  assert.match(managementBlock, /\{t\("managementAccessDesc"\)\}/);
  assert.doesNotMatch(managementBlock, /Allow this API key to manage OmniRoute configuration\./);
});

test("permissions modal converts API key expiration ISO timestamps to local datetime input values", () => {
  const source = readApiManagerPage();
  const expirationBlock = source.slice(
    source.indexOf("{/* Expiration Date */}", source.indexOf("const PermissionsModal")),
    source.indexOf("{/* Management Access */}", source.indexOf("const PermissionsModal"))
  );

  assert.match(expirationBlock, /value=\{toLocalDateTimeInputValue\(expiresAt\)\}/);
  assert.match(expirationBlock, /const date = new Date\(val\)/);
  assert.match(expirationBlock, /setExpiresAt\(date\.toISOString\(\)\)/);
  assert.match(expirationBlock, /onClick=\{\(\) => setExpiresAt\(""\)\}/);
  assert.match(expirationBlock, /\{tc\("clear"\)\}/);
  assert.doesNotMatch(expirationBlock, /expiresAt\.slice\(0, 16\)/);
});

test("permissions modal switch buttons declare button type", () => {
  const source = readApiManagerPage();
  const modalStart = source.indexOf("const PermissionsModal");
  const visibilityStart = source.indexOf("{/* Self-service Visibility */}", modalStart);
  const visibilityEnd = source.indexOf("{/* Selected Models Summary", visibilityStart);
  const selfServiceBlock = source.slice(visibilityStart, visibilityEnd);
  const switchButtonCount = (selfServiceBlock.match(/role="switch"/g) ?? []).length;
  const typedSwitchButtonCount = (
    selfServiceBlock.match(/<button\s+type="button"\s+role="switch"/g) ?? []
  ).length;

  // Self-service Visibility block has 3 switches: own-usage visibility,
  // shared-account quota visibility, and disable-non-public-models (#3041).
  // The invariant is that every switch declares type="button"
  // (typedSwitchButtonCount === switchButtonCount) to avoid implicit submit.
  assert.equal(switchButtonCount, 3);
  assert.equal(typedSwitchButtonCount, 3);
});

test("self-service API key scope labels do not expose missing placeholders", () => {
  const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of messageFiles) {
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8"));

    for (const key of selfServiceScopeMessageKeys) {
      const value = messages.apiManager?.[key];

      assert.equal(typeof value, "string", `${file}: apiManager.${key} should exist`);
      assert.ok(value.length > 0, `${file}: apiManager.${key} should not be empty`);
      assert.ok(
        !value.startsWith("__MISSING__:"),
        `${file}: apiManager.${key} should not expose a missing placeholder`
      );
    }
  }
});
