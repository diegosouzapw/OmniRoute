#!/usr/bin/env node
// scripts/check/check-known-symbols.ts
// Gate anti-alucinação: known-symbol allow-lists. Mata o padrão "símbolo inventado
// que silenciosamente vira no-op" em seis superfícies de despacho por-string/por-chave:
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
//       as estratégias-default implícitas documentadas em IMPLICIT_DEFAULT_STRATEGIES
//       (estratégias canônicas sem NENHUMA referência `strategy === "..."`; caem no
//       ordenamento padrão). Adicionar um valor canônico sem fiá-lo no despacho, ou
//       fiar uma string de estratégia que não é canônica (inventada), falha aqui.
//
//   (3) TRANSLATOR PAIRS — os pares from:to registrados em runtime no registry de
//       tradutores (após bootstrap) são congelados em KNOWN_TRANSLATOR_PAIRS. Catraca:
//       se um par registrado some, falha (regressão de cobertura de formato). Pares
//       novos não falham — apenas são reportados — para não bloquear adições legítimas.
//
//   (4) MCP TOOLS — todos os tools registrados em createMcpServer() (base MCP_TOOLS +
//       memoryTools + skillTools + gamificationTools + pluginTools + notionTools +
//       obsidianTools) DEVEM ter ao menos um escopo atribuído (scope-enforcement). Os
//       nomes são congelados em KNOWN_MCP_TOOL_NAMES. Catraca: tool removido = fail.
//       Tool novo = report (não bloqueia adições legítimas).
//
//   (5) A2A SKILLS — chaves de A2A_SKILL_HANDLERS (src/lib/a2a/taskExecution.ts) DEVEM
//       bater bidirecionalmente com skills[].id expostos no Agent Card
//       (src/app/.well-known/agent.json/route.ts). Divergência em qualquer direção = fail.
//
//   (6) CLOUD AGENTS — entradas de AGENTS em src/lib/cloudAgent/registry.ts DEVEM bater
//       bidirecionalmente com os arquivos de classe em src/lib/cloudAgent/agents/
//       (basename sem extensão). Divergência = fail.
//
// Catraca: cada divergência pré-existente fica numa allowlist documentada e sai 0 hoje.
// Padrão herdado de scripts/check/check-provider-consistency.ts (gate .ts via
// `node --import tsx` que IMPORTA módulos reais + funções puras + main() guardado).
//
// Stale-enforcement (6A.3): a ÚNICA allowlist de SUPRESSÃO deste gate é
// IMPLICIT_DEFAULT_STRATEGIES — cada entrada suprime uma violação `canonicalNotHandled`
// (estratégia canônica sem branch de despacho). Uma entrada que não suprime mais
// nenhuma violação real (porque a estratégia ganhou um branch `strategy === "..."`)
// é obsoleta → o gate falha com instrução de remoção, fechando o furo de regressão
// silenciosa. As demais listas (KNOWN_TRANSLATOR_PAIRS, KNOWN_MCP_TOOL_NAMES) NÃO são
// allowlists de supressão e sim snapshots-catraca (falham na REMOÇÃO, não na presença):
// uma entrada nelas exige que o par/tool continue VIVO no registry — o oposto de
// supressão — então a semântica de stale-enforcement não se aplica a elas.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve as resolvePath, basename, extname } from "node:path";
import { assertNoStale } from "./lib/allowlist.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolvePath(HERE, "..", "..");

// ───────────────────────────────────────────────────────────────────────────
// (2) COMBO STRATEGIES — fonte canônica + defaults implícitos
// ───────────────────────────────────────────────────────────────────────────

/**
 * Estratégias canônicas que NÃO têm um branch `strategy === "..."` na cadeia de
 * despacho porque são o comportamento padrão (sem reordenamento explícito). Cada
 * uma documentada. Adicionar aqui se uma estratégia canônica não tiver NENHUMA
 * referência `strategy === "..."` em combo.ts (do contrário extractHandledStrategies
 * já a considera tratada e a entrada vira obsoleta — stale-enforcement abaixo falha).
 *
 * Atualmente vazio: a entrada `priority` foi removida porque combo.ts passou a
 * referenciar `strategy === "priority"` (pre-screen de latência em resolveComboTargets),
 * o que torna `priority` já-tratada por extractHandledStrategies — a supressão não
 * suprimia mais nenhuma violação `canonicalNotHandled` (era stale). Se o pre-screen
 * for removido no futuro, `priority` reaparecerá como `canonicalNotHandled` e o gate
 * pedirá para refiá-la no despacho OU redocumentá-la aqui.
 */
export const IMPLICIT_DEFAULT_STRATEGIES: Record<string, string> = {};

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
// (4) MCP TOOLS — scope check + snapshot catraca
// ───────────────────────────────────────────────────────────────────────────

export type McpToolLike = {
  name: string;
  scopes?: string[] | readonly string[];
};

/**
 * Returns the names of tools that have no scopes assigned (empty array or
 * undefined). Every registered MCP tool must declare at least one scope so
 * that scope-enforcement can filter callers correctly.
 */
export function checkMcpToolsHaveScopes(tools: McpToolLike[]): string[] {
  return tools.filter((t) => !t.scopes || t.scopes.length === 0).map((t) => t.name);
}

/**
 * Returns tools in the frozen snapshot that are no longer in the live
 * registry (removals are regressions).
 */
export function findMissingMcpTools(frozen: readonly string[], live: Set<string>): string[] {
  return frozen.filter((name) => !live.has(name));
}

/**
 * Returns live tools not present in the frozen snapshot (additions are
 * informative, not failures).
 */
export function findNewMcpTools(frozen: readonly string[], live: Set<string>): string[] {
  const frozenSet = new Set(frozen);
  return [...live].filter((name) => !frozenSet.has(name)).sort();
}

/**
 * Snapshot of all MCP tool names registered by createMcpServer() as of
 * 2026-06-13. Catraca: tool removed = fail; tool added = informative report.
 * To update after an intentional removal/rename: edit this list and document
 * the reason in the commit message.
 *
 * Sources:
 *   - MCP_TOOLS (33 base tools: omniroute_* + compression + agent_skills)
 *   - memoryTools (3): omniroute_memory_*
 *   - skillTools (4): omniroute_skills_*
 *   - gamificationTools (8): gamification_*
 *   - pluginTools (8): plugin_*
 *   - notionTools (6): notion_*
 *   - obsidianTools (22): obsidian_*
 * agentSkillTools and compressionTools are included in MCP_TOOLS (deduped by RESERVED_MCP_NAMES).
 */
export const KNOWN_MCP_TOOL_NAMES: readonly string[] = [
  // MCP_TOOLS base (33)
  "omniroute_get_health",
  "omniroute_list_combos",
  "omniroute_get_combo_metrics",
  "omniroute_switch_combo",
  "omniroute_check_quota",
  "omniroute_route_request",
  "omniroute_cost_report",
  "omniroute_list_models_catalog",
  "omniroute_web_search",
  "omniroute_simulate_route",
  "omniroute_set_budget_guard",
  "omniroute_set_routing_strategy",
  "omniroute_set_resilience_profile",
  "omniroute_test_combo",
  "omniroute_get_provider_metrics",
  "omniroute_best_combo_for_task",
  "omniroute_explain_route",
  "omniroute_get_session_snapshot",
  "omniroute_db_health_check",
  "omniroute_sync_pricing",
  "omniroute_cache_stats",
  "omniroute_cache_flush",
  "omniroute_compression_status",
  "omniroute_compression_configure",
  "omniroute_set_compression_engine",
  "omniroute_list_compression_combos",
  "omniroute_compression_combo_stats",
  "omniroute_oneproxy_fetch",
  "omniroute_oneproxy_rotate",
  "omniroute_oneproxy_stats",
  "omniroute_agent_skills_list",
  "omniroute_agent_skills_get",
  "omniroute_agent_skills_coverage",
  // memoryTools (3)
  "omniroute_memory_search",
  "omniroute_memory_add",
  "omniroute_memory_clear",
  // skillTools (4)
  "omniroute_skills_list",
  "omniroute_skills_enable",
  "omniroute_skills_execute",
  "omniroute_skills_executions",
  // gamificationTools (8)
  "gamification_leaderboard",
  "gamification_rank",
  "gamification_profile",
  "gamification_badges",
  "gamification_transfer",
  "gamification_invite",
  "gamification_servers",
  "gamification_anomalies",
  // pluginTools (8)
  "plugin_list",
  "plugin_install",
  "plugin_activate",
  "plugin_deactivate",
  "plugin_uninstall",
  "plugin_configure",
  "plugin_executions",
  "plugin_scan",
  // notionTools (6)
  "notion_search",
  "notion_get_page",
  "notion_list_block_children",
  "notion_query_database",
  "notion_get_database",
  "notion_append_blocks",
  // obsidianTools (22)
  "obsidian_check_status",
  "obsidian_search_simple",
  "obsidian_search_structured",
  "obsidian_read_note",
  "obsidian_list_vault",
  "obsidian_get_document_map",
  "obsidian_get_note_metadata",
  "obsidian_get_active_file",
  "obsidian_get_periodic_note",
  "obsidian_get_tags",
  "obsidian_list_commands",
  "obsidian_write_note",
  "obsidian_append_note",
  "obsidian_patch_note",
  "obsidian_delete_note",
  "obsidian_move_note",
  "obsidian_execute_command",
  "obsidian_open_file",
  "obsidian_sync_status",
  "obsidian_sync_trigger",
  "obsidian_sync_conflicts",
  "obsidian_sync_resolve_conflict",
];

// ───────────────────────────────────────────────────────────────────────────
// (5) A2A SKILLS — bidirectional diff between handlers and agent card
// ───────────────────────────────────────────────────────────────────────────

export type A2ASkillDiff = {
  /** Skills registered in A2A_SKILL_HANDLERS but not exposed in the Agent Card */
  inHandlersNotCard: string[];
  /** Skills exposed in the Agent Card but not registered in A2A_SKILL_HANDLERS */
  inCardNotHandlers: string[];
};

/**
 * Bidirectionally diffs A2A skill handler keys against Agent Card skill IDs.
 * Both directions matter:
 *   - inHandlersNotCard: skill is routable but agents can't discover it
 *   - inCardNotHandlers: skill is advertised but calling it fails silently
 */
export function diffA2ASkills(
  handlers: Set<string>,
  agentCard: Set<string>
): A2ASkillDiff {
  const inHandlersNotCard = [...handlers].filter((s) => !agentCard.has(s)).sort();
  const inCardNotHandlers = [...agentCard].filter((s) => !handlers.has(s)).sort();
  return { inHandlersNotCard, inCardNotHandlers };
}

// ───────────────────────────────────────────────────────────────────────────
// (6) CLOUD AGENTS — registry keys vs agent class files
// ───────────────────────────────────────────────────────────────────────────

export type CloudAgentDiff = {
  /** Registry keys with no corresponding agent file in agents/ */
  inRegistryNotFiles: string[];
  /** Agent files with no corresponding registry key */
  inFilesNotRegistry: string[];
};

/**
 * Bidirectionally diffs cloud agent registry keys against agent file basenames
 * (filename without extension, e.g. "codex.ts" → "codex"). Note: registry key
 * "codex-cloud" maps to file "codex.ts" — this mapping is handled by the
 * caller (main) which reads the actual class-name-to-key binding from registry.ts.
 * The pure function here just diffs two already-normalised sets.
 */
export function diffCloudAgents(
  registryKeys: Set<string>,
  agentFiles: Set<string>
): CloudAgentDiff {
  const inRegistryNotFiles = [...registryKeys].filter((k) => !agentFiles.has(k)).sort();
  const inFilesNotRegistry = [...agentFiles].filter((f) => !registryKeys.has(f)).sort();
  return { inRegistryNotFiles, inFilesNotRegistry };
}

/**
 * Reads the registry.ts source file and returns the set of provider IDs
 * (keys in the AGENTS object literal).
 */
export function extractCloudAgentRegistryKeys(registrySource: string): Set<string> {
  // Match the AGENTS object: find start, extract keys
  const start = registrySource.indexOf("const AGENTS: Record<string, CloudAgentBase> = {");
  if (start < 0) throw new Error("could not find `const AGENTS:` in cloudAgent/registry.ts");
  const end = registrySource.indexOf("\n};", start);
  if (end < 0) throw new Error("could not find end of AGENTS map");
  const block = registrySource.slice(start, end);
  // Match quoted or bare keys: "codex-cloud": or jules:
  const keyRe = /^\s*(?:"([^"]+)"|([A-Za-z0-9_$-]+))\s*:/gm;
  const keys = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = keyRe.exec(block)) !== null) {
    const key = match[1] ?? match[2];
    // Skip the TypeScript type annotation line
    if (key && key !== "Record") keys.add(key);
  }
  return keys;
}

/**
 * Lists agent file basenames (without extension) from the agents/ directory.
 * Maps known filename→registryKey aliases (e.g. "codex" → "codex-cloud").
 */
export const AGENT_FILE_TO_REGISTRY_KEY: Record<string, string> = {
  codex: "codex-cloud",
};

// ───────────────────────────────────────────────────────────────────────────
// main() — importa módulos reais, lê fontes, roda as seis sub-checagens
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

  // Stale-enforcement (6A.3): IMPLICIT_DEFAULT_STRATEGIES is a suppression allowlist —
  // each entry exists ONLY to suppress a `canonicalNotHandled` violation (a canonical
  // strategy with no `strategy === "..."` dispatch reference). The live violations it
  // suppresses are the canonical strategies NOT already in `handled` (computed with an
  // EMPTY implicit-defaults map). An entry whose key IS already in `handled` suppresses
  // nothing → it is stale and the gate must fail asking for its removal.
  const liveImplicitNeeded = diffComboStrategies(canonical, handled, {}).canonicalNotHandled;
  assertNoStale(Object.keys(IMPLICIT_DEFAULT_STRATEGIES), liveImplicitNeeded, "known-symbols:combo");

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

  // ── (4) MCP tools scope + snapshot ───────────────────────────────────────
  const { MCP_TOOLS } = await import("@omniroute/open-sse/mcp-server/schemas/tools.ts");
  const { memoryTools } = await import("@omniroute/open-sse/mcp-server/tools/memoryTools.ts");
  const { skillTools } = await import("@omniroute/open-sse/mcp-server/tools/skillTools.ts");
  const { gamificationTools } = await import(
    "@omniroute/open-sse/mcp-server/tools/gamificationTools.ts"
  );
  const { pluginTools } = await import("@omniroute/open-sse/mcp-server/tools/pluginTools.ts");
  const { notionTools } = await import("@omniroute/open-sse/mcp-server/tools/notionTools.ts");
  const { obsidianTools } = await import("@omniroute/open-sse/mcp-server/tools/obsidianTools.ts");

  // Build the full live set of registered tools (deduped by RESERVED_MCP_NAMES logic:
  // agentSkillTools + compressionTools are already in MCP_TOOLS).
  const liveMcpTools: McpToolLike[] = [
    ...(MCP_TOOLS as unknown as McpToolLike[]),
    ...Object.values(memoryTools as Record<string, McpToolLike>),
    ...Object.values(skillTools as Record<string, McpToolLike>),
    ...(gamificationTools as unknown as McpToolLike[]),
    ...(pluginTools as unknown as McpToolLike[]),
    ...(notionTools as unknown as McpToolLike[]),
    ...(obsidianTools as unknown as McpToolLike[]),
  ];
  const liveMcpToolNames = new Set(liveMcpTools.map((t) => t.name));

  // 4a. Every registered tool must have at least one scope.
  const toolsWithoutScopes = checkMcpToolsHaveScopes(liveMcpTools);
  if (toolsWithoutScopes.length) {
    failures.push(
      `[mcp-tools] ${toolsWithoutScopes.length} tool(s) sem scope(s) atribuído(s) — todo tool registrado deve ter ao menos 1 scope para scope-enforcement:\n` +
        toolsWithoutScopes.map((n) => `    ✗ ${n}`).join("\n") +
        `\n    → adicione o campo scopes: [...] na definição do tool.`
    );
  }

  // 4b. Snapshot catraca: tools removed are regressions.
  const missingMcpTools = findMissingMcpTools(KNOWN_MCP_TOOL_NAMES, liveMcpToolNames);
  if (missingMcpTools.length) {
    failures.push(
      `[mcp-tools] ${missingMcpTools.length} tool(s) congelado(s) sumiram do registry vivo (regressão):\n` +
        missingMcpTools.map((n) => `    ✗ ${n}`).join("\n") +
        `\n    → restaure o tool ou, se a remoção foi intencional, atualize KNOWN_MCP_TOOL_NAMES.`
    );
  }
  const newMcpTools = findNewMcpTools(KNOWN_MCP_TOOL_NAMES, liveMcpToolNames);

  // ── (5) A2A skills ───────────────────────────────────────────────────────
  const { A2A_SKILL_HANDLERS } = await import("@/lib/a2a/taskExecution.ts");
  const handlerKeys = new Set(Object.keys(A2A_SKILL_HANDLERS as Record<string, unknown>));

  // Parse the Agent Card route statically (the skills array is a literal in the source).
  const agentCardSource = readFileSync(
    resolvePath(REPO_ROOT, "src/app/.well-known/agent.json/route.ts"),
    "utf8"
  );
  // Extract skill IDs: `id: "..."` lines inside the skills array.
  const skillIdRe = /\bid:\s*"([^"]+)"/g;
  const agentCardSkills = new Set<string>();
  let skillMatch: RegExpExecArray | null;
  while ((skillMatch = skillIdRe.exec(agentCardSource)) !== null) {
    agentCardSkills.add(skillMatch[1]);
  }
  if (agentCardSkills.size === 0) {
    failures.push(
      `[a2a-skills] parse do Agent Card não encontrou nenhum skill id (regex quebrada ou arquivo movido?)`
    );
  }

  const { inHandlersNotCard, inCardNotHandlers } = diffA2ASkills(handlerKeys, agentCardSkills);
  if (inHandlersNotCard.length) {
    failures.push(
      `[a2a-skills] ${inHandlersNotCard.length} skill(s) em A2A_SKILL_HANDLERS mas ausente(s) do Agent Card (agentes não conseguem descobrir):\n` +
        inHandlersNotCard.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → adicione o skill em src/app/.well-known/agent.json/route.ts (skills array).`
    );
  }
  if (inCardNotHandlers.length) {
    failures.push(
      `[a2a-skills] ${inCardNotHandlers.length} skill(s) expostos no Agent Card mas ausente(s) de A2A_SKILL_HANDLERS (chamada silenciosamente falha):\n` +
        inCardNotHandlers.map((s) => `    ✗ ${s}`).join("\n") +
        `\n    → registre o handler em src/lib/a2a/taskExecution.ts (A2A_SKILL_HANDLERS).`
    );
  }

  // ── (6) Cloud agents ─────────────────────────────────────────────────────
  const registrySource = readFileSync(
    resolvePath(REPO_ROOT, "src/lib/cloudAgent/registry.ts"),
    "utf8"
  );
  const registryKeys = extractCloudAgentRegistryKeys(registrySource);

  // Read agent file basenames from agents/ directory, applying the alias map.
  const agentsDir = resolvePath(REPO_ROOT, "src/lib/cloudAgent/agents");
  const agentFileBases = new Set(
    readdirSync(agentsDir)
      .filter((f) => /\.(ts|js)$/.test(f) && !f.endsWith(".d.ts") && !f.endsWith(".test.ts"))
      .map((f) => {
        const base = basename(f, extname(f));
        return AGENT_FILE_TO_REGISTRY_KEY[base] ?? base;
      })
  );

  const { inRegistryNotFiles, inFilesNotRegistry } = diffCloudAgents(registryKeys, agentFileBases);
  if (inRegistryNotFiles.length) {
    failures.push(
      `[cloud-agents] ${inRegistryNotFiles.length} chave(s) no registry sem arquivo de classe em agents/:\n` +
        inRegistryNotFiles.map((k) => `    ✗ ${k}`).join("\n") +
        `\n    → crie o arquivo src/lib/cloudAgent/agents/<name>.ts ou atualize AGENT_FILE_TO_REGISTRY_KEY.`
    );
  }
  if (inFilesNotRegistry.length) {
    failures.push(
      `[cloud-agents] ${inFilesNotRegistry.length} arquivo(s) em agents/ sem entrada no registry:\n` +
        inFilesNotRegistry.map((f) => `    ✗ ${f}`).join("\n") +
        `\n    → registre o agente em src/lib/cloudAgent/registry.ts ou adicione o alias em AGENT_FILE_TO_REGISTRY_KEY.`
    );
  }

  // ── Resultado ─────────────────────────────────────────────────────────────
  if (failures.length) {
    console.error(`[known-symbols] ${failures.length} sub-checagem(ns) falharam:\n\n${failures.join("\n\n")}`);
    process.exit(1);
  }
  // assertNoStale (combo) seta process.exitCode=1 sem lançar — não imprima o OK
  // enganoso; a mensagem de stale já foi logada no stderr pelo helper.
  if (process.exitCode === 1) return;

  const newPairsNote = newPairs.length
    ? ` (${newPairs.length} par(es) novo(s) não-congelado(s): ${newPairs.join(", ")} — atualize KNOWN_TRANSLATOR_PAIRS se intencional)`
    : "";
  const newMcpNote = newMcpTools.length
    ? ` (${newMcpTools.length} tool(s) novo(s) não-congelado(s): ${newMcpTools.join(", ")} — atualize KNOWN_MCP_TOOL_NAMES se intencional)`
    : "";
  console.log(
    `[known-symbols] OK — ` +
      `${aliases.length} executores conformes; ` +
      `${canonical.length} estratégias canônicas (${handled.size} via despacho + ${Object.keys(IMPLICIT_DEFAULT_STRATEGIES).length} default(s) implícito(s)); ` +
      `${livePairs.size} pares de tradutor vivos vs ${KNOWN_TRANSLATOR_PAIRS.length} congelados${newPairsNote}; ` +
      `${liveMcpToolNames.size} tools MCP (${toolsWithoutScopes.length === 0 ? "todos com scope" : `${toolsWithoutScopes.length} sem scope`}) vs ${KNOWN_MCP_TOOL_NAMES.length} congelados${newMcpNote}; ` +
      `${handlerKeys.size} A2A skills (handlers↔card OK); ` +
      `${registryKeys.size} cloud agents (registry↔files OK)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`[known-symbols] erro fatal: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  });
}
