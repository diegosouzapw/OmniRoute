# FASE 05 — Qualidade do Código e Padronização

> **Prioridade:** 🟠 Importante / 🟡 Moderado  
> **Estimativa de Complexidade:** Média (4–6 dias)  
> **Dimensões do Relatório:** D3 (Qualidade do Código), D2 (Organização)  
> **Dependências:** FASE-03 (refatoração arquitetural reduz código duplicado antes da padronização)

---

## Objetivo

Padronizar práticas de código em todo o projeto — logging estruturado, definição de estratégia de tipagem, redução de complexidade ciclomática, e decomposição de componentes UI monolíticos.

---

## Escopo Detalhado

### 5.1 — Structured Logging com Pino

**Origem no relatório:** D3 — `console.log` e `console.error` como Logging em Produção (🟠 Importante)

#### Especificação Técnica

- **Criar** `src/shared/utils/logger.js` como instância centralizada de pino:
  ```javascript
  import pino from "pino";
  export const log = pino({
    level: process.env.LOG_LEVEL || "info",
    transport: process.env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
  });
  ```
- **Substituir** todos os `console.log`, `console.error`, `console.warn` por `log.info/error/warn`.
- **Priorizar** arquivos críticos:
  1. `src/server-init.js`
  2. `src/proxy.js`
  3. `src/sse/handlers/chat.js`
  4. `src/lib/usageDb.js` (ou módulos decompostos)
  5. `src/lib/oauth/providers.js`
- **Incluir** contexto estruturado (provider, model, connectionId) nos logs.

#### Critérios de Aceite

- [ ] Zero `console.log/error/warn` em `src/` (exceto dev scripts).
- [ ] Logger centralizado exporta instância de pino.
- [ ] Logs em produção são JSON (sem pino-pretty).
- [ ] ESLint rule `no-console` ativa com autofix.

---

### 5.2 — Definição de Estratégia de Tipagem (JS + JSDoc)

**Origem no relatório:** D3 — Mix de JS e TS sem Consistência (🟠 Importante)

#### Especificação Técnica

- **Decisão arquitetural:** Adotar **JavaScript + JSDoc** como padrão (não migrar full TS):
  - Manter arquivos `.ts` existentes em `src/types/`.
  - Adicionar `@ts-check` nos arquivos JS principais.
  - Usar `@typedef`, `@param`, `@returns` para tipagem inline.
- **Configurar** tsconfig para checkJs:
  ```json
  { "compilerOptions": { "checkJs": true, "allowJs": true, "strict": false } }
  ```
- **Priorizar** tipagem em:
  1. `src/shared/validation/schemas.js` — já tipado via Zod.
  2. `src/lib/db/core.js` — funções de DB.
  3. `src/sse/services/auth.js` — credenciais.
  4. `src/domain/` — novos módulos (FASE-03).
- **Documentar** a decisão em ADR (FASE-06).

#### Critérios de Aceite

- [ ] ≥ 10 arquivos críticos com `@ts-check` + JSDoc.
- [ ] `tsc --noEmit` executa sem erros nos arquivos anotados.
- [ ] ADR documenta decisão JS + JSDoc vs TypeScript.
- [ ] Templates de JSDoc disponíveis em CONTRIBUTING.md.

---

### 5.3 — Redução de Complexidade Ciclomática

**Origem no relatório:** D3 — Complexidade Ciclomática Elevada (🟡 Moderado)

#### Arquivos afetados

| Arquivo                    | Função                  | Linhas | Ação                   |
| -------------------------- | ----------------------- | ------ | ---------------------- |
| `src/sse/handlers/chat.js` | `handleSingleModelChat` | 183    | Decompor em subfunções |
| `src/lib/usageDb.js`       | `getUsageStats`         | 180    | Extrair SQL queries    |

#### Especificação Técnica

- **Decompor** `handleSingleModelChat` em:
  - `resolveModel(body)` — resolução de modelo/combo.
  - `executeProviderRequest(credentials, translatedBody)` — fetch + stream.
  - `handleProviderError(error, retryContext)` — retry/fallback logic.
- **Decompor** `getUsageStats` em:
  - `buildStatsQuery(period, filters)` — construção de SQL.
  - `aggregateResults(rows)` — computação de estatísticas.
- **Target:** Nenhuma função com mais de 80 linhas.

#### Critérios de Aceite

- [ ] `handleSingleModelChat` tem < 80 linhas.
- [ ] `getUsageStats` tem < 80 linhas.
- [ ] Testes existentes passam sem alteração.
- [ ] ESLint rule `max-lines-per-function` configurada (warn em > 100).

---

### 5.4 — Decomposição de Componentes UI Monolíticos

**Origem no relatório:** D2 — Componentes Monolíticos (🟡 Moderado)

#### Componentes Alvo

| Componente Original             | Tamanho     | Decomposição Proposta                                                                   |
| ------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `RequestLoggerV2.js` (36.3 KB)  | ~800 linhas | `RequestLoggerTable`, `RequestLoggerFilters`, `RequestLoggerDetail`, `useRequestLogger` |
| `UsageStats.js` (27.7 KB)       | ~600 linhas | `UsageChart`, `UsageTable`, `UsageSummary`, `useUsageStats`                             |
| `ProxyLogger.js` (27.6 KB)      | ~600 linhas | `ProxyLogList`, `ProxyLogEntry`, `ProxyLogFilters`, `useProxyLogger`                    |
| `OAuthModal.js` (18.3 KB)       | ~400 linhas | `OAuthProviderList`, `OAuthConnectionForm`, `OAuthTokenStatus`                          |
| `ProxyConfigModal.js` (16.1 KB) | ~350 linhas | `ProxyConfigForm`, `ProxyConfigPreview`, `useProxyConfig`                               |

#### Especificação Técnica

- **Para cada componente:**
  1. Extrair custom hook com lógica de estado e data fetching.
  2. Separar sub-componentes visuais puros.
  3. Manter componente original como "orchestrator" que compõe sub-componentes.
- **Criar** diretórios por feature:
  - `src/shared/components/request-logger/`
  - `src/shared/components/usage-stats/`
  - `src/shared/components/proxy-logger/`
- **Manter** imports existentes via re-export no arquivo original.

#### Critérios de Aceite

- [ ] Nenhum componente com mais de 300 linhas.
- [ ] Hooks extraídos são testáveis independentemente.
- [ ] Importações existentes continuam funcionando.
- [ ] UI renderiza identicamente (visual regression test ou screenshot comparation manual).

---

## Pré-Requisitos

- FASE-03 completa (decomposição de módulos backend facilita decomposição de componentes).
- CI pipeline ativo (FASE-02) para validar regressões.

## Entregáveis

1. Logger centralizado com pino.
2. ≥ 10 arquivos com JSDoc + `@ts-check`.
3. Funções críticas decompostas (< 80 linhas).
4. 5 componentes UI decompostos em sub-componentes.

## Critérios de Conclusão da Fase

- [ ] Zero `console.log` em `src/`.
- [ ] Nenhuma função > 100 linhas.
- [ ] Nenhum componente > 300 linhas.
- [ ] CI verde.

## Riscos Identificados

| Risco                                                   | Probabilidade | Impacto | Mitigação                           |
| ------------------------------------------------------- | ------------- | ------- | ----------------------------------- |
| Decomposição de componentes cria bugs visuais           | Média         | Médio   | Visual regression test antes/depois |
| JSDoc excessivo reduz produtividade                     | Baixa         | Baixo   | Tipar apenas funções exportadas     |
| Substituição de console.log perde context em edge cases | Baixa         | Baixo   | Revisão manual de cada substituição |
