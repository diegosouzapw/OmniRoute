import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Gera o export estável do catálogo (scripts/release/radar-export.mjs) e valida
// o contrato consumido pelo OmniRoute Radar + a proveniência (D16: desconhecido
// permanece `null`, nunca inventado).

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(DIR, "../.."); // …/OmniRoute
const SCRIPT = path.join(REPO, "scripts/release/radar-export.mjs");

function runExport(extraEnv = {}) {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "radar-export-"));
  const outPath = path.join(outDir, "export-omniroute.json");
  execFileSync("node", ["--import", "tsx/esm", SCRIPT, outPath], {
    cwd: REPO,
    stdio: ["ignore", "ignore", "inherit"],
    // Base limpa: sem herdar GITHUB_* do ambiente do CI que roda os testes.
    env: {
      PATH: process.env.PATH,
      HOME: process.env.HOME,
      GITHUB_SHA: undefined,
      GITHUB_REF_NAME: undefined,
      GITHUB_REF: undefined,
      GITHUB_ACTIONS: undefined,
      GITHUB_SERVER_URL: undefined,
      GITHUB_REPOSITORY: undefined,
      GITHUB_RUN_ID: undefined,
      ...extraEnv,
    },
  });
  const parsed = JSON.parse(fs.readFileSync(outPath, "utf8"));
  fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  return parsed;
}

test("radar export satisfies the Radar consumer contract with a fresh catalog", () => {
  const data = runExport();
  // Contrato mínimo de src/feed/exportSource.ts: budgets[] não-vazio + geradoEm.
  assert.ok(Array.isArray(data.budgets) && data.budgets.length > 0, "budgets não-vazio");
  assert.ok(Array.isArray(data.registry) && data.registry.length > 0, "registry não-vazio");
  assert.ok(
    typeof data.geradoEm === "string" && !Number.isNaN(Date.parse(data.geradoEm)),
    "geradoEm ISO válido"
  );
  assert.ok(data.totais && typeof data.totais === "object", "totais presente");
  // registry ordenado e sem duplicatas (chaves de provider).
  assert.deepEqual(data.registry, [...data.registry].sort());
});

test("radar export provenance never fabricates unknown fields", () => {
  const data = runExport();
  const p = data.provenance;
  assert.ok(p && typeof p === "object", "provenance presente");
  assert.equal(p.generatedAt, data.geradoEm);
  assert.equal(p.generator, "scripts/release/radar-export.mjs");
  // Fora de um runner do GitHub Actions: manual, e ref/runUrl desconhecidos = null.
  assert.equal(p.generatedBy, "manual");
  assert.equal(p.sourceRef, null);
  assert.equal(p.runUrl, null);
  // sourceCommit: SHA de 40 hex (via git no checkout) ou null se indisponível.
  assert.ok(
    p.sourceCommit === null || /^[0-9a-f]{40}$/.test(p.sourceCommit),
    "sourceCommit sha|null"
  );
});

test("radar export provenance reflects the GitHub Actions environment when present", () => {
  const sha = "0123456789abcdef0123456789abcdef01234567";
  const data = runExport({
    GITHUB_ACTIONS: "true",
    GITHUB_SHA: sha,
    GITHUB_REF_NAME: "release/v9.9.9",
    GITHUB_SERVER_URL: "https://github.com",
    GITHUB_REPOSITORY: "diegosouzapw/OmniRoute",
    GITHUB_RUN_ID: "42",
  });
  const p = data.provenance;
  assert.equal(p.generatedBy, "github-actions");
  assert.equal(p.sourceCommit, sha);
  assert.equal(p.sourceRef, "release/v9.9.9");
  assert.equal(p.runUrl, "https://github.com/diegosouzapw/OmniRoute/actions/runs/42");
});
