# Compression Engines (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Ang compression ng OmniRoute ay binuo sa paligid ng mga kontrata ng engine. Maaaring direktang magpatakbo ang isang mode ng isang engine
(`caveman` o `rtk`) o ng isang deterministikong stacked pipeline na nagpapatakbo ng maraming engine nang sunod-sunod.

## Mga mode

| Mode         | Landas ng engine                      | Nilalayong input                                            |
| ------------ | ------------------------------------- | ----------------------------------------------------------- |
| `off`        | wala                                  | Eksaktong pagpapanatili ng prompt                           |
| `lite`       | Mga lite helper ng Caveman            | Palaging aktibong paglilinis na mababa ang panganib         |
| `standard`   | Caveman                               | Pagpapaikli ng prompt na nasa natural na wika               |
| `aggressive` | Caveman + mga history/tool summarizer | Mahahabang session ng chat                                  |
| `ultra`      | Caveman + mga pruning helper          | Pagbawi mula sa limitasyon ng context                       |
| `rtk`        | RTK                                   | Output ng terminal, shell, build, test, at git              |
| `omniglyph`  | OmniGlyph                             | Context bilang larawan sa native na wire ng provider        |
| `stacked`    | Pipeline, default na `rtk -> caveman` | Magkahalong mga tool log at prose, pinakamalaking matitipid |

### Mga profile ng compression ng OmniGlyph

Tumatanggap ang `omniglyph` engine (package na `omniglyph`, 1.4.0+) ng pinangalanang semantic profile, na itinatakda
nang pangkalahatan sa pamamagitan ng `omniglyph.profile` sa mga setting ng compression o para sa bawat hakbang sa pamamagitan ng
step config ng stacked pipeline:

| Profile       | Hangganan                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Default. Ang patakarang sinukat ng mga naka-publish na receipt — ginagawang mga larawan ang system, mga dokumento ng tool, at siksik na history |
| `balanced`    | Pinananatiling native ang live state, pinoprotektahan ang huling 8 turn, at kino-collapse ang mas lumang saradong history                       |
| `coding-safe` | Pinananatiling native ang authority, mga tool schema, at live na output ng tool, at pinoprotektahan ang huling 12 turn                          |
| `passthrough` | Nagruruta nang walang pagbabago; nilalaktawan ang engine                                                                                        |

Ang profile ay isang **ceiling, hindi floor**: tumatanggi ang `mergeCompressionProfileOptions` sa package
na payagan ang override ng caller na muling magbukas ng lossy lane na isinara ng profile, kaya hindi maaaring
muling paganahin ng `preserveSystemPrompt: false` sa bawat hakbang ang compression ng system sa ilalim ng `coding-safe`.

Batay sa pagsukat sa codebase na ito: itinataas ng `coding-safe` at `balanced` ang `minCompressChars` sa
maximum nito at pinananatiling native ang system, mga tool schema, at mga resulta ng tool, kaya ang isang session na hindi pa
nakapag-ipon ng history ay humihinto sa `below_min_chars` at walang binabago ang engine. Iyon
ang dahilan kung bakit `aggressive` ang default sa halip na ang pinakaligtas na profile.

Tinutukoy ng package ang sarili nitong saklaw ng model at profile mula sa configuration ng environment nito.
Hindi kailanman ipinapasa ng OmniRoute sa iba ang desisyon: itinatakda ng adapter ang model gate sa
pinakamahigpit na saklaw ng package, kaya maaari lamang paliitin ng mga setting ng host environment ang allowlist, at hindi
kailanman palawakin ito nang lampas sa mga sinukat na receipt ng OmniRoute.

## Registry ng Engine

Matatagpuan ang registry sa `open-sse/services/compression/engines/registry.ts`. Naglalantad ang mga engine ng iisang
kontrata:

- `id`: matatag na engine id gaya ng `caveman` o `rtk`
- `apply(text, config)`: lumang execution path na ginagamit ng mga stacked pipeline
- `compress(input, config)`: pangunahing execution path na nagbabalik ng text + stats
- `getConfigSchema()`: nagbabalik ng JSON-Schema-like na anyo ng wastong config
- `validateConfig(config)`: nagbabalik ng `{ valid, errors[] }`

Ginagamit sa pagrerehistro ang `registerCompressionEngine(engine)` (o `registerEngine` para sa mga advanced na kaso),
na tumatawag sa `assertValidEngine()` at `validateConfig(defaultConfig)` bago tanggapin.
Gamitin ang `unregisterCompressionEngine(id)` upang alisin ang isang engine habang tumatakbo.

Inirerehistro ng `strategySelector.ts` ang mga built-in na engine bago tumakbo ang compression. Dahil dito, magagamit ng preview,
runtime compression, stacked mode, mga test, at mga engine sa hinaharap ang iisang execution path.

### Compression ng paglalarawan ng MCP (kaugnay)

Isang hiwalay na registry ang nagko-compress ng metadata ng paglalarawan ng MCP tool sa antas ng registry — tingnan ang
`open-sse/mcp-server/descriptionCompressor.ts` at [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Muli nitong ginagamit
ang mga panuntunan ng Caveman ngunit gumagana sa metadata ng tool, hindi sa mga request payload.

### Mga karagdagang built-in na engine

Bukod sa Caveman, RTK, at LLMLingua-2, may kasamang ilang espesyalisadong lossless /
structural engine ang registry (ginagamit ng mga stacked pipeline, playground, at mga test):

| Engine        | Id              | Ginagawa nito                                                                                                                                                                                                                    |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): pinapalitan ang malalaki at magkakadugtong na text block ng mga content-addressed reference, upang minsan lang ipadala ang mga paulit-ulit/malalaking block at i-reference na lamang pagkatapos. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): lossless na tabular compaction ng mga homogeneous JSON-array payload tungo sa isang columnar na anyong `[N rows]`.                                                                                       |
| ionizer       | `ionizer`       | Pag-sample ng mga row sa unahan/gitna/hulihan para sa napakalalaking homogeneous block, habang iniimbak ang inalis na gitna bilang isang CCR content-addressed reference.                                                        |
| session-dedup | `session-dedup` | Content-addressed na cross-turn deduplication (hango sa TokenMizer): inaalis ang text na nakita na sa mga naunang turn ng parehong session.                                                                                      |

**Instruksiyon sa CCR retrieve-protocol (#8033):** sa unang pagkakataong palitan ng CCR ang ≥1 block sa isang
request, naglalagay ang engine sa unahan ng iisang idempotent na `system` message (na nagsisimula sa
`[CCR protocol]` sentinel) upang ituro sa tumatawag ang kontrata ng marker → tool: kung ano ang ibig sabihin ng
isang `[CCR retrieve hash=<24hex> chars=N]` marker, na kailangang kopyahin nang eksakto ang hash
(lahat ng 24 na hex character — ang mga hash na maling nakopya ang malamang na sanhi ng mga pagkabigong
"block not found"), at na ang isang `[dedup:ref sha=...]` marker ay nangangahulugang "tumingin pabalik sa history", hindi "tawagin ang
tool". Ini-inject ang tala **kapag pinatutunayan lamang ng inanunsiyong `tools[]` ng tumatawag na kaya nitong
aktuwal na maabot ang `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` sa
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — ang isang karaniwang
OpenAI-compatible na tumatawag na walang tool na iyon ay hindi kailanman makatatanggap ng instruksiyong tumawag sa isang bagay
na hindi nito maaabot. Ipinapatupad ang idempotency sa pamamagitan ng pag-scan sa message history para sa sentinel
bago mag-inject, kaya hindi naiipon ang tala sa bawat turn sa mga multi-turn request (na muling nagpe-play ng mga naunang message).

## Caveman

Nakatuon ang Caveman mode sa semantikong pagkondensa ng karaniwang prosa:

- pinapanatili ang mga code block, URL, JSON, path, at structured data
- inaalis ang palaman, pag-aatubili, inuulit na konteksto, at mahahabang pariralang pang-ugnay
- sinusuportahan ang mga language-aware na file rule pack sa `open-sse/services/compression/rules/`
- nananatiling available sa pamamagitan ng mga legacy mode na `standard`, `aggressive`, at `ultra`

Ang dashboard surface ay `Dashboard -> Context & Cache -> Caveman`.

Iniulat ng upstream ng Caveman ang `~75%` na mas kaunting output token, `65%` na average na pagtitipid sa output sa mga benchmark na may saklaw na `22-87%`, at isang tool na may `~46%` input compression. Ginagamit ng OmniRoute ang bilang ng input-side compression ng Caveman kapag idinodokumento ang pinagsama-samang pagtitipid sa prompt/context; nananatiling hiwalay na feature ng response behavior ang Caveman output mode.

## RTK

Nakatuon ang RTK mode sa output ng command at tool:

- tumutukoy ng mga klase ng output gaya ng `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  mga test ng Cargo/Go, mga build ng TypeScript/Vite/Webpack, ESLint, npm audit/installs, mga log ng Docker,
  shell `find`/`grep`, mga stack trace, at generic na log
- inilalapat ang 49 na JSON filter mula sa `open-sse/services/compression/engines/rtk/filters/`
- sinusuportahan ang RTK-style na declarative pipeline: pag-aalis ng ANSI, replace, match-output short-circuit,
  pag-aalis/pagpapanatili ng mga linya, truncation bawat linya, head/tail/max-line truncation, at on-empty fallback
- sinusuportahan ang trust-gated na mga project filter sa `.rtk/filters.json` at mga global filter sa
  `DATA_DIR/rtk/filters.json`
- inaalis ang mga ANSI sequence, ingay ng progreso, mga inuulit na linya, at hindi kapaki-pakinabang na boilerplate
- pinapanatili ang mga failure na maaaring aksiyunan, babala, buod, binagong file, at tail context
- maaaring opsyonal na panatilihin ang na-redact na raw output para sa recovery/debugging sa pamamagitan ng mga authenticated management route

Ang dashboard surface ay `Dashboard -> Context & Cache -> RTK`.

Makikita ang mga detalye ng operasyon para sa mga custom filter, trust, verify, at raw-output recovery sa
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Iniulat ng upstream ng RTK ang `60-90%` na pagtitipid para sa compression ng command output. Ipinapakita ng halimbawa sa README nito ang isang 30 minutong session ng Claude Code na bumaba mula `~118,000` token tungong `~23,900`, o `79.7%` na natipid.

## LLMLingua-2 (Semantic Pruning)

Nagsasagawa ang LLMLingua-2 mode ng **semantic token pruning** sa prosa gamit ang isang maliit na ONNX token classifier, bilang pandagdag sa mga rule-based engine na Caveman at RTK:

- kino-compress lamang ang prosa sa mga mensaheng hindi system; hindi kailanman binabago ang mga fenced code block at iba pang pinapanatiling construct
- pinapatakbo ang `@atjsh/llmlingua-2` backend (ONNX sa pamamagitan ng `@huggingface/transformers`) sa isang worker thread, kaya hindi kailanman bina-block ng model inference ang request event loop
- ay **maaaring i-stack** (`stackPriority` 35): sa isang stacked pipeline, tumatakbo ito pagkatapos ng mga structural engine (CCR, session-dedup, headroom, Caveman) ngunit bago ang `ultra`, dahil pinakamabisa ang semantic pruning sa text na structurally compressed na — hal.
  `rtk -> caveman -> llmlingua`
- **nagfa-fail-open sa anumang error** (nawawalang optional deps, worker spawn, model load, inference,
  o timeout) → ibinabalik ang orihinal na text nang walang pagbabago, at hindi kailanman error

Lokasyon ng engine: `open-sse/services/compression/engines/llmlingua/`. Ang dashboard surface
ay `Dashboard -> Context & Cache -> LLMLingua`.

### Mga Model

Ang default na model ay **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
mabilis). Available ang mas tumpak na **BERT-base** model (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) sa pamamagitan ng `model` field ng engine config. Dina-download ng `@huggingface/transformers`
ang napiling model nang lazy mula sa HuggingFace Hub papunta sa
`${DATA_DIR}/models/llmlingua` sa unang call (`modelStore.ts`); sa halip, maaaring gamitin ang
`modelPath` config override upang ituro ito sa isang lokal na kopya (mga offline / air-gapped na installation).

### Mga opsyonal na dependency at on-demand na pag-install

**Opsyonal** ang prunable na LLMLingua runtime peer stack. Dalawang package ang idineklarang
`optionalDependencies` sa `package.json` at pinananatiling **external** ng production build
(hindi isinasama ng `scripts/build/prepublish.ts` ang mga ito sa bundle):

| Package              | Bersyon (pin) | Mga Tala                                            |
| -------------------- | ------------- | --------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | Entry package; idinedeklara ang iba bilang mga peer |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                           |

Naka-pin ang `@huggingface/transformers` sa `^4.2.0` (nakabahagi sa local embeddings path at
naka-trace rin sa standalone bundle); gumagamit ang `@atjsh/llmlingua-2@2.0.5` ng
`"^3.5.2 || ^4.0.0"` bilang peer range nito, kaya sinusuportahan ang Transformers.js v3 at v4. Mula noong 2.0.4,
hindi na kinakailangan ng `@atjsh/llmlingua-2` ang `@tensorflow/tfjs`, na nag-alis sa pinakamalaking
nag-iisang contributor (TensorFlow.js) mula sa SLM stack. Ang dalawang package lamang sa itaas ang mga prunable na SLM
peer. Awtomatikong ini-install ng karaniwang `npm install` (dev) ang opsyonal na stack maliban kung
hindi isinama ang mga optional dependency.

**Bakit on-demand:** ipinapadala ang package na naka-publish sa npm, ang standalone bundle, at ang Docker image
nang **wala** ang mga dependency na ito upang manatiling maliit. Kapag wala ang mga ito, nabibigo ang dependency
gate ng worker (isang `@atjsh/llmlingua-2` resolve probe sa `worker.ts`) at **tahimik na nagfa-fail-open** ang engine — nagiging no-op ang pagpili sa LLMLingua (ibinabalik ang text nang walang pagbabago at walang
nila-log na error). Upang i-activate ito sa isang pruned environment, i-install ang opsyonal na stack:

```bash
# i-pin sa mga bersyong idineklara sa package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Inaalis ng pagtanggal sa `@tensorflow/tfjs` (2.0.4+) ang dating dominanteng ~800 MB
na contributor — ang natitirang footprint ay ang mga runtime ng transformers.js + onnxruntime-node,
kasama ang TinyBERT model (~57 MB) na dina-download sa unang paggamit (hindi sa pamamagitan ng npm).

Bawat environment:

- **Dev / `npm install`** — awtomatikong ini-install maliban kung ipinasa mo ang `--omit=optional`
  (o `--no-optional`). Walang kailangang gawin.
- **Global npm (`npm i -g omniroute`) / standalone** — patakbuhin ang command sa pag-install sa itaas sa loob
  ng direktoryo ng naka-install na package, o muling mag-install nang hindi inaalis ang mga optional na dependency.
- **Docker** — idagdag ang command sa pag-install sa isang derived image layer; sadyang
  slim ang inilalathalang image.
- **VPS (PM2)** — mag-install sa `node_modules` ng app, pagkatapos ay i-restart ang proseso upang
  muling ma-probe ng worker ang gate.
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — HINDI kasama sa
  standalone trace ang worker o ang mga optional na dependency, kaya tahimik na nagfa-fail-open
  ang engine. Muling inilalapat ng `scripts/build/colocate-standalone.mjs` ang dalawa (worker esbuild +
  optional-dep closure sa standalone tree); awtomatiko itong tumatakbo sa pamamagitan ng
  `postbuild` npm hook pagkatapos ng bawat build. Idempotent, at banayad na nagfa-fail kapag wala ang mga dependency.

**Tiyaking aktibo ito:** kapag LLMLingua ang napili, talagang umiikli ang aktuwal na prosa (hindi na
nagfa-fail-open ang engine), at iti-trigger ng unang request ang pag-download ng model sa
`${DATA_DIR}/models/llmlingua`. Sadyang `@atjsh/llmlingua-2` lamang ang pino-probe ng gate —
ESM-only ang iba pang peer at nagti-throw ang `require.resolve` sa mga ito kahit naroon ang mga ito — kaya
nagfa-fail-open pa rin ang worker kung talagang nawawala ang alinmang peer sa oras ng `import()`.

## Mga Stacked Pipeline

Pinapatakbo ng stacked mode ang mga hakbang ng pipeline nang sunod-sunod. Ang default ay:

```txt
rtk -> caveman
```

Gamitin ito para sa mga session ng coding agent kung saan pinagsasama ng isang prompt ang output ng command at prosa mula sa tao o assistant. Binabawasan muna ng RTK ang maingay na mga log ng tool, pagkatapos ay kino-compress ng Caveman ang natitirang natural na wika.

Kino-configure ang mga hakbang ng pipeline gamit ang `stackedPipeline` sa mga setting ng compression o sa pamamagitan ng mga combo ng compression.

Kapag parehong binawasan ng dalawang engine ang iisang kwalipikadong payload, naiipon ang matitipid:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filter ng Accessibility Tree ng MCP

Ang smart filter ng accessibility tree ng MCP ay isang post-execution compression layer na tumatakbo sa mga **resulta ng tool** ng MCP, hindi sa mga prompt o context. Tina-target nito ang mahahabang payload ng accessibility tree at browser snapshot na ibinabalik ng mga tool tulad ng Playwright, computer-use, at mga MCP server para sa browser automation.

### Ang ginagawa nito

1. **Pag-aalis ng ingay** — inaalis ang mga walang-lamang generic/text entry (`- generic:`, `- text: ""`)
2. **Pag-collapse ng magkakasunod na item** — kapag ang ≥ `collapseThreshold` (default na 30) magkakasunod na linya ay mga pag-uulit ng estruktura, kino-collapse ang mga ito sa unang `collapseKeepHead` (default na 10) linya + buod ng bilang + huling `collapseKeepTail` (default na 5) linya
3. **Pagpapanatili ng ref** — hindi kailanman binabago ang mga anchor na `[ref=eXX]` na kailangan ng Playwright/computer-use
4. **Mahigpit na truncation** — kung lumalampas pa rin sa `maxTextChars` (default na 50,000) ang text pagkatapos ng pag-collapse, tina-truncate ito nang may pahiwatig sa navigation upang makapagpatuloy sa paggawa ang agent

### Lokasyon ng engine

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← entry point ng smartFilterText()
  collapseRepeated.ts ← algorithm ng pag-collapse ng magkakasunod na item
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configuration

Kinokontrol ng `compression.mcpAccessibility` sa mga global setting (migration 056). Default na config:

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

Inilalapat lamang ang filter sa mga payload ng resulta ng tool na ang `type` ay `"text"` at ang haba ay lumalampas sa `minLengthToProcess`. Hindi nito naaapektuhan ang prompt compression o mga request payload.

### Inaasahang matitipid

60–80% sa mga resulta ng browser snapshot tool, depende sa pagiging kumplikado ng page. Ang collapse algorithm ay O(n) batay sa bilang ng linya at nagdaragdag lamang ng napakaliit na latency.

### Ang filter na ito kumpara sa mga compression engine sa itaas

| Aspeto         | Caveman / RTK / Stacked      | Filter ng accessibility ng MCP         |
| -------------- | ---------------------------- | -------------------------------------- |
| Target         | Mga request prompt / context | Mga resulta ng MCP tool                |
| Trigger        | Setting ng compression mode  | `compression.mcpAccessibility.enabled` |
| Saklaw         | Lahat ng SSE message         | Mga resulta lamang ng tool             |
| Mga ref anchor | N/A                          | Palaging pinapanatili                  |

---

## Mga Combo ng Kompresyon

Ang mga combo ng kompresyon ay mga pinangalanang profile ng kompresyon na maaaring italaga sa mga combo ng pagruruta:

- `compression_combos`: nag-iimbak ng mode, pipeline, configuration ng RTK, configuration ng wika, at pananda ng default
- `compression_combo_assignments`: nagmamapa ng combo ng kompresyon sa isang combo ng pagruruta
- nilulutas muna ng integrasyon sa runtime ang nakatalagang combo ng kompresyon bago ang mga pangkalahatang override ng combo
- kasama sa analytics ang `compression_combo_id` at `engine`

Lokasyon sa Dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Saklaw ng API

| Ruta                                   | Layunin                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Mga pandaigdigang setting ng kompresyon (kasama ang configuration ng `mcpAccessibility`) |
| `/api/compression/preview`             | I-preview ang anumang mode ng kompresyon                                                 |
| `/api/compression/language-packs`      | Ilista ang mga available na language pack ng Caveman                                     |
| `/api/context/caveman/config`          | Alias ng mga setting ng Caveman                                                          |
| `/api/context/rtk/config`              | Mga default at setting ng RTK                                                            |
| `/api/context/rtk/filters`             | Catalog ng filter ng RTK                                                                 |
| `/api/context/rtk/test`                | Endpoint para sa preview/pagsubok ng RTK                                                 |
| `/api/context/rtk/raw-output/[id]`     | Awtorisadong pagbawi ng na-redact na raw output                                          |
| `/api/context/combos`                  | CRUD ng combo ng kompresyon                                                              |
| `/api/context/combos/[id]/assignments` | CRUD ng pagtatalaga ng combo ng pagruruta                                                |
| `/api/context/analytics`               | Alias ng analytics ng kompresyon                                                         |

Nangangailangan ang mga ruta ng pamamahala ng authentication sa pamamahala o mga pagsusuri sa patakaran ng API key.

## Mga Tool ng MCP

Naglalantad ang kompresyon ng limang tool ng MCP:

| Tool                                | Saklaw              | Layunin                                         |
| ----------------------------------- | ------------------- | ----------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Mga setting, analytics, at estadistika ng cache |
| `omniroute_compression_configure`   | `write:compression` | I-update ang mga pandaigdigang setting          |
| `omniroute_set_compression_engine`  | `write:compression` | Itakda ang mode at opsyonal na pipeline         |
| `omniroute_list_compression_combos` | `read:compression`  | Ilista ang mga combo ng kompresyon              |
| `omniroute_compression_combo_stats` | `read:compression`  | Basahin ang analytics ng combo/engine           |

## Saklaw at mga pagbubukod

**Hindi kailanman kino-compress ang mga embedding.** Hindi kailanman tumatawag ang `open-sse/handlers/embeddings.ts` sa anumang
engine ng kompresyon — dumidiretso sa executor ang mga body ng request/response nang hindi binabago.
Sa kasalukuyan, istruktural ito (magkahiwalay na handler ang mga embedding at chat completion), hindi isang
pagsusuri sa runtime, ngunit nangangahulugan itong walang puntong maaaring maapektuhan ang alalahanin tungkol
sa pagbaluktot ng vector sa #8034 sa path ng mga embedding.

**Filter ng pagbubukod ayon sa model/endpoint (#8034).** Para sa mga chat completion, maaaring tukuyin ng operator ang
mga model ID / target na `provider/model` na hindi kailanman dapat i-compress — isang proteksiyong kapaki-pakinabang kung
ikokonekta ang kompresyon nang mas malapit sa isang path na katabi ng mga embedding sa hinaharap, at kapaki-pakinabang din
sa pangkalahatan para sa anumang model na nangangailangan ng eksaktong byte-for-byte na prompt (mga deterministikong eval,
mga prefix na sensitibo sa cache, atbp.).

- Field ng setting: `exclusions?: string[]` sa pandaigdigang configuration ng kompresyon
  (`GET`/`PUT /api/settings/compression`), na ipinapanatili sa pamamagitan ng umiiral na namespace ng kompresyon na `key_value`
  (`src/lib/db/compression.ts`) — walang bagong table.
- Tab sa Dashboard: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Syntax ng pattern: `*` lamang ang wildcard. Ang bawat iba pang regex metacharacter sa isang pattern ay
  ine-escape bago ang pagtutugma, kaya ang `gpt-5.6` ay tumutugma lamang sa literal na string at hindi kailanman sa `gpt-5x6`
  (ligtas laban sa ReDoS, may hangganan, at walang magkakapatong na quantifier). Hindi sensitibo sa laki o liit ng titik ang pagtutugma ng mga pattern
  laban sa parehong payak na model ID at composite na `provider/model` — gumagana lahat ang `gpt-5-6`, `openai/gpt-5-6`,
  at `openai/*`, at ibinubukod ng `*` lamang ang bawat model.
- Pagtutugma: `isCompressionExcluded()` / `normalizeCompressionExclusions()` sa
  `open-sse/services/compression/exclusions.ts`. Sinusuri ng `chatCore.ts` ang ibinukod na target
  kaagad pagkatapos lutasin ang mga setting ng kompresyon, **bago tumakbo ang anumang engine**, at itinuturing ang isang pagtutugma
  na eksaktong katulad ng pandaigdigang pag-disable sa kompresyon — mapatutunayang
  magkapareho sa bawat byte ang body ng request. Itinatala ang paglaktaw sa pamamagitan ng `writeCompressionSkip(..., "excluded")` para sa
  visibility sa analytics.
- Default (walang laman/walang listahan): katulad ng gawi bago ang #8034 — walang ibinubukod.

## Mga kilalang limitasyon

- **Nangangailangan ang LLMLingua-2 (SLM) ng magkakasamang nakalagay na mga opsyonal na dependency.** Tumatakbo lamang ang worker sa isang
  production build kapag ang `@atjsh/llmlingua-2` + mga peer nito ay magkakasamang inilagay sa
  `dist/node_modules` (tingnan ang `scripts/build/colocateOptionals.mjs`, #4286). Kung wala ang mga ito,
  nagfa-fail-open ang engine (ibinabalik ang orihinal na teksto). Hindi na nakadepende ang pag-resolve ng worker sa
  `import.meta.url` (hindi ito gumagana sa standalone bundle) — nakabatay ito sa runtime
  cwd / `argv[1]`.
- **Bahagya lamang ang mga language pack na `de` / `fr` / `ja` ng Caveman.** Naglalaman ang mga ito ng mga panuntunang `context` +
  `filler` + `structural` ngunit walang mga pack na `dedup` / `ultra`, kaya ang intensity na `ultra` ay
  hindi mas malakas kaysa sa `full` para sa mga wikang iyon (sarili lamang nilang mga panuntunan ang ginagamit nila — walang
  tahimik na fallback sa mga panuntunang `dedup`/`ultra` ng English, na maaaring sumira sa tekstong nasa ibang wika).
  Kumpleto ang `en` / `es` / `id` / `pt-BR`. Malugod na tinatanggap ang mga kontribusyon ng `dedup.json` + `ultra.json`
  para sa mga bahagyang kumpletong pack.
- **Inililista lamang ng stacked telemetry ang mga engine na nakapag-compress.** Ang isang hakbang sa stacked pipeline na
  tumakbo ang engine ngunit nakagawa ng 0 % na pagtitipid ay nagbabalik ng `stats:null` at samakatuwid ay hindi lumalabas sa
  `engineBreakdown` — hindi ito maipagkaiba sa isang hakbang na nilaktawan. Ang pagkilala sa pagitan ng
  "tumakbo, 0 %" at "nilaktawan" ay mangangailangan ng pagbabago sa breakdown model at ipinagpaliban muna.

## Pagpapatunay

Ang mga nakatuong gate para sa bahaging ito ay:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
