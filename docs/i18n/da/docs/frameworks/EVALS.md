# Evaluations (Evals) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sandhedskilde:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute leveres med et generisk evalueringsframework, som du kan bruge til at benchmarke routingkonfigurationer, individuelle udbydere/modeller eller de medfølgende "golden set"-suiter. Brug det til at verificere routingændringer, validere nye udbydere og kontrollere releases, før de sendes videre til produktionstrafik.

Frameworket er implementeret som:

- En ren runner (`src/lib/evals/evalRunner.ts`), der registrerer indbyggede suiter i hukommelsen, evaluerer output i forhold til forventede kriterier og aggregerer scorekort.
- Et persistenslag (`src/lib/db/evals.ts`) til brugerdefinerede suiter og historiske kørsler i SQLite.
- Et orkestreringslag (`src/lib/evals/runtime.ts`), der udfører hver case ved at sende faktiske kald til `POST /v1/chat/completions`, registrerer latenstid og output samt gemmer kørslen.
- REST-endpoints under `/api/evals/*` (kun med administrationsgodkendelse).
- En dashboardvisning under `Dashboard → Forbrug → Evalueringer` (`EvalsTab.tsx`).

## Begreber

### Suite

En suite er en navngivet samling af testcases med en `description` og en eller flere cases. Suiter kommer fra to kilder:

| Kilde      | Hvor den er defineret                         | Kan ændres under kørsel? |
| ---------- | --------------------------------------------- | ------------------------ |
| `built-in` | Registreret via `registerSuite()` ved opstart | Nej (defineret i kode)   |
| `custom`   | Gemt i SQLite `eval_suites` + `eval_cases`    | Ja (via API/UI)          |

De aktuelle indbyggede suiter (se `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 grundlæggende cases inden for hilsner/matematik/oversættelse/sikkerhed
- `coding-proficiency` — Python/JS/SQL/TS/fejlregistrering
- `reasoning-logic` — syllogismer, tekstopgaver, mønstergenkendelse
- `multilingual` — oversættelse og sprogidentifikation
- `safety-guardrails` — PII, jailbreak, afvisning, bevidsthed om bias
- `instruction-following` — kun JSON, nummererede lister, sprogbegrænsninger
- `codex-comparison` — direkte sammenligning af programmeringsopgaver beregnet til sammenligningstilstand

### Case

Hver case indeholder:

| Felt       | Beskrivelse                                                     |
| ---------- | --------------------------------------------------------------- |
| `id`       | Stabil identifikator (bruges som nøgle til output og målinger)  |
| `name`     | Menneskeligt læsbar etiket                                      |
| `model`    | Standardmodel, når kørslen bruger `suite-default` som mål       |
| `input`    | `{ messages, max_tokens? }` — sendes til `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — bedømmelseskriterier (se nedenfor)      |
| `tags`     | Valgfrie etiketter (f.eks. `safety`, `pii`, `jailbreak`)        |

### Mål

Den samme suite kan køres mod forskellige mål. Målskemaet er `evalTargetSchema` i `src/shared/validation/schemas.ts`:

| Måltype         | `id`      | Adfærd                                                     |
| --------------- | --------- | ---------------------------------------------------------- |
| `suite-default` | `null`    | Hver case bruger sit indbyggede `model`-felt               |
| `model`         | modelnavn | Tving alle cases gennem én direkte model (f.eks. `gpt-4o`) |
| `combo`         | kombonavn | Kør alle cases gennem én combo (afprøver routingmotoren)   |

For `model` og `combo` er feltet `id` påkrævet (håndhæves af Zod `superRefine`). Når `compareTarget` angives, skal de to mål være forskellige — runneren gemmer begge kørsler under samme `runGroupId` med henblik på A/B-sammenligning.

## Bedømmelseskriterier

Implementeret i `evaluateCase()` (evalRunner.ts):

| Strategi   | Bestået, når…                                                         |
| ---------- | --------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                     |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`   |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` er sand               |
| `custom`   | `expected.fn(actualOutput, evalCase)` returnerer sand (kun indbygget) |

**Bemærk:** Bedømmelse med brugerdefinerede funktioner er forbeholdt kodebaserede
(indbyggede) suiter, fordi funktioner ikke kan serialiseres via API'et.
`evalCaseBuilderSchema` accepterer kun `contains | exact | regex` for
brugeroprettede suiter.

Der findes i øjeblikket ingen LLM-som-dommer eller scorer baseret på embedding-lighed — det ville
være et oplagt udvidelsespunkt i `evaluateCase()`.

## Databaseskema

Tre tabeller (migreringerne `030_create_eval_runs.sql` og
`031_create_eval_suites.sql`):

| Tabel         | Formål                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata for brugerdefinerede suiter (`id`, `name`, `description`)                                                              |
| `eval_cases`  | Cases pr. suite — `input_json`, `expected_*`, `tags_json`                                                                       |
| `eval_runs`   | Historiske kørsler — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Indbyggede suiter gemmes **ikke** i databasen. De findes i hukommelsen og
registreres igen, hver gang `evalRunner.ts` importeres.

## REST-API

Alle endpoints kræver administrationsgodkendelse (`requireManagementAuth`) — de er ikke
en del af den offentlige proxyoverflade.

| Endpoint                      | Metode   | Beskrivelse                                                            |
| ----------------------------- | -------- | ---------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Vis suiter + seneste kørsler + scorekort + mål + nøgler                |
| `/api/evals`                  | `POST`   | Kør en suite (enkelt eller sammenligning) — skema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Hent én suite (indbygget eller brugerdefineret)                        |
| `/api/evals/suites`           | `POST`   | Opret en brugerdefineret suite — skema `evalSuiteSaveSchema`           |
| `/api/evals/suites/{suiteId}` | `GET`    | Hent en brugerdefineret suite                                          |
| `/api/evals/suites/{suiteId}` | `PUT`    | Erstat en brugerdefineret suite (cases indsættes igen)                 |
| `/api/evals/suites/{suiteId}` | `DELETE` | Slet en brugerdefineret suite og dens cases                            |

### Kørsel af en suite

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

Valgfrie felter:

- `outputs` — `Record<caseId, string>` med forudberegnede outputs. Når feltet angives,
  **springer kørselssystemet dispatch over** og bedømmer kun de cachelagrede outputs (nyttigt til
  offlineevaluering).
- `compareTarget` — et andet mål, der køres parallelt; begge kørsler deler et
  genereret `runGroupId` til direkte sammenligning.
- `apiKeyId` — intern API-nøgle, der bruges til at godkende de afsendte
  `/v1/chat/completions`-kald. Påkrævet, når `REQUIRE_API_KEY` er aktiveret.

### Oprettelse af en brugerdefineret suite

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

## Afviklingspipeline

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Finder testsamlingen (indbygget eller brugerdefineret).
2. Opretter for hvert testtilfælde en `Request` til `/v1/chat/completions` med testtilfældets
   `messages`, den fundne `model`, `stream: false` og `max_tokens: 512`
   (eller testtilfældets tilsidesættelse).
3. Kalder chat-handleren direkte (i samme proces — uden et ekstra HTTP-hop).
4. Registrerer latenstiden og udtrækker tekst fra enten `choices[0].message.content`
   eller Responses-API'ets `output[]`-payload.
5. Bedømmer alle outputs via `runSuite()` og gemmer derefter via `saveEvalRun()`.

Testtilfælde køres **sekventielt**. Der findes i øjeblikket ikke noget samtidighedsflag.

## Dashboard

Brugergrænsefladen findes under `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Herfra kan du:

- Gennemse indbyggede og brugerdefinerede testsamlinger med forhåndsvisning af hvert testtilfælde.
- Oprette, redigere og slette brugerdefinerede testsamlinger med værktøjet til opbygning af testtilfælde.
- Vælge et mål (testsamlingens standarder / model / kombination), eventuelt et andet
  `compareTarget`, eventuelt en API-nøgle, og derefter køre efter behov.
- Gennemse kørselshistorikken, bestået/ikke bestået for hvert testtilfælde, latenstid og registrerede outputs.
- Se den løbende resultattavle, der er aggregeret på tværs af den seneste kørsel for hvert
  `(suite, target)`-omfang.

## Forholdet til RFC'en om automatisk vurdering

Et separat, mere afgrænset vurderingsundersystem findes i `src/domain/assessment/`
(se også [AUTO-COMBO.md](../routing/AUTO-COMBO.md) for den aktive bedømmelsesmotor).
Dette undersystem er rettet mod Auto Combo-motoren — det bedømmer automatisk udbydere og
modeller, så kombinationer selv kan genetablere sig, når opstrømstjenester svigter. Det bruger sin egen kørsel,
sin egen kategorisering og sin egen bedømmelseslogik.

Evals-frameworket, der er dokumenteret her, er den **bredere testflade til generelle
formål**. Foretræk det til vilkårlige regressionssamlinger, A/B-sammenligninger
og smoke-tests for hver udgivelse. Brug undersystemet til automatisk vurdering, når du har brug for,
at udbydernes tilstand i realtid påvirker routingbeslutninger.

## CI-integration

Der findes i øjeblikket ikke noget dedikeret `eval:ci`-npm-script. Der er to muligheder, hvis du vil
gøre udgivelser afhængige af evalueringsresultater:

- **HTTP-metoden**: Start serveren, send en forespørgsel til `POST /api/evals` med et kendt
  `suiteId` + `target`, og kontrollér, at `runs[].summary.passRate >= N` i
  svaret.
- **Metoden i samme proces**: Importér `runEvalSuiteAgainstTarget()` fra
  `@/lib/evals/runtime` fra et script, kør mod en testdatabase, og kontrollér den
  returnerede `PersistedEvalRun.summary`.

Tests, der dækker routen og historikken, findes i
`tests/unit/evals-route.test.ts` og `tests/unit/evals-history.test.ts`.

## Udvidelsespunkter

Almindelige ændringer, og hvor de skal foretages:

- **Ny bedømmelsesstrategi** — udvid `switch (evalCase.expected.strategy)`-blokken
  i `evaluateCase()` (`evalRunner.ts`), og udvid `EvalCaseStrategy` i
  `src/lib/db/evals.ts` samt `evalCaseBuilderSchema` i `schemas.ts`.
- **Ny indbygget testsamling** — definér et samlingsobjekt, og kald `registerSuite()` nederst
  i `evalRunner.ts`. Det registreres automatisk af `listSuites()`.
- **Kør med samtidighed** — skift den sekventielle `for`-løkke i
  `runEvalSuiteAgainstTarget()` til en begrænset `Promise.all` (der findes i øjeblikket
  ingen samtidighedsstyring).
- **Tilfælde med streaming/værktøjskald** — i øjeblikket gennemtvinger kørselen `stream: false`.
  Streaming eller værktøjsbevidst evaluering kræver ændringer i `runtime.ts`
  (registrér og aggregér SSE-fragmenter før bedømmelse).

## Se også

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — overordnet produktgennemgang
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — reference til request-pipelinen
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo-scoringsmotor (aktiv runtime)
- Kilde: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Brugergrænseflade: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
