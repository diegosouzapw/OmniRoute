# Guardrails (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sors awtorevoli:** `src/lib/guardrails/`
> **Aġġornat l-aħħar:** 2026-08-29 — v3.8.51 (il-provenjenza tat-traskrizzjoni ta’ Video Bridge tiġi ddikjarata minn min isejjaħ,
> u għadha mhix ivverifikata mis-server — iċċarat skont #11661)

Il-guardrails jinfurzaw is-sikurezza, il-politiki u t-trasformazzjonijiet tal-kontenut fil-konfini
bejn OmniRoute u l-fornituri upstream. Kull guardrail jista’ jispezzjona (u,
b’mod fakultattiv, jirrifjuta, jittrasforma jew jannota) il-payloads tat-talbiet (`preCall`) u
r-risposti upstream (`postCall`).

Is-sistema hija **fail-open**: jekk guardrail jitfa’ eċċezzjoni waqt l-eżekuzzjoni, ir-reġistru
jirreġistra l-iżball u jkompli bil-guardrail li jmiss minflok ifalli
t-talba. L-imblukkar huwa deċiżjoni espliċita (`block: true`), qatt aċċident.

## Guardrails Integrati

Ir-reġistru jgħabbi awtomatikament sitt guardrails skont l-ordni ta’ prijorità waqt l-importazzjoni
(ara `registry.ts` → `registerDefaultGuardrails()`):

| Prijorità | Isem                | Stadju/i       | Fajl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numri ta’ prijorità aktar baxxi jitħaddmu **l-ewwel**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Jinterċetta talbiet li fihom stampi u li huma mmirati lejn **mudelli mingħajr kapaċitajiet viżivi**, u jew
jerġa’ jidderieġi t-talba kollha lejn mudell b’kapaċitajiet viżivi, jew jissostitwixxi l-partijiet
tal-istampi b’deskrizzjonijiet testwali ġġenerati minn mudell viżiv konfigurabbli qabel
is-sejħa upstream. Dan jippermetti lill-fornituri li jaħdmu bit-test biss jimmaniġġjaw
payloads multimodali b’mod trasparenti.

Fluss:

1. Aqbeż jekk il-mudell fil-mira diġà jappoġġja l-viżjoni (sakemm ma jidhirx fil-
   lista ta’ bridge sfurzat `isVisionBridgeForcedModel`).
2. Oħroġ il-partijiet tal-istampi permezz ta’ `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), li tiddelega lid-**detettur unifikat tal-midja**
   `detectMediaParts()` f’`open-sse/utils/mediaParts.ts` — is-
   sors uniku awtorevoli kondiviż mal-filtru tal-kompatibbiltà combo.
   L-estrazzjoni hija ristretta permezz ta’ allowlist għal partijiet tal-ogħla livell bil-forom
   li `replaceImageParts` tista’ terġa’ ddaħħal f’posthom (il-kuntratt extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, u Responses API `input_image`. Riżultati annidati u
   forom li fihom indikaturi biss huma materjal għall-filtru combo u qatt ma jiġu estratti.
   Aqbeż jekk ma jinstab xejn.
3. Irrisolvi l-konfigurazzjoni waqt it-tħaddim permezz ta’ `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): iċ-ċwievet il-ġodda tas-settings `modalityBridge*`
   jieħdu preċedenza; iċ-ċwievet preċedenti `visionBridge*` jibqgħu **fallback għal ċiklu
   wieħed** (perjodu ta’ rollback). Aqbeż qabel kwalunkwe traversar tal-midja meta l-
   bridge jkun diżattivat.
4. Is-selettur tal-modalità (`modalityBridgeVisionMode`, ara t-tabella hawn taħt) jiddeċiedi
   bejn ridirezzjonar u deskrizzjoni. Ir-ridirezzjonar jirritorna `modifiedPayload` fejn jinbidel biss `model`,
   flimkien mal-meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Perkors tad-deskrizzjoni: illimita l-istampi għal `maxImages`, ikkomponi l-prompt konxju tal-kompitu,
   ikkonsulta l-cache tad-deskrizzjonijiet, sejjaħ il-mudell viżiv **b’mod parallel**
   (`Promise.allSettled`), u daħħal partijiet testwali `[Image N]: <description>`
   minflokhom. Deskrizzjoni li tfalli tipproduċi `null` u l-parti oriġinali tal-istampa tiġi
   **ppreservata** (#4012) — ħlief fil-perkors tad-deskrizzjoni combo meta
   d-deskrizzjonijiet kollha jfallu, fejn upstream ikkonfermat li ma jappoġġjax il-viżjoni jirċievi
   minflok placeholder `(unavailable — no vision-capable provider connected)` (#8430).
6. Irritorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettur tal-modalità (`modalityBridgeVisionMode`)

| Modalità   | Default | Imġiba                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Euristika preċedenti, mhux mibdula (#6640/#7204): mudelli mhux combo/`auto/` jiġu ridiretti lejn l-aħjar mudell viżiv sakemm il-mudell oriġinali ma jkollux kredenzjali li jistgħu jintużaw (f’dak il-każ issir deskrizzjoni); miri combo dejjem jiġu deskritti.                                                                                    |
| `describe` |         | Dejjem iddeskrivi — il-blokk tar-ridirezzjonar jinqabeż kompletament; il-mudell magħżul mill-utent dejjem iwieġeb.                                                                                                                                                                                                                                  |
| `reroute`  |         | Sforza r-ridirezzjonar: il-kontroll biex jinżamm mudell bi kredenzjali jinqabeż. Il-kontroll tal-kredenzjali tal-**mira** tar-ridirezzjonar xorta japplika — meta ma teżisti l-ebda mira viżiva li tista’ tintuża, it-talba tgħaddi għad-deskrizzjoni biex l-istampi mhux ipproċessati qatt ma jaslu għand backend li jaħdem bit-test biss (#8430). |

Il-modalitajiet sfurzati joħorġu kmieni **qabel** ma titħaddem l-euristika awtomatika; l-imġiba ta’ `auto`
hija identika, byte b’byte, għall-guardrail ta’ qabel PR-1.

#### Prompt tad-deskrizzjoni konxju tal-kompitu (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) iżżid
it-test tal-**aħħar messaġġ tal-utent** (imqassar għal 500 karattru) mal-prompt
bażi tad-deskrizzjoni, biex id-deskrizzjoni tiġi ggwidata lejn dak li fil-fatt talab l-utent
(mudell codex-vision-proxy), u titlob lill-mudell viżiv jittraskrivi t-test viżibbli.
Meta l-flag ikun mitfi — jew ma jkun hemm l-ebda test tal-utent — jintuża l-prompt bażi mingħajr tibdil.

It-talba kompatibbli ma’ OpenAI tas-self-loop ta’ describe (`callVisionModelSingle()`
f’`visionBridgeHelpers.ts`) dejjem titlob `image_url.detail: "high"` —
mingħajr kundizzjonijiet, għal kull min jagħmel is-sejħa/fornitur, u mingħajr ma
tiddependi fuq xi sinjal mill-klijent. Il-kampjunar b’dettall baxx inaqqas
il-preċiżjoni tal-OCR eżattament għall-kompitu ta’ traskrizzjoni tat-test li
titlob din il-prompt, għalhekk is-sejħa describe nnifisha dejjem titlob dettall
għoli irrispettivament mil-livell ta’ dettall li ntuża fit-talba oriġinali
deħlin. Dan jaffettwa biss il-body tat-talba describe interna; ma jbiddilx
il-mod kif OmniRoute jgħaddi l-`image_url.detail` tal-klijent fit-talba
primarja — dak il-valur default jiġi applikat separatament, u biss għal klijenti
OpenCode identifikati, f’`defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Il-fergħa tal-wire-format
Anthropic tas-self-loop describe ma għandhiex field `detail` u mhijiex
affettwata minn ebda wieħed minn dawn il-valuri default.

#### Limitu tal-output ta’ describe (`modalityBridgeVisionMaxChars`)

| Ċavetta                        | Default | Firxa             |
| ------------------------------ | ------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` jew 100–50000 |

`0` (default) ifisser **ebda limitu** — id-deskrizzjoni rritornata minn
`callVisionModel()` tgħaddi mingħajr modifika, u b’hekk tinżamm l-imġiba
eżistenti. Kwalunkwe valur fil-firxa 100–50000 iqassar id-deskrizzjoni b’suffiss
`…` qabel ma tiddaħħal lura bħala `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` f’`src/lib/guardrails/visionBridge.ts`).
Żid dan għal kompiti OCR b’ħafna dettalji fejn il-mudell downstream jeħtieġ
it-traskrizzjoni sħiħa; naqqsu biex tillimita l-użu tat-tokens fuq mudelli
tal-viżjoni li jipproduċu ħafna test. Il-field tad-dashboard jinsab fil-panel
Advanced tat-tab Vision (`modality-bridge-max-chars`
f’`ModalityBridgeVisionTab.tsx`) u jgħolli kwalunkwe valur bejn 1 u 99
sal-limitu minimu ta’ 100, filwaqt li jħalli `0` espliċitu mhux mibdul —
`0` huwa valur Zod validu fih innifsu
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mhux sempliċement
il-valur default “mhux issettjat”.

#### Cache ta’ describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL fil-memorja għall-outputs ta’ describe, kondiviża mal-proċess
kollu. Ċavetta = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
bi framing bi prefiss tat-tul (mingħajr kolliżjonijiet bejn il-konfini
tal-fields). Il-komponent tal-mudell huwa l-mudell tal-bridge **ikkonfigurat**,
mhux il-mudell li fil-fatt wieġeb — `callVisionModel` jista’ juża fallback
internament, u l-użu ta’ ċavetta għal kull tentattiv jifframmenta l-cache.
Deskrizzjonijiet li jfallu qatt ma jinżammu fil-cache. Settings:

| Ċavetta                         | Default | Firxa   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalizzazzjoni ta’ immaġnijiet remoti (self-loop describe/fetch base64)

Meta l-bridge jiffetchja immaġni **remota** huwa stess — is-self-call describe
ta’ Anthropic u l-konverżjoni għal base64 tal-claude-wire-format
(`ensureBase64ImagesForClaudeWire`), it-tnejn permezz ta’
`fetchRemoteImageAsDataUri()` f’`visionBridgeHelpers.ts` — id-data URI
riżultanti tgħaddi minn `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) qabel ma tiġi inkorporata fit-talba
tal-mudell tal-viżjoni. Immaġnijiet kbar wisq jitnaqqsu għal **tarf twil ta’
2048px** (li jaqbel mal-limitu tar-resize li OpenAI/Anthropic diġà japplikaw
server-side), u dan inaqqas il-bytes/latency tal-upload mingħajr ma jbiddel dak
li jara l-mudell tal-viżjoni. Ir-resize juża `sharp`, mgħobbi permezz ta’
import dinamiku: fuq pjattaforma fejn il-binary nattiv tiegħu jonqos milli
jitgħabba, `normalizeDataUri()` **qatt ma jitfa’ exception** — juża fallback li
jgħaddi l-bytes oriġinali mingħajr modifika, sabiex il-passaġġ
describe/konverżjoni għal base64 jibqa’ dejjem jaħdem. Bytes li mhumiex ta’
immaġni (fetch li ma rritornax immaġni li tista’ tiġi decoded) ukoll jgħaddu
mingħajr modifika. Din in-normalizzazzjoni hija limitata għall-immaġnijiet li
l-bridge jiffetchja għas-self-call tiegħu stess — qatt ma tiġi applikata
għall-payload passthrough mhux ipproċessata tal-klijent, b’mod konsistenti
mal-prinċipju ta’ mutazzjoni opt-in biss (Hard Rule #20).

#### Schema tas-settings + migrazzjoni

Iċ-ċwievet il-ġodda `modalityBridge*` jiġu vvalidati b’Zod
f’`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, it-trio
`modalityBridgeCache*`, u l-grupp `modalityBridgeAudio*` użat mill-Audio
Bridge. Il-migrazzjoni `141_modality_bridge_settings.sql` tikkopja l-valuri
legacy eżistenti `visionBridge*` lejn iċ-ċwievet il-ġodda korrispondenti
(idempotenti, u qatt ma tissostitwixxi valur `modalityBridge*` issettjat
minn operatur); iċ-ċwievet legacy jibqgħu aċċettati bħala fallback għall-qari
għal ċiklu wieħed ta’ release.

#### Header tat-trasparenza + statistika

Responses ittrasformati minn describe jkollhom
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(mibni minn `buildModalityBridgeHeader()` f’`modalityBridge/bridgeStats.ts`,
u miżjud minn `withModalityBridgeHeader()` f’`src/sse/handlers/chatHelpers.ts`).
Talbiet rerouted ma jingħataw **ebda** header — il-payload ma ġiex mibdul u
l-bidla tal-mudell diġà tidher fil-field `model` tal-body tar-response.

`GET /api/modality-bridge/stats` (awtentikazzjoni tal-management, l-istess
livell bħal `GET /api/settings`) jirritorna l-counters fil-memorja għal kull
modalità `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` għal `vision`, `audio`, u
`video`. `averageLatencyMs` juża `latencySamples`, mhux it-tentattivi kollha,
bħala d-denominatur tiegħu; operazzjoni mingħajr timing ma toħloqx kampjun
falz ta’ żero millisekondi. `bridged` jibqa’ l-alias kompatibbli ma’ verżjonijiet
preċedenti għal konverżjonijiet b’suċċess; tentattivi li jfallu ma jżiduhx.
Il-counters jerġgħu jiġu ssettjati meta l-proċess jerġa’ jibda, intenzjonalment
(telemetrija, mhux kontabbiltà).

#### Konfigurazzjoni tad-dashboard

Il-paġna dedikata tad-dashboard hija
`/dashboard/settings/modality-bridge`. It-tabs tagħha `Vision`, `Audio`,
u `Video`, li jistgħu jiġu indirizzati permezz tal-URL, jippreservaw il-parametri tal-query waqt li jaqilbu l-valur `tab`.
It-tab Vision tipprovdi attivazzjoni, modalità, għażla tal-mudell (inkluż il-valur predefinit
awtomatiku), prompting konxju tal-kompitu, limiti avvanzati għat-timeout/immaġni/tul tad-deskrizzjoni/cache,
counters tar-runtime, u talba kampjun protetta. It-tab Audio hija attiva wkoll: tipprovdi
attivazzjoni, selettur tal-mudell għal STT biss b’Auto, limiti għat-timeout/tul massimu tal-klipp, counters
tal-awdjo, u test kampjun `input_audio`. It-tab Video hija funzjonali: tirrapporta
l-istat tar-runtime ta’ FFmpeg/ffprobe — wieħed minn erba’ stati espliċiti tal-UI (`unknown` waqt li
l-probe tkun għadha għaddejja jew ma setgħetx titlesta, `restricted` fuq host tad-dashboard li mhuwiex loopback
fejn il-probe tinqabeż min-naħa tal-klijent, `unavailable` ladarba ssir il-probe
u jiġi kkonfermat li mhuwiex disponibbli, jew `available` bil-verżjonijiet ta’ FFmpeg/ffprobe) — tippersisti
l-limiti ta’ attivazzjoni/mudell/frames/video/timeout, tiffiltra s-selettur tal-mudell għal mudelli
li jappoġġjaw il-viżjoni, u tipprovdi counters tal-video.

Il-card preċedenti Vision Bridge taħt is-settings tal-AI issa hija link ta’ kompatibbiltà għall-
paġna l-ġdida; m’għadhiex iżżomm kopja oħra tal-formola. Media Providers ukoll
torbot il-workflows Image-to-Text u Speech-to-Text mat-tabs korrispondenti ta’ Modality
Bridge mingħajr ma tneħħi l-playground eżistenti ta’ Speech-to-Text.

**Bypass tal-ammissjoni għas-self-loop:** meta s-sejħa describe tgħaddi mis-
self-loop `/v1` ta’ OmniRoute stess (mudell ta’ provider mhux standard), is-sub-request tibgħat
`x-omniroute-admission-bypass: internal` u tiġi awtentikata bil-kredenzjali tas-self-loop riżolta
— is-sentinel lokali `sk_omniroute` fil-modalità lokali, jew iċ-ċavetta tal-env
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ikkonfigurata mill-operatur (#1350) sabiex
deployments b’`REQUIRE_API_KEY=true` xorta jkunu jistgħu jħaddmu s-sejħa describe. Il-bypass
jiġi rrispettat biss għal dawk il-kredenzjali eżatti, għalhekk klijenti esterni ma jistgħux jużaw il-
header biex jaqbżu l-ammissjoni.

Il-valuri predefiniti legacy jinsabu f’`src/shared/constants/visionBridgeDefaults.ts`; il-
valuri predefiniti l-ġodda għall-modalità/kompitu/cache u r-resolver tas-settings jinsabu f’
`src/shared/constants/modalityBridgeDefaults.ts`. Il-guardrail jipprovdi għażla tal-kostruttur
`deps` sabiex it-tests ikunu jistgħu jinjettaw implimentazzjonijiet foloz ta’ `getSettings` u
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Tinterċetta talbiet taċ-chat li fihom awdjo qabel ma jilħqu target li mhuwiex
magħruf li jaċċetta input tal-awdjo. Qatt ma tbiddel ir-rotta tat-talba taċ-chat: il-partijiet tal-awdjo jiġu
traskritti permezz tal-endpoint multipart eżistenti kompatibbli ma’ OpenAI u l-
mudell taċ-chat magħżul ikompli bit-traskrizzjonijiet testwali.

Fluss:

1. Irrisolvi `supportsAudio` permezz ta’ `getResolvedModelCapabilities()`. Il-metadata espliċita
   tar-reġistru tal-provider tieħu prijorità, imbagħad il-metadata statika tal-mudell, u wara
   `modalities_input` sinkronizzat. Lista ddikjarata ta’ inputs mingħajr `audio` hija `false`; jekk ma jkunx
   hemm evidenza dwar il-kapaċità, il-valur jibqa’ `null`. Kemm `false` kif ukoll `null` jattivaw il-
   bridge konservattiv, filwaqt li `true` taqbeż il-bridge.
2. Irrisolvi s-settings `modalityBridgeAudio*` u estratta l-partijiet tal-awdjo tal-ogħla livell
   li jistgħu jiġu spliced minn kull messaġġ permezz tad-detector kondiviż `detectMediaParts()`.
   Il-formati appoġġjati fuq il-wire huma `input_audio` ta’ OpenAI, `audio_url`, u
   `source.media_type: "audio/*"`. Awdjo nested jiġi skopert għar-routing iżda ma
   jitneħħiex mill-path tal-splice. Ix-xogħol huwa limitat minn `modalityBridgeAudioMaxClips`;
   il-partijiet ta’ wara jibqgħu mhux mibdula.
3. Irrispetta `provider/model` ikkonfigurat, jew ħalli lil `selectAudioBridgeModel()` jgħaddi
   minn `AUDIO_TRANSCRIPTION_PROVIDERS` skont l-ordni stabbli tal-katalogu u jagħżel l-ewwel
   mudell bi kredenzjali attiva u li tista’ tintuża tal-provider.
4. `callAudioTranscription()` tikkonverti awdjo base64/data-URI għal `file`
   multipart, jew tniżżel `audio_url` remot permezz tal-guard outbound pubbliku biss
   b’DNS pinning u limitu ta’ 25 MB. Imbagħad tibgħat POST bil-file u l-mudell magħżul
   lis-self-loop lokali `/v1/audio/transcriptions`, awtentikat permezz ta’
   `resolveSelfLoopBearer()`. Ir-rotta tat-traskrizzjoni eżistenti twettaq it-tiftix normali
   tal-kredenzjali, l-immaniġġjar ta’ cooldown/rate-limit, u d-dispatch lill-provider.
5. Sejħiet li jirnexxu jissostitwixxu l-partijiet tagħhom b’`[Audio N]: <transcript>`. Is-sejħiet
   jitħaddmu b’`Promise.allSettled`: falliment individwali jippreserva dik il-parti oriġinali
   tal-awdjo (kuntratt #4012). Jekk kull sejħa tfalli u jkun ippruvat li t-target
   għandha `supportsAudio === false`, il-partijiet isiru
   `[Audio N]: (unavailable — no STT provider connected)` (kuntratt #8430). Għal
   target mhux magħruf (`null`), riżultat fejn ifallu s-sejħiet kollha jibqa’ mhux mibdul. Target li jkun
   ippruvat li jaċċetta biss test u li ma jkollux kredenzjali STT li tista’ tintuża jirċievi l-istess
   stub espliċitu mingħajr ma ssir sejħa tan-network.

Traskrizzjonijiet li jirnexxu jużaw il-cache LRU/TTL ta’ Modality Bridge għall-proċess kollu. Iċ-
ċavetta tgħaqqad ir-referenza tal-awdjo, it-tikketta stabbli tal-operazzjoni `audio-transcription`,
u l-mudell STT magħżul; il-fallimenti qatt ma jiġu cached. Tentattivi tal-awdjo jaġġornaw
il-counters kondiviżi `bridged`, `cacheHits`, `failures`, u `lastUsedAt`.
Risposti trasformati jġorru
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; talbiet mhux mibdula
ma jirċevux segment ta’ Audio Bridge.

Is-settings tar-runtime huma appoġġjati mid-DB u vvalidati b’Zod:

| Ċavetta                       | Valur predefinit | Firxa               |
| ----------------------------- | ---------------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`           | —                   |
| `modalityBridgeAudioModel`    | `""`             | Auto jew ID ta’ STT |
| `modalityBridgeAudioTimeout`  | `60000`          | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`              | 1–10                |

Il-cache kondiviża tibqa’ kkontrollata minn `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, u `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Jinterċetta partijiet tal-vidjo fl-ogħla livell f’Chat Completions `messages` u fl-API Responses
`input` qabel ma tissejjaħ mira mingħajr appoġġ nattiv magħruf għall-vidjo.
Il-forom appoġġjati huma `input_video`, `video_url`, `video_source`, URLs HTTPS,
u URIs tad-data `data:video/*;base64,...`. Ismijiet sempliċi ta’ fajls fit-test ma jiġux ittrattati
bħala vidjo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) jieħu ħsieb il-perkors tat-talba,
il-verifika tal-kapaċità/politika, l-aggregazzjoni għal kull talba, u l-payload tar-rispons.
Ix-xogħol għal kull vidjo — l-akkwist, il-cache tar-riżultat sħiħ, id-deskrizzjoni ta’ sekwenza
ta’ frames (li tintegra kwalunkwe traskrizzjoni tal-awdjo ddikjarata minn min jagħmel it-talba),
u l-metriċi/l-interruzzjoni/it-tindif għal kull tentattiv — huwa moħbi wara `processVideoPart` fi
`videoBridgePipeline.ts`, li jissejjaħ darba għal kull parti tal-vidjo ġewwa l-loop ta’ `preCall`.
Dak il-modulu jiddefinixxi wkoll il-konfini espliċiti tal-ports `VideoMediaBrokerPort`
(l-akkwist tal-bytes u l-estrazzjoni tal-frames meħuda bħala kampjun), `VideoAudioTranscriptionPort`
(l-integrazzjoni ta’ traskrizzjoni tal-awdjo ddikjarata minn min jagħmel it-talba mal-captions tal-kampjuni),
u `VideoDrilldownPort` (il-konfini tal-persistenza għall-analiżi dettaljata tal-frames; għadu mhux ikkonnettjat
ma’ `processVideoPart` — illum hija biss ir-rotta separata `/api/modality-bridge/video/drilldown`
li tikteb entrati tal-analiżi dettaljata).

Il-perkors pubbliku tat-talba `/v1` qatt ma jimporta jew jinvoka subprocess. Vidjos remoti
jitniżżlu taħt limitu ta’ 50 MiB; vidjos base64 inline għandhom limitu konservattiv dekodifikat
ta’ 36 MiB għal kull vidjo sabiex l-envelop tal-mudell/messages/framing ikun jista’ jibqa’
fil-limitu pubbliku ta’ ammissjoni ta’ 50 MiB għat-talbiet JSON. It-tul inline u l-istimi
tad-daqs dekodifikat jiġu vverifikati qabel l-allokazzjoni. HTTPS huwa meħtieġ fuq il-URL remot
inizjali u fuq kull ridirezzjoni, bl-użu tal-gwardja eżistenti għal konnessjonijiet ħerġin pubbliċi biss
b’DNS pinning. Imbagħad il-bytes jaqsmu l-konfini eżatti tal-broker intern
`POST /api/modality-bridge/video/extract`. Dik ir-rotta hija kemm
`LOCAL_ONLY` kif ukoll `SPAWN_CAPABLE`, taċċetta biss talba awtentikata għal kull proċess
minn loopback fdat, u qatt ma taċċetta URL, perkors tas-sistema tal-fajls, eżegwibbli,
jew lista ta’ argumenti. Il-pipeline tal-limitu tad-daqs tal-body tal-API u l-qarrej inkrementali
tal-body tal-handler jinfurzaw b’mod indipendenti limitu ta’ input ta’ 50 MiB għall-broker.
Il-kju limitat tiegħu jwettaq estrazzjoni waħda kull darba, jippermetti erba’ xogħlijiet pendenti,
u jillimita l-input pendenti għal 100 MiB.

Ġewwa l-broker, `ffprobe` jaqra fajl lokali privat; il-lista fissa ta’ formati permessi
teskludi formati ta’ playlists u manifests. Għal containers permessi tal-familja MOV,
ir-referenzi esterni għad-data MOV jibqgħu diżattivati b’mod awtomatiku, u l-kmand fiss
ma jattivahomx. Kemm `ffprobe` kif ukoll `ffmpeg` jużaw il-lista permessa ta’ protokolli
limitata għal `file`, thread wieħed, arrays fissi ta’ argumenti, l-ebda shell,
u eżegwibbli riżolti minn `PATH`. Streams ta’ stampi tal-qoxra mehmuża mhumiex
kandidati li jistgħu jintlagħbu. L-istreans kollha li jistgħu jintlagħbu jridu jissodisfaw
il-limiti, u stream default espliċitu jingħata preferenza qabel il-fallback deterministiku
għall-indiċi l-aktar baxx. Il-vidjos huma limitati għal 600 sekonda, 8,192 pixel għal kull
dimensjoni, u 33,554,432 pixel tas-sors. FFmpeg jieħu bħala kampjun 1–16-il frame JPEG
mill-punti tan-nofs, inaqqas it-tarf it-twil sa mhux aktar minn 1,024 pixel mingħajr ma jkabbar
inputs iżgħar, u qatt ma jirċievi URL. Il-kampjunar huwa `uniform` b’mod awtomatiku.
Il-politiki fakultattivi `scene_aware` u sperimentali `segment_aware` iwettqu pass fiss
addizzjonali wieħed ta’ FFmpeg fuq l-istream lokali li jkun diġà ġie vvalidat, jagħżlu
timestamps ta’ xeni `showinfo` limitati, u jaqgħu lura b’mod deterministiku għall-istess
punti tan-nofs uniformi meta d-detector ifalli, jiskadi ż-żmien, l-output ikun malformat,
jew is-sett ta’ kandidati jkun vojt. Il-modalità segment-aware talloka kampjuni tal-punti
tan-nofs proporzjonalment għall-intervalli tax-xeni vvalidati; l-evidenza segment-aware
u l-imġiba tal-fallback huma spjegati fid-dettall hawn taħt. Il-limitu strett ta’ 16-il frame
jiġi applikat wara l-għażla f’kull politika. Meta talba scene-aware jkollha baġit ta’ frame
wieħed biss, tuża l-punt tan-nofs uniformi tal-vidjo sħiħ attiv jew tat-tieqa ta’ fokus u
tirrapporta `policyEffective: uniform`: frame wieħed magħżul minn xena ma jistax
jippreserva ż-żewġt itruf temporali. Min jagħmel it-talba jista’ b’mod fakultattiv jipprovdi
tieqa ta’ fokus finita (`start`/`end` f’sekondi); il-konfini jiġu limitati għad-durata tal-midja,
twieqi maqluba jew mhux finiti jiġu rrifjutati, u l-politiki kollha tal-kampjunar jitwettqu biss
ġewwa l-intervall normalizzat. It-tieqa li tirriżulta tiġi inkluża fil-metadata tal-kampjunar
u fil-prefiss tad-deskrizzjoni mhux fdat sabiex il-mudelli downstream ikunu jistgħu
jiddistingwu silta ffokata mil-linja taż-żmien sħiħa.

Il-fokus semantiku tal-captions huwa setting separat u espliċitu. Il-modalità default ta’
analiżi `full` iżżomm il-prompt eżistenti tal-frames u qatt ma tibgħat it-test tat-talba
lill-mudell tal-captions. Fil-modalità `focused`, il-bridge jaqra biss l-aktar
`text`/`input_text` reċenti, mhux vojt u miktub mill-utent mill-istess container ta’ Chat jew Responses,
jinnormalizzah għal NFC, jgħaqqad flimkien karattri ta’ kontroll u spazji bojod,
u jillimitah għal 500 punt ta’ kodiċi Unicode. Riżultat vojt jaqa’ lura għall-prompt eżatt
ta’ `full`. Ħjiel li jista’ jintuża jiġi sserjalizzat bħala JSON fi block apposta ta’
kuntest mhux fdat tal-utent u jista’ biss jagħti prijorità lil dettalji osservabbli; ma jistax
jissostitwixxi t-twissija separata kontra li jiġu segwiti struzzjonijiet viżibbli jew li jinstemgħu
fil-midja. Il-fokus testwali qatt ma jiddeduċi `start`/`end` u lanqas ibiddel is-sampler temporali.

#### Evidenza strutturali tas-segmenti FU-07

`segment_aware` juża pass wieħed limitat ta’ analiżi preliminari fuq l-istream tal-vidjo lokali
li jkun diġà ġie vvalidat. Il-katina fissa tal-filtri l-ewwel tnaqqas l-iskala għal mhux aktar minn
320 pixel fil-wisa’, tidentifika bidliet fix-xeni u intervalli ffriżati, imbagħad tieħu kampjun
ta’ frame wieħed kull sekonda għall-iċċajpar, il-luma medja, u l-informazzjoni spazjali/temporali.
Il-pass huwa limitat għal 600 kampjun strutturali, thread wieħed ta’ FFmpeg/filtru, l-istess
listi permessi ta’ protokolli limitati għal `file` u ta’ containers, limitu ta’ output tal-proċess
ta’ 1 MiB, u mhux aktar minn 30 sekonda fi ħdan l-interruzzjoni/skadenza kondiviża tal-broker.
Qatt ma jaċċetta kmand, filtru, perkors, jew URL mit-talba.

Il-valuri strutturali huma evidenza ta’ kampjunar deterministiku, mhux fehim semantiku tal-vidjo. Ma jiddeduċux suġġetti, azzjonijiet, sottotitli, diskors, jew l-intenzjoni tal-utent. Il-konfini tax-xeni u tal-iffriżar jiffurmaw segmenti; il-kopertura tal-iffriżar, iċ-ċajpir, l-esponiment, id-dettall spazjali, u l-bidla temporali jinfluwenzaw biss kif jitqassam il-baġit eżistenti ta’ 1–16-il frejm. Segment kompletament iffriżat huwa limitat għal frejm wieħed, filwaqt li s-segmenti mhux iffriżati jikkompetu għall-baġit li jifdal. Meta jkun hemm aktar konfini milli frejms, tinżamm kopertura uniformi tal-kronoloġija sabiex qtugħ rapidu fil-bidu ma jkunx jista’ jaħbi segment twil fl-aħħar. Il-konfini tax-xeni fir-riżoluzzjoni ta’ analiżi ta’ sekonda waħda minn konfini tal-iffriżar jiġu kkombinati.

Filtri neqsin, evidenza ffurmata ħażin/vojta, żball fid-detettur, jew l-iskadenza limitata tal-analiżi preliminari jfallu b’mod permissiv billi jerġgħu lura għall-politika eżatta tal-punt tan-nofs uniformi. Abort minn min jagħmel is-sejħa jew skadenza tal-broker ma jfallux b’mod permissiv: dawn itemmu s-sottoproċess li jkun għaddej, jipprevjenu estrazzjoni sussegwenti tal-frejms, u s-siġra temporanja privata titneħħa f’`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` jiġġenera fixtures reali u deterministiċi ta’ FFmpeg għall-iffrankar fis-sejħiet għas-sottotitli wara d-deduplicazzjoni, l-allokazzjoni tal-baġit għal moviment dens, evidenza ta’ ċajpir/esponiment/SI-TI, qtugħ rapidu b’denb twil, u pożittivi foloz minn sfumar gradwali. Jirreġistra l-ħin reali tal-analiżi preliminari u, fejn `/usr/bin/time` ikun disponibbli, is-CPU tal-proċess sekondarju u l-ogħla RSS. Il-kontrolli tal-kwalità tiegħu huma orakli strutturali biss. Il-kwalità reali tal-mudell tas-sottotitli tibqa’ `HOLD` minħabba li dan il-harness ma għandu ebda endpoint awtorizzat jew ġudikatur fiss. L-iffrankar monetarju wkoll jibqa’ `HOLD` sakemm `--caption-cost-per-call-usd` ma jipprovdix stima espliċita u pożittiva tal-ispiża għal kull sejħa; l-iskript qatt ma jiffabbrika xi wieħed minn dawn ir-riżultati.

Kull frejm huwa limitat għal 4 MiB, il-frejms mhux ipproċessati kollha flimkien għal 23 MiB, u r-rispons serjalizzat tal-broker għal 32 MiB. Direttorju temporanju privat jitneħħa f’`finally`. OmniRoute ma jinkludix FFmpeg u ma jaċċettax mogħdija personalizzata għall-eżekutibbli. Qabel ma joħloq is-sottotitli, il-bridge japplika pass konservattiv ta’ deduplicazzjoni viżiva: kull JPEG jitnaqqas għal buffer ta’ skala tal-griż ta’ 16×16 u jitqabbel biss mal-aħħar frejm miżmum. Għal baġit mitlub ta’ sottotitli ta’ aktar minn frejm wieħed, l-estrazzjoni tipprovdi ġabra limitata ta’ kandidati sa darbtejn dak il-baġit u qatt aktar minn 16-il frejm. Il-limitu mitlub jiġi applikat biss wara d-deduplicazzjoni, bil-kandidati magħżula tal-bidu u tat-tmiem jinżammu matul it-traqqiq finali meta l-baġit ikun mill-inqas tnejn. Il-politika b’verżjoni
`grayscale-16x16-mean-cells-v2` tuża l-akbar valur bejn id-delta medja tal-luma u l-proporzjon taċ-ċelloli tal-minjatura li d-delta normalizzata tagħhom hija mill-inqas 0.05. Il-livell limitu tad-duplikazzjoni huwa l-kostanti 0.04, magħżul għall-prevedibbiltà aktar milli espost bħala konfigurazzjoni waqt l-eżekuzzjoni. Dan is-sinjal sekondarju b’kuntrast għoli jippreserva moviment żgħir u bidliet fit-test viżibbli li paragun ibbażat biss fuq il-medja jista’ jaħbi. Żbalji fil-komparatur jew fid-decoder jfallu b’mod permissiv u jżommu l-kopertura. Il-metadata tal-output tissepara l-kandidati estratti, il-frejms użati b’suċċess, u d-duplikati viżivi mormija.

Parti tal-vidjo mmarkata b’mod espliċitu tista’ titlob folja ta’ kuntatt b’timestamps. Il-bridge jibni grilja JPEG ta’ mhux aktar minn 4 kolonni u 16-il frejm. Kull ċellola ta’ 512-il pixel tinkorpora t-timestamp tas-sors tagħha f’faxxa tal-qiegħ b’kuntrast għoli, filwaqt li l-istess timestamps jibqgħu fil-metadata testwali għall-assoċjazzjoni u l-awditjar downstream. Il-JPEG sħiħ jibqa’ limitat għal 32 MiB. Jekk `sharp` ma jkunx jista’ jiddekowdja jew jikkomponi l-grilja, il-bridge jerġa’ lura għall-frejms JPEG individwali; abort mill-klijent xorta jiġi propagat matul l-operazzjoni tal-folja.

L-evidenza għall-promozzjoni hija deliberatament separata mill-mikrobenchmark sintetiku tal-kompożizzjoni. `scripts/perf/video-bridge-contact-sheet-eval.ts` jiddefinixxi harness A/B b’verżjoni tal-iskema għal mudelli reali tal-viżjoni kompatibbli ma’ OpenAI. Dan ikejjel it-tokens irrappurtati mill-fornitur, il-latenza reali minn tarf sa tarf (inkluża l-kompożizzjoni tal-folja), l-għadd ta’ sejħiet lill-mudell, u ż-żamma tal-fatti ddefinita mill-manifest. Ir-risponsi mhux ipproċessati tal-mudell ma jinkitbux fir-rapport; jinżammu biss id-digests SHA-256 u l-IDs tal-fatti mqabbla. Il-harness ma jagħmel ebda sejħa tan-network jew lil mudell bi ħlas sakemm ma jiġix mgħoddi `--execute-real` u ma jiġux ikkonfigurati `--model`, `OMNIROUTE_BASE_URL`, u `OMNIROUTE_API_KEY`. Mingħajr dik l-eżekuzzjoni reali u espliċita, il-verdett tiegħu li jista’ jinqara mill-magni jibqa’ `HOLD`; il-kejl sintetiku tal-payload/l-għadd tas-sejħiet waħdu mhuwiex evidenza għall-promozzjoni.

Min jagħmel is-sejħa jista’ jehmeż array fakultattiv `transcript.cues` ma’ parti tal-vidjo appoġġjata meta diġà jkollu test allinjat. Kull cue għandu jkollu `text`, intervall finit `start`/`end` fi ħdan it-tul ivverifikat, u `source` fil-lista permessa (`client`, `embedded`, jew `audio-bridge`); `confidence` għandu valur predefinit ta’ `1` u għandu jibqa’ bejn `0` u `1`. Cues identiċi eżattament jiġu kkonsolidati. OmniRoute qatt ma jibda traskrizzjoni minn din il-metadata: cues ivvalidati jiġu kkupjati fir-riżultat deskritt flimkien mas-sors, il-kunfidenza, u l-intervall, u jiġu rrappreżentati bħala osservazzjonijiet mhux fdati flimkien mas-sottotitli tal-frejms. Test invalidu, barra mill-firxa, jew mingħajr provenjenza jiġi rrifjutat minflok jitħallat fil-fluss tas-sottotitli. Il-field `source` bħalissa huwa ddikjarat minn min jagħmel is-sejħa, mhux ivverifikat mis-server: OmniRoute jinforza li l-valur ikun wieħed mit-tliet strings permessi, iżda għadu ma jikkonfermax kriptografikament li tikketta `embedded` jew `audio-bridge` fil-fatt ġiet minn estrazzjoni taħt il-kontroll tas-server. Ittratta `source` bħala indikazzjoni mhux fdata sakemm tidħol fis-seħħ dik il-verifika; tibnix deċiżjonijiet ta’ awtorizzazzjoni fuqha.

Min jagħmel is-sejħa b’mod avvanzat jista’ jipprovdi track `audioTranscript` diġà awtorizzat
għall-istess vidjo. Il-punt ta’ fużjoni jmexxi l-osservazzjonijiet viżivi u awdjo taħt
skadenza waħda u sinjal wieħed ta’ abort, jordnahom fuq linja taż-żmien komuni, jikkonsolida
duplikati eżatti, u jirrapporta riżultat parzjali meta jirnexxi naħa waħda biss.
`audioTranscript` invalidu jiddegrada għal dak ir-riżultat parzjali — id-deskrizzjoni
viżiva tinżamm u l-fergħa awdjo tirreġistra kodiċi ta’ falliment sanitizzat —
minflok ma jfalli l-vidjo kollu. Id-disponibbiltà għal kull fergħa, il-bandiera parzjali,
u l-kodiċijiet ta’ falliment sanitizzati jinżammu fir-riżultat deskritt, fil-metadata
tal-protezzjoni (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), fil-metadata tal-cache tar-riżultati, u fil-counters
tal-fużjoni tal-bridge. Il-passaġġ predefinit tal-Video Bridge ma jinvokax speech-to-text
u lanqas iniżżel kopja oħra tal-midja; mingħajr dak it-track espliċitu, jibqa’
vidjo biss.

**Żamma tat-traskrizzjoni (#12150 P1).** Dan japplika awtomatikament kull meta
l-Video Bridge (li nnifsu huwa opt-in) jirrendi cue tat-traskrizzjoni — ma hemm ebda
bandiera separata għaż-żamma. Meta talba tirrendi kwalunkwe cue tat-traskrizzjoni
(`transcript` iddikjarat minn min jagħmel is-sejħa jew `audioTranscript` magħqud),
il-protezzjoni timmarkah bħala `videoBridgeObserved` u tipproduċi kopja redatta
tad-deskrizzjoni tal-vidjo — rendering identiku li fih il-korp ta’ test liberu ta’
kull cue jiġi sostitwit b’`[redacted-video-transcript]`, mibni billi jiġi sostitwit
il-field strutturat tal-cue qabel ma tinbena s-string (qatt billi jiġi pparsjat
it-test iċċattjat, sabiex l-ebda kontenut tal-cue — avversarju jew ordinarju,
inklużi korpi li fihom `]` bħal `[inaudible]`/`[music]` — ma jkun jista’ jibqa’).
Il-korp persistit tat-talba fir-reġistru tas-sejħiet jissostitwixxi kull parti ta’
test derivata mill-vidjo b’dik il-kopja redatta, imqabbla bl-ugwaljanza tal-kontenut;
l-ankra `fullText` terġa’ tinqara mill-payload tal-protezzjoni komplut ta’ qabel
is-sejħa, sabiex it-tqabbil jibqa’ jirnexxi wara li protezzjonijiet sussegwenti
fil-katina (il-maskers tal-PII u tal-kredenzjali, prijoritajiet 10/95) jiktbu mill-ġdid
it-test tad-deskrizzjoni fil-post u wara li l-injezzjoni tas-system-prompt/handoff/memory
tibdel il-forma tal-array tal-messaġġi. Il-korp mibgħut upstream lill-mudell ma jinbidilx.
Talba osservata lanqas ma timla Memory durabbli (kemm l-estrazzjoni derivata mit-talba
kif ukoll dik derivata mir-risposta jinqabżu), sabiex ir-risposta tal-mudell innifsu
ma tkunx tista’ tirrepeti t-test tat-traskrizzjoni fil-Memory.

Għad hemm uċuħ ta’ żamma miftuħa, issorveljati għal segwitu (**P2**, #12430):
l-istampa mhux ipproċessata tat-talba tal-klijent ta’ qabel il-protezzjoni
fl-artifatt tar-reġistru dettaljat; kontinwazzjoni `previous_response_id` li tfalli
b’mod magħluq; dispatches interni ta’ derived-prompt li jinkorporaw it-traskrizzjoni
ġewwa prompt ta’ string sintetizzat (stadji tal-pipeline, context-handoff); u l-korp
tar-risposta / il-kopja tas-semantic-cache ta’ risposta tal-mudell li tikkwota
t-traskrizzjoni. Dawn huma uċuħ tal-klassi raw/response jew opt-in barra mill-ambitu
tal-korp persistit tat-talba + Memory ta’ P1.

Iċ-ċiklu tal-ħajja intern ta’ `/api/modality-bridge/video/drilldown` huwa substrat
tal-cache separat, awtentikat b’loopback/token. Kull operazzjoni teħtieġ ukoll ID
prinċipali opak u kanoniku. Qabel ma min jagħmel sejħiet ta’ produzzjoni jiġi attivat,
għandu jidderiva dak l-ID mit-tenant awtentikat u qatt ma għandu jgħaddi valur magħżul
mill-klijent. Iċ-ċwievet tal-cache jorbtu dak il-prinċipal ma’ IDs kanoniċi
tas-sessjoni u tar-referenza tal-vidjo, jaħżnu biss iċ-ċwievet derivati tagħhom
permezz ta’ SHA-256, u jillimitaw kemm il-qari kif ukoll it-tħassir għall-istess
prinċipal. Il-cache jaħżen mhux aktar minn 16-il frame JPEG derivat għal kull entry,
jiskadihom wara għaxar minuti, u jappoġġja qari limitat b’`start`/`end` jew tħassir
espliċitu tas-sessjoni.

Kull prinċipal huwa limitat għal 16-il entry u 64 MiB ta’ data JPEG kanonika. Dawk
il-limiti huma indipendenti mil-limitu globali ta’ 64 entry/256 MiB: il-pressjoni
tal-kwota tal-prinċipal tkeċċi biss l-entries l-inqas użati reċentement ta’ dak
il-prinċipal qabel ma tiġi kkunsidrata t-tkeċċija LRU globali. Entries skaduti
jitneħħew kemm mill-kontabbiltà tal-prinċipal kif ukoll minn dik globali waqt
attività tal-cache, filwaqt li kanċellazzjoni u falliment tal-validazzjoni ma
jikkonfermawx sostituzzjoni parzjali.

Il-cache jirrifjuta Base64 mhux kanoniku, padding eċċessiv, midja li mhijiex JPEG,
JPEGs malformati jew maqtugħin, u JPEGs li jipproduċu twissija waqt decode
limitat tal-immaġni sħiħa permezz ta’ `sharp`. Jerġa’ jikkodifika kull immaġni
aċċettata bħala JPEG kanoniku, jidderiva l-wisa’ u l-għoli mill-bytes dekodifikati
minflok ma jafda l-fields ta’ min jagħmel is-sejħa, u jarmi kwalunkwe bytes polyglot
li jibqgħu fl-aħħar minflok ma jżommhom. Huwa biss il-buffer ikkompressat,
kanoniku u limitat li jingħadd maż-żewġ kwoti. Il-limitu JSON fuq il-wire jinkludi
l-overhead ta’ Base64 għal-limitu massimu ta’ 32 MiB ta’ input dekodifikat. Kull
derivazzjoni maħżuna tirreġistra l-format/riżoluzzjoni JPEG validati tagħha,
il-politika tat-teħid tal-kampjuni, il-verżjoni tad-derivazzjoni, il-ħin tal-ħolqien,
il-hash tal-kontenut ikkalkulat mis-server, u r-referenza ġenitur bil-hash flimkien
mal-hash tal-kontenut ġenitur ta’ min jagħmel is-sejħa u li huwa fdat. Il-kanċellazzjoni
tiġi ċċekkjata bejn il-fażijiet asinkroniċi tad-decode/hash qabel il-commit atomiku
fil-cache.

Din it-tranche għadha ma tqabbadx produttur ta’ produzzjoni mar-route u ma
tipprovdix għażla ta’ variants b’diversi riżoluzzjonijiet. Għalhekk, il-passaġġ
trasparenti tat-talba tal-Video Bridge ma jġarrab ebda xogħol addizzjonali, filwaqt
li d-derivazzjoni tal-prinċipal marbuta mat-tenant u ċ-ċiklu tal-ħajja sħiħ
b’diversi riżoluzzjonijiet ta’ FU-08 jibqgħu xogħol espliċitu ta’ segwitu minflok
ma jiġu ddokumentati bħala mġiba kompluta.

Il-frejms jingħataw didaskaliji sekwenzjalment bil-mudell tal-Video kkonfigurat. Override
tal-Video vojt jiret l-issettjar tal-Vision; jekk it-tnejn ikunu vojta, l-auto-router
tal-Vision jagħżel il-mudell effettiv li jappoġġja l-viżjoni. Didaskaliji li jirnexxu
jissostitwixxu l-parti oriġinali bi prefiss stabbli `[Video description:` li wkoll
jimmarka t-test bħala osservazzjoni mhux fdata derivata mill-midja u jgħid lill-mudelli
sussegwenti biex ma jsegwux struzzjonijiet misjuba fil-midja. Iċ-ċwievet tal-cache
tad-didaskaliji tal-frejms jinkludu l-bytes tal-JPEG, il-prompt, it-timestamp, u l-mudell
effettiv; huma biss id-didaskaliji li jirnexxu li jinħażnu fil-cache. L-entrati tal-cache
iżommu l-mudell produttur li effettivament irnexxa, inkluż mudell ta’ riżerva; il-pont
jirrapporta `mixed` meta frejms differenti jkunu ġew prodotti minn mudelli differenti.
Hit fil-cache jerġa’ juża dik l-identità tal-produttur minflok jerġa’ jittikkettaha bħala
l-pjan tar-routing mitlub. Il-cache tar-riżultat tal-video sħiħ għandu ċavetta bbażata
fuq kull input li jibdel l-output — il-prompt, il-mudell effettiv, il-politika
tal-kampjunar, l-għadd ta’ frejms, il-modalità tal-analiżi semantika, il-marki tas-swaba’
SHA-256 tal-ħjiel normalizzat tal-fokus, it-tieqa tal-fokus, `transcript`,
`audioTranscript`, u l-flag tal-contact sheet — għalhekk bidla fi kwalunkwe wieħed minn
dawk id-dimensjonijiet tkun cache miss, u qatt użu mill-ġdid skadut. Il-verżjoni
tal-politika tad-dedup viżiv, il-limitu, u l-għadd limitat ta’ frejms kandidati huma
wkoll espliċiti fiċ-ċavetta u fil-metadata tal-cache tar-riżultat; għalhekk bidla
fil-politika ma tistax terġa’ tuża deskrizzjoni skaduta tal-video sħiħ. Il-metadata v4
tal-cache tar-riżultat iżżomm il-modalità u l-marki tas-swaba’, u qatt il-kompitu mhux
ipproċessat tal-utent. Il-metadata tal-mekkaniżmu protettiv tirrapporta kemm il-modalità
tal-analiżi mitluba kif ukoll dik effettiva; modalità `focused` mitluba mingħajr test
tal-utent li jista’ jintuża tiġi rrappurtata bħala effettivament `full`.

Il-mekkaniżmu protettiv jiġbed kull parti tal-video appoġġjata iżda ma jiddeskrivix
aktar minn `modalityBridgeVideoMaxVideos`. Għal mira li jkun ġie ppruvat li għandha
`supportsVideo === false`, videos li fallew jew li jaqbżu l-limitu jsiru markaturi
espliċiti ta’ test sikur sabiex ma jibqa’ l-ebda video mhux ipproċessat. Meta
l-kapaċità ma tkunx magħrufa, dawk il-partijiet jibqgħu mhux mibdula. Miri b’
`supportsVideo === true` jaqbżu l-pont. Is-sinjal ta’ abort tat-talba tal-klijent
jinfirex mat-tniżżil, il-kju tal-broker, is-sottoproċessi, u s-sejħiet għad-didaskaliji;
l-aborts iwaqqfu l-ipproċessar bejn video u ieħor u qatt ma jfallu b’mod li jħalli
l-midja mhux ipproċessata tgħaddi.

Is-settings tar-runtime huma appoġġjati mid-DB u vvalidati minn Zod:

| Ċavetta                             | Default     | Firxa / imġiba                                                                                                 |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime fakultattiv, b’attivazzjoni espliċita                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` iżomm didaskaliji ġeneriċi; `focused` juża kuntest limitat u mhux fdat mill-aħħar test tal-utent        |
| `modalityBridgeVideoModel`          | `""`        | Jiret il-mudell tal-Vision Bridge                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                           |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, jew `segment_aware` proporzjonali; falliment tad-detector jerġa’ lura għal `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                            |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                 |

Valuri legacy persistiti tat-timeout tal-Video ta’ aktar minn 120 sekonda jiġu limitati
sad-deadline tal-broker; kitbiet ġodda tas-settings li jaqbżu dak il-limitu jiġu
rrifjutati. `GET /api/modality-bridge/video/runtime` jeħtieġ lokalità loopback
ittimbrata u fdata qabel l-awtentikazzjoni jew l-istħarriġ tar-runtime, u mbagħad
jeħtieġ awtentikazzjoni ta’ ġestjoni. Jirritorna biss `available`, verżjonijiet
sanitizzati ta’ FFmpeg/ffprobe, u raġuni fissa meta r-runtime ma jkunx disponibbli.
L-endpoint intern tal-estrazzjoni mhuwiex API pubblika għall-upload: saturazzjoni
tal-kju tirritorna `503` flimkien ma’ `Retry-After`, skonnessjoni minn min għamel
is-sejħa tirritorna `499`, u d-deadline fiss tal-broker jirritorna `504`. Risposti
kkonvertiti jżidu `video->text;model=<visionModel>;parts=<videos>` mal-header ċentrali
`x-omniroute-modality-bridge` mingħajr ma jneħħu segmenti tal-Vision jew tal-Audio.

### Maskatur tal-PII (`piiMasker.ts`)

Jaħdem fiż-**żewġ** stadji.

- **`preCall`** jikklona l-payload, jgħaddi minn `system`, `messages`, `input`, u
  `prompt` (inklużi elementi li huma strings sempliċi), u japplika `processPII()` (minn
  `@/shared/utils/inputSanitizer`) għall-fields string `content`/`text`. Meta
  `PII_REDACTION_ENABLED=true`, PII misjuba tiġi redatta fil-payload li jintbagħat.
  Dan huwa indipendenti minn `INPUT_SANITIZER_MODE` (li jikkontrolla biss
  il-politika kontra l-injezzjoni tal-prompt). Meta r-redazzjoni tkun mitfija,
  is-sejħa tirreġistra l-għadd ta’ detezzjonijiet mingħajr ma tikteb mill-ġdid
  il-kontenut.
- **`postCall`** jagħmel deep clone tar-risposta, iħaddem `sanitizePIIResponse()` flimkien
  mal-maskatur għall-istruttura tal-Responses API (`maskResponsesOutput` — ikopri
  `output_text` u `output[].content[].text`). Jekk isseħħ xi redazzjoni, ir-risposta
  modifikata tissostitwixxi dik oriġinali.

Il-mekkaniżmu protettiv qatt ma jimblokka; huwa biss jannota (`meta.detections`,
`meta.redacted`) jew jikteb mill-ġdid.

### Injezzjoni tal-Prompt (`promptInjection.ts`)

Jidentifika strutturi avversarjali fil-kontenut ipprovdut mill-utent u jinforza
l-politika kkonfigurata. L-imġiba hija ddeterminata mill-varjabbli tal-ambjent u
mill-għażliet tal-kostruttur:

| Issettjar            | Varjabbli tal-ambjent                                                                                 | Valur predefinit | Effett                                                                                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Attivat              | `INPUT_SANITIZER_ENABLED`                                                                             | `true`           | Meta jkun `false`, il-guardrail jieqaf minnufih.                                                                                                                                                                                          |
| Modalità             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`           | Politika tal-injezzjoni: `block`, `warn`, jew `log`. (`redact` huwa aċċettat għall-kompatibbiltà b'lura iżda **ma** jneħħix it-test tal-injezzjoni; il-kitba mill-ġdid tal-PII fit-talba hija kkontrollata minn `PII_REDACTION_ENABLED`.) |
| Limitu tal-imblukkar | Għażla `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`           | Severità minima meħtieġa għall-imblukkar. B'mod predefinit, severità medja hija biss għall-osservazzjoni.                                                                                                                                 |

**Preċedenza tal-modalità** (`getMode`): `options.mode` tas-sejjieħ →
**sovrascrittura tal-feature flag tad-DB** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → varjabbli tal-ambjent `INJECTION_GUARD_MODE` → varjabbli tal-ambjent `INPUT_SANITIZER_MODE` →
`warn`. Għalhekk, sovrascrittura mid-dashboard tieħu preċedenza fuq il-varjabbli
tal-ambjent, u għalhekk l-UI tal-Feature Flags tikkontrolla l-guard attiv
f'ħin reali (mingħajr ristartjar). Il-qari mid-DB huwa sikur f'każ ta' falliment:
jekk iseħħ żball, il-guard jerġa' lura għall-imġiba bbażata fuq il-varjabbli
tal-ambjent, u meta ma tkun issettjata l-ebda sovrascrittura, l-imġiba tkun
identika għar-riżoluzzjoni bbażata biss fuq il-varjabbli tal-ambjent.

Sorsi tad-detezzjoni:

1. `sanitizeRequest()` minn `@/shared/utils/inputSanitizer` (sett ta' detectors
   kondiviż u użat f'postijiet oħra fil-pipeline).
2. `DEFAULT_GUARD_PATTERNS` inkorporati (bħalissa `system_override_inline` u
   `markdown_system_block`, it-tnejn b'severità `high`).
3. `customPatterns` fakultattivi mgħoddija permezz tal-għażliet tal-kostruttur (strings, regex,
   jew rekords `{ name, pattern, severity }`).

Meta `mode === "block"` **u** mill-inqas detezzjoni waħda tilħaq il-limitu
tas-severità, `preCall` jirritorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Fil-modalitajiet `warn`/`log`, il-guardrail
jirreġistra l-avveniment iżda jippermetti s-sejħa. Il-funzjoni kondiviża
`evaluatePromptInjection()` hija esportata wkoll għal sejjieħa li jeħtieġu
jevalwaw prompts mingħajr ma jgħaddu mir-registry.

**Limitu tal-iskannjar (v3.8.20):** id-detector jispezzjona biss l-**ewwel 16 KB**
tat-test magħqud tal-prompt — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) f'
`src/shared/utils/inputSanitizer.ts`. Kemm `detectInjection()` kif ukoll
`evaluatePromptInjection()` jużaw `slice(0, MAX_INJECTION_SCAN_BYTES)` qabel ma
jħaddmu l-loop tal-patterns. Id-direttivi tal-injezzjoni jkunu qrib il-bidu
tal-input, għalhekk dan jillimita l-użu tas-CPU/GC mir-regex fuq payloads ta'
mijiet ta' KB mingħajr ma jdgħajjef id-detezzjoni (ara
#3932, #4041).

### Masker tal-Kredenzjali (`credentialMasker.ts`)

Jitħaddem fiż-żewġ stadji, l-aħħar fil-katina predefinita (prijorità `95`). Jaħbi
patterns magħrufa sew ta' API keys / secret tokens mill-payload ħiereġ (kontenut
tal-messaġġ, argumenti tas-sejħiet tal-għodod, riżultati tal-għodod) **u**
mir-rispons tal-fornitur, sabiex kredenzjali mwaħħla fi prompt (jew ripetuta
lura minn riżultat ta' għodda) ma tiġix żvelata lill-fornitur upstream jew
lura lill-klijent.

- **B'opt-in biss**, bl-istess konvenzjoni bħall-ħabi tal-PII (qrib Hard Rule #20):
  diżattivat sakemm `settings.credentialRedactionEnabled === true` **jew**
  `CREDENTIAL_REDACTION_ENABLED=true`. Meta jkun mitfi, il-guardrail ma jagħmel xejn —
  qatt ma jimblokka u qatt ma jerġa' jikteb.
- `redactCredentials()` jgħaddi mis-siġra kollha tal-payload/rispons (`walkValue()`,
  sikur kontra prototype pollution, sikur kontra ċikli permezz ta' `WeakSet`) u
  jissostitwixxi t-taqbiliet b'placeholder `[REDACTED:<type>]`, filwaqt li
  jikklona biss il-fergħat li fil-fatt inbidlu.
- `CREDENTIAL_PATTERNS` ikopri keys ta' fornituri LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), keys tal-pagamenti (Stripe, Square),
  keys tal-cloud (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  connection strings li fihom kredenzjali (`mongodb://user:pass@...`, eċċ.), u
  pattern ġeneriku għall-valuri tal-headers `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Keys fil-forma ta' headers (`authorization`, `x-api-key`, `api-key`,
  `apikey`) jinħbew strutturalment (il-valur biss, filwaqt li prefiss tal-iskema bħal
  `Bearer `/`Basic ` jiġi ppreservat) minflok permezz tar-regex ġeneriku tat-test.
- Il-guardrail qatt ma jimblokka; huwa biss jerġa' jikteb (`modifiedPayload` /
  `modifiedResponse`) u jżid annotazzjonijiet (`meta.credentialsRedacted`, `meta.count`).

Protezzjoni kontra rigressjonijiet: `tests/unit/credential-masker-guardrail.test.ts`.

## Kuntratt Bażiku (`base.ts`)

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
  block?: boolean; // true jwaqqaf il-katina immedjatament
  message?: string; // jintwera meta jsir imblukkar
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // jiġi rritornat minn preCall biex jerġa' jikteb it-talba
  modifiedResponse?: TValue; // jiġi rritornat minn postCall biex jerġa' jikteb ir-rispons
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

Guardrail jindika "l-ebda bidla" billi jirritorna jew `void`, `{}`, jew
`{ block: false }`. Ir-ritorn ta' `modifiedPayload`/`modifiedResponse` jissostitwixxi
l-valur li jgħaddi mill-katina għall-guardrails sussegwenti.
`signal?: AbortSignal` jittrasmetti ċ-ċiklu tal-ħajja ta' min jagħmel is-sejħa lill-guardrails. L-abort ta' talba huwa l-eċċezzjoni intenzjonata ta' fail-open: il-pontijiet tal-midja jwaqqfu x-xogħol u jagħmlu t-tindif mingħajr ma jirrestawraw il-midja mhux ipproċessata lejn mira li hu magħruf li ma tappoġġjahiex.

## Reġistru (`registry.ts`)

Is-singleton `guardrailRegistry` jesponi:

- `register(guardrail)` — iżid guardrail (jew jissostitwih skont l-isem normalizzat) u
  jerġa' jordna skont `priority` axxendenti.
- `clear()` / `list()` — għodod ta' għajnuna amministrattivi.
- `runPreCallHooks(payload, context)` — jgħaddi mill-guardrails attivi, jgħaddi l-
  payload minn `modifiedPayload`, u jieqaf mal-ewwel `block: true`.
- `runPostCallHooks(response, context)` — l-istess fluss fuq in-naħa tar-rispons.
- `resetGuardrailsForTests({ registerDefaults })` — ineħħi l-istat u, b'mod fakultattiv,
  jerġa' jirreġistra l-valuri predefiniti għal iżolament nadif tat-testijiet.

Iż-żewġ runners jirritornaw `{ blocked, payload|response, results, guardrail?, message? }`
fejn `results` huwa array ta' rekords `GuardrailExecutionResult` li jinkludu
l-fields `blocked`, `skipped`, `modified`, `error`, u `meta` għal kull guardrail,
utli għat-traċċar.

### Diżattivazzjoni tal-Guardrails Għal Kull Talba

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` jiġbor lista
mingħajr duplikati ta' ismijiet ta' guardrails li għandhom jinqabżu għat-talba
attwali. Is-sorsi (kollha fakultattivi, kollha magħquda) huma:

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` fil-body tat-talba (fl-ogħla livell)
- `metadata.disabledGuardrails` fil-body tat-talba
- Il-header `x-omniroute-disabled-guardrails` (jew dak legat
  `x-disabled-guardrails`)

Il-valuri jistgħu jkunu arrays ta' strings jew string separata b'virgoli; l-ismijiet jiġu
normalizzati għal kebab-case b'ittri żgħar (`pii_masker` → `pii-masker`). Ir-riżultat
jgħaddi permezz ta' `context.disabledGuardrails` lir-reġistru, li jaqbeż
il-guardrails korrispondenti (`skipped: true` f'`results`).

## Ordni tal-Eżekuzzjoni

Għal kull talba li tgħaddi minn `src/sse/handlers/chat.ts` u
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` jibni l-lista ta’ elementi li għandhom jinqabżu mill-API key, mill-body,
   u mill-headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` iħaddem il-guardrails f’ordni axxendenti
   ta’ prijorità:
   - Il-guardrails diżattivati jiġu rreġistrati bħala `skipped`.
   - Il-`preCall` ta’ kull guardrail jista’ jerġa’ jikteb il-payload permezz ta’ `modifiedPayload`.
   - L-ewwel `block: true` iwaqqaf il-katina immedjatament u l-handler jirritorna
     risposta ta’ rifjut mill-guardrail.
3. Il-payload (li potenzjalment ikun inkiteb mill-ġdid) jgħaddi għar-routing ikkombinat u
   għad-dispatch upstream.
4. Wara li tiġi assemblata r-risposta, `guardrailRegistry.runPostCallHooks(...)`
   iħaddem l-istess katina fuq ir-risposta. `block: true` hawnhekk iwarrab ir-risposta
   upstream.

Guardrails li joħolqu eċċezzjoni jiġu rreġistrati b’`error: <message>` u jiddaħħlu fil-log permezz ta’
`logger.warn`, iżda l-katina tkompli — bid-disinn, f’każ ta’ falliment tippermetti li l-proċess ikompli.

## Konfigurazzjoni

Varjabbli tal-ambjent moqrija mill-guardrails integrati:

| Varjabbli                             | Użata minn                | Effett                                                                                                                        |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Issettja għal `false` biex tiddiżattiva kompletament id-detezzjoni.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politika tal-injezzjoni: `warn`, `block`, jew `log`. Il-valur legacy `redact` ma jerġax jikteb it-test tal-injezzjoni.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modalità għall-guard tal-injezzjoni; huwa wkoll feature flag fid-DB li **jissostitwixxi** l-varjabbli tal-ambjent (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Is-severità minima li `MODE=block` jirrifjuta: `high` (default), `medium`, jew `low`.                                         |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias legacy għal `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Meta jkun `true`, il-PII tat-talba jiġi redatt (indipendentement mill-modalità tal-injezzjoni).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Jikkontrolla l-imġiba tal-masker fuq in-naħa tar-risposta.                                                                    |

Il-guardrails tal-Modality Bridge jaqraw il-konfigurazzjoni waqt l-eżekuzzjoni mill-ħażna tas-settings
ibbażata fuq id-DB (`getSettings()`), mhux mill-varjabbli tal-ambjent. Il-keys primarji ta’ Vision huma
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, u
`modalityBridgeCacheMaxEntries`. Il-keys legacy
`visionBridge*` jiġu aċċettati biss bħala l-fallback dokumentat għall-qari għal ċiklu wieħed;
il-kitbiet mid-dashboard jużaw il-keys primarji. Il-valuri default u r-resolver tal-fallback
jinsabu f’`src/shared/constants/modalityBridgeDefaults.ts`, filwaqt li l-kostanti legacy
jinżammu f’`src/shared/constants/visionBridgeDefaults.ts`.

Audio juża `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, u `modalityBridgeAudioMaxClips`, flimkien mas-settings kondiviżi
`modalityBridgeCache*`. Audio m’għandux fallback għal keys legacy minħabba li dawn
il-keys ġew introdotti mal-iskema tal-Modality Bridge.

Video juża `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, u
`modalityBridgeVideoTimeout`, flimkien mas-settings kondiviżi `modalityBridgeCache*`.
Huwa diżattivat b’mod default minħabba li FFmpeg/ffprobe huma dipendenzi operazzjonali
fakultattivi u l-ħolqien ta’ captions għall-frames iżid il-latenza u l-ispiża tal-mudell.

## Guardrails Personalizzati

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

Passi:

1. Oħloq `src/lib/guardrails/myGuardrail.ts` li jestendi `BaseGuardrail`.
2. Implimenta `preCall` u/jew `postCall`.
3. Jew irreġistrah waqt l-importazzjoni (żidu minn `registerDefaultGuardrails`) jew
   sejjaħ `guardrailRegistry.register(...)` waqt l-eżekuzzjoni — ir-reġistru jissostitwixxi
   kwalunkwe guardrail preċedenti bl-istess isem normalizzat.
4. Żid testijiet taħt `tests/unit/` (eżempji eżistenti:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Ittestjar

Uża `resetGuardrailsForTests()` bejn it-testijiet biex tibda minn stat magħruf.
Għaddi `{ registerDefaults: false }` biex tibda b’reġistru vojt u
rreġistra biss il-guardrails li qed jiġu ttestjati. Vision Bridge jaċċetta l-injezzjoni
tad-dipendenzi (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge jesponi
l-punti ta’ separazzjoni ekwivalenti għas-settings, il-kapaċitajiet, l-għażla tal-mudell STT, il-kontrolli
tal-kredenzjali, u t-traskrizzjoni. Għalhekk, it-testijiet jistgħu jeżerċitaw iż-żewġ flussi mingħajr aċċess
għad-DB jew għan-network.

## Ara Wkoll

- `src/lib/guardrails/` — implimentazzjoni
- `src/shared/utils/inputSanitizer.ts` — detettur kondiviż li jħaddem
  il-protezzjoni kontra l-injezzjoni fil-prompt u l-maskra tal-PII
- `src/shared/constants/visionBridgeDefaults.ts` — valuri predefiniti ta’ Vision Bridge u
  lista ta’ mudelli b’bridge obbligatorju
- `src/shared/constants/modalityBridgeDefaults.ts` — valuri predefiniti kondiviżi waqt l-eżekuzzjoni għal Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — saff ortogonali (circuit breaker, perjodi ta’ stennija)
- `docs/reference/ENVIRONMENT.md` — referenza sħiħa tal-varjabbli tal-ambjent

## Kopertura tar-rotot tal-protezzjoni kontra l-injezzjoni u red-team (Fażi 8 · Blokka D)

Il-protezzjoni kontra l-injezzjoni (`createInjectionGuard` / `withInjectionGuard`) tkopri r-rotot kollha
li jaċċettaw prompts tal-utenti. Tirrispetta `INJECTION_GUARD_MODE` (il-valur predefinit `warn` = tirreġistra biss;
`block` = tirritorna HTTP 400 `SECURITY_001`).

| Tip              | Rotot                                                                                                                                                | Modalità predefinita |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Test (eżistenti) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                 |
| Ġenerattiv       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                 |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                 |

L-estrazzjoni tat-test (`extractMessageContents`) tkopri `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (kull lejl, `nightly-llm-security.yml`):** promptfoo jivvalida li kull rotta timblokka
l-korpus OWASP-LLM meta `INJECTION_GUARD_MODE=block`; garak iħaddem probes (jinqabeż mingħajr secret).
`moderations` huwa inkluż għall-konsistenza — l-operaturi fil-modalità ta’ mblukkar jistgħu jeżentawh permezz ta’
`resolveDisabledGuardrails`.

Il-workflow ta’ kull lejl (`.github/workflows/nightly-llm-security.yml`, cron + attivazzjoni
manwali) għandu żewġ jobs:

- **`promptfoo-guard` (blokkanti)** — iħaddem `promptfoo eval -c promptfooconfig.yaml`
  b’`INJECTION_GUARD_MODE=block`. Kull każ avversarju (eż. "ignore all
  previous instructions…", jailbreaks tal-istil DAN) jivverifika li r-risposta ġġorr
  `error.code === "SECURITY_001"`, jiġifieri li l-protezzjoni fil-fatt irrifjutat it-talba.
- **`garak` (konsultattiv)** — iħaddem garak `--probes promptinject,dan,leakreplay`
  kontra istanza lokali ta’ OmniRoute (`http://localhost:20128/v1`). Huwa kkundizzjonat minn
  secret tal-fornitur (`PROMPTFOO_PROVIDER_KEY`); jinqabeż mingħajr problemi u għandu s-suffiss
  `|| true`, għalhekk jirrapporta mingħajr ma jfalli s-CI.

Il-kopertura tal-helper tal-protezzjoni (`createInjectionGuard` / `withInjectionGuard`)
testendi għal kull rotta `/v1` li ġġorr prompt; it-test tal-prompt jittieħed minn
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` minn
`extractMessageContents()` f’`src/shared/utils/inputSanitizer.ts`.
