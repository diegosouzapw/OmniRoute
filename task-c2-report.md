# Task C2 — timeout no recall de memória (PR-C, Fase 3, Refs #12639)

Commit: `3ef0aef15be50bf458d3f54078e4c0107533f4b2` — `fix(a2a): bound the memory recall with its own deadline`
Branch: `feat/orch-fase3-c`. Arquivos commitados (só estes dois):

- `src/lib/a2a/taskExecution.ts`
- `tests/unit/a2a-memory-hits.test.ts`

## O que mudou

`src/lib/a2a/taskExecution.ts`:

- `export const MEMORY_RECALL_TIMEOUT_MS = 1500;`
- `MemoryHitsDeps` ganhou `timeoutMs?: number` (default `MEMORY_RECALL_TIMEOUT_MS`).
- `class MemoryRecallTimeoutError extends Error` (marcador interno, não exportado) só para o
  `catch` distinguir deadline de erro de backend.
- `collectMemoryHits` roda `Promise.race([search(...), deadline])`; estouro ⇒ `log.warn` +
  `[]`. O contrato best-effort é idêntico ao de hoje: nada propaga, a task segue.
- `finally { if (timer) clearTimeout(timer); }` — limpo nos DOIS caminhos.
- `logger("A2A_TASKS")` importado de `@omniroute/open-sse/utils/logger` (mesmo canal já usado
  por `src/lib/a2a/taskManager.ts`). O log não contém `err.message`/`err.stack` — só o id da
  task e o deadline (Hard Rule #12; nada disso vai para resposta nenhuma).

`tests/unit/a2a-memory-hits.test.ts` (+5 testes, node:test, sem SQLite/deps reais):

1. `MEMORY_RECALL_TIMEOUT_MS` é 1500.
2. `search` que nunca resolve ⇒ `[]` (com asserção de que voltou em <1s, provando que o
   deadline injetado é o que valeu).
3. `search` que resolve dentro do prazo ⇒ hits normais.
4. Nenhum timer fica pendurado nos dois caminhos.
5. `executeA2ATaskWithState` completa a task normalmente quando o recall estoura.

## Por que o teste é rápido

Deadline injetável via `MemoryHitsDeps.timeoutMs` (o arquivo de teste já é 100% construído
sobre esse DI seam — `search`/`appendEvent` fakes, zero fake timers, zero mock de módulo), então
o caminho de timeout usa `timeoutMs: 5`. Suíte inteira em ~0,9 s de relógio.

## Decisão de projeto que mudei no meio (importante)

A primeira implementação tinha `timer.unref?.()` além do `clearTimeout`. Mutation-check
(remover o `clearTimeout` e rodar) mostrou que **o teste do timer pendurado passava mesmo
assim**: `process.getActiveResourcesInfo()` não reporta timer `unref`ado, ou seja o `unref`
mascarava exatamente o defeito que o teste existe para pegar. Tirei o `unref` — a garantia
real é o `clearTimeout` no `finally` — e refiz o mutation-check:

```
--- MUTATED (clearTimeout removed) ---
✖ collectMemoryHits leaves no pending timer behind on either path (20.667659ms)
ℹ pass 15
ℹ fail 1
--- RESTORED ---
✔ collectMemoryHits leaves no pending timer behind on either path (9.073282ms)
ℹ pass 16
ℹ fail 0
```

## Gates (saída real)

C2.2 — vermelho antes da implementação:

```
SyntaxError: The requested module '../../src/lib/a2a/taskExecution.ts' does not provide an
export named 'MEMORY_RECALL_TIMEOUT_MS'
ℹ pass 0
ℹ fail 1
```

C2.4 — `node --import tsx/esm --test tests/unit/a2a-memory-hits.test.ts`:

```
ℹ tests 16
ℹ pass 16
ℹ fail 0
```

Todas as suítes a2a (`node --import tsx/esm --test $(ls tests/unit/*a2a*.test.ts)`):

```
ℹ tests 106
ℹ suites 2
ℹ pass 106
ℹ fail 0
ℹ duration_ms 12146.220038
```

`npm run typecheck:core` — sem saída de erro (só as linhas `npm notice`), exit 0.
`npx eslint src/lib/a2a/taskExecution.ts tests/unit/a2a-memory-hits.test.ts` — zero achados.
`npx prettier --write` nos dois arquivos (o de teste foi reformatado; re-rodei a suíte depois:
16/16). Hooks do husky rodaram no commit (`any-budget` PASS, `tracked-artifacts` OK) — sem
`--no-verify`.

## Divergências plano × código

- **Nenhuma no contrato.** `MemoryHit`, `MemoryHitsDeps`, a assinatura de `collectMemoryHits` e
  o kill-switch `OMNIROUTE_A2A_MEMORY_HITS === "0"` estão exatamente como o plano copiou.
- Detalhe não previsto: o plano dizia "estouro ⇒ `[]` + log" sem dizer qual logger. Usei o
  mesmo `logger("A2A_TASKS")` de `taskManager.ts` (o `taskExecution.ts` não tinha logger algum).
- O `unref` sugerido pela minha leitura inicial de "sem handle pendurado segurando o processo do
  runner" foi descartado por mascarar o teste (ver acima); o requisito continua atendido pelo
  `clearTimeout` no `finally`, agora com asserção que tem dentes.
- Trabalho paralelo (C1): `git status` mostrava apenas `task-c1-report.md` untracked; não toquei
  nele nem em `src/app/api/a2a/tasks/[id]/route.ts` / `tests/unit/a2a-history-route.test.ts`.
  `git add` foi feito nomeando só os meus dois arquivos.
