#!/usr/bin/env node
// scripts/check/check-lockfile.mjs
// Gate de política de lockfile (CLAUDE.md — extensão Hard Rule #1).
//
// Objetivo: detectar supply-chain poisoning no package-lock.json antes que código
// malicioso entre no repo. Verifica:
//   --validate-https       → toda URL "resolved" deve usar HTTPS (bloqueia http://)
//   --validate-integrity   → todo pacote deve ter hash de integridade sha512
//   --allowed-hosts npm    → apenas registry.npmjs.org é host permitido
//
// Complementa check-deps (Fase 2 / allowlist de nomes): aquele garante que só
// nomes aprovados entram; este garante que os pacotes instalados vieram do registry
// legítimo com integridade verificável.
//
// Referência: PLANO-QUALITY-GATES-FASE7.md, Task 7.7.
// Tool: lockfile-lint v5 (node_modules/.bin/lockfile-lint).

import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();

/**
 * Returns the canonical lockfile-lint configuration used by this gate.
 * Exporting this object makes the policy auditable and unit-testable without
 * spawning a child process.
 *
 * @returns {{
 *   lockfilePath: string,
 *   type: string,
 *   validateHttps: boolean,
 *   validateIntegrity: boolean,
 *   allowedHosts: string[],
 * }}
 */
export function getLockfileLintConfig() {
  return {
    lockfilePath: path.join(ROOT, "package-lock.json"),
    type: "npm",
    validateHttps: true,
    validateIntegrity: true,
    // Only the official npm registry is permitted.
    // registry.npmjs.org resolves to the "npm" shorthand in lockfile-lint.
    // If the project ever adopts a scoped/private registry, add its hostname here
    // and document the justification.
    allowedHosts: ["npm"],
  };
}

/**
 * Builds the argv array to pass to the lockfile-lint binary, derived from
 * the config returned by getLockfileLintConfig().
 *
 * @param {ReturnType<typeof getLockfileLintConfig>} cfg
 * @returns {string[]}
 */
export function buildLockfileLintArgs(cfg) {
  const args = [
    "--path", cfg.lockfilePath,
    "--type", cfg.type,
  ];
  if (cfg.validateHttps) args.push("--validate-https");
  if (cfg.validateIntegrity) args.push("--validate-integrity");
  if (cfg.allowedHosts.length) {
    args.push("--allowed-hosts", ...cfg.allowedHosts);
  }
  return args;
}

function main() {
  const cfg = getLockfileLintConfig();

  if (!fs.existsSync(cfg.lockfilePath)) {
    console.error(
      `[check-lockfile] FAIL — lockfile not found: ${cfg.lockfilePath}\n` +
        "  → Run `npm install` to generate package-lock.json"
    );
    process.exit(1);
  }

  const bin = path.join(ROOT, "node_modules", ".bin", "lockfile-lint");
  if (!fs.existsSync(bin)) {
    console.error(
      `[check-lockfile] FAIL — lockfile-lint binary not found at:\n  ${bin}\n` +
        "  → Run `npm install` to install dev dependencies"
    );
    process.exit(1);
  }

  const args = buildLockfileLintArgs(cfg);

  try {
    const output = execFileSync(bin, args, { encoding: "utf8" });
    // lockfile-lint outputs a green ✔ message on success
    console.log("[check-lockfile] OK —", output.trim());
  } catch (err) {
    const stdout = err.stdout ?? "";
    const stderr = err.stderr ?? "";
    console.error("[check-lockfile] FAIL — lockfile-lint found policy violations:");
    if (stdout) console.error(stdout);
    if (stderr) console.error(stderr);
    console.error(
      "\n  Possible causes:\n" +
        "  • A package was resolved from a non-HTTPS URL (http:// poisoning attempt)\n" +
        "  • A package is missing its integrity hash (tampered or legacy entry)\n" +
        "  • A package was resolved from a host other than registry.npmjs.org\n" +
        "    If a scoped/private registry is intentionally used, add its hostname\n" +
        "    to getLockfileLintConfig().allowedHosts in scripts/check/check-lockfile.mjs"
    );
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
