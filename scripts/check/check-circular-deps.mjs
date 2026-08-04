#!/usr/bin/env node
// scripts/check/check-circular-deps.mjs
// Gate: dpdm circular-deps cross-check (segunda opinião complementar ao check-cycles.mjs).
//
// check-cycles.mjs usa AST-TS próprio mas cobre apenas 5 sub-árvores + somente
// imports relativos. Este script usa dpdm (v4) que rastreia path-aliases via
// tsconfig.json e cobre entrypoints de alto risco.
//
// Advisory nesta versão: exit 0 sempre; imprime `circularDeps=N` para baseline.
// Direção da catraca: down (não pode subir). Adicionar ao quality-baseline.json
// como `{ value: N, direction: "down" }` após a primeira run verde no CI.
//
// Escopo limitado a 4 entrypoints principais para manter o tempo de análise
// abaixo de 60s. dpdm rastreia transitivamente todas as deps de cada entry.
// Cobrir mais entries aumenta o tempo sem proporcional ganho (as deps core se
// repetem via transitividade).
//
// Nota: dpdm pode reportar mais ciclos que check-cycles.mjs porque conta
// permutações de paths que passam pelo mesmo SCC, não apenas SCCs únicos.
// Isso é esperado — ferramentas diferentes, métricas complementares.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");

// Entrypoints: cobrem o pipeline principal (chat, combo, MCP, DB).
// Mantido enxuto para que `dpdm -T` (transform) termine em < 60s.
const ENTRYPOINTS = [
  "open-sse/handlers/chatCore.ts",
  "open-sse/services/combo.ts",
  "open-sse/mcp-server/index.ts",
  "src/lib/db/core.ts",
];

const DPDM_BIN = resolve(projectRoot, "node_modules/.bin/dpdm");
const TSCONFIG = resolve(projectRoot, "tsconfig.json");

/**
 * Parseia a saída JSON do dpdm e retorna a contagem de ciclos.
 * Função exportada para ser testada isoladamente sem executar o dpdm.
 *
 * @param {string} jsonStr - string com o JSON de saída do dpdm (campo "circulars").
 * @returns {{ count: number, circulars: string[][] }}
 */
export function parseDpdmOutput(jsonStr) {
  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error(`dpdm JSON parse failed: ${jsonStr.slice(0, 200)}`);
  }
  const circulars = Array.isArray(parsed.circulars) ? parsed.circulars : [];
  return { count: circulars.length, circulars };
}

/**
 * Executa o dpdm e retorna a string JSON bruta do arquivo de saída.
 *
 * @returns {string} conteúdo JSON do arquivo temporário.
 */
function runDpdm() {
  if (!existsSync(DPDM_BIN)) {
    throw new Error(`dpdm binary not found at ${DPDM_BIN}. Run: npm install`);
  }

  const tmpFile = path.join(os.tmpdir(), `dpdm-output-${process.pid}.json`);

  try {
    execFileSync(
      "node",
      [
        DPDM_BIN,
        "--circular",
        "--no-warning",
        "--no-tree",
        "-T",
        "--tsconfig",
        TSCONFIG,
        "-o",
        tmpFile,
        ...ENTRYPOINTS,
      ],
      {
        cwd: projectRoot,
        stdio: "inherit",
        timeout: 120_000,
      }
    );

    if (!existsSync(tmpFile)) {
      throw new Error(`dpdm did not produce output file at ${tmpFile}`);
    }

    const raw = readFileSync(tmpFile, "utf8");
    return raw;
  } finally {
    try {
      fs.unlinkSync(tmpFile);
    } catch {
      // best-effort cleanup
    }
  }
}

function main() {
  console.log("[circular-deps] Running dpdm cross-check...");
  console.log(`[circular-deps] Entrypoints: ${ENTRYPOINTS.join(", ")}`);

  let raw;
  try {
    raw = runDpdm();
  } catch (err) {
    console.error(`[circular-deps] ERROR running dpdm: ${err.message}`);
    process.exit(1);
  }

  let result;
  try {
    result = parseDpdmOutput(raw);
  } catch (err) {
    console.error(`[circular-deps] ERROR parsing dpdm output: ${err.message}`);
    process.exit(1);
  }

  // Advisory mode: always exit 0. Catraca pode ser adicionada no quality-baseline.json
  // após baseline ser estabelecida.
  console.log(`[circular-deps] circularDeps=${result.count}`);
  console.log(
    `[circular-deps] Advisory — add to quality-baseline.json: { "value": ${result.count}, "direction": "down" }`
  );
  process.exit(0);
}

// Permite que o módulo seja importado em testes sem executar main().
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
