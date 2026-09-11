# Task C3 — `requirements` no repeat do Conductor + foco na task nova + teste de auth

Branch `feat/orch-fase3-c` · commit **`a7d430fe9ee3ae1fd1d86ff0083318fc1e96005b`**
(`fix(dashboard): carry conductor requirements and focus the repeated task`, corpo com `Refs #12639`).

## O que mudou, por item

### 1. `src/lib/conductor/hubProxy.ts` — `requirements` no schema de detalhe

- `hubTaskSchema` ganhou
  `requirements: z.object({ cli: z.string().nullish(), model: z.string().nullish() }).nullish().catch(null)`.
  O `.catch(null)` é deliberado: o MESMO schema parseia a **lista** em `getFleetSnapshot`
  (`z.array(hubTaskSchema).parse(rawTasks)`) — sem ele, um `requirements` de formato inesperado
  numa única task faria o `parse` inteiro lançar e o snapshot cair para `{offline: true}`.
- `ConductorTaskDetail` ganhou `cli: string | null` e `model: string | null` (com JSDoc);
  `getConductorTaskDetail` preenche com `t.requirements?.cli ?? null` / `?? null`.
- Origem do shape: é exatamente o objeto que `createConductorTask` (mesmo arquivo, linhas ~238-241)
  envia para o hub (`body.requirements = { cli?, model? }`) — não foi inventado.

### 2. `drawer/useDrawerDetail.ts`

- `repeatReqForConductor` agora envia `cli: d.cli ?? undefined` / `model: d.model ?? undefined`.
  **`undefined`, nunca `null`** — o Zod real da rota (`src/app/api/conductor/tasks/route.ts`) tem
  `cli: z.string().optional()` / `model: z.string().optional()`, e `null` daria 400. `JSON.stringify`
  descarta as chaves `undefined`, então o corpo sai idêntico ao de hoje quando não há requirement.
  Os dois campos são independentes (um pode existir sem o outro) — há teste para esse caso.
- `jsonRpcErrorCode` deixou de ler `res.json()` e passou a receber o **corpo já parseado**; novo
  `readJsonBody(res)` lê o corpo UMA vez (um body só pode ser consumido uma vez, e agora o id da
  task nova sai do mesmo corpo). Body não-JSON/vazio ⇒ `null`, sem virar falha (mantém o contrato
  anterior: "corpo ilegível não é evidência de falha, o status já valeu").
- `performAction` passou a devolver `{ ok, body }` em vez de `boolean`.
- Novo `export function newNodeIdFrom(node, body): string | null` — extrai o id da task criada e
  devolve **já no formato do canvas** (com prefixo), porque `setParams({ node })` casa contra
  `snapshot.nodes.find(n => n.id === nodeId)` e os ids em `mergeSnapshot.ts` são prefixados:
  - conductor: `body.task_id` → `conductor:task:<id>`
  - cloud-agent: `body.data.id` → `cloud-agent:<id>`
  - a2a: `body.result.task.id` → `a2a:<id>` (envelope real de `/a2a` `message/send` v0.3)
    Leitura defensiva: id ausente/vazio/não-string ⇒ `null` (nunca um prefixo pelado), corpo não-objeto
    ⇒ `null`, nunca lança.
- No hook: `approve`/`cancel` continuam `Promise<boolean>` (via `runBooleanAction`) — de propósito:
  eles agem sobre a task já aberta e a resposta do cloud-agent pode ecoar o id da MESMA task, o que
  faria o painel "navegar" para onde já está. Só `repeat` devolve
  `RepeatOutcome { ok, newNodeId }` (interface exportada).

### 3. `drawer/OrchestrationDrawer.tsx`

- `RepeatButton` consome `RepeatOutcome` e chama `onActionDone(newNodeId ?? undefined)`.
- `onActionDone` virou `(newNodeId?: string) => void` no `RepeatButton`, `DrawerActions` e no
  componente exportado. `DrawerActions.run()` (approve/cancel) segue chamando `onActionDone()` sem
  argumento.

### 4. `OrchestrationPageClient.tsx`

- Novo `onActionDone` memoizado: `refetch()` e, se veio id, `setParams({ node: newNodeId })`.
  A aba History renderiza o próprio drawer (`HistoryTab.tsx`) e **não** foi tocada — seu
  `onActionDone={() => …}` ignora o argumento extra, então o comportamento lá continua idêntico
  (re-amostra `nowMs`, não navega), como o plano pede.

### 5. Testes

- `tests/unit/conductor-routes-auth.test.ts`: `src/app/api/conductor/tasks/route.ts` entrou no array
  `ROUTES`; o regex do proxy ganhou a alternativa `createConductorTask\(`.
- `tests/unit/conductor-create-route.test.ts`: removido o teste de fonte duplicado
  (`route: requireManagementAuth antes de criar a task no hub`), substituído por um comentário
  apontando para o array. `fs`/`path` continuam usados pelo resto do arquivo.
- `tests/unit/ui/orchestrationDrawerRepeat.test.tsx` (786 → 971 linhas, cap 1200 — não precisou
  dividir): 3 describes novos, 6 testes:
  - `repeatReqFor` conductor com `cli`/`model`; com ambos `null` (corpo idêntico ao atual e sem as
    strings `cli`/`model`); com só `cli` setado.
  - `newNodeIdFrom` nas três fontes (prefixado), corpos malformados ⇒ `null`, fonte sem contrato ⇒ `null`.
  - drawer: repeat de conductor faz POST com `cli`/`model` e chama `onActionDone` exatamente uma vez
    com `"conductor:task:t_new"`, com o toast `repeatDone`.

## TDD — evidência

**C3.2 (vermelho)** `npx vitest run tests/unit/ui/orchestrationDrawerRepeat.test.tsx`:

```
 Test Files  1 failed (1)
      Tests  6 failed | 29 passed (35)
```

(falhas: `newNodeIdFrom is not a function` ×3, corpo sem `cli`/`model` ×3 — a última:
`expected { …(4) } to match object { cli: 'claude', model: 'sonnet' }`)

`node --import tsx/esm --test tests/unit/conductor-routes-auth.test.ts tests/unit/conductor-create-route.test.ts` já passou nesse ponto
(`ℹ pass 11 / fail 0`) — **divergência menor com o plano**: a mudança do array `ROUTES` é ampliação
de cobertura + de-duplicação, não a prova de um defeito, então ela não tinha como "falhar antes".
A rota já chamava `requireManagementAuth` corretamente.

**C3.4 (verde)**:

```
$ npx vitest run tests/unit/ui/orchestrationDrawerRepeat.test.tsx
 Test Files  1 passed (1)
      Tests  35 passed (35)

$ node --import tsx/esm --test tests/unit/conductor-routes-auth.test.ts tests/unit/conductor-create-route.test.ts tests/unit/client-bundle-no-server-only-10692.test.ts
✔ src/app/api/conductor/tasks/route.ts: requireManagementAuth antes do proxy ao hub (4.175999ms)
ℹ tests 12
ℹ pass 12
ℹ fail 0

$ npx vitest run tests/unit/ui/
 Test Files  210 passed (210)
      Tests  1200 passed (1200)
   Duration  179.85s

$ node --import tsx/esm --test tests/unit/conductor-hub-proxy.test.ts tests/unit/conductor-fleet-mirror.test.ts tests/unit/conductor-fleet-route.test.ts tests/unit/conductor-delegate.test.ts
ℹ tests 17
ℹ pass 17
ℹ fail 0
```

## Gates

```
$ npm run typecheck:core
EXIT=0   (sem saída de erro)

$ npm run check:dashboard-typecheck
[dashboard-typecheck] OK — 206 pre-existing error(s), all within frozen baseline.
EXIT=0

$ npx eslint <os 7 arquivos alterados>
EXIT=0   (zero erros, zero warnings)

$ npm run check:file-size
[file-size] OK — 136 arquivos congelados, cap 1200 para novos (4588 arquivos verificados)
[test-file-size] OK — 40 test files congelados, testCap 1200 para novos (5495 test files verificados)
```

Hooks do husky rodaram no commit (lint-staged + docs-sync + any-budget + tracked-artifacts, todos PASS);
nada de `--no-verify`.

## Divergências entre plano e código real

1. **`newNodeIdFrom` prefixado (não previsto explicitamente no plano).** O plano diz "extrair o id da
   task nova (`task_id` no Conductor, `data.id` no Cloud Agent) e chamar `onActionDone` com ele". O id
   CRU não serve para `setParams({ node })`: o canvas indexa por id prefixado
   (`conductor:task:<id>`, `cloud-agent:<id>`, `a2a:<id>` — `mergeSnapshot.ts` / `routeFor`). Segui o
   código: `newNodeIdFrom` já devolve o id de canvas. O plano não citava o a2a; incluí porque o
   `repeat` do drawer também atende a2a e o envelope (`result.task.id`) é verificável em
   `src/app/a2a/route.ts:250`.
2. **`performAction` "devolve o corpo parseado" — só o `repeat` propaga o id.** `approve`/`cancel`
   ficaram `Promise<boolean>` de propósito (ver item 2 acima): o POST de approve/cancel do cloud-agent
   pode devolver o id da MESMA task, e navegar para ela seria ruído. Cumprimento do espírito do plano
   ("o drawer extrai o id da task nova") sem o efeito colateral.
3. **`.catch(null)` no `requirements`.** O plano não pedia; adicionei porque `hubTaskSchema` também
   parseia a LISTA de tasks, e um campo novo estrito ali seria um vetor de "snapshot vira offline por
   causa de um campo estranho de uma task".
4. **A mudança em `conductor-routes-auth.test.ts` não é um teste que falha antes** (explicado acima).
5. `ConductorTaskDetail` estende `FleetTask`; `cli`/`model` foram adicionados só no detalhe (não em
   `FleetTask`/`toFleetTask`), porque o repeat lê o DETALHE carregado, não o nó.

## Fora de escopo (não feito, é da Task C4)

`changelog.d/fixes/orchestration-followups.md`, o comentário na issue #12639 e a bateria completa
(lint total, test:vitest, check:cycles, i18n) continuam pendentes na C4.
