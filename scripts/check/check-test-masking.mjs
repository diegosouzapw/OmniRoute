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
// Production TypeScript sources (excludes test files, handled separately via TEST_RE).
const PROD_SRC_RE = /\.(ts|tsx|mts|cts)$/;

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

// ─── (6348) Subcheck 4: inline-reimplemented prod conditions (REPORT-ONLY) ───
// A test that copies a conditional expression out of production code (instead of
// importing and exercising the symbol that owns it) is the wrong-shape-contract-test
// class (#6216): the assertion re-encodes the branch locally, so it stays green even
// when the real prod condition drifts. This subcheck is a HEURISTIC, textual gate
// mirroring the count* helpers above — it never parses an AST. It is REPORT-ONLY for
// now (warns, does not fail the gate).

/** Collapse all runs of whitespace to a single space and trim. */
function normalizeWhitespace(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

/**
 * Count "significant" tokens in a normalized condition. Single-char identifiers
 * (`x`, `i`) and single-digit numeric literals (`0`, `1`) are treated as noise and
 * NOT counted; operators and multi-char identifiers/numbers ARE. This is what makes
 * `x > 0` trivial (1 significant token) while `status >= 500` is meaningful (3):
 *   - `status >= 500` → status, >=, 500              → 3
 *   - `x === LIMIT && y` → ===, LIMIT, &&            → 3
 *   - `x > 0` → >                                    → 1
 */
export function countSignificantTokens(cond) {
  const tokens =
    (cond || "").match(
      /===|!==|==|!=|>=|<=|&&|\|\||[<>+\-*/%!]|[A-Za-z_$][\w$]*|\d+(?:\.\d+)?/g
    ) || [];
  let count = 0;
  for (const tk of tokens) {
    if (/^[A-Za-z_$]/.test(tk)) {
      if (tk.length >= 2) count++; // multi-char identifier
    } else if (/^\d/.test(tk)) {
      if (tk.length >= 2) count++; // multi-digit number
    } else {
      count++; // operator
    }
  }
  return count;
}

/** A condition is "meaningful" when it carries ≥3 significant tokens. */
function isSignificantCondition(cond) {
  return countSignificantTokens(cond) >= 3;
}

/**
 * Extract meaningful (≥3-token) conditional expressions from a production source,
 * paired with the nearest enclosing declared symbol that "owns" them. Covers
 * `if (...)` (via paren balancing) and comparison-bearing ternaries (`a === b ? … : …`).
 * Returns [{ condition (whitespace-normalized), owner }].
 */
export function extractProdConditions(src) {
  const results = [];
  if (!src) return results;

  // Declarations (function / const / let / var) with their positions, so each
  // condition can be attributed to the symbol whose body it lives in.
  const decls = [];
  const declRe =
    /(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)|(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g;
  let dm;
  while ((dm = declRe.exec(src))) {
    decls.push({ index: dm.index, name: dm[1] || dm[2] });
  }
  const ownerAt = (idx) => {
    let owner = "";
    for (const d of decls) {
      if (d.index <= idx) owner = d.name;
      else break;
    }
    return owner;
  };

  const seen = new Set();
  const pushCond = (raw, owner) => {
    const norm = normalizeWhitespace(raw);
    if (!norm || seen.has(norm) || !isSignificantCondition(norm)) return;
    seen.add(norm);
    results.push({ condition: norm, owner });
  };

  // if (...) — balance parentheses to capture the full condition.
  const ifRe = /\bif\s*\(/g;
  let m;
  while ((m = ifRe.exec(src))) {
    let depth = 1;
    let i = m.index + m[0].length;
    for (; i < src.length && depth > 0; i++) {
      const ch = src[i];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
    }
    pushCond(src.slice(m.index + m[0].length, i - 1), ownerAt(m.index));
  }

  // Comparison-bearing ternaries: `<lhs> <cmp> <rhs> ? … : …` (best-effort, low-noise).
  const ternRe =
    /([A-Za-z_$][\w$).\]]*\s*(?:===|!==|==|!=|>=|<=|>|<)\s*[^?;{}\n]+?)\s*\?/g;
  let t;
  while ((t = ternRe.exec(src))) {
    pushCond(t[1], ownerAt(t.index));
  }

  return results;
}

/**
 * Collect the identifiers/module specifiers a test file imports, so we can tell
 * whether it exercises a prod symbol through the real import (clean) or merely
 * re-implements one of its conditions locally (masked). Returns a Set of names:
 * imported bindings, module paths, and module basenames.
 */
export function extractImports(src) {
  const names = new Set();
  if (!src) return names;
  const addModule = (mod) => {
    names.add(mod);
    const base = mod.split("/").pop().replace(/\.\w+$/, "");
    if (base) names.add(base);
  };
  let m;
  const importRe = /import\s+(?:type\s+)?([^;]*?)\s+from\s+['"]([^'"]+)['"]/g;
  while ((m = importRe.exec(src))) {
    addModule(m[2]);
    for (const id of m[1].match(/[A-Za-z_$][\w$]*/g) || []) {
      if (id !== "as" && id !== "type") names.add(id);
    }
  }
  const dynRe = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = dynRe.exec(src))) addModule(m[1]);
  const reqRe = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = reqRe.exec(src))) addModule(m[1]);
  return names;
}

/**
 * PURE core of subcheck 4. Given the sources of the prod files changed in a PR,
 * one test file's source, and the set of names that test imports: return the prod
 * conditions the test re-implements textually WITHOUT importing the symbol that owns
 * them. Whitespace is squashed on both sides so spacing differences never mask a hit.
 * Returns [{ condition, owner }].
 */
export function findReimplementedConditions(prodSources, testSource, testImports) {
  const flags = [];
  if (!testSource) return flags;
  const imports =
    testImports instanceof Set ? testImports : new Set(testImports || []);
  const squash = (s) => (s || "").replace(/\s+/g, "");
  const testSq = squash(testSource);
  const seen = new Set();
  for (const prod of prodSources || []) {
    for (const { condition, owner } of extractProdConditions(prod)) {
      if (owner && imports.has(owner)) continue; // exercised through the real import
      if (seen.has(condition)) continue;
      if (testSq.includes(squash(condition))) {
        seen.add(condition);
        flags.push({ condition, owner: owner || null });
      }
    }
  }
  return flags;
}

/**
 * (6A.10 subcheck 1) Sinaliza arquivos de teste DELETADOS ou renomeados-e-não-
 * substituídos. Recebe lista de paths de arquivos de teste que foram deletados
 * (filtro D do git diff --diff-filter=MDR).
 *
 * `deletionAllowlist` (`_deletedWithReplacement` no test-masking-allowlist.json)
 * isenta uma deleção SOMENTE quando o substituto declarado existe no HEAD e é
 * ele próprio um arquivo de teste — o caso "reescrito em outro path sem rename
 * detectável" (conteúdo novo demais para o -M do git). Qualquer entrada cujo
 * substituto não exista ou não seja teste continua flagada.
 */
export function evaluateDeletedFiles(
  deletedPaths,
  deletionAllowlist = {},
  fileExists = fs.existsSync
) {
  const flags = [];
  for (const f of deletedPaths) {
    if (!TEST_RE.test(f)) continue;
    const entry = deletionAllowlist[f];
    if (entry && typeof entry.replacement === "string") {
      if (TEST_RE.test(entry.replacement) && fileExists(entry.replacement)) continue;
      flags.push(
        `${f}: deleção allowlistada mas o substituto declarado (${entry.replacement}) não existe ou não é arquivo de teste`
      );
      continue;
    }
    flags.push(
      `${f}: arquivo de teste deletado — revisão humana obrigatória (mascaramento alto-sinal)`
    );
  }
  return flags;
}

/**
 * Parse `git diff --name-status -M --diff-filter=DR` output, separating TRUE
 * test-file deletions ("D\tpath") from RENAMES ("R<score>\told\tnew").
 *
 * A rename whose destination is still a test file is a *relocation* (the test
 * was substituted at a new path, not removed) — per this file's subcheck-1
 * contract it must NOT be treated as a deletion; the assert-reduction check
 * still runs across the rename to catch gutting-via-rename. A rename that lands
 * OUTSIDE test scope (test → non-test) removes the test and is treated as a
 * deletion. Returns test-file paths only.
 */
export function partitionDeletedRenamed(nameStatusOutput) {
  const deletedTests = [];
  const renames = [];
  for (const line of (nameStatusOutput || "").split("\n")) {
    if (!line.trim()) continue;
    const parts = line.split("\t").map((s) => s.trim());
    const status = parts[0] || "";
    if (status.startsWith("D")) {
      if (TEST_RE.test(parts[1] || "")) deletedTests.push(parts[1]);
    } else if (status.startsWith("R")) {
      const from = parts[1] || "";
      const to = parts[2] || "";
      if (TEST_RE.test(from)) renames.push({ from, to });
    }
  }
  return { deletedTests, renames };
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
export function evaluateMasking(perFile, assertReductionAllowlist = new Set()) {
  const flags = [];
  for (const f of perFile) {
    const baseSkips = f.baseSkips ?? 0;
    const headSkips = f.headSkips ?? 0;
    const baseExtTaut = f.baseExtTaut ?? 0;
    const headExtTaut = f.headExtTaut ?? 0;

    // The net-assert-REDUCTION signal can be allowlisted per file when the reduction is a
    // verified-legitimate refactor/field-removal (config/quality/test-masking-allowlist.json).
    // The tautology / skip / deletion signals below are NEVER allowlisted.
    if (f.headAsserts < f.baseAsserts && !assertReductionAllowlist.has(f.file))
      flags.push(
        `${f.file}: asserts ${f.baseAsserts} → ${f.headAsserts} (REMOÇÃO de ${f.baseAsserts - f.headAsserts} — enfraquecimento?)`
      );
    if (f.headTaut > f.baseTaut)
      flags.push(`${f.file}: nova(s) ${f.headTaut - f.baseTaut} tautologia(s) assert.ok(true)`);
    if (headSkips > baseSkips)
      flags.push(
        `${f.file}: ${headSkips - baseSkips} novo(s) .skip/.todo/.only (asserts silenciados sem remoção)`
      );
    if (headExtTaut > baseExtTaut)
      flags.push(
        `${f.file}: nova(s) ${headExtTaut - baseExtTaut} tautologia(s) estendida(s) (expect(true).toBe(true) / assert.equal(1,1))`
      );
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

  // (6A.10 subcheck 1) Arquivos de teste deletados/renomeados via MDR filter.
  // Renames test→test são RELOCAÇÕES (substituição) e passam pela verificação de
  // redução de asserts abaixo (gutting-via-rename ainda flaga); só deleções reais
  // e renames test→não-teste contam como remoção de teste.
  const { deletedTests, renames } = partitionDeletedRenamed(
    git(["diff", "--name-status", "-M", "--diff-filter=DR", `${base}...HEAD`])
  );

  const relocatedOutOfTest = [];
  const renamePerFile = [];
  for (const { from, to } of renames) {
    if (!TEST_RE.test(to)) {
      // test → non-test: the test was removed from coverage.
      relocatedOutOfTest.push(from);
      continue;
    }
    // test → test: compare the original (base) against the relocated (head) file so
    // a clean relocation passes but a rename that drops asserts/adds tautologies fires.
    const baseSrc = git(["show", `${base}:${from}`]);
    const headSrc = fs.existsSync(to) ? fs.readFileSync(to, "utf8") : "";
    renamePerFile.push({
      file: to,
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

  // Arquivos de teste modificados (subcheck original + skips + extTaut)
  const changed = git(["diff", "--name-only", "--diff-filter=M", `${base}...HEAD`])
    .split("\n")
    .map((s) => s.trim())
    .filter((f) => TEST_RE.test(f) && fs.existsSync(f));

  const perFile = [...renamePerFile];
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

  // Per-file allowlist for verified-legitimate net-assert reductions (refactor/field-removal).
  // Only exempts the reduction signal; tautology/skip/deletion signals still fire.
  let assertReductionAllowlist = new Set();
  let deletionAllowlist = {};
  let reimplementedAllowlist = new Set();
  try {
    const raw = JSON.parse(fs.readFileSync("config/quality/test-masking-allowlist.json", "utf8"));
    assertReductionAllowlist = new Set(Object.keys(raw).filter((k) => !k.startsWith("_")));
    deletionAllowlist = raw._deletedWithReplacement || {};
    reimplementedAllowlist = new Set(raw._reimplementedConditions || []);
  } catch {
    // no allowlist file — treat as empty
  }

  // (6348 subcheck 4, REPORT-ONLY) Tests that inline-reimplement a prod condition
  // instead of importing the symbol that owns it. Prod files changed in this PR
  // (added/copied/modified TS sources) are the reference corpus; each changed test
  // file is scanned against them. Warns only — it never fails the gate for now.
  const prodChanged = git(["diff", "--name-only", "--diff-filter=ACM", `${base}...HEAD`])
    .split("\n")
    .map((s) => s.trim())
    .filter((f) => PROD_SRC_RE.test(f) && !TEST_RE.test(f) && fs.existsSync(f));
  const prodSources = prodChanged.map((f) => {
    try {
      return fs.readFileSync(f, "utf8");
    } catch {
      return "";
    }
  });
  const changedTests = git(["diff", "--name-only", "--diff-filter=ACM", `${base}...HEAD`])
    .split("\n")
    .map((s) => s.trim())
    .filter((f) => TEST_RE.test(f) && fs.existsSync(f));
  const reimplementedFlags = [];
  if (prodSources.length) {
    for (const tf of changedTests) {
      if (reimplementedAllowlist.has(tf)) continue;
      const src = fs.readFileSync(tf, "utf8");
      for (const hit of findReimplementedConditions(prodSources, src, extractImports(src))) {
        reimplementedFlags.push(
          `${tf}: re-implementa a condição \`${hit.condition}\`` +
            (hit.owner ? ` (dona: ${hit.owner})` : "") +
            " — asserte através do import real em vez de copiar a condição"
        );
      }
    }
  }
  if (reimplementedFlags.length) {
    console.warn(
      `[test-masking] (report-only) ${reimplementedFlags.length} teste(s) re-implementam ` +
        `condição de produção em vez de importar o símbolo dono (classe #6216):\n` +
        reimplementedFlags.map((f) => "  ⚠ " + f).join("\n") +
        `\n  → importe o símbolo/função dono e asserte através dele (evita contrato duplicado ` +
        `que diverge silenciosamente). Report-only por enquanto — não falha o gate.`
    );
  }

  const deletedFlags = evaluateDeletedFiles(
    [...deletedTests, ...relocatedOutOfTest],
    deletionAllowlist
  );
  const maskingFlags = evaluateMasking(perFile, assertReductionAllowlist);
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
    `[test-masking] OK — ${changed.length} modificado(s), ${renames.length} renomeado(s) (relocação), ` +
      `${deletedTests.length} deletado(s) — sem enfraquecimento`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
