# FASE 03 — Refatoração Arquitetural

> **Prioridade:** 🟠 Importante  
> **Estimativa de Complexidade:** Alta (5–8 dias)  
> **Dimensões do Relatório:** D1 (Arquitetura), D3 (Qualidade do Código)  
> **Dependências:** FASE-02 (CI necessário para validar refatorações sem regressão)

---

## Objetivo

Decompor monólitos de código, eliminar acoplamentos desnecessários, e estabelecer separação clara de responsabilidades seguindo princípios SOLID, preparando a base de código para extensibilidade futura.

---

## Escopo Detalhado

### 3.1 — Decomposição do `usageDb.js` (969 linhas → 5 módulos)

**Origem no relatório:** D1 — God Object: `usageDb.js` (🟠 Importante)

#### Especificação Técnica

Decompor `src/lib/usageDb.js` em 5 módulos com responsabilidade única:

| Módulo Novo                       | Funções Migradas                                                                                              | Responsabilidade                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `src/lib/usage/usageHistory.js`   | `saveRequestUsage`, `getUsageHistory`, `getUsageDb`, `trackPendingRequest`                                    | CRUD de histórico de uso                      |
| `src/lib/usage/callLogs.js`       | `saveCallLog`, `getCallLogs`, `getCallLogById`, `writeCallLogToDisk`, `readFullLogFromDisk`, `rotateCallLogs` | Logs estruturados de chamadas                 |
| `src/lib/usage/costCalculator.js` | `calculateCost`                                                                                               | Cálculo de custo puro (sem dependência de DB) |
| `src/lib/usage/usageStats.js`     | `getUsageStats`                                                                                               | Agregações e estatísticas                     |
| `src/lib/usage/migrations.js`     | `migrateUsageJsonToSqlite`, `migrateLegacyUsageFiles`, `copyIfMissing`                                        | Migrações de dados                            |

- **Criar** `src/lib/usage/index.js` como barrel que re-exporta a API pública.
- **Atualizar** todos os call sites para importar dos novos módulos.
- **Manter** backward compatibility via re-exports.

#### Critérios de Aceite

- [ ] Cada módulo tem no máximo 200 linhas.
- [ ] Todos os testes existentes passam sem alteração.
- [ ] Nenhum import circular criado.
- [ ] `costCalculator.js` é uma função pura (testável sem DB).

---

### 3.2 — Refatoração do OAuth Providers com Strategy Pattern

**Origem no relatório:** D1 — OAuth Provider Monolith (🟠 Importante)

#### Especificação Técnica

Refatorar `src/lib/oauth/providers.js` (1051 linhas) usando **Strategy + Adapter pattern**:

1. **Criar** base interface em `src/lib/oauth/base/OAuthProvider.js`:

   ```javascript
   export class OAuthProvider {
     constructor(config) {
       this.config = config;
     }
     buildAuthUrl(redirectUri, state, codeChallenge) {
       throw new Error("Not implemented");
     }
     async exchangeToken(code, redirectUri, codeVerifier) {
       throw new Error("Not implemented");
     }
     mapTokens(tokens, extra) {
       throw new Error("Not implemented");
     }
     get flowType() {
       return "authorization_code";
     }
   }
   ```

2. **Criar** subclasses por provider em `src/lib/oauth/providers/`:
   - `claude.js`, `codex.js`, `gemini.js`, `antigravity.js`, `iflow.js`, `qwen.js`, `kimi-coding.js`, `github.js`, `kiro.js`, `cursor.js`, `kilocode.js`, `cline.js`

3. **Criar** factory `src/lib/oauth/providerFactory.js`:

   ```javascript
   export function getProvider(name) {
     return providers[name] ?? null;
   }
   ```

4. **Manter** `providers.js` original como facade durante transição (deprecated).

#### Critérios de Aceite

- [ ] Cada provider em arquivo separado (< 120 linhas cada).
- [ ] Factory retorna instância correta para cada provider.
- [ ] Todos os flows OAuth existentes funcionam (testados via e2e smoke test).
- [ ] Adicionar novo provider requer apenas 1 arquivo novo + registro na factory.
- [ ] Arquivo original `providers.js` marcado como `@deprecated`.

---

### 3.3 — Eliminação do Self-Fetch no Middleware

**Origem no relatório:** D1 — Violação de Separação de Responsabilidades (🔴 Crítico)

#### Especificação Técnica

- **Extrair** lógica de verificação de settings em `src/lib/settingsCache.js`:
  - Cache in-memory com TTL de 5 segundos.
  - Fallback direto para `getSettings()` do DB.
- **Refatorar** `src/proxy.js` para usar `settingsCache` ao invés de `fetch("/api/settings")`.
- **Eliminar** a dependência circular middleware → API route → middleware.

#### Critérios de Aceite

- [ ] `proxy.js` não faz mais `fetch()` para rotas internas.
- [ ] Tempo de resposta do middleware reduzido (sem round-trip HTTP).
- [ ] Cache invalida corretamente quando settings mudam.
- [ ] Build e testes passam.

---

### 3.4 — Criação do Domain Layer

**Origem no relatório:** D1 — Ausência de Domain Layer (🟡 Moderado)

#### Especificação Técnica

- **Criar** `src/domain/` com módulos para regras de negócio puras:
  - `src/domain/modelAvailability.js` — Lógica de `isModelAvailable` extraída de `sse/handlers/chat.js`.
  - `src/domain/costRules.js` — Regras de cálculo de custo extraídas de `usageDb.js`.
  - `src/domain/fallbackPolicy.js` — Regras de fallback/retry extraídas de `sse/services/auth.js`.
- **Garantir** que módulos do domain NÃO importam de `lib/db/`, `sse/`, ou `app/api/`.

#### Critérios de Aceite

- [ ] Diretório `src/domain/` criado com ≥ 3 módulos.
- [ ] Módulos do domain não têm dependências de infra (DB, HTTP).
- [ ] Testes unitários para cada módulo do domain.
- [ ] Handlers refatorados para chamar domain services.

---

### 3.5 — Limpeza Estrutural do Projeto

**Origem no relatório:** D2 — Organização de Pastas (🟡 Moderado, 🟢 Menor)

#### Especificação Técnica

- **Mover** ou `.gitignore` o diretório `antigravity-manager-analysis/`.
- **Consolidar** `src/app/api/rate-limit/` e `src/app/api/rate-limits/` num único endpoint.
- **Eliminar** `src/lib/usage/` (dir com 1 arquivo) — mover conteúdo para `src/lib/usage/` na nova estrutura (item 3.1).

#### Critérios de Aceite

- [ ] `antigravity-manager-analysis/` não faz parte do build.
- [ ] Apenas um endpoint para rate limiting.
- [ ] Sem diretórios com arquivo único desnecessários.

---

## Pré-Requisitos

- FASE-02 completa (CI garante que refatorações não introduzem regressões).
- Todos os testes existentes passando.

## Entregáveis

1. 5 módulos de usage decompostos.
2. 12 providers OAuth em arquivos individuais + factory.
3. Middleware sem self-fetch.
4. Domain layer com ≥ 3 módulos.
5. Estrutura do projeto limpa.

## Critérios de Conclusão da Fase

- [ ] CI verde após todas as refatorações.
- [ ] Cobertura de testes ≥ baseline da FASE-02.
- [ ] Zero imports circulares (verificável via ESLint rule).

## Riscos Identificados

| Risco                                           | Probabilidade | Impacto | Mitigação                                      |
| ----------------------------------------------- | ------------- | ------- | ---------------------------------------------- |
| Refatoração de OAuth quebra fluxos OAuth ativos | Média         | Alto    | Testes manuais de cada provider antes de merge |
| Imports circulares criados na decomposição      | Média         | Médio   | ESLint plugin `import/no-cycle`                |
| Cache de settings no middleware stale           | Baixa         | Médio   | TTL curto (5s) e invalidação on-write          |
