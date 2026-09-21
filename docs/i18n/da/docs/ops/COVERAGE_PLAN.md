# Test Coverage Plan (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇪🇹 [am](../../../am/docs/ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ha](../../../ha/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇦🇲 [hy](../../../hy/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ig](../../../ig/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇬🇪 [ka](../../../ka/docs/ops/COVERAGE_PLAN.md) · 🇰🇭 [km](../../../km/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [kn](../../../kn/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ml](../../../ml/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇲🇲 [my](../../../my/docs/ops/COVERAGE_PLAN.md) · 🇳🇵 [ne](../../../ne/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [or](../../../or/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [pa](../../../pa/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇱🇰 [si](../../../si/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇺🇿 [uz](../../../uz/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [yo](../../../yo/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

Sidst opdateret: 2026-06-28

> Status målt den 2026-05-13: linjer 82.58%, statements 82.58%, funktioner 84.23%, branches 75.22%. Fase 1-5 er fuldført. Det aktuelle fokus er fase 6 (>=85%) og fase 7 (>=90%).

## Baseline

Der er flere dækningsgrader afhængigt af, hvordan rapporten beregnes. Til planlægning er kun én af dem nyttig.

| Måling             | Omfang                                                   | Statements / linjer | Branches | Funktioner | Bemærkninger                                            |
| ------------------ | -------------------------------------------------------- | ------------------: | -------: | ---------: | ------------------------------------------------------- |
| Ældre              | Gammel `npm run test:coverage`                           |              79.42% |   75.15% |     67.94% | For høj: tæller testfiler og udelukker `open-sse`       |
| Diagnostisk        | Kun kildekode, eksklusive tests og eksklusive `open-sse` |              68.16% |   63.55% |     64.06% | Kun nyttig til at isolere `src/**`                      |
| Anbefalet baseline | Kun kildekode, eksklusive tests og inklusive `open-sse`  |              82.58% |   75.22% |     84.23% | Dette er den baseline for hele projektet, der skal øges |

Den anbefalede baseline er det tal, der skal optimeres efter.

## Regler

- Dækningsmål gælder for kildefiler, ikke for `tests/**`.
- `open-sse/**` er en del af produktet og skal fortsat være omfattet.
- Ny kode bør ikke reducere dækningen i berørte områder.
- Foretræk at teste adfærd og udfald af branches frem for implementeringsdetaljer.
- Foretræk midlertidige SQLite-databaser og små fixtures frem for omfattende mocks til `src/lib/db/**`.

## Aktuelt kommandosæt

- `npm run test:coverage`
  - Primær dækningskontrol af kildekoden for enhedstestsuiten
  - Genererer `text-summary`, `html`, `json-summary` og `lcov`
- `npm run coverage:report`
  - Detaljeret rapport fil for fil fra den seneste kørsel
- `npm run test:coverage:legacy`
  - Kun til historisk sammenligning

## Milepæle

| Fase   |                     Mål | Fokus                                                      | Status      |
| ------ | ----------------------: | ---------------------------------------------------------- | ----------- |
| Fase 1 | 60% statements / linjer | Hurtige gevinster og lavrisikodækning af hjælpeværktøjer   | ✅ Fuldført |
| Fase 2 | 65% statements / linjer | Grundlag for database og routes                            | ✅ Fuldført |
| Fase 3 | 70% statements / linjer | Validering af providers og brugsanalyse                    | ✅ Fuldført |
| Fase 4 | 75% statements / linjer | `open-sse`-oversættere og hjælpefunktioner                 | ✅ Fuldført |
| Fase 5 | 80% statements / linjer | `open-sse`-handlers og branches i executor                 | ✅ Fuldført |
| Fase 6 | 85% statements / linjer | Sværere edge cases, branch-gæld og regressionssuiter       | I gang      |
| Fase 7 | 90% statements / linjer | Afsluttende gennemgang, lukning af huller og stram ratchet | Afventer    |

Branches og funktioner bør ratchetes opad med hver fase, men det primære faste mål er statements / linjer.

## Prioriterede fokusområder

Disse filer har i øjeblikket den laveste linjedækning (< 60 %) og giver det bedste udbytte i fase 6-7. Genereret fra `coverage/coverage-summary.json` den 2026-05-13:

| #   | Fil                                                          | Linjer % |
| --- | ------------------------------------------------------------ | -------: |
| 1   | `open-sse/services/compression/validation.ts`                |    7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |    9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |    9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |   10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |   10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |   10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |   11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |   12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |   12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |   12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |   13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |   13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |   13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |   13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |   14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |   14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |   15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |   15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |   16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |   16.66% |

Temaer for fase 6-7:

- `open-sse/services/compression/**` er den tætteste klynge af lav dækning og udgør størstedelen af det resterende underskud.
- API-ruterne til batches og rerank (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) har brug for tests på handlerniveau.
- Cloud agent-adapterne (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) og `tierResolver.ts` har brug for scenarietests.
- Dokumentationskomponenterne til brugergrænsefladen og `src/mitm/systemCommands.ts` har lavere prioritet, men giver lette gevinster i branch-dækningen.

## Tjekliste for udførelse

### Fase 1: 56.95% -> 60%

- [x] Ret dækningsmetrikken, så den afspejler kildekoden i stedet for testfilerne
- [x] Behold et ældre dækningsscript til sammenligning
- [x] Registrer baseline og fokusområder i repositoryet
- [ ] Tilføj fokuserede tests til hjælpefunktioner med lav risiko:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Tilføj rutetests for:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fase 2: 60% -> 65%

- [ ] Tilføj databaseunderstøttede tests for:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Dæk branch-adfærd i:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fase 3: 65% -> 70%

- [ ] Tilføj tests af brugsanalyse for:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Udvid rutedækningen for proxyadministration og indstillingsbranches

### Fase 4: 70% -> 75%

- [ ] Dæk oversætterhjælpefunktioner og centrale oversættelsesforløb:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fase 5: 75% -> 80%

- [ ] Tilføj tests på handlerniveau for:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Tilføj executor-branch-dækning for udbyderspecifik godkendelse, gentagne forsøg og tilsidesættelser af endpoints

### Fase 6: 80% -> 85%

- [ ] Flet flere testsuiter til edge cases ind i det primære dækningsforløb
- [ ] Øg funktionsdækningen for databasemoduler med svag dækning af konstruktører og hjælpefunktioner
- [ ] Luk hullerne i branch-dækningen i `settings.ts`, `registeredKeys.ts`, `validation.ts` og oversætterhjælpefunktionerne

### Fase 7: 85% -> 90%

- [ ] Behandl de resterende filer med lav dækning som blokeringer
- [ ] Tilføj regressionstests for hver udækket produktionsfejl, der rettes under arbejdet mod 90 %
- [ ] Hæv dækningskravet i CI, men først når den lokale baseline er stabil i mindst to på hinanden følgende kørsler

## Ratchet-politik

Opdater kun tærsklerne for `npm run test:coverage`, efter at projektet reelt har overskredet den næste milepæl med en komfortabel margen.

**Aktuel grænse:** `npm run test:coverage` håndhæver **60 statements / 60 lines / 60 functions / 60 branches** (målingen blev justeret i Quality-Gates fase 6A.1 — den tidligere baseline på 82,58 % var kunstigt høj, fordi den medregnede testfiler og udelukkede `open-sse`). Kommandoen `test:coverage:legacy` bevarer den gamle 50/50/50-måling til historisk sammenligning.

Brug følgende til ad hoc-kontrol af tærskler mod den seneste rapport:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Anbefalet ratchet-rækkefølge (rækkefølgen er `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- aktuel grænse (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Det næste ratchet-mål er `80/75/78`, når branch coverage ligger over 78 % i to på hinanden følgende kørsler.

## Kendt mangel

Den nuværende coverage-kommando måler den primære Node-enhedstestsuite og inkluderer kildekode, som nås derfra, herunder `open-sse`. Den sammenfletter endnu ikke Vitest-coverage i én samlet rapport. Det er værd at gøre senere, men det er ikke en blokering for at påbegynde stigningen fra 60 % -> 80 %.
