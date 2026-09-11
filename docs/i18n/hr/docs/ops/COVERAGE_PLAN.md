# COVERAGE_PLAN (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "Plan Pokrivenosti Testovima"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Plan Pokrivenosti Testovima

Zadnje ažuriranje: 2026-06-28

> Status izmjeren 2026-05-13: redovi 82.58%, iskazi 82.58%, funkcije 84.23%, grane 75.22%. Faze 1-5 su završene. Trenutni fokus je Faza 6 (>=85%) i Faza 7 (>=90%).

## Polazna osnova

Postoji više vrijednosti pokrivenosti ovisno o načinu izračuna izvještaja. Za planiranje, samo jedna od njih je korisna.

| Metrika            | Opseg                                                           | Iskazi / Redovi |  Grane | Funkcije | Napomene                                                       |
| ------------------ | --------------------------------------------------------------- | --------------: | -----: | -------: | -------------------------------------------------------------- |
| Nasljeđena         | Stari `npm run test:coverage`                                   |          79.42% | 75.15% |   67.94% | Napuhana: broji testne datoteke i isključuje `open-sse`        |
| Dijagnostička      | Samo izvorni kod, isključujući testove i `open-sse`             |          68.16% | 63.55% |   64.06% | Korisna samo za izolaciju `src/**`                             |
| Preporučena osnova | Samo izvorni kod, isključujući testove i uključujući `open-sse` |          82.58% | 75.22% |   84.23% | Ovo je osnova na razini cijelog projekta koju treba poboljšati |

Preporučena osnova je broj koji treba optimizirati.

## Pravila

- Ciljevi pokrivenosti primjenjuju se na izvorne datoteke, a ne na `tests/**`.
- `open-sse/**` je dio proizvoda i mora ostati u opsegu.
- Novi kod ne smije smanjivati pokrivenost u izmijenjenim područjima.
- Prednost dati testiranju ponašanja i ishoda grana nad detaljima implementacije.
- Prednost dati privremenim SQLite bazama podataka i malim skupovima podataka nad opsežnim lažnjacima za `src/lib/db/**`.

## Trenutni skup naredbi

- `npm run test:coverage`
  - Glavna provjera pokrivenosti izvornog koda za skup jediničnih testova
  - Generira `text-summary`, `html`, `json-summary` i `lcov`
- `npm run coverage:report`
  - Detaljni izvještaj datoteka po datoteka iz posljednjeg pokretanja
- `npm run test:coverage:legacy`
  - Samo za povijesnu usporedbu

## Prekretnice

| Faza   |                Cilj | Fokus                                                        | Status      |
| ------ | ------------------: | ------------------------------------------------------------ | ----------- |
| Faza 1 | 60% iskaza / redova | Brzi dobici i pokrivenost pomoćnih programa niskog rizika    | ✅ Završeno |
| Faza 2 | 65% iskaza / redova | Temelji baze podataka i ruta                                 | ✅ Završeno |
| Faza 3 | 70% iskaza / redova | Validacija pružatelja i analitika korištenja                 | ✅ Završeno |
| Faza 4 | 75% iskaza / redova | Prevodioci i pomoćnici za `open-sse`                         | ✅ Završeno |
| Faza 5 | 80% iskaza / redova | Rukovatelji za `open-sse` i grane izvršitelja                | ✅ Završeno |
| Faza 6 | 85% iskaza / redova | Teži rubni slučajevi, dug grana, regresijski skupovi testova | U tijeku    |
| Faza 7 | 90% iskaza / redova | Završno pregledavanje, zatvaranje praznina, strogi zasun     | Na čekanju  |

Grane i funkcije trebaju se pomicati prema gore sa svakom fazom, ali primarni tvrdi cilj su iskazi / redovi.

## Prioritetne točke

Ove datoteke danas imaju najnižu pokrivenost linija (< 60%) i nude najbolji povrat za Faze 6-7. Generirano iz `coverage/coverage-summary.json` dana 2026-05-13:

| #   | Datoteka                                                     | Linije % |
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

Teme za Faze 6-7:

- `open-sse/services/compression/**` je najgušći skup datoteka s niskom pokrivenošću i dominira preostalim jazom.
- Rute za batch i rerank API (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) trebaju testove na razini handlera.
- Adapteri za cloud agente (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) i `tierResolver.ts` trebaju scenarijsko testiranje.
- Komponente korisničkog sučelja za dokumentaciju i `src/mitm/systemCommands.ts` imaju niži prioritet, ali donose jeftine dobitke za pokrivenost grana.

## Kontrolni popis izvršavanja

### Faza 1: 56.95% -> 60%

- [x] Popraviti metriku pokrivenosti tako da odražava izvorni kod umjesto testnih datoteka
- [x] Zadržati naslijeđenu skriptu za pokrivenost radi usporedbe
- [x] Zabilježiti osnovnu razinu i prioritetne točke unutar repozitorija
- [ ] Dodati fokusirane testove za niskorizične pomoćne programe:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Dodati testove ruta za:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Faza 2: 60% -> 65%

- [ ] Dodati testove s podrškom baze podataka za:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Pokriti ponašanje grana u:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Faza 3: 65% -> 70%

- [ ] Dodati testove analitike korištenja za:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Proširiti pokrivenost ruta za upravljanje proxyjem i grane postavki

### Faza 4: 70% -> 75%

- [ ] Pokriti pomoćne programe prevoditelja i središnje putanje prijevoda:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Faza 5: 75% -> 80%

- [ ] Dodati testove na razini handlera za:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Dodati pokrivenost grana izvršitelja za autentifikaciju specifičnu za pružatelja usluge, ponovne pokušaje i zamjene krajnjih točaka

### Faza 6: 80% -> 85%

- [ ] Spojiti više skupova rubnih slučajeva u glavnu putanju pokrivenosti
- [ ] Povećati pokrivenost funkcija za DB module sa slabom pokrivenošću konstruktora i pomoćnih programa
- [ ] Zatvoriti jazove u granama za `settings.ts`, `registeredKeys.ts`, `validation.ts` i pomoćne programe prevoditelja

### Faza 7: 85% -> 90%

- [ ] Tretirati preostale datoteke s niskom pokrivenošću kao blokatore
- [ ] Dodati regresijske testove za svaku nepokriven grešku u produkciji ispravljen tijekom puta prema 90%
- [ ] Podići prag pokrivenosti u CI-ju tek nakon što je lokalna osnovna razina stabilna najmanje dva uzastopna pokretanja

## Ratchet pravilo

Ažurirajte pragove `npm run test:coverage` samo nakon što projekt stvarno prijeđe sljedeći milestone s udobnim odmakom.

**Trenutna granica:** `npm run test:coverage` nameće **60 iskaza / 60 redaka / 60 funkcija / 60 grana** (metrika je rebaziranana u Quality-Gates Faza 6A.1 — ranija osnovna vrijednost od 82,58% bila je napuhana jer je uključivala testne datoteke i isključivala `open-sse`). Naredba `test:coverage:legacy` čuva staru metriku 50/50/50 za povijesnu usporedbu.

Za ad-hoc provjere praga na temelju najnovijeg izvješća koristite:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Preporučeni redoslijed ratchet koraka (redoslijed je `iskazi-reci / grane / funkcije`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- trenutna granica (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Sljedeći ratchet cilj je `80/75/78` kada pokrivenost grana bude iznad 78% u dva uzastopna pokretanja.

## Poznati nedostatak

Trenutna naredba za pokrivenost mjeri glavnu Node jediničnu test-suite i uključuje izvorni kod do kojeg ona doseže, uključujući `open-sse`. Ona još uvijek ne spaja Vitest pokrivenost u jedinstveno objedinjeno izvješće. Taj spoj vrijedi napraviti kasnije, ali nije bloker za početak penjanja s 60% na 80%.
