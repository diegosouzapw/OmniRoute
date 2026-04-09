# Plano: Combo `context-relay` com Handoff Summary

## Atualização de Status — 2026-04-08

Este plano foi revisado após a primeira implementação e um code review técnico.
O objetivo agora é fechar o gap entre "funciona no runtime principal" e
"entrega 100% alinhada com a expectativa do plano".

### Resumo Executivo

- T1-T6: implementadas no runtime principal
- T7: concluída após complementação da suíte combo-level e validação do coverage gate
- T8: concluída com feature doc, CHANGELOG e AGENTS alinhados
- T9-T14: concluídas na continuidade
- A arquitetura atual **não** criou `handleContextRelayCombo` dedicado
- A auditoria confirmou que a arquitetura atual continua funcionalmente correta
- Refatorar apenas para voltar ao desenho original **não** é objetivo por si só

### Decisão Arquitetural Provisória

O plano original previa um `handleContextRelayCombo` dedicado em `combo.ts`.
Na implementação real, o fluxo ficou dividido assim:

- geração do handoff no loop genérico de `handleComboChat`
- injeção do handoff em `handleSingleModelChat`, depois que o `connectionId`
  real foi resolvido

Essa divergência é aceitável porque o `connectionId` efetivo só é conhecido com
segurança no fluxo de auth do `chat.ts`. Portanto:

- **não** abrir refactor cosmético para reintroduzir `handleContextRelayCombo`
- **sim** validar comportamento com a task T9
- **sim** refatorar apenas se a auditoria da T9 encontrar perda funcional real

## Visão Geral

Implementar uma nova estratégia de combo chamada **`context-relay`** que combina:
1. **Quota preflight proativo** (já implementado nos itens 1-2-3)
2. **Handoff Summary automatizado via LLM** — quando uma conta atinge 85% de uso, o sistema gera um resumo estruturado da conversa ("handoff payload") e o armazena. Quando ocorre a troca de conta (a 95%), o resumo é injetado na nova conta como system message, reconstruindo o contexto sem depender do cache do provider.

### Nome escolhido: `context-relay`

> **Por que `context-relay`?**
> - `relay` = revezamento/transferência → expressa a troca automatica de conta com continuidade
> - `context` → indica que o contexto é preservado na troca
> - Genérico o suficiente para funcionar com qualquer provider que suporte combos
> - Não menciona tecnologia interna (não é "codex-relay", não é "handoff-only")
> - Compatível com o padrão de nomenclatura das strategies existentes: `priority`, `round-robin`, `auto`, `cost-optimized`, `context-optimized`, `context-relay`

---

## Arquitetura do `context-relay`

```
Requisição entra → combo context-relay
│
├─ [Quota 0-84%]: Roteamento normal (priority/round-robin dentro do pool)
│
├─ [Quota 85-94%]: WARNING_THRESHOLD — dispara handoff async (não-bloqueante)
│   ├─ generateHandoff(sessionId, messages, currentModel) 
│   ├─ → LLM gera HandoffPayload estruturado (summary, decisions, progress)
│   └─ → Salva em SQLite (context_handoffs) com TTL = resetAt da janela
│
├─ [Quota ≥ 95%]: EXHAUSTION_THRESHOLD — preflight bloqueia esta conta
│   ├─ checkModelAvailable() → false (já implementado)
│   └─ combo vai para próxima conta
│
└─ [Nova conta ativada]:
    ├─ getHandoff(sessionId) → busca payload salvo
    ├─ buildHandoffSystemMessage(payload) → formata como system message XML
    └─ Injeta no body.messages[0] antes de enviar para o provider
```

---

## Tasks do Plano

### Plano Original

| ID | Nome | Arquivo | Complexidade | Status Atual |
|----|------|---------|--------------|--------------|
| T1 | DB Migration: `context_handoffs` table | `TASK-T1-db-migration.md` | Baixa | Concluída |
| T2 | DB Module: `src/lib/db/contextHandoffs.ts` | `TASK-T2-db-module.md` | Baixa | Concluída |
| T3 | Core Service: `open-sse/services/contextHandoff.ts` | `TASK-T3-handoff-service.md` | Alta | Concluída |
| T4 | Nova strategy `context-relay` em `combo.ts` | `TASK-T4-combo-strategy.md` | Alta | Concluída com arquitetura adaptada |
| T5 | Integração no `chat.ts` — injeção na troca de conta | `TASK-T5-chat-integration.md` | Média | Concluída com abordagem mais correta para `connectionId` real |
| T6 | Validação do schema de combo no banco | `TASK-T6-schema-validation.md` | Baixa | Concluída |
| T7 | Testes unitários e integração | `TASK-T7-tests.md` | Média | Concluída |
| T8 | Documentação e i18n | `TASK-T8-docs.md` | Baixa | Concluída |

### Continuidade para Entrega 100%

| ID | Nome | Arquivo | Complexidade | Status |
|----|------|---------|--------------|--------|
| T9 | Auditoria de alinhamento arquitetural e decisão sobre `handleContextRelayCombo` | `TASK-T9-runtime-alignment.md` | Média | Concluída |
| T10 | Eliminar geração duplicada de handoff em requests concorrentes | `TASK-T10-inflight-dedup.md` | Média | Concluída |
| T11 | Tornar `handoffProviders` efetivo no runtime | `TASK-T11-handoff-providers-runtime.md` | Média | Concluída |
| T12 | Completar testes e cobertura do `context-relay` | `TASK-T12-tests-coverage-completion.md` | Alta | Concluída |
| T13 | Completar docs, CHANGELOG e AGENTS | `TASK-T13-docs-release-alignment.md` | Média | Concluída |
| T14 | Validação final e checklist de entrega | `TASK-T14-final-verification.md` | Média | Concluída |

---

## Premissas e Decisões de Design

### O que NÃO será modificado
- Estratégias existentes (`priority`, `round-robin`, `auto`, `weighted`, `least-used`, `cost-optimized`, `context-optimized`, `random`, `strict-random`) — zero alteração
- Combos já criados pelo usuário — retrocompatível
- `comboAgentMiddleware.ts` — não será modificado
- `quotaFetcher.ts` — já implementado, apenas usado
- A implementação atual em `combo.ts` + `chat.ts` não será reestruturada para um
  handler dedicado sem prova de ganho funcional

### HandoffPayload: Formato Estruturado

```typescript
interface HandoffPayload {
  sessionId: string;           // fingerprint da sessão (sessionManager)
  comboName: string;           // nome do combo que gerou o handoff
  fromAccount: string;         // connectionId (primeiros 8 chars) da conta anterior
  summary: string;             // resumo LLM-gerado (~200 palavras)
  keyDecisions: string[];      // array de decisões tomadas na sessão
  taskProgress: string;        // status atual da tarefa em andamento
  activeEntities: string[];    // arquivos, tópicos, entidades mencionadas
  messageCount: number;        // quantas mensagens foram processadas
  generatedAt: string;         // ISO timestamp
  expiresAt: string;           // ISO timestamp = resetAt da janela da conta
  warningThresholdPct: number; // threshold que disparou o handoff (ex: 0.85)
  model: string;               // modelo que gerou o summary
}
```

### Quando chamar o LLM para gerar o handoff

O handoff é gerado **assincronamente** (não-bloqueante, via `setImmediate` ou Promise sem await) quando `percentUsed >= WARNING_THRESHOLD (0.85)` E ainda não existe um handoff ativo para a sessão. Isso garante:
- Zero latência adicionada ao request atual
- O handoff fica pronto antes da conta atingir 95%
- Não há chamada extra de LLM se o handoff já existe

### Gap identificado após review

Esse gap foi fechado na continuidade com um lock de geração "in-flight" por
`sessionId + comboName`, impedindo que requests concorrentes agendem handoffs
duplicados antes do primeiro `upsert`.

### Qual modelo gerar o handoff

Configurável via `combo.config.handoff_model`. Default: o último modelo bem-sucedido do pool (LKGP). Fallback: primeiro modelo disponível do combo. Isso evita chamar um modelo externo extra.

### Threshold para injeção na nova conta

O handoff é injetado como a **primeira system message** se:
1. `getHandoff(sessionId)` retorna payload não-expirado
2. O `connectionId` atual é diferente do `fromAccount` do payload (ou seja, houve troca real de conta)

### TTL do handoff

`expiresAt = min(resetAt5h, resetAt7d)` da conta anterior — quando a janela voltar, o handoff não é mais necessário (a conta original pode ser reusada).

### `handoffProviders`

O plano original já reservava esse campo como extensão futura. Na continuidade,
ele foi tornado efetivo no runtime com a seguinte regra:

- `undefined` ou ausência do campo: usar default `["codex"]`
- `[]`: desabilitar geração de handoff para aquele combo
- `["codex", ...]`: limitar a geração aos providers listados
- providers sem quota fetcher continuam sem suporte ativo até extensão explícita

---

## Manter retrocompatibilidade

O `context-relay` é uma **nova strategy string** no campo `combo.strategy`. Combos existentes não são afetados. O código que processa strategies desconhecidas continua usando o fallback de `priority`, então mesmo se um combo fosse migrado por engano, funcionaria.

---

## Arquivos a Criar/Modificar

| Operação | Arquivo |
|----------|---------|
| [NEW] | `src/lib/db/migrations/019_context_handoffs.sql` |
| [NEW] | `src/lib/db/contextHandoffs.ts` |
| [NEW] | `open-sse/services/contextHandoff.ts` |
| [MODIFY] | `open-sse/services/combo.ts` (hooks do `context-relay` no loop genérico) |
| [MODIFY] | `src/sse/handlers/chat.ts` (injeção na troca real de conta) |
| [NEW] | `tests/unit/context-handoff.test.mjs` |
| [NEW] | `tests/unit/chat-context-relay.test.mjs` |
| [NEW] | `tests/unit/combo-context-relay.test.mjs` |

> Nota: a migration foi renumerada para `019_*` porque o repositório já possuía
> uma migration `018_*` no momento da implementação real.

---

## Gaps Abertos Após Review

Todos os gaps identificados na review foram resolvidos:

1. Dedupe de geração assíncrona agora cobre concorrência in-flight
2. `handoffProviders` agora governa o runtime
3. A suíte T7 passou a cobrir a superfície combo-level adaptada à arquitetura real
4. A T8 passou a entregar `docs/features/context-relay.md`, CHANGELOG e AGENTS

---

## Sign-off Final — 2026-04-08

Status final: **entrega 100% alinhada com o plano revisado e com a expectativa
da review**.

### Decisão arquitetural final

- manter a arquitetura atual sem `handleContextRelayCombo` dedicado
- geração continua em `open-sse/services/combo.ts`
- injeção continua em `src/sse/handlers/chat.ts`
- a auditoria funcional não encontrou motivo técnico para reverter ao desenho antigo

### Validações executadas

```bash
npx prettier --write open-sse/services/contextHandoff.ts open-sse/services/combo.ts src/sse/handlers/chat.ts tests/unit/context-handoff.test.mjs tests/unit/combo-config.test.mjs tests/unit/combo-context-relay.test.mjs docs/features/context-relay.md CHANGELOG.md AGENTS.md
node --import tsx/esm --test tests/unit/context-handoff.test.mjs tests/unit/combo-config.test.mjs tests/unit/combo-context-relay.test.mjs tests/unit/chat-context-relay.test.mjs
npm run typecheck:core
npm run test:coverage
```

### Resultado do gate final

- `test:coverage` aprovado
- `2556` testes executados
- `2556` testes passando
- coverage:
  - statements: `91.88%`
  - branches: `78.63%`
  - functions: `93.23%`
  - lines: `91.88%`
