---
title: "Issues e PRs Upstream do OmniRoute"
---

# Issues e PRs Upstream do OmniRoute

Preparado a partir do working tree local atual do OmniRoute em 2026-06-01.

Este documento foi feito para uso prático: ele separa o que já está pronto para upstream do que ainda é local/fork-only, e deixa textos de issue, textos de PR, comandos, nomes de branch, mensagens de commit e URLs de compare prontos para copiar e colar.

Premissa usada abaixo: seu fork é `zhiru/OmniRoute`, porque o `origin` atual aponta para esse repositório.

## Candidatos recomendados para upstream agora

1. Compatibilidade com VS Code Copilot BYOK / Ollama por meio de rotas tokenizadas e normalização de catálogo.
2. Robustez no bootstrap do SQL.js e defer de migrações opcionais de FTS5.

## Não subir para upstream do jeito que está hoje

- `.gitignore`, arquivos locais de Apache, `apache.http-proxy.md`, `server-access.md` e `docs/ops/deploy/neuraltalk-omni-production.md` são específicos do fork.
- `docker-compose.prod.yml` é específico do seu deploy.
- `.source/browser.ts` e `.source/server.ts` são artefatos gerados e hoje incluem um caminho de documentação local de deploy.
- As mudanças de texto/i18n do dashboard de proxy são válidas, mas é melhor isolá-las depois em uma PR separada de polish, em vez de misturar com os dois candidatos principais.

## Preparação compartilhada

Use isso uma vez antes de preparar qualquer branch para upstream:

```bash
cd /home/aireset/projetos/docker/omniroute
git remote get-url upstream >/dev/null 2>&1 || git remote add upstream git@github.com:diegosouzapw/OmniRoute.git
git fetch upstream
git status --short
```

Se quiser confirmar se sua base local já bate com `upstream/main`:

```bash
cd /home/aireset/projetos/docker/omniroute
git rev-parse main
git rev-parse upstream/main
git diff --stat upstream/main...main
```

## Candidato 1

### Feature

Compatibilidade com VS Code Copilot BYOK / Ollama usando aliases tokenizados do OmniRoute.

### Racional do candidato 2 para upstream

- É funcionalidade geral do produto, não ajuste específico do seu deploy.
- Ajuda o OmniRoute a funcionar como backend compatível com BYOK do VS Code Copilot no modo de endpoint Ollama.
- Já vem com testes para roteamento, descoberta de modelos, metadados de reasoning e agregação do catálogo MCP.

### Arquivos do candidato 2 para incluir

```text
open-sse/mcp-server/schemas/tools.ts
open-sse/mcp-server/server.ts
src/app/(dashboard)/dashboard/endpoint/ApiEndpointsTab.tsx
src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx
src/app/(dashboard)/dashboard/endpoint/VscodeTokenAliasCard.tsx
src/app/(dashboard)/dashboard/endpoint/__tests__/ApiEndpointsTab.test.tsx
src/app/(dashboard)/dashboard/endpoint/__tests__/EndpointPageClient.test.tsx
src/app/(dashboard)/dashboard/providers/[id]/page.tsx
src/app/api/v1/models/catalog.ts
src/app/api/v1/vscode/VS_CODE_COPILOT_OLLAMA_CONTRACT.md
src/app/api/v1/vscode/[token]/api/chat/route.ts
src/app/api/v1/vscode/[token]/api/show/route.ts
src/app/api/v1/vscode/[token]/api/tags/route.ts
src/app/api/v1/vscode/[token]/api/version/route.ts
src/app/api/v1/vscode/[token]/chat/completions/route.ts
src/app/api/v1/vscode/[token]/modelPresentation.ts
src/app/api/v1/vscode/[token]/models/route.ts
src/app/api/v1/vscode/[token]/reasoningMetadata.ts
src/app/api/v1/vscode/[token]/responses/route.ts
src/app/api/v1/vscode/[token]/route.ts
src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts
src/app/api/v1/vscode/[token]/v1/models/route.ts
src/i18n/messages/en.json
src/i18n/messages/pt-BR.json
src/lib/modelMetadataRegistry.ts
src/shared/constants/modelSpecs.ts
src/shared/utils/apiAuth.ts
src/sse/services/auth.ts
tests/unit/api-auth.test.ts
tests/unit/mcp-model-catalog.test.ts
tests/unit/models-catalog-route.test.ts
tests/unit/provider-models-route.test.ts
tests/unit/sse-auth.test.ts
tests/unit/vscode-token-routes.test.ts
```

### Arquivos do candidato 2 para deixar fora desta PR

```text
.gitignore
.dockerignore
docker-compose.prod.yml
.source/browser.ts
.source/server.ts
src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx
src/app/(dashboard)/dashboard/settings/components/proxy/DocumentationTab.tsx
src/app/(dashboard)/dashboard/settings/components/proxy/FreePoolTab.tsx
src/app/(dashboard)/dashboard/settings/components/proxy/VercelRelayModal.tsx
docs/guides/SETUP_GUIDE.md
docs/reference/API_REFERENCE.md
docs/reference/CLI-TOOLS.md
scripts/build/bootstrap-env.mjs
scripts/dev/run-next.mjs
tests/integration/integration-wiring.test.ts
```

### Branch sugerida do candidato 2

```text
feat/upstream-vscode-ollama-compat
```

### Comandos prontos do candidato 2

```bash
cd /home/aireset/projetos/docker/omniroute
git switch -c feat/upstream-vscode-ollama-compat upstream/main
git add \
  'open-sse/mcp-server/schemas/tools.ts' \
  'open-sse/mcp-server/server.ts' \
  'src/app/(dashboard)/dashboard/endpoint/ApiEndpointsTab.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/VscodeTokenAliasCard.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/__tests__/ApiEndpointsTab.test.tsx' \
  'src/app/(dashboard)/dashboard/endpoint/__tests__/EndpointPageClient.test.tsx' \
  'src/app/(dashboard)/dashboard/providers/[id]/page.tsx' \
  'src/app/api/v1/models/catalog.ts' \
  'src/app/api/v1/vscode/VS_CODE_COPILOT_OLLAMA_CONTRACT.md' \
  'src/app/api/v1/vscode/[token]/api/chat/route.ts' \
  'src/app/api/v1/vscode/[token]/api/show/route.ts' \
  'src/app/api/v1/vscode/[token]/api/tags/route.ts' \
  'src/app/api/v1/vscode/[token]/api/version/route.ts' \
  'src/app/api/v1/vscode/[token]/chat/completions/route.ts' \
  'src/app/api/v1/vscode/[token]/modelPresentation.ts' \
  'src/app/api/v1/vscode/[token]/models/route.ts' \
  'src/app/api/v1/vscode/[token]/reasoningMetadata.ts' \
  'src/app/api/v1/vscode/[token]/responses/route.ts' \
  'src/app/api/v1/vscode/[token]/route.ts' \
  'src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts' \
  'src/app/api/v1/vscode/[token]/v1/models/route.ts' \
  'src/i18n/messages/en.json' \
  'src/i18n/messages/pt-BR.json' \
  'src/lib/modelMetadataRegistry.ts' \
  'src/shared/constants/modelSpecs.ts' \
  'src/shared/utils/apiAuth.ts' \
  'src/sse/services/auth.ts' \
  'tests/unit/api-auth.test.ts' \
  'tests/unit/mcp-model-catalog.test.ts' \
  'tests/unit/models-catalog-route.test.ts' \
  'tests/unit/provider-models-route.test.ts' \
  'tests/unit/sse-auth.test.ts' \
  'tests/unit/vscode-token-routes.test.ts'
git diff --cached --stat
node --import tsx/esm --test tests/unit/vscode-token-routes.test.ts
node --import tsx/esm --test tests/unit/mcp-model-catalog.test.ts
node --import tsx/esm --test tests/unit/api-auth.test.ts tests/unit/sse-auth.test.ts tests/unit/models-catalog-route.test.ts tests/unit/provider-models-route.test.ts
npm run test:coverage
git commit -m "feat(vscode): add Ollama-compatible token routes for BYOK"
git push -u origin feat/upstream-vscode-ollama-compat
```

### URL de compare do candidato 2

```text
https://github.com/diegosouzapw/OmniRoute/compare/main...zhiru:feat/upstream-vscode-ollama-compat?expand=1
```

### Título sugerido da issue do candidato 2

```text
Support VS Code Copilot BYOK Ollama mode with token-scoped discovery and chat aliases
```

### Texto sugerido da issue em inglês do candidato 2

```md
## Summary

OmniRoute already exposes OpenAI-compatible routes, but VS Code Copilot BYOK in Ollama mode expects an Ollama-style discovery contract before it will use a custom endpoint.

Right now this makes integration harder when OmniRoute is running with API key auth enabled, because the extension expects paths like `/api/version`, `/api/tags`, `/api/show`, and `/v1/chat/completions` under a single base endpoint.

## Problem

- VS Code Copilot BYOK Ollama mode first validates the endpoint through Ollama-style discovery routes.
- A custom OmniRoute deployment may require authentication for model discovery.
- The extension benefits from stable model naming, capability hints, and reasoning metadata so imported models are usable without manual cleanup.

## Proposal

Add a token-scoped compatibility surface such as `/api/v1/vscode/{token}/...` that:

- mirrors the OpenAI-compatible model catalog,
- serves Ollama-compatible discovery endpoints,
- forwards chat traffic to OpenAI-compatible completions routes,
- accepts path-scoped API keys,
- normalizes provider aliases and capabilities,
- exposes reasoning effort metadata where supported.

## Expected benefit

- Easier VS Code Copilot BYOK onboarding
- Cleaner model import experience
- Better interoperability without weakening OmniRoute auth

## Notes

I already have a local implementation and tests for this, and I can open a focused PR if this direction is welcome.
```

### Referência em português da issue do candidato 2

```md
## Resumo

O OmniRoute já expõe rotas compatíveis com OpenAI, mas o modo BYOK Ollama do VS Code Copilot espera um contrato de descoberta no estilo Ollama antes de usar um endpoint customizado.

Hoje isso dificulta a integração quando o OmniRoute está rodando com autenticação por API key ativa, porque a extensão espera caminhos como `/api/version`, `/api/tags`, `/api/show` e `/v1/chat/completions` sob uma mesma base.

## Problema

- O modo BYOK Ollama do VS Code Copilot valida primeiro o endpoint por rotas de descoberta no estilo Ollama.
- Um deploy customizado do OmniRoute pode exigir autenticação para descoberta de modelos.
- A extensão se beneficia de nomes estáveis de modelo, hints de capability e metadados de reasoning para importar modelos sem limpeza manual posterior.

## Proposta

Adicionar uma superfície de compatibilidade tokenizada, como `/api/v1/vscode/{token}/...`, que:

- espelhe o catálogo de modelos compatível com OpenAI,
- sirva endpoints de descoberta compatíveis com Ollama,
- encaminhe o tráfego de chat para as rotas compatíveis com OpenAI,
- aceite API keys via path,
- normalize aliases de provider e capabilities,
- exponha metadados de reasoning effort quando houver suporte.

## Benefício esperado

- onboarding mais simples do VS Code Copilot BYOK
- experiência mais limpa na importação de modelos
- melhor interoperabilidade sem enfraquecer a autenticação do OmniRoute

## Observação

Eu já tenho uma implementação local com testes para isso e posso abrir uma PR focada se essa direção fizer sentido.
```

### Título sugerido da PR do candidato 2

```text
feat(vscode): add Ollama-compatible token routes for VS Code BYOK
```

### Texto sugerido da PR em inglês do candidato 2

```md
## Summary

This PR adds a token-scoped VS Code compatibility surface so OmniRoute can behave like an Ollama-compatible BYOK endpoint for VS Code Copilot while keeping OmniRoute auth in place.

## What changed

- added `/api/v1/vscode/{token}` discovery and chat aliases
- added Ollama-compatible `/api/version`, `/api/tags`, and `/api/show` responses
- reused the OpenAI-compatible model catalog behind token-scoped routes
- taught auth helpers to accept path-scoped API keys for these routes
- normalized model/provider metadata for VS Code import flows
- exposed reasoning effort metadata where available
- added dashboard endpoint cards to show the ready-to-copy VS Code URLs
- expanded MCP model catalog aggregation to include provider alias resolution and thinking effort metadata
- added unit tests for routes, auth, and catalog behavior

## Why

VS Code Copilot BYOK in Ollama mode validates a specific discovery contract before using a custom endpoint. OmniRoute already has most of the necessary building blocks, but not the token-scoped compatibility layer.

## Testing

- `node --import tsx/esm --test tests/unit/vscode-token-routes.test.ts`
- `node --import tsx/esm --test tests/unit/mcp-model-catalog.test.ts`
- `node --import tsx/esm --test tests/unit/api-auth.test.ts tests/unit/sse-auth.test.ts tests/unit/models-catalog-route.test.ts tests/unit/provider-models-route.test.ts`
- `npm run test:coverage`
```

### Referência em português da PR do candidato 2

```md
## Resumo

Esta PR adiciona uma superfície tokenizada de compatibilidade com VS Code para que o OmniRoute possa se comportar como um endpoint BYOK compatível com Ollama para o VS Code Copilot, sem abrir mão da autenticação do OmniRoute.

## O que mudou

- adiciona aliases de descoberta e chat em `/api/v1/vscode/{token}`
- adiciona respostas compatíveis com Ollama para `/api/version`, `/api/tags` e `/api/show`
- reaproveita o catálogo compatível com OpenAI por trás de rotas tokenizadas
- ensina os helpers de auth a aceitar API keys via path nessas rotas
- normaliza metadados de modelo/provider para os fluxos de importação do VS Code
- expõe metadados de reasoning effort quando disponíveis
- adiciona cards no dashboard com URLs prontas para copiar no VS Code
- expande a agregação do catálogo MCP para incluir aliases de provider e thinking effort
- adiciona testes unitários para rotas, auth e comportamento do catálogo

## Por quê

O modo BYOK Ollama do VS Code Copilot valida um contrato específico de descoberta antes de usar um endpoint customizado. O OmniRoute já tem boa parte dos blocos necessários, mas ainda não tinha a camada tokenizada de compatibilidade.

## Testes

- `node --import tsx/esm --test tests/unit/vscode-token-routes.test.ts`
- `node --import tsx/esm --test tests/unit/mcp-model-catalog.test.ts`
- `node --import tsx/esm --test tests/unit/api-auth.test.ts tests/unit/sse-auth.test.ts tests/unit/models-catalog-route.test.ts tests/unit/provider-models-route.test.ts`
- `npm run test:coverage`
```

## Candidato 2

### Fix

Fortalecer a inicialização do SQL.js e adiar migrações opcionais de FTS5 quando o driver SQLite ativo não suportar FTS5.

### Por que isso faz sentido no upstream

- Melhora a robustez de runtime em instalações válidas do OmniRoute.
- Evita falhas de startup em ambientes que usam `sql.js` ou um driver SQLite sem FTS5.
- Mantém a aplicação utilizável enquanto avisa claramente que a busca de memória entrou em fallback até existir suporte a FTS5.

### Arquivos para incluir

```text
src/lib/db/adapters/sqljsAdapter.ts
src/lib/db/core.ts
src/lib/db/migrationRunner.ts
tests/unit/db-core-native-error.test.ts
tests/unit/db-migration-runner.test.ts
```

### Arquivos para deixar fora desta PR

```text
.gitignore
.dockerignore
docker-compose.prod.yml
.source/browser.ts
.source/server.ts
src/app/api/v1/vscode/**
src/app/(dashboard)/dashboard/**
src/app/api/v1/models/catalog.ts
src/shared/utils/apiAuth.ts
open-sse/mcp-server/**
```

### Branch sugerida

```text
fix/upstream-sqljs-fts5-bootstrap
```

### Comandos prontos para copiar e colar

```bash
cd /home/aireset/projetos/docker/omniroute
git switch -c fix/upstream-sqljs-fts5-bootstrap upstream/main
git add \
  'src/lib/db/adapters/sqljsAdapter.ts' \
  'src/lib/db/core.ts' \
  'src/lib/db/migrationRunner.ts' \
  'tests/unit/db-core-native-error.test.ts' \
  'tests/unit/db-migration-runner.test.ts'
git diff --cached --stat
node --import tsx/esm --test tests/unit/db-core-native-error.test.ts
node --import tsx/esm --test tests/unit/db-migration-runner.test.ts
npm run test:coverage
git commit -m "fix(db): harden sql.js startup and skip unsupported FTS5 migrations"
git push -u origin fix/upstream-sqljs-fts5-bootstrap
```

### URL de compare

```text
https://github.com/diegosouzapw/OmniRoute/compare/main...zhiru:fix/upstream-sqljs-fts5-bootstrap?expand=1
```

### Título sugerido da issue

```text
Avoid SQL.js startup failures and defer optional FTS5 migrations on drivers without FTS5 support
```

### Texto sugerido da issue em inglês

```md
## Summary

Some OmniRoute environments can run with `sql.js` or with SQLite drivers that do not expose FTS5. In those cases, startup can fail for two avoidable reasons:

1. `sql.js` may not resolve `sql-wasm.wasm` correctly in bundled/standalone layouts.
2. Optional FTS5 migrations can abort the migration runner even though the rest of the database is usable.

## Problem

- a valid `sql.js` deployment can fail before the database is initialized if the WASM asset is not located correctly
- optional memory-search migrations should not block the whole app on a driver that lacks FTS5
- current behavior is harsher than necessary because the fallback mode is still usable

## Proposal

- resolve `sql-wasm.wasm` from both regular and standalone runtime layouts
- classify pre-init driver-unavailable errors explicitly
- defer optional FTS5 migrations when the active driver reports `no such module: fts5`
- keep a clear warning so operators know memory search is degraded until a driver with FTS5 support is available

## Expected benefit

- safer startup on sql.js-based installs
- fewer false-positive migration aborts
- clearer degraded-mode behavior instead of full startup failure

## Notes

I already have a local implementation and tests for this and can open a focused PR if this direction is useful.
```

### Referência em português da mesma issue

```md
## Resumo

Alguns ambientes do OmniRoute podem rodar com `sql.js` ou com drivers SQLite que não expõem FTS5. Nesses casos, o startup pode falhar por dois motivos evitáveis:

1. `sql.js` pode não resolver `sql-wasm.wasm` corretamente em layouts bundled/standalone.
2. Migrações opcionais de FTS5 podem abortar o migration runner mesmo quando o restante do banco é utilizável.

## Problema

- um deploy válido com `sql.js` pode falhar antes da inicialização do banco se o asset WASM não for localizado corretamente
- migrações opcionais da busca de memória não deveriam bloquear toda a aplicação em um driver sem FTS5
- o comportamento atual é mais severo do que o necessário porque o modo de fallback ainda é utilizável

## Proposta

- resolver `sql-wasm.wasm` tanto em layout normal quanto em layout standalone
- classificar explicitamente erros de driver indisponível antes da inicialização
- adiar migrações opcionais de FTS5 quando o driver ativo reportar `no such module: fts5`
- manter um warning claro para que operadores saibam que a busca de memória está degradada até existir suporte a FTS5

## Benefício esperado

- startup mais seguro em instalações baseadas em sql.js
- menos abortos falsos no fluxo de migração
- comportamento degradado mais claro, sem derrubar toda a inicialização

## Observação

Eu já tenho uma implementação local com testes para isso e posso abrir uma PR focada se essa direção for útil.
```

### Título sugerido da PR

```text
fix(db): harden sql.js startup and skip unsupported FTS5 migrations
```

### Texto sugerido da PR em inglês

```md
## Summary

This PR makes SQLite startup more resilient in environments that use `sql.js` or SQLite drivers without FTS5 support.

## What changed

- resolved `sql-wasm.wasm` from both regular `node_modules` and standalone runtime layouts
- added explicit detection for pre-init driver-unavailable errors
- treated those driver-unavailable errors as startup-critical where appropriate
- marked the FTS5 migrations as optional when the active driver does not support FTS5
- kept the migration runner warning so degraded memory search remains visible
- added unit coverage for the new error classification and deferred migration behavior

## Why

The application can still function in degraded mode without FTS5, so optional FTS5 migrations should not crash startup. Likewise, `sql.js` installations should not fail only because the WASM file is resolved from a different runtime layout.

## Testing

- `node --import tsx/esm --test tests/unit/db-core-native-error.test.ts`
- `node --import tsx/esm --test tests/unit/db-migration-runner.test.ts`
- `npm run test:coverage`
```

### Referência em português da mesma PR

```md
## Resumo

Esta PR torna a inicialização do SQLite mais resiliente em ambientes que usam `sql.js` ou drivers SQLite sem suporte a FTS5.

## O que mudou

- resolve `sql-wasm.wasm` tanto em `node_modules` normal quanto em layouts standalone
- adiciona detecção explícita para erros de driver indisponível antes da inicialização
- trata esses erros de driver indisponível como críticos de startup quando apropriado
- marca as migrações de FTS5 como opcionais quando o driver ativo não suporta FTS5
- mantém o warning do migration runner para que o modo degradado de busca de memória continue visível
- adiciona cobertura unitária para a nova classificação de erro e para o comportamento de defer nas migrações

## Por quê

A aplicação ainda consegue funcionar em modo degradado sem FTS5, então migrações opcionais de FTS5 não deveriam derrubar o startup. Da mesma forma, instalações com `sql.js` não deveriam falhar apenas porque o arquivo WASM foi resolvido em um layout de runtime diferente.

## Testes

- `node --import tsx/esm --test tests/unit/db-core-native-error.test.ts`
- `node --import tsx/esm --test tests/unit/db-migration-runner.test.ts`
- `npm run test:coverage`
```

## Split opcional no futuro

Se você quiser um terceiro item para upstream depois, o mais promissor é um ajuste separado para o viewer de Docs do Dashboard precisar da árvore markdown em inglês disponível em runtime no container. Esse ponto ainda precisa ser limpo antes para não carregar arquivos fork-only nem ruído gerado em `.source/*`.
