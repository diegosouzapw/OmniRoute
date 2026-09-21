# 🗜️ Prompt Compression Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Awtomatikong makatipid ng 15-95% sa kwalipikadong konteksto. Para sa mabilisang pangkalahatang-ideya, tingnan ang [seksyon ng README tungkol sa Compression](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pangkalahatang-ideya

Nagpapatupad ang OmniRoute ng modular na pipeline para sa pag-compress ng prompt na tumatakbo nang **proaktibo** bago makarating ang mga request sa mga upstream provider. Ibig sabihin, malinaw at awtomatikong nangyayari ang pagtitipid mo sa token — walang kailangang baguhin sa workflow mo.

```
Request ng Client
  → Tagapili ng Strategy sa Compression
    → May combo override? → Gamitin ang setting ng combo
    → Naabot ang threshold ng auto-trigger? → Gamitin ang auto mode
    → Default mode? → Gamitin ang pangkalahatang setting
    → Naka-off? → Laktawan ang compression
  → Napiling Compression Mode
    → Off: Walang compression
    → Lite: Ligtas na paglilinis ng whitespace/formatting (~15%)
    → Standard: Pag-aalis ng mga salitang palaman na parang pananalita ng taong-kuweba (~30%)
    → Aggressive: Pagpapatanda ng history + pagbubuod (~50%)
    → Ultra: Heuristic pruning + pagbabawas ng code block (~75%)
    → RTK: Pag-filter ng terminal/tool output na isinasaalang-alang ang command (60-90% upstream na saklaw)
    → Stacked: Nakaayos na multi-engine pipeline, karaniwang RTK muna bago ang Caveman (78-95% kwalipikadong saklaw)
  → Na-compress na Request → Provider
```

---

## Mga Compression Mode

### Off

Walang inilalapat na compression. Dumadaan ang lahat ng mensahe nang walang pagbabago.

### Lite Mode (~15% tipid, <1ms latency)

Ang pinakaligtas na mode — walang semantikong pagbabago, paglilinis lamang ng formatting:

| Teknik                   | Paglalarawan                                                         |
| ------------------------ | -------------------------------------------------------------------- |
| `collapseWhitespace`     | Pagsamahin ang magkakasunod na blangkong linya at mga puwang sa dulo |
| `dedupSystemPrompt`      | Alisin ang mga duplicate na system message                           |
| `compressToolResults`    | I-compress ang mahahabang output ng tool/function                    |
| `removeRedundantContent` | Alisin ang mga paulit-ulit na tagubilin                              |
| `replaceImageUrls`       | Paikliin ang mga base64 image data URI                               |

**Pinakamainam para sa:** Palaging naka-on na paggamit at mga workflow na kritikal ang kaligtasan.

### Standard Mode (~30% tipid)

Hango sa [Caveman](https://github.com/JuliusBrussee/caveman) — nag-aalis ng mga salitang palaman at maligoy na pananalita habang pinananatili ang kahulugan:

- Nag-aalis ng mga salitang palaman ("please", "I think", "basically", "actually")
- Pinaiikli ang maliligoy na parirala ("in order to" → "to", "as a result of" → "because")
- Nag-aalis ng magalang na pag-aatubili ("Would you mind...", "If you could possibly...")
- 30+ regex rule na iniangkop para sa mga coding prompt

**Pinakamainam para sa:** Pang-araw-araw na coding workflow at mga team na nagtitipid sa gastos.

### Aggressive Mode (~50% tipid)

Matalinong pamamahala ng history para sa mahahabang session:

- **Pagpapatanda ng Mensahe** — unti-unting kino-compress ang mas matatandang mensahe
- **Pagbubuod ng Tool Result** — pinapalitan ng mga buod ang mahahabang tool output
- **Mga Pananggalang sa Integridad ng Estruktura** — tinitiyak na nananatiling pare-pareho ang mga pares ng `tool_use` + `tool_result`
- **Kamalayan sa Context Window** — sumusunod sa mga token limit ng bawat model

**Pinakamainam para sa:** Mahahabang debugging session at malalaking codebase.

### Ultra Mode (~75% tipid)

Pinakamataas na compression para sa mga sitwasyong kritikal ang token:

- **Heuristic Pruning** — nag-aalis ng mga mensaheng mas mababa sa threshold ng kaugnayan
- **Pagbabawas ng Code Block** — kino-compress ang mga paulit-ulit na halimbawa ng code
- **Binary Search Truncation** — hinahanap ang pinakamainam na punto ng pagputol para sa context window
- Kasama ang lahat ng feature ng Aggressive mode

**Pinakamainam para sa:** Kapag paulit-ulit mong naaabot ang mga limitasyon ng konteksto.

### RTK Mode (60-90% upstream na saklaw)

In-optimize ang RTK mode para sa mahahabang tool output na lumalabas sa mga coding-agent session:

- Tinutukoy ang mga klase ng command/output gaya ng `git status`, `git diff`, `git log`, mga test runner,
  TypeScript/Vite/Webpack build, ESLint/Biome/Prettier, npm audit/install, Docker log, infra
  output, at generic na shell output
- Inilalapat ang mga JSON filter pack mula sa `open-sse/services/compression/engines/rtk/filters/`
- Nag-i-import ng mga filter ng RTK TOML schema v1 mula sa mga `filters.toml` file ng proyekto o pandaigdigang lokasyon, na may inline-test
  validation at trust-gating para sa mga project file
- May kasamang 49 na built-in filter na may mga inline verify sample
- Nag-aalis ng mga ANSI control sequence, progress bar, paulit-ulit na linya, at ingay na hindi nangangailangan ng aksyon
- Pinananatili ang mga failure, error, warning, binagong file, buod, at hulihan ng mahabang output
- Sinusuportahan ang mga project filter na may trust-gating, mga global filter, at opsyonal na pagbawi ng na-redact na raw output

**Pinakamainam para sa:** Mga agent session na may mga transcript ng shell, build, test, git, grep, at file output.

### Stacked Mode (78-95% kwalipikadong saklaw)

Nagpapatakbo ang Stacked mode ng maraming compression engine sa isang deterministikong pagkakasunod-sunod. Ang default na pipeline ay:

```txt
RTK -> Caveman
```

Pinananatili muna ng pagkakasunod-sunod na iyon na compact ang terminal/tool output, saka inilalapat ang semantikong pagpapaikli ng Caveman sa
natitirang natural-language prompt. Maaaring i-configure ang mga stacked pipeline sa pangkalahatan o sa pamamagitan ng
mga compression combo na itinalaga sa mga routing combo.

**Pinakamainam para sa:** Pinaghalong konteksto na may malalaking tool log kasama ang mga tagubilin ng tao o mga buod ng assistant.

---

## Matematika ng Pagtitipid sa Upstream

Itinatala ng OmniRoute ang pagtitipid mula sa compression gamit ang dalawang pinagmulan: mga benchmark ng upstream na proyekto at
ang sariling komposisyon ng engine ng OmniRoute.

| Pinagmulan | Numero mula sa upstream README na ginamit dito                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman    | `~75%` mas kaunting output token, `65%` average na pagtitipid sa output ng benchmark, saklaw na `22-87%`, at tool na may `~46%` input compression |
| RTK        | `60-90%` na pagtitipid sa command output; halimbawang session na `~118,000 -> ~23,900` token, o `79.7%` ang natipid (`~80%`)                      |

Para sa mga nag-o-overlap na tool/context payload, pinagsasalansan ng default na combo ng OmniRoute ang mga engine:

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
na average, `~75%` na pangunahing bilang, saklaw na `22-87%`). Nakadepende ang kabuuang pagtitipid sa billing sa kombinasyon ng iyong prompt at output.

### Ano talaga ang ibig sabihin ng "eligible"

Totoo ang pangunahing saklaw na 15-95%, ngunit nalalapat lamang ito sa **redundant o verbose** na content — mga inuulit na
error line, build log na paulit-ulit na naglalabas ng parehong warning, o napakalaking `grep`/file-read dump. **Hindi**
ito nangangahulugang ganoon kalaki ang matitipid sa bawat request.

Empirikong napatunayan (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): ang isang
`stacked` (RTK + Caveman) run sa isang Anthropic-shape na `tool_result` block na naglalaman ng 300 magkakaparehong
error line ay nakapagdulot ng **95.93% na pagtitipid sa token / 96.26% na pagtitipid sa character** — tugmang-tugma sa inanunsyong
saklaw. Ngunit kapag pinatakbo ang parehong pipeline sa normal at hindi redundant na tool output (isang malinis na listahan ng mga tugma mula sa `grep`,
isang maikling pagbasa ng file, o karaniwang conversational text), wasto itong nagdudulot ng **halos zero na pagtitipid**, dahil
walang paulit-ulit na content na maaalis at hindi pinapayagan ng `validateCompression()` (`validation.ts`) na ipadala ang isang
rewrite na magtatanggal o magbabago ng mga code block, URL, heading, bersyon, o ALL-CAPS na constant identifier.

Ito ay inaasahan at ligtas na gawi, hindi bug: ang coding session na kadalasang nagbabasa/nag-`grep` ng malilinis na file ay
makakakita ng katamtamang kabuuang pagtitipid kahit ganap na naka-enable ang compression, samantalang ang session na makaranas ng paulit-ulit na
failure loop o napakadaldal na linter ay makakakita ng buong saklaw na 78-95% sa naturang traffic. Huwag gamitin ang mababang
aggregate na porsiyento ng pagtitipid ng isang session bilang ebidensiyang mali ang pagkaka-configure ng compression — tingnan muna kung
talagang redundant ang pinagbabatayang tool output.

---

## Biswalisasyon ng Pagtitipid sa Token

```
Walang compression: 47K token ang ipinadala sa LLM
Gamit ang Lite:      40K token ang ipinadala       (15% ang natipid — ligtas, palaging naka-on)
Gamit ang Standard:  33K token ang ipinadala       (30% ang natipid — mga tuntunin ng caveman-speak)
Gamit ang Aggressive: 24K token ang ipinadala      (50% ang natipid — aging + summarization)
Gamit ang Ultra:     12K token ang ipinadala       (75% ang natipid — heuristic pruning)
Gamit ang RTK:       19K-5K token ang ipinadala    (60-90% ang natipid sa command/tool output)
Gamit ang Stacked:   10K-2.5K token ang ipinadala  (78-95% na saklaw para sa eligible na RTK+Caveman)
```

---

## Configuration

### Dashboard

Pumunta sa `Dashboard → Context & Cache`:

- **Caveman** — pagpili ng mode, mga language pack, preview, at mga pandaigdigang default
- **RTK** — preview ng command filter, mga setting sa kaligtasan ng RTK, at catalog ng filter
- **Compression Combos** — mga pinangalanang pipeline ng engine na itinalaga sa mga routing combo
- **Auto-Trigger Threshold** — awtomatikong paganahin ang compression kapag lumampas sa threshold ang bilang ng token

### Override Bawat Combo

Sa `Dashboard → Context & Cache → Compression Combos`, magtalaga ng compression combo sa isang routing
combo:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Nagbibigay-daan ito sa iyong gumamit ng stacked compression sa mga libre/coding provider habang
pinananatili ang lite mode sa mga bayad na subscription.

Ang pagtatalagang ito ng "Override Bawat Combo" ay ibang kontrol sa override ng **compression mode ng
routing combo** (Default/Off/Lite/Standard/Aggressive/Ultra) — hindi pumipili ang override na iyon ng
pinangalanang pipeline ng compression combo; itinatakda lamang nito ang field na `compressionMode`
na kinokonsulta ng `resolveCompressionPlan`. Maaari itong itakda sa combo card
(`Dashboard → Combos`) o, simula #6760, bawat routing combo sa listahang "Assign to routing" sa
`Dashboard → Context & Cache → Compression Combos`, sa tabi mismo ng checkbox para sa pagtatalaga ng
pipeline na nakadokumento sa itaas. Ang parehong interface ay nagse-save gamit ang iisang
`PUT /api/combos/{id}` endpoint.

### Override Bawat Request

Ipadala ang request header na `x-omniroute-compression` upang i-override ang compression plan para sa
isang request. Ito ang may pinakamataas na precedence — nangingibabaw ito sa override ng routing
combo, aktibong profile, auto-trigger, at Default ng panel. Binabalewala ang mga hindi kilalang value
(hindi kailanman tinatanggihan ang request), at kontrolado pa rin ng pandaigdigang master switch ang
lahat: kapag naka-off ang compression sa buong sistema, hindi ito maaaring i-on ng header. Mga value:

| Value         | Epekto                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| `off`         | Walang compression para sa request na ito.                                                                 |
| `default`     | Ang Default profile na nagmula sa panel (binabalewala ang aktibong profile).                               |
| `engine:<id>` | Isang engine kapag naka-enable, hal. `engine:rtk`.                                                         |
| `<combo>`     | Isang pinangalanang combo, unang itinutugma ayon sa pangalan (case-insensitive), pagkatapos ay ayon sa id. |

Ibabalik ang inilapat na plan sa response header na
`X-OmniRoute-Compression: <mode>; source=<source>`, kung saan ang `<source>` ay isa sa
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, o `off`.

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

**Palaging pinapanatili ng** compression engine ang:

- ✅ Mga code block (fenced at inline)
- ✅ Mga URL at file path
- ✅ Mga JSON structure at structured data
- ✅ Mga identifier at protektadong technical token
- ✅ Mga mathematical expression
- ✅ Mga definition ng tool/function call
- ✅ Mga system prompt (sa lite mode)

Bago i-persist ang anumang bagay, nire-redact ng RTK raw-output recovery ang mga karaniwang API key, bearer token, Slack token, AWS access key,
password, token, at secret.

---

## Mga Istatistika ng Compression

Kasama sa bawat na-compress na request ang mga istatistika sa mga server log:

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

## Roadmap ng mga Phase

| Phase    | Mga Mode                                                                                                                                               | Katayuan       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| Phase 1  | Off, Lite                                                                                                                                              | ✅ Inilabas na |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                            | ✅ Inilabas na |
| Phase 3  | RTK, Stacked, Compression Combos                                                                                                                       | ✅ Inilabas na |
| Phase 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                            | ✅ Inilabas na |
| Phase 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` sa `PUT /api/settings/compression`) + mga kontrol sa mode/policy ng dashboard | ✅ Inilabas na |

---

## Mga Pagkilala

Ang mga compression rule ng Standard mode ay hango sa **[Caveman](https://github.com/JuliusBrussee/caveman)** ni **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — ang sumikat na proyektong "bakit gagamit ng maraming token kung sapat na ang kaunti." Iniulat ng Caveman ang `~75%` na mas kaunting output token, `65%` na average na pagtitipid sa output sa benchmark, `22-87%` na saklaw ng output, at isang tool na may `~46%` input compression.

Ang RTK mode ay hango sa **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** ng **[RTK AI](https://github.com/rtk-ai)** — ang high-performance na proyekto para sa compression ng command output para sa terminal, build, test, git, at pag-filter ng tool output. Iniulat ng RTK ang `60-90%` na pagtitipid, kung saan ipinapakita ng sample session sa README nito na `~80%` ang natipid.

---

## Mga Advanced Compression System

Bukod sa 7 standard mode, kabilang sa OmniRoute ang ilang advanced compression
system na awtomatikong gumagana batay sa konteksto.

### Cache-Aware Compression

Sinusuportahan ng ilang provider (tulad ng Anthropic na may prompt caching) ang **prompt caching**,
na nagbibigay-daan sa kanilang i-cache ang mga bahagi ng prompt upang mabawasan ang gastos at latency. Kapag
naka-enable ang caching, maaari talagang **makasama** sa performance ang aggressive compression
dahil binabago nito ang mga naka-cache na token, kaya nawawalan ng bisa ang cache.

Nilulutas ito ng `cachingAware.ts` module sa pamamagitan ng **pag-detect sa caching context** at
**pag-adjust sa compression strategy** nang naaayon.

#### Paano ito gumagana

1. **I-detect ang caching context** — Sini-scan ang request body para sa mga `cache_control` marker
2. **Tukuyin ang mga caching provider** — Tinitingnan kung sinusuportahan ng target provider ang caching
3. **I-adjust ang strategy** — Ibinababa ang `aggressive`/`ultra` sa `standard` para sa mga caching provider
4. **Laktawan ang system prompt** — Karaniwang naka-cache ang mga system prompt, kaya huwag i-compress ang mga ito
5. **Gumamit ng mga deterministic transformation** — Gumamit lamang ng mga transformation na lumilikha ng consistent na output

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kailan gagamitin

**Palaging naka-on** ang cache-aware compression — walang kinakailangang configuration. Gumagana lamang ito
kapag:

- May mga `cache_control` marker ang request
- Sinusuportahan ng target provider ang prompt caching (Anthropic, OpenAI, atbp.)

### Progressive Aging

Nag-iipon ng maraming message turn ang mahahabang pag-uusap, ngunit nagiging hindi gaanong
relevant ang mga mas lumang turn. **Pinapasimple ng `progressiveAging.ts` module ang mga message batay sa distansya ng turn**:

- **Mga kamakailang turn (0-3)**: Pinananatiling verbatim (kumpletong detalye)
- **Mga katamtamang turn (4-8)**: Lite compression (whitespace, paglilinis ng formatting)
- **Mga lumang turn (9+)**: Caveman compression (pag-aalis ng filler, summarization)
- **Mga napakalumang turn (20+)**: Lubos na sini-summarize o inaalis

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
  verbatim: 3, // Unang 3 turn: verbatim
  light: 8, // Mga turn 4-8: lite compression
  moderate: 20, // Mga turn 9-20: caveman compression
  // Mga turn 21+: matinding summarization
});

// saved = bilang ng mga token na natipid
```

#### Kailan gagamitin

Ang progresibong pagtanda ay **palaging naka-on** para sa mga mode na `aggressive` at `ultra`. Ito ay
partikular na epektibo para sa:

- Mga pangmatagalang coding session
- Mga pag-uusap na tumatagal nang ilang araw
- Mga agentic workflow na may maraming tool call

### Caveman Output Mode

Ang module na `outputMode.ts` ay nag-i-inject ng **mga tagubilin sa system prompt** upang ang
mismong modelo ay gumawa ng compressed at maikling output (istilong "caveman").

#### Paano ito gumagana

Sa halip na i-compress ang input, nagdaragdag ang mode na ito ng system prompt tulad ng:

> "Sumagot gamit ang pinakakaunting salita. Laktawan ang mga pagbati. Gumamit ng maiikling pangungusap."

Partikular itong mahusay para sa:

- Pagbuo ng code (mas maikling output = mas kaunting token)
- Mabilisang Q&A (hindi kailangan ng detalyadong paliwanag)
- Batch processing (i-maximize ang throughput)

#### Kailan gagamitin

Ang Caveman output mode ay **opt-in** — itakda ito sa pamamagitan ng combo config:

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

### Mga Estilo ng Output (catalog)

Ang Caveman output mode sa itaas ay ang **legacy na single-style path**. Ginawang pangkalahatan ito ng Phase 4
bilang catalog ng mga composable na estilo ng output: `OUTPUT_STYLE_CATALOG` sa
`open-sse/services/compression/outputStyles/catalog.ts`. Ang bawat estilo ay isang tagubilin sa system prompt
na nagtutulak sa mismong modelo na gumawa ng mas murang output; maaaring sabay-sabay na paganahin ang mga estilo
at ini-inject ang mga ito ayon sa pagkakasunod-sunod sa catalog.

| Estilo                         | `id`          | Ano ang ginagawa nito                                                                                                                                                                                                                             | Mga wika ng tagubilin                                            |
| ------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Maikling prosa                 | `terse-prose` | Tinatanggal ang mga palaman/artikulo/pag-aalinlangan; pinananatiling eksakto ang teknikal na nilalaman. Kaparehong teksto ng legacy na Caveman output mode (sanggunian lamang, hindi muling isinulat).                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Mas kaunting code              | `less-code`   | YAGNI ladder: pinakamaliit na gumaganang pagbabago, walang hindi hiniling na abstraction.                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Ponytail (tamad na senior dev) | `ponytail`    | "Ang pinakamahusay na code ay ang code na hindi kailanman isinulat": reuse > rewrite, ugat na sanhi > sintomas, pinakamaikling gumaganang diff.                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| May ADHD ako (aksyon muna)     | `i-have-adhd` | Aksyon muna (command/path/snippet bago ang prosa), may bilang at limitadong mga hakbang, ISANG konkretong susunod na hakbang, walang pambungad/buod/pangwakas. Hinango mula sa [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                    |
| Maikling CJK (文言)            | `terse-cjk`   | Napakaikling estilo ng Klasikong Tsino.                                                                                                                                                                                                           | zh (locale-gated: inaalok lamang kapag `zh` ang natukoy na wika) |

May tatlong antas ng intensity ang bawat estilo — `lite`, `full`, `ultra` — at ang bawat antas ay
nagtatapos sa pinagsasaluhang boundaries clause, na nagpapanatili sa mga code block, file path, command,
error string, URL, at identifier nang verbatim.

#### Paano gumagana ang injection

Nire-resolve ng `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ang
pagpili batay sa catalog (inaalis ang mga hindi kilalang id at mga estilong hindi tugma sa locale,
at hindi kailanman itinuturing na error), pinagsasama ang mga napiling tagubilin ayon sa pagkakasunod-sunod
sa catalog, idinaragdag ang boundaries clause nang **isang beses**, at inilalagay ang resulta sa unahan ng
system prompt sa likod ng iisang idempotency marker (`[OmniRoute Output Styles]`) — walang epekto ang
muling pag-apply. Kapag may salin para sa natukoy na wika ng request, ang localized na tagubilin ang
ini-inject sa halip na Ingles.

#### Paano paganahin

Sa dashboard: **Context → Settings → Compression** — isang row bawat estilo na may
on/off toggle at level selector. Sa programmatic na paraan, pinapanatili ng compression config
ang pagpili bilang:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: gumagana pa rin ang legacy na combo setting na `outputMode: "caveman"` at mina-map ito sa
`terse-prose`, byte-identical sa lumang injection sa bawat legacy na wika.

Pagpili ng wika: kapag naka-on ang `languageConfig.enabled`, pinipili ng `autoDetect` ang
wika ng pinakabagong mensahe ng user (kaparehong detector ng mga input engine);
kapag in-off ang `autoDetect`, naka-pin ang `defaultLanguage`. Kapag off → Ingles.

Naka-pin ang style × language matrix ng
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: hindi maaaring i-release ang bagong estilo
nang walang kahit isang salin sa pt-BR (o isang tahasang sinusubaybayang exception), at hindi maaaring
palihim na mawalan ng locale ang isang umiiral na estilo. Upang magdagdag ng estilo, tingnan ang
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Compression ng Resulta ng Tool

Nagbibigay ang module na `toolResultCompressor.ts` ng **5 espesyal na compression strategy**
para sa mga resulta ng tool (mga function call, agent output, resulta ng paghahanap, atbp.):

1. **Compression ng resulta ng paghahanap** — Tinatanggal ang mga paulit-ulit na resulta, pinananatili ang top-N
2. **Compression ng pagbasa ng file** — Pinuputol ang malalaking file, pinananatili ang mga header/import
3. **Compression ng pag-execute ng code** — Pinananatili lamang ang mahahalagang stdout/stderr
4. **Compression ng database query** — Nililimitahan ang mga row, tinatanggal ang mahahabang metadata
5. **Compression ng API response** — Tinatanggal ang mga null field, pinaiikli ang mga array

#### Kailan gagamitin

Ang compression ng resulta ng tool ay **palaging naka-on** kapag may mga tool call. Walang
kailangang configuration.

### Stacked Pipeline

Ang stacked mode ay nagpapatakbo ng **maraming engine nang sunod-sunod** — karaniwang RTK muna
(60-90% na matitipid sa tool output), pagkatapos ay Caveman (karagdagang 30% na matitipid sa
natitirang teksto). Nakakamit nito ang **78-95% kabuuang matitipid**.

#### Paano ito gumagana

```
Input (1000 token)
  → RTK (filter na command-aware) → 200 token
    → Caveman (pag-aalis ng palaman) → 140 token
  → Output (140 token, 86% na matitipid)
```

#### Kailan gagamitin

Gamitin ang stacked mode para sa:

- Mga workflow na maraming tool (agentic coding, pananaliksik)
- Batch processing na sensitibo sa gastos
- Kapag kailangan mo ang pinakamalaking matitipid sa token

I-configure sa pamamagitan ng combo:

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

## Mga Override sa Compression ng Combo

Maaari mong i-override ang global compression mode **sa bawat combo** upang pinuhin ang gawi
para sa iba’t ibang use case:

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

Kapaki-pakinabang ito para sa:

- **Mga coding combo**: Gamitin ang `aggressive` mode para sa mahahabang session
- **Mga quick Q&A combo**: Gamitin ang `lite` mode para sa mabibilis na tugon
- **Mga combo na maraming tool**: Gamitin ang `stacked` mode para sa pinakamalaking pagtitipid
- **Mga production combo**: Gamitin ang `cache-aware` mode para sa mga provider na gumagamit ng caching

---

## Tingnan Din

- [Configuration ng Environment](../reference/ENVIRONMENT.md) — Mga environment variable ng compression
- [Gabay sa Arkitektura](../architecture/ARCHITECTURE.md) — Mga internal na bahagi ng compression pipeline
- [Gabay ng User](../guides/USER_GUIDE.md) — Pagsisimula sa compression
- [RTK Compression](./RTK_COMPRESSION.md) — Mga RTK filter, trust model, verify gate, at raw-output recovery
- [Mga Compression Engine](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, mga API, MCP, at dashboard
- [Format ng Mga Compression Rule](./COMPRESSION_RULES_FORMAT.md) — Format ng JSON rule-pack
- [Mga Language Pack ng Compression](./COMPRESSION_LANGUAGE_PACKS.md) — Mga rule ng Caveman na partikular sa wika
