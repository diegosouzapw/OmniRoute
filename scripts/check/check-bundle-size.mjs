#!/usr/bin/env node
// scripts/check/check-bundle-size.mjs
// Catraca de bundle size (Task 12 — Fase 7).
//
// MODO PREFERENCIAL — size-limit + @size-limit/file (ou outro plugin):
//   Rodar `size-limit --json` via .size-limit.json; extrair o campo `size` de cada
//   entry e somar. Emite `bundleSize=<bytes>`.
//
// MODO FALLBACK — raw fs.statSync() (sem plugins instalados):
//   Quando size-limit retorna "no plugins" (isEmpty — só o core está instalado), o
//   script lê os `path` declarados em .size-limit.json diretamente via fs.statSync()
//   e soma os bytes. Mesmas entradas, mesma métrica. Emite `bundleSize=<bytes>`.
//
// MODO SKIP — entradas inexistentes:
//   Se nenhuma das entradas do .size-limit.json existir (ex: build não rodou e os
//   arquivos apontados são artefatos gerados), emite `bundleSize=SKIP reason=no-build`
//   e sai 0.
//
// Esta versão é ADVISORY: sempre sai 0 independente do resultado.
// O ratchet (direction:down) é gerenciado pelo motor de quality-baseline.json na
// integração com o CI (Task 12 INT).
//
// Uso:
//   node scripts/check/check-bundle-size.mjs
//   node scripts/check/check-bundle-size.mjs --json   (força saída JSON de size-limit se possível)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";

const ROOT = process.cwd();
const SIZE_LIMIT_CONFIG = path.join(ROOT, ".size-limit.json");
const SIZE_LIMIT_BIN = path.join(ROOT, "node_modules", ".bin", "size-limit");

/**
 * Tenta rodar size-limit --json e retorna o array de resultados.
 * Lança se size-limit não tiver plugins instalados (plugins.isEmpty).
 *
 * @returns {Array<{name: string, size: number, sizeLimit?: number, passed?: boolean}>}
 * @throws {SizeLimitNoPluginsError}
 */
export function runSizeLimit(cwd = ROOT, binPath = SIZE_LIMIT_BIN) {
  if (!fs.existsSync(binPath)) {
    throw Object.assign(new Error("size-limit binary not found"), { code: "SL_NO_BIN" });
  }
  let stdout;
  try {
    stdout = execFileSync("node", [binPath, "--json"], {
      encoding: "utf8",
      cwd,
      maxBuffer: 8 * 1024 * 1024,
    });
  } catch (err) {
    const combined = (err.stdout || "") + (err.stderr || "");
    if (
      combined.includes("Install Size Limit preset") ||
      combined.includes("plugins.isEmpty") ||
      combined.includes("@size-limit/preset")
    ) {
      throw Object.assign(new Error("size-limit: no plugins installed"), {
        code: "SL_NO_PLUGINS",
      });
    }
    throw err;
  }
  return JSON.parse(stdout.trim());
}

/**
 * Parseia o JSON de saída do size-limit e retorna o total em bytes.
 * Lança se o JSON não tiver o campo `size` em pelo menos uma entrada.
 *
 * @param {Array<{name: string, size?: number}>} results
 * @returns {number} total em bytes
 */
export function parseSizeLimitResults(results) {
  if (!Array.isArray(results)) {
    throw new TypeError("parseSizeLimitResults: esperado array de resultados");
  }
  let total = 0;
  let hasMeasured = false;
  for (const entry of results) {
    if (typeof entry.size === "number") {
      total += entry.size;
      hasMeasured = true;
    }
  }
  if (!hasMeasured) {
    throw new Error("parseSizeLimitResults: nenhuma entrada com campo `size` numérico");
  }
  return total;
}

/**
 * Fallback: lê os `path` do .size-limit.json via fs.statSync().
 * Retorna {total, entries, allMissing} onde:
 *   - total: soma dos bytes dos arquivos encontrados
 *   - entries: [{name, path, size}]
 *   - allMissing: true se NENHUM arquivo existia (skip)
 *
 * @param {string} configPath
 * @param {string} cwd
 */
export function measureViaFileStat(configPath = SIZE_LIMIT_CONFIG, cwd = ROOT) {
  if (!fs.existsSync(configPath)) {
    return { total: 0, entries: [], allMissing: true };
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  let total = 0;
  let found = 0;
  const entries = [];
  for (const entry of config) {
    const entryPath = path.isAbsolute(entry.path)
      ? entry.path
      : path.join(cwd, entry.path);
    if (!fs.existsSync(entryPath)) {
      entries.push({ name: entry.name, path: entry.path, size: null });
      continue;
    }
    const size = fs.statSync(entryPath).size;
    total += size;
    found++;
    entries.push({ name: entry.name, path: entry.path, size });
  }
  return { total, entries, allMissing: found === 0 };
}

function main() {
  // Step 1: tenta com size-limit + plugin instalado
  let totalBytes = null;
  let mode = "size-limit";

  try {
    const results = runSizeLimit(ROOT, SIZE_LIMIT_BIN);
    totalBytes = parseSizeLimitResults(results);
  } catch (err) {
    if (err.code === "SL_NO_PLUGINS" || err.code === "SL_NO_BIN") {
      // Step 2: fallback para leitura direta de arquivo
      mode = "fallback-stat";
      const { total, entries, allMissing } = measureViaFileStat(SIZE_LIMIT_CONFIG, ROOT);

      if (allMissing) {
        // Step 3: skip gracioso — entradas não existem (build necessário)
        console.log("bundleSize=SKIP reason=no-build");
        if (process.env.CI) {
          console.log("::notice::check-bundle-size skipped — entradas do .size-limit.json não encontradas (build necessário)");
        }
        return;
      }

      totalBytes = total;
      for (const e of entries) {
        if (e.size !== null) {
          const kb = (e.size / 1024).toFixed(2);
          console.log(`  ${e.name}: ${kb} KB (${e.size} bytes)`);
        } else {
          console.log(`  ${e.name}: ausente (não contabilizado)`);
        }
      }
    } else {
      // Erro inesperado — reporta mas não falha (advisory)
      console.error(`[bundle-size] Aviso: size-limit retornou erro inesperado: ${err.message}`);
      console.log("bundleSize=SKIP reason=size-limit-error");
      return;
    }
  }

  const kb = (totalBytes / 1024).toFixed(2);
  console.log(`bundleSize=${totalBytes}`);
  console.log(`[bundle-size] ${mode}: total ${kb} KB (${totalBytes} bytes) — advisory, saindo 0`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
