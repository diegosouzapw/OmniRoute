# Evaluations (Evals) (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Chanzo rasmi:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Ilisasishwa mara ya mwisho:** 2026-06-28 — v3.8.40

OmniRoute inakuja na mfumo wa jumla wa tathmini unaoweza kutumia kupima utendaji wa usanidi wa uelekezaji, watoa huduma/miundo mahususi, au vifurushi vilivyojumuishwa vya "golden set".
Utumie kuthibitisha mabadiliko ya uelekezaji, kuhalalisha watoa huduma wapya, na kuweka masharti ya matoleo kabla ya kuyaelekeza kwenye trafiki ya uzalishaji.

Mfumo huu umetekelezwa kama:

- Kiendeshaji huru (`src/lib/evals/evalRunner.ts`) kinachosajili vifurushi jumuishi kwenye kumbukumbu, kutathmini matokeo dhidi ya vigezo vinavyotarajiwa, na kujumlisha kadi za alama.
- Safu ya uhifadhi (`src/lib/db/evals.ts`) kwa vifurushi maalum (vilivyofafanuliwa na mtumiaji) na utekelezaji wa kihistoria katika SQLite.
- Safu ya uratibu (`src/lib/evals/runtime.ts`) inayotekeleza kila kisa kwa kutuma miito halisi kwa `POST /v1/chat/completions`, kunasa muda wa kusubiri na matokeo, na kuhifadhi utekelezaji.
- Vituo vya REST chini ya `/api/evals/*` (uthibitishaji wa usimamizi pekee).
- Sehemu ya dashibodi katika `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Dhana

### Kifurushi

Kifurushi ni mkusanyiko wenye jina wa visa vya majaribio, wenye `description` na kisa kimoja au zaidi. Vifurushi hutoka katika vyanzo viwili:

| Chanzo     | Mahali kinapofafanuliwa                                    | Kinaweza kubadilishwa wakati wa utekelezaji? |
| ---------- | ---------------------------------------------------------- | -------------------------------------------- |
| `built-in` | Kimesajiliwa kupitia `registerSuite()` wakati wa kuanzisha | Hapana (kimefafanuliwa kwa msimbo)           |
| `custom`   | Kimehifadhiwa katika SQLite `eval_suites` + `eval_cases`   | Ndiyo (kupitia API/UI)                       |

Vifurushi jumuishi vya sasa (angalia `src/lib/evals/evalRunner.ts`):

- `golden-set` — visa 10 vya msingi vinavyohusu salamu/hisabati/tafsiri/usalama
- `coding-proficiency` — ugunduzi wa Python/JS/SQL/TS/hitilafu
- `reasoning-logic` — silojizimu, matatizo ya maneno, utambuzi wa ruwaza
- `multilingual` — tafsiri na utambuzi wa lugha
- `safety-guardrails` — PII, jailbreak, kukataa, ufahamu wa upendeleo
- `instruction-following` — JSON pekee, orodha zenye nambari, masharti ya lugha
- `codex-comparison` — kazi za uandishi wa msimbo za kulinganisha moja kwa moja, zilizokusudiwa kwa modi ya ulinganishaji

### Kisa

Kila kisa kina:

| Sehemu     | Maelezo                                                                      |
| ---------- | ---------------------------------------------------------------------------- |
| `id`       | Kitambulisho thabiti (kinachotumika kama ufunguo wa matokeo na vipimo)       |
| `name`     | Lebo inayosomeka na binadamu                                                 |
| `model`    | Muundo chaguo-msingi wakati utekelezaji unatumia ulengaji wa `suite-default` |
| `input`    | `{ messages, max_tokens? }` — hutumwa kwa `/v1/chat/completions`             |
| `expected` | `{ strategy, value }` — mwongozo wa utoaji alama (angalia hapa chini)        |
| `tags`     | Lebo za hiari (k.m. `safety`, `pii`, `jailbreak`)                            |

### Lengo

Kifurushi kilekile kinaweza kutekelezwa dhidi ya malengo tofauti. Skimu ya lengo ni
`evalTargetSchema` katika `src/shared/validation/schemas.ts`:

| Aina ya lengo   | `id`           | Tabia                                                                     |
| --------------- | -------------- | ------------------------------------------------------------------------- |
| `suite-default` | `null`         | Kila kisa hutumia sehemu yake jumuishi ya `model`                         |
| `model`         | jina la muundo | Lazimisha kila kisa kupitia muundo mmoja wa moja kwa moja (k.m. `gpt-4o`) |
| `combo`         | jina la combo  | Tekeleza kila kisa kupitia combo moja (huutumia mfumo wa uelekezaji)      |

Kwa `model` na `combo`, sehemu ya `id` inahitajika (inatekelezwa na Zod
`superRefine`). `compareTarget` inapotolewa, malengo yote mawili lazima yatofautiane —
kiendeshaji huhifadhi utekelezaji wote miwili chini ya `runGroupId` ileile kwa ulinganishaji wa A/B.

## Rubriki za Utoaji Alama

Zimetekelezwa katika `evaluateCase()` (evalRunner.ts):

| Mkakati    | Hufaulu wakati…                                                                              |
| ---------- | -------------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                            |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                          |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` ni kweli                                     |
| `custom`   | `expected.fn(actualOutput, evalCase)` hurejesha thamani ya kweli (zilizojengewa ndani pekee) |

**Kumbuka:** Utoaji alama kwa kutumia kitendakazi maalum umetengewa vifurushi
vilivyofafanuliwa kwenye msimbo (vilivyojengewa ndani) kwa sababu vitendakazi
haviwezi kusawazishwa kupitia API. `evalCaseBuilderSchema` inakubali tu
`contains | exact | regex` kwa vifurushi vilivyoundwa na watumiaji.

Kwa sasa hakuna LLM-kama-mwamuzi wala kipimaji cha ufanano kinachotegemea embedding —
hicho kingekuwa kiendelezi safi katika `evaluateCase()`.

## Muundo wa Hifadhidata

Majedwali matatu (uhamishaji `030_create_eval_runs.sql` na
`031_create_eval_suites.sql`):

| Jedwali       | Madhumuni                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata ya kifurushi maalum (`id`, `name`, `description`)                                                                            |
| `eval_cases`  | Kesi kwa kila kifurushi — `input_json`, `expected_*`, `tags_json`                                                                     |
| `eval_runs`   | Uendeshaji wa kihistoria — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Vifurushi vilivyojengewa ndani **havihifadhiwi** katika DB. Hukaa kwenye kumbukumbu
na husajiliwa upya kila wakati `evalRunner.ts` inapoingizwa.

## API ya REST

Endpoints zote zinahitaji uthibitishaji wa usimamizi (`requireManagementAuth`) —
si sehemu ya uso wa proksi wa umma.

| Endpoint                      | Mbinu    | Maelezo                                                                              |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | Orodhesha vifurushi + uendeshaji wa hivi karibuni + kadi ya alama + malengo + funguo |
| `/api/evals`                  | `POST`   | Endesha kifurushi (kimoja au linganisha) — schema `evalRunSuiteSchema`               |
| `/api/evals/{suiteId}`        | `GET`    | Leta kifurushi kimoja (kilichojengewa ndani au maalum)                               |
| `/api/evals/suites`           | `POST`   | Unda kifurushi maalum — schema `evalSuiteSaveSchema`                                 |
| `/api/evals/suites/{suiteId}` | `GET`    | Leta kifurushi maalum                                                                |
| `/api/evals/suites/{suiteId}` | `PUT`    | Badilisha kifurushi maalum (kesi huingizwa upya)                                     |
| `/api/evals/suites/{suiteId}` | `DELETE` | Futa kifurushi maalum na kesi zake                                                   |

### Kuendesha kifurushi

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

Sehemu za hiari:

- `outputs` — `Record<caseId, string>` ya matokeo yaliyokokotolewa mapema. Inapotolewa,
  kiendeshaji **huruka utumaji** na hutoa alama kwa matokeo yaliyohifadhiwa kwenye akiba pekee
  (inafaa kwa tathmini ya nje ya mtandao).
- `compareTarget` — lengo la pili la kuendeshwa sambamba; uendeshaji wote wawili
  hushiriki `runGroupId` iliyozalishwa kwa ajili ya mwonekano wa ulinganishaji wa moja kwa moja.
- `apiKeyId` — ufunguo wa ndani wa API unaotumiwa kuthibitisha simu
  za `/v1/chat/completions` zinazotumwa. Unahitajika wakati `REQUIRE_API_KEY` imewezeshwa.

### Kuunda kifurushi maalum

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

## Mtiririko wa Utekelezaji

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Hutatua mkusanyiko wa majaribio (ulio ndani ya mfumo au maalum).
2. Kwa kila kesi, huunda `Request` kwenda `/v1/chat/completions` yenye
   `messages` za kesi hiyo, `model` iliyotatuliwa, `stream: false`, na `max_tokens: 512`
   (au thamani mbadala iliyowekwa na kesi hiyo).
3. Huita kishughulikiaji cha gumzo moja kwa moja (ndani ya mchakato — bila hatua ya ziada ya HTTP).
4. Hurekodi muda wa kusubiri na huchopoa maandishi kutoka
   `choices[0].message.content` au payload ya Responses-API ya `output[]`.
5. Hupima matokeo yote kupitia `runSuite()`, kisha huyahifadhi kupitia `saveEvalRun()`.

Kesi huendeshwa **kwa mfuatano**. Kwa sasa hakuna bendera ya uendeshaji sambamba.

## Dashibodi

UI inapatikana katika `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Kutoka hapo unaweza:

- Kuvinjari mikusanyiko iliyojumuishwa ndani ya mfumo na ile maalum ukiwa na uhakiki wa kila kesi.
- Kuunda/kuhariri/kufuta mikusanyiko maalum kwa kutumia kiundaji cha kesi.
- Kuchagua lengo (chaguomsingi za mkusanyiko / modeli / mchanganyiko), kwa hiari lengo la pili
  `compareTarget`, kwa hiari ufunguo wa API, kisha kuendesha unapohitaji.
- Kukagua historia ya uendeshaji, kufaulu/kufeli kwa kila kesi, muda wa kusubiri, na matokeo yaliyorekodiwa.
- Kuona kadi ya alama inayosasishwa, iliyojumlishwa katika uendeshaji wa hivi karibuni kwa kila
  wigo wa `(suite, target)`.

## Uhusiano na RFC ya Auto-Assessment

Mfumo mdogo tofauti wa tathmini unapatikana katika `src/domain/assessment/`
(tazama pia [AUTO-COMBO.md](../routing/AUTO-COMBO.md) kwa injini hai ya utoaji alama).
Mfumo huo unalenga injini ya Auto Combo — ukitoa alama kiotomatiki kwa watoa huduma na
modeli ili michanganyiko iweze kujirekebisha wakati mifumo ya juu inaposhindwa. Hutumia kiendesha chake,
kiainishaji chake, na mantiki yake ya utoaji alama.

Mfumo wa Evals uliofafanuliwa hapa ndio **sehemu pana ya majaribio ya matumizi ya jumla**.
Uupendelee kwa mikusanyiko yoyote ya majaribio ya urejeshi, ulinganisho wa A/B,
na majaribio ya msingi kwa kila toleo. Tumia mfumo wa Auto-Assessment unapohitaji
hali ya watoa huduma ya wakati halisi kuathiri maamuzi ya uelekezaji.

## Ujumuishaji wa CI

Kwa sasa hakuna hati maalum ya npm ya `eval:ci`. Kuna njia mbili ikiwa unataka
kuzuia matoleo kulingana na matokeo ya tathmini:

- **Njia ya HTTP**: anzisha seva, tuma ombi kwa `POST /api/evals` lenye
  `suiteId` + `target` zinazojulikana, na uthibitishe `runs[].summary.passRate >= N` katika
  jibu.
- **Njia ya ndani ya mchakato**: leta `runEvalSuiteAgainstTarget()` kutoka
  `@/lib/evals/runtime` kupitia hati, iendeshe dhidi ya DB ya majaribio, na ukague
  `PersistedEvalRun.summary` iliyorejeshwa.

Majaribio yanayohusu njia na historia yanapatikana katika
`tests/unit/evals-route.test.ts` na `tests/unit/evals-history.test.ts`.

## Sehemu za Upanuzi

Mabadiliko ya kawaida na mahali pa kuyafanya:

- **Mkakati mpya wa utoaji alama** — panua blokiti ya `switch (evalCase.expected.strategy)`
  katika `evaluateCase()` (`evalRunner.ts`) na upanue `EvalCaseStrategy` katika
  `src/lib/db/evals.ts` pamoja na `evalCaseBuilderSchema` katika `schemas.ts`.
- **Mkusanyiko mpya uliojumuishwa ndani ya mfumo** — fafanua kitu cha mkusanyiko na uite `registerSuite()` mwishoni
  mwa `evalRunner.ts`. Utagunduliwa kiotomatiki na `listSuites()`.
- **Kuendesha kwa usambamba** — badilisha kitanzi cha mfuatano cha `for` katika
  `runEvalSuiteAgainstTarget()` kuwa `Promise.all` yenye kikomo (kwa sasa hakuna
  udhibiti wa uendeshaji sambamba).
- **Kesi za kutiririsha/kuita zana** — kwa sasa kiendesha hulazimisha `stream: false`.
  Tathmini inayotumia utiririshaji au inayotambua zana itahitaji mabadiliko katika `runtime.ts`
  (rekodi na ujumlishe vipande vya SSE kabla ya kutoa alama).

## Tazama Pia

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — mwongozo wa jumla wa matumizi ya bidhaa
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — rejeleo la mtiririko wa maombi
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — injini ya ukadiriaji ya Auto Combo (wakati halisi)
- Chanzo: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Kiolesura: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
