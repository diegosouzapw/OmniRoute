# Evaluations (Evals) (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Isi iyi nke eziokwu:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Mmelite ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute na-abịa na usoro nlele izugbe ị nwere ike iji tụọ arụmọrụ nhazi
ụzọ ntụgharị, otu ndị na-enye ọrụ/ụdị, ma ọ bụ nchịkọta ule "golden set" ndị e jikọtara.
Jiri ya nyochaa mgbanwe ụzọ ntụgharị, kwado ndị na-enye ọrụ ọhụrụ, ma gbochie mwepụta
tupu ebufee ha gaa na okporo ụzọ mmepụta.

E mebere usoro a dị ka:

- Ihe na-agba ule na-enweghị mmetụta mpụga (`src/lib/evals/evalRunner.ts`) nke na-edebanye
  nchịkọta ule arụnyere n'ime ebe nchekwa, na-atụnyere nsonaazụ na njirisi ndị a tụrụ anya,
  ma na-achịkọta kaadị akara.
- Oyi akwa nchekwa na-adịgide adịgide (`src/lib/db/evals.ts`) maka nchịkọta ule omenala
  (nke onye ọrụ kọwara) na ndekọ ule ndị gara aga n'ime SQLite.
- Oyi akwa nhazi ọrụ (`src/lib/evals/runtime.ts`) nke na-eme ikpe ọ bụla
  site n'iziga ezigbo oku na `POST /v1/chat/completions`, na-edekọ oge nzaghachi
  na nsonaazụ, ma na-echekwa ọsọ ule ahụ.
- Ebe njedebe REST dị n'okpuru `/api/evals/*` (naanị ndị nwere nkwenye njikwa).
- Ebe dashboard dị na `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Echiche ndị bụ isi

### Nchịkọta ule

Nchịkọta ule bụ mkpokọta ikpe ule nwere aha, nwere `description` na otu ikpe
ma ọ bụ karịa. Nchịkọta ule na-esite na isi iyi abụọ:

| Isi iyi    | Ebe akọwapụtara ya                                             | Enwere ike ịgbanwe ya n'oge ọrụ? |
| ---------- | -------------------------------------------------------------- | -------------------------------- |
| `built-in` | E debanyere ya site na `registerSuite()` mgbe usoro na-amalite | Mba (koodu na-akọwa ya)          |
| `custom`   | Echekwara na SQLite `eval_suites` + `eval_cases`               | Ee (site na API/UI)              |

Nchịkọta ule arụnyere ugbu a (lee `src/lib/evals/evalRunner.ts`):

- `golden-set` — ikpe ntọala 10 gbasara ekele/mgbakọ/nsụgharị/nchekwa
- `coding-proficiency` — Python/JS/SQL/TS/nchọpụta ntụpọ
- `reasoning-logic` — syllogism, nsogbu okwu, nchọpụta usoro
- `multilingual` — nsụgharị na nchọpụta asụsụ
- `safety-guardrails` — PII, jailbreak, ịjụ arịrịọ, ịmara echiche ele mmadụ anya n'ihu
- `instruction-following` — naanị JSON, ndepụta nwere nọmba, mmachi asụsụ
- `codex-comparison` — ọrụ ide koodu a na-atụnyere ihu na ihu, nke ezubere maka ọnọdụ ntụnyere

### Ikpe

Ikpe ọ bụla nwere:

| Ogige      | Nkọwa                                                                   |
| ---------- | ----------------------------------------------------------------------- |
| `id`       | Ihe njirimara na-adịgide adịgide (e ji ya eme igodo nsonaazụ na metrik) |
| `name`     | Akara aha mmadụ nwere ike ịgụ                                           |
| `model`    | Ụdị ndabara mgbe ọsọ ule jiri ebumnuche `suite-default`                 |
| `input`    | `{ messages, max_tokens? }` — a na-eziga ya na `/v1/chat/completions`   |
| `expected` | `{ strategy, value }` — ụkpụrụ inye akara (lee n'okpuru)                |
| `tags`     | Akara nhọrọ (dịka `safety`, `pii`, `jailbreak`)                         |

### Ebumnuche

Enwere ike ịgba otu nchịkọta ule ahụ megide ebumnuche dị iche iche. Schema ebumnuche ahụ bụ
`evalTargetSchema` dị na `src/shared/validation/schemas.ts`:

| Ụdị ebumnuche   | `id`      | Omume                                                             |
| --------------- | --------- | ----------------------------------------------------------------- |
| `suite-default` | `null`    | Ikpe ọ bụla na-eji ogige `model` arụnyere n'ime ya                |
| `model`         | aha ụdị   | Manye ikpe ọ bụla ka ọ gafee otu ụdị kpọmkwem (dịka `gpt-4o`)     |
| `combo`         | aha combo | Mee ka ikpe ọ bụla gafee otu combo (na-anwale injin ụzọ ntụgharị) |

Maka `model` na `combo`, a chọrọ ogige `id` (Zod
`superRefine` na-amanye nke a). Mgbe e nyere `compareTarget`, ebumnuche abụọ ahụ ga-adị iche —
ihe na-agba ule na-echekwa ọsọ ule abụọ ahụ n'okpuru otu `runGroupId` maka ntụnyere A/B.

## Usoro Ntụle Akara

Etinyere ya na `evaluateCase()` (evalRunner.ts):

| Usoro      | Ọ na-agafe mgbe…                                                                         |
| ---------- | ---------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                        |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                      |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` bụ eziokwu                               |
| `custom`   | `expected.fn(actualOutput, evalCase)` na-eweghachi eziokwu (naanị nke arụnyere n'ime ya) |

**Rịba ama:** Edebere ntụle site na ọrụ ahaziri iche maka suite ndị akọwapụtara
na koodu (nke arụnyere n'ime ya) n'ihi na enweghị ike ịgbanwe ọrụ ka ọ bụrụ
usoro a pụrụ iziga site na API. `evalCaseBuilderSchema` na-anabata naanị
`contains | exact | regex` maka suite ndị ọrụ mepụtara.

Taa, enweghị LLM-dị-ka-onye-ikpe ma ọ bụ onye na-atụ myirịta dabere na embedding
— ọ ga-abụ ebe dị ọcha maka ịgbatị ọrụ na `evaluateCase()`.

## Schema Ebe Nchekwa Data

Tebụl atọ (migrations `030_create_eval_runs.sql` na
`031_create_eval_suites.sql`):

| Tebụl         | Ebumnuche                                                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata suite ahaziri iche (`id`, `name`, `description`)                                                                     |
| `eval_cases`  | Ikpe ndị dị na suite ọ bụla — `input_json`, `expected_*`, `tags_json`                                                         |
| `eval_runs`   | Ọsọ ndị gara aga — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

A naghị echekwa suite ndị arụnyere n'ime ya na DB. Ha na-adị na ebe nchekwa ma
na-edebanye aha ha ọzọ oge ọ bụla ebubatara `evalRunner.ts`.

## REST API

Endpoint niile chọrọ nkwenye njikwa (`requireManagementAuth`) — ha abụghị akụkụ
nke elu proxy ọha.

| Endpoint                      | Usoro    | Nkọwa                                                                     |
| ----------------------------- | -------- | ------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Depụta suite + ọsọ ndị na-adịbeghị anya + kaadị akara + ebumnuche + igodo |
| `/api/evals`                  | `POST`   | Gbaa suite (otu ma ọ bụ ntụnyere) — schema `evalRunSuiteSchema`           |
| `/api/evals/{suiteId}`        | `GET`    | Nweta otu suite (nke arụnyere n'ime ya ma ọ bụ nke ahaziri iche)          |
| `/api/evals/suites`           | `POST`   | Mepụta suite ahaziri iche — schema `evalSuiteSaveSchema`                  |
| `/api/evals/suites/{suiteId}` | `GET`    | Nweta suite ahaziri iche                                                  |
| `/api/evals/suites/{suiteId}` | `PUT`    | Dochie suite ahaziri iche (a na-etinyegharị ikpe ndị ahụ)                 |
| `/api/evals/suites/{suiteId}` | `DELETE` | Hichapụ suite ahaziri iche na ikpe ndị dị na ya                           |

### Ịgba suite

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

Field ndị nhọrọ:

- `outputs` — `Record<caseId, string>` nke output ndị agbakọrọ tupu oge eruo.
  Mgbe e nyere ya, runner ahụ **na-amafe dispatch** ma na-atụ naanị output ndị
  echekwara na cache (ọ bara uru maka ntụle offline).
- `compareTarget` — ebumnuche nke abụọ a ga-agba n'otu oge; ọsọ abụọ ahụ na-ekekọrịta
  `runGroupId` emepụtara maka ile ha anya ihu-na-ihu.
- `apiKeyId` — igodo API ime a na-eji akwado oku
  `/v1/chat/completions` ndị ezigara. A chọrọ ya mgbe agbanyere `REQUIRE_API_KEY`.

### Ịmepụta suite ahaziri iche

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

## Usoro Nziga

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Na-achọpụta ngwugwu ule ahụ (nke etinyere n'ime sistemụ ma ọ bụ nke ahaziri).
2. Maka ikpe ọ bụla, ọ na-emepụta `Request` gaa na `/v1/chat/completions` site na iji
   `messages` nke ikpe ahụ, `model` nke achọpụtara, `stream: false`, na `max_tokens: 512`
   (ma ọ bụ uru nke ikpe ahụ ji dochie ya).
3. Ọ na-akpọ onye na-ahụ maka nkata ozugbo (n'ime otu usoro — enweghị njem HTTP ọzọ).
4. Ọ na-edekọ oge nzaghachi ma wepụta ederede site na `choices[0].message.content`
   ma ọ bụ data `output[]` nke Responses-API.
5. Ọ na-enye nsonaazụ niile akara site na `runSuite()`, ma chekwaa ha site na `saveEvalRun()`.

A na-eme ikpe ndị ahụ **otu na-esochi ibe ya**. Enweghị ọkọlọtọ concurrency ugbu a.

## Dashboard

UI ahụ dị na `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Site n'ebe ahụ, ị
nwere ike:

- Nyochaa ngwugwu ule ndị etinyere n'ime sistemụ na ndị ahaziri, tinyere nhụchalụ nke ikpe ọ bụla.
- Mepụta/dezie/hichapụ ngwugwu ule ndị ahaziri site na ihe nrụpụta ikpe.
- Họrọ ebumnuche (ndabara ngwugwu ule / model / combo), ma ọ bụrụ na ịchọrọ, họrọ
  `compareTarget` nke abụọ, yana API key ma ọ bụrụ na ịchọrọ, wee mee ya mgbe achọrọ.
- Nyochaa akụkọ mmegharị, ngafe/ọdịda nke ikpe ọ bụla, oge nzaghachi, na nsonaazụ ndị e dekọrọ.
- Hụ kaadị akara na-agbanwe agbanwe nke a chịkọtara site na mmegharị kacha ọhụrụ n'ime
  mpaghara `(suite, target)` ọ bụla.

## Mmekọrịta ya na Auto-Assessment RFC

Usoro nyocha ọzọ dị iche ma dị warara dị na `src/domain/assessment/`
(lee kwa [AUTO-COMBO.md](../routing/AUTO-COMBO.md) maka injin inye akara dị ndụ).
Usoro ahụ na-elekwasị anya na injin Auto Combo — ọ na-enye ndị na-enye ọrụ na
model akara na-akpaghị aka ka combo nwee ike idozi onwe ha mgbe sistemụ ndị dị n'elu dara. Ọ na-eji onye mmegharị nke ya,
onye nhazi otu nke ya, na mgbakọ akara nke ya.

Framework Evals a kọwara ebe a bụ **usoro nnwale sara mbara nke e mere maka
ọtụtụ ebumnuche**. Họrọ ya maka ngwugwu ule regression dị iche iche, ntụnyere A/B,
na smoke test nke release ọ bụla. Jiri usoro Auto-Assessment mgbe ịchọrọ
ka ahụike onye na-enye ọrụ n'oge ahụ metụta mkpebi routing.

## Njikọ CI

Enweghị script npm `eval:ci` pụrụ iche ugbu a. E nwere ụzọ abụọ ma ọ bụrụ na ịchọrọ
iji nsonaazụ eval gbochie release:

- **Ụzọ HTTP**: gbanye server ahụ, kpọọ `POST /api/evals` site na iji
  `suiteId` + `target` a maara, wee kwado na `runs[].summary.passRate >= N` n'ime
  nzaghachi ahụ.
- **Ụzọ in-process**: bubata `runEvalSuiteAgainstTarget()` site na
  `@/lib/evals/runtime` n'ime script, mee ya megide DB nnwale, wee lelee
  `PersistedEvalRun.summary` eweghachiri.

Nnwale ndị na-ekpuchi route na akụkọ dị na
`tests/unit/evals-route.test.ts` na `tests/unit/evals-history.test.ts`.

## Ebe Mgbatị

Mgbanwe ndị a na-emekarị na ebe a ga-eme ha:

- **Usoro inye akara ọhụrụ** — gbasaa block `switch (evalCase.expected.strategy)`
  dị na `evaluateCase()` (`evalRunner.ts`) ma gbasaa `EvalCaseStrategy` dị na
  `src/lib/db/evals.ts` tinyere `evalCaseBuilderSchema` dị na `schemas.ts`.
- **Ngwugwu ule ọhụrụ etinyere n'ime sistemụ** — kọwaa object ngwugwu ule ma kpọọ `registerSuite()` na
  ngwụcha `evalRunner.ts`. `listSuites()` ga-achọpụta ya na-akpaghị aka.
- **Iji concurrency mee mmegharị** — gbanwee loop `for` nke na-eme ihe otu na-esochi ibe ya dị na
  `runEvalSuiteAgainstTarget()` ka ọ bụrụ `Promise.all` nwere oke (enweghị njikwa concurrency
  ugbu a).
- **Ikpe stream/tool-call** — ugbu a, onye mmegharị ahụ na-amanye `stream: false`.
  Nnyocha streaming ma ọ bụ nke maara tool ga-achọ mgbanwe na `runtime.ts`
  (dekọọ ma chịkọta iberibe SSE tupu inye akara).

## Hụkwa

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — ntụziaka zuru ezu maka iji ngwaahịa ahụ
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ntụaka maka usoro nhazi arịrịọ
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — injin inye akara Auto Combo (oge ọrụ dị ndụ)
- Koodu mmalite: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Ọdịdị onye ọrụ: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
