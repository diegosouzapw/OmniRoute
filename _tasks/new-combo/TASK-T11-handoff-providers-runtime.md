# TASK T11 — Tornar `handoffProviders` Efetivo no Runtime

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/REVIEW-STATUS.md`
3. Ler `open-sse/services/contextHandoff.ts`
4. Ler `open-sse/services/combo.ts`
5. Ler `open-sse/services/comboConfig.ts`
6. Ler `src/shared/validation/schemas.ts`
7. Ler `tests/unit/combo-config.test.mjs`

## Problema a resolver

O campo `handoffProviders` já existe em:

- tipos
- schemas
- config defaults

mas ainda não muda o comportamento do runtime. Isso deixa a configuração
enganosa para o usuário.

## Objetivo

Fazer com que `handoffProviders` tenha efeito real no disparo do handoff.

## Semântica esperada

### Default

- campo ausente ou `undefined` → usar `["codex"]`

### Desabilitar explicitamente

- array vazio `[]` → não gerar handoff para aquele combo

### Lista explícita

- `["codex"]` → gera apenas para requests do provider `codex`
- `["openai"]` com combo atual em `codex` → não gera handoff
- `["codex", "openai"]` → respeita a lista, mas só providers com suporte real a
  quota fetcher serão acionados

## Regra prática para esta fase

Nesta entrega, o provider com suporte efetivo continua sendo `codex`.
O importante é que:

- a lista passe a governar a decisão
- o campo deixe de ser apenas decorativo
- a documentação deixe isso claro

## Implementação sugerida

### 1. Normalização do config

Revisar `resolveContextRelayConfig()` para distinguir:

- ausência do campo
- array explicitamente vazio

### 2. Gating no runtime

No hook pós-sucesso de `combo.ts`, antes do quota fetch:

- resolver o config final do combo
- verificar se o `provider` atual está habilitado em `handoffProviders`
- se não estiver, sair sem gerar handoff

### 3. Compatibilidade

Não bloquear:

- roteamento normal do combo
- injeção de handoff já persistido
- requests de outros providers fora do escopo de quota fetch atual

## Arquivos esperados

- `open-sse/services/contextHandoff.ts`
- `open-sse/services/combo.ts`
- `open-sse/services/comboConfig.ts`
- `src/shared/validation/schemas.ts` se necessário
- `tests/unit/combo-config.test.mjs`
- `tests/unit/context-handoff.test.mjs`
- `tests/unit/combo-context-relay.test.mjs`

## Testes obrigatórios

1. `handoffProviders` omitido usa default `["codex"]`
2. `handoffProviders: []` desabilita geração
3. `handoffProviders: ["openai"]` impede geração para request `codex`
4. `handoffProviders: ["codex"]` mantém o comportamento atual

## Critérios de aceite

- `handoffProviders` deixa de ser configuração morta
- A semântica de `[]` como disable é suportada e documentada
- Não há regressão no caso default

## Status

- [ ] Semântica final de `handoffProviders` implementada
- [ ] Runtime usa a lista para decidir geração
- [ ] Caso `[]` validado
- [ ] Testes cobrindo default, disable e allowlist adicionados
