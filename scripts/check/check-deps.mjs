#!/usr/bin/env node
// scripts/check/check-deps.mjs
// Gate anti-slopsquatting: toda dependência em package.json (raiz + electron) deve
// estar numa allowlist commitada (dependency-allowlist.json). Uma dep nova exige
// adição EXPLÍCITA à allowlist — assim um agente não consegue introduzir um pacote
// alucinado/typosquatted silenciosamente (CSA 2026: 19,7% do código IA cita pacotes
// inexistentes; 43% dos nomes alucinados reaparecem, registráveis por atacantes).
// A revisão humana ao adicionar à allowlist é o ponto de controle.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const ALLOWLIST_PATH = path.join(ROOT, "dependency-allowlist.json");
const MANIFESTS = ["package.json", path.join("electron", "package.json")];

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

function depNamesFromManifest(file) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return [];
  const pkg = JSON.parse(fs.readFileSync(full, "utf8"));
  return [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
  ];
}

function collectDepNames() {
  return MANIFESTS.flatMap(depNamesFromManifest);
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
  const unapproved = findUnapprovedDeps(collectDepNames(), allowlist);
  if (unapproved.length) {
    console.error(
      `[check-deps] ${unapproved.length} dependência(s) FORA da allowlist:\n` +
        unapproved.map((d) => "  ✗ " + d).join("\n") +
        `\n  → confirme que o pacote é legítimo (existe no registry, publisher conhecido, não é typosquat)\n` +
        `    e adicione o nome a dependency-allowlist.json ("allowed"). Esse é o ponto de revisão humana.`
    );
    process.exit(1);
  }
  console.log(`[check-deps] OK — ${allowlist.size} dependências na allowlist, nenhuma nova`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
