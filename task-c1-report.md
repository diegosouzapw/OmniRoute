# Task C1 — History hidrata `memoryHits` (PR-C, Refs #12639)

**Commit:** `da8014442debd2eca7a326472ab704aa86aefba1`
**Branch:** `feat/orch-fase3-c` · 2 arquivos, +164/-16

## O que mudou

### `src/app/api/a2a/tasks/[id]/route.ts`

- Novas constantes `MEMORY_HITS_EVENT_TYPE = "memory_hits"` e `MEMORY_HIT_FIELDS = ["id","key","type","snippet"]`, interface `MemoryHit`.
- Nova função `parseMemoryHits(dataJson)`: `safeJsonParse` (try/catch já existente) → `Array.isArray` → filtro por item exigindo os 4 campos como `string`. Nunca lança; payload ruim vira lista vazia.
- `reconstituteHistoricalTask`: `listA2ATaskEvents(row.id)` agora é lido uma vez em `eventRows`; os eventos `memory_hits` são extraídos para `memoryHits` e **filtrados fora** de `events`; `metadata` passou de `{}` fixo para `memoryHits.length > 0 ? { memoryHits } : {}`.

### `tests/unit/a2a-history-route.test.ts` (+104 linhas, 365 no total — teto 1200 ok)

7 testes novos:

1. hidrata `metadata.memoryHits` com 2 hits e o evento de memória NÃO aparece em `events` (timeline fica `["submitted","completed"]`).
2. descarta entradas malformadas (`sem snippet`, `key` objeto, `null`, string, número) e mantém só a válida.
   3–7. tabela de payloads ruins (`{not-json`, string JSON pura, objeto JSON, array 100% inválido, array vazio) ⇒ HTTP **200**, `metadata` `{}`, e o evento de memória continua fora da timeline.

## Gates (saída real)

```
$ node --import tsx/esm --test tests/unit/a2a-history-route.test.ts   # ANTES do fix (C1.2)
✔ 10 pré-existentes  ✖ 7 novos   (falha típica: metadata {} esperado ≠ { memoryHits: [...] } / timeline extra 'completed')

$ node --import tsx/esm --test tests/unit/a2a-history-route.test.ts   # DEPOIS (C1.4)
ℹ tests 17
ℹ pass 17
ℹ fail 0

$ node --import tsx/esm --test tests/unit/db-a2a-tasks.test.ts
ℹ tests 7
ℹ pass 7
ℹ fail 0

$ npm run typecheck:core
npm notice run tsc --pretty false -p tsconfig.typecheck-core.json
(sem erros, exit 0)

$ npx eslint 'src/app/api/a2a/tasks/[id]/route.ts' tests/unit/a2a-history-route.test.ts
eslint exit=0

$ git commit  (husky ativo, sem --no-verify)
lint-staged: prettier + eslint --fix  ✔
[docs-sync] PASS
[t11:any-budget] PASS
[tracked-artifacts] OK
```

## Divergências entre plano e código real

Nenhuma divergência material. Confirmado no código:

- `event_type` exato = `"memory_hits"` (`src/lib/a2a/taskExecution.ts:143`, `appendA2ATaskEvent(task.id, "memory_hits", JSON.stringify(hits))`).
- Shape de `listA2ATaskEvents` = `{ event_type, data_json, created_at }` (`src/lib/db/a2aTasks.ts`, `A2ATaskHistoryEventRow`) — sem `id` exposto, ordenação `ORDER BY id ASC`.
- `STATE_EVENT_PREFIX = "state:"` continua governando só os eventos de transição; o `memory_hits` caía no `else` e herdava `row.state`, o que o fazia aparecer como uma transição duplicada na timeline — daí o filtro ser obrigatório, não cosmético.

Observações (não são divergência):

- A validação implementada é espelho exata da que já existe no drawer (`DrawerMemory` / `MEMORY_HIT_FIELDS` em `OrchestrationDrawer.tsx:275`), incluindo o motivo dos 4 campos: `type`/`key`/`snippet` são renderizados como React children.
- Zod não foi usado: esta rota não valida body (é GET sem query schema) e a leitura é de JSON persistido, coberto pelo `safeJsonParse` já existente no arquivo. Hard Rule #12 intocada — o catch da rota continua usando `sanitizeErrorMessage`.
- Hard Rule #5 respeitada: nenhum SQL na rota; tudo por `src/lib/db/a2aTasks.ts`.

## Trabalho paralelo

`src/lib/a2a/taskExecution.ts` e `tests/unit/a2a-memory-hits.test.ts` (Task C2) aparecem como `M` no `git status` — **não foram tocados nem adicionados** por esta task. O commit contém exclusivamente os 2 arquivos da C1.
