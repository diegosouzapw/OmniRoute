# Test Coverage Plan (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇪🇹 [am](../../../am/docs/ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇧🇦 [bs](../../../bs/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ha](../../../ha/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇦🇲 [hy](../../../hy/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ig](../../../ig/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇬🇪 [ka](../../../ka/docs/ops/COVERAGE_PLAN.md) · 🇰🇭 [km](../../../km/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [kn](../../../kn/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ml](../../../ml/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇲🇲 [my](../../../my/docs/ops/COVERAGE_PLAN.md) · 🇳🇵 [ne](../../../ne/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [or](../../../or/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [pa](../../../pa/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇱🇰 [si](../../../si/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇺🇿 [uz](../../../uz/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [yo](../../../yo/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

Laatst bijgewerkt: 2026-06-28

> Status gemeten op 2026-05-13: regels 82,58%, statements 82,58%, functies 84,23%, branches 75,22%. Fasen 1-5 zijn voltooid. De huidige focus ligt op fase 6 (>=85%) en fase 7 (>=90%).

## Uitgangssituatie

Er zijn meerdere dekkingspercentages, afhankelijk van hoe het rapport wordt berekend. Voor de planning is slechts één daarvan bruikbaar.

| Metriek                 | Bereik                                                   | Statements / Regels | Branches | Functies | Opmerkingen                                                    |
| ----------------------- | -------------------------------------------------------- | ------------------: | -------: | -------: | -------------------------------------------------------------- |
| Verouderd               | Oude `npm run test:coverage`                             |              79,42% |   75,15% |   67,94% | Vertekend: telt testbestanden mee en sluit `open-sse` uit      |
| Diagnostisch            | Alleen broncode, exclusief tests en exclusief `open-sse` |              68,16% |   63,55% |   64,06% | Alleen nuttig om `src/**` te isoleren                          |
| Aanbevolen uitgangspunt | Alleen broncode, exclusief tests en inclusief `open-sse` |              82,58% |   75,22% |   84,23% | Dit is het projectbrede uitgangspunt dat moet worden verbeterd |

Het aanbevolen uitgangspunt is het percentage waarop moet worden geoptimaliseerd.

## Regels

- Dekkingsdoelen zijn van toepassing op bronbestanden, niet op `tests/**`.
- `open-sse/**` maakt deel uit van het product en moet binnen het bereik blijven.
- Nieuwe code mag de dekking in gewijzigde onderdelen niet verlagen.
- Geef de voorkeur aan het testen van gedrag en uitkomsten van branches boven implementatiedetails.
- Geef voor `src/lib/db/**` de voorkeur aan tijdelijke SQLite-databases en kleine fixtures boven uitgebreide mocks.

## Huidige commandoset

- `npm run test:coverage`
  - Belangrijkste dekkingsdrempel voor broncode in de unit-testsuite
  - Genereert `text-summary`, `html`, `json-summary` en `lcov`
- `npm run coverage:report`
  - Gedetailleerd rapport per bestand van de meest recente uitvoering
- `npm run test:coverage:legacy`
  - Alleen voor historische vergelijking

## Mijlpalen

| Fase   |                    Doel | Focus                                                                | Status        |
| ------ | ----------------------: | -------------------------------------------------------------------- | ------------- |
| Fase 1 | 60% statements / regels | Snelle verbeteringen en dekking van utilities met laag risico        | ✅ Voltooid   |
| Fase 2 | 65% statements / regels | Fundamenten voor databases en routes                                 | ✅ Voltooid   |
| Fase 3 | 70% statements / regels | Providervalidatie en gebruiksanalyses                                | ✅ Voltooid   |
| Fase 4 | 75% statements / regels | `open-sse`-vertalers en helpers                                      | ✅ Voltooid   |
| Fase 5 | 80% statements / regels | `open-sse`-handlers en executor-branches                             | ✅ Voltooid   |
| Fase 6 | 85% statements / regels | Moeilijkere randgevallen, achterstand in branches en regressiesuites | In uitvoering |
| Fase 7 | 90% statements / regels | Laatste controle, resterende hiaten dichten en strikte verhoging     | In afwachting |

Branches en functies moeten bij elke fase stapsgewijs toenemen, maar het primaire harde doel is statements / regels.

## Hotspots met prioriteit

Deze bestanden hebben momenteel de laagste regeldekking (< 60%) en leveren het beste rendement op voor fasen 6-7. Gegenereerd op basis van `coverage/coverage-summary.json` op 2026-05-13:

| #   | Bestand                                                      | Regels % |
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

Thema's voor fasen 6-7:

- `open-sse/services/compression/**` is het grootste cluster met lage dekking en vormt het grootste deel van de resterende achterstand.
- Batch- en rerank-API-routes (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) hebben tests op handlerniveau nodig.
- Cloudagent-adapters (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) en `tierResolver.ts` hebben scenariotests nodig.
- Documentatie-UI-componenten en `src/mitm/systemCommands.ts` hebben een lagere prioriteit, maar bieden eenvoudige mogelijkheden om de branchdekking te verhogen.

## Uitvoeringschecklist

### Fase 1: 56.95% -> 60%

- [x] Dekkingsmeting corrigeren zodat deze de broncode weerspiegelt in plaats van de testbestanden
- [x] Een verouderd dekkingsscript behouden ter vergelijking
- [x] De nulmeting en hotspots in de repository vastleggen
- [ ] Gerichte tests toevoegen voor hulpprogramma's met een laag risico:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Routetests toevoegen voor:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fase 2: 60% -> 65%

- [ ] Tests met databasekoppeling toevoegen voor:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Branchgedrag afdekken in:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fase 3: 65% -> 70%

- [ ] Tests voor gebruiksanalyses toevoegen voor:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Routetests uitbreiden voor proxybeheer en instellingenbranches

### Fase 4: 70% -> 75%

- [ ] Vertaalhulpfuncties en centrale vertaalpaden afdekken:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fase 5: 75% -> 80%

- [ ] Tests op handlerniveau toevoegen voor:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Branchdekking voor de executor toevoegen voor providerspecifieke authenticatie, nieuwe pogingen en endpoint-overschrijvingen

### Fase 6: 80% -> 85%

- [ ] Meer testsuites voor randgevallen samenvoegen in het hoofdpad voor dekkingsmeting
- [ ] Functiedekking verhogen voor DB-modules met een zwakke dekking van constructors/hulpfuncties
- [ ] Hiaten in de branchdekking dichten in `settings.ts`, `registeredKeys.ts`, `validation.ts` en vertaalhulpfuncties

### Fase 7: 85% -> 90%

- [ ] De resterende bestanden met lage dekking als blokkades behandelen
- [ ] Regressietests toevoegen voor elke niet-afgedekte productiefout die tijdens het traject naar 90% wordt opgelost
- [ ] De dekkingsdrempel in CI pas verhogen nadat de lokale nulmeting gedurende minstens twee opeenvolgende uitvoeringen stabiel is

## Ratchetbeleid

Werk de drempelwaarden voor `npm run test:coverage` alleen bij nadat het project de volgende mijlpaal daadwerkelijk met een comfortabele marge overschrijdt.

**Huidige grens:** `npm run test:coverage` vereist **60 statements / 60 regels / 60 functies / 60 vertakkingen** (de metriek is in Quality-Gates Fase 6A.1 opnieuw vastgesteld — de eerdere uitgangswaarde van 82,58% was kunstmatig hoog omdat testbestanden werden meegeteld en `open-sse` werd uitgesloten). De opdracht `test:coverage:legacy` behoudt de oude 50/50/50-metriek voor historische vergelijking.

Gebruik voor ad-hoccontroles van drempelwaarden op basis van het meest recente rapport:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Aanbevolen ratchetvolgorde (de volgorde is `statements-regels / vertakkingen / functies`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- huidige grens (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Het volgende ratchetdoel is `80/75/78` zodra de vertakkingsdekking gedurende twee opeenvolgende uitvoeringen boven 78% blijft.

## Bekende lacune

De huidige dekkingsopdracht meet de belangrijkste Node-unittestsuite en omvat broncode die van daaruit wordt bereikt, inclusief `open-sse`. Vitest-dekking wordt nog niet samengevoegd tot één uniform rapport. Het is de moeite waard om die samenvoeging later uit te voeren, maar dit vormt geen belemmering om de stijging van 60% naar 80% te beginnen.
