# TASK T13 — Docs, CHANGELOG e AGENTS para `context-relay`

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/REVIEW-STATUS.md`
3. Ler `CHANGELOG.md`
4. Ler `AGENTS.md`
5. Verificar se a T9 já definiu a arquitetura canônica

## Objetivo

Fechar a parte de documentação de produto e release que ficou pendente da T8.

## Entregáveis obrigatórios

### 1. Documento de feature

Criar:

- `docs/features/context-relay.md`

Conteúdo mínimo:

- overview do strategy
- quando usar
- fluxo 0-84 / 85-94 / >=95
- estrutura do handoff payload
- limitations
- nota clara de que o suporte efetivo atual é centrado em `codex`
- nota arquitetural resumida caso a T9 mantenha o desenho atual

### 2. CHANGELOG

Adicionar entrada em `CHANGELOG.md` na seção `[Unreleased]` descrevendo:

- strategy `context-relay`
- handoff summary com geração a 85%
- injeção na troca de conta
- foco atual em contas Codex

### 3. AGENTS

Atualizar [AGENTS.md](/home/diegosouzapw/dev/proxys/9router/AGENTS.md) na seção
de services para incluir:

- `contextHandoff.ts`

e na parte de data layer ou serviços relevantes mencionar:

- `contextHandoffs.ts`

### 4. i18n

Validar o que já foi feito em `en.json` e `pt-BR.json` e completar apenas se
faltarem textos ou observações de produto.

## Não fazer

- Não criar documentação genérica sem refletir o estado real do runtime
- Não prometer suporte multi-provider amplo se ele ainda não existe
- Não omitir o comportamento atual de troca baseada em quota Codex

## Verificação

Executar no final:

```bash
rg -n "context-relay|Context Relay" docs/features/context-relay.md CHANGELOG.md AGENTS.md
```

Se houver `markdownlint`, rodar também:

```bash
npx markdownlint docs/features/context-relay.md 2>/dev/null || echo "no markdownlint"
```

## Critérios de aceite

- `docs/features/context-relay.md` existe
- `CHANGELOG.md` possui entrada em `[Unreleased]`
- `AGENTS.md` referencia os módulos novos
- A documentação não diverge da arquitetura canônica definida pela T9

## Status

- [ ] Feature doc criada
- [ ] CHANGELOG atualizado
- [ ] AGENTS atualizado
- [ ] i18n revisado
