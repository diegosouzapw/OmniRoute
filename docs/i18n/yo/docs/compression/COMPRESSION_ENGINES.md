# Compression Engines (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Ìfúnpọ̀ OmniRoute dá lórí àwọn àdéhùn engine. Mode kan lè ṣiṣẹ́ engine kan ní tààràtà
(`caveman` tàbí `rtk`) tàbí pipeline aláìyípadà tí a tò ní ìpele, èyí tí ń ṣiṣẹ́ ọ̀pọ̀ engine ní tẹ̀lé-tẹ̀lé.

## Àwọn mode

| Mode         | Ọ̀nà engine                          | Input tí a pète fún                                 |
| ------------ | ----------------------------------- | --------------------------------------------------- |
| `off`        | kò sí                               | Ìtọ́jú prompt gẹ́gẹ́ bí ó ṣe rí gan-an                 |
| `lite`       | Àwọn olùrànlọ́wọ́ Caveman lite        | Ìfọ̀mọ́ tí ewu rẹ̀ kéré tí ó máa ń ṣiṣẹ́ nígbà gbogbo   |
| `standard`   | Caveman                             | Ìsọdikéré prompt èdè àdánidá                        |
| `aggressive` | Caveman + àwọn akopọ̀ history/tool   | Àwọn session ìfọ̀rọ̀wérọ̀ gígùn                        |
| `ultra`      | Caveman + àwọn olùrànlọ́wọ́ pruning   | Ìmúpadàbọ̀ láti ààlà context                         |
| `rtk`        | RTK                                 | Output terminal, shell, build, test, àti git        |
| `omniglyph`  | OmniGlyph                           | Context-gẹ́gẹ́-bí-àwòrán lórí wire abinibi provider   |
| `stacked`    | Pipeline, àìyípadà `rtk -> caveman` | Àwọn log tool àti prose tí a dapọ̀, ìfipamọ́ tó pọ̀ jù |

### Àwọn profile ìfúnpọ̀ OmniGlyph

Engine `omniglyph` (package `omniglyph`, 1.4.0+) gba profile semantic olórúkọ kan, tí a ṣètò
káàkiri nípasẹ̀ `omniglyph.profile` nínú àwọn ètò ìfúnpọ̀ tàbí fún ìgbésẹ̀ kọ̀ọ̀kan nípasẹ̀
config ìgbésẹ̀ pipeline stacked:

| Profile       | Ààlà                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Àìyípadà. Policy tí àwọn receipt tí a tẹ̀ jáde wọn — ó sọ system, docs tool àti history tó kún fún data di àwòrán  |
| `balanced`    | Ó pa state tó ń ṣiṣẹ́ mọ́ ní fọ́ọ̀mù abinibi, ó dáàbò bo àwọn turn 8 tó gbẹ̀yìn, ó sì ṣopọ̀ history tí a ti pa tó ti pẹ́ |
| `coding-safe` | Ó pa authority, schemas tool àti output tool tó ń ṣiṣẹ́ mọ́ ní fọ́ọ̀mù abinibi, ó sì dáàbò bo àwọn turn 12 tó gbẹ̀yìn  |
| `passthrough` | Ó ṣe routing láìyípadà; a fo engine náà kọjá                                                                      |

Profile náà jẹ́ **àjà, kì í ṣe ilẹ̀**: `mergeCompressionProfileOptions` nínú package náà
kọ̀ láti jẹ́ kí override olùpè tún lane olófò kan tí profile ti pa sílẹ̀, nítorí náà
`preserveSystemPrompt: false` fún ìgbésẹ̀ kan kò lè tún mú ìfúnpọ̀ system ṣiṣẹ́ lábẹ́ `coding-safe`.

Gẹ́gẹ́ bí a ṣe wọn án lórí codebase yìí: `coding-safe` àti `balanced` gbé `minCompressChars` dé
iye tó ga jù lọ, wọ́n sì pa system, schemas tool àti àwọn result tool mọ́ ní fọ́ọ̀mù abinibi, nítorí náà session kan tí
kò tíì kó history jọ máa dúró sí `below_min_chars`, engine náà kò sì ní yí ohunkóhun padà. Ìdí
nìyẹn tí àìyípadà fi jẹ́ `aggressive` dípò profile tó ní ààbò jù lọ.

Package náà ń yanjú scope model àti profile tirẹ̀ láti inú configuration environment rẹ̀.
OmniRoute kì í fi ìpinnu náà lé ẹlòmíràn lọ́wọ́: adapter náà di gate model mọ́ scope
tó ní ìhámọ́ jù lọ ti package náà, nítorí náà àwọn ètò environment host lè dín allowlist kù nìkan, wọn kò
lè fẹ̀ ẹ́ gbòòrò kọjá àwọn receipt tí OmniRoute ti wọn.

## Ìforúkọsílẹ̀ Engine

Ìforúkọsílẹ̀ náà wà ní `open-sse/services/compression/engines/registry.ts`. Àwọn engine ń ṣí àdéhùn kan náà síta:

- `id`: id engine tí kò yí padà bíi `caveman` tàbí `rtk`
- `apply(text, config)`: ọ̀nà ìṣiṣẹ́ àtijọ́ tí àwọn pipeline onípele ń lò
- `compress(input, config)`: ọ̀nà ìṣiṣẹ́ àkọ́kọ́ tí ń dá ọ̀rọ̀ + àwọn ìṣirò padà
- `getConfigSchema()`: ń dá ìrísí tó dàbí JSON-Schema ti config tó bófin mu padà
- `validateConfig(config)`: ń dá `{ valid, errors[] }` padà

Ìforúkọsílẹ̀ ń lo `registerCompressionEngine(engine)` (tàbí `registerEngine` fún àwọn ọ̀ràn tó ti ní ìlọsíwájú),
èyí tí ń pe `assertValidEngine()` àti `validateConfig(defaultConfig)` kí ó tó gba engine náà.
Lo `unregisterCompressionEngine(id)` láti yọ engine kan kúrò ní àsìkò ìṣiṣẹ́.

`strategySelector.ts` ń forúkọsílẹ̀ àwọn engine tí a ti kọ́ sínú rẹ̀ kí ìfúnpọ̀ tó bẹ̀rẹ̀. Èyí ń jẹ́ kí àwòtẹ́lẹ̀,
ìfúnpọ̀ ní àsìkò ìṣiṣẹ́, ipò onípele, àwọn ìdánwò, àti àwọn engine ọjọ́ iwájú lo ọ̀nà ìṣiṣẹ́ kan náà.

### Ìfúnpọ̀ àpèjúwe MCP (tó ní í ṣe pẹ̀lú èyí)

Ìforúkọsílẹ̀ mìíràn ń fún metadata àpèjúwe irinṣẹ́ MCP pọ̀ ní ìpele ìforúkọsílẹ̀ — wo
`open-sse/mcp-server/descriptionCompressor.ts` àti [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ó tún ń lo
àwọn òfin Caveman, ṣùgbọ́n ó ń ṣiṣẹ́ lórí metadata irinṣẹ́, kì í ṣe àwọn payload ìbéèrè.

### Àwọn engine àfikún tí a ti kọ́ sínú rẹ̀

Ní àfikún sí Caveman, RTK, àti LLMLingua-2, ìforúkọsílẹ̀ náà ní ọ̀pọ̀ engine àkànṣe tí kò pàdánù ìsọfúnni /
tó dá lórí ìgbékalẹ̀ (tí àwọn pipeline onípele, pápá ìdánwò, àti àwọn ìdánwò ń lò):

| Engine        | Id              | Ohun tó ń ṣe                                                                                                                                                                                                     |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): ń fi àwọn ìtọ́kasí tó dá lórí àkóónú rọ́pò àwọn ìdí ọ̀rọ̀ ńlá tó tẹ̀lé ara wọn, kí a lè fi àwọn ìdí tó ń tún ara wọn ṣe/tó tóbi ránṣẹ́ lẹ́ẹ̀kan ṣoṣo, kí a sì máa tọ́ka sí wọn lẹ́yìn náà. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): ìfúnpọ̀ alátábìlì tí kò pàdánù ìsọfúnni fún àwọn payload JSON-array tó jẹ́ irú kan náà sínú ìrísí oníwọ̀n ` [N rows]`.                                                                      |
| ionizer       | `ionizer`       | Àṣàyàn àpẹẹrẹ àwọn ìlà láti ìbẹ̀rẹ̀/àárín/ìparí fún àwọn ìdí tó tóbi gan-an tí ó jẹ́ irú kan náà, nípa fífi àárín tí a yọ sílẹ̀ pamọ́ gẹ́gẹ́ bí ìtọ́kasí CCR tó dá lórí àkóónú.                                          |
| session-dedup | `session-dedup` | Yíyọ àtúnṣe tó dá lórí àkóónú kọjá àwọn ìyípadà ìjíròrò (tó gba ìmísí láti TokenMizer): ń yọ ọ̀rọ̀ tí a ti rí tẹ́lẹ̀ nínú àwọn ìyípadà ìjíròrò ìṣáájú ti session kan náà sílẹ̀.                                       |

**Ìtọ́ni retrieve-protocol CCR (#8033):** ní ìgbà àkọ́kọ́ tí CCR bá rọ́pò ≥1 ìdí nínú
ìbéèrè kan, engine náà yóò fi ìfiránṣẹ́ `system` kan ṣoṣo tí ó jẹ́ idempotent síwájú (tí ó bẹ̀rẹ̀ pẹ̀lú
àmì ìdámọ̀ `[CCR protocol]`) láti kọ́ olùpè nípa àdéhùn àmì → irinṣẹ́: ohun tí àmì
`[CCR retrieve hash=<24hex> chars=N]` túmọ̀ sí, pé a gbọ́dọ̀ da hash náà kọ bí ó ṣe rí gan-an
(gbogbo àmì hex mẹ́rìnlélógún náà — àwọn hash tí a da kọ lọ́nà àìtọ́ ló ṣeé ṣe kó fa àwọn àṣìṣe
"block not found"), àti pé àmì `[dedup:ref sha=...]` túmọ̀ sí "wo ẹ̀yìn nínú ìtàn", kì í ṣe "pe
irinṣẹ́ náà". A máa fi àkọsílẹ̀ náà kún un **kìkì nígbà tí `tools[]` tí olùpè polówó fi hàn pé ó lè
dé `omniroute_ccr_retrieve` ní tòótọ́** (`callerSupportsCcrRetrieve()` nínú
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — olùpè lásán tó bá OpenAI mu
tí kò ní irinṣẹ́ yẹn kò ní gba ìtọ́ni láti pe ohun tí kò lè dé. A ń fipá mú idempotency ṣiṣẹ́ nípa
ṣíṣàyẹ̀wò ìtàn àwọn ìfiránṣẹ́ fún àmì ìdámọ̀ náà kí a tó fi í kún un, nítorí náà àwọn ìbéèrè
oníyípadà-ọ̀pọ̀ (tí ń tún àwọn ìfiránṣẹ́ ìṣáájú ṣe) kò ní kó àkọsílẹ̀ náà jọ lẹ́ẹ̀kan fún ìyípadà
kọ̀ọ̀kan.

## Caveman

Ìpo Caveman dá lórí fífi ìtumọ̀ ọ̀rọ̀ àkọsílẹ̀ àràọ̀tọ̀ kúrú:

- ó ń pa àwọn búlọ́ọ̀kì kóòdù, URL, JSON, àwọn ipa-ọ̀nà, àti dátà tí a ṣètò mọ́
- ó ń yọ ọ̀rọ̀ àfikún, ọ̀rọ̀ àṣírí, àyíká tí a tún sọ, àti àwọn gbólóhùn àsopọ̀ gígùn kúrò
- ó ń ṣe àtìlẹ́yìn fún àwọn àkójọpọ̀ òfin fáìlì tó mọ èdè ní `open-sse/services/compression/rules/`
- ó ṣì wà nípasẹ̀ àwọn ìpo àtijọ́ `standard`, `aggressive`, àti `ultra`

Apá rẹ̀ lórí dashboard ni `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream ròyìn pé àwọn token àbájáde dín kù ní `~75%`, ìfipamọ́ àbájáde àárín jẹ́ `65%` nínú àwọn ìdánwò
pẹ̀lú ààlà `22-87%`, àti irinṣẹ́ ìfúnpọ̀ àwọlé `~46%`. OmniRoute ń lo iye Caveman ti ẹ̀gbẹ́ àwọlé
nígbà tó ń ṣàkọsílẹ̀ ìfipamọ́ prompt/context tí a tò pọ̀; ìpo àbájáde Caveman ṣì jẹ́ ẹ̀ya
ìhùwàsí ìdáhùn ọ̀tọ̀.

## RTK

Ìpo RTK dá lórí àṣẹ àti àbájáde irinṣẹ́:

- ó ń ṣàwárí àwọn ẹ̀ka àbájáde bíi `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  àwọn ìdánwò Cargo/Go, àwọn build TypeScript/Vite/Webpack, ESLint, npm audit/installs, àwọn log Docker,
  `find`/`grep` shell, àwọn stack trace, àti àwọn log gbogbogbò
- ó ń lo àwọn asẹ JSON 49 láti `open-sse/services/compression/engines/rtk/filters/`
- ó ń ṣe àtìlẹ́yìn fún pipeline ìkéde ara RTK: yíyọ ANSI, replace, match-output short-circuit,
  yíyọ/fífipamọ́ àwọn ìlà, gígé ìlà kọ̀ọ̀kan, gígé head/tail/max-line, àti ìpadà-àfirọ́pò nígbà tí ó ṣófo
- ó ń ṣe àtìlẹ́yìn fún àwọn asẹ iṣẹ́-àkànṣe tí ìgbẹ́kẹ̀lé ń ṣàkóso nínú `.rtk/filters.json` àti àwọn asẹ àgbáyé nínú
  `DATA_DIR/rtk/filters.json`
- ó ń yọ àwọn ọ̀wọ̀ọ̀rọ̀ ANSI, ariwo ìlọsíwájú, àwọn ìlà tí a tún sọ, àti ọ̀rọ̀ àfọwọ́kọ tí kò wúlò
- ó ń pa àwọn ìkùnà tí a lè gbé ìgbésẹ̀ lé, àwọn ìkìlọ̀, àwọn àkótán, àwọn fáìlì tí a yí padà, àti àyíká ìparí mọ́
- ó lè, bí a bá fẹ́, pa àbájáde gidi tí a ti fi àṣírí bo mọ́ fún ìmúpadàbọ̀sípò/ìṣàwárí àṣìṣe nípasẹ̀ àwọn
  route ìṣàkóso tí a ti fìdí ìdánimọ̀ wọn múlẹ̀

Apá rẹ̀ lórí dashboard ni `Dashboard -> Context & Cache -> RTK`.

Àwọn àlàyé ìṣiṣẹ́ fún àwọn asẹ àkànṣe, ìgbẹ́kẹ̀lé, ìjẹ́rìísí, àti ìmúpadàbọ̀sípò àbájáde gidi wà nínú
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK upstream ròyìn ìfipamọ́ `60-90%` fún ìfúnpọ̀ àbájáde àṣẹ. Àpẹẹrẹ README rẹ̀ fi hàn pé
ìpele iṣẹ́ Claude Code ìṣẹ́jú 30 kan lọ láti token `~118,000` sí `~23,900`, tàbí ìfipamọ́ `79.7%`.

## LLMLingua-2 (Ìyọkúrò Sẹ́mántíìkì)

Ìpo LLMLingua-2 ń ṣe **ìyọkúrò token sẹ́mántíìkì** lórí àkọsílẹ̀ nípa lílo classifier token ONNX
kékeré kan, láti ṣàfikún àwọn engine Caveman àti RTK tó dá lórí òfin:

- ó ń fún àkọsílẹ̀ nínú àwọn ìfiránṣẹ́ tí kì í ṣe ti system nìkan pọ̀; àwọn búlọ́ọ̀kì kóòdù tí a fi fence yí ká àti àwọn
  ohun mìíràn tí a pa mọ́ kì í yí padà láéláé
- ó ń ṣiṣẹ́ backend `@atjsh/llmlingua-2` (ONNX nípasẹ̀ `@huggingface/transformers`) nínú
  worker thread, kí inference àwòṣe má bàa dí request event loop láéláé
- ó jẹ́ **èyí tí a lè tò pọ̀** (`stackPriority` 35): nínú pipeline tí a tò pọ̀, ó ń ṣiṣẹ́ lẹ́yìn àwọn
  engine ìgbékalẹ̀ (CCR, session-dedup, headroom, Caveman) ṣùgbọ́n ṣáájú `ultra`, nítorí
  ìyọkúrò sẹ́mántíìkì máa ń ṣiṣẹ́ dáadáa jù lórí ọ̀rọ̀ tí a ti fún pọ̀ nípa ìgbékalẹ̀ — fún àpẹẹrẹ
  `rtk -> caveman -> llmlingua`
- ó **ń fail-open lórí àṣìṣe èyíkéyìí** (àwọn dependency àṣàyàn tí kò sí, worker spawn, model load, inference,
  tàbí timeout) → a ó dá ọ̀rọ̀ ìpilẹ̀ padà láìyípadà, kì í ṣe àṣìṣe láéláé

Ibi tí engine wà: `open-sse/services/compression/engines/llmlingua/`. Apá rẹ̀ lórí dashboard
ni `Dashboard -> Context & Cache -> LLMLingua`.

### Àwọn Àwòṣe

Àwòṣe àìyípadà ni **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
yára). Àwòṣe **BERT-base** tó péye jù (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) wà nípasẹ̀ field `model` nínú config engine. `@huggingface/transformers`
ń gba àwòṣe tí a yàn kalẹ̀ lọ́nà lazy láti HuggingFace Hub sínú
`${DATA_DIR}/models/llmlingua` ní ìpè àkọ́kọ́ (`modelStore.ts`); override config `modelPath`
máa ń tọ́ka sí ẹ̀dà agbègbè dípò rẹ̀ (àwọn ìfisórí offline / air-gapped).

### Àwọn dependency àṣàyàn àti fífi sórí ẹ̀rọ nígbà tí a bá nílò rẹ̀

Àkójọpọ̀ peer runtime LLMLingua tí a lè yọ kúrò jẹ́ **àṣàyàn**. A kéde package méjì gẹ́gẹ́ bí
`optionalDependencies` nínú `package.json`, a sì pa wọ́n mọ́ gẹ́gẹ́ bí **external** nípasẹ̀ production build
(`scripts/build/prepublish.ts` kì í bundle wọn):

| Package              | Ẹ̀yà (pin) | Àwọn Àkíyèsí                                  |
| -------------------- | --------- | --------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`   | Package ìwọlé; ó kéde àwọn yòókù gẹ́gẹ́ bí peer |
| `js-tiktoken`        | `^1.0.20` | Tokenizer                                     |

A pin `@huggingface/transformers` sí `^4.2.0` (a pín in pẹ̀lú ipa embeddings agbègbè, a sì
tún tọpasẹ̀ rẹ̀ sínú standalone bundle); `@atjsh/llmlingua-2@2.0.5` jẹ́ peer rẹ̀ pẹ̀lú
`"^3.5.2 || ^4.0.0"`, nítorí náà Transformers.js v3 àti v4 méjèèjì ní àtìlẹ́yìn. Láti 2.0.4,
`@atjsh/llmlingua-2` kò nílò `@tensorflow/tfjs` mọ́, èyí tó yọ olùkópa ẹyọ kan tó tóbi jù
(TensorFlow.js) kúrò nínú àkójọpọ̀ SLM. Àwọn package méjì tó wà lókè nìkan ni àwọn peer SLM
tí a lè yọ kúrò. `npm install` bóṣewa (dev) máa ń fi àkójọpọ̀ àṣàyàn sórí ẹ̀rọ fúnra rẹ̀, àyàfi tí a bá yọ àwọn
dependency àṣàyàn sílẹ̀.

**Ìdí tí a fi ń ṣe é nígbà tí a bá nílò rẹ̀:** package tí a tẹ̀ jáde sí npm, standalone bundle, àti Docker image
ń wá **láìsí** àwọn dependency wọ̀nyí kí wọ́n lè má tóbi. Nígbà tí wọn kò bá sí, dependency
gate worker (ìdánwò resolve `@atjsh/llmlingua-2` nínú `worker.ts`) máa kùnà, engine náà á sì
**fail-open ní ìdákẹ́jẹ́** — yíyan LLMLingua kò ní ṣe ohunkóhun (a dá ọ̀rọ̀ padà láìyípadà, kò sí
àṣìṣe tí a kọ sínú log). Láti mú un ṣiṣẹ́ nínú environment tí a ti yọ àwọn ohun kan kúrò, fi àkójọpọ̀ àṣàyàn sórí ẹ̀rọ:

```bash
# pin sí àwọn ẹ̀yà tí a kéde nínú package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Yíyọ `@tensorflow/tfjs` kúrò (2.0.4+) mú olùkópa ~800 MB tó ti ń ṣàkóso tẹ́lẹ̀ kúrò —
ààyè tó kù ni àwọn runtime transformers.js + onnxruntime-node, pẹ̀lú àwòṣe TinyBERT
(~57 MB) tí a máa gba kalẹ̀ ní ìlò àkọ́kọ́ (kì í ṣe nípasẹ̀ npm).

Fún environment kọ̀ọ̀kan:

- **Ìdàgbàsókè / `npm install`** — a máa fi í sílẹ̀ láìfọwọ́yí àyàfi tí o bá lo `--omit=optional`
  (tàbí `--no-optional`). Kò sí ohun tí o nílò láti ṣe.
- **npm àgbáyé (`npm i -g omniroute`) / adádúró** — ṣiṣẹ́ àṣẹ ìfisílẹ̀ tó wà lókè nínú
  àkójọ package tí a fi sílẹ̀, tàbí tún un fi sílẹ̀ láìyọ àwọn optional deps kúrò.
- **Docker** — ṣàfikún àṣẹ ìfisílẹ̀ náà sínú ipele image tí a jogún; image tí a tẹ̀jáde
  jẹ́ tín-ín-rín nípa àpẹrẹ.
- **VPS (PM2)** — fi í sínú `node_modules` ti app náà, lẹ́yìn náà tún process náà bẹ̀rẹ̀ kí
  worker lè tún gate náà yẹ̀wò.
- **Next standalone àìṣeéṣàtúnṣe (`npm run build` → `.build/next/standalone/server.js`)** — trace
  standalone náà kò kó worker tàbí optional deps KAN lọ, nítorí náà engine náà máa ń
  ṣí sílẹ̀ ní ìdákẹ́jẹ́ nígbà ìkùnà. `scripts/build/colocate-standalone.mjs` tún fi àwọn méjèèjì sílò (worker esbuild +
  optional-dep closure sínú igi standalone náà); ó máa ń ṣiṣẹ́ láìfọwọ́yí nípasẹ̀
  hook npm `postbuild` lẹ́yìn gbogbo build. Ó jẹ́ idempotent, ó sì máa ń kuna pẹ̀lẹ́pẹ̀lẹ́ nígbà tí deps kò bá sí.

**Ṣàyẹ̀wò pé ó ń ṣiṣẹ́:** nígbà tí a bá yan LLMLingua, ọ̀rọ̀ gidi máa ń dín kù ní tòótọ́ (engine náà
kò ní máa ṣí sílẹ̀ mọ́ nígbà ìkùnà), ìbéèrè àkọ́kọ́ sì máa ń fa gbígbàsílẹ̀ model náà sínú
`${DATA_DIR}/models/llmlingua`. Gate náà mọ̀ọ́mọ̀ ń yẹ `@atjsh/llmlingua-2` nìkan wò —
àwọn peer yòókù jẹ́ ESM-nìkan, `require.resolve` sì máa ń ju àṣìṣe sí wọn lórí kódà bí wọ́n bá wà — nítorí náà
worker náà ṣì máa ń ṣí sílẹ̀ nígbà ìkùnà bí peer èyíkéyìí bá ṣàìsí ní àkókò `import()`.

## Àwọn Pipeline Tí A Tò Léra

Ipo stacked ń ṣiṣẹ́ àwọn ìgbésẹ̀ pipeline ní tẹ̀lé-tẹ̀lé. Èyí ni àtòjọ àìyípadà:

```txt
rtk -> caveman
```

Lo èyí fún àwọn session coding-agent níbi tí prompt kan ti darapọ̀ àbájáde command mọ́ ọ̀rọ̀ àlàyé ènìyàn tàbí assistant. RTK kọ́kọ́ dín ariwo inú àwọn log irinṣẹ́ kù, lẹ́yìn náà Caveman á ṣùpọ̀ èdè àdánidá tó kù.

A ń ṣètò àwọn ìgbésẹ̀ pipeline pẹ̀lú `stackedPipeline` nínú àwọn ètò compression tàbí nípasẹ̀ àwọn combo compression.

Nígbà tí engine méjèèjì bá dín payload kan náà tó yẹ kù, àwọn ìfipamọ́ náà ń pọ̀ sí i:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Àlẹ́ Accessibility Tree MCP

Àlẹ́ ọlọ́gbọ́n accessibility-tree MCP jẹ́ ipele compression lẹ́yìn ìṣiṣẹ́ tó ń ṣiṣẹ́ lórí **àwọn àbájáde irinṣẹ́** MCP, kì í ṣe lórí àwọn prompt tàbí context. Ó dojú kọ àwọn payload accessibility-tree àti snapshot browser alálàyé gígùn tí àwọn irinṣẹ́ bíi Playwright, computer-use, àti àwọn server MCP browser-automation ń dá padà.

### Ohun tó ń ṣe

1. **Yíyọ ariwo kúrò** — ń yọ àwọn àkọsílẹ̀ generic/text òfo kúrò (`- generic:`, `- text: ""`)
2. **Ṣíṣùpọ̀ àwọn sibling** — nígbà tí ≥ `collapseThreshold` (àìyípadà 30) àwọn ìlà tó tẹ̀ lé ara wọn jẹ́ àtúnṣe ìṣètò kan náà, ó máa ṣù wọ́n pọ̀ sí àwọn ìlà `collapseKeepHead` àkọ́kọ́ (àìyípadà 10) + àkótán iye wọn + àwọn ìlà `collapseKeepTail` tó gbẹ̀yìn (àìyípadà 5)
3. **Ìpamọ́ ref** — a kì í fọwọ́ kan àwọn anchor `[ref=eXX]` tí Playwright/computer-use nílò
4. **Gígé líle** — tí ọ̀rọ̀ náà bá ṣì kọjá `maxTextChars` (àìyípadà 50,000) lẹ́yìn ṣíṣùpọ̀, ó máa gé e pẹ̀lú ìtọ́ni navigation kí agent náà lè tẹ̀ síwájú nínú iṣẹ́

### Ibi tí engine wà

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← ibi ìwọlé smartFilterText()
  collapseRepeated.ts ← algorithm ṣíṣùpọ̀ sibling
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Ìṣètò

`compression.mcpAccessibility` nínú àwọn ètò àgbáyé (migration 056) ló ń ṣàkóso rẹ̀. Config àìyípadà:

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

Àwọn payload àbájáde irinṣẹ́ tí `type` wọn jẹ́ `"text"` àti tí gígùn wọn kọjá `minLengthToProcess` nìkan ni a máa ń lo àlẹ́ náà sí. Kò ní ipa lórí compression prompt tàbí àwọn payload ìbéèrè.

### Ìfipamọ́ tí a ń retí

60–80% lórí àwọn àbájáde irinṣẹ́ snapshot browser, ó sinmi lórí bí ojú-ewé náà ṣe díjú tó. Algorithm ṣíṣùpọ̀ náà jẹ́ O(n) nípa iye ìlà, ó sì ń fi ìdádúró kékeré tí kò ṣe pàtàkì kún un.

### Àlẹ́ yìí ní ìfiwéra pẹ̀lú àwọn engine compression òkè

| Abala                | Caveman / RTK / Stacked      | Àlẹ́ accessibility MCP                  |
| -------------------- | ---------------------------- | -------------------------------------- |
| Àfojúsùn             | Àwọn prompt ìbéèrè / context | Àwọn àbájáde irinṣẹ́ MCP                |
| Ohun tó ń mú un ṣiṣẹ́ | Ètò ipo compression          | `compression.mcpAccessibility.enabled` |
| Ìwọ̀n iṣẹ́             | Gbogbo àwọn ìfiránṣẹ́ SSE     | Àwọn àbájáde irinṣẹ́ nìkan              |
| Àwọn anchor ref      | Kò kan                       | A máa ń pa wọ́n mọ́ láìsí àdéhùn         |

---

## Àwọn Àkójọpọ̀ Ìfúnpọ̀

Àwọn àkójọpọ̀ ìfúnpọ̀ jẹ́ àwọn profaili ìfúnpọ̀ tí a fún ní orúkọ, tí a sì lè yàn sí àwọn àkójọpọ̀ ìtọ́sọ́nà:

- `compression_combos`: ń tọ́jú módù, pipeline, àtòpọ̀ RTK, àtòpọ̀ èdè, àti àmì àiyípadà
- `compression_combo_assignments`: ń so àkójọpọ̀ ìfúnpọ̀ pọ̀ mọ́ àkójọpọ̀ ìtọ́sọ́nà
- ìṣọ̀kan runtime máa ń yanjú àkójọpọ̀ ìfúnpọ̀ tí a yàn ṣáájú àwọn ìkọlérí àkójọpọ̀ gbogbogbò
- ìtúpalẹ̀ ní `compression_combo_id` àti `engine`

Ojú-iṣẹ́ dashboard: `Dashboard -> Context & Cache -> Compression Combos`.

## Ojú API

| Ọ̀nà                                    | Ète                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `/api/settings/compression`            | Àwọn àtòpọ̀ ìfúnpọ̀ gbogbogbò (pẹ̀lú àtòpọ̀ `mcpAccessibility`)            |
| `/api/compression/preview`             | Ṣàgbéyẹ̀wò eyikeyi módù ìfúnpọ̀                                          |
| `/api/compression/language-packs`      | Ṣàkójọ àwọn àkójọpọ̀ èdè Caveman tó wà                                  |
| `/api/context/caveman/config`          | Orúkọ àfikún fún àwọn àtòpọ̀ Caveman                                    |
| `/api/context/rtk/config`              | Àwọn àiyípadà àti àtòpọ̀ RTK                                            |
| `/api/context/rtk/filters`             | Kátálọ́ọ̀gù àlẹ̀mọ́ RTK                                                    |
| `/api/context/rtk/test`                | Endpoint àgbéyẹ̀wò/ìdánwò RTK                                           |
| `/api/context/rtk/raw-output/[id]`     | Ìmúpadàbọ̀ raw-output tí a ti yọ ìsọfúnni kókó kúrò, tó sì nílò ìfàṣẹsí |
| `/api/context/combos`                  | CRUD àkójọpọ̀ ìfúnpọ̀                                                    |
| `/api/context/combos/[id]/assignments` | CRUD ìyàn àkójọpọ̀ ìtọ́sọ́nà                                              |
| `/api/context/analytics`               | Orúkọ àfikún fún ìtúpalẹ̀ ìfúnpọ̀                                        |

Àwọn ọ̀nà ìṣàkóso nílò ìfàṣẹsí ìṣàkóso tàbí àwọn àyẹ̀wò ìlànà API-key.

## Àwọn Ohun Èlò MCP

Ìfúnpọ̀ pèsè àwọn ohun èlò MCP márùn-ún:

| Ohun èlò                            | Ìwọ̀n                | Ète                                   |
| ----------------------------------- | ------------------- | ------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Àwọn àtòpọ̀, ìtúpalẹ̀, àwọn ìṣirò cache |
| `omniroute_compression_configure`   | `write:compression` | Ṣe ìmúdójúìwọ̀n àwọn àtòpọ̀ gbogbogbò   |
| `omniroute_set_compression_engine`  | `write:compression` | Ṣètò módù àti pipeline àṣàyàn         |
| `omniroute_list_compression_combos` | `read:compression`  | Ṣàkójọ àwọn àkójọpọ̀ ìfúnpọ̀            |
| `omniroute_compression_combo_stats` | `read:compression`  | Ka ìtúpalẹ̀ àkójọpọ̀/engine             |

## Ìwọ̀n & àwọn ohun tí a yọ kúrò

**A kì í fún embeddings pọ̀ láé.** `open-sse/handlers/embeddings.ts` kì í pe engine
ìfúnpọ̀ kankan — àwọn ara ìbéèrè/ìdáhùn ń kọjá tààrà sí executor láìsí àtúnṣe.
Èyí jẹ́ apá ìgbékalẹ̀ lọ́wọ́lọ́wọ́ (embeddings àti chat completions ní handlers ọ̀tọ̀ọ̀tọ̀), kì í ṣe
àyẹ̀wò runtime, ṣùgbọ́n ó túmọ̀ sí pé àníyàn ìyídà vector tó wà nínú #8034 kò ní ojú ìfarahàn
ní ọ̀nà embeddings.

**Àlẹ̀mọ́ ìyọkúrò fún model/endpoint kọ̀ọ̀kan (#8034).** Fún chat completions, olùṣàkóso lè sọ
àwọn model ids / ibi-àfojúsùn `provider/model` tí a kò gbọ́dọ̀ fún pọ̀ láé — ọ̀nà ààbò tó wúlò bí
a bá so ìfúnpọ̀ mọ́ ọ̀nà tó sún mọ́ embeddings ní ọjọ́ iwájú, tó sì wúlò ní gbogbogbò
fún model èyíkéyìí tí prompt rẹ̀ gbọ́dọ̀ bá byte-for-byte mu pátápátá (deterministic evals, àwọn
prefixes tó ní ìfarakanra sí cache, abbl.).

- Pápá àtòpọ̀: `exclusions?: string[]` lórí àtòpọ̀ ìfúnpọ̀ gbogbogbò
  (`GET`/`PUT /api/settings/compression`), tí a tọ́jú nípasẹ̀ namespace ìfúnpọ̀ `key_value` tó ti wà
  (`src/lib/db/compression.ts`) — kò sí tábìlì tuntun.
- Táàbù dashboard: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sísẹ́ pattern: `*` nìkan ni wildcard. Gbogbo metacharacter regex mìíràn nínú pattern ni a
  máa ń escape kí ìbámu tó bẹ̀rẹ̀, nítorí náà `gpt-5.6` yóò bá ọ̀rọ̀ gangan nìkan mu, kì í bá `gpt-5x6`
  mu láé (ó ní ààbò ReDoS, ó ní ààlà, kò sì ní àwọn quantifiers inú ara wọn). Àwọn patterns máa ń bá
  mejeeji model id lásán àti àkópọ̀ `provider/model` mu láìka bí lẹ́tà ṣe tóbi tàbí kékeré —
  `gpt-5-6`, `openai/gpt-5-6`, àti `openai/*` ṣiṣẹ́ gbogbo wọn, `*` nìkan sì ń yọ gbogbo model kúrò.
- Ìbámu: `isCompressionExcluded()` / `normalizeCompressionExclusions()` nínú
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` máa ń ṣàyẹ̀wò ibi-àfojúsùn tí a yọ kúrò
  lẹ́sẹ̀kẹsẹ̀ lẹ́yìn yíyanjú àwọn àtòpọ̀ ìfúnpọ̀, **ṣáájú kí engine kankan tó ṣiṣẹ́**, ó sì ń wo ìbámu
  gẹ́gẹ́ bí ìgbà tí a ti pa ìfúnpọ̀ gbogbogbò — a lè fi ẹ̀rí hàn pé ara ìbéèrè náà
  bá byte mu pátápátá. A máa ń kọ ìfojúsílẹ̀ náà sílẹ̀ nípasẹ̀ `writeCompressionSkip(..., "excluded")` fún
  híhàn nínú ìtúpalẹ̀.
- Àiyípadà (àkójọ òfìfo/tí kò sí): ó jẹ́ ọ̀kan náà pẹ̀lú ìhùwàsí ṣáájú #8034 — kò sí ohun tí a yọ kúrò.

## Àwọn ààlà tí a mọ̀

- **LLMLingua-2 (SLM) nílò àwọn dependency àṣàyàn tí a kó sí ibi kan náà.** Worker náà máa ń ṣiṣẹ́ nínú
  production build nìkan nígbà tí `@atjsh/llmlingua-2` + àwọn peer rẹ̀ bá wà ní ibi kan náà nínú
  `dist/node_modules` (wo `scripts/build/colocateOptionals.mjs`, #4286). Láìsí wọn,
  engine náà máa ń fail-open (yóò dá ọ̀rọ̀ ìpilẹ̀ padà). Ìṣàwárí worker kò gbára lé
  `import.meta.url` mọ́ (ó máa ń dáwọ́ dúró nínú standalone bundle) — ó máa ń lo runtime
  cwd / `argv[1]` gẹ́gẹ́ bí ìdákọ̀ró.
- **Àwọn language pack Caveman `de` / `fr` / `ja` kò pé.** Wọ́n ní àwọn òfin `context` +
  `filler` + `structural`, ṣùgbọ́n wọn kò ní àwọn pack `dedup` / `ultra`, nítorí náà ìwọ̀n
  `ultra` kò lágbára ju `full` lọ fún àwọn èdè wọ̀nyẹn (àwọn òfin tiwọn nìkan ni wọ́n ń lò — kò sí
  silent fall-back sí àwọn òfin `dedup`/`ultra` ti èdè Gẹ̀ẹ́sì, èyí tí ì bá ba ọ̀rọ̀ èdè mìíràn jẹ́).
  `en` / `es` / `id` / `pt-BR` ti pé. A tẹ́wọ́ gba ìfikún `dedup.json` + `ultra.json`
  fún àwọn pack tí kò tíì pé.
- **Stacked telemetry ń ṣàfihàn àwọn engine tí wọ́n ṣe compression nìkan.** Ìgbésẹ̀ stacked-pipeline kan tí
  engine rẹ̀ ṣiṣẹ́ ṣùgbọ́n tí kò mú ìfipamọ́ 0 % jáde máa ń dá `stats:null` padà, nítorí náà kò ní hàn nínú
  `engineBreakdown` — kò ṣeé yà á sọ́tọ̀ kúrò nínú ìgbésẹ̀ tí a fò kọjá. Láti lè ṣe ìyàtọ̀
  láàárín “ó ṣiṣẹ́, 0 %” àti “a fò ó kọjá” yóò nílò àyípadà sí breakdown-model, a sì ti sún un síwájú.

## Ìfàsẹ́yìnwò

Àwọn gate pàtàkì fún agbègbè yìí ni:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
