#!/usr/bin/env node
// scripts/check/check-test-masking.mjs
// Gate anti test-masking (a preocupação nº1 do CLAUDE.md: "subagente não pode
// enfraquecer/remover asserts pra ficar verde"). Para cada arquivo de teste MODIFICADO
// num PR, compara a contagem de asserts base vs HEAD: sinaliza REMOÇÃO LÍQUIDA de asserts
// e NOVAS tautologias `assert.ok(true)`. Heurístico mas alto-sinal. Espelha o plumbing
// de check-pr-test-policy.mjs (diff base...HEAD); no-op fora de contexto de PR.
//
// v2 (6A.10): acrescenta 3 novos subchecks:
//   1. Arquivos de teste DELETADOS: --diff-filter=MDR com detecção de rename.
//   2. Aumento líquido de .skip/.todo/.only/{skip:true}: esconde asserts sem remover.
//   3. Tautologias extras: expect(true).toBe(true), assert.equal(1,1), assert.ok(true).
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const TEST_RE = /\.(test|spec)\.(ts|tsx)$/;

/** Conta chamadas de assert.*( / assert( / expect( . */
export function countAssertions(src) {
  const a = (src.match(/\bassert\b\s*[.(]/g) || []).length;
  const e = (src.match(/\bexpect\s*\(/g) || []).length;
  return a + e;
}

/** Conta tautologias assert.ok(true). */
export function countTautologies(src) {
  return (src.match(/\bassert\s*\.\s*ok\s*\(\s*true\s*\)/g) || []).length;
}

/**
 * (6A.10 subcheck 2) Conta marcadores de skip/todo/only que silenciam testes:
 *   - .skip(, .todo(, .only(        — em qualquer runner (node:test, jest, vitest)
 *   - { skip: true }                — opção de objeto node:test
 */
export function countSkips(src) {
  const modifiers = (src.match(/\.\s*(?:skip|todo|only)\s*\(/g) || []).length;
  const skipOpt = (src.match(/\{\s*skip\s*:\s*true\s*\}/g) || []).length;
  return modifiers + skipOpt;
}

/**
 * (6A.10 subcheck 3) Conta tautologias que mantêm os asserts no texto mas nunca
 * verificam nada real:
 *   - expect(true).toBe(true)
 *   - assert.equal(1, 1)  / assert.strictEqual(1, 1)
 *   - assert.ok(true)     (já coberto por countTautologies; incluído aqui para completude)
 */
export function countExtendedTautologies(src) {
  let count = 0;
  // expect(true).toBe(true)
  count += (src.match(/\bexpect\s*\(\s*true\s*\)\s*\.\s*toBe\s*\(\s*true\s*\)/g) || []).length;
  // assert.equal(1, 1) / assert.strictEqual(1, 1) — literal numeric identity
  count += (src.match(/\bassert\s*\.\s*(?:strict)?[Ee]qual\s*\(\s*1\s*,\s*1\s*\)/g) || []).length;
  // assert.ok(true)
  count += (src.match(/\bassert\s*\.\s*ok\s*\(\s*true\s*\)/g) || []).length;
  return count;
}

/**
 * (6A.10 subcheck 1) Sinaliza arquivos de teste DELETADOS ou renomeados-e-não-
 * substituídos. Recebe lista de paths de arquivos de teste que foram deletados
 * (filtro D do git diff --diff-filter=MDR).
 */
export function evaluateDeletedFiles(deletedPaths) {
  const flags = [];
  for (const f of deletedPaths) {
    if (TEST_RE.test(f)) {
      flags.push(`${f}: arquivo de teste deletado — revisão humana obrigatória (mascaramento alto-sinal)`);
    }
  }
  return flags;
}

/**
 * Avalia por-arquivo: flag em remoção líquida de asserts, nova tautologia,
 * aumento líquido de skips, ou nova tautologia extendida.
 *
 * Cada entrada de perFile deve ter:
 *   { file, baseAsserts, headAsserts, baseTaut, headTaut,
 *     baseSkips, headSkips, baseExtTaut, headExtTaut }
 *
 * Os campos de skip e extTaut são opcionais (default 0) para compatibilidade
 * com chamadas legadas que só passam baseAsserts/headAsserts/baseTaut/headTaut.
 */
export function evaluateMasking(perFile) {
  const flags = [];
  for (const f of perFile) {
    const baseSkips = f.baseSkips ?? 0;
    const headSkips = f.headSkips ?? 0;
    const baseExtTaut = f.baseExtTaut ?? 0;
    const headExtTaut = f.headExtTaut ?? 0;

    if (f.headAsserts < f.baseAsserts)
      flags.push(`${f.file}: asserts ${f.baseAsserts} → ${f.headAsserts} (REMOÇÃO de ${f.baseAsserts - f.headAsserts} — enfraquecimento?)`);
    if (f.headTaut > f.baseTaut)
      flags.push(`${f.file}: nova(s) ${f.headTaut - f.baseTaut} tautologia(s) assert.ok(true)`);
    if (headSkips > baseSkips)
      flags.push(`${f.file}: ${headSkips - baseSkips} novo(s) .skip/.todo/.only (asserts silenciados sem remoção)`);
    if (headExtTaut > baseExtTaut)
      flags.push(`${f.file}: nova(s) ${headExtTaut - baseExtTaut} tautologia(s) estendida(s) (expect(true).toBe(true) / assert.equal(1,1))`);
  }
  return flags;
}

function git(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" });
  } catch {
    return "";
  }
}

function resolveBase() {
  if (process.env.GITHUB_BASE_SHA) return process.env.GITHUB_BASE_SHA;
  if (process.env.GITHUB_BASE_REF) return `origin/${process.env.GITHUB_BASE_REF}`;
  return null;
}

function main() {
  const base = resolveBase();
  if (!base) {
    console.log("[test-masking] sem base ref (não é PR) — pulando.");
    return;
  }

  // (6A.10 subcheck 1) Arquivos de teste deletados/renomeados via MDR filter
  const deletedAndRenamed = git([
    "diff", "--name-only", "--diff-filter=DR", "-M",
    `${base}...HEAD`,
  ])
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const deletedFlags = evaluateDeletedFiles(deletedAndRenamed);

  // Arquivos de teste modificados (subcheck original + skips + extTaut)
  const changed = git(["diff", "--name-only", "--diff-filter=M", `${base}...HEAD`])
    .split("\n")
    .map((s) => s.trim())
    .filter((f) => TEST_RE.test(f) && fs.existsSync(f));

  const perFile = [];
  for (const file of changed) {
    const baseSrc = git(["show", `${base}:${file}`]);
    const headSrc = fs.readFileSync(file, "utf8");
    perFile.push({
      file,
      baseAsserts: countAssertions(baseSrc),
      headAsserts: countAssertions(headSrc),
      baseTaut: countTautologies(baseSrc),
      headTaut: countTautologies(headSrc),
      baseSkips: countSkips(baseSrc),
      headSkips: countSkips(headSrc),
      baseExtTaut: countExtendedTautologies(baseSrc),
      headExtTaut: countExtendedTautologies(headSrc),
    });
  }

  const maskingFlags = evaluateMasking(perFile);
  const allFlags = [...deletedFlags, ...maskingFlags];

  if (allFlags.length) {
    console.error(
      `[test-masking] ${allFlags.length} sinal(is) de enfraquecimento de teste:\n` +
        allFlags.map((f) => "  ✗ " + f).join("\n") +
        `\n  → se a redução é legítima (refator/consolidação), explique no PR; senão, restaure os asserts.`
    );
    process.exit(1);
  }
  console.log(
    `[test-masking] OK — ${changed.length} arquivo(s) de teste modificado(s), ` +
    `${deletedAndRenamed.length > 0 ? deletedAndRenamed.length + " deletado(s)/renomeado(s) OK" : "nenhum deletado"} — sem enfraquecimento`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
