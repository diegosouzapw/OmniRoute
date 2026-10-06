# Guardrails (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Madogaran gaskiya:** `src/lib/guardrails/`
> **An sabunta ta karshe:** 2026-08-29 — v3.8.51 (Asalin fassarar Video Bridge an bayyana shi ne ta hanyar mai kiran,
> ba a tabbatar da shi ta server ba tukuna — an yi bayani gwargwadon #11661)

Guardrails suna aiwatar da tsaro, dokoki, da sauye-sauyen abun ciki a iyakar
tsakanin OmniRoute da masu ba da sabis na sama (upstream providers). Kowace guardrail na iya bincika (kuma
da zabi ta ki, ta sauya, ko ta sanya bayani a kan) buƙatun kaya (`preCall`) da
martanin sama (`postCall`).

Tsarin **fail-open** ne: idan wani guardrail ya fadi yayin aiwatarwa, tsarin
rajista (registry) yana rubuta kuskuren kuma ya ci gaba da sauran guardrail maimakon ya sa buƙatar ta fadi.
Tabbatar da block yanke shawara ce ta zahiri (`block: true`), ba ta faru ta kuskure ba.

## Guardrails masu zuwa tare da tsarin (Built-in Guardrails)

Tsarin rajista yana loda guardrails guda shida ta atomatik cikin tsarin fifiko yayin shigo da su
(duba `registry.ts` → `registerDefaultGuardrails()`):

| Fifiko (Priority) | Suna (Name)         | Mataki (Stage(s)) | Fayil (File)          |
| ----------------- | ------------------- | ----------------- | --------------------- |
| `5`               | `vision-bridge`     | `preCall`         | `visionBridge.ts`     |
| `6`               | `audio-bridge`      | `preCall`         | `audioBridge.ts`      |
| `7`               | `video-bridge`      | `preCall`         | `videoBridge.ts`      |
| `10`              | `pii-masker`        | `pre` + `post`    | `piiMasker.ts`        |
| `20`              | `prompt-injection`  | `preCall`         | `promptInjection.ts`  |
| `95`              | `credential-masker` | `pre` + `post`    | `credentialMasker.ts` |

Ƙananan lambobin fifiko suna gudana **da farko**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Yana tsoma baki a cikin buƙatun da ke dauke da hotuna da aka nufa ga **samfuran da ba su da ikon gani (non-vision models)** kuma ko dai
ya sauya dukkan buƙatar zuwa samfurin da ke da ikon gani ko kuma ya maye gurbin sassan hoton
da bayanin rubutu wanda wani samfurin gani da aka saita zai samar kafin
kiran sama. Wannan yana ba da damar masu ba da sabis na rubutu kawai su sarrafa
kayan aiki masu yawa (multimodal payloads) ba tare da matsala ba.

Kogi (Flow):

1. Tsallake idan samfurin da ake nufafi riga ya goyi bayan gani (sai dai idan ya bayyana a cikin
   jerin tilasta gadojo `isVisionBridgeForcedModel`).
2. Ciro sassan hoto ta hanyar `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), wanda ke mika aiki ga **hadadden mai gano kafofin watsa labarai**
   `detectMediaParts()` a cikin `open-sse/utils/mediaParts.ts` — tushen gaskiya guda ɗaya
   da aka raba tare da tace jituwa ta haɗin gwiwa (combo compatibility filter).
   An iyakance cirewa zuwa manyan sassan siffofi
   wadanda `replaceImageParts` za su iya dawo da su (kwangilar ciro ↔ maye gurbawa): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, da Responses API `input_image`. Abubuwan da ke cikin gida da
   siffofin da ke nuni kawai kayan aiki ne na tace haɗin gwiwa kuma ba a taba ciro su ba.
   Tsallake idan ba a sami kowa ba.
3. Warware saitin lokacin gudu (runtime config) ta hanyar `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): sabbin maɓallan saitin `modalityBridge*`
   suna nasara; tsoffin maɓallan `visionBridge*` sun kasance **madadin zagaye ɗaya**
   (taga mai komawa baya). Tsallake kafin kowane ratsawar kafofin watsa labarai lokacin da
   gadojo (bridge) ya kasance a kashe.
4. Zaɓin yanayi (Mode selector) (`modalityBridgeVisionMode`, duba teburin da ke kasa) yana yanke shawara
   tsakanin sauya hanya (reroute) vs bayyanawa (describe). Sauya hanya yana dawo da `modifiedPayload` tare da sauya `model`
   kadai, tare da meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Hanyar bayyanawa (Describe path): iyakance hotuna a `maxImages`, haɗa saƙon da ya dace da aiki,
   bincika taskar bayyanawa (describe cache), kira samfurin gani **a lokaci guda**
   (`Promise.allSettled`), da kuma sanya sassan rubutu na `[Image N]: <description>`
   a wurinsu. Bayanin da bai yi nasara ba yana samar da `null` kuma an
   **ajiye** asalin sassan hoton (#4012) — sai dai a kan hanyar bayyanawa ta haɗin gwiwa lokacin da duk wani bayani ya gaza,
   inda aka tabbatar da samfurin sama da ba shi da ikon gani ya sami
   `(unavailable — no vision-capable provider connected)` stub maimakon haka (#8430).
6. Dawo da `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Zaɓin yanayi (`modalityBridgeVisionMode`)

| Yanayi (Mode) | Tsohuwa (Default) | Halayyar (Behavior)                                                                                                                                                                                                                                                                                                                          |
| ------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`        | ✔                 | Tsohon tsari, ba a taba shi ba (#6640/#7204): samfuran da ba na haɗin gwiwa ba/`auto/` suna komawa zuwa mafi kyawun samfurin gani sai dai idan asalin samfurin riga yana da takardun shaida masu amfani (sannan bayyana); abubuwan da aka nufa na haɗin gwiwa koyaushe suna bayyanawa.                                                       |
| `describe`    |                   | Koyaushe bayyana — an tsallake sashen sauya hanya gaba ɗaya; samfurin da mai amfani ya zaba koyaushe yana amsawa.                                                                                                                                                                                                                            |
| `reroute`     |                   | Tilasta sauya hanya: an wuce masu tsaron samfurin da ke da takardun shaida. Masu tsaron takardun shaida na **wurin da ake nufi** na sauya hanya Har yanzu suna aiki — lokacin da babu wurin da ake nufi na gani mai amfani, buƙatar tana fadowa zuwa bayyanawa ta yadda hotuna na asali ba za su isa ga backend mai rubutu kawai ba (#8430). |

Yanayin da aka tilasta suna gajerun hanyoyi **kafin** tsarin auto ya fara aiki; halayyar
`auto` tana daidai da byte tare da guardrail kafin PR-1.

#### Saƙon bayyanawa mai dacewa da aiki (`modalityBridgeVisionTaskAware`)

Tsohuwa **gaskiya (true)**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) yana ƙara
rubutun **saƙon mai amfani na ƙarshe** (wanda aka taƙaita zuwa haruffa 500) zuwa tushen
saƙon bayyanawa, yana jagorantar bayanin zuwa abin da mai amfani ya tambaya gaske
(samfurin codex-vision-proxy) kuma yana roƙon samfurin gani ya rubuta rubutun da ake gani. Tare da tutar a kashe — ko babu rubutun mai amfani — ana amfani da tushen saƙon ba tare da an canza shi ba.

Kiran kai-tsaye na cikin gida na describe mai dacewa da OpenAI (`callVisionModelSingle()` a cikin `visionBridgeHelpers.ts`) koyaushe yana neman `image_url.detail: "high"` — ba tare da wani sharadi ba, ga kowane mai kira/mai samarwa, ba tare da an danganta shi da wata sigina daga abokin ciniki ba. Samfurin mai ƙarancin bayani yana rage ingancin OCR don ainihin aikin rubuta bayanan rubutu da wannan prompt ɗin ke nema, don haka kiran describe ɗin kansa koyaushe yana neman babban bayani ba tare da la'akari da matakin bayanin da asalin bukatar da ke shigowa ta yi amfani da shi ba. Wannan yana shafar jikin bukatar describe na cikin gida kawai; baya canza yadda OmniRoute ke tura `image_url.detail` na mai kiran kansa akan babban bukatar — ana amfani da wannan tsoho daban, kuma ga abokan ciniki na OpenCode kawai da aka gano, a cikin `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Reshen tsarin Anthropic wire-format na describe self-loop ba shi da fannin `detail` kuma tsoho ɗaya bai shafe shi ba.

#### Iyakar fitarwa na Describe (`modalityBridgeVisionMaxChars`)

| Key                            | Tsoho | Kewayo           |
| ------------------------------ | ----- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`   | `0` ko 100–50000 |

`0` (tsoho) yana nufin **babu iyaka** — bayanin da `callVisionModel()` ya dawo da shi ana wuce da shi ba tare da canji ba, ana kiyaye halayyar da ake da ita. Duk wani ƙima a cikin kewayon 100–50000 yana gajerta bayanin tare da kari na `…` kafin a mayar da shi azaman `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` a cikin `src/lib/guardrails/visionBridge.ts`). Haɓaka wannan don ayyukan OCR masu yawan bayanai inda samfurin da ke biye yake buƙatar cikakken rubutu; rage shi don takaita amfani da token akan samfuran gani masu yawan magana. Fannin dashboard yana nan akan rukunin Advanced na Vision tab (`modality-bridge-max-chars` a cikin `ModalityBridgeVisionTab.tsx`) kuma yana takaita duk wani ƙima tsakanin 1 zuwa 99 har zuwa mafi ƙanƙanta na 100 yayin da yake barin takamaiman `0` ba tare da taɓawa ba — `0` ƙima ce ta Zod mai inganci a kashin kanta (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ba kawai tsoho na "ba a saita ba" ba.

#### Ma'ajiyar sirri ta Describe (`modalityBridge/bridgeCache.ts`)

Ma'ajiyar sirri ta LRU + TTL a cikin ƙwaƙwalwar ajiya don fitarwar describe, da ake rabawa a duk faɗin tsarin. Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` tare da tsarin prefix na tsayi (babu karon iyakar fanni). Sashen samfurin shine samfurin bridge **da aka tsara**, ba samfurin da ya ba da amsa ba — `callVisionModel` na iya komawa baya a cikin gida, kuma sanya key ga kowane ƙoƙari zai rarraba ma'ajiyar sirrin. Ba a taɓa adana describe ɗin da suka gaza ba. Saituna:

| Key                             | Tsoho  | Kewayo  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Daidaitawar hoto na nesa (self-loop describe/base64 fetch)

Lokacin da bridge ɗin ya ɗauko hoton **nesa** da kansa — kiran kai na Anthropic describe da canjin base64 na claude-wire-format (`ensureBase64ImagesForClaudeWire`), duka ta hanyar `fetchRemoteImageAsDataUri()` a cikin `visionBridgeHelpers.ts` — sakamakon data URI ana wuce da shi ta hanyar `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) kafin a saka shi a cikin bukatar vision-model. Hotuna masu girman gaske ana rage girman su zuwa **gefe mafi tsawo na 2048px** (daidai da iyakar sake girman da OpenAI/Anthropic ke amfani da shi a gefen uwar garken), wanda ke rage bytes na lodawa/jinkiri ba tare da canza abin da samfurin gani ke gani ba. Sake girman yana amfani da `sharp`, wanda aka loda ta hanyar dynamic import: akan dandamali inda binary ɗinsa na asali ya gaza lodawa, `normalizeDataUri()` **ba ya taɓa yin kuskure** — yana komawa zuwa wucewa kai tsaye na asalin bytes, don haka hanyar describe/base64-conversion koyaushe tana ci gaba da aiki. Bytes waɗanda ba na hoto ba (ɗauko hoto wanda bai dawo da hoton da za a iya fassara shi ba) suma ana wuce da su ba tare da taɓawa ba. Wannan daidaitawar an keɓe ta ne ga hotunan da bridge ɗin ke ɗauko don kiran kansa — ba a taɓa amfani da ita ga asalin payload na mai kiran ba, daidai da ka'idar canji ta hanyar zaɓi kawai (Dokar Guda #20).

#### Tsarin saituna + hijira (migration)

Sabuwar `modalityBridge*` keys ana tantance su ta Zod a cikin `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, rukunin `modalityBridgeCache*` guda uku, da rukunin `modalityBridgeAudio*` da Audio Bridge ke amfani da su. Hijira `141_modality_bridge_settings.sql` tana kwafi ƙimar `visionBridge*` na gado da ke akwai zuwa sabbin keys masu dacewa (idempotent, ba ya taɓa sake rubuta ƙimar `modalityBridge*` da mai gudanarwa ya saita); ana ci gaba da karɓar keys na gado azaman madadin karantawa na tsawon zagayen fitarwa ɗaya.

#### Header na nuna gaskiya + kididdiga

Amsoshin da aka canza ta hanyar Describe suna ɗauke da `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (wanda `buildModalityBridgeHeader()` ya gina a cikin `modalityBridge/bridgeStats.ts`, kuma `withModalityBridgeHeader()` ya sanya a cikin `src/sse/handlers/chatHelpers.ts`). Bukatun da aka sake tura su ba sa samun **header** — payload ɗin ba a taɓa shi ba kuma canjin samfurin ya riga ya bayyana a cikin fannin `model` na jikin amsar.

`GET /api/modality-bridge/stats` (management auth, mataki ɗaya da `GET /api/settings`) yana dawo da counters na kowane yanayi a cikin ƙwaƙwalwar ajiya `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` don `vision`, `audio`, da `video`. `averageLatencyMs` yana amfani da `latencySamples`, ba dukkan ƙoƙarin ba, azaman mai raba lamba; aikin da ba shi da lokaci ba ya ƙirƙirar samfurin zero-millisecond. `bridged` ya kasance sunan barkwanci mai dacewa da baya don canje-canje masu nasara; ƙoƙarin da ya gaza ba ya ƙara shi. Counters suna sake saitawa lokacin sake kunna tsarin ta hanyar tsari (telemetry, ba lissafi ba).

#### Tsarin Dashboard

Shafin dashboard ɗin da aka keɓe shine
`/dashboard/settings/modality-bridge`. Shafukan sa na `Vision`, `Audio`,
da `Video` masu iya amfani da URL suna kiyaye sigogin tambaya yayin canza ƙimar `tab`.
Shafin Vision yana bayyana kunna, yanayi, zaɓin samfuri (ciki har da tsoho na atomatik),
saƙon da ya dace da aiki, iyakokin lokaci na ci gaba/hoto/tsawon bayanin/cache,
masu ƙidaya lokacin aiki, da kuma buƙatar samfurin da aka kiyaye. Shafin Audio shima yana raye:
yana bayyana kunna, mai zaɓin samfurin STT-kawai tare da Auto, iyakokin lokaci/max-clip,
masu ƙidaya sauti, da kuma gwajin samfurin `input_audio`. Shafin Video yana aiki:
yana ba da rahoton yanayin aiki na FFmpeg/ffprobe — ɗaya daga cikin jihohin UI guda huɗu
(`unknown` yayin da binciken ke gudana ko bai iya kammalawa ba, `restricted` akan
mai masaukin dashboard mara-loopback inda aka tsallake binciken a gefen abokin ciniki,
`unavailable` da zarar an bincika kuma an tabbatar da cewa babu, ko `available` tare da
nau'ikan FFmpeg/ffprobe) — yana ci gaba da kunna/samfuri/firikwensi/bidiyo/iyakokin lokaci,
yana tace mai zaɓin samfurin zuwa samfuran da ke iya gani, kuma yana bayyana masu ƙidaya bidiyo.

Tsohon katin Vision Bridge a ƙarƙashin saitunan AI haɗin haɗin kai ne zuwa
sabon shafin; baya mallakar kwafin fom na biyu. Masu samar da Media kuma
suna haɗa ayyukan Image-to-Text da Speech-to-Text zuwa shafukan Modality
Bridge masu dacewa ba tare da cire filin wasan Speech-to-Text da ke akwai ba.

**Kewaye shigar da kai-tsaye:** lokacin da kiran bayanin ya ratsa ta hanyar
OmniRoute na kansa `/v1` kai-tsaye (samfurin mai samar da sabon abu), buƙatar
ƙasa tana aika `x-omniroute-admission-bypass: internal` kuma an tabbatar da ita
tare da takardar shaidar kai-tsaye da aka warware — mai kula da `sk_omniroute`
na gida a yanayin gida, ko kuma ma'aikacin da aka saita `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` maɓallin muhalli (#1350) don haka `REQUIRE_API_KEY=true`
deploys har yanzu zai iya gudanar da kiran bayanin. Ana girmama kewaye ne kawai
don waɗannan takardun shaidar, don haka abokan ciniki na waje ba za su iya amfani
da kanun labarai don tsallake shigarwa ba.

Tsoffin saitunan gado suna cikin `src/shared/constants/visionBridgeDefaults.ts`;
sabon yanayi/saitunan da suka dace da aiki/cache da mai warware saitunan suna cikin
`src/shared/constants/modalityBridgeDefaults.ts`. Mai gadi yana bayyana zaɓin
mai ginawa `deps` don haka gwaje-gwaje zasu iya allura na karya `getSettings` da
`callVisionModel` aiwatarwa.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Yana katse buƙatun hira masu ɗauke da sauti kafin su isa wata manufa da ba a sani ba
cewa tana karɓar shigarwar sauti. Ba ta taɓa sake tura buƙatar hira ba: ana fassara
sassan sauti ta hanyar daidaitaccen ƙarshen OpenAI mai yawa kuma zaɓaɓɓen samfurin
hira yana ci gaba da rubutun rubutu.

Gudana:

1. Warware `supportsAudio` ta hanyar `getResolvedModelCapabilities()`. Bayanan
   rajistar mai samarwa na bayyane sun yi nasara, sannan bayanan samfurin tsaye,
   sannan `modalities_input` da aka daidaita. Jerin shigarwa da aka bayyana ba tare
   da `audio` ba shine `false`; babu shaidar iyawa da ta rage `null`. Dukansu `false`
   da `null` suna kunna gada mai ra'ayin mazan jiya, yayin da `true` ke kewaye da ita.
2. Warware saitunan `modalityBridgeAudio*` kuma cire sassan sauti na matakin sama
   masu iya haɗawa daga kowane saƙo ta hanyar mai gano `detectMediaParts()` da aka raba.
   Siffofin waya da aka goyan baya sune OpenAI `input_audio`, `audio_url`, da
   `source.media_type: "audio/*"`. Ana gano sauti mai gida don kewayawa amma ba a
   cire shi ta hanyar hanyar haɗawa ba. Aiki yana iyakance ta `modalityBridgeAudioMaxClips`;
   sassan baya suna kasancewa ba a taɓa su ba.
3. Girmama `provider/model` da aka saita, ko bari `selectAudioBridgeModel()` ya bi
   `AUDIO_TRANSCRIPTION_PROVIDERS` a cikin tsarin kasida mai tsayayye kuma ya zaɓi
   samfurin farko tare da takardar shaidar mai samarwa mai aiki.
4. `callAudioTranscription()` yana canza sauti na base64/data-URI zuwa `file` mai yawa,
   ko kuma yana sauke `audio_url` mai nisa ta hanyar mai gadi na waje kawai tare da
   pinning na DNS da iyaka 25 MB. Sannan yana POST fayil ɗin da samfurin da aka zaɓa
   zuwa `/v1/audio/transcriptions` kai-tsaye na gida, an tabbatar da shi tare da
   `resolveSelfLoopBearer()`. Hanyar fassarar da ke akwai tana yin binciken takardar
   shaidar al'ada, sarrafa sanyaya/iyakokin ƙimar, da kuma aika mai samarwa.
5. Kira masu nasara suna maye gurbin sassan su da `[Audio N]: <transcript>`. Kira
   suna gudana tare da `Promise.allSettled`: gazawar mutum ɗaya tana kiyaye wannan
   sashin sauti na asali (kwangilar #4012). Idan kowane kira ya gaza kuma an tabbatar
   da manufa `supportsAudio === false`, sassan sun zama
   `[Audio N]: (unavailable — no STT provider connected)` (kwangilar #8430). Don
   manufa da ba a sani ba (`null`), sakamakon gazawar gaba ɗaya yana kasancewa ba a
   taɓa shi ba. Manufa mai rubutu kawai da aka tabbatar ba tare da takardar shaidar
   STT mai amfani ba tana karɓar daidai wannan stub ɗin bayyane ba tare da fitar da
   kiran cibiyar sadarwa ba.

Rubutun nasara suna amfani da cache na Modality Bridge LRU/TTL na tsarin. Maɓallin
yana haɗa bayanin sauti, alamar aikin `audio-transcription` mai tsayayye, da kuma
samfurin STT da aka zaɓa; gazawar ba a taɓa adana su ba. Ƙoƙarin sauti suna sabunta
masu ƙidaya `bridged`, `cacheHits`, `failures`, da `lastUsedAt` da aka raba.
Amsoshin da aka canza suna ɗauke da
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; buƙatun
da ba a taɓa su ba ba sa karɓar sashin Audio Bridge.

Saitunan lokacin aiki suna goyan bayan DB kuma Zod-validated:

| Maɓalli                       | Tsoho   | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto ko STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Cache ɗin da aka raba yana ci gaba da sarrafa shi ta `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, da `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Yana katse manyan sassan bidiyo a cikin Chat Completions `messages` da Responses
API `input` kafin a kira wata manufa ba tare da sanin tallafin bidiyo na asali ba.
Siffofin da aka tallafa sune `input_video`, `video_url`, `video_source`, HTTPS URLs,
da `data:video/*;base64,...` data URIs. Ba a ɗaukar sunayen fayiloli a cikin rubutu
a matsayin bidiyo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) yana da mallakar tafiyar buƙata,
binciken iyawa/manufa, haɗin gwiwa na kowane buƙata, da kuma amsar amsa.
Aikin kowane bidiyo — samu, cache na dukkan sakamako, bayyana jerin firam
(wanda ke haɗa kowane rubutun sauti da mai kira ya bayyana), da kuma ma'auni/soke/tsaftacewa
na kowane yunƙuri — an ɓoye shi a bayan `processVideoPart` a cikin
`videoBridgePipeline.ts`, wanda ake kira sau ɗaya ga kowane sashi na bidiyo a cikin madaukin `preCall`.
Wannan module kuma yana bayyana iyakokin tashar jiragen ruwa `VideoMediaBrokerPort`
(samun bytes da cire firam ɗin da aka zaɓa), `VideoAudioTranscriptionPort`
(haɗa rubutun sauti da mai kira ya bayyana tare da rubutun da aka zaɓa), da
`VideoDrilldownPort` (iyakar ci gaba na firam ɗin; ba a haɗa shi cikin `processVideoPart` ba tukuna —
kawai hanyar `/api/modality-bridge/video/drilldown` ce ke rubuta shigarwar drill-down a yau).

Hanyar buƙatar jama'a `/v1` ba ta taɓa shigo da ko kiran wani tsari ba. Ana sauke bidiyo na nesa
ƙarƙashin iyakar 50 MiB; bidiyo na base64 na cikin layi suna da iyakar 36 MiB da aka yanke
ga kowane bidiyo don haka samfurin/saƙonni/firam ɗin zai iya kasancewa a cikin iyakar shigar da buƙatar JSON na jama'a na 50 MiB.
Ana bincika tsawon cikin layi da ƙididdigar girman da aka yanke kafin rarrabawa. Ana buƙatar HTTPS
a kan URL na nesa na farko da kowane sake turawa, ta amfani da tsarin kariya na waje na jama'a kawai
tare da DNS pinning. Daga nan sai bytes su ketare ainihin iyakar broker na ciki
`POST /api/modality-bridge/video/extract`. Wannan hanya tana da `LOCAL_ONLY` da `SPAWN_CAPABLE`,
tana karɓar buƙatar da aka tabbatar da ita kawai, amintacciyar buƙatar madauki, kuma ba ta taɓa karɓar URL,
hanyar fayil, mai aiwatarwa, ko jerin gardama ba. Bututun girman jiki na API da mai karanta jiki na mai sarrafawa
suna aiwatar da iyakar shigar da broker na 50 MiB. Jerin sa na iyakance yana gudanar da cirewa ɗaya a lokaci guda,
yana ba da damar ayyuka huɗu masu jiran gado, kuma yana iyakance shigarwar da ke jiran gado zuwa 100 MiB.

A cikin broker, `ffprobe` yana karanta fayil na gida mai zaman kansa; jerin fayilolin da aka yarda da su
sun cire jerin waƙoƙi da tsarin manifest. Ga kwantena na MOV-family da aka yarda da su,
bayanan MOV na waje sun kasance a kashe ta tsohuwa, kuma umarnin da aka gyara baya zaɓar su.
Dukansu `ffprobe` da `ffmpeg` suna amfani da jerin fayilolin `file`-kawai, zaren ɗaya,
jerin gardama da aka gyara, babu harsashi, da kuma masu aiwatarwa da aka warware daga `PATH`.
Ba a ɗaukar rafi na murfin hoto da aka haɗa a matsayin masu iya kunnawa.
Duk rafi masu iya kunnawa dole ne su cika iyakoki, kuma ana fifita rafi na tsoho
kafin faɗuwar ƙasa mafi ƙarancin index. An iyakance bidiyo zuwa daƙiƙa 600,
pixels 8,192 a kowane girma, da pixels 33,554,432 na asali. FFmpeg yana samfurin
firam ɗin JPEG na tsakiya 1–16, yana rage gefen dogon zuwa pixels 1,024 ba tare da haɓaka
ƙananan shigarwa ba, kuma baya taɓa karɓar URL. Samfurin yana `uniform` ta tsohuwa.
Manufofin `scene_aware` na zaɓi da `segment_aware` na gwaji suna yin ƙarin
wucewa ta FFmpeg da aka gyara a kan rafi na gida da aka riga aka tabbatar,
zaɓi lokutan al'amuran `showinfo` da aka iyakance, kuma suna faɗuwa zuwa
tsakiyar tsakiyar daidai a kan gazawar mai gano, ƙarewar lokaci, fitarwa mara kyau,
ko saitin ɗan takara mara komai. Yanayin sanin sashi yana rarraba samfurori na tsakiya
daidai gwargwado zuwa lokutan al'amuran da aka tabbatar; shaidar sanin sashi da halayen faɗuwa
an bayyana su a ƙasa. An yi amfani da iyakar firam 16 mai tsauri
bayan zaɓi a kowane manufa. Lokacin da buƙatar sanin al'amari tana da kasafin kuɗi na firam ɗaya kawai,
tana amfani da tsakiyar tsakiyar daidai na cikakken bidiyo mai aiki ko taga mai mai da hankali
kuma tana ba da rahoton `policyEffective: uniform`: firam ɗin al'amari ɗaya da aka zaɓa
ba zai iya kiyaye duka ƙarshen lokaci ba. Mai kira na iya ba da taga mai mai da hankali
(`start`/`end` seconds); an iyakance iyakoki zuwa tsawon kafofin watsa labarai,
an ƙi tagogi masu juyawa ko marasa iyaka, kuma duk manufofin samfurin
ana yin su ne kawai a cikin tazara da aka daidaita. An haɗa taga da aka samu
a cikin metadata na samfurin da kuma a cikin prefix ɗin bayanin da ba a amince da shi ba
don haka samfurori na gaba zasu iya bambanta wani yanki mai mai da hankali daga cikakken lokaci.

Mai da hankali kan rubutun ma'ana wani saiti ne daban, bayyananne. Yanayin bincike na `full`
yana kiyaye firam ɗin da ake da shi kuma baya taɓa tura rubutun buƙata zuwa samfurin rubutun.
A cikin yanayin `focused`, gada tana karanta kawai sabon `text`/`input_text`
da mai amfani ya rubuta daga wannan Chat ko Responses container, tana daidaita shi zuwa NFC,
tana haɗa haruffa masu sarrafawa da fararen sarari, kuma tana iyakance shi zuwa
haruffa Unicode 500. Sakamako mara komai yana faɗuwa zuwa ainihin `full` prompt.
Ana sanya alamar amfani a matsayin JSON a cikin wani toshe na musamman na mahallin mai amfani
da ba a amince da shi ba kuma yana iya ba da fifiko ga cikakkun bayanai masu lura kawai;
ba zai iya soke gargadin daban game da bin umarnin da ake gani
ko ji a cikin kafofin watsa labarai ba. Mai da hankali kan rubutu baya taɓa gano `start`/`end`
ko canza mai samfurin lokaci.

#### FU-07 shaidar sashi na tsari

`segment_aware` yana amfani da wucewa ta pre-analysis da aka iyakance a kan rafi na bidiyo na gida
da aka riga aka tabbatar. Jerin tacewa da aka gyara yana fara ragewa zuwa pixels 320 a faɗi,
yana gano canje-canjen al'amuran da lokutan daskarewa, sannan yana samfurin firam 1 a kowane daƙiƙa
don blur, matsakaicin luma, da bayanan sarari/lokaci. An iyakance wucewa zuwa samfurori 600 na tsari,
zaren FFmpeg/tacewa ɗaya, ka'idar `file`-kawai da jerin kwantena da aka yarda da su,
iyakar fitarwa na tsari na 1 MiB, kuma aƙalla daƙiƙa 30 a cikin soke/ƙarewar lokaci na broker.
Baya taɓa karɓar umarni, tacewa, hanya, ko URL daga buƙatar.

Ƙimar tsarin sune shaidar samfurin ƙaddara, ba fahimtar bidiyo na ma'ana ba. Ba sa gano batutuwa, ayyuka, taken, magana, ko niyyar mai amfani. Iyakokin fage da daskarewa suna samar da sassa; ɗaukar daskarewa, blur, fallasa, dalla-dalla na sararin samaniya, da canjin lokaci suna tasiri ne kawai yadda aka raba kasafin kuɗin firam 1-16 da ke akwai. An iyakance wani yanki da aka daskare gabaɗaya zuwa firam ɗaya, yayin da sassan da ba a daskare ba suna gasa don sauran kasafin kuɗin. Lokacin da iyakoki suka fi firam yawa, ana riƙe da ɗaukar lokaci guda don haka saurin yanke farko ba zai iya ɓoye dogon yanki mai bi ba. Iyakokin fage a cikin ƙudurin bincike na daƙiƙa 1 na iyakar daskarewa an haɗa su.

Filtoci da suka ɓace, shaidar da ba ta dace ba/mara komai, kuskuren mai gano, ko ƙayyadaddun lokacin ƙarewar bincike na farko suna buɗewa zuwa ainihin manufar tsakiyar wuri guda. Katsewar mai kira ko ƙarshen mai shiga ba ya buɗewa: yana kawo ƙarshen aikin da ke gudana, yana hana cire firam na gaba, kuma an cire bishiyar wucin gadi mai zaman kanta a cikin `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` yana samar da ainihin kayan aikin FFmpeg don adana kuɗin kiran taken bayan cirewa, rarraba kasafin kuɗin motsi mai yawa, shaidar blur/fallasa/SI-TI, saurin yanke tare da dogon wutsiya, da kuma ƙarya masu laushi. Yana yin rikodin lokacin bango na bincike na farko kuma, inda `/usr/bin/time` ke samuwa, CPU na yaro da mafi girman RSS. Binciken ingancinsa sune oracles na tsari kawai. Ingancin samfurin taken na gaske ya kasance `HOLD` saboda wannan kayan aikin ba shi da wani wuri mai izini ko alkali mai daskarewa. Adana kuɗi kuma ya kasance `HOLD` sai dai idan `--caption-cost-per-call-usd` ya samar da ƙididdigar kiran da aka bayyana a fili; rubutun ba ya taɓa ƙirƙira ko ɗaya daga cikin sakamakon.

Kowane firam yana iyakance zuwa 4 MiB, duk firam ɗin da ba a sarrafa ba tare zuwa 23 MiB, kuma martanin mai shiga da aka tsara zuwa 32 MiB. An cire babban fayil na wucin gadi mai zaman kansa a cikin `finally`. OmniRoute baya haɗa FFmpeg kuma baya karɓar hanyar aiwatarwa ta musamman. Kafin taken, gadar tana amfani da wucewar cirewa ta gani mai ra'ayin mazan jiya: kowane JPEG an rage shi zuwa buffer mai launin toka 16x16 kuma ana kwatanta shi ne kawai da firam ɗin ƙarshe da aka riƙe. Don kasafin kuɗin taken da aka nema sama da firam ɗaya, cirewa yana samar da ƙayyadaddun rukunin 'yan takara har sau biyu na wannan kasafin kuɗin kuma ba fiye da firam 16 ba. Ana amfani da iyakar da aka nema ne kawai bayan cirewa, tare da zaɓaɓɓun 'yan takara na farko da na ƙarshe da aka adana yayin ragewa na ƙarshe lokacin da kasafin kuɗin ya kai aƙalla biyu. Manufar `grayscale-16x16-mean-cells-v2` mai sigar tana amfani da mafi girman matsakaicin luma delta da kuma rabon sel ɗin thumbnail waɗanda aka daidaita delta ɗinsu ya kai aƙalla 0.05. Matsakaicin kwafi shine ma'auni 0.04, wanda aka zaɓa don tsinkaya maimakon a bayyana shi azaman saitin lokacin gudu. Wannan siginar babban bambanci na biyu yana adana ƙananan motsi da canje-canjen rubutu da ake gani waɗanda kwatancen matsakaici kawai zai iya ɓoyewa. Kuskuren kwatantawa ko mai yanke hukunci suna buɗewa kuma suna riƙe da ɗaukar hoto. Metadata na fitarwa yana raba 'yan takara da aka ciro, firam ɗin da aka yi amfani da su cikin nasara, da kuma kwafin gani da aka jefar.

Wani ɓangaren bidiyo da aka yiwa alama a fili na iya neman takardar tuntuɓar da aka yiwa alama da lokaci. Gadar tana gina grid JPEG mai ginshiƙai 4, firam 16 a mafi yawa. Kowane sel mai pixels 512 yana ƙona lokacin tushensa zuwa wani yanki mai ƙarfi a ƙasa, yayin da waɗannan lokutan suka kasance a cikin metadata na rubutu don haɗin gwiwa da bincike na gaba. Cikakken JPEG ya kasance iyakance zuwa 32 MiB. Idan `sharp` ba zai iya yanke ko haɗa grid ba, gadar tana komawa ga firam ɗin JPEG ɗaya; katsewar abokin ciniki har yanzu yana yaduwa ta hanyar aikin takardar.

Shaidar haɓakawa ta bambanta da gangan daga microbenchmark na haɗin gwiwar roba. `scripts/perf/video-bridge-contact-sheet-eval.ts` yana bayyana tsarin A/B mai sigar schema don ainihin samfuran hangen nesa masu dacewa da OpenAI. Yana auna alamomin da mai bayarwa ya ruwaito, jinkirin bango na ƙarshe zuwa ƙarshe (ciki har da haɗin takardar), adadin kiran samfurin, da riƙe gaskiyar da aka bayyana a cikin bayanan. Ba a rubuta martanin samfurin da ba a sarrafa ba zuwa rahoton; kawai SHA-256 digests da ID ɗin gaskiyar da aka daidaita an riƙe su. Kayan aikin baya yin kiran cibiyar sadarwa ko kiran samfurin da aka biya sai dai idan an wuce `--execute-real` kuma an saita `--model`, `OMNIROUTE_BASE_URL`, da `OMNIROUTE_API_KEY`. Ba tare da wannan ainihin gudu na musamman ba, hukuncin da za a iya karantawa na inji ya kasance `HOLD`; ma'aunin biyan kuɗi/adadin kira na roba kawai ba shaidar haɓakawa ba ne.

Masu kira na iya haɗa zaɓi na `transcript.cues` zuwa wani ɓangaren bidiyo da aka tallafa lokacin da suka riga sun mallaki rubutu da aka daidaita. Kowane cue dole ne ya ɗauki `text`, ƙayyadaddun lokaci `start`/`end` a cikin tsawon da aka bincika, da kuma `source` da aka ba da izini (`client`, `embedded`, ko `audio-bridge`); `confidence` yana da tsoho zuwa `1` kuma dole ne ya kasance tsakanin `0` da `1`. An haɗa ainihin cues masu kwafi. OmniRoute baya taɓa fara rubutawa daga wannan metadata: an kwafi cues da aka tabbatar a cikin sakamakon da aka bayyana tare da tushe, amincewa, da lokaci, kuma ana nuna su azaman lura da ba a amince da su ba tare da taken firam. Rubutun da ba daidai ba, wanda ba a cikin kewayon ba, ko wanda ba shi da tushe an ƙi shi maimakon a haɗa shi cikin rafin taken. Filin `source` a halin yanzu mai kira ne ya bayyana shi, ba mai sabar ya tabbatar ba: OmniRoute yana tabbatar da cewa ƙimar tana ɗaya daga cikin igiyoyi uku da aka yarda, amma har yanzu baya tabbatar da cewa alamar `embedded` ko `audio-bridge` ta fito daga cirewar da sabar ke mallaka. Bi da `source` azaman alamar da ba a amince da ita ba har sai an tabbatar da hakan; kada ku gina shawarwarin izini a kansa.

Mai kiran waya na gaba zai iya samar da wata hanyar `audioTranscript` da aka riga aka ba izini don bidiyo ɗaya. Haɗin gwiwar yana gudanar da lura da gani da sauti a ƙarƙashin lokaci ɗaya da siginar soke, yana tsara su a kan lokaci ɗaya, yana haɗa kwafin daidai, kuma yana ba da rahoton sakamako na ɓangare idan gefe ɗaya kawai ya yi nasara. Wani `audioTranscript` mara inganci yana komawa ga wannan sakamako na ɓangare — ana kiyaye bayanin gani kuma reshen sauti yana rubuta lambar gazawa mai tsabta — maimakon soke dukkan bidiyon. Ana kiyaye samuwa ga kowane reshe, alamar ɓangare, da lambobin gazawa masu tsabta a cikin sakamakon da aka bayyana, a cikin metadata na guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), a cikin metadata na cache na sakamako, da kuma a cikin masu ƙidaya haɗin gwiwar gada. Hanyar Video Bridge ta asali ba ta kiran magana-zuwa-rubutu ko zazzage kwafin kafofin watsa labarai na biyu; ba tare da wannan hanyar bayyananne ba, yana kasancewa bidiyo-kawai.

**Rike rubutun (#12150 P1).** Wannan yana aiki kai tsaye duk lokacin da Video Bridge (wanda shi kansa zaɓi ne) ya nuna alamar rubutun — babu wata alamar riƙewa ta daban. Lokacin da buƙata ta nuna kowace alamar rubutun (wani `transcript` da mai kira ya bayyana ko wani `audioTranscript` da aka haɗa), guardrail yana yi masa alama `videoBridgeObserved` kuma yana samar da inuwar bayanin bidiyo da aka gyara — wani nuni iri ɗaya inda aka maye gurbin jikin rubutu na kowace alama da `[redacted-video-transcript]`, wanda aka gina ta hanyar maye gurbin filin alamar da aka tsara kafin a haɗa zaren (ba ta hanyar nazarin rubutun da aka daidaita ba, don haka babu abun ciki na alama — na gaba ko na yau da kullun, gami da jikin da ke ɗauke da `]` kamar `[inaudible]`/`[music]` — da zai iya rayuwa). Jikin buƙatar log na kira da aka adana yana musanya kowane ɓangaren rubutu da aka samo daga bidiyo da wannan inuwar da aka gyara, wanda aka daidaita ta daidaiton abun ciki; ana sake karanta anka na `fullText` daga nauyin guardrail na pre-call da aka gama, don haka daidaitawar har yanzu yana nasara bayan guardrails na sarkar na gaba (masu rufe PII da takardun shaida, fifiko 10/95) sun sake rubuta rubutun bayanin a wurin kuma bayan allurar tsarin-gaggawa/mika/ƙwaƙwalwa ta sake tsara jerin saƙonni. Jikin da aka aika sama zuwa samfurin ba a canza shi ba. Buƙatar da aka lura da ita kuma ba ta cika Memory mai ɗorewa ba (an tsallake duka cirewa da aka samo daga buƙata da kuma daga amsa), don haka amsar samfurin da kansa ba zai iya maimaita rubutun rubutun zuwa Memory ba.

Ƙarin kwafin da aka riƙe suna amfani da siginar buƙatar da aka lura da ita ɗaya. Hoton buƙatar abokin ciniki na pre-guardrail, buƙatar da ke jiran aiki a cikin ƙwaƙwalwa, da log na buƙatar da aka ƙi da wuri suna maye gurbin filayen rubutun a cikin sassan bidiyo; ana gyara umarnin zaren da matakan bututun mai suka haɗa da kuma mika mahallin a wurin da aka adana jikin buƙatar. Alamar `video_content_removed` da aka adana tana sa ci gaba na `previous_response_id` ya gaza rufewa maimakon sake gina rubutun da aka jefar da gangan. Idan buƙatar da aka lura da ita ta rasa inuwar gyarawa ta kowane ɓangare kafin yin log, ko ma ɗaya daga cikin inuwar bidiyo da yawa ta kasa daidaitawa bayan canje-canje na buƙata na gaba, an cire jikin buƙatar da aka riƙe gaba ɗaya maimakon riƙe rubutun da aka gyara a ɓangare.

Don buƙatar da aka lura da ita, amsar samfurin na iya faɗar kowane ɓangare na rubutun ba tare da iyakar alamar da aka tsara ba. Saboda haka an maye gurbin `responseBody` na log ɗin kira da aka adana da alamar cirewa; ba a riƙe cikakken kayan aikin bututun mai (wanda zai iya haɗawa da jikin sama/abokin ciniki da guntun rafi). Cache na ma'ana, idempotency, da sake kunna tunani suna tsallake karatu da rubutu don wannan buƙatar. Buƙatar mai bayarwa da amsar da abokin ciniki ke gani sun kasance ba a canza su ba. An cire bayanan keepalive na farko daga buffer na wucin gadi lokacin da aka cire cikakken kayan aikin. Gargadin EventStream mara kyau na Kiro yana ba da rahoton adadin baiti na nauyi kawai, ba abun ciki ko kuskuren JSON parser ba. Wannan baya nufin cewa an bincika kowane bincike na mai bayarwa/plugin da ba shi da alaƙa; ana bin diddigin babban tsabtace ramin da aka riƙe a #11658.

Rayuwar ciki ta `/api/modality-bridge/video/drilldown` wani yanki ne na cache daban, mai amfani da loopback/token-authenticated. Kowace aiki kuma tana buƙatar ID na babban mai amfani mai ɓoye. Kafin a kunna mai kiran samarwa, dole ne ya samo wannan ID daga mai haya da aka tabbatar kuma kada ya taɓa tura ƙimar da abokin ciniki ya zaɓa. Maɓallan cache suna haɗa wannan babban mai amfani zuwa ID na zama na asali da na bidiyo, suna adana maɓallan su da aka samo daga SHA-256 kawai, kuma suna iyakance duka karatu da sharewa ga babban mai amfani ɗaya. Cache yana adana mafi yawan firam 16 na JPEG da aka samo a kowane shigarwa, yana soke su bayan mintuna goma, kuma yana goyan bayan karatu na `start`/`end` mai iyaka ko sharewar zama bayyananne.

Kowane babban mai amfani yana iyakance ga shigarwa 16 da 64 MiB na bayanan JPEG na asali. Waɗannan iyakokin sun bambanta da iyakar duniya na shigarwa 64/256 MiB: matsin lamba na kason babban mai amfani yana fitar da shigarwar da ba a yi amfani da su ba kwanan nan na wannan babban mai amfani kafin a yi la'akari da fitarwa na LRU na duniya. Ana share shigarwar da suka ƙare daga duka lissafin babban mai amfani da na duniya akan aikin cache, yayin da soke da gazawar tabbatarwa ba sa yin wani maye gurbin ɓangare.

Cache yana ƙin Base64 mara asali, ƙarin padding, kafofin watsa labarai marasa JPEG, JPEGs marasa kyau ko guntaye, da JPEGs da ke samar da gargadi yayin da aka iyakance cikakken hoton `sharp` decode. Yana sake canza kowane hoton da aka karɓa zuwa JPEG na asali, yana samo faɗi da tsayi daga baiti da aka yanke maimakon amincewa da filayen mai kira, kuma yana jefar da duk wani baiti na polyglot da ke biyo baya maimakon riƙe su. Kawai buffer da aka matsa na asali mai iyaka ne ake caji ga duka kason. Iyakar waya ta JSON ta haɗa da ƙarin farashin Base64 don iyakar shigarwa da aka yanke na 32 MiB. Kowace derivation da aka adana tana rubuta ingantaccen tsarin/ƙudurin JPEG, manufar samfur, sigar derivation, lokacin ƙirƙira, hash na abun ciki da sabar ta lissafta, da kuma hash na iyaye da aka haɗa tare da hash na abun ciki na iyaye na mai kiran da aka amince da shi. Ana duba soke tsakanin matakan decode/hash na asynchronous kafin a yi atomic cache commit.

Wannan yanki bai riga ya haɗa mai samarwa zuwa hanyar ba kuma baya
bayar da zaɓin bambance-bambancen da yawa. Buƙatar gadar Bidiyo mai bayyane
saboda haka baya haifar da ƙarin aiki, yayin da tushen mai haya da
cikakken tsarin rayuwar FU-08 mai yawa ya kasance aiki mai biyo baya
maimakon a rubuta shi azaman cikakken hali.

An rubuta firam ɗin a jere tare da samfurin Bidiyo da aka saita. Bidiyo mara komai
override yana gadar saitin Vision; idan duka biyun ba komai bane, Vision
auto-router yana zaɓar samfurin da ke iya gani. Rubutun da suka yi nasara
suna maye gurbin ainihin ɓangaren tare da tsayayyen `[Video description:` prefix wanda kuma
yana nuna rubutun a matsayin lura da aka samo daga kafofin watsa labarai mara amfani kuma yana gaya wa samfuran
na gaba kada su bi umarnin da aka samu a cikin kafofin watsa labarai. Maɓallan cache na firam-rubutu
sun haɗa da baitocin JPEG, umarni, lokaci, da samfurin da ya dace; kawai rubutun da suka yi nasara
ana adana su. Abubuwan cache suna riƙe da ainihin samfurin mai samarwa mai nasara,
ciki har da samfurin koma baya; gadar tana ba da rahoton `mixed` lokacin da firam daban-daban
aka samar da su ta samfuran daban-daban. Cache hit yana sake amfani da wannan asalin mai samarwa
maimakon sake sanya masa suna azaman tsarin hanyar da aka nema. Sakamakon bidiyo gabaɗaya
cache yana da maɓalli akan kowane shigarwa da ke canza fitarwa — umarni, samfurin da ya dace,
ka'idar samfuri, adadin firam, yanayin nazarin ma'ana, SHA-256
sawun yatsa na alamar mai da hankali, taga mai da hankali, `transcript`,
`audioTranscript`, da alamar takardar tuntuɓar — don haka canza kowane ɗayan waɗannan
girman shine cache miss, ba sake amfani da tsohon ba. Sigar ka'idar dedup na gani,
ƙofar, da adadin firam ɗin da aka iyakance suma suna bayyane a cikin maɓallin cache na sakamako
da metadata; canjin ka'ida saboda haka ba zai iya sake amfani da tsohon
bayanin bidiyo gabaɗaya ba. Metadata na sakamako-cache v4 yana riƙe da yanayin da sawun yatsa,
ba ainihin aikin mai amfani ba. Metadata na Guardrail yana ba da rahoton duka
yanayin nazarin da aka nema da kuma wanda ya dace; yanayin `focused` da aka nema ba tare da
rubutun mai amfani mai amfani ba ana ba da rahoton shi azaman `full`.

Guardrail yana fitar da kowane ɓangaren bidiyo da aka tallafa amma baya bayyana fiye da
`modalityBridgeVideoMaxVideos`. Don manufa da aka tabbatar tana da
`supportsVideo === false`, bidiyo da suka gaza da waɗanda suka wuce iyaka suna zama alamun rubutu
mai aminci don haka babu bidiyo mara kyau da ya tsira. Lokacin da ba a san iyawa ba, waɗannan
ɓangarorin suna kasancewa ba a taɓa su ba. Manufofin da ke da `supportsVideo === true` suna wucewa
gadar. Siginar soke buƙatar abokin ciniki tana yaɗuwa ta hanyar saukewa, jerin broker,
ƙananan matakai, da kiran rubutu; sokewa suna tsayawa tsakanin bidiyo kuma ba sa taɓa
faduwa zuwa kafofin watsa labarai mara kyau.

Saitunan lokacin aiki suna da goyan bayan DB kuma an tabbatar da Zod:

| Maɓalli                             | Tsoho       | Range / hali                                                                                                              |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Zaɓi lokacin aiki, zaɓi-shiga                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` yana kiyaye rubutun gabaɗaya; `focused` yana amfani da iyakance, mahallin mai amfani na baya-bayan nan mara amfani |
| `modalityBridgeVideoModel`          | `""`        | Gadar samfurin Vision                                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ko daidaitaccen `segment_aware`; gazawar mai gano yana komawa zuwa `uniform`                    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                            |

Tsoffin ƙimar lokacin bidiyo da aka ci gaba sama da daƙiƙa 120 ana iyakance su zuwa
lokacin ƙarshe na broker; sabbin rubuce-rubucen saiti sama da wannan iyaka ana ƙi su.
`GET /api/modality-bridge/video/runtime` yana buƙatar amintaccen wurin da aka buga
kafin tantancewa ko binciken lokacin aiki, sannan yana buƙatar tantancewar gudanarwa.
Yana dawo da `available` kawai, sigogin FFmpeg/ffprobe da aka tsabtace, da kuma
dalili mai tsayayye lokacin da lokacin aiki bai samu ba. Maɓallin cirewa na ciki
ba API ne na loda jama'a ba: cikar jerin gwano yana dawo da `503` tare da `Retry-After`,
katsewar mai kira yana dawo da `499`, kuma lokacin ƙarshe na broker yana dawo da `504`.
Amsoshin da aka canza suna ƙara `video->text;model=<visionModel>;parts=<videos>` zuwa
babban `x-omniroute-modality-bridge` header ba tare da cire Vision ko Audio segments ba.

### PII Masker (`piiMasker.ts`)

Yana gudana akan **duka** matakai.

- **`preCall`** yana kwaikwayi nauyin, yana tafiya `system`, `messages`, `input`, da
  `prompt` (ciki har da abubuwan zaren fili), kuma yana amfani da `processPII()` (daga
  `@/shared/utils/inputSanitizer`) zuwa filayen zaren `content`/`text`. Lokacin
  `PII_REDACTION_ENABLED=true`, PII da aka gano ana cire shi a cikin nauyin da za a fitar.
  Wannan yana zaman kansa daga `INPUT_SANITIZER_MODE` (wanda kawai ke sarrafa
  ka'idar allurar umarni). Lokacin da aka kashe cirewa, kiran yana rubuta ƙididdigar ganowa
  ba tare da sake rubuta abun ciki ba.
- **`postCall`** yana kwaikwayi amsar sosai, yana gudanar da `sanitizePIIResponse()` tare da
  masker na siffar API na Amsoshi (`maskResponsesOutput` — yana rufe
  `output_text` da `output[].content[].text`). Idan wani cirewa ya faru,
  amsar da aka gyara tana maye gurbin ainihin.

Guardrail baya taɓa toshewa; yana kawai bayyanawa (`meta.detections`,
`meta.redacted`) ko sake rubutawa.

### Allurar Umarni (`promptInjection.ts`)

Yana gano tsarin adawa a cikin abun ciki da mai amfani ya bayar kuma yana aiwatar da
ka'idar da aka saita. Halin yana motsawa ta hanyar masu canjin muhalli da zaɓuɓɓukan mai ginawa:

| Saiti         | Env var                                                                                               | Tsoho  | Tasiri                                                                                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| An kunna      | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Idan `false`, mai gadin zai yi gajeren zango.                                                                                                                                        |
| Yanayi        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Manufar allura: `block`, `warn`, ko `log`. (`redact` an karɓa don dacewa da baya amma **baya** cire rubutun allura; buƙatar sake rubuta PII ana sarrafa ta `PII_REDACTION_ENABLED`.) |
| Ƙofar toshewa | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Mafi ƙarancin tsanani da ake buƙata don toshewa. Matsakaici yana kallon-kawai a tsoho.                                                                                               |

**Fifikon yanayi** (`getMode`): mai kira `options.mode` →
`INJECTION_GUARD_MODE` **DB fasalin-tutar wucewa** (Dashboard → Saituna →
Fasalin Tuta) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Don haka, wucewar dashboard tana cin nasara akan env vars, don haka UI na Fasalin Tuta yana sarrafa mai gadin da ke gudana kai tsaye (babu sake farawa). Karatun DB yana da aminci-kuskure: idan ya yi kuskure, mai gadin zai koma ga halayen da suka dogara da env, kuma idan babu wani wucewa da aka saita, halayen yana kama da warwarewar env-kawai.

Tushen ganowa:

1.  `sanitizeRequest()` daga `@/shared/utils/inputSanitizer` (saitin mai gano abubuwan da aka raba da ake amfani da su a wani wuri a cikin bututun).
2.  Gina-ciki `DEFAULT_GUARD_PATTERNS` (a halin yanzu `system_override_inline` da
    `markdown_system_block`, duka biyun tsanani `high`).
3.  Zaɓi `customPatterns` da aka wuce ta zaɓuɓɓukan mai ginawa (strings, regex,
    ko `{ name, pattern, severity }` records).

Lokacin da `mode === "block"` **kuma** aƙalla gano ɗaya ya cika ƙofar tsanani, `preCall` yana dawo da `{ block: true, message: "Request rejected:
suspicious content detected" }`. A cikin yanayin `warn`/`log`, mai gadin yana yin log amma yana ba da izinin kiran. Mai taimako na gama gari `evaluatePromptInjection()` an kuma fitar da shi don masu kira waɗanda ke buƙatar tantance umarni ba tare da wucewa ta rajista ba.

**Iyakokin bincike (v3.8.20):** mai gano abubuwan yana bincika **kawai 16 KB na farko** na rubutun umarni da aka haɗa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (bytes 16 384) a cikin `src/shared/utils/inputSanitizer.ts`. Duk `detectInjection()` da `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` kafin gudanar da madaukin tsari. Umarnin allura suna kusa da saman shigarwa, don haka wannan yana iyakance regex CPU/GC akan nauyin multi-ɗari-KB ba tare da raunana ganowa ba (duba #3932, #4041).

### Mai Rufe Bayanan Sirri (`credentialMasker.ts`)

Yana gudana a kan matakai **duka biyu**, na ƙarshe a cikin jerin tsoho (fifiko `95`). Yana ɓoye sanannun maɓallan API / tsarin sirri daga nauyin da aka aika (abun ciki na saƙo, muhawarar kiran kayan aiki, sakamakon kayan aiki) **kuma** martanin mai bayarwa, don haka bayanan sirri da aka liƙa a cikin umarni (ko aka dawo da su ta hanyar sakamakon kayan aiki) ba za a fallasa su ga mai bayarwa na sama ko kuma ga abokin ciniki ba.

- **Zaɓi-shiga kawai**, tsari ɗaya kamar ɓoye PII (Dokar Mai Tsanani #20-kusa): an kashe shi sai dai idan `settings.credentialRedactionEnabled === true` **ko**
  `CREDENTIAL_REDACTION_ENABLED=true`. Idan an kashe shi, mai gadin ba ya aiki — baya taɓa toshewa kuma baya taɓa sake rubutawa.
- `redactCredentials()` yana tafiya cikakken itacen nauyi/martani (`walkValue()`, mai aminci daga gurɓata prototype, mai aminci daga zagaye ta hanyar `WeakSet`) kuma yana maye gurbin abubuwan da suka dace da mai riƙe wuri `[REDACTED:<type>]`, yana kwafi kawai rassan da suka canza da gaske.
- `CREDENTIAL_PATTERNS` yana rufe maɓallan masu bayar da LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), alamun VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maɓallan biyan kuɗi (Stripe, Square),
  maɓallan girgije (maɓallin shiga AWS, Twilio, SendGrid, Mailgun), maɓallan sirri / JWTs,
  igiyoyin haɗin kai masu ɗauke da bayanan sirri (`mongodb://user:pass@...`, da sauransu), da kuma tsarin ƙimar kai na gama gari `Authorization`/`x-api-key`/`api-key`/`apikey`. Maɓallan da ke da siffar kai (`authorization`, `x-api-key`, `api-key`, `apikey`) ana ɓoye su ta tsari (ƙima kawai, an adana prefix na tsari kamar `Bearer `/`Basic `) maimakon ta hanyar regex na rubutu na gama gari.
- Mai gadin baya taɓa toshewa; yana sake rubutawa kawai (`modifiedPayload` /
  `modifiedResponse`) kuma yana yin bayani (`meta.credentialsRedacted`, `meta.count`).

Mai gadin koma baya: `tests/unit/credential-masker-guardrail.test.ts`.

## Babban Kwangila (`base.ts`)

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
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
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

Guardrail yana nuna 'babu canji' ta hanyar dawo da ko dai `void`, `{}`, ko
`{ block: false }`. Mayar da `modifiedPayload`/`modifiedResponse` yana maye gurbin
ƙimar da ke gudana ta cikin sarkar don guardrails na gaba.
`signal?: AbortSignal` yana ɗaukar rayuwar mai kira zuwa cikin guardrails. Soke buƙata shine keɓantaccen kuskure na buɗe-kuskure: gadajen kafofin watsa labarai suna dakatar da aiki da tsaftacewa ba tare da dawo da kafofin watsa labarai na asali zuwa wata manufa da aka sani ba ta goyi bayansa ba.

## Rajista (`registry.ts`)

Singleton `guardrailRegistry` yana bayyana:

- `register(guardrail)` — yana ƙara (ko maye gurbin ta sunan da aka daidaita) guardrail kuma
  yana sake tsarawa ta hanyar hawan `priority`.
- `clear()` / `list()` — masu taimakawa gudanarwa.
- `runPreCallHooks(payload, context)` — yana maimaita guardrails masu aiki, yana wuce da
  payload ta hanyar `modifiedPayload`, kuma yana tsayawa a farkon `block: true`.
- `runPostCallHooks(response, context)` — tsarin guda ɗaya a gefen amsa.
- `resetGuardrailsForTests({ registerDefaults })` — yana share yanayi kuma a zaɓi
  yana sake yin rajistar tsoffin abubuwan don tsabtataccen keɓewar gwaji.

Duk masu gudu suna dawo da `{ blocked, payload|response, results, guardrail?, message? }`
inda `results` shine jerin bayanan `GuardrailExecutionResult` waɗanda suka haɗa da
filayen `blocked`, `skipped`, `modified`, `error`, da `meta` na kowane guardrail,
masu amfani don bin diddigi.

### Kashe Guardrails Ga Kowane Buƙata

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` yana tattara
jerin sunayen guardrail da aka cire kwafi waɗanda ya kamata a tsallake su don
buƙatar yanzu. Tushen (duk na zaɓi, duk an haɗa su):

- `apiKeyInfo.disabledGuardrails`
- Jikin buƙata `disabledGuardrails` (matakin sama)
- Jikin buƙata `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (ko tsohon
  `x-disabled-guardrails`)

Ƙimar na iya zama jerin igiyoyi ko igiya mai raba-koma; ana daidaita sunaye
zuwa ƙananan haruffa kebab-case (`pii_masker` → `pii-masker`). Ana wuce da
sakamakon ta hanyar `context.disabledGuardrails` zuwa rajista, wanda ke
tsallake guardrails masu dacewa (`skipped: true` a cikin `results`).

## Tsarin Aiki

Ga kowane buƙata da ke gudana ta `src/sse/handlers/chat.ts` da
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` yana gina jerin abubuwan da za a tsallake daga maɓallin API, jiki,
    da kuma kanun labarai.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` yana gudanar da guardrails a cikin tsarin fifiko mai hawa:
    - Guardrails da aka kashe ana rubuta su a matsayin `skipped`.
    - Kowane `preCall` na guardrail na iya sake rubuta bayanan da aka ɗora ta hanyar `modifiedPayload`.
    - `block: true` na farko yana dakatar da sarkar kuma mai sarrafawa yana mayar da
      martanin kin amincewa da guardrail.
3.  Bayanan da aka ɗora (watakila an sake rubuta su) suna shiga cikin hanyar haɗin gwiwa da kuma
    aikin aika zuwa sama.
4.  Bayan an haɗa martanin, `guardrailRegistry.runPostCallHooks(...)`
    yana gudanar da sarkar iri ɗaya akan martanin. `block: true` anan yana jefar da martanin daga sama.

Guardrails da suka jefa kuskure ana rubuta su da `error: <message>` kuma ana shigar da su ta hanyar
`logger.warn`, amma sarkar tana ci gaba – an tsara ta don ta ci gaba duk da kuskure.

## Saita

Ma'aunin muhalli da guardrails na ciki ke karantawa:

| Variable                              | Wanda ke amfani da shi      | Tasiri                                                                                              |
| :------------------------------------ | :-------------------------- | :-------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Saita `false` don kashe gano gaba ɗaya.                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Manufar allura: `warn`, `block`, ko `log`. Tsohon darajar `redact` baya sake rubuta rubutun allura. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Yanayin don kariyar allura; kuma alamar fasalin DB da **ke mamaye** ma'aunin muhalli (DB > ENV).    |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Mafi ƙarancin tsanani da `MODE=block` ke ƙi: `high` (tsoho), `medium`, ko `low`.                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Tsohon suna ga `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Lokacin da `true`, PII na buƙata ana gyara shi (mai zaman kansa daga yanayin allura).               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (ƙasa da ruwa) | Yana sarrafa halayen masker na gefen martani.                                                       |

Guardrails na Modality Bridge suna karanta saitin lokacin aiki daga ma'ajiyar saitunan da DB ke tallafawa
(`getSettings()`), ba ma'aunin muhalli ba. Maɓallan farko na Vision sune
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, da
`modalityBridgeCacheMaxEntries`. Tsoffin maɓallan
`visionBridge*` ana karɓar su ne kawai a matsayin abin da aka rubuta na sake karantawa na zagaye ɗaya;
rubuce-rubucen dashboard suna amfani da maɓallan farko. Abubuwan tsoho da mai warwarewa na sake karantawa suna zaune a
`src/shared/constants/modalityBridgeDefaults.ts`, tare da tsoffin ma'auni da aka riƙe a
`src/shared/constants/visionBridgeDefaults.ts`.

Audio yana amfani da `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, da `modalityBridgeAudioMaxClips`, tare da saitunan
`modalityBridgeCache*` da aka raba. Audio bashi da tsohon maɓallin sake karantawa saboda an gabatar da waɗannan maɓallan tare da tsarin Modality Bridge.

Video yana amfani da `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, da
`modalityBridgeVideoTimeout`, tare da saitunan `modalityBridgeCache*` da aka raba.
An kashe shi ta tsohuwa saboda FFmpeg/ffprobe sune zaɓin dogaro na aiki kuma
ƙara rubutun firam yana ƙara jinkiri da farashin samfuri.

## Tsare-tsare na Musamman

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "An wuce kasafin kuɗi na yau da kullun" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Matakai:

1. Ƙirƙiri `src/lib/guardrails/myGuardrail.ts` yana faɗaɗa `BaseGuardrail`.
2. Aiwatar da `preCall` da/ko `postCall`.
3. Ko dai a yi rajista a lokacin shigo da kaya (tura daga `registerDefaultGuardrails`) ko
   kiran `guardrailRegistry.register(...)` a lokacin gudu — rajistar tana maye gurbin
   kowane tsarin tsaro na baya da suna ɗaya.
4. Ƙara gwaje-gwaje a ƙarƙashin `tests/unit/` (misalai masu akwai:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Gwaji

Yi amfani da `resetGuardrailsForTests()` tsakanin gwaje-gwaje don farawa daga sanannen yanayi.
Wuce `{ registerDefaults: false }` don farawa da rajista mara komai kuma
yi rajistar tsare-tsaren tsaro kawai da ake gwadawa. Vision Bridge yana karɓar allurar dogaro (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge yana bayyana
daidaitattun abubuwan da suka dace don saituna, iyawa, zaɓin samfurin STT, binciken takardun shaida,
da rubutawa. Don haka gwaje-gwaje na iya yin amfani da duka hanyoyin ba tare da DB
ko samun damar hanyar sadarwa ba.

## Duba Kuma

- `src/lib/guardrails/` — aiwatarwa
- `src/shared/utils/inputSanitizer.ts` — mai gano abubuwan da aka raba wanda ke ba da ƙarfi
  allurar saƙo da rufe PII
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge tsoffin saituna da
  jerin samfuran da aka tilasta-gada
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio tsoffin saitunan lokacin gudu
- `docs/architecture/RESILIENCE_GUIDE.md` — Layer na orthogonal (mai karya kewaye, sanyaya)
- `docs/reference/ENVIRONMENT.md` — cikakken bayanin env var

## Rufin hanyar kariya daga allura & ƙungiyar ja (Mataki na 8 · Block D)

Kariyar allura (`createInjectionGuard` / `withInjectionGuard`) tana rufe duk hanyoyin
da ke karɓar saƙonnin mai amfani. Tana mutunta `INJECTION_GUARD_MODE` (tsoho `warn` = log kawai;
`block` = yana dawo da HTTP 400 `SECURITY_001`).

| Nau'i | Hanyoyi | Yanayin tsoho |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | warn |
| Rubutu (mai akwai) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions` | warn |
| Generative | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn |
| Data | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations` | warn |

Cire rubutu (`extractMessageContents`) yana rufe `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Ƙungiyar ja (dare, `nightly-llm-security.yml`):** promptfoo yana tabbatar da cewa kowace hanya tana toshe
corpus na OWASP-LLM a cikin `INJECTION_GUARD_MODE=block`; garak yana gudanar da bincike (yana tsallake ba tare da sirri ba).
An haɗa `moderations` don daidaito — masu aiki a yanayin toshewa na iya keɓe shi ta hanyar
`resolveDisabledGuardrails`.

Aikin dare (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch) yana da ayyuka biyu:

- **`promptfoo-guard` (toshewa)** — yana gudanar da `promptfoo eval -c promptfooconfig.yaml`
  tare da `INJECTION_GUARD_MODE=block`. Kowace shari'ar adawa (misali "yi watsi da duk
  umarnin da suka gabata…", DAN-style jailbreaks) yana tabbatar da cewa amsar tana ɗauke da
  `error.code === "SECURITY_001"`, wato, mai gadi ya ƙi buƙatar.
- **`garak` (shawara)** — yana gudanar da garak `--probes promptinject,dan,leakreplay`
  akan wani misali na OmniRoute na gida (`http://localhost:20128/v1`). An rufe shi da
  sirrin mai bayarwa (`PROMPTFOO_PROVIDER_KEY`); yana tsallake da kyau kuma an haɗa shi da
  `|| true`, don haka yana bayar da rahoto ba tare da gazawar CI ba.

Rufin mai taimakon gadi (`createInjectionGuard` / `withInjectionGuard`)
yana rufe kowace hanyar `/v1` mai ɗauke da saƙo; ana cire rubutun saƙo daga
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ta hanyar
`extractMessageContents()` a cikin `src/shared/utils/inputSanitizer.ts`.
