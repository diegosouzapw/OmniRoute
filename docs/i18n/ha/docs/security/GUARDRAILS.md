# Guardrails (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tushen gaskiya:** `src/lib/guardrails/`
> **Sabuntawa ta ƙarshe:** 2026-08-29 — v3.8.51 (asalin rubutaccen bayanin Video Bridge mai kira ne ke bayyana shi,
> har yanzu sabar ba ta tabbatar da shi ba — an fayyace bisa #11661)

Matakan kariya suna aiwatar da tsaro, manufofi, da sauye-sauyen abun ciki a iyakar
tsakanin OmniRoute da masu samarwa na upstream. Kowane matakin kariya na iya bincika (kuma
idan ana so ya ƙi, ya sauya, ko ya ƙara bayani ga) bayanan buƙata (`preCall`) da
amsoshin upstream (`postCall`).

Tsarin yana da halin **fail-open**: idan matakin kariya ya jefa kuskure yayin aiwatarwa, rajistar
tana rubuta kuskuren sannan ta ci gaba da matakin kariya na gaba maimakon hana
buƙatar. Toshewa yanke shawara ne da aka yi a sarari (`block: true`), ba haɗari ba.

## Ginannun Matakan Kariya

Rajistar tana loda matakan kariya guda shida ta atomatik bisa tsarin fifiko lokacin import
(duba `registry.ts` → `registerDefaultGuardrails()`):

| Fifiko | Suna                | Mataki/Matakai | Fayil                 |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lambobin fifiko mafi ƙanƙanta suna aiki **da farko**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Yana katse buƙatun da ke ɗauke da hotuna waɗanda aka nufa ga **samfuran da ba sa gani** sannan ko dai
ya sake tura dukkan buƙatar zuwa samfurin da ke iya gani, ko ya maye gurbin sassan
hotunan da bayanan rubutu da wani samfurin gani mai iya daidaitawa ya samar kafin
kiran upstream. Wannan yana ba masu samarwa masu amfani da rubutu kawai damar sarrafa
bayanan multimodal ba tare da matsala ba.

Tsari:

1. Tsallake idan samfurin da aka nufa ya riga ya goyi bayan gani (sai dai idan yana cikin
   jerin tilasta amfani da bridge `isVisionBridgeForcedModel`).
2. Ciro sassan hotuna ta hanyar `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), wanda ke miƙa aikin ga **haɗaɗɗen mai gano kafofin watsa labarai**
   `detectMediaParts()` a cikin `open-sse/utils/mediaParts.ts` — shi ne
   tushen gaskiya guda ɗaya da ake rabawa tare da matatar dacewa ta combo.
   An takaita cirar zuwa sassan matakin-sama masu siffofin da
   `replaceImageParts` zai iya sake saka wa (yarjejeniyar cirewa↔maye-gurbi): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, da Responses API `input_image`. Abubuwan da aka samo a ciki da
   siffofin da ke nuna alama kawai na matatar combo ne kuma ba a taɓa cire su.
   Tsallake idan ba a samu ko ɗaya ba.
3. Warware saitunan lokacin aiki ta hanyar `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): sabbin maɓallan saitunan `modalityBridge*`
   suna da fifiko; tsofaffin maɓallan `visionBridge*` suna ci gaba da zama **madadin zagaye ɗaya**
   (lokacin komawa baya). Tsallake kafin bin duk wani kafofin watsa labarai idan
   an kashe bridge.
4. Mai zaɓar yanayi (`modalityBridgeVisionMode`, duba teburin da ke ƙasa) yana yanke shawarar
   sake turawa ko bayyanawa. Sake turawa yana dawo da `modifiedPayload` inda `model`
   kawai aka sauya, tare da meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Hanyar bayyanawa: kayyade hotuna zuwa `maxImages`, haɗa prompt mai la'akari da aiki,
   bincika cache na bayyanawa, kira samfurin gani **a lokaci guda**
   (`Promise.allSettled`), sannan saka sassan rubutu `[Image N]: <description>` a
   wurarensu. Bayyanawa da ta gaza tana samar da `null`, kuma ana **adana** asalin sashen hoton
   (#4012) — sai dai a hanyar bayyanawa ta combo idan duk
   bayyanawar ta gaza, inda upstream da aka tabbatar ba ya iya gani zai sami stub na
   `(unavailable — no vision-capable provider connected)` a maimakonsa (#8430).
6. Dawo da `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mai zaɓar yanayi (`modalityBridgeVisionMode`)

| Yanayi     | Tsoho | Halayya                                                                                                                                                                                                                                                                                         |
| ---------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Tsohuwar hanyar tantancewa, ba a sauya ta ba (#6640/#7204): samfuran da ba combo ba/`auto/` suna sake turawa zuwa mafi kyawun samfurin gani sai dai idan asalin samfurin yana da bayanan shiga masu aiki (sai ya yi bayani); wuraren combo koyaushe suna yin bayani.                            |
| `describe` |       | Koyaushe yi bayani — ana tsallake tubalin sake turawa gaba ɗaya; samfurin da mai amfani ya zaɓa ne koyaushe yake ba da amsa.                                                                                                                                                                    |
| `reroute`  |       | Tilasta sake turawa: ana ƙetare kariyar riƙe-samfuri-mai-bayanan-shiga. Har yanzu kariyar bayanan shiga ta **manufar** sake turawa tana aiki — idan babu wata manufa ta gani mai amfani, buƙatar tana koma wa bayyanawa don kada ɗanyen hotuna su taɓa isa ga backend mai rubutu kawai (#8430). |

Yanayoyin da aka tilasta suna dakatar da aiki **kafin** tsohuwar hanyar tantancewa ta fara; halayyar `auto`
ta yi daidai da ta matakin kariya na kafin PR-1 har zuwa matakin byte.

#### Prompt na bayyanawa mai la'akari da aiki (`modalityBridgeVisionTaskAware`)

Tsoho **true** ne. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) yana ƙara
rubutun **saƙon mai amfani na ƙarshe** (wanda aka taƙaita zuwa haruffa 500) zuwa asalin
prompt na bayyanawa, yana karkatar da bayanin zuwa ga ainihin abin da mai amfani ya tambaya
(tsarin codex-vision-proxy) tare da neman samfurin gani ya rubuta
rubutun da ake iya gani. Idan an kashe alamar — ko babu rubutun mai amfani — ana amfani da asalin prompt ba tare da sauyi ba.

Buƙatar OpenAI-compatible ta describe self-loop (`callVisionModelSingle()`
a cikin `visionBridgeHelpers.ts`) koyaushe tana buƙatar `image_url.detail: "high"` —
ba tare da wani sharadi ba, ga kowane mai kira/mai samarwa, kuma ba a ɗaure ta da wata alama daga abokin ciniki ba.
Samfurin low-detail yana rage daidaiton OCR musamman ga aikin kwafe rubutu
da wannan prompt ɗin yake nema, don haka kiran describe ɗin kansa koyaushe yana buƙatar cikakken
bayani ba tare da la’akari da matakin detail da buƙatar asali mai shigowa ta yi amfani da shi ba. Wannan
yana shafar jikin buƙatar describe na ciki ne kawai; ba ya canza yadda
OmniRoute ke tura `image_url.detail` na mai kira a babbar buƙatar —
ana amfani da wannan default ɗin daban, kuma ga abokan cinikin OpenCode da aka gano kawai, a cikin
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Reshen
Anthropic wire-format na describe self-loop ba shi da filin `detail`
kuma ko wane default ba ya shafarsa.

#### Iyakar fitarwar describe (`modalityBridgeVisionMaxChars`)

| Maɓalli                        | Default | Faɗi             |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ko 100–50000 |

`0` (default) yana nufin **babu iyaka** — bayanin da
`callVisionModel()` ya dawo da shi ana wuce shi ba tare da gyara ba, don kiyaye
halayen da ake da su. Duk wata ƙima cikin faɗin 100–50000 tana gajarta bayanin tare da
ƙarin `…` a ƙarshe kafin a saka shi a matsayin `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` a cikin `src/lib/guardrails/visionBridge.ts`).
Ƙara wannan ga ayyukan OCR masu buƙatar cikakken bayani inda model na gaba yake buƙatar
cikakken kwafen rubutun; rage shi don iyakance amfani da token a kan vision models masu yawan bayani.
Filin dashboard yana cikin Advanced panel na shafin Vision
(`modality-bridge-max-chars` a cikin `ModalityBridgeVisionTab.tsx`) kuma yana ɗaga duk wata
ƙima tsakanin 1 da 99 zuwa mafi ƙarancin 100, yayin da yake barin `0` da aka saka kai tsaye
ba tare da taɓawa ba — `0` ingantacciyar ƙimar Zod ce da kanta
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ba kawai
default na "ba a saita ba" ba.

#### Cache na describe (`modalityBridge/bridgeCache.ts`)

Cache na LRU + TTL a cikin ƙwaƙwalwa don fitarwar describe, wanda dukkan process ɗin ke amfani da shi.
Maɓalli = `sha256(imageRef + composedPrompt + configuredBridgeModel)` tare da
length-prefix framing (babu karo a iyakokin filaye). Bangaren model ɗin shi ne
bridge model da aka **saita**, ba model ɗin da ya ba da amsa a zahiri ba —
`callVisionModel` na iya komawa ga wani a ciki, kuma yin keying ga kowane yunƙuri zai
rarraba cache ɗin. Describe da ya gaza ba a taɓa adana shi a cache. Saituna:

| Maɓalli                         | Default | Faɗi    |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Daidaita hoton nesa (describe self-loop/ɗauko base64)

Lokacin da bridge ya ɗauko hoton **nesa** da kansa — self-call na Anthropic describe
da kuma sauya base64 na claude-wire-format
(`ensureBase64ImagesForClaudeWire`), duka ta hanyar
`fetchRemoteImageAsDataUri()` a cikin `visionBridgeHelpers.ts` — data
URI da aka samu ana wuce shi ta cikin `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kafin a saka shi cikin buƙatar
vision-model. Hotuna masu girma fiye da kima ana rage girmansu zuwa **2048px a gefen da ya fi tsawo** (daidai da
iyakar resize da OpenAI/Anthropic suka riga suka yi amfani da ita a server-side), wanda ke rage
bytes/latency na upload ba tare da canza abin da vision model yake gani ba. Resize
yana amfani da `sharp`, wanda ake loda ta hanyar dynamic import: a kan platform inda native
binary ɗinsa ya kasa lodawa, `normalizeDataUri()` **ba ya taɓa jefa kuskure** — yana koma wa
wuce bytes na asali ba tare da canji ba, saboda haka hanyar describe/base64-conversion
koyaushe tana ci gaba da aiki. Bytes da ba na hoto ba (fetch da bai dawo da
hoton da za a iya decode ba) su ma ana wuce su ba tare da taɓawa ba. Wannan normalization ɗin
ya taƙaita ga hotunan da bridge ya ɗauko don self-call ɗinsa — ba a taɓa
amfani da shi a kan raw passthrough payload na mai kira ba, daidai da
ƙa’idar yin gyara ta opt-in kawai (Hard Rule #20).

#### Schema na saituna + migration

Sabbin maɓallan `modalityBridge*` ana tabbatar da ingancinsu ta Zod a cikin `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, rukunin `modalityBridgeCache*`, da kuma
rukunin `modalityBridgeAudio*` da Audio Bridge ke amfani da shi. Migration
`141_modality_bridge_settings.sql` yana kwafe ƙimomin legacy
`visionBridge*` da ake da su zuwa sababbin maɓallan da suka dace (idempotent ne, kuma ba ya taɓa maye gurbin
ƙimar `modalityBridge*` da operator ya saita); ana ci gaba da karɓar maɓallan legacy a matsayin
read fallback na tsawon release cycle guda ɗaya.

#### Header na bayyana gaskiya + stats

Responses da aka sauya ta describe suna ɗauke da
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(wanda `buildModalityBridgeHeader()` a cikin `modalityBridge/bridgeStats.ts` ya gina,
kuma `withModalityBridgeHeader()` a cikin `src/sse/handlers/chatHelpers.ts` ya saka).
Buƙatun da aka reroute ba sa samun wani header — ba a taɓa payload ɗin ba, kuma ana iya ganin
sauyin model a filin `model` na jikin response.

`GET /api/modality-bridge/stats` (management auth, mataki ɗaya da
`GET /api/settings`) yana dawo da counters na kowane modality da ke cikin ƙwaƙwalwa
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` don `vision`, `audio`, da
`video`. `averageLatencyMs` yana amfani da `latencySamples`, ba duk attempts ba, a matsayin
denominator; operation da ba shi da timing ba ya ƙirƙirar samfurin millisecond-sifili
na ƙarya. `bridged` yana ci gaba da zama backward-compatible alias na conversions
da suka yi nasara; attempts da suka gaza ba sa ƙara shi.
Counters suna sake farawa idan process ya restart bisa tsari
(telemetry ne, ba accounting ba).

#### Tsarin dashboard

Shafin dashboard ɗin da aka keɓe shi ne
`/dashboard/settings/modality-bridge`. Shafukansa na `Vision`, `Audio`,
da `Video` waɗanda ake iya buɗewa ta URL suna adana sigogin query yayin sauya ƙimar `tab`.
Shafin Vision yana samar da kunnawa, yanayi, zaɓin model (har da tsohon zaɓi na
atomatik), samar da prompt bisa task, manyan iyakokin timeout/hoto/tsawon-bayani/cache,
ƙididdigar lokacin aiki,
da samfurin request mai kariya. Shafin Audio ma yana aiki: yana samar da
kunnawa, mai zaɓar model na STT-kawai tare da Auto, iyakokin timeout/max-clip,
ƙididdigar audio, da gwajin samfurin `input_audio`. Shafin Video yana aiki: yana nuna
yanayin lokacin aiki na FFmpeg/ffprobe — ɗaya daga cikin bayyanannun yanayi huɗu na UI (`unknown` yayin
da probe ke gudana ko bai iya kammalawa ba, `restricted` a kan host ɗin dashboard
wanda ba na loopback ba inda ake tsallake probe a gefen client, `unavailable` bayan an yi probe
kuma an tabbatar babu shi, ko `available` tare da nau'ikan FFmpeg/ffprobe) — yana adana
iyakokin kunnawa/model/frame/video/timeout, yana tace mai zaɓar model zuwa models
masu iya vision, kuma yana samar da ƙididdigar video.

Tsohon katin Vision Bridge a ƙarƙashin saitunan AI yanzu mahaɗin dacewa ne zuwa
sabon shafin; ba ya ƙara mallakar wani kwafi na biyu na form ɗin. Media Providers kuma
yana haɗa ayyukan Image-to-Text da Speech-to-Text zuwa shafukan Modality
Bridge da suka dace ba tare da cire playground na Speech-to-Text da ake da shi ba.

**Tsallake karɓar self-loop:** idan kiran describe ya bi ta
`/v1` self-loop na OmniRoute kansa (model na provider wanda ba na daidaitaccen tsari ba), ƙaramin request ɗin yana aika
`x-omniroute-admission-bypass: internal` kuma ana tabbatar da sahihancinsa ta amfani da
credential na self-loop da aka warware — sentinel na gida `sk_omniroute` a yanayin gida, ko
env key `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` da operator ya saita (#1350), domin
deployments masu `REQUIRE_API_KEY=true` su ci gaba da iya gudanar da kiran describe. Ana
amincewa da bypass ɗin ne kawai ga waɗannan takamaiman credentials, don haka clients na waje ba za su iya amfani da
header ɗin don tsallake admission ba.

Tsoffin ƙimomin default suna cikin `src/shared/constants/visionBridgeDefaults.ts`;
sabbin ƙimomin default na mode/task-aware/cache da settings resolver suna cikin
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail ɗin yana samar da zaɓin constructor na
`deps` domin tests su iya shigar da implementations na bogi na `getSettings` da
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Yana tare requests na chat masu ɗauke da audio kafin su isa target wanda ba a
san yana karɓar shigarwar audio ba. Ba ya taɓa sake karkatar da request ɗin chat: ana
juya sassan audio zuwa rubutu ta hanyar endpoint na multipart mai dacewa da OpenAI da ake da shi, sannan
model na chat da aka zaɓa ya ci gaba da transcripts na rubutu.

Gudana:

1. Warware `supportsAudio` ta hanyar `getResolvedModelCapabilities()`. Bayanan metadata
   na provider-registry da aka bayyana sarai su ne kan gaba, sannan metadata na model na tsaye, sai kuma
   `modalities_input` da aka daidaita. Jerin input da aka ayyana wanda ba shi da `audio` yana zama `false`;
   idan babu shaidar capability zai kasance `null`. Duka `false` da `null` suna kunna
   bridge na taka-tsantsan, yayin da `true` ke tsallake shi.
2. Warware saitunan `modalityBridgeAudio*` sannan a ciro sassan audio na matakin sama
   waɗanda za a iya haɗawa daga kowane saƙo ta hanyar detector ɗin `detectMediaParts()`
   da ake rabawa. Tsarukan wire da ake tallafawa su ne `input_audio` na OpenAI, `audio_url`, da
   `source.media_type: "audio/*"`. Ana gano audio mai zurfi don routing amma ba a
   cire shi ta hanyar splice ba. Ana iyakance aikin da `modalityBridgeAudioMaxClips`;
   sassan da ke baya ba a taɓa su.
3. Bi `provider/model` da aka saita, ko a bar `selectAudioBridgeModel()` ya bi
   `AUDIO_TRANSCRIPTION_PROVIDERS` bisa tsayayyen tsarin catalog sannan ya zaɓi model na farko
   mai credential na provider mai aiki wanda za a iya amfani da shi.
4. `callAudioTranscription()` yana sauya audio na base64/data-URI zuwa multipart
   `file`, ko ya sauke `audio_url` na nesa ta hanyar katangar outbound ta jama'a-kawai
   tare da DNS pinning da iyakar 25 MB. Sannan yana POST ɗin file da model da aka zaɓa
   zuwa `/v1/audio/transcriptions` self-loop na gida, tare da tabbatar da sahihanci ta
   `resolveSelfLoopBearer()`. Route na transcription da ake da shi yana gudanar da binciken
   credential na yau da kullum, sarrafa cooldown/rate-limit, da aika aikin ga provider.
5. Kiran da ya yi nasara yana maye gurbin sassansa da `[Audio N]: <transcript>`. Ana
   gudanar da kira da `Promise.allSettled`: gazawar guda tana adana ainihin
   sashen audio ɗin (#4012 contract). Idan duk kira sun gaza kuma an tabbatar target ɗin
   yana da `supportsAudio === false`, sassan za su zama
   `[Audio N]: (babu shi — babu STT provider da aka haɗa)` (#8430 contract). Ga
   target da ba a san shi ba (`null`), sakamakon gazawar duka ba ya sauyawa. Target
   da aka tabbatar na rubutu-kawai kuma ba shi da STT credential mai amfani yana samun wannan bayyanannen
   stub ba tare da yin kiran network ba.

Transcripts da suka yi nasara suna amfani da cache na LRU/TTL na Modality Bridge na gaba ɗaya a process.
Key ɗin ya haɗa reference na audio, tsayayyen label na aikin `audio-transcription`,
da STT model da aka zaɓa; ba a taɓa adana gazawa a cache. Ƙoƙarin Audio yana sabunta
ƙididdigar `bridged`, `cacheHits`, `failures`, da `lastUsedAt` da ake rabawa.
Responses da aka sauya suna ɗauke da
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; requests
da ba a taɓa ba ba sa samun segment na Audio Bridge.

Ana adana saitunan lokacin aiki a DB kuma ana tabbatar da su da Zod:

| Key                           | Default | Iyaka          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ko STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Har yanzu ana sarrafa cache da ake rabawa ta `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, da `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Yana tsoma baki a sassan bidiyo na matakin sama a cikin `messages` na Chat Completions da
`input` na Responses API kafin a kira wani abin nufi da ba a san yana da goyon bayan bidiyo na asali ba.
Siffofin da ake goyon baya su ne `input_video`, `video_url`, `video_source`, URLs na HTTPS,
da URIs na bayanai irin `data:video/*;base64,...`. Ba a ɗaukar sunayen fayil kawai da ke cikin rubutu
a matsayin bidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ne ke kula da bin diddigin buƙatar, binciken
iyawa/manufa, tattarawa na kowace buƙata, da payload ɗin amsa.
Ayyukan kowane bidiyo — samowa, cache na cikakken sakamako, bayyana jerin frames
(wanda ke haɗa rubutaccen sautin da mai kira ya bayyana), da metrics/sokewa/tsaftacewa
na kowane yunƙuri — an ɓoye su a bayan `processVideoPart` cikin
`videoBridgePipeline.ts`, wanda ake kira sau ɗaya ga kowane ɓangaren bidiyo a cikin loop na `preCall`.
Wannan module ɗin kuma yana bayyana iyakokin ports kai tsaye, wato `VideoMediaBrokerPort`
(samun bytes da fitar da frames da aka zaɓa a matsayin samfuri), `VideoAudioTranscriptionPort`
(haɗa rubutaccen sautin da mai kira ya bayyana da captions na frames da aka zaɓa),
da `VideoDrilldownPort` (iyakar adana bayanan zurfafa binciken frame; har yanzu ba a haɗa ta
da `processVideoPart` ba — hanyar `/api/modality-bridge/video/drilldown` dabam kaɗai
ce ke rubuta bayanan zurfafa bincike a halin yanzu).

Hanyar buƙatar `/v1` ta jama'a ba ta taɓa import ko kiran subprocess.
Ana sauke bidiyoyin nesa ƙarƙashin iyakar 50 MiB; bidiyoyin base64 na inline suna da
iyakar 36 MiB da aka decode ga kowane bidiyo domin ambulaf ɗin model/messages/framing
ya ci gaba da kasancewa cikin iyakar karɓar buƙatar JSON ta jama'a ta 50 MiB. Ana bincika
tsawon inline da ƙididdigar girman da aka decode kafin allocation. Ana buƙatar HTTPS
a URL na farko na nesa da kowane redirect, ta amfani da kariyar fita ta jama'a-kawai
da ake da ita tare da DNS pinning. Daga nan bytes ɗin suna ƙetare ainihin iyakar broker ta ciki
ta `POST /api/modality-bridge/video/extract`. Wannan route ɗin yana da duka
`LOCAL_ONLY` da `SPAWN_CAPABLE`, yana karɓar buƙata ne kawai daga trusted-loopback
mai ingantaccen tabbaci na kowane process, kuma ba ya taɓa karɓar URL, hanyar filesystem,
executable, ko jerin arguments. Pipeline na iyakar girman body na API da incremental body
reader na handler suna tilasta iyakar shigarwar broker ta 50 MiB dabam-dabam. Queue ɗinsa
mai iyaka yana gudanar da extraction ɗaya a lokaci guda, yana ba da damar jobs huɗu masu jira,
kuma yana iyakance shigarwar da ke jira zuwa 100 MiB.

A cikin broker, `ffprobe` yana karanta fayil na gida mai zaman kansa; ƙayyadadden allowlist
na formats yana cire formats na playlist da manifest. Ga containers na dangin MOV da aka yarda,
external MOV data references suna ci gaba da kasancewa a kashe ta tsohuwa, kuma ƙayyadadden
command ɗin ba ya kunna su. Dukansu `ffprobe` da `ffmpeg` suna amfani da whitelist na protocol
na `file`-kawai, thread ɗaya, ƙayyadaddun arrays na arguments, babu shell,
kuma executables da aka nemo daga `PATH`. Streams na hoton murfi da aka haɗe ba 'yan takarar
da za a kunna ba ne. Dukkan streams da za a iya kunnawa dole ne su cika iyakokin, kuma ana fifita
explicit default stream kafin deterministic fallback mai mafi ƙarancin index.
An iyakance bidiyoyi zuwa daƙiƙa 600, pixels 8,192 ga kowane dimension, da
source pixels 33,554,432. FFmpeg yana ɗaukar frames na JPEG 1–16 a tsakatsaki,
yana rage ma'aunin dogon gefen zuwa pixels 1,024 a kalla ba tare da ƙara girman ƙananan
inputs ba, kuma ba ya taɓa karɓar URL. Sampling ɗin `uniform` ne ta tsohuwa.
Manufofin `scene_aware` na zaɓi da `segment_aware` na gwaji suna yin ƙarin
ƙayyadadden zagayen FFmpeg guda ɗaya a kan local stream da aka riga aka tabbatar,
suna zaɓar ƙayyadaddun timestamps na scene na `showinfo`, sannan su koma ta hanyar
deterministic zuwa uniform midpoints iri ɗaya idan detector ya gaza, ya wuce lokaci,
ya samar da malformed output, ko candidate set ya zama fanko. Yanayin segment-aware
yana rarraba midpoint samples gwargwadon validated scene intervals; an yi cikakken bayani
game da hujjojin segment-aware da fallback behavior a ƙasa. Ana amfani da tsayayyen
iyakar frames 16 bayan zaɓi a kowace manufa. Idan buƙatar scene-aware tana da kasafin
frame ɗaya kawai, tana amfani da uniform midpoint na cikakken bidiyon da ke aiki ko focus
window, sannan ta bayar da rahoton `policyEffective: uniform`: frame ɗin scene guda ɗaya
da aka zaɓa ba zai iya kiyaye duka ƙarshen lokaci biyun ba. Mai kira na iya bayar da
finite focus window (`start`/`end` seconds) a zaɓe; ana matse bounds zuwa tsawon media,
ana ƙin windows da aka juya ko waɗanda ba finite ba, kuma duk manufofin sampling
ana aiwatar da su ne kawai a cikin normalized interval. Ana haɗa window ɗin da aka samu
a cikin sampling metadata da untrusted description prefix domin downstream models
su iya bambance wani ɓangare da aka mayar da hankali a kansa daga cikakken timeline.

Mayar da hankali na semantic caption wani saitin dabam ne kuma kai tsaye. Yanayin analysis
na tsohuwa `full` yana kiyaye frame prompt da ake da shi kuma ba ya taɓa tura rubutun buƙata
zuwa caption model. A yanayin `focused`, bridge yana karanta latest non-empty
`text`/`input_text` da mai amfani ya rubuta ne kawai daga container ɗin Chat ko Responses
ɗaya, yana normalize shi zuwa NFC, yana haɗa control characters da whitespace,
kuma yana iyakance shi zuwa Unicode code points 500. Sakamako marar komai yana komawa
ga ainihin prompt na `full`. Ana serialize usable hint a matsayin JSON cikin keɓantaccen
untrusted-user-context block kuma yana iya fifita bayanan da za a iya gani kawai;
ba zai iya soke gargaɗin daban na kada a bi umarnin da ake gani ko ji a cikin media ba.
Textual focus ba ya taɓa infer `start`/`end` ko canza temporal sampler.

#### FU-07 hujjar structural segment

`segment_aware` yana amfani da bounded pre-analysis pass guda ɗaya a kan local video
stream da aka riga aka tabbatar. Ƙayyadadden filter chain da farko yana rage ma'auni zuwa
faɗin pixels 320 a kalla, yana gano sauye-sauyen scene da frozen intervals, sannan yana
ɗaukar frame 1 a kowace daƙiƙa domin blur, average luma, da spatial/temporal information.
An iyakance pass ɗin zuwa structural samples 600, thread guda ɗaya na FFmpeg/filter,
protocol na `file`-kawai da container allowlists iri ɗaya, iyakar process-output ta 1 MiB,
da daƙiƙa 30 a kalla a cikin shared abort/deadline na broker. Ba ya taɓa karɓar command,
filter, path, ko URL daga buƙatar.

Ƙimomin tsarin hujjojin samfurin ɗauka ne masu tabbataccen sakamako, ba fahimtar ma’anar bidiyo
ba. Ba sa gano batutuwa, ayyuka, rubutun bayani, magana, ko manufar mai amfani.
Iyakokin yanayi da daskarewa suna samar da sassa; yawan daskarewa, dusashewa,
haske, bayanan sarari, da sauyin lokaci suna tasiri ne kawai ga yadda ake rarraba
kasafin firam 1–16 da yake akwai. Ana iyakance sashe da ya daskare gaba ɗaya zuwa firam ɗaya,
yayin da sassan da ba su daskare ba suke fafatawa don sauran kasafin. Idan iyakoki
sun fi firam yawa, ana ci gaba da ɗaukar samfurori daidai a duk tsawon lokaci domin yankewa da sauri a farko
kada su ɓoye dogon sashe na ƙarshe. Ana haɗa iyakokin yanayi da ke cikin ƙudurin nazari na daƙiƙa 1
daga iyakar daskarewa.

Rashin matatu, hujja marar tsari ko fanko, kuskuren mai ganowa, ko ƙarewar lokacin
farkon nazari mai iyaka suna komawa kai tsaye zuwa ainihin manufar tsakiyar lokaci mai daidaito.
Sokewar mai kira ko wa’adin dillali ba sa yin wannan komawar: suna dakatar da ƙaramin aikin
da ke gudana, suna hana cire firam daga baya, sannan a cire bishiyar wucin gadi ta sirri
a cikin `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` yana samar da kayan gwajin FFmpeg na gaske
masu tabbataccen sakamako don auna rage kiran rubutun bayani bayan cire maimaituwa, rabon kasafi ga
motsi mai yawa, hujjar dusashewa/haske/SI-TI, yankewa da sauri tare da dogon ƙarshen bidiyo, da
kuskuren gano dusashewar hankali a matsayin abin da ake nema. Yana rubuta lokacin bango na farkon nazari kuma, inda `/usr/bin/time`
yake samuwa, yana rubuta CPU na ƙaramin aiki da mafi girman RSS. Gwaje-gwajen ingancinsa
alamomin tabbatar da tsari ne kawai. Ingancin samfurin rubutun bayani na gaske yana nan a `HOLD` saboda wannan tsarin gwaji ba shi da
wurin ƙarshe mai izini ko mai hukunci da aka tsayar. Tanadin kuɗi ma yana nan a `HOLD`
sai dai idan `--caption-cost-per-call-usd` ya bayar da bayyanannen ƙiyasin kuɗin kowane kira
mai kyau; rubutun ba ya ƙirƙirar ko wane sakamako na bogi.

Kowane firam yana da iyakar 4 MiB, duk ɗanyen firam tare suna da iyakar 23 MiB, sannan
amsar dillali da aka jera tana da iyakar 32 MiB. Ana cire kundin adireshi na wucin gadi mai zaman kansa
a cikin `finally`. OmniRoute ba ya kunshe da FFmpeg kuma ba ya karɓar hanyar fayil ta musamman
zuwa fayil mai aiwatarwa. Kafin samar da rubutun bayani, gadar tana amfani da matakin cire maimaituwar gani
mai taka-tsantsan: ana rage kowane JPEG zuwa ma’ajiyar bayanai ta matakan toka ta 16×16 sannan a
kwatanta shi kawai da firam na ƙarshe da aka riƙe. Idan kasafin rubutun bayani da aka nema
ya fi firam ɗaya, cirewar tana samar da
tarin zaɓuɓɓuka mai iyaka wanda bai wuce ninkin kasafin ba, kuma bai taɓa wuce firam 16 ba.
Ana amfani da iyakar da aka nema ne kawai bayan cire maimaituwa, tare da kiyaye zaɓaɓɓun firam
na farko da na ƙarshe yayin ragewa ta ƙarshe idan kasafin ya kai aƙalla
biyu. Manufar mai siga
`grayscale-16x16-mean-cells-v2` tana amfani da mafi girma tsakanin matsakaicin bambancin luma da
rabon ƙwayoyin ƙaramin hoto waɗanda bambancinsu da aka daidaita ya kai aƙalla 0.05. Iyakar
ganin maimaituwa ita ce tsayayyar ƙima 0.04, wadda aka zaɓa domin sauƙin hasashen hali maimakon
bayyana ta a matsayin saitin lokacin aiki. Wannan sigina na biyu
mai babban bambancin haske yana kiyaye ƙananan motsi da sauye-sauyen rubutu da ake iya gani waɗanda
kwatantawa bisa matsakaici kawai za ta iya ɓoyewa. Kuskuren mai kwatantawa ko mai sauya tsari yana barin aikin ya ci gaba tare da
riƙe ɗaukar dukkan zangon. Bayanan fitarwa suna ware zaɓuɓɓukan da aka cire, firam ɗin da aka yi amfani da su
cikin nasara, da maimaituwar gani da aka yar.

Sashen bidiyo da aka yi masa alama a bayyane yana iya neman takardar hotuna mai tambarin lokaci. Gadar
tana gina ragar JPEG mai ginshiƙai 4 da firam 16 a mafi yawa. Kowace ƙwaya mai girman pixel 512 tana saka
tambarin lokacin tushenta a cikin faifan ƙasa mai babban bambancin haske, yayin da waɗannan tamburan lokaci
suke ci gaba da kasancewa a cikin bayanan rubutu domin haɗawa da binciken bin diddigi daga baya. Cikakken
JPEG yana nan da iyakar 32 MiB. Idan `sharp` ba zai iya sauya ko haɗa ragar ba,
gadar tana komawa ga firam-firam JPEG ɗaya-ɗaya; sokewar abokin hulɗa har yanzu tana yaɗuwa
ta cikin aikin takardar.

An ware hujjar ɗaukaka da gangan daga ƙaramin gwajin aikin haɗawa
na roba. `scripts/perf/video-bridge-contact-sheet-eval.ts` yana ayyana tsarin gwajin A/B
mai sigar tsari don samfuran gani na gaske masu dacewa da OpenAI. Yana auna
tokens da mai samarwa ya bayar da rahoto, jinkirin bango daga farko zuwa ƙarshe (ciki har da haɗa takardar),
adadin kiran samfuri, da riƙe hujjojin da manifest ya ayyana. Ba a rubuta ɗanyen martanin samfuri
a cikin rahoton; ana riƙe taƙaitattun SHA-256 da ID na hujjojin da suka dace kawai. Tsarin
gwajin ba ya yin kiran hanyar sadarwa ko samfurin biya sai an bayar da `--execute-real` kuma an saita
`--model`, `OMNIROUTE_BASE_URL`, da `OMNIROUTE_API_KEY`. Idan babu
wannan bayyanannen gwajin gaske, hukuncinsa da na’ura za ta iya karantawa yana nan `HOLD`; ma’aunin
kayan bayanai na roba ko adadin kira kaɗai ba hujjar ɗaukaka ba ne.

Masu kira za su iya haɗa jerin `transcript.cues` na zaɓi zuwa sashen bidiyo mai tallafi
idan sun riga suna da rubutu da aka daidaita da lokaci. Kowane cue dole ne ya ƙunshi `text`, tazarar
`start`/`end` mai iyakantacciyar ƙima a cikin tsawon lokacin da aka bincika, da `source` da ke jerin izini
(`client`, `embedded`, ko `audio-bridge`); `confidence` yana amfani da `1` ta asali
kuma dole ne ya kasance tsakanin `0` da `1`. Ana haɗa cues masu cikakken maimaituwa.
OmniRoute ba ya taɓa fara kwafe magana daga waɗannan bayanan: ana kwafe cues da aka tabbatar
zuwa sakamakon da aka bayyana tare da tushe, amincewa, da tazarar lokaci, sannan
a nuna su a matsayin bayanan lura marasa aminci tare da rubutun bayanin firam. Ana ƙin rubutu marar inganci,
wanda ya fita daga iyaka, ko wanda ba shi da bayanin asalinsa maimakon haɗa shi cikin
rafiin rubutun bayani. A halin yanzu mai kira ne ke ayyana filin `source`, ba
uwar garken ba ce ke tabbatar da shi: OmniRoute yana tilasta ƙimar ta kasance ɗaya daga cikin
jerin haruffa uku da aka yarda da su, amma har yanzu ba ya tabbatarwa ta hanyar tsare-tsaren ɓoyewa cewa alamar
`embedded` ko `audio-bridge` ta fito da gaske daga cirewar da uwar garken
ke mallaka. Ɗauki `source` a matsayin alamar da ba a amince da ita ba har sai an samar da wannan tabbatarwar;
kada a gina shawarar izini a kansa.

Mai kira na ci-gaba zai iya samar da waƙar `audioTranscript` da aka riga aka ba wa izini
don bidiyon ɗaya. Haɗin fusion yana gudanar da lura na gani da na sauti a ƙarƙashin
wa’adin ƙarshe da siginar dakatarwa guda ɗaya, yana jera su a kan tsarin lokaci na bai ɗaya,
yana haɗe kwafi masu kama da juna gaba ɗaya, sannan yana bayar da sakamako na ɓangare idan
gefe ɗaya kaɗai ya yi nasara. `audioTranscript` mara inganci yana sauya zuwa wannan
sakamakon na ɓangare — ana riƙe bayanin gani kuma reshen sauti yana rubuta lambar gazawa
da aka tsaftace — maimakon a gaza bidiyon gaba ɗaya. Samuwar kowane reshe, tutar sakamako
na ɓangare, da lambobin gazawa da aka tsaftace ana adana su a cikin sakamakon da aka bayyana,
a cikin metadata na guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), a cikin metadata na ma’ajiyar sakamako, da kuma a cikin
ƙididdigogin fusion na bridge. Tsohuwar hanyar Video Bridge ba ta kiran speech-to-text
ko sauke kwafin kafofin watsa labarai na biyu; idan babu wannan waƙar da aka bayar a sarari,
tana ci gaba da aiki da bidiyo kaɗai.

**Riƙe transcript (#12150 P1).** Wannan yana aiki ta atomatik duk lokacin da
Video Bridge (wanda shi kansa sai an zaɓi amfani da shi) ya samar da alamar transcript —
babu wata tutar riƙewa ta daban. Lokacin da buƙata ta samar da kowace alamar transcript
(`transcript` da mai kira ya ayyana ko `audioTranscript` da aka haɗa), guardrail yana yi
mata alamar `videoBridgeObserved` kuma yana samar da kwafin inuwa da aka ɓoye bayanai
na bayanin bidiyon — samarwa iri ɗaya inda ake maye gurbin jikin rubutun ’yanci na kowace
alama da `[redacted-video-transcript]`, wanda aka gina ta maye gurbin filin alama mai tsari
kafin a haɗa kirtanin rubutu (ba a taɓa yin hakan ta hanyar warware rubutun da aka shimfiɗa
ba, don haka babu wani abun cikin alama — ko na ƙeta ko na yau da kullum, ciki har da jikin
da ke ɗauke da `]` kamar `[inaudible]`/`[music]` — da zai iya tsira). Jikin buƙatar da aka
adana a log na kira yana musanya kowane ɓangaren rubutu da aka samo daga bidiyo da wannan
inuwar da aka ɓoye bayanai, ta hanyar daidaiton abun ciki; ana sake karanta anka na
`fullText` daga cikakken payload na guardrail kafin kira, don haka daidaitawar tana ci gaba
da yin nasara bayan guardrails na gaba a sarkar (masu ɓoye PII da bayanan shaidar shiga,
masu fifiko 10/95) sun sake rubuta bayanin a wurinsa, da kuma bayan shigar da
system-prompt/handoff/memory ta sake fasalta jerin saƙonni. Jikin da ake aika wa model
bai canza ba. Buƙatar da aka lura da ita kuma ba ta cika wani Memory mai ɗorewa
(ana tsallake fitar da bayanai daga buƙata da kuma daga amsa), don haka amsar model ɗin
kanta ba za ta iya maimaita rubutun transcript cikin Memory ba.

Har yanzu akwai wuraren riƙewa da suke buɗe, waɗanda ake bin diddiginsu don aikin gaba
(**P2**, #12430): ɗanyen hoton buƙatar abokin ciniki kafin guardrail a cikin artifact
na cikakken log; ci-gaban `previous_response_id` mai fail-closed; aikawa na cikin gida
na derived-prompt waɗanda ke saka transcript a cikin string prompt da aka ƙirƙira
(matakan pipeline, context-handoff); da jikin amsa / kwafin semantic-cache na amsar
model da ta nakalto transcript. Waɗannan wurare ne na ajin raw/response ko waɗanda sai
an zaɓi amfani da su, kuma suna wajen iyakar P1 ta jikin buƙata da aka adana + Memory.

Tsarin rayuwar `/api/modality-bridge/video/drilldown` na ciki wani substrate na cache
ne daban, wanda aka tabbatar da shi ta loopback/token. Kowace aiki kuma tana buƙatar
canonical opaque principal ID. Kafin a kunna mai kira na production, dole ne ya samo
wannan ID daga tenant da aka tabbatar da shi kuma kada ya taɓa tura ƙimar da abokin
ciniki ya zaɓa. Maɓallan cache suna ɗaure wannan principal da canonical session da
video-reference IDs, suna adana maɓallansu da aka samo daga SHA-256 kaɗai, sannan suna
ƙayyade karatu da gogewa ga principal ɗin ɗaya. Cache yana adana aƙalla firamomin JPEG
16 da aka samo a kowace entry, yana sa su ƙare bayan mintuna goma, kuma yana tallafa wa
karatu mai iyaka na `start`/`end` ko gogewar session a sarari.

Kowane principal yana da iyaka ta entries 16 da MiB 64 na canonical JPEG data.
Waɗannan iyakoki sun bambanta da rufin duniya na entries 64/MiB 256: matsin quota na
principal yana fitar da entries na principal ɗin nan kaɗai waɗanda aka daɗe ba a yi amfani
da su ba kafin a yi la’akari da fitarwar global LRU. Ana share entries da wa’adinsu ya
ƙare daga lissafin principal da na duniya a lokacin aikin cache, yayin da sokewa da gazawar
tantancewa ba sa tabbatar da maye gurbin na ɓangare.

Cache yana ƙin Base64 da ba canonical ba, padding mai yawa, media da ba JPEG ba, JPEGs
marasa tsari ko waɗanda aka yanke, da JPEGs da ke haifar da gargadi yayin bounded
full-image `sharp` decode. Yana sake encode kowane hoto da aka karɓa a matsayin canonical
JPEG, yana samo faɗi da tsawo daga bytes da aka decode maimakon amincewa da filayen mai kira,
kuma yana watsar da duk trailing polyglot bytes maimakon riƙe su. Bounded canonical
compressed buffer kaɗai ake cajewa ga quotas biyu. Iyakar JSON wire ta haɗa da ƙarin nauyin
Base64 don rufin decoded-input na MiB 32. Kowace
derivation da aka adana tana rubuta ingantaccen format/resolution na JPEG, sampling policy,
derivation version, lokacin ƙirƙira, content hash da uwar garken ya lissafta, da hashed parent
reference tare da parent-content hash na amintaccen mai kira. Ana duba sokewa
tsakanin matakan asynchronous decode/hash kafin atomic cache commit.

Wannan tranche bai haɗa production producer da route ba tukuna kuma ba ya
samar da zaɓin multi-resolution variant. Saboda haka hanyar buƙatar Video Bridge
mai gaskiya ba ta jawo ƙarin aiki, yayin da tenant-bound principal derivation da
cikakken tsarin rayuwar FU-08 multi-resolution suke ci gaba da zama ayyukan da aka
bayyana sarai na gaba maimakon a rubuta su a matsayin halayen da aka kammala.

Ana yi wa firam taken bayani ɗaya bayan ɗaya ta amfani da samfurin Video da aka saita. Idan
saitin maye gurbin Video babu komai, yana gado saitin Vision; idan dukansu babu komai, na'urar
zaɓin hanya ta atomatik ta Vision ce ke zaɓar samfurin da ke da damar sarrafa gani. Taken bayanin
da ya yi nasara yana maye gurbin ɓangaren asali da tsayayyen prefix na `[Video description:` wanda kuma
ke nuna rubutun a matsayin abin lura marar aminci da aka samo daga kafofin watsa labarai, tare da gaya wa samfuran
da ke gaba kada su bi umarnin da aka samu a cikin kafofin. Maɓallan cache na taken firam
sun haɗa da bytes na JPEG, prompt, timestamp, da samfurin da aka yi amfani da shi; taken bayanin
da ya yi nasara kaɗai ake adanawa a cache. Shigarwar cache suna riƙe ainihin samfurin samarwa da ya yi nasara,
har da samfurin fallback; bridge yana bayar da rahoton `mixed` idan samfura daban-daban
ne suka samar da firam daban-daban. Samun dacewa daga cache yana sake amfani da ainihin mai samarwar
maimakon sake masa lakabi da tsarin zaɓin hanyar da aka nema. Ana ƙirƙirar maɓallin cache na sakamakon
dukkan bidiyon daga kowane shigarwa da ke sauya sakamakon — prompt, samfurin da aka yi amfani da shi,
manufar ɗaukar samfur, adadin firam, yanayin nazarin ma'ana, fingerprint na SHA-256
na focus hint da aka daidaita, focus window, `transcript`,
`audioTranscript`, da tutar contact-sheet — saboda haka sauya kowane ɗaya daga cikin waɗannan
ma'aunai yana haifar da rashin dacewar cache, ba sake amfani da tsohon sakamako ba. Sigar manufar
cire maimaitawar gani, threshold, da iyakantaccen adadin firam ɗin da za a iya zaɓa su ma an bayyana su sarai a cikin
maɓallin cache na sakamako da metadata; saboda haka sauyin manufa ba zai iya sake amfani da tsohon
bayanin dukkan bidiyo ba. Metadata na cache na sakamako v4 yana riƙe yanayin da
fingerprint, amma ba ya riƙe ainihin aikin mai amfani. Metadata na guardrail yana bayar da rahoton yanayin
nazari da aka nema da wanda aka yi amfani da shi; yanayin `focused` da aka nema ba tare da
rubutun mai amfani da za a iya amfani da shi ba, ana bayar da rahotonsa a matsayin `full` a aikace.

Guardrail yana fitar da kowane ɓangaren bidiyo da ake tallafawa amma ba ya bayyana fiye da
`modalityBridgeVideoMaxVideos`. Ga target da aka tabbatar yana da
`supportsVideo === false`, bidiyoyin da suka gaza da waɗanda suka wuce iyaka suna zama alamomin
rubutu masu aminci kuma bayyanannu, domin kada wani ɗanyen bidiyo ya tsira. Idan ba a san damar ba, waɗannan ɓangarorin
suna nan ba tare da an taɓa su ba. Targets masu `supportsVideo === true` suna ƙetare bridge.
Siginar katse buƙatar client tana wucewa ta cikin saukewa, jerin broker,
subprocesses, da kiran taken bayani; katsewa yana dakatarwa tsakanin bidiyoyi kuma ba ya taɓa buɗe hanya
zuwa ɗanyen media idan an gaza.

Ana adana saitunan runtime a DB kuma ana tabbatar da su da Zod:

| Maɓalli                             | Tsoho       | Iyaka / ɗabi'a                                                                                                             |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime na zaɓi, sai an kunna da gangan                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` yana kiyaye taken bayani na gama-gari; `focused` yana amfani da iyakantaccen sabon mahallin mai amfani marar aminci |
| `modalityBridgeVideoModel`          | `""`        | Ya gaji samfurin Vision Bridge                                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                       |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ko `segment_aware` mai daidaiton gwargwado; gazawar detector tana komawa `uniform`               |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                        |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                             |

Tsofaffin ƙimomin timeout na Video da aka adana waɗanda suka wuce daƙiƙa 120 ana rage su zuwa
wa'adin broker; sabbin rubuce-rubucen saiti da suka wuce wannan iyaka ana ƙin karɓarsu.
`GET /api/modality-bridge/video/runtime` yana buƙatar amintaccen locality na loopback da aka yi wa hatimi
kafin tantancewa ko binciken runtime, sannan yana buƙatar izinin gudanarwa.
Yana mayar da `available` kawai, sigogin FFmpeg/ffprobe da aka tsabtace, da tabbataccen
dalili idan runtime babu shi. Endpoint na ciki don extraction ba
API na upload na jama'a ba ne: cikewar jerin aiki tana mayar da `503` tare da `Retry-After`, katsewar
haɗin mai kira tana mayar da `499`, sannan tabbataccen wa'adin broker yana mayar da `504`. Amsoshin da aka sauya suna ƙara
`video->text;model=<visionModel>;parts=<videos>` zuwa tsakiyar header na
`x-omniroute-modality-bridge` ba tare da cire sassan Vision ko Audio ba.

### Mai Rufe PII (`piiMasker.ts`)

Yana aiki a matakai **biyu**.

- **`preCall`** yana clone na payload, yana bi ta `system`, `messages`, `input`, da
  `prompt` (har da abubuwan da suke plain string), sannan yana amfani da `processPII()` (daga
  `@/shared/utils/inputSanitizer`) a kan filayen string na `content`/`text`. Lokacin da
  `PII_REDACTION_ENABLED=true`, ana ɓoye PII da aka gano a cikin payload
  mai fita. Wannan ba ya dogara da `INPUT_SANITIZER_MODE` (wanda ke sarrafa
  manufar prompt-injection kawai). Lokacin da redaction a kashe yake, kiran yana rubuta adadin
  abubuwan da aka gano ba tare da sake rubuta content ba.
- **`postCall`** yana yin deep-clone na amsar, yana gudanar da `sanitizePIIResponse()` tare da
  masker na tsarin Responses-API (`maskResponsesOutput` — yana rufe
  `output_text` da `output[].content[].text`). Idan wani redaction ya faru,
  amsar da aka gyara tana maye gurbin ta asali.

Guardrail ba ya taɓa toshewa; yana yin annotation (`meta.detections`,
`meta.redacted`) ko sake rubutawa kawai.

### Shigar da Umarnin Ɓarna (`promptInjection.ts`)

Yana gano tsare-tsaren cutarwa a cikin content da mai amfani ya bayar kuma yana tilasta
manufar da aka saita. Ana sarrafa ɗabi'ar ta hanyar environment variables da zaɓuɓɓukan constructor:

| Saiti          | Env var                                                                                               | Tsoho  | Tasiri                                                                                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An kunna       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Idan `false`, guardrail ɗin zai tsallake aikin kai tsaye.                                                                                                                                                |
| Yanayi         | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Manufar injection: `block`, `warn`, ko `log`. (Ana karɓar `redact` don dacewa da tsoffin sigogi amma **ba ya** cire rubutun injection; `PII_REDACTION_ENABLED` ne ke sarrafa sake rubuta PII na buƙata.) |
| Iyakar toshewa | Zaɓin `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (laƙabi `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Mafi ƙarancin matakin tsanani da ake buƙata don toshewa. Matsakaici na lura kawai ne a saitin tsoho.                                                                                                     |

**Fifikon yanayi** (`getMode`): `options.mode` na mai kira →
`INJECTION_GUARD_MODE` **saitin feature-flag na DB mai rinjaye** (Dashboard → Settings →
Feature Flags) → env na `INJECTION_GUARD_MODE` → env na `INPUT_SANITIZER_MODE` →
`warn`. Saboda haka, saitin rinjaye na dashboard yana fin env vars, don haka UI na Feature
Flags yana sarrafa guard ɗin da ke gudana kai tsaye (ba tare da sake farawa ba). Karatun DB
yana aiki cikin aminci idan an samu matsala: idan ya yi kuskure, guard ɗin zai koma ga
halayen da suka dogara da env, kuma idan ba a saita wani saitin rinjaye ba, halayen za su
zama iri ɗaya da warwarewa ta env kawai.

Tushen ganowa:

1. `sanitizeRequest()` daga `@/shared/utils/inputSanitizer` (tarin detector na gama-gari
   da ake amfani da shi a wasu wurare cikin pipeline).
2. `DEFAULT_GUARD_PATTERNS` da aka gina a ciki (a halin yanzu `system_override_inline` da
   `markdown_system_block`, duka suna da tsananin `high`).
3. `customPatterns` na zaɓi da aka aika ta zaɓuɓɓukan constructor (strings, regex,
   ko bayanan `{ name, pattern, severity }`).

Lokacin da `mode === "block"` **kuma** aƙalla ganowa ɗaya ya kai iyakar
tsanani, `preCall` yana mayar da `{ block: true, message: "Request rejected:
suspicious content detected" }`. A yanayin `warn`/`log`, guardrail ɗin yana yin log amma
yana barin kiran ya gudana. Haka kuma, ana export na helper na gama-gari
`evaluatePromptInjection()` don masu kira da ke buƙatar kimanta prompts ba tare da bi ta
registry ba.

**Iyakar bincike (v3.8.20):** detector ɗin yana bincika **16 KB na farko** kawai na
rubutun prompt da aka haɗa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) a cikin
`src/shared/utils/inputSanitizer.ts`. Duka `detectInjection()` da
`evaluatePromptInjection()` suna yin `slice(0, MAX_INJECTION_SCAN_BYTES)` kafin gudanar da
madaukin pattern. Umarnin injection suna kasancewa kusa da saman input, don haka wannan
yana iyakance CPU/GC na regex a kan payloads masu girman KB ɗaruruwa ba tare da raunana
ganowa ba (duba #3932, #4041).

### Mai Ɓoye Bayanan Shaida (`credentialMasker.ts`)

Yana aiki a **dukkan** matakai biyu, kuma shi ne na ƙarshe a jerin tsoho (fifiko `95`).
Yana ɓoye sanannun patterns na API-key / secret-token daga payload mai fita (abin da ke
cikin saƙo, arguments na tool-call, sakamakon tools) **da kuma** martanin provider, ta
yadda bayanan shaida da aka liƙa cikin prompt (ko sakamakon tool ya maimaita) ba za su
zube zuwa upstream provider ko komawa ga client ba.

- **Sai an zaɓa a kunna**, daidai da tsarin ɓoye PII (kusa da Hard Rule #20):
  a kashe yake sai dai idan `settings.credentialRedactionEnabled === true` **ko**
  `CREDENTIAL_REDACTION_ENABLED=true`. Idan yana kashe, guardrail ɗin ba ya yin komai —
  ba ya taɓa toshewa kuma ba ya taɓa sake rubutawa.
- `redactCredentials()` yana bi ta cikakken tsarin payload/response (`walkValue()`,
  mai aminci daga prototype-pollution, mai aminci daga cycle ta amfani da `WeakSet`) kuma
  yana maye gurbin matches da placeholder na `[REDACTED:<type>]`, yana cloning rassan da
  suka canza kawai.
- `CREDENTIAL_PATTERNS` ya ƙunshi keys na LLM providers (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens na VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), keys na biyan kuɗi (Stripe, Square), keys na
  cloud (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  connection strings masu ɗauke da bayanan shaida (`mongodb://user:pass@...`, da sauransu), da
  generic pattern na ƙimar header na `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ana ɓoye keys masu siffar header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) ta tsarin su (ƙimar kawai, ana barin scheme prefix kamar
  `Bearer `/`Basic `) maimakon amfani da generic text regex.
- Guardrail ɗin ba ya taɓa toshewa; yana sake rubutawa kawai (`modifiedPayload` /
  `modifiedResponse`) kuma yana ƙara bayanin alama (`meta.credentialsRedacted`, `meta.count`).

Kariyar regression: `tests/unit/credential-masker-guardrail.test.ts`.

## Asalin Kwangila (`base.ts`)

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
  block?: boolean; // true yana katse sauran jerin nan take
  message?: string; // ana bayyana shi lokacin da aka toshe
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall ne ke mayar da shi don sake tsara buƙatar
  modifiedResponse?: TValue; // postCall ne ke mayar da shi don sake tsara amsar
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

Guardrail yana nuna cewa "babu canji" ta hanyar mayar da ko dai `void`, `{}`, ko
`{ block: false }`. Mayar da `modifiedPayload`/`modifiedResponse` yana maye gurbin
ƙimar da ke gudana cikin jerin ga guardrails na gaba.
`signal?: AbortSignal` yana isar da tsarin rayuwar mai kira zuwa guardrails. Katse buƙata shi ne keɓantaccen yanayin fail-open da aka yi da gangan: hanyoyin haɗa kafofin watsa labarai suna dakatar da aiki tare da tsaftacewa ba tare da dawo da ɗanyen media zuwa target da aka san ba ya goyon bayansa ba.

## Rajista (`registry.ts`)

Singleton `guardrailRegistry` yana samar da:

- `register(guardrail)` — yana ƙara guardrail (ko ya maye gurbinsa bisa normalized name) sannan
  ya sake jera su bisa `priority` daga ƙarami zuwa babba.
- `clear()` / `list()` — kayan aikin gudanarwa.
- `runPreCallHooks(payload, context)` — yana bi ta active guardrails, yana tura
  payload ta cikin `modifiedPayload`, sannan ya tsaya a farkon `block: true`.
- `runPostCallHooks(response, context)` — wannan tsarin ne a ɓangaren response.
- `resetGuardrailsForTests({ registerDefaults })` — yana share state sannan, idan an zaɓa,
  ya sake yin rajistar defaults don tsaftataccen keɓewar gwaji.

Dukkan runners ɗin suna mayar da `{ blocked, payload|response, results, guardrail?, message? }`
inda `results` yake array na records na `GuardrailExecutionResult` waɗanda suka ƙunshi
fields na `blocked`, `skipped`, `modified`, `error`, da `meta` na kowane guardrail,
waɗanda suke da amfani wajen tracing.

### Kashe Guardrails Ga Kowace Buƙata

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` yana tattara
jerin sunayen guardrails da aka cire maimaituwa waɗanda ya kamata a tsallake don
buƙatar da ake aiwatarwa yanzu. Sources (duk optional ne, kuma ana haɗa su gaba ɗaya):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` na request body (top-level)
- `metadata.disabledGuardrails` na request body
- Header `x-omniroute-disabled-guardrails` (ko legacy
  `x-disabled-guardrails`)

Values na iya zama arrays na strings ko string da aka raba da waƙafi; ana
normalizing names zuwa lowercase kebab-case (`pii_masker` → `pii-masker`). Ana
isar da result ta `context.disabledGuardrails` zuwa registry, wanda ke tsallake
guardrails masu matching (`skipped: true` a cikin `results`).

## Tsarin Aiwatarwa

Ga kowace buƙata da ke wucewa ta `src/sse/handlers/chat.ts` da
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` yana gina jerin abubuwan da za a tsallake daga maɓallin API, jikin buƙata,
   da headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` yana gudanar da guardrails bisa tsarin
   fifiko daga mafi ƙanƙanta zuwa mafi girma:
   - Ana rubuta guardrails da aka kashe a matsayin `skipped`.
   - `preCall` na kowane guardrail na iya sake rubuta payload ta hanyar `modifiedPayload`.
   - `block: true` na farko yana dakatar da sarkar nan take, sannan handler ya mayar
     da amsar ƙin amincewa ta guardrail.
3. Payload ɗin da aka yiwuwar sake rubutawa yana shiga combo routing da aikawa zuwa
   upstream.
4. Bayan an haɗa amsar, `guardrailRegistry.runPostCallHooks(...)`
   yana gudanar da wannan sarkar a kan amsar. `block: true` a nan yana watsar da amsar
   upstream.

Guardrails da suka jefa kuskure ana rubuta su da `error: <message>` kuma ana shigar da su cikin log ta
`logger.warn`, amma sarkar tana ci gaba — an tsara ta don ci gaba idan an samu kuskure.

## Tsarawa

Environment variables da ginannun guardrails ke karantawa:

| Variable                              | Wanda ke amfani da shi    | Tasiri                                                                                                     |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Saita `false` don kashe ganowa gaba ɗaya.                                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Manufar injection: `warn`, `block`, ko `log`. Tsohuwar ƙimar `redact` ba ta sake rubuta rubutun injection. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Yanayin injection guard; kuma DB feature flag ne da ke **override** env vars (DB > ENV).                   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Mafi ƙarancin matakin tsanani da `MODE=block` ke ƙi: `high` (tsoho), `medium`, ko `low`.                   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Tsohon alias na `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Idan `true`, ana ɓoye PII na buƙata (ba tare da dogaro da yanayin injection ba).                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Yana sarrafa halayen masker a ɓangaren amsa.                                                               |

Guardrails na Modality Bridge suna karanta runtime config daga ma'ajiyar settings
mai amfani da DB (`getSettings()`), ba daga env vars ba. Maɓallan farko na Vision su ne
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da
`modalityBridgeCacheMaxEntries`. Ana karɓar tsoffin maɓallan
`visionBridge*` ne kawai a matsayin fallback na karantawa na zagaye guda da aka rubuta
a takardu; rubuce-rubucen dashboard suna amfani da maɓallan farko. Defaults da fallback
resolver suna cikin `src/shared/constants/modalityBridgeDefaults.ts`, yayin da aka
riƙe tsoffin constants a `src/shared/constants/visionBridgeDefaults.ts`.

Audio yana amfani da `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, da `modalityBridgeAudioMaxClips`, tare da settings na
`modalityBridgeCache*` da ake rabawa. Audio ba shi da fallback na tsoffin maɓallai saboda an
gabatar da waɗannan maɓallan ne tare da schema na Modality Bridge.

Video yana amfani da `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, da
`modalityBridgeVideoTimeout`, tare da settings na `modalityBridgeCache*` da ake rabawa.
An kashe shi ta tsohuwa saboda FFmpeg/ffprobe optional operational
dependencies ne, kuma sanya caption ga frames yana ƙara latency da kuɗin model.

## Guardrails na Musamman

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

Matakai:

1. Ƙirƙiri `src/lib/guardrails/myGuardrail.ts` wanda ya faɗaɗa `BaseGuardrail`.
2. Aiwatar da `preCall` da/ko `postCall`.
3. Ko dai yi rajista a lokacin import (tura daga `registerDefaultGuardrails`) ko
   kira `guardrailRegistry.register(...)` a lokacin aiki — registry ɗin yana maye gurbin
   duk wani guardrail na baya mai suna da aka daidaita iri ɗaya.
4. Ƙara gwaje-gwaje a ƙarƙashin `tests/unit/` (misalan da ake da su:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Gwaji

Yi amfani da `resetGuardrailsForTests()` tsakanin gwaje-gwaje domin farawa daga sanannen yanayi.
Miƙa `{ registerDefaults: false }` domin farawa da registry mara komai sannan
ka yi rajistar guardrails ɗin da ake gwadawa kawai. Vision Bridge yana karɓar dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge yana samar da
makamantan wuraren haɗawa don saituna, capabilities, zaɓin samfurin STT, binciken
credentials, da transcription. Saboda haka, gwaje-gwaje za su iya gwada duka hanyoyin ba tare da samun damar DB
ko hanyar sadarwa ba.

## Duba Kuma

- `src/lib/guardrails/` — aiwatarwa
- `src/shared/utils/inputSanitizer.ts` — detector ɗin haɗin gwiwa wanda ke tallafa wa
  prompt-injection da ɓoye PII
- `src/shared/constants/visionBridgeDefaults.ts` — tsoffin saitunan Vision Bridge da
  jerin samfuran forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — tsoffin saitunan lokacin aiki na Vision/Audio na haɗin gwiwa
- `docs/architecture/RESILIENCE_GUIDE.md` — keɓantaccen layer (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — cikakken bayani game da env vars

## Kewayon route na injection-guard da red-team (Phase 8 · Block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) yana rufe duk routes
da ke karɓar prompts na masu amfani. Yana bin `INJECTION_GUARD_MODE` (tsoho `warn` = log kawai;
`block` = yana mayar da HTTP 400 `SECURITY_001`).

| Nau'i                     | Routes                                                                                                                                               | Yanayin tsoho |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Rubutu (wanda yake akwai) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Na ƙirƙirawa              | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Bayanai                   | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Ciro rubutu (`extractMessageContents`) yana rufe `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kowane dare, `nightly-llm-security.yml`):** promptfoo yana tabbatar da cewa kowane route yana toshe
OWASP-LLM corpus a cikin `INJECTION_GUARD_MODE=block`; garak yana gudanar da probes (yana tsallakewa idan babu secret).
An haɗa `moderations` domin daidaito — masu gudanarwa a block-mode za su iya ware shi ta hanyar
`resolveDisabledGuardrails`.

Workflow na kowane dare (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch) yana da jobs guda biyu:

- **`promptfoo-guard` (mai toshewa)** — yana gudanar da `promptfoo eval -c promptfooconfig.yaml`
  tare da `INJECTION_GUARD_MODE=block`. Kowane yanayin hari (misali "ignore all
  previous instructions…", jailbreaks irin na DAN) yana tabbatar da cewa response ɗin yana ɗauke da
  `error.code === "SECURITY_001"`, wato guard ɗin ya ƙi request ɗin a zahiri.
- **`garak` (na shawarwari)** — yana gudanar da garak `--probes promptinject,dan,leakreplay`
  a kan local OmniRoute instance (`http://localhost:20128/v1`). An ɗaure shi da
  provider secret (`PROMPTFOO_PROVIDER_KEY`); yana tsallakewa cikin tsari idan babu shi kuma ana saka
  `|| true` a ƙarshensa, don haka yana bayar da rahoto ba tare da sa CI ya gaza ba.

Kewayon guard helper (`createInjectionGuard` / `withInjectionGuard`)
ya mamaye kowane `/v1` route da ke ɗauke da prompt; ana ciro rubutun prompt daga
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ta hanyar
`extractMessageContents()` a cikin `src/shared/utils/inputSanitizer.ts`.
