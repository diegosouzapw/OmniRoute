# Evaluations (Evals) (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sors awtorevoli:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jinkludi qafas ġeneriku ta’ evalwazzjoni li tista’ tuża biex tkejjel il-prestazzjoni ta’
konfigurazzjonijiet tar-routing, fornituri/mudelli individwali, jew is-settijiet ta’ testijiet “golden set”
inklużi. Użah biex tivverifika bidliet fir-routing, tivvalida fornituri ġodda, u tikkontrolla r-rilaxxi
qabel ma tippromwovihom għat-traffiku tal-produzzjoni.

Il-qafas huwa implimentat bħala:

- Runner pur (`src/lib/evals/evalRunner.ts`) li jirreġistra fil-memorja
  s-settijiet ta’ testijiet integrati, jevalwa l-outputs skont il-kriterji mistennija, u jaggrega
  l-iskedi tal-punteġġi.
- Saff ta’ persistenza (`src/lib/db/evals.ts`) għal settijiet ta’ testijiet personalizzati (definiti mill-utent)
  u eżekuzzjonijiet storiċi f’SQLite.
- Saff ta’ orkestrazzjoni (`src/lib/evals/runtime.ts`) li jeżegwixxi kull każ
  billi jibgħat sejħiet reali lil `POST /v1/chat/completions`, jirreġistra l-latenza
  u l-outputs, u jippersisti l-eżekuzzjoni.
- Endpoints REST taħt `/api/evals/*` (għall-awtentikazzjoni tal-ġestjoni biss).
- Interfaċċa fid-dashboard f’`Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Kunċetti

### Sett ta’ testijiet

Sett ta’ testijiet huwa ġabra msemmija ta’ każijiet ta’ test b’`description` u każ wieħed jew
aktar. Is-settijiet ta’ testijiet jiġu minn żewġ sorsi:

| Sors       | Fejn huwa definit                                          | Jista’ jinbidel waqt l-eżekuzzjoni? |
| ---------- | ---------------------------------------------------------- | ----------------------------------- |
| `built-in` | Irreġistrat permezz ta’ `registerSuite()` waqt l-istartjar | Le (definit fil-kodiċi)             |
| `custom`   | Maħżun f’SQLite `eval_suites` + `eval_cases`               | Iva (permezz tal-API/UI)            |

Is-settijiet ta’ testijiet integrati attwali (ara `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 każijiet bażiċi li jkopru tislijiet/matematika/traduzzjoni/sikurezza
- `coding-proficiency` — Python/JS/SQL/TS/sejbien ta’ bugs
- `reasoning-logic` — sillogiżmi, problemi bil-kliem, rikonoxximent ta’ mudelli
- `multilingual` — traduzzjoni u identifikazzjoni tal-lingwa
- `safety-guardrails` — PII, jailbreak, rifjut, għarfien dwar il-preġudizzju
- `instruction-following` — JSON biss, listi nnumerati, restrizzjonijiet lingwistiċi
- `codex-comparison` — kompiti ta’ programmazzjoni mqabbla direttament maħsuba għall-modalità ta’ tqabbil

### Każ

Kull każ jinkludi:

| Kamp       | Deskrizzjoni                                                         |
| ---------- | -------------------------------------------------------------------- |
| `id`       | Identifikatur stabbli (użat bħala ċavetta għall-outputs u l-metriċi) |
| `name`     | Tikketta li tinqara faċilment mill-bniedem                           |
| `model`    | Mudell predefinit meta l-eżekuzzjoni tuża l-immirar `suite-default`  |
| `input`    | `{ messages, max_tokens? }` — mibgħut lil `/v1/chat/completions`     |
| `expected` | `{ strategy, value }` — kriterji tal-punteġġ (ara hawn taħt)         |
| `tags`     | Tikketti fakultattivi (eż. `safety`, `pii`, `jailbreak`)             |

### Mira

L-istess sett ta’ testijiet jista’ jiġi eżegwit kontra miri differenti. L-iskema tal-mira hija
`evalTargetSchema` f’`src/shared/validation/schemas.ts`:

| Tip ta’ mira    | `id`           | Imġiba                                                                      |
| --------------- | -------------- | --------------------------------------------------------------------------- |
| `suite-default` | `null`         | Kull każ juża l-kamp `model` integrat tiegħu                                |
| `model`         | isem il-mudell | Jisforza kull każ jgħaddi minn mudell dirett wieħed (eż. `gpt-4o`)          |
| `combo`         | isem il-combo  | Jeżegwixxi kull każ permezz ta’ combo waħda (jittestja l-magna tar-routing) |

Għal `model` u `combo`, il-kamp `id` huwa obbligatorju (infurzat minn Zod
`superRefine`). Meta jiġi pprovdut `compareTarget`, iż-żewġ miri jridu jkunu differenti —
ir-runner jippersisti ż-żewġ eżekuzzjonijiet taħt l-istess `runGroupId` għal tqabbil A/B.

## Rubriki tal-Punteġġ

Implimentati f’`evaluateCase()` (evalRunner.ts):

| Strateġija | Jgħaddi meta…                                                                 |
| ---------- | ----------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                             |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`           |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` ikun veru                     |
| `custom`   | `expected.fn(actualOutput, evalCase)` jirritorna valur veru (inkorporat biss) |

**Nota:** Il-punteġġ permezz ta’ funzjoni personalizzata huwa riżervat għal suites
definiti fil-kodiċi (inkorporati), għax il-funzjonijiet ma jistgħux jiġu
sserjalizzati permezz tal-API. `evalCaseBuilderSchema` jaċċetta biss
`contains | exact | regex` għal suites maħluqa mill-utent.

Bħalissa ma jeżisti l-ebda evalwatur LLM-as-judge jew evalwatur tax-xebh ibbażat
fuq embeddings — ikun punt ta’ estensjoni nadif f’`evaluateCase()`.

## Skema tad-Database

Tliet tabelli (migrazzjonijiet `030_create_eval_runs.sql` u
`031_create_eval_suites.sql`):

| Tabella       | Għan                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | Metadata tas-suite personalizzata (`id`, `name`, `description`)                                                                      |
| `eval_cases`  | Każijiet għal kull suite — `input_json`, `expected_*`, `tags_json`                                                                   |
| `eval_runs`   | Eżekuzzjonijiet storiċi — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Is-suites inkorporati **mhumiex** maħżuna fid-DB. Dawn jinżammu fil-memorja u
jerġgħu jiġu rreġistrati kull darba li jiġi importat `evalRunner.ts`.

## API REST

L-endpoints kollha jeħtieġu awtentikazzjoni tal-ġestjoni
(`requireManagementAuth`) — mhumiex parti mill-wiċċ tal-proxy pubbliku.

| Endpoint                      | Metodu   | Deskrizzjoni                                                           |
| ----------------------------- | -------- | ---------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Elenka s-suites + eżekuzzjonijiet riċenti + scorecard + miri + ċwievet |
| `/api/evals`                  | `POST`   | Ħaddem suite (waħda jew tqabbil) — skema `evalRunSuiteSchema`          |
| `/api/evals/{suiteId}`        | `GET`    | Ġib suite waħda (inkorporata jew personalizzata)                       |
| `/api/evals/suites`           | `POST`   | Oħloq suite personalizzata — skema `evalSuiteSaveSchema`               |
| `/api/evals/suites/{suiteId}` | `GET`    | Ġib suite personalizzata                                               |
| `/api/evals/suites/{suiteId}` | `PUT`    | Issostitwixxi suite personalizzata (il-każijiet jerġgħu jiddaħħlu)     |
| `/api/evals/suites/{suiteId}` | `DELETE` | Ħassar suite personalizzata u l-każijiet tagħha                        |

### Tħaddim ta’ suite

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

Oqsma fakultattivi:

- `outputs` — `Record<caseId, string>` ta’ outputs ikkalkulati minn qabel. Meta
  jingħata, ir-runner **jaqbeż id-dispatch** u jagħti punteġġ biss lill-outputs
  fil-cache (utli għal evalwazzjoni offline).
- `compareTarget` — it-tieni mira li titħaddem b’mod parallel; iż-żewġ
  eżekuzzjonijiet jaqsmu `runGroupId` iġġenerat għall-wiri ras imb ras.
- `apiKeyId` — ċavetta API interna użata biex tawtentika t-talbiet mibgħuta lil
  `/v1/chat/completions`. Meħtieġa meta `REQUIRE_API_KEY` ikun attivat.

### Ħolqien ta’ suite personalizzata

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

## Pipeline tad-Dispatch

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Jirriżolvi s-suite (inkorporata jew personalizzata).
2. Għal kull każ, jibni `Request` lejn `/v1/chat/completions` bil-`messages` tal-każ,
   il-`model` riżolt, `stream: false`, u `max_tokens: 512`
   (jew il-valur alternattiv tal-każ).
3. Isejjaħ liċ-chat handler direttament (fl-istess proċess — mingħajr qabża HTTP addizzjonali).
4. Jirreġistra l-latenza u jiġbed it-test jew minn `choices[0].message.content`
   jew mill-payload `output[]` tal-Responses API.
5. Jagħti punteġġ lill-outputs kollha permezz ta’ `runSuite()`, imbagħad jippersistihom permezz ta’ `saveEvalRun()`.

Il-każijiet jitħaddmu **sekwenzjalment**. Bħalissa ma jeżisti ebda flag tal-konkorenza.

## Dashboard

L-UI tinsab f’`Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Minn hemm tista’:

- Tibbrawżja suites inkorporati u personalizzati bi preview każ b’każ.
- Toħloq/teditja/tħassar suites personalizzati bil-bennej tal-każijiet.
- Tagħżel target (defaults tas-suite / model / combo), b’mod fakultattiv `compareTarget`
  ieħor, b’mod fakultattiv API key, u mbagħad tħaddmu meta trid.
- Teżamina l-istorja tal-eżekuzzjonijiet, jekk kull każ għaddiex/falliex, il-latenza, u l-outputs irreġistrati.
- Tara l-iscorecard kontinwu aggregat mill-aħħar eżekuzzjoni għal kull ambitu
  `(suite, target)`.

## Relazzjoni mal-RFC tal-Awto-Valutazzjoni

Sottosistema ta’ valutazzjoni separata u aktar speċifika tinsab f’`src/domain/assessment/`
(ara wkoll [AUTO-COMBO.md](../routing/AUTO-COMBO.md) għall-magna tal-punteġġ attiva).
Dik is-sottosistema hija mmirata lejn il-magna Auto Combo — tagħti punteġġ awtomatikament lill-providers u
l-models sabiex il-combos ikunu jistgħu jirkupraw waħedhom meta s-sistemi upstream ifallu. Tuża r-runner,
il-kategorizzatur, u l-loġika tal-punteġġ tagħha stess.

Il-qafas tal-Evals dokumentat hawnhekk huwa s-**superfiċje tal-ittestjar usa’ u
bi skop ġenerali**. Ippreferih għal suites arbitrarji ta’ rigressjoni, paraguni A/B,
u smoke tests għal kull release. Uża s-sottosistema tal-Awto-Valutazzjoni meta jkollok bżonn
li s-saħħa f’ħin reali tal-provider tinfluwenza d-deċiżjonijiet tar-routing.

## Integrazzjoni mas-CI

Bħalissa ma jeżisti ebda script npm dedikat `eval:ci`. Hemm żewġ toroq jekk trid
tiddependi fuq ir-riżultati tal-eval biex tawtorizza r-releases:

- **Permezz ta’ HTTP**: ħaddem is-server, agħmel talba lil `POST /api/evals` b’
  `suiteId` + `target` magħrufa, u vverifika li `runs[].summary.passRate >= N` fir-
  response.
- **Fl-istess proċess**: importa `runEvalSuiteAgainstTarget()` minn
  `@/lib/evals/runtime` minn script, ħaddmu ma’ DB tat-test, u ċċekkja l-
  `PersistedEvalRun.summary` irritornat.

It-tests li jkopru r-route u l-istorja jinsabu f’
`tests/unit/evals-route.test.ts` u `tests/unit/evals-history.test.ts`.

## Punti ta’ Estensjoni

Bidliet komuni u fejn għandek tagħmilhom:

- **Strateġija ġdida tal-punteġġ** — estendi l-blokka `switch (evalCase.expected.strategy)`
  f’`evaluateCase()` (`evalRunner.ts`) u wessa’ `EvalCaseStrategy` f’
  `src/lib/db/evals.ts` flimkien ma’ `evalCaseBuilderSchema` f’`schemas.ts`.
- **Suite inkorporata ġdida** — iddefinixxi oġġett tas-suite u sejjaħ `registerSuite()` fil-
  qiegħ ta’ `evalRunner.ts`. Din tiġi skoperta awtomatikament minn `listSuites()`.
- **Eżekuzzjoni b’konkorrenza** — ibdel il-loop sekwenzjali `for` f’
  `runEvalSuiteAgainstTarget()` b’`Promise.all` limitat (bħalissa ma jeżisti
  ebda kontroll tal-konkorenza).
- **Każijiet ta’ streaming/tool-call** — bħalissa r-runner jisforza `stream: false`.
  Evalwazzjoni konxja tal-streaming jew tal-għodod tkun teħtieġ bidliet f’`runtime.ts`
  (irreġistra u aggrega l-biċċiet SSE qabel tagħti l-punteġġ).

## Ara Wkoll

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — gwida ġenerali tal-prodott
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referenza għall-pipeline tat-talbiet
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — magna ta’ punteġġ Auto Combo (runtime attiv)
- Sors: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Interfaċċa tal-utent: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
