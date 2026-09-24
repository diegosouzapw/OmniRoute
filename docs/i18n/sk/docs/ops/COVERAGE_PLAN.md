# Test Coverage Plan (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇪🇹 [am](../../../am/docs/ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇧🇦 [bs](../../../bs/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ha](../../../ha/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇦🇲 [hy](../../../hy/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ig](../../../ig/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇬🇪 [ka](../../../ka/docs/ops/COVERAGE_PLAN.md) · 🇰🇭 [km](../../../km/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [kn](../../../kn/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ml](../../../ml/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇲🇲 [my](../../../my/docs/ops/COVERAGE_PLAN.md) · 🇳🇵 [ne](../../../ne/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [or](../../../or/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [pa](../../../pa/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇱🇰 [si](../../../si/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇺🇿 [uz](../../../uz/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [yo](../../../yo/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

Posledná aktualizácia: 2026-06-28

> Stav nameraný 2026-05-13: riadky 82,58 %, príkazy 82,58 %, funkcie 84,23 %, vetvy 75,22 %. Fázy 1 – 5 sú dokončené. Aktuálne sa pracuje na fáze 6 (>=85 %) a fáze 7 (>=90 %).

## Východiskový stav

Existuje viacero hodnôt pokrytia v závislosti od spôsobu výpočtu reportu. Na plánovanie je užitočná iba jedna z nich.

| Metrika           | Rozsah                                               | Príkazy / riadky |   Vetvy | Funkcie | Poznámky                                                      |
| ----------------- | ---------------------------------------------------- | ---------------: | ------: | ------: | ------------------------------------------------------------- |
| Pôvodná           | Starý príkaz `npm run test:coverage`                 |          79,42 % | 75,15 % | 67,94 % | Nadhodnotené: počíta testovacie súbory a vylučuje `open-sse`  |
| Diagnostická      | Iba zdrojový kód, bez testov a bez `open-sse`        |          68,16 % | 63,55 % | 64,06 % | Užitočné iba na izoláciu `src/**`                             |
| Odporúčaný základ | Iba zdrojový kód, bez testov, ale vrátane `open-sse` |          82,58 % | 75,22 % | 84,23 % | Toto je východiskový stav celého projektu určený na zlepšenie |

Optimalizácia sa má riadiť odporúčaným východiskovým stavom.

## Pravidlá

- Ciele pokrytia sa vzťahujú na zdrojové súbory, nie na `tests/**`.
- `open-sse/**` je súčasťou produktu a musí zostať zahrnutý.
- Nový kód by nemal znižovať pokrytie v dotknutých oblastiach.
- Uprednostňujte testovanie správania a výsledkov vetvenia pred implementačnými detailmi.
- Pre `src/lib/db/**` uprednostňujte dočasné databázy SQLite a malé testovacie dáta pred rozsiahlymi mockmi.

## Aktuálna súprava príkazov

- `npm run test:coverage`
  - Hlavná kontrola pokrytia zdrojového kódu pre súpravu jednotkových testov
  - Generuje `text-summary`, `html`, `json-summary` a `lcov`
- `npm run coverage:report`
  - Podrobný report podľa jednotlivých súborov z najnovšieho spustenia
- `npm run test:coverage:legacy`
  - Iba na historické porovnanie

## Míľniky

| Fáza   |                    Cieľ | Zameranie                                                          | Stav         |
| ------ | ----------------------: | ------------------------------------------------------------------ | ------------ |
| Fáza 1 | 60 % príkazov / riadkov | Rýchle prínosy a nízkorizikové pokrytie pomocných funkcií          | ✅ Dokončené |
| Fáza 2 | 65 % príkazov / riadkov | Základy databázy a trás                                            | ✅ Dokončené |
| Fáza 3 | 70 % príkazov / riadkov | Overovanie poskytovateľov a analytika používania                   | ✅ Dokončené |
| Fáza 4 | 75 % príkazov / riadkov | Prekladače a pomocné funkcie `open-sse`                            | ✅ Dokončené |
| Fáza 5 | 80 % príkazov / riadkov | Handlery `open-sse` a vetvy exekútora                              | ✅ Dokončené |
| Fáza 6 | 85 % príkazov / riadkov | Náročnejšie hraničné prípady, dlh vo vetvení, regresné súpravy     | Prebieha     |
| Fáza 7 | 90 % príkazov / riadkov | Záverečná kontrola, odstránenie medzier, prísne zvyšovanie hranice | Čaká sa      |

Pokrytie vetiev a funkcií by sa malo s každou fázou postupne zvyšovať, ale hlavným pevným cieľom je pokrytie príkazov / riadkov.

## Prioritné kritické miesta

Tieto súbory majú v súčasnosti najnižšie pokrytie riadkov (< 60 %) a ponúkajú najlepší prínos pre fázy 6 – 7. Vygenerované zo súboru `coverage/coverage-summary.json` dňa 2026-05-13:

| #   | Súbor                                                        | Riadky % |
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

Témy pre fázy 6 – 7:

- `open-sse/services/compression/**` predstavuje najhustejšiu skupinu s nízkym pokrytím a tvorí najväčšiu časť zostávajúceho rozdielu.
- Trasy API pre dávky a preradenie (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) potrebujú testy na úrovni obslužných rutín.
- Adaptéry cloudových agentov (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) a `tierResolver.ts` potrebujú testy scenárov.
- Komponenty používateľského rozhrania dokumentácie a `src/mitm/systemCommands.ts` majú nižšiu prioritu, ale umožňujú jednoducho zvýšiť pokrytie vetiev.

## Kontrolný zoznam realizácie

### Fáza 1: 56.95% -> 60%

- [x] Opraviť metriku pokrytia tak, aby odrážala zdrojový kód namiesto testovacích súborov
- [x] Zachovať pôvodný skript pokrytia na porovnanie
- [x] Zaznamenať východiskový stav a kritické miesta v repozitári
- [ ] Pridať cielené testy pre nízkorizikové pomocné moduly:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Pridať testy trás pre:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fáza 2: 60% -> 65%

- [ ] Pridať testy využívajúce databázu pre:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Pokryť správanie vetiev v:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fáza 3: 65% -> 70%

- [ ] Pridať testy analytiky používania pre:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Rozšíriť pokrytie trás pre správu proxy a vetvy nastavení

### Fáza 4: 70% -> 75%

- [ ] Pokryť pomocné moduly translátora a centrálne cesty prekladu:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fáza 5: 75% -> 80%

- [ ] Pridať testy na úrovni obslužných rutín pre:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Pridať pokrytie vetiev vykonávacích modulov pre autentifikáciu špecifickú pre poskytovateľa, opakované pokusy a prepísanie koncových bodov

### Fáza 6: 80% -> 85%

- [ ] Zlúčiť viac testovacích súprav pre hraničné prípady do hlavnej cesty pokrytia
- [ ] Zvýšiť pokrytie funkcií v databázových moduloch so slabým pokrytím konštruktorov a pomocných funkcií
- [ ] Odstrániť medzery v pokrytí vetiev v `settings.ts`, `registeredKeys.ts`, `validation.ts` a pomocných moduloch translátora

### Fáza 7: 85% -> 90%

- [ ] Považovať zostávajúce súbory s nízkym pokrytím za blokujúce
- [ ] Pridať regresné testy pre každú nepokrytú chybu v produkčnom kóde opravenú počas zvyšovania pokrytia na 90 %
- [ ] Zvýšiť prah pokrytia v CI až po tom, ako bude lokálna východisková hodnota stabilná aspoň počas dvoch po sebe nasledujúcich spustení

## Politika postupného zvyšovania

Prahové hodnoty pre `npm run test:coverage` aktualizujte až vtedy, keď projekt skutočne prekročí ďalší míľnik s dostatočnou rezervou.

**Aktuálna hranica:** `npm run test:coverage` vynucuje **60 príkazov / 60 riadkov / 60 funkcií / 60 vetiev** (metrika bola prepočítaná vo fáze Quality-Gates 6A.1 — predchádzajúca východisková hodnota 82,58 % bola nadhodnotená, pretože započítavala testovacie súbory a vylučovala `open-sse`). Príkaz `test:coverage:legacy` zachováva starú metriku 50/50/50 na historické porovnanie.

Na jednorazovú kontrolu prahových hodnôt podľa najnovšej správy použite:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Odporúčaná postupnosť zvyšovania (poradie je `príkazy-riadky / vetvy / funkcie`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- aktuálna hranica (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ďalším cieľom zvýšenia je `80/75/78`, keď pokrytie vetiev zostane nad 78 % počas dvoch po sebe nasledujúcich spustení.

## Známy nedostatok

Aktuálny príkaz na meranie pokrytia meria hlavnú sadu jednotkových testov pre Node a zahŕňa zdrojový kód, ktorý sa z nej vykoná, vrátane `open-sse`. Zatiaľ nezlučuje pokrytie z Vitest do jednej zjednotenej správy. Toto zlúčenie sa oplatí vykonať neskôr, ale nebráni začatiu zvyšovania zo 60 % na 80 %.
