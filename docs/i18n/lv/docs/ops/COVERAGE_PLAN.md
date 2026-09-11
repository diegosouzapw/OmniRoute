# COVERAGE_PLAN (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "Testu pārklājuma plāns"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Testu pārklājuma plāns

Pēdējo reizi atjaunināts: 2026-06-28

> Statuss, mērīts 2026-05-13: rindu pārklājums 82.58%, priekšrakstu pārklājums 82.58%, funkciju pārklājums 84.23%, atzarojumu pārklājums 75.22%. 1.–5. fāze ir pabeigta. Pašlaik galvenā uzmanība tiek pievērsta 6. fāzei (>=85%) un 7. fāzei (>=90%).

## Bāzlīnija

Atkarībā no tā, kā tiek aprēķināts pārskats, ir pieejami vairāki pārklājuma rādītāji. Plānošanai noderīgs ir tikai viens no tiem.

| Rādītājs            | Tvērums                                               | Priekšraksti / rindas | Atzarojumi | Funkcijas | Piezīmes                                                         |
| ------------------- | ----------------------------------------------------- | --------------------: | ---------: | --------: | ---------------------------------------------------------------- |
| Mantotais           | Vecā `npm run test:coverage`                          |                79.42% |     75.15% |    67.94% | Mākslīgi palielināts: ietver testu failus un neietver `open-sse` |
| Diagnostikas        | Tikai pirmkods, izņemot testus un `open-sse`          |                68.16% |     63.55% |    64.06% | Noderīgs tikai `src/**` izolēšanai                               |
| Ieteicamā bāzlīnija | Tikai pirmkods, izņemot testus un ietverot `open-sse` |                82.58% |     75.22% |    84.23% | Šī ir visa projekta bāzlīnija, kas jāuzlabo                      |

Ieteicamā bāzlīnija ir rādītājs, uz kuru jāorientē optimizācija.

## Noteikumi

- Pārklājuma mērķi attiecas uz pirmkoda failiem, nevis uz `tests/**`.
- `open-sse/**` ir produkta daļa, un tam ir jāpaliek tvērumā.
- Jaunais kods nedrīkst samazināt pārklājumu mainītajās jomās.
- Priekšroka dodama uzvedības un atzarojumu rezultātu testēšanai, nevis ieviešanas detaļām.
- `src/lib/db/**` vajadzībām priekšroka dodama pagaidu SQLite datubāzēm un maziem fiktīviem datiem, nevis plašai imitāciju izmantošanai.

## Pašreizējais komandu kopums

- `npm run test:coverage`
  - Galvenais pirmkoda pārklājuma pārbaudes nosacījums vienību testu kopai
  - Ģenerē `text-summary`, `html`, `json-summary` un `lcov`
- `npm run coverage:report`
  - Detalizēts pārskats par katru failu no jaunākās izpildes
- `npm run test:coverage:legacy`
  - Izmantojams tikai vēsturiskai salīdzināšanai

## Starpmērķi

| Fāze    |                   Mērķis | Galvenā uzmanība                                                             | Statuss     |
| ------- | -----------------------: | ---------------------------------------------------------------------------- | ----------- |
| 1. fāze | 60% priekšrakstu / rindu | Ātri ieguvumi un zema riska utilītprogrammu pārklājums                       | ✅ Pabeigta |
| 2. fāze | 65% priekšrakstu / rindu | Datubāzes un maršrutu pamati                                                 | ✅ Pabeigta |
| 3. fāze | 70% priekšrakstu / rindu | Nodrošinātāju validācija un lietojuma analītika                              | ✅ Pabeigta |
| 4. fāze | 75% priekšrakstu / rindu | `open-sse` tulkotāji un palīgfunkcijas                                       | ✅ Pabeigta |
| 5. fāze | 80% priekšrakstu / rindu | `open-sse` apstrādātāji un izpildītāja atzarojumi                            | ✅ Pabeigta |
| 6. fāze | 85% priekšrakstu / rindu | Sarežģītāki robežgadījumi, atzarojumu parāds, regresijas testu kopas         | Notiek      |
| 7. fāze | 90% priekšrakstu / rindu | Noslēdzošā pārbaude, nepilnību novēršana, stingra pakāpeniska paaugstināšana | Gaida       |

Ar katru fāzi atzarojumu un funkciju rādītājiem vajadzētu pakāpeniski palielināties, taču galvenais stingrais mērķis ir priekšraksti / rindas.

## Prioritātes karstās vietas

Šie faili šodien ir viszemākais rindu pārklājums (< 60%) un piedāvā labāko atdevi 6.-7. fāzēm. Ģenerēts no `coverage/coverage-summary.json` 2026. gada 13. maijā:

| #   | Fails                                                        | Rindas % |
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

Tēmas 6.-7. fāzēm:

- `open-sse/services/compression/**` ir visblīvākais zema pārklājuma kopums un dominē atlikušajā spraugā.
- Partiju un rerank API maršruti (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) prasa apstrādātāja līmeņa testus.
- Mākoņa aģenta adapteriem (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) un `tierResolver.ts` nepieciešami scenāriju testi.
- Dokumentācijas UI komponentes un `src/mitm/systemCommands.ts` ir zemākas prioritātes, bet ir lētas filiālu uzvaras.

## Izpildes kontrolsaraksts

### 1. fāze: 56.95% -> 60%

- [x] Labot pārklājuma metriku, lai tā atspoguļotu avota kodu, nevis testu failus
- [x] Saglabāt mantoto pārklājuma skriptu salīdzināšanai
- [x] Ierakstīt bāzes līmeni un karstās vietas repo
- [ ] Pievienot mērķētus testus zema riska utilītām:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Pievienot maršruta testus:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### 2. fāze: 60% -> 65%

- [ ] Pievienot DB atbalstītus testus:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Aizsegt filiāļu uzvedību:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### 3. fāze: 65% -> 70%

- [ ] Pievienot lietošanas analītikas testus:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Paplašināt maršruta pārklājumu proxy pārvaldībai un iestatījumu filiālēm

### 4. fāze: 70% -> 75%

- [ ] Aizsegt tulka palīgus un centrālos tulkošanas ceļus:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### 5. fāze: 75% -> 80%

- [ ] Pievienot apstrādātāja līmeņa testus:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Pievienot izpildītāja filiāļu pārklājumu nodrošinātāju specifiskai autentifikācijai, atkārtotiem mēģinājumiem un punktu pārrakstīšanām

### 6. fāze: 80% -> 85%

- [] Apvienot vairāk robežgadījumu kopu galvenajā pārklājuma ceļā
- [ ] Palielināt funkciju pārklājumu DB moduļiem ar vāju konstruktora/palīga pārklājumu
- [ ] Aizvērt filiāļu spraugas `settings.ts`, `registeredKeys.ts`, `validation.ts` un tulka palīgos

### 7. fāze: 85% -> 90%

- [ ] Atlikušos zema pārklājuma failus uzskatīt par blokatoriem
- [ ] Pievienot regresijas testus katrai neaizsegtai ražošanas kļūdai, kas izlabota ceļā uz 90%
- [ ] Paaugstināt pārklājuma vārtu CI tikai pēc tam, kad vietējais bāzes līmenis ir stabils vismaz divus pēc kārtas palaišanas reizes

## Pārslēgšanas politika

Atjaunojiet `npm run test:coverage` sliekšņus tikai pēc tam, kad projekts faktiski ir pārsniedzis nākamo posmu ar ērtu rezervi.

**Pašreizējais vārti:** `npm run test:coverage` piemēro **60 teikumi / 60 rindas / 60 funkcijas / 60 zari** (metrika tika pārbāzēta Quality-Gates Fase 6A.1 — iepriekšējais 82.58% bāzes līmenis bija pārvērtēts, jo tas skaitīja testu failus un izslēdza `open-sse`). Komanda `test:coverage:legacy` saglabā veco 50/50/50 metriku vēsturiskai salīdzināšanai.

Ad-hoc sliekšņu pārbaudēm pret jaunāko pārskatu izmantojiet:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Ieteicamā pārslēgšanas secība (kārtība ir `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- pašreizējie vārti (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Nākamais pārslēgšanas mērķis ir `80/75/78`, tiklīdz zaru pārklājums divos pēc kārtas veiktajos braucienos noturas virs 78%.

## Zināmā atstarpe

Pašreizējā pārklājuma komanda mēra galveno Node vienību komplektu un ietver no tā sasniegto avotu, ieskaitot `open-sse`. Tā vēl neatdala Vitest pārklājumu vienotā pārskatā. Šī apvienošana ir vēlāk veicama, bet tā nav šķērslis, lai sāktu 60% -> 80% kāpumu.
