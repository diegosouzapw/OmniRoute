# Evaluations (Evals) (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Foinse na fírinne:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Nuashonrú is déanaí:** 2026-06-28 — v3.8.40

Tagann creat cineálach meastóireachta le OmniRoute ar féidir leat é a úsáid chun cumraíochtaí ródaithe, soláthraithe/samhlacha aonair, nó na tacair chuachta "golden set" a thagarmharcáil. Úsáid é chun athruithe ródaithe a fhíorú, soláthraithe nua a bhailíochtú, agus eisiúintí a rialú sula gcuirtear chun cinn iad chuig trácht táirgeachta.

Cuirtear an creat i bhfeidhm mar seo a leanas:

- Riteoir íon (`src/lib/evals/evalRunner.ts`) a chláraíonn tacair ionsuite sa chuimhne, a dhéanann aschuir a mheas de réir na gcritéar a bhfuiltear ag súil leo, agus a chomhiomlánaíonn scórchártaí.
- Sraith mharthanachta (`src/lib/db/evals.ts`) le haghaidh tacair shaincheaptha (arna sainiú ag an úsáideoir) agus rití stairiúla in SQLite.
- Sraith cheolfhoirneoireachta (`src/lib/evals/runtime.ts`) a ritheann gach cás trí fhíorghlaonna a sheoladh chuig `POST /v1/chat/completions`, a ghabhann aga folaigh agus aschuir, agus a bhuanaíonn an rith.
- Críochphointí REST faoi `/api/evals/*` (fíordheimhniú bainistíochta amháin).
- Comhéadan deaise ag `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Coincheapa

### Tacar

Is éard is tacar ann ná bailiúchán ainmnithe de chásanna tástála a bhfuil `description` agus cás amháin nó níos mó aige. Tagann tacair ó dhá fhoinse:

| Foinse     | An áit a sainítear é                             | Inathraithe ag am rite?   |
| ---------- | ------------------------------------------------ | ------------------------- |
| `built-in` | Cláraithe trí `registerSuite()` ag an tosú       | Ní hea (sainithe sa chód) |
| `custom`   | Stóráilte in SQLite `eval_suites` + `eval_cases` | Is ea (trí API/UI)        |

Na tacair ionsuite atá ann faoi láthair (féach `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 gcás bonnlíne a chuimsíonn beannú/matamaitic/aistriúchán/sábháilteacht
- `coding-proficiency` — Python/JS/SQL/TS/aimsiú fabhtanna
- `reasoning-logic` — siollógachtaí, fadhbanna focal, aithint patrún
- `multilingual` — aistriúchán agus brath teanga
- `safety-guardrails` — PII, jailbreak, diúltú, feasacht ar chlaontacht
- `instruction-following` — JSON amháin, liostaí uimhrithe, srianta teanga
- `codex-comparison` — tascanna códúcháin duine le duine atá ceaptha don mhód comparáide

### Cás

Tá na nithe seo a leanas i ngach cás:

| Réimse     | Cur síos                                                                     |
| ---------- | ---------------------------------------------------------------------------- |
| `id`       | Aitheantóir cobhsaí (úsáidtear é mar eochair d'aschuir agus do mhéadrachtaí) |
| `name`     | Lipéad atá inléite ag daoine                                                 |
| `model`    | Samhail réamhshocraithe nuair a úsáideann an rith spriocadh `suite-default`  |
| `input`    | `{ messages, max_tokens? }` — seolta chuig `/v1/chat/completions`            |
| `expected` | `{ strategy, value }` — rúibric scórála (féach thíos)                        |
| `tags`     | Lipéid roghnacha (m.sh. `safety`, `pii`, `jailbreak`)                        |

### Sprioc

Is féidir an tacar céanna a rith i gcoinne spriocanna éagsúla. Is é
`evalTargetSchema` in `src/shared/validation/schemas.ts` scéimre na sprice:

| Cineál sprice   | `id`          | Iompar                                                                            |
| --------------- | ------------- | --------------------------------------------------------------------------------- |
| `suite-default` | `null`        | Úsáideann gach cás a réimse ionsuite `model`                                      |
| `model`         | ainm samhla   | Cuir gach cás trí shamhail dhíreach amháin (m.sh. `gpt-4o`)                       |
| `combo`         | ainm teaglama | Rith gach cás trí theaglama amháin (cuireann sé an t-inneall ródaithe i bhfeidhm) |

I gcás `model` agus `combo`, tá an réimse `id` riachtanach (arna fhorfheidhmiú ag Zod `superRefine`). Nuair a chuirtear `compareTarget` ar fáil, ní mór don dá sprioc a bheith éagsúil — buanaíonn an riteoir an dá rith faoin `runGroupId` céanna le haghaidh comparáid A/B.

## Rúibricí Scórála

Curtha i bhfeidhm in `evaluateCase()` (evalRunner.ts):

| Straitéis  | Éiríonn leis nuair…                                                         |
| ---------- | --------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                           |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`         |
| `regex`    | Bíonn `new RegExp(expected.value).test(actualOutput)` fíor                  |
| `custom`   | Filleann `expected.fn(actualOutput, evalCase)` luach fíor (ionsuite amháin) |

**Nóta:** Tá scóráil le feidhm shaincheaptha curtha in áirithe do shraith
atá sainithe i gcód (ionsuite), toisc nach féidir feidhmeanna a shrathú tríd an API.
Ní ghlacann `evalCaseBuilderSchema` ach le `contains | exact | regex` i gcás
sraitheanna arna gcruthú ag úsáideoirí.

Níl aon LLM mar mholtóir ná aon scórálaí cosúlachta bunaithe ar leabú ann faoi láthair — bheadh sé
ina phointe sínte glan in `evaluateCase()`.

## Scéimre an Bhunachair Sonraí

Trí thábla (ascnaimh `030_create_eval_runs.sql` agus
`031_create_eval_suites.sql`):

| Tábla         | Cuspóir                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Meiteashonraí sraithe saincheaptha (`id`, `name`, `description`)                                                            |
| `eval_cases`  | Cásanna de réir sraithe — `input_json`, `expected_*`, `tags_json`                                                           |
| `eval_runs`   | Rith stairiúil — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ní stóráiltear sraitheanna ionsuite sa DB. Coinnítear sa chuimhne iad agus
athchláraítear iad gach uair a iompórtáiltear `evalRunner.ts`.

## REST API

Éilíonn gach críochphointe fíordheimhniú bainistíochta (`requireManagementAuth`) — ní cuid
den dromchla seachfhreastalaí poiblí iad.

| Críochphointe                 | Modh     | Cur síos                                                                         |
| ----------------------------- | -------- | -------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Liostaigh sraitheanna + riteanna le déanaí + scórchárta + spriocanna + eochracha |
| `/api/evals`                  | `POST`   | Rith sraith (aonair nó comparáid) — scéimre `evalRunSuiteSchema`                 |
| `/api/evals/{suiteId}`        | `GET`    | Faigh sraith amháin (ionsuite nó saincheaptha)                                   |
| `/api/evals/suites`           | `POST`   | Cruthaigh sraith shaincheaptha — scéimre `evalSuiteSaveSchema`                   |
| `/api/evals/suites/{suiteId}` | `GET`    | Faigh sraith shaincheaptha                                                       |
| `/api/evals/suites/{suiteId}` | `PUT`    | Ionadaigh sraith shaincheaptha (cuirtear cásanna isteach arís)                   |
| `/api/evals/suites/{suiteId}` | `DELETE` | Scrios sraith shaincheaptha agus a cásanna                                       |

### Sraith a rith

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

Réimsí roghnacha:

- `outputs` — `Record<caseId, string>` d'aschuir réamhríofa. Nuair a sholáthraítear é,
  **scipeálann an riteoir an seoladh** agus ní dhéanann sé ach na haschuir i dtaisce a scóráil (úsáideach le haghaidh
  meastóireacht as líne).
- `compareTarget` — an dara sprioc le rith go comhthreomhar; roinneann an dá rith
  `runGroupId` ginte chun iad a fheiceáil taobh le taobh.
- `apiKeyId` — eochair API inmheánach a úsáidtear chun na glaonna
  `/v1/chat/completions` a sheoltar a fhíordheimhniú. Tá sí riachtanach nuair atá `REQUIRE_API_KEY` cumasaithe.

### Sraith shaincheaptha a chruthú

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

## Píblíne Seolta

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Réitíonn sé an tsraith (ionsuite nó saincheaptha).
2. I gcás gach cáis, cruthaíonn sé `Request` chuig `/v1/chat/completions` le
   `messages` na cáis, an `model` réitithe, `stream: false`, agus `max_tokens: 512`
   (nó sárú na cáis).
3. Glaonn sé an láimhseálaí comhrá go díreach (sa phróiseas — gan léim HTTP bhreise).
4. Gabhann sé an fhoighne agus baineann sé téacs as `choices[0].message.content`
   nó as pálasta `output[]` Responses-API.
5. Scórálann sé gach aschur trí `runSuite()`, ansin déanann sé iad a bhuanú trí `saveEvalRun()`.

Ritear cásanna **go seicheamhach**. Níl aon bhratach chomhthreomharaíochta ann faoi láthair.

## Deais

Tá an Chomhéadain suite ag `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). As sin, is féidir
leat:

- Brabhsáil trí shraitheanna ionsuite agus saincheaptha le réamhamharc ar gach cás.
- Sraitheanna saincheaptha a chruthú/a chur in eagar/a scriosadh le tógálaí na gcásanna.
- Sprioc a roghnú (réamhshocruithe na sraithe / samhail / teaglaim), an dara
  `compareTarget` a roghnú go roghnach, eochair API a roghnú go roghnach, agus ansin rith ar éileamh.
- Stair na ritheanna, pas/teip gach cáis, foighne, agus aschuir ghabhtha a iniúchadh.
- An scórchárta atrátha a fheiceáil, atá comhiomlánaithe thar an rith is déanaí de réir
  raon `(suite, target)`.

## An Gaol leis an RFC um Uathmheasúnú

Tá fochóras measúnaithe ar leith, níos cúinge, suite ag `src/domain/assessment/`
(féach freisin [AUTO-COMBO.md](../routing/AUTO-COMBO.md) don inneall scórála beo).
Díríonn an fochóras sin ar inneall Auto Combo — soláthraithe agus samhlacha a scóráil
go huathoibríoch ionas gur féidir le teaglamaí iad féin a dheisiú nuair a theipeann ar
sheirbhísí réamhtheachtacha. Úsáideann sé a riteoir féin, a chatagóiritheoir féin, agus
a loighic scórála féin.

Is é creat Evals a dhoiciméadaítear anseo an **dromchla tástála níos leithne,
ilchuspóireach**. B’fhearr é a úsáid le haghaidh sraitheanna cúlchéimnithe treallacha,
comparáidí A/B, agus tástálacha deataigh do gach eisiúint. Úsáid an fochóras
Uathmheasúnaithe nuair is gá do shláinte fíor-ama soláthraithe tionchar a imirt ar
chinntí ródaithe.

## Comhtháthú CI

Níl aon script tiomnaithe npm `eval:ci` ann faoi láthair. Tá dhá bhealach ann más mian
leat eisiúintí a bhac bunaithe ar thorthaí eval:

- **Conair HTTP**: cuir an freastalaí ar bun, seol iarratas chuig `POST /api/evals` le
  `suiteId` + `target` aitheanta, agus deimhnigh `runs[].summary.passRate >= N` sa
  fhreagra.
- **Conair sa phróiseas**: iompórtáil `runEvalSuiteAgainstTarget()` ó
  `@/lib/evals/runtime` ó script, rith é in aghaidh DB tástála, agus seiceáil an
  `PersistedEvalRun.summary` a sheoltar ar ais.

Tá na tástálacha a chlúdaíonn an bealach agus an stair suite ag
`tests/unit/evals-route.test.ts` agus `tests/unit/evals-history.test.ts`.

## Pointí Sínte

Athruithe coitianta agus na háiteanna lena ndéanamh:

- **Straitéis scórála nua** — sín bloc `switch (evalCase.expected.strategy)`
  in `evaluateCase()` (`evalRunner.ts`) agus leathnaigh `EvalCaseStrategy` in
  `src/lib/db/evals.ts` mar aon le `evalCaseBuilderSchema` in `schemas.ts`.
- **Sraith ionsuite nua** — sainigh oibiacht sraithe agus glaoigh ar `registerSuite()` ag
  bun `evalRunner.ts`. Déanfaidh `listSuites()` í a aimsiú go huathoibríoch.
- **Rith le comhthreomharaíocht** — athraigh an lúb sheicheamhach `for` in
  `runEvalSuiteAgainstTarget()` go `Promise.all` teoranta (níl aon rialú
  comhthreomharaíochta ann faoi láthair).
- **Cásanna sruthaithe/glao-uirlise** — faoi láthair cuireann an riteoir `stream: false`
  i bhfeidhm. Bheadh athruithe in `runtime.ts` de dhíth chun meastóireacht sruthaithe
  nó meastóireacht atá feasach ar uirlisí a dhéanamh (smutáin SSE a ghabháil agus a
  chomhiomlánú roimh an scóráil).

## Féach Chomh Maith

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — treoir iomlán don táirge
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — tagairt do phíblíne na n-iarratas
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — inneall scórála Auto Combo (am rite beo)
- Foinse: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Comhéadan úsáideora: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
