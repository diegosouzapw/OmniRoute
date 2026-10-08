# Guardrails (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

Ir-reġistru jgħabbi awtomatikament sitt guardrails f'ordni ta' prijorità mal-importazzjoni
(ara `registry.ts` → `registerDefaultGuardrails()`):

| Prijorità | Isem                | Stadju(i)      | Fajl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Numri ta' prijorità aktar baxxi jaħdmu **l-ewwel**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Jaqbad talbiet li fihom immaġini mmirati lejn **mudelli mhux tal-viżjoni** u jew
jerġa' jidderieġi t-talba kollha lejn mudell li jappoġġja l-viżjoni jew jissostitwixxi l-partijiet tal-immaġini
b'deskrizzjonijiet testwali prodotti minn mudell tal-viżjoni konfigurabbli qabel
is-sejħa upstream. Dan jippermetti lill-fornituri tat-test biss jimmaniġġjaw b'mod trasparenti
tagħbijiet multimodali.

Fluss:

1. Aqbeż jekk il-mudell fil-mira diġà jappoġġja l-viżjoni (sakemm ma jidhirx fil-
   lista ta' pontijiet sfurzati `isVisionBridgeForcedModel`).
2. Estratt partijiet tal-immaġini permezz ta' `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), li jiddelega lill-**unified media
   detector** `detectMediaParts()` f' `open-sse/utils/mediaParts.ts` — is-sors
   uniku ta' verità kondiviż mal-filtru tal-kompatibilità tal-combo.
   L-estrazzjoni hija permessa għal partijiet ta' livell għoli tal-forom
   `replaceImageParts` tista' terġa' tgħaqqad (il-kuntratt extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, u Responses API `input_image`. Hits nested u
   forom ta' indikatur biss huma materjal ta' filtru combo u qatt ma jiġu estratti.
   Aqbeż jekk ma jinstabx.
3. Irrisolvi l-konfigurazzjoni runtime permezz ta' `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): ċwievet ġodda ta' settings `modalityBridge*`
   jirbħu; ċwievet legati `visionBridge*` jibqgħu **fallback ta' ċiklu wieħed**
   (tieqa ta' rollback). Aqbeż qabel kwalunkwe traversata tal-midja meta l-pont
   ikun diżattivat.
4. Is-selettur tal-modalità (`modalityBridgeVisionMode`, ara t-tabella hawn taħt) jiddeċiedi
   reroute vs describe. Reroute jirritorna `modifiedPayload` b' `model` biss
   skambjat, flimkien ma' meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Mogħdija ta' deskrizzjoni: illimita l-immaġini f' `maxImages`, ikkomponi l-prompt konxju mill-kompitu,
   ikkonsulta l-cache tad-deskrizzjoni, ċempel il-mudell tal-viżjoni **b'mod parallel**
   (`Promise.allSettled`), u injetta partijiet tat-test `[Image N]: <description>`
   fil-post tagħhom. Deskrizzjoni falluta tagħti `null` u l-parti oriġinali tal-immaġini hija
   **ppreservata** (#4012) — ħlief fuq il-mogħdija ta' deskrizzjoni combo meta kull
   deskrizzjoni falliet, fejn upstream mhux tal-viżjoni kkonfermat jikseb
   `(unavailable — no vision-capable provider connected)` stub minflok (#8430).
6. Irritorna `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selettur tal-modalità (`modalityBridgeVisionMode`)

| Modalità   | Default | Imġieba                                                                                                                                                                                                                                                                                              |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Ewristika legata, mhux mittiefsa (#6640/#7204): mudelli mhux combo/`auto/` jerġgħu jidderieġu lejn l-aħjar mudell tal-viżjoni sakemm il-mudell oriġinali diġà jkollu kredenzjali użabbli (imbagħad jiddeskrivi); miri combo dejjem jiddeskrivu.                                                      |
| `describe` |         | Dejjem iddeskrivi — il-blokka tar-reroute tinqabeż kompletament; il-mudell magħżul mill-utent dejjem iwieġeb.                                                                                                                                                                                        |
| `reroute`  |         | Forza reroute: il-gwardja tal-mudell b'kredenzjali tinqabeż. Il-gwardja tal-kredenzjali tal-**mira** tar-reroute għadha tapplika — meta ma teżisti l-ebda mira tal-viżjoni użabbli, it-talba taqa' għal deskrizzjoni sabiex immaġini mhux ipproċessati qatt ma jilħqu backend tat-test biss (#8430). |

Modi sfurzati short-circuit **qabel** ma taħdem l-ewristika awtomatika; l-imġieba `auto`
hija identika byte b'byte għall-guardrail ta' qabel PR-1.

#### Prompt ta' deskrizzjoni konxju mill-kompitu (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) iżżid
it-test tal-**aħħar messaġġ tal-utent** (imqassar għal 500 karattru) mal-prompt bażi
tad-deskrizzjoni, u jidderieġi d-deskrizzjoni lejn dak li l-utent fil-fatt staqsa
(mudell codex-vision-proxy) u jitlob lill-mudell tal-viżjoni biex jittraskrivi
test viżibbli. Bil-bandiera mitfija — jew mingħajr test tal-utent — il-prompt bażi
jintuża mhux mibdul.

It-talba kompatibbli mal-OpenAI tal-loop intern tad-deskrizzjoni (`callVisionModelSingle()` f'`visionBridgeHelpers.ts`) dejjem titlob `image_url.detail: "high"` — bla kundizzjoni, għal kull min iċempel/fornitur, mhux ristretta minn xi sinjal tal-klijent. Il-kampjunar b'dettall baxx inaqqas l-eżattezza tal-OCR preċiżament għall-kompitu ta' traskrizzjoni tat-test li jitlob dan il-prompt, għalhekk is-sejħa tad-deskrizzjoni nnifisha dejjem titlob dettall għoli irrispettivament minn liema livell ta' dettall użat it-talba oriġinali deħlin. Dan jaffettwa biss il-korp tat-talba interna tad-deskrizzjoni; ma jibdilx kif OmniRoute jgħaddi l-`image_url.detail` tal-mittent stess fuq it-talba primarja — dak l-inadempjenza tiġi applikata separatament, u biss għal klijenti OpenCode misjuba, f'`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Il-fergħa tal-format tal-wajer Anthropic tal-loop intern tad-deskrizzjoni m'għandhiex kamp `detail` u mhix affettwata minn ebda waħda minn dawn l-inadempjenzi.

#### Limitu tal-output tad-deskrizzjoni (`modalityBridgeVisionMaxChars`)

| Ċavetta                        | Inadempjenza | Medda             |
| ------------------------------ | ------------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` jew 100–50000 |

`0` (inadempjenza) tfisser **ebda limitu** — id-deskrizzjoni rritornata minn `callVisionModel()` tgħaddi mingħajr modifika, u tippreserva l-imġieba eżistenti. Kull valur fil-medda 100–50000 iqassar id-deskrizzjoni b'suffiss `…` qabel ma terġa' tiġi mdaħħla bħala `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` f'`src/lib/guardrails/visionBridge.ts`). Għolli dan għal kompiti OCR b'ħafna dettall fejn il-mudell downstream jeħtieġ it-traskrizzjoni sħiħa; niżżlu biex tillimita l-użu tat-token fuq mudelli tal-viżjoni li jitkellmu ħafna. Il-kamp tad-dashboard jinsab fuq il-pannell Avvanzat tat-tab tal-Viżjoni (`modality-bridge-max-chars` f'`ModalityBridgeVisionTab.tsx`) u jillimita kull valur bejn 1 u 99 sal-limitu ta' 100 filwaqt li jħalli `0` espliċitu mhux mittiefes — `0` huwa valur Zod validu fih innifsu (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mhux sempliċement l-inadempjenza "mhux issettjata".

#### Cache tad-deskrizzjoni (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL fil-memorja għall-outputs tad-deskrizzjoni, kondiviża mal-proċess kollu. Ċavetta = `sha256(imageRef + composedPrompt + configuredBridgeModel)` b'qafas ta' prefiss tat-tul (ebda ħabtiet tal-konfini tal-kamp). Il-komponent tal-mudell huwa l-mudell tal-pont **konfigurat**, mhux il-mudell li fil-fatt wieġeb — `callVisionModel` jista' jirrikorri internament, u l-ikklippjar għal kull tentattiv jiffrattura l-cache. Deskrizzjonijiet falluti qatt ma jiġu cached. Settings:

| Ċavetta                         | Inadempjenza | Medda   |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Normalizzazzjoni tal-immaġni remota (deskrizzjoni tal-loop intern/ġbir base64)

Meta l-pont jiġbor immaġni **remota** hu stess — is-sejħa interna tad-deskrizzjoni Anthropic u l-konverżjoni base64 tal-format tal-wajer claude (`ensureBase64ImagesForClaudeWire`), it-tnejn permezz ta' `fetchRemoteImageAsDataUri()` f'`visionBridgeHelpers.ts` — l-URI tad-data li tirriżulta tgħaddi minn `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) qabel ma tiġi inkorporata fit-talba tal-mudell tal-viżjoni. Immaġini kbar wisq jitnaqqsu għal **tarf twil ta' 2048px** (jaqbel mal-limitu ta' ridimensjonar li OpenAI/Anthropic diġà japplikaw fuq in-naħa tas-server), li jnaqqas il-bytes/latency tal-upload mingħajr ma jibdel dak li jara l-mudell tal-viżjoni. Ir-ridimensjonar juża `sharp`, mgħobbi permezz ta' importazzjoni dinamika: fuq pjattaforma fejn il-binarju nattiv tiegħu jonqos milli jitgħabba, `normalizeDataUri()` **qatt ma jitfa' żball** — jirrikorri għal pass-through tal-bytes oriġinali, għalhekk il-mogħdija ta' deskrizzjoni/konverżjoni base64 dejjem tibqa' taħdem. Bytes mhux tal-immaġni (ġbir li ma rritornax immaġni dekodifikabbli) jgħaddu wkoll mhux mittiefsa. Din in-normalizzazzjoni hija skoperta għal immaġini li l-pont jiġbor għas-sejħa interna tiegħu stess — qatt ma tiġi applikata għall-payload raw passthrough tal-mittent, konsistenti mal-prinċipju ta' mutazzjoni opt-in-only (Regola Iebsa #20).

#### Skema tas-settings + migrazzjoni

Iċ-ċwievet il-ġodda `modalityBridge*` huma validati minn Zod f'`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, it-trio `modalityBridgeCache*`, u l-grupp `modalityBridgeAudio*` użat mill-Audio Bridge. Il-migrazzjoni `141_modality_bridge_settings.sql` tikkopja valuri eżistenti `visionBridge*` legati għaċ-ċwievet il-ġodda li jaqblu (idempotenti, qatt ma tikteb fuq valur `modalityBridge*` issettjat minn operatur); iċ-ċwievet legati jibqgħu aċċettati bħala fallback tal-qari għal ċiklu ta' rilaxx wieħed.

#### Header tat-trasparenza + stats

Risposti trasformati bid-deskrizzjoni jġorru `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (mibnija minn `buildModalityBridgeHeader()` f'`modalityBridge/bridgeStats.ts`, ittimbrata minn `withModalityBridgeHeader()` f'`src/sse/handlers/chatHelpers.ts`). Talbiet irrirotta ma jirċievu **ebda** header — il-payload ma kienx mittiefes u l-bdil tal-mudell diġà huwa viżibbli fil-kamp `model` tal-korp tar-rispons.

`GET /api/modality-bridge/stats` (awtentikazzjoni tal-ġestjoni, l-istess livell bħal `GET /api/settings`) jirritorna l-counters fil-memorja għal kull modalità `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` għal `vision`, `audio`, u `video`. `averageLatencyMs` juża `latencySamples`, mhux it-tentattivi kollha, bħala d-denominatur tiegħu; operazzjoni mingħajr ħin ma tiffabbrikax kampjun ta' żero millisekondi. `bridged` jibqa' l-alias kompatibbli b'lura għal konverżjonijiet ta' suċċess; tentattivi falluti ma jżiduhx. Il-counters jerġgħu jiġu ssettjati mill-ġdid mal-bidu mill-ġdid tal-proċess b'disinn (telemetrija, mhux kontabilità).

#### Konfigurazzjoni tad-dashboard

Il-paġna tad-dashboard dedikata hija
`/dashboard/settings/modality-bridge`. It-tabs tagħha `Vision`, `Audio`,
u `Video` li jistgħu jiġu indirizzati permezz tal-URL jippreservaw il-parametri tal-query waqt li jaqilbu l-valur `tab`.
It-tab Vision tesponi l-attivazzjoni, il-modalità, l-għażla tal-mudell (inkluż id-default awtomatiku),
il-prompting konxju mill-kompitu, limiti avvanzati ta' timeout/immaġni/tul ta' deskrizzjoni/cache,
kontaturi tal-ħin ta' eżekuzzjoni, u talba ta' kampjun imħarsa. It-tab Audio hija wkoll attiva: tesponi l-attivazzjoni,
għażla ta' mudell STT-biss b'Auto, limiti ta' timeout/max-clip, kontaturi tal-awdjo, u test ta' kampjun `input_audio`.
It-tab Video hija funzjonali: tirrapporta l-istat tal-ħin ta' eżekuzzjoni ta' FFmpeg/ffprobe — wieħed minn erba' stati espliċiti tal-UI
(`unknown` waqt li l-probe tkun qed taħdem jew ma setgħetx titlesta, `restricted` fuq host tad-dashboard mhux loopback
fejn il-probe tinqabeż min-naħa tal-klijent, `unavailable` ladarba tkun ġiet ippruvata u kkonfermata nieqsa, jew `available`
bil-verżjonijiet FFmpeg/ffprobe) — tippreserva limiti ta' attivazzjoni/mudell/frame/video/timeout, tiffiltra l-għażla tal-mudell
għal mudelli kapaċi għall-viżjoni, u tesponi kontaturi tal-vidjo.

Il-karta preċedenti tal-Vision Bridge taħt is-settings tal-AI hija link ta' kompatibilità għall-paġna l-ġdida;
m'għadhiex tippossjedi t-tieni kopja tal-formola. Il-Fornituri tal-Midja jgħaqqdu wkoll il-fluss tax-xogħol
minn Immaġni għal Test u minn Diskors għal Test mat-tabs korrispondenti tal-Modality Bridge mingħajr ma jneħħu
l-playground eżistenti ta' Diskors għal Test.

**Bypass ta' ammissjoni ta' self-loop:** meta s-sejħa ta' deskrizzjoni tgħaddi mill-self-loop `/v1` ta' OmniRoute stess
(mudell ta' fornitur mhux standard), is-sub-talba tibgħat `x-omniroute-admission-bypass: internal` u tiġi awtentikata
bil-kredenzjali tas-self-loop riżolta — is-sentinella lokali `sk_omniroute` fil-modalità lokali, jew iċ-ċavetta tal-env
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ikkonfigurata mill-operatur (#1350) sabiex l-iskjeramenti `REQUIRE_API_KEY=true`
xorta jkunu jistgħu jħaddmu s-sejħa ta' deskrizzjoni. Il-bypass jiġi onorat biss għal dawk il-kredenzjali eżatti,
għalhekk il-klijenti esterni ma jistgħux jużaw l-header biex jaqbżu l-ammissjoni.

Id-defaults legati jinsabu f'`src/shared/constants/visionBridgeDefaults.ts`;
id-defaults ġodda tal-modalità/konxji mill-kompitu/cache u r-riżolutur tas-settings jinsabu f'
`src/shared/constants/modalityBridgeDefaults.ts`. Il-guardrail jesponi għażla ta' kostruttur `deps`
sabiex it-testijiet ikunu jistgħu jinjettaw implimentazzjonijiet foloz ta' `getSettings` u `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Jinterċetta talbiet ta' chat li jġorru awdjo qabel ma jaslu f'mira li mhix magħrufa li taċċetta input awdjo.
Qatt ma jerġa' jidderieġi t-talba ta' chat: il-partijiet tal-awdjo jiġu traskritti permezz tal-endpoint multipart
eżistenti kompatibbli mal-OpenAI u l-mudell ta' chat magħżul ikompli bit-traskrizzjonijiet tat-test.

Fluss:

1. Irriżolvi `supportsAudio` permezz ta' `getResolvedModelCapabilities()`. Il-metadata espliċita tar-reġistru tal-fornitur tirbaħ,
   imbagħad il-metadata statika tal-mudell, imbagħad `modalities_input` sinkronizzata. Lista ta' input iddikjarata mingħajr `audio` hija `false`;
   l-ebda evidenza ta' kapaċità ma tibqa' `null`. Kemm `false` kif ukoll `null` jattivaw il-bridge konservattiv, filwaqt li `true` jaqbeżha.
2. Irriżolvi s-settings `modalityBridgeAudio*` u estratt partijiet awdjo ta' livell għoli li jistgħu jiġu spliced minn kull messaġġ
   permezz tad-detector kondiviż `detectMediaParts()`. Il-forom tal-wajer appoġġjati huma OpenAI `input_audio`, `audio_url`, u
   `source.media_type: "audio/*"`. L-awdjo nested jiġi skopert għar-rotta iżda ma jitneħħiex mill-path tal-splice. Ix-xogħol huwa limitat
   minn `modalityBridgeAudioMaxClips`; partijiet aktar tard jibqgħu intatti.
3. Onora `provider/model` ikkonfigurat, jew ħalli `selectAudioBridgeModel()` jimxi `AUDIO_TRANSCRIPTION_PROVIDERS` f'ordni ta' katalgu stabbli
   u agħżel l-ewwel mudell b'kredenzjali ta' fornitur attiva u użabbli.
4. `callAudioTranscription()` jikkonverti awdjo base64/data-URI f'`file` multipart, jew iniżżel `audio_url` remot permezz tal-guard
   outbound pubbliku biss b'DNS pinning u limitu ta' 25 MB. Imbagħad POSTs il-fajl u l-mudell magħżul għas-self-loop lokali
   `/v1/audio/transcriptions`, awtentikat b' `resolveSelfLoopBearer()`. Ir-rotta ta' traskrizzjoni eżistenti twettaq tfittxija normali
   tal-kredenzjali, immaniġġjar ta' cooldown/rate-limit, u dispaċċ tal-fornitur.
5. Sejħiet ta' suċċess jissostitwixxu l-partijiet tagħhom b' `[Audio N]: <transcript>`. Is-sejħiet jitħaddmu b' `Promise.allSettled`:
   falliment individwali jippreserva dik il-parti awdjo oriġinali (kuntratt #4012). Jekk kull sejħa tfalli u l-mira hija ppruvata
   `supportsAudio === false`, il-partijiet isiru `[Audio N]: (unavailable — no STT provider connected)` (kuntratt #8430).
   Għal mira mhux magħrufa (`null`), riżultat ta' falliment totali jibqa' intatt. Mira ppruvata test-biss mingħajr kredenzjali STT użabbli
   tirċievi l-istess stub espliċitu mingħajr ma toħroġ sejħa tan-netwerk.

Traskrizzjonijiet ta' suċċess jużaw il-cache LRU/TTL tal-Modality Bridge għall-proċess kollu. Iċ-ċavetta tgħaqqad ir-referenza tal-awdjo,
it-tikketta tal-operazzjoni stabbli `audio-transcription`, u l-mudell STT magħżul; il-fallimenti qatt ma jiġu cached.
Tentattivi tal-awdjo jaġġornaw il-kontaturi kondiviżi `bridged`, `cacheHits`, `failures`, u `lastUsedAt`.
Risposti trasformati jġorru `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
talbiet intatti ma jirċievux segment tal-Audio Bridge.

Is-settings tal-ħin ta' eżekuzzjoni huma appoġġjati mid-DB u validati minn Zod:

| Ċavetta                       | Default | Firxa           |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto jew STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Il-cache kondiviża tibqa' kkontrollata minn `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, u `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Jinterċetta partijiet tal-vidjo ta' livell għoli fil-`messages` ta' Chat Completions u r-Risposti tal-API `input` qabel ma tiġi msejħa mira mingħajr appoġġ tal-vidjo nattiv magħruf.
L-għamliet appoġġjati huma `input_video`, `video_url`, `video_source`, URLs HTTPS,
u URIs tad-data `data:video/*;base64,...`. Ismijiet ta' fajls sempliċi fit-test mhumiex trattati
bħala vidjo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) hija responsabbli għat-traversar tat-talba, il-kontroll tal-kapaċità/politika, l-aggregazzjoni għal kull talba, u l-payload tar-rispons.
Ix-xogħol għal kull vidjo — l-akkwist, il-cache tar-riżultat sħiħ, id-deskrizzjoni ta' sekwenza ta' frames
(li tgħaqqad kwalunkwe traskrizzjoni awdjo ddikjarata mill-utent), u l-metriċi/abort/tindif għal kull tentattiv — huwa moħbi wara `processVideoPart` f'`videoBridgePipeline.ts`, imsejjaħ darba għal kull parti tal-vidjo ġewwa l-loop ta' `preCall`.
Dak il-modulu jiddefinixxi wkoll il-konfini tal-portijiet espliċiti `VideoMediaBrokerPort`
(akkwist ta' bytes u estrazzjoni ta' frames kampjunati), `VideoAudioTranscriptionPort`
(tgħaqqad traskrizzjoni awdjo ddikjarata mill-utent mal-captions kampjunati), u
`VideoDrilldownPort` (il-konfini tal-persistenza tad-drill-down tal-frames; għadha mhix imqabbda
f'`processVideoPart` — illum biss ir-rotta separata `/api/modality-bridge/video/drilldown`
tikteb entrati tad-drill-down).

Il-path pubbliku tat-talba `/v1` qatt ma jimporta jew jinvoka subproċess. Vidjos remoti
jitniżżlu taħt limitu ta' 50 MiB; vidjos inline base64 għandhom limitu dekowdjat ta' 36 MiB
għal kull vidjo sabiex l-envelop tal-mudell/messaġġi/framing jista' jibqa'
ġewwa l-limitu ta' ammissjoni ta' talbiet JSON pubbliċi ta' 50 MiB. It-tul inline u
l-istimi tad-daqs dekowdjat jiġu kkontrollati qabel l-allokazzjoni. L-HTTPS huwa
meħtieġ fuq l-URL remot inizjali u kull redirect, bl-użu tal-guard outbound eżistenti
pubbliku biss b'DNS pinning. Il-bytes imbagħad jaqsmu l-konfini eżatta interna
tal-broker `POST /api/modality-bridge/video/extract`. Dik ir-rotta hija kemm
`LOCAL_ONLY` kif ukoll `SPAWN_CAPABLE`, taċċetta biss talba awtentikata għal kull proċess,
trusted-loopback, u qatt ma taċċetta URL, path tas-sistema tal-fajls, eżekutibbli,
jew lista ta' argumenti. Il-pipeline tad-daqs tal-korp tal-API u l-qarrej inkrementali tal-korp tal-handler
jinfurzaw b'mod indipendenti limitu ta' input tal-broker ta' 50 MiB. Il-kju limitat tiegħu jmexxi
estrazzjoni waħda kull darba, jippermetti erba' xogħlijiet pendenti, u jillimita l-input pendenti għal
100 MiB.

Ġewwa l-broker, `ffprobe` jaqra fajl lokali privat; il-lista ta' permess ta' format fiss
teskludi formati ta' playlist u manifest. Għal kontenituri tal-familja MOV permessi,
referenzi ta' data MOV esterni jibqgħu diżattivati b'mod awtomatiku, u l-kmand fiss ma
jottax għalihom. Kemm `ffprobe` kif ukoll `ffmpeg` jużaw il-whitelist tal-protokoll `file`-only,
thread wieħed, arrays ta' argumenti fissi, l-ebda shell, u eżekutibbli riżolti minn `PATH`.
Streams ta' kopertura ta' stampi mehmuża mhumiex kandidati li jistgħu jintlagħbu.
Kull stream li jista' jintlagħab irid jissodisfa l-limiti, u stream default espliċitu huwa preferut
qabel il-fallback deterministiku tal-inqas indiċi. Il-vidjos huma limitati għal 600 sekonda,
8,192 pixels għal kull dimensjoni, u 33,554,432 pixels sors. FFmpeg jikkampjona 1–16
frames JPEG ta' nofs il-punt, inaqqas it-tarf twil għal massimu ta' 1,024 pixels mingħajr ma
jżid id-daqs ta' inputs iżgħar, u qatt ma jirċievi URL. Il-kampjunar huwa `uniform` b'mod awtomatiku.
Il-politiki fakultattivi `scene_aware` u `segment_aware` sperimentali jwettqu pass addizzjonali
fiss ta' FFmpeg fuq l-istrim lokali diġà validat, jagħżlu timestamps ta' xeni `showinfo` limitati,
u jaqgħu lura b'mod deterministiku għall-istess nofs il-punti uniformi f'każ ta' falliment tad-detector,
timeout, output iffurmat ħażin, jew sett ta' kandidati vojt. Il-modalità segment-aware talloka
kampjuni ta' nofs il-punt proporzjonalment għall-intervalli tax-xeni validati; l-evidenza segment-aware
u l-imġieba ta' fallback huma dettaljati hawn taħt. Il-limitu iebes ta' 16-il frame huwa
applikat wara l-għażla f'kull politika. Meta talba scene-aware jkollha baġit ta' frame waħda biss,
tuża n-nofs il-punt uniformi tal-vidjo sħiħ attiv jew it-tieqa tal-fokus u tirrapporta
`policyEffective: uniform`: frame waħda magħżula tax-xena ma tistax tippreserva ż-żewġ truf temporali.
Utent jista' fakultattivament jipprovdi tieqa ta' fokus finita (`start`/`end` sekondi);
il-limiti huma kklampjati għad-durata tal-media, twieqi maqluba jew mhux finiti huma miċħuda,
u l-politiki kollha tal-kampjunar jitwettqu biss ġewwa l-intervall normalizzat.
It-tieqa li tirriżulta hija inkluża fil-metadata tal-kampjunar u fil-prefiss tad-deskrizzjoni
mhux fdat sabiex il-mudelli downstream ikunu jistgħu jiddistingwu estratt iffokat mit-timeline sħiħa.

Il-fokus tal-caption semantiku huwa setting separat u espliċitu. Il-modalità ta' analiżi `full`
default tippreserva l-prompt tal-frame eżistenti u qatt ma tibgħat it-test tat-talba lill-mudell tal-caption.
Fil-modalità `focused`, il-bridge jaqra biss l-aħħar `text`/`input_text` mhux vojt miktub mill-utent
mill-istess Chat jew kontenitur tar-Risposti, jinnormalizzah għal NFC, jikkollassa karattri ta' kontroll
u spazji bojod, u jillimitah għal 500 code point Unicode. Riżultat vojt jaqa' lura għall-prompt `full` eżatt.
Ħjiel użabbli huwa serializzat bħala JSON fi blokk dedikat ta' kuntest tal-utent mhux fdat u jista'
biss jipprijoritizza dettalji osservabbli; ma jistax jikkanċella t-twissija separata kontra li ssegwi
istruzzjonijiet viżibbli jew awdjo fil-media. Il-fokus testwali qatt ma jiddeduċi `start`/`end` jew
ibiddel is-sampler temporali.

#### Evidenza strutturali tas-segment FU-07

`segment_aware` juża pass wieħed ta' pre-analiżi limitat fuq l-istrim tal-vidjo lokali diġà validat.
Il-katina tal-filtri fissa l-ewwel tiskala għal massimu ta' 320 pixels wiesgħa, tiskopri bidliet fix-xena
u intervalli ffriżati, imbagħad tikkampjona b'1 frame kull sekonda għal blur, luma medja, u informazzjoni
spazjali/temporali. Il-pass huwa limitat għal 600 kampjun strutturali, thread wieħed ta' FFmpeg/filter,
l-istess protokoll `file`-only u allowlists tal-kontenitur, limitu ta' output tal-proċess ta' 1 MiB,
u massimu ta' 30 sekonda ġewwa l-abort/deadline kondiviż tal-broker. Qatt ma jaċċetta kmand, filtru,
path, jew URL mit-talba.

Il-valuri strutturali huma evidenza ta' kampjunar deterministiku, mhux fehim semantiku tal-vidjo. Ma jinterpretawx suġġetti, azzjonijiet, captions, diskors, jew intenzjoni tal-utent. Il-konfini tax-xena u tal-iffriżar jiffurmaw segmenti; il-kopertura tal-iffriżar, iċ-ċajpra, l-espożizzjoni, id-dettall spazjali, u l-bidla temporali jinfluwenzaw biss kif jiġi allokat il-baġit eżistenti ta' 1–16-il frame. Segment iffriżat kompletament huwa limitat għal frame wieħed, filwaqt li segmenti mhux iffriżati jikkompetu għall-baġit li jifdal. Meta l-konfini jaqbżu n-numru ta' frames, il-kopertura uniformi tal-kronoloġija tinżamm sabiex qatgħat bikrija rapidi ma jkunux jistgħu jaħbu segment twil li jsegwi. Il-konfini tax-xena fi ħdan ir-riżoluzzjoni ta' analiżi ta' sekonda waħda ta' konfini ta' iffriżar jingħaqdu.

Filtri neqsin, evidenza ffurmata ħażin/vojta, żball fid-detector, jew il-timeout ta' qabel l-analiżi b'limitu jfallu miftuħa għall-politika eżatta tal-punt tan-nofs uniformi. Abort tal-caller jew skadenza tal-broker ma jfallux miftuħa: itemm is-subprocess li jkun għaddej, jipprevjeni l-estrazzjoni ta' frames aktar tard, u s-siġra temporanja privata titneħħa f'`finally`.

`scripts/perf/video-bridge-fu07-eval.ts` jiġġenera fixtures FFmpeg reali deterministiċi għal iffrankar ta' caption-call wara d-dedup, allokazzjoni ta' baġit ta' moviment dens, evidenza ta' ċajpra/espożizzjoni/SI-TI, qatgħat rapidi b'denb twil, u pożittivi foloz ta' fade gradwali. Jirrekordja l-ħin tal-ħajt ta' qabel l-analiżi u, fejn `/usr/bin/time` huwa disponibbli, is-CPU tat-tfal u l-RSS massimu. Il-kontrolli tal-kwalità tiegħu huma orakli strutturali biss. Il-kwalità tal-mudell tal-caption reali tibqa' `HOLD` minħabba li dan il-harness m'għandux endpoint awtorizzat jew imħallef iffriżat. L-iffrankar monetarju jibqa' wkoll `HOLD` sakemm `--caption-cost-per-call-usd` ma jipprovdix stima espliċita pożittiva għal kull sejħa; l-iskript qatt ma jiffabbrika xi riżultat.

Kull frame huwa limitat għal 4 MiB, il-frames mhux ipproċessati kollha flimkien għal 23 MiB, u r-rispons tal-broker serializzat għal 32 MiB. Direttorju temporanju privat jitneħħa f'`finally`. OmniRoute ma jinkludix FFmpeg u ma jaċċettax path eżekutibbli personalizzat. Qabel il-captioning, il-bridge japplika pass ta' deduplikazzjoni viżwali konservattiv: kull JPEG jitnaqqas għal buffer ta' grayscale ta' 16×16 u jitqabbel biss mal-aħħar frame miżmuma. Għal baġit ta' caption mitlub 'il fuq minn frame wieħed, l-estrazzjoni tipprovdi pool ta' kandidati limitat sa darbtejn dak il-baġit u qatt aktar minn 16-il frame. Il-limitu mitlub jiġi applikat biss wara d-deduplikazzjoni, bl-ewwel u l-aħħar kandidati magħżula ppreservati waqt it-tnaqqis finali meta l-baġit ikun mill-inqas tnejn. Il-politika verżjonata `grayscale-16x16-mean-cells-v2` tuża l-akbar tad-delta medja tal-luma u l-proporzjon ta' ċelloli tal-thumbnail li d-delta normalizzata tagħhom hija mill-inqas 0.05. Il-limitu tad-duplikat huwa l-kostanti 0.04, magħżul għall-prevedibbiltà aktar milli espost bħala setting runtime. Dan is-sinjal sekondarju ta' kuntrast għoli jippreserva moviment żgħir u bidliet fit-test viżibbli li paragun medju biss jista' jaħbi. Żbalji tal-komparatur jew tad-decoder ifallu miftuħa u jżommu l-kopertura. Il-metadata tal-output tissepara l-kandidati estratti, il-frames użati b'suċċess, u d-duplikati viżwali mormija.

Parti tal-vidjo mmarkata espliċitament tista' titlob contact sheet b'timestamp. Il-bridge jibni l-aktar grilja JPEG ta' 4 kolonni u 16-il frame. Kull ċellola ta' 512-pixel taħraq it-timestamp tas-sors tagħha f'banda tal-qiegħ b'kuntrast għoli, filwaqt li l-istess timestamps jibqgħu fil-metadata testwali għal assoċjazzjoni u verifika downstream. Il-JPEG komplet jibqa' limitat għal 32 MiB. Jekk `sharp` ma jistax jiddekodifika jew jikkomponi l-grilja, il-bridge jaqa' lura għall-frames JPEG individwali; abort tal-klijent xorta jippropaga permezz tal-operazzjoni tal-sheet.

L-evidenza tal-promozzjoni hija deliberatament separata mill-mikrobenchmark tal-kompożizzjoni sintetika. `scripts/perf/video-bridge-contact-sheet-eval.ts` tiddefinixxi harness A/B verżjonata skematikament għal mudelli ta' viżjoni reali kompatibbli ma' OpenAI. Tkejjel it-tokens irrappurtati mill-fornitur, il-latency tal-ħajt minn tarf sa tarf (inkluża l-kompożizzjoni tal-sheet), l-għadd ta' sejħiet tal-mudell, u ż-żamma tal-fatti definiti fil-manifest. Ir-risposti mhux ipproċessati tal-mudell ma jinkitbux fir-rapport; jinżammu biss id-digests SHA-256 u l-IDs tal-fatti mqabbla. Il-harness ma jagħmel l-ebda sejħa tan-netwerk jew tal-mudell imħallas sakemm ma jgħaddix `--execute-real` u `OMNIROUTE_BASE_URL` u `OMNIROUTE_API_KEY` ma jkunux konfigurati. Mingħajr dik it-tħaddim reali espliċitu, il-verdett li jista' jinqara mill-magna tiegħu jibqa' `HOLD`; il-kejl tal-payload/għadd ta' sejħiet sintetiċi waħdu mhuwiex evidenza ta' promozzjoni.

Il-callers jistgħu jwaħħlu array `transcript.cues` fakultattiv ma' parti tal-vidjo appoġġjata meta diġà jkollhom test allinjat. Kull cue għandu jkollu `text`, intervall `start`/`end` finit ġewwa d-durata sondi, u `source` whitelisted (`client`, `embedded`, jew `audio-bridge`); `confidence` default għal `1` u għandu jibqa' bejn `0` u `1`. Cues duplikati eżatti jingħaqdu. OmniRoute qatt ma jibda t-traskrizzjoni minn din il-metadata: cues validati jiġu kkupjati fir-riżultat deskritt bis-sors, il-kunfidenza, u l-intervall, u jiġu rrenduti bħala osservazzjonijiet mhux affidabbli flimkien mal-captions tal-frame. Test invalidu, barra mill-firxa, jew mingħajr provenjenza jiġi rrifjutat aktar milli jitħallat fil-fluss tal-caption. Il-qasam `source` bħalissa huwa ddikjarat mill-caller, mhux ivverifikat mis-server: OmniRoute jinfurza li l-valur huwa wieħed mit-tliet strings permessi, iżda għadu ma jikkonfermax kriptografikament li tikketta `embedded` jew `audio-bridge` fil-fatt ġiet minn estrazzjoni proprjetà tas-server. Ittratta `source` bħala ħjiel mhux affidabbli sakemm dik il-verifika tinżel; tibnix deċiżjonijiet ta' awtorizzazzjoni fuqha.

Sejħa avvanzata tista' tipprovdi track `audioTranscript` diġà awtorizzat
għall-istess vidjo. Il-ħjata tal-fużjoni tmexxi osservazzjonijiet viżwali u awdjo taħt
skadenza waħda u sinjal ta' abort, tordnahom fuq skeda ta' żmien komuni, tiġbor
duplikati eżatti, u tirrapporta riżultat parzjali meta tirnexxi naħa waħda biss.
`audioTranscript` invalidu jiddegrada għal dak ir-riżultat parzjali — il-viżwali
deskrizzjoni tinżamm u l-fergħa awdjo tirreġistra kodiċi ta' falliment sanitat —
minflok ma tfalli l-vidjo kollu. Id-disponibbiltà għal kull fergħa, il-bandiera parzjali,
u l-kodiċijiet ta' falliment sanitat huma ppreservati fir-riżultat deskritt, fil-
metadata tal-guardrail (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), fil-metadata tal-cache tar-riżultat, u fil-counters tal-fużjoni tal-bridge. Il-passaġġ default tal-Video Bridge ma jinvokax speech-to-text
jew iniżżel it-tieni kopja tal-media; mingħajr dak it-track espliċitu, jibqa'
vidjo biss.

**Żamma tat-traskrizzjoni (#12150 P1).** Dan japplika awtomatikament kull meta l-
Video Bridge (huwa stess opt-in) jirrendi cue tat-traskrizzjoni — m'hemm l-ebda
bandiera ta' żamma separata. Meta talba tirrendi xi cue tat-traskrizzjoni (sejħa ddikjarata
`transcript` jew `audioTranscript` magħquda), il-guardrail timmarkaha
`videoBridgeObserved` u tipproduċi dell imnaqqas tad-deskrizzjoni tal-vidjo —
rendering identiku li fih il-korp ta' test liberu ta' kull cue huwa sostitwit minn
`[redacted-video-transcript]`, mibni billi jiġi sostitwit il-kamp tal-cue strutturat
qabel ma l-string tiġi assemblata (qatt billi jiġi analizzat it-test ċatt, għalhekk l-ebda kontenut tal-cue — avversarju jew ordinarju, inklużi korpi li fihom `]` bħal
`[inaudible]`/`[music]` — ma jista' jgħix). Il-korp tat-talba tal-call-log persistenti jiskambja
kull parti tat-test derivata mill-vidjo għal dak id-dell imnaqqas, imqabbel bl-ugwaljanza tal-kontenut; l-ankra `fullText` terġa' tinqara mill-payload tal-guardrail ta' qabel is-sejħa lest, għalhekk il-match xorta jirnexxi wara guardrails tal-katina aktar tard (il-maskers tal-PII u tal-kredenzjali, prijoritajiet 10/95) jerġgħu jiktbu t-test tad-deskrizzjoni fil-post u wara li l-injezzjoni tas-sistema-prompt/handoff/memory tifforma mill-ġdid l-array tal-messaġġ. Il-korp mibgħut 'il fuq lill-mudell jibqa' mhux mibdul. Talba osservata wkoll ma timlax l-ebda Memorja durabbli (kemm l-estrazzjoni derivata mit-talba kif ukoll mir-rispons huma injorati), għalhekk ir-rispons tal-mudell stess ma jistax jirrifletti t-test tat-traskrizzjoni fil-Memorja.

Kopji miżmuma addizzjonali jużaw l-istess sinjal ta' talba osservata. Il-snapshot mhux ipproċessat tat-talba tal-klijent ta' qabel il-guardrail, it-talba pendenti fil-memorja, u l-log bikri tat-talba miċħuda jissostitwixxu strutturalment il-kampijiet tat-traskrizzjoni fil-partijiet tal-vidjo; prompts ta' string sintetizzati minn stadji tal-pipeline u handoff tal-kuntest huma mnaqqsa fis-sink tal-korp tat-talba persistenti. Il-marker persistenti `video_content_removed` jagħmel il-kontinwazzjoni `previous_response_id` tfalli magħluqa minflok ma terġa' tibni test li kien intenzjonalment mormi. Jekk talba osservata titlef id-dell ta' tnaqqis għal kull parti qabel il-logging, jew anke wieħed minn diversi dellijiet tal-vidjo jonqos milli jaqbel wara mutazzjonijiet tat-talba aktar tard, il-korp tat-talba miżmum jitħalla barra kompletament minflok ma tinżamm traskrizzjoni parzjalment imnaqqsa.

Għal talba osservata, rispons tal-mudell jista' jikkwota kwalunkwe porzjon tat-traskrizzjoni mingħajr konfini ta' cue strutturat. Il-`responseBody` tal-call-log persistenti tiegħu għalhekk jiġi sostitwit b'marker ta' ommissjoni; l-artifact dettaljat tal-pipeline (li jista' jinkludi korpi upstream/klijent u biċċiet ta' stream) ma jinżammx. Il-caches semantiċi, ta' idempotenza, u ta' replay tar-raġunament jaqbżu l-qari u l-kitba għal dik it-talba. It-talba tal-fornitur u r-rispons viżibbli għall-klijent jibqgħu mhux mibdula. Bytes bikrija ta' keepalive jitbattlu mill-buffer temporanju meta l-artifact dettaljat jitħalla barra. It-twissija ta' EventStream iffurmat ħażin ta' Kiro tirrapporta biss l-għadd ta' bytes tal-payload, qatt il-kontenut tiegħu jew l-iżball mhux ipproċessat tal-parser JSON.
Dan ma jiddikjarax li kull dijanjostika ta' fornitur/plugin mhux relatata ġiet ivverifikata; l-iskop usa' tas-sink miżmum huwa segwit f'#11658.

Iċ-ċiklu tal-ħajja intern `/api/modality-bridge/video/drilldown` huwa sottostrat ta' cache separat, loopback/awtentikat bit-token. Kull operazzjoni teħtieġ ukoll ID prinċipali opaka kanonika. Qabel ma sejħa ta' produzzjoni tiġi attivata, trid tidderiva dik l-ID mill-kerrej awtentikat u qatt ma trid tgħaddi valur magħżul mill-klijent. Iċ-ċwievet tal-cache jorbtu dak il-prinċipal ma' IDs kanoniċi ta' sessjoni u referenza tal-vidjo, jaħżnu biss iċ-ċwievet derivati minn SHA-256 tagħhom, u jiskopru kemm il-qari kif ukoll it-tħassir għall-istess prinċipal. Il-cache taħżen massimu ta' 16-il frejm JPEG derivat għal kull entrata, tiskadihom wara għaxar minuti, u tappoġġja qari `start`/`end` limitati jew tħassir espliċitu tas-sessjoni.

Kull prinċipal huwa limitat għal 16-il entrata u 64 MiB ta' data JPEG kanonika. Dawk il-limiti huma indipendenti mis-saqaf globali ta' 64 entrata/256 MiB: il-pressjoni tal-kwota prinċipali tkeċċi biss l-entrati l-inqas użati reċentement ta' dak il-prinċipal qabel ma tiġi kkunsidrata t-tkeċċija globali tal-LRU. L-entrati skaduti jitneħħew kemm mill-kontabilità prinċipali kif ukoll minn dik globali fuq l-attività tal-cache, filwaqt li l-kanċellazzjoni u l-falliment tal-validazzjoni ma jikkommettux sostituzzjoni parzjali.

Il-cache tirrifjuta Base64 mhux kanoniku, padding eċċessiv, media mhux JPEG, JPEGs iffurmati ħażin jew maqtugħin, u JPEGs li jipproduċu twissija waqt dekodifikazzjoni `sharp` ta' immaġni sħiħa limitata. Terġa' tikkodifika kull immaġni aċċettata bħala JPEG kanoniku, tidderiva l-wisa' u l-għoli mill-bytes dekodifikati minflok ma tafda l-kampijiet tas-sejħa, u tarmi kwalunkwe bytes poliglotti li jsegwu minflok ma żżommhom. Il-buffer kompressat kanoniku limitat biss huwa ċċarġjat għaż-żewġ kwoti. Il-limitu tal-wajer JSON jinkludi l-overhead tal-Base64 għas-saqaf ta' input dekodifikat ta' 32 MiB. Kull derivazzjoni maħżuna tirreġistra l-format/riżoluzzjoni JPEG validata tagħha, il-politika ta' kampjunar, il-verżjoni tad-derivazzjoni, il-ħin tal-ħolqien, il-hash tal-kontenut ikkalkulat mis-server, u r-referenza tal-ġenitur hashed flimkien mal-hash tal-kontenut tal-ġenitur tas-sejħa fdata. Il-kanċellazzjoni tiġi ċċekkjata bejn fażijiet asinkroniċi ta' dekodifikazzjoni/hash qabel il-commit atomiku tal-cache.

Din it-tranche għadha ma tgħaqqadx produttur tal-produzzjoni mar-rotta u ma
tipprovdix għażla ta' varjant b'riżoluzzjoni multipla. It-talba trasparenti tal-Video Bridge
għalhekk ma ġġarrab l-ebda xogħol miżjud, filwaqt li d-derivazzjoni prinċipali marbuta mal-kerrej u
l-ħajja sħiħa b'riżoluzzjoni multipla FU-08 jibqgħu xogħol ta' segwitu espliċitu
aktar milli dokumentati bħala mġiba kompluta.

Il-frejms huma sottotitolati sekwenzjalment bil-mudell tal-Vidjo kkonfigurat. Vidjo vojt
override jiret l-issettjar tal-Vision; jekk it-tnejn huma vojta, l-auto-router tal-Vision
jagħżel il-mudell effettiv kapaċi għall-viżjoni. Sottotitli ta' suċċess
jissostitwixxu l-parti oriġinali bi prefiss stabbli `[Video description:` li wkoll
jimmarka t-test bħala osservazzjoni derivata mill-midja mhux fdata u jgħid lill-mudelli downstream
biex ma jsegwux istruzzjonijiet misjuba fil-midja. Iċ-ċwievet tal-cache tas-sottotitli tal-frejms
jinkludu l-bytes JPEG, il-prompt, it-timestamp, u l-mudell effettiv; sottotitli ta' suċċess biss
jiġu cached. L-entrati tal-cache iżommu l-mudell tal-produttur attwali ta' suċċess,
inkluż mudell ta' fallback; il-bridge jirrapporta `mixed` meta frejms differenti
ġew prodotti minn mudelli differenti. Hit tal-cache jerġa' juża dik l-identità tal-produttur
minflok ma jerġa' jittikkettaha bħala l-pjan ta' rotta mitlub. Il-cache tar-riżultati tal-vidjo kollu
huwa keyed fuq kull input li jibdel l-output — prompt, mudell effettiv,
politika ta' kampjunar, għadd ta' frejms, mod ta' analiżi semantika, il-marka tas-swaba' SHA-256
tal-ħjiel ta' fokus normalizzat, tieqa ta' fokus, `transcript`,
`audioTranscript`, u l-bandiera tal-folja ta' kuntatt — għalhekk il-bidla ta' kwalunkwe waħda minn dawk
id-dimensjonijiet hija cache miss, qatt użu mill-ġdid skadut. Il-verżjoni tal-politika ta' dedup viżwali,
il-limitu, u l-għadd ta' frejms kandidati limitati huma wkoll espliċiti fiċ-ċavetta tal-cache tar-riżultati
u l-metadata; bidla fil-politika għalhekk ma tistax terġa' tuża deskrizzjoni tal-vidjo kollu skaduta.
Il-metadata v4 tal-cache tar-riżultati żżomm il-mod u l-marka tas-swaba', qatt il-kompitu tal-utent mhux ipproċessat.
Il-metadata tal-guardrail tirrapporta kemm il-modi ta' analiżi mitluba kif ukoll dawk effettivi;
mod `focused` mitlub mingħajr test tal-utent użabbli huwa rrapportat bħala effettivament `full`.

Il-guardrail jiġbed kull parti tal-vidjo appoġġjata iżda jiddeskrivi mhux aktar minn
`modalityBridgeVideoMaxVideos`. Għal mira ppruvata li għandha
`supportsVideo === false`, vidjows falluti u li jaqbżu l-limitu jsiru markaturi ta' test sikuri espliċiti
sabiex l-ebda vidjo mhux ipproċessat ma jgħix. Meta l-kapaċità ma tkunx magħrufa, dawk il-partijiet
jibqgħu intatti. Miri b'`supportsVideo === true` jaqbżu l-bridge.
Is-sinjal ta' abort tat-talba tal-klijent jippropaga permezz tat-tniżżil, il-kju tal-broker,
is-sottoproċessi, u s-sejħiet tas-sottotitli; l-aborti jieqfu bejn il-vidjows u qatt ma jfallu miftuħa
għall-midja mhux ipproċessata.

L-issettjar tar-runtime huma appoġġjati mid-DB u validati minn Zod:

| Key                                 | Default     | Range / behavior                                                                                              |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime fakultattiv, opt-in                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` tippreserva sottotitli ġeneriċi; `focused` tuża kuntest tal-utent l-aktar reċenti, limitat u mhux fdat |
| `modalityBridgeVideoModel`          | `""`        | Jiret il-mudell tal-Vision Bridge                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, jew `segment_aware` proporzjonali; falliment tad-detector jaqa' lura għal `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                |

Valuri ta' timeout tal-Vidjo persistenti legati 'l fuq minn 120 sekonda huma kklampjati mal-iskadenza tal-broker;
kitbiet ta' settings ġodda 'l fuq minn dak il-limitu huma rrifjutati.
`GET /api/modality-bridge/video/runtime` teħtieġ lokalità ta' loopback ittimbrata fdata
qabel l-awtentikazzjoni jew it-test tar-runtime, imbagħad teħtieġ awtentikazzjoni tal-ġestjoni.
Tirritorna biss verżjonijiet `available`, FFmpeg/ffprobe sanitarizzati, u raġuni fissa
meta r-runtime ma jkunx disponibbli. Il-endpoint ta' estrazzjoni intern mhuwiex
API ta' upload pubblika: is-saturazzjoni tal-kju tirritorna `503` flimkien ma' `Retry-After`,
skonnessjoni tal-caller tirritorna `499`, u l-iskadenza fissa tal-broker tirritorna `504`.
Ir-risposti konvertiti jżidu `video->text;model=<visionModel>;parts=<videos>` mal-header ċentrali
`x-omniroute-modality-bridge` mingħajr ma jitneħħew is-segmenti tal-Vision jew tal-Awdjo.

### PII Masker (`piiMasker.ts`)

Jaħdem fuq **iż-żewġ** stadji.

- **`preCall`** jikkopja l-payload, jimxi `system`, `messages`, `input`, u
  `prompt` (inklużi oġġetti ta' string sempliċi), u japplika `processPII()` (minn
  `@/shared/utils/inputSanitizer`) għall-oqsma `content`/`text` ta' string. Meta
  `PII_REDACTION_ENABLED=true`, PII misjuba tiġi redatta fil-payload ħiereġ.
  Dan huwa indipendenti minn `INPUT_SANITIZER_MODE` (li jikkontrolla biss
  il-politika ta' injezzjoni tal-prompt). Meta r-redazzjoni tkun mitfija, is-sejħa tirreġistra
  għadd ta' sejbien mingħajr ma terġa' tikteb il-kontenut.
- **`postCall`** jikkopja fil-fond ir-rispons, imexxi `sanitizePIIResponse()` flimkien ma'
  l-masker tal-forma tal-API tar-Risposti (`maskResponsesOutput` — ikopri
  `output_text` u `output[].content[].text`). Jekk isseħħ xi redazzjoni,
  ir-rispons modifikat jissostitwixxi l-oriġinal.

Il-guardrail qatt ma jimblokka; huwa biss jinnota (`meta.detections`,
`meta.redacted`) jew jerġa' jikteb.

### Prompt Injection (`promptInjection.ts`)

Jiskopri strutturi avversarji fil-kontenut fornut mill-utent u jinforza l-politika
kkonfigurata. L-imġiba hija mmexxija minn varjabbli tal-ambjent u għażliet tal-kostruttur:

| Issettjar            | Env var                                                                                               | Default | Effett                                                                                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Attivat              | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Meta `false`, il-guardrail jagħmel short-circuit.                                                                                                                                                                                            |
| Modalità             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Politika ta' injezzjoni: `block`, `warn`, jew `log`. (`redact` hija aċċettata għall-kompatibbiltà b'lura iżda **ma** tneħħix it-test tal-injezzjoni; it-talba għall-kitba mill-ġdid tal-PII hija kkontrollata minn `PII_REDACTION_ENABLED`.) |
| Limitu tal-imblukkar | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Severità minima meħtieġa biex timblokka. Medju huwa biss għall-osservazzjoni b'mod default.                                                                                                                                                  |

**Preċedenza tal-Modalità** (`getMode`): `options.mode` tas-sejħa →
`INJECTION_GUARD_MODE` **override tal-feature-flag tad-DB** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Għalhekk, override mid-dashboard tirbaħ fuq il-varjabbli tal-ambjent, u b'hekk l-UI tal-Feature Flags tikkontrolla l-guard li jkun qed jaħdem live (mingħajr restart). Il-qari tad-DB huwa fail-safe:
jekk iseħħ żball, il-guard jerġa' lura għall-imġieba bbażata fuq l-env, u meta ma jkunx hemm override issettjat, l-imġieba hija identika għar-riżoluzzjoni bbażata biss fuq l-env.

Sorsi ta' skoperta:

1.  `sanitizeRequest()` minn `@/shared/utils/inputSanitizer` (sett ta' ditekters kondiviż użat f'postijiet oħra fil-pipeline).
2.  `DEFAULT_GUARD_PATTERNS` inkorporati (bħalissa `system_override_inline` u
    `markdown_system_block`, it-tnejn severità `high`).
3.  `customPatterns` fakultattivi mgħoddija permezz ta' għażliet tal-kostruttur (strings, regex,
    jew rekords `{ name, pattern, severity }`).

Meta `mode === "block"` **u** mill-inqas skoperta waħda tissodisfa l-limitu tas-severità, `preCall` tirritorna `{ block: true, message: "Request rejected:
suspicious content detected" }`. Fil-modi `warn`/`log`, il-guardrail jirreġistra iżda jippermetti s-sejħa. Il-helper kondiviż `evaluatePromptInjection()` huwa wkoll esportat għal dawk li jsejħu li jeħtieġu jevalwaw prompts mingħajr ma jgħaddu mir-reġistru.

**Limitu tal-iskannjar (v3.8.20):** id-ditekter jispezzjona biss l-**ewwel 16 KB** tat-test tal-prompt magħqud — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) f' `src/shared/utils/inputSanitizer.ts`. Kemm `detectInjection()` kif ukoll
`evaluatePromptInjection()` jagħmlu `slice(0, MAX_INJECTION_SCAN_BYTES)` qabel ma jħaddmu l-loop tal-mudell. Id-direttivi tal-injezzjoni jinsabu qrib il-bidu ta' input, għalhekk dan jillimita s-CPU/GC tar-regex fuq payloads ta' mijiet ta' KB mingħajr ma jdgħajjef l-iskoperta (ara #3932, #4041).

### Masker tal-Kredenzjali (`credentialMasker.ts`)

Jaħdem fuq **iż-żewġ** stadji, l-aħħar fil-katina default (prijorità `95`). Jirredatta mudelli magħrufa ta' API-key / secret-token mill-payload ħierġa (kontenut tal-messaġġ, argumenti tas-sejħiet tal-għodda, riżultati tal-għodda) **u** r-rispons tal-fornitur, sabiex kredenzjal imwaħħal fi prompt (jew imtenni lura minn riżultat ta' għodda) ma jnixxix lill-fornitur upstream jew lura lill-klijent.

- **Opt-in biss**, l-istess konvenzjoni bħar-redazzjoni tal-PII (Ħard Rule #20-aġġaċenti): diżattivat sakemm `settings.credentialRedactionEnabled === true` **jew**
  `CREDENTIAL_REDACTION_ENABLED=true`. Meta jkun mitfi, il-guardrail ma jagħmel xejn —
  qatt ma jimblokka u qatt ma jerġa' jikteb.
- `redactCredentials()` jgħaddi mis-siġra sħiħa tal-payload/rispons (`walkValue()`,
  prototip-pollution-safe, cycle-safe permezz ta' `WeakSet`) u jissostitwixxi t-tqabbil b'placeholder `[REDACTED:<type>]`, billi jikkopja biss il-fergħat li fil-fatt inbidlu.
- `CREDENTIAL_PATTERNS` tkopri ċwievet tal-fornituri tal-LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokens VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ċwievet tal-ħlas (Stripe, Square),
  ċwievet tal-cloud (AWS access key, Twilio, SendGrid, Mailgun), ċwievet privati / JWTs,
  stringi ta' konnessjoni li jġorru kredenzjali (`mongodb://user:pass@...`, eċċ.), u mudell ġeneriku ta' valur ta' header `Authorization`/`x-api-key`/`api-key`/`apikey`. Ċwievet b'forma ta' header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) huma rredattati strutturalment (valur biss, prefiss tal-iskema bħal
  `Bearer `/`Basic ` ippreservat) aktar milli permezz tar-regex tat-test ġeneriku.
- Il-guardrail qatt ma jimblokka; huwa biss jerġa' jikteb (`modifiedPayload` /
  `modifiedResponse`) u jannotta (`meta.credentialsRedacted`, `meta.count`).

Guard tar-rigressjoni: `tests/unit/credential-masker-guardrail.test.ts`.

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
