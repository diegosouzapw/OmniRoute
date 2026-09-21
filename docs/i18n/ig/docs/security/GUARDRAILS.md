# Guardrails (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Isi mmalite nke eziokwu:** `src/lib/guardrails/`
> **Emelitere ikpeazụ:** 2026-08-29 — v3.8.51 (Video Bridge transcript provenance bụ nke onye kpọrọ ọrụ kwupụtara,
> sava enyochabeghị ya — akọwapụtara nke ọma dịka #11661)

Guardrails na-amanye nchekwa, amụma, na mgbanwe ọdịnaya n'ókè dị
n'etiti OmniRoute na ndị na-eweta ọrụ upstream. Guardrail ọ bụla nwere ike inyocha (ma
ọ bụrụ na achọrọ, jụ, gbanwee, ma ọ bụ tinye nkọwa na) payload arịrịọ (`preCall`) na
nzaghachi upstream (`postCall`).

Sistemụ ahụ bụ **fail-open**: ọ bụrụ na guardrail atụpụta njehie mgbe ọ na-arụ ọrụ, registry
na-edekọ njehie ahụ ma gaa n'ihu na guardrail na-esote kama ime ka
arịrịọ ahụ daa. Igbochi bụ mkpebi doro anya (`block: true`), ọ bụghị ihe mberede.

## Guardrails E Wunyere N'ime Ya

Registry na-ebunye guardrails isii na-akpaghị aka dịka usoro priority ha si dị mgbe a na-eme import
(lee `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Aha                 | Oge            | Faịlụ                 |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nọmba priority ndị dị ala na-arụ ọrụ **mbụ**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Ọ na-ejide arịrịọ ndị nwere onyonyo nke ezubere maka **model ndị na-adịghị akwado vision** ma
dugharịa arịrịọ ahụ dum gaa na model nwere ike ịrụ ọrụ vision, ma ọ bụ dochie akụkụ
onyonyo ndị ahụ na nkọwa ederede nke model vision enwere ike ịhazi mepụtara tupu
oku upstream ahụ. Nke a na-eme ka ndị na-eweta ọrụ na-akwado naanị ederede nwee ike ijikwa
payload multimodal n'ụzọ na-enweghị mgbagwoju anya.

Usoro ọrụ:

1. Mafee ma ọ bụrụ na model ezubere iche akwadolarị vision (belụsọ ma ọ pụtara na
   ndepụta model a manyere iji bridge `isVisionBridgeForcedModel`).
2. Wepụta akụkụ onyonyo site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe ọrụ ahụ n'aka **unified media
   detector** `detectMediaParts()` dị na `open-sse/utils/mediaParts.ts` — otu
   isi mmalite nke eziokwu nke ya na combo compatibility filter na-eji.
   Extraction na-eji allowlist naanị maka akụkụ top-level nke ụdị
   `replaceImageParts` nwere ike itinyeghachi (nkwekọrịta extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, na Responses API `input_image`. Ihe achọpụtara n'ime nested
   na ụdị ndị na-egosi naanị indicator bụ ihe combo-filter ji arụ ọrụ, a naghịkwa ewepụta ha.
   Mafee ma ọ bụrụ na ahụghị nke ọ bụla.
3. Kpebie config runtime site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo settings ọhụrụ `modalityBridge*`
   na-ebute ụzọ; igodo ochie `visionBridge*` ka na-anọ dịka **fallback nke otu cycle**
   (rollback window). Mafee tupu ime traversal media ọ bụla mgbe
   agbanyụrụ bridge.
4. Mode selector (`modalityBridgeVisionMode`, lee tebụl dị n'okpuru) na-ekpebi
   ma a ga-eme reroute ka ọ bụ describe. Reroute na-eweghachi `modifiedPayload` ebe naanị `model`
   ka agbanwere, tinyere meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ describe: kpachie onyonyo na `maxImages`, hazie prompt maara task,
   lelee cache describe, kpọọ model vision **n'otu oge**
   (`Promise.allSettled`), ma tinye akụkụ ederede `[Image N]: <description>` n'ọnọdụ
   ha. Describe dara ada na-ewepụta `null`, a na-**echekwa**kwa akụkụ onyonyo mbụ
   (#4012) — belụsọ n'ụzọ combo describe mgbe describe niile
   dara, ebe upstream ekwenyesiri ike na ọ naghị akwado vision na-enweta stub
   `(unavailable — no vision-capable provider connected)` kama (#8430).
6. Weghachi `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Ndabara | Omume                                                                                                                                                                                                                                                                     |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristic ochie, agbanweghị ya (#6640/#7204): model ndị na-abụghị combo/`auto/` na-eme reroute gaa na model vision kacha mma belụsọ ma model mbụ enweelarị credential ndị a pụrụ iji (mgbe ahụ, ọ na-eme describe); ebumnuche combo na-eme describe mgbe niile.           |
| `describe` |         | Na-eme describe mgbe niile — a na-amafe ngọngọ reroute kpamkpam; model onye ọrụ họọrọ na-aza mgbe niile.                                                                                                                                                                  |
| `reroute`  |         | Manye reroute: a na-agafe guard nke na-edobe model nwere credential. Guard credential nke **target** reroute ka na-emetụta — mgbe enweghị target vision a pụrụ iji, arịrịọ ahụ na-aga n'ihu na describe ka onyonyo raw ghara iru backend na-akwado naanị ederede (#8430). |

Mode ndị a manyere na-eme short-circuit **tupu** heuristic auto amalite; omume `auto`
bụ byte-identical na guardrail tupu PR-1.

#### Prompt describe maara task (`modalityBridgeVisionTaskAware`)

Ndabara bụ **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) na-agbakwunye
ederede nke **ozi onye ọrụ ikpeazụ** (e belatara ya ruo mkpụrụedemede 500) na prompt
describe ntọala, na-eduzi nkọwa ahụ ka ọ lekwasị anya n'ihe onye ọrụ jụrụ n'ezie
(usoro codex-vision-proxy), ma na-arịọ model vision ka ọ detuo ederede a na-ahụ anya.
Mgbe agbanyụrụ flag ahụ — ma ọ bụ mgbe enweghị ederede onye ọrụ — a na-eji prompt ntọala ahụ n'enweghị mgbanwe.

Arịrịọ OpenAI-dakọtara nke describe self-loop n’onwe ya (`callVisionModelSingle()`
n’ime `visionBridgeHelpers.ts`) na-arịọ `image_url.detail: "high"` mgbe niile —
n’enweghị ọnọdụ ọ bụla, maka onye ọ bụla na-akpọ ya/onye na-enye ọrụ, ma ọ bụghị
dabere na mgbaàmà ọ bụla sitere n’aka client. Nlele nwere nkọwa dị ala na-ebelata
izi ezi OCR kpọmkwem maka ọrụ idegharị ederede prompt a na-arịọ, ya mere oku
describe n’onwe ya na-arịọ nkọwa dị elu mgbe niile, n’agbanyeghị ọkwa nkọwa
arịrịọ mbata mbụ jiri. Nke a na-emetụta naanị body arịrịọ describe dị n’ime;
ọ naghị agbanwe etu OmniRoute si ebufe `image_url.detail` nke onye kpọrọ ya
n’arịrịọ bụ isi — a na-etinye default ahụ iche, naanị maka client OpenCode
achọpụtara, n’ime `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Alaka Anthropic wire-format nke
describe self-loop enweghị field `detail`, default abụọ ahụ adịghịkwa emetụta ya.

#### Oke output describe (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range                 |
| ------------------------------ | ------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ma ọ bụ 100–50000 |

`0` (default) pụtara **enweghị oke** — a na-ebufe nkọwa nke
`callVisionModel()` weghachiri n’enweghị mgbanwe, iji chekwaa omume dị ugbu a.
Uru ọ bụla dị n’agbata 100–50000 na-ebipụ nkọwa ahụ ma tinye suffix `…` tupu
etinyeghachi ya dịka `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` n’ime `src/lib/guardrails/visionBridge.ts`).
Bulie nke a maka ọrụ OCR nwere ọtụtụ nkọwa ebe model dị n’ihu chọrọ ndegharị
ederede zuru ezu; wedata ya iji kpachie ojiji token nke model ọhụụ na-ekwu ọtụtụ
okwu. Field dashboard ahụ dị na panel Advanced nke taabụ Vision
(`modality-bridge-max-chars` n’ime `ModalityBridgeVisionTab.tsx`) ma na-ebuli
uru ọ bụla dị n’agbata 1 na 99 ruo n’oke kacha nta 100, ebe ọ na-ahapụ `0`
e depụtara kpọmkwem n’enweghị mgbanwe — `0` bụ uru Zod ziri ezi n’onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị naanị
default “edoghị”.

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dị na memory maka output describe, nke process niile na-ekekọrịta.
Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` nwere
length-prefix framing (enweghị nkukota n’ókè field). Akụkụ model bụ model bridge
**ahaziri**, ọ bụghị model zara n’eziokwu — `callVisionModel` nwere ike iji
fallback n’ime ya, ịmepụta key maka mbọ ọ bụla ga-ekewa cache ahụ n’ụzọ na-adịghị
mkpa. A naghị etinye describe dara ada na cache. Ntọala:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Ịhazigharị onyonyo remote (self-loop describe/base64 fetch)

Mgbe bridge n’onwe ya na-fetch onyonyo **remote** — ma self-call describe
Anthropic ma ngbanwe base64 nke claude-wire-format
(`ensureBase64ImagesForClaudeWire`), ha abụọ site na
`fetchRemoteImageAsDataUri()` n’ime `visionBridgeHelpers.ts` — a na-ebufe data
URI sitere na ya site na `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) tupu etinye ya n’arịrịọ vision-model.
A na-ebelata onyonyo buru oke ibu ruo **2048px n’akụkụ kacha ogologo** (nke
dakọtara na resize cap OpenAI/Anthropic tinyelarị n’akụkụ server), nke na-ebelata
bytes/latency nke upload n’agbanweghị ihe vision model na-ahụ. Resize na-eji
`sharp`, nke a na-ebunye site na dynamic import: n’elu platform ebe native
binary ya anaghị ebunye, `normalizeDataUri()` **anaghị atụba exception ma ọlị**
— ọ na-alaghachi n’ibufe bytes mbụ n’enweghị mgbanwe, ka ụzọ
describe/base64-conversion wee nọgide na-arụ ọrụ mgbe niile. A na-ebufekwa bytes
na-abụghị onyonyo (fetch nke eweghachighị onyonyo a pụrụ decode) n’enweghị
mgbanwe. Ịhazigharị a metụtara naanị onyonyo bridge na-fetch maka self-call nke
ya — a naghị etinye ya na raw passthrough payload nke onye kpọrọ ya, n’ụzọ
dakọtara na ụkpụrụ mgbanwe naanị-site-na-opt-in (Hard Rule #20).

#### Schema ntọala + migration

A na-eji Zod eme validation nke key `modalityBridge*` ọhụrụ n’ime
`updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, otu atọ `modalityBridgeCache*`, na otu
`modalityBridgeAudio*` nke Audio Bridge na-eji. Migration
`141_modality_bridge_settings.sql` na-edetuo uru legacy
`visionBridge*` dị ugbu a gaa na key ọhụrụ dakọtara (ọ bụ idempotent, ọ dịghị
mgbe ọ ga-edegharị uru `modalityBridge*` onye operator setịpụrụ); a ka na-anabata
key legacy dịka read fallback ruo otu release cycle.

#### Header nghọta + stats

Nzaghachi ndị describe gbanwere na-ebu
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(nke `buildModalityBridgeHeader()` na-ewu n’ime
`modalityBridge/bridgeStats.ts`, ma `withModalityBridgeHeader()` na-etinye ya
n’ime `src/sse/handlers/chatHelpers.ts`). Arịrịọ e zigara n’ụzọ ọzọ anaghị enweta
header **ọ bụla** — emetụghị payload ahụ aka, mgbanwe model ahụ apụtalarị na
field `model` nke response body.

`GET /api/modality-bridge/stats` (management auth, otu tier ahụ dịka
`GET /api/settings`) na-eweghachi counter kwa modality dị na memory
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị attempts niile,
dịka denominator ya; operation na-enweghị timing anaghị emepụta sample
zero-millisecond nke adịghị adị. `bridged` ka bụ alias dakọtara na ụdị ochie
maka conversion gara nke ọma; mbọ dara ada anaghị abawanye ya.
A na-reset counter mgbe process malitegharịrị dịka e zubere
(telemetry, ọ bụghị accounting).

#### Nhazi dashboard

Peeji dashboard a raara nye nke a bụ
`/dashboard/settings/modality-bridge`. Taabụ ya `Vision`, `Audio`,
na `Video`, ndị enwere ike iji URL kpọọ, na-echekwa query parameters mgbe a na-agbanwe uru `tab`.
Taabụ Vision na-enye njikwa ime ka ọ rụọ ọrụ, mode, nhọrọ model (gụnyere ndabara
akpaka), prompting nke maara task, oke timeout/image/description-length/cache
dị elu, runtime
counters, na sample request e chebere. Taabụ Audio na-arụkwa ọrụ: ọ na-enye
njikwa ime ka ọ rụọ ọrụ, ihe nhọpụta model nke bụ naanị STT yana Auto, oke timeout/max-clip, audio
counters, na ule sample `input_audio`. Taabụ Video na-arụ ọrụ: ọ na-akọ
ọnọdụ runtime FFmpeg/ffprobe — otu n'ime ọnọdụ UI anọ akọwapụtara (`unknown` mgbe
probe ka na-aga n'ihu ma ọ bụ na o nweghị ike mezue, `restricted` n'elu dashboard host na-abụghị loopback
ebe a na-awụfe probe n'akụkụ client, `unavailable` ozugbo e mechara probe
ma gosi na ọ dịghị, ma ọ bụ `available` tinyere ụdị FFmpeg/ffprobe) — ọ na-echekwa
oke enable/model/frame/video/timeout, na-enyocha ihe nhọpụta model ka ọ gosi naanị
models nwere ikike vision, ma na-enye video counters.

Kaadị Vision Bridge ochie dị n'okpuru ntọala AI bụ njikọ ndakọrịta gaa na
peeji ọhụrụ ahụ; ọ naghịzi ejide oyiri nke abụọ nke form ahụ. Media Providers na-ejikọkwa
usoro ọrụ Image-to-Text na Speech-to-Text na taabụ Modality
Bridge kwekọrọ na ha, n'ewepụghị playground Speech-to-Text dị ugbu a.

**Mafere nnabata self-loop:** mgbe oku describe gafere self-loop `/v1` nke
OmniRoute n'onwe ya (model provider na-abụghị ọkọlọtọ), sub-request ahụ na-eziga
`x-omniroute-admission-bypass: internal` ma jiri credential self-loop a chọpụtara
mee authentication — sentinel `sk_omniroute` nke mpaghara na local mode, ma ọ bụ
igodo env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` nke operator haziri (#1350), ka
deployment ndị nwere `REQUIRE_API_KEY=true` ka nwee ike ịkpọ oku describe ahụ. A na-anabata bypass ahụ
naanị maka credentials ndị ahụ kpọmkwem, ya mere external clients enweghị ike iji
header ahụ mafere admission.

Ntọala ndabara ochie dị na `src/shared/constants/visionBridgeDefaults.ts`;
ndabara mode/task-aware/cache ọhụrụ na settings resolver dị na
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail ahụ na-enye
nhọrọ constructor `deps` ka ule nwee ike ịtinye mmejuputa `getSettings` na
`callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Ọ na-egbochi chat requests nwere audio tupu ha eruo target a na-amaghị
ma ọ na-anabata audio input. Ọ dịghị mgbe ọ na-atụgharị chat request gaa ebe ọzọ: a na-eme
transcription nke audio parts site na endpoint multipart dị ugbu a nke dakọtara na OpenAI, ebe
chat model a họọrọ na-aga n'ihu site na text transcripts.

Usoro:

1. Chọpụta `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata
   provider-registry akọwapụtara doro anya na-ebute ụzọ, static model metadata na-esote, mgbe ahụ
   `modalities_input` emekọrịtara. Input list ekwuputara nke na-enweghị `audio` bụ `false`; ma ọ bụrụ na
   enweghị ihe akaebe capability, ọ na-anọgide `null`. Ma `false` ma `null` na-eme ka
   bridge nchedo ahụ rụọ ọrụ, ebe `true` na-agafe ya.
2. Chọpụta ntọala `modalityBridgeAudio*` ma wepụta top-level
   audio parts nwere ike ịtinyegharị site na message ọ bụla site na detector `detectMediaParts()`
   a na-ekekọrịta. Wire shapes a na-akwado bụ OpenAI `input_audio`, `audio_url`, na
   `source.media_type: "audio/*"`. A na-achọpụta nested audio maka routing mana a naghị
   ewepụ ya site na splice path. `modalityBridgeAudioMaxClips` na-amachi oke ọrụ;
   parts ndị na-esote na-anọgide otu ha dị.
3. Soro `provider/model` a haziri, ma ọ bụ kwe ka `selectAudioBridgeModel()` gagharịa
   `AUDIO_TRANSCRIPTION_PROVIDERS` n'usoro catalog kwụsiri ike wee họrọ model mbụ
   nwere credential provider na-arụ ọrụ nke enwere ike iji.
4. `callAudioTranscription()` na-atụgharị audio base64/data-URI ka ọ bụrụ multipart
   `file`, ma ọ bụ budata `audio_url` dị anya site na outbound guard nke bụ naanị public,
   yana DNS pinning na oke 25 MB. Mgbe ahụ, ọ na-eziga file ahụ na model a họọrọ site na POST
   gaa na self-loop `/v1/audio/transcriptions` nke mpaghara, ma jiri
   `resolveSelfLoopBearer()` mee authentication. Transcription route dị ugbu a na-eme
   nchọta credential nkịtị, njikwa cooldown/rate-limit, na provider dispatch.
5. Oku gara nke ọma na-eji `[Audio N]: <transcript>` dochie parts ha. Oku ndị ahụ
   na-eji `Promise.allSettled` arụ ọrụ: ọdịda nke otu n'otu na-echekwa audio part
   mbụ ahụ (nkwekọrịta #4012). Ọ bụrụ na oku niile ada ma gosipụta na target ahụ bụ
   `supportsAudio === false`, parts ahụ na-aghọ
   `[Audio N]: (unavailable — no STT provider connected)` (nkwekọrịta #8430). Maka
   target a na-amaghị (`null`), nsonaazụ ọdịda niile na-anọgide otu ọ dị. Target
   e gosipụtara na ọ bụ naanị text, nke na-enweghị credential STT enwere ike iji, na-enweta otu
   stub ahụ akọwapụtara nke ọma n'emeghị network call.

Transcripts gara nke ọma na-eji cache LRU/TTL nke Modality Bridge maka process niile.
Key ahụ na-ejikọta audio reference, label operation `audio-transcription` kwụsiri ike,
na STT model a họọrọ; a naghị echekwa ọdịda na cache. Mgbalị Audio na-emelite
counters `bridged`, `cacheHits`, `failures`, na `lastUsedAt` a na-ekekọrịta.
Responses a gbanwere na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; requests
a na-emetụghị anaghị enweta segment Audio Bridge.

Ntọala runtime na-adabere na DB ma Zod na-eme validation ya:

| Key                           | Ndabara | Oke                 |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | Auto ma ọ bụ STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

Ntọala ndị ka na-achịkwa shared cache bụ `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Ọ na-ejide akụkụ vidiyo ndị dị n’ogo elu n’ime `messages` nke Chat Completions na `input` nke Responses API tupu akpọọ ebe e bu n’obi nke a na-amaghị na ọ nwere nkwado vidiyo nke ya. Ụdị ndị a na-akwado bụ `input_video`, `video_url`, `video_source`, URL HTTPS, na URI data `data:video/*;base64,...`. A naghị ewere aha faịlụ nkịtị dị n’ederede dịka vidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) na-ahụ maka ịgafe arịrịọ ahụ dum, nyocha ikike/iwu, nchịkọta maka arịrịọ ọ bụla, na payload nzaghachi. Ọrụ vidiyo ọ bụla — inweta ya, cache nke nsonaazụ zuru ezu, ịkọwa usoro frame (nke na-ejikọta transcript ọdịyo onye kpọrọ ya kwupụtara), yana metrics/ịkwụsị/nhicha maka nnwale ọ bụla — zoro n’azụ `processVideoPart` dị na `videoBridgePipeline.ts`, nke a na-akpọ otu ugboro maka akụkụ vidiyo ọ bụla n’ime loop nke `preCall`. Modul ahụ na-akọwakwa ókè port doro anya ndị a: `VideoMediaBrokerPort` (inweta bytes na iwepụta frame ndị e mere sampling), `VideoAudioTranscriptionPort` (ijikọta transcript ọdịyo onye kpọrọ ya kwupụtara na captions ndị e mere sampling), na `VideoDrilldownPort` (ókè nchekwa persistence maka frame drill-down; ejikọtabeghị ya na `processVideoPart` — ọ bụ naanị route `/api/modality-bridge/video/drilldown` dị iche na-ede entries drill-down ugbu a).

Ụzọ arịrịọ `/v1` ọha anaghị ebubata ma ọ bụ kpọọ subprocess. A na-ebudata vidiyo ndị dị anya n’okpuru oke 50 MiB; vidiyo base64 inline nwere oke decoded nke 36 MiB kwa vidiyo iji mee ka envelope model/messages/framing nọgide n’ime oke nnabata arịrịọ JSON ọha nke 50 MiB. A na-enyocha ogologo inline na atụmatụ nha decoded tupu allocation. A chọrọ HTTPS na URL mbụ dị anya nakwa na redirect ọ bụla, site n’iji guard outbound dị adị nke na-ekwe naanị adreesị ọha ma na-eji DNS pinning. Bytes ndị ahụ gafere kpọmkwem ókè broker dị n’ime `POST /api/modality-bridge/video/extract`. Route ahụ bụ ma `LOCAL_ONLY` ma `SPAWN_CAPABLE`, ọ na-anabata naanị arịrịọ trusted-loopback nke a kwadoro njirimara ya maka process ọ bụla, ọ naghịkwa anabata URL, ụzọ filesystem, executable, ma ọ bụ ndepụta argument. Pipeline nke oke nha body API na incremental body reader nke handler na-amanye, n’ụzọ nọọrọ onwe ha, oke input broker nke 50 MiB. Queue ya nwere oke na-eme otu extraction n’otu oge, na-enye ohere ọrụ anọ na-echere, ma na-amachi input niile na-echere na 100 MiB.

N’ime broker ahụ, `ffprobe` na-agụ faịlụ local nzuzo; allowlist format a kapịrị ọnụ anaghị etinye format playlist na manifest. Maka container ezinụlọ MOV ndị a kwadoro, external MOV data references ka agbanyụrụ na ndabara, command a kapịrị ọnụ ahụ anaghịkwa eme ka ha rụọ ọrụ. Ma `ffprobe` ma `ffmpeg` na-eji whitelist protocol `file` naanị, otu thread, array argument a kapịrị ọnụ, enweghị shell, yana executable ndị e si na `PATH` chọta. Stream cover nke attached-picture abụghị ndị a ga-atụle dịka playable. Stream playable niile ga-emezu oke ndị ahụ, a na-ahọrọkwa stream default e kwupụtara tupu fallback deterministic nke index kacha nta. A machibidoro vidiyo na sekọnd 600, pixel 8,192 n’akụkụ ọ bụla, na source pixel 33,554,432. FFmpeg na-eme sampling frame JPEG midpoint 1–16, na-ebelata ogologo akụkụ kachasị ogologo ruo pixel 1,024 ma ọ bụ ihe na-erughị ya na-enweghị ịmụba input ndị pere mpe, ọ dịghịkwa mgbe ọ na-anata URL. Sampling bụ `uniform` na ndabara. Iwu nhọrọ `scene_aware` na `segment_aware` nke ka bụ experimental na-eme otu pass FFmpeg a kapịrị ọnụ ọzọ n’elu stream local a kwadorolarị, họrọ timestamp scene `showinfo` nwere oke, ma laghachi n’ụzọ deterministic n’otu midpoint uniform ahụ ma ọ bụrụ na detector dara, oge agwụ, output adịghị n’usoro, ma ọ bụ candidate set tọgbọ chakoo. Ọnọdụ segment-aware na-ekesa sample midpoint n’ogo kwekọrọ na interval scene ndị a kwadoro; a kọwara evidence segment-aware na omume fallback n’uju n’okpuru. A na-etinye oke siri ike nke frame 16 mgbe emechara nhọrọ n’iwu ọ bụla. Mgbe arịrịọ scene-aware nwere budget naanị otu frame, ọ na-eji midpoint uniform nke vidiyo zuru ezu na-arụ ọrụ ma ọ bụ focus window ma na-akọ `policyEffective: uniform`: otu frame scene ahọpụtara enweghị ike idobe nsọtụ oge abụọ ahụ. Onye na-akpọ nwere ike, ma ọ bụrụ na ọ chọrọ, ịnye focus window nwere oke (`start`/`end` n’ime sekọnd); a na-eme ka bounds daba n’ime duration media, a na-ajụ window ndị tụgharịrị azụ ma ọ bụ ndị na-abụghị finite, a na-eme sampling policy niile naanị n’ime interval a normalizere. A na-etinye window nke pụtara na metadata sampling nakwa na prefix nkọwa a na-atụkwasịghị obi ka model ndị na-esote nwee ike ịmata ọdịiche dị n’etiti excerpt e lekwasịrị anya na timeline zuru ezu.

Ilekwasị anya semantic nke caption bụ ntọala dị iche ma doo anya. Ọnọdụ analysis `full` nke ndabara na-edobe prompt frame dị ugbu a ma ọ naghị eziga ederede arịrịọ na model caption. N’ọnọdụ `focused`, bridge ahụ na-agụ naanị `text`/`input_text` kacha ọhụrụ nke onye ọrụ dere ma na-abụghị ihe efu, site n’otu container Chat ma ọ bụ Responses ahụ, na-eme ka ọ bụrụ NFC, na-ejikọta control character na whitespace, ma na-amachi ya na Unicode code point 500. Ọ bụrụ na nsonaazụ tọgbọ chakoo, ọ na-alaghachi kpọmkwem na prompt `full`. A na-serialize hint bara uru dịka JSON n’ime block untrusted-user-context pụrụ iche, ọ nwekwara ike naanị ibute nkọwa a pụrụ ịhụ ụzọ; ọ pụghị ịkagbu ịdọ aka ná ntị dị iche nke kwuru ka a ghara ịgbaso ntụziaka a na-ahụ anya ma ọ bụ nke a na-anụ n’ime media. Focus ederede anaghị echepụta `start`/`end` ma ọ bụ gbanwee temporal sampler.

#### Evidence segment nhazi FU-07

`segment_aware` na-eji otu pass pre-analysis nwere oke n’elu stream vidiyo local a kwadorolarị. Filter chain a kapịrị ọnụ na-ebu ụzọ belata nha ruo obosara pixel 320 ma ọ bụ ihe na-erughị ya, chọpụta mgbanwe scene na interval frozen, ma mesịa mee sampling n’ogo frame 1 kwa sekọnd maka blur, nkezi luma, na ozi spatial/temporal. A machibidoro pass ahụ na sample nhazi 600, otu thread FFmpeg/filter, otu protocol `file` naanị na allowlist container ahụ, oke output process nke 1 MiB, na karịa sekọnd 30 agaghị ekwe omume n’ime abort/deadline broker ahụ na-ekekọrịta. Ọ naghị anabata command, filter, path, ma ọ bụ URL sitere na arịrịọ ahụ.

Ụkpụrụ nhazi ndị a bụ ihe akaebe nlele nke a pụrụ ikpebi n’otu ụzọ mgbe niile, ọ bụghị nghọta ihe vidiyo pụtara. Ha anaghị achọpụta isiokwu, omume, nkọwa okwu, okwu e kwuru, ma ọ bụ ebumnuche onye ọrụ. Oke scene na freeze na-emepụta ngalaba; oke freeze kpuchiri, blur, exposure, nkọwa gbasara ọnọdụ, na mgbanwe oge na-emetụta naanị otu e si ekenye mmefu frame 1–16 dị adị. A na-amachi ngalaba jụrụ kpamkpam na otu frame, ebe ngalaba ndị na-ajụghị oyi na-asọrịta mpi maka mmefu fọdụrụ. Mgbe oke dị ọtụtụ karịa frame, a na-edobe mkpuchi timeline nke kesara n’otu nha ka mgbanwe ngwa ngwa n’oge mbido ghara izochi ogologo ngalaba dị n’azụ. A na-ejikọta oke scene ndị dị n’ime mkpebi nyocha nke sekọnd 1 site na oke freeze.

Filter ndị na-efu, ihe akaebe mebiri emebi/efu efu, njehie detector, ma ọ bụ ngafe oge nyocha mbido nwere oke na-eme ka usoro ahụ laghachi n’ụzọ mepere emepe kpọmkwem na iwu midpoint kesara n’otu nha. Nkwụsị sitere n’aka onye kpọrọ oku ma ọ bụ njedebe oge broker anaghị eme ka ọ laghachi n’ụzọ mepere emepe: ọ na-akwụsị subprocess na-aga n’ihu, na-egbochi mmịpụta frame ọzọ, a na-ewepụkwa osisi temporary nzuzo ahụ n’ime `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta fixture FFmpeg ezigbo nke a pụrụ ikpebi n’otu ụzọ mgbe niile maka mbelata oku caption mgbe dedup gasịrị, nkesa mmefu maka ngagharị juru ebe niile, ihe akaebe blur/exposure/SI-TI, mgbanwe ngwa ngwa nwere ogologo ọdụ, na false positive nke gradual-fade. Ọ na-edekọ oge mgbidi nke nyocha mbido, ma, ebe `/usr/bin/time` dị, CPU nke child na RSS kachasị elu. Nlele ịdịmma ya bụ naanị oracle nhazi. Ezigbo ịdịmma caption-model ka bụ `HOLD` n’ihi na harness a enweghị endpoint e nyere ikike ma ọ bụ judge emechiri emechi. Nchekwa ego ka bụkwa `HOLD` belụsọ ma `--caption-cost-per-call-usd` nyere atụmatụ doro anya, nke dị mma, maka ọnụ ahịa otu oku; script ahụ anaghị echepụta nke ọ bụla n’ime nsonaazụ ndị ahụ.

A na-amachi frame ọ bụla na 4 MiB, raw frame niile ọnụ na 23 MiB, na nzaghachi broker e mere serialize na 32 MiB. A na-ewepụ directory temporary nzuzo n’ime `finally`. OmniRoute anaghị ebukọ FFmpeg ma ọ naghị anabata ụzọ executable ahaziri iche. Tupu captioning, bridge ahụ na-etinye usoro visual deduplication kpachapụrụ anya: a na-ebelata JPEG ọ bụla ka ọ bụrụ buffer grayscale 16×16, a na-atụnyere ya naanị na frame ikpeazụ e debere. Maka mmefu caption a rịọrọ nke karịrị otu frame, mmịpụta na-eweta candidate pool nwere oke nke ruru ugboro abụọ nke mmefu ahụ ma ghara ịkarị frame 16. A na-etinye cap a rịọrọ naanị mgbe deduplication gasịrị, ma a na-echekwa candidate mbụ na nke ikpeazụ ahọpụtara n’oge final thinning mgbe mmefu ahụ dịkarịa ala abụọ. Iwu nwere version
`grayscale-16x16-mean-cells-v2` na-eji nke ka ukwuu n’etiti mean luma delta na ratio nke cell thumbnail ndị normalized delta ha dịkarịa ala 0.05. Threshold duplicate bụ constant 0.04, nke a họọrọ maka ịdị mfe ịkọ amụma kama ikpughe ya dịka setting runtime. Signal high-contrast nke abụọ a na-echekwa obere ngagharị na mgbanwe ederede a na-ahụ anya nke ntụnyere mean-only nwere ike izochi. Njehie comparator ma ọ bụ decoder na-eme ka usoro ahụ gaa n’ihu n’ụzọ mepere emepe ma debe mkpuchi. Metadata output na-ekewa candidate ndị e wepụtara, frame ndị ejiri nke ọma, na duplicate visual ndị a tụfuru.

Akụkụ vidiyo e kara akara n’ụzọ doro anya nwere ike ịrịọ contact sheet nwere timestamp. Bridge ahụ na-ewu grid JPEG nke nwere kọlụm 4 na frame 16 karịa. Cell ọ bụla nwere pixel 512 na-etinye timestamp nke source ya n’ime band dị n’ala nwere high-contrast, ebe timestamp ndị ahụ ka dịkwa na metadata ederede maka njikọ na audit n’usoro downstream. JPEG zuru ezu ka nwere cap 32 MiB. Ọ bụrụ na `sharp` enweghị ike decode ma ọ bụ compose grid ahụ, bridge ahụ na-alaghachi na frame JPEG n’otu n’otu; nkwụsị sitere n’aka client ka na-agafe n’ime ọrụ sheet ahụ.

A na-ekewa ihe akaebe promotion n’amaghị ama site na microbenchmark composition synthetic. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwa harness A/B nwere schema-version maka model vision ezigbo ndị kwekọrọ na OpenAI. Ọ na-atụ token provider kọrọ, latency mgbidi site na mbido ruo na njedebe (gụnyere composition sheet), ọnụ ọgụgụ oku model, na njigide fact akọwapụtara na manifest. A naghị ede nzaghachi raw nke model n’ime report; naanị digest SHA-256 na ID fact dabara adaba ka a na-edebe. Harness ahụ anaghị eme oku network ma ọ bụ oku model akwụ ụgwọ ọ bụla belụsọ ma enyere `--execute-real`, ma hazie `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Na-enweghị run ezigbo ahụ e nyere ikike n’ụzọ doro anya, verdict ya nke igwe nwere ike ịgụ ka bụ `HOLD`; nha payload/count oku synthetic naanị abụghị ihe akaebe promotion.

Ndị na-akpọ oku nwere ike itinye array `transcript.cues` nhọrọ na akụkụ vidiyo akwadoro mgbe ha nwere ederede kwekọrọ n’oge ugbua. Cue ọ bụla ga-eburu `text`, interval `start`/`end` nwere njedebe nke dị n’ime duration a nyochara, na `source` dị na whitelist (`client`, `embedded`, ma ọ bụ `audio-bridge`); `confidence` na-eji `1` dịka default ma ga-anọ n’etiti `0` na `1`. A na-ejikọta cue ndị bụ duplicate kpọmkwem. OmniRoute anaghị amalite transcription site na metadata a: a na-edegharị cue ndị a kwadoro n’ime nsonaazụ a kọwara tinyere source, confidence, na interval, ma gosipụta ha dịka observation a na-apụghị ịtụkwasị obi n’akụkụ caption frame. A na-ajụ ederede na-ezighi ezi, nke gafere oke, ma ọ bụ nke enweghị provenance kama ịgwakọta ya n’ime stream caption. Ubi `source` bụ nke onye kpọrọ oku na-ekwupụta ugbu a, ọ bụghị nke server kwadoro: OmniRoute na-amanye ka value ahụ bụrụ otu n’ime string atọ enyere ikike, mana ọ kabeghị cryptographically confirm na label `embedded` ma ọ bụ `audio-bridge` sitere n’eziokwu na mmịpụta nke server nwe. Were `source` dịka hint a na-apụghị ịtụkwasị obi ruo mgbe verification ahụ rutere; ewula mkpebi authorization na ya.

Onye na-akpọ oku nwere ahụmịhe nwere ike ịnye egwu `audioTranscript` enyerelarị ikike maka otu vidiyo ahụ. Ebe njikọ fusion ahụ na-eme ka nlele anya na nke ọdịyo rụọ ọrụ n'okpuru otu oge ngwụcha na akara nkwụsị, na-ahazi ha n'otu usoro oge, na-ejikọta oyiri ndị bụ kpọmkwem otu ihe, ma na-akọ nsonaazụ ezughị ezu mgbe naanị otu akụkụ gara nke ọma. `audioTranscript` na-adịghị irè na-eme ka nsonaazụ ahụ bụrụ nke ezughị ezu — a na-edobe nkọwa anya ahụ, ebe alaka ọdịyo na-edekọ koodu ọdịda e sachara — kama ime ka vidiyo ahụ dum daa. A na-echekwa nnweta nke alaka ọ bụla, ọkọlọtọ nke nsonaazụ ezughị ezu, na koodu ọdịda e sachara n'ime nsonaazụ a kọwara, n'ime metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), n'ime metadata cache nsonaazụ, nakwa n'ime counter fusion nke bridge. Ụzọ ndabara nke Video Bridge anaghị akpọ speech-to-text ma ọ bụ budata oyiri mgbasa ozi nke abụọ; ma ọ bụrụ na egwu ahụ akọwapụtaghị, ọ ga-anọgide na-abụ naanị vidiyo.

**Nchekwa transcript (#12150 P1).** Nke a na-emetụta na-akpaghị aka mgbe ọ bụla Video Bridge (nke a ga-ahọrọ iji n'onwe ya) gosipụtara cue transcript — enweghị ọkọlọtọ nchekwa ọzọ dị iche. Mgbe arịrịọ gosipụtara cue transcript ọ bụla (`transcript` onye na-akpọ oku kwupụtara ma ọ bụ `audioTranscript` e jikọtara), guardrail na-akanye ya `videoBridgeObserved` ma mepụta oyiri ezoro ezo nke nkọwa vidiyo ahụ — ngosipụta yiri ya kpọmkwem nke a nọchiri akụkụ ederede efu nke cue ọ bụla na
`[redacted-video-transcript]`, nke e wuru site n'iji dochie field cue a haziri ahazi tupu a chịkọta string ahụ (ọ bụghị site n'ịtụgharị ederede e mere ka ọ dị larịị, ya mere ọdịnaya cue ọ bụla — ma nke e mere iji wakpo ma nke nkịtị, gụnyere body nwere `]` dịka
`[inaudible]`/`[music]` — enweghị ike ịlanarị). Body arịrịọ nke call-log echekwara na-eji oyiri ezoro ezo ahụ dochie akụkụ ederede ọ bụla sitere na vidiyo, site n'ịtụnyere ọdịnaya ha ka ha bụrụ otu; a na-agụgharị anchor `fullText` site na payload guardrail tupu oku nke emechara, ya mere ntụnyere ahụ ka na-aga nke ọma mgbe guardrail ndị na-esote n'ime chain (ihe nzacha PII na credential, priorities 10/95) degharịrị ederede nkọwa ahụ n'otu ebe, nakwa mgbe ntinye system-prompt/handoff/memory gbanwere nhazi array ozi ahụ. Body e zigara n'elu nye model anaghị agbanwe agbanwe. Arịrịọ a hụrụ anaghịkwa etinye ihe ọ bụla n'ime Memory na-adịgide adịgide (a na-amafere extraction sitere ma na arịrịọ ma na nzaghachi), ya mere nzaghachi nke model n'onwe ya enweghị ike ikwughachi ederede transcript n'ime Memory.

Ụzọ nchekwa ndị ka ghe oghe, nke a na-enyocha maka ọrụ ga-esote (**P2**, #12430): snapshot arịrịọ client nke mbụ tupu guardrail dị n'ime artifact detailed-log;
`previous_response_id` continuation fail-closed; internal dispatches nke derived-prompt ndị na-etinye transcript n'ime string prompt emepụtara (pipeline stages, context-handoff); na body nzaghachi / oyiri semantic-cache nke nzaghachi model na-ehota transcript ahụ. Ndị a bụ ụzọ raw/response-class ma ọ bụ ndị a ga-ahọrọ iji, nke dị n'èzí oke P1 nke body arịrịọ echekwara + Memory.

Lifecycle nke ime `/api/modality-bridge/video/drilldown` bụ substrate cache dị iche, nke loopback/token ji mee authentication. Ọrụ ọ bụla na-achọkwa canonical opaque principal ID. Tupu e mee ka onye na-akpọ oku production nwee ike iji ya, ọ ga-ewepụta ID ahụ site na tenant e mere authentication, ọ gaghịkwa ebufe uru client họọrọ. Igodo cache na-ejikọta principal ahụ na canonical session na ID ntụaka vidiyo, na-echekwa naanị igodo ha sitere na SHA-256, ma na-amachi ma ọgụgụ ma nhichapụ n'otu principal ahụ. Cache ahụ na-echekwa karịa frame JPEG 16 ewepụtara n'otu entry, na-eme ka ha kubie ume mgbe nkeji iri gachara, ma na-akwado ọgụgụ `start`/`end` nwere oke ma ọ bụ nhichapụ session akọwapụtara.

A na-amachi principal ọ bụla na entry 16 na 64 MiB nke data JPEG canonical. Oke ndị ahụ dị iche na oke zuru ụwa ọnụ nke entry 64/256 MiB: nrụgide quota principal na-achụpụ naanị entry principal ahụ ndị ejighị ogologo oge tupu a tụlee nchụpụ LRU zuru ụwa ọnụ. A na-ekpochapụ entry ndị kubiela ume site na ndekọ principal na nke zuru ụwa ọnụ mgbe cache na-arụ ọrụ, ebe nkwụsị na ọdịda validation anaghị echekwa nnọchi ezughị ezu.

Cache ahụ na-ajụ Base64 na-abụghị canonical, padding gabigara ókè, media na-abụghị JPEG, JPEG ndị nwere nrụrụ ma ọ bụ ndị a gbupụrụ agwụ, na JPEG ndị na-emepụta ịdọ aka ná ntị n'oge decode `sharp` zuru onyonyo nwere oke. Ọ na-emegharị image ọ bụla ọ nabatara ka ọ bụrụ JPEG canonical, na-ewepụta width na height site na byte e mere decode kama ịtụkwasị field onye na-akpọ oku obi, ma na-atụfu byte polyglot ọ bụla dị n'azụ kama idebe ha. Naanị buffer canonical compressed nwere oke ka a na-agụnye na quota abụọ ahụ. Oke wire JSON gụnyere overhead Base64 maka oke decoded-input nke 32 MiB. Derivation ọ bụla echekwara na-edekọ format/resolution JPEG ya e mere validation, sampling policy, derivation version, oge e kere ya, content hash server gbakọrọ, na parent reference e mere hash tinyere parent-content hash nke onye na-akpọ oku a tụkwasịrị obi. A na-enyocha nkwụsị n'etiti phase decode/hash asynchronous tupu atomic cache commit.

Tranche a ejikọbeghị onye nrụpụta production na route ahụ, ọ naghịkwa enye nhọrọ variant multi-resolution. Ya mere, ụzọ arịrịọ Video Bridge doro anya anaghị eweta ọrụ agbakwunyere, ebe tenant-bound principal derivation na lifecycle FU-08 multi-resolution zuru ezu ka bụ ọrụ ndị akọwapụtara maka oge na-esote kama ịkọwa ha dịka omume emechara.

A na-enye freemu nkọwa n’usoro site na iji ụdịdị Video ahaziri. Ntọgharị Video nke tọgbọ chakoo na-eketa ntọala Vision; ọ bụrụ na ha abụọ tọgbọ chakoo, Vision auto-router na-ahọrọ ụdịdị nwere ikike ọhụụ nke ga-arụ ọrụ. Nkọwa ndị gara nke ọma na-eji nganiihu kwụsie ike `[Video description:` dochie akụkụ mbụ; nganiihu a na-egosikwa ederede ahụ dị ka nchọpụta sitere na mgbasa ozi a na-apụghị ịtụkwasị obi ma na-agwa ụdịdị ndị na-esote ka ha ghara ịgbaso ntuziaka ndị dị na mgbasa ozi ahụ. Igodo cache nke nkọwa freemu na-agụnye baitị JPEG, prompt, timestamp, na ụdịdị na-arụ ọrụ; naanị nkọwa ndị gara nke ọma ka a na-etinye na cache. Ndenye cache na-edobe ụdịdị onye nrụpụta nke gara nke ọma n’ezie, gụnyere ụdịdị fallback; bridge ahụ na-akọ `mixed` mgbe ụdịdị dị iche iche mepụtara freemu dị iche iche. Cache hit na-eji njirimara onye nrụpụta ahụ ọzọ kama ịgbanwe akara ya ka ọ bụrụ atụmatụ routing a rịọrọ. A na-eji ntinye ọ bụla na-agbanwe nsonaazụ dị ka igodo cache nke nsonaazụ vidiyo dum — prompt, ụdịdị na-arụ ọrụ, iwu sampling, ọnụ ọgụgụ freemu, ọnọdụ semantic analysis, fingerprint SHA-256 nke focus hint ahaziri, focus window, `transcript`, `audioTranscript`, na ọkọlọtọ contact-sheet — ya mere, ịgbanwe nke ọ bụla n’ime akụkụ ndị ahụ bụ cache miss, ọ bụghị iji ihe ochie eme ihe ọzọ. Ụdị mbipụta nke iwu visual dedup, threshold, na ọnụ ọgụgụ candidate-frame e nwere oke bụkwa ihe e depụtara kpọmkwem na igodo na metadata nke result-cache; n’ihi ya, mgbanwe iwu enweghị ike iji nkọwa vidiyo dum ochie eme ihe ọzọ. Metadata result-cache v4 na-edobe mode na fingerprint, ọ dịghị mgbe ọ na-edobe ọrụ onye ọrụ n’onwe ya. Metadata guardrail na-akọ ma mode analysis a rịọrọ ma nke na-arụ ọrụ; a na-akọ mode `focused` a rịọrọ nke na-enweghị ederede onye ọrụ bara uru dị ka nke na-arụ ọrụ n’ụdị `full`.

Guardrail ahụ na-ewepụta akụkụ vidiyo niile a na-akwado mana ọ naghị akọwa ihe karịrị `modalityBridgeVideoMaxVideos`. Maka target e gosipụtara na ọ nwere `supportsVideo === false`, vidiyo ndị dara ada na ndị gafere oke na-aghọ akara ederede nchekwa doro anya ka vidiyo raw ọ bụla ghara ịlanarị. Mgbe a na-amaghị capability, a naghị emetụ akụkụ ndị ahụ aka. Target nwere `supportsVideo === true` na-agafe bridge ahụ. Abort signal nke arịrịọ client na-erute nbudata, broker queue, subprocesses, na oku caption; abort na-akwụsị n’etiti vidiyo ma ọ dịghị mgbe ọ na-eme fail open gaa na raw media.

Ntọala runtime sitere na DB ma Zod na-eme validation ya:

| Key                                 | Ndabara     | Oke / omume                                                                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime nhọrọ, a ga-ahọrọ ya n’onwe                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-edobe caption izugbe; `focused` na-eji context onye ọrụ kachasị ọhụrụ, nwere oke ma bụrụ nke a na-apụghị ịtụkwasị obi |
| `modalityBridgeVideoModel`          | `""`        | Na-eketa ụdịdị Vision Bridge                                                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ `segment_aware` kwekọrọ n’ogo; ọdịda detector na-alaghachi na `uniform`                       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                  |

A na-amanye ụkpụrụ Video timeout ochie echekwara nke karịrị sekọnd 120 ka ọ daba na broker deadline; a na-ajụ ide ntọala ọhụrụ karịrị oke ahụ. `GET /api/modality-bridge/video/runtime` chọrọ locality loopback a tụkwasịrị obi nke e tinyere stamp tupu authentication ma ọ bụ runtime probing, ma mesịa chọọ management auth. Ọ na-eweghachi naanị `available`, ụdịdị FFmpeg/ffprobe e mere sanitize, na ihe kpatara a kapịrị ọnụ mgbe runtime adịghị. Endpoint extraction nke ime abụghị API upload ọha: njupụta queue na-eweghachi `503` tinyere `Retry-After`, nkwụsị caller na-eweghachi `499`, ebe broker deadline a kapịrị ọnụ na-eweghachi `504`. Nzaghachi ndị a tụgharịrị na-agbakwunye `video->text;model=<visionModel>;parts=<videos>` na header etiti `x-omniroute-modality-bridge` n’enweghị iwepụ akụkụ Vision ma ọ bụ Audio.

### PII Masker (`piiMasker.ts`)

Ọ na-arụ ọrụ na **usoro abụọ ahụ**.

- **`preCall`** na-eme clone nke payload, na-agafe `system`, `messages`, `input`, na `prompt` (gụnyere item ndị bụ plain string), ma na-etinye `processPII()` (sitere na `@/shared/utils/inputSanitizer`) na field `content`/`text` ndị bụ string. Mgbe `PII_REDACTION_ENABLED=true`, a na-ewepụ PII achọpụtara na payload a na-ezipụ. Nke a adabereghị na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị iwu prompt-injection). Mgbe redaction gbanyụrụ, oku ahụ na-edekọ ọnụ ọgụgụ nchọpụta n’edegharịghị ọdịnaya.
- **`postCall`** na-eme deep-clone nke nzaghachi, na-agba `sanitizePIIResponse()` tinyere masker nke ọdịdị Responses-API (`maskResponsesOutput` — na-ekpuchi `output_text` na `output[].content[].text`). Ọ bụrụ na redaction ọ bụla emee, nzaghachi emezigharịrị na-anọchi nke mbụ.

Guardrail ahụ anaghị egbochi ihe ọ bụla; ọ na-agbakwunye naanị nkọwa (`meta.detections`, `meta.redacted`) ma ọ bụ na-edegharị.

### Prompt Injection (`promptInjection.ts`)

Ọ na-achọpụta nhazi mwakpo dị n’ọdịnaya onye ọrụ nyere ma na-amanye iwu ahaziri. Environment variables na constructor options na-achịkwa omume ya:

| Ntọala      | Mgbanwe env                                                                                            | Ndabara | Mmetụta                                                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agbanyere   | `INPUT_SANITIZER_ENABLED`                                                                              | `true`  | Mgbe ọ bụ `false`, guardrail na-akwụsị ozugbo.                                                                                                                                                       |
| Ọnọdụ       | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn`  | Iwu injection: `block`, `warn`, ma ọ bụ `log`. (A na-anabata `redact` maka ndakọrịta ochie, mana ọ **naghị** ewepụ ederede injection; `PII_REDACTION_ENABLED` na-achịkwa idegharị PII dị na arịrịọ.) |
| Oke mgbochi | Nhọrọ `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (aha ọzọ `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Ogo ịdị njọ kacha nta achọrọ iji gbochie. Na ndabara, a na-eleba ogo Medium anya naanị.                                                                                                              |

**Usoro ibute ọnọdụ ụzọ** (`getMode`): `options.mode` nke onye na-akpọ →
`INJECTION_GUARD_MODE` **nhichapụ feature-flag nke DB** (Dashboard → Settings →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Ya mere, nhichapụ sitere na dashboard na-aka mgbanwe env, nke mere na UI
Feature Flags na-achịkwa guard na-arụ ọrụ ozugbo (enweghị ịmalitegharị). Ọgụgụ DB
nwere nchekwa mgbe ọdịda mere: ọ bụrụ na njehie emee, guard na-alaghachi n'omume
dabere na env, ma mgbe edoghị nhichapụ ọ bụla, omume ahụ na nke mkpebi sitere
naanị na env bụ otu.

Ebe nchọpụta si abịa:

1. `sanitizeRequest()` sitere na `@/shared/utils/inputSanitizer` (usoro detector
   a na-ekekọrịta nke a na-eji n'ebe ndị ọzọ na pipeline).
2. `DEFAULT_GUARD_PATTERNS` arụnyere n'ime ya (ugbu a bụ `system_override_inline`
   na `markdown_system_block`, ha abụọ nwere ogo ịdị njọ `high`).
3. `customPatterns` nhọrọ a na-ebufe site na nhọrọ constructor (strings, regex,
   ma ọ bụ ndekọ `{ name, pattern, severity }`).

Mgbe `mode === "block"` **ma** ọ dịkarịa ala otu nchọpụta ruru oke ogo ịdị njọ,
`preCall` na-eweghachi `{ block: true, message: "Request rejected:
suspicious content detected" }`. N'ọọdụ `warn`/`log`, guardrail na-edekọ ya mana
na-ekwe ka oku ahụ gaa n'ihu. A na-ebupụkwa helper `evaluatePromptInjection()`
a na-ekekọrịta maka ndị na-akpọ chọrọ inyocha prompts n'agafeghị registry.

**Oke nyocha (v3.8.20):** detector na-enyocha naanị **16 KB mbụ** nke ederede
prompt ejikọtara ọnụ — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) n'ime
`src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` ma
`evaluatePromptInjection()` na-eme `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu ha
agbaa pattern loop. Ntuziaka injection na-anọkarị nso n'elu input, ya mere nke a
na-etinye oke na CPU/GC nke regex maka payloads ruru ọtụtụ narị KB n'ebelataghị
ike nchọpụta (lee #3932, #4041).

### Ihe Na-ekpuchi Ozi Nzuzo (`credentialMasker.ts`)

Ọ na-arụ ọrụ na **stages abụọ ahụ**, nke ikpeazụ na chain ndabara (priority `95`).
Ọ na-ekpuchi patterns API-key / secret-token ndị a maara nke ọma na payload
na-apụ apụ (ọdịnaya ozi, arguments nke tool-call, nsonaazụ tool) **yana**
nzaghachi provider, ka credential etinyere na prompt (ma ọ bụ nke nsonaazụ tool
weghachiri) ghara ịpụga provider dị n'elu ma ọ bụ laghachikwuru client.

- **A ga-ahọrọrịrị ịgbanye ya**, otu usoro ahụ a na-eji maka ikpuchi PII (n'akụkụ
  Hard Rule #20): ọ na-adị agbanyụghị belụsọ ma
  `settings.credentialRedactionEnabled === true` **ma ọ bụ**
  `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe ọ gbanyụrụ, guardrail anaghị eme
  ihe ọ bụla — ọ dịghị mgbe ọ na-egbochi ma ọ bụ na-edegharị.
- `redactCredentials()` na-agafe tree payload/response niile (`walkValue()`,
  nwere nchekwa pụọ na prototype pollution, ma nwee nchekwa pụọ na cycle site
  na `WeakSet`) ma jiri placeholder `[REDACTED:<type>]` dochie ihe ndị dabara,
  na-eme clone naanị branches ndị gbanwere n'ezie.
- `CREDENTIAL_PATTERNS` na-ekpuchi keys nke ndị provider LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), keys ịkwụ ụgwọ (Stripe,
  Square), keys cloud (AWS access key, Twilio, SendGrid, Mailgun), private keys /
  JWTs, connection strings nwere credentials (`mongodb://user:pass@...`, wdg.),
  na pattern header-value izugbe
  `Authorization`/`x-api-key`/`api-key`/`apikey`. A na-ekpuchi keys yiri header
  (`authorization`, `x-api-key`, `api-key`, `apikey`) n'ụdị nhazi (naanị value,
  ebe a na-ahapụ prefix scheme dịka `Bearer `/`Basic `) kama iji regex ederede
  izugbe.
- Guardrail anaghị egbochi mgbe ọ bụla; naanị ihe ọ na-eme bụ idegharị
  (`modifiedPayload` / `modifiedResponse`) na itinye nkọwa
  (`meta.credentialsRedacted`, `meta.count`).

Nchedo regression: `tests/unit/credential-masker-guardrail.test.ts`.

## Nkwekọrịta Ntọala (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true na-akwụsị usoro ahụ ozugbo
  message?: string; // a na-egosi ya mgbe a na-egbochi
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall na-eweghachi ya iji degharịa arịrịọ ahụ
  modifiedResponse?: TValue; // postCall na-eweghachi ya iji degharịa nzaghachi ahụ
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Guardrail na-egosi “enweghị mgbanwe” site n'ịweghachi `void`, `{}`, ma ọ bụ
`{ block: false }`. Iweghachi `modifiedPayload`/`modifiedResponse` na-eji uru ahụ
dochie uru na-agafe n'usoro ahụ maka guardrail ndị na-esote.
`signal?: AbortSignal` na-ebunye usoro ndụ onye kpọrọ ọrụ ahụ n'ime guardrail. Ịkwụsị arịrịọ bụ ọnọdụ pụrụ iche fail-open e kpachapụrụ anya: àkwà mmiri mgbasa ozi na-akwụsị ọrụ ma na-ehichapụ ihe ndị fọdụrụ n'enweghị iweghachi mgbasa ozi raw n'ebe a maara na ọ naghị akwado ya.

## Ndebanye (`registry.ts`)

Singleton `guardrailRegistry` na-enye:

- `register(guardrail)` — na-agbakwụnye guardrail (ma ọ bụ jiri aha ahaziri dochie nke dị adị) ma
  hazie ha ọzọ dịka `priority` na-arịgo.
- `clear()` / `list()` — ngwa enyemaka nchịkwa.
- `runPreCallHooks(payload, context)` — na-agafe guardrail ndị na-arụ ọrụ, na-ebufe
  payload ahụ site na `modifiedPayload`, ma kwụsị na `block: true` mbụ.
- `runPostCallHooks(response, context)` — otu usoro ahụ n'akụkụ nzaghachi.
- `resetGuardrailsForTests({ registerDefaults })` — na-ehichapụ ọnọdụ ma, ma ọ bụrụ na ahọrọ ya,
  debanyeghachi ntọala ndabara iji kewapụ ule nke ọma.

Ndị na-agba ọsọ abụọ ahụ na-eweghachi `{ blocked, payload|response, results, guardrail?, message? }`
ebe `results` bụ n'usoro ndekọ `GuardrailExecutionResult` nke gụnyere mpaghara
`blocked`, `skipped`, `modified`, `error`, na `meta` maka guardrail ọ bụla,
nke bara uru maka nsuso.

### Ịgbanyụ Guardrail Maka Arịrịọ Ọ Bụla

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` na-achịkọta ndepụta
aha guardrail na-enweghị oyiri nke a ga-awụli maka arịrịọ dị ugbu a. Isi mmalite
(ha niile bụ nhọrọ, a na-ejikọta ha niile):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` dị n'ahụ arịrịọ (n'ọkwa kachasị elu)
- `metadata.disabledGuardrails` dị n'ahụ arịrịọ
- Header `x-omniroute-disabled-guardrails` (ma ọ bụ nke ochie
  `x-disabled-guardrails`)

Uru nwere ike ịbụ n'usoro string ma ọ bụ string nke rikoma kewara; a na-ahazi
aha ka ha bụrụ lowercase kebab-case (`pii_masker` → `pii-masker`). A na-ebufe
nsonaazụ ahụ site na `context.disabledGuardrails` gaa na ndebanye ahụ, nke na-awụli
guardrail ndị dabara (`skipped: true` n'ime `results`).

## Usoro Mmezu

Maka arịrịọ ọ bụla na-agafe na `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` na-emepụta ndepụta ihe a ga-amafe site na API key, body,
   na headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` na-eme guardrails n'usoro priority
   na-arị elu:
   - A na-edekọ guardrails ndị agbanyụrụ dịka `skipped`.
   - `preCall` nke guardrail ọ bụla nwere ike idegharị payload site na `modifiedPayload`.
   - `block: true` mbụ na-akwụsị usoro ahụ ozugbo, handler ahụ wee weghachite
     nzaghachi ọjụjụ guardrail.
3. Payload ahụ (nke enwere ike idegharị) na-abanye na combo routing na upstream
   dispatch.
4. Mgbe ahaziri nzaghachi ahụ, `guardrailRegistry.runPostCallHooks(...)`
   na-eme otu usoro ahụ na nzaghachi ahụ. `block: true` n'ebe a na-ewepụ nzaghachi
   upstream ahụ.

A na-edekọ guardrails ndị tụbara mperi na `error: <message>`, a na-edekwa ha na log site na
`logger.warn`, mana usoro ahụ na-aga n'ihu — nke a bụ nhazi fail-open e mere ụma.

## Nhazi

Environment variables ndị guardrails arụnyere n'ime sistemụ na-agụ:

| Variable                              | Ihe na-eji ya             | Mmetụta                                                                                                 |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Tọọ ya ka ọ bụrụ `false` iji gbanyụọ nchọpụta kpamkpam.                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Iwu injection: `warn`, `block`, ma ọ bụ `log`. Legacy value `redact` anaghị edegharị ederede injection. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode maka injection guard; ọ bụkwa DB feature flag nke **na-akagbu** env vars (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Severity kacha nta nke `MODE=block` na-ajụ: `high` (ndabara), `medium`, ma ọ bụ `low`.                  |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy alias maka `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Mgbe ọ bụ `true`, a na-ekpuchi PII dị na request (n'adabereghị na injection mode).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Na-achịkwa omume masker n'akụkụ response.                                                               |

Guardrails nke Modality Bridge na-agụ runtime config site na settings store
nke DB na-akwado (`getSettings()`), ọ bụghị env vars. Primary keys nke Vision bụ
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. A na-anabata legacy
`visionBridge*` keys naanị dịka documented one-cycle read
fallback; ihe dashboard na-ede na-eji primary keys. Defaults na fallback
resolver dị na `src/shared/constants/modalityBridgeDefaults.ts`, ebe a ka na-edobe legacy
constants na `src/shared/constants/visionBridgeDefaults.ts`.

Audio na-eji `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, tinyere settings
`modalityBridgeCache*` ndị a na-ekekọrịta. Audio enweghị legacy-key fallback n'ihi na e
webatara keys ndị a na schema nke Modality Bridge.

Video na-eji `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, tinyere settings `modalityBridgeCache*` ndị a na-ekekọrịta.
A na-agbanyụ ya na ndabara n'ihi na FFmpeg/ffprobe bụ operational
dependencies ndị nhọrọ, na frame captioning na-agbakwunye latency na model cost.

## Guardrail Ahaziri

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Nzọụkwụ:

1. Mepụta `src/lib/guardrails/myGuardrail.ts` nke na-agbatị `BaseGuardrail`.
2. Mejuputa `preCall` na/ma ọ bụ `postCall`.
3. Debanye ya n'oge mbubata (tinye site na `registerDefaultGuardrails`) ma ọ bụ
   kpọọ `guardrailRegistry.register(...)` n'oge sistemụ na-arụ ọrụ — ndekọ ahụ na-eji
   guardrail ọhụrụ dochie nke ọ bụla dịbu nke nwere otu aha ahaziri ahazi.
4. Tinye ule n'okpuru `tests/unit/` (ihe atụ ndị dị ugbu a:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Nnwale

Jiri `resetGuardrailsForTests()` n'etiti ule iji malite site n'ọnọdụ a maara.
Nyefee `{ registerDefaults: false }` iji malite na ndekọ efu ma
debanye naanị guardrail ndị a na-anwale. Vision Bridge na-anabata ntinye
ndabere (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge na-ekpughe
ebe ntinye yiri ya maka ntọala, ike, nhọrọ ụdị STT, nyocha
nzere, na ntụgharị okwu ọdịyo gaa na ederede. Ya mere, ule nwere ike ịnwale usoro abụọ ahụ na-enweghị ohere
ịnweta DB ma ọ bụ netwọkụ.

## Hụkwa

- `src/lib/guardrails/` — mmejuputa
- `src/shared/utils/inputSanitizer.ts` — ihe nchọpụta a na-ekekọrịta nke na-akwado
  igbochi ntinye prompt na ikpuchi PII
- `src/shared/constants/visionBridgeDefaults.ts` — ndabara Vision Bridge na
  ndepụta ụdị nke a na-amanye iji bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — ndabara runtime Vision/Audio a na-ekekọrịta
- `docs/architecture/RESILIENCE_GUIDE.md` — oyi akwa kwụụrụ onwe ya (circuit breaker, oge nchere)
- `docs/reference/ENVIRONMENT.md` — ntụaka zuru ezu nke env var

## Mkpuchi route nke injection-guard & red-team (Oge 8 · Blọk D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) na-ekpuchi route niile
na-anabata prompt ndị ọrụ. Ọ na-asọpụrụ `INJECTION_GUARD_MODE` (ndabara `warn` = naanị dekọọ;
`block` = weghachite HTTP 400 `SECURITY_001`).

| Ụdị                 | Route                                                                                                                                                | Ọnọdụ ndabara |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Ederede (dị ugbu a) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Mmepụta             | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data                | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Mwepụta ederede (`extractMessageContents`) na-ekpuchi `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kwa abalị, `nightly-llm-security.yml`):** promptfoo na-akwado na route ọ bụla na-egbochi
corpus OWASP-LLM mgbe `INJECTION_GUARD_MODE=block`; garak na-agba probes (ọ na-awụfe ma ọ bụrụ na secret adịghị).
Agụnyere `moderations` maka ịdị n'otu — ndị na-ahụ maka sistemụ nọ na block-mode nwere ike iwepụ ya site na
`resolveDisabledGuardrails`.

Workflow nke abalị (`.github/workflows/nightly-llm-security.yml`, cron + iji aka
malite) nwere ọrụ abụọ:

- **`promptfoo-guard` (na-egbochi)** — na-agba `promptfoo eval -c promptfooconfig.yaml`
  na `INJECTION_GUARD_MODE=block`. Ọnọdụ mmegide ọ bụla (dịka "leghara
  ntuziaka niile gara aga anya…", jailbreak ụdị DAN) na-akwado na nzaghachi ahụ nwere
  `error.code === "SECURITY_001"`, ya bụ, na guard ahụ jụrụ arịrịọ ahụ n'ezie.
- **`garak` (ndụmọdụ)** — na-agba garak `--probes promptinject,dan,leakreplay`
  megide instance OmniRoute mpaghara (`http://localhost:20128/v1`). A na-achịkwa ya site na
  secret onye na-eweta (`PROMPTFOO_PROVIDER_KEY`); ọ na-awụfe n'enweghị nsogbu ma tinye
  `|| true` na njedebe, ya mere ọ na-enye akụkọ na-emeghị ka CI daa.

Mkpuchi nke ihe enyemaka guard (`createInjectionGuard` / `withInjectionGuard`)
na-erute route `/v1` ọ bụla nwere prompt; a na-ewepụta ederede prompt site na
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` site na
`extractMessageContents()` dị na `src/shared/utils/inputSanitizer.ts`.
