import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-doc-count-14574-"));
const { buildChecks, countMigrations, tallyDrift, __setSpawnSyncForTest } =
  await import("../../scripts/check/check-docs-counts-sync.mjs");

// This gate's input is SQL filenames, not the unrelated code-facts subprocess.
__setSpawnSyncForTest(() => ({ status: 1, stdout: "", stderr: "isolated code facts" }));
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config: { locales: { code: string }[] } = JSON.parse(
  fs.readFileSync(path.join(root, "config/i18n.json"), "utf8")
);
const mirrors = config.locales
  .filter(({ code }) => code !== "en")
  .map(({ code }) => `docs/i18n/${code}/README.md`);
const actual = countMigrations();
const checks = buildChecks();
const mirrorCheck = checks.find((check) => check.label === "DB migrations count (README mirrors)");
const row = (tail: string) =>
  `<tr><td><b>Database</b></td><td>better-sqlite3 (SQLite, WAL) + LowDB (JSON) — ${tail}</td></tr>`;
const persian = (value: number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

function validate(content: string) {
  assert.ok(mirrorCheck?.validate, "translated README migration claims must have a strict gate");
  return mirrorCheck.validate(content);
}

test("all configured translated READMEs are covered by the strict migration gate", () => {
  assert.ok(mirrorCheck);
  assert.equal(mirrorCheck.strict, true);
  assert.equal(mirrorCheck.actual, actual);
  assert.deepEqual(new Set(mirrorCheck.files), new Set(mirrors));
});

test("every current README mirror states the measured SQL migration count", () => {
  for (const file of mirrors) {
    const result = validate(fs.readFileSync(path.join(root, file), "utf8"));
    assert.equal(result.ok, true, `${file}: ${result.detail}`);
  }
});

for (const [language, tail] of [
  ["French", `137 modules métier, ${actual} migrations`],
  ["Hausa", `manhajojin yanki 137, ƙaura ${actual}`],
  ["Japanese", `137個のドメインモジュール、${actual}件のマイグレーション`],
  ["Arabic", `137 وحدة نطاق، و${actual} عملية ترحيل`],
  ["Persian", `${persian(137)} ماژول دامنه، ${persian(actual)} مهاجرت`],
]) {
  test(`accepts the current count without requiring English wording: ${language}`, () => {
    assert.equal(validate(row(tail)).ok, true);
  });
}

test("stale migration counts fail even when the correct number appears elsewhere", () => {
  const content = `Current release uses ${actual}.\n${row(`137 modules, ${actual - 1} migrations`)}`;
  assert.equal(validate(content).ok, false);
  assert.equal(validate(row(`${actual} modules, ${actual - 1} migrations`)).ok, false);
});

test("stale Persian digits fail without reinterpreting the module count", () => {
  assert.equal(validate(row(`${persian(actual)} ماژول، ${persian(actual - 1)} مهاجرت`)).ok, false);
});

test("quoted HTML attributes do not become visible migration counts", () => {
  const content = row(
    `<span title="comparison > 999">137</span> modules, <b>${actual}</b> migrations`
  );
  assert.equal(validate(content).ok, true);
});

test("HTML character references are decoded before checking the visible count", () => {
  const encoded = String(actual).replace(/\d/g, (digit) => `&#${digit.charCodeAt(0)};`);
  assert.equal(validate(row(`&#x31;&#x33;&#x37; modules, ${encoded} migrations`)).ok, true);
});

test("a current count hidden in an attribute or comment cannot mask stale visible text", () => {
  const content = row(
    `<span title="${actual}">137 modules, ${actual - 1} migrations</span><!-- ${actual} -->`
  );
  assert.equal(validate(content).ok, false);
});

test("missing, duplicated or ambiguous database claims fail closed", () => {
  for (const content of [
    `There are ${actual} migrations elsewhere.`,
    row("137 modules, no migration count"),
    row(`137 modules, ${actual} migrations, 3 extras`),
    row(`137 modules, ${actual} migrations`) + row(`137 modules, ${actual - 1} migrations`),
  ]) {
    assert.equal(validate(content).ok, false);
  }
});

test("one stale translated claim makes the normal tally fail strictly", () => {
  const target = "docs/i18n/phi/README.md";
  const selected = checks.filter((check) => check.label === "DB migrations count (README mirrors)");
  const result = tallyDrift(selected, (file: string) =>
    file === target
      ? row(`137 domain modules, ${actual - 1} migration`)
      : row(`137 domain modules, ${actual} migration`)
  );
  assert.equal(result.strict, 1);
});
