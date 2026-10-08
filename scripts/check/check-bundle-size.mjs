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
//   Se nenhuma das entradas do .size-limit.json existir, emite
//   `bundleSize=SKIP reason=no-build`. Sob --ratchet isso é exit 1 (G-04): sem
//   medição não há veredito. Sem --ratchet, sai 0.
//
// Por default é ADVISORY: sempre sai 0 independente do resultado. Passe --ratchet
// para tornar BLOQUEANTE: lê metrics.bundleSize.value de
// config/quality/quality-baseline.json, compara o total MEDIDO e SAI 1 SE — E SOMENTE
// SE — o medido for MAIOR que o baseline (regressão real, direction:down).
//
// IMPORTANTE: o baseline (10384) é o valor GZIP do size-limit + @size-limit/file
// (instalado por 'npm ci' no CI). O modo FALLBACK-stat lê bytes CRUS (uma métrica
// DIFERENTE e maior) — comparar fallback-stat contra o baseline gzip seria um falso-
// positivo, então o fallback não pode produzir veredito de ratchet.
//
// #15159 / G-04 — ANTES, todos os caminhos de "não medível" (binário ausente, sem
// plugins, erro inesperado, baseline ausente, métrica não-comparável) saíam 0,
// inclusive sob --ratchet, com comentários explicitando isso. Um ratchet que não
// mede e reporta OK converte "desconhecido" em "verificado" — e o passo do ci.yml
// se chamava "Bundle size (ratchet, blocking)". Agora a regra é uma só:
//
//   --ratchet + medição comparável  → compara e bloqueia numa regressão real
//   --ratchet + NÃO MEDIDO          → exit 1, com o motivo e o remédio
//   sem --ratchet (advisory)         → sempre exit 0, medido ou não
//
// Uso:
//   node scripts/check/check-bundle-size.mjs
//   node scripts/check/check-bundle-size.mjs --json     (força saída JSON de size-limit se possível)
//   node scripts/check/check-bundle-size.mjs --ratchet   (bloqueia numa regressão OU numa falha de medição)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";
import {
  resolveLocalBinEntry,
  isNativeExecutable,
  planBuildToolSpawn,
} from "../build/buildToolRunner.mjs";

const ROOT = process.cwd();
const SIZE_LIMIT_CONFIG = path.join(ROOT, ".size-limit.json");
const SIZE_LIMIT_BIN = path.join(ROOT, "node_modules", ".bin", "size-limit");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");
const RATCHET = process.argv.includes("--ratchet");

/**
 * Decide COMO invocar o size-limit local.
 *
 * G-04: antes isto era `execFileSync("node", ["node_modules/.bin/size-limit",
 * "--json"])`. Em Windows esse caminho é um shim de shell (e não JavaScript), então
 * `node <shim>` morria com "SyntaxError: missing ) after argument list" em TODA
 * invocação — o modo de medição preferido era inalcançável numa máquina Windows.
 * Isso era invisível enquanto a falha saía 0; ao tornar "não medido" não-zero
 * (o resto de G-04), o "aqui nunca dá para medir" ficou visível.
 *
 * Reusamos o resolvedor já testado de scripts/build/buildToolRunner.mjs (o mesmo
 * que corrigiu o ENOENT do esbuild no postbuild Windows) em vez de inventar um
 * segundo resolvedor: ele prefere a entry JS do próprio pacote, detecta binário
 * nativo e cai para o shim `.cmd` com shell no win32.
 *
 * @param {readonly string[]} args
 * @param {string} [root] repo root to resolve `node_modules` from
 * @returns {{file: string, args: string[], shell: boolean}}
 */
export function resolveSizeLimitInvocation(args, root = ROOT) {
  const entryPath = resolveLocalBinEntry("size-limit", "size-limit", root);
  if (entryPath) {
    return planBuildToolSpawn({
      binName: "size-limit",
      args,
      entryPath,
      entryIsNative: isNativeExecutable(entryPath),
      root,
    });
  }
  // Sem a entry do pacote: cai no shim, que em win32 precisa de shell.
  return planBuildToolSpawn({ binName: "size-limit", args, entryPath: null, root });
}

/**
 * Tenta rodar size-limit --json e retorna o array de resultados.
 * Lança se size-limit não estiver instalado, ou não tiver plugins (plugins.isEmpty).
 *
 * @param {string} [cwd] repo root — usado tanto como cwd do processo quanto para
 *   resolver `node_modules/size-limit`.
 * @returns {Array<{name: string, size: number, sizeLimit?: number, passed?: boolean}>}
 * @throws {SizeLimitNoPluginsError}
 */
export function runSizeLimit(cwd = ROOT) {
  const entryPath = resolveLocalBinEntry("size-limit", "size-limit", cwd);
  // Sem o pacote instalado, nem o shim existe — sinaliza o fallback-stat.
  if (!entryPath && !fs.existsSync(path.join(cwd, "node_modules", ".bin", "size-limit"))) {
    throw Object.assign(new Error("size-limit binary not found"), { code: "SL_NO_BIN" });
  }

  const plan = resolveSizeLimitInvocation(["--json"], cwd);
  let stdout;
  try {
    stdout = execFileSync(plan.file, plan.args, {
      encoding: "utf8",
      cwd,
      maxBuffer: 8 * 1024 * 1024,
      ...(plan.shell ? { shell: true } : {}),
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
    const entryPath = path.isAbsolute(entry.path) ? entry.path : path.join(cwd, entry.path);
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

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Avalia o total MEDIDO de bytes contra o baseline.
 * Direction: down (o tamanho só pode CAIR — maior = regressão).
 *
 * @param {number} current  - Total de bytes medido agora (gzip, via size-limit).
 * @param {number} baseline - Total congelado em quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateBundleSizeRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Lê metrics.bundleSize.value do quality-baseline.json.
 * Retorna null se o arquivo ou a métrica estiverem ausentes (sem baseline não há
 * ratchet possível — o caller trata como SKIP gracioso, exit 0).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineBundleSizeValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.bundleSize;
  if (!metric || typeof metric.value !== "number") return null;
  return metric.value;
}

/**
 * Aplica o ratchet (direction:down) sobre o total medido vs o baseline.
 * Sem --ratchet: advisory (exit 0). Com --ratchet + medição comparável (gzip via
 * size-limit): exit 1 numa regressão real (medido > baseline). Baseline ausente →
 * SKIP gracioso (exit 0). Define process.exitCode; não lança.
 *
 * @param {number} totalBytes - Total MEDIDO pelo size-limit (gzip).
 */
function applyRatchet(totalBytes) {
  if (!RATCHET) {
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineBundleSizeValue(BASELINE_PATH);
  if (baselineValue === null) {
    // G-04: um ratchet sem baseline não impõe nada — e antes ele saía 0 em
    // silêncio, deixando o passo de CI verde sem ter verificado nada.
    exitUnmeasurable(
      "no-baseline",
      "metrics.bundleSize.value não existe em config/quality/quality-baseline.json — " +
        "sem baseline congelado não há regressão possível de detectar."
    );
    return;
  }

  const { regressed } = evaluateBundleSizeRatchet(totalBytes, baselineValue);
  if (regressed) {
    console.error(
      `[bundle-size] REGRESSÃO — ${totalBytes} bytes > baseline ${baselineValue}.\n` +
        "  → Reduza o tamanho dos entrypoints, ou re-baseline metrics.bundleSize em\n" +
        "    config/quality/quality-baseline.json se o crescimento for legítimo e justificado."
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `[bundle-size] --ratchet OK — ${totalBytes} bytes, baseline ${baselineValue} (sem regressão).`
  );
  process.exitCode = 0;
}

/**
 * G-04 (#15159) — um ratchet que NÃO conseguiu medir e mesmo assim sai 0 não é
 * um ratchet: converte "desconhecido" em "verificado". Antes desta função, todos
 * os caminhos de "não medível" (binário ausente, sem plugins, erro inesperado,
 * baseline ausente, métrica não-comparável) imprimiam uma linha informativa e
 * retornavam com exit 0 — inclusive sob --ratchet, e o passo correspondente no
 * ci.yml se chama "Bundle size (ratchet, blocking)".
 *
 * Regra agora: em modo ADVISORY continua saindo 0 (um dev local sem build não
 * deve ser bloqueado). Sob --ratchet, "não consegui medir" é exit 1 com motivo e
 * remédio — porque --ratchet é um pedido explícito de veredito, e o único veredito
 * honesto quando a medição é impossível é "não pude verificar isto".
 *
 * @param {string} reason - token estável para logs/annotations (bundleSize=SKIP reason=…)
 * @param {string} hint - o que fazer para tornar a medição possível.
 */
function exitUnmeasurable(reason, hint) {
  // Mantido em stdout: é o token que os logs de CI leem.
  console.log(`bundleSize=SKIP reason=${reason}`);

  if (!RATCHET) {
    console.log(`[bundle-size] ${reason} — modo advisory, seguindo com exit 0.`);
    process.exitCode = 0;
    return;
  }

  console.error(
    `[bundle-size] NÃO MEDIDO (${reason}) — o ratchet não pode verificar a métrica.\n` +
      `  → ${hint}\n` +
      "  'não consegui medir' não é 'sem regressão'. Sob --ratchet isto é exit 1."
  );
  if (process.env.CI) {
    console.error(`::error title=bundle-size ratchet could not measure::${reason} — ${hint}`);
  }
  process.exitCode = 1;
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
        // Step 3: nenhuma entrada do .size-limit.json existe — não há o que medir.
        exitUnmeasurable(
          "no-build",
          "os arquivos apontados por .size-limit.json não existem; rode o build " +
            "(ou restaure os entrypoints de bin/) antes do gate."
        );
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
      exitUnmeasurable(
        "size-limit-error",
        `size-limit falhou com "${err.message}" — rode \`npm ci\` para reinstalar ` +
          "size-limit + @size-limit/file, ou corrija a configuração."
      );
      return;
    }
  }

  const kb = (totalBytes / 1024).toFixed(2);
  console.log(`bundleSize=${totalBytes}`);

  // O ratchet só pode comparar a MESMA métrica que congelou o baseline (gzip via
  // size-limit + @size-limit/file). O fallback-stat lê bytes CRUS — uma métrica
  // diferente e maior — então compará-lo ao baseline gzip seria um falso
  // positivo. Isso não é um veredito de "sem regressão", é ausência de veredito:
  // sob --ratchet é exit 1 (G-04), senão o ratchet fica inerte em silêncio.
  if (mode !== "size-limit") {
    if (RATCHET) {
      exitUnmeasurable(
        "non-comparable-metric",
        `a medição veio de ${mode} (bytes crus), que não é comparável ao baseline ` +
          "gzip do size-limit. Instale @size-limit/file para que o ratchet funcione."
      );
      return;
    }
    console.log(`[bundle-size] ${mode}: total ${kb} KB (${totalBytes} bytes) — advisory, saindo 0`);
    return;
  }

  if (!RATCHET) {
    console.log(`[bundle-size] ${mode}: total ${kb} KB (${totalBytes} bytes) — advisory, saindo 0`);
  }
  applyRatchet(totalBytes);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
