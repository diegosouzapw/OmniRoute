import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const { getPasteTokenCopyKeys } =
  await import("../../src/shared/components/oauthModal/pasteTokenCopy.ts");

const en = JSON.parse(fs.readFileSync("src/i18n/messages/en.json", "utf8")).oauthModal;

test("getPasteTokenCopyKeys_Claude_ReturnsSetupTokenCopy", () => {
  assert.deepEqual(getPasteTokenCopyKeys("claude"), {
    tab: "tabPasteSetupToken",
    description: "claudeSetupTokenDescription",
    placeholder: "claudeSetupTokenPlaceholder",
  });
});

test("getPasteTokenCopyKeys_ExistingProviders_KeepTheirPreviousCopy", () => {
  assert.deepEqual(getPasteTokenCopyKeys("grok-cli"), {
    tab: "tabImportAuthJson",
    description: "grokAuthJsonDescription",
    placeholder: "apiTokenPlaceholder",
  });
  assert.equal(getPasteTokenCopyKeys("devin-desktop").description, "devinDesktopPasteDescription");
  assert.deepEqual(getPasteTokenCopyKeys("devin-cli"), {
    tab: "tabPasteApiKey",
    description: "devinPasteDescription",
    placeholder: "apiTokenPlaceholder",
  });
});

test("getPasteTokenCopyKeys_EveryReturnedKey_ExistsInEnglishCatalog", () => {
  for (const provider of ["claude", "grok-cli", "devin-desktop", "devin-cli"]) {
    for (const key of Object.values(getPasteTokenCopyKeys(provider))) {
      assert.equal(typeof en[key], "string", `${provider}: oauthModal.${key} missing`);
    }
  }
});
