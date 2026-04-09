# TASK T7 — Testes Unitários e de Integração

## Instruções obrigatórias antes de iniciar

**LEIA ANTES DE EXECUTAR:**
1. Ler `/home/diegosouzapw/dev/proxys/9router/_tasks/new-combo/PLAN.md`
2. Confirmar que T1-T6 estão concluídas
3. Ler `tests/unit/plan3-p0.test.mjs` (31 testes existentes) para entender o padrão de teste do projeto:
   - Usa Node.js native test runner (`node:test`)
   - Usa `assert` nativo
   - Imports via `tsx/esm`
   - Mocks de módulos via `mock.module()` ou manual overrides
4. Ler `tests/unit/fixes-p1.test.mjs` para ver padrões de mock de fetch e DB

## Objetivo

Criar dois arquivos de teste cobrindo os módulos novos.

---

## Arquivo 1: `tests/unit/context-handoff.test.mjs`

### Testes do `contextHandoff.ts`

#### Suite: `buildHandoffSystemMessage`

```javascript
// T1: Formata handoff com todos os campos
test("builds valid system message with summary and decisions", () => {
  const payload = {
    summary: "Working on quota routing system",
    keyDecisions: ["use 95% threshold", "5h window priority"],
    taskProgress: "70% complete — need to integrate in combo loop",
    activeEntities: ["combo.ts", "codexQuotaFetcher.ts"],
    messageCount: 42,
    fromAccount: "ab12cd34",
    generatedAt: "2026-04-05T21:00:00Z",
    expiresAt: "2026-04-06T02:00:00Z",
  };
  const msg = buildHandoffSystemMessage(payload);
  assert.ok(msg.includes("<context_handoff>"));
  assert.ok(msg.includes(payload.summary));
  assert.ok(msg.includes("combo.ts"));
  assert.ok(msg.includes("42"));
});

// T2: Trata arrays vazios sem quebrar
test("handles empty arrays gracefully", () => {
  const payload = { ...basePayload, keyDecisions: [], activeEntities: [] };
  const msg = buildHandoffSystemMessage(payload);
  assert.ok(typeof msg === "string");
  assert.ok(msg.length > 0);
});
```

#### Suite: `injectHandoffIntoBody`

```javascript
// T3: Injeta como primeira mensagem
test("prepends handoff as first system message", () => {
  const body = { messages: [{ role: "user", content: "Hello" }] };
  const result = injectHandoffIntoBody(body, mockPayload);
  assert.equal(result.messages[0].role, "system");
  assert.ok(result.messages[0].content.includes("<context_handoff>"));
  assert.equal(result.messages[1], body.messages[0]);
});

// T4: Preserva system message existente (handoff vem antes)
test("preserves existing system messages after handoff injection", () => {
  const body = {
    messages: [
      { role: "system", content: "Original system prompt" },
      { role: "user", content: "Hello" }
    ]
  };
  const result = injectHandoffIntoBody(body, mockPayload);
  assert.equal(result.messages.length, 3);
  assert.ok(result.messages[0].content.includes("<context_handoff>"));
  assert.equal(result.messages[1].content, "Original system prompt");
});

// T5: Não muta o body original
test("does not mutate original body", () => {
  const body = { messages: [{ role: "user", content: "Hello" }] };
  const originalLength = body.messages.length;
  injectHandoffIntoBody(body, mockPayload);
  assert.equal(body.messages.length, originalLength);
});
```

#### Suite: `parseHandoffJSON` (função interna — testar via export se necessário)

```javascript
// T6: Parseia JSON válido
test("parses valid JSON response from LLM", () => { ... });

// T7: Extrai JSON de markdown code fence
test("extracts JSON from markdown ```json ... ``` block", () => {
  const content = '```json\n{"summary":"test","keyDecisions":[],"taskProgress":"","activeEntities":[]}\n```';
  // Chamar via generateHandoffAsync com mock, ou exportar para teste
});

// T8: Retorna null para JSON inválido (não throw)
test("returns null for invalid JSON without throwing", () => { ... });

// T9: Trunca summary longo
test("truncates summary exceeding 2000 chars", () => { ... });
```

#### Suite: `maybeGenerateHandoff`

```javascript
// T10: Não dispara abaixo do threshold
test("does not trigger below WARNING_THRESHOLD", async () => {
  let called = false;
  const mockHandleSingleModel = async () => { called = true; };
  maybeGenerateHandoff({
    sessionId: "test",
    comboName: "test-combo",
    connectionId: "conn-001",
    percentUsed: 0.84, // < 0.85
    messages: [],
    model: "codex/gpt-5.3-codex",
    expiresAt: null,
    handleSingleModel: mockHandleSingleModel,
  });
  await new Promise(r => setImmediate(r));
  assert.equal(called, false);
});

// T11: Dispara acima do threshold (mock setImmediate)
test("triggers handoff generation at WARNING_THRESHOLD", async () => { ... });

// T12: Não dispara se handoff já existe (mock hasActiveHandoff)
test("skips if active handoff already exists for session", async () => { ... });

// T13: Não dispara acima de EXHAUSTION_THRESHOLD (conta já vai ser trocada)
test("does not trigger at or above EXHAUSTION_THRESHOLD", async () => { ... });
```

---

## Arquivo 2: `tests/unit/combo-context-relay.test.mjs`

### Testes do fluxo `context-relay` em `combo.ts`

#### Suite: `handleContextRelayCombo — basic routing`

```javascript
// T1: Roteia para primeiro modelo disponível
test("routes to first available model in pool", async () => { ... });

// T2: Pula modelo com circuit breaker OPEN
test("skips model with OPEN circuit breaker", async () => { ... });

// T3: Pula modelo quando isModelAvailable retorna false (quota 95%)
test("skips model when isModelAvailable returns false", async () => { ... });
```

#### Suite: `handleContextRelayCombo — handoff injection`

```javascript
// T4: Injeta handoff quando há troca de conta e handoff existe
test("injects handoff payload when switching to fallback account", async () => {
  // Mock getHandoff retornando payload válido
  // Mock handleSingleModel capturando body
  // Verificar que messages[0] contém <context_handoff>
});

// T5: Não injeta handoff para primeira conta (i === 0)
test("does not inject handoff for primary account (no switch)", async () => {
  // Verificar que messages não contém <context_handoff>
});

// T6: Não injeta se não há handoff ativo
test("does not inject if no active handoff for session", async () => {
  // Mock getHandoff retornando null
});

// T7: Deleta handoff após injeção
test("deletes handoff after injection to prevent re-injection", async () => {
  // Mock deleteHandoff e verificar que foi chamado
});
```

#### Suite: `handleContextRelayCombo — handoff generation`

```javascript
// T8: Dispara geração de handoff a 85% via maybeGenerateHandoff
test("triggers maybeGenerateHandoff when quota >= 85%", async () => {
  // Mock fetchCodexQuota retornando percentUsed = 0.87
  // Mock maybeGenerateHandoff e verificar que foi chamado
});

// T9: Não dispara se abaixo do threshold
test("does not trigger handoff generation below 85%", async () => { ... });
```

---

## Como Executar os Testes

```bash
# Arquivo 1
node --import tsx/esm --test tests/unit/context-handoff.test.mjs

# Arquivo 2
node --import tsx/esm --test tests/unit/combo-context-relay.test.mjs

# Todos os testes unitários
node --import tsx/esm --test tests/unit/plan3-p0.test.mjs tests/unit/fixes-p1.test.mjs tests/unit/context-handoff.test.mjs tests/unit/combo-context-relay.test.mjs
```

## Meta de Cobertura

- `contextHandoff.ts`: ≥ 85% (funções públicas)
- Lógica crítica do `context-relay` em `combo.ts`: ≥ 75%
- `contextHandoffs.ts` (DB): ≥ 70% (coberto por integration tests)

## Status

- [ ] `tests/unit/context-handoff.test.mjs` criado (min 13 testes)
- [ ] `tests/unit/combo-context-relay.test.mjs` criado (min 9 testes)
- [ ] Todos os testes novos passando
- [ ] Todos os testes existentes ainda passando (31/31 + novos)
- [ ] Cobertura ≥ targets definidos
