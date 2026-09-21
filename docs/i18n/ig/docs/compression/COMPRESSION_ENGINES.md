# Compression Engines (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Mkpakọ OmniRoute gbadoro ụkwụ na nkwekọrịta engine. Mode nwere ike ịgba otu engine ozugbo
(`caveman` ma ọ bụ `rtk`) ma ọ bụ pipeline a haziri n'ụzọ a na-agbanweghi agbanwe nke na-agba ọtụtụ engine n'usoro.

## Mode

| Mode         | Ụzọ engine                          | Ntinye e zubere                                        |
| ------------ | ----------------------------------- | ------------------------------------------------------ |
| `off`        | enweghị                             | Ichekwa prompt kpọmkwem                                |
| `lite`       | Ndị enyemaka Caveman lite           | Nhicha ihe ize ndụ ya dị ala nke na-arụ ọrụ mgbe niile |
| `standard`   | Caveman                             | Mkpokọta prompt e dere n'asụsụ mmadụ                   |
| `aggressive` | Caveman + ndị nchịkọta history/tool | Oge nkata dị ogologo                                   |
| `ultra`      | Caveman + ndị enyemaka pruning      | Iweghachite mgbe e ruru oke context                    |
| `rtk`        | RTK                                 | Mmepụta terminal, shell, build, test, na git           |
| `omniglyph`  | OmniGlyph                           | Context-dịka-image na waya provider nke ala ya         |
| `stacked`    | Pipeline, ndabara `rtk -> caveman`  | Tool log na prose agwakọtara, nchekwa kachasị          |

### Profaịlụ mkpakọ OmniGlyph

Engine `omniglyph` (ngwugwu `omniglyph`, 1.4.0+) na-anabata profaịlụ semantic nwere aha, nke a na-ahazi
n'ozuzu site na `omniglyph.profile` n'ime ntọala mkpakọ ma ọ bụ maka nzọụkwụ ọ bụla site na
nhazi nzọụkwụ nke pipeline stacked:

| Profaịlụ      | Oke                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Ndabara. Iwu ndị receipt e bipụtara tụrụ — na-eme system, tool docs na history jupụtara n'ime ka ha bụrụ image |
| `balanced`    | Na-edobe live state ka ọ bụrụ native, na-echekwa turn 8 ikpeazụ, ma na-achịkọta history ochie emechiri emechi  |
| `coding-safe` | Na-edobe authority, tool schemas na live tool output ka ha bụrụ native, na-echekwa turn 12 ikpeazụ             |
| `passthrough` | Na-ebufe n'enweghị mgbanwe; a na-amafe engine ahụ                                                              |

Profaịlụ ahụ bụ **uko, ọ bụghị ala**: `mergeCompressionProfileOptions` dị na ngwugwu ahụ
na-ajụ ikwe ka override nke onye kpọrọ ya mepee ọzọ lane na-efunahụ data nke profaịlụ mechiri, ya mere
`preserveSystemPrompt: false` nke nzọụkwụ ọ bụla enweghị ike ime ka mkpakọ system rụọ ọrụ ọzọ n'okpuru `coding-safe`.

Dịka a tụrụ na codebase a: `coding-safe` na `balanced` na-ebuli `minCompressChars` ruo
oke ya kachasị elu ma na-edobe system, tool schemas na tool results ka ha bụrụ native, ya mere session nke na-enwebeghị
history zuru ezu na-akwụsị na `below_min_chars`, engine ahụ anaghị agbanwekwa ihe ọ bụla. Ọ bụ
ya mere ndabara ji bụrụ `aggressive` kama profaịlụ kachasị nchebe.

Ngwugwu ahụ na-ekpebi scope model na profaịlụ nke ya site na nhazi environment ya.
OmniRoute anaghị enyefe mkpebi ahụ: adapter ahụ na-akpọgide model gate na scope kachasị
mmachi nke ngwugwu ahụ, ya mere ntọala environment nke host nwere ike naanị ime ka allowlist dị warara, ọ gaghị
eme ka ọ gbasaa gafee receipt OmniRoute tụrụ.

## Ndebanye Injin

Ndebanye ahụ dị na `open-sse/services/compression/engines/registry.ts`. Injin niile na-ekpughe otu
nkwekọrịta a na-ekekọrịta:

- `id`: id injin na-adịghị agbanwe agbanwe dịka `caveman` ma ọ bụ `rtk`
- `apply(text, config)`: ụzọ mmezu ochie nke pipeline ndị a kwakọtara ọnụ na-eji
- `compress(input, config)`: ụzọ mmezu bụ isi nke na-eweghachi ederede + ọnụ ọgụgụ
- `getConfigSchema()`: na-eweghachi ọdịdị yiri JSON-Schema nke config ziri ezi
- `validateConfig(config)`: na-eweghachi `{ valid, errors[] }`

Ndebanye na-eji `registerCompressionEngine(engine)` (ma ọ bụ `registerEngine` maka ọnọdụ ndị dị elu),
nke na-akpọ `assertValidEngine()` na `validateConfig(defaultConfig)` tupu ọ nabata ya.
Jiri `unregisterCompressionEngine(id)` wepụ injin n'oge ọ na-arụ ọrụ.

`strategySelector.ts` na-edebanye injin ndị arụnyere n'ime sistemụ tupu mkpakọ amalite. Nke a na-eme ka nlele tupu oge,
mkpakọ n'oge arụmọrụ, ọnọdụ nkwakọ, ule, na injin ndị ga-abịa n'ọdịnihu jiri otu ụzọ mmezu ahụ.

### Mkpakọ nkọwa MCP (nke metụtara ya)

Ndebanye ọzọ dị iche na-akpakọ metadata nkọwa ngwaọrụ MCP n'ogo ndebanye — lee
`open-sse/mcp-server/descriptionCompressor.ts` na [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ọ na-ejigharị
iwu Caveman mana ọ na-arụ ọrụ na metadata ngwaọrụ, ọ bụghị payload arịrịọ.

### Injin ndị ọzọ arụnyere n'ime sistemụ

Na mgbakwunye na Caveman, RTK, na LLMLingua-2, ndebanye ahụ nwere ọtụtụ injin pụrụ iche na-adịghị atụfu data /
nke nhazi (nke pipeline ndị a kwakọtara ọnụ, ebe nnwale, na ule na-eji):

| Injin         | Id              | Ihe ọ na-eme                                                                                                                                                                                                              |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): na-eji ntụaka dabere na ọdịnaya dochie nnukwu ngọngọ ederede ndị na-esochi ibe ha, ka e wee zipụ ngọngọ ndị a na-emegharị/ndị buru ibu naanị otu ugboro ma jiri ntụaka kpọtụrụ ha emesịa. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): mkpakọ tabular na-adịghị atụfu data nke payload JSON-array yiri ibe ha ka ọ bụrụ ụdị columnar `[N rows]`.                                                                                         |
| ionizer       | `ionizer`       | Ịhọrọ ahịrị nlele site n'isi/etiti/ọdụ maka nnukwu ngọngọ yiri ibe ha, na-echekwa etiti e wepụrụ dịka ntụaka CCR dabere na ọdịnaya.                                                                                       |
| session-dedup | `session-dedup` | Mwepụ oyiri gafee ntụgharị nke dabere na ọdịnaya (nke TokenMizer kpaliri): na-ewepụ ederede a hụlarị na ntụgharị mbụ nke otu nnọkọ ahụ.                                                                                   |

**Ntụziaka protokol iweghachite CCR (#8033):** oge mbụ CCR dochiri ≥1 ngọngọ n'ime
arịrịọ, injin ahụ na-etinye otu ozi `system` na mbido, nke anaghị agbanwe ma e tinye ya ọzọ (na-amalite na
ihe njirimara `[CCR protocol]`) iji kuziere onye na-akpọ ya nkwekọrịta marker → ngwaọrụ: ihe
marker `[CCR retrieve hash=<24hex> chars=N]` pụtara, na a ga-edepụtarịrị hash ahụ otu ọ dị
(mkpụrụ hex 24 niile — hash ndị edepụtaghị nke ọma nwere ike ịbụ ihe kpatara njehie "ahụghị ngọngọ"
), nakwa na marker `[dedup:ref sha=...]` pụtara "laghachi leba anya n'akụkọ ihe mere eme", ọ bụghị "kpọọ
ngwaọrụ". A na-etinye ndetu ahụ **naanị mgbe `tools[]` onye na-akpọ ya kwupụtara gosiri na ọ nwere ike
irute `omniroute_ccr_retrieve` n'ezie** (`callerSupportsCcrRetrieve()` dị na
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — onye na-akpọ ya nke kwekọrọ naanị na
OpenAI ma na-enweghị ngwaọrụ ahụ agaghị enweta ntụziaka ka ọ kpọọ ihe ọ na-enweghị ike
irute. A na-ahụ na ọ naghị agbanwe ma e tinye ya ọzọ site n'ịchọ ihe njirimara ahụ n'akụkọ ozi
tupu etinye ya, ka arịrịọ ọtụtụ ntụgharị (nke na-akpọghachi ozi ndị gara aga) ghara ịkwakọba
ndetu otu ugboro n'otu ntụgharị.

## Caveman

Ụdị Caveman na-elekwasị anya n'ịchịkọta nkọwa nkịtị n'ụzọ semantic:

- na-echekwa ngọngọ koodu, URL, JSON, ụzọ faịlụ, na data ahaziri ahazi
- na-ewepụ okwu ndoju, okwu mgbagharị, ọnọdụ e kwughachiri, na ahịrịokwu njikọ dị ogologo
- na-akwado nchịkọta iwu faịlụ na-eburu asụsụ n'uche na `open-sse/services/compression/rules/`
- ka dị site n'ụdị ochie `standard`, `aggressive`, na `ultra`

Ebe ya na dashboard bụ `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream na-akọ token mmepụta pere mpe site na `~75%`, nkezi nchekwa mmepụta `65%` na benchmark
nke nwere oke `22-87%`, yana ngwa mkpakọ ntinye `~46%`. OmniRoute na-eji ọnụọgụ Caveman nke akụkụ ntinye
mgbe ọ na-edekọ nchekwa prompt/context ndị agbakọtara; ụdị mmepụta Caveman ka bụ njirimara
omume nzaghachi dị iche.

## RTK

Ụdị RTK na-elekwasị anya na mmepụta iwu na ngwa:

- na-achọpụta klas mmepụta dịka `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  ule Cargo/Go, build TypeScript/Vite/Webpack, ESLint, audit/nwụnye npm, ndekọ Docker,
  `find`/`grep` nke shell, stack trace, na ndekọ izugbe
- na-etinye ihe nzacha JSON 49 sitere na `open-sse/services/compression/engines/rtk/filters/`
- na-akwado pipeline nkwupụta ụdị RTK: iwepụ ANSI, nnọchi, nkwụsị mkpirisi match-output,
  iwepụ/idebe ahịrị, mbelata n'ahịrị ọ bụla, mbelata head/tail/max-line, na fallback mgbe ọ tọgbọ chakoo
- na-akwado ihe nzacha project e ji ntụkwasị obi achịkwa na `.rtk/filters.json` yana ihe nzacha zuru ụwa ọnụ na
  `DATA_DIR/rtk/filters.json`
- na-ewepụ usoro ANSI, mkpọtụ ọganihu, ahịrị e kwughachiri, na boilerplate na-abaghị uru
- na-echekwa ọdịda ndị a pụrụ ime ihe banyere ha, ịdọ aka ná ntị, nchịkọta, faịlụ ndị gbanwere, na ọnọdụ tail
- nwere ike idebe mmepụta raw e zoro ozi nzuzo n'ime ya maka iweghachite/debugging site na route njikwa
  e nyere nkwenye njirimara

Ebe ya na dashboard bụ `Dashboard -> Context & Cache -> RTK`.

Nkọwa arụmọrụ maka ihe nzacha ahaziri iche, ntụkwasị obi, verify, na iweghachite raw-output dị na
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK upstream na-akọ nchekwa `60-90%` maka mkpakọ mmepụta iwu. Ihe atụ README ya na-egosi session
Claude Code nke nkeji 30 si na token `~118,000` ruo `~23,900`, ya bụ nchekwa `79.7%`.

## LLMLingua-2 (Semantic Pruning)

Ụdị LLMLingua-2 na-eme **semantic token pruning** na prose site n'iji classifier token ONNX
dị nta, iji kwado engine Caveman na RTK ndị dabere na iwu:

- na-akpakọ prose naanị n'ozi ndị na-abụghị system; a naghị agbanwe ngọngọ koodu fenced na construct
  ndị ọzọ echekwara
- na-agba backend `@atjsh/llmlingua-2` (ONNX site na `@huggingface/transformers`) n'ime
  worker thread, ka inference model ghara igbochi event loop nke arịrịọ
- bụ nke **a pụrụ ịgbakọta** (`stackPriority` 35): n'ime pipeline agbakọtara, ọ na-agba mgbe
  engine nhazi (CCR, session-dedup, headroom, Caveman) gasịrị mana tupu `ultra`, ebe ọ bụ na
  semantic pruning na-arụ ọrụ nke ọma karịa na ederede e jirila nhazi kwakọba — dịka
  `rtk -> caveman -> llmlingua`
- **na-eme fail-open ma njehie ọ bụla mee** (optional deps na-efu, worker spawn, ibu model, inference,
  ma ọ bụ timeout) → a na-eweghachi ederede mbụ n'enweghị mgbanwe, ọ bụghị njehie

Ebe engine dị: `open-sse/services/compression/engines/llmlingua/`. Ebe ya na dashboard
bụ `Dashboard -> Context & Cache -> LLMLingua`.

### Model

Model ndabara bụ **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
ngwa ngwa). Model **BERT-base** nwere izi ezi ka elu (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) dị site na field `model` nke nhazi engine. `@huggingface/transformers`
na-ebudata model ahọpụtara nwayọ naanị mgbe achọrọ ya site na HuggingFace Hub banye na
`${DATA_DIR}/models/llmlingua` na oku mbụ (`modelStore.ts`); override nhazi `modelPath`
na-atụ ya aka na oyiri local kama (nwụnye offline / air-gapped).

### Dependency nhọrọ & nrụnye mgbe achọrọ ya

Runtime peer stack LLMLingua nke a pụrụ iwepụ bụ **nhọrọ**. E kwupụtara package abụọ dịka
`optionalDependencies` na `package.json` ma debe ha **external** site na production build
(`scripts/build/prepublish.ts` anaghị etinye ha n'ime bundle):

| Package              | Version (pin) | Nkọwa                                        |
| -------------------- | ------------- | -------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | Package mbata; na-ekwupụta ndị ọzọ dịka peer |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                    |

A kpọgidere `@huggingface/transformers` na `^4.2.0` (ya na ụzọ embeddings local na-ekerịta ya,
a na-etinyekwa ya na standalone bundle); `@atjsh/llmlingua-2@2.0.5` na-adabere na ya dịka peer site na
`"^3.5.2 || ^4.0.0"`, ya mere a na-akwado Transformers.js v3 na v4. Kemgbe 2.0.4,
`@atjsh/llmlingua-2` anaghịzi achọ `@tensorflow/tfjs`, nke wepụrụ ihe kacha enye ibu
(TensorFlow.js) na stack SLM. Naanị package abụọ dị n'elu bụ peer SLM a pụrụ iwepụ.
`npm install` ọkọlọtọ (dev) na-etinye stack nhọrọ ahụ na-akpaghị aka ma ọ bụrụ na ewepụghị
dependency nhọrọ.

**Ihe mere o ji bụrụ mgbe achọrọ ya:** package e bipụtara na npm, standalone bundle, na image Docker
na-abịa **na-enweghị** dep ndị a ka ha ghara ibu ibu. Mgbe ha na-anọghị, ọnụ ụzọ dependency
nke worker (nnwale resolve `@atjsh/llmlingua-2` na `worker.ts`) na-ada, engine ahụ wee
**mee fail-open n'ekwughị ihe ọ bụla** — ịhọrọ LLMLingua aghọọ no-op (a na-eweghachi ederede n'enweghị mgbanwe,
a naghị edekọ njehie). Iji mee ka ọ rụọ ọrụ na gburugburu ebe e wepụrụ ihe ndị na-adịghị mkpa, wụnye stack nhọrọ:

```bash
# kpọgide na version ndị ekwuputara na package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Mwepụ `@tensorflow/tfjs` (2.0.4+) na-ewepụ ihe nyere ihe dịka ~800 MB nke kacha ibu
na mbụ — footprint fọdụrụ bụ runtime transformers.js + onnxruntime-node,
gbakwunyere model TinyBERT (~57 MB) a na-ebudata mgbe e jiri ya mee ihe nke mbụ (ọ bụghị site na npm).

Maka gburugburu ọ bụla:

- **Mmepe / `npm install`** — a na-etinye ya na-akpaghị aka belụsọ ma i tinyere `--omit=optional`
  (ma ọ bụ `--no-optional`). Ọ dịghị ihe ọzọ a chọrọ ime.
- **npm zuru ụwa ọnụ (`npm i -g omniroute`) / nke kwụụrụ onwe ya** — mee iwu nrụnye dị n'elu n'ime
  ndekọ ngwugwu arụnyere, ma ọ bụ wụnye ya ọzọ n'ahapụghị deps nhọrọ.
- **Docker** — tinye iwu nrụnye ahụ na layer nke image e wepụtara site na nke ọzọ; image e bipụtara
  dị mfe n'ebumnuche.
- **VPS (PM2)** — wụnye ya n'ime `node_modules` nke app ahụ, wee malitegharịa process ahụ ka
  worker ahụ nwee ike inyochagharị gate ahụ.
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — trace
  standalone ahụ anaghị ebute worker MA Ọ BỤ deps nhọrọ, ya mere engine ahụ na-emepe nwayọ
  mgbe ọ dara. `scripts/build/colocate-standalone.mjs` na-etinye ha abụọ ọzọ (worker esbuild +
  optional-dep closure n'ime standalone tree); ọ na-agba ọsọ na-akpaghị aka site na
  `postbuild` npm hook mgbe build ọ bụla gasịrị. Ọ bụ idempotent, ma na-ada nwayọ mgbe deps adịghị.

**Nyochaa na ọ na-arụ ọrụ:** mgbe ahọpụtara LLMLingua, prose n'ezie na-ebelata (engine ahụ
na-akwụsị imepe mgbe ọ dara), arịrịọ mbụ ahụ na-akpalite nbudata model n'ime
`${DATA_DIR}/models/llmlingua`. Gate ahụ na-ama ụma na-enyocha naanị `@atjsh/llmlingua-2` —
peers ndị ọzọ bụ naanị ESM, `require.resolve` na-atụkwa exception na ha ọbụna mgbe ha dị — ya mere
worker ahụ ka ga-emepe mgbe ọ dara ma ọ bụrụ na peer ọ bụla adịghị n'ezie n'oge `import()`.

## Pipeline ndị A Haziri N'elu Ibe Ha

Ụdị stacked na-eme usoro pipeline n'usoro. Nke ndabara bụ:

```txt
rtk -> caveman
```

Jiri nke a maka nnọkọ coding-agent ebe prompt jikọtara mmepụta command na ederede mmadụ ma ọ bụ nke assistant. RTK na-ebu ụzọ belata ndekọ tool ndị nwere mkpọtụ, Caveman emesịa akpakọkwa asụsụ nkịtị fọdụrụnụ.

A na-ahazi usoro pipeline site na `stackedPipeline` n'ime ntọala mkpakọ ma ọ bụ site na combo mkpakọ.

Mgbe engine abụọ ahụ belatara otu payload tozuru etozu, ego a zọpụtara na-abawanye n'usoro:

```txt
ngụkọta   = 1 - (1 - ego RTK zọpụtara) * (1 - ego ntinye Caveman zọpụtara)
nkezi     = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
oke       = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Nzacha Accessibility Tree nke MCP

Nzacha amamihe accessibility-tree nke MCP bụ oyi akwa mkpakọ nke na-arụ ọrụ mgbe emechara ihe, nke na-arụ ọrụ na **nsonaazụ tool** MCP, ọ bụghị na prompt ma ọ bụ context. Ọ na-elekwasị anya na payload accessibility-tree na snapshot browser ndị nwere ọtụtụ nkọwa nke tool dị ka Playwright, computer-use, na server MCP browser-automation na-eweghachi.

### Ihe ọ na-eme

1. **Iwepụ mkpọtụ** — na-ewepụ ndenye generic/text efu (`- generic:`, `- text: ""`)
2. **Ịchịkọta ụmụnne** — mgbe ahịrị ndị na-esochi ibe ha ruru ma ọ bụ gafee `collapseThreshold` (ndabara 30) ma bụrụ nkwughachi nhazi, ọ na-achịkọta ha ka ha bụrụ ahịrị mbụ `collapseKeepHead` (ndabara 10) + nchịkọta ọnụọgụ + ahịrị ikpeazụ `collapseKeepTail` (ndabara 5)
3. **Idobe ref** — a naghị emetụ arịlịka `[ref=eXX]` ndị Playwright/computer-use chọrọ aka ma ọlị
4. **Mbepụ siri ike** — ọ bụrụ na ederede ahụ ka gafere `maxTextChars` (ndabara 50,000) mgbe a chịkọtachara ya, ọ na-ebipụ ya ma tinye ntụnye ngagharị ka agent nwee ike ịga n'ihu n'ọrụ

### Ebe engine dị

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← ebe mbata smartFilterText()
  collapseRepeated.ts ← algọridim ịchịkọta ụmụnne
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Nhazi

`compression.mcpAccessibility` dị na ntọala zuru ụwa ọnụ (migration 056) na-achịkwa ya. Nhazi ndabara:

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

A na-etinye nzacha ahụ naanị na payload nsonaazụ tool nke `type` ya bụ `"text"` ma ogologo ya gafee `minLengthToProcess`. Ọ naghị emetụta mkpakọ prompt ma ọ bụ payload arịrịọ.

### Ego a tụrụ anya na a ga-azọpụta

60–80% na nsonaazụ tool snapshot browser, dabere na mgbagwoju anya peeji ahụ. Algọridim ịchịkọta ahụ bụ O(n) n'ọnụọgụ ahịrị ma na-agbakwunye latency pere mpe nke a na-apụghị ịtụle.

### Nzacha a ma e jiri ya tụnyere engine mkpakọ ndị dị n'elu

| Akụkụ              | Caveman / RTK / Stacked | Nzacha accessibility MCP               |
| ------------------ | ----------------------- | -------------------------------------- |
| Ebumnuche          | Prompt / context arịrịọ | Nsonaazụ tool MCP                      |
| Ihe na-akpalite ya | Ntọala ụdị mkpakọ       | `compression.mcpAccessibility.enabled` |
| Oke                | Ozi SSE niile           | Naanị nsonaazụ tool                    |
| Arịlịka ref        | Ọ daghị                 | A na-edobe ha n'enweghị ọnọdụ ọ bụla   |

---

## Ngwakọta Mkpakọ

Ngwakọta mkpakọ bụ profaịlụ mkpakọ ndị nwere aha nke enwere ike ikenye na ngwakọta ntụgharị ụzọ:

- `compression_combos`: na-echekwa mode, pipeline, nhazi RTK, nhazi asụsụ, na akara ndabara
- `compression_combo_assignments`: na-ejikọta ngwakọta mkpakọ na ngwakọta ntụgharị ụzọ
- njikọta runtime na-achọpụta ngwakọta mkpakọ e kenyere tupu ngbanwe ngwakọta izugbe
- analytics gụnyere `compression_combo_id` na `engine`

Ebe ọ dị na Dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Mpaghara API

| Ụzọ                                    | Ebumnuche                                                          |
| -------------------------------------- | ------------------------------------------------------------------ |
| `/api/settings/compression`            | Ntọala mkpakọ zuru ụwa ọnụ (gụnyere nhazi `mcpAccessibility`)      |
| `/api/compression/preview`             | Lelee mode mkpakọ ọ bụla tupu oge eruo                             |
| `/api/compression/language-packs`      | Depụta ngwugwu asụsụ Caveman ndị dị                                |
| `/api/context/caveman/config`          | Aha ọzọ maka ntọala Caveman                                        |
| `/api/context/rtk/config`              | Ndabara na ntọala RTK                                              |
| `/api/context/rtk/filters`             | Katalọgụ nzacha RTK                                                |
| `/api/context/rtk/test`                | Endpoint maka nlele/ule RTK                                        |
| `/api/context/rtk/raw-output/[id]`     | Nweghachite raw-output e zoro akụkụ ya nke chọrọ nkwenye njirimara |
| `/api/context/combos`                  | CRUD nke ngwakọta mkpakọ                                           |
| `/api/context/combos/[id]/assignments` | CRUD nke ikenye ngwakọta ntụgharị ụzọ                              |
| `/api/context/analytics`               | Aha ọzọ maka analytics mkpakọ                                      |

Ụzọ njikwa chọrọ nkwenye njirimara njikwa ma ọ bụ nyocha iwu API-key.

## Ngwaọrụ MCP

Mkpakọ na-enye ngwaọrụ MCP ise:

| Ngwaọrụ                             | Oke                 | Ebumnuche                             |
| ----------------------------------- | ------------------- | ------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ntọala, analytics, na ọnụ ọgụgụ cache |
| `omniroute_compression_configure`   | `write:compression` | Melite ntọala zuru ụwa ọnụ            |
| `omniroute_set_compression_engine`  | `write:compression` | Tọọ mode na pipeline nhọrọ            |
| `omniroute_list_compression_combos` | `read:compression`  | Depụta ngwakọta mkpakọ                |
| `omniroute_compression_combo_stats` | `read:compression`  | Gụọ analytics ngwakọta/engine         |

## Oke na mwepu

**A naghị emetụ embeddings mkpakọ ma ọlị.** `open-sse/handlers/embeddings.ts` anaghị akpọ
engine mkpakọ ọ bụla — ahụ request/response na-agafe ozugbo na executor n’enweghị mgbanwe.
Nke a bụ nhazi usoro ugbu a (embeddings na chat completions nwere handlers dị iche iche), ọ bụghị
nnyocha runtime, mana nke a pụtara na nchegbu mgbagọ vector dị na #8034 enweghị ebe ọ bụla
ọ ga-apụta n’ụzọ embeddings.

**Nzacha mwepu kwa-model/endpoint (#8034).** Maka chat completions, onye na-ahụ maka usoro nwere ike ịkpọ
model ids / ebumnuche `provider/model` ndị a na-agaghị emetụ mkpakọ ma ọlị — ihe nchebe bara uru ma ọ bụrụ na
e mesịa jikọọ mkpakọ nso n’ụzọ dị n'akụkụ embeddings, ma bakwa uru n’ozuzu
maka model ọ bụla nke prompt ya ga-adị kpọmkwem byte-for-byte (deterministic evals, prefixes
ndị cache na-emetụta, wdg.).

- Field ntọala: `exclusions?: string[]` na nhazi mkpakọ zuru ụwa ọnụ
  (`GET`/`PUT /api/settings/compression`), nke a na-echekwa site na namespace mkpakọ `key_value`
  dị ugbu a (`src/lib/db/compression.ts`) — enweghị table ọhụrụ.
- Taabụ Dashboard: **Dashboard → Mkpakọ → Mwepu**
  (`/dashboard/compression/exclusions`).
- Syntax pattern: `*` bụ naanị wildcard. A na-escape regex metacharacter ọ bụla ọzọ dị na pattern
  tupu matching, ya mere `gpt-5.6` na-adakọ naanị na literal string ahụ, ọ naghị adakọ na `gpt-5x6`
  (ReDoS-safe, bounded, enweghị nested quantifiers). Patterns na-eme matching n’enweghị mmetụta nke mkpụrụedemede ukwu ma ọ bụ nta
  megide ma bare model id ma composite `provider/model` — `gpt-5-6`, `openai/gpt-5-6`,
  na `openai/*` niile na-arụ ọrụ, ebe `*` naanị ya na-ewepu model niile.
- Matching: `isCompressionExcluded()` / `normalizeCompressionExclusions()` dị na
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` na-enyocha ebumnuche e wepụrụ
  ozugbo o chọpụtara ntọala mkpakọ, **tupu engine ọ bụla arụ ọrụ**, ma na-emeso matching
  kpọmkwem dịka mgbe agbanyụrụ mkpakọ zuru ụwa ọnụ — ahụ request ahụ bụ
  byte-identical n'ụzọ a pụrụ igosi. A na-edekọ ịwụfe ahụ site na `writeCompressionSkip(..., "excluded")` maka
  ịhụ ya na analytics.
- Ndabara (ndepụta efu/adịghị): ọ bụ otu ihe ahụ dịka omume tupu #8034 — ọ dịghị ihe a na-ewepu.

## Oke ndị amaara

- **LLMLingua-2 (SLM) chọrọ deps nhọrọ ndị dị n'otu ebe.** Worker ahụ na-arụ ọrụ naanị na
  production build mgbe e tinyere `@atjsh/llmlingua-2` + peers n'otu ebe n'ime
  `dist/node_modules` (lee `scripts/build/colocateOptionals.mjs`, #4286). Ọ bụrụ na ha adịghị,
  engine ahụ na-eme fail-open (na-eweghachi ederede mbụ). Mkpebi ebe worker dị adịkwaghị adabere na
  `import.meta.url` (ọ na-akwụsị ịrụ ọrụ n'ime standalone bundle) — ọ na-eji runtime
  cwd / `argv[1]` dị ka ebe mgbakwasị ụkwụ.
- **Ngwugwu asụsụ Caveman `de` / `fr` / `ja` ezughị ezu.** Ha nwere iwu `context` +
  `filler` + `structural` mana ha enweghị ngwugwu `dedup` / `ultra`, ya mere ike `ultra`
  anaghị akarị `full` maka asụsụ ndị ahụ (ha na-eji naanị iwu nke ha — enweghị
  nlọghachi ndabara na nzuzo gaa n'iwu Bekee `dedup`/`ultra`, nke ga-emebi ederede asụsụ ọzọ).
  `en` / `es` / `id` / `pt-BR` zuru ezu. A na-anabata onyinye nke `dedup.json` + `ultra.json`
  maka ngwugwu ndị na-ezughị ezu.
- **Telemetry agbakọtara ọnụ na-edepụta naanị engine ndị mere mkpakọ.** Nzọụkwụ stacked-pipeline nke
  engine ya rụrụ ọrụ mana nweta nchekwa 0 % na-eweghachi `stats:null`, ya mere ọ naghị apụta na
  `engineBreakdown` — a pụghị ịmata ọdịiche ya na nzọụkwụ a mafere. Ịmata ọdịiche dị n'etiti
  "rụrụ ọrụ, 0 %" na "a mafere" ga-achọ mgbanwe n'ụdị breakdown ma yigharịrị ya.

## Nnwale nkwado

Ọnụ ụzọ nnwale e lekwasịrị anya maka mpaghara a bụ:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
