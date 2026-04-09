# TASK T12 — Completar Testes e Cobertura do `context-relay`

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/REVIEW-STATUS.md`
3. Ler `tests/unit/context-handoff.test.mjs`
4. Ler `tests/unit/chat-context-relay.test.mjs`
5. Ler `open-sse/services/combo.ts`
6. Ler `src/sse/handlers/chat.ts`

## Objetivo

Fechar a T7 de acordo com a arquitetura **real** do projeto, não com a hipótese
original de um handler dedicado obrigatório.

## Princípio

Se a T9 mantiver o desenho atual, a suíte deve testar:

- hook de geração no `handleComboChat`
- injeção real no `chat.ts`
- serviço de handoff isoladamente

Ou seja: testar o comportamento certo, não uma função hipotética.

## Arquivos esperados

- `tests/unit/context-handoff.test.mjs`
- `tests/unit/chat-context-relay.test.mjs`
- `tests/unit/combo-context-relay.test.mjs` (novo)

## Suite 1 — `context-handoff.test.mjs`

Adicionar cobertura faltante para:

1. dedupe in-flight da T10
2. retry permitido após falha
3. `handoffProviders` com semântica final da T11
4. parse inválido retornando `null` sem throw
5. payloads com arrays vazios e truncamento

## Suite 2 — `combo-context-relay.test.mjs`

Criar um arquivo novo focado em `handleComboChat` com `strategy: "context-relay"`.

### Casos mínimos obrigatórios

1. roteia para o primeiro modelo disponível
2. pula modelo com `isModelAvailable === false`
3. respeita breaker aberto
4. dispara `maybeGenerateHandoff` quando quota >= threshold
5. não dispara abaixo do threshold
6. respeita `handoffProviders`

### Observação importante

Se a T9 confirmar que **não** existe `handleContextRelayCombo` dedicado por
design, os testes devem mirar o `handleComboChat` atual e não tentar forçar
uma função inexistente.

## Suite 3 — `chat-context-relay.test.mjs`

Expandir o teste atual com cenários adicionais:

1. não injeta handoff se a mesma conta continuar ativa
2. não injeta handoff se não houver payload salvo
3. deleta handoff após injeção bem-sucedida
4. request interno de summary não faz reinjeção

## Verificações obrigatórias

Executar ao final:

```bash
node --import tsx/esm --test tests/unit/context-handoff.test.mjs
node --import tsx/esm --test tests/unit/combo-context-relay.test.mjs
node --import tsx/esm --test tests/unit/chat-context-relay.test.mjs
npm run typecheck:core
npm run test:coverage
```

## Meta de cobertura

- `contextHandoff.ts`: ≥ 85%
- superfície crítica de `context-relay` em `combo.ts` e `chat.ts`: ≥ 75%
- nenhuma regressão no gate global do repositório

## Critérios de aceite

- Existe suíte específica de combo-level
- Os cenários prometidos pelo plano estão realmente testados
- `npm run test:coverage` passa

## Status

- [ ] `tests/unit/combo-context-relay.test.mjs` criado
- [ ] `context-handoff.test.mjs` expandido
- [ ] `chat-context-relay.test.mjs` expandido
- [ ] `npm run test:coverage` executado e verde
