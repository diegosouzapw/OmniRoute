#!/usr/bin/env node
// scripts/check/check-public-creds.mjs
// Gate de segurança — CLAUDE.md Hard Rule #11.
//
// Credenciais públicas de upstream (OAuth client_id/client_secret de CLIs públicas
// + Firebase web keys) DEVEM ser embutidas via `resolvePublicCred()` /
// `resolvePublicCredMulti()` (de open-sse/utils/publicCreds.ts), NUNCA como string
// literal no código. Ver docs/security/PUBLIC_CREDS.md.
//
// Literais embutidos (a) disparam scanners de secret/CodeQL a cada release, gerando
// ruído, e (b) acoplam o valor ao texto-fonte em vez de ao decodificador central —
// se o upstream rotacionar o client_id público, há N cópias para atualizar e o
// override por `process.env` deixa de ser a única fonte de verdade.
//
// Este gate varre os arquivos que carregam configuração de credencial e bloqueia
// QUALQUER atribuição NOVA de uma chave de credencial a uma string literal não-vazia.
// Os literais pré-existentes (auditados abaixo) ficam congelados em
// KNOWN_LITERAL_CREDS para a catraca sair 0 hoje e bloquear regressões.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";

const cwd = process.cwd();

// 6A.8: Instead of a static hardcoded list, scan the two credential-bearing subtrees
// dynamically so new files (new executor, new OAuth provider) are caught automatically.
// Anchor files (providerRegistry.ts, oauth.ts) are the canonical credential config;
// the broader scan covers new additions in open-sse/ and src/lib/oauth/.
// Exclusions: test files, node_modules, .next.
const SCAN_ROOTS = [path.join(cwd, "open-sse"), path.join(cwd, "src", "lib", "oauth")];

function walkTs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "node_modules" && e.name !== ".next") walkTs(p, acc);
    } else if (/\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) {
      acc.push(p);
    }
  }
  return acc;
}

function collectScannedFiles() {
  const files = [];
  for (const root of SCAN_ROOTS) {
    for (const abs of walkTs(root)) {
      files.push(path.relative(cwd, abs).replace(/\\/g, "/"));
    }
  }
  return files;
}

// Chaves de objeto cujo valor é uma credencial. Atribuir qualquer uma destas a uma
// string literal não-vazia viola a Hard Rule #11.
//   - clientIdDefault / clientSecretDefault: forma do providerRegistry (entry.oauth)
//   - clientId / clientSecret: forma dos *_CONFIG em oauth.ts
//   - apiKey / apiKeyDefault: chaves de API embutidas (mesmo princípio)
const CRED_KEY_RE =
  /(?:^|[\s{,([])(clientIdDefault|clientSecretDefault|clientId|clientSecret|apiKeyDefault|apiKey)\s*:/;

// Chaves de ambiente (clientIdEnv, clientSecretEnv, …) terminam em "Env" e carregam
// o NOME da variável de ambiente, não a credencial — nunca devem ser flagadas.
const ENV_KEY_RE = /(clientId|clientSecret|apiKey)Env\s*:/;

// Literais pré-existentes auditados (DISCOVERY 2026-06-09). Cada um é uma credencial
// pública de upstream embutida ANTES deste gate existir. Ficam congelados aqui para
// a catraca sair 0 agora e bloquear QUALQUER literal NOVO. CADA UM é dívida de
// segurança Rule #11 a ser migrada para resolvePublicCred() — NÃO adicione novos
// sem justificativa; esse é o ponto do gate.
//
// A allowlist casa por VALOR do literal (o mesmo client_id público aparece nos dois
// arquivos, então congelar por valor cobre ambas as cópias). Para congelar um valor
// só num arquivo:linha específico, use a chave "arquivo:linha:valor".
//
// All five public client_ids (9 call-sites) were migrated to resolvePublicCred() in
// #3493 (embedded as claude_id/codex_id/qwen_id/kimi_id/github_copilot_id in
// open-sse/utils/publicCreds.ts), matching the Gemini/Antigravity pattern.
//
// 6A.8: Expanded scope to open-sse/** + src/lib/oauth/**. Newly discovered FPs:
//
//   open-sse/services/usage.ts L499: `getMiniMaxUsage(apiKey: string, provider: "minimax" | "minimax-cn")`
//   The CRED_KEY_RE matches `apiKey:` in the TypeScript function-parameter type annotation.
//   "minimax" and "minimax-cn" are provider-name strings in the type annotation, NOT credentials.
//   This is a false positive (the gate was designed for object-literal assignments, not fn params).
//   TODO(6A.8): Consider tightening CRED_KEY_RE to exclude function-signature contexts — but
//   that adds complexity; the FP rate is low (1 file). Frozen by file:line:value key.
export const KNOWN_LITERAL_CREDS = new Set([
  "open-sse/services/usage.ts:499:minimax", // TODO(6A.8): pre-existing FP — TS fn-param type, not a credential (moved 582→499 by the OpenCode/Ollama usage extraction)
  "open-sse/services/usage.ts:499:minimax-cn", // TODO(6A.8): pre-existing FP — TS fn-param type, not a credential (moved 582→499 by the OpenCode/Ollama usage extraction)
]);

/**
 * Encontra atribuições de uma chave de credencial a uma string literal não-vazia.
 *
 * Pura: recebe o texto-fonte e a allowlist, devolve a lista de violações. Não toca
 * em I/O. Cada violação é "L<linha>: <key> = \"<literal>\"".
 *
 * Regras de detecção (linha a linha):
 *   1. A linha precisa atribuir uma das CRED_KEY (clientIdDefault, clientId, …)
 *      e não ser uma chave *Env (que carrega só o nome da env-var).
 *   2. Se o RHS chama resolvePublicCred()/resolvePublicCredMulti(), está CORRETO
 *      (o literal ali é a CHAVE do default embutido, não a credencial) → ignora.
 *   3. Caso contrário, qualquer string literal NÃO-VAZIA no RHS é uma violação
 *      — cobre tanto `key: "literal"` quanto `key: process.env.X || "literal"`.
 *   4. Literais vazios ("" / '') são fallback legítimo de process.env → ignorados.
 *   5. Literais presentes na allowlist (por valor OU por chave "arquivo:linha:valor")
 *      ficam congelados → ignorados.
 *
 * @param {string} source  conteúdo do arquivo
 * @param {Set<string>} allowlist  valores de literal (ou chaves arquivo:linha:valor) congelados
 * @param {string} [relFile]  caminho relativo do arquivo (para chaves arquivo:linha:valor)
 * @returns {string[]}  violações legíveis
 */
export function findLiteralCreds(source, allowlist, relFile = "") {
  const violations = [];
  const lines = String(source).split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const keyMatch = CRED_KEY_RE.exec(line);
    if (!keyMatch) continue;
    if (ENV_KEY_RE.test(line)) continue;
    const key = keyMatch[1];

    // RHS = tudo após o primeiro ":" da chave de credencial.
    const colonIdx = line.indexOf(":", keyMatch.index);
    const rhs = colonIdx >= 0 ? line.slice(colonIdx + 1) : line;

    // Forma correta: embutido via decodificador central. Não inspeciona literais.
    if (/resolvePublicCred(?:Multi)?\s*\(/.test(rhs)) continue;

    // Extrai todo literal de string do RHS (aspas simples, duplas ou crase).
    const litRe = /(["'`])((?:\\.|(?!\1).)*)\1/g;
    let lit;
    while ((lit = litRe.exec(rhs))) {
      const value = lit[2];
      if (!value) continue; // "" / '' — fallback de env, legítimo
      const lineNo = i + 1;
      const fileLineKey = relFile ? `${relFile}:${lineNo}:${value}` : "";
      if (allowlist.has(value)) continue;
      if (fileLineKey && allowlist.has(fileLineKey)) continue;
      violations.push(`L${lineNo}: ${key} = ${JSON.stringify(value)}`);
    }
  }
  return violations;
}

function main() {
  const scannedFiles = collectScannedFiles();

  // 6A.8: stale-allowlist enforcement.
  // Compute all live violations WITHOUT the allowlist, then check for stale entries.
  const liveViolationKeys = new Set();
  for (const rel of scannedFiles) {
    const src = fs.readFileSync(path.join(cwd, rel), "utf8");
    for (const v of findLiteralCreds(src, new Set(), rel)) {
      // v is like "L543: apiKey = \"minimax\"" — generate the same file:line:value key
      // that the allowlist uses so stale detection matches by canonical key form.
      const lineMatch = v.match(/^L(\d+):/);
      const lineNo = lineMatch ? lineMatch[1] : "?";
      const valMatch = v.match(/"([^"]+)"$/);
      const val = valMatch ? valMatch[1] : v;
      liveViolationKeys.add(`${rel}:${lineNo}:${val}`);
      liveViolationKeys.add(val); // also track plain value for backward compat
    }
  }
  assertNoStale(KNOWN_LITERAL_CREDS, liveViolationKeys, "check-public-creds");

  const allMisses = [];
  for (const rel of scannedFiles) {
    const src = fs.readFileSync(path.join(cwd, rel), "utf8");
    for (const v of findLiteralCreds(src, KNOWN_LITERAL_CREDS, rel)) {
      allMisses.push(`${rel} ${v}`);
    }
  }
  if (allMisses.length) {
    console.error(
      `[check-public-creds] ${allMisses.length} credencial(is) pública(s) como string literal ` +
        `(viola CLAUDE.md Hard Rule #11):\n` +
        allMisses.map((m) => "  ✗ " + m).join("\n") +
        `\n  → embuta via resolvePublicCred()/resolvePublicCredMulti() ` +
        `(open-sse/utils/publicCreds.ts). Ver docs/security/PUBLIC_CREDS.md.\n` +
        `  → se for um literal pré-existente já auditado, congele em KNOWN_LITERAL_CREDS ` +
        `com justificativa (e abra tracking de migração).`
    );
    process.exit(1);
  }
  if (process.exitCode === 1) return; // stale entries already logged
  console.log(
    `[check-public-creds] OK (${scannedFiles.length} arquivo(s) em ${SCAN_ROOTS.length} raiz(es), ` +
      `${KNOWN_LITERAL_CREDS.size} literal(is) congelado(s))`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
