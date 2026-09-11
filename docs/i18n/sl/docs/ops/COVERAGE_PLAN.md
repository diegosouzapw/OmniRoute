# COVERAGE_PLAN (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "Načrt pokritosti s testi"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Načrt pokritosti s testi

Nazadnje posodobljeno: 2026-06-28

> Stanje, izmerjeno 2026-05-13: vrstice 82.58%, stavki 82.58%, funkcije 84.23%, veje 75.22%. Faze 1–5 so zaključene. Trenutni poudarek je na 6. fazi (>=85%) in 7. fazi (>=90%).

## Izhodišče

Obstaja več vrednosti pokritosti, odvisno od načina izračuna poročila. Za načrtovanje je uporabna samo ena.

| Metrika               | Obseg                                                     | Stavki / vrstice |   Veje | Funkcije | Opombe                                                     |
| --------------------- | --------------------------------------------------------- | ---------------: | -----: | -------: | ---------------------------------------------------------- |
| Podedovana            | Stari `npm run test:coverage`                             |           79.42% | 75.15% |   67.94% | Napihnjeno: šteje testne datoteke in izključuje `open-sse` |
| Diagnostična          | Samo izvorna koda, brez testov in brez `open-sse`         |           68.16% | 63.55% |   64.06% | Uporabno samo za osamitev `src/**`                         |
| Priporočeno izhodišče | Samo izvorna koda, brez testov in z vključenim `open-sse` |           82.58% | 75.22% |   84.23% | To je izhodišče za izboljšave na ravni celotnega projekta  |

Priporočeno izhodišče je vrednost, glede na katero je treba izvajati optimizacije.

## Pravila

- Cilji pokritosti veljajo za datoteke izvorne kode, ne za `tests/**`.
- `open-sse/**` je del izdelka in mora ostati v obsegu.
- Nova koda ne sme zmanjšati pokritosti na spremenjenih področjih.
- Prednost dajte testiranju vedenja in rezultatov vej pred podrobnostmi implementacije.
- Za `src/lib/db/**` dajte prednost začasnim podatkovnim zbirkam SQLite in majhnim testnim podatkom pred obsežnimi navideznimi objekti.

## Trenutni nabor ukazov

- `npm run test:coverage`
  - Glavno preverjanje pokritosti izvorne kode za zbirko testov enot
  - Ustvari `text-summary`, `html`, `json-summary` in `lcov`
- `npm run coverage:report`
  - Podrobno poročilo za vsako datoteko iz zadnjega izvajanja
- `npm run test:coverage:legacy`
  - Samo za zgodovinsko primerjavo

## Mejniki

| Faza   |                 Cilj | Poudarek                                                 | Stanje     |
| ------ | -------------------: | -------------------------------------------------------- | ---------- |
| Faza 1 | 60% stavkov / vrstic | Hitre izboljšave in nizkotvegana pokritost pripomočkov   | ✅ Končano |
| Faza 2 | 65% stavkov / vrstic | Temelji podatkovne zbirke in poti                        | ✅ Končano |
| Faza 3 | 70% stavkov / vrstic | Preverjanje ponudnikov in analitika uporabe              | ✅ Končano |
| Faza 4 | 75% stavkov / vrstic | Prevajalniki in pomožne funkcije `open-sse`              | ✅ Končano |
| Faza 5 | 80% stavkov / vrstic | Obdelovalniki `open-sse` in veje izvajalnika             | ✅ Končano |
| Faza 6 | 85% stavkov / vrstic | Zahtevnejši robni primeri, dolg vej in regresijski testi | V teku     |
| Faza 7 | 90% stavkov / vrstic | Končni pregled, odprava vrzeli, strogo stopnjevanje      | Na čakanju |

Pokritost vej in funkcij se mora z vsako fazo postopoma povečevati, vendar je glavni strogi cilj pokritost stavkov / vrstic.

## Prednostna kritična področja

Te datoteke imajo trenutno najnižjo pokritost vrstic (< 60 %) in ponujajo najboljši izkoristek za fazi 6–7. Ustvarjeno iz `coverage/coverage-summary.json` dne 2026-05-13:

| #   | Datoteka                                                     | Vrstice % |
| --- | ------------------------------------------------------------ | --------: |
| 1   | `open-sse/services/compression/validation.ts`                |     7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |     9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |     9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |    10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |    10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |    10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |    11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |    12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |    12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |    12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |    13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |    13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |    13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |    13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |    14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |    14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |    15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |    15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |    16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |    16.66% |

Teme za fazi 6–7:

- `open-sse/services/compression/**` je najgostejša skupina datotek z nizko pokritostjo in predstavlja večino preostale vrzeli.
- Poti API za paketne obdelave in prerazvrščanje (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) potrebujejo teste na ravni obdelovalcev.
- Adapterji agentov v oblaku (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) in `tierResolver.ts` potrebujejo teste scenarijev.
- Komponente uporabniškega vmesnika dokumentacije in `src/mitm/systemCommands.ts` imajo nižjo prednost, vendar omogočajo poceni izboljšanje pokritosti vej.

## Kontrolni seznam izvedbe

### Faza 1: 56.95% -> 60%

- [x] Popravite metriko pokritosti, da bo odražala izvorno kodo namesto testnih datotek
- [x] Ohranite starejši skript za pokritost za primerjavo
- [x] Zabeležite izhodiščno stanje in kritična področja v repozitoriju
- [ ] Dodajte usmerjene teste za pripomočke z nizkim tveganjem:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Dodajte teste poti za:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Faza 2: 60% -> 65%

- [ ] Dodajte teste, podprte s podatkovno zbirko, za:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Pokrijte vedenje vej v:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Faza 3: 65% -> 70%

- [ ] Dodajte teste analitike uporabe za:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Razširite pokritost poti za upravljanje posredniških strežnikov in veje nastavitev

### Faza 4: 70% -> 75%

- [ ] Pokrijte pomožne funkcije prevajalnika in osrednje prevajalske poti:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Faza 5: 75% -> 80%

- [ ] Dodajte teste na ravni obdelovalcev za:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Dodajte pokritost vej izvajalnika za preverjanje pristnosti, specifično za ponudnika, ponovne poskuse in preglasitve končnih točk

### Faza 6: 80% -> 85%

- [ ] Združite več zbirk testov robnih primerov v glavno pot pokritosti
- [ ] Povečajte pokritost funkcij za module podatkovne zbirke s šibko pokritostjo konstruktorjev/pomožnih funkcij
- [ ] Zaprite vrzeli v pokritosti vej v `settings.ts`, `registeredKeys.ts`, `validation.ts` in pomožnih funkcijah prevajalnika

### Faza 7: 85% -> 90%

- [ ] Preostale datoteke z nizko pokritostjo obravnavajte kot blokade
- [ ] Dodajte regresijske teste za vsako nepokrito produkcijsko napako, odpravljeno med prizadevanjem za dosego 90 %
- [ ] Prag pokritosti v CI zvišajte šele, ko je lokalno izhodiščno stanje stabilno vsaj pri dveh zaporednih izvajanjih

## Politika postopnega zviševanja pragov

Pragove za `npm run test:coverage` posodobite šele, ko projekt dejansko preseže naslednji mejnik z zadostno rezervo.

**Trenutni prag:** `npm run test:coverage` zahteva **60 stavkov / 60 vrstic / 60 funkcij / 60 vej** (metrika je bila ponovno določena v Quality-Gates Fase 6A.1 — prejšnja izhodiščna vrednost 82,58 % je bila napihnjena, ker je vključevala testne datoteke in izključevala `open-sse`). Ukaz `test:coverage:legacy` ohranja staro metriko 50/50/50 za zgodovinsko primerjavo.

Za sprotno preverjanje pragov glede na najnovejše poročilo uporabite:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Priporočeno zaporedje zviševanja pragov (vrstni red je `stavki-vrstice / veje / funkcije`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- trenutni prag (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Naslednji ciljni prag je `80/75/78`, ko pokritost vej v dveh zaporednih izvajanjih ostane nad 78 %.

## Znana vrzel

Trenutni ukaz za pokritost meri glavni nabor enotnih testov za Node in vključuje izvorno kodo, ki jo ta doseže, vključno z `open-sse`. Pokritosti Vitest še ne združuje v enotno poročilo. To združitev je smiselno izvesti pozneje, vendar ne ovira začetka zviševanja pokritosti s 60 % -> 80 %.
