# Plano de Implementação — Sync com Upstream `decolua/9router`

**Data:** 2026-03-28  
**Autor:** Antigravity (análise automatizada)  
**Origem:** Análise cruzada de Issues e PRs abertos em `decolua/9router` + pesquisa web  
**Repositório alvo:** `diegosouzapw/OmniRoute`

---

## Resumo Executivo

Este plano detalha **7 tarefas** identificadas a partir da varredura do repositório upstream (`decolua/9router`), pesquisa na web e análise do codebase local. Cada tarefa tem um arquivo dedicado em `docs/task-plan-upstream-sync/tasks/` que deve ser **lido integralmente** antes de iniciar o desenvolvimento.

---

## Tarefas por Prioridade

### 🔴 CRÍTICAS (Afetam estabilidade e funcionalidade imediata)

| # | Tarefa | Arquivo | Origem | Impacto |
|---|--------|---------|--------|---------|
| 1 | Migrar URL do provider Qwen para DashScope | `tasks/TASK-01-qwen-dashscope-migration.md` | Issue upstream #239 | Proxy Qwen quebrado — URL retorna 404 |
| 2 | Adicionar modelo `gemini-3.1-pro-preview` ao catálogo estático | `tasks/TASK-02-gemini-31-model-catalog.md` | Issue upstream #234, pesquisa web | STATIC_MODEL_PROVIDERS desatualizado para Gemini CLI |
| 3 | Coerção de tipos em JSON Schema de tools (string→integer) | `tasks/TASK-03-tool-schema-coercion.md` | PR upstream #422 | Ferramentas falham com erro 400 em Claude/OpenAI |

### 🟡 IMPORTANTES (Melhorias de robustez e performance)

| # | Tarefa | Arquivo | Origem | Impacto |
|---|--------|---------|--------|---------|
| 4 | Coerção de `tool.description` para string | `tasks/TASK-04-tool-description-coercion.md` | PR upstream #421 | Tool call falha se description é null/number |
| 5 | Truncamento de histórico de usage a 10k requests | `tasks/TASK-05-usage-history-cap.md` | PR upstream #424 | DB infla sem limite, degrada I/O |
| 6 | Injetar `reasoning_content` no histórico de tool-calls (DeepSeek R1) | `tasks/TASK-06-deepseek-reasoning-toolcall.md` | PR upstream #404 | Perda de raciocínio ao fazer tool calls com DeepSeek |

### 🟢 DESEJÁVEIS (Novos clientes/integrações)

| # | Tarefa | Arquivo | Origem | Impacto |
|---|--------|---------|--------|---------|
| 7 | Adicionar suporte ao Windsurf IDE como CLI tool | `tasks/TASK-07-windsurf-ide-support.md` | PR upstream #407 | Novo IDE suportado |

---

## Fluxo de Execução

```
Para cada tarefa (na ordem acima):
  1. Ler o arquivo da tarefa COMPLETO
  2. Criar branch: git checkout -b feat/task-XX-slug
  3. Implementar conforme descrito
  4. Rodar testes: npm run test:unit
  5. Commit: git commit -m "fix/feat: <descrição> (upstream #NNN)"
  6. Push + PR para main
  7. Merge após aprovação
```

---

## Arquivos Relevantes do Codebase (referência rápida)

| Módulo | Caminho |
|--------|---------|
| Provider Registry | `open-sse/config/providerRegistry.ts` |
| Models API (import button) | `src/app/api/providers/[id]/models/route.ts` |
| Provider Test Route | `src/app/api/providers/[id]/test/route.ts` |
| CLI Tools Constants | `src/shared/constants/cliTools.ts` |
| Model Specs | `src/shared/constants/modelSpecs.ts` |
| Pricing | `src/shared/constants/pricing.ts` |
| Translator (request) | `open-sse/translator/request/` |
| Translator (response) | `open-sse/translator/response/` |
| Stream utils | `open-sse/utils/stream.ts` |
| Usage DB | `src/lib/usageDb.ts` |
| SSE Parser | `open-sse/handlers/sseParser.ts` |
| Response Sanitizer | `open-sse/handlers/responseSanitizer.ts` |

---

## Notas

- Tarefas 1 e 2 são **hot fixes** que podem ir na mesma branch se necessário
- Tarefas 3 e 4 são defensivas: previnem crashes em cenários edge-case de tool calling
- Tarefa 5 é preventiva: sem ela, após ~50k requests o SQLite pode degradar
- Tarefa 6 beneficia exclusivamente usuários de DeepSeek R1 em fluxos agênticos
- Tarefa 7 é incremental e não afeta funcionalidade existente
