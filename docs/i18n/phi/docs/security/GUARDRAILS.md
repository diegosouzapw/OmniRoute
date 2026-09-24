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

Ang registry ay awtomatikong naglo-load ng anim na guardrail sa pagkakasunud-sunod ng priyoridad sa pag-import
(tingnan ang `registry.ts` → `registerDefaultGuardrails()`):

| Priyoridad | Pangalan            | Stage(s)       | File                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ang mas mababang numero ng priyoridad ay tumatakbo **muna**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Sinusuri ang mga kahilingan na may dalang imahe na nakatuon sa **mga modelong hindi pang-vision** at alinman
ay iniruruta ang buong kahilingan sa isang modelong may kakayahang pang-vision o pinapalitan ang mga bahagi ng imahe
ng mga paglalarawan ng teksto na ginawa ng isang configurable na modelong pang-vision bago
ang upstream na tawag. Nagbibigay-daan ito sa mga text-only na provider na transparent na hawakan
ang mga multimodal na payload.

Daloy:

1. Laktawan kung ang target na modelo ay sumusuporta na sa vision (maliban kung ito ay lumilitaw sa
   listahan ng pinilit na tulay na `isVisionBridgeForcedModel`).
2. I-extract ang mga bahagi ng imahe sa pamamagitan ng `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), na nagtatalaga sa **unified media
   detector** `detectMediaParts()` sa `open-sse/utils/mediaParts.ts` — ang
   nag-iisang pinagmulan ng katotohanan na ibinahagi sa combo compatibility filter.
   Ang pagkuha ay pinapayagan sa mga top-level na bahagi ng mga hugis na
   maaaring ibalik ng `replaceImageParts` (ang extract↔replace contract): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, at Responses API `input_image`. Ang mga nested na hit at
   mga hugis na indikator lamang ay materyal ng combo-filter at hindi kailanman kinukuha.
   Laktawan kung walang nakita.
3. Lutasin ang runtime config sa pamamagitan ng `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): ang mga bagong `modalityBridge*`
   na key ng setting ang mananalo; ang mga legacy na `visionBridge*` na key ay nananatiling **isang-cycle
   fallback** (rollback window). Laktawan bago ang anumang paglalakbay sa media kapag ang
   tulay ay hindi pinagana.
4. Ang mode selector (`modalityBridgeVisionMode`, tingnan ang talahanayan sa ibaba) ay nagpapasya
   sa reroute vs describe. Ang reroute ay nagbabalik ng `modifiedPayload` na may `model` lamang
   na pinalitan, kasama ang meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Path ng paglalarawan: i-cap ang mga imahe sa `maxImages`, buuin ang task-aware na prompt,
   konsultahin ang describe cache, tawagan ang vision model **nang sabay-sabay**
   (`Promise.allSettled`), at i-inject ang `[Image N]: <description>` na mga bahagi ng teksto sa
   kanilang lugar. Ang isang nabigong paglalarawan ay nagbibigay ng `null` at ang orihinal na bahagi ng imahe ay
   **pinapanatili** (#4012) — maliban sa combo describe path kapag nabigo ang bawat
   paglalarawan, kung saan ang isang kumpirmadong non-vision upstream ay nakakakuha ng
   `(unavailable — no vision-capable provider connected)` stub sa halip (#8430).
6. Ibalik ang `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Pag-uugali                                                                                                                                                                                                                                                                                                          |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Legacy heuristic, hindi nagalaw (#6640/#7204): ang mga non-combo/`auto/` na modelo ay iniruruta sa pinakamahusay na vision model maliban kung ang orihinal na modelo ay mayroon nang magagamit na mga kredensyal (pagkatapos ay ilarawan); ang mga combo target ay laging naglalarawan.                             |
| `describe` |         | Laging ilarawan — ang reroute block ay ganap na nilalaktawan; ang napiling modelo ng user ang laging sumasagot.                                                                                                                                                                                                     |
| `reroute`  |         | Pilitin ang reroute: ang keep-credentialed-model guard ay nilalampasan. Ang reroute-**target** credential guard ay nalalapat pa rin — kapag walang magagamit na vision target, ang kahilingan ay bumabagsak sa describe upang ang mga raw na imahe ay hindi kailanman umabot sa isang text-only na backend (#8430). |

Ang mga pinilit na mode ay short-circuit **bago** tumakbo ang auto heuristic; ang pag-uugali ng `auto`
ay byte-identical sa pre-PR-1 guardrail.

#### Task-aware describe prompt (`modalityBridgeVisionTaskAware`)

Default **true**. Ang `composeVisionPrompt()` (`visionBridgeHelpers.ts`) ay nagdaragdag
ng teksto ng **huling mensahe ng user** (pinutol sa 500 character) sa base
describe prompt, na nagtutulak sa paglalarawan patungo sa kung ano ang aktwal na tinanong ng user
(codex-vision-proxy pattern) at humihiling sa vision model na i-transcribe ang nakikitang
teksto. Kapag naka-off ang flag — o walang teksto ng user — ang base prompt ay ginagamit nang hindi binabago.

Ang describe self-loop's sariling OpenAI-compatible request (`callVisionModelSingle()`
sa `visionBridgeHelpers.ts`) ay laging humihingi ng `image_url.detail: "high"` —
walang kondisyon, para sa bawat tumatawag/provider, hindi nakasalalay sa anumang signal ng kliyente.
Ang low-detail sampling ay nagpapababa ng katumpakan ng OCR para mismo sa text-transcription
task na hinihingi ng prompt na ito, kaya ang describe call mismo ay laging humihingi ng high
detail anuman ang detail level na ginamit ng orihinal na inbound request. Ito
ay nakakaapekto lamang sa internal describe request body; hindi nito binabago kung paano
ipapasa ng OmniRoute ang sariling `image_url.detail` ng tumatawag sa primary request —
ang default na iyon ay inilalapat nang hiwalay, at para lamang sa mga natukoy na OpenCode client, sa
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Ang
Anthropic wire-format branch ng describe self-loop ay walang `detail` field
at hindi apektado ng alinmang default.

#### Describe output cap (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range           |
| ------------------------------ | ------- | --------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` o 100–50000 |

Ang `0` (default) ay nangangahulugang **walang cap** — ang deskripsyon na ibinalik ng
`callVisionModel()` ay ipinapasa nang walang pagbabago, pinapanatili ang kasalukuyang
ugali. Anumang halaga sa 100–50000 range ay pinuputol ang deskripsyon na may
`…` suffix bago ito isama bilang `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` sa `src/lib/guardrails/visionBridge.ts`).
Taasan ito para sa mga OCR task na nangangailangan ng maraming detalye kung saan kailangan ng downstream model ang
buong transkripsyon; babaan ito upang limitahan ang paggamit ng token sa mga chatty vision model.
Ang field ng dashboard ay nasa Advanced panel ng Vision tab
(`modality-bridge-max-chars` sa `ModalityBridgeVisionTab.tsx`) at nililimitahan ang anumang
halaga sa pagitan ng 1 at 99 hanggang sa 100 floor habang iniiwan ang isang tahasang `0`
na hindi nagalaw — ang `0` ay isang valid na Zod value sa sarili nitong karapatan
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), hindi lamang
ang "unset" default.

#### Describe cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache para sa mga describe output, shared sa buong proseso.
Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` na may
length-prefix framing (walang field-boundary collisions). Ang bahagi ng model ay
ang **configured** bridge model, hindi ang model na talagang sumagot —
maaaring mag-fallback ang `callVisionModel` sa loob, at ang pag-key per attempt ay
magpapira-piraso sa cache. Ang mga nabigong describe ay hindi kailanman naka-cache. Mga Setting:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Remote image normalization (self-loop describe/base64 fetch)

Kapag ang bridge mismo ang kumukuha ng **remote** na imahe — ang Anthropic describe
self-call at ang claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`), parehong sa pamamagitan ng
`fetchRemoteImageAsDataUri()` sa `visionBridgeHelpers.ts` — ang nagreresultang data
URI ay ipinapasa sa `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) bago ito i-embed sa vision-model
request. Ang mga oversized na imahe ay dinodownscale sa isang **2048px long edge** (katulad
ng resize cap na inilalapat na ng OpenAI/Anthropic server-side), na nagbabawas ng
upload bytes/latency nang hindi binabago ang nakikita ng vision model. Ang pag-resize
ay gumagamit ng `sharp`, na nilo-load sa pamamagitan ng dynamic import: sa isang platform kung saan ang native
binary nito ay nabigo sa paglo-load, ang `normalizeDataUri()` **ay hindi kailanman nagta-throw** — ito ay nagfa-fallback
sa isang passthrough ng orihinal na bytes, kaya ang describe/base64-conversion
path ay laging gumagana. Ang mga non-image bytes (isang fetch na hindi nagbalik ng
decodable na imahe) ay ipinapasa rin nang hindi nagalaw. Ang normalization na ito ay
nakatuon sa mga imahe na kinukuha ng bridge para sa sarili nitong self-call — hindi ito
kailanman inilalapat sa raw passthrough payload ng tumatawag, na naaayon sa
opt-in-only mutation principle (Hard Rule #20).

#### Settings schema + migration

Ang mga bagong `modalityBridge*` keys ay Zod-validated sa `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, ang `modalityBridgeCache*` trio, at ang
`modalityBridgeAudio*` group na ginagamit ng Audio Bridge. Ang migration
`141_modality_bridge_settings.sql` ay kinokopya ang mga umiiral na legacy
`visionBridge*` values sa mga katugmang bagong keys (idempotent, hindi kailanman ino-overwrite
ang isang operator-set `modalityBridge*` value); ang mga legacy keys ay nananatiling tinatanggap bilang isang
read fallback para sa isang release cycle.

#### Transparency header + stats

Ang mga describe-transformed na tugon ay may
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(binuo ng `buildModalityBridgeHeader()` sa `modalityBridge/bridgeStats.ts`,
nilagyan ng selyo ng `withModalityBridgeHeader()` sa `src/sse/handlers/chatHelpers.ts`).
Ang mga rerouted na request ay **walang** header — ang payload ay hindi nagalaw at ang
pagpapalit ng model ay nakikita na sa `model` field ng response body.

Ang `GET /api/modality-bridge/stats` (management auth, kaparehong tier ng
`GET /api/settings`) ay nagbabalik ng in-memory per-modality counters
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` para sa `vision`, `audio`, at
`video`. Ang `averageLatencyMs` ay gumagamit ng `latencySamples`, hindi lahat ng attempts, bilang
denominator nito; ang isang operasyon na walang timing ay hindi gumagawa ng zero-millisecond
sample. Ang `bridged` ay nananatiling backward-compatible alias para sa matagumpay
na conversion; ang mga nabigong attempts ay hindi nagpapataas nito.
Ang mga counter ay nagre-reset sa pag-restart ng proseso sa disenyo
(telemetry, hindi accounting).

#### Dashboard configuration

Ang nakalaang pahina ng dashboard ay
`/dashboard/settings/modality-bridge`. Ang mga tab nitong `Vision`, `Audio`,
at `Video` na naa-address sa URL ay pinapanatili ang mga parameter ng query habang binabago ang halaga ng `tab`.
Ang tab na Vision ay naglalantad ng pagpapagana, mode, pagpili ng modelo (kabilang ang awtomatikong
default), pag-prompt na may kamalayan sa gawain, mga advanced na limitasyon sa timeout/larawan/haba ng deskripsyon/cache, mga counter ng
runtime, at isang binabantayang sample na kahilingan. Ang tab na Audio ay live din: naglalantad ito
ng pagpapagana, isang tagapili ng modelo na STT-only na may Auto, mga limitasyon sa timeout/max-clip, mga counter ng audio, at isang sample na pagsubok ng `input_audio`. Ang tab na Video ay gumagana: nag-uulat ito
ng estado ng runtime ng FFmpeg/ffprobe — isa sa apat na tahasang estado ng UI (`unknown` habang
isinasagawa ang probe o hindi nakumpleto, `restricted` sa isang non-loopback
na host ng dashboard kung saan nilaktawan ang probe sa panig ng kliyente, `unavailable` kapag na-probe
at nakumpirmang nawawala, o `available` kasama ang mga bersyon ng FFmpeg/ffprobe) — pinapanatili
ang mga limitasyon sa pagpapagana/modelo/frame/video/timeout, sinasala ang tagapili ng modelo sa mga modelong may kakayahang pang-vision,
at naglalantad ng mga counter ng video.

Ang dating Vision Bridge card sa ilalim ng mga setting ng AI ay isang link ng compatibility sa
bagong pahina; hindi na ito nagmamay-ari ng pangalawang kopya ng form. Ang Media Providers din
ay nagli-link ng mga workflow ng Image-to-Text at Speech-to-Text sa kaukulang mga tab ng Modality
Bridge nang hindi inaalis ang kasalukuyang Speech-to-Text playground.

**Bypass ng pagtanggap sa self-loop:** kapag ang tawag sa paglalarawan ay dumadaan sa sariling `/v1` self-loop ng OmniRoute
(hindi-standard na modelo ng provider), ang sub-request ay nagpapadala ng
`x-omniroute-admission-bypass: internal` at na-authenticate gamit ang naresolbang
self-loop credential — ang lokal na `sk_omniroute` sentinel sa lokal na mode, o ang
operator-configured na `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) upang
ang mga deployment na `REQUIRE_API_KEY=true` ay maaari pa ring patakbuhin ang tawag sa paglalarawan. Ang bypass
ay iginagalang lamang para sa mga eksaktong credential na iyon, kaya hindi maaaring gamitin
ng mga panlabas na kliyente ang header upang laktawan ang pagtanggap.

Ang mga lumang default ay matatagpuan sa `src/shared/constants/visionBridgeDefaults.ts`; ang
mga bagong default ng mode/task-aware/cache at ang settings resolver ay matatagpuan sa
`src/shared/constants/modalityBridgeDefaults.ts`. Ang guardrail ay naglalantad ng opsyon sa
constructor na `deps` upang ang mga pagsubok ay maaaring mag-inject ng pekeng `getSettings` at
`callVisionModel` na implementasyon.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Sinusuri ang mga kahilingan sa chat na may dalang audio bago sila makarating sa isang target na hindi
alam na tumatanggap ng audio input. Hindi kailanman muling iruruta ang kahilingan sa chat: ang mga bahagi ng audio ay
tinatranscribe sa pamamagitan ng umiiral na OpenAI-compatible multipart endpoint at ang
napiling modelo ng chat ay nagpapatuloy sa mga text transcript.

Daloy:

1.  I-resolve ang `supportsAudio` sa pamamagitan ng `getResolvedModelCapabilities()`. Ang tahasang
    metadata ng provider-registry ang mananalo, pagkatapos ay ang static na metadata ng modelo, pagkatapos ay ang naka-sync na
    `modalities_input`. Ang isang idineklarang listahan ng input na walang `audio` ay `false`; walang
    ebidensya ng kakayahan ang nananatiling `null`. Parehong `false` at `null` ang nagpapagana sa
    konserbatibong tulay, habang ang `true` ay nilalaktawan ito.
2.  I-resolve ang mga setting ng `modalityBridgeAudio*` at kunin ang mga spliceable na top-level na bahagi ng audio
    mula sa bawat mensahe sa pamamagitan ng shared `detectMediaParts()` detector. Ang mga sinusuportahang
    wire shape ay OpenAI `input_audio`, `audio_url`, at `source.media_type: "audio/*"`. Ang nested audio ay
    natutukoy para sa pagruruta ngunit hindi inaalis ng splice path. Ang trabaho ay limitado ng `modalityBridgeAudioMaxClips`;
    ang mga huling bahagi ay nananatiling hindi nagalaw.
3.  Igalang ang isang naka-configure na `provider/model`, o hayaan ang `selectAudioBridgeModel()` na dumaan
    sa `AUDIO_TRANSCRIPTION_PROVIDERS` sa stable na pagkakasunud-sunod ng catalog at piliin ang unang
    modelo na may magagamit na aktibong credential ng provider.
4.  Ang `callAudioTranscription()` ay nagko-convert ng base64/data-URI audio sa isang multipart `file`,
    o nagda-download ng remote na `audio_url` sa pamamagitan ng public-only outbound guard na may DNS pinning at
    25 MB na limitasyon. Pagkatapos ay nagpo-POST ito ng file at napiling modelo sa lokal na
    `/v1/audio/transcriptions` self-loop, na-authenticate gamit ang `resolveSelfLoopBearer()`. Ang umiiral na
    ruta ng transkripsyon ay nagsasagawa ng normal na paghahanap ng credential, paghawak ng cooldown/rate-limit, at pagpapadala ng provider.
5.  Ang mga matagumpay na tawag ay pinapalitan ang kanilang mga bahagi ng `[Audio N]: <transcript>`. Ang mga tawag
    ay tumatakbo gamit ang `Promise.allSettled`: ang isang indibidwal na pagkabigo ay pinapanatili ang orihinal na bahagi ng audio na iyon (#4012 contract). Kung nabigo ang bawat tawag at ang target ay napatunayang
    `supportsAudio === false`, ang mga bahagi ay magiging
    `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). Para
    sa isang hindi kilalang target (`null`), ang isang resulta ng lahat ng pagkabigo ay nananatiling hindi nagalaw. Ang isang napatunayang
    text-only na target na walang magagamit na STT credential ay tumatanggap ng parehong tahasang
    stub nang hindi naglalabas ng network call.

Ang mga matagumpay na transcript ay gumagamit ng process-wide Modality Bridge LRU/TTL cache. Ang
key ay pinagsasama ang audio reference, ang stable na label ng operasyon na `audio-transcription`,
at ang napiling modelo ng STT; ang mga pagkabigo ay hindi kailanman naka-cache. Ang mga pagtatangka sa audio ay nag-a-update
ng shared na `bridged`, `cacheHits`, `failures`, at `lastUsedAt` na mga counter.
Ang mga binagong tugon ay nagdadala ng
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; ang mga hindi nagalaw
na kahilingan ay hindi tumatanggap ng segment ng Audio Bridge.

Ang mga setting ng runtime ay naka-back sa DB at Zod-validated:

| Key                           | Default | Range         |
| ----------------------------- | ------- | ------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —             |
| `modalityBridgeAudioModel`    | `""`    | Auto o STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000   |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10          |

Ang shared cache ay nananatiling kontrolado ng `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, at `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Sinusuri ang mga top-level na bahagi ng video sa `messages` ng Chat Completions at `input` ng Responses API bago tawagin ang isang target na walang kilalang native na suporta sa video. Ang mga sinusuportahang hugis ay `input_video`, `video_url`, `video_source`, HTTPS URLs, at `data:video/*;base64,...` data URIs. Ang mga simpleng filename sa text ay hindi itinuturing na video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ang may hawak ng pagtawid ng kahilingan, ang pagsusuri ng kakayahan/patakaran, pag-iipon bawat kahilingan, at ang response payload. Ang trabaho bawat video — pagkuha, ang cache ng buong resulta, paglalarawan ng sequence ng frame (na nagsasama ng anumang audio transcript na idineklara ng tumatawag), at mga sukatan/pagkansela/paglilinis bawat pagtatangka — ay nakatago sa likod ng `processVideoPart` sa `videoBridgePipeline.ts`, na tinatawag nang isang beses bawat bahagi ng video sa loob ng loop ng `preCall`. Ang module na iyon ay nagtatakda rin ng mga tahasang hangganan ng port na `VideoMediaBrokerPort` (pagkuha ng bytes at pagkuha ng mga sampled frame), `VideoAudioTranscriptionPort` (pagsasama ng audio transcript na idineklara ng tumatawag sa mga sampled caption), at `VideoDrilldownPort` (ang hangganan ng pagpapanatili ng frame drill-down; hindi pa nakakonekta sa `processVideoPart` — tanging ang hiwalay na `/api/modality-bridge/video/drilldown` route lamang ang nagsusulat ng mga drill-down entry ngayon).

Ang pampublikong `/v1` request path ay hindi kailanman nag-i-import o nagpapatawag ng subprocess. Ang mga remote na video ay dina-download sa ilalim ng limitasyong 50 MiB; ang mga inline na base64 na video ay may konserbatibong 36 MiB na decoded per-video cap upang ang model/messages/framing envelope ay manatili sa loob ng pampublikong JSON request admission limit na 50 MiB. Ang inline na haba at mga pagtatantya ng decoded-size ay sinusuri bago ang alokasyon. Kinakailangan ang HTTPS sa paunang remote URL at sa bawat redirect, gamit ang umiiral na public-only outbound guard na may DNS pinning. Ang mga bytes ay tumatawid sa eksaktong internal na `POST /api/modality-bridge/video/extract` broker boundary. Ang route na iyon ay parehong `LOCAL_ONLY` at `SPAWN_CAPABLE`, tumatanggap lamang ng per-process authenticated, trusted-loopback request, at hindi kailanman tumatanggap ng URL, filesystem path, executable, o listahan ng argumento. Ang API body-size pipeline at ang incremental body reader ng handler ay independiyenteng nagpapatupad ng 50 MiB broker input cap. Ang bounded queue nito ay nagpapatakbo ng isang extraction sa isang pagkakataon, nagpapahintulot ng apat na nakabinbing trabaho, at nililimitahan ang nakabinbing input sa 100 MiB.

Sa loob ng broker, binabasa ng `ffprobe` ang isang pribadong lokal na file; ang fixed format allowlist ay hindi kasama ang mga playlist at manifest format. Para sa mga pinahihintulutang MOV-family container, ang mga external na MOV data reference ay nananatiling disabled bilang default, at ang fixed command ay hindi pumipili sa mga ito. Parehong ginagamit ng `ffprobe` at `ffmpeg` ang `file`-only protocol whitelist, isang thread, fixed argument arrays, walang shell, at mga executable na niresolba mula sa `PATH`. Ang mga attached-picture cover stream ay hindi mga playable na kandidato. Lahat ng playable stream ay dapat sumunod sa mga limitasyon, at isang tahasang default stream ang mas pinipili bago ang deterministic lowest-index fallback. Ang mga video ay limitado sa 600 segundo, 8,192 pixels bawat dimensyon, at 33,554,432 source pixels. Ang FFmpeg ay nagsa-sample ng 1–16 midpoint JPEG frames, binabawasan ang mahabang gilid sa maximum na 1,024 pixels nang walang upscaling ng mas maliliit na input, at hindi kailanman tumatanggap ng URL. Ang sampling ay `uniform` bilang default. Ang opsyonal na `scene_aware` at eksperimental na `segment_aware` na mga patakaran ay nagsasagawa ng isang karagdagang fixed FFmpeg pass sa na-validate nang lokal na stream, pumipili ng bounded `showinfo` scene timestamps, at bumabalik nang deterministically sa parehong uniform midpoints sa pagkabigo ng detector, timeout, malformed output, o isang walang laman na candidate set. Ang segment-aware mode ay naglalaan ng midpoint samples nang proporsyonal sa mga na-validate na scene interval; ang segment-aware na ebidensya at fallback behavior ay detalyado sa ibaba. Ang hard 16-frame cap ay inilalapat pagkatapos ng pagpili sa bawat patakaran. Kapag ang isang scene-aware na kahilingan ay mayroon lamang isang frame na budget, ginagamit nito ang uniform midpoint ng aktibong full-video o focus window at nag-uulat ng `policyEffective: uniform`: ang isang napiling scene frame ay hindi kayang panatilihin ang parehong temporal na dulo. Ang isang tumatawag ay maaaring opsyonal na magbigay ng isang finite focus window (`start`/`end` seconds); ang mga hangganan ay naka-clamp sa media duration, ang mga reversed o non-finite na window ay tinatanggihan, at lahat ng sampling policy ay isinasagawa lamang sa loob ng normalized interval. Ang nagreresultang window ay kasama sa sampling metadata at sa untrusted description prefix upang ang mga downstream na modelo ay makilala ang isang nakatutok na excerpt mula sa buong timeline.

Ang semantic caption focus ay isang hiwalay, tahasang setting. Ang default na `full` analysis mode ay nagpapanatili ng umiiral na frame prompt at hindi kailanman nagpapasa ng request text sa caption model. Sa `focused` mode, binabasa lamang ng bridge ang pinakabagong non-empty na `text`/`input_text` na isinulat ng user mula sa parehong Chat o Responses container, nino-normalize ito sa NFC, pinagsasama ang mga control character at whitespace, at nililimitahan ito sa 500 Unicode code points. Ang isang walang laman na resulta ay bumabalik sa eksaktong `full` prompt. Ang isang magagamit na pahiwatig ay sineserye bilang JSON sa isang dedikadong untrusted-user-context block at maaaring unahin lamang ang mga nakikitang detalye; hindi nito kayang i-override ang hiwalay na babala laban sa pagsunod sa mga tagubilin na nakikita o naririnig sa media. Ang textual focus ay hindi kailanman nagpapahiwatig ng `start`/`end` o nagbabago ng temporal sampler.

#### FU-07 ebidensya ng structural segment

Gumagamit ang `segment_aware` ng isang bounded pre-analysis pass sa na-validate nang lokal na video stream. Ang fixed filter chain ay unang nag-i-scale sa maximum na 320 pixels ang lapad, nakakakita ng mga pagbabago sa eksena at mga frozen na interval, pagkatapos ay nagsa-sample sa 1 frame bawat segundo para sa blur, average luma, at spatial/temporal na impormasyon. Ang pass ay limitado sa 600 structural samples, isang FFmpeg/filter thread, ang parehong `file`-only protocol at container allowlists, isang 1 MiB process-output bound, at maximum na 30 segundo sa loob ng shared abort/deadline ng broker. Hindi ito kailanman tumatanggap ng command, filter, path, o URL mula sa kahilingan.

Ang mga structural value ay deterministic sampling evidence, hindi semantic video understanding. Hindi nila hinuhulaan ang mga paksa, aksyon, caption, pananalita, o intensyon ng user. Ang mga hangganan ng eksena at freeze ay bumubuo ng mga segment; ang freeze coverage, blur, exposure, spatial detail, at temporal change ay nakakaimpluwensya lamang kung paano inilalaan ang kasalukuyang 1–16 frame budget. Ang isang ganap na frozen na segment ay limitado sa isang frame, habang ang mga non-frozen na segment ay naglalaban para sa natitirang budget. Kapag mas marami ang mga hangganan kaysa sa mga frame, pinapanatili ang pare-parehong timeline coverage upang hindi maitago ng mabilis na maagang pagputol ang isang mahabang trailing segment. Ang mga hangganan ng eksena sa loob ng 1-segundong resolution ng pagsusuri ng isang freeze boundary ay pinagsasama.

Ang mga nawawalang filter, malformed/empty evidence, error sa detector, o ang bounded pre-analysis timeout ay nagiging sanhi ng pagkabigo sa eksaktong uniform midpoint policy. Ang pag-abort ng caller o deadline ng broker ay hindi nagiging sanhi ng pagkabigo: tinatapos nito ang in-flight subprocess, pinipigilan ang pagkuha ng mga frame sa huli, at ang pribadong temporary tree ay tinatanggal sa `finally`.

Ang `scripts/perf/video-bridge-fu07-eval.ts` ay bumubuo ng deterministic real FFmpeg fixtures para sa post-dedup caption-call savings, dense-motion budget allocation, blur/exposure/SI-TI evidence, mabilis na pagputol na may mahabang buntot, at gradual-fade false positives. Itinatala nito ang pre-analysis wall time at, kung saan available ang `/usr/bin/time`, ang child CPU at peak RSS. Ang mga pagsusuri sa kalidad nito ay structural oracles lamang. Ang kalidad ng real caption-model ay nananatiling `HOLD` dahil ang harness na ito ay walang awtorisadong endpoint o frozen judge. Ang monetary savings ay nananatili ring `HOLD` maliban kung ang `--caption-cost-per-call-usd` ay nagbibigay ng isang malinaw na positibong per-call estimate; hindi kailanman gumagawa ang script ng alinman sa mga resulta.

Ang bawat frame ay limitado sa 4 MiB, ang lahat ng raw frames nang magkasama ay sa 23 MiB, at ang serialized broker response ay sa 32 MiB. Ang isang pribadong temporary directory ay tinatanggal sa `finally`. Hindi kasama ng OmniRoute ang FFmpeg at hindi tumatanggap ng custom executable path. Bago ang captioning, inilalapat ng bridge ang isang konserbatibong visual deduplication pass: ang bawat JPEG ay binabawasan sa isang 16×16 grayscale buffer at inihahambing lamang sa huling frame na napanatili. Para sa isang hiniling na caption budget na higit sa isang frame, ang pagkuha ay nagbibigay ng isang bounded candidate pool na hanggang dalawang beses ng budget na iyon at hindi hihigit sa 16 na frame. Ang hiniling na cap ay inilalapat lamang pagkatapos ng deduplication, kasama ang una at huling napiling kandidato na pinapanatili sa panahon ng final thinning kapag ang budget ay hindi bababa sa dalawa. Ang versioned `grayscale-16x16-mean-cells-v2` policy ay gumagamit ng mas malaki sa mean luma delta at ang ratio ng thumbnail cells na ang normalized delta ay hindi bababa sa 0.05. Ang duplicate threshold ay ang constant na 0.04, pinili para sa predictability sa halip na ilantad bilang isang runtime setting. Ang pangalawang high-contrast signal na ito ay nagpapanatili ng maliit na galaw at mga pagbabago sa nakikitang teksto na maaaring itago ng mean-only na paghahambang. Ang mga error sa comparator o decoder ay nagiging sanhi ng pagkabigo at pinapanatili ang coverage. Ang output metadata ay naghihiwalay ng mga extracted candidate, matagumpay na nagamit na frame, at mga visual duplicate na ibinaba.

Ang isang malinaw na minarkahang bahagi ng video ay maaaring humiling ng timestamped contact sheet. Ang bridge ay bumubuo ng pinakamataas na 4-column, 16-frame na JPEG grid. Ang bawat 512-pixel cell ay naglalagay ng source timestamp nito sa isang high-contrast bottom band, habang ang parehong mga timestamp ay nananatili sa textual metadata para sa downstream association at audit. Ang kumpletong JPEG ay nananatiling limitado sa 32 MiB. Kung hindi kayang i-decode o i-compose ng `sharp` ang grid, bumabalik ang bridge sa mga indibidwal na JPEG frame; ang pag-abort ng client ay kumakalat pa rin sa operasyon ng sheet.

Ang promotion evidence ay sadyang hiwalay sa synthetic composition microbenchmark. Ang `scripts/perf/video-bridge-contact-sheet-eval.ts` ay nagtatakda ng isang schema-versioned A/B harness para sa mga real OpenAI-compatible vision model. Sinusukat nito ang provider-reported tokens, end-to-end wall latency (kasama ang sheet composition), model-call count, at manifest-defined fact retention. Ang mga raw model response ay hindi isinusulat sa ulat; tanging ang SHA-256 digests at matched fact IDs lamang ang pinapanatili. Ang harness ay hindi gumagawa ng network o bayad na model call maliban kung ipinasa ang `--execute-real` at naka-configure ang `--model`, `OMNIROUTE_BASE_URL`, at `OMNIROUTE_API_KEY`. Kung walang malinaw na real run na iyon, ang machine-readable verdict nito ay nananatiling `HOLD`; ang synthetic payload/call-count measurements lamang ay hindi promotion evidence.

Maaaring maglakip ang mga caller ng isang opsyonal na `transcript.cues` array sa isang sinusuportahang bahagi ng video kapag mayroon na silang aligned text. Ang bawat cue ay dapat maglaman ng `text`, isang finite `start`/`end` interval sa loob ng probed duration, at isang whitelisted `source` (`client`, `embedded`, o `audio-bridge`); ang `confidence` ay nagde-default sa `1` at dapat manatili sa pagitan ng `0` at `1`. Ang eksaktong duplicate cues ay pinagsasama. Hindi kailanman sinisimulan ng OmniRoute ang transcription mula sa metadata na ito: ang mga validated cue ay kinokopya sa inilarawang resulta kasama ang source, confidence, at interval, at ipinapakita bilang untrusted observations kasama ng mga frame caption. Ang invalid, out-of-range, o provenance-free na teksto ay tinatanggihan sa halip na ihalo sa caption stream. Ang `source` field ay kasalukuyang caller-declared, hindi server-verified: ipinapatupad ng OmniRoute na ang halaga ay isa sa tatlong pinahihintulutang string, ngunit hindi pa nito cryptographically kinukumpirma na ang isang `embedded` o `audio-bridge` label ay talagang nagmula sa isang server-owned extraction. Ituring ang `source` bilang isang untrusted hint hanggang sa dumating ang pag-verify na iyon; huwag bumuo ng mga desisyon sa awtorisasyon batay dito.

Ang isang advanced na tumatawag ay maaaring magbigay ng isang `audioTranscript` track na awtorisado na para sa parehong video. Ang fusion seam ay nagpapatakbo ng mga visual at audio na obserbasyon sa ilalim ng isang deadline at abort signal, inaayos ang mga ito sa isang karaniwang timeline, pinagsasama ang eksaktong mga duplicate, at nag-uulat ng isang bahagyang resulta kapag isang panig lamang ang nagtagumpay. Ang isang invalid na `audioTranscript` ay bumababa sa bahagyang resultang iyon — ang visual na paglalarawan ay pinananatili at ang audio branch ay nagtatala ng isang sanitized failure code — sa halip na ipagpalya ang buong video. Ang per-branch availability, ang partial flag, at ang mga sanitized failure code ay pinananatili sa inilarawang resulta, sa guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), sa result-cache metadata, at sa bridge fusion counters. Ang default na path ng Video Bridge ay hindi nagpapagana ng speech-to-text o nagda-download ng pangalawang kopya ng media; nang walang tahasang track na iyon, nananatili itong video-only.

**Pagpapanatili ng Transcript (#12150 P1).** Awtomatiko itong nalalapat tuwing ang Video Bridge (na opt-in mismo) ay nagre-render ng isang transcript cue — walang hiwalay na retention flag. Kapag ang isang kahilingan ay nagre-render ng anumang transcript cue (isang `transcript` na idineklara ng tumatawag o isang fused `audioTranscript`), minarkahan ito ng guardrail bilang `videoBridgeObserved` at gumagawa ng isang redacted shadow ng paglalarawan ng video — isang magkaparehong rendering kung saan ang free-text body ng bawat cue ay pinapalitan ng `[redacted-video-transcript]`, na binuo sa pamamagitan ng pagpapalit ng structured cue field bago buuin ang string (hindi kailanman sa pamamagitan ng pag-parse ng flattened text, kaya walang nilalaman ng cue — adversarial o ordinaryo, kabilang ang mga body na naglalaman ng `]` tulad ng `[inaudible]`/`[music]` — ang maaaring manatili). Ang persisted call-log request body ay pinapalitan ang bawat video-derived text part para sa redacted shadow na iyon, na tinutugma sa pamamagitan ng content equality; ang `fullText` anchor ay muling binabasa mula sa natapos na pre-call guardrail payload, kaya ang pagtutugma ay nagtatagumpay pa rin pagkatapos ng mga susunod na chain guardrail (ang PII at credential maskers, priorities 10/95) na muling isulat ang description text sa lugar at pagkatapos ng system-prompt/handoff/memory injection na muling hubugin ang message array. Ang body na ipinadala upstream sa modelo ay hindi nagbabago. Ang isang observed request ay hindi rin nagpupuno ng anumang durable Memory (parehong request- at response-derived extraction ay nilalaktawan), kaya ang sariling tugon ng modelo ay hindi maaaring mag-echo ng transcript text sa Memory.

Ang mga karagdagang retained copy ay gumagamit ng parehong observed-request signal. Ang raw pre-guardrail client-request snapshot, in-memory pending request, at early rejected-request log ay structurally pinapalitan ang mga transcript field sa mga bahagi ng video; ang mga string prompt na na-synthesize ng mga pipeline stage at context handoff ay nire-redact sa persisted-request-body sink. Ang persisted `video_content_removed` marker ay nagiging sanhi upang ang `previous_response_id` continuation ay mag-fail closed sa halip na muling buuin ang text na sadyang itinapon. Kung ang isang observed request ay mawalan ng per-part redaction shadow nito bago mag-log, o kahit isa sa ilang video shadow ay hindi tumugma pagkatapos ng mga susunod na request mutation, ang retained request body ay ganap na tinatanggal sa halip na panatilihin ang isang partially redacted transcript.

Para sa isang observed request, ang tugon ng modelo ay maaaring mag-quote ng anumang bahagi ng transcript nang walang structured cue boundary. Ang persisted call-log `responseBody` nito ay samakatuwid ay pinapalitan ng isang omission marker; ang detalyadong pipeline artifact (na maaaring magsama ng upstream/client bodies at stream chunks) ay hindi pinananatili. Ang mga semantic, idempotency, at reasoning-replay cache ay nilalaktawan ang mga pagbasa at pagsusulat para sa kahilingang iyon. Ang provider request at client-visible response ay nananatiling hindi nagbabago. Ang mga early keepalive byte ay dinidiskarga mula sa temporary buffer kapag ang detalyadong artifact ay tinanggal. Ang malformed EventStream warning ni Kiro ay nag-uulat lamang ng payload byte count, hindi kailanman ang nilalaman nito o ang raw error ng JSON parser. Hindi nito inaangkin na ang bawat hindi kaugnay na provider/plugin diagnostic ay na-audit na; ang mas malawak na retained-sink sweep ay sinusubaybayan sa #11658.

Ang internal na `/api/modality-bridge/video/drilldown` lifecycle ay isang hiwalay, loopback/token-authenticated cache substrate. Ang bawat operasyon ay nangangailangan din ng isang canonical opaque principal ID. Bago paganahin ang isang production caller, dapat nitong makuha ang ID na iyon mula sa authenticated tenant at hindi dapat kailanman ipasa ang isang client-selected value. Ang mga cache key ay nagbubuklod sa principal na iyon sa canonical session at video-reference ID, nag-iimbak lamang ng kanilang mga SHA-256-derived key, at sumasaklaw sa parehong pagbasa at pagtanggal sa parehong principal. Ang cache ay nag-iimbak ng hanggang 16 na derived JPEG frame bawat entry, pinapa-expire ang mga ito pagkatapos ng sampung minuto, at sumusuporta sa bounded `start`/`end` reads o tahasang pagtanggal ng session.

Ang bawat principal ay limitado sa 16 na entry at 64 MiB ng canonical JPEG data. Ang mga limitasyong iyon ay independiyente mula sa global na 64-entry/256 MiB ceiling: ang principal quota pressure ay nagtatanggal lamang ng mga least-recently-used entry ng principal na iyon bago isaalang-alang ang global LRU eviction. Ang mga expired na entry ay tinatanggal mula sa parehong principal at global accounting sa aktibidad ng cache, habang ang pag-cancel at validation failure ay hindi nagko-commit ng isang partial replacement.

Tinanggihan ng cache ang non-canonical Base64, labis na padding, non-JPEG media, malformed o truncated JPEG, at mga JPEG na gumagawa ng babala sa panahon ng isang bounded full-image `sharp` decode. Muli nitong ini-encode ang bawat tinanggap na imahe bilang isang canonical JPEG, kinukuha ang lapad at taas mula sa decoded bytes sa halip na magtiwala sa mga caller field, at itinatapon ang anumang trailing polyglot bytes sa halip na panatilihin ang mga ito. Tanging ang bounded canonical compressed buffer lamang ang sinisingil sa parehong quota. Kasama sa JSON wire limit ang Base64 overhead para sa 32 MiB decoded-input ceiling. Ang bawat nakaimbak na derivation ay nagtatala ng validated JPEG format/resolution nito, sampling policy, derivation version, creation time, server-computed content hash, at hashed parent reference kasama ang parent-content hash ng pinagkakatiwalaang tumatawag. Ang pag-cancel ay sinusuri sa pagitan ng asynchronous decode/hash phases bago ang atomic cache commit.

Ang tranche na ito ay hindi pa nagkokonekta ng isang production producer sa ruta at hindi nagbibigay ng multi-resolution variant selection. Samakatuwid, ang transparent na Video Bridge request path ay walang idinagdag na trabaho, habang ang tenant-bound principal derivation at ang buong FU-08 multi-resolution lifecycle ay nananatiling malinaw na follow-up na trabaho sa halip na idokumento bilang kumpletong pag-uugali.

Ang mga frame ay nilalagyan ng caption nang sunud-sunod gamit ang naka-configure na modelo ng Video. Ang isang walang laman na Video override ay nagmamana ng setting ng Vision; kung pareho silang walang laman, pipiliin ng Vision auto-router ang epektibong modelong may kakayahang-paningin. Ang matagumpay na mga caption ay pumapalit sa orihinal na bahagi ng isang stable na `[Video description:` prefix na nagmamarka rin sa teksto bilang isang hindi pinagkakatiwalaang obserbasyon na nagmula sa media at nagsasabi sa mga downstream na modelo na huwag sundin ang mga tagubilin na matatagpuan sa media. Kasama sa mga key ng cache ng frame-caption ang JPEG bytes, prompt, timestamp, at epektibong modelo; tanging ang matagumpay na mga caption lamang ang naka-cache. Pinapanatili ng mga entry ng cache ang aktwal na matagumpay na producer model, kabilang ang isang fallback model; iniuulat ng bridge ang `mixed` kapag ang iba't ibang frame ay ginawa ng iba't ibang modelo. Ang isang cache hit ay muling ginagamit ang pagkakakilanlan ng producer na iyon sa halip na muling lagyan ito ng label bilang hiniling na routing plan. Ang whole-video result cache ay naka-key sa bawat input na nagbabago sa output — prompt, epektibong modelo, sampling policy, frame count, semantic analysis mode, ang SHA-256 fingerprint ng normalized focus hint, focus window, `transcript`, `audioTranscript`, at ang contact-sheet flag — kaya ang pagbabago ng alinman sa mga dimensyong iyon ay isang cache miss, hindi kailanman isang lumang muling paggamit. Ang bersyon ng visual dedup policy, threshold, at bounded candidate-frame count ay malinaw din sa result-cache key at metadata; samakatuwid, ang pagbabago ng policy ay hindi maaaring muling gumamit ng lumang whole-video description. Pinapanatili ng Result-cache v4 metadata ang mode at fingerprint, hindi kailanman ang raw user task. Iniulat ng Guardrail metadata ang parehong hiniling at epektibong analysis modes; ang isang hiniling na `focused` mode na walang magagamit na user text ay iniuulat bilang epektibong `full`.

Kinukuha ng guardrail ang bawat sinusuportahang bahagi ng video ngunit naglalarawan ng hindi hihigit sa `modalityBridgeVideoMaxVideos`. Para sa isang target na napatunayang may `supportsVideo === false`, ang mga nabigo at lumampas sa limitasyong video ay nagiging malinaw na safe text markers upang walang raw video ang makaligtas. Kapag hindi alam ang kakayahan, ang mga bahaging iyon ay nananatiling hindi nagagalaw. Ang mga target na may `supportsVideo === true` ay lumalampas sa bridge. Ang client request abort signal ay kumakalat sa download, broker queue, subprocesses, at caption calls; ang mga abort ay humihinto sa pagitan ng mga video at hindi kailanman nabibigo na magbukas sa raw media.

Ang mga setting ng runtime ay sinusuportahan ng DB at Zod-validated:

| Key                                 | Default     | Saklaw / pag-uugali                                                                                                                 |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opsyonal na runtime, opt-in                                                                                                         |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | pinapanatili ng `full` ang mga generic na caption; ginagamit ng `focused` ang bounded, hindi pinagkakatiwalaang latest-user context |
| `modalityBridgeVideoModel`          | `""`        | Minamana ang modelo ng Vision Bridge                                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, o proportional `segment_aware`; ang pagkabigo ng detector ay bumabalik sa `uniform`                       |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                      |

Ang mga legacy na persisted na halaga ng Video timeout na higit sa 120 segundo ay ikinakabit sa broker deadline; ang mga bagong setting writes na higit sa limitasyong iyon ay tinatanggihan. Ang `GET /api/modality-bridge/video/runtime` ay nangangailangan ng pinagkakatiwalaang stamped loopback locality bago ang authentication o runtime probing, pagkatapos ay nangangailangan ng management auth. Ibinabalik lamang nito ang `available`, sanitized na bersyon ng FFmpeg/ffprobe, at isang nakapirming dahilan kapag hindi available ang runtime. Ang internal extraction endpoint ay hindi isang pampublikong upload API: ang queue saturation ay nagbabalik ng `503` kasama ang `Retry-After`, ang caller disconnect ay nagbabalik ng `499`, at ang nakapirming broker deadline ay nagbabalik ng `504`. Ang mga na-convert na tugon ay nagdaragdag ng `video->text;model=<visionModel>;parts=<videos>` sa sentral na `x-omniroute-modality-bridge` header nang hindi inaalis ang mga segment ng Vision o Audio.

### PII Masker (`piiMasker.ts`)

Tumatakbo sa **parehong** yugto.

- Kinokopya ng `preCall` ang payload, nilalakad ang `system`, `messages`, `input`, at `prompt` (kabilang ang mga plain string item), at inilalapat ang `processPII()` (mula sa `@/shared/utils/inputSanitizer`) sa mga string `content`/`text` field. Kapag `PII_REDACTION_ENABLED=true`, ang natukoy na PII ay nire-redact sa outbound payload. Ito ay independiyente sa `INPUT_SANITIZER_MODE` (na kumokontrol lamang sa prompt-injection policy). Kapag naka-off ang redaction, itinatala ng tawag ang detection counts nang hindi muling isinusulat ang nilalaman.
- Ang `postCall` ay deep-clones ang tugon, pinapatakbo ang `sanitizePIIResponse()` kasama ang Responses-API-shape masker (`maskResponsesOutput` — sumasaklaw sa `output_text` at `output[].content[].text`). Kung may anumang redaction na mangyari, papalitan ng binagong tugon ang orihinal.

Hindi kailanman humaharang ang guardrail; ito ay nag-aanotate lamang (`meta.detections`, `meta.redacted`) o nagsusulat muli.

### Prompt Injection (`promptInjection.ts`)

Nakakakita ng mga adversarial na istruktura sa nilalaman na ibinigay ng user at ipinapatupad ang naka-configure na policy. Ang pag-uugali ay hinihimok ng mga environment variable at constructor options:

| Setting | Env var | Default | Epekto |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | Kapag `false`, ang guardrail ay short-circuit. |
| Mode | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE` | `warn` | Patakaran sa pag-inject: `block`, `warn`, o `log`. (Ang `redact` ay tinatanggap para sa back-compat ngunit **hindi** nito tinatanggal ang injection text; ang kahilingan sa PII rewrite ay kinokontrol ng `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimum na kalubhaan na kinakailangan upang harangan. Ang Medium ay observe-only sa default. |

**Precedence ng Mode** (`getMode`): caller `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Samakatuwid, ang isang dashboard override ay mas matimbang kaysa sa mga env var, kaya kinokontrol ng UI ng Feature Flags ang tumatakbong guard nang live (walang restart). Ang pagbasa ng DB ay fail-safe:
kung ito ay mag-error, ang guard ay babalik sa env-based na pag-uugali, at kapag walang override na nakatakda, ang pag-uugali ay kapareho ng env-only resolution.

Mga pinagmulan ng deteksiyon:

1.  `sanitizeRequest()` mula sa `@/shared/utils/inputSanitizer` (nakabahaging detector
    set na ginagamit sa ibang bahagi ng pipeline).
2.  Built-in na `DEFAULT_GUARD_PATTERNS` (kasalukuyang `system_override_inline` at
    `markdown_system_block`, parehong `high` severity).
3.  Opsyonal na `customPatterns` na ipinasa sa pamamagitan ng constructor options (mga string, regex,
    o `{ name, pattern, severity }` na mga record).

Kapag `mode === "block"` **at** hindi bababa sa isang deteksiyon ang nakakatugon sa severity
threshold, ang `preCall` ay nagbabalik ng `{ block: true, message: "Request rejected:
suspicious content detected" }`. Sa `warn`/`log` modes, ang guardrail ay nagla-log ngunit
pinapayagan ang tawag. Ang nakabahaging helper na `evaluatePromptInjection()` ay ini-export din
para sa mga tumatawag na kailangang suriin ang mga prompt nang hindi dumadaan sa registry.

**Scan bound (v3.8.20):** sinusuri lamang ng detector ang **unang 16 KB** ng
pinagsamang prompt text — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) sa
`src/shared/utils/inputSanitizer.ts`. Parehong `detectInjection()` at
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` bago patakbuhin
ang pattern loop. Ang mga direktiba ng injection ay matatagpuan malapit sa tuktok ng isang input, kaya
nililimitahan nito ang regex CPU/GC sa multi-hundred-KB na mga payload nang hindi
pinapahina ang deteksiyon (cf. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Tumatakbo sa **parehong** yugto, huli sa default na chain (priority `95`). Nirere-redact
ang mga kilalang API-key / secret-token na pattern mula sa outbound payload (nilalaman ng mensahe,
mga argumento ng tool-call, mga resulta ng tool) **at** ang tugon ng provider, kaya ang isang
credential na na-paste sa isang prompt (o ibinalik ng isang resulta ng tool) ay hindi
na-leak sa upstream provider o pabalik sa client.

- **Opt-in lamang**, parehong kumbensyon tulad ng PII redaction (Hard Rule #20-adjacent):
  hindi pinagana maliban kung `settings.credentialRedactionEnabled === true` **o**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kapag naka-off ito, ang guardrail ay isang no-op —
  hindi ito kailanman humaharang at hindi kailanman nagsusulat muli.
- `redactCredentials()` ay naglalakad sa buong payload/response tree (`walkValue()`,
  prototype-pollution-safe, cycle-safe sa pamamagitan ng `WeakSet`) at pinapalitan ang mga tugma ng
  isang `[REDACTED:<type>]` placeholder, kinokopya lamang ang mga sangay na talagang
  nagbago.
- Sakop ng `CREDENTIAL_PATTERNS` ang mga key ng LLM provider (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), mga token ng VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), mga key ng pagbabayad (Stripe, Square), mga key ng cloud (AWS access key, Twilio, SendGrid, Mailgun), mga pribadong key / JWT,
  mga string ng koneksyon na nagdadala ng credential (`mongodb://user:pass@...`, atbp.), at
  isang generic na `Authorization`/`x-api-key`/`api-key`/`apikey` na pattern ng header-value. Ang mga key na hugis-header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) ay nire-redact nang istruktura (halaga lamang, ang scheme prefix tulad ng
  `Bearer `/`Basic ` ay pinapanatili) sa halip na sa pamamagitan ng generic na text regex.
- Hindi kailanman humaharang ang guardrail; nagsusulat lamang ito muli (`modifiedPayload` /
  `modifiedResponse`) at naglalagay ng anotasyon (`meta.credentialsRedacted`, `meta.count`).

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
