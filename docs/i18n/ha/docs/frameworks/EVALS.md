# Evaluations (Evals) (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Tushen ingantacciyar gaskiya:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute ya ƙunshi tsarin kimantawa na gama-gari wanda za ka iya amfani da shi don auna ingancin saitunan routing, providers/models guda ɗaya, ko tarin gwaje-gwajen "golden set" da aka haɗa.
Yi amfani da shi don tabbatar da sauye-sauyen routing, tantance sabbin providers, da hana fitar da sabbin sigogi har sai sun cika sharuɗɗa kafin a tura su zuwa zirga-zirgar production.

An aiwatar da tsarin kamar haka:

- Pure runner (`src/lib/evals/evalRunner.ts`) wanda ke rajistar built-in suites a cikin memory, yana tantance outputs bisa expected criteria, sannan yana tara scorecards.
- Persistence layer (`src/lib/db/evals.ts`) don custom suites da masu amfani suka ayyana da kuma tarihin runs a cikin SQLite.
- Orchestration layer (`src/lib/evals/runtime.ts`) wanda ke aiwatar da kowace case ta hanyar aika ainihin kiraye-kiraye zuwa `POST /v1/chat/completions`, yana ɗaukar latency da outputs, sannan yana adana run ɗin.
- REST endpoints a ƙarƙashin `/api/evals/*` (management-auth kawai).
- Fuskar dashboard a `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Muhimman Ma'anoni

### Suite

Suite tarin test cases ne mai suna, wanda ke da `description` da case ɗaya ko fiye. Suites suna fitowa daga tushe biyu:

| Tushe      | Inda aka ayyana                                   | Ana iya sauya shi yayin runtime? |
| ---------- | ------------------------------------------------- | -------------------------------- |
| `built-in` | Ana rajista ta `registerSuite()` lokacin boot     | A'a (an ayyana a code)           |
| `custom`   | Ana adanawa a SQLite `eval_suites` + `eval_cases` | E (ta API/UI)                    |

Built-in suites na yanzu (duba `src/lib/evals/evalRunner.ts`):

- `golden-set` — baseline cases 10 da suka shafi gaisuwa/lissafi/fassara/tsaro
- `coding-proficiency` — gano kurakurai a Python/JS/SQL/TS
- `reasoning-logic` — syllogisms, matsalolin kalmomi, da gano tsari
- `multilingual` — fassara da gano harshe
- `safety-guardrails` — PII, jailbreak, refusal, da fahimtar son zuciya
- `instruction-following` — JSON kawai, jerin lambobi, da ƙuntatawar harshe
- `codex-comparison` — coding tasks na fafatawa kai-tsaye da aka tanada don compare mode

### Case

Kowace case tana ɗauke da:

| Field      | Bayani                                                                            |
| ---------- | --------------------------------------------------------------------------------- |
| `id`       | Stable identifier (wanda ake amfani da shi wajen sanya key ga outputs da metrics) |
| `name`     | Label da ɗan Adam zai iya karantawa                                               |
| `model`    | Default model lokacin da run ke amfani da targeting na `suite-default`            |
| `input`    | `{ messages, max_tokens? }` — ana aikawa zuwa `/v1/chat/completions`              |
| `expected` | `{ strategy, value }` — ƙa'idar scoring (duba ƙasa)                               |
| `tags`     | Labels na zaɓi (misali `safety`, `pii`, `jailbreak`)                              |

### Target

Ana iya gudanar da suite iri ɗaya a kan targets daban-daban. Target schema ita ce
`evalTargetSchema` a cikin `src/shared/validation/schemas.ts`:

| Nau'in target   | `id`        | Halayya                                                               |
| --------------- | ----------- | --------------------------------------------------------------------- |
| `suite-default` | `null`      | Kowace case tana amfani da built-in `model` field nata                |
| `model`         | sunan model | Tilasta kowace case ta bi ta direct model guda ɗaya (misali `gpt-4o`) |
| `combo`         | sunan combo | Gudanar da kowace case ta combo guda ɗaya (yana gwada routing engine) |

Ga `model` da `combo`, ana buƙatar `id` field (Zod ne ke tabbatar da hakan ta
`superRefine`). Idan aka bayar da `compareTarget`, dole ne targets biyun su bambanta —
runner yana adana runs biyun a ƙarƙashin `runGroupId` iri ɗaya don kwatancen A/B.

## Ka’idojin Ba da Maki

An aiwatar da su a cikin `evaluateCase()` (evalRunner.ts):

| Dabara     | Za a ci nasara idan…                                                                |
| ---------- | ----------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                 |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` ya zama gaskiya                     |
| `custom`   | `expected.fn(actualOutput, evalCase)` ya dawo da gaskiya (na ginannen tsarin kawai) |

**Lura:** An keɓe ba da maki ta hanyar aiki na musamman ga rukunai da aka ayyana
a cikin lamba (ginannu) saboda ba za a iya mayar da ayyuka zuwa tsarin da za a
aika ta API ba. `evalCaseBuilderSchema` yana karɓar `contains | exact | regex`
kawai don rukunai da masu amfani suka ƙirƙira.

A halin yanzu babu LLM-a-matsayin-alƙali ko mai ƙididdige kamanceceniya bisa
embedding — zai zama wuri mai sauƙi na faɗaɗawa a cikin `evaluateCase()`.

## Tsarin Bayanai

Tebura uku (ƙaura `030_create_eval_runs.sql` da
`031_create_eval_suites.sql`):

| Tebur         | Manufa                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | Metadata na rukunin musamman (`id`, `name`, `description`)                                                                     |
| `eval_cases`  | Gwaje-gwaje na kowane rukuni — `input_json`, `expected_*`, `tags_json`                                                         |
| `eval_runs`   | Tarihin gudanarwa — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ba a adana ginannun rukunai a cikin DB. Suna kasancewa a ƙwaƙwalwar ajiya kuma
ana sake yin rajistarsu duk lokacin da aka shigo da `evalRunner.ts`.

## REST API

Duk endpoints suna buƙatar tantancewar gudanarwa (`requireManagementAuth`) —
ba sa cikin ɓangaren proxy na jama’a.

| Endpoint                      | Hanya    | Bayani                                                                          |
| ----------------------------- | -------- | ------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Jera rukunai + gudanarwar baya-bayan nan + katin maki + wuraren nufi + maɓallai |
| `/api/evals`                  | `POST`   | Gudanar da rukuni (guda ɗaya ko kwatantawa) — schema `evalRunSuiteSchema`       |
| `/api/evals/{suiteId}`        | `GET`    | Ɗauko rukuni guda ɗaya (ginanne ko na musamman)                                 |
| `/api/evals/suites`           | `POST`   | Ƙirƙiri rukuni na musamman — schema `evalSuiteSaveSchema`                       |
| `/api/evals/suites/{suiteId}` | `GET`    | Ɗauko rukuni na musamman                                                        |
| `/api/evals/suites/{suiteId}` | `PUT`    | Sauya rukuni na musamman (ana sake saka gwaje-gwajen)                           |
| `/api/evals/suites/{suiteId}` | `DELETE` | Share rukuni na musamman da gwaje-gwajensa                                      |

### Gudanar da rukuni

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

Filayen zaɓi:

- `outputs` — `Record<caseId, string>` na sakamakon da aka riga aka lissafa.
  Idan an bayar da shi, mai gudanarwar zai **tsallake turawa** kuma ya ba da
  maki ga sakamakon da aka adana kawai (yana da amfani don kimantawa ba tare
  da haɗin yanar gizo ba).
- `compareTarget` — wuri na biyu da za a gudanar a layi ɗaya; duk gudanarwar
  biyun suna amfani da `runGroupId` da aka samar tare don duba kwatance
  kai-tsaye.
- `apiKeyId` — maɓallin API na ciki da ake amfani da shi don tantance kiran
  `/v1/chat/completions` da aka tura. Ana buƙatarsa idan an kunna
  `REQUIRE_API_KEY`.

### Ƙirƙirar rukuni na musamman

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

## Bututun Aikawa

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Yana warware suite ɗin (ginannen ciki ko na musamman).
2. Ga kowane case, yana gina `Request` zuwa `/v1/chat/completions` tare da
   `messages` na case ɗin, `model` da aka warware, `stream: false`, da `max_tokens: 512`
   (ko ƙimar da case ɗin ya maye gurbinta da ita).
3. Yana kiran mai sarrafa chat kai tsaye (a cikin process ɗin — babu ƙarin tsallakewar HTTP).
4. Yana ɗaukar latency kuma yana fitar da rubutu daga ko dai `choices[0].message.content`
   ko kuma payload ɗin Responses-API na `output[]`.
5. Yana ba dukkan outputs maki ta hanyar `runSuite()`, sannan ya adana su ta hanyar `saveEvalRun()`.

Cases suna gudana **ɗaya bayan ɗaya**. Babu concurrency flag a halin yanzu.

## Dashboard

UI ɗin yana a `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Daga nan za ka
iya:

- Bincika ginannun suites da na musamman tare da samfotin kowane case.
- Ƙirƙira/gyara/share suites na musamman ta amfani da case builder.
- Zaɓi target (suite defaults / model / combo), da zaɓin target na biyu
  `compareTarget`, da zaɓin API key, sannan ka gudanar da shi lokacin da ake buƙata.
- Duba tarihin runs, nasara/rashin nasarar kowane case, latency, da outputs da aka ɗauka.
- Ganin rolling scorecard da aka tara daga run mafi sabo a kowane
  `(suite, target)` scope.

## Alaƙa da Auto-Assessment RFC

Wani tsarin assessment na daban kuma mai takaitacciyar manufa yana a `src/domain/assessment/`
(duba kuma [AUTO-COMBO.md](../routing/AUTO-COMBO.md) don injin scoring da ke aiki kai tsaye).
Wannan subsystem ɗin yana nufin injin Auto Combo — yana ba providers da
models maki ta atomatik domin combos su iya gyara kansu idan upstreams suka gaza. Yana amfani da runner
nasa, categorizer nasa, da tsarin scoring nasa.

Tsarin Evals da aka bayyana a nan shi ne **fage mafi faɗi na gwaji mai amfani
ga dalilai iri-iri**. Fi son amfani da shi don arbitrary regression suites, kwatancen A/B,
da smoke tests na kowane release. Yi amfani da Auto-Assessment subsystem idan kana buƙatar
lafiyar provider ta ainihin lokaci ta yi tasiri kan shawarwarin routing.

## Haɗawa da CI

Babu keɓaɓɓen npm script na `eval:ci` a halin yanzu. Akwai hanyoyi biyu idan kana son
hana releases ci gaba bisa sakamakon eval:

- **Hanyar HTTP**: kunna server, aika buƙata zuwa `POST /api/evals` tare da sanannen
  `suiteId` + `target`, sannan tabbatar da `runs[].summary.passRate >= N` a cikin
  response.
- **Hanyar cikin process**: shigo da `runEvalSuiteAgainstTarget()` daga
  `@/lib/evals/runtime` a cikin script, gudanar da shi kan test DB, sannan bincika
  `PersistedEvalRun.summary` da aka dawo da shi.

Tests da ke rufe route da history suna a
`tests/unit/evals-route.test.ts` da `tests/unit/evals-history.test.ts`.

## Wuraren Faɗaɗawa

Sauye-sauyen da aka saba yi da wuraren da za a yi su:

- **Sabuwar dabarar scoring** — faɗaɗa block ɗin `switch (evalCase.expected.strategy)`
  a cikin `evaluateCase()` (`evalRunner.ts`) sannan faɗaɗa `EvalCaseStrategy` a
  `src/lib/db/evals.ts` tare da `evalCaseBuilderSchema` a cikin `schemas.ts`.
- **Sabuwar ginanniyar suite** — ayyana suite object sannan kira `registerSuite()` a
  ƙarshen `evalRunner.ts`. `listSuites()` zai gano ta ta atomatik.
- **Gudanarwa tare da concurrency** — sauya sequential `for` loop a cikin
  `runEvalSuiteAgainstTarget()` zuwa bounded `Promise.all` (babu tsarin sarrafa concurrency
  a halin yanzu).
- **Cases na stream/tool-call** — a halin yanzu runner yana tilasta `stream: false`.
  Streaming ko evaluation da ke fahimtar tools zai buƙaci sauye-sauye a cikin `runtime.ts`
  (ɗauka da haɗa SSE chunks kafin scoring).

## Duba Har Ila Yau

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — cikakken jagorar amfani da samfurin
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — bayanin matakan sarrafa buƙata
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — injin ƙididdigar Auto Combo (lokacin aiki kai tsaye)
- Madogara: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
