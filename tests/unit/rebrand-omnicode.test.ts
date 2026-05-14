import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");

const I18N_DIR = path.resolve(import.meta.dirname ?? "tests/unit", "..", "..", "src/i18n/messages");

// Technical identifiers that the rebrand pass MUST preserve in EVERY locale.
// Each appears verbatim in code (CLI invocation, default API key fallback,
// vector collection name) and in user-facing setup hints; rewriting them
// would break runtime code paths.
const PRESERVED_TECHNICAL_STRINGS_ALL_LOCALES = [
  "sk_omniroute",
  "omniroute --mcp",
  "omniroute_memory",
];

// Tool names referenced in en.json help text (MCP step examples). Locales
// may omit these depending on translation choices, so only en.json is
// asserted — but the names themselves must never change.
const PRESERVED_TECHNICAL_STRINGS_EN_ONLY = ["omniroute_get_health", "omniroute_list_combos"];

test("APP_CONFIG.name reflects the OmniCode rebrand", async () => {
  const mod = await import("../../src/shared/constants/appConfig.ts");
  assert.equal(mod.APP_CONFIG.name, "OmniCode");
});

test("OAuth subscription TOS disclaimer keys exist in en.json", () => {
  const oauth = en.oauthModal as Record<string, string> | undefined;
  assert.ok(oauth, "en.oauthModal should exist");
  assert.equal(typeof oauth?.subscriptionDisclaimerTitle, "string");
  assert.equal(typeof oauth?.subscriptionDisclaimerBody, "string");
  assert.match(
    oauth!.subscriptionDisclaimerBody,
    /Terms of Service/i,
    "OAuth disclaimer should mention Terms of Service"
  );

  const cursor = en.cursorAuthModal as Record<string, string> | undefined;
  assert.ok(cursor, "en.cursorAuthModal should exist");
  assert.equal(typeof cursor?.subscriptionDisclaimerTitle, "string");
  assert.equal(typeof cursor?.subscriptionDisclaimerBody, "string");

  const providers = en.providers as Record<string, string> | undefined;
  assert.ok(providers, "en.providers should exist");
  assert.equal(typeof providers?.oauthSubscriptionDisclaimerTitle, "string");
  assert.equal(typeof providers?.oauthSubscriptionDisclaimerBody, "string");
});

test("rebrand preserves technical identifiers across all locales", () => {
  const files = fs.readdirSync(I18N_DIR).filter((f) => f.endsWith(".json"));
  assert.ok(files.length > 0, "expected at least one i18n file");

  for (const file of files) {
    const raw = fs.readFileSync(path.join(I18N_DIR, file), "utf8");
    for (const needle of PRESERVED_TECHNICAL_STRINGS_ALL_LOCALES) {
      assert.ok(
        raw.includes(needle),
        `${file} must preserve technical identifier '${needle}' (rebrand safety)`
      );
    }
  }

  const enRaw = fs.readFileSync(path.join(I18N_DIR, "en.json"), "utf8");
  for (const needle of PRESERVED_TECHNICAL_STRINGS_EN_ONLY) {
    assert.ok(
      enRaw.includes(needle),
      `en.json must preserve MCP tool name '${needle}' (rebrand safety)`
    );
  }
});

test("rebrand preserves i18n keys that mention the brand name", () => {
  // These keys are referenced from .tsx files via t("..."). Renaming them
  // would break t() lookups even though their *values* changed to "OmniCode".
  const referencedKeys = [
    ["landing", "installOmniRoute"],
    ["landing", "startingOmniRoute"],
    ["agents", "flowOmniRoute"],
    ["agents", "flowDiagramOmniRoute"],
    ["cliTools", "defaultOmnirouteKey"],
    ["cliTools", "usingDefaultOmniroute"],
  ];
  for (const [namespace, key] of referencedKeys) {
    const ns = (en as Record<string, Record<string, unknown>>)[namespace];
    assert.ok(ns, `en.${namespace} should exist`);
    assert.equal(
      typeof ns[key],
      "string",
      `en.${namespace}.${key} should still exist after rebrand`
    );
  }
});
