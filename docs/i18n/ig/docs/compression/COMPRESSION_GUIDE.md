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

### Ogwe njikwa

Gaa na `Ogwe njikwa → Kọntekst & Cache`:

- **Caveman** — nhọrọ ọnọdụ, ngwugwu asụsụ, nlele tupu oge eruo, na ndabara zuru ụwa ọnụ
- **RTK** — nlele tupu oge eruo nke nzacha iwu, ntọala nchekwa RTK, na katalọgụ nzacha
- **Ngwakọta Mkpakọ** — usoro injin ndị e nyere aha ma kenyekwa ha na ngwakọta ntụgharị ụzọ
- **Oke Mmalite Akpaaka** — na-amalite mkpakọ na-akpaghị aka mgbe ọnụọgụ token gafere oke

### Mgbanwe Maka Ngwakọta Ọ Bụla

Na `Ogwe njikwa → Kọntekst & Cache → Ngwakọta Mkpakọ`, kenye ngwakọta mkpakọ na ngwakọta
ntụgharị ụzọ:

```txt
Ngwakọta: "free-tier-fallback"
  Ngwakọta Mkpakọ: "coding-agent-stack"
  Usoro: RTK -> Caveman
  Ebe Ezubere:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nke a na-enye gị ohere iji mkpakọ e jikọtara ọnụ n'elu ndị na-eweta ọrụ efu/ide koodu, ma na-edobe
ọnọdụ lite maka ndebanye aha a na-akwụ ụgwọ.

Ntọala "Mgbanwe Maka Ngwakọta Ọ Bụla" a bụ njikwa dị iche na mgbanwe **ọnọdụ mkpakọ nke ngwakọta
ntụgharị ụzọ** (Default/Off/Lite/Standard/Aggressive/Ultra) — mgbanwe ahụ anaghị ahọrọ usoro
ngwakọta-mkpakọ e nyere aha; naanị ihe ọ na-eme bụ ịtọ mpaghara `compressionMode` nke
`resolveCompressionPlan` na-enyocha. Enwere ike ịtọ ya na kaadị ngwakọta (`Ogwe njikwa → Ngwakọta`)
ma ọ bụ, malite na #6760, maka ngwakọta ntụgharị ụzọ ọ bụla na ndepụta "Kenye na ntụgharị ụzọ" dị na
`Ogwe njikwa → Kọntekst & Cache → Ngwakọta Mkpakọ`, n'akụkụ igbe nhọrọ maka ikenye usoro
akọwara n'elu. Ebe abụọ ahụ na-echekwa mgbanwe site n'otu endpoint `PUT /api/combos/{id}`.

### Mgbanwe maka arịrịọ ọ bụla

Zipụ isi arịrịọ `x-omniroute-compression` iji gbanwee atụmatụ mkpakọ maka otu arịrịọ. Ọ nwere
ikike kachasị elu — ọ na-emeri mgbanwe ngwakọta ntụgharị ụzọ, profaịlụ nọ n'ọrụ, mmalite akpaaka,
na Default nke panel ahụ. A na-eleghara ụkpụrụ ndị a na-amaghị anya (a naghị ajụ arịrịọ ahụ ma ọlị),
mgbanwe ukwu zuru ụwa ọnụ ka na-achịkwa ihe niile: mgbe agbanyụrụ mkpakọ n'ụwa niile, isi arịrịọ ahụ
enweghị ike ịgbanye ya. Ụkpụrụ:

| Ụkpụrụ        | Mmetụta                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Enweghị mkpakọ maka arịrịọ a.                                                                                                |
| `default`     | Profaịlụ Default sitere na panel (na-eleghara profaịlụ nọ n'ọrụ anya).                                                       |
| `engine:<id>` | Otu injin mgbe agbanyere ya, dịka ọmụmaatụ `engine:rtk`.                                                                     |
| `<combo>`     | Ngwakọta e nyere aha, nke a ga-ebu ụzọ dakọtara site n'aha (n'agbanyeghị mkpụrụedemede ukwu ma ọ bụ nta), emesịa site na id. |

A na-eweghachi atụmatụ etinyere na isi nzaghachi `X-OmniRoute-Compression: <mode>; source=<source>`,
ebe `<source>` bụ otu n'ime `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, ma ọ bụ `off`.

### API

```bash
# Nweta ntọala mkpakọ
curl http://localhost:20128/api/settings/compression

# Melite ntọala mkpakọ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Lelee payload RTK/stacked akọwapụtara tupu oge eruo
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Depụta ngwugwu nzacha RTK
curl http://localhost:20128/api/context/rtk/filters

# Jiri metadata iwu nhọrọ nwalee RTK ozugbo
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

Arịrịọ ọ bụla a kwakọtara na-agụnye ọnụọgụ na ndekọ sava:

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

## Atụmatụ Usoro Nkebi

| Nkebi    | Ọnọdụ                                                                                                                                  | Ọkwa            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Nkebi 1  | Gbanyụọ, Lite                                                                                                                          | ✅ Ewepụtala ya |
| Nkebi 2  | Standard, Aggressive, Ultra                                                                                                            | ✅ Ewepụtala ya |
| Nkebi 3  | RTK, Stacked, Ngwakọta Mkpakọ                                                                                                          | ✅ Ewepụtala ya |
| Nkebi 4  | Ụdị Mpụta, Ultra nke ọkwa SLM, usoro nnwale eval                                                                                       | ✅ Ewepụtala ya |
| Nkebi 4C | Mmegharị mmefu-context ("dial") — injin mgbakọ + API (`contextBudget` na `PUT /api/settings/compression`) + njikwa ọnọdụ/iwu dashboard | ✅ Ewepụtala ya |

---

## Ekele

Iwu mkpakọ ọnọdụ Standard sitere n'ike mmụọ nsọ nke **[Caveman](https://github.com/JuliusBrussee/caveman)** nke **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) mepụtara — ọrụ ama ama nke na-ekwu "gịnị mere e ji eji ọtụtụ token mgbe token ole na ole ga-arụ ọrụ." Caveman na-akọ token mpụta dị ole na ole site na `~75%`, nkezi nchekwa mpụta benchmark nke `65%`, oke mpụta nke `22-87%`, na ngwá ọrụ mkpakọ ntinye nke `~46%`.

Ọnọdụ RTK sitere n'ike mmụọ nsọ nke **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** nke **[RTK AI](https://github.com/rtk-ai)** mepụtara — ọrụ mkpakọ mpụta iwu dị oke arụmọrụ maka terminal, build, test, git, na nzacha mpụta ngwá ọrụ. RTK na-akọ nchekwa nke `60-90%`, ebe nnọkọ atụ dị na README ya gosiri na echekwara `~80%`.

---

## Sistemụ Mkpakọ Dị Elu

E wezụga ọnọdụ ọkọlọtọ 7 ahụ, OmniRoute gụnyere ọtụtụ sistemụ mkpakọ dị elu
ndị na-arụ ọrụ na-akpaghị aka dabere na context.

### Mkpakọ Na-eburu Cache n'Uche

Ụfọdụ ndị na-eweta ọrụ (dị ka Anthropic nwere prompt caching) na-akwado **prompt caching**,
nke na-enye ha ohere idobe akụkụ prompt na cache iji belata ọnụ ahịa na oge nchere. Mgbe
agbanyere caching, mkpakọ siri ike nwere ike **imebi** arụmọrụ
n'ihi na ọ na-agbanwe token ndị dị na cache, si otú ahụ mee ka cache ghara ịdị irè.

Modul `cachingAware.ts` na-edozi nke a site na **ịchọpụta context caching** na
**ịhazigharị atụmatụ mkpakọ** n'ụzọ kwekọrọ.

#### Otu o si arụ ọrụ

1. **Chọpụta context caching** — Na-enyocha body arịrịọ maka akara `cache_control`
2. **Chọpụta ndị na-eweta caching** — Na-enyocha ma onye na-eweta ọrụ ezubere iche ọ na-akwado caching
3. **Hazigharịa atụmatụ** — Na-agbadata `aggressive`/`ultra` gaa `standard` maka ndị na-eweta caching
4. **Mafee system prompt** — A na-etinyekarị system prompt na cache, ya mere akwakọla ha
5. **Jiri mgbanwe na-enye otu nsonaazụ mgbe niile** — Jiri naanị mgbanwe ndị na-emepụta mpụta na-agbanweghi agbanwe

#### Ọmụmaatụ koodu

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mgbe a ga-eji ya

Mkpakọ na-eburu cache n'uche **na-arụ ọrụ mgbe niile** — nhazi adịghị mkpa. Ọ na-amalite ọrụ naanị
mgbe:

- Arịrịọ ahụ nwere akara `cache_control`
- Onye na-eweta ọrụ ezubere iche na-akwado prompt caching (Anthropic, OpenAI, wdg.)

### Ịka Nka Nwayọọ Nwayọọ

Mkparịta ụka toro ogologo na-achịkọta ọtụtụ ntụgharị ozi, mana ntụgharị ndị ochie na-aghọwanye ndị
na-adịchaghị mkpa. Modul `progressiveAging.ts` **na-ebelata nkọwa ozi dịka ebe ntụgharị ya dị anya**:

- **Ntụgharị nso nso a (0-3)**: Edebere ya otu ọ dị (nkọwa zuru ezu)
- **Ntụgharị etiti (4-8)**: Mkpakọ Lite (oghere, nhicha nhazi)
- **Ntụgharị ochie (9+)**: Mkpakọ Caveman (iwepụ okwu mmeju, nchịkọta)
- **Ntụgharị kara ezigbo nka (20+)**: A na-achịkọta ha nke ukwuu ma ọ bụ wepụ ha

#### Ọmụmaatụ koodu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ntụgharị 50 ọzọ ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Ntụgharị 3 mbụ: otu ha dị
  light: 8, // Ntụgharị 4-8: mkpakọ lite
  moderate: 20, // Ntụgharị 9-20: mkpakọ caveman
  // Ntụgharị 21+: nchịkọta siri ike
});

// saved = ọnụọgụ token echekwara
```

#### Mgbe a ga-eji ya

Ịka nká na-aga n'ihu na-arụ ọrụ **mgbe niile** maka ọnọdụ `aggressive` na `ultra`. Ọ
na-arụ ọrụ nke ọma karịsịa maka:

- Oge ide koodu na-adị ogologo
- Mkparịta ụka na-ewe ọtụtụ ụbọchị
- Usoro ọrụ ndị nnọchi anya nwere ọtụtụ oku ngwaọrụ

### Ọnọdụ Mmepụta Caveman

Modul `outputMode.ts` na-etinye **ntụziaka system prompt** iji mee ka
model ahụ n'onwe ya wepụta mmepụta mkpirikpi, na-enweghị ọtụtụ okwu (ụdị "caveman").

#### Otu o si arụ ọrụ

Kama ịpịkọta ntinye, ọnọdụ a na-agbakwunye system prompt dị ka:

> "Zaghachi n'okwu ole na ole. Wepụ okwu ekele. Jiri ahịrịokwu dị mkpirikpi."

Nke a na-arụ ọrụ nke ọma karịsịa maka:

- Mmepụta koodu (mmepụta dị mkpirikpi = token ole na ole)
- Ajụjụ na azịza ngwa ngwa (nkọwa sara mbara adịghị mkpa)
- Nhazi n'ìgwè (mee ka throughput kacha elu)

#### Mgbe a ga-eji ya

Ọnọdụ mmepụta Caveman bụ **opt-in** — tọọ ya site na nhazi combo:

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

### Ụdị Mmepụta (katalọgụ)

Ọnọdụ mmepụta Caveman dị n'elu bụ **ụzọ otu ụdị ochie**. Phase 4 mere ka ọ
ghọọ katalọgụ nke ụdị mmepụta a pụrụ ijikọ ọnụ: `OUTPUT_STYLE_CATALOG` dị na
`open-sse/services/compression/outputStyles/catalog.ts`. Ụdị ọ bụla bụ ntụziaka system-prompt
nke na-eme ka model ahụ n'onwe ya wepụta mmepụta dị ọnụ ala karị; enwere ike ịgbanye
ụdị ndị ahụ ọnụ, a na-etinyekwa ha dịka usoro katalọgụ si dị.

| Ụdị                                    | `id`          | Ihe ọ na-eme                                                                                                                                                                                                                           | Asụsụ ntụziaka                                                      |
| -------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Nkọwa dị mkpirikpi                     | `terse-prose` | Wepụ okwu ndochi/articles/okwu mgbagwoju anya; debe ihe teknụzụ kpọmkwem. Ọ bụ otu ederede ahụ dị na ọnọdụ mmepụta caveman ochie (e zoro aka na ya, edeghị ya ọzọ).                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| Koodu pere mpe                         | `less-code`   | Usoro YAGNI: mgbanwe kacha nta na-arụ ọrụ, enweghị abstraction a na-arịọghị.                                                                                                                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| Ponytail (onye nrụpụta senior umengwụ) | `ponytail`    | "Koodu kacha mma bụ koodu a na-edeghị": jiri ihe dị adị ọzọ > degharịa, isi ihe kpatara nsogbu > mgbaàmà, diff kacha mkpirikpi na-arụ ọrụ.                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| Enwere m ADHD (omume-ebu-ụzọ)          | `i-have-adhd` | Omume buru ụzọ (command/path/snippet tupu nkọwa), nzọụkwụ nwere nọmba na oke, OTU nzọụkwụ ọzọ doro anya, enweghị okwu mmeghe/nchịkọta/okwu mmechi. E si na [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) hazie ya. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                       |
| CJK dị mkpirikpi (文言)                | `terse-cjk`   | Ụdị Classical-Chinese dị nnọọ mkpirikpi.                                                                                                                                                                                               | zh (locale-gated: a na-enye ya naanị mgbe asụsụ a họpụtara bụ `zh`) |

Ụdị ọ bụla nwere ọkwa ike atọ — `lite`, `full`, `ultra` — ọkwa ọ bụla
na-ejedebekwa na nkebi oke a na-ekekọrịta, nke na-edobe code blocks, file paths, commands,
error strings, URLs na identifiers ka ha dị kpọmkwem.

#### Otu ntinye si arụ ọrụ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) na-enyocha
nhọrọ ahụ megide katalọgụ (a na-ewepụ ids ndị amaghị na ụdị ndị locale ha adabaghị,
ọ dịghị mgbe ọ bụ njehie), na-ejikọta ntụziaka ndị ahọpụtara dịka usoro katalọgụ si dị,
na-agbakwunye nkebi oke ahụ **otu ugboro**, ma na-etinye nsonaazụ ahụ n'ihu system
prompt n'azụ otu akara idempotency (`[OmniRoute Output Styles]`) — itinye ya ọzọ
agaghị eme ihe ọ bụla. Mgbe asụsụ arịrịọ achọpụtara nwere ntụgharị, a na-etinye
ntụziaka a sụgharịrị kama nke Bekee.

#### Otu esi gbanye ya

Na dashboard: **Context → Settings → Compression** — otu ahịrị maka ụdị ọ bụla nwere
toggle ịgbanye/ịgbanyụ na ihe nhọpụta ọkwa. Site na mmemme, nhazi compression na-echekwa
nhọrọ ahụ dịka:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Ndakọrịta azụ: ntọala combo ochie `outputMode: "caveman"` ka na-arụ ọrụ ma na-map gaa
`terse-prose`, byte-identical na ntinye ochie n'asụsụ ochie ọ bụla.

Nhọrọ asụsụ: mgbe `languageConfig.enabled` dị on, `autoDetect` na-ahọrọ
asụsụ nke ozi onye ọrụ kacha ọhụrụ (otu detector ahụ nke input engines na-eji);
ịgbanyụ `autoDetect` na-akpọgide `defaultLanguage`. Off → Bekee.

A na-akpọgide matriks ụdị × asụsụ site na
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: ụdị ọhụrụ enweghị ike ịpụta
na-enweghị ma ọ dịkarịa ala ntụgharị pt-BR (ma ọ bụ exception doro anya a na-esochi), ụdị
dị adị enweghịkwa ike tufuo locale na nzuzo. Iji tinye ụdị, lee
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Mkpakọ Nsonaazụ Ngwaọrụ

Modul `toolResultCompressor.ts` na-enye **usoro mkpakọ pụrụ iche 5**
maka nsonaazụ ngwaọrụ (function calls, agent outputs, search results, wdg.):

1. **Mkpakọ nsonaazụ ọchụchọ** — Na-ewepụ nsonaazụ ndị na-emegharị onwe ha, na-edobe top-N
2. **Mkpakọ ọgụgụ faịlụ** — Na-ebiri faịlụ buru ibu, na-echekwa headers/imports
3. **Mkpakọ mmezu koodu** — Na-edobe naanị stdout/stderr ndị dị mkpa
4. **Mkpakọ ajụjụ database** — Na-amachi rows, na-ewepụ metadata nwere ọtụtụ okwu
5. **Mkpakọ nzaghachi API** — Na-ewepụ null fields, na-achịkọta arrays

#### Mgbe a ga-eji ya

Mkpakọ nsonaazụ ngwaọrụ na-arụ ọrụ **mgbe niile** mgbe tool calls dị. Ọ dịghị
nhazi achọrọ.

### Pipeline A Tụkọtara Ọnụ

Ọnọdụ stacked na-agba **ọtụtụ engines n'usoro** — ọ na-abụkarị RTK mbụ
(nchekwa 60-90% na tool output), Caveman esochie ya (nchekwa 30% ọzọ na
ederede fọdụrụ). Nke a na-eweta **nchekwa mkpokọta 78-95%**.

#### Otu o si arụ ọrụ

```
Ntinye (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (iwepụ okwu ndochi) → 140 tokens
  → Mmepụta (140 tokens, nchekwa 86%)
```

#### Mgbe a ga-eji ya

Jiri ọnọdụ stacked maka:

- Usoro ọrụ jupụtara na ngwaọrụ (agentic coding, nyocha)
- Nhazi n'ìgwè ebe ọnụ ahịa dị mkpa
- Mgbe ịchọrọ nchekwa token kachasị elu

Hazie ya site na combo:

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
