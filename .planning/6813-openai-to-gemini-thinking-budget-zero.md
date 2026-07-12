# SPEC: Fix OpenAI→Gemini thinking budget zero drop and default thinkingConfig injection

## Contexto

Issue #6813 reporta dois defeitos no transformador OpenAI→Gemini (open-sse/translator/request/openai-to-gemini.ts):

1. **Defeito A:** `budget_tokens: 0` é dropado porque a presença é verificada com truthy (`if (thinking?.type === "enabled" && thinking.budget_tokens)`), então 0 é tratado como ausente e cai no default abaixo.
2. **Defeito B:** Quando a request não carrega `reasoning_effort` nem `thinking`, um `thinkingConfig` default é injetado incondicionalmente para todos os modelos Gemini, forçando thinking-by-default com custo e latência reais. Não há como desativar exceto com o segredo `budget_tokens: 1`.

**Impacto:** Usuários pagam por tokens de reasoning que não pediram, latência 7x maior que o modelo realmente é, e a única "chave de desligar" é o acidente `budget_tokens: 1`.

## Requisitos Funcionais

### RF-01: Fix truthy check para budget_tokens zero

- **User Story:** Como usuário do gateway OmniRoute, quero passar `{"model":"gemini/gemini-2.5-flash","thinking":{"type":"enabled","budget_tokens":0}}` e receber 0 tokens de thinking, para evitar cobrança indevida e latência desnecessária.
- **Critérios de Aceite (EARS):**
  - WHEN request OpenAI Chat Completions contém `thinking.budget_tokens: 0` THEN o transformador deve repassar `generationConfig.thinkingConfig.thinkingBudget: 0` para o provedor Gemini
  - WHEN request contém `thinking.budget_tokens: 1` THEN o transformador deve repassar `thinkingBudget: 1`
  - WHEN request contém `thinking.budget_tokens: null` THEN o transformador deve NÃO injetar thinkingConfig (deixar o provedor usar default dele)

### RF-02: Parar injeção default de thinkingConfig

- **User Story:** Como usuário do gateway OmniRoute, quero fazer uma request simples `{"model":"gemini/gemini-2.5-flash","messages":[...]}` sem nenhum knob de thinking e receber resposta sem thinking forçado, para evitar cobrança indevida e latência.
- **Critérios de Aceite (EARS):**
  - WHEN request OpenAI Chat Completions NÃO contém `reasoning_effort` nem `thinking` THEN o transformador deve NÃO injetar `generationConfig.thinkingConfig`
  - WHEN request contém `reasoning_effort: "none"` THEN o transformador deve repassar `generationConfig.thinkingConfig.thinkingBudget: 0`
  - WHEN request contém `reasoning_effort: "low"` THEN o transformador deve repassar `thinkingBudget` correspondente ao nível

### RF-03: Mapeamento correto de reasoning_effort para thinkingBudget

- **User Story:** Como usuário, quero usar os níveis padrão de reasoning (`none`, `low`, `medium`, `high`) e receber budgets que correspondam aos níveis do provedor Gemini, para controle previsível de custo/latência.
- **Critérios de Aceite (EARS):**
  - WHEN request contém `reasoning_effort: "none"` THEN `thinkingBudget: 0`
  - WHEN request contém `reasoning_effort: "low"` THEN `thinkingBudget: 1024`
  - WHEN request contém `reasoning_effort: "medium"` THEN `thinkingBudget: 10240`
  - WHEN request contém `reasoning_effort: "high"` THEN `thinkingBudget: 24576`

## Requisitos Não-Funcionais

- **Performance:** Nenhum impacto negativo na latência do transformador
- **Segurança:** Nenhuma mudança em segurança ou autenticação
- **Compatibilidade:** Manter retrocompatibilidade com requests existentes que já usavam `budget_tokens: 1` ou `reasoning_effort`
- **Testes:** Adicionar testes unitários cobrindo os novos casos (budget 0, ausência de knobs, níveis de effort)

## Fora de Escopo

- Mudanças em outros transformadores (Claude→OpenAI, etc)
- Mudanças no provedor Gemini em si
- Mudanças na política de rate limit ou caching
- Refatoração de código não relacionado ao bloco de thinking

## Dependências

- Arquivo: `open-sse/translator/request/openai-to-gemini.ts`
- Teste: `tests/unit/translator/openai-to-gemini.test.ts` (existente)
- Modelo de teste: Jest + Vitest (padrão do repo)

## Estado Atual (Baseline Audit)

### Arquivos afetados:

- `open-sse/translator/request/openai-to-gemini.ts` (linhas 200-220): lógica de injeção de thinkingConfig

### Código atual problemático:

```typescript
// Defeito A: truthy check dropa zero
if (thinking?.type === "enabled" && thinking.budget_tokens) {
  result.generationConfig.thinkingConfig = {
    thinkingBudget: thinking.budget_tokens, // budget_tokens=0 cai aqui
    includeThoughts: true,
  };
}

// Defeito B: injeção default incondicional
const budget =
  budgetMap[body.reasoning_effort as string] ?? getDefaultThinkingBudget(model) ?? 8192;
result.generationConfig.thinkingConfig = {
  thinkingBudget: budget,
  includeThoughts: true,
};
```

### Comportamento atual vs esperado:

| Input                       | Comportamento Atual              | Comportamento Esperado      |
| --------------------------- | -------------------------------- | --------------------------- |
| `thinking.budget_tokens: 0` | thinkingBudget=8192 (default)    | thinkingBudget=0            |
| `thinking.budget_tokens: 1` | thinkingBudget=1                 | thinkingBudget=1            |
| Sem knobs                   | thinkingConfig injetado com 8192 | thinkingConfig NÃO injetado |
| `reasoning_effort: "none"`  | thinkingBudget=8192              | thinkingBudget=0            |

## Arquitetura Esperada

### Estrutura de arquivos:

```
open-sse/translator/request/openai-to-gemini.ts
  - Função: `openaiToGeminiRequest(body: OpenAIChatRequest)`
  - Retorna: `GeminiGenerateContentRequest`

tests/unit/translator/openai-to-gemini.test.ts
  - Testes: `describe("thinking budget handling")`
  - Coverage: 100% das branches novas
```

### Convenções a manter:

- Usar TypeScript strict
- Manter assinatura da função existente
- Não quebrar compatibilidade com requests existentes
- Seguir padrão de logging do repo (`logger.debug(...)`)

---

**RF-ID:** 6813-F1
**Origem:** Issue #6813
**Versão:** 1.0
**Data:** 2026-07-12
**Autor:** Hermes Agent (SquadOps)
