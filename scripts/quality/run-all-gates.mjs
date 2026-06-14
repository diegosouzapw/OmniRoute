#!/usr/bin/env node
// scripts/quality/run-all-gates.mjs
// Agregador paralelo de quality gates determinísticos.
// Roda os gates filesystem-only em paralelo (pool ~4), agrega resultados, e exibe
// uma tabela consolidada com {gate, status, durationMs}. Sai com código 1 se
// qualquer gate falhar. Alvo: < 3 min no total.
//
// Usage:
//   node scripts/quality/run-all-gates.mjs           # run all gates
//   node scripts/quality/run-all-gates.mjs --fast    # skip slow gates (duplication)
//
// Via npm: npm run quality:scan

import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

const FAST_ONLY = process.argv.includes("--fast");

// Gates determinísticos filesystem-only, agrupados por tempo estimado.
// Cada entrada: { name: string, cmd: string[], label?: string }
// "slow" gates são omitidos com --fast.
const GATES = [
  // Group A — instant (<1s)
  { name: "check:tracked-artifacts", cmd: ["node", "scripts/check/check-tracked-artifacts.mjs"] },
  { name: "check:any-budget:t11", cmd: ["node", "scripts/check/check-t11-any-budget.mjs"] },
  { name: "check:migration-numbering", cmd: ["node", "scripts/check/check-migration-numbering.mjs"] },
  { name: "check:node-runtime", cmd: ["node", "--import", "tsx", "scripts/check/check-supported-node-runtime.ts"] },

  // Group B — fast (<5s)
  { name: "check:provider-consistency", cmd: ["node", "--import", "tsx", "scripts/check/check-provider-consistency.ts"] },
  { name: "check:public-creds", cmd: ["node", "scripts/check/check-public-creds.mjs"] },
  { name: "check:error-helper", cmd: ["node", "scripts/check/check-error-helper.mjs"] },
  { name: "check:fetch-targets", cmd: ["node", "scripts/check/check-fetch-targets.mjs"] },
  { name: "check:openapi-routes", cmd: ["node", "scripts/check/check-openapi-routes.mjs"] },
  { name: "check:deps", cmd: ["node", "scripts/check/check-deps.mjs"] },

  // Group C — moderate (<15s)
  { name: "check:db-rules", cmd: ["node", "scripts/check/check-db-rules.mjs"] },
  { name: "check:file-size", cmd: ["node", "scripts/check/check-file-size.mjs"] },
  { name: "check:complexity", cmd: ["node", "scripts/check/check-complexity.mjs"] },
  { name: "check:docs-symbols", cmd: ["node", "scripts/check/check-docs-symbols.mjs"] },
  { name: "check:known-symbols", cmd: ["node", "--import", "tsx", "scripts/check/check-known-symbols.ts"] },
  { name: "check:route-guard-membership", cmd: ["node", "--import", "tsx", "scripts/check/check-route-guard-membership.ts"] },
  { name: "check:test-discovery", cmd: ["node", "scripts/check/check-test-discovery.mjs"] },
  { name: "check:test-masking", cmd: ["node", "scripts/check/check-test-masking.mjs"] },

  // Group D — slow (>15s); skipped with --fast
  { name: "check:duplication", cmd: ["node", "scripts/check/check-duplication.mjs"], slow: true },
  { name: "check:cycles", cmd: ["node", "scripts/check/check-cycles.mjs"], slow: true },
];

const CONCURRENCY = 4;

/**
 * Run a single gate command, capturing last line of stdout/stderr.
 * @param {{ name: string, cmd: string[] }} gate
 * @returns {Promise<{ name: string, exitCode: number, durationMs: number, lastLine: string }>}
 */
function runGate(gate) {
  return new Promise((resolve) => {
    const start = Date.now();
    const [bin, ...args] = gate.cmd;
    const proc = spawn(bin, args, { stdio: ["ignore", "pipe", "pipe"], cwd: process.cwd() });

    const lines = [];
    const collectLine = (chunk) => {
      const text = chunk.toString();
      for (const line of text.split("\n")) {
        const t = line.trim();
        if (t) lines.push(t);
      }
    };

    proc.stdout.on("data", collectLine);
    proc.stderr.on("data", collectLine);

    proc.on("close", (code) => {
      const durationMs = Date.now() - start;
      const lastLine = lines[lines.length - 1] ?? "";
      resolve({ name: gate.name, exitCode: code ?? 1, durationMs, lastLine });
    });

    proc.on("error", (err) => {
      const durationMs = Date.now() - start;
      resolve({ name: gate.name, exitCode: 1, durationMs, lastLine: err.message });
    });
  });
}

/**
 * Run gates with a concurrency pool.
 * @param {typeof GATES} gates
 * @param {number} concurrency
 * @returns {Promise<ReturnType<typeof runGate>[]>}
 */
async function runWithPool(gates, concurrency) {
  const results = [];
  let idx = 0;

  async function worker() {
    while (idx < gates.length) {
      const gate = gates[idx++];
      const result = await runGate(gate);
      results.push(result);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, gates.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

function formatTable(results) {
  const COL_NAME = 35;
  const COL_STATUS = 8;
  const COL_MS = 10;
  const COL_MSG = 60;

  const header =
    "  " +
    "GATE".padEnd(COL_NAME) +
    "STATUS".padEnd(COL_STATUS) +
    "TIME(ms)".padEnd(COL_MS) +
    "LAST LINE";

  const separator = "  " + "─".repeat(COL_NAME + COL_STATUS + COL_MS + COL_MSG);

  const rows = results.map((r) => {
    const status = r.exitCode === 0 ? "PASS" : "FAIL";
    const name = r.name.padEnd(COL_NAME);
    const statusCol = (r.exitCode === 0 ? "✔ " + status : "✗ " + status).padEnd(COL_STATUS + 2);
    const ms = String(r.durationMs).padStart(6) + "ms  ";
    const msg = r.lastLine.slice(0, COL_MSG);
    return `  ${name}${statusCol}${ms}${msg}`;
  });

  return [separator, header, separator, ...rows, separator].join("\n");
}

async function main() {
  const gates = FAST_ONLY ? GATES.filter((g) => !g.slow) : GATES;

  console.log(`\n[quality:scan] Running ${gates.length} gate(s) with concurrency=${CONCURRENCY}...\n`);
  const wallStart = Date.now();

  const results = await runWithPool(gates, CONCURRENCY);

  const wallMs = Date.now() - wallStart;
  const failed = results.filter((r) => r.exitCode !== 0);
  const passed = results.filter((r) => r.exitCode === 0);

  console.log(formatTable(results));
  console.log(
    `\n  Summary: ${passed.length} passed, ${failed.length} failed` +
      `  |  Total: ${(wallMs / 1000).toFixed(1)}s (wall clock)\n`
  );

  if (failed.length > 0) {
    console.error(`[quality:scan] FAIL — ${failed.length} gate(s) failed:`);
    for (const r of failed) {
      console.error(`  ✗ ${r.name}`);
    }
    process.exit(1);
  }

  console.log("[quality:scan] All gates passed.");
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
