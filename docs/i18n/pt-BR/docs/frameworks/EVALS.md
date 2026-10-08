# Evaluations (Evals) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Fonte da verdade:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui uma estrutura genérica de avaliação que você pode usar para comparar configurações de roteamento, provedores/modelos individuais ou os conjuntos de testes "golden set" incluídos.
Use-a para verificar alterações de roteamento, validar novos provedores e controlar lançamentos antes de promovê-los para o tráfego de produção.

A estrutura é implementada como:

- Um executor puro (`src/lib/evals/evalRunner.ts`) que registra na memória conjuntos de testes integrados, avalia as saídas de acordo com os critérios esperados e agrega os cartões de pontuação.
- Uma camada de persistência (`src/lib/db/evals.ts`) para conjuntos de testes personalizados (definidos pelo usuário) e execuções históricas no SQLite.
- Uma camada de orquestração (`src/lib/evals/runtime.ts`) que executa cada caso enviando chamadas reais para `POST /v1/chat/completions`, captura a latência e as saídas e persiste a execução.
- Endpoints REST em `/api/evals/*` (somente com autenticação de gerenciamento).
- Uma interface no painel em `Dashboard → Uso → Avaliações` (`EvalsTab.tsx`).

## Conceitos

### Conjunto de testes

Um conjunto de testes é uma coleção nomeada de casos de teste com uma `description` e um ou mais casos. Os conjuntos de testes vêm de duas fontes:

| Origem     | Onde é definido                                           | Mutável em tempo de execução? |
| ---------- | --------------------------------------------------------- | ----------------------------- |
| `built-in` | Registrado por meio de `registerSuite()` na inicialização | Não (definido no código)      |
| `custom`   | Armazenado no SQLite em `eval_suites` + `eval_cases`      | Sim (via API/UI)              |

Os conjuntos de testes integrados atuais (consulte `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 casos de referência que abrangem saudações/matemática/tradução/segurança
- `coding-proficiency` — Python/JS/SQL/TS/detecção de bugs
- `reasoning-logic` — silogismos, problemas textuais, reconhecimento de padrões
- `multilingual` — tradução e detecção de idioma
- `safety-guardrails` — PII, jailbreak, recusa, conscientização sobre vieses
- `instruction-following` — somente JSON, listas numeradas, restrições de idioma
- `codex-comparison` — tarefas de programação comparadas diretamente, destinadas ao modo de comparação

### Caso

Cada caso contém:

| Campo      | Descrição                                                         |
| ---------- | ----------------------------------------------------------------- |
| `id`       | Identificador estável (usado como chave para saídas e métricas)   |
| `name`     | Rótulo legível por humanos                                        |
| `model`    | Modelo padrão quando a execução usa o destino `suite-default`     |
| `input`    | `{ messages, max_tokens? }` — enviado para `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — rubrica de pontuação (veja abaixo)        |
| `tags`     | Rótulos opcionais (por exemplo, `safety`, `pii`, `jailbreak`)     |

### Destino

O mesmo conjunto de testes pode ser executado em diferentes destinos. O esquema do destino é `evalTargetSchema` em `src/shared/validation/schemas.ts`:

| Tipo de destino | `id`               | Comportamento                                                                                |
| --------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `suite-default` | `null`             | Cada caso usa seu campo `model` integrado                                                    |
| `model`         | nome do modelo     | Força todos os casos a passar por um único modelo direto (por exemplo, `gpt-4o`)             |
| `combo`         | nome da combinação | Executa todos os casos por meio de uma única combinação (exercita o mecanismo de roteamento) |

Para `model` e `combo`, o campo `id` é obrigatório (imposto pelo `superRefine` do Zod). Quando `compareTarget` é fornecido, os dois destinos devem ser diferentes — o executor persiste ambas as execuções sob o mesmo `runGroupId` para comparação A/B.

## Critérios de pontuação

Implementados em `evaluateCase()` (evalRunner.ts):

| Estratégia | Aprovado quando…                                                             |
| ---------- | ---------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                            |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`          |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` retorna verdadeiro           |
| `custom`   | `expected.fn(actualOutput, evalCase)` retorna verdadeiro (somente integrado) |

**Observação:** A pontuação por função personalizada é reservada para suítes
definidas em código (integradas), pois funções não podem ser serializadas pela
API. O `evalCaseBuilderSchema` aceita apenas `contains | exact | regex` para
suítes criadas pelo usuário.

Atualmente, não há um avaliador baseado em LLM nem um avaliador de similaridade
baseado em embeddings — esse seria um ponto de extensão simples em
`evaluateCase()`.

## Esquema do banco de dados

Três tabelas (migrações `030_create_eval_runs.sql` e
`031_create_eval_suites.sql`):

| Tabela        | Finalidade                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadados de suítes personalizadas (`id`, `name`, `description`)                                                                  |
| `eval_cases`  | Casos por suíte — `input_json`, `expected_*`, `tags_json`                                                                         |
| `eval_runs`   | Execuções históricas — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

As suítes integradas **não** são armazenadas no banco de dados. Elas ficam na
memória e são registradas novamente sempre que `evalRunner.ts` é importado.

## API REST

Todos os endpoints exigem autenticação de gerenciamento
(`requireManagementAuth`) — eles não fazem parte da superfície pública do
proxy.

| Endpoint                      | Método   | Descrição                                                                   |
| ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Lista suítes + execuções recentes + placar + destinos + chaves              |
| `/api/evals`                  | `POST`   | Executa uma suíte (individual ou comparação) — esquema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Busca uma suíte (integrada ou personalizada)                                |
| `/api/evals/suites`           | `POST`   | Cria uma suíte personalizada — esquema `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Busca uma suíte personalizada                                               |
| `/api/evals/suites/{suiteId}` | `PUT`    | Substitui uma suíte personalizada (os casos são reinseridos)                |
| `/api/evals/suites/{suiteId}` | `DELETE` | Exclui uma suíte personalizada e seus casos                                 |

### Executando uma suíte

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Campos opcionais:

- `outputs` — `Record<caseId, string>` de saídas pré-calculadas. Quando
  fornecido, o executor **ignora o despacho** e apenas pontua as saídas em cache
  (útil para avaliação offline).
- `compareTarget` — segundo destino a ser executado em paralelo; ambas as
  execuções compartilham um `runGroupId` gerado para visualização comparativa.
- `apiKeyId` — chave de API interna usada para autenticar as chamadas
  despachadas a `/v1/chat/completions`. Obrigatória quando `REQUIRE_API_KEY`
  está habilitado.

### Criando uma suíte personalizada

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste rápido de produção",
    "description": "Verificação rápida de integridade antes da implantação",
    "cases": [
      {
        "name": "Estrutura JSON",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Responda com {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Pipeline de Despacho

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Resolve a suíte (integrada ou personalizada).
2. Para cada caso, cria uma `Request` para `/v1/chat/completions` com as
   `messages` do caso, o `model` resolvido, `stream: false` e `max_tokens: 512`
   (ou a substituição definida pelo caso).
3. Chama o manipulador de chat diretamente (no mesmo processo — sem uma
   requisição HTTP adicional).
4. Registra a latência e extrai o texto de `choices[0].message.content` ou do
   payload `output[]` da Responses API.
5. Pontua todas as saídas por meio de `runSuite()` e depois persiste os
   resultados por meio de `saveEvalRun()`.

Os casos são executados **sequencialmente**. Atualmente, não há uma flag de
concorrência.

## Painel

A interface fica em `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Nela, você
pode:

- Explorar suítes integradas e personalizadas com uma visualização caso a caso.
- Criar/editar/excluir suítes personalizadas com o construtor de casos.
- Escolher um alvo (padrões da suíte / modelo / combo), opcionalmente um segundo
  `compareTarget`, opcionalmente uma chave de API e, então, executar sob demanda.
- Inspecionar o histórico de execuções, o resultado de aprovação/reprovação por
  caso, a latência e as saídas capturadas.
- Ver o placar contínuo agregado com base na execução mais recente por escopo
  `(suite, target)`.

## Relação com a RFC de Avaliação Automática

Um subsistema de avaliação separado e mais restrito fica em
`src/domain/assessment/` (consulte também
[AUTO-COMBO.md](../routing/AUTO-COMBO.md) para conhecer o mecanismo de pontuação
em operação). Esse subsistema é voltado ao mecanismo Auto Combo — pontuando
automaticamente provedores e modelos para que os combos possam se recuperar
sozinhos quando serviços upstream falharem. Ele usa seu próprio executor, seu
próprio categorizador e sua própria lógica de pontuação.

O framework Evals documentado aqui é a **superfície de testes mais ampla e de
propósito geral**. Prefira-o para suítes de regressão arbitrárias, comparações
A/B e testes rápidos por versão. Use o subsistema de Avaliação Automática quando
precisar que a integridade dos provedores em tempo real influencie as decisões
de roteamento.

## Integração com CI

Atualmente, não há um script npm `eval:ci` dedicado. Há dois caminhos para
condicionar lançamentos aos resultados das avaliações:

- **Caminho HTTP**: inicialize o servidor, faça uma requisição para
  `POST /api/evals` com `suiteId` + `target` conhecidos e verifique se
  `runs[].summary.passRate >= N` na resposta.
- **Caminho no mesmo processo**: importe `runEvalSuiteAgainstTarget()` de
  `@/lib/evals/runtime` em um script, execute-o em um banco de dados de teste e
  verifique o `PersistedEvalRun.summary` retornado.

Os testes que abrangem a rota e o histórico ficam em
`tests/unit/evals-route.test.ts` e `tests/unit/evals-history.test.ts`.

## Pontos de Extensão

Alterações comuns e onde realizá-las:

- **Nova estratégia de pontuação** — estenda o bloco
  `switch (evalCase.expected.strategy)` em `evaluateCase()` (`evalRunner.ts`) e
  amplie `EvalCaseStrategy` em `src/lib/db/evals.ts`, além de
  `evalCaseBuilderSchema` em `schemas.ts`.
- **Nova suíte integrada** — defina um objeto de suíte e chame
  `registerSuite()` na parte inferior de `evalRunner.ts`. Ela será descoberta
  automaticamente por `listSuites()`.
- **Execução com concorrência** — altere o loop `for` sequencial em
  `runEvalSuiteAgainstTarget()` para um `Promise.all` limitado (atualmente, não
  existe controle de concorrência).
- **Casos de streaming/chamadas de ferramentas** — atualmente, o executor força
  `stream: false`. A avaliação com suporte a streaming ou ferramentas exigiria
  alterações em `runtime.ts` (capturar e agregar os blocos SSE antes da
  pontuação).

## Veja também

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — visão geral do produto
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referência do pipeline de requisições
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — mecanismo de pontuação do Auto Combo (em execução)
- Código-fonte: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Interface: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
