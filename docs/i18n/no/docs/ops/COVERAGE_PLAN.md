# Test Coverage Plan (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇪🇹 [am](../../../am/docs/ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ha](../../../ha/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇦🇲 [hy](../../../hy/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ig](../../../ig/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇬🇪 [ka](../../../ka/docs/ops/COVERAGE_PLAN.md) · 🇰🇭 [km](../../../km/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [kn](../../../kn/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ml](../../../ml/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇲🇲 [my](../../../my/docs/ops/COVERAGE_PLAN.md) · 🇳🇵 [ne](../../../ne/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [or](../../../or/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [pa](../../../pa/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇱🇰 [si](../../../si/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇺🇿 [uz](../../../uz/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [yo](../../../yo/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

Sist oppdatert: 2026-06-28

> Status målt 2026-05-13: linjer 82.58%, setninger 82.58%, funksjoner 84.23%, grener 75.22%. Fase 1–5 er fullført. Nåværende fokus er fase 6 (>=85%) og fase 7 (>=90%).

## Utgangspunkt

Det finnes flere dekningstall, avhengig av hvordan rapporten beregnes. For planlegging er bare ett av dem nyttig.

| Måling                | Omfang                                        | Setninger / linjer | Grener | Funksjoner | Merknader                                                      |
| --------------------- | --------------------------------------------- | -----------------: | -----: | ---------: | -------------------------------------------------------------- |
| Eldre                 | Gammel `npm run test:coverage`                |             79.42% | 75.15% |     67.94% | Oppblåst: teller testfiler og utelater `open-sse`              |
| Diagnostisk           | Kun kildekode, uten tester og uten `open-sse` |             68.16% | 63.55% |     64.06% | Bare nyttig for å isolere `src/**`                             |
| Anbefalt utgangspunkt | Kun kildekode, uten tester og med `open-sse`  |             82.58% | 75.22% |     84.23% | Dette er utgangspunktet som skal forbedres for hele prosjektet |

Det anbefalte utgangspunktet er tallet det skal optimaliseres mot.

## Regler

- Dekningsmål gjelder kildefiler, ikke `tests/**`.
- `open-sse/**` er en del av produktet og må fortsatt være inkludert.
- Ny kode skal ikke redusere dekningen i berørte områder.
- Foretrekk å teste atferd og resultater fra ulike grener fremfor implementasjonsdetaljer.
- Foretrekk midlertidige SQLite-databaser og små testdatasett fremfor omfattende etterligninger for `src/lib/db/**`.

## Gjeldende kommandosett

- `npm run test:coverage`
  - Hovedkontroll for kildekodedekning i enhetstestsamlingen
  - Genererer `text-summary`, `html`, `json-summary` og `lcov`
- `npm run coverage:report`
  - Detaljert rapport fil for fil fra den siste kjøringen
- `npm run test:coverage:legacy`
  - Kun for historisk sammenligning

## Milepæler

| Fase   |                    Mål | Fokus                                                       | Status      |
| ------ | ---------------------: | ----------------------------------------------------------- | ----------- |
| Fase 1 | 60% setninger / linjer | Raske forbedringer og lavrisikodekning av hjelpeverktøy     | ✅ Fullført |
| Fase 2 | 65% setninger / linjer | Grunnlag for database og ruter                              | ✅ Fullført |
| Fase 3 | 70% setninger / linjer | Leverandørvalidering og bruksanalyse                        | ✅ Fullført |
| Fase 4 | 75% setninger / linjer | `open-sse`-oversettere og hjelpefunksjoner                  | ✅ Fullført |
| Fase 5 | 80% setninger / linjer | `open-sse`-håndterere og eksekveringsgrener                 | ✅ Fullført |
| Fase 6 | 85% setninger / linjer | Vanskeligere grensetilfeller, grengjeld og regresjonstester | Pågår       |
| Fase 7 | 90% setninger / linjer | Siste gjennomgang, lukking av hull og streng opptrapping    | Venter      |

Dekningen av grener og funksjoner skal økes trinnvis med hver fase, men det primære, absolutte målet er setninger / linjer.

## Prioriterte fokusområder

Disse filene har den laveste linjedekningen i dag (< 60 %) og gir best uttelling i fase 6–7. Generert fra `coverage/coverage-summary.json` 2026-05-13:

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

Temaer for fase 6–7:

- `open-sse/services/compression/**` er den tetteste klyngen med lav dekning og står for størstedelen av det gjenværende gapet.
- API-ruter for batch og omrangering (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) trenger tester på håndterernivå.
- Adaptere for skyagenter (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) og `tierResolver.ts` trenger scenariotester.
- Komponenter i dokumentasjonsgrensesnittet og `src/mitm/systemCommands.ts` har lavere prioritet, men gir enkle gevinster i grendekning.

## Sjekkliste for gjennomføring

### Fase 1: 56.95% -> 60%

- [x] Korriger dekningsmålingen slik at den gjenspeiler kildekoden i stedet for testfilene
- [x] Behold et eldre dekningsskript for sammenligning
- [x] Registrer grunnlinjen og fokusområdene i repositoriet
- [ ] Legg til målrettede tester for verktøy med lav risiko:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Legg til rutetester for:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fase 2: 60% -> 65%

- [ ] Legg til databasebaserte tester for:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Dekk grenoppførsel i:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fase 3: 65% -> 70%

- [ ] Legg til tester for bruksanalyse for:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Utvid rutedekningen for proxyadministrasjon og innstillingsgrener

### Fase 4: 70% -> 75%

- [ ] Dekk hjelpefunksjoner for oversettelse og sentrale oversettelsesflyter:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fase 5: 75% -> 80%

- [ ] Legg til tester på håndterernivå for:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Legg til grendekning i eksekveringslaget for leverandørspesifikk autentisering, nye forsøk og overstyring av endepunkter

### Fase 6: 80% -> 85%

- [ ] Slå sammen flere tester av grensetilfeller inn i hovedflyten for dekning
- [ ] Øk funksjonsdekningen for databasemoduler med svak dekning av konstruktører og hjelpefunksjoner
- [ ] Lukk hull i grendekningen i `settings.ts`, `registeredKeys.ts`, `validation.ts` og hjelpefunksjonene for oversettelse

### Fase 7: 85% -> 90%

- [ ] Behandle de gjenværende filene med lav dekning som blokkeringer
- [ ] Legg til regresjonstester for hver produksjonsfeil som avdekkes og rettes under arbeidet mot 90 %
- [ ] Hev dekningskravet i CI først etter at den lokale grunnlinjen har vært stabil i minst to påfølgende kjøringer

## Ratchet-policy

Oppdater tersklene for `npm run test:coverage` først etter at prosjektet faktisk har passert neste milepæl med en komfortabel margin.

**Gjeldende terskel:** `npm run test:coverage` krever **60 setninger / 60 linjer / 60 funksjoner / 60 grener** (målemetoden ble justert i Quality-Gates fase 6A.1 — den tidligere grunnlinjen på 82.58% var kunstig høy fordi den telte testfiler og utelot `open-sse`). Kommandoen `test:coverage:legacy` beholder den gamle målemetoden på 50/50/50 for historisk sammenligning.

Bruk følgende for frittstående terskelkontroller mot den nyeste rapporten:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Anbefalt ratchet-sekvens (rekkefølgen er `setninger-linjer / grener / funksjoner`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- gjeldende terskel (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Neste ratchet-mål er `80/75/78` når grendekningen holder seg over 78% i to påfølgende kjøringer.

## Kjent mangel

Den gjeldende dekningskommandoen måler den primære Node-enhetstestsamlingen og inkluderer kildekode som nås fra den, inkludert `open-sse`. Den slår foreløpig ikke sammen Vitest-dekning til én samlet rapport. Denne sammenslåingen er verdt å gjøre senere, men den er ikke til hinder for å starte økningen fra 60% til 80%.
