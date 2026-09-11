import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { IntlMessageFormat } from "intl-messageformat";

const messagesDir = join(import.meta.dirname, "../../src/i18n/messages");

/**
 * #12505: `featureFlags.definitions.*.description` is rendered by
 * `FeatureFlagsGrid.tsx` through a plain `t()` call, so next-intl compiles every
 * value as an ICU message. A bare `<name>` inside the value parses as a rich-text
 * tag; no tag element is ever supplied, so the message fails to compile and the
 * card silently falls back to printing the raw key. The path placeholder has to be
 * ICU-escaped (`'<name>'`) rather than HTML-escaped, because the literal angle
 * brackets are part of the file path the user is meant to read.
 *
 * Same class as #12302 (`ccOnboardingKeyPlaceholder`).
 */
const localeFiles = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));

function flatten(node: unknown, prefix: string, out: Map<string, string>): void {
  if (typeof node === "string") {
    out.set(prefix, node);
    return;
  }
  if (!node || typeof node !== "object" || Array.isArray(node)) return;
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    flatten(value, prefix ? `${prefix}.${key}` : key, out);
  }
}

test("every featureFlags.definitions message compiles as ICU in every locale", () => {
  assert.ok(localeFiles.length >= 40, `expected the full locale set, got ${localeFiles.length}`);

  const failures: string[] = [];
  for (const file of localeFiles) {
    const parsed = JSON.parse(readFileSync(join(messagesDir, file), "utf8"));
    const flat = new Map<string, string>();
    flatten(parsed?.featureFlags?.definitions, "", flat);

    for (const [key, value] of flat) {
      try {
        // Compilation is what next-intl does on render; a raw <tag> throws here.
        new IntlMessageFormat(value, "en");
      } catch (err) {
        failures.push(`${file} → featureFlags.definitions.${key}: ${(err as Error).message}`);
      }
    }
  }

  assert.deepEqual(failures, [], `ICU-invalid feature-flag messages:\n${failures.join("\n")}`);
});

test("the OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES path placeholder renders literally", () => {
  for (const file of localeFiles) {
    const parsed = JSON.parse(readFileSync(join(messagesDir, file), "utf8"));
    const value = parsed?.featureFlags?.definitions?.OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES
      ?.description as string | undefined;
    if (typeof value !== "string" || !value.includes("settings.json")) continue;

    const rendered = new IntlMessageFormat(value, "en").format() as string;
    assert.ok(
      rendered.includes("<name>"),
      `${file}: the escaped placeholder must render as a literal <name>, got: ${rendered}`
    );
  }
});
