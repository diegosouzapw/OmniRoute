# Guardrails (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Nchedo arụnyere n'ime

Ndebanye aha na-ebunye nchedo isii na-akpaghị aka n'usoro ihe kacha mkpa na mbubata
(lee `registry.ts` → `registerDefaultGuardrails()`):

| Ihe kacha mkpa | Aha                 | Nzọụkwụ(ụkwụ)  | Faịlụ                 |
| -------------- | ------------------- | -------------- | --------------------- |
| `5`            | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`            | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`            | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`           | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`           | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`           | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nọmba ihe kacha mkpa dị ala na-agba **mbụ**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Na-egbochi arịrịọ ndị nwere onyonyo ezubere maka **ụdị ndị na-enweghị ọhụụ** ma ọ bụ
na-atụgharị arịrịọ ahụ dum gaa na ụdị nwere ike ịhụ ihe ma ọ bụ dochie
akụkụ onyonyo ahụ na nkọwa ederede nke ụdị ọhụụ nwere ike ịhazi tupu
oku elu. Nke a na-eme ka ndị na-enye ederede naanị jiri nwayọọ na-ejikwa
ibu multimodal.

Usoro:

1. Mafere ma ọ bụrụ na ụdị ebumnuche ahụ na-akwado ọhụụ (ọ gwụla ma ọ pụtara na
   ndepụta àkwà mmiri amanyere `isVisionBridgeForcedModel`).
2. Wepụ akụkụ onyonyo site na `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), nke na-enyefe na **ihe nchọpụta mgbasa ozi jikọtara ọnụ**
   `detectMediaParts()` na `open-sse/utils/mediaParts.ts` — otu isi iyi nke eziokwu
   ekekọrịtara na nzacha ndakọrịta combo.
   Mwepụ bụ allowlisted na akụkụ kachasị elu nke ụdị
   `replaceImageParts` nwere ike ịgbakwunye azụ (nkwekọrịta wepụ↔dochie): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, na Responses API `input_image`. Ihe ndị e tinyere n'ime na
   ụdị ihe ngosi naanị bụ ihe combo-filter ma anaghị ewepụta ha.
   Mafere ma ọ bụrụ na ahụghị ihe ọ bụla.
3. Dozie nhazi oge site na `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): igodo ntọala `modalityBridge*` ọhụrụ na-emeri;
   igodo `visionBridge*` ochie ka bụ **otu okirikiri ndabere** (oge nkwụghachi).
   Mafere tupu njem mgbasa ozi ọ bụla mgbe agbanyụrụ àkwà mmiri ahụ.
4. Onye nhọpụta ọnọdụ (`modalityBridgeVisionMode`, lee tebụl dị n'okpuru) na-ekpebi
   ịtụgharị ụzọ ma ọ bụ kọwaa. Ịtụgharị ụzọ na-eweghachi `modifiedPayload` na naanị `model`
   agbanwere, gbakwunyere meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ụzọ nkọwa: kpuchie onyonyo na `maxImages`, gbakọta ngwa ngwa ọrụ ahụ,
   kpọtụrụ ebe nchekwa nkọwa, kpọọ ụdị ọhụụ **n'otu oge**
   (`Promise.allSettled`), ma tinye `[Image N]: <description>` akụkụ ederede n'ọnọdụ ha.
   Nkọwa dara ada na-enye `null` na akụkụ onyonyo mbụ bụ
   **echekwara** (#4012) — ma e wezụga na ụzọ nkọwa combo mgbe nkọwa ọ bụla dara,
   ebe a na-enweta nkwado na-enweghị ọhụụ akwadoro
   `(adịghị — enweghị onye na-enye ọhụụ ejikọrọ)` kama (#8430).
6. Weghachi `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Onye nhọpụta ọnọdụ (`modalityBridgeVisionMode`)

| Ọnọdụ      | Nke ndabere | Omume                                                                                                                                                                                                                                                    |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Usoro nyocha ochie, emetụghị aka (#6640/#7204): ụdị ndị na-abụghị combo/`auto/` na-atụgharị ụzọ gaa na ụdị ọhụụ kacha mma ọ gwụla ma ụdị mbụ ahụ nwere asambodo nwere ike iji (mgbe ahụ kọwaa); ebumnuche combo na-akọwa mgbe niile.                     |
| `describe` |             | Kọwaa mgbe niile — a na-amapụ ngọngọ ịtụgharị ụzọ kpamkpam; ụdị onye ọrụ họọrọ na-aza mgbe niile.                                                                                                                                                        |
| `reroute`  |             | Manye ịtụgharị ụzọ: a na-agbagharị nchedo ụdị echekwara asambodo. Nchedo asambodo ebumnuche ịtụgharị ụzọ ka na-emetụta — mgbe enweghị ebumnuche ọhụụ nwere ike iji, arịrịọ ahụ na-agafe na nkọwa ka onyonyo raw ghara iru azụ azụ ederede naanị (#8430). |

Ụdị amanyere na-agbanye obere oge **tupu** usoro nyocha akpaaka agba; omume `auto`
bụ otu byte na nchedo tupu PR-1.

#### Ngwa ngwa nkọwa ọrụ (`modalityBridgeVisionTaskAware`)

Nke ndabere **eziokwu**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) na-agbakwunye
ederede nke **ozi onye ọrụ ikpeazụ** (ebipụrụ na mkpụrụedemede 500) na ngwa ngwa nkọwa isi,
na-eduzi nkọwa ahụ gaa n'ihe onye ọrụ jụrụ n'ezie
(ụkpụrụ codex-vision-proxy) ma na-arịọ ụdị ọhụụ ka ọ dee ederede a na-ahụ anya.
Mgbe ọkọlọtọ ahụ gbanyụrụ — ma ọ bụ enweghị ederede onye ọrụ — a na-eji ngwa ngwa isi ahụ n'agbanweghị.

Arịrịọ dakọtara na OpenAI nke sekit onwe ya na-akọwa (`callVisionModelSingle()`
na `visionBridgeHelpers.ts`) na-arịọkarị `image_url.detail: "high"` —
n'enweghị ọnọdụ, maka onye ọkpụkpọ/onye na-enye ọrụ ọ bụla, anaghị agbanye na mgbaama onye ahịa ọ bụla.
Nlele nkọwa dị ala na-emebi izi ezi OCR maka kpọmkwem ọrụ idegharị ederede
arịrịọ a na-arịọ, yabụ oku nkọwa n'onwe ya na-arịọkarị nkọwa dị elu
n'agbanyeghị ọkwa nkọwa nke arịrịọ mbata mbụ jiri. Nke a
na-emetụta naanị ahụ arịrịọ nkọwa dị n'ime; ọ naghị agbanwe ka
OmniRoute si ebufe `image_url.detail` nke onye ọkpụkpọ na arịrịọ bụ isi —
a na-etinye ndabara ahụ iche, ma naanị maka ndị ahịa OpenCode achọpụtara, na
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Alaka Anthropic wire-format nke sekit onwe ya enweghị mpaghara `detail`
ma ọ nweghị nke ọ bụla n'ime ndabara abụọ ahụ na-emetụta ya.

#### Oke mmepụta nkọwa (`modalityBridgeVisionMaxChars`)

| Igodo                          | Ndabara | Oke                   |
| ------------------------------ | ------- | --------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ma ọ bụ 100–50000 |

`0` (ndabara) pụtara **enweghị oke** — a na-ebufe nkọwa nke
`callVisionModel()` weghachiri n'enweghị mgbanwe, na-echekwa omume dị adị.
Uru ọ bụla dị na oke 100–50000 na-ebipụ nkọwa ahụ site na
`…` suffix tupu etinye ya azụ dị ka `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` na `src/lib/guardrails/visionBridge.ts`).
Bulie nke a maka ọrụ OCR dị arọ ebe ihe nlereanya dị n'okpuru chọrọ
idegharị zuru ezu; wedata ya iji gbochie ojiji token na ụdị ọhụụ na-ekwu okwu.
Mpaghara dashboard dị na panel Advanced nke taabụ Vision
(`modality-bridge-max-chars` na `ModalityBridgeVisionTab.tsx`) ma na-ejide
uru ọ bụla dị n'etiti 1 na 99 ruo ala 100 mgbe ọ na-ahapụ `0` doro anya
n'enweghị mmetụ — `0` bụ uru Zod ziri ezi n'onwe ya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ọ bụghị naanị
ndabara "ewepụghị".

#### Nkọwa cache (`modalityBridge/bridgeCache.ts`)

N'ime ebe nchekwa LRU + TTL maka mmepụta nkọwa, kesara usoro niile.
Igodo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` na
framing ogologo-prefix (enweghị mgbagwoju anya mpaghara). Akụkụ ihe nlereanya bụ
ihe nlereanya akwa mmiri **ahaziri**, ọ bụghị ihe nlereanya zara n'ezie —
`callVisionModel` nwere ike ịlaghachi n'ime, na igodo kwa mgbalị ga-eme
ka cache gbajie. A naghị echekwa nkọwa dara ada. Ntọala:

| Igodo                           | Ndabara | Oke     |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Nkwalite onyonyo dịpụrụ adịpụ (nkọwa sekit onwe/nweta base64)

Mgbe akwa mmiri na-enweta onyonyo **dịpụrụ adịpụ** n'onwe ya — oku onwe Anthropic
na ntụgharị base64 claude-wire-format
(`ensureBase64ImagesForClaudeWire`), ha abụọ site na
`fetchRemoteImageAsDataUri()` na `visionBridgeHelpers.ts` — a na-ebufe data URI na-esote
site na `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) tupu etinye ya na arịrịọ ihe nlereanya ọhụụ.
A na-ebelata onyonyo buru ibu ruo **ogologo akụkụ 2048px** (na-adaba na oke nha
OpenAI/Anthropic na-etinye ugbua na sava), nke na-ebelata bytes/latency nbudata
n'agbanweghị ihe ihe nlereanya ọhụụ na-ahụ. Ndozi nha
na-eji `sharp`, ebudatara site na mbubata dị ike: na ikpo okwu ebe
ọnweghị ike ibudata ọnụọgụ abụọ ya, `normalizeDataUri()` **anaghị atụfu** — ọ na-alaghachi
na nnyefe nke bytes mbụ, yabụ ụzọ ntụgharị nkọwa/base64 na-aga n'ihu na-arụ ọrụ.
A na-ebufe bytes na-abụghị onyonyo (nweta nke na-eweghachighị
onyonyo enwere ike ịkọwa) n'enweghị mmetụ. Nkwalite a bụ
nke onyonyo akwa mmiri na-enweta maka oku onwe ya — anaghị etinye ya
na ibufe akwụkwọ onye ọkpụkpọ na-enweghị mgbanwe, dabara na ụkpụrụ mgbanwe
naanị-opt-in (Iwu siri ike #20).

#### Ntọala schema + nnyefe

Igodo `modalityBridge*` ọhụrụ bụ Zod-validated na `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, atọ `modalityBridgeCache*`, na
otu `modalityBridgeAudio*` nke Audio Bridge na-eji. Nnyefe
`141_modality_bridge_settings.sql` na-edegharị ụkpụrụ `visionBridge*` ochie dị adị
na igodo ọhụrụ dakọtara (idempotent, anaghị edegharị ụkpụrụ `modalityBridge*` onye ọrụ setịpụrụ);
igodo ochie na-anọgide na-anabata dị ka nkwụghachi azụ maka otu okirikiri ntọhapụ.

#### Isi okwu nghọta + stats

Nzaghachi gbanwere nkọwa na-ebu
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(nke `buildModalityBridgeHeader()` wuru na `modalityBridge/bridgeStats.ts`,
nke `withModalityBridgeHeader()` stampụrụ na `src/sse/handlers/chatHelpers.ts`).
Arịrịọ ebugharịghachị anaghị enweta isi okwu — ibufe akwụkwọ ahụ enweghị mmetụ
ma mgbanwe ihe nlereanya ahụ adịlarị na mpaghara `model` nke ahụ nzaghachi.

`GET /api/modality-bridge/stats` (njikwa njikwa, otu ọkwa dị ka
`GET /api/settings`) na-eweghachi counters n'ime ebe nchekwa kwa-modality
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` maka `vision`, `audio`, na
`video`. `averageLatencyMs` na-eji `latencySamples`, ọ bụghị mgbalị niile, dị ka
denominator ya; ọrụ na-enweghị oge anaghị emepụta ihe nlele efu-millisecond.
`bridged` na-anọgide na-abụ alias dakọtara azụ maka ntụgharị na-aga nke ọma;
mgbalị dara ada anaghị abawanye ya.
Counters na-atọgharị na mmalite usoro site na nhazi
(telemetry, ọ bụghị ndekọ ego).

#### Nhazi Dashboard

Ibe dashboard raara onwe ya bụ
`/dashboard/settings/modality-bridge`. `Vision`, `Audio`,
na `Video` taabụ ya nwere ike ịnweta site na URL na-echekwa paramita ajụjụ mgbe ị na-agbanwe uru `tab`.
Taabụ Vision na-ekpughe nkwado, ọnọdụ, nhọrọ ihe nlereanya (gụnyere nke akpaaka
ndabara), ịkpali ihe omume, oke oge/foto/ogologo nkọwa/cache dị elu,
ndekọ oge ọrụ, na arịrịọ nlele echekwara. Taabụ Audio dịkwa ndụ: ọ na-ekpughe
nkwado, onye na-ahọrọ ihe nlereanya STT-naanị na Auto, oke oge/oke clip, ndekọ ọdịyo,
na ule nlele `input_audio`. Taabụ Video na-arụ ọrụ: ọ na-akọ
ọnọdụ ọrụ FFmpeg/ffprobe — otu n'ime steeti UI anọ doro anya (`unknown` mgbe
nnyocha na-aga n'ihu ma ọ bụ enweghị ike imecha, `restricted` na onye ọbịa dashboard na-abụghị loopback
ebe a na-awụfe nnyocha n'akụkụ onye ahịa, `unavailable` ozugbo enyochachara
ma kwado na ọ na-efu, ma ọ bụ `available` na ụdị FFmpeg/ffprobe) — na-aga n'ihu
oke nkwado/ihe nlereanya/frame/vidiyo/oge, na-enyocha onye na-ahọrọ ihe nlereanya na-arụ ọrụ anya,
ma na-ekpughe ndekọ vidiyo.

Kaadị Vision Bridge gara aga n'okpuru ntọala AI bụ njikọ ndakọrịta na
ibe ọhụrụ ahụ; ọ naghịzi enwe otu akwụkwọ nke abụọ nke ụdị ahụ. Ndị na-enye mgbasa ozi
na-ejikọkwa usoro Image-to-Text na Speech-to-Text na Modality
Bridge taabụ kwekọrọ na-ewepụghị ebe egwuregwu Speech-to-Text dị ugbu a.

**Nkwụsị nnabata nke onwe:** mgbe oku nkọwa na-agafe OmniRoute's
`/v1` self-loop (ihe nlereanya na-abụghị ọkọlọtọ), arịrịọ ahụ na-eziga
`x-omniroute-admission-bypass: internal` ma jiri asambodo self-loop edoziri
kwado ya — `sk_omniroute` sentinel mpaghara na ọnọdụ mpaghara, ma ọ bụ
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` igodo gburugburu ebe obibi nke onye ọrụ haziri (#1350) ka
`REQUIRE_API_KEY=true` ntinye nwere ike ịga n'ihu na-agba oku nkọwa. A na-asọpụrụ nkwụsị ahụ
naanị maka asambodo ndị ahụ kpọmkwem, yabụ ndị ahịa mpụga enweghị ike iji
isiokwu ahụ wụfee nnabata.

Ndabara ochie dị na `src/shared/constants/visionBridgeDefaults.ts`;
ọnọdụ ọhụrụ/ihe omume/cache ndabara na onye na-edozi ntọala dị na
`src/shared/constants/modalityBridgeDefaults.ts`. Nchedo ahụ na-ekpughe
nhọrọ onye nrụpụta `deps` ka ule nwee ike itinye `getSettings` na
`callVisionModel` adịgboroja.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Na-egbochi arịrịọ nkata na-ebu ọdịyo tupu ha eruo ebumnuche
na-adịghị anabata ntinye ọdịyo. Ọ naghị atụgharị arịrịọ nkata ahụ: a na-edegharị akụkụ ọdịyo
site na njedebe multipart dakọtara na OpenAI dị ugbu a na
ihe nlereanya nkata ahọpụtara na-aga n'ihu na ederede ederede.

Usoro:

1. Dozie `supportsAudio` site na `getResolvedModelCapabilities()`. Metadata ndekọ onye na-enye
   doro anya na-emeri, mgbe ahụ metadata ihe nlereanya static, mgbe ahụ `modalities_input` agbakọrọ.
   Ndepụta ntinye ekwuputara na-enweghị `audio` bụ `false`; enweghị ihe akaebe ikike ka bụ `null`.
   Ma `false` na `null` na-eme ka àkwà mmiri nchekwa rụọ ọrụ, ebe `true` na-agabiga ya.
2. Dozie ntọala `modalityBridgeAudio*` ma wepụ akụkụ ọdịyo dị elu nwere ike ịgbakwunye
   site na ozi ọ bụla site na onye nchọpụta `detectMediaParts()` ekekọrịtara. Ụdị waya akwadoro
   bụ OpenAI `input_audio`, `audio_url`, na `source.media_type: "audio/*"`. A na-achọpụta ọdịyo
   akwụsị akwụsị maka ịgafe mana ụzọ splice anaghị ewepụ ya. A na-ekpuchi ọrụ site na
   `modalityBridgeAudioMaxClips`; akụkụ ndị ọzọ ka dị otu.
3. Sọpụrụ `provider/model` ahaziri, ma ọ bụ hapụ `selectAudioBridgeModel()` ka ọ gafee
   `AUDIO_TRANSCRIPTION_PROVIDERS` n'usoro katalọgụ kwụsiri ike ma họrọ ihe nlereanya mbụ
   nwere asambodo onye na-enye ọrụ nwere ike iji.
4. `callAudioTranscription()` na-agbanwe ọdịyo base64/data-URI ka ọ bụrụ `file` multipart,
   ma ọ bụ na-ebudata `audio_url` dịpụrụ adịpụ site na nchedo mpụga naanị ọha na eze
   na DNS pinning na oke 25 MB. Ọ na-eziga faịlụ ahụ na ihe nlereanya ahọpụtara na
   self-loop `/v1/audio/transcriptions` mpaghara, nke ejiri `resolveSelfLoopBearer()` kwado.
   Ụzọ ntụgharị dị ugbu a na-eme nchọta asambodo nkịtị, njikwa oge oyi/oke ọnụego,
   na nzipu onye na-enye.
5. Oku na-aga nke ọma na-edochi akụkụ ha na `[Audio N]: <transcript>`. Oku na-agba na
   `Promise.allSettled`: ọdịda nke onye ọ bụla na-echekwa akụkụ ọdịyo mbụ ahụ (#4012 nkwekọrịta).
   Ọ bụrụ na oku ọ bụla adaala ma ebumnuche ahụ egosipụtara `supportsAudio === false`, akụkụ ahụ na-aghọ
   `[Audio N]: (anaghị adị — enweghị onye na-enye STT ejikọrọ)` (#8430 nkwekọrịta). Maka
   ebumnuche amaghị (`null`), nsonaazụ ọdịda niile ka dị otu. Ebumnuche egosipụtara
   naanị ederede na-enweghị asambodo STT nwere ike iji na-enweta otu stub doro anya
   na-enweghị ịnye oku netwọk.

Ederede na-aga nke ọma na-eji Modality Bridge LRU/TTL cache nke usoro niile. Igodo ahụ
na-ejikọta ntụaka ọdịyo, akara ọrụ `audio-transcription` kwụsiri ike, na ihe nlereanya STT ahọpụtara;
anaghị echekwa ọdịda. Mgbalị ọdịyo na-emelite ndekọ `bridged`, `cacheHits`, `failures`,
na `lastUsedAt` ekekọrịtara. Nzaghachi agbanweela na-ebu
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; arịrịọ
anaghị emetụ aka anaghị enweta akụkụ Audio Bridge.

Ntọala oge ọrụ bụ DB-backed na Zod-validated:

| Igodo                         | Ndabara | Oke                 |
| ----------------------------- | ------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                   |
| `modalityBridgeAudioModel`    | `""`    | Auto ma ọ bụ STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                |

Cache ekekọrịtara ka na-achịkwa site na `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Na-egbochi akụkụ vidiyo kachasị elu na mkparịta ụka zuru ezu `messages` na nzaghachi
API `input` tupu akpọọ ebumnuche na-enweghị nkwado vidiyo amaara.
Ụdị akwadoro bụ `input_video`, `video_url`, `video_source`, HTTPS URLs,
na `data:video/*;base64,...` data URIs. A naghị ewere aha faịlụ nkịtị na ederede
dị ka vidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) nwere njem arịrịọ,
nlele ikike/amụma, nchịkọta kwa arịrịọ, na ibu nzaghachi.
Ọrụ kwa vidiyo — nnweta, nchekwa nsonaazụ niile, ịkọwa usoro etiti
(nke na-ejikọta ederede ọdịyo ọ bụla onye na-akpọ oku kwupụtara), na metrik/ịkwụsị/nhicha kwa mgbalị —
ezoro ezo n'azụ `processVideoPart` na `videoBridgePipeline.ts`,
akpọrọ otu ugboro kwa akụkụ vidiyo n'ime loop `preCall`.
Modul ahụ na-akọwakwa oke ọdụ ụgbọ mmiri doro anya `VideoMediaBrokerPort`
(na-enweta baiti ma na-ewepụta okpokoro nlele), `VideoAudioTranscriptionPort`
(na-ejikọta ederede ọdịyo onye na-akpọ oku kwupụtara na ndepụta okwu nlele), na
`VideoDrilldownPort` (oke nkwụsi ike nke okpokoro; a ka ejikọtaghị ya
na `processVideoPart` — naanị ụzọ `/api/modality-bridge/video/drilldown` dị iche
na-ede ntinye ntinye taa).

Ụzọ arịrịọ ọha `/v1` anaghị ebubata ma ọ bụ kpọọ usoro n'okpuru.
A na-ebudata vidiyo dịpụrụ adịpụ n'okpuru oke 50 MiB; vidiyo base64 n'ahịrị nwere
oke 36 MiB agbapụtara kwa vidiyo ka ihe nlereanya/ozi/ihe mkpuchi
nwere ike ịnọgide n'ime oke nnabata arịrịọ JSON ọha nke 50 MiB.
A na-enyocha ogologo n'ahịrị na atụmatụ nha agbapụtara tupu ekenye ya.
Achọrọ HTTPS na URL dịpụrụ adịpụ mbụ na ntụgharị ọ bụla, na-eji
nchedo mpụga ọha na eze dị ugbu a na ntinye DNS.
Baiti ahụ na-agafe oke `POST /api/modality-bridge/video/extract` broker dị n'ime.
Ụzọ ahụ bụ ma `LOCAL_ONLY` na `SPAWN_CAPABLE`, na-anabata naanị
arịrịọ eziokwu, ntụkwasị obi, kwa usoro, ma anaghị anabata URL, ụzọ faịlụ,
executable, ma ọ bụ ndepụta arụmụka.
Pipeline nha ahụ API na onye na-agụ ahụ na-arịwanye elu nke onye na-ejikwa
na-eme ka oke ntinye broker 50 MiB.
Ahịrị ya nwere oke na-agba otu mwepụta n'otu oge, na-enye ohere ọrụ anọ na-echere,
ma na-ekpuchi ntinye na-echere na 100 MiB.

N'ime broker, `ffprobe` na-agụ faịlụ mpaghara nzuzo; ndepụta ikike usoro edoziri
na-ewepụ ndepụta ọkpụkpọ na usoro ngosi.
Maka ihe nkwakọba ihe ezinụlọ MOV akwadoro, ntụaka data MOV mpụga ka agbanyụrụ
na ndabara, na iwu edoziri anaghị ahọrọ ha.
Ma `ffprobe` na `ffmpeg` na-eji ndepụta ọcha protocol `file`-only, otu eriri,
usoro arụmụka edoziri, enweghị shei, na executables edoziri site na `PATH`.
Ekwughị na iyi mkpuchi foto agbakwunyere bụ ndị nwere ike ịkpọ.
Iyi niile nwere ike ịkpọ ga-emezu oke, na a na-ahọrọ iyi ndabara doro anya
tupu ndabara kacha ala.
A na-ejedebe vidiyo na sekọnd 600, pikselụ 8,192 kwa akụkụ, na
pikselụ isi mmalite 33,554,432.
FFmpeg na-atụle okpokoro JPEG 1–16 etiti, na-ebelata ogologo akụkụ ruo
ihe kacha elu pikselụ 1,024 na-enweghị ịbawanye ntinye pere mpe,
ma anaghị anata URL.
Nlele bụ `uniform` na ndabara.
Amụma `scene_aware` nhọrọ na `segment_aware` nnwale na-eme otu ngafe FFmpeg
ọzọ edoziri n'elu iyi mpaghara akwadoro, na-ahọrọ oge ihe nkiri `showinfo`
nwere oke, ma na-adaba na otu etiti etiti na-adịgide adịgide na ọdịda nchọpụta,
oge agwụla, mmepụta na-ezighi ezi, ma ọ bụ nhazi onye na-aga ime efu.
Ụdị nwere ike ịhụ akụkụ na-ekenye ihe nlele etiti n'ụzọ ziri ezi na oge ihe nkiri
akwadoro; ihe akaebe nwere ike ịhụ akụkụ na omume ndabara ka akọwapụtara n'okpuru.
A na-etinye oke okpokoro 16 siri ike
mgbe nhọrọ gasịrị n'ime amụma ọ bụla.
Mgbe arịrịọ nwere ike ịhụ ihe nkiri nwere naanị otu okpokoro mmefu ego,
ọ na-eji etiti etiti nke vidiyo zuru oke ma ọ bụ windo lekwasịrị anya
ma na-akọ `policyEffective: uniform`: otu okpokoro ihe nkiri ahọpụtara
enweghị ike ichekwa ma nsọtụ oge.
Onye na-akpọ oku nwere ike inye windo lekwasịrị anya nwere oke (`start`/`end` sekọnd);
a na-ejikọta oke na oge mgbasa ozi, a na-ajụ windo tụgharịrị ma ọ bụ na-enweghị oke,
na a na-eme amụma nlele niile naanị n'ime oge ahụ akwadoro.
A na-etinye windo na-esote na metadata nlele na na
prefix nkọwa na-enweghị ntụkwasị obi ka ihe nlereanya dị n'okpuru nwee ike ịmata
ihe a na-elekwasị anya na usoro iheomume zuru oke.

Nlebara anya ndepụta okwu semantic bụ ntọala dị iche, doro anya.
Ụdị nyocha `full` ndabara na-echekwa ngwa ngwa okpokoro dị ugbu a
ma anaghị ebufe ederede arịrịọ na ihe nlereanya ndepụta okwu.
N'ụdị `focused`, àkwà mmiri ahụ na-agụ naanị `text`/`input_text` kacha ọhụrụ
na-abụghị efu nke onye ọrụ dere site na otu Chat ma ọ bụ Responses container,
na-eme ka ọ bụrụ NFC, na-agbada mkpụrụedemede njikwa na oghere,
ma na-ejedebe ya na isi koodu Unicode 500.
Nsonaazụ efu na-adaba na ngwa ngwa `full` kpọmkwem.
A na-eme ka ihe ngosi a na-eji eme ihe dị ka JSON n'ime ngọngọ
nke onye ọrụ na-enweghị ntụkwasị obi raara onwe ya nye ma nwee ike
ịhọrọ naanị nkọwa a na-ahụ anya; ọ nweghị ike imebi ịdọ aka ná ntị dị iche
megide ịgbaso ntụziaka a na-ahụ anya ma ọ bụ a na-anụ na mgbasa ozi.
Nlebara anya ederede anaghị eche `start`/`end` ma ọ bụ gbanwee
ihe nlele oge.

#### Ihe akaebe nhazi FU-07

`segment_aware` na-eji otu ngafe nyocha tupu oge eruo n'elu iyi vidiyo mpaghara
akwadoro.
Usoro nzacha edoziri na-ebu ụzọ gbanwee ruo ihe kacha elu pikselụ 320 n'obosara,
na-achọpụta mgbanwe ihe nkiri na oge oyi, wee na-atụle na okpokoro 1 kwa sekọnd
maka blur, luma nkezi, na ozi oghere/oge.
A na-ejedebe ngafe ahụ na ihe nlele nhazi 600, otu eriri FFmpeg/nzacha,
otu protocol `file`-only na ndepụta ikike container, oke mmepụta usoro 1 MiB,
na ihe kacha elu sekọnd 30 n'ime nkwụsị/oge agwụla nke broker.
Ọ naghị anabata iwu, nzacha, ụzọ, ma ọ bụ URL site na arịrịọ ahụ.

Ụkpụrụ nhazi bụ ihe akaebe nlele doro anya, ọ bụghị nghọta vidiyo semantic. Ha anaghị echebara isiokwu, omume, nkọwa, okwu, ma ọ bụ ebumnuche onye ọrụ. Oke ihe nkiri na oke oyi na-etolite akụkụ; mkpuchi oyi, blur, ikpughe, nkọwa oghere, na mgbanwe oge na-emetụta naanị otu esi ekenye mmefu ego okpokolo agba 1–16 dị adị. Akụkụ oyi kpọnwụrụ akpọnwụ zuru oke bụ otu okpokolo agba, ebe akụkụ ndị na-adịghị oyi na-asọ mpi maka mmefu ego fọdụrụnụ. Mgbe oke karịrị okpokolo agba, a na-ejigide mkpuchi oge dị n'otu ka mbelata ngwa ngwa n'oge agaghị ezochi akụkụ ogologo na-esote. A na-ejikọta oke ihe nkiri n'ime mkpebi nyocha 1-sekọnd nke oke oyi.

Ihe nzacha na-efu efu, ihe akaebe na-adịghị mma/efu, njehie nchọpụta, ma ọ bụ oge nyocha tupu oge eruo na-emeghe na amụma etiti etiti dị n'otu. Nkwụsị onye na-akpọ oku ma ọ bụ oge ngwụcha onye na-ere ahịa anaghị ada ada: ọ na-akwụsị usoro n'ime ụgbọ elu, na-egbochi iwepụ okpokolo agba ma emechaa, a na-ewepụkwa osisi nwa oge nkeonwe na `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` na-emepụta ezigbo ihe ndozi FFmpeg doro anya maka nchekwa oku-nkọwa mgbe nkwụsị gasịrị, nkesa mmefu ego mmegharị ahụ, ihe akaebe blur/ikpughe/SI-TI, mbelata ngwa ngwa nwere ogologo ọdụ, na adịgboroja na-apụta nwayọọ nwayọọ. Ọ na-edekọ oge mgbidi tupu nyocha na, ebe `/usr/bin/time` dị, CPU nwa na RSS kacha elu. Nyocha ogo ya bụ naanị oracles nhazi. Ezigbo ogo ihe nlereanya nkọwa ka bụ `HOLD` n'ihi na eriri a enweghị ebe ikike ma ọ bụ onye ikpe oyi kpọnwụrụ akpọnwụ. Nchekwa ego ka bụkwa `HOLD` ọ gwụla ma `--caption-cost-per-call-usd` na-enye atụmatụ doro anya kwa oku; edemede ahụ anaghị emepụta nsonaazụ ọ bụla.

A na-ejedebe okpokolo agba ọ bụla na 4 MiB, okpokolo agba niile ọnụ na 23 MiB, na nzaghachi onye na-ere ahịa serialized na 32 MiB. A na-ewepụ ndekọ nwa oge nkeonwe na `finally`. OmniRoute anaghị ejikọta FFmpeg ma anaghị anabata ụzọ executable omenala. Tupu ịkọwa, àkwà mmiri ahụ na-etinye nkwụsị nkwụsị anya na-echekwa: a na-ebelata JPEG ọ bụla ka ọ bụrụ ihe nchekwa grayscale 16×16 ma e jiri ya tụnyere naanị okpokolo agba ikpeazụ echekwara. Maka mmefu ego nkọwa a rịọrọ karịa otu okpokolo agba, iwepụ na-enye ọdọ mmiri onye ndoro-ndoro ochichi ruru ugboro abụọ nke mmefu ego ahụ ma ọ dịghị mgbe ọ gafechara okpokolo agba 16. A na-etinye okpu a rịọrọ naanị mgbe nkwụsị gasịrị, na ndị ndoro-ndoro ochichi mbụ na nke ikpeazụ ahọpụtara echekwara n'oge mbelata ikpeazụ mgbe mmefu ego dị ma ọ dịkarịa ala abụọ. Amụma `grayscale-16x16-mean-cells-v2` nke nwere ụdị na-eji nnukwu nkezi luma delta na oke mkpụrụ ndụ thumbnail nke delta ya normalized dịkarịa ala 0.05. Ọnụ ụzọ abụọ ahụ bụ 0.04 na-adịgide adịgide, ahọpụtara maka amụma kama ikpughe dị ka ntọala oge. Akara ngosi nke abụọ a dị elu na-echekwa obere mmegharị na mgbanwe ederede a na-ahụ anya nke ntụnyere naanị nkezi nwere ike izo. Njehie ntụnyere ma ọ bụ decoder na-emeghe ma na-ejigide mkpuchi. Metadata mmepụta na-ekewa ndị ndoro-ndoro ochichi ewepụtara, okpokolo agba ejiri nke ọma, na oyiri anya tụfuru.

Akụkụ vidiyo akara akara nwere ike ịrịọ mpempe akwụkwọ kọntaktị nwere akara oge. Àkwà mmiri ahụ na-ewu ihe ruru kọlụm 4, grid JPEG okpokolo agba 16. Mkpụrụ ndụ 512-pixel ọ bụla na-ere oge isi iyi ya n'ime eriri ala dị elu, ebe otu oge ahụ ka dị na metadata ederede maka njikọ na nyocha n'ihu. JPEG zuru oke ka dị na 32 MiB. Ọ bụrụ na `sharp` enweghị ike ịkọwa ma ọ bụ mepụta grid ahụ, àkwà mmiri ahụ na-alaghachi na okpokolo agba JPEG n'otu n'otu; nkwụsị onye ahịa ka na-agbasa site na ọrụ mpempe akwụkwọ.

Ihe akaebe nkwalite dị iche na microbenchmark mejupụtara sịntetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` na-akọwa eriri A/B nwere ụdị schema maka ezigbo ụdị ọhụụ dakọtara na OpenAI. Ọ na-atụle akara ngosi onye na-enye akụkọ, oge mgbidi njedebe ruo na njedebe (gụnyere nhazi mpempe akwụkwọ), ọnụ ọgụgụ oku ihe nlereanya, na njide eziokwu akọwapụtara. Anaghị ede nzaghachi ihe nlereanya raw na akụkọ ahụ; naanị nchịkọta SHA-256 na ID eziokwu dakọtara ka echekwara. Eriri ahụ anaghị eme netwọk ma ọ bụ oku ihe nlereanya akwụ ụgwọ ọ gwụla ma agafeela `--execute-real` ma ahazi `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY`. Na-enweghị ezigbo ọsọ doro anya ahụ, ikpe ya a na-agụ site na igwe ka bụ `HOLD`; nha ibu/ọnụ ọgụgụ oku sịntetik naanị abụghị ihe akaebe nkwalite.

Ndị na-akpọ oku nwere ike itinye nhọrọ `transcript.cues` na akụkụ vidiyo akwadoro mgbe ha nweelarị ederede ahaziri. Ihe ngosi ọ bụla ga-ebu `text`, oge `start`/`end` dị oke n'ime oge a nyochaa, na `source` akwadoro (`client`, `embedded`, ma ọ bụ `audio-bridge`); `confidence` na-adaba na `1` ma ga-anọgide n'etiti `0` na `1`. A na-agbada ihe ngosi oyiri doro anya. OmniRoute anaghị amalite idegharị site na metadata a: a na-edegharị ihe ngosi akwadoro n'ime nsonaazụ akọwara na isi iyi, ntụkwasị obi, na oge, a na-egosipụtakwa ha dị ka nleba anya na-enweghị ntụkwasị obi n'akụkụ nkọwa okpokolo agba. A na-ajụ ederede na-ezighi ezi, na-apụ apụ, ma ọ bụ na-enweghị ihe akaebe kama ịgwakọta ya n'ime iyi nkọwa. Ugbu a, onye na-akpọ oku na-ekwupụta mpaghara `source`, ọ bụghị ihe nkesa na-enyocha: OmniRoute na-eme ka uru ahụ bụrụ otu n'ime eriri atọ a kwadoro, mana ọ naghị akwado n'ụzọ cryptographic na akara `embedded` ma ọ bụ `audio-bridge` sitere n'ezie na iwepụta ihe nkesa nwere. Were `source` dị ka ihe ngosi na-enweghị ntụkwasị obi ruo mgbe nyocha ahụ ga-adaba; ewulala mkpebi ikike na ya.

Onye na-akpọ oku dị elu nwere ike inye egwu `audioTranscript` enyere ikike maka otu vidiyo ahụ. Nkwonkwo fusion na-agba nleba anya anya na ọdịyo n'okpuru otu oge ngwụcha na mgbaama nkwụsị, na-enye ha iwu n'otu usoro oge, na-agbada oyiri kpọmkwem, ma na-akọ akụkụ nsonaazụ mgbe naanị otu akụkụ ga-aga nke ọma. `audioTranscript` na-ezighi ezi na-emebi nsonaazụ ahụ — a na-edebe nkọwa anya ma alaka ọdịyo na-edekọ koodu ọdịda dị ọcha — kama ịda vidiyo ahụ dum. Nnweta alaka ọ bụla, ọkọlọtọ akụkụ, na koodu ọdịda dị ọcha na-echekwa na nsonaazụ akọwara, na metadata nchekwa (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), na metadata nchekwa nsonaazụ, yana na ngụkọta fusion akwa mmiri. Ụzọ Video Bridge ndabara anaghị akpọ okwu-na-ederede ma ọ bụ budata nnomi mgbasa ozi nke abụọ; na-enweghị egwu doro anya ahụ, ọ ka bụ naanị vidiyo.

**Nchekwa ederede (#12150 P1).** Nke a na-emetụta na-akpaghị aka mgbe ọ bụla Video Bridge (nke ya onwe ya bụ nhọrọ) na-enye akara ederede — enweghị ọkọlọtọ nchekwa dị iche. Mgbe arịrịọ na-enye akara ederede ọ bụla (onye na-akpọ oku kwupụtara `transcript` ma ọ bụ `audioTranscript` agwakọtara), nchekwa ahụ na-aka ya `videoBridgeObserved` ma na-emepụta onyinyo vidiyo eweghachitere — ihe ngosi yiri nke ahụ nke a na-eji `[redacted-video-transcript]` dochie ahụ ederede efu nke akara ọ bụla, nke e wuru site na dochie mpaghara akara ahaziri ahazi tupu agbakọta eriri ahụ (ọ dịghị mgbe ọ bụla site na ịtụgharị ederede dị larịị, yabụ ọ nweghị ọdịnaya akara — nke na-emegide ma ọ bụ nke nkịtị, gụnyere ahụ nwere `]` dị ka `[inaudible]`/`[music]` — nwere ike ịdị ndụ). Ahụ arịrịọ ndekọ oku na-adịgide adịgide na-agbanwe akụkụ ederede ọ bụla sitere na vidiyo maka onyinyo eweghachitere ahụ, nke kwekọrọ site na nha nha ọdịnaya; a na-agụgharị arịlịka `fullText` site na ibu nchekwa tupu oku emechara, yabụ egwuregwu ahụ ka na-aga nke ọma mgbe nchekwa agbụ agbụ mechara (PII na ndị na-ekpuchi nzere, ihe kacha mkpa 10/95) degharịa ederede nkọwa n'ebe ma mgbe sistemụ-ngwa ngwa/nyefe/nchekwa nchekwa na-emegharị usoro ozi ahụ. Ahụ ezigara n'elu mmiri na ihe nlereanya ahụ agbanweghị. Arịrịọ a hụrụ na-ejupụtakwa enweghị Nchekwa na-adịgide adịgide (a na-awụlikwa mwepụta sitere na arịrịọ na nzaghachi), yabụ nzaghachi nke ihe nlereanya ahụ agaghị ekwughachi ederede ederede n'ime Nchekwa.

Nnomi ndị ọzọ echekwara na-eji otu mgbaama arịrịọ a hụrụ. Nseta ihuenyo arịrịọ onye ahịa tupu nchekwa, arịrịọ na-echere na ebe nchekwa, na ndekọ arịrịọ jụrụ na mbụ na-edochi mpaghara ederede na akụkụ vidiyo; a na-ewepụta eriri ngwa ngwa nke usoro pipeline na nyefe ọnọdụ na ebe nchekwa arịrịọ na-adịgide adịgide. Ihe nrịbama `video_content_removed` na-adịgide adịgide na-eme ka nkwụsị `previous_response_id` daa kama ịmegharị ederede ebu n'obi tụfuo. Ọ bụrụ na arịrịọ a hụrụ tụfuo onyinyo nkwụsị ya n'akụkụ tupu ndekọ, ma ọ bụ ọbụna otu n'ime onyinyo vidiyo dị iche iche adaghị dakọtara mgbe mgbanwe arịrịọ mechara, a na-ahapụ ahụ arịrịọ echekwara kpamkpam kama idobe ederede eweghachitere akụkụ.

Maka arịrịọ a hụrụ, nzaghachi ihe nlereanya nwere ike ịkọwa akụkụ ọ bụla nke ederede na-enweghị oke akara ahaziri ahazi. Ya mere, a na-eji ihe nrịbama nkwụsị dochie `responseBody` ndekọ oku ya na-adịgide adịgide; anaghị echekwa ihe arụ pipeline zuru ezu (nke nwere ike ịgụnye ahụ elu mmiri/onye ahịa na akụkụ iyi). Nchekwa Semantic, idempotency, na nchekwa ntụgharị uche na-agbagharị ọgụgụ na ide maka arịrịọ ahụ. Arịrịọ onye na-enye ọrụ na nzaghachi onye ahịa na-ahụ anya ka agbanweghị. A na-ewepụta bytes nchekwa na mbụ site na nchekwa nwa oge mgbe ewepụrụ ihe arụ zuru ezu. Ịdọ aka ná ntị EventStream na-ezighi ezi nke Kiro na-akọ naanị ọnụọgụ byte ibu, ọ dịghị mgbe ọdịnaya ya ma ọ bụ njehie raw nke onye nyocha JSON.
Nke a anaghị ekwu na a nyochaala nyocha ọ bụla na-enweghị njikọ onye na-enye ọrụ/ngwa mgbakwunye; a na-enyocha nkwụsị nchekwa sara mbara na #11658.

Ndụ `/api/modality-bridge/video/drilldown` dị n'ime bụ ihe nchekwa dị iche, loopback/token-authenticated. Ọrụ ọ bụla chọkwara ID onye isi na-enweghị atụ. Tupu agbanye onye na-akpọ oku mmepụta, ọ ga-enwerịrị ID ahụ site na onye nwe ụlọ enyere ikike ma ọ dịghị mgbe ọ ga-ebugharị uru onye ahịa họọrọ. Igodo nchekwa na-ejikọta onye isi ahụ na ID nnọkọ na vidiyo-ntụaka, na-echekwa naanị igodo SHA-256 ha, ma na-agbanye ma ọgụgụ na ihichapụ n'otu onye isi ahụ. Nchekwa ahụ na-echekwa ihe kacha 16 okpokolo agba JPEG sitere na ntinye ọ bụla, na-eme ka ha gwụ mgbe nkeji iri gachara, ma na-akwado ọgụgụ `start`/`end` nwere oke ma ọ bụ ihichapụ nnọkọ doro anya.

Onye isi ọ bụla nwere oke na ntinye 16 na 64 MiB nke data JPEG. Oke ndị ahụ nweere onwe ha site na oke 64-ntinye/256 MiB zuru ụwa ọnụ: nrụgide oke onye isi na-ewepụ naanị ntinye onye isi ahụ ejighị n'oge na-adịbeghị anya tupu atụle mwepụ LRU zuru ụwa ọnụ. A na-ewepụ ntinye agwụla site na akaụntụ onye isi na nke zuru ụwa ọnụ na ọrụ nchekwa, ebe nkwụsị na ọdịda nkwenye anaghị eme ka nnọchi akụkụ.

Nchekwa ahụ na-ajụ Base64 na-abụghị nke canonical, oke padding, mgbasa ozi na-abụghị JPEG, JPEGs na-ezighi ezi ma ọ bụ nke ebibiri, na JPEGs na-emepụta ịdọ aka ná ntị n'oge `sharp` decode zuru oke nwere oke. Ọ na-emegharị onyonyo ọ bụla anabatara dị ka JPEG canonical, na-enweta obosara na ịdị elu site na bytes agbapụtara kama ịtụkwasị obi mpaghara onye na-akpọ oku, ma na-atụfu bytes polyglot ọ bụla na-esote kama idobe ha. Naanị buffer mkpakọ canonical nwere oke ka a na-ana ma oke abụọ. Oke waya JSON gụnyere Base64 n'elu maka oke ntinye agbapụtara 32 MiB. Nnweta ọ bụla echekwara na-edekọ usoro/mkpebi JPEG ya akwadoro, amụma nlele, ụdị nnweta, oge okike, hash ọdịnaya nke ihe nkesa gbakọọ, na ntụaka nne na nna hashed gbakwunyere hash ọdịnaya nne na nna nke onye na-akpọ oku tụkwasịrị obi. A na-enyocha nkwụsị n'etiti usoro decode/hash asynchronous tupu ntinye nchekwa atomic.

Nke a tranche ejikọtabeghị onye nrụpụta mmepụta na ụzọ ma ọ naghị enye nhọrọ dị iche iche nwere ọtụtụ mkpebi. Ya mere, ụzọ arịrịọ Video Bridge doro anya anaghị ebute ọrụ ọzọ, ebe nkwenye isi nke onye nwe ụlọ na usoro ndụ FU-08 zuru oke nwere ọtụtụ mkpebi ka bụ ọrụ nleba anya doro anya kama idekọ ya dị ka omume zuru oke.

A na-ede aha okpokoro n'usoro n'usoro site na model Video ahaziri ahazi. Nkwụsị Video efu na-eketa ntọala Vision; ọ bụrụ na ha abụọ tọgbọ chakoo, Vision auto-router na-ahọrọ model nwere ike ịhụ ụzọ dị irè. Aha okpokoro na-aga nke ọma na-edochi akụkụ mbụ ahụ site na `[Video description:` prefix kwụsiri ike nke na-egosipụtakwa ederede ahụ dị ka nleba anya sitere na mgbasa ozi na-enweghị ntụkwasị obi ma na-agwa models ndị ọzọ ka ha ghara ịgbaso ntụziaka dị na mgbasa ozi ahụ. Igodo cache nke aha okpokoro gụnyere bytes JPEG, prompt, timestamp, na model dị irè; naanị aha okpokoro na-aga nke ọma ka a na-echekwa na cache. Ntinye cache na-ejigide model onye nrụpụta na-aga nke ọma, gụnyere model ndabara; bridge na-akọ `mixed` mgbe models dị iche iche mepụtara okpokoro dị iche iche. Ntinye cache na-eji njirimara onye nrụpụta ahụ kama ịkpọgharị ya dị ka atụmatụ ụzọ a rịọrọ. A na-eji nsonaazụ cache nke vidiyo niile dị ka igodo site na ntinye ọ bụla na-agbanwe mmepụta — prompt, model dị irè, sampling policy, ọnụ ọgụgụ okpokoro, semantic analysis mode, SHA-256 fingerprint nke normalized focus hint, focus window, `transcript`, `audioTranscript`, na contact-sheet flag — yabụ ịgbanwe nke ọ bụla n'ime akụkụ ndị ahụ bụ cache miss, ọ bụghịkwa stale reuse. Visual dedup policy version, threshold, na bounded candidate-frame count dịkwa doro anya na igodo cache nsonaazụ na metadata; ya mere, mgbanwe policy enweghị ike iji nkọwa vidiyo zuru oke ochie. Metadata cache nsonaazụ v4 na-ejigide mode na fingerprint, ọ bụghị raw user task. Guardrail metadata na-akọ ma requested na effective analysis modes; a na-akọ requested `focused` mode na-enweghị ederede onye ọrụ a na-eji dị ka effectively `full`.

Guardrail na-ewepụ akụkụ vidiyo ọ bụla akwadoro mana ọ naghị akọwa ihe karịrị `modalityBridgeVideoMaxVideos`. Maka ebumnuche egosipụtara na ọ nwere `supportsVideo === false`, vidiyo ndị dara na ndị gafere oke na-aghọ akara ederede dị nchebe doro anya ka ọ nweghị raw video ga-adị ndụ. Mgbe ikike amaghị, akụkụ ndị ahụ ka na-emetụtaghị. Ebumnuche nwere `supportsVideo === true` na-agafe bridge ahụ.
Mgbama nkwụsị arịrịọ onye ahịa na-agbasa site na nbudata, broker queue, subprocesses, na oku caption; nkwụsị na-akwụsị n'etiti vidiyo ma ọ dịghị mgbe ọ na-ada ada imeghe na raw media.

Ntọala oge ọrụ bụ DB-backed na Zod-validated:

| Key                                 | Default     | Range / behavior                                                                                         |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Nhọrọ oge ọrụ, opt-in                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` na-ejigide aha okpokoro izugbe; `focused` na-eji oke, ntụkwasị obi kacha ọhụrụ nke onye ọrụ       |
| `modalityBridgeVideoModel`          | `""`        | Keta model Vision Bridge                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ma ọ bụ proportional `segment_aware`; ọdịda detector na-alaghachi na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Ụkpụrụ oge nkwụsị Video ochie karịrị sekọnd 120 ka a na-ejikọta na oge ngwụcha broker; a na-ajụ ide ntọala ọhụrụ karịrị oke ahụ. `GET /api/modality-bridge/video/runtime` chọrọ ntụkwasị obi stamped loopback locality tupu nkwenye ma ọ bụ nyocha oge ọrụ, wee chọọ nkwenye njikwa. Ọ na-eweghachi naanị `available`, sanitized FFmpeg/ffprobe versions, na ihe kpatara ya mgbe oge ọrụ adịghị. Ebe nkwụsị n'ime maka iwepụta abụghị API nbudata ọha: queue saturation na-eweghachi `503` gbakwunyere `Retry-After`, nkwụsị oku na-eweghachi `499`, na oge ngwụcha broker ahaziri na-eweghachi `504`. Nzaghachi ndị a gbanwere na-agbakwunye `video->text;model=<visionModel>;parts=<videos>` na isi `x-omniroute-modality-bridge` header na-ewepụghị Vision ma ọ bụ Audio segments.

### PII Masker (`piiMasker.ts`)

Na-agba ọsọ na **ma** stages.

- **`preCall`** na-emegharị payload ahụ, na-agafe `system`, `messages`, `input`, na `prompt` (gụnyere ihe ederede nkịtị), ma na-etinye `processPII()` (site na `@/shared/utils/inputSanitizer`) na `content`/`text` fields ederede. Mgbe `PII_REDACTION_ENABLED=true`, a na-edegharị PII achọpụtara na payload na-apụ apụ. Nke a bụ onwe ya site na `INPUT_SANITIZER_MODE` (nke na-achịkwa naanị prompt-injection policy). Mgbe redaction gbanyụrụ, oku ahụ na-edekọ ọnụ ọgụgụ nchọpụta na-edegharịghị ọdịnaya.
- **`postCall`** na-emegharị nzaghachi ahụ nke ọma, na-agba `sanitizePIIResponse()` gbakwunyere masker Responses-API-shape (`maskResponsesOutput` — na-ekpuchi `output_text` na `output[].content[].text`). Ọ bụrụ na redaction ọ bụla emee, nzaghachi a gbanwere na-edochi nke mbụ.

Guardrail anaghị egbochi; ọ na-edekọ naanị (`meta.detections`, `meta.redacted`) ma ọ bụ na-edegharị.

### Prompt Injection (`promptInjection.ts`)

Na-achọpụta usoro ndị na-emegide onwe ha na ọdịnaya onye ọrụ nyere ma na-eme ka policy ahaziri ahazi. Omume na-akwado site na environment variables na constructor options:

| Ntọala      | Env var                                                                                               | Nke ndabara | Mmetụta                                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enyere aka  | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Mgbe ọ bụ `false`, guardrail na-akwụsị ọrụ ozugbo.                                                                                                                           |
| Ụdị         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Iwu ntinye: `block`, `warn`, ma ọ bụ `log`. (`redact` anabatara maka ndakọrịta azụ mana ọ naghị ewepụ ederede ntinye; PII_REDACTION_ENABLED na-achịkwa arịrịọ idegharị PII.) |
| Oke mgbochi | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Oke ịdị njọ kacha nta achọrọ igbochi. `Medium` bụ naanị nlele na ndabara.                                                                                                    |

**Ihe kacha mkpa maka ụdị** (`getMode`): onye na-akpọ `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Ntọala →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Ya mere, ntinye aka dashboard na-emeri env vars, yabụ UI Feature Flags
na-achịkwa nchebe na-agba ọsọ ozugbo (enweghị mmalitegharị). Ọgụgụ DB bụ
nchekwa-ọdịda: ọ bụrụ na ọ daa, nchebe ahụ na-alaghachi na omume dabere na
gburugburu ebe obibi, ma mgbe etinyeghị ntinye aka, omume ahụ yiri mkpebi naanị
gburugburu ebe obibi.

Isi mmalite nchọpụta:

1.  `sanitizeRequest()` site na `@/shared/utils/inputSanitizer` (usoro nchọpụta
    eji eme ihe n'ebe ndị ọzọ na pipeline).
2.  `DEFAULT_GUARD_PATTERNS` arụnyere n'ime (ugbu a `system_override_inline` na
    `markdown_system_block`, ha abụọ nwere oke ịdị njọ).
3.  `customPatterns` nhọrọ agafere site na nhọrọ onye nrụpụta (eriri, regex,
    ma ọ bụ ndekọ `{ name, pattern, severity }`).

Mgbe `mode === "block"` **na** opekata mpe otu nchọpụta ruru oke ịdị njọ,
`preCall` na-eweghachi `{ block: true, message: "Request rejected: suspicious
content detected" }`. N'ụdị `warn`/`log`, guardrail na-edekọ mana ọ na-enye
ohere oku ahụ. A na-ebupụkwa onye inyeaka `evaluatePromptInjection()` maka ndị
na-akpọ oku chọrọ inyocha ngwa ngwa na-agafeghị ndekọ.

**Oke nyocha (v3.8.20):** ihe nchọpụta ahụ na-enyocha naanị **16 KB mbụ** nke
ederede ngwa ngwa jikọtara ọnụ — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384
bytes) na `src/shared/utils/inputSanitizer.ts`. Ma `detectInjection()` na
`evaluatePromptInjection()` na-eji `slice(0, MAX_INJECTION_SCAN_BYTES)` tupu
ha agbaa usoro usoro. Ntụziaka ntinye na-anọdụ n'elu ntinye, yabụ nke a na-egbochi
regex CPU/GC na ibu dị ọtụtụ narị KB na-emeghị ka nchọpụta daa (lee #3932,
#4041).

### Ihe mkpuchi nzuzo (`credentialMasker.ts`)

Na-agba ọsọ na **usoro abụọ ahụ**, nke ikpeazụ na usoro ndabara (priority `95`).
Na-ewepụ ụkpụrụ API-key / secret-token a ma ama site na ibu mpụga (ọdịnaya ozi,
arụmụka oku ngwaọrụ, nsonaazụ ngwaọrụ) **na** nzaghachi onye na-enye ya, yabụ na
agaghị agbapụta nzuzo etinyere na ngwa ngwa (ma ọ bụ ngwaọrụ weghachitere) na
onye na-enye ya ma ọ bụ laghachi na onye ahịa.

- **Naanị nhọrọ**, otu usoro dị ka mwepụ PII (Iwu siri ike #20-n'akụkụ):
  agbanyụrụ ma ọ bụrụ na `settings.credentialRedactionEnabled === true` **ma
  ọ bụ** `CREDENTIAL_REDACTION_ENABLED=true`. Mgbe ọ gbanyụrụ, guardrail bụ
  ihe efu — ọ naghị egbochi ma ọ naghị edegharị.
- `redactCredentials()` na-agafe osisi ibu/nzaghachi zuru oke (`walkValue()`,
  prototype-pollution-safe, cycle-safe site na `WeakSet`) ma jiri ihe nchekwa
  `[REDACTED:<type>]` dochie ihe dakọtara, na-emegharị naanị alaka ndị
  gbanwere n'ezie.
- `CREDENTIAL_PATTERNS` na-ekpuchi igodo onye na-enye LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), akara VCS/SaaS
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), igodo ịkwụ ụgwọ
  (Stripe, Square), igodo igwe ojii (AWS access key, Twilio, SendGrid,
  Mailgun), igodo nzuzo / JWTs, eriri njikọ na-ebu nzuzo
  (`mongodb://user:pass@...`, wdg.), na ụkpụrụ uru isiokwu
  `Authorization`/`x-api-key`/`api-key`/`apikey` n'ozuzu. Igodo ndị yiri
  isiokwu (`authorization`, `x-api-key`, `api-key`, `apikey`) ka ewepụrụ
  n'ụzọ nhazi (uru naanị, prefix atụmatụ dị ka `Bearer `/`Basic ` echekwara)
  kama site na regex ederede n'ozuzu.
- Guardrail anaghị egbochi; ọ na-edegharị naanị (`modifiedPayload` /
  `modifiedResponse`) ma na-akọwa (`meta.credentialsRedacted`, `meta.count`).

Nchebe mbelata: `tests/unit/credential-masker-guardrail.test.ts`.

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
