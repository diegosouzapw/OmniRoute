# Evaluations (Evals) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sanningskälla:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute levereras med ett generiskt utvärderingsramverk som du kan använda för att prestandatesta routningskonfigurationer, enskilda leverantörer/modeller eller de medföljande sviterna med referenstestfall ("golden set").
Använd det för att verifiera routningsändringar, validera nya leverantörer och införa kvalitetsgrindar för versioner innan de lanseras i produktionstrafiken.

Ramverket är implementerat som:

- En ren körmotor (`src/lib/evals/evalRunner.ts`) som registrerar inbyggda sviter i minnet, utvärderar utdata mot förväntade kriterier och sammanställer resultatkort.
- Ett beständighetslager (`src/lib/db/evals.ts`) för anpassade (användardefinierade) sviter och historiska körningar i SQLite.
- Ett orkestreringslager (`src/lib/evals/runtime.ts`) som kör varje testfall genom att skicka verkliga anrop till `POST /v1/chat/completions`, registrerar latens och utdata samt sparar körningen.
- REST-slutpunkter under `/api/evals/*` (endast med hanteringsautentisering).
- En instrumentpanelsvy på `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Begrepp

### Svit

En svit är en namngiven samling testfall med en `description` och ett eller flera testfall. Sviter kommer från två källor:

| Källa      | Var den definieras                             | Kan ändras under körning? |
| ---------- | ---------------------------------------------- | ------------------------- |
| `built-in` | Registreras via `registerSuite()` vid uppstart | Nej (definieras i kod)    |
| `custom`   | Lagras i SQLite `eval_suites` + `eval_cases`   | Ja (via API/UI)           |

De aktuella inbyggda sviterna (se `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 grundläggande testfall för hälsningar/matematik/översättning/säkerhet
- `coding-proficiency` — Python/JS/SQL/TS/feldetektering
- `reasoning-logic` — syllogismer, textproblem, mönsterigenkänning
- `multilingual` — översättning och språkidentifiering
- `safety-guardrails` — PII, jailbreak, avvisning, medvetenhet om partiskhet
- `instruction-following` — endast JSON, numrerade listor, språkbegränsningar
- `codex-comparison` — kodningsuppgifter mot varandra avsedda för jämförelseläge

### Testfall

Varje testfall innehåller:

| Fält       | Beskrivning                                                        |
| ---------- | ------------------------------------------------------------------ |
| `id`       | Stabil identifierare (används som nyckel för utdata och mätvärden) |
| `name`     | Människoläsbar etikett                                             |
| `model`    | Standardmodell när körningen använder målet `suite-default`        |
| `input`    | `{ messages, max_tokens? }` — skickas till `/v1/chat/completions`  |
| `expected` | `{ strategy, value }` — bedömningsmatris (se nedan)                |
| `tags`     | Valfria etiketter (t.ex. `safety`, `pii`, `jailbreak`)             |

### Mål

Samma svit kan köras mot olika mål. Målschemat är
`evalTargetSchema` i `src/shared/validation/schemas.ts`:

| Måltyp          | `id`       | Beteende                                                     |
| --------------- | ---------- | ------------------------------------------------------------ |
| `suite-default` | `null`     | Varje testfall använder sitt inbyggda `model`-fält           |
| `model`         | modellnamn | Tvinga varje testfall genom en direktmodell (t.ex. `gpt-4o`) |
| `combo`         | kombonamn  | Kör varje testfall genom en kombo (använder routningsmotorn) |

För `model` och `combo` krävs fältet `id` (framtvingas av Zod
`superRefine`). När `compareTarget` anges måste de båda målen skilja sig åt —
körmotorn sparar båda körningarna under samma `runGroupId` för A/B-jämförelse.

## Bedömningskriterier

Implementerade i `evaluateCase()` (evalRunner.ts):

| Strategi   | Godkänd när…                                                                      |
| ---------- | --------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                 |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`               |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` är sanningsenligt                 |
| `custom`   | `expected.fn(actualOutput, evalCase)` returnerar sanningsenligt (endast inbyggda) |

**Obs!** Bedömning med anpassade funktioner är reserverad för koddefinierade (inbyggda)
sviter eftersom funktioner inte kan serialiseras via API:et.
`evalCaseBuilderSchema` accepterar endast `contains | exact | regex` för
användarskapade sviter.

Det finns för närvarande ingen LLM-som-domare eller likhetsbedömare baserad på
inbäddningar — det skulle vara en naturlig utökningspunkt i `evaluateCase()`.

## Databasschema

Tre tabeller (migreringarna `030_create_eval_runs.sql` och
`031_create_eval_suites.sql`):

| Tabell        | Syfte                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata för anpassade sviter (`id`, `name`, `description`)                                                                       |
| `eval_cases`  | Fall per svit — `input_json`, `expected_*`, `tags_json`                                                                           |
| `eval_runs`   | Historiska körningar — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Inbyggda sviter lagras **inte** i databasen. De finns i minnet och
registreras på nytt varje gång `evalRunner.ts` importeras.

## REST-API

Alla slutpunkter kräver hanteringsautentisering (`requireManagementAuth`) — de
ingår inte i den offentliga proxyytan.

| Slutpunkt                     | Metod    | Beskrivning                                                          |
| ----------------------------- | -------- | -------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Lista sviter + senaste körningar + resultatkort + mål + nycklar      |
| `/api/evals`                  | `POST`   | Kör en svit (enskilt eller jämförande) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Hämta en svit (inbyggd eller anpassad)                               |
| `/api/evals/suites`           | `POST`   | Skapa en anpassad svit — schema `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Hämta en anpassad svit                                               |
| `/api/evals/suites/{suiteId}` | `PUT`    | Ersätt en anpassad svit (fallen infogas på nytt)                     |
| `/api/evals/suites/{suiteId}` | `DELETE` | Ta bort en anpassad svit och dess fall                               |

### Köra en svit

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

Valfria fält:

- `outputs` — `Record<caseId, string>` med förberäknade utdata. När det anges
  **hoppar köraren över dirigeringen** och bedömer endast de cachelagrade utdata
  (användbart för offlineutvärdering).
- `compareTarget` — ett andra mål som körs parallellt; båda körningarna delar
  ett genererat `runGroupId` för direkt jämförelse.
- `apiKeyId` — intern API-nyckel som används för att autentisera de dirigerade
  anropen till `/v1/chat/completions`. Krävs när `REQUIRE_API_KEY` är aktiverat.

### Skapa en anpassad svit

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

## Dispatch-pipeline

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Löser upp sviten (inbyggd eller anpassad).
2. Skapar för varje fall en `Request` till `/v1/chat/completions` med fallets
   `messages`, den fastställda `model`, `stream: false` och `max_tokens: 512`
   (eller fallets åsidosättning).
3. Anropar chattens hanterare direkt (inom processen – inget extra HTTP-anrop).
4. Samlar in latens och extraherar text från antingen `choices[0].message.content`
   eller Responses API:s `output[]`-nyttolast.
5. Poängsätter alla utdata via `runSuite()` och sparar sedan via `saveEvalRun()`.

Fallen körs **sekventiellt**. Det finns för närvarande ingen flagga för samtidighet.

## Kontrollpanel

Gränssnittet finns under `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Därifrån kan du:

- Bläddra bland inbyggda och anpassade sviter med förhandsgranskning fall för fall.
- Skapa, redigera och ta bort anpassade sviter med fallbyggaren.
- Välja ett mål (svitens standardvärden/modell/kombination), eventuellt ett andra
  `compareTarget`, eventuellt en API-nyckel, och sedan köra på begäran.
- Granska körningshistorik, godkänt/underkänt per fall, latens och insamlade utdata.
- Se det löpande resultatkortet aggregerat över den senaste körningen per
  `(suite, target)`-omfång.

## Förhållande till RFC:n för automatisk utvärdering

Ett separat, mer avgränsat utvärderingssystem finns i `src/domain/assessment/`
(se även [AUTO-COMBO.md](../routing/AUTO-COMBO.md) för motorn för poängsättning i realtid).
Det systemet är avsett för Auto Combo-motorn – det poängsätter automatiskt leverantörer och
modeller så att kombinationer kan återhämta sig själva när uppströmsleverantörer slutar fungera. Det använder sin egen körmotor,
sin egen kategoriserare och sin egen poängsättningslogik.

Evals-ramverket som dokumenteras här är den **bredare, generella
testytan**. Föredra det för godtyckliga regressionssviter, A/B-jämförelser
och röktester inför varje utgåva. Använd systemet för automatisk utvärdering när du behöver
leverantörsstatus i realtid för att påverka routningsbeslut.

## CI-integration

Det finns för närvarande inget särskilt `eval:ci`-npm-skript. Det finns två sätt om du vill
villkora utgåvor utifrån utvärderingsresultat:

- **HTTP-vägen**: starta servern, anropa `POST /api/evals` med ett känt
  `suiteId` + `target` och verifiera `runs[].summary.passRate >= N` i
  svaret.
- **Vägen inom processen**: importera `runEvalSuiteAgainstTarget()` från
  `@/lib/evals/runtime` i ett skript, kör mot en testdatabas och kontrollera den
  returnerade `PersistedEvalRun.summary`.

Tester som täcker routen och historiken finns i
`tests/unit/evals-route.test.ts` och `tests/unit/evals-history.test.ts`.

## Utökningspunkter

Vanliga ändringar och var de ska göras:

- **Ny poängsättningsstrategi** – utöka `switch (evalCase.expected.strategy)`-blocket
  i `evaluateCase()` (`evalRunner.ts`) och bredda `EvalCaseStrategy` i
  `src/lib/db/evals.ts` samt `evalCaseBuilderSchema` i `schemas.ts`.
- **Ny inbyggd svit** – definiera ett svitobjekt och anropa `registerSuite()` längst
  ned i `evalRunner.ts`. Den identifieras automatiskt av `listSuites()`.
- **Körning med samtidighet** – ändra den sekventiella `for`-loopen i
  `runEvalSuiteAgainstTarget()` till en begränsad `Promise.all` (det finns för närvarande
  ingen samtidighetskontroll).
- **Fall med strömning/verktygsanrop** – för närvarande tvingar körmotorn fram `stream: false`.
  Strömmande eller verktygsmedveten utvärdering skulle kräva ändringar i `runtime.ts`
  (samla in och aggregera SSE-delar före poängsättning).

## Se även

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — övergripande produktgenomgång
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referens för begärandepipelinen
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — poängsättningsmotor för Auto Combo (aktiv körmiljö)
- Källa: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Gränssnitt: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
