# 🗜️ Prompt Compression Guide — OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Chekwa 15-95% nke context ndị tozuru etozu na-akpaghị aka. Maka nchịkọta ngwa ngwa, lee [ngalaba README Compression](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Nchịkọta

OmniRoute na-emejuputa pipeline prompt compression nwere modulu nke na-arụ ọrụ **tupu oge eruo** tupu arịrịọ eruo ndị provider dị n'elu. Nke a pụtara na nchekwa token gị na-eme n'ụzọ a na-adịghị ahụ anya — ọ dịghị mgbanwe achọrọ na workflow gị.

```
Arịrịọ Client
  → Onye Nhọrọ Usoro Compression
    → Enwere combo override? → Jiri ntọala combo
    → Eruru auto-trigger threshold? → Jiri auto mode
    → Enwere default mode? → Jiri ntọala zuru ụwa ọnụ
    → Off? → Mafere compression
  → Compression Mode Ahọpụtara
    → Off: Enweghị compression
    → Lite: Nhicha whitespace/formatting dị nchebe (~15%)
    → Standard: Mwepụ okwu mgbakwunye n'ụdị Caveman (~30%)
    → Aggressive: Ime ka history kaa nká + nchịkọta (~50%)
    → Ultra: Heuristic pruning + ime ka code-block dị gịrịgịrị (~75%)
    → RTK: Nzacha terminal/tool-output na-aghọta command (oke upstream 60-90%)
    → Stacked: Pipeline ọtụtụ engine ahaziri n'usoro, na-abụkarị RTK sochiri Caveman (oke ndị tozuru etozu 78-95%)
  → Arịrịọ Emechiri → Provider
```

---

## Compression Modes

### Off

A naghị etinye compression ọ bụla. Ozi niile na-agafe na-agbanweghị.

### Lite Mode (~15% nchekwa, <1ms latency)

Mode kacha dị nchebe — enweghị mgbanwe semantic ọ bụla, naanị nhicha formatting:

| Usoro                    | Nkọwa                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Jikọta ahịrị efu ndị na-esochi ibe ha na oghere dị na njedebe |
| `dedupSystemPrompt`      | Wepụ system message ndị e megharịrị                           |
| `compressToolResults`    | Mee ka output tool/function ndị toro ogologo dị mkpụmkpụ      |
| `removeRedundantContent` | Wepụ ntuziaka ndị e megharịrị                                 |
| `replaceImageUrls`       | Mee ka URI data onyonyo base64 dị mkpụmkpụ                    |

**Kachasị mma maka:** Ojiji na-arụ ọrụ mgbe niile, workflow ebe nchekwa dị oke mkpa.

### Standard Mode (~30% nchekwa)

[Caveman](https://github.com/JuliusBrussee/caveman) kpaliri ya — ọ na-ewepụ okwu mgbakwunye na ahịrịokwu toro ogologo ma na-echekwa ihe ha pụtara:

- Na-ewepụ okwu mgbakwunye ("biko", "echere m", "n'ụzọ bụ isi", "n'ezie")
- Na-eme ka ahịrịokwu toro ogologo dị mkpụmkpụ ("iji mee" → "ime", "n'ihi nke a" → "n'ihi na")
- Na-ewepụ okwu nkwanye ùgwù na-egosi enweghị nkwenye ("Ọ ga-ewute gị...", "Ọ bụrụ na ị nwere ike...")
- Iwu regex karịrị 30 a haziri maka coding prompt

**Kachasị mma maka:** Workflow coding kwa ụbọchị, otu ndị na-elebara ọnụ ahịa anya.

### Aggressive Mode (~50% nchekwa)

Njikwa history nwere ọgụgụ isi maka session ndị toro ogologo:

- **Ịka Nká nke Message** — a na-eme ka message ndị ochie na-adịwanye mkpụmkpụ nwayọọ nwayọọ
- **Compression nke Tool Result** — a na-ebipụ ma ọ bụ na-ewepụ akụkụ output tool ndị toro ogologo (ahịrị mbụ/ikpeazụ,
  nzacha ahịrị dabara adaba, ime ka JSON key dị mkpụmkpụ)
- **Ihe Nchekwa Structural Integrity** — na-eme ka ụzọ abụọ `tool_use` + `tool_result` nọgide kwekọọ
- **Ịma Oke Context Window** — na-asọpụrụ oke token nke model ọ bụla

**Kachasị mma maka:** Session debugging ogologo oge, codebase buru ibu.

### Ultra Mode (~75% nchekwa)

Compression kachasị elu maka ọnọdụ ebe token dị oke mkpa:

- **Heuristic Pruning** — pruning token nke prose dabere na score
- **Nchekwa Structure** — a na-akara fenced code block, inline code, URL na identifier
  dị ka tombstone ma jikọta ha ọzọ kpọmkwem otu ha dị; a naghị eme ha pruning
- **SLM tier Nhọrọ** — obere local model nwere ike imezi pruning ahụ mgbe a haziri ya
- Ọ nọọrọ onwe ya pụọ na Aggressive mode: ọ naghị arụ message aging, compression nke tool-result
  ma ọ bụ fallback summarizer (naanị ọdịda SLM-tier nwere ike iduga fallback pass site na
  aggressive)

**Kachasị mma maka:** Mgbe ị na-eru oke context ugboro ugboro.

### RTK Mode (oke upstream 60-90%)

A haziri RTK mode maka output tool toro ogologo nke na-apụta na session coding-agent:

- Na-achọpụta klaasị command/output dịka `git status`, `git diff`, `git log`, test runner,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/install, log Docker, output
  infra, na output shell izugbe
- Na-etinye ngwugwu JSON filter sitere na `open-sse/services/compression/engines/rtk/filters/`
- Na-ebubata filter RTK TOML schema v1 site na faịlụ `filters.toml` nke project ma ọ bụ nke zuru ụwa ọnụ, tinyere
  nkwado inline-test na trust-gating maka faịlụ project
- Na-abịa na filter arụnyere n'ime ya 55 nwere sample inline verify
- Na-ewepụ usoro njikwa ANSI, progress bar, ahịrị ndị e megharịrị, na mkpọtụ na-enweghị uru
- Na-echekwa ọdịda, error, warning, faịlụ gbanwere, nchịkọta, na njedebe nke output toro ogologo
- Na-akwado project filter nwere trust-gating, global filter, na mgbake raw-output e mere redaction nke bụ nhọrọ

**Kachasị mma maka:** Session agent nwere transcript shell, build, test, git, grep, na file-output.

### Stacked Mode (oke ndị tozuru etozu 78-95%)

Stacked mode na-agba ọtụtụ compression engine n'usoro a kara aka. Pipeline ndabara bụ:

```txt
RTK -> Caveman
```

Usoro ahụ na-ebu ụzọ mee ka output terminal/tool dị mkpụmkpụ, wee jiri Caveman mee semantic condensation na
prompt asụsụ mmadụ fọdụrụ. Enwere ike ịhazi stacked pipeline n'ụwa niile ma ọ bụ site na
compression combo e kenyere routing combo.

**Kachasị mma maka:** Context agwakọtara nwere nnukwu tool log tinyere ntuziaka mmadụ ma ọ bụ nchịkọta assistant.

---

## Mgbakọ Mbelata Upstream

OmniRoute na-edepụta mbelata sitere na mkpakọ site n’ebe abụọ: benchmark nke ọrụ upstream na
nhazi injin nke OmniRoute n’onwe ya.

| Isi mmalite | Ọnụọgụ dị na README upstream e ji mee ihe ebe a                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Caveman     | token mmepụta dị ole na ole site na `~75%`, nkezi mbelata mmepụta benchmark `65%`, oke `22-87%`, na ngwa mkpakọ ntinye `~46%` |
| RTK         | mbelata mmepụta iwu `60-90%`; nnọkọ atụ `~118,000 -> ~23,900` token, ma ọ bụ `79.7%` echekwara (`~80%`)                       |

Maka payload ngwa/ọnọdụ ndị na-adakọrịta, ngwakọta ndabara OmniRoute na-etinye injin ndị a n’usoro:

```txt
RTK -> Caveman
```

A na-amụba mbelata ndị ahụ ọnụ, anaghị agbakwunye ha ọnụ:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ọnụọgụ `78-95%` ahụ na-emetụta ọnọdụ ebe ma RTK ma Caveman nwere ike ibelata otu payload ntinye/ọnọdụ ahụ.
Ụdị mmepụta nzaghachi Caveman dị iche: mgbe enyere ya aka, jiri mbelata mmepụta nke Caveman n’onwe ya (`65%`
nkezi, `~75%` isi ọnụọgụ, oke `22-87%`). Mbelata ụgwọ mkpokọta dabere na ngwakọta prompt/mmepụta gị.

### Ihe "tozuru oke" pụtara n’ezie

Oke isi ọnụọgụ 15-95% bụ eziokwu, mana ọ na-emetụta naanị ọdịnaya **na-emegharị onwe ya ma ọ bụ nwere ọtụtụ okwu** — ahịrị
njehie ndị a na-emegharị, log build nke na-ezipụ otu ịdọ aka ná ntị ugboro ugboro, dump `grep`/ọgụgụ-faịlụ buru oke ibu. Ọ
**pụtaghị** na arịrịọ ọ bụla ga-echekwa ego ruru otu ahụ.

E gosipụtara nke a site na nnwale (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): otu
ọsọ `stacked` (RTK + Caveman) megide ngọngọ `tool_result` yiri nhazi Anthropic nke nwere ahịrị njehie 300 yiri onwe ha
mepụtara **mbelata token 95.93% / mbelata mkpụrụedemede 96.26%** — kpọmkwem n’ime oke e kwusara.
Mana mgbe otu pipeline ahụ na-arụ ọrụ na mmepụta ngwa nkịtị nke na-adịghị emegharị onwe ya (ndepụta nsonaazụ `grep` dị ọcha,
ọgụgụ faịlụ dị mkpụmkpụ, ederede mkparịta ụka nkịtị), ọ na-emepụta **mbelata dị nso na efu** dịka o kwesịrị, n’ihi na
ọ dịghị ihe na-emegharị onwe ya a ga-ewepụ, `validateCompression()` (`validation.ts`) anaghịkwa ekwe ka e ziga
ederede edegharịrị nke ga-ewepụ ma ọ bụ gbanwee ngọngọ koodu, URL, isiokwu, ụdị, ma ọ bụ njirimara constant ndị e dere kpamkpam na mkpụrụedemede ukwu.

Nke a bụ omume a tụrụ anya ya ma dị nchebe, ọ bụghị bug: nnọkọ ide koodu nke na-agụkarị/na-eji grep nyochaa faịlụ dị ọcha ga-
ahụ mbelata mkpokọta pere mpe ọbụna mgbe enyere mkpakọ aka n’uju, ebe nnọkọ zutere loop dara ada
ma ọ bụ linter na-ekwu ọtụtụ ihe ga-ahụ oke 78-95% zuru ezu na traffic ahụ. Ejila pasent mbelata mkpokọta dị ala nke otu nnọkọ
dị ka ihe akaebe na ahazighị mkpakọ nke ọma — buru ụzọ lelee ma mmepụta ngwa dị n’okpuru ya ọ na-emegharị onwe ya n’ezie.

---

## Ngosipụta Anya nke Mbelata Token

```
Na-enweghị mkpakọ: 47K token ezigara LLM
Na Lite:           40K token ezigara          (echekwara 15% — dị nchebe, na-arụ ọrụ mgbe niile)
Na Standard:       33K token ezigara          (echekwara 30% — iwu caveman-speak)
Na Aggressive:     24K token ezigara          (echekwara 50% — imeka nká + nchịkọta)
Na Ultra:          12K token ezigara          (echekwara 75% — mkpochapụ heuristic)
Na RTK:            19K-5K token ezigara       (echekwara 60-90% na mmepụta iwu/ngwa)
Na Stacked:        10K-2.5K token ezigara     (oke RTK+Caveman tozuru oke 78-95%)
```

---

## Nhazi

### Dashboard

Gaa na `Dashboard → Context & Cache`:

- **Caveman** — nhọrọ ọnọdụ, ngwugwu asụsụ, nlele tupu oge eruo, na ndabara zuru ụwa ọnụ
- **RTK** — nlele tupu oge eruo nke nzacha iwu, ntọala nchekwa RTK, na katalọgụ nzacha
- **Compression Combos** — usoro injin ndị nwere aha e kenyere ngwakọta ntụgharị
- **Auto-Trigger Threshold** — na-amalite mkpakọ na-akpaghị aka mgbe ọnụọgụ token gafere oke

### Mgbanwe Pụrụ Iche Maka Ngwakọta Ọ Bụla

Na `Dashboard → Context & Cache → Compression Combos`, kenye ngwakọta mkpakọ n'otu ngwakọta ntụgharị:

```txt
Ngwakọta: "free-tier-fallback"
  Ngwakọta Mkpakọ: "coding-agent-stack"
  Usoro: RTK -> Caveman
  Ebe Ezubere:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nke a na-enye gị ohere iji mkpakọ ndị a kwakọtara ọnụ na ndị na-eweta ọrụ efu/koodu, ma na-edobe ọnọdụ dị mfe na ndebanye aha ndị a na-akwụ ụgwọ.

Nkenye "Mgbanwe Pụrụ Iche Maka Ngwakọta Ọ Bụla" a bụ njikwa dị iche na mgbanwe **ọnọdụ mkpakọ nke ngwakọta ntụgharị** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schema nke oghere ahụ na-anabatakwa `rtk`, `stacked` na `omniglyph`) — mgbanwe ahụ anaghị ahọrọ usoro ngwakọta mkpakọ nwere aha; naanị ihe ọ na-eme bụ ịtọ oghere `compressionMode` nke `resolveCompressionPlan` na-enyocha. Enwere ike ịtọ ya ma na kaadị ngwakọta (`Dashboard → Combos`) ma ọ bụ, kemgbe #6760, maka ngwakọta ntụgharị ọ bụla na ndepụta "Assign to routing" dị na `Dashboard → Context & Cache → Compression Combos`, kpọmkwem n'akụkụ igbe nlele nkenye usoro akọwara n'elu. Ebe abụọ ahụ na-echekwa site n'otu endpoint `PUT /api/combos/{id}` ahụ.

### Mgbanwe pụrụ iche maka arịrịọ ọ bụla

Zipụ isi arịrịọ `x-omniroute-compression` iji gbanwee atụmatụ mkpakọ maka otu arịrịọ. Ọ nwere mkpa kachasị elu — ọ na-emeri mgbanwe ngwakọta ntụgharị, profaịlụ na-arụ ọrụ, mmalite akpaka, na Default nke panel. A na-eleghara ụkpụrụ ndị a na-amaghị anya anya (anaghị ajụ arịrịọ ahụ ma ọlị), ma mgba ọkụ ukwu zuru ụwa ọnụ ka na-achị ihe niile: mgbe agbanyụrụ mkpakọ n'ụwa niile, isi ahụ enweghị ike ịgbanye ya. Ụkpụrụ:

| Uru           | Mmetụta                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Enweghị mkpakọ maka arịrịọ a.                                                                                                |
| `default`     | Profaịlụ Default sitere na panel (na-eleghara profaịlụ na-arụ ọrụ anya). A na-ahapụ injin ndị na-efunahụ data ka ha gbanyụọ. |
| `safe`        | Otu ihe ahụ dị ka ịhapụ isi ahụ: naanị iwepụ oyiri na ijikọta oghere ọcha.                                                   |
| `allow-lossy` | Debe atụmatụ onye njikwa maka arịrịọ a, gụnyere nchịkọta, nzacha mkpa, na ndegharị ụdị.                                      |
| `engine:<id>` | Otu injin mgbe agbanyere ya, dịka `engine:rtk`. Nke a bụ nkwenye maka injin ahụ n'arịrịọ ọ bụla.                             |
| `<combo>`     | Ngwakọta nwere aha, nke a na-ebu ụzọ kwekọọ site n'aha (na-enweghị iche nnukwu na obere mkpụrụedemede), emesịa site na id.   |

Na-enweghị `allow-lossy`, `engine:<id>`, ma ọ bụ ngwakọta nwere aha, anaghị etinye injin ndị na-efunahụ data n'ọrụ. Arịrịọ ahụ ka na-enweta iwepụ oyiri nke nnọkọ na ijikọta oghere ọcha mgbe mkpakọ dị ọkụ.

A na-eweghachi atụmatụ etinyere n'ọrụ n'isi nzaghachi `X-OmniRoute-Compression: <mode>; source=<source>`, ebe `<source>` bụ otu n'ime `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, ma ọ bụ `off`.

### API

```bash
# Nweta ntọala mkpakọ
curl http://localhost:20128/api/settings/compression

# Melite ntọala mkpakọ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Lee otu payload RTK/stacked akọwapụtara tupu oge eruo
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Depụta ngwugwu nzacha RTK
curl http://localhost:20128/api/context/rtk/filters

# Nwalee RTK ozugbo site na metadata iwu nhọrọ
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ihe A Na-echekwa

Injin mkpakọ **na-echekwa ihe ndị a mgbe niile:**

- ✅ Blọk koodu (nke e ji fences mechie na nke dị n'ahịrị)
- ✅ URL na ụzọ faịlụ
- ✅ Ọdịdị JSON na data ahaziri ahazi
- ✅ Ihe njirimara na token teknụzụ echedoro
- ✅ Nkwupụta mgbakọ na mwepụ
- ✅ Nkọwa oku ngwá ọrụ/ọrụ
- ✅ Ntuziaka sistemụ (na mode lite)

Mweghachi raw-output RTK na-ekpuchi igodo API ndị a na-ahụkarị, bearer token, token Slack, igodo nnweta AWS,
okwuntughe, token, na ihe nzuzo tupu e debe ihe ọ bụla.

---

## Ọnụọgụ Mkpakọ

Arịrịọ ọ bụla a pakọtara na-agụnye ọnụọgụ na ndekọ sava:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Atụmatụ Usoro Oge

| Usoro    | Mode                                                                                                                                            | Ọnọdụ        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Usoro 1  | Off, Lite                                                                                                                                       | ✅ Ewepụtala |
| Usoro 2  | Standard, Aggressive, Ultra                                                                                                                     | ✅ Ewepụtala |
| Usoro 3  | RTK, Stacked, Compression Combos                                                                                                                | ✅ Ewepụtala |
| Usoro 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                     | ✅ Ewepụtala |
| Usoro 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` na `PUT /api/settings/compression`) + njikwa mode/policy nke dashboard | ✅ Ewepụtala |

---

## Ekele

Iwu mkpakọ mode Standard sitere n'ike mmụọ nsọ nke **[Caveman](https://github.com/JuliusBrussee/caveman)** nke **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) mere — ọrụ ama ama "gịnị mere a ga-eji ọtụtụ token mgbe token ole na ole nwere ike ịrụ ọrụ ahụ". Caveman na-akọ token mmepụta dị ole na ole site na `~75%`, nkezi nchekwa mmepụta benchmark nke `65%`, oke mmepụta nke `22-87%`, na ngwá ọrụ mkpakọ ntinye nke `~46%`.

Mode RTK sitere n'ike mmụọ nsọ nke **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** nke **[RTK AI](https://github.com/rtk-ai)** mere — ọrụ mkpakọ mmepụta iwu na-arụ ọrụ nke ọma maka terminal, build, test, git, na nzacha mmepụta ngwá ọrụ. RTK na-akọ nchekwa nke `60-90%`, ebe nnọkọ nlele dị na README ya na-egosi na echekwara `~80%`.

---

## Sistemụ Mkpakọ Dị Elu

E wezụga mode 7 akọwara n'elu (isi mmalite ahụ na-anabatakwa mode `codex-responses` na
`omniglyph`, nke ntuziaka a na-adịghị ekpuchi), ngalaba ndị dị n'okpuru na-akọwa atụmatụ
ndị na-arụ ọrụ n'ime ma ọ bụ n'akụkụ mode ndị ahụ: Tool Result Compression na Progressive Aging
bụ nzọụkwụ 1 na 2 nke injin aggressive (mode Aggressive na nzọụkwụ `aggressive` nke
stacked pipeline), Stacked Pipeline bụ otu mode Stacked si arụ ọrụ, Cache-Aware Compression
na-ewedata `aggressive` na `ultra` gaa na `standard` maka ndị na-eweta ọrụ caching mgbe mkpakọ
dị, ebe Caveman Output Mode na Output Styles bụ ntuziaka system-prompt a na-ahọrọ iji,
nke anaghị arụ ọrụ na ndabara, ndị na-akpụzi mmepụta model kama ịpakọ arịrịọ ahụ.

### Mkpakọ Na-aghọta Cache

Ụfọdụ ndị na-eweta ọrụ (dịka Anthropic nwere prompt caching) na-akwado **prompt caching**,
nke na-enye ha ohere idebe akụkụ nke prompt na cache iji belata ọnụ ahịa na oge nchere. Mgbe
enyere caching aka, mkpakọ aggressive nwere ike **imebi** arụmọrụ n'ezie
n'ihi na ọ na-agbanwe token ndị e debere na cache, na-eme ka cache ghara ịdị irè.

Modul `cachingAware.ts` na-edozi nke a site na **ịchọpụta ọnọdụ caching** na
**ịhazigharị atụmatụ mkpakọ** dịka o kwesịrị.

#### Otu o si arụ ọrụ

1. **Chọpụta ọnọdụ caching** — Na-enyocha body arịrịọ maka akara `cache_control`
2. **Chọpụta ndị na-eweta ọrụ caching** — Na-elele ma onye na-eweta ọrụ ezubere iche ọ na-akwado caching
3. **Hazigharịa atụmatụ** — Na-ewedata `aggressive`/`ultra` gaa na `standard` maka ndị na-eweta ọrụ caching
4. **Mafee system prompt** — A na-edebekarị system prompt na cache, ya mere epakọla ha

Ihe enyemaka atụmatụ ahụ na-eweghachikwa flag `deterministicOnly`, mana onye na-ewu atụmatụ ahụ na-eji
naanị atụmatụ ahụ — ọ dịghị ihe nọ n'usoro na-esote na-agụ flag ahụ ugbu a.

#### Ihe atụ koodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Akara cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mgbe a ga-eji ya

Mkpakọ na-aghọta cache **na-arụ ọrụ mgbe niile** — nhazi adịghị mkpa. Ọ na-amalite mgbe ọ bụla
mkpakọ dị ma onye na-eweta ọrụ ezubere iche na-akwado prompt caching (Anthropic, OpenAI,
wdg.); akara `cache_control` doro anya adịghị mkpa — naanị onye na-eweta ọrụ caching
na-akpalite iwedata ahụ, ebe naanị akara anaghị eme ya (nchọpụta akara na-enye telemetry cache
data, ọ bụghị mkpebi atụmatụ).

### Ịka Nka Nwayọọ Nwayọọ

Mkparịta ụka ogologo na-achịkọta ọtụtụ ntụgharị ozi, mana ntụgharị ndị ochie na-ebelata
mkpa. Modul `progressiveAging.ts` **na-ewedata ogo ozi dịka anya ntụgharị ha si dị**
(a na-atụ anya ahụ site na njedebe mkparịta ụka). Site na ndabara ndị e wepụtara
(`verbatim: 2, light: 2, moderate: 3`):

- **Ntugharị 2 ikpeazụ (oghere ≤ 2)**: Edebere ha otu ha dị
- **Oghere 3**: Mkpakọ ụdị onye-ọgba (iwepụ okwu mmeju)
- **Oghere 4+**: A na-achịkọta ozi onye enyemaka; a na-ebelata ozi onye ọrụ ka ọ bụrụ naanị ahịrị mbụ ha,
  ruo mkpụrụedemede 120 kacha elu; a naghị emetụ ọrụ ndị ọzọ aka. A na-edobe ntụziaka sistemụ, ozi ndị
  emelarị agadi, na ozi onye ọrụ kachasị ọhụrụ otu ha dị mgbe niile, n'agbanyeghị oghere ha.
  A naghị atụfu ihe ọ bụla kpamkpam, ma a pụghị iru band `light`
  site na ntọala ndabara ndị e tinyere (`light` hà nhata `verbatim`).

#### Ọmụmaatụ koodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... Ntugharị 50 ọzọ ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // ntugharị 3 ikpeazụ: otu ha dị
  light: 8, // oghere <= 8: mkpakọ dị mfe
  moderate: 20, // oghere <= 20: mkpakọ ụdị onye-ọgba
  fullSummary: 5, // ụdị ahụ chọrọ ya, mana koodu banding anaghị agụ ya
  // oghere > 20: achịkọtara (onye enyemaka) / edobere ahịrị mbụ (onye ọrụ)
});

// saved = ọnụọgụ token echekwara
```

#### Mgbe a ga-eji ya

A na-agbanye ime ka ozi ochie kara aka nwayọọ nwayọọ **mgbe niile** maka ọnọdụ `aggressive` — ọ bụ nzọụkwụ 2 nke
`compressAggressive()`. Ọnọdụ Ultra anaghị eme ya. Ọ na-arụ ọrụ nke ọma karịsịa maka:

- Oge ide koodu na-aga ogologo oge
- Mkparịta ụka na-ewe ọtụtụ ụbọchị
- Usoro ọrụ agent nwere ọtụtụ ọkpụkpọ ngwaọrụ

### Ọnọdụ Mmepụta Ụdị Onye-Ọgba

Ọnọdụ mmepụta ụdị onye-ọgba na-agbakwunye **ntụziaka system prompt** nke na-arịọ model ahụ n'onwe ya ka o nye
mmepụta dị nkenke — ọkwa `lite` na-arịọ azịza dị nkenke nke na-edobe ahịrịokwu zuru ezu, `full`
na-arịọ ya ka ọ "zaghachi nkenke dịka onye-ọgba maara ihe", ma `ultra` na-arịọ mmepụta ụdị telegram;
ntụziaka na-arịọ naanị, ha enweghị ike ikwe nkwa ya. Arịrịọ na-enweta ha site na
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` na-ebu ụzọ jiri shim ndakọrịta ochie
(`resolveOutputStyleSelection()` dị na
`open-sse/services/compression/outputStyles/backCompat.ts`) dozie nhọrọ ahụ, nke, mgbe `outputStyles`
tọgbọ chakoo, na-atụgharị `cavemanOutputMode` agbanyere gaa na ụdị mmepụta `terse-prose` n'ọkwa
`cavemanOutputMode.intensity` (lee Ndakọrịta ochie n'okpuru); a na-eji nhọrọ `outputStyles`
na-adịghị tọgbọ chakoo otu ọ dị, mgbe ahụ `cavemanOutputMode.enabled` na `intensity` anaghịzi
emetụta ihe ọ bụla, ebe toggle `autoClarity` ya ka na-arụ ọrụ. `outputMode.ts` nwere ederede
ntụziaka (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ngafe ọdịnaya, na enyemaka nhazi ọnọdụ nke ntinye ahụ
na-eji; injector `applyCavemanOutputMode()` nke ya enweghị onye na-akpọ ya na production.

#### Otu o si arụ ọrụ

Ọnọdụ a anaghị akpakọ input. Ọ na-agbakwunye ngọngọ ntụziaka na system prompt
(lee Otu ntinye si arụ ọrụ n'okpuru), ma ọnọdụ mkpakọ input ọ bụla ahọpụtara maka arịrịọ ahụ
ka na-arụ ọrụ emesịa, n'ahụ ozi nke nwere ngọngọ ahụ ugbu a. Tupu nkebi oke
nke ọkwa ọ bụla ji mechie, ọkwa Bekee `full` na-ekwu:

> "Zaghachi nkenke dịka onye-ọgba maara ihe. Wepụ articles (a/an/the), okwu mmeju (just/really/basically/actually/simply), ekele nkwanye ùgwù, na okwu na-egosi enweghị nkwenye. Iberibe ahịrịokwu dị mma. Jiri otuokwu dị mkpụmkpụ (big kama extensive, fix kama implement). Debe isi ihe teknụzụ niile, koodu, njehie, URL, na identifier kpọmkwem."

Nke a na-arụ ọrụ nke ọma karịsịa maka:

- Mmepụta koodu (mmepụta ka nkenke = token ole na ole)
- Ajụjụ na azịza ngwa ngwa (enweghị mkpa nkọwa sara mbara)
- Nhazi ọtụtụ ihe n'otu oge (mee ka throughput kacha elu)

#### Mgbe a ga-eji ya

Ọnọdụ mmepụta ụdị onye-ọgba bụ **ihe a na-ahọrọ ịgbanye**. Mgbe mkpakọ dị (`enabled: true`, toggle isi
dị na ibe Compression Settings), gbanye ya site na `cavemanOutputMode.enabled`; `intensity`
na-ahọrọ `lite`, `full` ma ọ bụ `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Toggle **Output Mode** nke ngwakọta mkpakọ (`outputMode`, ebe ọkwa dị na `outputModeIntensity`)
na-edobe otu switch ahụ maka arịrịọ ngwakọta ahụ metụtara, ngwaọrụ MCP
`omniroute_set_compression_engine` na-edekwa ya site na argument boolean `outputMode`
ya. Nhọrọ `outputStyles` na-adịghị tọgbọ chakoo na-ebute ụzọ karịa switch a. Na
dashboard, ịgbanye ụdị mmepụta **Terse prose** na-etinye otu ngọngọ ahụ (lee Output
Styles n'okpuru).

### Ụdị Mmepụta (katalọgụ)

Ọnọdụ mmepụta ụdị onye-ọgba dị n'elu bụ **ụzọ ochie nwere naanị otu style**. Phase 4 mere ka ọ
ghọọ katalọgụ nke ụdị mmepụta enwere ike ijikọta: `OUTPUT_STYLE_CATALOG` dị na
`open-sse/services/compression/outputStyles/catalog.ts`. Style ọ bụla bụ ntụziaka system-prompt
nke na-arịọ model ahụ n'onwe ya ka o nye mmepụta dị ọnụ ala karịa; enwere ike ịgbanye ọtụtụ style
ọnụ, a na-etinyekwa ha n'usoro katalọgụ.

| Ụdị                                              | `id`          | Ihe ọ na-eme                                                                                                                                                                                                                         | Asụsụ ntuziaka                                |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Nkọwa dị nkenke                                  | `terse-prose` | Wepụ okwu mmeju/edemede/nkwupụta na-enweghị nkwenye; debe isi teknụzụ ka ọ bụrụ kpọmkwem. Otu ederede ahụ dị ka ọnọdụ mmepụta caveman ochie (e zoro aka na ya, edeghị ya ọzọ).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Koodu pere mpe                                   | `less-code`   | Usoro YAGNI: mgbanwe kacha nta na-arụ ọrụ, enweghị abstractions a na-arịọghị.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (onye nrụpụta sọftụwia ukwu dị umengwụ) | `ponytail`    | "Koodu kacha mma bụ koodu a na-edeghị": iji ihe dị adị ọzọ > idegharị, isi ihe kpatara nsogbu > mgbaàmà, diff kacha mkpụmkpụ na-arụ ọrụ.                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Enwere m ADHD (omume mbụ)                        | `i-have-adhd` | Omume mbụ (iwu/ụzọ/snippet tupu nkọwa), usoro nwere nọmba ma nwee oke, OTU nzọụkwụ doro anya na-esote, enweghị okwu mmeghe/nchịkọta/okwu mmechi. E si na [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) hazie ya. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK dị nkenke (文言)                             | `terse-cjk`   | Azịza `full`/`ultra` n'Asụsụ Chaịna Oge Ochie (文言); `lite` na-arịọ naanị azịza dị mkpirikpi na-enweghị okwu ọrụ, ekele ma ọ bụ ịchọ mma.                                                                                           | zh (locale na-achịkwa, lee n'okpuru)          |

Ụdị ọ bụla nwere ọkwa ike atọ — `lite`, `full`, `ultra` — ma ọkwa ọ bụla
na-ejedebe na nkebi oke a na-ekekọrịta (`SHARED_BOUNDARIES` n'ime `outputMode.ts`), nke
na-edobe ngọngọ koodu, ụzọ faịlụ, iwu, njehie na URL ka ha bụrụ kpọmkwem. Ederede ọkwa
`terse-prose` na `terse-cjk` na-agbakwụnyekwa identifiers na ndepụta ahụ.

A na-amachi `terse-cjk` na locale `zh` n'ebe abụọ. Peeji Compression Settings na-egosi
ahịrị ya naanị mgbe asụsụ UI dashboard bụ Chaịna (`zh-CN` ma ọ bụ `zh-TW`), ma
`applyOutputStyles()` na-etinye ya naanị mgbe asụsụ e kpebiri maka arịrịọ ahụ (lee Nhọrọ
asụsụ n'okpuru) bụ `zh`. Izo ahịrị ahụ anaghị ehichapụ nhọrọ `terse-cjk` echekwara:
API ntọala na-anabata id ụdị ọ bụla, ma ichekwa ụdị ndị ọzọ na peeji ahụ na-ahapụ ya. Mgbe
arịrịọ na-eme, nyocha asụsụ nke `applyOutputStyles()` bụ naanị mgbochi locale.

#### Otu ntinye si arụ ọrụ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) na-enyocha
nhọrọ ahụ megide katalọgụ (a na-ewepụ id ndị a na-amaghị na ụdị ndị locale ha adabaghị,
ọ bụghị njehie ma ọlị; nhọrọ nke na-enweghị ụdị ọ bụla mgbe e kpebisiri ya na-ahapụ body
agbanweghị, a gafere ya dịka `no_styles`), na-ejikọta ntuziaka ahọpụtara dịka usoro
katalọgụ si dị,
na-agbakwụnye nkebi oke ahụ **otu ugboro** (tinyere nkebi nchekwa, `SAFETY_BOUNDARIES` ma ọ bụ
ntụgharị ya, mgbe ahọpụtara `less-code` ma ọ bụ `ponytail`), ma jiri otu akara idempotency
(`[OmniRoute Output Styles]`) malite ngọngọ ahụ, ya mere itinye ya ọzọ anaghị eme ihe ọ bụla. Mgbe
asụsụ e kpebiri (lee Nhọrọ asụsụ n'okpuru) nwere ntụgharị, a na-etinye ntuziaka nke asụsụ
mpaghara ahụ kama nke Bekee.

N'elu body nwere array `messages` na-adịghị efu, nyocha idempotency na-eme tupu
ngafe ọdịnaya: mgbe akara `[OmniRoute Output Styles]` adịlarị n'ọkwa elu
`system` field (string ma ọ bụ content-block array) ma ọ bụ n'ime ozi system nwere
ọdịnaya string, a na-ahapụ body agbanweghị dịka `already_applied`, a naghịkwa eme nyocha keyword.
Ma ọ bụghị ya, ngafe ọdịnaya (`shouldBypassCavemanOutputMode()` n'ime
`open-sse/services/compression/outputMode.ts`) na-enyocha ederede ozi atọ ikpeazụ,
n'agbanyeghị role ha, ma na-awụfe ụdị ndị ahụ maka turn ahụ dum mgbe ederede ahụ
dabara na keyword nchekwa, omume a na-apụghị ịlaghachi azụ, ma ọ bụ arịrịọ nkọwa ya, ma ọ bụ
usoro usoro ya dị mkpa: `first`, `then`, `after that`, `before`, `rollback` ma ọ bụ
`backup` nke `delete`, `drop`, `migrate`, `deploy` ma ọ bụ `release` na-esochi n'ime
mkpụrụedemede 240. Ngafe ahụ na-arụ ọrụ mgbe mgba ọkụ **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, nke dị na ndabara) dị ọkụ; imenyụ mgba ọkụ ahụ na-awụfe
nnyocha keyword.

Mgbe ngafe ahụ kwere ka turn ahụ gafee, `placeSystemInstruction()` (otu faịlụ ahụ), nke
na-adịghị emepụta `messages[0]` ọhụrụ ma ọlị, na-etinye ngọngọ ahụ n'ebe mbụ ọ hụrụ n'ime ndị a:

1. Ozi system dị n'isi nke nwere ọdịnaya string: a na-agbakwụnye ngọngọ ahụ mgbe ederede ya gasịrị.
2. `system` field dị n'ọkwa elu: a na-agbakwụnye ngọngọ ahụ mgbe ederede string gasịrị, ma ọ bụ
   tinye ya dịka ngọngọ ederede ọhụrụ n'ime content-block array.
3. Ozi system mbụ na-esote nke nwere ọdịnaya string: a na-agbakwụnye ngọngọ ahụ mgbe
   ederede ya gasịrị.
4. Ọ dịghị nke dị n'elu: ngọngọ ahụ na-abanye n'ime ozi system ọhụrụ na njedebe `messages`.

N'elu body na-enweghị array `messages` (ma ọ bụ nke nwere nke efu), enweghị ngafe ọdịnaya na-eme,
a naghịkwa ele `system` field dị n'ọkwa elu anya. A na-agbakwụnye ngọngọ ahụ mgbe ederede
string `instructions` field gasịrị, belụsọ ma field ahụ enwelarị akara
`[OmniRoute Output Styles]`; n'ọnọdụ ahụ, a na-ahapụ body agbanweghị dịka
`already_applied`. Mgbe body enweghị string `instructions` field mana o nwere `input`
(string ma ọ bụ array), ngọngọ ahụ na-aghọ `instructions`, na-anọchi uru ọ bụla na-abụghị string
field ahụ nwere. A na-ahapụ body na-enweghị string `instructions` field ma ọ bụ `input` nke bụ
string ma ọ bụ array agbanweghị, a na-awụfekwa ya dịka `no_messages`.

#### Otu esi eme ka ọ rụọ ọrụ

Na dashboard: **Ọnọdụ Mkpakọ → Ntọala Mkpakọ**
(`/dashboard/context/settings`), na ngalaba Ụdị mmepụta: e nwere otu ahịrị maka ụdị ọ bụla, nke nwere mgba ọkụ ịgbanye/ịgbanyụ na ihe nhọpụta ọkwa. A na-etinye ụdị ndị ahụ mgbe mkpakọ n’onwe ya gbanyere (mgba ọkụ ukwu nke ibe ahụ, `enabled`). Mgba ọkụ **Auto-Clarity Bypass** dị na ibe **Caveman**
(`/dashboard/context/caveman`), n’ime kaadị **Ụdị Mmepụta** ya. N’usoro mmemme, nhazi mkpakọ na-echekwa nhọrọ ahụ dị ka:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Ndakọrịta azụ: mgbe `outputStyles` tọgbọ chakoo, ntọala ochie `cavemanOutputMode.enabled`
na-adaba na `terse-prose` n’ogo `cavemanOutputMode.intensity`. Mgbe ahụ, blọk ahụ na-amalite
site na akara `[OmniRoute Output Styles]`, ebe injector ochie `applyCavemanOutputMode()`
na-etinye `[OmniRoute Caveman Output Mode]`. N’okpuru akara ahụ, ederede ahụ kwekọrọ na
ntinye ochie n’asụsụ en, pt-BR, es, de, fr, it, ru, id na vi; na ja na zh, o nwere otu
ohere mgbakwunye tupu nkebi gbasara oke. `terse-prose` nwere ntụgharị n’asụsụ pt-BR, es,
de, fr, it, ru, zh, ja, id na vi, ya mere arịrịọ nke asụsụ e kpebiri bụ `hu` na-enweta
ederede Bekee ebe injector ochie jiri nke Hungarian ya.

Nhọpụta asụsụ ụdị mmepụta (`resolveOutputStyleLanguage()` n’ime
`outputStyles/apply.ts`): mgbe `languageConfig.enabled` gbanyere, `autoDetect` na-ewere
ozi onye ọrụ kachasị ọhụrụ n’usoro `messages` nke arịrịọ ahụ nke nwere ederede (ọdịnaya
string, ma ọ bụ `text` nke akụkụ ọdịnaya ya), wee jiri ihe nchọpụta nke injin Caveman
(`detectCompressionLanguage()`) nyochaa ya. Ihe nchọpụta ahụ na-eweghachi `zh` maka
ederede nwere mkpụrụedemede Han ma enweghị kana; ma ọ bụghị ya, ọ na-eweghachi nke ọ bụla
n’ime `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` na `id` nke nwere ndakọrịta
ntụaka kachasị ukwuu, ma weghachite `en` mgbe ọ nweghị nke dakọtara — ederede ọ na-enweghị
ike ịkewa na-enweta Bekee, ọ bụghị `defaultLanguage` ma ọlị, a naghịkwa achọpụta `vi`
ọ bụ ezie na ụdị ndị ahụ nwere ederede `vi`. Ahụ arịrịọ Responses API na-edobe ntụgharị
okwu ya n’ime `input`, nke a naghị ewere dịka nlele, ya mere ọ na-enweta
`defaultLanguage`, emesịa Bekee. Mgbe ozi onye ọrụ ọ bụla n’ime `messages` enweghị
ederede, ma ọ bụ mgbe `autoDetect` gbanyụrụ, `defaultLanguage` na-emetụta, emesịa Bekee.
Mgbe `languageConfig.enabled` gbanyụrụ, asụsụ ahụ bụ Bekee — belụsọ ma ngwakọta mkpakọ
emetụta arịrịọ ahụ (ngwakọta e kenyere ngwakọta ntụgharị ụzọ nke arịrịọ ahụ, ma ọ bụ
ngwakọta mkpakọ ndabara nke chatCore na-alaghachi na ya maka pipeline stacked arụnyere
n’ime ya): itinye ngwakọta na-agbanye `languageConfig.enabled` maka arịrịọ ahụ ma debe
`defaultLanguage` site na ngwugwu asụsụ nke ngwakọta ahụ (uru echekwara ma ọ bụrụ na ọ
bụ otu n’ime ngwugwu ngwakọta ahụ; ma ọ bụghị ya, ngwugwu mbụ nke ngwakọta ahụ, nke
ndabara ya bụ `en`), ebe `autoDetect` echekwara (nke ndabara ya bụ ịgbanye) ka
na-emetụta. Injin ntinye Caveman na-ahọrọ asụsụ ngwugwu iwu ya n’ụzọ dị iche — n’otu
akụkụ ederede ọ bụla, ma mgbe nchọpụta akpaaka gbanyụrụ, dabere na `enabledPacks`.

A na-akpọgide matriks ụdị × asụsụ site na
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: ụdị katalọgụ ọ bụla ga-enwerịrị
ntinye n’ime `BASELINE_LANGUAGES` nke ule ahụ; ụdị a na-ejighị locale machibido ga-enwerịrị
ntụgharị pt-BR (a gụpụrụ `terse-cjk` nke locale machibidoro na iwu a), belụsọ ma edepụtara
ya n’ime `KNOWN_ENGLISH_ONLY`, nke nwere ike ịnwe naanị ụdị na-enweghị ntụgharị ọ bụla —
ụdị edepụtara nke nwere ntụgharị ọ bụla ga-ada ule ahụ; ụdị ga-adakwa ule ahụ mgbe ọ
tufuru asụsụ nke ntinye `BASELINE_LANGUAGES` ya depụtara. Iji tinye ụdị, lee
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Mkpakọ Nsonaazụ Ngwaọrụ

`compressToolResult()` n’ime `open-sse/services/compression/toolResultCompressor.ts`
na-eji **usoro 5** akpakọ ederede nsonaazụ ngwa ọrụ. Ọ na-anwale ha n’usoro a, usoro mbụ
gbanyere nke nyocha ya dabara na ọdịnaya ahụ ga-ekpebi nsonaazụ ya:

1. **`fileContent`**: ọdịnaya nwere ahịrị 3 ma ọ bụ karịa ebe opekata mpe otu ahịrị, ma e wepụ
   ndọbanye dị n'ihu, na-amalite na `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` ma ọ bụ `return ` (okwu isi ahụ tinyere oghere), ma ọ bụ na `if`,
   `for` ma ọ bụ `while` nke `(` ma ọ bụ ` (` na-esochi, na-edowe ahịrị 20 mbụ na ahịrị 5 ikpeazụ ya, ebe
   a na-etinye akara n'etiti e wepụrụ.
2. **`grepSearch`**: ọdịnaya nwere opekata mpe otu ahịrị n'ụdị `<path>:<digits>:`,
   ebe ederede dị tupu kọlụm mbụ na-enweghị oghere, na-edowe naanị ahịrị ndị ahụ, ruo
   na 30 kacha, nke ọnụ ọgụgụ ndakọrịta ndị ọzọ na ndepụta faịlụ ndị dakọtara na-esochi;
   a na-atụfu ahịrị ndị ọzọ niile. Otu ahịrị dị otú ahụ ezuola ịkpalite usoro a, ya mere
   ahịrị ndekọ na-amalite na akara oge dịka `12:30:45` na-agụnyekwa.
3. **`shellOutput`**: mmepụta nwere usoro ANSI CSI (`ESC[` nke ọnụọgụ ma ọ bụ
   semicolon na mkpụrụedemede na-esochi, dịka na koodu agba) ma ọ bụ `$` nke oghere
   na-esochi n'ebe ọ bụla n'ime ederede na-efunahụ usoro ndị ahụ (a na-edowe usoro mgbapụ ndị ọzọ, dịka `ESC[?25l` ma ọ bụ
   usoro aha-window OSC) ma na-edowe ahịrị 50 ikpeazụ ya, ebe a na-achịkọta
   ahịrị ndị na-emegharị n'usoro ka ha bụrụ otu. N'ihi na nyocha a na-eme tupu `json` na `errorMessage`,
   mmepụta JSON ma ọ bụ njehie nwere `$` dị otú ahụ anaghị erute ha mgbe
   `shellOutput` nọ n'ọrụ.
4. **`json`**: a na-achịkọta ibu JSON karịrị mkpụrụedemede 2,000 nke na-amalite na `{` ma ọ bụ `[` (mgbe
   oghere nhọrọ gasịrị) ma nwee ike ịtụgharị ya: array nwere ihe karịrị 7 na-edowe
   ihe 5 mbụ na ihe 2 ikpeazụ ya na ngụkọta ọnụ ọgụgụ ya, ebe object na-edowe key 20
   mbụ ya, a na-eji ihe njide `{…N keys}` dochie uru object ma ọ bụ array ọ bụla dị n'ime
   (maka array, N bụ ogologo ya) yana akara `_remaining_<N>_keys` nke na-agụta key ndị
   a tụfuru gafee 20 mbụ. A na-edegharị uru scalar n'ozuzu ya, ya mere object nwere key 20
   ma ọ bụ ihe na-erughị ya nke na-enweghị uru dị n'ime ka a na-edobanyegharị naanị — nke e mere ka ọ dị mkpụmkpụ na-enweta mkpụrụedemede
   ma na-anọgide na-agbanweghị.
5. **`errorMessage`**: mmepụta nwere, n'ebe ọ bụla na n'ụdị mkpụrụedemede ukwu ma ọ bụ nta ọ bụla, `error:`,
   `error ` (okwu ahụ nke oghere na-esochi, dịka na `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` ma ọ bụ `traceback` na-edowe ahịrị mbụ ya,
   ahịrị 10 na-esote na ahịrị 3 ikpeazụ, ebe akara `… [N frames elided] …` na-anọchi
   ahịrị ndị dị n'etiti ha. Akara ahụ na-apụta naanị mgbe ihe karịrị ahịrị 13 soro ahịrị
   mbụ, ya mere anaghị eme ka mmepụta njehie nwere ahịrị 14 ma ọ bụ ihe na-erughị ya dị mkpụmkpụ (na ahịrị 12 ma ọ bụ 13,
   ahịrị 3 ikpeazụ na-emegharị ahịrị ndị e debelarị).

Mgbe otu usoro dakọtara, ọbụna nke na-echekwaghị ihe ọ bụla, anaghị
anwale usoro ndị na-esote. Mgbe usoro dakọtara echekwaghị token e mere atụmatụ (ogologo ÷ 4, gbakọọ ya elu) —
dịka ọmụmaatụ faịlụ yiri koodu nwere ahịrị 25 ma ọ bụ ihe na-erughị ya, ma ọ bụ array JSON karịrị mkpụrụedemede 2,000
nwere ihe 7 ma ọ bụ ihe na-erughị ya — injin aggressive na-edowe nsonaazụ tool
mbụ: ndị na-akpọ ya abụọ (`compressAggressive()` na `compressAnthropicToolResultBlock()`)
na-edowe nke mbụ mgbe `saved` bụ 0 ma ọ bụ ihe na-erughị ya, ebe `compressToolResult()` n'onwe ya ka
na-eweghachi mmepụta usoro ahụ. Nzọụkwụ nsonaazụ-tool abụghị mkpebi ikpeazụ:
onye nchịkọta ndabere nke injin ahụ ka nwere ike ime ka ozi `tool` ma ọ bụ `function` karịrị
mkpụrụedemede 8,192 (`maxTokensPerMessage`, 2,048, ugboro 4) dị mkpụmkpụ.

#### Mgbe a ga-eji ya

Mkpakọ nsonaazụ tool bụ nzọụkwụ 1 nke injin aggressive (`compressAggressive()` dị na
`open-sse/services/compression/aggressive.ts`), ya mere ọ na-arụ ọrụ na ọnọdụ Aggressive nakwa na
nzọụkwụ `aggressive` nke usoro pipeline a kwakọtara. Ọ na-amịkọ `tool` na `function`
ozi ndị yiri usoro OpenAI na ederede dị n'ime block `tool_result` nke Anthropic. Usoro ọ bụla nwere
switch nke ya n'okpuru `aggressive.toolStrategies`, a na-agbanye ha niile na ndabara. Na dashboard,
switch ndị ahụ dị na nlele **Advanced** nke ibe Caveman mgbe mkpakọ na-arụ ọrụ ma
ọnọdụ ndabara bụ Aggressive.

### Pipeline A Kwakọtara

Ọnọdụ stacked na-eme ka **ọtụtụ injin rụọ ọrụ n'usoro** — ọ na-abụkarị RTK na-amalite
(nchekwa 60-90% na mmepụta tool), mgbe ahụ Caveman na-arụ ọrụ na ederede fọdụrụ (~46% nchekwa
ntinye). Mgbe e jikọtara ha, nke ahụ bụ **oke 78-95% nke ruru eru** (lee Upstream Savings Math
n'elu): `1 - (1 - 0.60..0.90) × (1 - 0.46)` na-enye nkezi ≈89%.

#### Otu o si arụ ọrụ

```
Ntinye (1000 token)
  → RTK (nzacha maara command) → 200 token
    → Caveman (iwepụ ihe mmeju) → 108 token
  → Mmepụta (108 token, ~89% nchekwa)
```

#### Mgbe a ga-eji ya

Jiri ọnọdụ stacked maka:

- Usoro ọrụ ndị tool jupụtara na ha (agentic coding, nyocha)
- Nhazi batch ebe ọnụ ahịa dị mkpa
- Mgbe ịchọrọ nchekwa token kachasị elu

A na-ahazi pipeline stacked site na ntọala mkpakọ `stackedPipeline` zuru ụwa ọnụ,
ma ọ bụ site na combo mkpakọ nwere aha e kenyere combo routing (lee
Per-Combo Override n'elu) — ọ bụghị site na `modePack` nke auto-combo (field ahụ na-eme naanị
mgbanwe arọ nke nhọrọ model auto-combo, na `stacked` abụghị aha pack ziri ezi).

---

## Mgbanwe Ndị Na-emeri Ntọala Mkpakọ Maka Combo

Ị nwere ike ịgbanwe ọnọdụ mkpakọ zuru ụwa ọnụ **maka combo ọ bụla** iji hazie omume nke ọma
maka ojiji dị iche iche:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Nke a bara uru maka:

- **Combo ide koodu**: Jiri ọnọdụ `aggressive` maka oge ọrụ dị ogologo
- **Combo ajụjụ na azịza ngwa ngwa**: Jiri ọnọdụ `lite` maka nzaghachi ngwa ngwa
- **Combo ndị na-eji ọtụtụ ngwaọrụ**: Jiri ọnọdụ `stacked` iji nweta nchekwa kachasị
- **Combo mmepụta**: hapụ mgbanwe na-emeri ntọala ka ọ ghara ịrụ ọrụ maka ndị na-eweta caching — nhazi cache-aware nke na-arụ ọrụ mgbe niile na-agbadata `aggressive`/`ultra` gaa na `standard` na-akpaghị aka
  (enweghị ọnọdụ `cache-aware` a pụrụ ịhọrọ)

---

## Leekwa

- [Nhazi Environment](../reference/ENVIRONMENT.md) — Mgbanwe environment maka mkpakọ
- [Nduzi Architecture](../architecture/ARCHITECTURE.md) — Ọrụ ime pipeline mkpakọ
- [Nduzi Onye Ọrụ](../guides/USER_GUIDE.md) — Otu esi amalite iji mkpakọ
- [Mkpakọ RTK](./RTK_COMPRESSION.md) — Ihe nzacha RTK, usoro ntụkwasị obi, verify gate, na iweghachite raw-output
- [Injin Mkpakọ](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, na dashboard
- [Ụdị Iwu Mkpakọ](./COMPRESSION_RULES_FORMAT.md) — Ụdị ngwugwu iwu JSON
- [Ngwugwu Asụsụ Mkpakọ](./COMPRESSION_LANGUAGE_PACKS.md) — Iwu Caveman ndị ahaziri maka asụsụ dị iche iche
