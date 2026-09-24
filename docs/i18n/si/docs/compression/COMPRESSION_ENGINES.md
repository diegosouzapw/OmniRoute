# Compression Engines (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute සම්පීඩනය engine contracts වටා ගොඩනගා ඇත. ප්රකාරයකට එක් engine එකක් සෘජුවම
(`caveman` හෝ `rtk`) හෝ engine කිහිපයක් අනුපිළිවෙළින් ක්රියාත්මක කරන නිර්ණායක stacked pipeline එකක් ධාවනය කළ හැක.

## මාතයන්

| මාදිලිය      | එන්ජින් මාර්ගය                                                                        | අපේක්ෂිත ආදානය                               |
| ------------ | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| `off`        | කිසිවක් නැත                                                                           | නිශ්චිත විමසුම් සංරක්ෂණය                     |
| `lite`       | Caveman lite helpers                                                                  | අඩු අවදානම් සෑම විටම පිරිසිදු කිරීම          |
| `standard`   | Caveman                                                                               | ස්වභාවික භාෂා විමසුම් ඝනීභවනය                |
| `aggressive` | Caveman + history/tool summarizers                                                    | දිගු කතාබස් සැසි                             |
| `ultra`      | Caveman + pruning helpers                                                             | සන්දර්භ-සීමා ප්රතිසාධනය                      |
| `rtk`        | RTK                                                                                   | Terminal, shell, build, test, and git output |
| `omniglyph`  | OmniGlyph                                                                             | දේශීය සැපයුම්කරු වයරය මත රූපයක් ලෙස සන්දර්භය |
| `stacked`    | Pipeline. The request default is `session-dedup -> lite`. `rtk -> caveman` is opt-in. | මිශ්ර මෙවලම් ලොග් සහ ගද්ය, උපරිම ඉතිරිකිරීම් |

### OmniGlyph සම්පීඩන පැතිකඩ

`omniglyph` එන්ජිම (package `omniglyph`, 1.4.0+) නම් කරන ලද අර්ථකථන පැතිකඩක් පිළිගනී, එය
සම්පීඩන සැකසුම් වල `omniglyph.profile` හරහා ගෝලීයව හෝ
stacked pipeline හි පියවර වින්යාසය හරහා පියවරෙන් පියවර සකසා ඇත:

| පැතිකඩ        | සීමාව                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `aggressive`  | පෙරනිමි. ප්රකාශිත කුවිතාන්සි මනින ලද ප්රතිපත්තිය — රූප පද්ධතිය, මෙවලම් ලේඛන සහ ඝන ඉතිහාසය            |
| `balanced`    | සජීවී තත්ත්වය ස්වදේශීයව තබා ගනී, අවසාන හැරීම් 8 ආරක්ෂා කරයි, පැරණි සංවෘත ඉතිහාසය කඩා දමයි            |
| `coding-safe` | අධිකාරිය, මෙවලම් යෝජනා ක්රම සහ සජීවී මෙවලම් ප්රතිදානය ස්වදේශීයව තබා ගනී, අවසාන හැරීම් 12 ආරක්ෂා කරයි |
| `passthrough` | පරිවර්තනයකින් තොරව මාර්ගගත කරයි; එන්ජිම මඟ හරිනු ලැබේ                                                |

පැතිකඩක් යනු **සිවිලිමක් මිස බිම් මට්ටමක් නොවේ**: පැකේජයේ `mergeCompressionProfileOptions`
අමතන්නෙකුට පැතිකඩ වසා දැමූ අලාභදායක මංතීරුවක් නැවත විවෘත කිරීමට ඉඩ නොදේ, එබැවින් පියවරෙන් පියවර
`preserveSystemPrompt: false` මඟින් `coding-safe` යටතේ පද්ධති සම්පීඩනය නැවත සක්රිය කළ නොහැක.

මෙම කේත පදනම මත මනිනු ලැබේ: `coding-safe` සහ `balanced` මඟින් `minCompressChars` එහි
උපරිමයට ඔසවා පද්ධතිය, මෙවලම් යෝජනා ක්රම සහ මෙවලම් ප්රතිඵල ස්වදේශීයව තබා ගනී, එබැවින්
ඉතිහාසය තවමත් රැස් කර නොමැති සැසියක් `below_min_chars` හි නතර වන අතර එන්ජිම කිසිවක්
පරිවර්තනය නොකරයි. පෙරනිමිය ආරක්ෂිතම පැතිකඩට වඩා `aggressive` වීමට හේතුව එයයි.

පැකේජය එහි පරිසර වින්යාසයෙන් තමන්ගේම ආකෘති විෂය පථය සහ පැතිකඩ විසඳයි.
OmniRoute කිසි විටෙකත් තීරණය භාර නොදේ: ඇඩැප්ටරය ආකෘති දොරටුව පැකේජයේ වඩාත්ම සීමාකාරී
විෂය පථයට අමුණයි, එබැවින් සත්කාරක පරිසර සැකසුම් මඟින් OmniRoute හි මනින ලද කුවිතාන්සි
පසුකර අවසර ලැයිස්තුව පටු කළ හැකි මිස කිසි විටෙකත් පුළුල් කළ නොහැක.

## එන්ජින් රෙජිස්ට්රිය

රෙජිස්ට්රිය `open-sse/services/compression/engines/registry.ts` තුළ පිහිටා ඇත. එන්ජින් පොදු ගිවිසුමක් නිරාවරණය කරයි:

- `id`: `caveman` හෝ `rtk` වැනි ස්ථාවර එන්ජින් id එක
- `apply(text, config)`: ස්තරගත පයිප්ලයින් විසින් භාවිත කරන පැරණි ක්රියාත්මක කිරීමේ මාර්ගය
- `compress(input, config)`: පෙළ + සංඛ්යාලේඛන ආපසු ලබා දෙන ප්රධාන ක්රියාත්මක කිරීමේ මාර්ගය
- `getConfigSchema()`: වලංගු වින්යාසයක JSON-Schema වැනි හැඩය ආපසු ලබා දෙයි
- `validateConfig(config)`: `{ valid, errors[] }` ආපසු ලබා දෙයි

ලියාපදිංචිය සඳහා `registerCompressionEngine(engine)` (හෝ උසස් අවස්ථා සඳහා `registerEngine`) භාවිත කරන අතර, එය පිළිගැනීමට පෙර `assertValidEngine()` සහ `validateConfig(defaultConfig)` කැඳවයි.
ධාවන වේලාවේදී එන්ජිමක් ඉවත් කිරීමට `unregisterCompressionEngine(id)` භාවිත කරන්න.

සම්පීඩනය ක්රියාත්මක වීමට පෙර `strategySelector.ts` විසින් අන්තර්ගත එන්ජින් ලියාපදිංචි කරයි. මෙය පෙරදසුනට, ධාවන-වේලා සම්පීඩනයට, ස්තරගත ප්රකාරයට, පරීක්ෂණවලට සහ අනාගත එන්ජින්වලට එකම ක්රියාත්මක කිරීමේ මාර්ගය භාවිත කිරීමට ඉඩ සලසයි.

### MCP විස්තර සම්පීඩනය (අදාළ)

වෙනම රෙජිස්ට්රියක් විසින් රෙජිස්ට්රි මට්ටමේදී MCP මෙවලම් විස්තර පාර-දත්ත සම්පීඩනය කරයි — `open-sse/mcp-server/descriptionCompressor.ts` සහ [MCP-SERVER.md](../frameworks/MCP-SERVER.md) බලන්න. එය Caveman රීති නැවත භාවිත කරන නමුත්, ඉල්ලීම් දත්තභාර මත නොව මෙවලම් පාර-දත්ත මත ක්රියා කරයි.

### අතිරේක අන්තර්ගත එන්ජින්

Caveman, RTK, සහ LLMLingua-2 ට අමතරව, රෙජිස්ට්රිය විශේෂිත හානි-රහිත /
ව්යුහාත්මක එන්ජින් කිහිපයක් සමඟ සපයනු ලැබේ (ස්තරගත පයිප්ලයින්, ක්රීඩාංගණය, සහ පරීක්ෂණ විසින් භාවිත කරනු ලැබේ):

| එන්ජිම        | Id              | එය කරන දේ                                                                                                                                                                    |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): විශාල අඛණ්ඩ පෙළ කොටස් අන්තර්ගතය-මත-ලිපිනගත යොමු සමඟ ප්රතිස්ථාපනය කරයි, එබැවින් නැවත නැවත ඇති/විශාල කොටස් එක් වරක් යවා ඉන්පසු යොමු කරනු ලැබේ. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): සමජාතීය JSON-array දත්තභාර තීරුමය `[N rows]` ආකෘතියකට හානි-රහිතව වගුගත සංක්ෂිප්ත කිරීම.                                                              |
| ionizer       | `ionizer`       | ඉතා විශාල සමජාතීය කොටස් සඳහා මුල්/මැද/අවසන් පේළි නියැදීම සිදු කරමින්, ඉවත් කළ මැද කොටස CCR අන්තර්ගතය-මත-ලිපිනගත යොමුවක් ලෙස ගබඩා කරයි.                                       |
| session-dedup | `session-dedup` | අන්තර්ගතය-මත-ලිපිනගත වාර-අතර අනුපිටපත් ඉවත් කිරීම (TokenMizer-ආනුභාවයෙන්): එම සැසියේම පෙර වාරවල දැනටමත් දැක ඇති පෙළ ඉවත් කරයි.                                               |

**CCR ලබාගැනීමේ-ප්රොටෝකෝල උපදෙස් (#8033):** CCR විසින් ඉල්ලීමක ≥1 කොටසක්
ප්රතිස්ථාපනය කරන පළමු අවස්ථාවේදී, එන්ජිම එක් වරක් පමණක් බලපාන `system` පණිවිඩයක් (`[CCR protocol]`
සෙන්ටිනලයෙන් ආරම්භ වන) ඉදිරියට එක් කරමින් සලකුණ → මෙවලම ගිවිසුම ඇමතුම්කරුට උගන්වයි:
`[CCR retrieve hash=<24hex> chars=N]` සලකුණක අර්ථය, hash එක අකුරටම පිටපත් කළ යුතු බව
(සියලුම hex අක්ෂර 24 — වැරදි ලෙස පිටපත් කළ hash, "block not found" දෝෂවලට බොහෝ දුරට හේතු වේ),
සහ `[dedup:ref sha=...]` සලකුණක අර්ථය "ඉතිහාසය තුළ ආපසු බලන්න" මිස "මෙවලම
අමතන්න" නොවන බව එයින් පැහැදිලි කරයි. සටහන ඇතුළු කරන්නේ **ඇමතුම්කරු විසින් ප්රකාශිත
`tools[]` හරහා එයට සැබවින්ම `omniroute_ccr_retrieve` වෙත ළඟා විය හැකි බව තහවුරු වන විට පමණි**
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts` තුළ
`callerSupportsCcrRetrieve()`) — එම මෙවලම නොමැති සාමාන්ය OpenAI-අනුකූල ඇමතුම්කරුවෙකුට
තමන්ට ළඟා විය නොහැකි යමක් ඇමතීමට උපදෙස් කිසිවිටෙක නොලැබේ. ඇතුළු කිරීමට පෙර
සෙන්ටිනලය සඳහා පණිවිඩ ඉතිහාසය පරිලෝකනය කිරීමෙන් එක් වරක් පමණක් බලපෑම බලාත්මක කරයි,
එබැවින් බහු-වාර ඉල්ලීම් (පෙර පණිවිඩ නැවත ධාවනය කරන) එක් එක් වාරයකට සටහන ගොඩගසන්නේ නැත.

## Caveman

Caveman මාදිලිය සාමාන්ය ගද්යයේ අර්ථානුකූල සංක්ෂේපණය කෙරෙහි අවධානය යොමු කරයි:

- code blocks, URLs, JSON, paths සහ ව්යුහගත දත්ත සුරකියි
- අනවශ්ය පිරවුම්, අවිනිශ්චිත ප්රකාශ, නැවත නැවත සඳහන් වන සන්දර්භය සහ දීර්ඝ සම්බන්ධක වාක්ය ඛණ්ඩ ඉවත් කරයි
- `open-sse/services/compression/rules/` තුළ භාෂාව පිළිබඳ දැනුවත් file rule packs සඳහා සහය දක්වයි
- පැරණි `standard`, `aggressive` සහ `ultra` මාදිලි හරහා ද තවදුරටත් ලබාගත හැක

dashboard අතුරුමුහුණත `Dashboard -> Context & Cache -> Caveman` වේ.

Caveman upstream වාර්තා අනුව output tokens `~75%`කින් අඩු වන අතර, මිණුම් පරීක්ෂණවල සාමාන්ය output ඉතිරිය `65%`කි,
එහි පරාසය `22-87%`ක් වන අතර input-compression tool එකක් ලෙස `~46%`ක් ලබා දෙයි. OmniRoute, ඒකාබද්ධ prompt/context ඉතිරිකිරීම්
ලේඛනගත කිරීමේදී Caveman හි input-side අගය භාවිත කරයි; Caveman output මාදිලිය වෙනම
ප්රතිචාර-හැසිරීම් විශේෂාංගයක් ලෙස පවතී.

## RTK

RTK මාදිලිය command සහ tool output කෙරෙහි අවධානය යොමු කරයි:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go tests, TypeScript/Vite/Webpack builds, ESLint, npm audit/installs, Docker logs,
  shell `find`/`grep`, stack traces සහ සාමාන්ය logs වැනි output පන්ති හඳුනා ගනියි
- `open-sse/services/compression/engines/rtk/filters/` වෙතින් JSON filters 49ක් යොදයි
- RTK-ශෛලියේ ප්රකාශනාත්මක pipeline එක සඳහා සහය දක්වයි: ANSI ඉවත් කිරීම, replace, match-output short-circuit,
  පේළි ඉවත් කිරීම/තබාගැනීම, එක් එක් පේළිය කෙටි කිරීම, head/tail/max-line කෙටි කිරීම සහ හිස් වූ විට fallback කිරීම
- `.rtk/filters.json` හි trust-gated project filters සහ
  `DATA_DIR/rtk/filters.json` හි global filters සඳහා සහය දක්වයි
- ANSI අනුක්රම, ප්රගති noise, නැවත නැවත යෙදෙන පේළි සහ ප්රයෝජනවත් නොවන boilerplate ඉවත් කරයි
- ක්රියාමාර්ග ගත හැකි අසාර්ථකවීම්, අනතුරු ඇඟවීම්, සාරාංශ, වෙනස් වූ files සහ tail සන්දර්භය සුරකියි
- authenticated management routes හරහා ප්රතිසාධනය/debugging සඳහා සංස්කරණය කර සඟවන ලද raw output විකල්ප ලෙස රඳවාගත හැක

dashboard අතුරුමුහුණත `Dashboard -> Context & Cache -> RTK` වේ.

custom filters, trust, verify සහ raw-output ප්රතිසාධනය සඳහා වන මෙහෙයුම් විස්තර
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) තුළ ඇත.

RTK upstream වාර්තා අනුව command-output සම්පීඩනයෙන් `60-90%`ක ඉතිරියක් ලැබේ. එහි README උදාහරණය අනුව
මිනිත්තු 30ක Claude Code session එකක් tokens `~118,000` සිට `~23,900` දක්වා අඩු වන අතර එය `79.7%`ක ඉතිරියකි.

## LLMLingua-2 (අර්ථානුකූල කප්පාදු කිරීම)

LLMLingua-2 මාදිලිය, කුඩා ONNX token classifier එකක් භාවිතයෙන් ගද්යය මත **අර්ථානුකූල token කප්පාදුව** සිදු කරමින්,
rule-based Caveman සහ RTK engines සඳහා අනුපූරකයක් සපයයි:

- system නොවන messages තුළ ඇති ගද්යය පමණක් සම්පීඩනය කරයි; fenced code blocks සහ සුරැකෙන අනෙකුත්
  ව්යුහ කිසිවිටෙකත් වෙනස් නොකරයි
- `@atjsh/llmlingua-2` backend එක (`@huggingface/transformers` හරහා ONNX) worker thread එකක
  ධාවනය කරන බැවින් model inference කිසිවිටෙකත් request event loop එක අවහිර නොකරයි
- **stack කළ හැකිය** (`stackPriority` 35): stacked pipeline එකක එය
  structural engines (CCR, session-dedup, headroom, Caveman) වලට පසුව, නමුත් `ultra`ට පෙර ධාවනය වේ, මන්ද
  දැනටමත් ව්යුහාත්මකව සම්පීඩිත text මත අර්ථානුකූල කප්පාදුව වඩාත් ඵලදායී වන බැවිනි — උදා.
  `rtk -> caveman -> llmlingua`
- **ඕනෑම දෝෂයකදී fail-open වේ** (නොමැති optional deps, worker spawn, model load, inference,
  හෝ timeout) → දෝෂයක් නොව, මුල් text එක කිසිදු වෙනසකින් තොරව ආපසු ලබා දෙයි

Engine පිහිටීම: `open-sse/services/compression/engines/llmlingua/`. dashboard අතුරුමුහුණත
`Dashboard -> Context & Cache -> LLMLingua` වේ.

### Models

පෙරනිමි model එක **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
වේගවත්) වේ. වඩාත් ඉහළ නිරවද්යතාවක් ඇති **BERT-base** model එකක් (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) engine config හි `model` field එක හරහා ලබාගත හැක. පළමු call එකේදී (`modelStore.ts`),
`@huggingface/transformers` තෝරාගත් model එක HuggingFace Hub වෙතින්
`${DATA_DIR}/models/llmlingua` වෙත අවශ්ය වූ විට බාගත කරයි; ඒ වෙනුවට `modelPath` config
override එකක් මඟින් එය local copy එකකට යොමු කරයි (offline / air-gapped ස්ථාපන).

### Optional dependencies සහ අවශ්ය විට ස්ථාපනය

කප්පාදු කළ හැකි LLMLingua runtime peer stack එක **විකල්ප** වේ. packages දෙකක්
`package.json` තුළ `optionalDependencies` ලෙස ප්රකාශ කර ඇති අතර production build එකේදී
(`scripts/build/prepublish.ts` ඒවා bundle නොකරයි) **external** ලෙස තබා ඇත:

| Package              | Version (pin) | සටහන්                                              |
| -------------------- | ------------- | -------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | ප්රවේශ package එක; අනෙක් ඒවා peers ලෙස ප්රකාශ කරයි |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                          |

`@huggingface/transformers`, `^4.2.0` වෙත pin කර ඇත (local embeddings path එක සමඟ බෙදාගන්නා අතර
standalone bundle එක තුළට ද trace කර ඇත); `@atjsh/llmlingua-2@2.0.5`, එය මත
`"^3.5.2 || ^4.0.0"` සමඟ peer වන බැවින් Transformers.js v3 සහ v4 යන දෙකටම සහය දක්වයි. 2.0.4 සිට,
`@atjsh/llmlingua-2` සඳහා තවදුරටත් `@tensorflow/tfjs` අවශ්ය නොවන අතර, එමඟින් SLM stack එකේ විශාලතම තනි
දායකයා (TensorFlow.js) ඉවත් විය. ඉහත packages දෙක පමණක් කප්පාදු කළ හැකි SLM
peers වේ. optional dependencies අත්හැර නොමැති නම් සාමාන්ය `npm install` (dev) එකක් optional stack එක
ස්වයංක්රීයව ස්ථාපනය කරයි.

**අවශ්ය විට පමණක් ස්ථාපනය කරන්නේ ඇයි:** ප්රමාණයෙන් කුඩා ලෙස තබාගැනීම සඳහා npm මත ප්රකාශිත package එක, standalone bundle එක සහ Docker image එක
මෙම deps **නොමැතිව** නිකුත් වේ. ඒවා නොමැති විට, worker හි dependency
gate එක (`worker.ts` හි `@atjsh/llmlingua-2` resolve probe එකක්) අසාර්ථක වන අතර engine එක
**නිහඬව fail-open වේ** — LLMLingua තේරීම no-op එකක් බවට පත්වේ (text එක වෙනස් නොකර ආපසු ලබා දෙයි,
දෝෂයක් log නොකරයි). කප්පාදු කළ environment එකක එය සක්රිය කිරීමට optional stack එක ස්ථාපනය කරන්න:

```bash
# package.json optionalDependencies තුළ ප්රකාශිත versions වෙත pin කරන්න
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` ඉවත් කිරීම (2.0.4+) පෙර ප්රමුඛව පැවති ~800 MB
දායකත්වය ඉවත් කරයි — ඉතිරි footprint එක වන්නේ transformers.js + onnxruntime-node runtimes සහ
පළමු භාවිතයේදී බාගත කරන TinyBERT model එක (~57 MB) යි (npm හරහා නොවේ).

එක් එක් environment එක අනුව:

- **Dev / `npm install`** — ඔබ `--omit=optional` (හෝ `--no-optional`) ලබා දී නොමැති නම් ස්වයංක්රීයව ස්ථාපනය වේ. කිසිදු ක්රියාමාර්ගයක් අවශ්ය නොවේ.
- **Global npm (`npm i -g omniroute`) / ස්වාධීන** — ඉහත ස්ථාපන විධානය ස්ථාපිත package නාමාවලිය තුළ ක්රියාත්මක කරන්න, නැතහොත් optional dependencies අත් නොහැර නැවත ස්ථාපනය කරන්න.
- **Docker** — ව්යුත්පන්න image layer එකකට ස්ථාපන විධානය එක් කරන්න; ප්රකාශිත image එක සැලසුම අනුව අවම ප්රමාණයෙන් නිකුත් කෙරේ.
- **VPS (PM2)** — යෙදුමේ `node_modules` තුළ ස්ථාපනය කර, worker එක gate එක නැවත පරීක්ෂා කරන පරිදි process එක නැවත ආරම්භ කරන්න.
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — standalone trace එක සමඟ worker එක හෝ optional dependencies කිසිවක් නිකුත් නොවන බැවින්, engine එක නිහඬව fail-open වේ. `scripts/build/colocate-standalone.mjs` ඒ දෙකම නැවත යොදයි (worker esbuild + optional-dep closure එක standalone tree එක තුළට); සෑම build එකකටම පසුව `postbuild` npm hook එක හරහා එය ස්වයංක්රීයව ක්රියාත්මක වේ. Idempotent වන අතර dependencies නොමැති විට fail-soft වේ.

**එය සක්රිය බව තහවුරු කරන්න:** LLMLingua තෝරා ඇති විට, සැබෑ ගද්යය ඇත්තෙන්ම කෙටි වේ (engine එක fail-open වීම නවත්වයි), සහ පළමු request එකෙන් model එක `${DATA_DIR}/models/llmlingua` වෙත download කිරීම ආරම්භ වේ. Gate එක හිතාමතාම `@atjsh/llmlingua-2` පමණක් පරීක්ෂා කරයි — අනෙකුත් peers ESM-only වන අතර, ඒවා පවතින විට පවා `require.resolve` ඒවා මත exception එකක් throw කරයි — එබැවින් `import()` අවස්ථාවේදී කිසියම් peer එකක් සැබවින්ම නොමැති නම් worker එක තවමත් fail-open වේ.

## ස්තරගත නළ මාර්ග

ස්තරගත ප්රකාරය නළ මාර්ග පියවර අනුපිළිවෙළින් ධාවනය කරයි. පෙරනිමිය වන්නේ:

```txt
rtk -> caveman
```

විධාන ප්රතිදානය මානව හෝ සහායක ගද්ය සමඟ ඒකාබද්ධ කරන ප්රේරකයක් සහිත කේතකරණ නියෝජිත සැසි සඳහා මෙය භාවිත කරන්න. RTK පළමුව අනවශ්ය ඝෝෂාකාරී මෙවලම් ලොග් අඩු කරයි, ඉන්පසු Caveman ඉතිරි ස්වාභාවික භාෂාව සම්පීඩනය කරයි.

නළ මාර්ග පියවර සම්පීඩන සැකසුම් තුළ `stackedPipeline` මඟින් හෝ සම්පීඩන සංයෝජන හරහා වින්යාස කෙරේ.

එන්ජින් දෙකම එකම සුදුසු දත්ත කොටස අඩු කරන විට, ඉතිරිකිරීම් සංයුක්ත වේ:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP ප්රවේශ්යතා වෘක්ෂ පෙරහන

MCP ප්රවේශ්යතා-වෘක්ෂ ස්මාර්ට් පෙරහන යනු ප්රේරක හෝ සන්දර්භය මත නොව MCP **මෙවලම් ප්රතිඵල** මත ධාවනය වන පශ්චාත්-ක්රියාත්මක සම්පීඩන ස්තරයකි. එය Playwright, computer-use, සහ browser-automation MCP සේවාදායක වැනි මෙවලම් මඟින් ආපසු ලබා දෙන විස්තරාත්මක ප්රවේශ්යතා-වෘක්ෂ සහ බ්රවුසර ස්නැප්ෂොට් දත්ත කොටස් ඉලක්ක කරයි.

### එය කරන දේ

1. **අනවශ්ය දත්ත ඉවත් කිරීම** — හිස් සාමාන්ය/පෙළ ඇතුළත් කිරීම් (`- generic:`, `- text: ""`) ඉවත් කරයි
2. **සහෝදර මූලද්රව්ය හකුළීම** — අඛණ්ඩ පේළි ≥ `collapseThreshold` (පෙරනිමිය 30) ව්යුහාත්මක පුනරාවර්තන වන විට, ඒවා පළමු `collapseKeepHead` (පෙරනිමිය 10) පේළි + සංඛ්යා සාරාංශයක් + අවසන් `collapseKeepTail` (පෙරනිමිය 5) පේළි බවට හකුළයි
3. **Ref සංරක්ෂණය** — Playwright/computer-use සඳහා අවශ්ය `[ref=eXX]` නැංගුරම් කිසිවිටෙක වෙනස් නොකෙරේ
4. **දෘඪ කප්පාදුව** — හකුළීමෙන් පසුවත් පෙළ `maxTextChars` (පෙරනිමිය 50,000) ඉක්මවන්නේ නම්, නියෝජිතයාට දිගටම වැඩ කළ හැකි වන පරිදි සංචාලන ඉඟියක් සමඟ එය කප්පාදු කරයි

### එන්ජිමේ පිහිටීම

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() පිවිසුම් ස්ථානය
  collapseRepeated.ts ← සහෝදර-හකුළීමේ ඇල්ගොරිතමය
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### වින්යාසය

ගෝලීය සැකසුම්වල `compression.mcpAccessibility` මඟින් පාලනය කෙරේ (සංක්රමණය 056). පෙරනිමි වින්යාසය:

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

පෙරහන යොදනු ලබන්නේ `type` අගය `"text"` වන සහ දිග `minLengthToProcess` ඉක්මවන මෙවලම්-ප්රතිඵල දත්ත කොටස්වලට පමණි. එය ප්රේරක සම්පීඩනයට හෝ ඉල්ලීම් දත්ත කොටස්වලට බලපාන්නේ නැත.

### අපේක්ෂිත ඉතිරිකිරීම්

පිටුවේ සංකීර්ණත්වය අනුව, බ්රවුසර ස්නැප්ෂොට් මෙවලම් ප්රතිඵල මත 60–80% කි. හකුළීමේ ඇල්ගොරිතමය පේළි ගණන අනුව O(n) වන අතර නොසැලකිය හැකි ප්රමාදයක් එක් කරයි.

### මෙම පෙරහන සහ ඉහත සම්පීඩන එන්ජින් අතර වෙනස

| අංගය         | Caveman / RTK / Stacked   | MCP ප්රවේශ්යතා පෙරහන                   |
| ------------ | ------------------------- | -------------------------------------- |
| ඉලක්කය       | ඉල්ලීම් ප්රේරක / සන්දර්භය | MCP මෙවලම් ප්රතිඵල                     |
| ප්රේරකය      | සම්පීඩන ප්රකාර සැකසුම     | `compression.mcpAccessibility.enabled` |
| විෂය පථය     | සියලුම SSE පණිවිඩ         | මෙවලම් ප්රතිඵල පමණි                    |
| Ref නැංගුරම් | අදාළ නොවේ                 | කොන්දේසි විරහිතව සංරක්ෂණය කෙරේ         |

---

## සම්පීඩන සංයෝජන

සම්පීඩන සංයෝජන යනු මාර්ගගත කිරීමේ සංයෝජනවලට පැවරිය හැකි නම් කළ සම්පීඩන පැතිකඩ වේ:

- `compression_combos`: මාදිලිය, නළ මාර්ගය, RTK වින්යාසය, භාෂා වින්යාසය සහ පෙරනිමි සලකුණ ගබඩා කරයි
- `compression_combo_assignments`: සම්පීඩන සංයෝජනයක් මාර්ගගත කිරීමේ සංයෝජනයකට සිතියම්ගත කරයි
- ධාවනකාල අනුකලනය සාමාන්ය සංයෝජන අතික්රමණවලට පෙර පවරා ඇති සම්පීඩන සංයෝජනයක් විසඳයි
- විශ්ලේෂණවල `compression_combo_id` සහ `engine` ඇතුළත් වේ

උපකරණ පුවරුවේ ස්ථානය: `Dashboard -> Context & Cache -> Compression Combos`.

## API අතුරුමුහුණත

| මාර්ගය                                 | අරමුණ                                                      |
| -------------------------------------- | ---------------------------------------------------------- |
| `/api/settings/compression`            | ගෝලීය සම්පීඩන සැකසුම් (`mcpAccessibility` වින්යාසය ඇතුළුව) |
| `/api/compression/preview`             | ඕනෑම සම්පීඩන මාදිලියක් පෙරදසුන් කිරීම                      |
| `/api/compression/language-packs`      | ලබා ගත හැකි Caveman භාෂා ඇසුරුම් ලැයිස්තුගත කිරීම          |
| `/api/context/caveman/config`          | Caveman සැකසුම් අන්වර්ථය                                   |
| `/api/context/rtk/config`              | RTK පෙරනිමි සහ සැකසුම්                                     |
| `/api/context/rtk/filters`             | RTK පෙරහන් නාමාවලිය                                        |
| `/api/context/rtk/test`                | RTK පෙරදසුන්/පරීක්ෂණ අන්ත ලක්ෂ්යය                          |
| `/api/context/rtk/raw-output/[id]`     | සත්යාපිත, සංවේදී තොරතුරු ඉවත් කළ අමු ප්රතිදාන ප්රතිසාධනය   |
| `/api/context/combos`                  | සම්පීඩන සංයෝජන CRUD                                        |
| `/api/context/combos/[id]/assignments` | මාර්ගගත කිරීමේ සංයෝජන පැවරුම් CRUD                         |
| `/api/context/analytics`               | සම්පීඩන විශ්ලේෂණ අන්වර්ථය                                  |

කළමනාකරණ මාර්ග සඳහා කළමනාකරණ සත්යාපනය හෝ API-යතුරු ප්රතිපත්ති පරීක්ෂා අවශ්ය වේ.

## MCP මෙවලම්

සම්පීඩනය MCP මෙවලම් පහක් නිරාවරණය කරයි:

| මෙවලම                               | විෂය පථය            | අරමුණ                                  |
| ----------------------------------- | ------------------- | -------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | සැකසුම්, විශ්ලේෂණ සහ හැඹිලි සංඛ්යාලේඛන |
| `omniroute_compression_configure`   | `write:compression` | ගෝලීය සැකසුම් යාවත්කාලීන කිරීම         |
| `omniroute_set_compression_engine`  | `write:compression` | මාදිලිය සහ විකල්ප නළ මාර්ගය සැකසීම     |
| `omniroute_list_compression_combos` | `read:compression`  | සම්පීඩන සංයෝජන ලැයිස්තුගත කිරීම        |
| `omniroute_compression_combo_stats` | `read:compression`  | සංයෝජන/එන්ජින් විශ්ලේෂණ කියවීම         |

## විෂය පථය සහ බැහැර කිරීම්

**Embeddings කිසිවිටෙක සම්පීඩනය නොකෙරේ.** `open-sse/handlers/embeddings.ts` කිසිදු
සම්පීඩන එන්ජිමක් කිසිවිටෙක කැඳවන්නේ නැත — ඉල්ලීම්/ප්රතිචාර අන්තර්ගතයන් වෙනස් නොකරම
සෘජුවම ක්රියාත්මක කරන්නා වෙත යයි. මෙය දැනට ව්යුහාත්මක වේ (embeddings සහ chat
completions සඳහා වෙන් වූ handlers ඇත), ධාවනකාල පරීක්ෂාවක් නොවේ; එහෙත් එයින් අදහස්
වන්නේ #8034 හි දෛශික-විකෘතිකරණ ගැටලුවට embeddings මාර්ගයේ නිරාවරණ පෘෂ්ඨයක් නොමැති
බවයි.

**ආකෘතිය/අන්ත ලක්ෂ්යය අනුව බැහැර කිරීමේ පෙරහන (#8034).** chat completions සඳහා,
කිසිවිටෙක සම්පීඩනය නොකළ යුතු ආකෘති ids / `provider/model` ඉලක්ක ක්රියාකරුවෙකුට නම්
කළ හැකිය — අනාගතයේදී සම්පීඩනය embeddings-ආශ්රිත මාර්ගයකට වඩාත් සමීපව සම්බන්ධ
කළහොත් ප්රයෝජනවත් වන ආරක්ෂණ වැටක් මෙන්ම, ප්රේරකයේ නිශ්චිත බයිට්-මට්ටමේ අන්තර්ගතය
වැදගත් වන ඕනෑම ආකෘතියක් සඳහාද සාමාන්යයෙන් ප්රයෝජනවත් වේ (නිර්ණායක ඇගයීම්,
හැඹිලි-සංවේදී උපසර්ග ආදිය).

- සැකසුම් ක්ෂේත්රය: ගෝලීය සම්පීඩන වින්යාසය මත `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`), පවතින `key_value` සම්පීඩන නාමාවකාශය
  (`src/lib/db/compression.ts`) හරහා ස්ථායීව ගබඩා කෙරේ — නව වගුවක් නැත.
- උපකරණ පුවරු ටැබය: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- රටා වාක්ය රීතිය: එකම ආදේශක ලකුණ `*` වේ. රටාවක ඇති අනෙකුත් සෑම regex
  පාරඅක්ෂරයක්ම ගැළපීමට පෙර escape කරනු ලැබේ; එබැවින් `gpt-5.6` ගැළපෙන්නේ එම
  අක්ෂර මාලාවට පමණක් වන අතර `gpt-5x6` සමඟ කිසිවිටෙක නොගැළපේ
  (ReDoS-ආරක්ෂිත, සීමා කළ, කැදලිගත ප්රමාණකාරක නොමැති). රටා, අකුරු විශාලත්වය
  නොසලකා, හිස් ආකෘති id සහ `provider/model` සංයුක්තය යන දෙකටම ගැළපේ —
  `gpt-5-6`, `openai/gpt-5-6`, සහ `openai/*` සියල්ල ක්රියා කරයි; `*` පමණක්
  භාවිත කළ විට සෑම ආකෘතියක්ම බැහැර කෙරේ.
- ගැළපීම: `open-sse/services/compression/exclusions.ts` තුළ
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`. `chatCore.ts`,
  සම්පීඩන සැකසුම් විසඳූ වහාම, **කිසිදු එන්ජිමක් ධාවනය වීමට පෙර**, බැහැර කළ ඉලක්කය
  පරීක්ෂා කරයි; ගැළපීමක් ගෝලීයව සම්පීඩනය අක්රිය කර ඇති අවස්ථාවකට හරියටම සමානව
  සලකයි — ඉල්ලීම් අන්තර්ගතය බයිට්-අනුව සර්වසම බව සනාථ කළ හැකිය. විශ්ලේෂණ
  දෘශ්යතාව සඳහා මඟහැරීම `writeCompressionSkip(..., "excluded")` හරහා වාර්තා කෙරේ.
- පෙරනිමිය (හිස්/නොපවතින ලැයිස්තුව): #8034 ට පෙර හැසිරීමට සර්වසම වේ — කිසිවක්
  බැහැර නොකෙරේ.

## දන්නා සීමාවන්

- **LLMLingua-2 (SLM) සඳහා එකම ස්ථානයේ පිහිටුවන ලද විකල්ප පරායත්තතා අවශ්ය වේ.** Worker එක
  production build එකක ධාවනය වන්නේ `@atjsh/llmlingua-2` + එහි peer පරායත්තතා
  `dist/node_modules` තුළ එකම ස්ථානයේ පිහිටුවා ඇති විට පමණි (`scripts/build/colocateOptionals.mjs`, #4286 බලන්න). ඒවා නොමැතිව
  engine එක fail-open වේ (මුල් පෙළ ආපසු ලබා දෙයි). Worker resolution තවදුරටත්
  `import.meta.url` මත රඳා නොපවතී (එය standalone bundle එක තුළ අසාර්ථක වේ) — එය runtime
  cwd / `argv[1]` මත පදනම් වේ.
- **Caveman භාෂා ඇසුරුම් `de` / `fr` / `ja` අර්ධ වශයෙන් පමණක් සම්පූර්ණය.** ඒවා සමඟ `context` +
  `filler` + `structural` රීති ලබා දෙන නමුත් `dedup` / `ultra` ඇසුරුම් නොමැති බැවින්, එම භාෂා සඳහා `ultra` තීව්රතාව
  `full` ට වඩා ප්රබල නොවේ (ඒවා භාවිත කරන්නේ තමන්ගේම රීති පමණි — විදේශීය පෙළ විකෘති කළ හැකි
  ඉංග්රීසි `dedup`/`ultra` රීති වෙත නිහඬ fall-back වීමක් නොමැත).
  `en` / `es` / `id` / `pt-BR` සම්පූර්ණය. අර්ධ ඇසුරුම් සඳහා `dedup.json` + `ultra.json`
  දායකත්ව සාදරයෙන් පිළිගනු ලැබේ.
- **Stacked telemetry හි ලැයිස්තුගත වන්නේ සම්පීඩනය සිදු කළ engine පමණි.** Engine එක
  ධාවනය වූ නමුත් 0 % ඉතිරියක් ලබා දුන් stacked-pipeline පියවරක් `stats:null` ආපසු ලබා දෙන අතර, එම නිසා
  `engineBreakdown` තුළ නොපෙන්වයි — එය මඟ හැරුණු පියවරකින් වෙන්කර හඳුනාගත නොහැක. "ධාවනය විය, 0 %" සහ "මඟ හැරුණි"
  අතර වෙනස හඳුනාගැනීමට breakdown-model වෙනසක් අවශ්ය වන අතර එය කල් දමා ඇත.

## වලංගුකරණය

මෙම ප්රදේශය සඳහා අවධානය යොමු කරන ලද ගේට්ටු වන්නේ:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
