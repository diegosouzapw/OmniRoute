# 🗜️ Prompt Compression Guide — OmniRoute (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Chekwaa 15-95% nke token ọnọdụ ederede tozuru etozu na-akpaghị aka. Maka nchịkọta ngwa ngwa, lee [ngalaba Mkpakọ dị na README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Nchịkọta

OmniRoute na-etinye pipeline mkpakọ prompt nwere modul nke na-arụ ọrụ **tupu oge eruo** tupu arịrịọ erute ndị na-eweta upstream. Nke a pụtara na nchekwa token gị na-eme n'ụzọ a na-adịghị ahụ anya — ọ dịghị mgbanwe achọrọ na usoro ọrụ gị.

```
Arịrịọ onye ahịa
  → Onye Nhọrọ Atụmatụ Mkpakọ
    → Enwere ntọala combo karịrị nke ọzọ? → Jiri ntọala combo
    → Eruola oke mkpalite akpaaka? → Jiri ọnọdụ akpaaka
    → Enwere ọnọdụ ndabara? → Jiri ntọala zuru ụwa ọnụ
    → Agbanyụrụ? → Mafee mkpakọ
  → Ọnọdụ Mkpakọ Ahọpụtara
    → Off: Enweghị mkpakọ
    → Lite: Nhichapụ oghere/usoro dị nchebe (~15%)
    → Standard: Mwepụ okwu mgbakwunye n'ụdị Caveman (~30%)
    → Aggressive: Ime ka akụkọ ochie + nchịkọta (~50%)
    → Ultra: Mwepụ dabere na heuristic + ibelata ngọngọ koodu (~75%)
    → RTK: Nzacha output terminal/ngwaọrụ nke maara iwu (oke upstream 60-90%)
    → Stacked: Pipeline ọtụtụ engine ahaziri n'usoro, na-abụkarị RTK tupu Caveman (oke tozuru etozu 78-95%)
  → Arịrịọ E Mkpakọrọ → Onye Na-eweta Ọrụ
```

---

## Ọnọdụ Mkpakọ

### Off

A naghị etinye mkpakọ ọ bụla. Ozi niile na-agafe na-enweghị mgbanwe.

### Ọnọdụ Lite (~15% nchekwa, latency <1ms)

Ọnọdụ kacha dị nchebe — enweghị mgbanwe n'ihe ọ pụtara, naanị nhichapụ usoro:

| Usoro                    | Nkọwa                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Jikọta ahịrị efu ndị na-esochi ibe ha na oghere dị na njedebe |
| `dedupSystemPrompt`      | Wepụ ozi sistemụ ndị e depụtaghachiri                         |
| `compressToolResults`    | Mkpakọ output ngwaọrụ/function ndị nwere ọtụtụ okwu           |
| `removeRedundantContent` | Wepụ ntụziaka ndị e kwughachiri                               |
| `replaceImageUrls`       | Belata URI data onyonyo base64                                |

**Kachasị mma maka:** Ojiji a na-agbanye mgbe niile na usoro ọrụ ebe nchekwa dị oke mkpa.

### Ọnọdụ Standard (~30% nchekwa)

Nke [Caveman](https://github.com/JuliusBrussee/caveman) kpaliri — ọ na-ewepụ okwu mgbakwunye na nkebiokwu nwere ọtụtụ okwu ma na-echekwa ihe ha pụtara:

- Na-ewepụ okwu mgbakwunye ("biko", "echere m", "n'ụzọ bụ isi", "n'eziokwu")
- Na-achịkọta nkebiokwu nwere ọtụtụ okwu ("iji nwee ike" → "iji", "n'ihi nke a" → "n'ihi na")
- Na-ewepụ okwu nkwanye ùgwù na-adịghị ekpebi ("Ọ ga-ewute gị...", "Ọ bụrụ na ị nwere ike...")
- Iwu regex karịrị 30 ahaziri maka prompt ide koodu

**Kachasị mma maka:** Usoro ọrụ ide koodu kwa ụbọchị na ndị otu na-elebara ọnụ ahịa anya.

### Ọnọdụ Aggressive (~50% nchekwa)

Njikwa akụkọ nwere ọgụgụ isi maka nnọkọ ogologo oge:

- **Ime ka Ozi Kaa Ochie** — a na-emewanye mkpakọ ozi ndị ka ochie nwayọọ nwayọọ
- **Nchịkọta Nsonaazụ Ngwaọrụ** — a na-eji nchịkọta dochie output ngwaọrụ ndị ogologo
- **Nchedo Iguzosi Ike nke Ọdịdị** — na-ahụ na ụzọ abụọ `tool_use` + `tool_result` nọgidere kwekọọ
- **Ịma Oke Windo Ọnọdụ Ederede** — na-erube isi n'oke token nke model ọ bụla

**Kachasị mma maka:** Nnọkọ debugging ndị toro ogologo na codebase buru ibu.

### Ọnọdụ Ultra (~75% nchekwa)

Mkpakọ kachasị elu maka ọnọdụ ebe token dị oke mkpa:

- **Mwepụ Heuristic** — na-ewepụ ozi ndị dị n'okpuru oke mkpa
- **Ibelata Ngọngọ Koodu** — na-emkpakọ ihe atụ koodu ndị na-emegharị ugboro ugboro
- **Mkpụbi site na Binary Search** — na-achọta ebe kacha mma a ga-ebipụ maka windo ọnọdụ ederede
- Agụnyere atụmatụ niile nke ọnọdụ Aggressive

**Kachasị mma maka:** Mgbe ị na-eru oke ọnọdụ ederede ugboro ugboro.

### Ọnọdụ RTK (oke upstream 60-90%)

A haziri ọnọdụ RTK maka output ngwaọrụ nwere ọtụtụ okwu nke na-apụta na nnọkọ coding-agent:

- Na-achọpụta ụdị iwu/output dịka `git status`, `git diff`, `git log`, ndị na-agba ule,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, npm audit/installs, ndekọ Docker, output
  akụrụngwa, na output shell izugbe
- Na-etinye ngwugwu nzacha JSON sitere na `open-sse/services/compression/engines/rtk/filters/`
- Na-ebubata nzacha schema v1 nke RTK TOML site na faịlụ `filters.toml` nke project ma ọ bụ nke zuru ụwa ọnụ, tinyere
  nkwado ule inline na njikwa ntụkwasị obi maka faịlụ project
- Ọ na-abịa na nzacha 49 arụnyere n'ime ya tinyere sample nkwenye inline
- Na-ewepụ usoro njikwa ANSI, ogwe ọganihu, ahịrị ndị e kwughachiri, na mkpọtụ a na-apụghị ime ihe na ya
- Na-echekwa ọdịda, mperi, ịdọ aka ná ntị, faịlụ ndị gbanwere, nchịkọta, na njedebe output ogologo
- Na-akwado nzacha project a na-achịkwa site na ntụkwasị obi, nzacha zuru ụwa ọnụ, na nhọrọ iweghachite raw-output e kpuchiri ozi nzuzo ya

**Kachasị mma maka:** Nnọkọ agent nwere transcript shell, build, ule, git, grep, na output faịlụ.

### Ọnọdụ Stacked (oke tozuru etozu 78-95%)

Ọnọdụ Stacked na-agba ọtụtụ engine mkpakọ n'usoro a kapịrị ọnụ. Pipeline ndabara bụ:

```txt
RTK -> Caveman
```

Usoro ahụ na-ebu ụzọ mee ka output terminal/ngwaọrụ dị nkenke, wee tinye nchịkọta semantic nke Caveman na
prompt asụsụ mmadụ fọdụrụ. Enwere ike ịhazi pipeline Stacked n'ụwa niile ma ọ bụ site na
combo mkpakọ e kenyere combo routing.

**Kachasị mma maka:** Ọnọdụ ederede agwakọtara nke nwere nnukwu ndekọ ngwaọrụ tinyere ntụziaka mmadụ ma ọ bụ nchịkọta assistant.

---

## Mgbakọ Ego Echekwara Site na Upstream

OmniRoute na-edekọ ego mkpakọ na-echekwa site na isi mmalite abụọ: benchmark nke ọrụ upstream na
nhazi injin nke OmniRoute n'onwe ya.

| Isi mmalite | Ọnụọgụ dị na README upstream e ji mee ihe ebe a                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Caveman     | token mmepụta dị `~75%` ole na ole, ego mmepụta e chekwara nkezi benchmark bụ `65%`, oke `22-87%`, na ngwa mkpakọ ntinye `~46%` |
| RTK         | ego `60-90%` e chekwara na mmepụta iwu; nnọkọ atụ `~118,000 -> ~23,900` token, ma ọ bụ `79.7%` e chekwara (`~80%`)              |

Maka payload ngwa/onodu ndị na-adakọrịta, ngwakọta ndabara OmniRoute na-edobe injin ndị a n'usoro:

```txt
RTK -> Caveman
```

A na-amụba ego ndị a echekwara ọnụ; anaghị atụkọta ha:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ọnụọgụ `78-95%` ahụ metụtara ọnọdụ ebe RTK na Caveman abụọ nwere ike ibelata otu payload ntinye/onodu ahụ.
Ụdị mmepụta nzaghachi Caveman dị iche: mgbe agbanyere ya, jiri ego mmepụta Caveman n'onwe ya na-echekwa (`65%`
nkezi, isi ọnụọgụ `~75%`, oke `22-87%`). Ego ịkwụ ụgwọ niile a na-echekwa dabere na ngwakọta prompt/mmepụta gị.

### Ihe "tozuru oke" pụtara n'ezie

Oke isi ọnụọgụ 15-95% bụ eziokwu, mana ọ metụtara naanị ọdịnaya **na-emegharị onwe ya ma ọ bụ nwere ọtụtụ okwu** — ahịrị
njehie ndị e megharịrị, ndekọ build nke na-ezipụ otu ịdọ aka ná ntị ugboro ugboro, ma ọ bụ nnukwu dump sitere na `grep`/ọgụgụ faịlụ. Ọ
**pụtaghị** na arịrịọ ọ bụla na-echekwa ego ruru otu ahụ.

E gosipụtara nke a site na nnwale (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): otu
ọrụ `stacked` (RTK + Caveman) megide ngọngọ `tool_result` n'ụdị Anthropic nke nwere ahịrị njehie 300 yiri ibe ha
rụpụtara **ego token echekwara 95.93% / ego mkpụrụedemede echekwara 96.26%** — dabara kpọmkwem n'ime oke ahụ
a kpọsara. Mana otu pipeline ahụ mgbe e ji ya rụọ ọrụ na mmepụta ngwa nkịtị nke na-adịghị emegharị onwe ya (ndepụta nsonaazụ `grep` dị ọcha,
ọgụgụ faịlụ dị mkpirikpi, ederede mkparịta ụka nkịtị) na-arụpụta **ego fọrọ nke nta ka ọ bụrụ efu**, n'ihi na
ọ nweghị ihe na-emegharị onwe ya a ga-ewepụ, `validateCompression()` (`validation.ts`) agaghịkwa ekwe ka e zipụ
ederede edegharịrị nke ga-ewepụ ma ọ bụ gbanwee ngọngọ koodu, URL, isiokwu, ụdị mbipụta, ma ọ bụ njirimara constant e ji mkpụrụedemede ukwu niile dee.

Nke a bụ omume a tụrụ anya ya nke dị nchebe, ọ bụghị bug: nnọkọ ide koodu nke na-agụkarị/na-eji grep enyocha faịlụ dị ọcha ga-
ahụ naanị obere ego a chekwara n'ozuzu ọbụlagodi mgbe agbanyere mkpakọ n'uju, ebe nnọkọ zutere loop na-ada ada
ma ọ bụ linter na-ekwu ọtụtụ ihe ga-ahụ oke 78-95% zuru ezu na traffic ahụ. Ejila pasentị dị ala nke ego mkpokọta
e chekwara n'otu nnọkọ dị ka ihe akaebe na ahazighị mkpakọ nke ọma — buru ụzọ lelee ma mmepụta ngwa
dị n'okpuru ya ọ̀ na-emegharị onwe ya n'ezie.

---

## Ngosipụta Ego Token Echekwara

```
Na-enweghị mkpakọ:   token 47K ezigara LLM
Site na Lite:         token 40K ezigara         (15% e chekwara — dị nchebe, na-arụ ọrụ mgbe niile)
Site na Standard:     token 33K ezigara         (30% e chekwara — iwu okwu Caveman)
Site na Aggressive:   token 24K ezigara         (50% e chekwara — ịka nká + nchịkọta)
Site na Ultra:        token 12K ezigara         (75% e chekwara — mkpochapụ dabere na heuristic)
Site na RTK:          token 19K-5K ezigara      (60-90% e chekwara na mmepụta iwu/ngwa)
Site na Stacked:      token 10K-2.5K ezigara    (oke RTK+Caveman tozuru oke nke 78-95%)
```

---

## Nhazi

### Dashbọọdụ

Gaa na `Dashboard → Context & Cache`:

- **Caveman** — nhọrọ ọnọdụ, ngwugwu asụsụ, nlele, na ndabara zuru ụwa ọnụ
- **RTK** — nlele nzacha iwu, ntọala nchekwa RTK, na katalọgụ nzacha
- **Nchikota Mkpakọ** — aha pipelines injin e kenyere combos ụzọ
- **Oke Nkwụsị Akpaaka** — na-etinye mkpakọ na-akpaghị aka mgbe ọnụọgụ akara gafere oke

### Nkwụsị Kwa-Combo

Na `Dashboard → Context & Cache → Compression Combos`, kenye combo mkpakọ na combo ụzọ:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nke a na-enye gị ohere iji mkpakọ agbakọtara na ndị na-enye ọrụ n'efu/coding mgbe ị na-edebe ọnọdụ lite na ndenye aha akwụ ụgwọ.

Nke a "Nkwụsị Kwa-Combo" bụ njikwa dị iche na **routing-combo compression mode** nkwụsị (Default/Off/Lite/Standard/Aggressive/Ultra) — nkwụsị ahụ anaghị ahọrọ pipeline mkpakọ akpọrọ aha; ọ na-edozi naanị mpaghara `compressionMode` nke `resolveCompressionPlan` na-agbakọ. Enwere ike ịtọ ya ma ọ bụ na kaadị combo (`Dashboard → Combos`) ma ọ bụ, kemgbe #6760, kwa combo ụzọ na ndepụta "Kenye na ụzọ" na `Dashboard → Context & Cache → Compression Combos`, n'akụkụ igbe nlele pipeline-assignment akọwara n'elu. Ebe abụọ ahụ na-aga n'ihu site na otu njedebe `PUT /api/combos/{id}`.

### Nkwụsị kwa-arịrịọ

Zipu isiokwu arịrịọ `x-omniroute-compression` iji kwụsị atụmatụ mkpakọ maka otu arịrịọ. O nwere ihe kachasị elu — ọ na-emeri nkwụsị routing-combo, profaịlụ na-arụ ọrụ, nkwụsị akpaaka, na Default panel. A na-eleghara ụkpụrụ amaghị ama anya (anaghị ajụ arịrịọ ahụ) na isi mgba ọkụ zuru ụwa ọnụ ka na-eche ihe niile: mgbe mkpakọ gbanyụrụ n'ụwa niile, isiokwu ahụ enweghị ike ịgbanwuo ya. Ụkpụrụ:

| Ụkpụrụ        | Mmetụta                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `off`         | Enweghị mkpakọ maka arịrịọ a.                                                                                 |
| `default`     | Profaịlụ Default sitere na panel (na-eleghara profaịlụ na-arụ ọrụ anya). A na-ahapụ injin ndị na-efunahụ ihe. |
| `safe`        | Otu ihe ahụ dị ka ịhapụ isiokwu ahụ: dedup na mpịakọta oghere ọcha naanị.                                     |
| `allow-lossy` | Debe atụmatụ onye ọrụ arịrịọ a, gụnyere nchịkọta, nzacha mkpa, na idegharị ụdị.                               |
| `engine:<id>` | Otu injin mgbe agbanyere ya, dịka ọmụmaatụ `engine:rtk`. Nke a bụ nhọrọ kwa-arịrịọ maka injin ahụ.            |
| `<combo>`     | Combo akpọrọ aha, dakọtara site na aha (na-enweghị nlebara anya ikpe) mbụ, mgbe ahụ site na id.               |

Na-enweghị `allow-lossy`, `engine:<id>`, ma ọ bụ combo akpọrọ aha, anaghị etinye injin ndị na-efunahụ ihe. Arịrịọ ahụ ka na-enweta dedup nnọkọ na mpịakọta oghere ọcha mgbe mkpakọ dị.

A na-ekwughachi atụmatụ etinyere na isiokwu nzaghachi `X-OmniRoute-Compression: <mode>; source=<source>`, ebe `<source>` bụ otu n'ime `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, ma ọ bụ `off`.

### API

```bash
# Nweta ntọala mkpakọ
curl http://localhost:20128/api/settings/compression

# Melite ntọala mkpakọ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Lelee ibu RTK/stacked akọwapụtara
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Depụta ngwugwu nzacha RTK
curl http://localhost:20128/api/context/rtk/filters

# Nwalee RTK ozugbo na metadata iwu nhọrọ
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ihe A Na-echebe

Injin mkpakọ **na-echekwa mgbe niile:**

- ✅ Blọk koodu (nke e ji ngere kpuchie na nke dị n'ahịrị)
- ✅ URL na ụzọ faịlụ
- ✅ Nhazi JSON na data ahaziri ahazi
- ✅ Ihe njirimara na token teknụzụ echekwara
- ✅ Okwu mgbakọ na mwepụ
- ✅ Nkọwa oku ngwá ọrụ/ọrụ
- ✅ Ntụziaka sistemụ (na ọnọdụ lite)

Mweghachi raw-output RTK na-ekpuchi igodo API ndị a na-ahụkarị, bearer token, Slack token, igodo nnweta AWS,
okwuntughe, token, na ihe nzuzo tupu e debe ihe ọ bụla.

---

## Ọnụọgụ Mkpakọ

Arịrịọ ọ bụla e mere mkpakọ na-agụnye ọnụọgụ n'ime ndekọ ihe nkesa:

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

## Atụmatụ Nzọụkwụ

| Nzọụkwụ    | Ụdịdị                                                                                                                                              | Ọnọdụ      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Nzọụkwụ 1  | Gbanyụọ, Lite                                                                                                                                      | ✅ Ebugoro |
| Nzọụkwụ 2  | Standard, Aggressive, Ultra                                                                                                                        | ✅ Ebugoro |
| Nzọụkwụ 3  | RTK, Stacked, Compression Combos                                                                                                                   | ✅ Ebugoro |
| Nzọụkwụ 4  | Ụdịdị Nsonaazụ, SLM-tier Ultra, eval harness                                                                                                       | ✅ Ebugoro |
| Nzọụkwụ 4C | Mgbakọta ọnọdụ na-agbanwe agbanwe ("dial") — igwe mgbakọ + API (`contextBudget` na `PUT /api/settings/compression`) + njikwa ụdịdị/amụma dashboard | ✅ Ebugoro |

---

## Ekele

Iwu mkpakọ ọnọdụ Standard sitere n'ike mmụọ nsọ nke **[Caveman](https://github.com/JuliusBrussee/caveman)** nke **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) mepụtara — ọrụ ama ama nke na-ekwu "gịnị mere e ji eji ọtụtụ token mgbe token ole na ole ga-arụ ọrụ." Caveman na-akọ token mpụta dị ole na ole site na `~75%`, nkezi nchekwa mpụta benchmark nke `65%`, oke mpụta nke `22-87%`, na ngwá ọrụ mkpakọ ntinye nke `~46%`.

Ọnọdụ RTK sitere n'ike mmụọ nsọ nke **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** nke **[RTK AI](https://github.com/rtk-ai)** mepụtara — ọrụ mkpakọ mpụta iwu dị oke arụmọrụ maka terminal, build, test, git, na nzacha mpụta ngwá ọrụ. RTK na-akọ nchekwa nke `60-90%`, ebe nnọkọ atụ dị na README ya gosiri na echekwara `~80%`.

---

## Usoro Mkpakọ Dị Elu

Na mgbakwunye na ụdị ọkọlọtọ 7, OmniRoute gụnyere ọtụtụ usoro mkpakọ dị elu
nke na-arụ ọrụ na-akpaghị aka dabere na ọnọdụ.

### Mkpakọ Na-amata Cache

Ụfọdụ ndị na-enye ọrụ (dị ka Anthropic na nchekwa nchekwa ngwa ngwa) na-akwado **nchekwa nchekwa ngwa ngwa**,
nke na-enye ha ohere ịchekwa akụkụ nke ngwa ngwa iji belata ọnụ ahịa na oge nkwụsị. Mgbe
agbanyere nchekwa nchekwa, mkpakọ siri ike nwere ike **imerụ** arụmọrụ n'ihi na ọ na-agbanwe
akara ndị echekwara, na-eme ka nchekwa nchekwa ghara ịdị irè.

Modul `cachingAware.ts` na-edozi nke a site na **ịchọpụta ọnọdụ nchekwa nchekwa** na
**ịhazigharị atụmatụ mkpakọ** n'ụzọ kwesịrị ekwesị.

#### Otu o si arụ ọrụ

1. **Chọpụta ọnọdụ nchekwa nchekwa** — Na-enyocha ahụ arịrịọ maka akara `cache_control`
2. **Chọpụta ndị na-enye ọrụ nchekwa nchekwa** — Na-enyocha ma onye na-enye ọrụ ebumnuche na-akwado nchekwa nchekwa
3. **Hazigharịa atụmatụ** — Na-agbada `aggressive`/`ultra` gaa `standard` maka ndị na-enye ọrụ nchekwa nchekwa
4. **Wepụ ngwa ngwa sistemụ** — A na-echekwa ngwa ngwa sistemụ mgbe niile, yabụ emela ka ha kpọkọta
5. **Jiri mgbanwe ndị a na-ekpebi** — Naanị jiri mgbanwe ndị na-emepụta mmepụta na-agbanwe agbanwe

#### Ihe atụ koodu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Akara nchekwa nchekwa
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mgbe ị ga-eji

Mkpakọ na-amata cache **na-arụ ọrụ mgbe niile** — ọ dịghị nhazi achọrọ. Ọ na-amalite
naanị mgbe:

- Arịrịọ ahụ nwere akara `cache_control`
- Onye na-enye ọrụ ebumnuche na-akwado nchekwa nchekwa ngwa ngwa (Anthropic, OpenAI, wdg.)

### Ịka nká na-aga n'ihu

Mkparịta ụka ogologo na-agbakọta ọtụtụ ntụgharị ozi, mana ntụgharị ochie na-adị
obere mkpa. Modul `progressiveAging.ts` **na-emebi ozi site na anya ntụgharị**:

- **Ntụgharị na nso nso (0-3)**: Edebere ya n'ụzọ zuru ezu (nkọwa zuru ezu)
- **Ntụgharị etiti (4-8)**: Mkpakọ dị nro (ozi oghere, nhicha nhazi)
- **Ntụgharị ochie (9+)**: Mkpakọ ọgba (iwepụ ihe ndochi, nchịkọta)
- **Ntụgharị ochie nke ukwuu (20+)**: Nchịkọta dị ukwuu ma ọ bụ tụfuo

#### Ihe atụ koodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "Ị bụ onye enyemaka bara uru" },
  { role: "user", content: "Gịnị bụ 2+2?" },
  { role: "assistant", content: "4" },
  // ... ntụgharị 50 ọzọ ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Ntụgharị 3 mbụ: n'ụzọ zuru ezu
  light: 8, // Ntụgharị 4-8: mkpakọ dị nro
  moderate: 20, // Ntụgharị 9-20: mkpakọ ọgba
  // Ntụgharị 21+: nchịkọta dị ukwuu
});

// saved = ọnụọgụ akara echekwara
```

#### Mgbe ị ga-eji

Ịka nká na-aga n'ihu **na-arụ ọrụ mgbe niile** maka ụdị `aggressive` na `ultra`. Ọ dị
bara uru karịsịa maka:

- Nzukọ koodu na-adịte aka
- Mkparịta ụka ụbọchị dị iche iche
- Usoro ọrụ ndị ọrụ nwere ọtụtụ oku ngwaọrụ

### Ụdị Mmepụta Ọgba

Modul `outputMode.ts` na-agbakwunye **ntụziaka ngwa ngwa sistemụ** iji mee ka
ụdị ahụ n'onwe ya mepụta mmepụta mkpakọ, dị mkpụmkpụ (ụdị "ọgba").

#### Otu o si arụ ọrụ

Kama ịkpọkọta ntinye, ụdị a na-agbakwunye ngwa ngwa sistemụ dị ka:

> "Zaa n'okwu ole na ole. Wepụ ihe ụtọ. Jiri ahịrịokwu dị mkpụmkpụ."

Nke a na-arụ ọrụ nke ọma karịsịa maka:

- Ọgbọ koodu (mmepụta dị mkpụmkpụ = akara ole na ole)
- Ajụjụ & Azịza ngwa ngwa (ọ dịghị mkpa maka nkọwa zuru ezu)
- Nhazi batch (ịbawanye mmepụta)

#### Mgbe ị ga-eji

Ụdị mmepụta ọgba bụ **nhọrọ** — tọọ ya site na nhazi combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Ụdị Mmepụta (ndepụta)

Ụdị mmepụta ọgba dị n'elu bụ **ụzọ otu ụdị ochie**. Nzọụkwụ 4 mere ka ọ
ghọọ ndepụta nke ụdị mmepụta nwere ike ijikọta: `OUTPUT_STYLE_CATALOG` na
`open-sse/services/compression/outputStyles/catalog.ts`. Ụdị ọ bụla bụ ntụziaka ngwa ngwa sistemụ
nke na-eme ka ụdị ahụ n'onwe ya mepụta mmepụta dị ọnụ ala; enwere ike ịgbanwuo ụdị
ọnụ ma tinye ya n'usoro ndepụta.

| Ụdị | `id` | Ihe ọ na-eme | Asụsụ ntụziaka |
| -------------------------- | ------------- | Ọdịmma | ---------------------------------------------------------- |
| Okwu nkenke | `terse-prose` | Wepụ ihe ndochi/edemede/ịgba ọsọ; debe ihe teknụzụ kpọmkwem. Otu ederede dị ka usoro mmepụta caveman ochie (ezo aka, edeghị ya ọzọ). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Koodu dị obere | `less-code` | YAGNI ladder: mgbanwe kacha nta na-arụ ọrụ, enweghị nkwupụta anaghị arịọ. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (onye mmepe agadi umengwụ) | `ponytail` | "Koodu kacha mma bụ koodu a na-edeghị ede": iji ya eme ihe ọzọ > idegharị, isi ihe kpatara ya > ihe mgbaàmà, obere ọdịiche na-arụ ọrụ. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Enwere m ADHD (omume-mbụ) | `i-have-adhd` | Omume mbụ (iwu/ụzọ/snippet tupu okwu), usoro nwere oke nọmba, otu nzọụkwụ ọzọ doro anya, enweghị okwu mmalite/nchịkọta/mmechi. Emegharịrị site na [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言) | `terse-cjk` | Ụdị Classical-Chinese ultra-terse. | zh (locale-gated: naanị a na-enye ya mgbe asụsụ edoziri bụ `zh`) |

Ụdị ọ bụla na-ebufe ọkwa ike atọ — `lite`, `full`, `ultra` — na ọkwa ọ bụla
na-ejedebe na nkebiokwu oke nkekọrịta, nke na-edebe ngọngọ koodu, ụzọ faịlụ, iwu,
eriri njehie, URL na ihe nchọpụta n'ụzọ zuru ezu.

#### Otu injection si arụ ọrụ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) na-edozi
nhọrọ ahụ megide katalọgụ (a na-atụfu id ndị amaghị na ụdị ndị na-adabaghị na mpaghara,
ọ dịghị mgbe njehie), na-ejikọta ntụziaka ndị ahọpụtara n'usoro katalọgụ,
na-agbakwunye nkebiokwu oke **otu ugboro**, ma na-ebute nsonaazụ ahụ n'ime sistemụ
ngwa ngwa n'azụ otu ihe nchọpụta idempotency (`[OmniRoute Output Styles]`) — imegharị
ya abụghị ihe ọ bụla. Mgbe asụsụ arịrịọ achọpụtara nwere ntụgharị asụsụ,
a na-agbanye ntụziaka mpaghara kama ịbụ Bekee.

#### Otu esi eme ka ọ rụọ ọrụ

Na dashboard: **Context → Settings → Compression** — otu ahịrị kwa ụdị nwere
ngbanwe gbanye/gbanyụọ na ihe nhọpụta ọkwa. N'ụzọ mmemme, nhazi mkpakọ na-edebe
nhọrọ ahụ dị ka:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: ntọala ngwakọta `outputMode: "caveman"` ochie ka na-arụ ọrụ ma na-edekọ na
`terse-prose`, byte-otu na injection ochie n'asụsụ ochie ọ bụla.

Nhọrọ asụsụ: na `languageConfig.enabled` na-arụ ọrụ, `autoDetect` na-ahọrọ
asụsụ nke ozi onye ọrụ kacha ọhụrụ (otu ihe nchọpụta dị ka injin ntinye);
ịgbanyụ `autoDetect` na-eme ka `defaultLanguage` kwụsie ike. Gbanyụọ → Bekee.

A na-atụnye ụdị × asụsụ matrix site na
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: ụdị ọhụrụ enweghị ike ibuga
na-enweghị ma ọ dịkarịa ala ntụgharị asụsụ pt-BR (ma ọ bụ ihe pụrụ iche a na-achọpụta),
na ụdị dị adị enweghị ike ịlafu mpaghara n'ụzọ dị jụụ. Iji tinye ụdị, lee
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Mkpakọ Nsonaazụ Ngwaọrụ

Modul `toolResultCompressor.ts` na-enye **atụmatụ mkpakọ pụrụ iche 5**
maka nsonaazụ ngwaọrụ (oku ọrụ, mmepụta onye nnọchi anya, nsonaazụ ọchụchọ, wdg.):

1. **Mkpakọ nsonaazụ ọchụchọ** — Na-ewepụ nsonaazụ na-enweghị isi, na-edebe top-N
2. **Mkpakọ ọgụgụ faịlụ** — Na-ebipụ faịlụ buru ibu, na-echekwa isi/mbubata
3. **Mkpakọ mmezu koodu** — Na-edebe naanị stdout/stderr dị mkpa
4. **Mkpakọ ajụjụ nchekwa data** — Na-egbochi ahịrị, na-ewepụ metadata na-agbagwoju anya
5. **Mkpakọ nzaghachi API** — Na-ewepụ mpaghara efu, na-agbakọta arrays

#### Mgbe ị ga-eji

Mkpakọ nsonaazụ ngwaọrụ **na-arụ ọrụ mgbe niile** mgbe oku ngwaọrụ dị. Enweghị
nhazi achọrọ.

### Pipeline A Kpọkọtara

Ụdị akpọkọtara na-agba **ọtụtụ injin n'usoro** — na-abụkarị RTK mbụ
(nchekwa 60-90% na mmepụta ngwaọrụ), mgbe ahụ Caveman (nchekwa 30% ọzọ na
ederede fọdụrụ). Nke a na-enweta **nchekwa 78-95% ngụkọta**.

#### Otu o si arụ ọrụ

```
Ntinye (1000 tokens)
  → RTK (nzacha maara iwu) → 200 tokens
    → Caveman (iwepụ ihe ndochi) → 140 tokens
  → Mmepụta (140 tokens, nchekwa 86%)
```

#### Mgbe ị ga-eji

Jiri ụdị akpọkọtara maka:

- Ọrụ dị arọ na ngwaọrụ (ịkoodu onye nnọchi anya, nyocha)
- Nhazi batch na-emetụta ọnụ ahịa
- Mgbe ịchọrọ nchekwa token kacha

Hazie site na ngwakọta:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Ndezigharị Ngwakọta Mkpakọ

Ị nwere ike ịdezigharị ọnọdụ mkpakọ zuru ụwa ọnụ **maka ngwakọta ọ bụla** iji hazie omume ya nke ọma
maka ọnọdụ ojiji dị iche iche:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Nke a bara uru maka:

- **Ngwakọta ide koodu**: Jiri ọnọdụ `aggressive` maka nnọkọ ndị toro ogologo
- **Ngwakọta ajụjụ na azịza ngwa ngwa**: Jiri ọnọdụ `lite` maka nzaghachi ngwa ngwa
- **Ngwakọta ndị na-eji ọtụtụ ngwaọrụ**: Jiri ọnọdụ `stacked` iji nweta nchekwa kachasị
- **Ngwakọta mmepụta**: Jiri ọnọdụ `cache-aware` maka ndị na-eweta ọrụ nchekwa cache

---

## Hụkwa

- [Nhazi Gburugburụ](../reference/ENVIRONMENT.md) — Mgbanwe gburugburụ maka mkpakọ
- [Ntuziaka Nhazi Sistemu](../architecture/ARCHITECTURE.md) — Ihe ndị dị n'ime usoro mkpakọ
- [Ntuziaka Onye Ọrụ](../guides/USER_GUIDE.md) — Otu esi amalite iji mkpakọ
- [Mkpakọ RTK](./RTK_COMPRESSION.md) — Ihe nzacha RTK, ụdị ntụkwasị obi, ọnụ ụzọ nkwenye, na iweghachite mmepụta izizi
- [Injin Mkpakọ](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, APIs, MCP, dashboard
- [Ọdịdị Iwu Mkpakọ](./COMPRESSION_RULES_FORMAT.md) — Ọdịdị ngwugwu iwu JSON
- [Ngwugwu Asụsụ Mkpakọ](./COMPRESSION_LANGUAGE_PACKS.md) — Iwu Caveman ndị ahaziri maka asụsụ dị iche iche
