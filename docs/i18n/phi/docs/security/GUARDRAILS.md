# Guardrails (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/guardrails/`
> **Huling na-update:** 2026-08-29 — v3.8.51 (ang pinagmulan ng transcript ng Video Bridge ay idinedeklara ng tumatawag,
> hindi pa bineberipika ng server — nilinaw alinsunod sa #11661)

Ipinapatupad ng mga guardrail ang kaligtasan, patakaran, at mga pagbabago sa content sa hangganan
sa pagitan ng OmniRoute at mga upstream provider. Maaaring suriin ng bawat guardrail (at
opsyonal na tanggihan, baguhin, o lagyan ng anotasyon) ang mga request payload (`preCall`) at
mga upstream response (`postCall`).

Ang system ay **fail-open**: kung mag-throw ang isang guardrail habang isinasagawa, itinatala ng registry
ang error at nagpapatuloy sa susunod na guardrail sa halip na mabigo ang
request. Ang pag-block ay isang tahasang desisyon (`block: true`), at hindi kailanman aksidente.

## Mga Built-in na Guardrail

Awtomatikong nilo-load ng registry ang anim na guardrail ayon sa pagkakasunod-sunod ng priyoridad sa pag-import
(tingnan ang `registry.ts` → `registerDefaultGuardrails()`):

| Priyoridad | Pangalan            | (Mga) Yugto    | File                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ang mas mababang numero ng priyoridad ang **unang** pinapatakbo.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Hinaharang nito ang mga request na may image na nakatuon sa mga **model na walang vision** at alinman sa
iniruruta muli ang buong request sa isang model na may kakayahang vision o pinapalitan ang mga bahagi ng
image ng mga tekstuwal na paglalarawang ginawa ng isang nako-configure na vision model bago
ang upstream call. Nagbibigay-daan ito sa mga text-only provider na malinaw na pangasiwaan ang
mga multimodal payload.

Daloy:

1. Laktawan kung sinusuportahan na ng target na model ang vision (maliban kung kasama ito sa
   listahan ng sapilitang bridge na `isVisionBridgeForcedModel`).
2. I-extract ang mga bahagi ng image sa pamamagitan ng `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), na ipinapasa ang gawain sa **pinag-isang media
   detector** na `detectMediaParts()` sa `open-sse/utils/mediaParts.ts` — ang
   nag-iisang pinagmumulan ng katotohanan na ibinabahagi sa combo compatibility filter.
   Ang extraction ay limitado sa allowlist ng mga top-level na bahagi na may mga hugis na
   maaaring muling isingit ng `replaceImageParts` (ang extract↔replace contract): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, at Responses API `input_image`. Ang mga nested hit at
   hugis na indicator-only ay materyal para sa combo filter at hindi kailanman ine-extract.
   Laktawan kung walang nahanap.
3. I-resolve ang runtime config sa pamamagitan ng `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nananaig ang mga bagong
   setting key na `modalityBridge*`; nananatili ang mga legacy key na `visionBridge*` bilang
   **one-cycle fallback** (rollback window). Laktawan bago ang anumang media traversal kapag
   naka-disable ang bridge.
4. Tinutukoy ng mode selector (`modalityBridgeVisionMode`, tingnan ang talahanayan sa ibaba) kung
   reroute o describe. Nagbabalik ang reroute ng `modifiedPayload` kung saan `model` lamang
   ang pinalitan, kasama ang meta na `{ rerouted, fromModel, toModel, imagesKept }`.
5. Describe path: limitahan ang mga image sa `maxImages`, buuin ang task-aware na prompt,
   konsultahin ang describe cache, tawagan ang vision model nang **parallel**
   (`Promise.allSettled`), at ipalit ang mga text part na `[Image N]: <description>`
   sa kinalalagyan ng mga ito. Ang nabigong describe ay nagbubunga ng `null` at ang orihinal na bahagi ng image ay
   **pinapanatili** (#4012) — maliban sa combo describe path kapag nabigo ang bawat
   describe, kung saan ang isang kumpirmadong non-vision upstream ay tumatanggap na lang ng
   `(hindi available — walang nakakonektang provider na may kakayahang vision)` na stub (#8430).
6. Ibalik ang `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Gawi                                                                                                                                                                                                                                                                                                           |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Legacy na heuristic, hindi binago (#6640/#7204): ang mga non-combo/`auto/` model ay nire-reroute sa pinakamahusay na vision model maliban kung mayroon nang magagamit na credential ang orihinal na model (kung gayon ay magde-describe); palaging nagde-describe ang mga combo target.                        |
| `describe` |         | Palaging mag-describe — ganap na nilalaktawan ang reroute block; ang piniling model ng user ang palaging sumasagot.                                                                                                                                                                                            |
| `reroute`  |         | Sapilitang reroute: nilalampasan ang guard na nagpapanatili sa model na may credential. Nalalapat pa rin ang credential guard ng reroute-**target** — kapag walang magagamit na vision target, tutuloy ang request sa describe upang hindi makarating ang mga raw image sa isang text-only na backend (#8430). |

Nagso-short-circuit ang mga sapilitang mode **bago** tumakbo ang auto heuristic; ang gawi ng `auto`
ay byte-identical sa guardrail bago ang PR-1.

#### Task-aware na describe prompt (`modalityBridgeVisionTaskAware`)

**True** bilang default. Idinaragdag ng `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
ang text ng **huling mensahe ng user** (pinaikli sa 500 character) sa base
describe prompt, upang ituon ang paglalarawan sa aktuwal na itinanong ng user
(pattern ng codex-vision-proxy) at hilingin sa vision model na i-transcribe ang nakikitang
text. Kapag naka-off ang flag — o walang text mula sa user — ginagamit ang base prompt nang walang pagbabago.

Ang sariling OpenAI-compatible na request ng describe self-loop (`callVisionModelSingle()`
sa `visionBridgeHelpers.ts`) ay palaging humihiling ng `image_url.detail: "high"` —
nang walang kondisyon, para sa bawat caller/provider, at hindi nakadepende sa anumang signal ng client.
Pinapababa ng low-detail sampling ang katumpakan ng OCR para mismo sa gawain ng
pag-transcribe ng teksto na hinihingi ng prompt na ito, kaya palaging humihiling ang
describe call ng high detail anuman ang antas ng detalye na ginamit ng orihinal na
papasok na request. Nakaaapekto lamang ito sa internal na request body ng describe;
hindi nito binabago kung paano ipinapasa ng OmniRoute ang sariling
`image_url.detail` ng caller sa pangunahing request — hiwalay na inilalapat ang
default na iyon, at para lamang sa mga natukoy na OpenCode client, sa
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Walang
`detail` field ang Anthropic wire-format branch ng describe self-loop at hindi ito
naaapektuhan ng alinmang default.

#### Limitasyon ng output ng describe (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Saklaw          |
| ------------------------------ | ------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` o 100–50000 |

Ang `0` (default) ay nangangahulugang **walang limitasyon** — ang paglalarawang
ibinabalik ng `callVisionModel()` ay ipinapasa nang walang pagbabago, kaya
napapanatili ang kasalukuyang gawi. Pinuputol ng anumang value sa saklaw na
100–50000 ang paglalarawan na may `…` suffix bago ito muling isingit bilang
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` sa
`src/lib/guardrails/visionBridge.ts`). Taasan ito para sa mga gawaing OCR na
nangangailangan ng maraming detalye kung saan kailangan ng downstream model ang
buong transcription; babaan ito upang limitahan ang paggamit ng token sa mga
madaldal na vision model. Matatagpuan ang dashboard field sa Advanced panel ng
Vision tab (`modality-bridge-max-chars` sa `ModalityBridgeVisionTab.tsx`) at
itinataas nito ang anumang value sa pagitan ng 1 at 99 sa minimum na 100 habang
hindi binabago ang tahasang `0` — ang `0` ay isang valid na Zod value mismo
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), at hindi lamang
ang "hindi nakatakda" na default.

#### Cache ng describe (`modalityBridge/bridgeCache.ts`)

In-memory na LRU + TTL cache para sa mga output ng describe, na pinagsasaluhan sa
buong process. Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
na may length-prefix framing (walang mga banggaan sa hangganan ng field). Ang
bahagi ng model ay ang **naka-configure** na bridge model, hindi ang model na
aktuwal na sumagot — maaaring internal na gumamit ng fallback ang
`callVisionModel`, at paghahati-hatiin ng pag-key sa bawat attempt ang cache.
Hindi kailanman naka-cache ang mga nabigong describe. Mga setting:

| Key                             | Default | Saklaw  |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasyon ng remote image (self-loop describe/base64 fetch)

Kapag ang bridge mismo ang kumukuha ng isang **remote** na image — ang Anthropic
describe self-call at ang claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`), na parehong dumaraan sa
`fetchRemoteImageAsDataUri()` sa `visionBridgeHelpers.ts` — ipinadaraan ang
resultang data URI sa `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) bago ito i-embed sa request ng vision model.
Ang mga sobrang laking image ay pinaliliit sa **2048px na mahabang gilid**
(katulad ng resize cap na inilalapat na ng OpenAI/Anthropic sa server-side), na
nagpapababa sa upload bytes/latency nang hindi binabago ang nakikita ng vision
model. Gumagamit ang resizing ng `sharp`, na nilo-load sa pamamagitan ng dynamic
import: sa isang platform kung saan hindi ma-load ang native binary nito,
**hindi kailanman nagta-throw** ang `normalizeDataUri()` — bumabalik ito sa
passthrough ng orihinal na bytes, kaya patuloy na gumagana ang
describe/base64-conversion path. Ang mga byte na hindi image (isang fetch na
hindi nagbalik ng nade-decode na image) ay ipinapasa rin nang walang pagbabago.
Saklaw lamang ng normalisasyong ito ang mga image na kinukuha ng bridge para sa
sarili nitong self-call — hindi ito kailanman inilalapat sa raw passthrough
payload ng caller, alinsunod sa prinsipyo ng mutation na opt-in lamang
(Hard Rule #20).

#### Schema ng mga setting + migration

Ang mga bagong `modalityBridge*` key ay bina-validate ng Zod sa
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, ang
`modalityBridgeCache*` trio, at ang grupong `modalityBridgeAudio*` na ginagamit
ng Audio Bridge. Kinokopya ng migration na `141_modality_bridge_settings.sql`
ang mga kasalukuyang legacy na `visionBridge*` value sa katumbas na mga bagong
key (idempotent, hindi kailanman ino-overwrite ang isang `modalityBridge*` value
na itinakda ng operator); patuloy na tinatanggap ang mga legacy key bilang read
fallback sa loob ng isang release cycle.

#### Transparency header + stats

Ang mga response na binago ng describe ay may
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(na binubuo ng `buildModalityBridgeHeader()` sa
`modalityBridge/bridgeStats.ts`, at inilalagay ng
`withModalityBridgeHeader()` sa `src/sse/handlers/chatHelpers.ts`).
**Walang** header ang mga request na ni-reroute — hindi binago ang payload at
makikita na ang pagpapalit ng model sa `model` field ng response body.

Ang `GET /api/modality-bridge/stats` (management auth, kaparehong tier ng
`GET /api/settings`) ay nagbabalik ng mga in-memory per-modality counter na
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para sa `vision`, `audio`, at
`video`. Ginagamit ng `averageLatencyMs` ang `latencySamples`, hindi ang lahat ng
attempt, bilang denominator nito; ang isang operation na walang timing ay hindi
gumagawa ng pekeng zero-millisecond sample. Nananatili ang `bridged` bilang
backward-compatible na alias para sa mga matagumpay na conversion; hindi ito
dinadagdagan ng mga nabigong attempt.
Sadyang nire-reset ang mga counter kapag nag-restart ang process
(telemetry, hindi accounting).

#### Configuration ng dashboard

Ang nakalaang pahina ng dashboard ay
`/dashboard/settings/modality-bridge`. Pinapanatili ng mga tab nitong `Vision`, `Audio`,
at `Video` na direktang naa-access sa pamamagitan ng URL ang mga query parameter habang
binabago ang value ng `tab`. Inilalantad ng tab na Vision ang pagpapagana, mode, pagpili
ng modelo (kabilang ang awtomatikong default), pag-prompt na isinasaalang-alang ang gawain,
mga advanced na limitasyon sa timeout/image/haba-ng-paglalarawan/cache, mga runtime
counter, at isang protektadong halimbawang request. Aktibo rin ang tab na Audio:
inilalantad nito ang pagpapagana, isang model picker na STT-only na may Auto, mga limitasyon
sa timeout/max-clip, mga audio counter, at isang halimbawang pagsubok na `input_audio`.
Gumagana ang tab na Video: iniuulat nito ang runtime state ng FFmpeg/ffprobe — isa sa
apat na tahasang UI state (`unknown` habang isinasagawa ang probe o hindi ito makumpleto,
`restricted` sa isang non-loopback dashboard host kung saan nilalaktawan ang probe sa
client-side, `unavailable` kapag naisagawa na ang probe at nakumpirmang wala ito, o
`available` kasama ang mga bersyon ng FFmpeg/ffprobe) — pini-persist nito ang mga limitasyon
sa enable/model/frame/video/timeout, fina-filter ang model picker para sa mga modelong may
kakayahang vision, at inilalantad ang mga video counter.

Ang dating Vision Bridge card sa ilalim ng mga setting ng AI ay isa na ngayong compatibility
link patungo sa bagong pahina; hindi na ito nagmamay-ari ng pangalawang kopya ng form.
Ini-link din ng Media Providers ang mga workflow na Image-to-Text at Speech-to-Text sa mga
kaukulang tab ng Modality Bridge nang hindi inaalis ang kasalukuyang Speech-to-Text
playground.

**Pag-bypass sa admission para sa self-loop:** kapag dumaraan ang describe call sa sariling
`/v1` self-loop ng OmniRoute (non-standard na modelo ng provider), ipinapadala ng sub-request
ang `x-omniroute-admission-bypass: internal` at ina-authenticate ito gamit ang na-resolve na
credential ng self-loop — ang lokal na `sk_omniroute` sentinel sa local mode, o ang
env key na `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` na na-configure ng operator (#1350) upang
mapatakbo pa rin ng mga deployment na `REQUIRE_API_KEY=true` ang describe call. Iginagalang
lamang ang bypass para sa eksaktong mga credential na iyon, kaya hindi magagamit ng mga
external client ang header upang laktawan ang admission.

Nasa `src/shared/constants/visionBridgeDefaults.ts` ang mga legacy default; nasa
`src/shared/constants/modalityBridgeDefaults.ts` naman ang mga bagong default para sa
mode/task-aware/cache at ang settings resolver. Naglalantad ang guardrail ng isang
constructor option na `deps` upang makapag-inject ang mga test ng mga pekeng
implementasyon ng `getSettings` at `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Hinaharang ang mga chat request na may audio bago makarating ang mga ito sa isang target
na hindi kilalang tumatanggap ng audio input. Hindi nito kailanman nire-reroute ang chat
request: tina-transcribe ang mga bahagi ng audio sa pamamagitan ng kasalukuyang
OpenAI-compatible multipart endpoint at nagpapatuloy ang napiling chat model gamit ang
mga text transcript.

Daloy:

1. I-resolve ang `supportsAudio` sa pamamagitan ng `getResolvedModelCapabilities()`.
   Nauuna ang tahasang provider-registry metadata, kasunod ang static model metadata,
   at pagkatapos ay ang naka-sync na `modalities_input`. Ang isang idineklarang listahan
   ng input na walang `audio` ay `false`; kung walang ebidensya ng kakayahan, nananatili
   itong `null`. Kapwa ina-activate ng `false` at `null` ang konserbatibong bridge,
   samantalang nilalampasan ito ng `true`.
2. I-resolve ang mga setting na `modalityBridgeAudio*` at kunin ang mga top-level na bahagi
   ng audio na maaaring i-splice mula sa bawat mensahe sa pamamagitan ng nakabahaging
   detector na `detectMediaParts()`. Ang mga sinusuportahang wire shape ay OpenAI
   `input_audio`, `audio_url`, at `source.media_type: "audio/*"`. Natutukoy ang nested
   audio para sa routing ngunit hindi ito inaalis ng splice path. Nililimitahan ng
   `modalityBridgeAudioMaxClips` ang gawain; nananatiling hindi nababago ang mga kasunod
   na bahagi.
3. Sundin ang isang na-configure na `provider/model`, o hayaang siyasatin ng
   `selectAudioBridgeModel()` ang `AUDIO_TRANSCRIPTION_PROVIDERS` ayon sa matatag na
   pagkakasunod-sunod ng catalog at piliin ang unang modelo na may magagamit na aktibong
   provider credential.
4. Kino-convert ng `callAudioTranscription()` ang base64/data-URI audio sa isang multipart
   `file`, o dina-download ang isang remote na `audio_url` sa pamamagitan ng public-only
   outbound guard na may DNS pinning at limitasyong 25 MB. Pagkatapos, ipinapadala nito
   sa pamamagitan ng POST ang file at napiling modelo sa lokal na
   `/v1/audio/transcriptions` self-loop, na ina-authenticate gamit ang
   `resolveSelfLoopBearer()`. Isinasagawa ng kasalukuyang transcription route ang normal
   na paghahanap ng credential, pangangasiwa sa cooldown/rate-limit, at dispatch sa
   provider.
5. Pinapalitan ng mga matagumpay na call ang kanilang mga bahagi ng
   `[Audio N]: <transcript>`. Tumatakbo ang mga call gamit ang `Promise.allSettled`:
   pinapanatili ng isang indibidwal na failure ang orihinal na bahagi ng audio na iyon
   (#4012 contract). Kung mabigo ang lahat ng call at napatunayang
   `supportsAudio === false` ang target, magiging
   `[Audio N]: (unavailable — no STT provider connected)` ang mga bahagi (#8430 contract).
   Para sa isang hindi kilalang target (`null`), nananatiling hindi nababago ang resulta
   kapag nabigo ang lahat. Ang isang napatunayang text-only na target na walang
   magagamit na STT credential ay makakatanggap ng parehong tahasang stub nang hindi
   nagsasagawa ng network call.

Ginagamit ng mga matagumpay na transcript ang process-wide na LRU/TTL cache ng Modality
Bridge. Pinagsasama ng key ang audio reference, ang matatag na operation label na
`audio-transcription`, at ang napiling STT model; hindi kailanman kina-cache ang mga
failure. Ina-update ng mga pagtatangkang audio ang mga nakabahaging counter na `bridged`,
`cacheHits`, `failures`, at `lastUsedAt`. Taglay ng mga na-transform na response ang
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; hindi
nakakatanggap ng segment ng Audio Bridge ang mga request na hindi nabago.

DB-backed at Zod-validated ang mga runtime setting:

| Key                           | Default | Saklaw        |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | Auto o STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

Patuloy na kinokontrol ang nakabahaging cache ng `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, at `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Hinaharang ang mga top-level na bahagi ng video sa Chat Completions `messages` at Responses
API `input` bago tawagin ang isang target na walang kilalang native na suporta sa video.
Ang mga sinusuportahang anyo ay `input_video`, `video_url`, `video_source`, mga HTTPS URL,
at `data:video/*;base64,...` na mga data URI. Ang mga simpleng filename sa text ay hindi
itinuturing na video.

Ang `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ang namamahala sa traversal ng request,
pagsusuri ng capability/policy, pagsasama-sama sa bawat request, at response payload.
Ang gawain sa bawat video — pagkuha, cache ng buong resulta, paglalarawan ng isang frame
sequence (na pinagsasama ang anumang audio transcript na idineklara ng caller), at mga
metric/abort/cleanup sa bawat pagtatangka — ay nakatago sa likod ng `processVideoPart` sa
`videoBridgePipeline.ts`, na tinatawag nang isang beses para sa bawat bahagi ng video sa loob
ng loop ng `preCall`. Tinutukoy rin ng module na iyon ang mga tahasang hangganan ng port na
`VideoMediaBrokerPort` (pagkuha ng mga byte at pag-extract ng mga na-sample na frame),
`VideoAudioTranscriptionPort` (pagsasama ng audio transcript na idineklara ng caller sa mga
na-sample na caption), at `VideoDrilldownPort` (ang hangganan ng persistence para sa frame
drill-down; hindi pa nakakabit sa `processVideoPart` — tanging ang hiwalay na route na
`/api/modality-bridge/video/drilldown` ang nagsusulat ng mga drill-down entry sa kasalukuyan).

Ang pampublikong `/v1` request path ay hindi kailanman nag-i-import o tumatawag ng subprocess.
Dina-download ang mga remote na video sa ilalim ng limitasyong 50 MiB; ang mga inline na
base64 video ay may konserbatibong decoded cap na 36 MiB bawat video upang manatili ang
model/messages/framing envelope sa loob ng pampublikong limitasyong 50 MiB para sa pagtanggap
ng JSON request. Sinusuri ang inline na haba at mga pagtataya sa decoded size bago ang
allocation. Kinakailangan ang HTTPS sa paunang remote URL at sa bawat redirect, gamit ang
umiiral na public-only outbound guard na may DNS pinning. Pagkatapos, tatawid ang mga byte sa
eksaktong internal na broker boundary na `POST /api/modality-bridge/video/extract`. Ang route
na iyon ay parehong `LOCAL_ONLY` at `SPAWN_CAPABLE`, tumatanggap lamang ng authenticated na
request na para sa bawat proseso at mula sa pinagkakatiwalaang loopback, at hindi kailanman
tumatanggap ng URL, filesystem path, executable, o listahan ng mga argument. Magkahiwalay na
ipinapatupad ng API body-size pipeline at incremental body reader ng handler ang 50 MiB na
broker input cap. Ang bounded queue nito ay nagpapatakbo ng isang extraction sa bawat
pagkakataon, nagpapahintulot ng apat na pending job, at naglilimita sa pending input sa
100 MiB.

Sa loob ng broker, binabasa ng `ffprobe` ang isang pribadong local file; hindi kasama sa
nakapirming format allowlist ang mga format ng playlist at manifest. Para sa mga pinapayagang
MOV-family container, nananatiling naka-disable bilang default ang mga external MOV data
reference, at hindi ino-opt in ng nakapirming command ang mga ito. Parehong ginagamit ng
`ffprobe` at `ffmpeg` ang protocol whitelist na `file` lamang, isang thread, mga nakapirming
array ng argument, walang shell, at mga executable na niri-resolve mula sa `PATH`. Ang mga
attached-picture cover stream ay hindi maaaring maging mga playable candidate. Dapat
matugunan ng lahat ng playable stream ang mga limitasyon, at inuuna ang isang tahasang default
stream bago ang deterministic na fallback sa pinakamababang index. Nililimitahan ang mga video
sa 600 segundo, 8,192 pixel bawat dimensyon, at 33,554,432 source pixel. Nag-i-sample ang
FFmpeg ng 1–16 midpoint JPEG frame, nagpapaliit sa mahabang gilid hanggang sa hindi hihigit sa
1,024 pixel nang hindi nag-a-upscale ng mas maliliit na input, at hindi kailanman tumatanggap
ng URL. `uniform` ang sampling bilang default. Ang opsyonal na `scene_aware` at eksperimental
na `segment_aware` na mga policy ay nagsasagawa ng isa pang nakapirming FFmpeg pass sa
na-validate nang local stream, pumipili ng mga bounded na `showinfo` scene timestamp, at
deterministikong bumabalik sa parehong mga uniform midpoint kapag nabigo o nag-timeout ang
detector, malformed ang output, o walang laman ang candidate set. Naglalaan ang segment-aware
mode ng mga midpoint sample nang proporsyonal sa mga na-validate na scene interval; inilalarawan
nang detalyado sa ibaba ang segment-aware na ebidensya at fallback behavior. Inilalapat ang
mahigpit na 16-frame cap pagkatapos ng pagpili sa bawat policy. Kapag ang isang scene-aware na
request ay may one-frame budget lamang, ginagamit nito ang uniform midpoint ng aktibong
full-video o focus window at nag-uulat ng `policyEffective: uniform`: hindi mapapanatili ng
iisang napiling scene frame ang parehong temporal na dulo. Maaaring opsyonal na magbigay ang
caller ng finite na focus window (`start`/`end` na mga segundo); iki-clamp ang mga bound sa
tagal ng media, tatanggihan ang reversed o non-finite na mga window, at isasagawa lamang ang
lahat ng sampling policy sa loob ng normalized na interval. Isinasama ang nagresultang window
sa sampling metadata at sa untrusted description prefix upang matukoy ng mga downstream model
ang pagkakaiba ng isang nakatuong excerpt mula sa buong timeline.

Ang semantic caption focus ay isang hiwalay at tahasang setting. Pinananatili ng default na
`full` analysis mode ang umiiral na frame prompt at hindi kailanman ipinapasa ang request text
sa caption model. Sa `focused` mode, binabasa lamang ng bridge ang pinakabagong hindi bakanteng
`text`/`input_text` na isinulat ng user mula sa parehong Chat o Responses container, ginagawa
itong normalized sa NFC, kino-collapse ang mga control character at whitespace, at nililimitahan
ito sa 500 Unicode code point. Kapag walang laman ang resulta, babalik ito sa eksaktong `full`
na prompt. Ang isang magagamit na hint ay ise-serialize bilang JSON sa isang nakalaang
untrusted-user-context block at maaari lamang magbigay-priyoridad sa mga napagmamasdang detalye;
hindi nito maaaring i-override ang hiwalay na babala laban sa pagsunod sa mga instruction na
nakikita o naririnig sa media. Ang textual focus ay hindi kailanman nag-i-infer ng `start`/`end`
o nagbabago sa temporal sampler.

#### FU-07 na istruktural na ebidensya ng segment

Gumagamit ang `segment_aware` ng isang bounded na pre-analysis pass sa na-validate nang local
video stream. Ang nakapirming filter chain ay nagpapaliit muna sa hindi hihigit sa 320 pixel
ang lapad, tumutukoy ng mga pagbabago ng scene at mga frozen interval, at pagkatapos ay
nagsa-sample sa bilis na 1 frame bawat segundo para sa blur, average luma, at
spatial/temporal information. Nililimitahan ang pass sa 600 structural sample, isang
FFmpeg/filter thread, parehong protocol na `file` lamang at mga container allowlist, isang
1 MiB process-output bound, at hindi hihigit sa 30 segundo sa loob ng pinagsasaluhang
abort/deadline ng broker. Hindi ito kailanman tumatanggap ng command, filter, path, o URL mula
sa request.

Ang mga structural value ay deterministic sampling evidence, hindi semantic video
understanding. Hindi nila tinutukoy ang mga subject, action, caption, speech, o
layunin ng user. Bumubuo ng mga segment ang mga scene at freeze boundary; ang freeze
coverage, blur, exposure, spatial detail, at temporal change ay nakaaapekto lamang sa
kung paano inilalaan ang umiiral na budget na 1–16 frame. Ang ganap na frozen na
segment ay nililimitahan sa isang frame, habang nakikipagkumpitensya ang mga
non-frozen segment para sa natitirang budget. Kapag mas marami ang mga boundary
kaysa sa mga frame, pinananatili ang pantay na coverage ng timeline upang hindi
maitago ng mabilis na mga cut sa simula ang isang mahabang segment sa hulihan.
Pinagsasama ang mga scene boundary na nasa loob ng 1-second analysis resolution
ng isang freeze boundary.

Kapag may mga nawawalang filter, malformed/walang-lamang evidence, detector error,
o bounded pre-analysis timeout, nagfa-fail open ito sa eksaktong uniform midpoint
policy. Hindi nagfa-fail open ang pag-abort ng caller o deadline ng broker:
tinitigil nito ang kasalukuyang subprocess, pinipigilan ang kasunod na frame
extraction, at inaalis ang pribadong temporary tree sa `finally`.

Gumagawa ang `scripts/perf/video-bridge-fu07-eval.ts` ng mga deterministic at tunay
na FFmpeg fixture para sa post-dedup caption-call savings, dense-motion budget
allocation, blur/exposure/SI-TI evidence, mabilis na mga cut na may mahabang hulihan,
at mga false positive mula sa gradual fade. Itinatala nito ang pre-analysis wall
time at, kung available ang `/usr/bin/time`, ang child CPU at peak RSS. Mga
structural oracle lamang ang mga quality check nito. Nananatiling `HOLD` ang kalidad
ng tunay na caption model dahil walang awtorisadong endpoint o frozen judge ang
harness na ito. Nananatili ring `HOLD` ang monetary savings maliban kung nagbibigay
ang `--caption-cost-per-call-usd` ng tahasang positibong pagtataya ng gastos sa bawat
call; hindi kailanman gumagawa-gawa ang script ng alinman sa mga resultang ito.

Nililimitahan ang bawat frame sa 4 MiB, ang pinagsamang lahat ng raw frame sa 23 MiB,
at ang serialized broker response sa 32 MiB. Inaalis ang isang pribadong temporary
directory sa `finally`. Hindi kasama sa OmniRoute ang FFmpeg at hindi ito tumatanggap
ng custom executable path. Bago ang captioning, nagpapatupad ang bridge ng
conservative visual deduplication pass: binabawasan ang bawat JPEG sa isang 16×16
grayscale buffer at inihahambing lamang ito sa huling frame na pinanatili. Para sa
hiniling na caption budget na higit sa isang frame, nagbibigay ang extraction ng
bounded candidate pool na hanggang dalawang beses ng budget na iyon at hindi
kailanman lalampas sa 16 frame. Inilalapat lamang ang hiniling na cap pagkatapos ng
deduplication, habang pinananatili ang una at huling napiling candidate sa final
thinning kapag hindi bababa sa dalawa ang budget. Ginagamit ng versioned na
`grayscale-16x16-mean-cells-v2` policy ang mas mataas sa mean luma delta at sa ratio
ng mga thumbnail cell na may normalized delta na hindi bababa sa 0.05. Ang duplicate
threshold ay ang constant na 0.04, na pinili para sa predictability sa halip na
ilantad bilang runtime setting. Pinananatili ng secondary high-contrast signal na
ito ang maliliit na motion at mga pagbabago sa nakikitang text na maaaring maitago
ng mean-only comparison. Kapag may comparator o decoder error, nagfa-fail open ito
at pinananatili ang coverage. Pinaghihiwalay ng output metadata ang mga na-extract
na candidate, mga frame na matagumpay na nagamit, at mga visual duplicate na
inalis.

Maaaring humiling ang isang tahasang minarkahang video part ng timestamped contact
sheet. Bumubuo ang bridge ng JPEG grid na may hindi hihigit sa 4 column at 16 frame.
Iniimprenta ng bawat 512-pixel cell ang source timestamp nito sa isang high-contrast
band sa ibaba, habang nananatili rin ang parehong mga timestamp sa textual metadata
para sa downstream association at audit. Nananatiling limitado sa 32 MiB ang buong
JPEG. Kung hindi ma-decode o mabuo ng `sharp` ang grid, bumabalik ang bridge sa mga
indibidwal na JPEG frame; patuloy pa ring ipinapasa ang client abort sa buong sheet
operation.

Sadyang nakahiwalay ang promotion evidence sa synthetic composition
microbenchmark. Tinutukoy ng `scripts/perf/video-bridge-contact-sheet-eval.ts` ang
isang schema-versioned A/B harness para sa mga tunay na OpenAI-compatible vision
model. Sinusukat nito ang mga token na iniulat ng provider, end-to-end wall latency
(kabilang ang sheet composition), bilang ng model call, at manifest-defined fact
retention. Hindi isinusulat sa report ang mga raw model response; mga SHA-256 digest
at matched fact ID lamang ang pinananatili. Hindi gumagawa ang harness ng network o
paid model call maliban kung ipinasa ang `--execute-real` at naka-configure ang
`--model`, `OMNIROUTE_BASE_URL`, at `OMNIROUTE_API_KEY`. Kung wala ang tahasang real
run na iyon, nananatiling `HOLD` ang machine-readable verdict nito; hindi sapat na
promotion evidence ang synthetic payload/call-count measurements lamang.

Maaaring mag-attach ang mga caller ng opsyonal na `transcript.cues` array sa isang
sinusuportahang video part kapag mayroon na silang aligned text. Kailangang taglay
ng bawat cue ang `text`, isang finite na `start`/`end` interval sa loob ng na-probe
na duration, at isang whitelisted na `source` (`client`, `embedded`, o
`audio-bridge`); nagde-default ang `confidence` sa `1` at dapat manatili sa pagitan
ng `0` at `1`. Pinagsasama ang mga cue na eksaktong duplicate. Hindi kailanman
nagsisimula ang OmniRoute ng transcription mula sa metadata na ito: kinokopya ang
mga validated cue sa inilarawang resulta kasama ang source, confidence, at interval,
at nire-render bilang mga hindi pinagkakatiwalaang observation kasama ng mga frame
caption. Tinatanggihan ang invalid, out-of-range, o provenance-free na text sa halip
na ihalo ito sa caption stream. Sa kasalukuyan, ang `source` field ay idinedeklara
ng caller at hindi vine-verify ng server: ipinapatupad ng OmniRoute na dapat isa ang
value sa tatlong pinapayagang string, ngunit hindi pa nito cryptographically
kinukumpirma na ang isang `embedded` o `audio-bridge` label ay talagang nagmula sa
extraction na pagmamay-ari ng server. Ituring ang `source` bilang isang hindi
pinagkakatiwalaang hint hanggang maipatupad ang verification na iyon; huwag
ibabatay rito ang mga authorization decision.

Ang isang advanced na caller ay maaaring magbigay ng awtorisado nang `audioTranscript` track
para sa parehong video. Pinapatakbo ng fusion seam ang mga obserbasyong biswal at audio sa
ilalim ng iisang deadline at abort signal, inaayos ang mga ito sa iisang timeline, pinagsasama
ang eksaktong magkakaparehong entry, at nag-uulat ng bahagyang resulta kapag isang panig
lamang ang nagtagumpay. Ang isang invalid na `audioTranscript` ay humahantong sa bahagyang
resultang iyon — pinananatili ang biswal na paglalarawan at nagtatala ang sangay ng audio ng
na-sanitize na failure code — sa halip na mabigo ang buong video. Ang availability ng bawat
sangay, ang partial flag, at ang mga na-sanitize na failure code ay pinananatili sa inilalarawang
resulta, sa guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), sa result-cache metadata, at sa mga fusion counter ng bridge.
Hindi gumagamit ang default na Video Bridge path ng speech-to-text o nagda-download ng
pangalawang kopya ng media; kung wala ang tahasang track na iyon, nananatili itong
video-only.

**Pagpapanatili ng transcript (#12150 P1).** Awtomatiko itong nalalapat sa tuwing
nagre-render ang Video Bridge (na opt-in mismo) ng transcript cue — walang hiwalay na
retention flag. Kapag nag-render ang isang request ng anumang transcript cue (isang
`transcript` na idineklara ng caller o isang fused na `audioTranscript`), minamarkahan ito
ng guardrail bilang `videoBridgeObserved` at gumagawa ng na-redact na shadow ng paglalarawan
ng video — isang kaparehong rendering kung saan ang free-text body ng bawat cue ay pinapalitan
ng `[redacted-video-transcript]`, na binubuo sa pamamagitan ng pagpapalit sa structured cue field
bago buuin ang string (hindi kailanman sa pamamagitan ng pag-parse sa flattened text, kaya walang
nilalaman ng cue — adversarial man o karaniwan, kabilang ang mga body na naglalaman ng `]` gaya ng
`[inaudible]`/`[music]` — ang maaaring manatili). Pinapalitan ng naka-persist na request body ng
call log ang bawat text part na nagmula sa video ng na-redact na shadow na iyon, na itinutugma
ayon sa pagkakapareho ng nilalaman; muling binabasa ang `fullText` anchor mula sa natapos na
pre-call guardrail payload, kaya nagtatagumpay pa rin ang pagtutugma matapos baguhin nang direkta
ng mga susunod na chain guardrail (ang mga PII at credential masker, na may priority na 10/95)
ang teksto ng paglalarawan at matapos baguhin ng system-prompt/handoff/memory injection ang ayos
ng message array. Hindi binabago ang body na ipinapadala upstream sa model. Hindi rin naglalagay
ang isang naobserbahang request ng anumang durable Memory (nilalaktawan ang extraction mula sa
request at response), kaya hindi maaaring i-echo ng sariling sagot ng model ang teksto ng
transcript papunta sa Memory.

May mga retention surface na nananatiling bukas at sinusubaybayan para sa follow-up (**P2**, #12430):
ang raw na pre-guardrail client-request snapshot sa detailed-log artifact;
ang fail-closed na pagpapatuloy ng `previous_response_id`; ang mga internal dispatch ng
derived prompt na nag-e-embed sa transcript sa loob ng synthesized string prompt
(mga pipeline stage, context-handoff); at ang response body / semantic-cache copy
ng tugon ng model na sumisipi sa transcript. Ang mga ito ay mga raw/response-class o
opt-in na surface na nasa labas ng saklaw ng persisted-request-body + Memory ng P1.

Ang internal na lifecycle ng `/api/modality-bridge/video/drilldown` ay isang hiwalay at
loopback/token-authenticated na cache substrate. Nangangailangan din ang bawat operasyon ng
canonical opaque principal ID. Bago i-enable ang isang production caller, dapat nitong
i-derive ang ID na iyon mula sa authenticated tenant at hindi ito dapat kailanman mag-forward
ng value na pinili ng client. Ibinibigkis ng mga cache key ang principal na iyon sa mga
canonical session at video-reference ID, iniimbak lamang ang kanilang mga key na hango sa
SHA-256, at nililimitahan ang saklaw ng mga read at deletion sa parehong principal. Nag-iimbak
ang cache ng hindi hihigit sa 16 na derived JPEG frame sa bawat entry, ine-expire ang mga ito
pagkalipas ng sampung minuto, at sumusuporta sa bounded na `start`/`end` read o tahasang
pag-delete ng session.

Ang bawat principal ay limitado sa 16 na entry at 64 MiB ng canonical JPEG data. Hiwalay ang
mga limitasyong iyon sa global na ceiling na 64 na entry/256 MiB: ang pressure mula sa principal
quota ay nag-e-evict lamang ng least-recently-used na mga entry ng principal na iyon bago
isaalang-alang ang global LRU eviction. Inaalis ang mga expired na entry mula sa principal at
global accounting kapag may aktibidad sa cache, samantalang ang cancellation at validation failure
ay hindi nagko-commit ng bahagyang replacement.

Tinatanggihan ng cache ang non-canonical Base64, sobrang padding, non-JPEG media, malformed o
truncated na mga JPEG, at mga JPEG na naglalabas ng warning sa panahon ng bounded full-image `sharp`
decode. Muli nitong ine-encode ang bawat tinanggap na image bilang canonical JPEG, kinukuha ang width
at height mula sa decoded bytes sa halip na pagkatiwalaan ang mga field ng caller, at itinatapon ang
anumang trailing polyglot bytes sa halip na panatilihin ang mga ito. Ang bounded canonical compressed
buffer lamang ang ibinibilang sa parehong quota. Kabilang sa JSON wire limit ang Base64 overhead para
sa 32 MiB na decoded-input ceiling. Ang bawat
nakaimbak na derivation ay nagtatala ng validated nitong JPEG format/resolution, sampling policy,
derivation version, creation time, content hash na kinompyut ng server, at hashed parent
reference kasama ang parent-content hash ng pinagkakatiwalaang caller. Sinusuri ang cancellation
sa pagitan ng mga asynchronous decode/hash phase bago ang atomic cache commit.

Hindi pa ikinokonekta ng tranche na ito ang isang production producer sa route at hindi ito
nagbibigay ng multi-resolution variant selection. Samakatuwid, walang idinaragdag na trabaho ang
transparent na Video Bridge request path, habang ang tenant-bound principal derivation at
ang buong FU-08 multi-resolution lifecycle ay nananatiling tahasang follow-up na gawain sa halip
na maidokumento bilang kumpletong behavior.

Ang mga frame ay nilalagyan ng caption nang sunod-sunod gamit ang naka-configure na Video model. Ang walang lamang
Video override ay nagmamana sa setting ng Vision; kung parehong walang laman, pipiliin ng Vision
auto-router ang aktuwal na model na may kakayahang pang-vision. Pinapalitan ng matagumpay na mga caption
ang orihinal na bahagi gamit ang isang matatag na prefix na `[Video description:` na
nagmamarka rin sa text bilang hindi pinagkakatiwalaang obserbasyong nagmula sa media at nagsasabi sa mga downstream
model na huwag sundin ang mga tagubiling matatagpuan sa media. Kasama sa mga frame-caption cache key
ang mga JPEG byte, prompt, timestamp, at aktuwal na model; ang matagumpay na
mga caption lamang ang kina-cache. Pinapanatili ng mga cache entry ang aktuwal na matagumpay na producer model,
kabilang ang isang fallback model; nag-uulat ang bridge ng `mixed` kapag ginawa ang magkakaibang frame
ng magkakaibang model. Muling ginagamit ng isang cache hit ang pagkakakilanlan ng producer na iyon
sa halip na muling lagyan ito ng label bilang hiniling na routing plan. Ang whole-video result
cache ay may key batay sa bawat input na nagbabago sa output — prompt, aktuwal na
model, sampling policy, bilang ng frame, semantic analysis mode, SHA-256
fingerprint ng normalized focus hint, focus window, `transcript`,
`audioTranscript`, at contact-sheet flag — kaya ang pagbabago sa alinman sa mga
dimensyong iyon ay isang cache miss, at hindi kailanman muling paggamit ng lipas na data. Ang bersyon,
threshold, at may hangganang bilang ng candidate frame ng visual dedup policy ay tahasan ding kasama sa
result-cache key at metadata; samakatuwid, hindi maaaring muling gumamit ang pagbabago sa policy ng lipas na
whole-video description. Pinapanatili ng result-cache v4 metadata ang mode at
fingerprint, ngunit hindi kailanman ang raw na gawain ng user. Iniuulat ng guardrail metadata ang parehong
hiniling at aktuwal na analysis mode; ang hiniling na `focused` mode na walang
magagamit na text ng user ay iniuulat bilang aktuwal na `full`.

Kinukuha ng guardrail ang bawat sinusuportahang bahagi ng video ngunit naglalarawan ng hindi hihigit sa
`modalityBridgeVideoMaxVideos`. Para sa isang target na napatunayang may
`supportsVideo === false`, ang mga nabigo at lumampas-sa-limitasyong video ay nagiging tahasang ligtas na
mga text marker upang walang raw na video ang manatili. Kapag hindi alam ang capability, ang mga bahaging iyon
ay nananatiling hindi binabago. Nilalampasan ng mga target na may `supportsVideo === true` ang bridge.
Ang abort signal ng client request ay ipinapasa sa pag-download, broker queue,
mga subprocess, at mga caption call; humihinto ang mga abort sa pagitan ng mga video at hindi kailanman
nagfa-fail open tungo sa raw media.

Ang mga runtime setting ay DB-backed at vina-validate ng Zod:

| Key                                 | Default     | Saklaw / gawi                                                                                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opsyonal na runtime, kailangang tahasang i-enable                                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | Pinapanatili ng `full` ang mga generic na caption; gumagamit ang `focused` ng limitado at hindi pinagkakatiwalaang pinakabagong konteksto ng user |
| `modalityBridgeVideoModel`          | `""`        | Minamana ang Vision Bridge model                                                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                              |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o proporsyonal na `segment_aware`; bumabalik sa `uniform` kapag nabigo ang detector                                     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                               |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                                    |

Ang mga legacy na naka-persist na Video timeout value na lampas sa 120 segundo ay nililimitahan sa
broker deadline; tinatanggihan ang mga bagong pagsusulat ng setting na lampas sa limitasyong iyon.
Nangangailangan ang `GET /api/modality-bridge/video/runtime` ng pinagkakatiwalaang stamped loopback
locality bago ang authentication o runtime probing, at pagkatapos ay nangangailangan ng management
auth. Ibinabalik lamang nito ang `available`, mga nalinis na bersyon ng FFmpeg/ffprobe, at isang nakapirming
dahilan kapag hindi available ang runtime. Ang internal extraction endpoint ay hindi
isang pampublikong upload API: nagbabalik ang queue saturation ng `503` kasama ang `Retry-After`, ang pagdiskonekta ng caller
ay nagbabalik ng `499`, at ang nakapirming broker deadline ay nagbabalik ng `504`. Idinaragdag ng mga na-convert na response ang
`video->text;model=<visionModel>;parts=<videos>` sa sentral na
`x-omniroute-modality-bridge` header nang hindi inaalis ang mga segment ng Vision o Audio.

### PII Masker (`piiMasker.ts`)

Tumatakbo sa **parehong** stage.

- **`preCall`** ay nagko-clone ng payload, binabagtas ang `system`, `messages`, `input`, at
  `prompt` (kabilang ang mga plain string item), at inilalapat ang `processPII()` (mula sa
  `@/shared/utils/inputSanitizer`) sa mga string na `content`/`text` field. Kapag
  `PII_REDACTION_ENABLED=true`, nire-redact ang natukoy na PII sa outbound
  payload. Hindi ito nakadepende sa `INPUT_SANITIZER_MODE` (na kumokontrol lamang sa
  prompt-injection policy). Kapag naka-off ang redaction, itinatala ng call ang bilang ng mga detection
  nang hindi muling isinusulat ang content.
- **`postCall`** ay gumagawa ng deep clone ng response, pinapatakbo ang `sanitizePIIResponse()` kasama ang
  Responses-API-shape masker (`maskResponsesOutput` — sinasaklaw ang
  `output_text` at `output[].content[].text`). Kung may anumang redaction na mangyari,
  papalitan ng binagong response ang orihinal.

Hindi kailanman nagba-block ang guardrail; naglalagay lamang ito ng annotation (`meta.detections`,
`meta.redacted`) o nagsusulat muli.

### Prompt Injection (`promptInjection.ts`)

Tinutukoy ang mga adversarial na istruktura sa content na ibinigay ng user at ipinapatupad ang
naka-configure na policy. Ang gawi ay pinamamahalaan ng mga environment variable at constructor
option:

| Setting                | Env var                                                                                               | Default | Epekto                                                                                                                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Naka-enable            | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kapag `false`, agad na lalaktawan ng guardrail ang pagproseso.                                                                                                                                                                              |
| Mode                   | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Patakaran sa injection: `block`, `warn`, o `log`. (Tinatanggap ang `redact` para sa backward compatibility ngunit **hindi** nito inaalis ang injection text; kinokontrol ng `PII_REDACTION_ENABLED` ang muling pagsulat ng PII sa request.) |
| Threshold ng pag-block | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Pinakamababang severity na kinakailangan upang mag-block. Observe-only ang Medium sa default.                                                                                                                                               |

**Precedence ng mode** (`getMode`): `options.mode` ng caller →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Samakatuwid, nangingibabaw ang dashboard override sa mga env var, kaya
live na kinokontrol ng Feature Flags UI ang tumatakbong guard (hindi kailangan
ng restart). Fail-safe ang pagbasa sa DB: kung magka-error ito, babalik ang guard
sa behavior na nakabatay sa env, at kapag walang nakatakdang override, kapareho
ang behavior ng env-only resolution.

Mga pinagmumulan ng detection:

1. `sanitizeRequest()` mula sa `@/shared/utils/inputSanitizer` (nakabahaging
   detector set na ginagamit sa ibang bahagi ng pipeline).
2. Built-in na `DEFAULT_GUARD_PATTERNS` (kasalukuyang `system_override_inline` at
   `markdown_system_block`, na parehong may `high` severity).
3. Opsyonal na `customPatterns` na ipinapasa sa pamamagitan ng constructor options
   (mga string, regex, o `{ name, pattern, severity }` record).

Kapag `mode === "block"` **at** may kahit isang detection na umabot sa severity
threshold, ibinabalik ng `preCall` ang `{ block: true, message: "Request rejected:
suspicious content detected" }`. Sa mga mode na `warn`/`log`, nagla-log ang
guardrail ngunit pinapayagan ang call. Ini-export din ang nakabahaging helper na
`evaluatePromptInjection()` para sa mga caller na kailangang magsuri ng mga
prompt nang hindi dumaraan sa registry.

**Hangganan ng scan (v3.8.20):** sinusuri lamang ng detector ang **unang 16 KB**
ng pinagsamang prompt text — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes)
sa `src/shared/utils/inputSanitizer.ts`. Parehong nagsasagawa ang
`detectInjection()` at `evaluatePromptInjection()` ng
`slice(0, MAX_INJECTION_SCAN_BYTES)` bago patakbuhin ang pattern loop. Karaniwang
nasa itaas na bahagi ng input ang mga injection directive, kaya nililimitahan
nito ang paggamit ng regex sa CPU/GC para sa mga payload na daan-daang KB ang
laki nang hindi pinapahina ang detection (tingnan ang #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Tumatakbo sa **parehong** stage at huli sa default chain (priority `95`).
Nagre-redact ito ng mga kilalang pattern ng API key / secret token mula sa
outbound payload (content ng message, mga argument ng tool call, mga resulta ng
tool) **at** sa response ng provider, upang hindi mai-leak sa upstream provider
o pabalik sa client ang credential na na-paste sa prompt (o ibinalik ng isang
tool result).

- **Opt-in lamang**, kaparehong convention ng PII redaction (malapit sa Hard Rule
  #20): naka-disable maliban kung `settings.credentialRedactionEnabled === true`
  **o** `CREDENTIAL_REDACTION_ENABLED=true`. Kapag naka-off ito, no-op ang
  guardrail — hindi ito kailanman nagba-block o muling nagsusulat.
- Nilalakad ng `redactCredentials()` ang buong payload/response tree
  (`walkValue()`, ligtas laban sa prototype pollution, ligtas laban sa cycle sa
  pamamagitan ng `WeakSet`) at pinapalitan ang mga match ng placeholder na
  `[REDACTED:<type>]`, habang kino-clone lamang ang mga branch na aktuwal na
  nagbago.
- Saklaw ng `CREDENTIAL_PATTERNS` ang mga key ng LLM provider (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), mga VCS/SaaS token
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), mga payment key
  (Stripe, Square), mga cloud key (AWS access key, Twilio, SendGrid, Mailgun),
  mga private key / JWT, mga connection string na may credential
  (`mongodb://user:pass@...`, atbp.), at generic na pattern para sa header-value
  na `Authorization`/`x-api-key`/`api-key`/`apikey`. Ang mga key na hugis-header
  (`authorization`, `x-api-key`, `api-key`, `apikey`) ay nire-redact sa
  estruktural na paraan (value lamang, habang pinapanatili ang scheme prefix
  tulad ng `Bearer `/`Basic `) sa halip na sa pamamagitan ng generic na text
  regex.
- Hindi kailanman nagba-block ang guardrail; nagsusulat lamang itong muli
  (`modifiedPayload` / `modifiedResponse`) at naglalagay ng annotation
  (`meta.credentialsRedacted`, `meta.count`).

Regression guard: `tests/unit/credential-masker-guardrail.test.ts`.

## Batayang Kontrata (`base.ts`)

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
  block?: boolean; // kapag true, agad na itinitigil ang chain
  message?: string; // ipinapakita kapag bina-block
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // ibinabalik ng preCall upang baguhin ang request
  modifiedResponse?: TValue; // ibinabalik ng postCall upang baguhin ang response
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

Ipinahihiwatig ng isang guardrail na "walang pagbabago" sa pamamagitan ng pagbabalik ng `void`, `{}`, o
`{ block: false }`. Kapag nagbalik ng `modifiedPayload`/`modifiedResponse`, papalitan nito
ang value na dumadaloy sa chain para sa mga kasunod na guardrail.
Dinadala ng `signal?: AbortSignal` ang lifecycle ng caller papunta sa mga guardrail. Ang pag-abort ng request ang sinasadyang fail-open exception: itinitigil ng mga media bridge ang trabaho at nagsasagawa ng cleanup nang hindi ibinabalik ang raw media sa isang target na alam nang hindi sumusuporta rito.

## Registry (`registry.ts`)

Inilalantad ng singleton na `guardrailRegistry` ang:

- `register(guardrail)` — nagdaragdag ng guardrail (o pinapalitan ito ayon sa normalized na pangalan) at
  muling inaayos ayon sa pataas na `priority`.
- `clear()` / `list()` — mga administratibong helper.
- `runPreCallHooks(payload, context)` — inuulit ang bawat aktibong guardrail, ipinapasa ang
  payload sa pamamagitan ng `modifiedPayload`, at humihinto sa unang `block: true`.
- `runPostCallHooks(response, context)` — kaparehong daloy sa panig ng response.
- `resetGuardrailsForTests({ registerDefaults })` — nililinis ang state at opsyonal na
  muling nirerehistro ang mga default para sa malinis na test isolation.

Ang parehong runner ay nagbabalik ng `{ blocked, payload|response, results, guardrail?, message? }`
kung saan ang `results` ay isang array ng mga record na `GuardrailExecutionResult` na may
mga field na `blocked`, `skipped`, `modified`, `error`, at `meta` para sa bawat guardrail,
na kapaki-pakinabang para sa tracing.

### Pag-disable ng Mga Guardrail sa Bawat Request

Pinagsasama-sama ng `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` ang isang
de-duplicated na listahan ng mga pangalan ng guardrail na dapat laktawan para sa kasalukuyang
request. Mga source (lahat ay opsyonal, lahat ay pinagsasama):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` sa request body (top-level)
- `metadata.disabledGuardrails` sa request body
- Header na `x-omniroute-disabled-guardrails` (o ang legacy na
  `x-disabled-guardrails`)

Maaaring mga array ng string o comma-separated string ang mga value; ang mga pangalan ay
ino-normalize sa lowercase kebab-case (`pii_masker` → `pii-masker`). Ipinapasa
ang resulta sa registry sa pamamagitan ng `context.disabledGuardrails`, na lumalaktaw sa
mga tumutugmang guardrail (`skipped: true` sa `results`).

## Pagkakasunod-sunod ng Pagpapatupad

Para sa bawat request na dumadaan sa `src/sse/handlers/chat.ts` at
`open-sse/handlers/chatCore.ts`:

1. Binubuo ng `resolveDisabledGuardrails(...)` ang listahan ng lalaktawan mula sa API key, body,
   at mga header.
2. Pinapatakbo ng `guardrailRegistry.runPreCallHooks(body, ctx)` ang mga guardrail ayon sa pataas
   na pagkakasunod-sunod ng priority:
   - Itinatala bilang `skipped` ang mga naka-disable na guardrail.
   - Maaaring baguhin ng `preCall` ng bawat guardrail ang payload sa pamamagitan ng `modifiedPayload`.
   - Ang unang `block: true` ay agad na nagpapatigil sa chain at nagbabalik ang handler
     ng tugon ng pagtanggi mula sa guardrail.
3. Ang payload na maaaring nabago ay ipinapasa sa combo routing at upstream
   dispatch.
4. Pagkatapos mabuo ang tugon, pinapatakbo ng `guardrailRegistry.runPostCallHooks(...)`
   ang parehong chain sa tugon. Kapag `block: true` dito, hindi ipinapasa ang upstream
   na tugon.

Ang mga guardrail na nag-throw ay itinatala gamit ang `error: <message>` at nila-log sa pamamagitan ng
`logger.warn`, ngunit nagpapatuloy ang chain — sadyang fail-open ang disenyo.

## Configuration

Mga environment variable na binabasa ng mga built-in na guardrail:

| Variable                              | Ginagamit ng              | Epekto                                                                                                                   |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Itakda sa `false` upang ganap na i-disable ang pagtukoy.                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Patakaran sa injection: `warn`, `block`, o `log`. Hindi binabago ng legacy na value na `redact` ang teksto ng injection. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode para sa injection guard; isa ring DB feature flag na **nangingibabaw** sa mga env var (DB > ENV).                   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Pinakamababang severity na tinatanggihan ng `MODE=block`: `high` (default), `medium`, o `low`.                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy na alias para sa `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Kapag `true`, nire-redact ang PII ng request (hiwalay sa injection mode).                                                |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kinokontrol ang gawi ng masker sa panig ng tugon.                                                                        |

Binabasa ng mga guardrail ng Modality Bridge ang runtime config mula sa DB-backed na settings
store (`getSettings()`), hindi mula sa mga env var. Ang mga pangunahing key ng Vision ay
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, at
`modalityBridgeCacheMaxEntries`. Tinatanggap lamang ang mga legacy na
`visionBridge*` key bilang dokumentadong one-cycle read
fallback; ginagamit ng mga write mula sa dashboard ang mga pangunahing key. Ang mga default at fallback
resolver ay nasa `src/shared/constants/modalityBridgeDefaults.ts`, habang pinananatili ang mga legacy
constant sa `src/shared/constants/visionBridgeDefaults.ts`.

Ginagamit ng Audio ang `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, at `modalityBridgeAudioMaxClips`, kasama ang mga shared na
setting na `modalityBridgeCache*`. Walang fallback para sa legacy key ang Audio dahil ipinakilala ang mga
key na ito kasama ng schema ng Modality Bridge.

Ginagamit ng Video ang `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, at
`modalityBridgeVideoTimeout`, kasama ang mga shared na setting na `modalityBridgeCache*`.
Naka-disable ito bilang default dahil opsyonal na operational
dependency ang FFmpeg/ffprobe at nagdaragdag ng latency at gastos sa model ang paglalagay ng caption sa mga frame.

## Mga Custom na Guardrail

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

Mga hakbang:

1. Gumawa ng `src/lib/guardrails/myGuardrail.ts` na nag-e-extend sa `BaseGuardrail`.
2. Ipatupad ang `preCall` at/o `postCall`.
3. Magrehistro sa oras ng pag-import (i-push mula sa `registerDefaultGuardrails`) o
   tawagin ang `guardrailRegistry.register(...)` sa runtime — pinapalitan ng registry
   ang anumang naunang guardrail na may parehong normalized na pangalan.
4. Magdagdag ng mga test sa ilalim ng `tests/unit/` (mga kasalukuyang halimbawa:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pagsubok

Gamitin ang `resetGuardrailsForTests()` sa pagitan ng mga test upang magsimula mula sa isang tiyak na state.
Ipasa ang `{ registerDefaults: false }` upang magsimula sa isang walang-lamang registry at
irehistro lamang ang mga guardrail na sinusubok. Tumatanggap ang Vision Bridge ng dependency
injection (`deps.getSettings`, `deps.callVisionModel`); inilalantad ng Audio Bridge ang
mga katumbas na seam para sa mga setting, capability, pagpili ng STT model, pagsusuri ng
credential, at transcription. Dahil dito, maaaring subukan ng mga test ang parehong flow nang walang
access sa DB o network.

## Tingnan Din

- `src/lib/guardrails/` — implementasyon
- `src/shared/utils/inputSanitizer.ts` — nakabahaging detector na nagpapatakbo sa
  prompt-injection at PII masking
- `src/shared/constants/visionBridgeDefaults.ts` — mga default ng Vision Bridge at
  listahan ng mga model na sapilitang gumagamit ng bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — mga nakabahaging runtime default ng Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonal na layer (circuit breaker, mga cooldown)
- `docs/reference/ENVIRONMENT.md` — kumpletong sanggunian ng env var

## Saklaw ng route at red-team para sa injection-guard (Phase 8 · Block D)

Saklaw ng injection-guard (`createInjectionGuard` / `withInjectionGuard`) ang lahat ng route
na tumatanggap ng mga prompt ng user. Sinusunod nito ang `INJECTION_GUARD_MODE` (default na `warn` = pag-log lamang;
`block` = nagbabalik ng HTTP 400 `SECURITY_001`).

| Uri                | Mga Route                                                                                                                                            | Default na mode |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Text (kasalukuyan) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Generative         | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Data               | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

Saklaw ng pagkuha ng text (`extractMessageContents`) ang `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (gabi-gabi, `nightly-llm-security.yml`):** bine-validate ng promptfoo na bina-block ng bawat route
ang OWASP-LLM corpus kapag `INJECTION_GUARD_MODE=block`; nagpapatakbo ang garak ng mga probe (nilalaktawan kapag walang secret).
Kasama ang `moderations` para sa consistency — maaari itong i-exempt ng mga operator sa block-mode sa pamamagitan ng
`resolveDisabledGuardrails`.

May dalawang job ang nightly workflow (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch):

- **`promptfoo-guard` (blocking)** — pinapatakbo ang `promptfoo eval -c promptfooconfig.yaml`
  gamit ang `INJECTION_GUARD_MODE=block`. Tinitiyak ng bawat adversarial na kaso (hal. "ignore all
  previous instructions…", mga DAN-style jailbreak) na may taglay na
  `error.code === "SECURITY_001"` ang response, ibig sabihin, talagang tinanggihan ng guard ang request.
- **`garak` (advisory)** — pinapatakbo ang garak `--probes promptinject,dan,leakreplay`
  laban sa isang lokal na instance ng OmniRoute (`http://localhost:20128/v1`). Nakadepende ito sa isang
  provider secret (`PROMPTFOO_PROVIDER_KEY`); maayos itong lumalaktaw at nilalagyan ng suffix na
  `|| true`, kaya nag-uulat ito nang hindi pinapabagsak ang CI.

Saklaw ng guard helper (`createInjectionGuard` / `withInjectionGuard`)
ang bawat `/v1` route na may prompt; kinukuha ang text ng prompt mula sa
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ng
`extractMessageContents()` sa `src/shared/utils/inputSanitizer.ts`.
