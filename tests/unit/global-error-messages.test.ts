/**
 * global-error.tsx embeds a hardcoded copy of the en.json
 * `publicSystem.globalError` strings (statically importing the whole ~770 KB
 * catalog would ship it in the initial chunk of every page — Next.js includes
 * the root global-error chunk on all routes). This test fails when the
 * catalog copy drifts so the fallback strings are regenerated.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generateGlobalErrorMessages } from "../../scripts/i18n/generate-global-error-messages.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");

test("global-error fallback strings stay in sync with en.json", () => {
  const en = JSON.parse(
    readFileSync(join(REPO_ROOT, "src", "i18n", "messages", "en.json"), "utf8")
  );
  const expected = en?.publicSystem?.globalError;
  assert.equal(typeof expected, "object", "en.json must keep publicSystem.globalError");

  const source = readFileSync(join(REPO_ROOT, "src", "app", "global-error.tsx"), "utf8");
  const match = source.match(/const FALLBACK_EN_GLOBAL_ERROR = \{([\s\S]*?)\} as const;/);
  assert.ok(match, "FALLBACK_EN_GLOBAL_ERROR literal not found in global-error.tsx");

  // Parse the literal's key: "value" pairs (keys may be quoted or bare).
  const actual: Record<string, string> = {};
  const pairRe = /(?:"([^"]+)"|([A-Za-z0-9_]+))\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let pair: RegExpExecArray | null;
  while ((pair = pairRe.exec(match[1])) !== null) {
    const key = pair[1] ?? pair[2];
    actual[key] = JSON.parse(`"${pair[3]}"`);
  }

  assert.deepEqual(
    actual,
    expected,
    "global-error fallback strings drifted from en.json — update FALLBACK_EN_GLOBAL_ERROR"
  );
});

test("global-error.tsx does not statically import a full locale catalog", () => {
  const source = readFileSync(join(REPO_ROOT, "src", "app", "global-error.tsx"), "utf8");
  assert.ok(
    !/^\s*import\s+.*from\s+["']@\/i18n\/messages\//m.test(source),
    "global-error.tsx must not statically import from @/i18n/messages/* (ships ~770 KB on every page)"
  );
  assert.doesNotMatch(
    source,
    /import\s*\(\s*[`"'][^`"']*i18n\/messages\//,
    "lazy imports must also keep full catalogs outside the client bundle"
  );
});

test("compact catalogs preserve every translated error string without unrelated namespaces", () => {
  const config = JSON.parse(readFileSync(join(REPO_ROOT, "config/i18n.json"), "utf8"));
  const english = JSON.parse(readFileSync(join(REPO_ROOT, "src/i18n/messages/en.json"), "utf8"));
  const keys = Object.keys(english.publicSystem.globalError);
  let totalBytes = 0;
  for (const { code } of config.locales) {
    const source = JSON.parse(
      readFileSync(join(REPO_ROOT, `src/i18n/messages/${code}.json`), "utf8")
    );
    const serialized = readFileSync(
      join(REPO_ROOT, `src/i18n/global-error-messages/${code}.json`),
      "utf8"
    );
    const translated = source.publicSystem?.globalError ?? {};
    const expected = Object.fromEntries(
      keys.filter((key) => typeof translated[key] === "string").map((key) => [key, translated[key]])
    );
    assert.deepEqual(JSON.parse(serialized), { publicSystem: { globalError: expected } }, code);
    totalBytes += Buffer.byteLength(serialized);
  }
  assert.ok(totalBytes < 150_000, `Error-only catalogs should remain small: ${totalBytes} bytes`);
});

test("generator refreshes translations and leaves missing strings to the boundary fallback", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-error-catalogs-"));
  try {
    mkdirSync(join(root, "config"), { recursive: true });
    mkdirSync(join(root, "src/i18n/messages"), { recursive: true });
    writeFileSync(
      join(root, "config/i18n.json"),
      JSON.stringify({ locales: [{ code: "en" }, { code: "pt" }] })
    );
    const write = (code: string, value: unknown) =>
      writeFileSync(join(root, `src/i18n/messages/${code}.json`), JSON.stringify(value));
    write("en", { publicSystem: { globalError: { title: "Error", tryAgain: "Retry" } } });
    write("pt", {
      publicSystem: { globalError: { title: "Erro", tryAgain: 42 } },
      dashboard: { title: "Unused" },
    });
    assert.equal(generateGlobalErrorMessages(root), 2);
    const read = () =>
      JSON.parse(readFileSync(join(root, "src/i18n/global-error-messages/pt.json"), "utf8"));
    assert.deepEqual(read(), { publicSystem: { globalError: { title: "Erro" } } });
    write("pt", {
      publicSystem: { globalError: { title: "Novo erro", tryAgain: "__MISSING__:tryAgain" } },
    });
    generateGlobalErrorMessages(root);
    assert.deepEqual(read(), {
      publicSystem: { globalError: { title: "Novo erro", tryAgain: "__MISSING__:tryAgain" } },
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
