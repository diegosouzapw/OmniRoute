# Evaluations (Evals) (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Fonte fidedigna:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute inclui uma framework de avaliação genérica que pode utilizar para efetuar testes comparativos de configurações de encaminhamento, fornecedores/modelos individuais ou conjuntos de testes "golden set" incluídos.
Utilize-a para verificar alterações ao encaminhamento, validar novos fornecedores e controlar lançamentos antes de os promover para tráfego de produção.

A framework é implementada como:

- Um executor puro (`src/lib/evals/evalRunner.ts`) que regista em memória
  conjuntos de testes integrados, avalia os resultados face aos critérios esperados e agrega
  grelhas de pontuação.
- Uma camada de persistência (`src/lib/db/evals.ts`) para conjuntos de testes personalizados (definidos pelo utilizador)
  e execuções históricas em SQLite.
- Uma camada de orquestração (`src/lib/evals/runtime.ts`) que executa cada caso
  ao encaminhar chamadas reais para `POST /v1/chat/completions`, regista a latência
  e os resultados e persiste a execução.
- Endpoints REST em `/api/evals/*` (apenas com autenticação de gestão).
- Uma área no painel em `Dashboard → Utilização → Avaliações` (`EvalsTab.tsx`).

## Conceitos

### Conjunto de testes

Um conjunto de testes é uma coleção identificada de casos de teste, com uma `description` e um ou
mais casos. Os conjuntos de testes têm duas origens:

| Origem     | Onde é definido                                      | Mutável em tempo de execução? |
| ---------- | ---------------------------------------------------- | ----------------------------- |
| `built-in` | Registado através de `registerSuite()` no arranque   | Não (definido no código)      |
| `custom`   | Armazenado em `eval_suites` + `eval_cases` no SQLite | Sim (através da API/IU)       |

Os atuais conjuntos de testes integrados (consulte `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 casos de referência de saudação/matemática/tradução/segurança
- `coding-proficiency` — Python/JS/SQL/TS/deteção de erros
- `reasoning-logic` — silogismos, problemas escritos, reconhecimento de padrões
- `multilingual` — tradução e deteção de idiomas
- `safety-guardrails` — PII, jailbreak, recusa, sensibilização para enviesamentos
- `instruction-following` — apenas JSON, listas numeradas, restrições de idioma
- `codex-comparison` — tarefas de programação frente a frente destinadas ao modo de comparação

### Caso

Cada caso contém:

| Campo      | Descrição                                                               |
| ---------- | ----------------------------------------------------------------------- |
| `id`       | Identificador estável (utilizado como chave para resultados e métricas) |
| `name`     | Etiqueta legível por humanos                                            |
| `model`    | Modelo predefinido quando a execução utiliza o destino `suite-default`  |
| `input`    | `{ messages, max_tokens? }` — enviado para `/v1/chat/completions`       |
| `expected` | `{ strategy, value }` — critérios de pontuação (consulte abaixo)        |
| `tags`     | Etiquetas opcionais (por exemplo, `safety`, `pii`, `jailbreak`)         |

### Destino

O mesmo conjunto de testes pode ser executado em diferentes destinos. O esquema do destino é
`evalTargetSchema` em `src/shared/validation/schemas.ts`:

| Tipo de destino | `id`               | Comportamento                                                                      |
| --------------- | ------------------ | ---------------------------------------------------------------------------------- |
| `suite-default` | `null`             | Cada caso utiliza o respetivo campo `model` integrado                              |
| `model`         | nome do modelo     | Força todos os casos a passarem por um modelo direto (por exemplo, `gpt-4o`)       |
| `combo`         | nome da combinação | Executa todos os casos através de uma combinação (testa o motor de encaminhamento) |

Para `model` e `combo`, o campo `id` é obrigatório (imposto pelo `superRefine` do Zod).
Quando `compareTarget` é fornecido, ambos os destinos têm de ser diferentes —
o executor persiste ambas as execuções sob o mesmo `runGroupId` para comparação A/B.

## Critérios de Avaliação

Implementados em `evaluateCase()` (evalRunner.ts):

| Estratégia | Aprovado quando…                                                                     |
| ---------- | ------------------------------------------------------------------------------------ |
| `exact`    | `actualOutput === expected.value`                                                    |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                  |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` é verdadeiro                         |
| `custom`   | `expected.fn(actualOutput, evalCase)` devolve um valor verdadeiro (apenas integrado) |

**Nota:** A avaliação através de funções personalizadas está reservada para
conjuntos definidos no código (integrados), porque as funções não podem ser
serializadas através da API. O `evalCaseBuilderSchema` aceita apenas
`contains | exact | regex` para conjuntos criados pelo utilizador.

Atualmente, não existe qualquer avaliador baseado em LLM nem qualquer avaliador
de semelhança baseado em embeddings — seria um ponto de extensão simples em
`evaluateCase()`.

## Esquema da Base de Dados

Três tabelas (migrações `030_create_eval_runs.sql` e
`031_create_eval_suites.sql`):

| Tabela        | Finalidade                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadados dos conjuntos personalizados (`id`, `name`, `description`)                                                              |
| `eval_cases`  | Casos por conjunto — `input_json`, `expected_*`, `tags_json`                                                                      |
| `eval_runs`   | Execuções históricas — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Os conjuntos integrados **não** são armazenados na BD. Residem em memória e
voltam a ser registados sempre que `evalRunner.ts` é importado.

## API REST

Todos os endpoints requerem autenticação de gestão (`requireManagementAuth`) —
não fazem parte da superfície pública do proxy.

| Endpoint                      | Método   | Descrição                                                                      |
| ----------------------------- | -------- | ------------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | Listar conjuntos + execuções recentes + tabela de pontuação + alvos + chaves   |
| `/api/evals`                  | `POST`   | Executar um conjunto (individual ou comparação) — esquema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Obter um conjunto (integrado ou personalizado)                                 |
| `/api/evals/suites`           | `POST`   | Criar um conjunto personalizado — esquema `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Obter um conjunto personalizado                                                |
| `/api/evals/suites/{suiteId}` | `PUT`    | Substituir um conjunto personalizado (os casos são novamente inseridos)        |
| `/api/evals/suites/{suiteId}` | `DELETE` | Eliminar um conjunto personalizado e os respetivos casos                       |

### Executar um conjunto

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

- `outputs` — `Record<caseId, string>` de resultados pré-calculados. Quando
  fornecidos, o executor **ignora o envio** e apenas avalia os resultados em
  cache (útil para avaliação offline).
- `compareTarget` — segundo alvo a executar em paralelo; ambas as execuções
  partilham um `runGroupId` gerado para visualização comparativa direta.
- `apiKeyId` — chave de API interna utilizada para autenticar as chamadas
  enviadas para `/v1/chat/completions`. Obrigatório quando `REQUIRE_API_KEY`
  está ativado.

### Criar um conjunto personalizado

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Pipeline de Execução

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Resolve a suite (incorporada ou personalizada).
2. Para cada caso, cria um `Request` para `/v1/chat/completions` com as
   `messages` do caso, o `model` resolvido, `stream: false` e `max_tokens: 512`
   (ou a substituição definida no caso).
3. Chama diretamente o processador de chat (no mesmo processo — sem um salto HTTP adicional).
4. Regista a latência e extrai texto de `choices[0].message.content`
   ou do payload `output[]` da Responses API.
5. Avalia todos os resultados através de `runSuite()` e, em seguida, guarda-os através de `saveEvalRun()`.

Os casos são executados **sequencialmente**. Atualmente, não existe qualquer opção de concorrência.

## Painel

A interface encontra-se em `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). A partir daí, pode:

- Consultar suites incorporadas e personalizadas, com uma pré-visualização caso a caso.
- Criar/editar/eliminar suites personalizadas com o construtor de casos.
- Escolher um destino (predefinições da suite / modelo / combo), opcionalmente um segundo
  `compareTarget` e uma chave de API, e depois executar a pedido.
- Consultar o histórico de execuções, o resultado de aprovação/reprovação por caso, a latência e os resultados capturados.
- Ver o painel de pontuação contínua agregado a partir da execução mais recente por âmbito
  `(suite, target)`.

## Relação com a RFC de Avaliação Automática

Existe um subsistema de avaliação separado e mais específico em `src/domain/assessment/`
(consulte também [AUTO-COMBO.md](../routing/AUTO-COMBO.md) para conhecer o motor de pontuação em produção).
Este subsistema destina-se ao motor Auto Combo — avalia automaticamente fornecedores e
modelos para que os combos possam recuperar autonomamente quando os serviços externos falham. Utiliza o seu próprio executor,
o seu próprio categorizador e a sua própria lógica de pontuação.

A framework de Evals aqui documentada é a **superfície de testes mais abrangente e
generalista**. Dê-lhe preferência para suites de regressão arbitrárias, comparações A/B
e testes rápidos por versão. Utilize o subsistema de Avaliação Automática quando precisar
que o estado dos fornecedores em tempo real influencie as decisões de encaminhamento.

## Integração com CI

Atualmente, não existe um script npm `eval:ci` dedicado. Existem duas opções se pretender
condicionar lançamentos aos resultados das avaliações:

- **Via HTTP**: inicie o servidor, envie um pedido para `POST /api/evals` com um
  `suiteId` + `target` conhecido e verifique se `runs[].summary.passRate >= N` na
  resposta.
- **No mesmo processo**: importe `runEvalSuiteAgainstTarget()` de
  `@/lib/evals/runtime` a partir de um script, execute-o numa base de dados de teste e verifique o
  `PersistedEvalRun.summary` devolvido.

Os testes que abrangem a rota e o histórico encontram-se em
`tests/unit/evals-route.test.ts` e `tests/unit/evals-history.test.ts`.

## Pontos de Extensão

Alterações comuns e onde fazê-las:

- **Nova estratégia de pontuação** — expanda o bloco `switch (evalCase.expected.strategy)`
  em `evaluateCase()` (`evalRunner.ts`) e alargue `EvalCaseStrategy` em
  `src/lib/db/evals.ts`, bem como `evalCaseBuilderSchema` em `schemas.ts`.
- **Nova suite incorporada** — defina um objeto de suite e chame `registerSuite()` no
  fim de `evalRunner.ts`. Será descoberta automaticamente por `listSuites()`.
- **Execução com concorrência** — altere o ciclo `for` sequencial em
  `runEvalSuiteAgainstTarget()` para um `Promise.all` limitado (atualmente, não existe
  qualquer controlo de concorrência).
- **Casos de streaming/chamadas de ferramentas** — atualmente, o executor impõe `stream: false`.
  A avaliação com suporte para streaming ou ferramentas exigiria alterações em `runtime.ts`
  (capturar e agregar fragmentos SSE antes da pontuação).

## Ver também

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — guia geral do produto
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referência do fluxo de pedidos
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — motor de pontuação Auto Combo (em execução)
- Código-fonte: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- IU: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
