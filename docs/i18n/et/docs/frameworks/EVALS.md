# Evaluations (Evals) (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Tõeallikas:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute sisaldab üldotstarbelist hindamisraamistikku, mida saate kasutada marsruutimiskonfiguratsioonide, üksikute pakkujate/mudelite või kaasasolevate „golden set“ komplektide võrdlemiseks.
Kasutage seda marsruutimismuudatuste kontrollimiseks, uute pakkujate valideerimiseks ja väljalasete tõkestamiseks
enne nende suunamist tootmisliiklusesse.

Raamistik koosneb järgmistest osadest:

- Puhas käitaja (`src/lib/evals/evalRunner.ts`), mis registreerib mälusisesed
  sisseehitatud komplektid, hindab väljundeid oodatud kriteeriumide alusel ja koondab
  tulemuskaardid.
- Püsivuskiht (`src/lib/db/evals.ts`) kohandatud (kasutaja määratud) komplektide
  ja SQLite'is talletatud varasemate käituste jaoks.
- Orkestreerimiskiht (`src/lib/evals/runtime.ts`), mis käivitab iga juhtumi,
  edastades tegelikud kutsed aadressile `POST /v1/chat/completions`, jäädvustab latentsuse
  ja väljundid ning salvestab käituse.
- REST-lõpp-punktid teekonna `/api/evals/*` all (ainult halduse autentimisega).
- Töölauavaade asukohas `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Mõisted

### Komplekt

Komplekt on nimega testjuhtumite kogum, millel on `description` ja üks või
mitu juhtumit. Komplektid pärinevad kahest allikast:

| Allikas    | Määratlemise koht                                            | Käitusajal muudetav?    |
| ---------- | ------------------------------------------------------------ | ----------------------- |
| `built-in` | Registreeritakse käivitamisel `registerSuite()` kaudu        | Ei (koodis määratletud) |
| `custom`   | Talletatakse SQLite'i tabelites `eval_suites` + `eval_cases` | Jah (API/UI kaudu)      |

Praegused sisseehitatud komplektid (vt `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 lähtejuhtumit tervituse/matemaatika/tõlkimise/ohutuse valdkondadest
- `coding-proficiency` — Python/JS/SQL/TS/vigade tuvastamine
- `reasoning-logic` — süllogismid, tekstülesanded, mustrite tuvastamine
- `multilingual` — tõlkimine ja keele tuvastamine
- `safety-guardrails` — isikuandmed, jailbreak, keeldumine, kallutatuse teadvustamine
- `instruction-following` — ainult JSON, nummerdatud loendid, keelepiirangud
- `codex-comparison` — võrdlusrežiimi jaoks mõeldud vahetud programmeerimisülesanded

### Juhtum

Iga juhtum sisaldab järgmisi välju:

| Väli       | Kirjeldus                                                                  |
| ---------- | -------------------------------------------------------------------------- |
| `id`       | Stabiilne identifikaator (kasutatakse väljundite ja mõõdikute võtmena)     |
| `name`     | Inimloetav silt                                                            |
| `model`    | Vaikemudel, kui käitus kasutab sihtimist `suite-default`                   |
| `input`    | `{ messages, max_tokens? }` — saadetakse aadressile `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — hindamisjuhend (vt allpool)                        |
| `tags`     | Valikulised sildid (nt `safety`, `pii`, `jailbreak`)                       |

### Sihtmärk

Sama komplekti saab käitada erinevate sihtmärkide suhtes. Sihtmärgi skeem on
`evalTargetSchema` failis `src/shared/validation/schemas.ts`:

| Sihtmärgi tüüp  | `id`                | Käitumine                                                                         |
| --------------- | ------------------- | --------------------------------------------------------------------------------- |
| `suite-default` | `null`              | Iga juhtum kasutab oma sisseehitatud välja `model`                                |
| `model`         | mudeli nimi         | Kõik juhtumid sunnitakse läbi ühe otsemudeli (nt `gpt-4o`)                        |
| `combo`         | kombinatsiooni nimi | Kõik juhtumid käitatakse ühe kombinatsiooni kaudu (rakendab marsruutimismootorit) |

Tüüpide `model` ja `combo` korral on väli `id` kohustuslik (seda jõustatakse Zodi
`superRefine` abil). Kui `compareTarget` on määratud, peavad mõlemad sihtmärgid erinema —
käitaja salvestab mõlemad käitused A/B-võrdluse jaoks sama `runGroupId` alla.

## Hindamisreeglid

Rakendatud funktsioonis `evaluateCase()` (evalRunner.ts):

| Strateegia | Läbitud, kui…                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                              |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                            |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` on tõeväärtuseline                             |
| `custom`   | `expected.fn(actualOutput, evalCase)` tagastab tõeväärtuselise väärtuse (ainult sisseehitatud) |

**Märkus:** Kohandatud funktsiooniga hindamine on mõeldud ainult koodis määratletud
(sisseehitatud) komplektidele, sest funktsioone ei saa API kaudu serialiseerida.
`evalCaseBuilderSchema` aktsepteerib kasutaja loodud komplektide puhul ainult
väärtusi `contains | exact | regex`.

Praegu puudub LLM-il põhinev hindaja või embedding'utel põhinev sarnasuse hindaja —
see oleks funktsioonis `evaluateCase()` selge laienduskoht.

## Andmebaasiskeem

Kolm tabelit (migratsioonid `030_create_eval_runs.sql` ja
`031_create_eval_suites.sql`):

| Tabel         | Otstarve                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Kohandatud komplekti metaandmed (`id`, `name`, `description`)                                                                     |
| `eval_cases`  | Komplekti juhtumid — `input_json`, `expected_*`, `tags_json`                                                                      |
| `eval_runs`   | Ajaloolised käitused — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Sisseehitatud komplekte **ei** salvestata andmebaasi. Need asuvad mälus ja
registreeritakse uuesti iga kord, kui `evalRunner.ts` imporditakse.

## REST API

Kõik lõpp-punktid nõuavad halduse autentimist (`requireManagementAuth`) — need ei
kuulu avaliku puhverserveri liidese hulka.

| Lõpp-punkt                    | Meetod   | Kirjeldus                                                                    |
| ----------------------------- | -------- | ---------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Loetleb komplektid, hiljutised käitused, tulemuskaardi, sihtmärgid ja võtmed |
| `/api/evals`                  | `POST`   | Käivitab komplekti (üksik- või võrdluskäivitus) — skeem `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Hangib ühe komplekti (sisseehitatud või kohandatud)                          |
| `/api/evals/suites`           | `POST`   | Loob kohandatud komplekti — skeem `evalSuiteSaveSchema`                      |
| `/api/evals/suites/{suiteId}` | `GET`    | Hangib kohandatud komplekti                                                  |
| `/api/evals/suites/{suiteId}` | `PUT`    | Asendab kohandatud komplekti (juhtumid sisestatakse uuesti)                  |
| `/api/evals/suites/{suiteId}` | `DELETE` | Kustutab kohandatud komplekti ja selle juhtumid                              |

### Komplekti käivitamine

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

Valikulised väljad:

- `outputs` — eelarvutatud väljundite `Record<caseId, string>`. Kui see on antud,
  **jätab käitaja päringu edastamise vahele** ja hindab ainult vahemällu salvestatud
  väljundeid (kasulik võrguühenduseta hindamiseks).
- `compareTarget` — teine sihtmärk paralleelseks käivitamiseks; mõlemad käitused
  jagavad vastastikuseks võrdluseks loodud `runGroupId` väärtust.
- `apiKeyId` — sisemine API-võti, mida kasutatakse edastatud
  `/v1/chat/completions` päringute autentimiseks. Nõutav, kui `REQUIRE_API_KEY`
  on lubatud.

### Kohandatud komplekti loomine

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

## Käivituskonveier

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Lahendab komplekti (sisseehitatud või kohandatud).
2. Koostab iga juhtumi jaoks `Request`-päringu aadressile `/v1/chat/completions`, kasutades juhtumi välju `messages`, lahendatud välja `model`, väärtust `stream: false` ja väärtust `max_tokens: 512` (või juhtumipõhist ülekirjutust).
3. Kutsub vestluse töötleja välja otse (samas protsessis — ilma täiendava HTTP-etapita).
4. Salvestab latentsuse ja eraldab teksti kas väljast `choices[0].message.content` või Responses API `output[]` andmetest.
5. Hindab kõiki väljundeid funktsiooniga `runSuite()` ja salvestab seejärel funktsiooniga `saveEvalRun()`.

Juhtumeid käitatakse **järjestikku**. Praegu puudub paralleelsuse lipp.

## Töölaud

Kasutajaliides asub jaotises `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Seal saate:

- Sirvida sisseehitatud ja kohandatud komplekte koos juhtumipõhise eelvaatega.
- Luua, muuta ja kustutada kohandatud komplekte juhtumikoosturiga.
- Valida sihtmärgi (komplekti vaikeväärtused / mudel / kombinatsioon), soovi korral teise `compareTarget`-sihtmärgi ja API-võtme ning seejärel käivitada hindamise nõudmisel.
- Uurida käivitusajalugu, juhtumipõhiseid õnnestumisi/ebaõnnestumisi, latentsust ja salvestatud väljundeid.
- Vaadata jooksvat tulemuskaarti, mis on koondatud iga `(suite, target)` ulatuse uusima käivituse põhjal.

## Seos automaatse hindamise RFC-ga

Eraldi kitsama ulatusega hindamise alamsüsteem asub kataloogis `src/domain/assessment/`
(vt reaalajas hindamismootori kohta ka [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
See alamsüsteem on suunatud Auto Combo mootorile — pakkujate ja mudelite automaatseks hindamiseks, et kombinatsioonid saaksid end ise parandada, kui ülesvooluteenused ebaõnnestuvad. See kasutab oma käivitajat, kategoriseerijat ja hindamisloogikat.

Siin dokumenteeritud Evals-raamistik on **laiem üldotstarbeline testimispind**. Eelistage seda suvaliste regressioonikomplektide, A/B-võrdluste ja väljalaskepõhiste suitsutestide jaoks. Kasutage automaatse hindamise alamsüsteemi siis, kui vajate, et pakkujate reaalajas seisund mõjutaks marsruutimisotsuseid.

## CI-integratsioon

Praegu puudub spetsiaalne `eval:ci` npm-skript. Kui soovite väljalaskeid hindamistulemuste põhjal piirata, on selleks kaks võimalust:

- **HTTP-tee**: käivitage server, saatke päring `POST /api/evals` teadaolevate väärtustega `suiteId` + `target` ning kontrollige vastuses tingimust `runs[].summary.passRate >= N`.
- **Protsessisisene tee**: importige skriptis `runEvalSuiteAgainstTarget()` moodulist `@/lib/evals/runtime`, käivitage see testiandmebaasi suhtes ja kontrollige tagastatud välja `PersistedEvalRun.summary`.

Marsruuti ja ajalugu katvad testid asuvad failides
`tests/unit/evals-route.test.ts` ja `tests/unit/evals-history.test.ts`.

## Laienduspunktid

Levinud muudatused ja nende tegemise kohad:

- **Uus hindamisstrateegia** — laiendage funktsioonis `evaluateCase()` (`evalRunner.ts`) plokki `switch (evalCase.expected.strategy)` ning tüüpi `EvalCaseStrategy` failis `src/lib/db/evals.ts` ja skeemi `evalCaseBuilderSchema` failis `schemas.ts`.
- **Uus sisseehitatud komplekt** — määratlege komplektiobjekt ja kutsuge faili `evalRunner.ts` lõpus välja `registerSuite()`. Funktsioon `listSuites()` tuvastab selle automaatselt.
- **Paralleelne käivitus** — muutke funktsiooni `runEvalSuiteAgainstTarget()` järjestikune `for`-tsükkel piiratud `Promise.all`-iks (praegu paralleelsuse juhtimine puudub).
- **Voogedastus-/tööriistakutse juhtumid** — praegu sunnib käivitaja kasutama väärtust `stream: false`. Voogedastus või tööriistateadlik hindamine nõuaks muudatusi failis `runtime.ts` (SSE-osade hõivamine ja koondamine enne hindamist).

## Vaata ka

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — toote üldine tutvustus
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — päringutöötluse konveieri viide
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo hindamismootor (reaalajas töökeskkond)
- Lähtekood: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Kasutajaliides: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
