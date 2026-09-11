# COVERAGE_PLAN (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "Testkatvuse plaan"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Testkatvuse plaan

Viimati värskendatud: 2026-06-28

> Seisund mõõdetud 2026-05-13: read 82,58%, laused 82,58%, funktsioonid 84,23%, harud 75,22%. Faasid 1-5 on lõpetatud. Praegune fookus on Faas 6 (>=85%) ja Faas 7 (>=90%).

## Baasjoon

Sõltuvalt raporti arvutamise viisist on mitu erinevat katvuse numbrit. Planeerimiseks on kasulik vaid üks neist.

| Näitaja             | Ulatus                                                       | Laused / Read |  Harud | Funktsioonid | Märkused                                                     |
| ------------------- | ------------------------------------------------------------ | ------------: | -----: | -----------: | ------------------------------------------------------------ |
| Vananenud           | Vana `npm run test:coverage`                                 |        79,42% | 75,15% |       67,94% | Ülepaisutatud: arvestab testifaile ja jätab välja `open-sse` |
| Diagnostiline       | Ainult lähtekood, jättes välja testid ja `open-sse`          |        68,16% | 63,55% |       64,06% | Kasulik vaid `src/**` isoleerimiseks                         |
| Soovitatav baasjoon | Ainult lähtekood, jättes välja testid ja kaasates `open-sse` |        82,58% | 75,22% |       84,23% | See on projektiülene baasjoon, mida parandada                |

Soovitatav baasjoon on number, mille suhtes optimeerida.

## Reeglid

- Katvuse eesmärgid kehtivad lähtekoodifailidele, mitte `tests/**`-le.
- `open-sse/**` on toote osa ja peab jääma ulatusse.
- Uus kood ei peaks vähendama katvust puudutatud aladel.
- Käitumise ja harude tulemuste testimist tuleks eelistada rakenduse üksikasjade testimisele.
- `src/lib/db/**` puhul tuleks eelistada ajutisi SQLite andmebaase ja väikeseid fikstuure laiaulatuslikele mockidele.

## Praegune käsukomplekt

- `npm run test:coverage`
  - Peamine lähtekoodi katvuse lävend ühiktestide komplektile
  - Genereerib `text-summary`, `html`, `json-summary` ja `lcov`
- `npm run coverage:report`
  - Detailne failipõhine raport viimasest käivitusest
- `npm run test:coverage:legacy`
  - Ainult ajaloolise võrdluse jaoks

## Vahe-eesmärgid

| Faas   |           Eesmärk | Fookus                                                         | Olek      |
| ------ | ----------------: | -------------------------------------------------------------- | --------- |
| Faas 1 | 60% laused / read | Kiired võidud ja madala riskiga utiliitide katvus              | ✅ Valmis |
| Faas 2 | 65% laused / read | DB ja teekonna (route) alused                                  | ✅ Valmis |
| Faas 3 | 70% laused / read | Teenusepakkuja valideerimine ja kasutusanalüütika              | ✅ Valmis |
| Faas 4 | 75% laused / read | `open-sse` tõlkijad ja abifunktsioonid                         | ✅ Valmis |
| Faas 5 | 80% laused / read | `open-sse` käsitlejad ja täitja harud                          | ✅ Valmis |
| Faas 6 | 85% laused / read | Keerulisemad piirjuhtumid, harude võlg, regressioonikomplektid | Käimas    |
| Faas 7 | 90% laused / read | Lõplik ülevaatus, lünkade sulgemine, range karmistamine        | Ootel     |

Harud ja funktsioonid peaksid iga faasiga suurenema, kuid peamine range eesmärk on laused / read.

## Prioriteetsed valupunktid

Nendes failides on täna madalaim reakatvus (< 60%) ja need pakuvad parimat tasuvust faaside 6-7 jaoks. Genereeritud failist `coverage/coverage-summary.json` 2026-05-13:

| #   | Fail                                                         | Read % |
| --- | ------------------------------------------------------------ | -----: |
| 1   | `open-sse/services/compression/validation.ts`                |  7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |  9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |  9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      | 10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  | 10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    | 10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      | 11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 | 12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                | 12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                | 12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          | 13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` | 13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  | 13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         | 13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      | 14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             | 14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              | 15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         | 15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          | 16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                | 16.66% |

Faaside 6-7 teemad:

- `open-sse/services/compression/**` on kõige tihedam madala katvusega kobar ja domineerib ülejäänud lõhes.
- Batch- ja rerank-API teekonnad (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) vajavad käsitleja tasemel teste.
- Pilveagenti adapterid (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) ja `tierResolver.ts` vajavad stsenaariumipõhiseid teste.
- Dokumentatsiooni UI komponendid ja `src/mitm/systemCommands.ts` on madalama prioriteediga, kuid odavalt saavutatavad hargnemisvõidud.

## Täitmise kontroll-nimekiri

### Faas 1: 56.95% -> 60%

- [x] Paranda katvuse mõõdik, et see peegeldaks lähtekoodi, mitte testifaile
- [x] Säilita vana katvusskript võrdlemiseks
- [x] Salvesta baasjoon ja valupunktid repositooriumisse
- [ ] Lisa fookustatud testid madala riskiga utiliitidele:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Lisa teekonna testid:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Faas 2: 60% -> 65%

- [ ] Lisa andmebaasipõhised testid:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Katvusta hargnemiskäitumine:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Faas 3: 65% -> 70%

- [ ] Lisa kasutusanalüütika testid:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Laienda teekonnakatvust puhverserveri halduse ja seadete hargnemistele

### Faas 4: 70% -> 75%

- [ ] Katvusta tõlkija abifunktsioonid ja kesksed tõlketeekonnad:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Faas 5: 75% -> 80%

- [ ] Lisa käsitleja tasemel testid:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Lisa täitja hargnemiskatvus teenusepakkuja-spetsiifilisele autentimisele, uuestikatsetamistele ja lõpp-punkti ülekirjutustele

### Faas 6: 80% -> 85%

- [ ] Liida rohkem servajuhtumite testikomplekte peamisesse katvusteekonda
- [ ] Suurenda funktsioonikatvust andmebaasimoodulite jaoks, kus konstruktori/abifunktsioonide katvus on nõrk
- [ ] Sulge hargnemislõhed failides `settings.ts`, `registeredKeys.ts`, `validation.ts` ja tõlkija abifunktsioonides

### Faas 7: 85% -> 90%

- [ ] Käsitle allesjäänud madala katvusega failid takistajatena
- [ ] Lisa regressioonitestid igale katmata tootmisviga, mis parandati 90%-le jõudmise käigus
- [ ] Tõsta katvuslüve CI-s alles pärast seda, kui kohalik baasjoon on olnud stabiilne vähemalt kahes järjestikuses käivituses

## Ratchet põhimõte (ratchet policy)

Uuenda `npm run test:coverage` lävendeid alles pärast seda, kui projekt on järgmise verstaposti tegelikult mugava puhvriga ületanud.

**Praegune lävend:** `npm run test:coverage` jõustab **60 statements / 60 lines / 60 functions / 60 branches** (meetrikat rebaseeriti Quality-Gates Fase 6A.1-s — varasem 82.58% baasjoon oli paisutatud, kuna see arvestas testifaile ja jättis välja `open-sse`). Käsk `test:coverage:legacy` säilitab vana 50/50/50 meetrika ajaloolise võrdluse jaoks.

Ajutiste lävendikontrollide jaoks värskeima raporti suhtes kasuta:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Soovitatud ratchet-järjestus (järjekord on `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- praegune lävend (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Järgmine ratchet-sihtmärk on `80/75/78`, kui hargnemiste (branches) katvus püsib üle 78% kahe järjestikuse käivituse jooksul.

## Teadaolev lünk

Praegune katvuskäsk mõõdab peamist Node üksustestide komplekti ja hõlmab sellest saavutatavat lähtekoodi, sealhulgas `open-sse`. See ei ühenda veel Vitesti katvust ühtseks ühendatud raportiks. See liitmine on hilisemas etapis mõistlik teha, kuid see ei ole takistuseks, et alustada tõusu 60%-lt 80%-le.
