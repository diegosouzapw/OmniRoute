// open-sse/services/combo/strategyDispatch.ts
// Runtime source of truth for the known-symbols combo gate (G1).
//
// HISTÓRICO: `scripts/check/check-known-symbols.ts` (seção 2) costumava descobrir quais
// estratégias de roteamento têm branch de despacho lendo a fonte dos arquivos do combo e
// extraindo por regex os literais de comparação de string da estratégia. Isso quebrou quando o
// despacho virou um registry (R0.3/R0.4a): não há mais comparação literal para casar. Este
// módulo substitui essa enumeração por regex-over-source por uma enumeração EXPLÍCITA em
// runtime, derivada do registry tipado de traits (`strategyRegistry.ts`) e colada ao lado do
// código de despacho real.
//
// Importamos as funções reais de ordenação/despacho (não apenas strings) para amarrar a
// enumeração ao código vivo: se a maquinaria de despacho for reestruturada ou um módulo
// quebrar, a importação falha no load do gate em vez de casar silenciosamente uma regex
// obsoleta. As chaves em HANDLED_COMBO_STRATEGIES DEVEM casar exatamente o conjunto
// canônico (ROUTING_STRATEGY_VALUES ∪ INTERNAL_ROUTING_STRATEGY_VALUES).
//
// Ao adicionar uma estratégia canônica, declare seus traits em `strategyRegistry.ts` (o
// TypeScript recusa a tabela enquanto faltar uma estratégia canônica) — a lista abaixo é
// derivada dela. O gate acusa qualquer divergência nas duas direções
// (canonicalSemDespacho / despachoNaoCanonico).
//
// O registry mora em `strategyRegistry.ts` (sem dependências de runtime) e não aqui porque
// este módulo importa as folhas de despacho: se as folhas importassem os traits daqui, o
// grafo ganharia um ciclo strategyDispatch ⇄ applyStrategyOrdering/targetResolution.

import { applyStrategyOrdering } from "./applyStrategyOrdering.ts";
import { resolveAutoStrategyOrder } from "./resolveAutoStrategy.ts";
import { tryFusionDispatch, tryPipelineDispatch } from "./dispatchPrelude.ts";
import { resolveComboTargetPipeline } from "./targetResolution.ts";
import { REGISTERED_COMBO_STRATEGIES } from "./strategyRegistry.ts";

/**
 * As funções reais que implementam o despacho/ordenação de estratégias. Referenciadas
 * aqui para (a) provar ao gate que a maquinaria resolve e (b) servir de âncora viva para
 * a enumeração abaixo — os traits do registry (`strategyRegistry.ts`) selecionam qual
 * ramo destas funções cada estratégia percorre.
 */
export const COMBO_STRATEGY_DISPATCH_LEAVES = {
  applyStrategyOrdering,
  resolveAutoStrategyOrder,
  tryFusionDispatch,
  tryPipelineDispatch,
  resolveComboTargetPipeline,
} as const;

/**
 * Conjunto exato de estratégias de roteamento que possuem implementação de despacho real —
 * derivado das chaves do registry tipado de traits (`COMBO_STRATEGY_REGISTRY`).
 *
 * Cobertura esperada (em `main` do gate): este set ∪ IMPLICIT_DEFAULT_STRATEGIES deve
 * igualar o canônico. 20 estratégias canônicas + 1 interna (`quota-share`) = 21 entradas;
 * IMPLICIT_DEFAULT_STRATEGIES continua vazio.
 */
export const HANDLED_COMBO_STRATEGIES: readonly string[] = REGISTERED_COMBO_STRATEGIES;
