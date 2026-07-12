# PLAN: Fix OpenAI→Gemini thinking budget zero drop and default thinkingConfig injection

## Baseline

- Arquivo: `open-sse/translator/request/openai-to-gemini.ts`
- Teste: `tests/unit/translator/openai-to-gemini.test.ts`
- Cobertura atual: ~85% (precisa subir para 100% nas novas branches)
- PR alvo: #6813

## Tasks (bite-sized, TDD-first)

### TASK-01: Analisar código atual e criar testes de repro (RED phase)

- **Arquivos:**
  - Criar `tests/unit/translator/openai-to-gemini.test.ts` (se não existir)
  - Adicionar testes para os defeitos reportados
- **Código:**
  ```typescript
  describe("thinking budget handling", () => {
    it("should pass budget_tokens: 0 without dropping to default", () => {
      // TODO: implementar
    });
    it("should not inject thinkingConfig when no knobs present", () => {
      // TODO: implementar
    });
  });
  ```
- **Teste:** Rodar `npm run test:vitest` → deve falhar
- **Commit:** `git commit -m "test(6813): add thinking budget zero and no-knobs tests"`
- **Estimativa:** 15 min

### TASK-02: Fix Defeito A — truthy check para budget_tokens zero

- **Arquivo:** `open-sse/translator/request/openai-to-gemini.ts` (linhas ~215-220)
- **Mudança:**
  ```diff
  - if (thinking?.type === "enabled" && thinking.budget_tokens) {
  + if (thinking?.type === "enabled" && typeof thinking.budget_tokens === "number") {
  ```
- **Teste:** Rodar `npm run test:vitest` → testes devem passar
- **Commit:** `git commit -m "fix(6813): allow budget_tokens: 0 to pass through"`
- **Estimativa:** 10 min

### TASK-03: Fix Defeito B — parar injeção default de thinkingConfig

- **Arquivo:** `open-sse/translator/request/openai-to-gemini.ts` (linhas ~200-212)
- **Mudança:**
  ```diff
  - const budget =
  -   budgetMap[body.reasoning_effort as string] ?? getDefaultThinkingBudget(model) ?? 8192;
  - result.generationConfig.thinkingConfig = {
  -   thinkingBudget: budget,
  -   includeThoughts: true,
  - };
  + // Only inject thinkingConfig if reasoning_effort or thinking is present
  + if (body.reasoning_effort !== undefined || body.thinking !== undefined) {
  +   const budget =
  +     body.reasoning_effort && budgetMap[body.reasoning_effort]
  +       ? budgetMap[body.reasoning_effort]
  +       : body.thinking?.type === "enabled" && typeof body.thinking.budget_tokens === "number"
  +         ? body.thinking.budget_tokens
  +         : undefined;
  +   if (budget !== undefined) {
  +     result.generationConfig.thinkingConfig = {
  +       thinkingBudget: budget,
  +       includeThoughts: true,
  +     };
  +   }
  + }
  ```
- **Teste:** Rodar `npm run test:vitest` → testes devem passar
- **Commit:** `git commit -m "fix(6813): stop injecting default thinkingConfig"`
- **Estimativa:** 20 min

### TASK-04: Validar mapeamento de reasoning_effort para thinkingBudget

- **Arquivo:** `open-sse/translator/request/openai-to-gemini.ts` (linhas ~200-210)
- **Mudança:** Garantir que os níveis padrão (`none`, `low`, `medium`, `high`) mapeiam corretamente para budgets 0, 1024, 10240, 24576
- **Teste:** Adicionar testes para cada nível
- **Commit:** `git commit -m "fix(6813): correct reasoning_effort to thinkingBudget mapping"`
- **Estimativa:** 15 min

### TASK-05: Rodar lint e typecheck

- **Comandos:**
  ```bash
  npm run lint
  npm run typecheck:core
  ```
- **Fix:** Corrigir qualquer warning/error
- **Commit:** `git commit -m "chore(6813): lint and typecheck clean"`
- **Estimativa:** 10 min

### TASK-06: Rodar testes unitários completos

- **Comando:** `npm run test:vitest`
- **Verificação:** Todos os testes devem passar, cobertura >= 95% no arquivo
- **Commit:** `git commit -m "test(6813): all tests passing, coverage ok"`
- **Estimativa:** 10 min

### TASK-07: Criar PR e seguir workflow de release

- **Branch:** `git checkout -b fix/6813-thinking-budget-zero`
- **PR:** Criar PR para `main` com título: `fix(6813): fix thinking budget zero drop and default thinkingConfig injection`
- **Descrição:** Referenciar SPEC.md e PLAN.md criados
- **Labels:** `bug`, `6813`, `translator`, `gemini`
- **Checklist:**
  - [ ] SPEC.md aprovado
  - [ ] PLAN.md completo
  - [ ] Código implementado
  - [ ] Testes passando
  - [ ] Lint/typecheck limpos
  - [ ] Cobertura >= 95%
  - [ ] PR description com critérios de aceite
- **Estimativa:** 10 min

## Total Estimado

- **Tempo total:** ~90 minutos (1.5h)
- **Commits:** 7 commits independentes (cada um shippable)
- **PR:** 1 PR com 7 commits + 1 tag

## Definition of Done

- [ ] Todos os testes unitários passam
- [ ] Cobertura >= 95% no arquivo modificado
- [ ] Lint e typecheck limpos
- [ ] PR criado com descrição clara e critérios de aceite
- [ ] SPEC.md e PLAN.md criados e versionados
- [ ] Nenhum defeito regressivo introduzido (rodar `npm run test:all`)

## Critérios de Aceite para Merge

- PR aprovado pelo mantenedor
- CI passa (lint + typecheck + tests)
- Nenhum conflito com `main`
- SPEC.md e PLAN.md atualizados se necessário

---

**RF-ID:** 6813-F1
**Origem:** Issue #6813
**Versão:** 1.0
**Data:** 2026-07-12
**Autor:** Hermes Agent (SquadOps)
