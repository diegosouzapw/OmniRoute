import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parse } from "@formatjs/icu-messageformat-parser";
import { createTranslator } from "next-intl";
import i18nConfig from "../../config/i18n.json" with { type: "json" };

const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");

const MESSAGES_DIR = path.resolve("src/i18n/messages");
const FLAG_KEY = "OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES";
const MESSAGE_KEY = `definitions.${FLAG_KEY}.description`;
const RAW_PATH = "profiles/<name>/";
const QUOTED_PATH = "profiles/'<name>'/";
const ENTITY_PATH = "profiles/&lt;name&gt;/";
const RENDERED_PATH = "~/.claude/profiles/<name>/settings.json";

/**
 * Regression guard for #12505 (INVALID_MESSAGE: UNCLOSED_TAG on the Feature
 * Flags page). The `featureFlags.definitions.OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES.description`
 * message carried a literal `~/.claude/profiles/<name>/settings.json` path.
 * next-intl parses `<name>` as a rich-text tag, no tag element is ever passed
 * by `FeatureFlagsGrid.tsx` (plain `t()`), so the message failed to compile and
 * the card fell back to the raw key in every locale.
 *
 * Fix: the placeholder is wrapped in ICU single quotes (`'<name>'`) so the
 * angle brackets render literally. HTML entities are not an option here: the
 * value is a real file path shown to the user, and `t()` returns entities
 * verbatim (`&lt;name&gt;` would be displayed as-is).
 */

function flatten(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v as Record<string, unknown>, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

describe(`i18n — ${FLAG_KEY} description UNCLOSED_TAG regression (#12505)`, () => {
  const localeFiles = fs
    .readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  const expectedCount = i18nConfig.locales.length;

  function readDescription(file: string): string {
    const raw = fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8");
    assert.notEqual(raw.charCodeAt(0), 0xfeff, `${file}: starts with BOM (U+FEFF)`);
    const flat = flatten(JSON.parse(raw) as Record<string, unknown>);
    const value = flat[`featureFlags.${MESSAGE_KEY}`];
    assert.equal(typeof value, "string", `${file}: featureFlags.${MESSAGE_KEY} must be a string`);
    return value as string;
  }

  it(`the description exists in all ${expectedCount} locales`, () => {
    assert.equal(localeFiles.length, expectedCount);
    for (const file of localeFiles) {
      readDescription(file);
    }
  });

  it("every locale value parses as an ICU message (no unclosed tag)", () => {
    const failures: string[] = [];
    for (const file of localeFiles) {
      try {
        parse(readDescription(file), { captureLocation: false, shouldParseSkeletons: true });
      } catch (error) {
        failures.push(`${file}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    assert.deepEqual(failures, [], `ICU parse failures: ${failures.slice(0, 5).join("; ")}`);
  });

  it("every locale wraps the profile path placeholder in ICU single quotes", () => {
    const offenders: string[] = [];
    for (const file of localeFiles) {
      const value = readDescription(file);
      if (value.includes(RAW_PATH)) offenders.push(`${file}: raw ${RAW_PATH}`);
      if (value.includes(ENTITY_PATH)) offenders.push(`${file}: entity ${ENTITY_PATH}`);
      if (!value.includes(QUOTED_PATH)) offenders.push(`${file}: missing ${QUOTED_PATH}`);
    }
    assert.deepEqual(offenders, [], offenders.slice(0, 10).join(", "));
  });

  it("createTranslator renders the literal path in every locale without INVALID_MESSAGE", () => {
    const errors: string[] = [];
    const wrong: string[] = [];
    for (const file of localeFiles) {
      const locale = file.replace(/\.json$/, "");
      const messages = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
      const t = createTranslator({
        locale,
        messages,
        namespace: "featureFlags",
        onError: (err: { code?: string; originalMessage?: string; message?: string }) => {
          errors.push(`${locale}: ${err.code}: ${err.originalMessage ?? err.message}`);
        },
      });
      assert.ok(t.has(MESSAGE_KEY), `${locale}: t.has(${MESSAGE_KEY}) must be true`);
      const rendered = t(MESSAGE_KEY);
      if (!rendered.includes(RENDERED_PATH)) {
        wrong.push(`${locale}: ${rendered.slice(0, 80)}`);
      }
    }
    assert.deepEqual(errors, [], `next-intl errors: ${errors.slice(0, 5).join("; ")}`);
    assert.deepEqual(
      wrong,
      [],
      `rendered text lost the literal path: ${wrong.slice(0, 5).join("; ")}`
    );
  });

  it("the TypeScript default description parses and uses the same quoting", () => {
    const flag = FEATURE_FLAG_DEFINITIONS.find((f) => f.key === FLAG_KEY);
    assert.ok(flag, `${FLAG_KEY} must be defined`);
    assert.doesNotThrow(() =>
      parse(flag.description, { captureLocation: false, shouldParseSkeletons: true })
    );
    assert.ok(flag.description.includes(QUOTED_PATH), `default must contain ${QUOTED_PATH}`);
    assert.equal(
      flag.description.includes(RAW_PATH),
      false,
      `default must not contain ${RAW_PATH}`
    );
  });
});
