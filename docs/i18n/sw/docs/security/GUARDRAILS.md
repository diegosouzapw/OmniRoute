# Guardrails (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Chanzo rasmi:** `src/lib/guardrails/`
> **Ilisasishwa mwisho:** 2026-08-29 — v3.8.51 (asili ya nakala ya Video Bridge hutangazwa na mpigaji,
> bado haijathibitishwa na seva — imefafanuliwa kulingana na #11661)

Vizuizi vya ulinzi hutekeleza usalama, sera na mageuzi ya maudhui kwenye mpaka
kati ya OmniRoute na watoa huduma wa ngazi ya juu. Kila kizuizi cha ulinzi kinaweza kukagua (na
kwa hiari kukataa, kubadilisha au kuweka ufafanuzi kwenye) data za ombi (`preCall`) na
majibu ya mtoa huduma wa ngazi ya juu (`postCall`).

Mfumo ni wa **fail-open**: ikiwa kizuizi cha ulinzi kitatupa hitilafu kinapotekelezwa, sajili
hurekodi hitilafu hiyo na kuendelea na kizuizi kinachofuata badala ya kusababisha
ombi lishindwe. Kuzuia ni uamuzi wa moja kwa moja (`block: true`), kamwe si ajali.

## Vizuwizi Vilivyojengwa Ndani

Rejista hupakia kiotomatiki vizuwizi sita kwa mpangilio wa kipaumbele wakati wa kuingiza
(tazama `registry.ts` → `registerDefaultGuardrails()`):

| Kipaumbele | Jina                | Hatua(s)       | Faili                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Namba za kipaumbele za chini huendeshwa **kwanza**.

### Daraja la Maono (`visionBridge.ts`) — Daraja la Modali PR-1

Huzuia maombi yenye picha yanayolenga **mifumo isiyo ya maono** na ama huelekeza upya ombi zima kwa mfumo wenye uwezo wa maono au hubadilisha sehemu za picha na maelezo ya maandishi yanayotolewa na mfumo wa maono unaoweza kusanidiwa kabla ya wito wa juu. Hii inaruhusu watoa huduma wa maandishi pekee kushughulikia kwa uwazi mizigo ya modali nyingi.

Mfuatano:

1.  Ruka ikiwa mfumo lengwa tayari unaunga mkono maono (isipokuwa kama inaonekana kwenye orodha ya daraja la kulazimishwa `isVisionBridgeForcedModel`).
2.  Toa sehemu za picha kupitia `extractImageParts(messages)`
    (`visionBridgeHelpers.ts`), ambayo inakabidhi kwa **kigunduzi cha media kilichounganishwa** `detectMediaParts()` katika `open-sse/utils/mediaParts.ts` — chanzo kimoja cha ukweli kinachoshirikiwa na kichujio cha utangamano cha combo.
    Utoaji umeruhusiwa kwa sehemu za juu za maumbo
    `replaceImageParts` inaweza kuunganisha tena (mkataba wa kutoa↔kubadilisha): OpenAI
    `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
    `source.type:"url"`, na Responses API `input_image`. Vipengele vilivyowekwa ndani na maumbo ya viashiria pekee ni nyenzo za kichujio cha combo na hazitolewi kamwe.
    Ruka ikiwa hakuna kilichopatikana.
3.  Tatua usanidi wa wakati wa utekelezaji kupitia `resolveVisionBridgeRuntimeSettings()`
    (`src/shared/constants/modalityBridgeDefaults.ts`): vifunguo vipya vya mipangilio ya `modalityBridge*` hushinda; vifunguo vya zamani vya `visionBridge*` vinabaki kuwa **mbadala wa mzunguko mmoja** (dirisha la kurudisha nyuma). Ruka kabla ya upitaji wowote wa media wakati daraja limezimwa.
4.  Kichagua hali (`modalityBridgeVisionMode`, tazama jedwali hapa chini) huamua kuelekeza upya dhidi ya kuelezea. Kuelekeza upya hurudisha `modifiedPayload` na `model` pekee iliyobadilishwa, pamoja na meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Njia ya kuelezea: punguza picha kwa `maxImages`, tunga kidokezo kinachozingatia kazi, angalia akiba ya maelezo, piga mfumo wa maono **sambamba**
    (`Promise.allSettled`), na ingiza sehemu za maandishi `[Image N]: <description>` mahali pake. Maelezo yaliyoshindwa hutoa `null` na sehemu asili ya picha **inahifadhiwa** (#4012) — isipokuwa kwenye njia ya kuelezea ya combo wakati kila maelezo yalishindwa, ambapo mfumo wa juu usio wa maono uliothibitishwa hupata kiambishi `(haipatikani — hakuna mtoa huduma mwenye uwezo wa maono aliyeunganishwa)` badala yake (#8430).
6.  Rudisha `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
    `processingTimeMs`, `visionModel`).

#### Kichagua Hali (`modalityBridgeVisionMode`)

| Hali       | Chaguo-msingi | Tabia                                                                                                                                                                                                                                                                                                                |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔             | Heuristiki ya zamani, haijaguswa (#6640/#7204): mifumo isiyo ya combo/`auto/` huelekeza upya kwa mfumo bora wa maono isipokuwa kama mfumo asili tayari una vitambulisho vinavyoweza kutumika (basi elezea); malengo ya combo daima huelezea.                                                                         |
| `describe` |               | Daima elezea — kizuizi cha kuelekeza upya kinarukwa kabisa; mfumo uliochaguliwa na mtumiaji daima hujibu.                                                                                                                                                                                                            |
| `reroute`  |               | Lazimisha kuelekeza upya: kizuizi cha mfumo ulio na vitambulisho kinapitwa. Kizuizi cha vitambulisho vya **lengo** la kuelekeza upya bado kinatumika — wakati hakuna lengo la maono linaloweza kutumika, ombi hupitia hadi kuelezea ili picha ghafi zisifike kamwe kwenye mfumo wa nyuma wa maandishi pekee (#8430). |

Hali za kulazimishwa hupunguza mzunguko **kabla** ya heuristiki ya kiotomatiki kuendeshwa; tabia ya `auto` inafanana kabisa na guardrail ya kabla ya PR-1.

#### Kidokezo cha kuelezea kinachozingatia kazi (`modalityBridgeVisionTaskAware`)

Chaguo-msingi **kweli**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) huongeza maandishi ya **ujumbe wa mwisho wa mtumiaji** (yaliyopunguzwa hadi herufi 500) kwenye kidokezo cha msingi cha kuelezea, kuelekeza maelezo kuelekea kile mtumiaji aliuliza kweli (muundo wa codex-vision-proxy) na kuomba mfumo wa maono kunakili maandishi yanayoonekana. Bendera ikiwa imezimwa — au hakuna maandishi ya mtumiaji — kidokezo cha msingi kinatumika bila kubadilika.

Ombi la kujieleza la kitanzi cha kujitegemea linaloendana na OpenAI (`callVisionModelSingle()` katika `visionBridgeHelpers.ts`) huomba `image_url.detail: "high"` kila wakati — bila masharti, kwa kila mpigaji/mtoa huduma, bila kuzuiliwa na ishara yoyote ya mteja. Sampuli ya maelezo ya chini hupunguza usahihi wa OCR kwa kazi halisi ya unukuzi wa maandishi ambayo ombi hili linauliza, kwa hivyo simu ya kuelezea yenyewe huomba maelezo ya juu kila wakati bila kujali kiwango cha maelezo ambacho ombi la awali lililotumwa lilitumia. Hii huathiri tu mwili wa ombi la ndani la kuelezea; haibadilishi jinsi OmniRoute inavyosambaza `image_url.detail` ya mpigaji kwenye ombi kuu — chaguo-msingi hilo hutumika kando, na tu kwa wateja wa OpenCode waliogunduliwa, katika `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Tawi la umbizo la waya la Anthropic la kitanzi cha kujieleza halina sehemu ya `detail` na haliathiriwi na chaguo-msingi yoyote.

#### Kikomo cha matokeo ya kuelezea (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` au 100–50000 |

`0` (chaguo-msingi) inamaanisha **hakuna kikomo** — maelezo yanayorejeshwa na `callVisionModel()` hupitishwa bila kubadilishwa, yakihifadhi tabia iliyopo. Thamani yoyote katika safu ya 100–50000 hupunguza maelezo kwa kiambishi tamati cha `…` kabla hayajaunganishwa tena kama `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` katika `src/lib/guardrails/visionBridge.ts`). Ongeza hii kwa kazi za OCR zenye maelezo mengi ambapo modeli ya chini inahitaji unukuzi kamili; ipunguze ili kupunguza matumizi ya tokeni kwenye modeli za maono zenye mazungumzo mengi. Sehemu ya dashibodi iko kwenye paneli ya Advanced ya kichupo cha Vision (`modality-bridge-max-chars` katika `ModalityBridgeVisionTab.tsx`) na inabana thamani yoyote kati ya 1 na 99 hadi kiwango cha chini cha 100 huku ikiacha `0` wazi bila kuguswa — `0` ni thamani halali ya Zod yenyewe (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), si tu chaguo-msingi "isiyowekwa".

#### Akiba ya kuelezea (`modalityBridge/bridgeCache.ts`)

Akiba ya LRU + TTL ya ndani ya kumbukumbu kwa matokeo ya kuelezea, inayoshirikiwa katika mchakato mzima. Ufunguo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` na urefu wa kiambishi awali (hakuna migongano ya mipaka ya sehemu). Kipengele cha modeli ni modeli ya daraja **iliyosanidiwa**, si modeli iliyojibu kweli — `callVisionModel` inaweza kurudi nyuma ndani, na kuweka funguo kwa kila jaribio kunaweza kugawanya akiba. Maelezo yaliyoshindwa hayahifadhiwi kamwe. Mipangilio:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Urekebishaji wa picha ya mbali (kujieleza kwa kitanzi/upatikanaji wa base64)

Wakati daraja linapochukua picha ya **mbali** yenyewe — simu ya kujieleza ya Anthropic na ubadilishaji wa base64 wa umbizo la waya la claude (`ensureBase64ImagesForClaudeWire`), zote kupitia `fetchRemoteImageAsDataUri()` katika `visionBridgeHelpers.ts` — URI ya data inayotokana hupitishwa kupitia `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) kabla ya kupachikwa kwenye ombi la modeli ya maono. Picha kubwa hupunguzwa ukubwa hadi **kingo ndefu ya pikseli 2048** (ikilingana na kikomo cha ukubwa ambacho OpenAI/Anthropic tayari hutumia upande wa seva), ambayo hupunguza baiti za kupakia/kuchelewa bila kubadilisha kile ambacho modeli ya maono huona. Kupunguza ukubwa hutumia `sharp`, iliyopakiwa kupitia uingizaji wa nguvu: kwenye jukwaa ambapo binary yake asili inashindwa kupakia, `normalizeDataUri()` **haileti kosa kamwe** — inarudi kwenye upitishaji wa baiti asili, kwa hivyo njia ya ubadilishaji wa maelezo/base64 huendelea kufanya kazi kila wakati. Baiti zisizo za picha (upatikanaji ambao haukurejesha picha inayoweza kusimbuliwa) pia hupitishwa bila kuguswa. Urekebishaji huu unalenga picha ambazo daraja huchukua kwa simu yake ya kujitegemea — haitumiki kamwe kwa mzigo wa malipo wa mpigaji, kulingana na kanuni ya mabadiliko ya kuchagua tu (Kanuni Ngumu #20).

#### Mpangilio wa mipangilio + uhamiaji

Funguo mpya za `modalityBridge*` zimethibitishwa na Zod katika `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, kundi la `modalityBridgeCache*`, na kundi la `modalityBridgeAudio*` linalotumiwa na Daraja la Sauti. Uhamiaji `141_modality_bridge_settings.sql` unakili thamani zilizopo za `visionBridge*` za zamani kwenye funguo mpya zinazolingana (idempotent, haibadilishi kamwe thamani ya `modalityBridge*` iliyowekwa na opereta); funguo za zamani hubaki kukubalika kama mbadala wa kusoma kwa mzunguko mmoja wa toleo.

#### Kichwa cha uwazi + takwimu

Majibu yaliyobadilishwa na maelezo hubeba `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (iliyojengwa na `buildModalityBridgeHeader()` katika `modalityBridge/bridgeStats.ts`, iliyowekwa muhuri na `withModalityBridgeHeader()` katika `src/sse/handlers/chatHelpers.ts`). Maombi yaliyoelekezwa upya hayapati kichwa chochote — mzigo wa malipo haukuguswa na ubadilishaji wa modeli tayari unaonekana kwenye sehemu ya `model` ya mwili wa jibu.

`GET /api/modality-bridge/stats` (uthibitishaji wa usimamizi, kiwango sawa na `GET /api/settings`) hurejesha vihesabio vya ndani ya kumbukumbu kwa kila hali `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` kwa `vision`, `audio`, na `video`. `averageLatencyMs` hutumia `latencySamples`, si majaribio yote, kama kigawanyo chake; operesheni isiyo na muda haitengenezi sampuli ya milisekunde sifuri. `bridged` inabaki kuwa jina mbadala linaloendana na matoleo ya nyuma kwa ubadilishaji uliofanikiwa; majaribio yaliyoshindwa hayaliongezi. Vihesabio huwekwa upya wakati mchakato unapoanzishwa upya kwa muundo (telemetry, si uhasibu).

#### Usanidi wa Dashibodi

Ukurasa maalum wa dashibodi ni
`/dashboard/settings/modality-bridge`. Vichupo vyake vya `Vision`, `Audio`,
na `Video` vinavyoweza kushughulikiwa na URL huhifadhi vigezo vya hoja wakati wa kubadilisha thamani ya `tab`.
Kichupo cha Vision kinaonyesha uwezeshaji, hali, uteuzi wa modeli (pamoja na
chaguo-msingi otomatiki), uombaji unaozingatia kazi, mipaka ya juu ya muda/picha/urefu wa maelezo/kache,
vihesabio vya wakati wa kukimbia, na ombi la sampuli lililolindwa. Kichupo cha Audio pia kiko hai: kinaonyesha
uwezeshaji, kiteua modeli cha STT-pekee chenye Auto, mipaka ya muda/klipu ya juu, vihesabio vya sauti,
na jaribio la sampuli la `input_audio`. Kichupo cha Video kinafanya kazi: kinaripoti
hali ya wakati wa kukimbia ya FFmpeg/ffprobe — mojawapo ya hali nne za wazi za UI (`unknown` wakati
uchunguzi unaendelea au haukuweza kukamilika, `restricted` kwenye mwenyeji wa dashibodi isiyo ya loopback
ambapo uchunguzi unarukwa upande wa mteja, `unavailable` mara tu baada ya kuchunguzwa
na kuthibitishwa kukosekana, au `available` na matoleo ya FFmpeg/ffprobe) — huendeleza
mipaka ya kuwezesha/modeli/fremu/video/muda, huchuja kiteua modeli kwa modeli zenye uwezo wa kuona,
na huonyesha vihesabio vya video.

Kadi ya zamani ya Vision Bridge chini ya mipangilio ya AI ni kiungo cha utangamano kwa
ukurasa mpya; haimiliki tena nakala ya pili ya fomu. Watoa Huduma za Media pia
huunganisha mtiririko wa kazi wa Image-to-Text na Speech-to-Text kwenye vichupo vinavyolingana vya Modality
Bridge bila kuondoa uwanja wa michezo uliopo wa Speech-to-Text.

**Kupita kwa kukubali kujirudia:** wakati simu ya kuelezea inapitia
`/v1` ya OmniRoute yenyewe (modeli isiyo ya kawaida ya mtoa huduma), ombi dogo hutuma
`x-omniroute-admission-bypass: internal` na inathibitishwa na kitambulisho cha kujirudia kilichotatuliwa
— `sk_omniroute` ya ndani katika hali ya ndani, au `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` iliyosanidiwa na opereta
( #1350) ili usambazaji wa `REQUIRE_API_KEY=true` bado uweze kuendesha simu ya kuelezea.
Kupita kunazingatiwa tu kwa vitambulisho hivyo halisi, kwa hivyo wateja wa nje hawawezi kutumia
kichwa kuruka kukubali.

Chaguo-msingi za urithi zipo katika `src/shared/constants/visionBridgeDefaults.ts`;
chaguo-msingi mpya za hali/kazi-fahamu/kache na kirekebisha mipangilio zipo katika
`src/shared/constants/modalityBridgeDefaults.ts`. Kinga inaonyesha
chaguo la mjenzi wa `deps` ili majaribio yaweze kuingiza utekelezaji bandia wa `getSettings` na
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Inazuia maombi ya gumzo yenye sauti kabla hayajafikia lengo ambalo halijulikani
kukubali ingizo la sauti. Haiwahi kuelekeza upya ombi la gumzo: sehemu za sauti
zinanakiliwa kupitia sehemu ya mwisho ya multipart inayolingana na OpenAI na
modeli ya gumzo iliyochaguliwa inaendelea na nakala za maandishi.

Mtiririko:

1. Tatua `supportsAudio` kupitia `getResolvedModelCapabilities()`. Metadata ya rejista ya mtoa huduma
   iliyoelezwa wazi inashinda, kisha metadata ya modeli tuli, kisha `modalities_input` iliyosawazishwa.
   Orodha ya ingizo iliyotangazwa bila `audio` ni `false`; hakuna ushahidi wa uwezo unabaki `null`.
   Zote `false` na `null` huwasha daraja la kihafidhina, wakati `true` inalipita.
2. Tatua mipangilio ya `modalityBridgeAudio*` na toa sehemu za sauti za kiwango cha juu zinazoweza kuunganishwa
   kutoka kila ujumbe kupitia kigunduzi cha `detectMediaParts()` kilichoshirikiwa. Maumbo ya waya yanayoungwa mkono
   ni OpenAI `input_audio`, `audio_url`, na `source.media_type: "audio/*"`. Sauti iliyowekwa ndani
   inagunduliwa kwa kuelekeza lakini haiondolewi na njia ya kuunganisha. Kazi imefungwa na
   `modalityBridgeAudioMaxClips`; sehemu za baadaye zinabaki bila kuguswa.
3. Heshimu `provider/model` iliyosanidiwa, au ruhusu `selectAudioBridgeModel()` kutembea
   `AUDIO_TRANSCRIPTION_PROVIDERS` kwa mpangilio thabiti wa katalogi na kuchagua
   modeli ya kwanza yenye kitambulisho cha mtoa huduma kinachoweza kutumika.
4. `callAudioTranscription()` hubadilisha sauti ya base64/data-URI kuwa `file` ya multipart,
   au hupakua `audio_url` ya mbali kupitia kinga ya nje ya umma pekee na DNS pinning
   na kikomo cha MB 25. Kisha inatuma faili na modeli iliyochaguliwa kwa
   `/v1/audio/transcriptions` ya ndani, iliyothibitishwa na `resolveSelfLoopBearer()`.
   Njia iliyopo ya kunakili hufanya utafutaji wa kawaida wa kitambulisho, utunzaji wa
   cooldown/rate-limit, na usambazaji wa mtoa huduma.
5. Simu zilizofanikiwa hubadilisha sehemu zao na `[Audio N]: <transcript>`. Simu
   zinaendeshwa na `Promise.allSettled`: kushindwa kwa mtu binafsi huhifadhi sehemu hiyo ya asili
   ya sauti (mkataba wa #4012). Ikiwa kila simu itashindwa na lengo limethibitishwa
   `supportsAudio === false`, sehemu hizo zinakuwa
   `[Audio N]: (unavailable — no STT provider connected)` (mkataba wa #8430). Kwa
   lengo lisilojulikana (`null`), matokeo ya kushindwa yote yanabaki bila kuguswa. Lengo
   lililothibitishwa la maandishi pekee lisilo na kitambulisho cha STT kinachoweza kutumika hupokea
   stub sawa wazi bila kutoa simu ya mtandao.

Nakala zilizofanikiwa hutumia kache ya Modality Bridge LRU/TTL ya mchakato mzima.
Ufunguo unachanganya rejeleo la sauti, lebo thabiti ya operesheni ya `audio-transcription`,
na modeli ya STT iliyochaguliwa; kushindwa hakuhifadhiwi kamwe. Majaribio ya sauti husasisha
vihesabio vya `bridged`, `cacheHits`, `failures`, na `lastUsedAt` vilivyoshirikiwa.
Majibu yaliyobadilishwa hubeba
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; maombi
yasiyoguswa hayapokei sehemu ya Audio Bridge.

Mipangilio ya wakati wa kukimbia inaungwa mkono na DB na imethibitishwa na Zod:

| Ufunguo                       | Chaguo-msingi | Masafa         |
| ----------------------------- | ------------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —              |
| `modalityBridgeAudioModel`    | `""`          | Auto au STT ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10           |

Kache iliyoshirikiwa inabaki kudhibitiwa na `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Inazuia sehemu za video za kiwango cha juu katika `messages` za Chat Completions na `input` ya Responses API kabla ya kulengwa bila usaidizi asilia wa video kujulikana kuitwa. Maumbo yanayotumika ni `input_video`, `video_url`, `video_source`, URL za HTTPS, na URI za data `data:video/*;base64,...`. Majina ya faili ya kawaida katika maandishi hayachukuliwi kama video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) inamiliki upitaji wa ombi, ukaguzi wa uwezo/sera, ujumlishaji wa kila ombi, na mzigo wa majibu. Kazi ya kila video — upatikanaji, akiba ya matokeo yote, kuelezea mlolongo wa fremu (ambayo huunganisha nakala yoyote ya sauti iliyotangazwa na mpigaji), na vipimo/kukatisha/kusafisha kwa kila jaribio — imefichwa nyuma ya `processVideoPart` katika `videoBridgePipeline.ts`, inayoitwa mara moja kwa kila sehemu ya video ndani ya kitanzi cha `preCall`. Moduli hiyo pia inafafanua mipaka ya bandari wazi `VideoMediaBrokerPort` (kupata baiti na kutoa fremu zilizochukuliwa), `VideoAudioTranscriptionPort` (kuunganisha nakala ya sauti iliyotangazwa na mpigaji na manukuu yaliyochukuliwa), na `VideoDrilldownPort` (mpaka wa kudumu wa uchunguzi wa fremu; bado haujaunganishwa kwenye `processVideoPart` — ni njia tofauti ya `/api/modality-bridge/video/drilldown` pekee inayoandika viingilio vya uchunguzi leo).

Njia ya ombi ya umma `/v1` haileti au kuita mchakato mdogo kamwe. Video za mbali zinapakuliwa chini ya kikomo cha 50 MiB; video za `base64` za ndani zina kikomo cha 36 MiB kilichosimbuliwa kwa kila video ili bahasha ya modeli/ujumbe/fremu iweze kubaki ndani ya kikomo cha kukubali ombi la umma la JSON cha 50 MiB. Urefu wa ndani na makadirio ya ukubwa uliosimbuliwa huangaliwa kabla ya ugawaji. HTTPS inahitajika kwenye URL ya awali ya mbali na kila uelekezaji upya, kwa kutumia ulinzi uliopo wa nje wa umma pekee na `DNS pinning`. Baiti kisha huvuka mpaka halisi wa ndani wa `POST /api/modality-bridge/video/extract` wa broker. Njia hiyo ni `LOCAL_ONLY` na `SPAWN_CAPABLE`, inakubali tu ombi lililothibitishwa kwa kila mchakato, la `trusted-loopback`, na haikubali kamwe URL, njia ya mfumo wa faili, inayoweza kutekelezwa, au orodha ya hoja. Bomba la ukubwa wa mwili wa API na kisomaji cha mwili kinachoongezeka cha kishughulikiaji hutekeleza kwa kujitegemea kikomo cha uingizaji cha broker cha 50 MiB. Foleni yake yenye mipaka huendesha uchimbaji mmoja kwa wakati mmoja, inaruhusu kazi nne zinazosubiri, na inaweka kikomo cha uingizaji unaosubiri kwa 100 MiB.

Ndani ya broker, `ffprobe` inasoma faili ya ndani ya faragha; orodha ya ruhusa ya umbizo maalum haijumuishi umbizo za orodha za kucheza na manifest. Kwa kontena zinazoruhusiwa za `MOV-family`, marejeleo ya data ya nje ya `MOV` hubaki yamezimwa kwa chaguo-msingi, na amri maalum haichagui kuyatumia. `ffprobe` na `ffmpeg` zote hutumia orodha nyeupe ya itifaki ya `file`-only, uzi mmoja, safu za hoja maalum, hakuna shell, na zinazoweza kutekelezwa zinazotatuliwa kutoka `PATH`. Mitiririko ya jalada ya picha iliyoambatishwa si wagombea wanaoweza kuchezwa. Mitiririko yote inayoweza kuchezwa lazima itimize vikomo, na mtiririko chaguomsingi wazi unapendelewa kabla ya kurudi nyuma kwa index ya chini kabisa. Video zimepunguzwa hadi sekunde 600, pikseli 8,192 kwa kila mwelekeo, na pikseli chanzo 33,554,432. `FFmpeg` huchukua sampuli za fremu za `JPEG` za katikati 1–16, hupunguza ukingo mrefu hadi pikseli zisizozidi 1,024 bila kukuza pembejeo ndogo, na haipokei kamwe URL. Sampuli ni `uniform` kwa chaguo-msingi. Sera za hiari za `scene_aware` na majaribio ya `segment_aware` hufanya pasi moja ya ziada ya `FFmpeg` juu ya mtiririko wa ndani uliothibitishwa tayari, huchagua mihuri ya muda ya `showinfo` yenye mipaka, na kurudi nyuma kwa uhakika kwenye sehemu za katikati zinazofanana za `uniform` ikiwa kigunduzi kitashindwa, muda kuisha, matokeo mabaya, au seti tupu ya wagombea. Hali ya `segment-aware` inagawa sampuli za katikati sawia na vipindi vya eneo vilivyothibitishwa; ushahidi wa `segment-aware` na tabia ya kurudi nyuma imeelezwa kwa undani hapa chini. Kikomo kigumu cha fremu 16 kinatumika baada ya uteuzi katika kila sera. Ombi la `scene-aware` linapokuwa na bajeti ya fremu moja tu, hutumia sehemu ya katikati ya `uniform` ya video kamili inayotumika au dirisha la kuzingatia na huripoti `policyEffective: uniform`: fremu moja iliyochaguliwa ya eneo haiwezi kuhifadhi ncha zote mbili za muda. Mpiga simu anaweza kwa hiari kutoa dirisha la kuzingatia lenye kikomo (sekunde `start`/`end`); mipaka imebanwa kwa muda wa media, madirisha yaliyogeuzwa au yasiyo na kikomo yanakataliwa, na sera zote za sampuli hufanywa tu ndani ya muda uliorekebishwa. Dirisha linalotokana linajumuishwa katika metadata ya sampuli na katika kiambishi awali cha maelezo kisichoaminika ili modeli za chini ziweze kutofautisha dondoo iliyolengwa kutoka kwenye ratiba kamili.

Kuzingatia manukuu ya kisemantiki ni mpangilio tofauti, wazi. Hali chaguomsingi ya uchambuzi `full` huhifadhi kidokezo cha fremu kilichopo na haipeleki kamwe maandishi ya ombi kwa modeli ya manukuu. Katika hali ya `focused`, daraja husoma tu `text`/`input_text` ya hivi punde isiyo tupu iliyoandikwa na mtumiaji kutoka kwenye Chat au kontena la Responses, inairekebisha kuwa NFC, huangusha herufi za udhibiti na nafasi nyeupe, na kuiwekea kikomo cha `Unicode code points` 500. Matokeo tupu hurudi nyuma kwenye kidokezo halisi cha `full`. Kidokezo kinachoweza kutumika huwekwa katika mfuatano kama JSON katika kizuizi maalum cha `untrusted-user-context` na kinaweza tu kuweka kipaumbele maelezo yanayoonekana; hakiwezi kubatilisha onyo tofauti dhidi ya kufuata maagizo yanayoonekana au kusikika kwenye media. Kuzingatia maandishi hakudhani kamwe `start`/`end` au kubadilisha sampuli ya muda.

#### FU-07 ushahidi wa sehemu ya kimuundo

`segment_aware` inatumia pasi moja ya uchambuzi wa awali yenye mipaka juu ya mtiririko wa video wa ndani uliothibitishwa tayari. Mlolongo wa vichujio maalum kwanza hupunguza ukubwa hadi pikseli zisizozidi 320 kwa upana, hugundua mabadiliko ya eneo na vipindi vilivyoganda, kisha huchukua sampuli kwa fremu 1 kwa sekunde kwa ukungu, `luma` ya wastani, na habari ya anga/muda. Pasi hiyo imepunguzwa kwa sampuli za kimuundo 600, uzi mmoja wa `FFmpeg`/kichujio, itifaki sawa ya `file`-only na orodha za ruhusa za kontena, kikomo cha 1 MiB cha matokeo ya mchakato, na sekunde zisizozidi 30 ndani ya kukatisha/muda wa mwisho wa broker. Haikubali kamwe amri, kichujio, njia, au URL kutoka kwa ombi.

Thamani za kimuundo ni ushahidi wa sampuli za kuamua, si uelewa wa video wa kisemantiki. Hazihusishi masomo, vitendo, manukuu, hotuba, au nia ya mtumiaji. Mipaka ya eneo na kuganda huunda sehemu; kufunika kwa kuganda, ukungu, mwangaza, maelezo ya anga, na mabadiliko ya muda huathiri tu jinsi bajeti ya fremu 1-16 iliyopo inavyotengwa. Sehemu iliyoganda kabisa imewekwa kikomo kwa fremu moja, wakati sehemu zisizoganda zinashindana kwa bajeti iliyobaki. Wakati mipaka inazidi fremu, kufunika sare ya ratiba huhifadhiwa ili kupunguzwa kwa haraka mapema kusiweze kuficha sehemu ndefu inayofuata. Mipaka ya eneo ndani ya azimio la sekunde 1 la uchambuzi wa mpaka wa kuganda huunganishwa.

Kukosekana kwa vichungi, ushahidi usio sahihi/tupu, hitilafu ya kigunduzi, au muda uliowekwa wa uchambuzi wa awali hushindwa kufungua kwa sera kamili ya katikati sare. Ubatilishaji wa mpigaji simu au makataa ya broker haishindwi kufungua: inamaliza mchakato mdogo unaoendelea, inazuia uchimbaji wa fremu baadaye, na mti wa muda wa faragha huondolewa katika `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` inazalisha vifaa halisi vya FFmpeg vya kuamua kwa ajili ya akiba ya simu za manukuu baada ya kuondoa marudio, ugawaji wa bajeti ya mwendo mnene, ushahidi wa ukungu/mwangaza/SI-TI, kupunguzwa kwa haraka na mkia mrefu, na chanya za uwongo za kufifia polepole. Inarekodi muda wa ukuta wa uchambuzi wa awali na, ambapo `/usr/bin/time` inapatikana, CPU ya mtoto na RSS ya kilele. Ukaguzi wake wa ubora ni oracles za kimuundo tu. Ubora halisi wa modeli ya manukuu unabaki `HOLD` kwa sababu kifaa hiki hakina kituo cha mwisho kilichoidhinishwa au jaji aliyeganda. Akiba ya kifedha pia inabaki `HOLD` isipokuwa `--caption-cost-per-call-usd` inatoa makadirio chanya ya wazi kwa kila simu; hati haitengenezi matokeo yoyote.

Kila fremu imepunguzwa hadi 4 MiB, fremu zote ghafi pamoja hadi 23 MiB, na jibu la broker lililobadilishwa kuwa 32 MiB. Saraka ya muda ya faragha huondolewa katika `finally`. OmniRoute haijumuishi FFmpeg na haikubali njia maalum ya kutekeleza. Kabla ya kunukuu, daraja hutumia upitishaji wa kihafidhina wa kuondoa marudio ya kuona: kila JPEG inapunguzwa kuwa bafa ya kijivu ya 16x16 na inalinganishwa tu na fremu ya mwisho iliyohifadhiwa. Kwa bajeti ya manukuu iliyoombwa zaidi ya fremu moja, uchimbaji hutoa bwawa la wagombea lililowekwa kikomo hadi mara mbili ya bajeti hiyo na kamwe si zaidi ya fremu 16. Kikomo kilichoombwa kinatumika tu baada ya kuondoa marudio, na wagombea wa kwanza na wa mwisho waliochaguliwa huhifadhiwa wakati wa kupunguza mwisho wakati bajeti ni angalau mbili. Sera ya `grayscale-16x16-mean-cells-v2` iliyoboreshwa hutumia kubwa zaidi ya delta ya luma ya wastani na uwiano wa seli za vijipicha ambazo delta yao iliyorekebishwa ni angalau 0.05. Kizingiti cha marudio ni mara kwa mara 0.04, kilichochaguliwa kwa utabiri badala ya kufichuliwa kama mpangilio wa wakati wa kukimbia. Ishara hii ya pili ya utofautishaji wa juu huhifadhi mwendo mdogo na mabadiliko ya maandishi yanayoonekana ambayo kulinganisha kwa wastani tu kunaweza kuficha. Hitilafu za kulinganisha au avkodare hushindwa kufungua na kuweka chanjo. Metadata ya pato hutenganisha wagombea waliochimbwa, fremu zilizotumiwa kwa mafanikio, na marudio ya kuona yaliyodondoshwa.

Sehemu ya video iliyowekwa alama wazi inaweza kuomba karatasi ya mawasiliano iliyowekwa muhuri wa muda. Daraja huunda gridi ya JPEG ya safu 4, fremu 16. Kila seli ya pikseli 512 huwasha muhuri wake wa muda wa chanzo kwenye bendi ya chini yenye utofautishaji wa juu, wakati muhuri huo wa muda unabaki kwenye metadata ya maandishi kwa ushirikiano na ukaguzi wa chini. JPEG kamili inabaki imepunguzwa hadi 32 MiB. Ikiwa `sharp` haiwezi kusimbua au kuunda gridi, daraja hurudi kwenye fremu za JPEG za kibinafsi; ubatilishaji wa mteja bado huenea kupitia operesheni ya karatasi.

Ushahidi wa kukuza umetenganishwa kwa makusudi na microbenchmark ya utunzi wa synthetic. `scripts/perf/video-bridge-contact-sheet-eval.ts` inafafanua kifaa cha A/B kilichoboreshwa kwa mifano halisi ya maono inayolingana na OpenAI. Inapima tokeni zilizoripotiwa na mtoa huduma, muda wa mwisho hadi mwisho wa ukuta (pamoja na utunzi wa karatasi), hesabu ya simu za modeli, na uhifadhi wa ukweli uliofafanuliwa na manifest. Majibu ghafi ya modeli hayaandikwi kwenye ripoti; ni SHA-256 digests tu na vitambulisho vya ukweli vilivyolingana vinavyohifadhiwa. Kifaa hakifanyi simu ya mtandao au ya kulipia isipokuwa `--execute-real` imepitishwa na `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY` zimepangwa. Bila utekelezaji huo halisi wa wazi, uamuzi wake unaoweza kusomwa na mashine unabaki `HOLD`; vipimo vya malipo/hesabu ya simu pekee si ushahidi wa kukuza.

Wapiga simu wanaweza kuambatisha safu ya hiari ya `transcript.cues` kwenye sehemu ya video inayotumika wanapokuwa tayari na maandishi yaliyopangiliwa. Kila cue lazima iwe na `text`, muda wa `start`/`end` usio na kikomo ndani ya muda uliopimwa, na `source` iliyoidhinishwa (`client`, `embedded`, au `audio-bridge`); `confidence` inatokana na `1` na lazima ibaki kati ya `0` na `1`. Cues zinazofanana kabisa huunganishwa. OmniRoute haianzi kamwe unukuzi kutoka kwa metadata hii: cues zilizothibitishwa zinanakiliwa kwenye matokeo yaliyoelezwa na chanzo, uaminifu, na muda, na huonyeshwa kama uchunguzi usioaminika pamoja na manukuu ya fremu. Maandishi yasiyo sahihi, nje ya masafa, au yasiyo na asili yanakataliwa badala ya kuchanganywa kwenye mkondo wa manukuu. Sehemu ya `source` kwa sasa inatangazwa na mpigaji simu, si kuthibitishwa na seva: OmniRoute inahakikisha kuwa thamani ni mojawapo ya nyuzi tatu zinazoruhusiwa, lakini bado haithibitishi kwa njia ya kriptografia kwamba lebo ya `embedded` au `audio-bridge` ilitoka kwa uchimbaji unaomilikiwa na seva. Chukulie `source` kama kidokezo kisichoaminika hadi uthibitishaji huo utakapofika; usijenge maamuzi ya idhini juu yake.

Mpigaji simu wa hali ya juu anaweza kutoa wimbo wa `audioTranscript` ulioidhinishwa tayari
kwa video hiyo hiyo. Mshono wa muunganisho huendesha uchunguzi wa kuona na sauti chini ya
tarehe ya mwisho moja na ishara ya kughairi, huyaagiza kwenye ratiba ya kawaida, huanguka
nakala halisi, na huripoti matokeo ya sehemu wakati upande mmoja tu umefaulu.
`audioTranscript` batili hudhoofika hadi matokeo hayo ya sehemu — maelezo ya kuona
yanahifadhiwa na tawi la sauti hurekodi msimbo wa kushindwa uliosafishwa —
badala ya kushindwa video nzima. Upatikanaji wa kila tawi, bendera ya sehemu,
na misimbo ya kushindwa iliyosafishwa huhifadhiwa katika matokeo yaliyoelezwa, katika
metadata ya ulinzi (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), katika metadata ya kache ya matokeo, na katika kaunta za
muunganisho wa daraja. Njia chaguomsingi ya Daraja la Video haitumii hotuba-kwa-maandishi
au kupakua nakala ya pili ya media; bila wimbo huo wazi, inabaki
video-pekee.

**Uhifadhi wa nakala (#12150 P1).** Hii inatumika kiotomatiki wakati wowote
Daraja la Video (lenyewe la hiari) linapotoa kidokezo cha nakala — hakuna bendera tofauti
ya uhifadhi. Ombi linapotoa kidokezo chochote cha nakala (kilichotangazwa na mpigaji simu
`transcript` au `audioTranscript` iliyounganishwa), ulinzi huweka alama
`videoBridgeObserved` na hutoa kivuli kilichofichwa cha maelezo ya video —
utendaji sawa ambapo mwili wa maandishi huru wa kila kidokezo hubadilishwa na
`[redacted-video-transcript]`, iliyoundwa kwa kubadilisha sehemu ya kidokezo iliyopangwa
kabla ya kamba kuunganishwa (kamwe kwa kuchambua maandishi yaliyopunguzwa, kwa hivyo hakuna
maudhui ya kidokezo — ya uhasama au ya kawaida, ikiwa ni pamoja na miili iliyo na `]` kama vile
`[inaudible]`/`[music]` — yanaweza kuishi). Mwili wa ombi la kumbukumbu ya simu iliyohifadhiwa hubadilisha
kila sehemu ya maandishi inayotokana na video kwa kivuli hicho kilichofichwa, kinacholingana na usawa wa maudhui;
nanga ya `fullText` inasomwa upya kutoka kwa malipo ya ulinzi ya kabla ya simu yaliyokamilika,
kwa hivyo mechi bado inafaulu baada ya walinzi wa mnyororo wa baadaye (PII na
maskers za sifa, vipaumbele 10/95) kuandika upya maandishi ya maelezo mahali pake na
baada ya mfumo-haraka/kukabidhi/sindano ya kumbukumbu kurekebisha safu ya ujumbe.
Mwili uliotumwa juu kwa mfano haujabadilika. Ombi lililozingatiwa pia halijazi
Kumbukumbu ya kudumu (uchimbaji unaotokana na ombi na majibu hurukwa),
kwa hivyo jibu la mfano haliwezi kurudia maandishi ya nakala kwenye Kumbukumbu.

Nakala za ziada zilizohifadhiwa hutumia ishara sawa ya ombi lililozingatiwa.
Picha ya mteja-ombi ya kabla ya ulinzi, ombi linalosubiri kwenye kumbukumbu, na
kumbukumbu ya ombi lililokataliwa mapema hubadilisha sehemu za nakala katika sehemu za video;
vidokezo vya kamba vilivyoundwa na hatua za bomba na kukabidhi muktadha hufichwa
kwenye sinki la mwili wa ombi lililohifadhiwa. Alama ya `video_content_removed` iliyohifadhiwa
hufanya mwendelezo wa `previous_response_id` ushindwe kufungwa badala ya kujenga upya
maandishi yaliyotupwa kimakusudi. Ikiwa ombi lililozingatiwa litapoteza
kivuli chake cha kuficha sehemu kabla ya kuingia, au hata moja ya vivuli kadhaa vya video
itashindwa kulingana baada ya mabadiliko ya ombi ya baadaye, mwili wa ombi uliohifadhiwa
huachwa kabisa badala ya kuhifadhi nakala iliyofichwa kwa sehemu.

Kwa ombi lililozingatiwa, jibu la mfano linaweza kunukuu sehemu yoyote ya
nakala bila mpaka wa kidokezo uliopangwa. Kumbukumbu yake ya simu iliyohifadhiwa
`responseBody` kwa hivyo hubadilishwa na alama ya kuacha;
artifact ya bomba ya kina (ambayo inaweza kujumuisha miili ya juu/mteja na vipande vya mkondo)
haihifadhiwi. Kache za semantic, idempotency, na uchezaji wa hoja hupita
kusoma na kuandika kwa ombi hilo. Ombi la mtoa huduma na
jibu linaloonekana kwa mteja hubaki bila kubadilika. Bait za keepalive za mapema
hutolewa kutoka kwenye bafa ya muda wakati artifact ya kina imeondolewa.
Onyo la Kiro la EventStream lililoundwa vibaya huripoti tu idadi ya bait za malipo,
kamwe maudhui yake au kosa ghafi la mchambuzi wa JSON.
Hii haidai kwamba kila utambuzi usiohusiana wa mtoa huduma/programu-jalizi umekaguliwa;
ufagio mpana wa sinki iliyohifadhiwa unafuatiliwa katika #11658.

Mzunguko wa maisha wa ndani wa `/api/modality-bridge/video/drilldown` ni
substrate tofauti ya kache inayorudi nyuma/iliyothibitishwa kwa tokeni. Kila operesheni
pia inahitaji kitambulisho cha mkuu kisichoeleweka. Kabla ya mpigaji simu wa uzalishaji
kuwezeshwa, lazima atoe kitambulisho hicho kutoka kwa mpangaji aliyethibitishwa na
kamwe asisambaze thamani iliyochaguliwa na mteja. Funguo za kache huunganisha
mkuu huyo na vitambulisho vya kikao na marejeleo ya video, huhifadhi tu
funguo zao zinazotokana na SHA-256, na hupunguza usomaji na ufutaji kwa
mkuu huyo huyo. Kache huhifadhi fremu za JPEG zisizozidi 16 zilizotokana kwa kila
ingizo, huzimaliza baada ya dakika kumi, na inasaidia usomaji wa `start`/`end`
uliofungwa au ufutaji wa kikao wazi.

Kila mkuu ana kikomo cha ingizo 16 na 64 MiB ya data ya JPEG ya kawaida.
Vikomo hivyo vinajitegemea kutoka kwa kikomo cha jumla cha ingizo 64/256 MiB:
shinikizo la kiasi cha mkuu huondoa tu ingizo za mkuu huyo zilizotumika hivi karibuni
kabla ya kuzingatiwa uondoaji wa LRU wa jumla. Ingizo zilizomalizika muda wake
huondolewa kutoka kwa uhasibu wa mkuu na wa jumla kwenye shughuli za kache,
wakati kughairi na kushindwa kwa uthibitishaji hakuhusishi uingizwaji wa sehemu.

Kache inakataa Base64 isiyo ya kawaida, padding ya ziada, media isiyo ya JPEG, JPEG zilizoundwa vibaya au
zilizokatwa, na JPEG zinazotoa onyo wakati wa upunguzaji wa `sharp` wa picha kamili.
Inaweka upya kila picha iliyokubaliwa kama JPEG ya kawaida, hutoa upana na urefu
kutoka kwa bait zilizopunguzwa badala ya kuamini sehemu za mpigaji simu, na hutupa
bait zozote za polyglot zinazofuata badala ya kuzihifadhi. Ni bafa iliyobanwa ya kawaida
iliyobanwa tu ndiyo inayotozwa kwa kiasi chote. Kikomo cha waya cha JSON kinajumuisha
gharama ya Base64 kwa kikomo cha 32 MiB cha ingizo lililopunguzwa. Kila
derivation iliyohifadhiwa hurekodi umbizo/azimio lake la JPEG lililothibitishwa, sera ya sampuli,
toleo la derivation, wakati wa kuunda, hash ya maudhui iliyohesabiwa na seva, na hash ya
marejeleo ya mzazi pamoja na hash ya maudhui ya mzazi ya mpigaji simu anayeaminika.
Kughairi huangaliwa kati ya awamu za upunguzaji/hash zisizolingana kabla ya ahadi ya kache ya atomiki.

Kipande hiki bado hakiunganishi mzalishaji wa uzalishaji kwenye njia na hakitoi uteuzi wa lahaja za azimio nyingi. Njia ya ombi ya Video Bridge iliyo wazi kwa hivyo haileti kazi ya ziada, wakati upatikanaji wa mkuu unaofungamana na mpangaji na mzunguko kamili wa maisha wa azimio nyingi wa FU-08 unabaki kuwa kazi ya wazi ya kufuatilia badala ya kuandikwa kama tabia kamili.

Muafaka huwekewa maelezo mfululizo kwa kutumia modeli ya Video iliyosanidiwa. Ubatilishaji tupu wa Video hurithi mpangilio wa Vision; ikiwa zote mbili ni tupu, kipanga njia kiotomatiki cha Vision huchagua modeli yenye uwezo wa kuona inayofaa. Maelezo mafupi yaliyofanikiwa hubadilisha sehemu asili na kiambishi awali thabiti cha `[Video description:` ambacho pia huweka alama kwenye maandishi kama uchunguzi usioaminika uliotokana na media na huambia modeli za chini zisifuate maagizo yaliyopatikana kwenye media. Funguo za akiba za maelezo ya fremu hujumuisha baiti za JPEG, kidokezo, muhuri wa muda, na modeli inayofaa; maelezo mafupi yaliyofanikiwa pekee ndiyo huwekwa kwenye akiba. Viingilio vya akiba huhifadhi modeli halisi ya mzalishaji iliyofanikiwa, ikijumuisha modeli mbadala; daraja huripoti `mixed` wakati fremu tofauti zilitolewa na modeli tofauti. Hit ya akiba hutumia tena utambulisho huo wa mzalishaji badala ya kuuweka lebo upya kama mpango wa uelekezaji ulioombwa. Akiba ya matokeo ya video nzima huwekwa funguo kwa kila ingizo linalobadilisha matokeo — kidokezo, modeli inayofaa, sera ya sampuli, idadi ya fremu, hali ya uchambuzi wa kisemantiki, alama ya kidole ya SHA-256 ya kidokezo cha umakini kilichorekebishwa, dirisha la umakini, `transcript`, `audioTranscript`, na bendera ya karatasi ya mawasiliano — kwa hivyo kubadilisha kipimo chochote kati ya hivyo ni kukosa akiba, kamwe si matumizi tena yaliyopitwa na wakati. Toleo la sera ya kuondoa marudio ya kuona, kizingiti, na idadi ya fremu-mgombea zilizowekewa mipaka pia ziko wazi katika funguo ya akiba ya matokeo na metadata; mabadiliko ya sera kwa hivyo hayawezi kutumia tena maelezo ya video nzima yaliyopitwa na wakati. Metadata ya akiba ya matokeo v4 huhifadhi hali na alama ya kidole, kamwe si kazi halisi ya mtumiaji. Metadata ya Guardrail huripoti hali zote mbili za uchambuzi zilizoombwa na zinazofaa; hali ya `focused` iliyoombwa bila maandishi ya mtumiaji yanayoweza kutumika huripotiwa kama `full`.

Guardrail hutoa kila sehemu ya video inayotumika lakini haielezi zaidi ya `modalityBridgeVideoMaxVideos`. Kwa lengo lililothibitishwa kuwa na `supportsVideo === false`, video zilizoshindwa na zilizozidi kikomo huwa alama wazi za maandishi salama ili hakuna video ghafi inayobaki. Wakati uwezo haujulikani, sehemu hizo hubaki bila kuguswa. Malengo yenye `supportsVideo === true` hupita daraja. Ishara ya kughairi ombi la mteja huenea kupitia upakuaji, foleni ya broker, michakato midogo, na simu za maelezo; kughairi husitisha kati ya video na kamwe hakushindwi kufunguka kwa media ghafi.

Mipangilio ya wakati wa utekelezaji inaungwa mkono na DB na imethibitishwa na Zod:

| Ufunguo                             | Chaguomsingi | Masafa / tabia                                                                                                          |
| :---------------------------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Wakati wa utekelezaji wa hiari, chagua kuingia                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` huhifadhi maelezo ya jumla; `focused` hutumia muktadha wa mtumiaji wa hivi karibuni, usioaminika, ulio na mipaka |
| `modalityBridgeVideoModel`          | `""`         | Hurithi modeli ya Vision Bridge                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware`, au `segment_aware` sawia; kushindwa kwa kigunduzi hurudi kwenye `uniform`                     |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                          |

Thamani za muda wa Video zilizohifadhiwa za zamani zaidi ya sekunde 120 hupunguzwa hadi muda wa mwisho wa broker; uandishi mpya wa mipangilio zaidi ya kikomo hicho hukataliwa. `GET /api/modality-bridge/video/runtime` inahitaji eneo la kuaminika la loopback lililowekwa muhuri kabla ya uthibitishaji au uchunguzi wa wakati wa utekelezaji, kisha inahitaji uthibitishaji wa usimamizi. Inarudisha tu `available`, matoleo yaliyosafishwa ya FFmpeg/ffprobe, na sababu maalum wakati wakati wa utekelezaji haupatikani. Sehemu ya mwisho ya uchimbaji wa ndani si API ya upakiaji ya umma: msongamano wa foleni hurudisha `503` pamoja na `Retry-After`, kukatika kwa mpigaji hurudisha `499`, na muda wa mwisho wa broker hurudisha `504`. Majibu yaliyobadilishwa huongeza `video->text;model=<visionModel>;parts=<videos>` kwenye kichwa kikuu cha `x-omniroute-modality-bridge` bila kuondoa sehemu za Vision au Audio.

### PII Masker (`piiMasker.ts`)

Hutekelezwa kwenye hatua **zote mbili**.

- **`preCall`** huiga mzigo, hupitia `system`, `messages`, `input`, na `prompt` (ikijumuisha vipengee vya mfuatano wa kawaida), na hutumia `processPII()` (kutoka `@/shared/utils/inputSanitizer`) kwenye sehemu za mfuatano `content`/`text`. Wakati `PII_REDACTION_ENABLED=true`, PII iliyogunduliwa hufichwa kwenye mzigo unaotoka. Hii haitegemei `INPUT_SANITIZER_MODE` (ambayo hudhibiti tu sera ya sindano ya kidokezo). Wakati ufichaji umezimwa, simu hurekodi idadi ya ugunduzi bila kuandika upya maudhui.
- **`postCall`** huiga kwa kina jibu, huendesha `sanitizePIIResponse()` pamoja na kinyago cha umbo la Responses-API (`maskResponsesOutput` — inashughulikia `output_text` na `output[].content[].text`). Ikiwa ufichaji wowote utatokea, jibu lililorekebishwa hubadilisha lile asili.

Guardrail haizuii kamwe; inaweka tu maelezo (`meta.detections`, `meta.redacted`) au kuandika upya.

### Prompt Injection (`promptInjection.ts`)

Hugundua miundo pinzani katika maudhui yaliyotolewa na mtumiaji na inatekeleza sera iliyosanidiwa. Tabia huendeshwa na vigezo vya mazingira na chaguzi za mjenzi:

| Mpangilio            | Env var                                                                                               | Chaguo-msingi | Athari                                                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Imewashwa            | `INPUT_SANITIZER_ENABLED`                                                                             | `true`        | Ikiwa `false`, kinga inazima moja kwa moja.                                                                                                                                                        |
| Hali                 | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`        | Sera ya sindano: `block`, `warn`, au `log`. (`redact` inakubaliwa kwa utangamano wa nyuma lakini **haiondoi** maandishi ya sindano; uandishi upya wa PII unadhibitiwa na `PII_REDACTION_ENABLED`.) |
| Kizingiti cha Kuzuia | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Ukali wa chini unaohitajika kuzuia. Kati ni ya kutazama tu kwa chaguo-msingi.                                                                                                                      |

**Upendeleo wa Hali** (`getMode`): mpigaji `options.mode` →
`INJECTION_GUARD_MODE` **Ubatilishaji wa bendera ya kipengele cha DB** (Dashibodi → Mipangilio →
Bendera za Vipengele) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Kwa hivyo, ubatilishaji wa dashibodi unashinda vigezo vya mazingira, hivyo UI ya Bendera za Vipengele inadhibiti kinga inayoendeshwa moja kwa moja (hakuna kuanzisha upya). Usomaji wa DB ni salama dhidi ya kushindwa: ikiwa kuna hitilafu, kinga inarudi kwenye tabia inayotegemea mazingira, na wakati hakuna ubatilishaji uliowekwa, tabia ni sawa na azimio la mazingira pekee.

Vyanzo vya kugundua:

1. `sanitizeRequest()` kutoka `@/shared/utils/inputSanitizer` (seti ya vigunduzi vilivyoshirikiwa vinavyotumika mahali pengine kwenye bomba).
2. `DEFAULT_GUARD_PATTERNS` zilizojengwa ndani (kwa sasa `system_override_inline` na
   `markdown_system_block`, zote zikiwa na ukali wa `high`).
3. `customPatterns` za hiari zilizopitishwa kupitia chaguzi za mjenzi (nyuzi, regex,
   au rekodi za `{ name, pattern, severity }`).

Wakati `mode === "block"` **na** angalau ugunduzi mmoja unafikia kizingiti cha ukali, `preCall` inarudisha `{ block: true, message: "Request rejected: suspicious content detected" }`. Katika hali za `warn` / `log`, kinga inaweka kumbukumbu lakini inaruhusu simu. Msaidizi wa pamoja `evaluatePromptInjection()` pia husafirishwa kwa wapigaji wanaohitaji kutathmini vidokezo bila kupitia rejista.

**Kikomo cha Uchanganuzi (v3.8.20):** kigunduzi huchunguza tu **KB 16 za kwanza** za maandishi ya kidokezo yaliyounganishwa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (baiti 16 384) katika `src/shared/utils/inputSanitizer.ts`. Zote mbili `detectInjection()` na `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` kabla ya kuendesha kitanzi cha muundo. Maelekezo ya sindano hukaa karibu na juu ya ingizo, kwa hivyo hii inapunguza CPU/GC ya regex kwenye mizigo ya mamia ya KB bila kudhoofisha ugunduzi (linganisha #3932, #4041).

### Kificha Vitambulisho (`credentialMasker.ts`)

Huendeshwa katika hatua **zote mbili**, wa mwisho katika mnyororo chaguo-msingi (kipaumbele `95`). Huficha mifumo inayojulikana ya funguo za API / tokeni za siri kutoka kwa mzigo wa nje (maudhui ya ujumbe, hoja za simu ya zana, matokeo ya zana) **na** jibu la mtoa huduma, ili kitambulisho kilichobandikwa kwenye kidokezo (au kurudishwa na matokeo ya zana) kisivujishwe kwa mtoa huduma wa juu au kurudi kwa mteja.

- **Kujiunga tu**, utaratibu sawa na ufichaji wa PII (Kanuni Ngumu #20-karibu): imezimwa isipokuwa `settings.credentialRedactionEnabled === true` **au** `CREDENTIAL_REDACTION_ENABLED=true`. Ikiwa imezimwa, kinga haifanyi kazi — haizuii kamwe na haiandiki upya kamwe.
- `redactCredentials()` hupitia mti kamili wa mzigo/jibu (`walkValue()`, salama dhidi ya uchafuzi wa mfumo, salama dhidi ya mzunguko kupitia `WeakSet`) na hubadilisha vinavyolingana na kishika nafasi cha `[REDACTED:<type>]`, ikinakili tu matawi yaliyobadilika kweli.
- `CREDENTIAL_PATTERNS` inajumuisha funguo za watoa huduma wa LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokeni za VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), funguo za malipo (Stripe, Square), funguo za wingu (funguo ya kufikia AWS, Twilio, SendGrid, Mailgun), funguo za faragha / JWTs, nyuzi za muunganisho zenye vitambulisho (`mongodb://user:pass@...`, n.k.), na muundo wa jumla wa thamani ya kichwa cha `Authorization` / `x-api-key` / `api-key` / `apikey`. Funguo zenye umbo la kichwa (`authorization`, `x-api-key`, `api-key`, `apikey`) hufichwa kimuundo (thamani pekee, kiambishi awali cha mpango kama `Bearer ` / `Basic ` kimehifadhiwa) badala ya kupitia regex ya maandishi ya jumla.
- Kinga haizuii kamwe; inaandika upya tu (`modifiedPayload` / `modifiedResponse`) na kuweka maelezo (`meta.credentialsRedacted`, `meta.count`).

Kinga ya kurudi nyuma: `tests/unit/credential-masker-guardrail.test.ts`.

## Mkataba wa Msingi (`base.ts`)

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
  block?: boolean; // true husitisha mnyororo mara moja
  message?: string; // huonyeshwa wakati wa kuzuia
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // hurejeshwa na preCall ili kuandika upya ombi
  modifiedResponse?: TValue; // hurejeshwa na postCall ili kuandika upya jibu
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

Kizuizi huashiria "hakuna mabadiliko" kwa kurejesha mojawapo ya `void`, `{}`, au
`{ block: false }`. Kurejesha `modifiedPayload`/`modifiedResponse` hubadilisha
thamani inayopita kwenye mnyororo kwenda kwenye vizuizi vinavyofuata.
`signal?: AbortSignal` hubeba mzunguko wa maisha wa mpigaji hadi kwenye vizuizi. Kughairi ombi ni hali maalumu ya kimakusudi ya kuendelea licha ya hitilafu: madaraja ya midia husimamisha kazi na kufanya usafishaji bila kurejesha midia ghafi kwa lengo linalojulikana kuwa halitumii muundo huo.

## Sajili (`registry.ts`)

`guardrailRegistry` ya singleton hutoa:

- `register(guardrail)` — huongeza kizuizi (au kukibadilisha kulingana na jina lililosawazishwa) na
  kupanga upya kwa `priority` ya kupanda.
- `clear()` / `list()` — zana saidizi za usimamizi.
- `runPreCallHooks(payload, context)` — hupitia vizuizi amilifu, hupitisha
  payload kupitia `modifiedPayload`, na kusimama inapokutana na `block: true` ya kwanza.
- `runPostCallHooks(response, context)` — mtiririko huohuo upande wa jibu.
- `resetGuardrailsForTests({ registerDefaults })` — hufuta hali na kwa hiari
  kusajili upya chaguo-msingi ili kutenga majaribio kwa usafi.

Viendeshaji vyote viwili hurejesha `{ blocked, payload|response, results, guardrail?, message? }`
ambapo `results` ni safu ya rekodi za `GuardrailExecutionResult` zinazojumuisha
sehemu za `blocked`, `skipped`, `modified`, `error`, na `meta` kwa kila kizuizi,
ambazo ni muhimu kwa ufuatiliaji.

### Kuzima Vizuizi kwa Kila Ombi

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` hukusanya orodha
isiyorudiwa ya majina ya vizuizi ambavyo vinapaswa kurukwa kwa ombi la sasa.
Vyanzo (vyote ni vya hiari, vyote vinaunganishwa):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` katika mwili wa ombi (kiwango cha juu)
- `metadata.disabledGuardrails` katika mwili wa ombi
- Kichwa `x-omniroute-disabled-guardrails` (au cha zamani
  `x-disabled-guardrails`)

Thamani zinaweza kuwa safu za mifuatano au mfuatano uliotenganishwa kwa koma; majina
husawazishwa kuwa herufi ndogo za kebab-case (`pii_masker` → `pii-masker`). Tokeo
hupitishwa kupitia `context.disabledGuardrails` hadi kwenye sajili, ambayo huruka
vizuizi vinavyolingana (`skipped: true` katika `results`).

## Mpangilio wa Utekelezaji

Kwa kila ombi linalopitia `src/sse/handlers/chat.ts` na
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` huunda orodha ya kurukwa kutokana na ufunguo wa API, mwili wa ombi,
   na vichwa.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` huendesha vizuizi kwa mpangilio wa kipaumbele
   kuanzia cha chini kwenda juu:
   - Vizuizi vilivyozimwa hurekodiwa kama `skipped`.
   - `preCall` ya kila kizuizi inaweza kuandika upya data ya ombi kupitia `modifiedPayload`.
   - `block: true` ya kwanza husitisha mfuatano mara moja na kishughulikiaji hurejesha
     jibu la kukataliwa na kizuizi.
3. Data ya ombi (ambayo huenda imeandikwa upya) hupelekwa kwenye uelekezaji wa mchanganyiko na
   utumaji kwa huduma ya juu.
4. Baada ya jibu kuundwa, `guardrailRegistry.runPostCallHooks(...)`
   huendesha mfuatano huo huo kwenye jibu. `block: true` hapa huondoa jibu la
   huduma ya juu.

Vizuizi vinavyotupa hitilafu hurekodiwa kwa `error: <message>` na kuandikwa kwenye kumbukumbu kupitia
`logger.warn`, lakini mfuatano huendelea — kwa muundo, mfumo huruhusu ombi kuendelea hitilafu ikitokea.

## Usanidi

Vigeu vya mazingira vinavyosomwa na vizuizi vilivyojengewa ndani:

| Kigeu                                 | Kinachokitumia            | Athari                                                                                                                                     |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Weka `false` ili kuzima utambuzi kabisa.                                                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Sera ya udungaji: `warn`, `block`, au `log`. Thamani ya zamani `redact` haiandiki upya maandishi ya udungaji.                              |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Hali ya kizuizi cha udungaji; pia ni alama ya kipengele katika DB ambayo **hupuuza na kuchukua nafasi ya** vigeu vya mazingira (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Kiwango cha chini cha ukali kinachokataliwa na `MODE=block`: `high` (chaguo-msingi), `medium`, au `low`.                                   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Jina mbadala la zamani la `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Ikiwa `true`, PII katika ombi hufichwa (bila kutegemea hali ya udungaji).                                                                  |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Hudhibiti tabia ya kifichaji kwenye upande wa jibu.                                                                                        |

Vizuizi vya Modality Bridge husoma usanidi wa wakati wa utekelezaji kutoka kwenye hifadhi ya mipangilio
inayotegemea DB (`getSettings()`), si vigeu vya mazingira. Funguo kuu za Vision ni
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, na
`modalityBridgeCacheMaxEntries`. Funguo za zamani za
`visionBridge*` zinakubaliwa tu kama mbadala wa usomaji wa mzunguko mmoja ulioandikwa
kwenye nyaraka; uandishi kutoka dashibodi hutumia funguo kuu. Chaguo-msingi na kitatuzi cha mbadala
vinapatikana katika `src/shared/constants/modalityBridgeDefaults.ts`, huku konstanti za zamani
zikihifadhiwa katika `src/shared/constants/visionBridgeDefaults.ts`.

Sauti hutumia `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, na `modalityBridgeAudioMaxClips`, pamoja na mipangilio ya pamoja ya
`modalityBridgeCache*`. Sauti haina mbadala wa funguo za zamani kwa sababu funguo hizi
zilianzishwa pamoja na skima ya Modality Bridge.

Video hutumia `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, na
`modalityBridgeVideoTimeout`, pamoja na mipangilio ya pamoja ya `modalityBridgeCache*`.
Imezimwa kwa chaguo-msingi kwa sababu FFmpeg/ffprobe ni vitegemezi vya hiari vya
uendeshaji, na uundaji wa maelezo ya fremu huongeza muda wa kusubiri na gharama ya modeli.

## Vizuizi Maalum

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

Hatua:

1. Unda `src/lib/guardrails/myGuardrail.ts` inayopanua `BaseGuardrail`.
2. Tekeleza `preCall` na/au `postCall`.
3. Ama isajili wakati wa kuingiza (isukume kutoka `registerDefaultGuardrails`) au
   uite `guardrailRegistry.register(...)` wakati wa utekelezaji — sajili hubadilisha
   kizuizi chochote cha awali chenye jina lilelile lililosawazishwa.
4. Ongeza majaribio chini ya `tests/unit/` (mifano iliyopo:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Majaribio

Tumia `resetGuardrailsForTests()` kati ya majaribio ili kuanza kutoka hali inayojulikana.
Pitisha `{ registerDefaults: false }` ili kuanza na sajili tupu na
kusajili tu vizuizi vinavyojaribiwa. Vision Bridge inakubali uingizaji wa vitegemezi
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge hutoa sehemu
sawa za mipangilio, uwezo, uteuzi wa modeli ya STT, ukaguzi wa vitambulisho,
na unukuzi. Kwa hivyo, majaribio yanaweza kutekeleza mitiririko yote miwili bila ufikiaji wa DB
au mtandao.

## Angalia Pia

- `src/lib/guardrails/` — utekelezaji
- `src/shared/utils/inputSanitizer.ts` — kigunduzi kinachoshirikiwa kinachowezesha
  ugunduzi wa udukuzi wa prompt na ufichaji wa PII
- `src/shared/constants/visionBridgeDefaults.ts` — chaguomsingi za Vision Bridge na
  orodha ya modeli zinazolazimishwa kutumia bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — chaguomsingi za pamoja za wakati wa utekelezaji za Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — safu huru (kivunja mzunguko, vipindi vya kusubiri)
- `docs/reference/ENVIRONMENT.md` — rejeleo kamili la vigeu vya mazingira

## Ufikivu wa njia wa kizuizi cha udukuzi na red-team (Awamu ya 8 · Sehemu D)

Kizuizi cha udukuzi (`createInjectionGuard` / `withInjectionGuard`) kinashughulikia njia zote
zinazokubali prompt za watumiaji. Kinaheshimu `INJECTION_GUARD_MODE` (chaguomsingi `warn` = kumbukumbu pekee;
`block` = hurudisha HTTP 400 `SECURITY_001`).

| Aina                 | Njia                                                                                                                                                 | Hali chaguomsingi |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Maandishi (zilizopo) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn              |
| Uzalishaji           | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn              |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn              |

Uchimbaji wa maandishi (`extractMessageContents`) hushughulikia `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kila usiku, `nightly-llm-security.yml`):** promptfoo huthibitisha kuwa kila njia huzuia
mkusanyiko wa OWASP-LLM katika `INJECTION_GUARD_MODE=block`; garak huendesha uchunguzi (huruka bila siri).
`moderations` imejumuishwa kwa ajili ya uthabiti — waendeshaji katika hali ya kuzuia wanaweza kuiondoa kupitia
`resolveDisabledGuardrails`.

Mtiririko wa kazi wa kila usiku (`.github/workflows/nightly-llm-security.yml`, cron + uanzishaji wa
mkono) una kazi mbili:

- **`promptfoo-guard` (inayozuia)** — huendesha `promptfoo eval -c promptfooconfig.yaml`
  pamoja na `INJECTION_GUARD_MODE=block`. Kila tukio hasidi (k.m. "puuza
  maagizo yote ya awali…", uvunjaji wa vizuizi wa mtindo wa DAN) huhakikisha kuwa jibu lina
  `error.code === "SECURITY_001"`, yaani, kizuizi kilikataa ombi hilo kwa hakika.
- **`garak` (ya ushauri)** — huendesha garak `--probes promptinject,dan,leakreplay`
  dhidi ya instansi ya ndani ya OmniRoute (`http://localhost:20128/v1`). Hudhibitiwa na
  siri ya mtoa huduma (`PROMPTFOO_PROVIDER_KEY`); huruka kwa utaratibu bila hitilafu na huongezewa
  `|| true`, kwa hivyo huripoti bila kusababisha CI ishindwe.

Ufikivu wa kisaidizi cha kizuizi (`createInjectionGuard` / `withInjectionGuard`)
unahusisha kila njia ya `/v1` yenye prompt; maandishi ya prompt huchukuliwa kutoka
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` na
`extractMessageContents()` katika `src/shared/utils/inputSanitizer.ts`.
