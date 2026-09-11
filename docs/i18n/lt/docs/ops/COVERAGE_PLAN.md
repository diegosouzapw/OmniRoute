# COVERAGE_PLAN (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "Testų aprėpties planas"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Testų aprėpties planas

Paskutinį kartą atnaujinta: 2026-06-28

> Būsena išmatuota 2026-05-13: eilutės 82.58%, teiginiai 82.58%, funkcijos 84.23%, šakos 75.22%. 1–5 etapai baigti. Šiuo metu daugiausia dėmesio skiriama 6 etapui (>=85%) ir 7 etapui (>=90%).

## Pradiniai rodikliai

Aprėpties rodikliai skiriasi priklausomai nuo ataskaitos skaičiavimo būdo. Planavimui naudingas tik vienas iš jų.

| Metrika                | Apimtis                                                     | Teiginiai / eilutės |  Šakos | Funkcijos | Pastabos                                                          |
| ---------------------- | ----------------------------------------------------------- | ------------------: | -----: | --------: | ----------------------------------------------------------------- |
| Ankstesnė              | Senasis `npm run test:coverage`                             |              79.42% | 75.15% |    67.94% | Padidinta: įskaičiuojami testų failai ir neįtraukiamas `open-sse` |
| Diagnostinė            | Tik šaltinis, neįtraukiant testų ir `open-sse`              |              68.16% | 63.55% |    64.06% | Naudinga tik norint atskirti `src/**`                             |
| Rekomenduojama pradinė | Tik šaltinis, neįtraukiant testų, bet įtraukiant `open-sse` |              82.58% | 75.22% |    84.23% | Tai viso projekto pradinis rodiklis, kurį reikia gerinti          |

Optimizuoti reikia pagal rekomenduojamą pradinį rodiklį.

## Taisyklės

- Aprėpties tikslai taikomi šaltinio failams, o ne `tests/**`.
- `open-sse/**` yra produkto dalis ir turi likti įtraukta į aprėptį.
- Naujas kodas neturėtų mažinti aprėpties pakeistose srityse.
- Pirmenybę teikite veikimo ir šakų rezultatų, o ne įgyvendinimo detalių testavimui.
- Testuojant `src/lib/db/**`, pirmenybę teikite laikinosioms SQLite duomenų bazėms ir nedideliems testinių duomenų rinkiniams, o ne plataus masto imitacijoms.

## Dabartinis komandų rinkinys

- `npm run test:coverage`
  - Pagrindinis šaltinio aprėpties slenkstis vienetinių testų rinkiniui
  - Sugeneruoja `text-summary`, `html`, `json-summary` ir `lcov`
- `npm run coverage:report`
  - Išsami naujausio vykdymo kiekvieno failo ataskaita
- `npm run test:coverage:legacy`
  - Tik istoriniam palyginimui

## Etapai

| Etapas   |                Tikslas | Pagrindinis dėmesys                                               | Būsena    |
| -------- | ---------------------: | ----------------------------------------------------------------- | --------- |
| 1 etapas | 60% teiginių / eilučių | Greiti laimėjimai ir mažos rizikos pagalbinių priemonių aprėptis  | ✅ Baigta |
| 2 etapas | 65% teiginių / eilučių | DB ir maršrutų pagrindai                                          | ✅ Baigta |
| 3 etapas | 70% teiginių / eilučių | Teikėjų tikrinimas ir naudojimo analizė                           | ✅ Baigta |
| 4 etapas | 75% teiginių / eilučių | `open-sse` vertikliai ir pagalbinės priemonės                     | ✅ Baigta |
| 5 etapas | 80% teiginių / eilučių | `open-sse` apdorojimo priemonės ir vykdyklės šakos                | ✅ Baigta |
| 6 etapas | 85% teiginių / eilučių | Sudėtingesni ribiniai atvejai, šakų skola, regresijos rinkiniai   | Vykdoma   |
| 7 etapas | 90% teiginių / eilučių | Galutinė peržiūra, spragų pašalinimas, griežtas slenksčio kėlimas | Laukiama  |

Šakų ir funkcijų aprėptis turėtų didėti su kiekvienu etapu, tačiau pagrindinis griežtas tikslas yra teiginių / eilučių aprėptis.

## Prioritetinės probleminės sritys

Šių failų eilučių padengimas šiuo metu yra mažiausias (< 60 %), todėl jie suteikia didžiausią naudą 6–7 etapuose. Sugeneruota iš `coverage/coverage-summary.json` 2026-05-13:

| #   | Failas                                                       | Eilutės % |
| --- | ------------------------------------------------------------ | --------: |
| 1   | `open-sse/services/compression/validation.ts`                |    7.87 % |
| 2   | `src/app/api/v1/batches/route.ts`                            |    9.67 % |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |    9.80 % |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |   10.00 % |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |   10.63 % |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |   10.96 % |
| 7   | `open-sse/services/specificityRules.ts`                      |   11.28 % |
| 8   | `src/mitm/systemCommands.ts`                                 |   12.19 % |
| 9   | `open-sse/services/compression/aggressive.ts`                |   12.77 % |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |   12.98 % |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |   13.26 % |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |   13.43 % |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |   13.51 % |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |   13.52 % |
| 15  | `open-sse/services/compression/lite.ts`                      |   14.46 % |
| 16  | `src/app/api/v1/rerank/route.ts`                             |   14.94 % |
| 17  | `open-sse/services/compression/preservation.ts`              |   15.07 % |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |   15.54 % |
| 19  | `open-sse/services/tierResolver.ts`                          |   16.66 % |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |   16.66 % |

6–7 etapų temos:

- `open-sse/services/compression/**` yra tankiausia mažo padengimo failų grupė ir sudaro didžiąją likusio atotrūkio dalį.
- Paketinių užklausų ir perrikiavimo API maršrutams (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) reikia apdorojimo funkcijų lygmens testų.
- Debesijos agentų adapteriams (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) ir `tierResolver.ts` reikia scenarijų testų.
- Dokumentacijos naudotojo sąsajos komponentai ir `src/mitm/systemCommands.ts` yra žemesnio prioriteto, tačiau leidžia nebrangiai padidinti šakų padengimą.

## Vykdymo kontrolinis sąrašas

### 1 etapas: 56.95 % -> 60 %

- [x] Pataisyti padengimo metriką, kad ji atspindėtų šaltinio kodą, o ne testų failus
- [x] Išsaugoti senąjį padengimo scenarijų palyginimui
- [x] Užregistruoti pradinį lygį ir problemines sritis saugykloje
- [ ] Pridėti tikslinių testų mažos rizikos pagalbinėms priemonėms:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Pridėti maršrutų testų:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### 2 etapas: 60 % -> 65 %

- [ ] Pridėti duomenų baze paremtų testų:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Padengti šakų veikimą:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### 3 etapas: 65 % -> 70 %

- [ ] Pridėti naudojimo analizės testų:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Išplėsti tarpinio serverio valdymo ir nustatymų šakų maršrutų padengimą

### 4 etapas: 70 % -> 75 %

- [ ] Padengti vertiklio pagalbines priemones ir pagrindinius vertimo kelius:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### 5 etapas: 75 % -> 80 %

- [ ] Pridėti apdorojimo funkcijų lygmens testų:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Pridėti vykdyklės šakų padengimą paslaugų teikėjams būdingam autentifikavimui, pakartotiniams bandymams ir galinių taškų perrašymams

### 6 etapas: 80 % -> 85 %

- [ ] Į pagrindinį padengimo procesą įtraukti daugiau ribinių atvejų testų rinkinių
- [ ] Padidinti funkcijų padengimą DB moduliuose, kuriuose konstruktorių ir pagalbinių funkcijų padengimas yra silpnas
- [ ] Pašalinti šakų padengimo spragas failuose `settings.ts`, `registeredKeys.ts`, `validation.ts` ir vertiklio pagalbinėse priemonėse

### 7 etapas: 85 % -> 90 %

- [ ] Likusius mažo padengimo failus laikyti blokuojančiais
- [ ] Pridėti regresijos testus kiekvienai nepadengtai produkcinio kodo klaidai, ištaisytai siekiant 90 %
- [ ] Padidinti padengimo ribą CI tik tada, kai vietinis pradinis lygis išlieka stabilus bent per du paleidimus iš eilės

## Nuoseklaus kartelės kėlimo politika

Atnaujinkite `npm run test:coverage` slenksčius tik tada, kai projektas iš tikrųjų viršija kitą gairę su pakankama atsarga.

**Dabartinis slenkstis:** `npm run test:coverage` užtikrina **60 teiginių / 60 eilučių / 60 funkcijų / 60 šakų** (metrika buvo perskaičiuota kokybės kontrolės 6A.1 etape — ankstesnis 82.58% pradinis rodiklis buvo išpūstas, nes į jį buvo įtraukti testų failai, o `open-sse` nebuvo įtrauktas). Komanda `test:coverage:legacy` išsaugo senąją 50/50/50 metriką istoriniam palyginimui.

Norėdami vienkartinai patikrinti slenksčius pagal naujausią ataskaitą, naudokite:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Rekomenduojama kartelės kėlimo seka (tvarka: `teiginiai-eilutės / šakos / funkcijos`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- dabartinis slenkstis (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Kitas kartelės kėlimo tikslas yra `80/75/78`, kai šakų padengimas per du iš eilės vykdymus išlieka didesnis nei 78%.

## Žinoma spraga

Dabartinė padengimo komanda matuoja pagrindinį Node vienetų testų rinkinį ir įtraukia iš jo pasiekiamą pirminį kodą, įskaitant `open-sse`. Ji dar nesujungia Vitest padengimo į vieną bendrą ataskaitą. Šį sujungimą verta atlikti vėliau, tačiau jis netrukdo pradėti kilimo nuo 60% -> 80%.
