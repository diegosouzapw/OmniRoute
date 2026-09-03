import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Source-level contract tests for the #7610 Grok Build paste-import UX.
// The modal must refuse bare JWT pastes and require full auth.json with refresh_token.

const here = dirname(fileURLToPath(import.meta.url));
const modalSource = readFileSync(join(here, "../../../src/shared/components/OAuthModal.tsx"), "utf8");
const parserSource = readFileSync(
  join(here, "../../../src/lib/oauth/utils/grokCliAuthJson.ts"),
  "utf8"
);

test("#7610: OAuthModal rejects bare Grok JWT paste instructions", () => {
  assert.match(modalSource, /parseGrokCliPasteToken/);
  assert.match(parserSource, /Do not paste only the JWT/);
  assert.match(parserSource, /full ~\/\.grok\/auth\.json/);
  assert.doesNotMatch(
    modalSource,
    /Paste your Grok Build JWT token from ~\/\.grok\/auth\.json \(the "key" field value\)/
  );
});

test("#7610: OAuthModal paste UI is auth.json-oriented for grok-cli", () => {
  // #9245 localized the hardcoded copy: the modal now renders i18n keys and the
  // English source strings live in oauthModal.* inside en.json.
  assert.match(modalSource, /tabImportAuthJson/);
  assert.match(modalSource, /grokAuthJsonDescription/);
  assert.match(modalSource, /grokAuthJsonPlaceholder/);
  assert.match(modalSource, /grokAuthJsonLabel/);

  const enMessages = readFileSync(join(here, "../../../src/i18n/messages/en.json"), "utf8");
  const oauthModal = (JSON.parse(enMessages) as { oauthModal: Record<string, string> }).oauthModal;
  assert.equal(oauthModal.tabImportAuthJson, "Import auth.json");
  assert.equal(oauthModal.grokAuthJsonLabel, "Grok Build auth.json");
  assert.match(oauthModal.grokAuthJsonDescription, /refresh_token/);
  assert.match(oauthModal.grokAuthJsonPlaceholder, /refresh_token/);
});
