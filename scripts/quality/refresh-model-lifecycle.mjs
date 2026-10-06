#!/usr/bin/env node
// scripts/quality/refresh-model-lifecycle.mjs
// Regenera config/quality/model-lifecycle.json a partir das páginas de depreciação de
// primeira mão listadas em `sources`. NÃO roda em CI (o gate check:model-lifecycle é
// offline, por design): é uma ferramenta de manutenção, executada à mão quando um
// fornecedor publica uma nova rodada de aposentadorias.
//
// Regra dura: o script NUNCA descarta uma entrada em silêncio. Fornecedor cuja página
// não pôde ser parseada mantém as entradas atuais do snapshot e imprime
// "manual review needed" — assim uma mudança de layout upstream vira um aviso, não uma
// perda de dados que abriria o gate.
//
// Uso:
//   npm run quality:refresh-model-lifecycle            # escreve o snapshot
//   npm run quality:refresh-model-lifecycle -- --dry-run
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const SNAPSHOT_PATH = path.join(ROOT, "config/quality/model-lifecycle.json");
const DRY_RUN = process.argv.includes("--dry-run");

/** Fornecedor de cada source, na ordem em que aparecem no snapshot. */
const VENDOR_BY_HOST = {
  "platform.claude.com": "anthropic",
  "developers.openai.com": "openai",
  "ai.google.dev": "google",
  "docs.x.ai": "xai",
  "console.groq.com": "groq",
};

/**
 * Parser da página da Anthropic: uma tabela markdown
 * `| API model name | Current state | Deprecated | Tentative retirement date |`.
 * Só linhas cujo estado contém "retired"/"deprecated" viram entradas.
 *
 * @returns {Record<string, {vendor: string, status: string, retiredOn: string|null, replacement: string|null}>}
 */
export function parseAnthropicTable(text) {
  const out = {};
  const rows = text.split("\n").filter((line) => line.trim().startsWith("|"));
  for (const row of rows) {
    const cells = row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.length < 3) continue;
    const [model, state, deprecatedOn, retirementDate] = cells;
    if (!/^[a-z0-9][a-z0-9.\-]*$/i.test(model)) continue; // pula cabeçalho e separadores
    const lowerState = String(state).toLowerCase();
    const status = lowerState.includes("retired")
      ? "retired"
      : lowerState.includes("deprecated")
        ? "retiring"
        : null;
    if (!status) continue;
    out[model] = {
      vendor: "anthropic",
      status,
      retiredOn: normalizeDate(retirementDate) ?? normalizeDate(deprecatedOn),
      // A página lista o substituto em prosa, fora da tabela. Preencher aqui inventaria
      // dado: o valor vigente do snapshot é preservado pelo merge.
      replacement: null,
    };
  }
  return out;
}

/** "2026-06-15" ou "June 15, 2026" → "2026-06-15"; qualquer outra coisa → null. */
export function normalizeDate(value) {
  if (!value) return null;
  const iso = String(value).match(/\d{4}-\d{2}-\d{2}/);
  if (iso) return iso[0];
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? null : new Date(parsed).toISOString().slice(0, 10);
}

/**
 * Funde entradas recém-parseadas sobre as atuais SEM perder nada:
 * - entrada nova → adicionada;
 * - entrada existente → status/retiredOn atualizados, `replacement` preservado quando o
 *   parser não trouxe um (o fornecedor nem sempre publica substituto);
 * - entrada que sumiu do parse → mantida (uma página pode paginar ou mudar de layout).
 *
 * @returns {{merged: Object, added: string[], updated: string[], kept: string[]}}
 */
export function mergeVendorEntries(current, parsed, vendor) {
  const merged = { ...current };
  const added = [];
  const updated = [];
  const kept = [];

  for (const [id, entry] of Object.entries(parsed)) {
    const existing = current[id];
    if (!existing) {
      merged[id] = entry;
      added.push(id);
      continue;
    }
    const next = {
      ...existing,
      status: entry.status,
      retiredOn: entry.retiredOn ?? existing.retiredOn,
      replacement: entry.replacement ?? existing.replacement,
    };
    merged[id] = next;
    if (JSON.stringify(next) !== JSON.stringify(existing)) updated.push(id);
  }

  for (const [id, entry] of Object.entries(current)) {
    if (entry?.vendor === vendor && !(id in parsed)) kept.push(id);
  }
  return { merged, added, updated, kept };
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": "omniroute-lifecycle-refresh" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
  let retired = { ...snapshot.retired };
  const warnings = [];

  for (const url of snapshot.sources) {
    const host = new URL(url).host;
    const vendor = VENDOR_BY_HOST[host] ?? host;
    let text;
    try {
      text = await fetchText(url);
    } catch (err) {
      warnings.push(
        `${vendor}: fetch failed (${err.message}) — existing entries kept, manual review needed`
      );
      continue;
    }

    if (vendor !== "anthropic") {
      // Só a Anthropic publica a lista como tabela estável. Os demais são HTML/JS que
      // mudam de forma; parsear por heurística arriscaria apagar dados corretos.
      warnings.push(
        `${vendor}: no reliable parser — existing entries kept, manual review needed (${url})`
      );
      continue;
    }

    const parsed = parseAnthropicTable(text);
    if (!Object.keys(parsed).length) {
      warnings.push(
        `${vendor}: table parsed to 0 rows (layout change?) — existing entries kept, manual review needed`
      );
      continue;
    }
    const { merged, added, updated, kept } = mergeVendorEntries(retired, parsed, vendor);
    retired = merged;
    console.log(
      `[refresh-model-lifecycle] ${vendor}: ${added.length} added, ${updated.length} updated, ${kept.length} kept (not in this parse)`
    );
    for (const id of added) console.log(`  + ${id}`);
    for (const id of updated) console.log(`  ~ ${id}`);
  }

  const next = {
    ...snapshot,
    generatedAt: new Date().toISOString().slice(0, 10),
    retired,
  };

  for (const warning of warnings) console.warn(`[refresh-model-lifecycle] WARN ${warning}`);

  const before = Object.keys(snapshot.retired).length;
  const after = Object.keys(retired).length;
  if (after < before) {
    console.error(
      `[refresh-model-lifecycle] ABORT — entry count dropped ${before} → ${after}. The script must never lose an entry; investigate before writing.`
    );
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log(
      `[refresh-model-lifecycle] dry run — ${before} → ${after} entries, nothing written.`
    );
    return;
  }
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(next, null, 2) + "\n");
  console.log(
    `[refresh-model-lifecycle] wrote ${path.relative(ROOT, SNAPSHOT_PATH)} — ${after} entries. Review the diff, then run \`npm run check:model-lifecycle\`.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`[refresh-model-lifecycle] ERROR — ${err?.message ?? err}`);
    process.exit(1);
  });
}
