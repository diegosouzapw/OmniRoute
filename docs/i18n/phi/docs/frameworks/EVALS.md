# Evaluations (Evals) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Kasama sa OmniRoute ang isang generic na framework sa pagsusuri na magagamit mo upang mag-benchmark ng mga configuration sa pag-route, mga indibidwal na provider/model, o mga kasamang suite na "golden set".
Gamitin ito upang beripikahin ang mga pagbabago sa pag-route, patunayan ang mga bagong provider, at salain ang mga release bago ilipat ang mga ito sa production traffic.

Ipinatupad ang framework bilang:

- Isang pure runner (`src/lib/evals/evalRunner.ts`) na nagrerehistro ng mga built-in suite sa memory, sinusuri ang mga output ayon sa inaasahang pamantayan, at pinagsasama-sama ang mga scorecard.
- Isang persistence layer (`src/lib/db/evals.ts`) para sa mga custom (tinukoy ng user) na suite at mga makasaysayang run sa SQLite.
- Isang orchestration layer (`src/lib/evals/runtime.ts`) na nagsasagawa sa bawat case sa pamamagitan ng pagpapadala ng mga tunay na call sa `POST /v1/chat/completions`, kumukuha ng latency at mga output, at sine-save ang run.
- Mga REST endpoint sa ilalim ng `/api/evals/*` (para lamang sa management-auth).
- Isang dashboard surface sa `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Mga Konsepto

### Suite

Ang suite ay isang pinangalanang koleksyon ng mga test case na may `description` at isa o higit pang case. Nagmumula ang mga suite sa dalawang source:

| Source     | Saan tinukoy                                                 | Mababago habang runtime?      |
| ---------- | ------------------------------------------------------------ | ----------------------------- |
| `built-in` | Nakarehistro sa pamamagitan ng `registerSuite()` sa pag-boot | Hindi (tinukoy sa code)       |
| `custom`   | Naka-store sa SQLite `eval_suites` + `eval_cases`            | Oo (sa pamamagitan ng API/UI) |

Ang mga kasalukuyang built-in suite (tingnan ang `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 baseline case para sa pagbati/matematika/pagsasalin/kaligtasan
- `coding-proficiency` — Python/JS/SQL/TS/pagtukoy ng bug
- `reasoning-logic` — mga silohismo, word problem, at pagkilala ng pattern
- `multilingual` — pagsasalin at pagtukoy ng wika
- `safety-guardrails` — PII, jailbreak, pagtanggi, at kamalayan sa bias
- `instruction-following` — JSON lamang, mga listahang may numero, at mga limitasyon sa wika
- `codex-comparison` — mga head-to-head na coding task na inilaan para sa compare mode

### Case

Taglay ng bawat case ang sumusunod:

| Field      | Paglalarawan                                                              |
| ---------- | ------------------------------------------------------------------------- |
| `id`       | Permanenteng identifier (ginagamit bilang key ng mga output at metric)    |
| `name`     | Label na madaling maunawaan ng tao                                        |
| `model`    | Default na model kapag gumagamit ang run ng `suite-default` na pag-target |
| `input`    | `{ messages, max_tokens? }` — ipinapadala sa `/v1/chat/completions`       |
| `expected` | `{ strategy, value }` — rubric sa pagmamarka (tingnan sa ibaba)           |
| `tags`     | Mga opsyonal na label (hal. `safety`, `pii`, `jailbreak`)                 |

### Target

Maaaring patakbuhin ang parehong suite laban sa iba't ibang target. Ang target schema ay
`evalTargetSchema` sa `src/shared/validation/schemas.ts`:

| Uri ng target   | `id`              | Gawi                                                                       |
| --------------- | ----------------- | -------------------------------------------------------------------------- |
| `suite-default` | `null`            | Ginagamit ng bawat case ang sarili nitong built-in na `model` field        |
| `model`         | pangalan ng model | Sapilitang ipadaan ang bawat case sa isang direktang model (hal. `gpt-4o`) |
| `combo`         | pangalan ng combo | Patakbuhin ang bawat case sa iisang combo (sinusubukan ang routing engine) |

Para sa `model` at `combo`, kinakailangan ang `id` field (ipinapatupad ng Zod
`superRefine`). Kapag ibinigay ang `compareTarget`, dapat magkaiba ang dalawang target —
sine-save ng runner ang parehong run sa ilalim ng iisang `runGroupId` para sa A/B comparison.

## Mga Rubric sa Pagmamarka

Ipinatupad sa `evaluateCase()` (evalRunner.ts):

| Estratehiya | Papasa kapag…                                                                  |
| ----------- | ------------------------------------------------------------------------------ |
| `exact`     | `actualOutput === expected.value`                                              |
| `contains`  | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`            |
| `regex`     | `new RegExp(expected.value).test(actualOutput)` ay truthy                      |
| `custom`    | Nagbabalik ng truthy ang `expected.fn(actualOutput, evalCase)` (built-in lang) |

**Tandaan:** Ang pagmamarka gamit ang custom function ay nakalaan para sa mga suite na tinukoy sa code (built-in) dahil hindi maaaring i-serialize ang mga function sa pamamagitan ng API. Tinatanggap lamang ng `evalCaseBuilderSchema` ang `contains | exact | regex` para sa mga suite na ginawa ng user.

Sa kasalukuyan, walang LLM-as-judge o similarity scorer na nakabatay sa embedding — magiging maayos na extension point ang `evaluateCase()` para rito.

## Schema ng Database

Tatlong table (mga migration na `030_create_eval_runs.sql` at `031_create_eval_suites.sql`):

| Table         | Layunin                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata ng custom suite (`id`, `name`, `description`)                                                                      |
| `eval_cases`  | Mga case bawat suite — `input_json`, `expected_*`, `tags_json`                                                              |
| `eval_runs`   | Mga dating run — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ang mga built-in suite ay **hindi** iniimbak sa DB. Nananatili ang mga ito sa memory at muling nirerehistro sa tuwing ini-import ang `evalRunner.ts`.

## REST API

Nangangailangan ang lahat ng endpoint ng management auth (`requireManagementAuth`) — hindi bahagi ang mga ito ng pampublikong proxy surface.

| Endpoint                      | Paraan   | Paglalarawan                                                            |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Ilista ang mga suite + kamakailang run + scorecard + target + key       |
| `/api/evals`                  | `POST`   | Magpatakbo ng suite (iisa o paghahambing) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Kunin ang isang suite (built-in o custom)                               |
| `/api/evals/suites`           | `POST`   | Gumawa ng custom suite — schema `evalSuiteSaveSchema`                   |
| `/api/evals/suites/{suiteId}` | `GET`    | Kunin ang isang custom suite                                            |
| `/api/evals/suites/{suiteId}` | `PUT`    | Palitan ang isang custom suite (muling ipinapasok ang mga case)         |
| `/api/evals/suites/{suiteId}` | `DELETE` | Burahin ang isang custom suite at ang mga case nito                     |

### Pagpapatakbo ng suite

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

Mga opsyonal na field:

- `outputs` — `Record<caseId, string>` ng mga output na na-compute na. Kapag ibinigay ito, **nilalaktawan ng runner ang dispatch** at minamarkahan lamang ang mga naka-cache na output (kapaki-pakinabang para sa offline evaluation).
- `compareTarget` — pangalawang target na patatakbuhin nang parallel; parehong gumagamit ang dalawang run ng nabuong `runGroupId` para sa head-to-head na pagtingin.
- `apiKeyId` — internal API key na ginagamit upang i-authenticate ang mga ipinadalang `/v1/chat/completions` call. Kinakailangan kapag naka-enable ang `REQUIRE_API_KEY`.

### Paggawa ng custom suite

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

## Pipeline ng Pag-dispatch

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Nire-resolve ang suite (built-in o custom).
2. Para sa bawat case, bumubuo ng `Request` patungo sa `/v1/chat/completions` gamit ang
   `messages` ng case, ang na-resolve na `model`, `stream: false`, at `max_tokens: 512`
   (o ang override ng case).
3. Direktang tinatawag ang chat handler (in-process — walang karagdagang HTTP hop).
4. Kinukuha ang latency at ina-extract ang text mula sa alinman sa `choices[0].message.content`
   o sa Responses-API `output[]` payload.
5. Binibigyan ng score ang lahat ng output sa pamamagitan ng `runSuite()`, pagkatapos ay sine-save gamit ang `saveEvalRun()`.

Tumatakbo ang mga case nang **sunod-sunod**. Walang concurrency flag sa kasalukuyan.

## Dashboard

Matatagpuan ang UI sa `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Mula roon, maaari mong:

- I-browse ang mga built-in at custom na suite na may preview ng bawat case.
- Gumawa/mag-edit/magbura ng mga custom na suite gamit ang case builder.
- Pumili ng target (mga default ng suite / model / combo), opsyonal na pangalawang
  `compareTarget`, at opsyonal na API key, pagkatapos ay patakbuhin kapag kinakailangan.
- Suriin ang kasaysayan ng mga run, pass/fail ng bawat case, latency, at mga nakuhang output.
- Tingnan ang rolling scorecard na pinagsama-sama mula sa pinakabagong run sa bawat
  saklaw na `(suite, target)`.

## Ugnayan sa Auto-Assessment RFC

May hiwalay at mas limitadong assessment subsystem sa `src/domain/assessment/`
(tingnan din ang [AUTO-COMBO.md](../routing/AUTO-COMBO.md) para sa live scoring engine).
Nakatutok ang subsystem na iyon sa Auto Combo engine — awtomatikong pagbibigay ng score sa mga provider at
model upang kusang maka-recover ang mga combo kapag pumalya ang mga upstream. Gumagamit ito ng sarili nitong runner,
sarili nitong categorizer, at sarili nitong scoring logic.

Ang Evals framework na nakadokumento rito ang **mas malawak at pangkalahatang-gamit na
testing surface**. Piliin ito para sa anumang regression suite, mga paghahambing na A/B,
at mga smoke test sa bawat release. Gamitin ang Auto-Assessment subsystem kapag kailangan mong
maimpluwensiyahan ng real-time na kalagayan ng provider ang mga desisyon sa routing.

## Integrasyon sa CI

Walang nakalaang `eval:ci` npm script sa kasalukuyan. May dalawang paraan kung gusto mong
gawing kondisyon sa mga release ang mga resulta ng eval:

- **HTTP path**: patakbuhin ang server, magpadala ng request sa `POST /api/evals` gamit ang kilalang
  `suiteId` + `target`, at tiyaking `runs[].summary.passRate >= N` sa
  response.
- **In-process path**: i-import ang `runEvalSuiteAgainstTarget()` mula sa
  `@/lib/evals/runtime` sa isang script, patakbuhin ito laban sa isang test DB, at suriin ang
  ibinalik na `PersistedEvalRun.summary`.

Ang mga test na sumasaklaw sa route at history ay nasa
`tests/unit/evals-route.test.ts` at `tests/unit/evals-history.test.ts`.

## Mga Punto ng Extension

Mga karaniwang pagbabago at kung saan gagawin ang mga ito:

- **Bagong scoring strategy** — palawakin ang block na `switch (evalCase.expected.strategy)`
  sa `evaluateCase()` (`evalRunner.ts`) at palawakin ang `EvalCaseStrategy` sa
  `src/lib/db/evals.ts` pati ang `evalCaseBuilderSchema` sa `schemas.ts`.
- **Bagong built-in suite** — tumukoy ng suite object at tawagin ang `registerSuite()` sa
  ibaba ng `evalRunner.ts`. Awtomatiko itong matutuklasan ng `listSuites()`.
- **Pagpapatakbo nang may concurrency** — palitan ang sunod-sunod na `for` loop sa
  `runEvalSuiteAgainstTarget()` ng bounded na `Promise.all` (walang concurrency
  control sa kasalukuyan).
- **Mga stream/tool-call case** — kasalukuyang ipinipilit ng runner ang `stream: false`.
  Mangangailangan ang streaming o tool-aware na evaluation ng mga pagbabago sa `runtime.ts`
  (kunin at pagsama-samahin ang mga SSE chunk bago magbigay ng score).

## Tingnan Din

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — pangkalahatang gabay sa paggamit ng produkto
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sanggunian para sa pipeline ng kahilingan
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — engine ng pagmamarka ng Auto Combo (aktuwal na runtime)
- Source: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
