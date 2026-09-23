# Evaluations (Evals) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sannhetskilde:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute leveres med et generisk evalueringsrammeverk du kan bruke til å sammenligne rutingskonfigurasjoner, enkeltleverandører/-modeller eller de medfølgende «golden set»-testpakkene.
Bruk det til å verifisere rutingsendringer, validere nye leverandører og kontrollere lanseringer
før de sendes til produksjonstrafikk.

Rammeverket er implementert som:

- En ren kjører (`src/lib/evals/evalRunner.ts`) som registrerer innebygde testpakker
  i minnet, evaluerer utdata mot forventede kriterier og sammenstiller
  resultatkort.
- Et persistenslag (`src/lib/db/evals.ts`) for egendefinerte (brukerdefinerte) testpakker
  og historiske kjøringer i SQLite.
- Et orkestreringslag (`src/lib/evals/runtime.ts`) som kjører hvert tilfelle
  ved å sende reelle kall til `POST /v1/chat/completions`, registrerer svartid
  og utdata, og lagrer kjøringen.
- REST-endepunkter under `/api/evals/*` (kun administrasjonsautentisering).
- En dashbordvisning under `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Begreper

### Testpakke

En testpakke er en navngitt samling testtilfeller med en `description` og ett eller
flere tilfeller. Testpakker kommer fra to kilder:

| Kilde      | Hvor definert                                 | Kan endres ved kjøring? |
| ---------- | --------------------------------------------- | ----------------------- |
| `built-in` | Registrert via `registerSuite()` ved oppstart | Nei (definert i kode)   |
| `custom`   | Lagret i SQLite `eval_suites` + `eval_cases`  | Ja (via API/UI)         |

De gjeldende innebygde testpakkene (se `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 basistilfeller innen hilsener/matematikk/oversettelse/sikkerhet
- `coding-proficiency` — Python/JS/SQL/TS/feiloppdagelse
- `reasoning-logic` — syllogismer, tekstoppgaver, mønstergjenkjenning
- `multilingual` — oversettelse og språkdeteksjon
- `safety-guardrails` — PII, jailbreak, avvisning, bevissthet om skjevhet
- `instruction-following` — kun JSON, nummererte lister, språkbegrensninger
- `codex-comparison` — direkte sammenligning av kodeoppgaver beregnet for sammenligningsmodus

### Tilfelle

Hvert tilfelle inneholder:

| Felt       | Beskrivelse                                                     |
| ---------- | --------------------------------------------------------------- |
| `id`       | Stabil identifikator (brukes som nøkkel for utdata og målinger) |
| `name`     | Menneskelesbar etikett                                          |
| `model`    | Standardmodell når kjøringen bruker `suite-default` som mål     |
| `input`    | `{ messages, max_tokens? }` — sendes til `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — vurderingskriterier (se nedenfor)       |
| `tags`     | Valgfrie etiketter (f.eks. `safety`, `pii`, `jailbreak`)        |

### Mål

Den samme testpakken kan kjøres mot forskjellige mål. Målskjemaet er
`evalTargetSchema` i `src/shared/validation/schemas.ts`:

| Måltype         | `id`       | Atferd                                                           |
| --------------- | ---------- | ---------------------------------------------------------------- |
| `suite-default` | `null`     | Hvert tilfelle bruker sitt innebygde `model`-felt                |
| `model`         | modellnavn | Tving hvert tilfelle gjennom én direkte modell (f.eks. `gpt-4o`) |
| `combo`         | kombonavn  | Kjør hvert tilfelle gjennom én kombo (tester rutingsmotoren)     |

For `model` og `combo` er `id`-feltet obligatorisk (håndheves av Zod
`superRefine`). Når `compareTarget` er angitt, må målene være forskjellige —
kjøreren lagrer begge kjøringene under samme `runGroupId` for A/B-sammenligning.

## Vurderingskriterier

Implementert i `evaluateCase()` (evalRunner.ts):

| Strategi   | Bestått når…                                                                  |
| ---------- | ----------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                             |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`           |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` er sann                       |
| `custom`   | `expected.fn(actualOutput, evalCase)` returnerer en sann verdi (kun innebygd) |

**Merk:** Vurdering med egendefinerte funksjoner er forbeholdt kodebaserte
(innebygde) testserier fordi funksjoner ikke kan serialiseres gjennom API-et.
`evalCaseBuilderSchema` godtar bare `contains | exact | regex` for
brukeropprettede testserier.

Det finnes per i dag ingen LLM-som-dommer eller vurderingsmekanisme basert på
embedding-likhet — dette ville vært et naturlig utvidelsespunkt i `evaluateCase()`.

## Databaseskjema

Tre tabeller (migreringene `030_create_eval_runs.sql` og
`031_create_eval_suites.sql`):

| Tabell        | Formål                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata for egendefinerte testserier (`id`, `name`, `description`)                                                               |
| `eval_cases`  | Testtilfeller per testserie — `input_json`, `expected_*`, `tags_json`                                                             |
| `eval_runs`   | Historiske kjøringer — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Innebygde testserier lagres **ikke** i databasen. De ligger i minnet og
registreres på nytt hver gang `evalRunner.ts` importeres.

## REST-API

Alle endepunkter krever administrasjonsautentisering (`requireManagementAuth`) — de er ikke
en del av den offentlige proxy-overflaten.

| Endepunkt                     | Metode   | Beskrivelse                                                                     |
| ----------------------------- | -------- | ------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Vis testserier + nylige kjøringer + resultatkort + mål + nøkler                 |
| `/api/evals`                  | `POST`   | Kjør en testserie (enkeltvis eller sammenligning) — skjema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Hent én testserie (innebygd eller egendefinert)                                 |
| `/api/evals/suites`           | `POST`   | Opprett en egendefinert testserie — skjema `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Hent en egendefinert testserie                                                  |
| `/api/evals/suites/{suiteId}` | `PUT`    | Erstatt en egendefinert testserie (testtilfellene settes inn på nytt)           |
| `/api/evals/suites/{suiteId}` | `DELETE` | Slett en egendefinert testserie og tilhørende testtilfeller                     |

### Kjøre en testserie

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

Valgfrie felt:

- `outputs` — `Record<caseId, string>` med forhåndsberegnede utdata. Når dette er oppgitt,
  **hopper kjøreren over videresending** og vurderer bare de hurtigbufrede utdataene (nyttig for
  frakoblet evaluering).
- `compareTarget` — et annet mål som skal kjøres parallelt; begge kjøringene deler en
  generert `runGroupId` for direkte sammenligning.
- `apiKeyId` — intern API-nøkkel som brukes til å autentisere de videresendte
  `/v1/chat/completions`-kallene. Påkrevd når `REQUIRE_API_KEY` er aktivert.

### Opprette en egendefinert testserie

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

## Kjøringsflyt

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Slår opp suiten (innebygd eller egendefinert).
2. Bygger for hvert testtilfelle en `Request` til `/v1/chat/completions` med
   testtilfellets `messages`, den valgte `model`, `stream: false` og
   `max_tokens: 512` (eller testtilfellets overstyring).
3. Kaller chat-håndtereren direkte (i samme prosess – uten et ekstra HTTP-kall).
4. Registrerer responstid og trekker ut tekst fra enten
   `choices[0].message.content` eller Responses-API-ens `output[]`-nyttelast.
5. Poengsetter alle resultater via `runSuite()`, og lagrer dem deretter via
   `saveEvalRun()`.

Testtilfellene kjøres **sekvensielt**. Det finnes ingen innstilling for samtidighet i dag.

## Dashbord

Brukergrensesnittet finnes under `Dashbord → Bruk → Evalueringer`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Derfra kan du:

- Bla gjennom innebygde og egendefinerte suiter med forhåndsvisning av hvert testtilfelle.
- Opprette, redigere og slette egendefinerte suiter med testtilfellebyggeren.
- Velge et mål (suitens standardinnstillinger / modell / kombinasjon), eventuelt et
  ekstra `compareTarget`, eventuelt en API-nøkkel, og deretter kjøre ved behov.
- Inspisere kjøringshistorikk, bestått/ikke bestått per testtilfelle, responstid og registrerte resultater.
- Se det løpende resultatkortet aggregert på tvers av den siste kjøringen for hvert
  `(suite, target)`-omfang.

## Forholdet til RFC-en for automatisk vurdering

Et separat, mer avgrenset vurderingsundersystem finnes i `src/domain/assessment/`
(se også [AUTO-COMBO.md](../routing/AUTO-COMBO.md) for poengmotoren som brukes i produksjon).
Dette undersystemet retter seg mot Auto Combo-motoren – det poengsetter leverandører og
modeller automatisk, slik at kombinasjoner kan reparere seg selv når oppstrømstjenester feiler.
Det bruker sin egen kjører, sin egen kategoriserer og sin egen poenglogikk.

Evalueringsrammeverket som er dokumentert her, er den **bredere testflaten for
generelle formål**. Foretrekk dette for vilkårlige regresjonssuiter, A/B-sammenligninger
og røyktester for hver utgivelse. Bruk undersystemet for automatisk vurdering når du trenger
at leverandørtilstand i sanntid påvirker rutingsbeslutninger.

## CI-integrasjon

Det finnes ikke noe eget `eval:ci`-npm-skript i dag. Du har to alternativer hvis du vil
gjøre utgivelser avhengige av evalueringsresultater:

- **HTTP-metoden**: start serveren, send en forespørsel til `POST /api/evals` med en kjent
  `suiteId` + `target`, og kontroller at `runs[].summary.passRate >= N` i
  svaret.
- **Metoden i samme prosess**: importer `runEvalSuiteAgainstTarget()` fra
  `@/lib/evals/runtime` i et skript, kjør mot en testdatabase, og kontroller den
  returnerte `PersistedEvalRun.summary`.

Tester som dekker ruten og historikken, finnes i
`tests/unit/evals-route.test.ts` og `tests/unit/evals-history.test.ts`.

## Utvidelsespunkter

Vanlige endringer og hvor de skal gjøres:

- **Ny poengstrategi** – utvid `switch (evalCase.expected.strategy)`-blokken
  i `evaluateCase()` (`evalRunner.ts`), og utvid `EvalCaseStrategy` i
  `src/lib/db/evals.ts` samt `evalCaseBuilderSchema` i `schemas.ts`.
- **Ny innebygd suite** – definer et suiteobjekt og kall `registerSuite()` nederst
  i `evalRunner.ts`. Det blir automatisk oppdaget av `listSuites()`.
- **Kjør med samtidighet** – endre den sekvensielle `for`-løkken i
  `runEvalSuiteAgainstTarget()` til en avgrenset `Promise.all` (det finnes ingen
  samtidighetskontroll i dag).
- **Testtilfeller med strømming/verktøykall** – kjøreren fremtvinger for øyeblikket
  `stream: false`. Evaluering som støtter strømming eller verktøy, vil kreve endringer
  i `runtime.ts` (fang opp og aggreger SSE-deler før poengsetting).

## Se også

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — generell produktgjennomgang
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referanse for forespørselsflyten
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — poengberegningsmotor for Auto Combo (aktivt kjøremiljø)
- Kilde: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Brukergrensesnitt: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
