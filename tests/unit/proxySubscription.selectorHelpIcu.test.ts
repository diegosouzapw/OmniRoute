import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { IntlMessageFormat } from "intl-messageformat";

const messagesDir = join(import.meta.dirname, "../../src/i18n/messages");

/**
 * #14752: `settings.proxySubscription.selectorHelp` is rendered by SubscriptionTab
 * through a plain `t()` call, so next-intl compiles it as an ICU message. A bare
 * `<name>` parses as an unclosed rich-text tag and the help line falls back to the
 * raw key. The placeholder must be ICU-escaped (`'<name>'`) so it renders literally.
 * Same class as #12302 / #12505.
 */
const localeFiles = readdirSync(messagesDir).filter((f) => f.endsWith(".json"));

test("selectorHelp compiles as ICU and renders a literal <name> in every locale", () => {
  assert.ok(localeFiles.length >= 40, `expected the full locale set, got ${localeFiles.length}`);

  const failures: string[] = [];
  for (const file of localeFiles) {
    const parsed = JSON.parse(readFileSync(join(messagesDir, file), "utf8"));
    const value = parsed?.settings?.proxySubscription?.selectorHelp;
    if (typeof value !== "string") {
      failures.push(`${file}: selectorHelp missing`);
      continue;
    }
    try {
      const rendered = new IntlMessageFormat(value, "en").format() as string;
      if (!rendered.includes("selector=<name>")) {
        failures.push(`${file}: rendered without a literal selector=<name>: ${rendered}`);
      }
    } catch (err) {
      failures.push(`${file}: ${(err as Error).message}`);
    }
  }

  assert.deepEqual(failures, [], `ICU-invalid selectorHelp messages:\n${failures.join("\n")}`);
});
