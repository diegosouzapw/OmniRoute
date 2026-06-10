#!/usr/bin/env node
// scripts/check/check-known-symbols.ts
// Gate anti-alucinação: known-symbol allow-lists. Mata o padrão "símbolo inventado
// que silenciosamente vira no-op" em três superfícies de despacho por-string/por-chave:
//
//   (1) EXECUTOR CONFORMANCE — toda entrada registrada no mapa de executores
//       (open-sse/executors/index.ts) DEVE resolver, via getExecutor(), para uma
//       instância de BaseExecutor que expõe execute() + getProvider(). Um alias que
//       não resolve para um executor válido é um símbolo morto (roteia para fallback
//       silencioso em vez de falhar).
//
//   (2) COMBO STRATEGIES — a cadeia de despacho `strategy === "..."` em
//       open-sse/services/combo.ts DEVE tratar exatamente o conjunto canônico de
//       ROUTING_STRATEGY_VALUES (src/shared/constants/routingStrategies.ts), exceto
//       as estratégias-default implícitas (priority não tem branch; cai no
//       ordenamento padrão). Adicionar um valor canônico sem fiá-lo no despacho, ou
//       fiar uma string de estratégia que não é canônica (inventada), falha aqui.
//
//   (3) TRANSLATOR PAIRS — os pares from:to registrados em runtime no registry de
//       tradutores (após bootstrap) são congelados em KNOWN_TRANSLATOR_PAIRS. Catraca:
//       se um par registrado some, falha (regressão de cobertura de formato). Pares
//       novos não falham — apenas são reportados — para não bloquear adições legítimas.
//
// Catraca: cada divergência pré-existente fica numa allowlist documentada e sai 0 hoje.
// Padrão herdado de scripts/check/check-provider-consistency.ts (gate .ts via
// `node --import tsx` que IMPORTA módulos reais + funções puras + main() guardado).

import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolvePath(HERE, "..", "..");

// ───────────────────────────────────────────────────────────────────────────
// (2) COMBO STRATEGIES — fonte canônica + defaults implícitos
// ───────────────────────────────────────────────────────────────────────────

/**
 * Estratégias canônicas que NÃO têm um branch `strategy === "..."` na cadeia de
 * despacho porque são o comportamento padrão (sem reordenamento explícito). Cada
 * uma documentada. Remover daqui se um branch dedicado for adicionado.
 */
export const IMPLICIT_DEFAULT_STRATEGIES: Record<string, string> = {
  priority:
    'Default sem branch: combo.ts não tem `strategy === "priority"`; cai no ordenamento padrão de resolveComboTargets (ordem de prioridade declarada). É o fallback de normalizeRoutingStrategy.',
};

/** Extrai todas as strings literais de `strategy === "..."` da fonte do combo. */
export function extractHandledStrategies(comboSource: string): Set<string> {
  const handled = new Set<string>();
  const re = /strategy\s*===\s*"([a-z0-9-]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(comboSource)) !== null) {
    handled.add(match[1]);
  }
  return handled;
}

export type StrategyMismatch = {
  canonicalNotHandled: string[];
  handledNotCanonical: string[];
};

/**
 * Compara o conjunto canônico (ROUTING_STRATEGY_VALUES) com o conjunto efetivamente
 * tratado (branches do despacho ∪ defaults implícitos).
 *   - canonicalNotHandled: estratégia canônica adicionada sem fiação no despacho.
 *   - handledNotCanonical: branch de despacho para uma string não-canônica (inventada).
 */
export function diffComboStrategies(
  canonical: readonly string[],
  handled: Set<string>,
  implicitDefaults: Record<string, string>
): StrategyMismatch {
  const canonicalSet = new Set(canonical);
  const effectivelyHandled = new Set<string>(handled);
  for (const id of Object.keys(implicitDefaults)) effectivelyHandled.add(id);

  const canonicalNotHandled = [...canonicalSet].filter((s) => !effectivelyHandled.has(s));
  // Strings tratadas que não são canônicas NEM defaults implícitos = inventadas.
  const handledNotCanonical = [...handled].filter(
    (s) => !canonicalSet.has(s) && !(s in implicitDefaults)
  );
  return { canonicalNotHandled, handledNotCanonical };
}

// ───────────────────────────────────────────────────────────────────────────
// (1) EXECUTOR CONFORMANCE — parse do mapa + validação de conformidade
// ───────────────────────────────────────────────────────────────────────────

/**
 * Extrai as chaves (aliases) do objeto literal `const executors = { ... }` da fonte
 * de open-sse/executors/index.ts. O mapa não é exportado, então enumeramos pela fonte
 * (determinístico — é um literal simples). Cada chave é validada em runtime via
 * getExecutor() na função main().
 */
export function extractExecutorAliases(indexSource: string): string[] {
  const start = indexSource.indexOf("const executors = {");
  if (start < 0) throw new Error("could not find `const executors = {` in executors/index.ts");
  const end = indexSource.indexOf("\n};", start);
  if (end < 0) throw new Error("could not find end of executors map (`\\n};`)");
  const block = indexSource.slice(start, end);
  const keyRe = /^\s*(?:"([^"]+)"|([A-Za-z0-9_$-]+))\s*:/gm;
  const keys: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = keyRe.exec(block)) !== null) {
    keys.push(match[1] ?? match[2]);
  }
  return keys;
}

/** Superfície pública mínima que todo executor registrado deve expor. */
export type ExecutorLike = {
  execute?: unknown;
  getProvider?: unknown;
};

/**
 * Dada a lista de aliases e um resolvedor (getExecutor), retorna os aliases que NÃO
 * resolvem para um BaseExecutor válido (não é instância, ou falta execute/getProvider).
 * isInstance é injetado para manter a função pura/testável com inputs sintéticos.
 */
export function findNonConformingExecutors(
  aliases: string[],
  resolve: (alias: string) => ExecutorLike | null | undefined,
  isInstance: (value: unknown) => boolean
): string[] {
  return aliases.filter((alias) => {
    const ex = resolve(alias);
    if (!ex || !isInstance(ex)) return true;
    return typeof ex.execute !== "function" || typeof ex.getProvider !== "function";
  });
}

// ───────────────────────────────────────────────────────────────────────────
// (3) TRANSLATOR PAIRS — snapshot congelado (catraca: pares não somem)
// ───────────────────────────────────────────────────────────────────────────

/**
 * Pares from:to congelados, registrados no registry de tradutores após bootstrap.
 * Snapshot real medido em 2026-06-09 (18 pares). Catraca: se um par some, falha.
 * Adicionar um par NÃO falha aqui (apenas reportado) — só remoções são regressões.
 * Para regravar após adicionar/remover legitimamente um adapter, atualize esta lista.
 */
export const KNOWN_TRANSLATOR_PAIRS: readonly string[] = [
  "antigravity:claude",
  "antigravity:openai",
  "claude:gemini",
  "claude:openai",
  "cursor:openai",
  "gemini-cli:claude",
  "gemini-cli:openai",
  "gemini:claude",
  "gemini:openai",
  "kiro:openai",
  "openai-responses:openai",
  "openai:antigravity",
  "openai:claude",
  "openai:cursor",
  "openai:gemini",
  "openai:gemini-cli",
  "openai:kiro",
  "openai:openai-responses",
];

/**
 * Pares frozen que sumiram do registry vivo (regressão). frozen = snapshot;
 * live = pares observados em runtime. Retorna os que estão no frozen mas não no live.
 */
export function findMissingTranslatorPairs(
  frozen: readonly string[],
  live: Set<string>
): string[] {
  return frozen.filter((pair) => !live.has(pair));
}

/** Pares vivos que ainda não estão no snapshot frozen (informativo, não falha). */
export function findNewTranslatorPairs(frozen: readonly string[], live: Set<string>): string[] {
  const frozenSet = new Set(frozen);
  return [...live].filter((pair) => !frozenSet.has(pair)).sort();
}

// ───────────────────────────────────────────────────────────────────────────
// main() — importa módulos reais, lê fontes, roda as três sub-checagens
// ───────────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const failures: string[] = [];

  // ── (1) Executor conformance ──────────────────────────────────────────────
  const executorsMod = await import("@omniroute/open-sse/executors/index.ts");
  const getExecutor = executorsMod.getExecutor as (alias: string) => ExecutorLike;
  const BaseExecutor = executorsMod.BaseExecutor as new (...args: never[]) => unknown;
  const indexSource = readFileSync(
    resolvePath(REPO_ROOT, "open-sse/executors/index.ts"),
    "utf8"
  );
  const aliases = extractExecutorAliases(indexSource);
  if (aliases.length === 0) {
    failures.push("[executor] parse do mapa `executors` não encontrou nenhum alias (regex quebrada?)");
  }
  const isExecutorInstance = (value: unknown) => value instanceof BaseExecutor;
  const badExecutors = findNonConformingExecutors(aliases, getExecutor, isExecutorInstance);
  if (badExecutors.length) {
    failures.push(
      `[executor] ${badExecutors.length} alias(es) registrado(s) não resolvem para um BaseExecutor válido (instância + execute() + getProvider()):\n` +
        badExecutors.map((a) => `    ✗ ${a}`).join("\n") +
        `\n    → verifique a entrada em open-sse/executors/index.ts (classe importada/exportada e estende BaseExecutor).`
    );
  }

  // ── (2) Combo strategies ──────────────────────────────────────────────────
  const strategiesMod = await import("@/shared/constants/routingStrategies.ts");
  const canonical = strategiesMod.ROUTING_STRATEGY_VALUES as readonly string[];
  const comboSource = readFileSync(resolvePath(REPO_ROOT, "open-sse/services/combo.ts"), "utf8");
  const handled = extractHandledStrategies(comboSource);
  const { canonicalNotHandled, handledNotCanonical } = diffComboStrategies(
    canonical,
    handled,
    IMPLICIT_DEFAULT_STRATEGIES
  );
  if (canonicalNotHandled.length) {
    failures.push(
      `[combo] ${canonicalNotHandled.length} estratégia(s) canônica(s) sem branch de despacho em combo.ts:\n` +
        canonicalNotHandled.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → fie no despacho (\`strategy === "${canonicalNotHandled[0]}"\`) ou documente em IMPLICIT_DEFAULT_STRATEGIES.`
    );
  }
  if (handledNotCanonical.length) {
    failures.push(
      `[combo] ${handledNotCanonical.length} string(s) de estratégia tratada(s) no despacho mas ausente(s) de ROUTING_STRATEGY_VALUES (inventada/órfã):\n` +
        handledNotCanonical.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → registre em src/shared/constants/routingStrategies.ts ou remova o branch morto.`
    );
  }

  // ── (3) Translator pairs ──────────────────────────────────────────────────
  await import("@omniroute/open-sse/translator/bootstrap.ts").then((m) =>
    (m.bootstrapTranslatorRegistry as () => void)()
  );
  const formatsMod = await import("@omniroute/open-sse/translator/formats.ts");
  const registryMod = await import("@omniroute/open-sse/translator/registry.ts");
  const FORMATS = formatsMod.FORMATS as Record<string, string>;
  const getRequestTranslator = registryMod.getRequestTranslator as (
    from: string,
    to: string
  ) => unknown;
  const getResponseTranslator = registryMod.getResponseTranslator as (
    from: string,
    to: string
  ) => unknown;
  const formatIds = Object.values(FORMATS);
  const livePairs = new Set<string>();
  for (const from of formatIds) {
    for (const to of formatIds) {
      if (from === to) continue;
      if (getRequestTranslator(from, to) || getResponseTranslator(from, to)) {
        livePairs.add(`${from}:${to}`);
      }
    }
  }
  const missingPairs = findMissingTranslatorPairs(KNOWN_TRANSLATOR_PAIRS, livePairs);
  if (missingPairs.length) {
    failures.push(
      `[translator] ${missingPairs.length} par(es) from:to congelado(s) sumiram do registry vivo (regressão):\n` +
        missingPairs.map((p) => `    ✗ ${p}`).join("\n") +
        `\n    → restaure o adapter em open-sse/translator/ ou, se a remoção foi intencional, atualize KNOWN_TRANSLATOR_PAIRS.`
    );
  }
  const newPairs = findNewTranslatorPairs(KNOWN_TRANSLATOR_PAIRS, livePairs);

  // ── Resultado ─────────────────────────────────────────────────────────────
  if (failures.length) {
    console.error(`[known-symbols] ${failures.length} sub-checagem(ns) falharam:\n\n${failures.join("\n\n")}`);
    process.exit(1);
  }

  const newPairsNote = newPairs.length
    ? ` (${newPairs.length} par(es) novo(s) não-congelado(s): ${newPairs.join(", ")} — atualize KNOWN_TRANSLATOR_PAIRS se intencional)`
    : "";
  console.log(
    `[known-symbols] OK — ${aliases.length} executores conformes; ${canonical.length} estratégias canônicas (${handled.size} via despacho + ${Object.keys(IMPLICIT_DEFAULT_STRATEGIES).length} default(s) implícito(s)); ${livePairs.size} pares de tradutor vivos vs ${KNOWN_TRANSLATOR_PAIRS.length} congelados${newPairsNote}`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`[known-symbols] erro fatal: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  });
}
