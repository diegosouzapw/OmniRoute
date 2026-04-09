# 14 — RouterStrategy Plugável: Interface Extensível de Routing

> **Prioridade**: 🟡 Média  
> **Categoria**: Refactoring arquitetural do AutoCombo  
> **Impacto**: Permitir múltiplas estratégias de routing modulares e testáveis individualmente

---

## Contexto e Motivação

O ClawRouter refatorou seu sistema de routing em um **sistema de estratégias plugáveis**
(commit 14c83c258, "refactor: extract routing into pluggable RouterStrategy system"):

```typescript
// ClawRouter src/router/strategy.ts:
interface RouterStrategy {
  route(
    prompt: string,
    systemPrompt: string | undefined,
    maxOutputTokens: number,
    options: RouterOptions
  ): RoutingDecision;
}

// Estratégias disponíveis:
// - RulesStrategy (default, <1ms, puramente baseada em regras/scores)
// - Futuro: MLStrategy, UserDefinedStrategy, etc.
```

O benefício: cada estratégia pode ser testada isoladamente, e novos tipos de routing
podem ser adicionados sem tocar no código existente.

**Para o OmniRoute**: Nossa engine AutoCombo está em `open-sse/services/autoCombo/` e
`open-sse/services/combo.ts`. Refatorá-la em um sistema de strategies plugáveis tornaria
o código mais modular e permitiria:
1. Diferentes combos usando diferentes strategies
2. Strategies customizadas via configuração de usuário
3. A/B testing entre strategies
4. MCP tool para alternar strategy em runtime

---

## Arquivos a Modificar

```
open-sse/services/autoCombo/          ← refatorar em strategies
open-sse/services/autoCombo/types.ts  ← NOVO: interfaces e tipos compartilhados
open-sse/services/autoCombo/strategies/rules.ts     ← NOVO: lógica de regras atual
open-sse/services/autoCombo/strategies/latency.ts   ← NOVO: priority por latência
open-sse/services/autoCombo/strategies/cost.ts      ← NOVO: priority por custo
open-sse/services/autoCombo/registry.ts             ← NOVO: registry de strategies
open-sse/services/autoCombo/index.ts               ← atualizar para usar registry
```

---

## Passo 1: Definir Interfaces em `types.ts`

```typescript
// open-sse/services/autoCombo/types.ts

export interface RoutingContext {
  prompt: string;
  systemPrompt?: string;
  maxOutputTokens?: number;
  requestHasTools: boolean;
  requestHasVision: boolean;
  estimatedInputTokens: number;
  detectedIntent: "code" | "reasoning" | "simple" | "medium";
  userId?: string;
  sessionId?: string;
}

export interface ModelCandidate {
  provider: string;
  model: string;
  capabilities: string[];
  contextWindow: number;
  maxOutput: number;
  pricing: {
    input: number;  // $/M tokens
    output: number;
  };
  latencyStats?: {
    p50Ms: number;
    successRate: number;
    sampleCount: number;
  };
  isAvailable: boolean; // não está em circuit-break
}

export interface RoutingDecision {
  provider: string;
  model: string;
  strategy: string;    // nome da strategy que tomou a decisão
  reason: string;      // explicação legível
  candidatesConsidered: number;
  scoringDetails?: Record<string, number>; // breakdown do score
}

/**
 * Interface que todas as RouterStrategy devem implementar.
 */
export interface RouterStrategy {
  readonly name: string;
  readonly description: string;
  
  /**
   * Selecionar o melhor modelo dado o contexto.
   * @param candidates - Modelos disponíveis e elegíveis para esta request
   * @param context - Contexto da request
   * @returns Decisão de routing
   */
  select(
    candidates: ModelCandidate[],
    context: RoutingContext
  ): RoutingDecision;
}
```

---

## Passo 2: Extrair Lógica Atual para `strategies/rules.ts`

Mover a lógica de scoring atual do AutoCombo para a `RulesStrategy`:

```typescript
// open-sse/services/autoCombo/strategies/rules.ts

import type { RouterStrategy, ModelCandidate, RoutingContext, RoutingDecision } from "../types.ts";

/**
 * RulesStrategy — Estratégia baseada em regras de scoring multi-fator.
 * 
 * Fatores de score:
 * 1. Custo (peso: 40%) — modelos mais baratos ganham mais pontos
 * 2. Intent match (peso: 25%) — modelo adequado para o tipo de request
 * 3. Tool support (peso: 20%) — se request tem tools, priorizar modelos compatíveis
 * 4. Latência histórica (peso: 15%) — modelos mais rápidos ganham pontos
 * 
 * Execução: <1ms (sem I/O, puramente síncrona)
 */
export class RulesStrategy implements RouterStrategy {
  readonly name = "rules";
  readonly description = "Multi-factor weighted scoring: cost, intent, tools, latency";

  select(candidates: ModelCandidate[], context: RoutingContext): RoutingDecision {
    if (candidates.length === 0) {
      throw new Error("RulesStrategy: No candidates provided");
    }

    // Filtrar por capabilities obrigatórias:
    let eligible = this.filterByCapabilities(candidates, context);
    
    if (eligible.length === 0) {
      // Fallback: usar todos os candidatos se nenhum atende (evitar falha total):
      console.warn("[RulesStrategy] No eligible candidates after filtering, using all");
      eligible = candidates;
    }

    // Calcular score para cada candidato:
    const scored = eligible.map(c => ({
      candidate: c,
      score: this.calculateScore(c, context),
      details: this.calculateScoreDetails(c, context),
    }));

    // Ordenar por score (maior primeiro):
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    return {
      provider: best.candidate.provider,
      model: best.candidate.model,
      strategy: this.name,
      reason: this.buildReason(best.candidate, context, best.details),
      candidatesConsidered: eligible.length,
      scoringDetails: best.details,
    };
  }

  private filterByCapabilities(
    candidates: ModelCandidate[],
    context: RoutingContext
  ): ModelCandidate[] {
    return candidates.filter(c => {
      // Filtrar models indisponíveis (circuit break):
      if (!c.isAvailable) return false;
      
      // Se request tem tools, filtrar apenas modelos com tool calling:
      if (context.requestHasTools && !c.capabilities.includes("tools")) return false;
      
      // Se request tem imagens, filtrar apenas modelos com vision:
      if (context.requestHasVision && !c.capabilities.includes("vision")) return false;
      
      // Verificar context window suficiente:
      if (context.estimatedInputTokens + (context.maxOutputTokens ?? 4096) > c.contextWindow) {
        return false;
      }
      
      return true;
    });
  }

  private calculateScore(c: ModelCandidate, ctx: RoutingContext): number {
    let score = 0;
    
    // Fator 1: Custo (40%) — normalizar vs modelo mais caro ($30/M = referência)
    const costScore = Math.max(0, 1 - c.pricing.input / 30);
    score += costScore * 0.40;

    // Fator 2: Intent match (25%)
    score += this.calculateIntentScore(c, ctx.detectedIntent) * 0.25;

    // Fator 3: Latência (15%) — se tiver dados suficientes
    if (c.latencyStats && c.latencyStats.sampleCount >= 10) {
      const latencyScore = Math.max(0, 1 - c.latencyStats.p50Ms / 10000);
      const reliabilityScore = c.latencyStats.successRate;
      score += (latencyScore * 0.7 + reliabilityScore * 0.3) * 0.15;
    } else {
      score += 0.5 * 0.15; // score neutro se sem dados
    }

    // Fator 4: Max output adequado (10%)
    const outputScore = Math.min(1, (c.maxOutput ?? 4096) / 65536);
    score += outputScore * 0.10;

    // Fator 5: Capabilities extras (10%)
    const capScore =
      (c.capabilities.includes("reasoning") ? 0.3 : 0) +
      (c.capabilities.includes("vision") ? 0.2 : 0) +
      (c.capabilities.includes("agentic") ? 0.3 : 0) +
      (c.capabilities.includes("tools") ? 0.2 : 0);
    score += Math.min(1, capScore) * 0.10;

    return score;
  }

  private calculateIntentScore(c: ModelCandidate, intent: string): number {
    switch (intent) {
      case "code":
        // DeepSeek, Codex, modelos com boa performance em código:
        if (c.model.includes("deepseek") || c.model.includes("codex")) return 1.0;
        if (c.capabilities.includes("agentic")) return 0.8;
        return 0.5;

      case "reasoning":
        // Modelos com reasoning explícito:
        if (c.capabilities.includes("reasoning")) return 1.0;
        return 0.4;

      case "simple":
        // Modelos baratos são ideais para tasks simples:
        if (c.pricing.input < 0.5) return 1.0;
        if (c.pricing.input < 1.5) return 0.7;
        return 0.3;

      case "medium":
      default:
        return 0.6; // score neutro para qualquer modelo
    }
  }

  private calculateScoreDetails(c: ModelCandidate, ctx: RoutingContext): Record<string, number> {
    return {
      costFactor: Math.max(0, 1 - c.pricing.input / 30),
      intentFactor: this.calculateIntentScore(c, ctx.detectedIntent),
      latencyFactor: c.latencyStats ? Math.max(0, 1 - c.latencyStats.p50Ms / 10000) : 0.5,
      outputFactor: Math.min(1, (c.maxOutput ?? 4096) / 65536),
    };
  }

  private buildReason(
    c: ModelCandidate,
    ctx: RoutingContext,
    details: Record<string, number>
  ): string {
    const parts: string[] = [];
    
    if (details.costFactor > 0.8) parts.push("custo muito baixo");
    if (details.intentFactor > 0.8) parts.push(`ideal para ${ctx.detectedIntent}`);
    if (details.latencyFactor > 0.8) parts.push("latência baixa");
    
    return `RulesStrategy: ${c.provider}/${c.model} selecionado (${parts.join(", ")})`;
  }
}
```

---

## Passo 3: Criar `strategies/cost.ts` (CostStrategy)

```typescript
// open-sse/services/autoCombo/strategies/cost.ts

import type { RouterStrategy, ModelCandidate, RoutingContext, RoutingDecision } from "../types.ts";

/**
 * CostStrategy — Sempre seleciona o modelo mais barato disponível.
 * Equivalente ao perfil "eco" do ClawRouter.
 * 
 * Ignora latência, qualidade e capabilities além do mínimo necessário.
 * Ideal para bulk tasks de baixo custo onde qualidade não é crítica.
 */
export class CostStrategy implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available model (eco mode)";

  select(candidates: ModelCandidate[], context: RoutingContext): RoutingDecision {
    const eligible = candidates.filter(c => {
      if (!c.isAvailable) return false;
      if (context.requestHasTools && !c.capabilities.includes("tools")) return false;
      if (context.requestHasVision && !c.capabilities.includes("vision")) return false;
      return true;
    });

    if (eligible.length === 0) throw new Error("CostStrategy: No eligible candidates");

    // Ordenar por custo (menor primeiro):
    eligible.sort((a, b) => a.pricing.input - b.pricing.input);
    const cheapest = eligible[0];

    return {
      provider: cheapest.provider,
      model: cheapest.model,
      strategy: this.name,
      reason: `CostStrategy: modelo mais barato ($${cheapest.pricing.input}/M input)`,
      candidatesConsidered: eligible.length,
      scoringDetails: {
        inputPrice: cheapest.pricing.input,
        outputPrice: cheapest.pricing.output,
      },
    };
  }
}
```

---

## Passo 4: Criar `registry.ts`

```typescript
// open-sse/services/autoCombo/registry.ts

import type { RouterStrategy } from "./types.ts";
import { RulesStrategy } from "./strategies/rules.ts";
import { CostStrategy } from "./strategies/cost.ts";

const strategies = new Map<string, RouterStrategy>();

// Registrar estratégias built-in:
strategies.set("rules", new RulesStrategy());
strategies.set("cost", new CostStrategy());
strategies.set("eco", new CostStrategy()); // alias

/**
 * Obter uma strategy pelo nome.
 * Lança erro se não encontrada.
 */
export function getStrategy(name: string): RouterStrategy {
  const strategy = strategies.get(name);
  if (!strategy) {
    throw new Error(`RouterStrategy '${name}' not found. Available: ${[...strategies.keys()].join(", ")}`);
  }
  return strategy;
}

/**
 * Registrar uma nova strategy (para extensão externa).
 */
export function registerStrategy(name: string, strategy: RouterStrategy): void {
  if (strategies.has(name)) {
    console.warn(`[StrategyRegistry] Overwriting existing strategy '${name}'`);
  }
  strategies.set(name, strategy);
}

/**
 * Listar todas as strategies disponíveis.
 */
export function listStrategies(): Array<{ name: string; description: string }> {
  return [...strategies.entries()].map(([name, s]) => ({
    name,
    description: s.description,
  }));
}
```

---

## Passo 5: Atualizar `index.ts` do AutoCombo

```typescript
// open-sse/services/autoCombo/index.ts

import { getStrategy } from "./registry.ts";
import type { RoutingContext, ModelCandidate, RoutingDecision } from "./types.ts";

/**
 * Selecionar o melhor modelo usando a strategy especificada.
 * 
 * @param candidates - Modelos disponíveis para a request
 * @param context - Contexto da request
 * @param strategyName - Nome da strategy a usar (default: "rules")
 */
export function selectModel(
  candidates: ModelCandidate[],
  context: RoutingContext,
  strategyName: string = "rules"
): RoutingDecision {
  const strategy = getStrategy(strategyName);
  return strategy.select(candidates, context);
}

export { getStrategy, registerStrategy, listStrategies } from "./registry.ts";
export type { RouterStrategy, RoutingContext, ModelCandidate, RoutingDecision } from "./types.ts";
```

---

## Passo 6: MCP Tool para Selecionar Strategy

Adicionar um novo MCP tool para alternar a strategy em runtime:

```typescript
// No MCP Server, em open-sse/mcp-server/tools/:

{
  name: "set_routing_strategy",
  description: "Alterar a estratégia de roteamento para um combo específico",
  inputSchema: {
    type: "object",
    properties: {
      comboId: { type: "string", description: "ID do combo a alterar" },
      strategy: {
        type: "string",
        enum: ["rules", "cost", "eco", "latency"],
        description: "Estratégia de roteamento"
      },
    },
    required: ["comboId", "strategy"],
  },
  handler: async ({ comboId, strategy }) => {
    // Atualizar strategy do combo no DB
    await updateComboStrategy(comboId, strategy);
    return { success: true, message: `Combo ${comboId} agora usa strategy '${strategy}'` };
  },
}
```

---

## Testes de Validação

### Teste 1: RulesStrategy seleciona modelo correto
```typescript
import { RulesStrategy } from "./strategies/rules.ts";
import type { ModelCandidate, RoutingContext } from "./types.ts";

const strategy = new RulesStrategy();
const candidates: ModelCandidate[] = [
  { provider: "openai", model: "gpt-4o", pricing: { input: 2.5, output: 10 }, /* ... */ },
  { provider: "groq", model: "gpt-oss-120b", pricing: { input: 0, output: 0 }, /* ... */ },
];
const context: RoutingContext = {
  prompt: "What is 2+2?",
  detectedIntent: "simple",
  requestHasTools: false,
  requestHasVision: false,
  estimatedInputTokens: 10,
};

const decision = strategy.select(candidates, context);
console.assert(decision.provider === "groq", "Simple request should select cheapest");
```

### Teste 2: Strategy com tools filtra modelos incompatíveis
```typescript
const contextWithTools: RoutingContext = { ...context, requestHasTools: true };
// Adicionar um candidato com tools e outro sem:
const candidatesWithTools = [
  { ...candidates[0], capabilities: ["chat"] },           // sem tools
  { ...candidates[1], capabilities: ["chat", "tools"] },  // com tools
];

const decision = strategy.select(candidatesWithTools, contextWithTools);
console.assert(decision.capabilities?.includes("tools"), "Must select tool-capable model");
```

### Teste 3: CostStrategy sempre seleciona o mais barato
```typescript
import { CostStrategy } from "./strategies/cost.ts";
const cost = new CostStrategy();
const d = cost.select(candidates, context);
// Deve selecionar gpt-oss-120b (grátis)
console.assert(d.provider === "groq" && d.model === "gpt-oss-120b");
```

---

## Referências

- [ClawRouter src/router/strategy.ts](https://github.com/BlockRunAI/ClawRouter/blob/main/src/router/index.ts)
- [ClawRouter src/router/types.ts](https://github.com/BlockRunAI/ClawRouter/blob/main/src/router/index.ts)
- ClawRouter commit: `refactor: extract routing into pluggable RouterStrategy system` (14c83c258)

---

## Rollback

A refatoração é interna — o comportamento externo não muda se a `RulesStrategy` usar a mesma
lógica da engine AutoCombo atual. Para reverter, restaurar `autoCombo/index.ts` para versão anterior.
