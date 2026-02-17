# Rate Limiting & Flow Control Overhaul — Tasks

> Referência: [Relatório de Análise](../walkthrough.md) · Fase docs em `/docs/phases/`

---

## Fase 1 — Error Classification & Provider Profiles

### Backend Core

- [ ] `constants.js` — Substituir `COOLDOWN_MS.transient` por `transientInitial` (5s) + `transientMax` (60s)
- [ ] `constants.js` — Adicionar `PROVIDER_PROFILES` (oauth / apikey) com cooldowns diferenciados
- [ ] `constants.js` — Adicionar `DEFAULT_API_LIMITS` (100 RPM, 200ms minTime)
- [ ] `providerRegistry.js` — Criar helper `getProviderCategory(providerId)` → `"oauth"` | `"apikey"`
- [ ] `accountFallback.js` — Aceitar `provider` como parâmetro em `checkFallbackError`
- [ ] `accountFallback.js` — Implementar backoff exponencial para 502/503/504 transientes
- [ ] `accountFallback.js` — Calcular cooldown baseado no perfil do provedor
- [ ] `accountFallback.js` — Adicionar helper `getProviderProfile(provider)`

### Callers (propagar `provider`)

- [ ] `auth.js` → `markAccountUnavailable` — Passar `provider` para `checkFallbackError`
- [ ] `combo.js` → `handleComboChat` / `handleRoundRobinCombo` — Passar `provider` nos erros

### Testes

- [ ] Atualizar `rate-limit-enhanced.test.mjs` — Teste "transient errors don't increase backoff" → `newBackoffLevel = 1`
- [ ] Criar `error-classification.test.mjs` — Cooldown exponencial 502, perfis OAuth/API, helper `getProviderCategory`

---

## Fase 2 — Circuit Breaker no Combo Pipeline

### Backend

- [ ] `combo.js` — Importar `getCircuitBreaker` e `CircuitBreakerOpenError`
- [ ] `combo.js` — `handleComboChat` — Verificar `breaker.canExecute()` antes de cada modelo
- [ ] `combo.js` — `handleRoundRobinCombo` — Integrar breaker per-model
- [ ] `combo.js` — Marcar `semaphore.markRateLimited` para 502/503/504 (não só 429)
- [ ] `combo.js` — Implementar early exit quando todos os modelos têm breaker OPEN

### Testes

- [ ] Criar `combo-circuit-breaker.test.mjs` — Combo skip breaker OPEN, early exit, semáforo 502

---

## Fase 3 — Anti-Thundering Herd & Auto Rate Limit

### Backend

- [ ] `rateLimitManager.js` — Auto-enable para `apikey` providers com limites elevados
- [ ] `rateLimitManager.js` — Criar limiter com defaults (100 RPM) quando não configurado
- [ ] `auth.js` — Adicionar mutex na `markAccountUnavailable` para evitar marcação paralela

### Testes

- [ ] Criar `thundering-herd.test.mjs` — Mutex, auto-enable, limites não restritivos

---

## Fase 4 — Frontend Resilience UI

### Settings Page

- [ ] `settings/page.tsx` — Adicionar tab "Resilience" (icon: `health_and_safety`) entre Routing e Pricing

### Novos Componentes

- [ ] Criar `ResilienceTab.tsx` — Layout com 3 cards
- [ ] Criar `ProviderProfilesCard.tsx` — Toggle OAuth/API Key, inputs para cooldowns
- [ ] Criar `CircuitBreakerCard.tsx` — Status real-time per-provider, auto-refresh 5s, botão reset
- [ ] Criar `RateLimitOverviewCard.tsx` — Tabela providers × accounts × cooldown

### API Routes

- [ ] Criar `api/resilience/route.ts` — GET (estado completo) + PATCH (salvar perfis)
- [ ] Criar `api/resilience/reset/route.ts` — POST (resetar breakers + cooldowns)

### Migração

- [ ] Avaliar se `PoliciesPanel.tsx` pode ser removido ou simplificado após nova aba

---

## Verificação Final

- [ ] Rodar todos os testes unitários: `node --test tests/unit/*.test.mjs`
- [ ] Build do Next.js: `npm run build`
- [ ] Verificar aba Resilience no browser
- [ ] Testar persistência dos perfis (salvar → reload)
- [ ] Testar Reset All Breakers
