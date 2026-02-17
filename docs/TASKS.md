# Rate Limiting & Flow Control Overhaul — Tasks

> Referência: [Relatório de Análise](../walkthrough.md) · Fase docs em `/docs/phases/`

---

## Fase 1 — Error Classification & Provider Profiles

### Backend Core

- [x] `constants.ts` — Substituir `COOLDOWN_MS.transient` por `transientInitial` (5s) + `transientMax` (60s)
- [x] `constants.ts` — Adicionar `PROVIDER_PROFILES` (oauth / apikey) com cooldowns diferenciados
- [x] `constants.ts` — Adicionar `DEFAULT_API_LIMITS` (100 RPM, 200ms minTime)
- [x] `providerRegistry.ts` — Criar helper `getProviderCategory(providerId)` → `"oauth"` | `"apikey"`
- [x] `accountFallback.ts` — Aceitar `provider` como parâmetro em `checkFallbackError`
- [x] `accountFallback.ts` — Implementar backoff exponencial para 502/503/504 transientes
- [x] `accountFallback.ts` — Calcular cooldown baseado no perfil do provedor
- [x] `accountFallback.ts` — Adicionar helper `getProviderProfile(provider)`

### Callers (propagar `provider`)

- [x] `auth.ts` → `markAccountUnavailable` — Passar `provider` para `checkFallbackError`
- [x] `combo.ts` → `handleComboChat` / `handleRoundRobinCombo` — Passar `provider` nos erros

### Testes

- [x] Atualizar `rate-limit-enhanced.test.mjs` — Teste "transient errors don't increase backoff" → `newBackoffLevel = 1`
- [x] Criar `error-classification.test.mjs` — Cooldown exponencial 502, perfis OAuth/API, helper `getProviderCategory`

---

## Fase 2 — Circuit Breaker no Combo Pipeline

### Backend

- [x] `combo.ts` — Importar `getCircuitBreaker` e `CircuitBreakerOpenError`
- [x] `combo.ts` — `handleComboChat` — Verificar `breaker.canExecute()` antes de cada modelo
- [x] `combo.ts` — `handleRoundRobinCombo` — Integrar breaker per-model
- [x] `combo.ts` — Marcar `semaphore.markRateLimited` para 502/503/504 (não só 429)
- [x] `combo.ts` — Implementar early exit quando todos os modelos têm breaker OPEN

### Testes

- [x] Criar `combo-circuit-breaker.test.mjs` — Combo skip breaker OPEN, early exit, semáforo 502

---

## Fase 3 — Anti-Thundering Herd & Auto Rate Limit

### Backend

- [x] `rateLimitManager.ts` — Auto-enable para `apikey` providers com limites elevados
- [x] `rateLimitManager.ts` — Criar limiter com defaults (100 RPM) quando não configurado
- [x] `auth.ts` — Adicionar mutex na `markAccountUnavailable` para evitar marcação paralela

### Testes

- [x] Criar `thundering-herd.test.mjs` — Mutex, auto-enable, limites não restritivos

---

## Fase 4 — Frontend Resilience UI

### Settings Page

- [x] `settings/page.tsx` — Adicionar tab "Resilience" (icon: `health_and_safety`) entre Routing e Pricing

### Novos Componentes

- [x] Criar `ResilienceTab.tsx` — Layout com 4 cards (Provider Profiles → Rate Limiting → Circuit Breakers → Policies)
- [x] Criar `ProviderProfilesCard.tsx` — Toggle OAuth/API Key, inputs para cooldowns
- [x] Criar `CircuitBreakerCard.tsx` — Status real-time per-provider, auto-refresh 5s, botão reset
- [x] Criar `RateLimitOverviewCard.tsx` — Tabela providers × accounts × cooldown — **agora editável com RPM, Min Gap, Max Concurrent**

### API Routes

- [x] Criar `api/resilience/route.ts` — GET (estado completo + defaults mesclados) + PATCH (salvar perfis + defaults)
- [x] Criar `api/resilience/reset/route.ts` — POST (resetar breakers + cooldowns)

### Migração

- [x] `PoliciesPanel.tsx` movido de Security para Resilience tab

---

## Fase 5 — Settings Page Restructure (v0.9.0)

### Tab Reorganization

- [x] **Security** — Simplificado para Login/Password + IP Access Control
- [x] **Routing** — Expandido para 6 estratégias globais com descrições
- [x] **Resilience** — Reordenado: Provider Profiles → Rate Limiting (editável) → Circuit Breakers → Policies
- [x] **AI** — Thinking Budget + System Prompt + Prompt Cache (movido do Advanced)
- [x] **Advanced** — Simplificado para apenas Global Proxy

### Backend Routing Strategies

- [x] `auth.ts` — Implementar `random` (Fisher-Yates shuffle)
- [x] `auth.ts` — Implementar `least-used` (sorted by lastUsedAt)
- [x] `auth.ts` — Implementar `cost-optimized` (sorted by priority)
- [x] `auth.ts` — Corrigir `p2c` (power-of-two-choices com health scoring)
- [x] `settings.ts` — Expandir tipo `fallbackStrategy` para 6 valores

---

## Verificação Final

- [x] Rodar todos os testes unitários: `node --test tests/unit/*.test.mjs`
- [x] Build do Next.js: `npm run build`
- [x] Verificar aba Resilience no browser
- [x] Testar persistência dos perfis (salvar → reload)
- [x] Testar Reset All Breakers
- [x] Verificar todas as 5 tabs reestruturadas
