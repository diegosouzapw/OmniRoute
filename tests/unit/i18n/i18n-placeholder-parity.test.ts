// A translation that drops a placeholder silently loses the value it carried:
// the string still renders, just without the number, path or command the
// English copy promised. Nothing checked for that, and three strings had
// drifted (all in `pt`):
//
//   a2aDashboard.smokeStreamSuccessWithTask  lost {stateSuffix}
//   agents.opencodeDesc                      lost {command}
//   cache.cacheHitsSub                       lost {total}   ("of {total} total" -> "Acertos")
//
// Placeholder sets are compared, not counts or order: a locale may reorder or
// repeat them, but it may not introduce one English never defined (it would
// render literally) or drop one (its value disappears).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
  "src",
  "i18n",
  "messages"
);

type Json = { [key: string]: string | Json };

function loadLocale(file: string): Json {
  return JSON.parse(readFileSync(path.join(messagesDir, file), "utf8")) as Json;
}

function flatten(value: Json, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, child] of Object.entries(value)) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (typeof child === "string") out.set(dotted, child);
    else if (child && typeof child === "object") {
      for (const [k, v] of flatten(child, dotted)) out.set(k, v);
    }
  }
  return out;
}

/**
 * Names an ICU message interpolates: `{name}` and the argument of a typed
 * placeholder such as `{count, plural, ...}`. Nested sub-messages are covered
 * because the scan is a plain sweep of the whole string.
 */
function placeholders(message: string): Set<string> {
  return new Set(
    [...message.matchAll(/\{\s*([a-zA-Z0-9_]+)\s*[,}]/g)].map((match) => match[1])
  );
}

const english = flatten(loadLocale("en.json"));
const locales = readdirSync(messagesDir)
  .filter((file) => file.endsWith(".json") && file !== "en.json")
  .sort();

test("every locale keeps the placeholders its English source defines", () => {
  const drift: string[] = [];

  for (const file of locales) {
    for (const [key, translated] of flatten(loadLocale(file))) {
      const source = english.get(key);
      if (typeof source !== "string") continue;

      const expected = placeholders(source);
      const actual = placeholders(translated);
      const missing = [...expected].filter((name) => !actual.has(name));
      const unknown = [...actual].filter((name) => !expected.has(name));
      if (missing.length === 0 && unknown.length === 0) continue;

      drift.push(
        `${file} ${key}\n` +
          `      en: ${source}\n` +
          `      ${file.replace(".json", "")}: ${translated}\n` +
          `      missing=[${missing.join(", ")}] unknown=[${unknown.join(", ")}]`
      );
    }
  }

  assert.deepEqual(drift, [], `\n  placeholder drift:\n    ${drift.join("\n    ")}\n`);
});

test("the checker itself recognises the drift it is meant to catch", () => {
  // Without this the test above could pass by never matching anything.
  assert.deepEqual([...placeholders("of {total} total")], ["total"]);
  assert.deepEqual([...placeholders("ok (task {taskId}{stateSuffix}).")], ["taskId", "stateSuffix"]);
  assert.deepEqual([...placeholders("{count, plural, one {# item} other {# items}}")], ["count"]);
  assert.deepEqual([...placeholders("Acertos")], []);
});
