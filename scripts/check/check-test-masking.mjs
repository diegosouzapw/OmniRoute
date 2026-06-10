#!/usr/bin/env node
// scripts/check/check-test-masking.mjs
// Gate anti test-masking (a preocupação nº1 do CLAUDE.md: "subagente não pode
// enfraquecer/remover asserts pra ficar verde"). Para cada arquivo de teste MODIFICADO
// num PR, compara a contagem de asserts base vs HEAD: sinaliza REMOÇÃO LÍQUIDA de asserts
// e NOVAS tautologias `assert.ok(true)`. Heurístico mas alto-sinal. Espelha o plumbing
// de check-pr-test-policy.mjs (diff base...HEAD); no-op fora de contexto de PR.
import fs from "node:fs";
import path from "node:path";
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

/** Avalia por-arquivo: flag em remoção líquida de asserts ou nova tautologia. */
export function evaluateMasking(perFile) {
  const flags = [];
  for (const f of perFile) {
    if (f.headAsserts < f.baseAsserts)
      flags.push(`${f.file}: asserts ${f.baseAsserts} → ${f.headAsserts} (REMOÇÃO de ${f.baseAsserts - f.headAsserts} — enfraquecimento?)`);
    if (f.headTaut > f.baseTaut)
      flags.push(`${f.file}: nova(s) ${f.headTaut - f.baseTaut} tautologia(s) assert.ok(true)`);
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
    });
  }

  const flags = evaluateMasking(perFile);
  if (flags.length) {
    console.error(
      `[test-masking] ${flags.length} sinal(is) de enfraquecimento de teste:\n` +
        flags.map((f) => "  ✗ " + f).join("\n") +
        `\n  → se a redução é legítima (refator/consolidação), explique no PR; senão, restaure os asserts.`
    );
    process.exit(1);
  }
  console.log(`[test-masking] OK — ${changed.length} arquivo(s) de teste modificado(s), sem enfraquecimento`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
