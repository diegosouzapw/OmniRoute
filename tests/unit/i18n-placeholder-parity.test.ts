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
 * placeholder such as `{count, plural, ...}`.
 *
 * The scan follows the ICU grammar rather than matching every `{…}` pair:
 * inside a `plural`/`select` style the braces after a selector hold a
 * *sub-message*, so `endpoint{count, plural, one {} other {s}}` interpolates
 * `count` alone — the `s` is literal text every translation is free to replace
 * ("točke", "ų", or nothing at all).
 *
 * Tag names (`<em>`, `<prefix>`, any other `<tag>`) are collected by the same
 * single pass (`scan`), outside ICU literal runs only, so the two sets can
 * never drift apart. A `<` not followed by a letter (comparisons such as
 * `a < b`, URLs) is plain text; attributes are skipped, closing and
 * self-closing forms collapse to the same name.
 */
function scan(message: string): { placeholders: Set<string>; tags: Set<string> } {
  const names = new Set<string>();
  const tags = new Set<string>();
  let i = 0;

  const skipSpace = () => {
    while (i < message.length && /\s/.test(message[i])) i++;
  };

  const skipToClose = () => {
    let depth = 1;
    while (i < message.length && depth > 0) {
      if (message[i] === "{") depth++;
      else if (message[i] === "}") depth--;
      i++;
    }
  };

  // Reads one `<name …>`, `</name>` or `<name/>` at `i` (which points at
  // `<` followed by a letter or `/` + letter). Attributes are skipped up to
  // the closing `>`. A `<` not followed by a letter is plain text: the
  // caller advances one character without collecting anything.
  const readTag = () => {
    let j = i + 1;
    if (message[j] === "/") j++;
    let name = "";
    while (j < message.length && /[A-Za-z0-9]/.test(message[j])) name += message[j++];
    if (!name) {
      i++;
      return;
    }
    tags.add(name);
    while (j < message.length && message[j] !== ">") j++;
    i = j < message.length ? j + 1 : message.length;
  };

  // Text with arguments; stops at the `}` that closes the enclosing sub-message.
  // A straight quote before `{` or `<` opens a literal run (ICU quoting):
  // text up to the next lone quote is literal, not a placeholder. A doubled
  // quote is an escaped quote, inside a run as well as outside.
  const readMessage = () => {
    while (i < message.length && message[i] !== "}") {
      if (message[i] === "'") {
        if (message[i + 1] === "'") {
          i += 2;
          continue;
        }
        if (message[i + 1] === "{" || message[i + 1] === "<") {
          i += 2;
          while (i < message.length) {
            if (message[i] === "'") {
              if (message[i + 1] === "'") {
                i += 2;
                continue;
              }
              i++;
              break;
            }
            i++;
          }
          continue;
        }
        i++;
        continue;
      }
      if (message[i] === "{") {
        i++;
        readArgument();
        continue;
      }
      if (message[i] === "<") {
        const next = message[i + 1];
        const nextNext = message[i + 2];
        if (
          (next !== undefined && /[A-Za-z]/.test(next)) ||
          (next === "/" && nextNext !== undefined && /[A-Za-z]/.test(nextNext))
        ) {
          readTag();
          continue;
        }
        i++;
        continue;
      }
      i++;
    }
  };

  // Selector tokens, each followed by a `{ sub-message }`, until the argument closes.
  const readStyle = () => {
    while (i < message.length) {
      if (message[i] === "}") {
        i++;
        return;
      }
      if (message[i] === "{") {
        i++;
        readMessage();
        if (message[i] === "}") i++;
        continue;
      }
      i++;
    }
  };

  const readArgument = () => {
    skipSpace();
    let name = "";
    while (i < message.length && /[a-zA-Z0-9_]/.test(message[i])) name += message[i++];
    if (name) names.add(name);
    skipSpace();
    if (message[i] === "}") {
      i++;
      return;
    }
    if (message[i] !== ",") {
      skipToClose();
      return;
    }
    i++;
    skipSpace();
    let type = "";
    while (i < message.length && /[a-zA-Z]/.test(message[i])) type += message[i++];
    if (type === "plural" || type === "select" || type === "selectordinal") readStyle();
    else skipToClose();
  };

  readMessage();
  return { placeholders: names, tags };
}

function placeholders(message: string): Set<string> {
  return scan(message).placeholders;
}

function tags(message: string): Set<string> {
  return scan(message).tags;
}

const english = flatten(loadLocale("en.json"));
const locales = readdirSync(messagesDir)
  .filter((file) => file.endsWith(".json") && file !== "en.json")
  .sort();

test("every locale keeps the placeholders and tags its English source defines", () => {
  const drift: string[] = [];

  for (const file of locales) {
    for (const [key, translated] of flatten(loadLocale(file))) {
      const source = english.get(key);
      if (typeof source !== "string") continue;

      const expected = scan(source);
      const actual = scan(translated);
      const missing = [...expected.placeholders].filter((name) => !actual.placeholders.has(name));
      const unknown = [...actual.placeholders].filter((name) => !expected.placeholders.has(name));
      const missingTags = [...expected.tags].filter((name) => !actual.tags.has(name));
      const unknownTags = [...actual.tags].filter((name) => !expected.tags.has(name));
      if (
        missing.length === 0 &&
        unknown.length === 0 &&
        missingTags.length === 0 &&
        unknownTags.length === 0
      )
        continue;

      drift.push(
        `${file} ${key}\n` +
          `      en: ${source}\n` +
          `      ${file.replace(".json", "")}: ${translated}\n` +
          `      missing=[${missing.join(", ")}] unknown=[${unknown.join(", ")}]` +
          ` missingTags=[${missingTags.join(", ")}] unknownTags=[${unknownTags.join(", ")}]`
      );
    }
  }

  assert.deepEqual(drift, [], `\n  placeholder drift:\n    ${drift.join("\n    ")}\n`);
});

test("the checker itself recognises the drift it is meant to catch", () => {
  // Without this the test above could pass by never matching anything.
  assert.deepEqual([...placeholders("of {total} total")], ["total"]);
  assert.deepEqual(
    [...placeholders("ok (task {taskId}{stateSuffix}).")],
    ["taskId", "stateSuffix"]
  );
  assert.deepEqual([...placeholders("{count, plural, one {# item} other {# items}}")], ["count"]);
  assert.deepEqual([...placeholders("Acertos")], []);
  // Branch bodies are messages, not arguments: `{s}` is the English plural
  // suffix, and a translation may swap it for its own ending or drop it.
  assert.deepEqual(
    [...placeholders("Restricted to {count} endpoint{count, plural, one {} other {s}}.")],
    ["count"]
  );
  assert.deepEqual(
    [
      ...placeholders(
        "Omejeno na {count} {count, plural, one {končno točko} other {končnih točk}}."
      ),
    ],
    ["count"]
  );
  // An argument nested inside a branch still counts.
  assert.deepEqual(
    [...placeholders("{count, plural, one {one {name}} other {many {name}}}")],
    ["count", "name"]
  );
  // A straight quote before syntax opens a literal run: the name inside is
  // text, not a placeholder.
  assert.deepEqual([...placeholders("f'{providers}")], []);
  assert.deepEqual([...placeholders("'{model}'")], []);
  // A quote before ordinary text is just a character: the name stays visible.
  assert.deepEqual([...placeholders("l'utilisateur {name}")], ["name"]);
  // A wanted literal reads empty on both sides, so no drift is reported.
  assert.deepEqual([...placeholders("'<name>'")], []);
  assert.deepEqual([...placeholders("'<nom>'")], []);
  // A doubled quote is an escaped quote, not a literal run opener.
  assert.deepEqual([...placeholders("f''{providers}")], ["providers"]);
  // A closing quote ends the literal run: later names are visible again.
  assert.deepEqual([...placeholders("selector='<name>' for {field}")], ["field"]);
  // Rich-text tag names are collected alongside placeholders, outside ICU
  // literal runs only. Open/close pairs collapse to one name, attributes are
  // skipped, self-closing tags count, and a `<` not followed by a letter is
  // plain text (a comparison stays silent when both sides copy it).
  assert.deepEqual([...tags("in <em>this</em> browser")], ["em"]);
  assert.deepEqual([...tags('<span class="x">y</span>')], ["span"]);
  assert.deepEqual([...tags("line<br/>break")], ["br"]);
  assert.deepEqual([...tags("under the <prefix>9router/</prefix> prefix")], ["prefix"]);
  assert.deepEqual([...tags("a<b")].sort(), ["b"]);
  // A `<` followed by a letter is collected, then compared at equal sets:
  // copied on both sides, it stays silent (no false positive).
  assert.deepEqual(
    [...tags("value a<b and {count}")].sort(),
    [...tags("valeur a<b et {count}")].sort()
  );
  assert.deepEqual([...tags("'<name>'")], []);
  assert.deepEqual([...tags("'<nom>'")], []);
  assert.deepEqual([...tags("f'{path}")], []);
  // A tag inside a plural branch is followed like a placeholder there.
  assert.deepEqual([...tags("{count, plural, one {<em>one</em>} other {many}}")].sort(), ["em"]);
  assert.deepEqual([...tags("a < b")], []);
});
