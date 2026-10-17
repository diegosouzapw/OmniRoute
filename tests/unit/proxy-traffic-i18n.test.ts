import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { IntlMessageFormat } from "intl-messageformat";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const messages = path.join(root, "src/i18n/messages");
const config = JSON.parse(readFileSync(path.join(root, "config/i18n.json"), "utf8")) as {
  locales: { code: string }[];
};
function traffic(locale: string): Record<string, string> {
  return JSON.parse(readFileSync(path.join(messages, `${locale}.json`), "utf8")).settings
    .proxyTraffic;
}

// Compile and render the real feature catalogs, not the English fallback. Rendering pins
// interpolation too: ICU quoting can hide {id} even when a textual placeholder scan passes.
test(
  "proxy traffic has translated, renderable labels in every configured locale",
  { timeout: 5000 },
  () => {
    const english = traffic("en");
    const keys = Object.keys(english).sort();
    assert.equal(keys.length, 23);
    assert.ok(config.locales.some(({ code }) => code === "en"));
    for (const { code } of config.locales) {
      const labels = traffic(code);
      assert.ok(labels, `${code}: missing settings.proxyTraffic`);
      assert.deepEqual(Object.keys(labels).sort(), keys, `${code}: feature key coverage`);
      for (const key of keys) {
        const value = labels[key];
        const context = `${code}:settings.proxyTraffic.${key}`;
        assert.equal(typeof value, "string", context);
        assert.ok(value.trim(), `${context}: empty`);
        assert.ok(!value.includes("__MISSING__"), `${context}: translation marker`);
        if (code !== "en") assert.notEqual(value, english[key], `${context}: English copy`);
        const format = new IntlMessageFormat(value, code);
        const argumentsInAst = format.getAst().filter((element) => element.type !== 0);
        const expected = key === "removed" || key === "legacy" ? ["id"] : [];
        assert.deepEqual(
          argumentsInAst.map((element) => {
            if (element.type !== 1) assert.fail(`${context}: unexpected ICU construct`);
            return element.value;
          }),
          expected,
          `${context}: placeholder parity`
        );
        const rendered = format.format({ id: "traffic-id-42" });
        assert.equal(typeof rendered, "string", `${context}: render`);
        assert.equal(String(rendered).includes("traffic-id-42"), expected.length > 0, context);
      }
    }
  }
);
