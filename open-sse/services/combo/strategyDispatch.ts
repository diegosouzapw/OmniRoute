// open-sse/services/combo/strategyDispatch.ts
// Runtime source of truth for the known-symbols combo gate (G1).
//
// HISTÓRICO: `scripts/check/check-known-symbols.ts` (seção 2) costumava descobrir quais
// estratégias de roteamento têm branch de despacho lendo a fonte dos arquivos do combo e
// extraindo literais `strategy === "..."` por regex. Isso quebra quando o despacho vira um
// registry (R0.3): não há mais `strategy === "X"` para casar. Este módulo substitui essa
// enumeração por regex-over-source por uma enumeração EXPLÍCITA em runtime, colada ao lado
// do código de despacho real.
//
// Importamos as funções reais de ordenação/despacho (não apenas strings) para amarrar a
// enumeração ao código vivo: se a maquinaria de despacho for reestruturada ou um módulo
// quebrar, a importação falha no load do gate em vez de casar silenciosamente uma regex
// obsoleta. As chaves em HANDLED_COMBO_STRATEGIES DEVEM casar exatamente o conjunto
// canônico (ROUTING_STRATEGY_VALUES ∪ INTERNAL_ROUTING_STRATEGY_VALUES).
//
// Ao adicionar uma estratégia canônica, fie-a no despacho (aqui ou em combo.ts) e inclua-a
// nesta lista; ao remover um branch, retire a entrada — o gate acusa qualquer divergência
// nas duas direções (canonicalSemDespacho / despachoNaoCanonico).

import { applyStrategyOrdering } from "./applyStrategyOrdering.ts";
import { resolveAutoStrategyOrder } from "./resolveAutoStrategy.ts";
import { tryFusionDispatch, tryPipelineDispatch } from "./dispatchPrelude.ts";
import { resolveComboTargetPipeline } from "./targetResolution.ts";

/**
 * As funções reais que implementam o despacho/ordenação de estratégias. Referenciadas
 * aqui para (a) provar ao gate que a maquinaria resolve e (b) servir de âncora viva para
 * a enumeração abaixo — o registry que o R0.3 vai passar a consumir para o branching
 * `strategy === ...` nasce destas mesmas funções.
 */
export const COMBO_STRATEGY_DISPATCH_LEAVES = {
  applyStrategyOrdering,
  resolveAutoStrategyOrder,
  tryFusionDispatch,
  tryPipelineDispatch,
  resolveComboTargetPipeline,
} as const;

/**
 * Conjunto exato de estratégias de roteamento que possuem implementação de despacho real.
 *
 * Cobertura esperada (em `main` do gate): este set ∪ IMPLICIT_DEFAULT_STRATEGIES deve
 * igualar o canônico. Atualmente todas as 20 estratégias canônicas têm branch — então
 * HANDLED_COMBO_STRATEGIES já contém as 20 e IMPLICIT_DEFAULT_STRATEGIES está vazio.
 */
export const HANDLED_COMBO_STRATEGIES: readonly string[] = [
  "priority",
  "weighted",
  "round-robin",
  "context-relay",
  "fill-first",
  "p2c",
  "random",
  "least-used",
  "cost-optimized",
  "reset-aware",
  "reset-window",
  "headroom",
  "strict-random",
  "auto",
  "lkgp",
  "context-optimized",
  "cache-optimized",
  "fusion",
  "pipeline",
  "quota-share",
] as const;
