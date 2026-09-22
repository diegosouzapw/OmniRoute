# Compression Engines (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Il-kompressjoni ta’ OmniRoute hija mibnija madwar kuntratti tal-magni. Modalità tista’ tħaddem magna waħda direttament
(`caveman` jew `rtk`) jew pipeline deterministiku f’saffi li jeżegwixxi diversi magni wara xulxin.

## Modalitajiet

| Modalità     | Mogħdija tal-magna                       | Input maħsub                                          |
| ------------ | ---------------------------------------- | ----------------------------------------------------- |
| `off`        | ebda waħda                               | Preservazzjoni eżatta tal-prompt                      |
| `lite`       | Helpers lite ta’ Caveman                 | Tindif kontinwu b’riskju baxx                         |
| `standard`   | Caveman                                  | Kondensazzjoni ta’ prompts b’lingwa naturali          |
| `aggressive` | Caveman + summarizers tal-istorja/għodod | Sessjonijiet twal taċ-chat                            |
| `ultra`      | Caveman + helpers tat-tnaqqija           | Irkupru mil-limitu tal-kuntest                        |
| `rtk`        | RTK                                      | Output tat-terminal, shell, build, test, u git        |
| `omniglyph`  | OmniGlyph                                | Kuntest bħala immaġni fuq il-wire nattiv tal-fornitur |
| `stacked`    | Pipeline, default `rtk -> caveman`       | Logs imħallta tal-għodod u proża, iffrankar massimu   |

### Profili tal-kompressjoni ta’ OmniGlyph

Il-magna `omniglyph` (il-package `omniglyph`, 1.4.0+) taċċetta profil semantiku msemmi, issettjat
globalment permezz ta’ `omniglyph.profile` fis-settings tal-kompressjoni jew għal kull pass permezz
tal-konfigurazzjoni tal-pass tal-pipeline f’saffi:

| Profil        | Limitu                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Default. Il-politika mkejla mir-riżultati ippubblikati — timmaġinizza s-system, id-dokumentazzjoni tal-għodod u l-istorja densa |
| `balanced`    | Iżomm l-istat attiv nattiv, jipproteġi l-aħħar 8 dawriet, u jikkollassa l-istorja magħluqa eqdem                                |
| `coding-safe` | Iżomm l-awtorità, l-iskemi tal-għodod u l-output attiv tal-għodod nattivi, u jipproteġi l-aħħar 12-il dawra                     |
| `passthrough` | Jirrotta mingħajr trasformazzjoni; il-magna tinqabeż                                                                            |

Il-profil huwa **limitu massimu, mhux minimu**: `mergeCompressionProfileOptions` fil-package
jirrifjuta li jħalli override minn min isejjaħ jerġa’ jiftaħ mogħdija li titlef id-data u li l-profil ikun għalaq, għalhekk
`preserveSystemPrompt: false` għal pass partikolari ma jistax jerġa’ jattiva l-kompressjoni tas-system taħt `coding-safe`.

Skont il-kejl fuq din il-codebase: `coding-safe` u `balanced` jgħollu `minCompressChars` sal-valur
massimu tiegħu u jżommu s-system, l-iskemi tal-għodod u r-riżultati tal-għodod nattivi, għalhekk sessjoni li tkun għadha
ma akkumulatx storja tieqaf f’`below_min_chars` u l-magna ma tittrasforma xejn. Huwa
għalhekk li d-default huwa `aggressive` minflok l-aktar profil sikur.

Il-package jirriżolvi l-ambitu tal-mudell u l-profil tiegħu mill-konfigurazzjoni tal-ambjent tiegħu stess.
OmniRoute qatt ma jiddelega d-deċiżjoni: l-adapter jiffissa l-kontroll tal-mudell mal-aktar ambitu restrittiv
tal-package, sabiex is-settings tal-ambjent tal-host ikunu jistgħu biss inaqqsu l-allowlist, u qatt
iwessgħuha lil hinn mir-riżultati mkejla ta’ OmniRoute.

## Reġistru tal-Engines

Ir-reġistru jinsab f’`open-sse/services/compression/engines/registry.ts`. L-engines jesponu kuntratt
komuni:

- `id`: id stabbli tal-engine bħal `caveman` jew `rtk`
- `apply(text, config)`: mogħdija ta’ eżekuzzjoni legata użata minn pipelines f’munzell
- `compress(input, config)`: mogħdija ta’ eżekuzzjoni primarja li tirritorna test + statistika
- `getConfigSchema()`: tirritorna l-istruttura simili għal JSON Schema tal-konfigurazzjoni valida
- `validateConfig(config)`: tirritorna `{ valid, errors[] }`

Ir-reġistrazzjoni tuża `registerCompressionEngine(engine)` (jew `registerEngine` għal każijiet avvanzati),
li ssejjaħ `assertValidEngine()` u `validateConfig(defaultConfig)` qabel taċċetta.
Uża `unregisterCompressionEngine(id)` biex tneħħi engine waqt l-eżekuzzjoni.

`strategySelector.ts` jirreġistra l-engines integrati qabel ma titħaddem il-kompressjoni. Dan jippermetti lill-previżjoni,
lill-kompressjoni waqt l-eżekuzzjoni, lill-modalità f’munzell, lit-testijiet, u lill-engines futuri jużaw l-istess mogħdija ta’ eżekuzzjoni.

### Kompressjoni tad-deskrizzjoni MCP (relatata)

Reġistru separat jikkompressa l-metadata tad-deskrizzjoni tal-għodod MCP fil-livell tar-reġistru — ara
`open-sse/mcp-server/descriptionCompressor.ts` u [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Dan jerġa’ juża
r-regoli ta’ Caveman iżda jaħdem fuq il-metadata tal-għodod, mhux fuq il-payloads tat-talbiet.

### Engines integrati addizzjonali

Minbarra Caveman, RTK, u LLMLingua-2, ir-reġistru jinkludi diversi engines speċjalizzati mingħajr telf /
strutturali (użati minn pipelines f’munzell, il-playground, u t-testijiet):

| Engine        | Id              | X’jagħmel                                                                                                                                                                                                  |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): jissostitwixxi blokok kbar u kontigwi ta’ test b’referenzi indirizzati skont il-kontenut, sabiex blokok ripetuti/kbar jintbagħtu darba u mbagħad issir referenza għalihom. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): kumpattazzjoni tabulari mingħajr telf ta’ payloads ta’ arrays JSON omoġenji f’forma kolonnari `[N rows]`.                                                                          |
| ionizer       | `ionizer`       | Kampjunar tar-ringieli tal-bidu/nofs/tmiem għal blokok omoġenji kbar ħafna, filwaqt li jaħżen il-parti tan-nofs imħollija barra bħala referenza CCR indirizzata skont il-kontenut.                         |
| session-dedup | `session-dedup` | Deduplikazzjoni indirizzata skont il-kontenut bejn dawriet differenti (ispirata minn TokenMizer): tħalli barra test li diġà deher f’dawriet preċedenti tal-istess sessjoni.                                |

**Istruzzjoni tal-protokoll tal-irkupru CCR (#8033):** l-ewwel darba li CCR jissostitwixxi ≥1 blokka f’
talba, l-engine iżid fil-bidu messaġġ `system` wieħed u idempotenti (li jibda bis-sentinel
`[CCR protocol]`) biex jgħallem lil min jagħmel is-sejħa l-kuntratt markatur → għodda: xi jfisser markatur
`[CCR retrieve hash=<24hex> chars=N]`, li l-hash irid jiġi kkupjat eżattament
(l-24 karattru eżadeċimali kollha — hashes ikkupjati ħażin huma l-kawża probabbli ta’ każijiet fejn
"il-blokka ma nstabitx"), u li markatur `[dedup:ref sha=...]` ifisser "ħares lura fl-istorja", mhux "sejjaħ
l-għodda". In-nota tiġi injettata **biss meta l-`tools[]` iddikjarati minn min jagħmel is-sejħa juru li jista’
tabilħaqq jilħaq `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` f’
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — min jagħmel sejħa sempliċi
kompatibbli ma’ OpenAI mingħajr dik l-għodda qatt ma jirċievi struzzjoni biex isejjaħ xi ħaġa
li ma jistax jilħaq. L-idempotenza tiġi infurzata billi l-istorja tal-messaġġi tiġi skennjata għas-sentinel
qabel l-injezzjoni, sabiex talbiet b’diversi dawriet (li jerġgħu jdoqqu messaġġi preċedenti) ma jakkumulawx
in-nota darba għal kull dawra.

## Caveman

Il-modalità Caveman tiffoka fuq il-kondensazzjoni semantika ta’ proża normali:

- tippreserva blokok tal-kodiċi, URLs, JSON, mogħdijiet, u data strutturata
- tneħħi kliem żejjed, riżervi, kuntest ripetut, u frażijiet konnettivi verbose
- tappoġġja pakketti ta’ regoli tal-fajls adattati għal-lingwa f’`open-sse/services/compression/rules/`
- tibqa’ disponibbli permezz tal-modalitajiet legacy `standard`, `aggressive`, u `ultra`

Is-sezzjoni tad-dashboard hija `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream jirrapporta `~75%` inqas tokens tal-output, iffrankar medju ta’ `65%` fl-output fil-benchmarks
b’firxa ta’ `22-87%`, u għodda b’kompressjoni tal-input ta’ `~46%`. OmniRoute juża ċ-ċifra ta’ Caveman għan-naħa tal-input
meta jiddokumenta l-iffrankar akkumulat tal-prompt/kuntest; il-modalità tal-output ta’ Caveman tibqa’ karatteristika separata
tal-imġiba tar-rispons.

## RTK

Il-modalità RTK tiffoka fuq l-output tal-kmandi u tal-għodod:

- tindividwa klassijiet ta’ output bħal `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testijiet ta’ Cargo/Go, builds ta’ TypeScript/Vite/Webpack, ESLint, awditi/installazzjonijiet ta’ npm, logs ta’ Docker,
  `find`/`grep` tax-shell, stack traces, u logs ġeneriċi
- tapplika 49 filtru JSON minn `open-sse/services/compression/engines/rtk/filters/`
- tappoġġja l-pipeline dikjarattiv stil RTK: tneħħija ta’ ANSI, sostituzzjoni, short-circuit fuq match tal-output,
  tneħħija/żamma ta’ linji, truncation għal kull linja, truncation tar-ras/tad-denb/tal-limitu massimu ta’ linji, u fallback meta jkun vojt
- tappoġġja filtri tal-proġett ikkontrollati mill-fiduċja f’`.rtk/filters.json` u filtri globali f’
  `DATA_DIR/rtk/filters.json`
- tneħħi sekwenzi ANSI, storbju tal-progress, linji ripetuti, u test standard mhux utli
- tippreserva fallimenti azzjonabbli, twissijiet, sommarji, fajls mibdula, u l-kuntest finali
- tista’ b’mod fakultattiv iżżomm output mhux ipproċessat u redatt għall-irkupru/debugging permezz ta’ routes ta’ ġestjoni
  awtentikati

Is-sezzjoni tad-dashboard hija `Dashboard -> Context & Cache -> RTK`.

Id-dettalji operazzjonali għal filtri personalizzati, fiduċja, verifika, u rkupru tal-output mhux ipproċessat jinsabu f’
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK upstream jirrapporta ffrankar ta’ `60-90%` għall-kompressjoni tal-output tal-kmandi. L-eżempju fir-README tiegħu juri
sessjoni ta’ Claude Code ta’ 30 minuta li tinżel minn `~118,000` token għal `~23,900`, jiġifieri ffrankar ta’ `79.7%`.

## LLMLingua-2 (Żbir Semantiku)

Il-modalità LLMLingua-2 twettaq **żbir semantiku tat-tokens** fuq il-proża billi tuża klassifikatur żgħir tat-tokens
ONNX, u tikkomplementa l-engines ibbażati fuq ir-regoli Caveman u RTK:

- tikkompressa l-proża f’messaġġi mhux tas-sistema biss; blokok tal-kodiċi magħluqa b’fences u strutturi oħra ppreservati
  qatt ma jinbidlu
- tħaddem il-backend `@atjsh/llmlingua-2` (ONNX permezz ta’ `@huggingface/transformers`) f’
  worker thread, sabiex l-inferenza tal-mudell qatt ma timblokka l-event loop tat-talba
- hija **stackable** (`stackPriority` 35): f’pipeline akkumulat titħaddem wara l-
  engines strutturali (CCR, session-dedup, headroom, Caveman) iżda qabel `ultra`, peress li
  ż-żbir semantiku huwa l-aktar effettiv fuq test li diġà ġie kkompressat strutturalment — eż.
  `rtk -> caveman -> llmlingua`
- **tibqa’ miftuħa u tkompli taħdem ma’ kwalunkwe żball** (dipendenzi fakultattivi neqsin, ħolqien tal-worker, tagħbija tal-mudell, inferenza,
  jew timeout) → it-test oriġinali jintbagħat lura mingħajr tibdil, u qatt ma jintbagħat żball

Post tal-engine: `open-sse/services/compression/engines/llmlingua/`. Is-sezzjoni tad-dashboard
hija `Dashboard -> Context & Cache -> LLMLingua`.

### Mudelli

Il-mudell default huwa **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
veloċi). Mudell **BERT-base** bi preċiżjoni ogħla (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) huwa disponibbli permezz tal-field `model` tal-konfigurazzjoni tal-engine. `@huggingface/transformers`
iniżżel il-mudell magħżul b’mod lazy mill-HuggingFace Hub għal ġo
`${DATA_DIR}/models/llmlingua` mal-ewwel sejħa (`modelStore.ts`); override tal-konfigurazzjoni `modelPath`
jidderiġih lejn kopja lokali minflok (għal installazzjonijiet offline / air-gapped).

### Dipendenzi fakultattivi u installazzjoni on-demand

Il-peer stack tar-runtime ta’ LLMLingua li jista’ jitneħħa huwa **fakultattiv**. Żewġ packages huma ddikjarati bħala
`optionalDependencies` f’`package.json` u jinżammu **external** mill-build tal-produzzjoni
(`scripts/build/prepublish.ts` ma jinkludihomx fil-bundle):

| Package              | Verżjoni (pin) | Noti                                              |
| -------------------- | -------------- | ------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`        | Package tad-dħul; jiddikjara l-oħrajn bħala peers |
| `js-tiktoken`        | `^1.0.20`      | Tokenizer                                         |

`@huggingface/transformers` huwa ffissat fuq `^4.2.0` (kondiviż mal-mogħdija tal-embeddings lokali u
traċċat ukoll fil-bundle standalone); `@atjsh/llmlingua-2@2.0.5` għandu peer dependency fuqu b’
`"^3.5.2 || ^4.0.0"`, għalhekk kemm Transformers.js v3 kif ukoll v4 huma appoġġjati. Minn 2.0.4,
`@atjsh/llmlingua-2` m’għadux jeħtieġ `@tensorflow/tfjs`, u b’hekk tneħħa l-akbar kontributur individwali
(TensorFlow.js) mill-stack SLM. Iż-żewġ packages ta’ hawn fuq biss huma peers SLM li jistgħu jitneħħew.
`npm install` standard (dev) jinstalla l-stack fakultattiv awtomatikament sakemm id-dipendenzi fakultattivi
ma jiġux esklużi.

**Għaliex on-demand:** il-package ppubblikat fuq npm, il-bundle standalone, u l-image ta’ Docker
jitqassmu **mingħajr** dawn id-dipendenzi biex jibqgħu ħfief. Meta jkunu neqsin, il-gate tad-dipendenzi
tal-worker (probe ta’ resolve għal `@atjsh/llmlingua-2` f’`worker.ts`) ifalli u l-engine
**jibqa’ miftuħ u jkompli jaħdem mingħajr messaġġ** — l-għażla ta’ LLMLingua ma twettaq ebda operazzjoni (it-test jintbagħat lura mingħajr tibdil, u ma jiġi
rreġistrat ebda żball). Biex tattivah f’ambjent imnaqqas, installa l-stack fakultattiv:

```bash
# iffissa għall-verżjonijiet iddikjarati f’package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

It-tneħħija ta’ `@tensorflow/tfjs` (2.0.4+) telimina l-kontributur ta’ ~800 MB li qabel kien dominanti
— il-footprint li jifdal jikkonsisti fir-runtimes ta’ transformers.js + onnxruntime-node,
flimkien mal-mudell TinyBERT (~57 MB) li jitniżżel mal-ewwel użu (mhux permezz ta’ npm).

Skont l-ambjent:

- **Żvilupp / `npm install`** — jiġi installat awtomatikament sakemm ma tkunx għaddejt `--omit=optional`
  (jew `--no-optional`). Ma hija meħtieġa l-ebda azzjoni.
- **npm globali (`npm i -g omniroute`) / awtonomu** — ħaddem il-kmand tal-installazzjoni ta’ hawn fuq ġewwa
  d-direttorju tal-pakkett installat, jew erġa’ installa mingħajr ma tħalli barra d-dipendenzi fakultattivi.
- **Docker** — żid il-kmand tal-installazzjoni f’saff ta’ immaġni derivata; l-immaġni ppubblikata
  tiġi apposta f’verżjoni ridotta.
- **VPS (PM2)** — installa f’`node_modules` tal-app, imbagħad erġa’ ibda l-proċess sabiex il-
  worker jerġa’ jittestja l-gate.
- **Next awtonomu dirett (`npm run build` → `.build/next/standalone/server.js`)** — it-
  traċċa awtonoma ma tinkludi LA l-worker U LANQAS id-dipendenzi fakultattivi, għalhekk l-engine jinfetaħ
  silenzjożament f’każ ta’ falliment. `scripts/build/colocate-standalone.mjs` jerġa’ japplika t-tnejn (esbuild tal-worker +
  l-għeluq tad-dipendenzi fakultattivi fis-siġra awtonoma); jitħaddem awtomatikament permezz tal-hook npm
  `postbuild` wara kull build. Idempotenti, u jfalli b’mod mhux kritiku meta d-dipendenzi jkunu neqsin.

**Ivverifika li huwa attiv:** meta jintgħażel LLMLingua, il-proża reali effettivament tiċkien (l-engine
ma jibqax jinfetaħ f’każ ta’ falliment), u l-ewwel request tiskatta t-tniżżil tal-mudell f’
`${DATA_DIR}/models/llmlingua`. Il-gate intenzjonalment jittestja biss `@atjsh/llmlingua-2` —
il-peers l-oħra huma ESM-only u `require.resolve` jiġġenera żball għalihom anke meta jkunu preżenti — għalhekk
il-worker xorta jinfetaħ f’każ ta’ falliment jekk xi peer ikun tassew nieqes fil-ħin ta’ `import()`.

## Pipelines F’munzell

Il-modalità f’munzell tħaddem il-passi tal-pipeline f’ordni. Il-konfigurazzjoni predefinita hija:

```txt
rtk -> caveman
```

Uża din għal sessjonijiet ta’ aġenti tal-kodifikazzjoni fejn prompt jgħaqqad l-output tal-kmandi ma’ proża umana jew tal-assistent. RTK l-ewwel inaqqas il-logs storbjużi tal-għodod, imbagħad Caveman jikkompressa l-lingwa naturali li jkun fadal.

Il-passi tal-pipeline jiġu kkonfigurati permezz ta’ `stackedPipeline` fis-settings tal-kompressjoni jew permezz ta’ kombinazzjonijiet tal-kompressjoni.

Meta ż-żewġ magni jnaqqsu l-istess payload eliġibbli, l-iffrankar jakkumula:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtru tas-Siġra tal-Aċċessibbiltà MCP

Il-filtru intelliġenti tas-siġra tal-aċċessibbiltà MCP huwa saff ta’ kompressjoni wara l-eżekuzzjoni li jitħaddem fuq ir-**riżultati tal-għodod** MCP, mhux fuq prompts jew kuntest. Huwa mmirat lejn il-payloads dettaljati tas-siġra tal-aċċessibbiltà u tal-istampi tal-istat tal-browser li jintbagħtu lura minn għodod bħal Playwright, computer-use, u servers MCP għall-awtomatizzazzjoni tal-browser.

### X’jagħmel

1. **Tneħħija tal-istorbju** — ineħħi entrati ġeneriċi/tat-test vojta (`- generic:`, `- text: ""`)
2. **Kollass tal-elementi aħwa** — meta ≥ `collapseThreshold` (30 b’mod predefinit) linja konsekuttiva jkunu ripetizzjonijiet strutturali, jiġborhom fl-ewwel `collapseKeepHead` (10 b’mod predefinit) linji + sommarju tal-għadd + l-aħħar `collapseKeepTail` (5 b’mod predefinit) linji
3. **Preservazzjoni tar-referenzi** — l-ankri `[ref=eXX]` meħtieġa minn Playwright/computer-use qatt ma jintmessu
4. **Tronkament strett** — jekk it-test wara l-kollass xorta jaqbeż `maxTextChars` (50,000 b’mod predefinit), jitqassar b’ħjiel għan-navigazzjoni sabiex l-aġent ikun jista’ jkompli jaħdem

### Post tal-magna

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← punt tad-dħul ta’ smartFilterText()
  collapseRepeated.ts ← algoritmu tal-kollass tal-elementi aħwa
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurazzjoni

Ikkontrollata minn `compression.mcpAccessibility` fis-settings globali (migrazzjoni 056). Konfigurazzjoni predefinita:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Il-filtru jiġi applikat biss għal payloads tar-riżultati tal-għodod li t-`type` tagħhom huwa `"text"` u li t-tul tagħhom jaqbeż `minLengthToProcess`. Ma jaffettwax il-kompressjoni tal-prompt jew il-payloads tat-talbiet.

### Iffrankar mistenni

60–80% fuq ir-riżultati tal-għodod tal-istampi tal-istat tal-browser, skont il-kumplessità tal-paġna. L-algoritmu tal-kollass huwa O(n) skont l-għadd ta’ linji u jżid latenza negliġibbli.

### Dan il-filtru mqabbel mal-magni tal-kompressjoni ta’ hawn fuq

| Aspett              | Caveman / RTK / F’munzell             | Filtru tal-aċċessibbiltà MCP           |
| ------------------- | ------------------------------------- | -------------------------------------- |
| Mira                | Prompts / kuntest tat-talba           | Riżultati tal-għodod MCP               |
| Skattar             | Setting tal-modalità tal-kompressjoni | `compression.mcpAccessibility.enabled` |
| Ambitu              | Il-messaġġi SSE kollha                | Ir-riżultati tal-għodod biss           |
| Ankri tar-referenzi | Mhux applikabbli                      | Ippreservati mingħajr kundizzjonijiet  |

---

## Kombinazzjonijiet ta' Kompressjoni

Il-kombinazzjonijiet ta' kompressjoni huma profili ta' kompressjoni msemmija li jistgħu jiġu assenjati lil kombinazzjonijiet tar-routing:

- `compression_combos`: jaħżen il-modalità, il-pipeline, il-konfigurazzjoni RTK, il-konfigurazzjoni tal-lingwa, u l-markatur predefinit
- `compression_combo_assignments`: jimmappja kombinazzjoni ta' kompressjoni ma' kombinazzjoni tar-routing
- l-integrazzjoni waqt l-eżekuzzjoni tirriżolvi kombinazzjoni ta' kompressjoni assenjata qabel is-sovrastruzzjonijiet ġeneriċi tal-kombinazzjoni
- l-analitika tinkludi `compression_combo_id` u `engine`

Post fid-dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Interfaċċa tal-API

| Rotta                                  | Għan                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Settings globali tal-kompressjoni (jinkludu l-konfigurazzjoni `mcpAccessibility`) |
| `/api/compression/preview`             | Previżjoni ta' kwalunkwe modalità ta' kompressjoni                                |
| `/api/compression/language-packs`      | Elenka l-pakketti lingwistiċi Caveman disponibbli                                 |
| `/api/context/caveman/config`          | Alias għas-settings ta' Caveman                                                   |
| `/api/context/rtk/config`              | Valuri predefiniti u settings ta' RTK                                             |
| `/api/context/rtk/filters`             | Katalgu tal-filtri RTK                                                            |
| `/api/context/rtk/test`                | Endpoint ta' previżjoni/test ta' RTK                                              |
| `/api/context/rtk/raw-output/[id]`     | Irkupru awtentikat ta' output mhux ipproċessat u redatt                           |
| `/api/context/combos`                  | CRUD tal-kombinazzjonijiet ta' kompressjoni                                       |
| `/api/context/combos/[id]/assignments` | CRUD tal-assenjazzjonijiet tal-kombinazzjonijiet tar-routing                      |
| `/api/context/analytics`               | Alias għall-analitika tal-kompressjoni                                            |

Ir-rotot ta' ġestjoni jeħtieġu awtentikazzjoni ta' ġestjoni jew kontrolli tal-politika taċ-ċavetta tal-API.

## Għodod MCP

Il-kompressjoni tesponi ħames għodod MCP:

| Għodda                              | Ambitu              | Għan                                        |
| ----------------------------------- | ------------------- | ------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Settings, analitika, statistika tal-cache   |
| `omniroute_compression_configure`   | `write:compression` | Aġġorna s-settings globali                  |
| `omniroute_set_compression_engine`  | `write:compression` | Issettja l-modalità u pipeline fakultattiv  |
| `omniroute_list_compression_combos` | `read:compression`  | Elenka l-kombinazzjonijiet ta' kompressjoni |
| `omniroute_compression_combo_stats` | `read:compression`  | Aqra l-analitika tal-kombinazzjoni/engine   |

## Ambitu u esklużjonijiet

**L-embeddings qatt ma jiġu kkompressati.** `open-sse/handlers/embeddings.ts` qatt ma jsejjaħ
xi engine tal-kompressjoni — il-bodies tat-talba/tweġiba jgħaddu direttament lill-eżekutur
mingħajr ma jinbidlu. Bħalissa dan huwa strutturali (l-embeddings u l-kompletamenti taċ-chat
għandhom handlers separati), mhux kontroll waqt l-eżekuzzjoni, iżda jfisser li t-tħassib dwar
id-distorsjoni tal-vetturi f'#8034 ma għandu ebda wiċċ ta' esponiment fil-mogħdija
tal-embeddings.

**Filtru ta' esklużjoni għal kull mudell/endpoint (#8034).** Għall-kompletamenti taċ-chat,
operatur jista' jispeċifika ids ta' mudelli / miri `provider/model` li qatt ma għandhom jiġu
kkompressati — miżura ta' protezzjoni utli jekk il-kompressjoni xi darba tiġi integrata eqreb
lejn mogħdija biswit l-embeddings, u ġeneralment utli għal kwalunkwe mudell li għalih huwa
importanti li l-prompt jibqa' eżatt byte b'byte (evalwazzjonijiet deterministiċi, prefissi
sensittivi għall-cache, eċċ.).

- Qasam tas-settings: `exclusions?: string[]` fil-konfigurazzjoni globali tal-kompressjoni
  (`GET`/`PUT /api/settings/compression`), ippersistit permezz tan-namespace eżistenti
  `key_value` tal-kompressjoni (`src/lib/db/compression.ts`) — l-ebda tabella ġdida.
- Tab fid-dashboard: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintassi tal-pattern: `*` huwa l-uniku wildcard. Kull metakarattru regex ieħor f'pattern
  jiġi escaped qabel it-tqabbil, għalhekk `gpt-5.6` jaqbel biss mas-sekwenza litterali, u qatt
  ma' `gpt-5x6` (sikur kontra ReDoS, limitat, mingħajr kwantifikaturi nested). Il-patterns
  jitqabblu mingħajr distinzjoni bejn ittri kbar u żgħar kemm mal-id tal-mudell waħdu kif
  ukoll mal-kompost `provider/model` — `gpt-5-6`, `openai/gpt-5-6`, u `openai/*` kollha
  jaħdmu, u `*` waħdu jeskludi kull mudell.
- Tqabbil: `isCompressionExcluded()` / `normalizeCompressionExclusions()` f'
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` jiċċekkja l-mira eskluża
  eżatt wara li jirriżolvi s-settings tal-kompressjoni, **qabel ma jitħaddem kwalunkwe
  engine**, u jittratta tqabbil eżatt bħal meta l-kompressjoni tkun diżattivata globalment
  — jista' jiġi pprovat li l-body tat-talba huwa identiku byte b'byte. Il-qbiż jiġi rreġistrat
  permezz ta' `writeCompressionSkip(..., "excluded")` għall-viżibbiltà fl-analitika.
- Valur predefinit (lista vojta/assenti): identiku għall-imġiba ta' qabel #8034 — xejn ma
  jiġi eskluż.

## Limitazzjonijiet magħrufa

- **LLMLingua-2 (SLM) jeħtieġ dipendenzi fakultattivi fl-istess post.** Il-worker jaħdem biss f’build
  tal-produzzjoni meta `@atjsh/llmlingua-2` + il-peer dependencies tiegħu jitqiegħdu flimkien
  f’`dist/node_modules` (ara `scripts/build/colocateOptionals.mjs`, #4286). Mingħajrhom,
  l-engine jopera b’mod fail-open (jirritorna t-test oriġinali). Ir-resolution tal-worker ma
  għadhiex tiddependi fuq `import.meta.url` (dan jieqaf jaħdem fil-bundle standalone) — minflok
  tkun ankrata mas-cwd tar-runtime / `argv[1]`.
- **Il-pakketti lingwistiċi Caveman `de` / `fr` / `ja` huma parzjali.** Dawn jinkludu regoli
  `context` + `filler` + `structural`, iżda ma għandhomx pakketti `dedup` / `ultra`, għalhekk
  l-intensità `ultra` mhijiex aktar qawwija minn `full` għal dawk il-lingwi (jużaw biss ir-regoli
  tagħhom stess — ma hemm ebda fallback sieket għar-regoli Ingliżi `dedup`/`ultra`, li
  jħarbtu test f’lingwi oħra). `en` / `es` / `id` / `pt-BR` huma kompluti. Kontribuzzjonijiet
  ta’ `dedup.json` + `ultra.json` għall-pakketti parzjali huma milqugħa.
- **It-telemetrija f’munzelli telenka biss l-engines li kkompressaw.** Pass f’pipeline f’munzelli
  li l-engine tiegħu tħaddem iżda pproduċa ffrankar ta’ 0 % jirritorna `stats:null` u għalhekk
  ma jidhirx f’`engineBreakdown` — u ma jistax jintgħaraf minn pass li nqabeż. Biex issir
  distinzjoni bejn “tħaddem, 0 %” u “nqabeż” tkun meħtieġa bidla fil-mudell tal-breakdown,
  u din ġiet posposta.

## Validazzjoni

Il-gates iffukati għal din iż-żona huma:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
