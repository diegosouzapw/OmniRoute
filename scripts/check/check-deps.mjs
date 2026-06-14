#!/usr/bin/env node
// scripts/check/check-deps.mjs
// Gate anti-slopsquatting: toda dependência em QUALQUER package.json do repo deve
// estar numa allowlist commitada (dependency-allowlist.json). Uma dep nova exige
// adição EXPLÍCITA à allowlist — assim um agente não consegue introduzir um pacote
// alucinado/typosquatted silenciosamente (CSA 2026: 19,7% do código IA cita pacotes
// inexistentes; 43% dos nomes alucinados reaparecem, registráveis por atacantes).
// A revisão humana ao adicionar à allowlist é o ponto de controle.
//
// 6A.8: Expandido de 2 manifests hardcoded (package.json + electron/package.json)
// para descoberta automática de TODOS os package.json do repo, excluindo:
//   - node_modules/ (dep tree)
//   - .next/, .build/, dist/, dist-electron/ (build artefatos)
//   - .claude/ (worktrees de agentes)
//   - _references/, _mono_repo/ (código de referência não pertencente ao repo)
// Isso garante que workspaces novos (opencode-plugin, opencode-provider, open-sse, etc.)
// sejam automaticamente cobertos sem edição do script.
//
// Task 7.8: Anti-slopsquatting completo — para deps NOVAS (fora da allowlist),
// dois sub-checks adicionais ANTES de falhar:
//   (a) a dep EXISTE no npm registry (npm view <pkg> version)
//   (b) foi publicada há ≥72h (age-cooldown contra typosquatting de nomes alucinados)
// Ambas as chamadas são tolerantes a falha de rede: se o registry estiver inacessível,
// emite aviso mas não bloqueia — o gate principal (allowlist) ainda captura a dep nova.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { assertNoStale } from "./lib/allowlist.mjs";

const ROOT = process.cwd();
const ALLOWLIST_PATH = path.join(ROOT, "dependency-allowlist.json");

// Directories to exclude when discovering package.json files.
// Using a set of path segment prefixes (relative to ROOT, forward slashes).
const EXCLUDED_SEGMENTS = new Set([
  "node_modules",
  ".next",
  ".build",
  "dist",
  "dist-electron",
  ".claude",
  "_references",
  "_mono_repo",
]);

/**
 * 6A.8: Discover all package.json files in the repo, excluding build artefacts,
 * reference code, and agent worktrees. Returns relative paths (forward slashes).
 */
export function discoverManifests(root) {
  const out = [];

  function walk(dir, depth) {
    if (depth > 5) return; // guard against very deep nesting
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (EXCLUDED_SEGMENTS.has(e.name)) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full, depth + 1);
      } else if (e.name === "package.json") {
        out.push(path.relative(root, full).replace(/\\/g, "/"));
      }
    }
  }

  walk(root, 0);
  return out.sort();
}

/** Nomes de deps no manifesto que não estão na allowlist (de-dup, ordem preservada). */
export function findUnapprovedDeps(depNames, allowlist) {
  const seen = new Set();
  const out = [];
  for (const name of depNames) {
    if (seen.has(name)) continue;
    seen.add(name);
    if (!allowlist.has(name)) out.push(name);
  }
  return out;
}

function depNamesFromManifest(root, rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) return [];
  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(full, "utf8"));
  } catch {
    return []; // skip malformed manifests (e.g. reference code)
  }
  return [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];
}

function collectDepNames(root) {
  return discoverManifests(root).flatMap((rel) => depNamesFromManifest(root, rel));
}

// ─── Task 7.8: registry-existence + age-cooldown ──────────────────────────────

/**
 * Pure function — determines whether a package is old enough to be trusted.
 *
 * A dep that was just registered (within the last 72h) is a red flag for
 * slopsquatting: an attacker can register the name an AI hallucinated within
 * minutes of the hallucination becoming public. The 72h window gives the npm
 * security team time to act and gives maintainers a chance to notice.
 *
 * @param {number} timeCreatedMs - Unix timestamp (ms) of when the package was
 *   first published to the registry (npm `time.created` field).
 * @param {number} nowMs - Unix timestamp (ms) for "now" (injectable for tests).
 * @param {number} minAgeHours - Minimum acceptable age in hours (default 72).
 * @returns {{ ok: boolean; ageHours: number }} ok=true if old enough.
 */
export function evaluateDepAge(timeCreatedMs, nowMs, minAgeHours = 72) {
  const ageHours = (nowMs - timeCreatedMs) / (1000 * 60 * 60);
  return { ok: ageHours >= minAgeHours, ageHours };
}

/**
 * Queries the npm registry for a package.
 * Returns { exists: boolean, createdMs: number | null } or null on network error.
 * Network failures are treated as "offline" — the caller decides what to do.
 *
 * @param {string} pkgName
 * @param {number} timeoutMs - How long to wait for the registry (default 8 000).
 * @returns {{ exists: boolean; createdMs: number | null } | null}
 */
export function queryNpmRegistry(pkgName, timeoutMs = 8000) {
  // Scope packages need URL-encoding for the `npm view` command.
  // `npm view` accepts scoped packages natively — no encoding needed.
  try {
    const raw = execFileSync(
      "npm",
      ["view", pkgName, "time.created", "--json"],
      {
        encoding: "utf8",
        timeout: timeoutMs,
        // Suppress npm progress/warn output on stderr
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    // npm view --json emits a quoted string or null/empty for missing fields
    const trimmed = raw.trim();
    if (!trimmed) {
      // Package exists but has no time.created (very unusual; treat as exists, age unknown)
      return { exists: true, createdMs: null };
    }
    const parsed = JSON.parse(trimmed);
    if (!parsed) return { exists: true, createdMs: null };
    const ms = new Date(parsed).getTime();
    return { exists: true, createdMs: Number.isFinite(ms) ? ms : null };
  } catch (err) {
    // npm exits with code 1 when the package is NOT found ("E404")
    const stderr = err.stderr?.toString() || "";
    const stdout = err.stdout?.toString() || "";
    if (stderr.includes("E404") || stdout.includes("E404") || stderr.includes("npm ERR! code E404")) {
      return { exists: false, createdMs: null };
    }
    // Any other error (ETIMEDOUT, ENOTFOUND, etc.) = network/offline — return null
    return null;
  }
}

/**
 * For a list of new (unapproved) deps, performs registry existence + age checks.
 * Returns an object with three lists:
 *   - notFound: packages that do NOT exist in the registry (likely hallucinated)
 *   - tooNew:   packages that exist but were published within the last 72h
 *   - offline:  packages we could not verify (registry unreachable)
 *
 * Designed to run AFTER findUnapprovedDeps — only called when there are new deps.
 *
 * @param {string[]} newDeps
 * @param {number} minAgeHours
 * @param {number} nowMs
 * @returns {{ notFound: string[]; tooNew: Array<{name:string,ageHours:number}>; offline: string[] }}
 */
export function auditNewDepsRegistry(newDeps, minAgeHours = 72, nowMs = Date.now()) {
  const notFound = [];
  const tooNew = [];
  const offline = [];

  for (const dep of newDeps) {
    const result = queryNpmRegistry(dep);
    if (result === null) {
      // Network error — skip gracefully
      offline.push(dep);
      continue;
    }
    if (!result.exists) {
      notFound.push(dep);
      continue;
    }
    if (result.createdMs !== null) {
      const { ok, ageHours } = evaluateDepAge(result.createdMs, nowMs, minAgeHours);
      if (!ok) {
        tooNew.push({ name: dep, ageHours: Math.round(ageHours * 10) / 10 });
      }
    }
    // exists + old enough (or age unknown) → pass silently
  }

  return { notFound, tooNew, offline };
}

function main() {
  if (!fs.existsSync(ALLOWLIST_PATH)) {
    console.error(
      `[check-deps] FAIL — ${path.basename(ALLOWLIST_PATH)} ausente. Gere com:\n` +
        `  node -e "require('./scripts/check/check-deps.mjs')" (ou veja o passo de bootstrap no PLANO)`
    );
    process.exit(1);
  }
  const allowlist = new Set(JSON.parse(fs.readFileSync(ALLOWLIST_PATH, "utf8")).allowed || []);
  const allDepNames = collectDepNames(ROOT);

  // 6A.8: stale-allowlist enforcement.
  // A dep in the allowlist that is no longer used in ANY manifest is stale — the dep
  // was removed, but the allowlist entry was not. Stale entries let the dep silently
  // re-appear without triggering the review gate (regression risk).
  // Note: only flag entries that appear in NO manifest; a dep may be in the allowlist
  // but only transitively installed, so we check against what manifests declare.
  const liveDepSet = new Set(allDepNames);
  assertNoStale(allowlist, liveDepSet, "check-deps");

  const unapproved = findUnapprovedDeps(allDepNames, allowlist);
  if (unapproved.length) {
    // Task 7.8: For each new dep, run registry-existence + age-cooldown checks.
    // This enriches the error message — tells the reviewer whether the package
    // even exists and how recently it was published, before they allowlist it.
    // Failures here do NOT add extra exit(1) calls — the allowlist gate already
    // fails; these are purely informational addenda to the error output.
    console.error(
      `[check-deps] ${unapproved.length} dependência(s) FORA da allowlist:\n` +
        unapproved.map((d) => "  ✗ " + d).join("\n") +
        `\n  → confirme que o pacote é legítimo (existe no registry, publisher conhecido, não é typosquat)\n` +
        `    e adicione o nome a dependency-allowlist.json ("allowed"). Esse é o ponto de revisão humana.`
    );

    // Registry audit (Task 7.8) — runs only when there are new deps.
    // Failures are non-fatal on network errors; registry check is advisory enrichment
    // (the allowlist gate above is the hard block).
    console.error(`[check-deps] Verificando deps novas no registry npm (Task 7.8)…`);
    const { notFound, tooNew, offline } = auditNewDepsRegistry(unapproved);

    if (offline.length) {
      console.warn(
        `[check-deps] WARN — registry npm inacessível (offline?); ` +
          `não foi possível verificar: ${offline.join(", ")}`
      );
    }
    if (notFound.length) {
      console.error(
        `[check-deps] BLOQUEIO EXTRA — ${notFound.length} dep(s) NÃO encontrada(s) no registry npm ` +
          `(provável nome alucinado — NÃO adicionar à allowlist!):\n` +
          notFound.map((d) => `  ✗✗ ${d} (não existe no registry)`).join("\n")
      );
    }
    if (tooNew.length) {
      console.error(
        `[check-deps] BLOQUEIO EXTRA — ${tooNew.length} dep(s) publicada(s) há <72h ` +
          `(age-cooldown anti-slopsquatting — aguarde 72h após publicação):\n` +
          tooNew.map((d) => `  ✗✗ ${d.name} (publicada há ~${d.ageHours}h)`).join("\n")
      );
    }

    process.exit(1);
  }
  if (process.exitCode === 1) return; // stale entries already logged
  const manifests = discoverManifests(ROOT);
  console.log(
    `[check-deps] OK — ${allowlist.size} dependências na allowlist, ` +
      `${manifests.length} manifests escaneados, nenhuma nova dep`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
