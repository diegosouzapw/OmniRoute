/**
 * tests/unit/radar-key-input.test.ts
 *
 * TDD guard for the paste-key input added to the Radar activation screen
 * (src/app/(dashboard)/dashboard/radar/page.tsx). Backend was already ready
 * (POST /api/radar/settings already accepted `supporterKey`) — this is the
 * missing last piece: an `<input>` on the activation screen so an operator
 * with a key in hand can paste it in, instead of calling the API directly.
 *
 * Structural, source-based — same style as radar-claim-buttons.test.ts —
 * deliberately avoids a full component render (no jsdom harness in this
 * repo's unit runner).
 *
 * Covers:
 *  - the page wires the pure isValidSupporterKeyFormat() helper and submits
 *    { optIn: true, supporterKey } together (pasting a key both activates
 *    opt-in AND sets the key, per spec: "o campo vai na PRÓPRIA tela de
 *    ativação, para desbloqueá-la");
 *  - the already-activated state shows the masked key (never the raw one)
 *    with a "change key" escape hatch;
 *  - the 4 new t("...") keys exist (non-empty, no price) in en.json and all
 *    43 locale files;
 *  - no OSS file mentions "freellmapi".
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const PAGE_PATH = path.resolve(
  process.cwd(),
  "src/app/(dashboard)/dashboard/radar/page.tsx"
);
const PAGE_SRC = fs.readFileSync(PAGE_PATH, "utf-8");

const NEW_KEYS = [
  "keySectionTitle",
  "keyInvalidFormatError",
  "activateWithKeyButton",
  "changeKeyButton",
];

test("radar page: imports and calls the shared isValidSupporterKeyFormat() helper", () => {
  assert.ok(
    PAGE_SRC.includes('from "@/lib/radar/supporterKey"'),
    "page must import the pure format-validation helper from src/lib/radar/supporterKey.ts"
  );
  assert.ok(
    PAGE_SRC.includes("isValidSupporterKeyFormat("),
    "page must call isValidSupporterKeyFormat() before submitting"
  );
});

test("radar page: submitting a pasted key sends optIn+supporterKey together", () => {
  const submitFn = PAGE_SRC.match(
    /const handleSubmitKey = useCallback\(async \(\) => \{[\s\S]*?\n {2}\}, \[[^\]]*\]\);/
  )?.[0];
  assert.ok(submitFn, "handleSubmitKey callback must exist");
  assert.ok(
    submitFn!.includes("/api/radar/settings"),
    "must POST to /api/radar/settings"
  );
  assert.ok(
    /optIn:\s*true/.test(submitFn!),
    "pasting a key must also opt in (unlocks the activation screen)"
  );
  assert.ok(
    /supporterKey:\s*trimmed/.test(submitFn!),
    "the trimmed pasted key must be sent as supporterKey"
  );
});

test("radar page: already-activated state shows the masked key, never displays a raw key", () => {
  assert.ok(
    PAGE_SRC.includes("supporterKeyMasked"),
    "page must track supporterKeyMasked state from GET /api/radar/settings"
  );
  assert.ok(
    PAGE_SRC.includes("hasSupporterKey"),
    "page must track hasSupporterKey state from GET /api/radar/settings"
  );
  // The only place a key VALUE renders is the masked one — the raw pasted
  // value only ever flows into the POST body (`trimmed`), never back onto
  // the screen as a rendered node.
  assert.ok(
    PAGE_SRC.includes("{supporterKeyMasked}"),
    "the masked key must be the value rendered when a key is already set"
  );
  assert.ok(
    !/\{keyInput\}[\s\S]{0,5}<\/span>/.test(PAGE_SRC),
    "the raw pasted input value must never be rendered as display text (only as a controlled <input> value)"
  );
});

test("radar page: 'change key' escape hatch exists to replace an already-set key", () => {
  assert.ok(
    PAGE_SRC.includes("setShowKeyForm(true)"),
    "a control must exist to reveal the paste form again to replace an existing key"
  );
  assert.ok(
    PAGE_SRC.includes(`t("changeKeyButton")`),
    "page.tsx must reference t(\"changeKeyButton\")"
  );
});

test("radar page: references the 4 new key-input t(...) keys", () => {
  for (const key of NEW_KEYS) {
    assert.ok(
      PAGE_SRC.includes(`t("${key}")`),
      `page.tsx must reference t("${key}")`
    );
  }
});

test("radar page + all 43 locale files: no price/monetary value in the key-input copy (D14)", () => {
  const PRICE_PATTERN = /\$\s?\d|R\$\s?\d|\d+[.,]\d{2}\s?(USD|BRL|EUR)|\b(lifetime|life-time)\b.{0,20}\$/i;
  assert.ok(!PRICE_PATTERN.test(PAGE_SRC), "page.tsx must not contain a price/monetary value");

  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 40, `expected ~43 locale files, found ${files.length}`);

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf-8"));
    const radarPage = data.radarPage as Record<string, unknown> | undefined;
    assert.ok(radarPage, `${file}: missing radarPage namespace`);
    for (const key of NEW_KEYS) {
      const value = radarPage![key];
      assert.equal(typeof value, "string", `${file}: radarPage.${key} must be a string`);
      assert.ok((value as string).length > 0, `${file}: radarPage.${key} is empty`);
      assert.ok(
        !value!.toString().startsWith("__MISSING__"),
        `${file}: radarPage.${key} must not be a __MISSING__ sentinel — use a real English fallback`
      );
      assert.ok(
        !PRICE_PATTERN.test(value as string),
        `${file}: radarPage.${key} must not contain a price/monetary value`
      );
    }
  }
});

test("no OSS file mentions the word 'freellmapi'", () => {
  const filesToCheck = [
    PAGE_PATH,
    path.resolve(process.cwd(), "src/lib/radar/supporterKey.ts"),
    path.resolve(process.cwd(), "src/app/api/radar/settings/route.ts"),
  ];
  for (const file of filesToCheck) {
    const src = fs.readFileSync(file, "utf-8");
    assert.ok(!/freellmapi/i.test(src), `${file} must not mention freellmapi`);
  }
});
