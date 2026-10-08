# Evaluations (Evals) (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Tiesos šaltinis:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

„OmniRoute“ pateikiama su bendrąja vertinimo sistema, kurią galite naudoti maršruto parinkimo konfigūracijoms, atskiriems teikėjams ar modeliams arba pridedamiems „auksinio rinkinio“ rinkiniams palyginti. Naudokite ją maršruto parinkimo pakeitimams patikrinti, naujiems teikėjams patvirtinti ir leidimams kontroliuoti prieš nukreipdami į juos produkcinį srautą.

Sistemą sudaro:

- Grynas vykdiklis (`src/lib/evals/evalRunner.ts`), kuris registruoja atmintyje laikomus integruotus rinkinius, vertina išvestis pagal numatytus kriterijus ir apibendrina rezultatų suvestines.
- Išliekamumo sluoksnis (`src/lib/db/evals.ts`), skirtas pasirinktiniams (naudotojų apibrėžtiems) rinkiniams ir istoriniams vykdymams SQLite duomenų bazėje.
- Orkestravimo sluoksnis (`src/lib/evals/runtime.ts`), kuris vykdo kiekvieną atvejį siųsdamas tikras užklausas į `POST /v1/chat/completions`, fiksuoja delsą bei išvestis ir išsaugo vykdymą.
- REST galiniai taškai, pasiekiami adresu `/api/evals/*` (tik su valdymo autentifikavimu).
- Ataskaitų srities rodinys `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Sąvokos

### Rinkinys

Rinkinys yra pavadinta testavimo atvejų kolekcija, turinti `description` ir vieną ar daugiau atvejų. Rinkiniai gaunami iš dviejų šaltinių:

| Šaltinis   | Kur apibrėžta                                   | Ar galima keisti vykdymo metu? |
| ---------- | ----------------------------------------------- | ------------------------------ |
| `built-in` | Paleidžiant registruojama per `registerSuite()` | Ne (apibrėžta kode)            |
| `custom`   | Saugoma SQLite `eval_suites` + `eval_cases`     | Taip (per API / UI)            |

Dabartiniai integruoti rinkiniai (žr. `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 bazinių atvejų, apimančių pasisveikinimą, matematiką, vertimą ir saugą
- `coding-proficiency` — Python / JS / SQL / TS / klaidų aptikimas
- `reasoning-logic` — silogizmai, tekstiniai uždaviniai, dėsningumų atpažinimas
- `multilingual` — vertimas ir kalbos aptikimas
- `safety-guardrails` — asmenį identifikuojanti informacija, apsaugų apėjimas, atsisakymas vykdyti užklausą, šališkumo suvokimas
- `instruction-following` — tik JSON, numeruoti sąrašai, kalbos apribojimai
- `codex-comparison` — tiesioginio palyginimo programavimo užduotys, skirtos palyginimo režimui

### Atvejis

Kiekvienas atvejis turi:

| Laukas     | Aprašas                                                               |
| ---------- | --------------------------------------------------------------------- |
| `id`       | Stabilus identifikatorius (naudojamas išvestims ir metrikoms susieti) |
| `name`     | Žmogui suprantama žyma                                                |
| `model`    | Numatytasis modelis, kai vykdymui naudojama `suite-default` paskirtis |
| `input`    | `{ messages, max_tokens? }` — siunčiama į `/v1/chat/completions`      |
| `expected` | `{ strategy, value }` — vertinimo kriterijai (žr. toliau)             |
| `tags`     | Pasirinktinės žymos (pvz., `safety`, `pii`, `jailbreak`)              |

### Paskirtis

Tą patį rinkinį galima vykdyti su skirtingomis paskirtimis. Paskirties schema yra `evalTargetSchema`, esanti `src/shared/validation/schemas.ts`:

| Paskirties tipas | `id`                | Veikimas                                                                                   |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| `suite-default`  | `null`              | Kiekvienam atvejui naudojamas jo integruotas `model` laukas                                |
| `model`          | modelio pavadinimas | Kiekvienas atvejis priverstinai vykdomas per vieną tiesioginį modelį (pvz., `gpt-4o`)      |
| `combo`          | derinio pavadinimas | Kiekvienas atvejis vykdomas per vieną derinį (taip išbandomas maršruto parinkimo variklis) |

Naudojant `model` ir `combo`, laukas `id` yra privalomas (tai užtikrina Zod `superRefine`). Kai pateikiama `compareTarget`, abi paskirtys turi skirtis — A/B palyginimui vykdiklis išsaugo abu vykdymus su tuo pačiu `runGroupId`.

## Vertinimo kriterijai

Įgyvendinta `evaluateCase()` faile (evalRunner.ts):

| Strategija | Praeina, kai…                                                                       |
| ---------- | ----------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                 |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` yra teisinga reikšmė                |
| `custom`   | `expected.fn(actualOutput, evalCase)` grąžina teisingą reikšmę (tik įtaisytiesiems) |

**Pastaba:** Vertinimas naudojant pasirinktinę funkciją skirtas tik kode apibrėžtiems
(įtaisytiesiems) rinkiniams, nes funkcijų negalima serializuoti per API.
`evalCaseBuilderSchema` naudotojų kuriamiems rinkiniams priima tik
`contains | exact | regex`.

Šiuo metu nėra nei LLM kaip vertintojo, nei įterpiniais pagrįsto panašumo
vertintojo — tai būtų aiškus plėtimo taškas funkcijoje `evaluateCase()`.

## Duomenų bazės schema

Trys lentelės (migracijos `030_create_eval_runs.sql` ir
`031_create_eval_suites.sql`):

| Lentelė       | Paskirtis                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Pasirinktinių rinkinių metaduomenys (`id`, `name`, `description`)                                                                |
| `eval_cases`  | Rinkinio atvejai — `input_json`, `expected_*`, `tags_json`                                                                       |
| `eval_runs`   | Istoriniai vykdymai — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Įtaisytieji rinkiniai duomenų bazėje **nesaugomi**. Jie laikomi atmintyje ir
registruojami iš naujo kaskart importavus `evalRunner.ts`.

## REST API

Visiems galiniams taškams reikalingas valdymo autentifikavimas
(`requireManagementAuth`) — jie nepriklauso viešajam tarpinio serverio
paviršiui.

| Galinis taškas                | Metodas  | Aprašymas                                                                          |
| ----------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Pateikti rinkinių, naujausių vykdymų, rezultatų suvestinės, tikslų ir raktų sąrašą |
| `/api/evals`                  | `POST`   | Vykdyti rinkinį (atskirai arba palyginant) — schema `evalRunSuiteSchema`           |
| `/api/evals/{suiteId}`        | `GET`    | Gauti vieną rinkinį (įtaisytąjį arba pasirinktinį)                                 |
| `/api/evals/suites`           | `POST`   | Sukurti pasirinktinį rinkinį — schema `evalSuiteSaveSchema`                        |
| `/api/evals/suites/{suiteId}` | `GET`    | Gauti pasirinktinį rinkinį                                                         |
| `/api/evals/suites/{suiteId}` | `PUT`    | Pakeisti pasirinktinį rinkinį (atvejai įterpiami iš naujo)                         |
| `/api/evals/suites/{suiteId}` | `DELETE` | Pašalinti pasirinktinį rinkinį ir jo atvejus                                       |

### Rinkinio vykdymas

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

Pasirinktiniai laukai:

- `outputs` — iš anksto apskaičiuotų išvesčių `Record<caseId, string>`. Kai jos
  pateiktos, vykdyklė **praleidžia siuntimą** ir tik įvertina podėlyje saugomas
  išvestis (naudinga vertinant neprisijungus).
- `compareTarget` — antrasis tikslas, vykdomas lygiagrečiai; abu vykdymai turi
  bendrą sugeneruotą `runGroupId`, skirtą tiesioginiam palyginimui.
- `apiKeyId` — vidinis API raktas, naudojamas išsiųstų
  `/v1/chat/completions` užklausų autentifikavimui. Privalomas, kai įjungtas
  `REQUIRE_API_KEY`.

### Pasirinktinio rinkinio kūrimas

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

## Vykdymo konvejeris

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Nustato testų rinkinį (integruotą arba pasirinktinį).
2. Kiekvienam atvejui sukuria `Request` į `/v1/chat/completions`, naudodama atvejo
   `messages`, nustatytą `model`, `stream: false` ir `max_tokens: 512`
   (arba atvejo perrašytą reikšmę).
3. Tiesiogiai iškviečia pokalbių apdorojimo funkciją (tame pačiame procese — be papildomos HTTP užklausos).
4. Užfiksuoja delsą ir išgauna tekstą iš `choices[0].message.content`
   arba Responses API `output[]` naudingojo turinio.
5. Įvertina visas išvestis naudodama `runSuite()`, tada išsaugo per `saveEvalRun()`.

Atvejai vykdomi **nuosekliai**. Šiuo metu lygiagretumo vėliavėlės nėra.

## Valdymo skydelis

Naudotojo sąsają rasite `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Čia galite:

- Naršyti integruotus ir pasirinktinius rinkinius, peržiūrėdami kiekvieną atvejį.
- Kurti, redaguoti ir šalinti pasirinktinius rinkinius naudojant atvejų kūrimo priemonę.
- Pasirinkti tikslą (rinkinio numatytuosius nustatymus / modelį / derinį), pasirinktinai antrą
  `compareTarget`, pasirinktinai API raktą, tada paleisti pagal poreikį.
- Peržiūrėti vykdymų istoriją, kiekvieno atvejo sėkmę ar nesėkmę, delsą ir užfiksuotas išvestis.
- Matyti slenkamąją rezultatų suvestinę, apibendrintą pagal naujausią kiekvienos
  `(suite, target)` apimties vykdymą.

## Ryšys su automatinio vertinimo RFC

Atskira, siauresnė vertinimo posistemė yra `src/domain/assessment/`
(apie veikiančią vertinimo sistemą taip pat žr. [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
Ši posistemė skirta Auto Combo sistemai — ji automatiškai vertina teikėjus ir
modelius, kad deriniai galėtų savaime atsikurti sutrikus išorinėms sistemoms. Ji naudoja savo vykdymo priemonę,
savo kategorijų nustatymo priemonę ir savo vertinimo logiką.

Čia aprašyta Evals sistema yra **platesnė, bendrosios paskirties
testavimo aplinka**. Ją rekomenduojama naudoti savavališkiems regresijos rinkiniams, A/B palyginimams
ir kiekvieno leidimo baziniams patikros testams. Auto-Assessment posistemę naudokite, kai reikia,
kad teikėjų būklė realiuoju laiku darytų įtaką maršruto parinkimo sprendimams.

## CI integracija

Šiuo metu nėra tam skirto `eval:ci` npm scenarijaus. Jei norite
leisti leidimus tik pagal vertinimų rezultatus, galite rinktis vieną iš dviejų būdų:

- **HTTP būdas**: paleiskite serverį, siųskite `POST /api/evals` su žinomais
  `suiteId` + `target` ir atsakyme patikrinkite, ar `runs[].summary.passRate >= N`.
- **Vykdymo tame pačiame procese būdas**: scenarijuje importuokite `runEvalSuiteAgainstTarget()` iš
  `@/lib/evals/runtime`, vykdykite naudodami testinę DB ir patikrinkite grąžintą
  `PersistedEvalRun.summary`.

Maršrutą ir istoriją tikrinantys testai yra
`tests/unit/evals-route.test.ts` ir `tests/unit/evals-history.test.ts`.

## Plėtimo taškai

Dažniausi pakeitimai ir vietos, kuriose juos atlikti:

- **Nauja vertinimo strategija** — išplėskite `switch (evalCase.expected.strategy)`
  bloką funkcijoje `evaluateCase()` (`evalRunner.ts`) ir papildykite `EvalCaseStrategy` faile
  `src/lib/db/evals.ts` bei `evalCaseBuilderSchema` faile `schemas.ts`.
- **Naujas integruotas rinkinys** — apibrėžkite rinkinio objektą ir iškvieskite `registerSuite()`
  failo `evalRunner.ts` apačioje. Jį automatiškai aptiks `listSuites()`.
- **Lygiagretus vykdymas** — pakeiskite nuoseklų `for` ciklą funkcijoje
  `runEvalSuiteAgainstTarget()` į ribotą `Promise.all` (šiuo metu
  lygiagretumo valdymo nėra).
- **Srautiniai / įrankių iškvietimų atvejai** — šiuo metu vykdymo priemonė priverstinai nustato `stream: false`.
  Srautiniam arba įrankius palaikančiam vertinimui reikėtų pakeitimų faile `runtime.ts`
  (prieš vertinimą užfiksuoti ir sujungti SSE dalis).

## Taip pat žr.

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — bendroji produkto naudojimo apžvalga
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — užklausų apdorojimo sekos žinynas
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — „Auto Combo“ vertinimo modulis (veikiantis realiuoju laiku)
- Šaltinis: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Naudotojo sąsaja: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
