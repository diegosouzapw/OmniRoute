import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const require = createRequire(import.meta.url);
const en = require("../../bin/cli/locales/en.json");
const ptBR = require("../../bin/cli/locales/pt-BR.json");
const zhCN = require("../../bin/cli/locales/zh-CN.json");
const zhTW = require("../../bin/cli/locales/zh-TW.json");

function flattenKeys(obj: Record<string, unknown>, prefix = ""): Set<string> {
  const keys = new Set<string>();
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      for (const sub of flattenKeys(v as Record<string, unknown>, full)) keys.add(sub);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

function walkMjs(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkMjs(full));
    } else if (entry.endsWith(".mjs") || entry.endsWith(".js")) {
      results.push(full);
    }
  }
  return results;
}

const IMPORT_PATH_RE = /^(\.\.?\/|node:|\/)/;
const IGNORE_AS_KEY = new Set([".", ".."]);

function collectTKeys(files: string[]): Set<string> {
  const used = new Set<string>();
  const re = /\bt\(\s*["']([^"']+)["']/g;
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src)) !== null) {
      const key = m[1];
      if (IGNORE_AS_KEY.has(key) || IMPORT_PATH_RE.test(key)) continue;
      used.add(key);
    }
  }
  return used;
}

const commandFiles = walkMjs(join(ROOT, "bin", "cli", "commands"));
const usedKeys = collectTKeys(commandFiles);
const enKeys = flattenKeys(en as Record<string, unknown>);

test("en.json contém todas as chaves usadas via t() nos comandos", () => {
  const missing = [...usedKeys].filter((k) => !enKeys.has(k));
  assert.deepEqual(missing, [], `Chaves faltando em en.json: ${missing.join(", ")}`);
});

test("pt-BR.json tem todas as seções top-level de en.json", () => {
  const enTop = Object.keys(en as object);
  const ptTop = new Set(Object.keys(ptBR as object));
  const missing = enTop.filter((k) => !ptTop.has(k));
  assert.deepEqual(missing, [], `Seções top-level faltando em pt-BR.json: ${missing.join(", ")}`);
});

for (const [name, cat] of [
  ["zh-CN", zhCN],
  ["zh-TW", zhTW],
] as const) {
  test(name + ".json tem paridade total de chaves com en.json", () => {
    const catKeys = flattenKeys(cat as Record<string, unknown>);
    const missing = [...enKeys].filter((k) => !catKeys.has(k));
    assert.deepEqual(missing, [], name + ".json chaves faltando: " + missing.join(", "));
  });
}

test("i18n.mjs detecta locale por OMNIROUTE_LANG", async () => {
  const { resetForTests, detectLocale } = await import("../../bin/cli/i18n.mjs");
  const orig = process.env.OMNIROUTE_LANG;
  process.env.OMNIROUTE_LANG = "pt-BR";
  resetForTests();
  const locale = detectLocale();
  assert.equal(locale, "pt-BR");
  if (orig === undefined) delete process.env.OMNIROUTE_LANG;
  else process.env.OMNIROUTE_LANG = orig;
  resetForTests();
});

test("i18n.mjs usa fallback en quando locale não existe", async () => {
  const { resetForTests, detectLocale } = await import("../../bin/cli/i18n.mjs");
  const orig = process.env.OMNIROUTE_LANG;
  process.env.OMNIROUTE_LANG = "xx-FAKE";
  resetForTests();
  const locale = detectLocale();
  assert.equal(locale, "en");
  if (orig === undefined) delete process.env.OMNIROUTE_LANG;
  else process.env.OMNIROUTE_LANG = orig;
  resetForTests();
});

test("i18n.mjs resolve alias do config: OMNIROUTE_LANG=uk → uk-UA, fil_PH.UTF-8 → phi, in → id", async () => {
  const { resetForTests, detectLocale } = await import("../../bin/cli/i18n.mjs");
  const orig = process.env.OMNIROUTE_LANG;
  process.env.OMNIROUTE_LANG = "uk";
  resetForTests();
  assert.equal(detectLocale(), "uk-UA");
  process.env.OMNIROUTE_LANG = "fil_PH.UTF-8";
  resetForTests();
  assert.equal(detectLocale(), "phi");
  process.env.OMNIROUTE_LANG = "uk_UA.UTF-8";
  resetForTests();
  assert.equal(detectLocale(), "uk-UA");
  // `in` (retired duplicate Indonesian locale) must keep resolving to `id`, otherwise a
  // saved OMNIROUTE_LANG=in silently falls back to English.
  process.env.OMNIROUTE_LANG = "in";
  resetForTests();
  assert.equal(detectLocale(), "id");
  if (orig === undefined) delete process.env.OMNIROUTE_LANG;
  else process.env.OMNIROUTE_LANG = orig;
  resetForTests();
});

test("i18n.mjs resolve base→regional e aliases: zh → zh-CN, zh-hant/zh_HK → zh-TW, UK → uk-UA", async () => {
  const { resetForTests, detectLocale } = await import("../../bin/cli/i18n.mjs");
  const orig = process.env.OMNIROUTE_LANG;
  const cases: Array<[string, string]> = [
    ["zh", "zh-CN"], // bare base language → first regional catalog declared in config/i18n.json
    ["zh-hant", "zh-TW"], // alias family declared on zh-TW
    ["zh_HK.UTF-8", "zh-TW"], // POSIX form of the zh-hk alias (charset stripped, _ → -)
    ["UK", "uk-UA"], // upper-case input canonicalized through the alias map
  ];
  for (const [input, expected] of cases) {
    process.env.OMNIROUTE_LANG = input;
    resetForTests();
    assert.equal(detectLocale(), expected, `OMNIROUTE_LANG=${input}`);
  }
  if (orig === undefined) delete process.env.OMNIROUTE_LANG;
  else process.env.OMNIROUTE_LANG = orig;
  resetForTests();
});

test("t() interpola variáveis {var}", async () => {
  const { resetForTests, t, setLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("en");
  const result = t("health.status", { status: "OK" });
  assert.equal(result, "Status: OK");
  resetForTests();
});

test("t() retorna a chave quando não existe no catálogo", async () => {
  const { resetForTests, t, setLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("en");
  const result = t("does.not.exist.at.all");
  assert.equal(result, "does.not.exist.at.all");
  resetForTests();
});

test("t() usa pt-BR quando disponível", async () => {
  const { resetForTests, t, setLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("pt-BR");
  const result = t("health.noServer");
  assert.ok(result.includes("omniroute serve"), `Esperava mensagem pt-BR, obteve: ${result}`);
  resetForTests();
});
