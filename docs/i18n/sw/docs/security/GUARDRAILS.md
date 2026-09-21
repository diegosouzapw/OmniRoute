# Guardrails (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Vizuizi vya Ulinzi Vilivyojengewa Ndani

Sajili hupakia kiotomatiki vizuizi sita vya ulinzi kwa mpangilio wa kipaumbele wakati wa kuleta
(angalia `registry.ts` → `registerDefaultGuardrails()`):

| Kipaumbele | Jina                | Hatua          | Faili                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nambari ndogo za kipaumbele hutekelezwa **kwanza**.

### Vision Bridge (`visionBridge.ts`) — Daraja la Modaliti PR-1

Hunasa maombi yenye picha yanayoelekezwa kwa **miundo isiyotumia uwezo wa kuona** na ama
huelekeza upya ombi zima kwa muundo wenye uwezo wa kuona au hubadilisha sehemu za picha
kwa maelezo ya maandishi yanayotolewa na muundo wa kuona unaoweza kusanidiwa kabla ya
mwito kwa mtoa huduma wa ngazi ya juu. Hii huwawezesha watoa huduma wa maandishi pekee kushughulikia
data za modaliti nyingi bila mabadiliko yanayoonekana.

Mtiririko:

1. Ruka ikiwa muundo lengwa tayari unatumia uwezo wa kuona (isipokuwa ikiwa upo kwenye
   orodha ya kulazimisha daraja `isVisionBridgeForcedModel`).
2. Toa sehemu za picha kupitia `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), ambayo hukabidhi kazi kwa **kitambuzi unganifu cha midia**
   `detectMediaParts()` katika `open-sse/utils/mediaParts.ts` — chanzo
   pekee rasmi kinachoshirikiwa na kichujio cha uoanifu wa combo.
   Utoaji huruhusiwa tu kwa sehemu za kiwango cha juu zenye miundo ambayo
   `replaceImageParts` inaweza kuingiza tena (mkataba wa kutoa↔kubadilisha): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, na Responses API `input_image`. Vipengele vilivyopatikana ndani zaidi na
   miundo ya viashiria pekee ni nyenzo za kichujio cha combo na kamwe havitolewi.
   Ruka ikiwa hakuna vilivyopatikana.
3. Bainisha usanidi wa wakati wa utekelezaji kupitia `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): vitufe vipya vya mipangilio vya `modalityBridge*`
   hupewa kipaumbele; vitufe vya zamani vya `visionBridge*` hubaki kama **njia mbadala ya mzunguko
   mmoja** (dirisha la kurejesha nyuma). Ruka kabla ya kupitia midia yoyote wakati
   daraja limezimwa.
4. Kiteuzi cha modi (`modalityBridgeVisionMode`, angalia jedwali hapa chini) huamua
   kati ya kuelekeza upya na kuelezea. Uelekezaji upya hurejesha `modifiedPayload` huku `model`
   pekee ikiwa imebadilishwa, pamoja na metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Njia ya kuelezea: weka kikomo cha picha kuwa `maxImages`, unda kidokezo kinachozingatia jukumu,
   kagua akiba ya maelezo, ita muundo wa kuona **kwa sambamba**
   (`Promise.allSettled`), na uingize sehemu za maandishi za `[Image N]: <description>`
   mahali pake. Maelezo yaliyoshindwa hutoa `null` na sehemu asili ya picha
   **huhifadhiwa** (#4012) — isipokuwa katika njia ya kuelezea ya combo wakati kila
   jaribio la kuelezea lilishindwa, ambapo mtoa huduma wa ngazi ya juu aliyethibitishwa kutokuwa na uwezo wa kuona hupokea kibadala cha
   `(unavailable — no vision-capable provider connected)` badala yake (#8430).
6. Rejesha `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Kiteuzi cha modi (`modalityBridgeVisionMode`)

| Modi       | Chaguo-msingi | Tabia                                                                                                                                                                                                                                                                                                               |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔             | Mbinu ya zamani ya kiheuristiki, bila kubadilishwa (#6640/#7204): miundo isiyo ya combo/`auto/` huelekezwa upya kwa muundo bora zaidi wa kuona isipokuwa muundo asili tayari una vitambulisho vinavyoweza kutumika (kisha huelezewa); malengo ya combo daima huelezewa.                                             |
| `describe` |               | Elezea kila wakati — kipengele cha kuelekeza upya hurukwa kabisa; muundo aliochagua mtumiaji ndio hujibu kila wakati.                                                                                                                                                                                               |
| `reroute`  |               | Lazimisha kuelekeza upya: ulinzi wa kuhifadhi muundo wenye vitambulisho hupitwa. Ulinzi wa vitambulisho vya **lengo** la kuelekeza upya bado hutumika — wakati hakuna lengo la kuona linaloweza kutumika, ombi huendelea kwenye kuelezea ili picha ghafi zisifikie kamwe mfumo wa nyuma wa maandishi pekee (#8430). |

Modi zilizolazimishwa hukatisha mchakato **kabla** ya mbinu ya kiheuristiki ya auto kutekelezwa; tabia ya `auto`
inafanana baiti kwa baiti na kizuizi cha ulinzi cha kabla ya PR-1.

#### Kidokezo cha maelezo kinachozingatia jukumu (`modalityBridgeVisionTaskAware`)

Chaguo-msingi ni **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) huongeza
maandishi ya **ujumbe wa mwisho wa mtumiaji** (yakikatwa hadi herufi 500) kwenye kidokezo msingi
cha maelezo, kikielekeza maelezo kwenye kile ambacho mtumiaji aliuliza hasa
(muundo wa codex-vision-proxy) na kuomba muundo wa kuona unukuu maandishi yanayoonekana.
Kipengele hiki kikiwa kimezimwa — au ikiwa hakuna maandishi ya mtumiaji — kidokezo msingi hutumiwa bila kubadilishwa.

Ombi lenyewe linalooana na OpenAI la self-loop ya describe (`callVisionModelSingle()`
katika `visionBridgeHelpers.ts`) daima huomba `image_url.detail: "high"` —
bila masharti, kwa kila mwitaji/mtoa huduma, na bila kutegemea ishara yoyote ya mteja.
Sampuli za kiwango cha chini cha maelezo hupunguza usahihi wa OCR kwa kazi hasa
ya unukuzi wa maandishi ambayo kidokezo hiki kinaomba, kwa hivyo ombi lenyewe la describe
daima huomba kiwango cha juu cha maelezo bila kujali kiwango cha maelezo kilichotumiwa
na ombi asili linaloingia. Hili huathiri tu mwili wa ombi la ndani la describe; halibadilishi
jinsi OmniRoute inavyopitisha `image_url.detail` ya mwitaji mwenyewe katika ombi kuu —
thamani hiyo chaguomsingi hutumika kando, na kwa wateja wa OpenCode waliotambuliwa pekee,
katika `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Tawi la
muundo-wa-waya wa Anthropic la self-loop ya describe halina sehemu ya `detail`
na haliathiriwi na thamani yoyote kati ya hizo chaguomsingi.

#### Kikomo cha matokeo ya describe (`modalityBridgeVisionMaxChars`)

| Ufunguo                        | Chaguomsingi | Masafa           |
| ------------------------------ | ------------ | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` au 100–50000 |

`0` (chaguomsingi) humaanisha **hakuna kikomo** — maelezo yanayorudishwa na
`callVisionModel()` hupitishwa bila kubadilishwa, hivyo kudumisha tabia iliyopo.
Thamani yoyote katika masafa ya 100–50000 hukata maelezo na kuongeza kiambishi
`…` kabla hayajaunganishwa tena kama `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` katika `src/lib/guardrails/visionBridge.ts`).
Ongeza thamani hii kwa kazi za OCR zenye maelezo mengi ambapo modeli ya hatua inayofuata
inahitaji unukuzi kamili; ipunguze ili kudhibiti matumizi ya tokeni kwa modeli za maono
zenye majibu marefu. Sehemu ya dashibodi ipo katika paneli ya Advanced ya kichupo cha Vision
(`modality-bridge-max-chars` katika `ModalityBridgeVisionTab.tsx`) na huinua thamani yoyote
kati ya 1 na 99 hadi kiwango cha chini cha 100 huku ikiacha `0` iliyowekwa wazi
bila kuguswa — `0` ni thamani halali ya Zod kwa haki yake yenyewe
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), si tu
thamani chaguomsingi ya "haijawekwa".

#### Akiba ya describe (`modalityBridge/bridgeCache.ts`)

Akiba ya LRU + TTL ndani ya kumbukumbu kwa matokeo ya describe, inayoshirikiwa katika
mchakato mzima. Ufunguo = `sha256(imageRef + composedPrompt + configuredBridgeModel)` ukiwa
na upangaji wa fremu wenye kiambishi cha urefu (hakuna migongano ya mipaka ya sehemu).
Kijenzi cha modeli ni modeli ya daraja **iliyosanidiwa**, si modeli iliyojibu kwa hakika —
`callVisionModel` inaweza kutumia modeli mbadala ndani kwa ndani, na kuweka ufunguo kwa
kila jaribio kungetawanya akiba. Describe zilizoshindwa kamwe hazihifadhiwi kwenye akiba.
Mipangilio:

| Ufunguo                         | Chaguomsingi | Masafa  |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Urekebishaji wa picha za mbali (self-loop ya describe/uchotaji wa base64)

Daraja linapochota picha ya **mbali** lenyewe — mwito binafsi wa describe wa Anthropic
na ubadilishaji wa base64 wa muundo-wa-waya wa claude
(`ensureBase64ImagesForClaudeWire`), yote kupitia
`fetchRemoteImageAsDataUri()` katika `visionBridgeHelpers.ts` — URI ya data inayotokana
hupitishwa kupitia `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) kabla ya kupachikwa katika ombi la modeli ya maono.
Picha kubwa kupita kiasi hupunguzwa hadi kuwa na **ukingo mrefu wa 2048px** (sawa na
kikomo cha kubadilisha ukubwa ambacho OpenAI/Anthropic tayari hutumia upande wa seva),
jambo linalopunguza baiti za upakiaji/ucheleweshaji bila kubadilisha kile ambacho modeli
ya maono huona. Kubadilisha ukubwa hutumia `sharp`, inayopakiwa kupitia uingizaji dhabiti:
kwenye jukwaa ambalo faili yake asilia ya binary inashindwa kupakiwa,
`normalizeDataUri()` **kamwe haitupi hitilafu** — hurudi kwenye upitishaji wa baiti asili
bila kubadilishwa, ili njia ya describe/ubadilishaji-wa-base64 iendelee kufanya kazi
kila wakati. Baiti ambazo si picha (uchotaji ambao haukurudisha picha inayoweza
kusimbuliwa) pia hupitishwa bila kuguswa. Urekebishaji huu unahusu tu picha ambazo daraja
huchota kwa mwito wake binafsi — hautumiki kamwe kwa mzigo ghafi unaopitishwa moja kwa moja
wa mwitaji, kulingana na kanuni ya ubadilishaji wa kujijumuisha-tu (Kanuni Ngumu #20).

#### Skema ya mipangilio + uhamishaji

Funguo mpya za `modalityBridge*` huhakikiwa na Zod katika `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, utatu wa `modalityBridgeCache*`, na kundi la
`modalityBridgeAudio*` linalotumiwa na Audio Bridge. Uhamishaji
`141_modality_bridge_settings.sql` hunakili thamani zilizopo za zamani za
`visionBridge*` kwenda kwenye funguo mpya zinazolingana (unaweza kuendeshwa mara nyingi
bila athari, na kamwe hauandiki juu ya thamani ya `modalityBridge*` iliyowekwa na
mwendeshaji); funguo za zamani huendelea kukubaliwa kama chaguo la kusoma iwapo mpya
hazipo kwa mzunguko mmoja wa toleo.

#### Kijajuu cha uwazi + takwimu

Majibu yaliyobadilishwa na describe hubeba
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(kinachoundwa na `buildModalityBridgeHeader()` katika `modalityBridge/bridgeStats.ts`,
na kuwekwa na `withModalityBridgeHeader()` katika `src/sse/handlers/chatHelpers.ts`).
Maombi yaliyobadilishiwa njia hayapati kijajuu **chochote** — mzigo haukuguswa na ubadilishaji
wa modeli tayari unaonekana katika sehemu ya `model` ya mwili wa jibu.

`GET /api/modality-bridge/stats` (uthibitishaji wa usimamizi, kiwango sawa na
`GET /api/settings`) hurudisha vihesabio vya ndani ya kumbukumbu kwa kila modali
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` kwa `vision`, `audio`, na
`video`. `averageLatencyMs` hutumia `latencySamples`, si majaribio yote, kama
kigawanyo chake; operesheni isiyo na kipimo cha muda haitengenezi sampuli bandia ya
milisekunde sifuri. `bridged` hubaki kuwa jina mbadala linalooana na matoleo ya awali
kwa ubadilishaji uliofanikiwa; majaribio yaliyoshindwa hayakiongezi.
Vihesabio huwekwa upya mchakato unapoanzishwa upya kwa makusudi
(telemetria, si uhasibu).

#### Usanidi wa dashibodi

Ukurasa mahususi wa dashibodi ni
`/dashboard/settings/modality-bridge`. Vichupo vyake vya `Vision`, `Audio`,
na `Video` vinavyoweza kufikiwa kupitia URL huhifadhi vigezo vya hoja wakati wa kubadilisha thamani ya `tab`.
Kichupo cha Vision huonyesha uwezeshaji, modi, uteuzi wa modeli (ikiwemo chaguo-msingi
la kiotomatiki), uundaji wa vidokezo unaozingatia kazi, vikomo vya kina vya muda wa kusubiri/picha/urefu wa maelezo/kache,
vihesabio vya wakati wa utekelezaji,
na ombi la mfano lenye ulinzi. Kichupo cha Audio pia kinafanya kazi: huonyesha
uwezeshaji, kiteua modeli ya STT pekee chenye Auto, vikomo vya muda wa kusubiri/urefu wa juu wa klipu, vihesabio vya sauti,
na jaribio la mfano la `input_audio`. Kichupo cha Video kinafanya kazi: huripoti
hali ya wakati wa utekelezaji ya FFmpeg/ffprobe — mojawapo ya hali nne bayana za UI (`unknown` wakati
uchunguzi unaendelea au haukuweza kukamilika, `restricted` kwenye kipangishi cha dashibodi kisicho cha loopback
ambapo uchunguzi unarukwa upande wa mteja, `unavailable` baada ya kuchunguzwa
na kuthibitishwa kuwa hakipo, au `available` pamoja na matoleo ya FFmpeg/ffprobe) — huhifadhi
vikomo vya uwezeshaji/modeli/fremu/video/muda wa kusubiri, huchuja kiteua modeli ili kuonyesha modeli
zenye uwezo wa maono, na huonyesha vihesabio vya video.

Kadi ya zamani ya Vision Bridge chini ya mipangilio ya AI ni kiungo cha uoanifu kinachoelekeza kwenye
ukurasa mpya; haimiliki tena nakala ya pili ya fomu. Media Providers pia
huunganisha mitiririko ya kazi ya Picha-hadi-Matini na Matamshi-hadi-Matini na vichupo husika vya Modality
Bridge bila kuondoa eneo la majaribio lililopo la Matamshi-hadi-Matini.

**Upitaji wa udhibiti wa uingizaji kwa self-loop:** wakati ombi la maelezo linapopitishwa kupitia
`/v1` self-loop ya OmniRoute yenyewe (modeli isiyo ya kawaida ya mtoa huduma), ombi dogo hutuma
`x-omniroute-admission-bypass: internal` na huthibitishwa kwa kitambulisho kilichosuluhishwa
cha self-loop — sentinel ya ndani ya `sk_omniroute` katika modi ya ndani, au ufunguo wa mazingira wa
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` uliosanidiwa na mwendeshaji (#1350) ili
utekelezaji wenye `REQUIRE_API_KEY=true` bado uweze kuendesha ombi la maelezo. Upitaji huo
unakubaliwa tu kwa vitambulisho hivyo mahsusi, kwa hiyo wateja wa nje hawawezi kutumia
kichwa hicho kuruka udhibiti wa uingizaji.

Chaguo-msingi za zamani zipo katika `src/shared/constants/visionBridgeDefaults.ts`;
chaguo-msingi mpya za modi/uzingatiaji wa kazi/kache na kisuluhishi cha mipangilio zipo katika
`src/shared/constants/modalityBridgeDefaults.ts`. Kinga huonyesha chaguo la kijenzi
`deps` ili majaribio yaweze kuingiza utekelezaji bandia wa `getSettings` na
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Hunasa maombi ya gumzo yenye sauti kabla hayajafikia lengo ambalo halijulikani
kukubali ingizo la sauti. Kamwe haielekezi upya ombi la gumzo: sehemu za sauti
hunukuliwa kupitia endpoint iliyopo ya multipart inayooana na OpenAI, na
modeli ya gumzo iliyochaguliwa huendelea kwa nakala za maandishi.

Mtiririko:

1. Suluhisha `supportsAudio` kupitia `getResolvedModelCapabilities()`. Metadata bayana ya
   sajili ya mtoa huduma hupewa kipaumbele, ikifuatiwa na metadata tuli ya modeli, kisha
   `modalities_input` iliyosawazishwa. Orodha iliyotangazwa ya ingizo isiyo na `audio` ni `false`; kutokuwepo kwa
   ushahidi wa uwezo hubaki `null`. `false` na `null` zote huwasha
   daraja la tahadhari, huku `true` ikilipita.
2. Suluhisha mipangilio ya `modalityBridgeAudio*` na utoe sehemu za sauti za kiwango cha juu
   zinazoweza kuunganishwa kutoka katika kila ujumbe kupitia kigunduzi cha pamoja cha `detectMediaParts()`.
   Miundo ya waya inayotumika ni `input_audio` ya OpenAI, `audio_url`, na
   `source.media_type: "audio/*"`. Sauti iliyopachikwa ndani hugunduliwa kwa ajili ya uelekezaji lakini
   haiondolewi na njia ya uunganishaji. Kazi huwekewa kikomo na `modalityBridgeAudioMaxClips`;
   sehemu zinazofuata huachwa bila kubadilishwa.
3. Tumia `provider/model` iliyosanidiwa, au ruhusu `selectAudioBridgeModel()` kupitia
   `AUDIO_TRANSCRIPTION_PROVIDERS` kwa mpangilio thabiti wa katalogi na kuchagua modeli ya kwanza
   yenye kitambulisho kinachotumika cha mtoa huduma aliye hai.
4. `callAudioTranscription()` hubadilisha sauti ya base64/data-URI kuwa `file` ya multipart,
   au hupakua `audio_url` ya mbali kupitia ulinzi wa kutoka nje unaoruhusu anwani za umma pekee,
   wenye ubandikaji wa DNS na kikomo cha MB 25. Kisha hutuma faili na modeli iliyochaguliwa kwa POST
   kwenda kwenye self-loop ya ndani ya `/v1/audio/transcriptions`, iliyothibitishwa kwa
   `resolveSelfLoopBearer()`. Njia iliyopo ya unukuzi hutekeleza utafutaji wa kawaida
   wa kitambulisho, ushughulikiaji wa muda wa kusubiri/kikomo cha kasi, na usambazaji kwa mtoa huduma.
5. Miito iliyofaulu hubadilisha sehemu zake kuwa `[Audio N]: <transcript>`. Miito
   huendeshwa kwa `Promise.allSettled`: hitilafu ya simu moja huhifadhi sehemu hiyo asili
   ya sauti (mkataba wa #4012). Ikiwa kila simu itashindwa na imethibitishwa kuwa lengo lina
   `supportsAudio === false`, sehemu hizo hubadilika kuwa
   `[Audio N]: (unavailable — no STT provider connected)` (mkataba wa #8430). Kwa
   lengo lisilojulikana (`null`), matokeo ambayo yote yameshindwa huachwa bila kubadilishwa. Lengo
   lililothibitishwa kuwa la maandishi pekee lisilo na kitambulisho cha STT kinachoweza kutumika hupokea ujumbe huo huo
   bayana bila kutuma ombi la mtandao.

Nakala zilizofaulu hutumia kache ya LRU/TTL ya Modality Bridge inayoshirikiwa na mchakato mzima.
Ufunguo huunganisha rejeleo la sauti, lebo thabiti ya operesheni ya `audio-transcription`,
na modeli ya STT iliyochaguliwa; hitilafu hazihifadhiwi kamwe kwenye kache. Majaribio ya sauti husasisha
vihesabio vya pamoja vya `bridged`, `cacheHits`, `failures`, na `lastUsedAt`.
Majibu yaliyobadilishwa hubeba
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; maombi
yasiyobadilishwa hayapokei sehemu ya Audio Bridge.

Mipangilio ya wakati wa utekelezaji huhifadhiwa kwenye DB na huthibitishwa kwa Zod:

| Ufunguo                       | Chaguo-msingi | Masafa            |
| ----------------------------- | ------------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                 |
| `modalityBridgeAudioModel`    | `""`          | Auto au ID ya STT |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10              |

Kache ya pamoja inaendelea kudhibitiwa na `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, na `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Hunasa sehemu za video za kiwango cha juu katika `messages` za Chat Completions na `input` ya Responses API kabla ya kuitwa kwa lengo lisilo na usaidizi asilia wa video unaojulikana. Miundo inayotumika ni `input_video`, `video_url`, `video_source`, URL za HTTPS, na URI za data za `data:video/*;base64,...`. Majina ya faili ya kawaida yaliyo katika maandishi hayachukuliwi kuwa video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) inasimamia upitiaji wa ombi, ukaguzi wa uwezo/sera, ujumlishaji wa kila ombi, na data ya majibu. Kazi za kila video — upataji, akiba ya matokeo yote, uelezaji wa mfuatano wa fremu (ambao huunganisha nakala yoyote ya sauti iliyotangazwa na mwitaji), pamoja na vipimo/ukatishaji/usafishaji wa kila jaribio — zimefichwa nyuma ya `processVideoPart` katika `videoBridgePipeline.ts`, ambayo huitwa mara moja kwa kila sehemu ya video ndani ya kitanzi cha `preCall`. Moduli hiyo pia hufafanua mipaka bayana ya milango `VideoMediaBrokerPort` (kupata baiti na kutoa fremu zilizochukuliwa kama sampuli), `VideoAudioTranscriptionPort` (kuunganisha nakala ya sauti iliyotangazwa na mwitaji na maelezo ya fremu zilizochukuliwa kama sampuli), na `VideoDrilldownPort` (mpaka wa uhifadhi wa uchunguzi wa kina wa fremu; bado haujaunganishwa katika `processVideoPart` — kwa sasa ni njia tofauti ya `/api/modality-bridge/video/drilldown` pekee inayoandika maingizo ya uchunguzi wa kina).

Njia ya ombi ya umma ya `/v1` haiingizi wala kuanzisha mchakato-tanzu kamwe. Video za mbali hupakuliwa chini ya kikomo cha 50 MiB; video za base64 zilizo ndani ya ombi zina kikomo cha kihafidhina cha 36 MiB kilichosimbuliwa kwa kila video ili bahasha ya modeli/ujumbe/uundaji wa fremu ibaki ndani ya kikomo cha umma cha 50 MiB cha ukubali wa ombi la JSON. Urefu wa maudhui ya ndani na makadirio ya ukubwa uliosimbuliwa hukaguliwa kabla ya kutenga kumbukumbu. HTTPS inahitajika kwenye URL ya awali ya mbali na kila uelekezaji upya, kwa kutumia kizuizi kilichopo cha mawasiliano ya nje ya umma pekee chenye ubandikaji wa DNS. Kisha baiti hizo huvuka mpaka halisi wa ndani wa wakala wa `POST /api/modality-bridge/video/extract`. Njia hiyo ni `LOCAL_ONLY` na `SPAWN_CAPABLE`, hukubali tu ombi lililothibitishwa kwa kila mchakato kutoka kwenye loopback inayoaminika, na kamwe haikubali URL, njia ya mfumo wa faili, programu tekelezi, au orodha ya hoja. Msururu wa ukomo wa ukubwa wa mwili wa API na kisomaji cha mwili kinachoongezeka cha kishughulikiaji hutekeleza kila kimoja kikomo cha ingizo cha 50 MiB kwa wakala. Foleni yake yenye mipaka huendesha uchimbaji mmoja kwa wakati mmoja, huruhusu kazi nne zinazosubiri, na huweka kikomo cha ingizo linalosubiri kuwa 100 MiB.

Ndani ya wakala, `ffprobe` husoma faili ya faragha ya ndani; orodha isiyobadilika ya miundo inayoruhusiwa haijumuishi miundo ya orodha za kucheza na faili za maelezo. Kwa kontena zinazoruhusiwa za familia ya MOV, marejeleo ya data ya nje ya MOV hubaki yamezimwa kwa chaguomsingi, na amri isiyobadilika haiwashi matumizi yake. `ffprobe` na `ffmpeg` zote hutumia orodha ya itifaki inayoruhusu `file` pekee, uzi mmoja, safu zisizobadilika za hoja, bila shell, na programu tekelezi zinazotafutwa kutoka `PATH`. Mitiririko ya picha za jalada zilizoambatishwa si wagombea wanaoweza kuchezwa. Mitiririko yote inayoweza kuchezwa lazima itimize vikomo, na mtiririko chaguomsingi uliobainishwa hupendelewa kabla ya kutumia kwa uthabiti mtiririko wenye faharasa ya chini zaidi. Video zimewekewa kikomo cha sekunde 600, pikseli 8,192 kwa kila kipimo, na pikseli chanzo 33,554,432. FFmpeg huchukua sampuli za fremu 1–16 za JPEG katika sehemu za katikati, hupunguza ukingo mrefu hadi usiozidi pikseli 1,024 bila kuongeza ukubwa wa maingizo madogo, na kamwe haipokei URL. Uchukuaji wa sampuli ni `uniform` kwa chaguomsingi. Sera ya hiari ya `scene_aware` na sera ya majaribio ya `segment_aware` hufanya pitio moja la ziada lisilobadilika la FFmpeg kwenye mtiririko wa ndani ambao tayari umethibitishwa, huchagua mihuri ya muda ya matukio ya `showinfo` iliyo ndani ya mipaka, na hurudi kwa uthabiti kwenye sehemu zilezile za katikati zilizosambazwa sawasawa iwapo utambuzi utashindwa, muda utaisha, matokeo yatakuwa na muundo usio sahihi, au seti ya wagombea itakuwa tupu. Hali inayozingatia vipande hugawa sampuli za sehemu za katikati kwa uwiano wa vipindi vya matukio vilivyothibitishwa; ushahidi wa hali inayozingatia vipande na tabia ya kurudi kwenye mbinu mbadala zimeelezwa kwa kina hapa chini. Kikomo kisichoweza kuvukwa cha fremu 16 hutumika baada ya uteuzi katika kila sera. Wakati ombi linalozingatia matukio lina bajeti ya fremu moja pekee, hutumia sehemu ya katikati iliyosambazwa sawasawa ya dirisha amilifu la video nzima au la ulengaji na huripoti `policyEffective: uniform`: fremu moja ya tukio iliyochaguliwa haiwezi kuhifadhi ncha zote mbili za muda. Mwitiaji anaweza kutoa kwa hiari dirisha lenye ukomo la ulengaji (`start`/`end` kwa sekunde); mipaka hubanwa kwa muda wa media, madirisha yaliyogeuzwa au yasiyo na thamani yenye ukomo hukataliwa, na sera zote za uchukuaji sampuli hutekelezwa ndani ya kipindi kilichosawazishwa pekee. Dirisha linalotokana hujumuishwa katika metadata ya uchukuaji sampuli na katika kiambishi awali cha maelezo yasiyoaminika ili modeli za chini ya mchakato ziweze kutofautisha dondoo iliyolengwa na ratiba kamili ya muda.

Ulengaji wa kimaana wa maelezo ni mpangilio tofauti na bayana. Hali chaguomsingi ya uchanganuzi ya `full` huhifadhi kidokezo kilichopo cha fremu na kamwe haitumi maandishi ya ombi kwa modeli ya maelezo. Katika hali ya `focused`, daraja husoma tu `text`/`input_text` ya hivi karibuni isiyo tupu iliyoandikwa na mtumiaji kutoka kwenye kontena ileile ya Chat au Responses, huisawazisha kuwa NFC, hukusanya herufi dhibiti na nafasi nyeupe, na huiwekea kikomo cha pointi 500 za msimbo wa Unicode. Matokeo tupu hurudi kwenye kidokezo halisi cha `full`. Dokezo linaloweza kutumika huandikwa kama JSON katika bloku mahususi ya muktadha wa mtumiaji usioaminika na linaweza tu kutanguliza maelezo yanayoonekana; haliwezi kubatilisha onyo tofauti dhidi ya kufuata maagizo yanayoonekana au kusikika katika media. Ulengaji wa maandishi kamwe haukadirii `start`/`end` wala kubadilisha kichukua sampuli cha muda.

#### Ushahidi wa vipande vya kimuundo wa FU-07

`segment_aware` hutumia pitio moja la uchanganuzi wa awali lenye mipaka kwenye mtiririko wa video ya ndani ambao tayari umethibitishwa. Msururu usiobadilika wa vichujio kwanza hupunguza ukubwa hadi upana wa pikseli 320 usiozidi, hutambua mabadiliko ya matukio na vipindi vilivyoganda, kisha huchukua sampuli kwa fremu 1 kwa sekunde ili kupima ukungu, wastani wa luma, na taarifa za anga/muda. Pitio hilo limewekewa kikomo cha sampuli 600 za kimuundo, uzi mmoja wa FFmpeg/kichujio, itifaki ileile inayoruhusu `file` pekee na orodha za kontena zinazoruhusiwa, kikomo cha 1 MiB cha matokeo ya mchakato, na muda usiozidi sekunde 30 ndani ya ukatishaji/kikomo cha muda kinachoshirikiwa cha wakala. Kamwe halikubali amri, kichujio, njia, au URL kutoka kwenye ombi.

Thamani za kimuundo ni ushahidi wa sampuli unaoweza kurudiwa kwa matokeo yaleyale, si uelewa wa kisemantiki wa video. Hazitambui mada, vitendo, maelezo ya picha, mazungumzo, au dhamira ya mtumiaji. Mipaka ya matukio na migando huunda sehemu; kiwango cha mgando, ukungu, mwangaza, undani wa anga, na mabadiliko ya muda huathiri tu jinsi bajeti iliyopo ya fremu 1–16 inavyogawanywa. Sehemu iliyoganda kikamilifu inawekewa kikomo cha fremu moja, huku sehemu zisizoganda zikishindania bajeti iliyobaki. Mipaka inapozidi idadi ya fremu, ufunikaji sawia wa ratiba ya muda huhifadhiwa ili mikato ya haraka ya mwanzo isiweze kuficha sehemu ndefu ya mwisho. Mipaka ya matukio iliyo ndani ya azimio la uchanganuzi la sekunde 1 kutoka kwenye mpaka wa mgando huunganishwa.

Vichujio vinavyokosekana, ushahidi wenye muundo usio sahihi/usio na kitu, hitilafu ya kigunduzi, au muda wa kusubiri wa uchanganuzi wa awali uliowekewa kikomo husababisha kurejea kwenye sera kamili ya pointi za katikati zilizosambazwa sawia. Kusitisha kwa mpigaji au kufikiwa kwa muda wa mwisho wa broker hakusababishi kurejea huko: hukatisha subprocess inayoendelea, huzuia uchimbaji wa fremu wa baadaye, na mti binafsi wa muda huondolewa katika `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` huzalisha fixtures halisi za FFmpeg zenye matokeo yanayoweza kurudiwa kwa ajili ya upunguzaji wa miito ya maelezo ya picha baada ya uondoaji wa nakala, ugawaji wa bajeti kwa mwendo mwingi, ushahidi wa ukungu/mwangaza/SI-TI, mikato ya haraka yenye sehemu ndefu ya mwisho, na matokeo chanya ya uongo ya kufifia taratibu. Hurekodi muda halisi wa uchanganuzi wa awali na, pale ambapo `/usr/bin/time` inapatikana, CPU ya mchakato mtoto na kiwango cha juu zaidi cha RSS. Ukaguzi wake wa ubora ni vielelezo vya marejeleo vya kimuundo pekee. Ubora wa modeli halisi ya maelezo ya picha unabaki `HOLD` kwa sababu harness hii haina endpoint iliyoidhinishwa wala hakimu aliyefungiwa. Uokoaji wa fedha pia unabaki `HOLD` isipokuwa `--caption-cost-per-call-usd` itoe makadirio dhahiri chanya ya gharama kwa kila mwito; script kamwe haitungi mojawapo ya matokeo hayo.

Kila fremu imewekewa kikomo cha 4 MiB, fremu zote ghafi kwa pamoja zimewekewa kikomo cha 23 MiB, na jibu la broker lililosawazishwa limewekewa kikomo cha 32 MiB. Saraka binafsi ya muda huondolewa katika `finally`. OmniRoute haijumuishi FFmpeg na haikubali njia maalum ya executable. Kabla ya kutengeneza maelezo ya picha, bridge hutumia hatua ya tahadhari ya kuondoa nakala zinazofanana kimwonekano: kila JPEG hupunguzwa kuwa buffer ya grayscale ya 16×16 na hulinganishwa tu na fremu ya mwisho iliyohifadhiwa. Kwa bajeti ya maelezo ya picha iliyoombwa inayozidi fremu moja, uchimbaji hutoa mkusanyiko wa wagombea uliowekewa kikomo cha hadi mara mbili ya bajeti hiyo na kamwe hauzidi fremu 16. Kikomo kilichoombwa hutumika tu baada ya uondoaji wa nakala, huku wagombea wa kwanza na wa mwisho waliochaguliwa wakihifadhiwa wakati wa upunguzaji wa mwisho ikiwa bajeti ni angalau mbili. Sera yenye toleo
`grayscale-16x16-mean-cells-v2` hutumia thamani kubwa kati ya tofauti ya wastani ya luma na uwiano wa seli za kijipicha ambazo tofauti yake iliyosawazishwa ni angalau 0.05. Kizingiti cha nakala ni thamani isiyobadilika ya 0.04, iliyochaguliwa kwa ajili ya utabirikaji badala ya kutolewa kama mpangilio wa wakati wa utekelezaji. Ishara hii ya pili yenye utofautishaji mkubwa huhifadhi mwendo mdogo na mabadiliko ya maandishi yanayoonekana ambayo ulinganisho wa wastani pekee unaweza kuficha. Hitilafu za kilinganishi au decoder husababisha kuendelea huku ufunikaji ukihifadhiwa. Metadata ya matokeo hutenganisha wagombea waliochimbwa, fremu zilizotumiwa kwa mafanikio, na nakala zinazofanana kimwonekano zilizoondolewa.

Sehemu ya video iliyowekwa alama wazi inaweza kuomba contact sheet yenye mihuri ya muda. Bridge huunda gridi ya JPEG yenye safu wima zisizozidi 4 na fremu zisizozidi 16. Kila seli ya pikseli 512 hupachika muhuri wa muda wa chanzo chake kwenye ukanda wa chini wenye utofautishaji mkubwa, huku mihuri hiyo hiyo ya muda ikibaki katika metadata ya maandishi kwa ajili ya uhusishaji na ukaguzi wa hatua zinazofuata. JPEG kamili hubaki na kikomo cha 32 MiB. Ikiwa `sharp` haiwezi kufumbua au kuunda gridi, bridge hurejea kwenye fremu mahususi za JPEG; usitishaji wa mteja bado huenezwa kupitia operesheni ya sheet.

Ushahidi wa kupandishwa hadhi umetenganishwa kimakusudi na microbenchmark ya usanifu sintetiki. `scripts/perf/video-bridge-contact-sheet-eval.ts` hufafanua harness ya A/B yenye toleo la schema kwa modeli halisi za kuona zinazooana na OpenAI. Hupima tokeni zilizoripotiwa na provider, ucheleweshaji wa muda halisi kutoka mwanzo hadi mwisho (ukijumuisha uundaji wa sheet), idadi ya miito ya modeli, na uhifadhi wa hoja uliobainishwa na manifest. Majibu ghafi ya modeli hayaandikwi kwenye ripoti; ni digests za SHA-256 na IDs za hoja zilizolingana pekee zinazohifadhiwa. Harness haitoi mwito wowote wa mtandao au wa modeli inayolipiwa isipokuwa `--execute-real` ipitishwe na `--model`, `OMNIROUTE_BASE_URL`, na `OMNIROUTE_API_KEY` viwe vimesanidiwa. Bila utekelezaji huo halisi ulioidhinishwa wazi, uamuzi wake unaosomeka na mashine unabaki `HOLD`; vipimo vya payload/idadi ya miito vya sintetiki pekee si ushahidi wa kupandishwa hadhi.

Wapigaji wanaweza kuambatisha array ya hiari ya `transcript.cues` kwenye sehemu ya video inayotumika ikiwa tayari wana maandishi yaliyopangiliwa kwa muda. Kila cue lazima iwe na `text`, kipindi chenye kikomo cha `start`/`end` kilicho ndani ya muda uliokaguliwa, na `source` iliyoruhusiwa (`client`, `embedded`, au `audio-bridge`); `confidence` huwa `1` kwa chaguo-msingi na lazima ibaki kati ya `0` na `1`. Cues zinazofanana kabisa huunganishwa. OmniRoute kamwe haianzishi unukuzi kutokana na metadata hii: cues zilizothibitishwa hunakiliwa kwenye matokeo yaliyoelezwa pamoja na chanzo, kiwango cha kuaminika, na kipindi, na huwasilishwa kama uchunguzi usioaminika sambamba na maelezo ya fremu. Maandishi batili, yaliyo nje ya kipindi, au yasiyo na uthibitisho wa asili hukataliwa badala ya kuchanganywa kwenye mtiririko wa maelezo ya picha. Sehemu ya `source` kwa sasa hutangazwa na mpigaji, haijathibitishwa na server: OmniRoute huhakikisha kuwa thamani ni mojawapo ya strings tatu zinazoruhusiwa, lakini bado haithibitishi kwa mbinu za kriptografia kwamba lebo ya `embedded` au `audio-bridge` kwa kweli ilitoka kwenye uchimbaji unaomilikiwa na server. Ichukulie `source` kama kidokezo kisichoaminika hadi uthibitishaji huo utakapotekelezwa; usijenge maamuzi ya uidhinishaji juu yake.

Mwitaji wa kiwango cha juu anaweza kutoa wimbo wa `audioTranscript` ambao tayari umeidhinishwa
kwa video hiyo hiyo. Kiunganishi cha muunganisho huendesha uchunguzi wa picha na sauti chini ya
kikomo kimoja cha muda na ishara moja ya kusitisha, huupanga kwenye ratiba moja ya muda, huunganisha
nakala zinazofanana kabisa, na huripoti matokeo ya sehemu wakati upande mmoja pekee unafanikiwa.
`audioTranscript` batili husababisha matokeo hayo ya sehemu — maelezo ya picha
huhifadhiwa na tawi la sauti hurekodi msimbo wa hitilafu uliosafishwa —
badala ya kusababisha video nzima ishindwe. Upatikanaji wa kila tawi, alama ya matokeo ya sehemu,
na misimbo ya hitilafu iliyosafishwa huhifadhiwa katika matokeo yaliyoelezwa, katika
metadata ya kinga (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), katika metadata ya akiba ya matokeo, na katika vihesabu vya
muunganisho wa daraja. Njia chaguo-msingi ya Video Bridge haiombi ubadilishaji wa matamshi kuwa maandishi
wala kupakua nakala ya pili ya media; bila wimbo huo uliotolewa waziwazi, inabaki
ya video pekee.

**Uhifadhi wa manukuu (#12150 P1).** Hili hutumika kiotomatiki kila wakati
Video Bridge (ambayo yenyewe huhitaji kuwezeshwa kwa hiari) inapowasilisha kidokezo cha manukuu — hakuna
alama tofauti ya uhifadhi. Ombi linapowasilisha kidokezo chochote cha manukuu (`transcript`
iliyotangazwa na mwitaji au `audioTranscript` iliyounganishwa), kinga hukitia alama ya
`videoBridgeObserved` na kuunda nakala iliyofichwa ya maelezo ya video —
uwasilishaji unaofanana ambao maudhui huru ya kila kidokezo hubadilishwa na
`[redacted-video-transcript]`, unaoundwa kwa kubadilisha sehemu ya kidokezo iliyopangwa
kabla ya mfuatano wa herufi kuundwa (kamwe si kwa kuchanganua maandishi yaliyosawazishwa, ili maudhui yoyote ya
kidokezo — ya kiadui au ya kawaida, yakiwemo maudhui yenye `]` kama vile
`[inaudible]`/`[music]` — yasiweze kubaki). Mwili wa ombi katika kumbukumbu ya simu inayohifadhiwa
hubadilisha kila sehemu ya maandishi iliyotokana na video kwa nakala hiyo iliyofichwa, kwa kuilinganisha kulingana na
usawa wa maudhui; nanga ya `fullText` husomwa upya kutoka kwenye data ya kinga ya kabla ya simu
iliyokamilika, hivyo ulinganishaji bado hufanikiwa baada ya kinga za baadaye katika msururu (vifichaji vya PII na
vitambulisho vya siri, vyenye vipaumbele 10/95) kuandika upya maandishi ya maelezo moja kwa moja na
baada ya udungaji wa kidokezo cha mfumo/makabidhiano/kumbukumbu kubadilisha muundo wa safu ya ujumbe. Mwili
unaotumwa juu ya mkondo kwa modeli haubadilishwi. Ombi lililochunguzwa pia halijazi
Memory yoyote ya kudumu (uchomoaji unaotokana na ombi na unaotokana na jibu hurukwa),
ili jibu la modeli lenyewe lisiweze kunakili maandishi ya manukuu kwenda kwenye Memory.

Sehemu za uhifadhi ambazo bado ziko wazi, zinazofuatiliwa kwa kazi ya baadaye (**P2**, #12430): taswira ghafi
ya ombi la mteja kabla ya kinga katika artefakti ya kumbukumbu ya kina;
mwendelezo wa `previous_response_id` unaofungwa iwapo kutatokea hitilafu; utumaji wa ndani wa
vidokezo vilivyotokana ambao hupachika manukuu ndani ya kidokezo cha mfuatano wa herufi kilichoundwa
(hatua za mchakato, makabidhiano ya muktadha); na mwili wa jibu / nakala ya akiba ya kisemantiki
ya jibu la modeli linalonukuu manukuu. Hizi ni sehemu za daraja la ghafi/jibu au
zinazohitaji kuwezeshwa kwa hiari, zilizo nje ya wigo wa mwili wa ombi unaohifadhiwa + Memory wa P1.

Mzunguko wa ndani wa `/api/modality-bridge/video/drilldown` ni mfumo tofauti wa akiba,
unaothibitishwa kwa loopback/tokeni. Kila operesheni pia inahitaji
kitambulisho sanifu kisichoeleza maelezo ya mhusika. Kabla ya mwitaji wa uzalishaji kuwezeshwa, lazima
atoe kitambulisho hicho kutoka kwa mpangaji aliyethibitishwa na kamwe asipeleke thamani
iliyochaguliwa na mteja. Funguo za akiba hufungamanisha mhusika huyo na vitambulisho sanifu vya kipindi na
marejeleo ya video, huhifadhi tu funguo zake zilizotokana na SHA-256, na huwekea usomaji
na ufutaji upeo wa mhusika huyo huyo. Akiba huhifadhi upeo wa fremu 16 za JPEG
zilizotokana kwa kila ingizo, huziondoa baada ya dakika kumi, na huwezesha usomaji wenye mipaka wa
`start`/`end` au ufutaji wa kipindi uliotolewa waziwazi.

Kila mhusika ana kikomo cha maingizo 16 na MiB 64 za data sanifu ya JPEG. Vikomo hivyo
vinajitegemea kutoka kwenye kikomo cha jumla cha maingizo 64/MiB 256: shinikizo la mgao wa mhusika
huondoa tu maingizo ya mhusika huyo ambayo hayajatumiwa kwa muda mrefu zaidi kabla ya uondoaji wa
LRU wa jumla kuzingatiwa. Maingizo yaliyokwisha muda huondolewa kwenye uhasibu wa mhusika na
wa jumla wakati wa shughuli za akiba, huku kughairi na kushindwa kwa uthibitishaji
kukiwa hakuhifadhi kibadala cha sehemu.

Akiba hukataa Base64 isiyo sanifu, ujazaji wa ziada, media isiyo JPEG, JPEG zilizoharibika au
zilizokatwa, na JPEG zinazosababisha onyo wakati wa usimbuaji wa picha nzima wenye mipaka wa `sharp`.
Husimba upya kila picha iliyokubaliwa kama JPEG sanifu, hutoa upana na urefu
kutoka kwenye baiti zilizosimbuliwa badala ya kuamini sehemu za mwitaji, na hutupa baiti zozote za ziada
za polyglot badala ya kuzihifadhi. Ni bafa sanifu iliyobanwa na yenye mipaka pekee
inayohesabiwa kwenye migawo yote miwili. Kikomo cha waya wa JSON kinajumuisha gharama ya ziada ya Base64 kwa kikomo cha
ingizo lililosimbuliwa cha MiB 32. Kila
data iliyotokana na kuhifadhiwa hurekodi umbizo/azimio lake la JPEG lililothibitishwa, sera ya usampulishaji,
toleo la utengenezaji, muda wa kuundwa, heshi ya maudhui iliyokokotolewa na seva, na rejeleo kuu
lililoheshiwa pamoja na heshi ya maudhui kuu ya mwitaji anayeaminika. Hali ya kughairi hukaguliwa
kati ya awamu zisawazishaji za usimbuaji/hashi kabla ya kuhifadhi atomiki kwenye akiba.

Sehemu hii ya kazi bado haiunganishi mzalishaji wa uzalishaji kwenye njia hiyo wala haitoi
uteuzi wa vibadala vya maazimio mengi. Kwa hiyo, njia wazi ya ombi la Video Bridge
haiongezi kazi yoyote, huku utoaji wa mhusika anayefungamanishwa na mpangaji na
mzunguko kamili wa FU-08 wa maazimio mengi vikibaki kazi ya baadaye iliyoelezwa wazi badala ya
kuandikwa kana kwamba ni tabia iliyokamilika.

Fremu zinawekewa maelezo kwa mfuatano kwa kutumia modeli ya Video iliyosanidiwa. Ubatilishaji tupu wa
Video hurithi mpangilio wa Vision; ikiwa yote miwili ni tupu, kipanga-njia kiotomatiki cha Vision
huchagua modeli madhubuti yenye uwezo wa kuona. Maelezo yaliyofanikiwa
hubadilisha sehemu asili kwa kiambishi awali thabiti cha `[Video description:` ambacho pia
huashiria maandishi kama uchunguzi usioaminika uliotokana na midia na kuziambia modeli za baadaye
zisifuate maagizo yaliyopatikana kwenye midia. Funguo za akiba ya maelezo ya fremu
hujumuisha baiti za JPEG, kidokezo, muhuri wa muda, na modeli madhubuti; ni maelezo
yaliyofanikiwa pekee yanayowekwa akibani. Maingizo ya akiba huhifadhi modeli halisi ya mzalishaji aliyefanikiwa,
ikiwemo modeli mbadala; daraja huripoti `mixed` wakati fremu tofauti
zilitolewa na modeli tofauti. Kupatikana kwa ingizo akibani hutumia tena utambulisho huo wa mzalishaji
badala ya kuupa upya lebo ya mpango wa uelekezaji ulioombwa. Akiba ya matokeo ya
video nzima huwekewa ufunguo kulingana na kila ingizo linalobadilisha tokeo — kidokezo, modeli madhubuti,
sera ya uchukuaji wa sampuli, idadi ya fremu, hali ya uchanganuzi wa kisemantiki, alama ya kidijitali ya SHA-256
ya dokezo la lengo lililosawazishwa, dirisha la lengo, `transcript`,
`audioTranscript`, na alama ya karatasi ya picha — hivyo kubadilisha mojawapo ya
vipengele hivyo husababisha kutopatikana kwenye akiba, kamwe si kutumia tena data iliyopitwa na wakati. Toleo,
kizingiti, na idadi yenye kikomo ya fremu teule za sera ya uondoaji wa nakala za picha pia zimebainishwa wazi katika
ufunguo na metadata za akiba ya matokeo; kwa hivyo, badiliko la sera haliwezi kutumia tena
maelezo ya video nzima yaliyopitwa na wakati. Metadata za v4 za akiba ya matokeo huhifadhi hali na
alama ya kidijitali, kamwe si jukumu ghafi la mtumiaji. Metadata za kizuizi cha usalama huripoti hali zote mbili za
uchanganuzi, iliyoombwa na madhubuti; hali ya `focused` iliyoombwa bila
maandishi ya mtumiaji yanayoweza kutumika huripotiwa kuwa `full` kwa ufanisi.

Kizuizi cha usalama hutoa kila sehemu ya video inayotumika lakini hakielezi zaidi ya
`modalityBridgeVideoMaxVideos`. Kwa lengo lililothibitishwa kuwa na
`supportsVideo === false`, video zilizoshindwa na zilizozidi kikomo hubadilishwa kuwa viashiria wazi vya maandishi
salama ili hakuna video ghafi inayosalia. Wakati uwezo haujulikani, sehemu hizo
hubaki bila kubadilishwa. Malengo yenye `supportsVideo === true` hupita daraja bila kushughulikiwa.
Ishara ya kusitisha ombi la mteja huenezwa kupitia upakuaji, foleni ya wakala,
michakato-tanzu, na miito ya kuweka maelezo; usitishaji husimamisha kati ya video na kamwe
hauruhusu midia ghafi kupita baada ya hitilafu.

Mipangilio ya wakati wa utekelezaji huhifadhiwa kwenye DB na kuthibitishwa na Zod:

| Ufunguo                             | Chaguo-msingi | Masafa / tabia                                                                                                       |
| ----------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Hiari wakati wa utekelezaji, lazima iwashwe kwa makusudi                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` huhifadhi maelezo ya jumla; `focused` hutumia muktadha wenye kikomo, usioaminika wa mtumiaji wa hivi karibuni |
| `modalityBridgeVideoModel`          | `""`          | Hurithi modeli ya Vision Bridge                                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware`, au `segment_aware` ya uwiano; kushindwa kwa kigunduzi hurudi kwenye `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                                       |

Thamani za muda wa kuisha wa Video zilizohifadhiwa zamani zinazozidi sekunde 120 hupunguzwa hadi
kikomo cha muda cha wakala; uandikaji wa mipangilio mipya unaozidi kikomo hicho hukataliwa.
`GET /api/modality-bridge/video/runtime` huhitaji eneo la loopback linaloaminika na lililotiwa muhuri
kabla ya uthibitishaji au ukaguzi wa wakati wa utekelezaji, kisha huhitaji uthibitishaji wa usimamizi.
Hurejesha tu `available`, matoleo yaliyosafishwa ya FFmpeg/ffprobe, na sababu isiyobadilika
wakati mazingira ya utekelezaji hayapatikani. Sehemu ya mwisho ya ndani ya utoaji si
API ya umma ya upakiaji: kujaa kwa foleni hurejesha `503` pamoja na `Retry-After`, kukatika kwa muunganisho wa
mpigaji hurejesha `499`, na kikomo kisichobadilika cha muda cha wakala hurejesha `504`. Majibu yaliyobadilishwa huongeza
`video->text;model=<visionModel>;parts=<videos>` kwenye kichwa kikuu cha
`x-omniroute-modality-bridge` bila kuondoa sehemu za Vision au Audio.

### Kificha PII (`piiMasker.ts`)

Huendeshwa katika hatua **zote mbili**.

- **`preCall`** hunakili payload, hupitia `system`, `messages`, `input`, na
  `prompt` (ikiwemo vipengee vya mifuatano ya kawaida), na hutumia `processPII()` (kutoka
  `@/shared/utils/inputSanitizer`) kwenye sehemu za mifuatano za `content`/`text`. Wakati
  `PII_REDACTION_ENABLED=true`, PII iliyogunduliwa hufichwa katika payload
  inayotumwa. Hili halitegemei `INPUT_SANITIZER_MODE` (ambayo hudhibiti tu
  sera ya uingizaji wa kidokezo). Wakati ufichaji umezimwa, mwito hurekodi idadi ya ugunduzi
  bila kuandika upya maudhui.
- **`postCall`** hunakili jibu kwa kina, huendesha `sanitizePIIResponse()` pamoja na
  kificha cha muundo wa Responses API (`maskResponsesOutput` — hushughulikia
  `output_text` na `output[].content[].text`). Ikiwa ufichaji wowote utafanyika,
  jibu lililobadilishwa huchukua nafasi ya lile la awali.

Kizuizi cha usalama hakizuii kamwe; huongeza tu ufafanuzi (`meta.detections`,
`meta.redacted`) au huandika upya.

### Uingizaji wa Kidokezo (`promptInjection.ts`)

Hugundua miundo hasidi katika maudhui yaliyotolewa na mtumiaji na kutekeleza
sera iliyosanidiwa. Tabia huamuliwa na vigezo vya mazingira na chaguo za kijenzi:

| Mpangilio            | Kigezo cha mazingira                                                                                            | Chaguomsingi | Athari                                                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Imewashwa            | `INPUT_SANITIZER_ENABLED`                                                                                       | `true`       | Ikiwa `false`, kinga hukatiza mchakato mara moja.                                                                                                                                                            |
| Hali                 | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                 | `warn`       | Sera ya udungaji: `block`, `warn`, au `log`. (`redact` inakubaliwa kwa utangamano wa nyuma lakini **haiondoi** maandishi ya udungaji; uandishi upya wa PII ya ombi unadhibitiwa na `PII_REDACTION_ENABLED`.) |
| Kizingiti cha kuzuia | chaguo la `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (jina mbadala `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Kiwango cha chini cha ukali kinachohitajika ili kuzuia. Kwa chaguomsingi, kiwango cha kati ni cha ufuatiliaji pekee.                                                                                         |

**Kipaumbele cha hali** (`getMode`): `options.mode` ya mpigaji →
**ubatilishaji wa alama ya kipengele kwenye DB** wa `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → kigezo cha mazingira cha `INJECTION_GUARD_MODE` → kigezo cha mazingira cha `INPUT_SANITIZER_MODE` →
`warn`. Kwa hiyo, ubatilishaji wa dashibodi hupewa kipaumbele kuliko vigezo vya
mazingira, hivyo UI ya Feature Flags hudhibiti kinga inayoendesha moja kwa moja
(bila kuwasha upya). Usomaji wa DB ni salama unaposhindwa:
ukitokea hitilafu, kinga hurudi kwenye tabia inayotegemea vigezo vya mazingira,
na ikiwa hakuna ubatilishaji uliowekwa, tabia hufanana na utatuzi unaotumia
vigezo vya mazingira pekee.

Vyanzo vya utambuzi:

1. `sanitizeRequest()` kutoka `@/shared/utils/inputSanitizer` (mkusanyiko wa
   vitambuzi vya pamoja unaotumiwa kwingine katika mchakato).
2. `DEFAULT_GUARD_PATTERNS` zilizojengewa ndani (kwa sasa `system_override_inline` na
   `markdown_system_block`, zote zikiwa na ukali wa `high`).
3. `customPatterns` za hiari zinazopitishwa kupitia machaguo ya constructor (strings, regex,
   au rekodi za `{ name, pattern, severity }`).

Wakati `mode === "block"` **na** angalau utambuzi mmoja unafikia kizingiti cha
ukali, `preCall` hurejesha `{ block: true, message: "Request rejected:
suspicious content detected" }`. Katika hali za `warn`/`log`, kinga huandika
kumbukumbu lakini huruhusu mwito. Kisaidizi cha pamoja `evaluatePromptInjection()` pia
husafirishwa kwa wapigaji wanaohitaji kutathmini prompts bila kupitia registry.

**Kikomo cha uchanganuzi (v3.8.20):** kitambuzi hukagua tu **KB 16 za kwanza** za
maandishi ya prompt yaliyounganishwa — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (baiti 16 384) katika
`src/shared/utils/inputSanitizer.ts`. `detectInjection()` na
`evaluatePromptInjection()` zote hutumia `slice(0, MAX_INJECTION_SCAN_BYTES)` kabla ya kuendesha
kitanzi cha patterns. Maagizo ya udungaji huwa karibu na sehemu ya juu ya ingizo, hivyo hii
huwekea kikomo matumizi ya CPU/GC ya regex kwenye payload zenye mamia ya KB bila kudhoofisha utambuzi (taz.
#3932, #4041).

### Kificha Vitambulisho (`credentialMasker.ts`)

Huendesha katika hatua **zote mbili**, ikiwa ya mwisho katika msururu chaguomsingi (kipaumbele `95`). Huficha
patterns zinazojulikana za API-key / secret-token kutoka kwenye payload inayotumwa (maudhui ya
ujumbe, hoja za tool-call, matokeo ya zana) **na** jibu la provider, ili
kitambulisho kilichobandikwa kwenye prompt (au kurudiwa na matokeo ya zana) kisivuje
kwenda kwa provider wa upstream au kurudi kwa client.

- **Huwashwa kwa hiari pekee**, kwa utaratibu sawa na ufichaji wa PII (karibu na Kanuni Ngumu #20):
  imezimwa isipokuwa `settings.credentialRedactionEnabled === true` **au**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ikiwa imezimwa, kinga haifanyi chochote —
  haizuii kamwe wala kuandika upya.
- `redactCredentials()` hupitia mti mzima wa payload/jibu (`walkValue()`,
  salama dhidi ya uchafuzi wa prototype, salama dhidi ya mizunguko kupitia `WeakSet`) na hubadilisha zinazolingana kwa
  kishikilia nafasi cha `[REDACTED:<type>]`, huku ikinakili matawi yaliyobadilika
  pekee.
- `CREDENTIAL_PATTERNS` hushughulikia funguo za LLM provider (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeni za VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), funguo za malipo (Stripe, Square), funguo za
  cloud (AWS access key, Twilio, SendGrid, Mailgun), funguo binafsi / JWTs,
  connection strings zenye vitambulisho (`mongodb://user:pass@...`, n.k.), na
  pattern ya jumla ya thamani ya header ya `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Funguo zenye muundo wa header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) hufichwa kimuundo (thamani pekee, huku kiambishi awali cha scheme kama
  `Bearer `/`Basic ` kikihifadhiwa) badala ya kupitia regex ya jumla ya maandishi.
- Kinga haizuii kamwe; huandika upya pekee (`modifiedPayload` /
  `modifiedResponse`) na huweka maelezo ya ziada (`meta.credentialsRedacted`, `meta.count`).

Kinga dhidi ya urejeaji nyuma: `tests/unit/credential-masker-guardrail.test.ts`.

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
