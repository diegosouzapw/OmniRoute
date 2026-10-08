# 🗜️ Prompt Compression Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Awtomatikong makatipid ng 15-95% sa kwalipikadong konteksto. Para sa mabilisang pangkalahatang-ideya, tingnan ang [seksyong Compression ng README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pangkalahatang-ideya

Nagpapatupad ang OmniRoute ng modular na pipeline para sa prompt compression na tumatakbo nang **proaktibo** bago makarating ang mga kahilingan sa mga upstream provider. Nangangahulugan itong transparent na nangyayari ang iyong pagtitipid sa token — walang kailangang baguhin sa iyong workflow.

```
Kahilingan ng Client
  → Tagapili ng Diskarte sa Compression
    → May override ba sa combo? → Gamitin ang setting ng combo
    → Naabot ba ang threshold ng awtomatikong pag-trigger? → Gamitin ang auto mode
    → Default mode? → Gamitin ang global na setting
    → Naka-off? → Laktawan ang compression
  → Napiling Compression Mode
    → Off: Walang compression
    → Lite: Ligtas na paglilinis ng whitespace/pag-format (~15%)
    → Standard: Pag-aalis ng mga salitang palaman gamit ang Caveman-speak (~30%)
    → Aggressive: Pagpapatanda ng history + pagbubuod (~50%)
    → Ultra: Heuristic pruning + pagpapagaan ng mga code block (~75%)
    → RTK: Pag-filter ng terminal/tool output na isinasaalang-alang ang command (60-90% upstream range)
    → Stacked: Nakaayos na multi-engine pipeline, karaniwang RTK pagkatapos ay Caveman (78-95% kwalipikadong saklaw)
  → Na-compress na Kahilingan → Provider
```

---

## Mga Compression Mode

### Off

Walang inilalapat na compression. Dumadaan ang lahat ng mensahe nang walang pagbabago.

### Lite Mode (~15% na matitipid, <1ms latency)

Ang pinakaligtas na mode — walang pagbabago sa semantika, paglilinis lamang ng pag-format:

| Pamamaraan               | Paglalarawan                                                          |
| ------------------------ | --------------------------------------------------------------------- |
| `collapseWhitespace`     | Pagsamahin ang magkakasunod na blangkong linya at mga espasyo sa dulo |
| `dedupSystemPrompt`      | Alisin ang mga dobleng system message                                 |
| `compressToolResults`    | I-compress ang mahahabang output ng tool/function                     |
| `removeRedundantContent` | Alisin ang mga paulit-ulit na tagubilin                               |
| `replaceImageUrls`       | Paikliin ang mga URI ng base64 image data                             |

**Pinakamainam para sa:** Palaging naka-on na paggamit at mga workflow na kritikal ang kaligtasan.

### Standard Mode (~30% na matitipid)

Hango sa [Caveman](https://github.com/JuliusBrussee/caveman) — nag-aalis ng mga salitang palaman at masalitang pagpapahayag habang pinananatili ang kahulugan:

- Nag-aalis ng mga salitang palaman ("please", "I think", "basically", "actually")
- Pinaiikli ang masalitang mga parirala ("in order to" → "to", "as a result of" → "because")
- Nag-aalis ng magagalang na pag-aatubili ("Would you mind...", "If you could possibly...")
- 30+ regex rule na iniangkop para sa mga coding prompt

**Pinakamainam para sa:** Pang-araw-araw na coding workflow at mga pangkat na maingat sa gastos.

### Aggressive Mode (~50% na matitipid)

Matalinong pamamahala ng history para sa mahahabang session:

- **Pagpapatanda ng Mensahe** — unti-unting mas kino-compress ang mas lumang mga mensahe
- **Compression ng Resulta ng Tool** — pinuputol o inaalis ang mahahabang output ng tool (una/huling mga linya,
  pag-filter ng mga tumutugmang linya, pag-compact ng JSON key)
- **Mga Pananggalang sa Integridad ng Istruktura** — tinitiyak na nananatiling magkakatugma ang mga pares na `tool_use` + `tool_result`
- **Kamalayan sa Context Window** — iginagalang ang mga limitasyon sa token ng bawat modelo

**Pinakamainam para sa:** Mahahabang debugging session at malalaking codebase.

### Ultra Mode (~75% na matitipid)

Pinakamataas na compression para sa mga sitwasyong kritikal ang token:

- **Heuristic Pruning** — score-based na pruning ng mga token sa prosa
- **Pagpapanatili ng Istruktura** — ang mga fenced code block, inline code, URL, at identifier ay
  tina-tombstone at muling eksaktong pinagdurugtong, at hindi kailanman pina-prune
- **Opsyonal na SLM tier** — maaaring pinuhin ng maliit na lokal na modelo ang pruning kapag na-configure
- Hiwalay sa Aggressive mode: hindi nito pinapatakbo ang pagpapatanda ng mensahe, compression ng resulta ng tool,
  o ang fallback summarizer (tanging pagkabigo sa SLM tier ang maaaring magdaan ng fallback pass sa
  aggressive)

**Pinakamainam para sa:** Kapag paulit-ulit mong naaabot ang mga limitasyon ng konteksto.

### RTK Mode (60-90% upstream range)

Ino-optimize ang RTK mode para sa mahahabang output ng tool na lumilitaw sa mga coding-agent session:

- Tinutukoy ang mga klase ng command/output gaya ng `git status`, `git diff`, `git log`, mga test runner,
  TypeScript/Vite/Webpack build, ESLint/Biome/Prettier, npm audit/install, mga Docker log, infra
  output, at generic na shell output
- Inilalapat ang mga JSON filter pack mula sa `open-sse/services/compression/engines/rtk/filters/`
- Nag-i-import ng mga RTK TOML schema v1 filter mula sa mga file na `filters.toml` ng proyekto o global, na may
  pagpapatunay ng inline test at trust-gating para sa mga file ng proyekto
- May kasamang 55 built-in filter na may mga inline verify sample
- Nag-aalis ng mga ANSI control sequence, progress bar, paulit-ulit na linya, at ingay na hindi nangangailangan ng aksyon
- Pinananatili ang mga failure, error, warning, binagong file, buod, at dulo ng mahabang output
- Sinusuportahan ang mga project filter na may trust-gating, global filter, at opsyonal na pagbawi ng na-redact na raw output

**Pinakamainam para sa:** Mga agent session na may transcript ng shell, build, test, git, grep, at file output.

### Stacked Mode (78-95% kwalipikadong saklaw)

Nagpapatakbo ang Stacked mode ng maraming compression engine sa isang deterministikong pagkakasunod-sunod. Ang default na pipeline ay:

```txt
RTK -> Caveman
```

Pinananatiling compact muna ng pagkakasunod-sunod na iyon ang terminal/tool output, pagkatapos ay inilalapat ang semantikong pagpapaikli ng Caveman sa
natitirang natural-language prompt. Maaaring i-configure ang mga stacked pipeline nang global o sa pamamagitan ng
mga compression combo na nakatalaga sa mga routing combo.

**Pinakamainam para sa:** Pinagsamang konteksto na may malalaking tool log kasama ang mga tagubilin ng tao o mga buod ng assistant.

---

## Matematika ng Pagtitipid mula sa Upstream

Itinatala ng OmniRoute ang pagtitipid mula sa compression batay sa dalawang pinagmulan: mga benchmark ng upstream project at
sariling komposisyon ng engine ng OmniRoute.

| Pinagmulan | Numero mula sa upstream README na ginamit dito                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman    | `~75%` mas kaunting output token, `65%` average na pagtitipid sa output sa benchmark, saklaw na `22-87%`, at tool na may `~46%` input compression |
| RTK        | `60-90%` pagtitipid sa command output; halimbawang session na `~118,000 -> ~23,900` token, o `79.7%` ang natipid (`~80%`)                         |

Para sa magkasanib na tool/context payload, pinagsasalansan ng default na combo ng OmniRoute ang mga engine:

```txt
RTK -> Caveman
```

Ang pinagsamang pagtitipid ay multiplicative, hindi additive:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Nalalapat ang numerong `78-95%` kapag parehong kayang bawasan ng RTK at Caveman ang iisang input/context payload.
Hiwalay ang response output mode ng Caveman: kapag naka-enable, gamitin ang sariling pagtitipid sa output ng Caveman (`65%`
na average, `~75%` na headline, saklaw na `22-87%`). Nakadepende ang kabuuang pagtitipid sa billing sa kombinasyon ng iyong prompt/output.

### Ano talaga ang ibig sabihin ng "eligible"

Totoo ang headline na saklaw na 15-95%, ngunit nalalapat lamang ito sa **redundant o verbose** na content — mga inuulit na
error line, build log na paulit-ulit na naglalabas ng parehong warning, o napakalaking `grep`/file-read dump. **Hindi**
ito nangangahulugang gayon kalaki ang matitipid sa bawat request.

Napatunayan sa pamamagitan ng empirical testing (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): ang
isang `stacked` (RTK + Caveman) run sa isang Anthropic-shape na `tool_result` block na naglalaman ng 300 magkakaparehong
error line ay nagresulta sa **95.93% pagtitipid sa token / 96.26% pagtitipid sa character** — pasok na pasok sa ina-advertise na
saklaw. Ngunit kapag pinatakbo ang parehong pipeline sa normal at hindi redundant na tool output (isang malinis na listahan ng match mula sa `grep`,
isang maikling file read, o ordinaryong conversational text), tama itong nagreresulta sa **halos walang matitipid**, dahil
walang paulit-ulit na content na maaalis at hindi pinapayagan ng `validateCompression()` (`validation.ts`) na ipadala ang isang
rewrite na mag-aalis o magbabago ng mga code block, URL, heading, version, o ALL-CAPS na constant identifier.

Ito ay inaasahan at ligtas na gawi, hindi isang bug: ang isang coding session na karamihan ay nagbabasa/nagse-`grep` ng malilinis na file ay
makakakita lamang ng katamtamang kabuuang pagtitipid kahit ganap na naka-enable ang compression, samantalang ang isang session na nakatagpo ng paulit-ulit na failure
loop o masalitang linter ay makakakita ng buong saklaw na 78-95% sa naturang traffic. Huwag gamitin ang mababang pinagsama-samang porsiyento ng pagtitipid
mula sa iisang session bilang ebidensiyang mali ang pagkaka-configure ng compression — suriin muna kung talagang redundant ang
pinagbabatayang tool output.

---

## Biswalisasyon ng Pagtitipid sa Token

```
Walang compression: 47K token ang ipinadala sa LLM
May Lite:           40K token ang ipinadala          (15% ang natipid — ligtas, palaging naka-on)
May Standard:       33K token ang ipinadala          (30% ang natipid — mga panuntunang caveman-speak)
May Aggressive:     24K token ang ipinadala          (50% ang natipid — aging + summarization)
May Ultra:          12K token ang ipinadala          (75% ang natipid — heuristic pruning)
May RTK:            19K-5K token ang ipinadala       (60-90% ang natipid sa command/tool output)
May Stacked:        10K-2.5K token ang ipinadala     (78-95% na saklaw para sa eligible na RTK+Caveman)
```

---

## Configuration

### Dashboard

Pumunta sa `Dashboard → Context & Cache`:

- **Caveman** — pagpili ng mode, mga language pack, preview, at mga pandaigdigang default
- **RTK** — preview ng command filter, mga setting sa kaligtasan ng RTK, at catalog ng filter
- **Compression Combos** — mga pinangalanang pipeline ng engine na nakatalaga sa mga routing combo
- **Auto-Trigger Threshold** — awtomatikong paganahin ang compression kapag lumampas sa threshold ang bilang ng token

### Override Bawat Combo

Sa `Dashboard → Context & Cache → Compression Combos`, magtalaga ng compression combo sa isang routing
combo:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Mga Target:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nagbibigay-daan ito sa iyong gumamit ng stacked compression sa mga libre/coding provider habang pinananatili ang lite mode sa mga bayad na
subscription.

Ang pagtatalagang ito ng "Override Bawat Combo" ay ibang control kaysa sa override ng **compression
mode ng routing combo** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — tinatanggap din ng schema
ng field ang `rtk`, `stacked`, at `omniglyph`) — hindi pumipili ang override na iyon ng pinangalanang
pipeline ng compression combo; itinatakda lamang nito ang field na `compressionMode` na kinokonsulta ng
`resolveCompressionPlan`. Maaari itong itakda sa combo card (`Dashboard → Combos`) o, mula noong
#6760, para sa bawat routing combo sa listahang "Assign to routing" sa
`Dashboard → Context & Cache → Compression Combos`, katabi mismo ng checkbox para sa pagtatalaga ng pipeline
na nakadokumento sa itaas. Ang parehong interface ay nagpapanatili ng data sa pamamagitan ng iisang endpoint na `PUT /api/combos/{id}`.

### Override Bawat Request

Ipadala ang request header na `x-omniroute-compression` upang i-override ang compression plan para sa iisang
request. Ito ang may pinakamataas na priyoridad — nangingibabaw ito sa override ng routing combo, aktibong profile,
auto-trigger, at Default ng panel. Binabalewala ang mga hindi kilalang value (hindi kailanman tinatanggihan ang request) at
kinokontrol pa rin ng pandaigdigang master switch ang lahat: kapag naka-off ang compression sa buong system, hindi ito maaaring
i-on ng header. Mga value:

| Value         | Epekto                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Walang compression para sa request na ito.                                                                               |
| `default`     | Ang Default profile na nagmula sa panel (binabalewala ang aktibong profile). Nananatiling naka-off ang mga lossy engine. |
| `safe`        | Kapareho ng hindi pagsama sa header: dedup at whitespace folding lamang.                                                 |
| `allow-lossy` | Panatilihin ang operator plan ng request na ito, kabilang ang mga buod, relevance filter, at style rewrite.              |
| `engine:<id>` | Isang engine kapag naka-enable, hal. `engine:rtk`. Ito ang per-request na pag-opt in para sa engine na iyon.             |
| `<combo>`     | Isang pinangalanang combo, na unang itinutugma ayon sa pangalan (case-insensitive), pagkatapos ay ayon sa id.            |

Kung walang `allow-lossy`, `engine:<id>`, o pinangalanang combo, hindi inilalapat ang mga lossy engine. Makakakuha
pa rin ang request ng session dedup at whitespace folding kapag naka-on ang compression.

Ibinabalik ang inilapat na plan sa response header na `X-OmniRoute-Compression: <mode>; source=<source>`,
kung saan ang `<source>` ay isa sa `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, o `off`.

### API

```bash
# Kunin ang mga setting ng compression
curl http://localhost:20128/api/settings/compression

# I-update ang mga setting ng compression
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# I-preview ang isang partikular na RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Ilista ang mga RTK filter pack
curl http://localhost:20128/api/context/rtk/filters

# Direktang subukan ang RTK gamit ang opsyonal na command metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Ano ang Pinoprotektahan

**Palaging pinapanatili** ng compression engine ang:

- ✅ Mga code block (fenced at inline)
- ✅ Mga URL at file path
- ✅ Mga JSON structure at structured data
- ✅ Mga identifier at protektadong technical token
- ✅ Mga mathematical expression
- ✅ Mga depinisyon ng tool/function call
- ✅ Mga system prompt (sa lite mode)

Nire-redact ng RTK raw-output recovery ang mga karaniwang API key, bearer token, Slack token, AWS access key,
password, token, at secret bago i-persist ang anumang bagay.

---

## Mga Istatistika ng Compression

Ang bawat na-compress na request ay may kasamang mga istatistika sa mga server log:

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

## Roadmap ng mga Yugto

| Yugto    | Mga Mode                                                                                                                                                  | Katayuan    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Yugto 1  | Off, Lite                                                                                                                                                 | ✅ Inilabas |
| Yugto 2  | Standard, Aggressive, Ultra                                                                                                                               | ✅ Inilabas |
| Yugto 3  | RTK, Stacked, Compression Combos                                                                                                                          | ✅ Inilabas |
| Yugto 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                               | ✅ Inilabas |
| Yugto 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` sa `PUT /api/settings/compression`) + mga kontrol sa mode/patakaran ng dashboard | ✅ Inilabas |

---

## Mga Pagkilala

Ang mga panuntunan sa compression ng Standard mode ay hango sa **[Caveman](https://github.com/JuliusBrussee/caveman)** ni **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — ang sumikat na proyektong "why use many token when few token do trick." Iniulat ng Caveman ang `~75%` na mas kaunting output token, `65%` na average na pagtitipid sa output sa benchmark, `22-87%` na saklaw ng output, at isang `~46%` na tool para sa input compression.

Ang RTK mode ay hango sa **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** ng **[RTK AI](https://github.com/rtk-ai)** — ang high-performance na proyekto sa compression ng command output para sa terminal, build, test, git, at pag-filter ng tool output. Iniulat ng RTK ang `60-90%` na pagtitipid, kung saan makikita sa sample session ng README nito na `~80%` ang natipid.

---

## Mga Advanced na Compression System

Bukod sa 7 mode na inilarawan sa itaas (tumatanggap din ang source ng mga mode na `codex-responses` at
`omniglyph`, na hindi saklaw ng gabay na ito), tinatalakay ng mga seksyon sa ibaba ang mga feature
na gumagana sa loob o kasabay ng mga mode na iyon: ang Tool Result Compression at Progressive Aging
ay ang mga hakbang 1 at 2 ng aggressive engine (Aggressive mode at isang `aggressive` na hakbang ng
stacked pipeline), ang Stacked Pipeline ang paraan kung paano pinapatakbo ang Stacked mode, ibinababa
ng Cache-Aware Compression ang `aggressive` at `ultra` sa `standard` para sa mga caching provider habang
naka-on ang compression, at ang Caveman Output Mode at Output Styles ay mga opsyonal na system-prompt instruction,
na naka-off bilang default, na humuhubog sa output ng modelo sa halip na i-compress ang request.

### Cache-Aware Compression

Sinusuportahan ng ilang provider (tulad ng Anthropic na may prompt caching) ang **prompt caching**,
na nagbibigay-daan sa kanilang i-cache ang mga bahagi ng prompt upang mabawasan ang gastos at latency. Kapag
naka-enable ang caching, maaari talagang **makasama** sa performance ang aggressive compression
dahil binabago nito ang mga naka-cache na token, kaya nawawalan ng bisa ang cache.

Nilulutas ito ng `cachingAware.ts` module sa pamamagitan ng **pagtukoy sa caching context** at
**pag-aangkop ng compression strategy** nang naaayon.

#### Paano ito gumagana

1. **Tukuyin ang caching context** — Sina-scan ang request body para sa mga `cache_control` marker
2. **Kilalanin ang mga caching provider** — Sinusuri kung sinusuportahan ng target provider ang caching
3. **Iangkop ang strategy** — Ibinababa ang `aggressive`/`ultra` sa `standard` para sa mga caching provider
4. **Laktawan ang system prompt** — Karaniwang naka-cache ang mga system prompt, kaya huwag i-compress ang mga ito

Nagbabalik din ang strategy helper ng `deterministicOnly` flag, ngunit strategy lamang ang ginagamit ng plan builder
— walang downstream na nagbabasa sa flag sa kasalukuyan.

#### Halimbawa ng code

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kailan gagamitin

**Palaging naka-on** ang cache-aware compression — walang kailangang configuration. Gumagana ito kapag
naka-on ang compression at sinusuportahan ng target provider ang prompt caching (Anthropic, OpenAI,
atbp.); hindi kinakailangan ang mga tahasang `cache_control` marker — sapat na ang isang caching provider
upang ma-trigger ang pagbaba ng mode, at hindi ito kailanman natitrigger ng mga marker lamang (ginagamit ang marker detection para sa cache
telemetry, hindi para sa pagpapasya sa strategy).

### Progressive Aging

Naiipon sa mahahabang pag-uusap ang maraming message turn, ngunit nagiging hindi gaanong
mahalaga ang mga mas lumang turn. **Unti-unting pinapasimple ang mga message batay sa layo ng turn**
ng `progressiveAging.ts` module (sinusukat ang layo mula sa dulo ng pag-uusap). Gamit ang mga default
na kasama sa release (`verbatim: 2, light: 2, moderate: 3`):

- **Huling 2 turn (distansya ≤ 2)**: Pinananatiling verbatim
- **Distansya 3**: Caveman compression (pag-aalis ng filler)
- **Distansya 4+**: Binubuod ang mga mensahe ng assistant; nililimitahan ang mga mensahe ng user sa kanilang unang
  linya, hanggang 120 character; hindi binabago ang ibang role. Ang mga system prompt, mga mensaheng na-aging na,
  at ang pinakabagong mensahe ng user ay palaging pinananatiling verbatim anuman ang distansya.
  Walang ganap na inaalis, at hindi maaabot ang `light`
  band gamit ang mga kasamang default (`light` ay katumbas ng `verbatim`).

#### Halimbawa ng code

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 pang turn ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // huling 3 turn: verbatim
  light: 8, // distansya <= 8: lite compression
  moderate: 20, // distansya <= 20: caveman compression
  fullSummary: 5, // kinakailangan ng type, hindi binabasa ng banding code
  // distansya > 20: binubuod (assistant) / pinananatili ang unang linya (user)
});

// saved = bilang ng mga token na natipid
```

#### Kailan gagamitin

Ang progressive aging ay **palaging naka-on** para sa `aggressive` mode — ito ang hakbang 2 ng
`compressAggressive()`. Hindi ito pinapatakbo ng Ultra mode. Partikular itong epektibo para sa:

- Mga matagalang coding session
- Mga pag-uusap na tumatagal nang maraming araw
- Mga agentic workflow na may maraming tool call

### Caveman Output Mode

Nagdaragdag ang caveman output mode ng **mga tagubilin sa system prompt** na humihiling sa mismong model na
magbigay ng maikling output — hinihiling ng `lite` level ang maiikling sagot na nagpapanatili ng mga kumpletong pangungusap, hinihiling ng `full`
na "sumagot nang maikli tulad ng matalinong caveman", at hinihiling ng `ultra` ang telegraphic na output;
humihiling lamang ang mga tagubilin, hindi nila ito magagarantiya. Natatanggap ng mga request ang mga ito sa pamamagitan ng
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
nireresolba muna ng `open-sse/handlers/chatCore.ts` ang selection gamit ang back-compat shim
(`resolveOutputStyleSelection()` sa
`open-sse/services/compression/outputStyles/backCompat.ts`), na, habang walang laman ang `outputStyles`,
ay nagmamapa ng naka-enable na `cavemanOutputMode` sa `terse-prose` output style sa
`cavemanOutputMode.intensity` (tingnan ang Back-compat sa ibaba); ginagamit nang walang pagbabago ang isang
hindi bakanteng `outputStyles` selection, at wala nang epekto ang `cavemanOutputMode.enabled` at `intensity`,
habang nalalapat pa rin ang `autoClarity` toggle nito. Nilalaman ng `outputMode.ts` ang
mga teksto ng tagubilin (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), ang content bypass, at ang
placement helper na ginagamit ng injection; walang production caller ang sarili nitong `applyCavemanOutputMode()` injector.

#### Paano ito gumagana

Hindi kino-compress ng mode na ito ang input. Nagdaragdag ito ng instruction block sa system prompt
(tingnan ang Paano gumagana ang injection sa ibaba), at anumang input compression mode na pinili para sa request
ay tatakbo pa rin pagkatapos nito, sa body na naglalaman na ngayon ng block. Bago ang shared
boundaries clause na nasa dulo ng bawat level, ganito ang nakasaad sa English na `full` level:

> "Sumagot nang maikli tulad ng matalinong caveman. Alisin ang mga article (a/an/the), filler (just/really/basically/actually/simply), pagbati, at pag-aatubili. Puwede ang mga fragment. Gumamit ng maiikling synonym (big hindi extensive, fix hindi implement). Panatilihing eksakto ang lahat ng teknikal na nilalaman, code, error, URL, at identifier."

Partikular itong mahusay para sa:

- Pagbuo ng code (mas maikling output = mas kaunting token)
- Mabilisang Q&A (hindi kailangan ng detalyadong paliwanag)
- Batch processing (i-maximize ang throughput)

#### Kailan gagamitin

Ang caveman output mode ay **opt-in**. Kapag naka-on ang compression (`enabled: true`, ang master toggle
sa pahina ng Compression Settings), i-on ito gamit ang `cavemanOutputMode.enabled`; pinipili ng `intensity`
ang `lite`, `full`, o `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Itinatakda ng **Output Mode** toggle (`outputMode`, na may level sa `outputModeIntensity`)
ng isang compression combo ang parehong switch para sa mga request kung saan nalalapat ang combo na iyon, at isinusulat ito ng
`omniroute_set_compression_engine` MCP tool sa pamamagitan ng boolean na `outputMode`
argument nito. Mas inuuna ang isang hindi bakanteng `outputStyles` selection kaysa sa switch na ito. Sa
dashboard, ini-inject ng pag-enable sa **Terse prose** output style ang parehong block (tingnan ang Output
Styles sa ibaba).

### Output Styles (catalog)

Ang caveman output mode sa itaas ang **legacy single-style path**. Sa Phase 4, ginawa itong
catalog ng mga output style na maaaring pagsama-samahin: `OUTPUT_STYLE_CATALOG` sa
`open-sse/services/compression/outputStyles/catalog.ts`. Ang bawat style ay isang system-prompt
instruction na humihiling sa mismong model ng mas murang output; maaaring sabay-sabay na i-enable ang mga style
at ini-inject ang mga ito ayon sa pagkakasunod-sunod sa catalog.

| Estilo                         | `id`          | Ginagawa nito                                                                                                                                                                                                                                      | Mga wika ng tagubilin                               |
| ------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Maikling prosa                 | `terse-prose` | Alisin ang mga palaman/artikulo/pag-aalinlangan; panatilihing eksakto ang teknikal na nilalaman. Kaparehong teksto ng legacy na caveman output mode (isinangguni, hindi muling isinulat).                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| Mas kaunting code              | `less-code`   | YAGNI ladder: pinakamaliit na gumaganang pagbabago, walang mga abstraction na hindi hiniling.                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| Ponytail (tamad na senior dev) | `ponytail`    | "Ang pinakamahusay na code ay ang code na hindi kailanman isinulat": reuse > rewrite, root cause > symptom, pinakamaikling gumaganang diff.                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| May ADHD ako (aksyon muna)     | `i-have-adhd` | Aksyon muna (command/path/snippet bago ang prosa), may bilang at limitadong mga hakbang, ISANG kongkretong susunod na hakbang, walang preamble/recap/pangwakas. Hinango mula sa [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi       |
| Maikling CJK (文言)            | `terse-cjk`   | `full`/`ultra` na sagot sa Klasikong Tsino (文言); ang `lite` ay humihiling lamang ng maiikling sagot na walang mga function word, magagalang na pananalita, o pagpapalamuti.                                                                      | zh (nililimitahan ayon sa locale, tingnan sa ibaba) |

May tatlong antas ng intensity ang bawat estilo — `lite`, `full`, `ultra` — at nagtatapos ang bawat antas
sa nakabahaging sugnay ng mga hangganan (`SHARED_BOUNDARIES` sa `outputMode.ts`), na
nagpapanatiling eksakto sa mga code block, file path, command, error, at URL. Idinaragdag ng mga teksto ng antas ng
`terse-prose` at `terse-cjk` ang mga identifier sa listahang iyon.

Nililimitahan ang `terse-cjk` sa locale na `zh` sa dalawang lugar. Inililista lamang ng pahina ng Compression Settings
ang row nito kapag Chinese ang wika ng dashboard UI (`zh-CN` o `zh-TW`), at
ini-inject lamang ito ng `applyOutputStyles()` kapag `zh` ang nalutas na wika ng request (tingnan ang Pagpili ng Wika
sa ibaba). Hindi nililinis ng pagtatago sa row ang naka-save na pagpili ng `terse-cjk`:
tumatanggap ang settings API ng anumang style id, at pinananatili ito kapag nagse-save ng ibang mga estilo sa pahina. Sa
oras ng request, ang pagsusuri sa wika ng `applyOutputStyles()` ang tanging locale gate.

#### Paano gumagana ang injection

Nire-resolve ng `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)
ang pagpili laban sa catalog (inaalis ang mga hindi kilalang id at mga estilong hindi tumutugma sa locale,
hindi kailanman nagdudulot ng error; kapag walang nalutas na estilo ang isang pagpili, iniiwang
hindi nabago ang body at nilalaktawan bilang `no_styles`), pinagdurugtong ang mga napiling tagubilin ayon sa pagkakasunod-sunod sa catalog,
idinurugtong ang sugnay ng mga hangganan nang **isang beses** (kasama ang sugnay sa kaligtasan, `SAFETY_BOUNDARIES` o ang
salin nito, kapag napili ang `less-code` o `ponytail`), at sinisimulan ang block gamit ang
iisang idempotency marker (`[OmniRoute Output Styles]`), kaya walang epekto ang muling paglalapat. Kapag
may salin ang nalutas na wika (tingnan ang Pagpili ng Wika sa ibaba), ini-inject ang naka-localize na
tagubilin sa halip na English.

Sa isang body na may hindi bakanteng `messages` array, tumatakbo ang idempotency check bago ang
content bypass: kapag nasa top-level na `system` field na ang `[OmniRoute Output Styles]` marker
(isang string o content-block array) o nasa isang system message na may string na
content, iniiwang hindi nabago ang body bilang `already_applied` at walang isinasagawang keyword check.
Kung hindi, sinusuri ng content bypass (`shouldBypassCavemanOutputMode()` sa
`open-sse/services/compression/outputMode.ts`) ang teksto ng huling tatlong
message, anuman ang role ng mga ito, at nilalaktawan ang mga estilo para sa buong turn kapag tumutugma ang tekstong iyon
sa mga keyword nito para sa seguridad, hindi na mababaligtad na aksyon, o paglilinaw, o sa isang
sequence na sensitibo sa pagkakasunod-sunod: `first`, `then`, `after that`, `before`, `rollback`, o
`backup` na sinusundan sa loob ng 240 character ng `delete`, `drop`, `migrate`, `deploy`, o
`release`. Tumatakbo ang bypass habang naka-on ang **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`, naka-on bilang default); nilalaktawan ang
keyword check kapag in-off ang toggle.

Kapag pinahintulutan ng bypass na magpatuloy ang turn, inilalagay ng `placeSystemInstruction()` (sa parehong file), na
hindi kailanman gumagawa ng bagong `messages[0]`, ang block sa unang makikita nito sa mga sumusunod:

1. Isang nangungunang system message na may string na content: idinaragdag ang block pagkatapos ng teksto nito.
2. Ang top-level na `system` field: idinaragdag ang block pagkatapos ng teksto ng isang string, o
   idinaragdag bilang bagong text block sa isang content-block array.
3. Ang unang kasunod na system message na may string na content: idinaragdag ang block pagkatapos ng
   teksto nito.
4. Wala sa mga nasa itaas: inilalagay ang block sa isang bagong system message sa dulo ng `messages`.

Sa isang body na walang `messages` array (o may bakanteng array), walang tumatakbong content bypass at
hindi kinokonsulta ang top-level na `system` field. Idinaragdag ang block pagkatapos ng teksto ng isang
string na `instructions` field, maliban kung naglalaman na ang field na iyon ng
`[OmniRoute Output Styles]` marker, kung saan iniiwang hindi nabago ang body bilang
`already_applied`. Kapag walang string na `instructions` field ang body ngunit may `input`
(isang string o array), nagiging `instructions` ang block, na pinapalitan ang anumang non-string value
na dating laman ng field na iyon. Ang body na walang string na `instructions` field at wala ring string o array
na `input` ay iniiwang hindi nabago at nilalaktawan bilang `no_messages`.

#### Paano i-enable

Sa dashboard: **Compression Context → Compression Settings**
(`/dashboard/context/settings`), seksyong Output styles: isang row bawat style na may on/off
toggle at level selector. Ini-inject ang mga style habang naka-on ang compression mismo (ang
master toggle ng page, `enabled`). Ang toggle na **Auto-Clarity Bypass** ay nasa page na
**Caveman** (`/dashboard/context/caveman`), sa card nitong **Output Mode**. Sa programmatic
na paraan, pinapanatili ng compression config ang pagpili bilang:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Backward compatibility: habang walang laman ang `outputStyles`, ang legacy na setting na
`cavemanOutputMode.enabled` ay nagmamapa sa `terse-prose` sa
`cavemanOutputMode.intensity`. Pagkatapos, nagsisimula ang block sa marker na
`[OmniRoute Output Styles]`, samantalang isinulat ng legacy na injector na
`applyCavemanOutputMode()` ang `[OmniRoute Caveman Output Mode]`. Sa ibaba ng marker,
tumutugma ang teksto sa legacy na injection sa en, pt-BR, es, de, fr, it, ru, id at vi;
sa ja at zh, mayroon itong isang karagdagang space bago ang boundaries clause.
Isinasalin ang `terse-prose` sa pt-BR, es, de, fr, it, ru, zh, ja, id at vi, kaya ang
isang request na ang na-resolve na wika ay `hu` ay makakatanggap ng English na teksto,
samantalang ginamit ng legacy injector ang Hungarian nitong teksto.

Pagpili ng wika ng output style (`resolveOutputStyleLanguage()` sa
`outputStyles/apply.ts`): kapag naka-on ang `languageConfig.enabled`, nagsa-sample ang
`autoDetect` ng pinakabagong user message sa array na `messages` ng request na may teksto
(string content, o ang `text` ng mga content part nito) at pinapatakbo rito ang detector
ng Caveman engine (`detectCompressionLanguage()`). Nagbabalik ang detector ng `zh` para
sa tekstong may mga Han character at walang kana; kung hindi, ibinabalik nito ang alinman
sa `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` at `id` na may pinakamaraming
tumugmang hint, at `en` kapag walang tumugma — ang tekstong hindi nito ma-classify ay
nakakakuha ng English, hindi kailanman ng `defaultLanguage`, at hindi kailanman nade-detect
ang `vi` kahit na may kasamang `vi` na teksto ang mga style. Pinapanatili ng isang
Responses API body ang mga turn nito sa `input`, na hindi sina-sample, kaya ginagamit
nito ang `defaultLanguage`, at pagkatapos ay English. Kapag walang user message sa
`messages` na may teksto, o kapag naka-off ang `autoDetect`, inilalapat ang
`defaultLanguage`, at pagkatapos ay English. Kapag naka-off ang `languageConfig.enabled`,
English ang wika — maliban kung may compression combo na inilalapat sa request (isang
combo na nakatalaga sa routing combo ng request, o ang default compression combo na
ginagamit ng chatCore bilang fallback para sa built-in stacked pipeline): kapag
inilapat ang isang combo, ino-on nito ang `languageConfig.enabled` para sa request na
iyon at itinatakda ang `defaultLanguage` mula sa mga language pack ng combo (ang
naka-save na value kung kabilang ito sa mga pack ng combo, kung hindi ay ang unang pack
ng combo, na nagde-default sa `en`), habang nananatiling naaangkop ang naka-save na
`autoDetect` (naka-on bilang default). Iba ang paraan ng pagpili ng Caveman input engine
sa wika ng rule pack nito — bawat text part at, kapag naka-off ang auto-detect,
nakadepende sa `enabledPacks`.

Ang style × language matrix ay naka-pin ng
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: kailangan ng bawat catalog
style ng entry sa `BASELINE_LANGUAGES` ng test; ang style na hindi locale-gated ay dapat
may kasamang salin sa pt-BR (hindi saklaw ng panuntunang ito ang locale-gated na
`terse-cjk`) maliban kung nakalista ito sa `KNOWN_ENGLISH_ONLY`, na maaari lamang
maglaman ng mga style na walang anumang salin — babagsak sa test ang isang nakalistang
style na may anumang salin; at babagsak sa test ang isang style kapag nawala rito ang
isang wikang nakalista sa entry nito sa `BASELINE_LANGUAGES`. Para magdagdag ng style,
tingnan ang [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression ng Resulta ng Tool

Kino-compress ng `compressToolResult()` sa
`open-sse/services/compression/toolResultCompressor.ts` ang text ng resulta ng tool gamit
ang **5 strategy**. Sinusubukan nito ang mga iyon sa ganitong pagkakasunod-sunod, at ang
unang naka-enable na strategy na ang check ay tumugma sa content ang magpapasya sa
resulta:

1. **`fileContent`**: nilalaman na may 3 o higit pang linya kung saan ang kahit isang linya, kapag
   binalewala ang panimulang indentation, ay nagsisimula sa `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` o `return ` (ang keyword na sinusundan ng espasyo), o sa `if`,
   `for` o `while` na sinusundan ng `(` o ` (`, ay pinananatili ang unang 20 at huling 5 linya nito, na
   may marka sa inalis na gitnang bahagi.
2. **`grepSearch`**: nilalamang may kahit isang linya sa anyong `<path>:<digits>:`,
   kung saan walang whitespace ang teksto bago ang unang colon, ay nagpapanatili lamang sa mga linyang iyon, hanggang
   30, na sinusundan ng bilang ng anumang karagdagang tugma at ng listahan ng mga tumugmang file;
   inaalis ang lahat ng iba pang linya. Sapat na ang isang ganitong linya upang ma-trigger ang estratehiya, kaya
   kabilang din ang isang linya ng log na nagsisimula sa timestamp gaya ng `12:30:45`.
3. **`shellOutput`**: ang output na naglalaman ng ANSI CSI sequence (`ESC[` na sinusundan ng mga digit o
   semicolon at pagkatapos ay isang titik, gaya sa mga color code) o ng `$` na sinusundan ng whitespace
   saanman sa teksto ay inaalisan ng mga sequence na iyon (pinananatili ang ibang escape, gaya ng `ESC[?25l` o
   isang OSC window-title sequence) at pinananatili ang huling 50 linya nito, habang pinagsasama ang magkakasunod
   na nauulit na linya. Dahil isinasagawa ang pagsusuring ito bago ang `json` at `errorMessage`,
   ang JSON o error output na naglalaman ng ganitong `$` ay hindi kailanman nakakarating sa mga iyon habang
   naka-on ang `shellOutput`.
4. **`json`**: ang isang JSON payload na lampas 2,000 character na nagsisimula sa `{` o `[` (pagkatapos
   ng opsyonal na whitespace) at matagumpay na napa-parse ay binubuod: ang isang array na may higit sa 7 item ay nagpapanatili
   sa unang 5 at huling 2 item nito at sa kabuuang bilang nito, at ang isang object ay nagpapanatili sa unang 20
   key nito, habang ang bawat nested object o array value ay pinapalitan ng `{…N keys}` placeholder
   (para sa isang array, ang N ay ang haba nito) at isang `_remaining_<N>_keys` marker na nagbibilang sa mga key
   na inalis pagkalampas sa unang 20. Buong kinokopya ang mga scalar value, kaya ang isang object na may 20 key
   o mas kaunti at walang nested value ay nire-re-indent lamang — nadaragdagan ng mga character ang isang minified na object
   at nananatili itong hindi nabago.
5. **`errorMessage`**: ang output na naglalaman, saanman at sa anumang letter case, ng `error:`,
   `error ` (ang salitang sinusundan ng espasyo, gaya sa `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` o `traceback` ay nagpapanatili sa unang linya nito, sa
   susunod na 10 linya at sa huling 3, na may `… [N frames elided] …` marker bilang kapalit ng
   mga linya sa pagitan ng mga iyon. Lumalabas lamang ang marker kapag higit sa 13 linya ang sumusunod sa unang
   linya, kaya hindi pinaiikli ang error output na may 14 na linya o mas kaunti (sa 12 o 13 linya, inuulit ng
   huling 3 ang mga linyang pinanatili na).

Pagkatapos tumugma ang isang estratehiya, kahit isa na walang natipid, hindi na
sinusubukan ang mga kasunod na estratehiya. Kapag walang natipid na tinatayang token ang tumugmang estratehiya (haba ÷ 4, ni-round up) —
halimbawa, isang file na kahawig ng code na may 25 linya o mas kaunti, o isang JSON array na lampas 2,000
character na may 7 item o mas kaunti — pinananatili ng aggressive engine ang orihinal na tool
result: parehong pinananatili ng mga caller (`compressAggressive()` at `compressAnthropicToolResultBlock()`)
ang orihinal kapag 0 o mas mababa ang `saved`, habang ibinabalik pa rin ng `compressToolResult()` mismo
ang output ng estratehiyang iyon. Hindi ang hakbang para sa tool result ang huling pasya: maaari pa ring paikliin ng
fallback summarizer ng engine ang isang `tool` o `function` message na mas mahaba sa
8,192 character (`maxTokensPerMessage`, 2,048, times 4).

#### Kailan gagamitin

Ang tool result compression ay hakbang 1 ng aggressive engine (`compressAggressive()` sa
`open-sse/services/compression/aggressive.ts`), kaya gumagana ito sa Aggressive mode at sa isang
`aggressive` na hakbang ng stacked pipeline. Kino-compress nito ang mga `tool` at `function`
message na nasa anyong OpenAI at ang teksto sa loob ng mga Anthropic `tool_result` block. May sariling
switch ang bawat estratehiya sa ilalim ng `aggressive.toolStrategies`, at naka-on ang lahat bilang default. Sa dashboard, ang
mga switch ay nasa **Advanced** view ng pahina ng Caveman habang naka-on ang compression at
Aggressive ang default mode.

### Stacked Pipeline

Pinapatakbo ng stacked mode ang **maraming engine nang sunod-sunod** — karaniwang RTK muna
(60-90% na pagtitipid sa tool output), pagkatapos ay Caveman sa natitirang teksto (~46% na pagtitipid
sa input). Kapag pinagsama, iyon ang **78-95% na kwalipikadong saklaw** (tingnan ang Upstream Savings Math
sa itaas): ang `1 - (1 - 0.60..0.90) × (1 - 0.46)` ay may average na ≈89%.

#### Paano ito gumagana

```
Input (1000 token)
  → RTK (filter na isinasaalang-alang ang command) → 200 token
    → Caveman (pag-aalis ng filler) → 108 token
  → Output (108 token, ~89% na pagtitipid)
```

#### Kailan gagamitin

Gamitin ang stacked mode para sa:

- Mga workflow na maraming tool (agentic coding, pananaliksik)
- Batch processing na sensitibo sa gastos
- Kapag kailangan mo ng pinakamataas na pagtitipid sa token

Kino-configure ang mga stacked pipeline sa pamamagitan ng global na `stackedPipeline` compression
setting, o sa pamamagitan ng pinangalanang compression combo na itinalaga sa isang routing combo (tingnan ang
Per-Combo Override sa itaas) — hindi sa pamamagitan ng isang auto-combo `modePack` (ina-adjust lamang ng field na iyon
ang timbang ng pagpili ng auto-combo model, at hindi wastong pangalan ng pack ang `stacked`).

---

## Mga Override ng Compression sa Bawat Combo

Maaari mong i-override ang pandaigdigang compression mode **sa bawat combo** upang mas pinong maiangkop ang gawi
para sa iba't ibang gamit:

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

Kapaki-pakinabang ito para sa:

- **Mga coding combo**: Gamitin ang `aggressive` mode para sa mahahabang session
- **Mga combo para sa mabilisang tanong at sagot**: Gamitin ang `lite` mode para sa mabilis na mga tugon
- **Mga combo na maraming ginagamit na tool**: Gamitin ang `stacked` mode para sa pinakamalaking pagtitipid
- **Mga production combo**: huwag paganahin ang override para sa mga caching provider — awtomatikong ibinababa ng palaging naka-enable
  na cache-aware na pagsasaayos ang `aggressive`/`ultra` sa `standard`
  (walang mapipiling `cache-aware` mode)

---

## Tingnan Din

- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Mga environment variable para sa compression
- [Gabay sa Arkitektura](../architecture/ARCHITECTURE.md) — Mga internal na detalye ng compression pipeline
- [Gabay ng Gumagamit](../guides/USER_GUIDE.md) — Pagsisimula sa compression
- [RTK Compression](./RTK_COMPRESSION.md) — Mga RTK filter, trust model, verify gate, at pag-recover ng raw output
- [Mga Compression Engine](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, mga API, MCP, at dashboard
- [Format ng Mga Panuntunan sa Compression](./COMPRESSION_RULES_FORMAT.md) — Format ng JSON rule-pack
- [Mga Language Pack para sa Compression](./COMPRESSION_LANGUAGE_PACKS.md) — Mga panuntunan ng Caveman na partikular sa wika
