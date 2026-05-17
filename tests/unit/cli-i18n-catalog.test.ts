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
