# COVERAGE_PLAN (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

titlu: "Pjan ta' Koperatura tat-Ttestjar"
verżjoni: 3.8.40
aġġornat l-aħħar: 2026-06-28
---

# Pjan ta' Koperatura tat-Ttestjar

Aġġornat l-aħħar: 2026-06-28

> Status imkejjel fl-2026-05-13: linji 82.58%, stqarrijiet 82.58%, funzjonijiet 84.23%, frieħ 75.22%. Il-fażijiet 1-5 huma kompluti. Il-fokus attwali huwa l-Fażi 6 (>=85%) u l-Fażi 7 (>=90%).

## Linja Bażi

Hemm diversi numri ta' koperatura skont kif ikun ikkalkulat ir-rapport. Għat-tħejjija, wieħed biss minn dawk huwa utli.

| Metrika                 | Ambitu                                                   | Stqarrijiet / Linji |  Frieħ | Funzjonijiet | Noti                                                        |
| ----------------------- | -------------------------------------------------------- | ------------------: | -----: | -----------: | ----------------------------------------------------------- |
| legacy                  | `npm run test:coverage` qadim                            |              79.42% | 75.15% |       67.94% | Infjat: jgħoddi l-fajls tat-ttest u jħalli barra `open-sse` |
| Dijagnostiku            | Biss sors, jinkludi l-testijiet u ħalli barra `open-sse` |              68.16% | 63.55% |       64.06% | Utli biss biex jiżola `src/**`                              |
| Linja bażi rakkomandata | Biss sors, jinkludi l-testijiet u jinkludi `open-sse`    |              82.58% | 75.22% |       84.23% | Din hija l-linja bażi tal-proġett kollu biex tittejjeb      |

Il-linja bażi rakkomandata hija n-numru biex jiġi ottimizzat.

## Regoli

- L-għanijiet tal-koperatura japplikaw għall-fajls tas-sors, mhux għal `tests/**`.
- `open-sse/**` huwa parti mill-prodott u għandu jibqa' fl-ambitu.
- Koddid ġdid m'għandux inaqqas il-koperatura fil-partijiet li jkun intuża.
- Preferibbli li jiġu ttestjati l-ġisem tal-imġiba u r-riżultat tal-frieħ minfoll dettalji tal-implimentazzjonija.
- Preferibbli database ta' SQLite temporanji u fixtures żgħar minfoll mocks wiesgħa għal `src/lib/db/**`.

## Sett attwali tal-kmandi

- `npm run test:coverage`
  - Il-bieb ewlieni tal-koperatura tas-sors għas-suita tat-testijiet unit
  - Jinġenera `text-summary`, `html`, `json-summary`, u `lcov`
- `npm run coverage:report`
  - Rapport dettaljat skont il-fajls mill-aħħar eżekuzzjoni
- `npm run test:coverage:legacy`
  - Għal komparazzjoni storika biss

## Mili

| Fażi   |                    Għan | Fokus                                                              | Statu       |
| ------ | ----------------------: | ------------------------------------------------------------------ | ----------- |
| Fażi 1 | 60% stqarrijiet / linji | rebħiet mgħaġġla u koperatura ta' utilità b'riskju baxx            | ✅ Kompluta |
| Fażi 2 | 65% stqarrijiet / linji | Sisien tal-DB u tal-roti                                           | ✅ Kompluta |
| Fażi 3 | 70% stqarrijiet / linji | Validazzjoni tal-fornitur u analiżi tal-użu                        | ✅ Kompluta |
| Fażi 4 | 75% stqarrijiet / linji | Tradutturi u għajnuna `open-sse`                                   | ✅ Kompluta |
| Fażi 5 | 80% stqarrijiet / linji | Handluri u frieħ tal-eżekutur `open-sse`                           | ✅ Kompluta |
| Fażi 6 | 85% stqarrijiet / linji | Kaxi ħażina aktar iebsa, frief il-frieħ, suites tar-regr eżuzzjoni | Inkors      |
| Fażi 7 | 90% stqarrijiet / linji | Tindif finali, għoluq tal-vojt, ratchet stretti                    | Fil-ħarsien |

Il-frieħ u l-funzjonijiet għandhom jiġu ratcheted 'il fuq ma' kull fażi, iżda l-għan iebes ewlieni huwa stqarrijiet / linji.

## Hotspots ta' Prijorità

Dawn il-fajls għandhom l-inqas kopertura tal-linji llum (< 60%) u joffru l-aħjar qligħ għall-Fażijiet 6-7. Iġġenerat minn `coverage/coverage-summary.json` fit-2026-05-13:

| #   | Fajl                                                         | Linji % |
| --- | ------------------------------------------------------------ | ------: |
| 1   | `open-sse/services/compression/validation.ts`                |   7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |   9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |   9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |  10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |  10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |  10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |  11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |  12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |  12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |  12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |  13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |  13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |  13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |  13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |  14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |  14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |  15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |  15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |  16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |  16.66% |

Temi għall-Fażijiet 6-7:

- `open-sse/services/compression/**` huwa l-aktar grupp dens ta' kopertura baxxa u jiddomina d-distakk li jibqa'.
- Rotot API tal-batch u rerank (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) jeħtieġu testijiet fil-livell tal-handler.
- Adapters tal-cloud agent (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) u `tierResolver.ts` jeħtieġu testijiet ta' xenarji.
- Komponenti UI tad-dokumentazzjoni u `src/mitm/systemCommands.ts` huma ta' prijorità aktar baxxa iżda rebħiet irħas fil-fergħat.

## Checklist tal-Eżekuzzjoni

### Fażi 1: 56.95% -> 60%

- [x] Waħħal il-metrika tal-kopertura sabiex tirrifletti l-kodiċi tas-sors minflok il-fajls tat-test
- [x] Żomm skript tal-kopertura legacy għal tqabbil
- [x] Irrekordja l-bażi u l-hotspots fir-repożitorju
- [ ] Żid testijiet iffokati għal utilitajiet ta' riskju baxx:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Żid testijiet tar-rotot għal:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fażi 2: 60% -> 65%

- [ ] Żid testijiet ibbażati fuq id-database għal:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Għatti l-imġiba tal-fergħat fi:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fażi 3: 65% -> 70%

- [ ] Żid testijiet tal-analitiċi tal-użu għal:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Espandi l-kopertura tar-rotot għall-ġestjoni tal-proxy u l-fergħat tas-settings

### Fażi 4: 70% -> 75%

- [ ] Għatti l-għajnuniet tat-traduttur u l-mogħdijiet ċentrali tat-traduzzjoni:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fażi 5: 75% -> 80%

- [ ] Żid testijiet fil-livell tal-handler għal:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Żid kopertura tal-fergħat tal-eżekutur għal awtentikazzjoni speċifika tal-fornitur, retries, u overrides tal-endpoint

### Fażi 6: 80% -> 85%

- [ ] Ixgħel aktar suites ta' każijiet estremi fil-mogħdija prinċipali tal-kopertura
- [ ] Żid il-kopertura tal-funzjonijiet għal moduli tad-database b'kopertura dgħajfa tal-kostrutturi/għajnuniet
- [ ] Agħlaq id-distakki fil-fergħat fi `settings.ts`, `registeredKeys.ts`, `validation.ts`, u l-għajnuniet tat-traduttur

### Fażi 7: 85% -> 90%

- [ ] Ittratta l-fajls li jibqgħalhom kopertura baxxa bħala ostakli
- [ ] Żid testijiet ta' rigressjoni għal kull bug fil-produzzjoni mhux kopert li jissewwa waqt il-ħidma lejn 90%
- [ ] Għolli l-limitu tal-kopertura fil-CI biss wara li l-bażi lokali tkun stabbli għal mill-inqas żewġ ġirjiet konsekuttivi

## Politika tar-Ratchet

Aġorna l-limiti ta' `npm run test:coverage` biss wara li l-proġett jisk真正 exceeding il-pass li jmiss b'bufers komdu.

**Boċċa attwali:** `npm run test:coverage` jimp Onofi **60 statements / 60 lines / 60 functions / 60 branches** (il-metrika ġiet riflessa fil-Quality-Gates Fase 6A.1 — is-sostenn ta' 82.58% ilbieraħ kien infjat għax kien jgħodd il-fajls tat-test u jinkludi `open-sse`). Il-kmand `test:coverage:legacy` jippreżerva l-metrika l-qadima 50/50/50 għall-komparazzjoni storika.

Għal verifiki ad-hoc tal-limiti mal-aħħar rapport uża:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Sekwenza ratchet rakkomandata (l-ordni hija `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- boċċa attwali (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Il-mira ratchet li jmiss hija `80/75/78` ladarba l-covrage ta' l-għanqbut jinżamm iżjed minn 78% għal żewġ xhur konsekuttivi.

## Firma magħrufa

Il-kmand attwali tal-covrage jkejjel is-suit primarju tal-Unità Node u jinkludi s-sors li jasal minnu, inkluż `open-sse`. Għadu ma qed jagħmel il-merger tal-covrage tal-Vitest f'report uniku wieħed. Dik il-merger tiswa' jsir aktar tard, iżda mhija blokka għat-tifqig' mill-60% għal 80%.
