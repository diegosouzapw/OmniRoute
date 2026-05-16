import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let origDataDir: string | undefined;
let origOmniLang: string | undefined;

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-lang-test-"));
  origDataDir = process.env.DATA_DIR;
  origOmniLang = process.env.OMNIROUTE_LANG;
  process.env.DATA_DIR = tmpDir;
  delete process.env.OMNIROUTE_LANG;
});

test.after(() => {
  if (origDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = origDataDir;
  if (origOmniLang === undefined) delete process.env.OMNIROUTE_LANG;
  else process.env.OMNIROUTE_LANG = origOmniLang;
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

// ── i18n.mjs security ─────────────────────────────────────────────────────────

test("normalize rejeita path traversal com ../", async () => {
  const { resetForTests, setLocale, getLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("../etc/passwd");
  const locale = getLocale();
  assert.equal(locale, "en", `Deveria ter fallback para en, obteve: ${locale}`);
  resetForTests();
});

test("normalize rejeita código com caracteres especiais", async () => {
  const { resetForTests, setLocale, getLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("pt;rm -rf /");
  const locale = getLocale();
  assert.equal(locale, "en", `Deveria ter fallback para en, obteve: ${locale}`);
  resetForTests();
});

test("normalize aceita código válido com hífen (pt-BR)", async () => {
  const { resetForTests, setLocale, getLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("pt-BR");
  const locale = getLocale();
  assert.equal(locale, "pt-BR");
  resetForTests();
});

test("normalize converte underscore para hífen (pt_BR → pt-BR)", async () => {
  const { resetForTests, setLocale, getLocale } = await import("../../bin/cli/i18n.mjs");
  resetForTests();
  setLocale("pt_BR");
  const locale = getLocale();
  assert.equal(locale, "pt-BR");
  resetForTests();
});

// ── config lang get ────────────────────────────────────────────────────────────

test("runConfigLangGetCommand retorna 0 e imprime o locale ativo", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangGetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const output: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => output.push(args.join(" "));

  try {
    const code = await runConfigLangGetCommand({});
    assert.equal(code, 0);
    assert.ok(
      output.some((l) => l.includes("en")),
      `Esperava 'en' no output: ${output.join("|")}`
    );
  } finally {
    console.log = origLog;
    resetForTests();
  }
});

test("runConfigLangGetCommand --json retorna objeto com code e name", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangGetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const chunks: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => chunks.push(args.join(" "));

  try {
    await runConfigLangGetCommand({ json: true });
    const parsed = JSON.parse(chunks.join(""));
    assert.ok("code" in parsed, "JSON deve ter campo code");
    assert.ok("name" in parsed, "JSON deve ter campo name");
    assert.equal(parsed.code, "en");
  } finally {
    console.log = origLog;
    resetForTests();
  }
});

// ── config lang list ───────────────────────────────────────────────────────────

test("runConfigLangListCommand --json lista locales com campo active", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangListCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const chunks: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => chunks.push(args.join(" "));

  try {
    const exitCode = await runConfigLangListCommand({ json: true });
    assert.equal(exitCode, 0);
    const arr = JSON.parse(chunks.join(""));
    assert.ok(Array.isArray(arr), "Deve retornar array");
    assert.ok(arr.length >= 2, "Deve ter ao menos en e pt-BR");
    const enEntry = arr.find((l: any) => l.code === "en");
    assert.ok(enEntry, "Deve ter entrada para en");
    assert.ok("active" in enEntry, "Deve ter campo active");
    assert.equal(enEntry.active, true, "en deve ser active quando locale for en");
  } finally {
    console.log = origLog;
    resetForTests();
  }
});

// ── config lang set ────────────────────────────────────────────────────────────

test("runConfigLangSetCommand salva locale no .env e chama setLocale imediatamente", async () => {
  const { resetForTests, setLocale, getLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangSetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const chunks: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => chunks.push(args.join(" "));

  try {
    const exitCode = await runConfigLangSetCommand("pt-BR", {});
    assert.equal(exitCode, 0);
    const envPath = join(tmpDir, ".env");
    assert.ok(existsSync(envPath), ".env deve existir após set");
    const content = readFileSync(envPath, "utf8");
    assert.ok(content.includes("OMNIROUTE_LANG=pt-BR"), "Deve persistir OMNIROUTE_LANG=pt-BR");
    assert.equal(getLocale(), "pt-BR", "setLocale deve ter sido chamado imediatamente em-processo");
  } finally {
    console.log = origLog;
    resetForTests();
  }
});

test("runConfigLangSetCommand retorna 1 para código desconhecido", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangSetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const errors: string[] = [];
  const origErr = console.error;
  console.error = (...args: unknown[]) => errors.push(args.join(" "));

  try {
    const exitCode = await runConfigLangSetCommand("xx-NONEXISTENT", {});
    assert.equal(exitCode, 1);
  } finally {
    console.error = origErr;
    resetForTests();
  }
});

test("runConfigLangSetCommand retorna 1 quando code não fornecido", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangSetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const errors: string[] = [];
  const origErr = console.error;
  console.error = (...args: unknown[]) => errors.push(args.join(" "));

  try {
    const exitCode = await runConfigLangSetCommand(undefined, {});
    assert.equal(exitCode, 1);
  } finally {
    console.error = origErr;
    resetForTests();
  }
});

test("runConfigLangSetCommand retorna 0 quando já ativo (sem --force)", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangSetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const chunks: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => chunks.push(args.join(" "));

  try {
    const exitCode = await runConfigLangSetCommand("en", {});
    assert.equal(exitCode, 0, "Deve retornar 0 mesmo quando locale já está ativo");
  } finally {
    console.log = origLog;
    resetForTests();
  }
});

test("runConfigLangSetCommand --force salva mesmo quando locale já ativo", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangSetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const chunks: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => chunks.push(args.join(" "));

  try {
    const exitCode = await runConfigLangSetCommand("en", { force: true });
    assert.equal(exitCode, 0, "Com --force deve retornar 0");
    const envPath = join(tmpDir, ".env");
    if (existsSync(envPath)) {
      const content = readFileSync(envPath, "utf8");
      assert.ok(content.includes("OMNIROUTE_LANG=en"), "Deve ter gravado OMNIROUTE_LANG=en");
    }
  } finally {
    console.log = origLog;
    resetForTests();
  }
});

// ── upsertEnvLine (testado indiretamente via set) ─────────────────────────────

test("runConfigLangSetCommand atualiza chave sem duplicar quando já existe", async () => {
  const { resetForTests, setLocale } = await import("../../bin/cli/i18n.mjs");
  const { runConfigLangSetCommand } = await import("../../bin/cli/commands/config.mjs");
  resetForTests();
  setLocale("en");

  const envPath = join(tmpDir, ".env");
  writeFileSync(envPath, "OMNIROUTE_LANG=de\n", "utf8");

  const chunks: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => chunks.push(args.join(" "));

  try {
    const exitCode = await runConfigLangSetCommand("pt-BR", { force: true });
    assert.equal(exitCode, 0);
    const content = readFileSync(envPath, "utf8");
    assert.ok(content.includes("OMNIROUTE_LANG=pt-BR"), "Deve ter atualizado para pt-BR");
    const matches = content.match(/OMNIROUTE_LANG=/g);
    assert.equal(matches?.length, 1, "Deve ter exatamente uma ocorrência de OMNIROUTE_LANG");
  } finally {
    console.log = origLog;
    resetForTests();
  }
});
