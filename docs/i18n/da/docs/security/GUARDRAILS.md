# Guardrails (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sandhedskilde:** `src/lib/guardrails/`
> **Senest opdateret:** 2026-08-29 — v3.8.51 (herkomsten af Video Bridge-transskriptioner deklareres af kalderen,
> men er endnu ikke verificeret af serveren — præciseret i henhold til #11661)

Guardrails håndhæver sikkerhed, politikker og indholdstransformationer ved grænsen
mellem OmniRoute og upstream-udbydere. Hver guardrail kan inspicere (og
eventuelt afvise, transformere eller annotere) request-payloads (`preCall`) og
upstream-svar (`postCall`).

Systemet er **fail-open**: Hvis en guardrail kaster en fejl under kørsel, registrerer
registreringsdatabasen fejlen og fortsætter med den næste guardrail i stedet for at lade
requesten fejle. Blokering er en eksplicit beslutning (`block: true`), aldrig et uheld.

## Indbyggede Guardrails

Registret indlæser automatisk seks guardrails i prioriteret rækkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Trin(e)        | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetstal kører **først**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Opsnapper billedbærende anmodninger rettet mod **ikke-vision modeller** og enten
omdirigerer hele anmodningen til en vision-kompatibel model eller erstatter billed-
delene med tekstbeskrivelser produceret af en konfigurerbar vision-model før
opstrømskaldet. Dette lader tekst-eneste udbydere gennemsigtigt håndtere
multimodale payloads.

Flow:

1. Spring over, hvis målmodellen allerede understøtter vision (medmindre den vises i
   den tvungne-bro-liste `isVisionBridgeForcedModel`).
2. Uddrag billeddele via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **forenede medie-
   detektor** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den
   eneste sandhedskilde, der deles med kombinationskompatibilitetsfilteret.
   Ekstraktion er tilladt for top-niveau dele af formerne
   `replaceImageParts` kan splejse tilbage (ekstrakt↔erstat kontrakt): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, og Responses API `input_image`. Indlejrede hits og
   indikator-eneste former er kombinationsfiltermateriale og ekstraheres aldrig.
   Spring over, hvis ingen fundet.
3. Løs runtime-konfiguration via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye `modalityBridge*`
   indstillingsnøgler vinder; ældre `visionBridge*` nøgler forbliver en **enkelt-cyklus
   fallback** (tilbagerulningsvindue). Spring over før enhver mediegennemgang, når
   broen er deaktiveret.
4. Tilstandsselector (`modalityBridgeVisionMode`, se tabel nedenfor) beslutter
   omdirigering vs. beskrivelse. Omdirigering returnerer `modifiedPayload` med kun `model`
   byttet, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsessti: begræns billeder til `maxImages`, sammensæt den opgavebevidste prompt,
   konsulter beskrivelsescachen, kald vision-modellen **parallelt**
   (`Promise.allSettled`), og injicer `[Image N]: <description>` tekstdele i
   deres sted. En mislykket beskrivelse giver `null`, og den originale billeddel er
   **bevaret** (#4012) — undtagen på kombinationsbeskrivelsesstien, når hver
   beskrivelse mislykkedes, hvor en bekræftet ikke-vision opstrøms får en
   `(utilgængelig — ingen vision-kompatibel udbyder tilsluttet)` stub i stedet (#8430).
6. Returner `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilstandsselector (`modalityBridgeVisionMode`)

| Tilstand   | Standard | Adfærd                                                                                                                                                                                                                                                                                                  |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Ældre heuristik, uberørt (#6640/#7204): ikke-kombinations-/`auto/` modeller omdirigerer til den bedste vision-model, medmindre den originale model allerede har brugbare legitimationsoplysninger (så beskriv); kombinationsmål beskriver altid.                                                        |
| `describe` |          | Beskriv altid — omdirigeringsblokken springes helt over; brugerens valgte model svarer altid.                                                                                                                                                                                                           |
| `reroute`  |          | Tving omdirigering: den legitimationsoplysninger-bevarende model-guard omgås. Omdirigerings-**mål** legitimationsoplysninger-guarden gælder stadig — når der ikke findes et brugbart vision-mål, falder anmodningen igennem til beskrivelse, så rå billeder aldrig når en tekst-eneste backend (#8430). |

Tvungne tilstande kortslutter **før** auto-heuristikken kører; `auto`-adfærden
er byte-identisk med pre-PR-1 guardrailen.

#### Opgavebevidst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) tilføjer
teksten fra den **sidste brugermeddelelse** (afkortet til 500 tegn) til den grundlæggende
beskrivelsesprompt, der styrer beskrivelsen mod det, brugeren faktisk spurgte om
(codex-vision-proxy-mønster) og beder vision-modellen om at transskribere synlig
tekst. Med flaget slået fra — eller ingen brugertekst — bruges den grundlæggende prompt uændret.

Den beskrivende self-loop's egen OpenAI-kompatible anmodning (`callVisionModelSingle()` i `visionBridgeHelpers.ts`) anmoder altid om `image_url.detail: "high"` — ubetinget, for hver kalder/udbyder, ikke styret af noget klientsignal. Sampling med lav detaljegrad forringer OCR-nøjagtigheden for netop den teksttransskriptionsopgave, denne prompt anmoder om, så selve beskrivelseskaldet anmoder altid om høj detaljegrad, uanset hvilket detaljeniveau den oprindelige indgående anmodning brugte. Dette påvirker kun den interne beskrivelsesanmodningskrop; det ændrer ikke, hvordan OmniRoute videresender kalderens egen `image_url.detail` på den primære anmodning — den standard anvendes separat, og kun for registrerede OpenCode-klienter, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic wire-format-grenen af beskrivelses-self-loopen har intet `detail`-felt og påvirkes ikke af nogen af standardindstillingerne.

#### Beskrivelsesoutputbegrænsning (`modalityBridgeVisionMaxChars`)

| Nøgle                          | Standard | Område              |
| :----------------------------- | :------- | :------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyder **ingen begrænsning** — beskrivelsen returneret af `callVisionModel()` videresendes uændret, hvilket bevarer den eksisterende adfærd. Enhver værdi i området 100–50000 afkorter beskrivelsen med et `…`-suffiks, før den indsættes som `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Hæv denne for detaljerede OCR-opgaver, hvor den nedstrømsmodel har brug for den fulde transskription; sænk den for at begrænse tokenforbruget på snakkesalige visionsmodeller. Dashboard-feltet findes på Vision-fanens Avancerede panel (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og klemmer enhver værdi mellem 1 og 99 op til 100-grænsen, mens en eksplicit `0` efterlades uberørt — `0` er en gyldig Zod-værdi i sig selv (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke blot den "ikke-indstillede" standard.

#### Beskrivelsescache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL-cache for beskrivelsesoutput, delt på tværs af processen.
Nøgle = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med længde-præfiks-indramning (ingen feltgrænsekollisioner). Modelkomponenten er den **konfigurerede** bro-model, ikke den model, der faktisk svarede — `callVisionModel` kan falde tilbage internt, og nøgleinddeling pr. forsøg ville fragmentere cachen. Mislykkede beskrivelser caches aldrig. Indstillinger:

| Nøgle                           | Standard | Område  |
| :------------------------------ | :------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Fjernbillednormalisering (self-loop beskrivelse/base64-hentning)

Når broen selv henter et **fjernbillede** — Anthropic-beskrivelses-self-kaldet og claude-wire-format base64-konverteringen (`ensureBase64ImagesForClaudeWire`), begge via `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — videresendes den resulterende data-URI gennem `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`), før den indlejres i vision-modelanmodningen. Overdimensionerede billeder nedskaleres til en **2048px lang kant** (svarende til den størrelsesbegrænsning OpenAI/Anthropic allerede anvender server-side), hvilket reducerer upload-bytes/latens uden at ændre, hvad visionsmodellen ser. Størrelsesændring bruger `sharp`, indlæst via dynamisk import: på en platform, hvor dens native binære fil ikke kan indlæses, **kaster `normalizeDataUri()` aldrig en fejl** — den falder tilbage til en videresendelse af de originale bytes, så beskrivelses-/base64-konverteringsstien altid fortsætter med at fungere. Ikke-billedbytes (en hentning, der ikke returnerede et afkodeligt billede) videresendes også uberørt. Denne normalisering er begrænset til billeder, broen henter til sit eget self-kald — den anvendes aldrig på kalderens rå passthrough-payload, i overensstemmelse med princippet om opt-in-only mutation (Hard Rule #20).

#### Indstillingsskema + migration

De nye `modalityBridge*`-nøgler er Zod-validerede i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-trioen og `modalityBridgeAudio*`-gruppen, der bruges af Audio Bridge. Migration `141_modality_bridge_settings.sql` kopierer eksisterende ældre `visionBridge*`-værdier til de matchende nye nøgler (idempotent, overskriver aldrig en operatør-indstillet `modalityBridge*`-værdi); de ældre nøgler accepteres fortsat som en læse-fallback i én udgivelsescyklus.

#### Gennemsigtighedsheader + statistik

Beskrivelses-transformerede svar bærer `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (bygget af `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stemplet af `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Omdirigerede anmodninger får **ingen** header — payload'en var uberørt, og modeludskiftningen er allerede synlig i svartekstens `model`-felt.

`GET /api/modality-bridge/stats` (management-godkendelse, samme niveau som `GET /api/settings`) returnerer de in-memory tællere pr. modalitet `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og `video`. `averageLatencyMs` bruger `latencySamples`, ikke alle forsøg, som sin nævner; en operation uden timing fabrikerer ikke en nul-millisekunds prøve. `bridged` forbliver det bagudkompatible alias for vellykkede konverteringer; mislykkede forsøg øger den ikke. Tællere nulstilles ved procesgenstart som designet (telemetri, ikke regnskab).

#### Dashboard-konfiguration

Den dedikerede dashboard-side er
`/dashboard/settings/modality-bridge`. Dens URL-adresserbare faner `Vision`, `Audio`
og `Video` bevarer forespørgselsparametre, mens de skifter `tab`-værdien.
Vision-fanen viser aktivering, tilstand, modelvalg (inklusive den automatiske
standard), opgavebevidst prompting, avancerede timeout-/billede-/beskrivelseslængde-/cache-
grænser, runtime-tællere og en beskyttet eksempelanmodning. Audio-fanen er også live: den viser
aktivering, en STT-kun modelvælger med Auto, timeout-/max-clip-grænser, lydtællere
og en `input_audio` eksempeltester. Video-fanen er funktionel: den rapporterer
FFmpeg/ffprobe runtime-tilstanden — en af fire eksplicitte UI-tilstande (`unknown` mens
proben er i gang eller ikke kunne fuldføres, `restricted` på en ikke-loopback
dashboard-host, hvor proben springes over på klientsiden, `unavailable` når den er probet
og bekræftet manglende, eller `available` med FFmpeg/ffprobe-versionerne) — bevarer
aktiverings-/model-/frame-/video-/timeout-grænser, filtrerer modelvælgeren til vision-kompatible
modeller og viser videotællere.

Det tidligere Vision Bridge-kort under AI-indstillinger er et kompatibilitetslink til den
nye side; det ejer ikke længere en anden kopi af formularen. Medieudbydere linker også
Image-to-Text- og Speech-to-Text-arbejdsgange til de tilsvarende Modality
Bridge-faner uden at fjerne den eksisterende Speech-to-Text playground.

**Self-loop adgangsbypass:** når describe-kaldet rutes gennem OmniRoutes
egen `/v1` self-loop (ikke-standard udbydermodellen), sender underanmodningen
`x-omniroute-admission-bypass: internal` og godkendes med den løste
self-loop-legitimationsoplysning — den lokale `sk_omniroute` sentinel i lokal tilstand, eller den
operatørkonfigurerede `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` miljønøgle (#1350), så
`REQUIRE_API_KEY=true` implementeringer stadig kan køre describe-kaldet. Bypasset
respekteres kun for disse præcise legitimationsoplysninger, så eksterne klienter kan ikke
bruge headeren til at omgå adgang.

Ældre standardindstillinger findes i `src/shared/constants/visionBridgeDefaults.ts`; de
nye tilstands-/opgavebevidste/cache-standardindstillinger og indstillingsopløseren findes i
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrailen eksponerer en
`deps` konstruktørmulighed, så tests kan injicere falske `getSettings`- og
`callVisionModel`-implementeringer.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Opsnapper lydbærende chatanmodninger, før de når et mål, der ikke er
kendt for at acceptere lydinput. Den omdirigerer aldrig chatanmodningen: lyddelene
transskriberes via det eksisterende OpenAI-kompatible multipart-endepunkt, og den
valgte chatmodel fortsætter med teksttransskriptioner.

Flow:

1.  Løs `supportsAudio` via `getResolvedModelCapabilities()`. Eksplicit
    provider-registry metadata vinder, derefter statisk model metadata, derefter synkroniseret
    `modalities_input`. En erklæret inputliste uden `audio` er `false`; ingen
    kapacitetsbeviser forbliver `null`. Både `false` og `null` aktiverer den
    konservative bridge, mens `true` omgår den.
2.  Løs `modalityBridgeAudio*`-indstillinger og udtræk spliceable top-niveau
    lyddelene fra hver besked via den delte `detectMediaParts()`-detektor.
    Understøttede wire shapes er OpenAI `input_audio`, `audio_url` og
    `source.media_type: "audio/*"`. Indlejret lyd detekteres til routing, men ikke
    fjernes af splice-stien. Arbejdet er begrænset af `modalityBridgeAudioMaxClips`;
    senere dele forbliver uberørte.
3.  Respekter en konfigureret `provider/model`, eller lad `selectAudioBridgeModel()` gennemgå
    `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrækkefølge og vælge den første
    model med en brugbar aktiv provider-legitimationsoplysning.
4.  `callAudioTranscription()` konverterer base64/data-URI-lyd til en multipart
    `file`, eller downloader en fjern `audio_url` via den offentlige outbound
    guard med DNS-pinning og en 25 MB grænse. Den POSTer derefter filen og den
    valgte model til den lokale `/v1/audio/transcriptions` self-loop, godkendt med
    `resolveSelfLoopBearer()`. Den eksisterende transskriptionsrute udfører normal
    legitimationsopslags, cooldown-/rate-limit-håndtering og provider-dispatch.
5.  Succesfulde kald erstatter deres dele med `[Audio N]: <transcript>`. Kald
    kører med `Promise.allSettled`: en individuel fejl bevarer den originale
    lyddel (#4012 kontrakt). Hvis hvert kald fejler, og målet er bevist
    `supportsAudio === false`, bliver delene
    `[Audio N]: (unavailable — no STT provider connected)` (#8430 kontrakt). For
    et ukendt mål (`null`) forbliver et resultat med alle fejl uberørt. Et bevist
    tekst-kun mål uden brugbar STT-legitimationsoplysning modtager den samme eksplicitte
    stub uden at foretage et netværkskald.

Succesfulde transskriptioner bruger den procesdækkende Modality Bridge LRU/TTL-cache.
Nøglen kombinerer lydreferencen, den stabile `audio-transcription` operationsetiket
og den valgte STT-model; fejl caches aldrig. Lydforsøg opdaterer de delte
`bridged`, `cacheHits`, `failures` og `lastUsedAt` tællere.
Transformerede svar bærer
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte
anmodninger modtager ikke et Audio Bridge-segment.

Runtime-indstillinger er DB-understøttede og Zod-validerede:

| Nøgle                         | Standard | Område            |
| :---------------------------- | :------- | :---------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delte cache forbliver kontrolleret af `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Opsnapper video-dele på topniveau i Chat Completions `messages` og Responses API `input`, før et mål uden kendt indbygget videounderstøttelse kaldes.
Understøttede former er `input_video`, `video_url`, `video_source`, HTTPS-URL'er,
og `data:video/*;base64,...` data-URI'er. Almindelige filnavne i tekst behandles
ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ejer anmodningsgennemgang,
kapacitets-/politik-tjekket, aggregering pr. anmodning og svar-payload'en.
Arbejde pr. video – erhvervelse, hele-resultat-cachen, beskrivelse af en billedsekvens
(som fletter enhver opkalds-erklæret lydtransskription), og metrics/abort/oprydning pr. forsøg –
er skjult bag `processVideoPart` i `videoBridgePipeline.ts`, kaldt én gang pr. videodel
inde i `preCall`'s loop.
Dette modul definerer også de eksplicitte portgrænser `VideoMediaBrokerPort`
(anskaffelse af bytes og udtrækning af samplede billeder), `VideoAudioTranscriptionPort`
(fletning af en opkalds-erklæret lydtransskription med de samplede billedtekster) og
`VideoDrilldownPort` (grænsen for billed-drilldown-persistens; endnu ikke forbundet
til `processVideoPart` – kun den separate `/api/modality-bridge/video/drilldown`-rute
skriver drilldown-poster i dag).

Den offentlige `/v1`-anmodningssti importerer eller påkalder aldrig en underproces.
Fjernvideoer downloades under en grænse på 50 MiB; inline base64-videoer har en
konservativ grænse på 36 MiB afkodet pr. video, så model/beskeder/indramnings-kuverten
kan forblive inden for den offentlige JSON-anmodningsadgangsgrænse på 50 MiB.
Inline længde- og afkodet-størrelsesestimater kontrolleres før allokering. HTTPS er
påkrævet på den oprindelige fjern-URL og hver omdirigering, ved brug af den eksisterende
kun-offentlige udgående guard med DNS-pinning. Bytesene krydser derefter den nøjagtige interne
`POST /api/modality-bridge/video/extract`-brokergrænse. Denne rute er både
`LOCAL_ONLY` og `SPAWN_CAPABLE`, accepterer kun en pr. proces autentificeret,
betroet-loopback-anmodning og accepterer aldrig en URL, filsystemsti, eksekverbar
eller argumentliste. API'ens body-size pipeline og handlerens inkrementelle body-læser
håndhæver uafhængigt en 50 MiB broker-inputgrænse. Dens begrænsede kø kører
én udtrækning ad gangen, tillader fire ventende job og begrænser ventende input til
100 MiB.

Inde i brokeren læser `ffprobe` en privat lokal fil; den faste format-tilladelsesliste
udelukker afspilningsliste- og manifestformater. For tilladte MOV-familie-containere
forbliver eksterne MOV-datareferencer deaktiveret som standard, og den
faste kommando vælger ikke at bruge dem. Både `ffprobe` og `ffmpeg` bruger
`file`-only protokol-hvidlisten, én tråd, faste argument-arrays, ingen shell,
og eksekverbare filer løst fra `PATH`. Vedhæftede billed-cover-streams er ikke
afspilbare kandidater. Alle afspilbare streams skal opfylde grænserne, og en
eksplicit standardstream foretrækkes før den deterministiske laveste-indeks-fallback.
Videoer er begrænset til 600 sekunder, 8.192 pixels pr. dimension og
33.554.432 kilde-pixels. FFmpeg sampler 1-16 midtpunkt JPEG-billeder, skalerer ned
den lange kant til højst 1.024 pixels uden at opskalere mindre input, og
modtager aldrig en URL. Sampling er `uniform` som standard. De valgfrie
`scene_aware` og eksperimentelle `segment_aware` politikker udfører et yderligere
fast FFmpeg-pas over den allerede validerede lokale stream, vælger afgrænsede
`showinfo`-scene-tidsstempler og falder deterministisk tilbage til de samme
uniforme midtpunkter ved detektorfejl, timeout, fejlformateret output eller et
tomt kandidatsæt. Segment-aware-tilstand allokerer midtpunktsprøver proportionalt
med de validerede sceneintervaller; segment-aware-evidens og fallback-adfærd er
beskrevet nedenfor. Den hårde 16-billeders grænse anvendes efter valg i enhver politik.
Når en scene-aware-anmodning kun har et et-billedes budget, bruger den det uniforme
midtpunkt af det aktive fuld-video- eller fokusvindue og rapporterer `policyEffective: uniform`:
et enkelt valgt scenebillede kan ikke bevare begge tidsmæssige ender. En opkalder kan
eventuelt angive et endeligt fokusvindue (`start`/`end` sekunder); grænserne klemmes
til mediets varighed, omvendte eller ikke-endelige vinduer afvises, og alle samplingpolitikker
udføres kun inden for det normaliserede interval. Det resulterende vindue er inkluderet
i samplingmetadata og i det ikke-betroede beskrivelsespræfiks, så downstream-modeller
kan skelne et fokuseret uddrag fra den fulde tidslinje.

Semantisk billedtekstfokus er en separat, eksplicit indstilling. Standard `full`-analysetilstanden
bevarer den eksisterende billedprompt og videresender aldrig anmodningstekst til billedtekstmodellen.
I `focused`-tilstand læser broen kun den seneste ikke-tomme bruger-forfattede `text`/`input_text`
fra den samme Chat- eller Responses-container, normaliserer den til NFC, kollapser
kontroltegn og mellemrum og begrænser den til 500 Unicode-kodepunkter. Et tomt resultat
falder tilbage til den nøjagtige `full`-prompt. Et brugbart hint serialiseres som JSON
i en dedikeret ikke-betroet-brugerkontekstblok og må kun prioritere observerbare detaljer;
det kan ikke tilsidesætte den separate advarsel mod at følge instruktioner, der er synlige
eller hørbare i mediet. Tekstuelt fokus udleder aldrig `start`/`end` eller ændrer den tidsmæssige sampler.

#### FU-07 strukturel segmentevidens

`segment_aware` bruger et afgrænset foranalysepas over den allerede validerede
lokale videostream. Den faste filterkæde skalerer først til højst 320 pixels bred,
registrerer sceneskift og frosne intervaller, og sampler derefter med 1 billede pr. sekund
for sløring, gennemsnitlig luma og rumlig/tidsmæssig information. Passet er
begrænset til 600 strukturelle prøver, én FFmpeg/filtertråd, de samme
`file`-only protokol- og container-tilladelseslister, en 1 MiB proces-outputgrænse
og højst 30 sekunder inden for brokerens delte abort/deadline. Det accepterer aldrig
en kommando, et filter, en sti eller en URL fra anmodningen.

De strukturelle værdier er deterministisk sampling-evidens, ikke semantisk videoforståelse. De udleder ikke subjekter, handlinger, billedtekster, tale eller brugerintention. Scene- og frysegrænser danner segmenter; frysedækning, sløring, eksponering, rumlig detalje og tidsmæssig ændring påvirker kun, hvordan det eksisterende budget på 1-16 billeder allokeres. Et fuldt frosset segment er begrænset til ét billede, mens ikke-frosne segmenter konkurrerer om det resterende budget. Når grænserne overstiger antallet af billeder, bevares en ensartet tidslinjedækning, så hurtige tidlige klip ikke kan skjule et langt efterfølgende segment. Scene-grænser inden for frysegrænsens 1-sekunds analyseopløsning samles.

Manglende filtre, fejlformuleret/tom evidens, en detektorfejl eller den afgrænsede foranalyse-timeout fejler åbent til den nøjagtige ensartede midtpunkts-politik. En kalder-afbrydelse eller mægler-deadline fejler ikke åbent: den afslutter den igangværende underproces, forhindrer senere billedudtrækning, og det private midlertidige træ fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, ægte FFmpeg-fixtures til besparelser på billedtekstkald efter deduplikering, budgetallokering for tæt bevægelse, slørings-/eksponerings-/SI-TI-evidens, hurtige klip med en lang hale og falske positiver ved gradvis fading. Den registrerer 'wall time' før analyse og, hvor `/usr/bin/time` er tilgængelig, underproces-CPU og peak RSS. Dens kvalitetskontroller er kun strukturelle orakler. Den reelle billedtekstmodelkvalitet forbliver `HOLD`, fordi denne testramme ikke har et autoriseret endepunkt eller en fastlåst bedømmer. Monetære besparelser forbliver også `HOLD`, medmindre `--caption-cost-per-call-usd` leverer et eksplicit positivt estimat pr. kald; scriptet fabrikerer aldrig nogen af resultaterne.

Hver ramme er begrænset til 4 MiB, alle rå rammer tilsammen til 23 MiB, og den serialiserede mæglerrespons til 32 MiB. En privat midlertidig mappe fjernes i `finally`. OmniRoute bundter ikke FFmpeg og accepterer ikke en brugerdefineret eksekverbar sti. Før billedtekstning anvender broen en konservativ visuel deduplikeringspass: hver JPEG reduceres til en 16×16 gråtonebuffer og sammenlignes kun med den sidst bevarede ramme. For et anmodet billedtekstbudget over én ramme leverer udtrækningen en afgrænset kandidatpulje på op til det dobbelte af budgettet og aldrig mere end 16 rammer. Den anmodede grænse anvendes først efter deduplikering, hvor de første og sidste udvalgte kandidater bevares under den endelige udtynding, når budgettet er mindst to. Den versionerede `grayscale-16x16-mean-cells-v2` politik bruger den største af den gennemsnitlige luma-delta og forholdet mellem miniatureceller, hvis normaliserede delta er mindst 0,05. Duplikatgrænsen er den konstante 0,04, valgt for forudsigelighed snarere end eksponeret som en runtime-indstilling. Dette sekundære høj-kontrast signal bevarer små bevægelser og synlige tekstændringer, som en kun-gennemsnitlig sammenligning kan skjule. Komparator- eller dekoderfejl fejler åbent og bevarer dækningen. Output-metadata adskiller udtrukne kandidater, succesfuldt anvendte rammer og visuelt droppede dubletter.

En eksplicit markeret videodel kan anmode om et tidsstemplet kontaktark. Broen bygger højst et 4-kolonners, 16-rammers JPEG-gitter. Hver 512-pixel celle brænder sit kildetidsstempel ind i et høj-kontrast bundbånd, mens de samme tidsstempler forbliver i tekstuel metadata til downstream-association og revision. Den komplette JPEG forbliver begrænset til 32 MiB. Hvis `sharp` ikke kan afkode eller sammensætte gitteret, falder broen tilbage til de individuelle JPEG-rammer; en klientafbrydelse forplanter sig stadig gennem arkoperationen.

Promoverings-evidens er bevidst adskilt fra den syntetiske kompositions-mikrobenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` definerer en skema-versioneret A/B-testramme for ægte OpenAI-kompatible visionsmodeller. Den måler udbyder-rapporterede tokens, end-to-end 'wall latency' (inklusive arkkomposition), antal modelkald og manifest-defineret faktaretention. Rå modelresponser skrives ikke til rapporten; kun SHA-256 digests og matchede fakta-ID'er bevares. Testrammen foretager ingen netværks- eller betalte modelkald, medmindre `--execute-real` er sendt, og `--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigureret. Uden den eksplicitte reelle kørsel forbliver dens maskinlæsbare dom `HOLD`; syntetiske payload-/kaldtællingsmålinger alene er ikke promoverings-evidens.

Kaldere kan vedhæfte en valgfri `transcript.cues`-array til en understøttet videodel, når de allerede besidder justeret tekst. Hver cue skal indeholde `text`, et endeligt `start`/`end`-interval inden for den undersøgte varighed og en godkendt `source` (`client`, `embedded` eller `audio-bridge`); `confidence` er som standard `1` og skal forblive mellem `0` og `1`. Nøjagtige duplikat-cues kollapses. OmniRoute starter aldrig transskription fra disse metadata: validerede cues kopieres ind i det beskrevne resultat med kilde, konfidens og interval, og gengives som upålidelige observationer sammen med rammebilledteksterne. Ugyldig, uden for rækkevidde eller proveniens-fri tekst afvises snarere end at blive blandet ind i billedtekststrømmen. Feltet `source` er i øjeblikket kalder-deklareret, ikke server-verificeret: OmniRoute håndhæver, at værdien er en af de tre tilladte strenge, men bekræfter endnu ikke kryptografisk, at en `embedded` eller `audio-bridge` etiket faktisk kom fra en server-ejet udtrækning. Behandl `source` som et upålideligt hint, indtil denne verifikation er på plads; byg ikke autorisationsbeslutninger på det.

En avanceret kalder kan levere et allerede-autoriseret `audioTranscript`-spor
for den samme video. Fusionssømmen kører visuelle og lydmæssige observationer under
én deadline og abortsignal, ordner dem på en fælles tidslinje, kollapser
nøjagtige dubletter og rapporterer et delresultat, når kun den ene side lykkes.
En ugyldig `audioTranscript` degraderer til det delresultat – den visuelle
beskrivelse bevares, og lydgrenen registrerer en renset fejlkode –
i stedet for at lade hele videoen fejle. Tilgængelighed pr. gren, det delvise flag
og de rensede fejlkoder bevares i det beskrevne resultat, i
guardrail-metadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i result-cache-metadata og i bridge-
fusions-tællerne. Standard Video Bridge-stien påkalder ikke tale-til-tekst
eller downloader en anden mediekopi; uden det eksplicitte spor forbliver den
kun video.

**Bevaring af transskription (#12150 P1).** Dette gælder automatisk, når
Video Bridge (som selv er opt-in) gengiver en transskriptions-cue – der er intet separat
bevaringsflag. Når en anmodning gengiver en transskriptions-cue (en kalder-deklareret
`transcript` eller en fuseret `audioTranscript`), markerer guardrail den
`videoBridgeObserved` og producerer en redigeret skygge af videobeskrivelsen –
en identisk gengivelse, hvor hver cues fritekstkrop erstattes af
`[redacted-video-transcript]`, bygget ved at erstatte det strukturerede cue-felt,
før strengen samles (aldrig ved at parse den flade tekst, så intet cue-indhold –
adversarialt eller almindeligt, inklusive kroppe, der indeholder `]` som
`[inaudible]`/`[music]` – kan overleve). Den vedvarende call-log-anmodningskrop udskifter
hver video-afledte tekstdel med den redigerede skygge, matchet af indholds-
lighed; `fullText`-ankeret genlæses fra den færdige pre-call guardrail-
payload, så matchet stadig lykkes efter senere kæde-guardrails (PII- og
legitimationsoplysninger-maskerne, prioriteter 10/95) omskriver beskrivelsesteksten på plads, og
efter system-prompt/handoff/hukommelses-injektion omformer meddelelsesarrayet.
Kroppen, der sendes opstrøms til modellen, er uændret. En observeret anmodning udfylder heller
ikke holdbar hukommelse (både anmodnings- og svar-afledt ekstraktion springes over),
så modellens eget svar kan ikke gentage transskriptionstekst i hukommelsen.

Yderligere bevarede kopier bruger det samme observerede-anmodningssignal. Det rå
pre-guardrail klient-anmodningssnapshot, in-memory afventende anmodning og tidligt
afviste-anmodningslog erstatter strukturelt transskriptionsfelter i videodele;
strengprompter syntetiseret af pipeline-stadier og kontekst-overlevering redigeres
ved den vedvarende-anmodningskrops-sink. Den vedvarende `video_content_removed`-markør
får `previous_response_id`-fortsættelsen til at fejle lukket i stedet for at rekonstruere
tekst, der bevidst blev kasseret. Hvis en observeret anmodning mister sin
delvise redigeringsskygge før logning, eller endda en af flere videoskygger
ikke matcher efter senere anmodningsmutationer, udelades den bevarede anmodningskrop
helt i stedet for at bevare en delvist redigeret transskription.

For en observeret anmodning kan et modelsvar citere enhver del af
transskriptionen uden en struktureret cue-grænse. Dens vedvarende call-log
`responseBody` erstattes derfor af en udeladelsesmarkør; den detaljerede
pipeline-artefakt (som kan inkludere opstrøms/klientkroppe og stream-chunks)
bevares ikke. Semantiske, idempotens- og ræsonnements-replay-caches omgår
læsninger og skrivninger for den anmodning. Udbyderanmodningen og klient-synlige
svar forbliver uændrede. Tidlige keepalive-bytes drænes fra den midlertidige
buffer, når den detaljerede artefakt udelades. Kiros fejlformede EventStream-
advarsel rapporterer kun payload-byte-antallet, aldrig dets indhold eller JSON-
parserens rå fejl.
Dette hævder ikke, at hver urelateret udbyder/plugin-diagnostik er blevet
revideret; den bredere bevarede-sink-gennemgang spores i #11658.

Den interne `/api/modality-bridge/video/drilldown`-livscyklus er et separat,
loopback/token-autentificeret cache-substrat. Hver operation kræver også et
kanonisk uigennemsigtigt hoved-ID. Før en produktionskalder aktiveres, skal den
udlede det ID fra den autentificerede lejer og må aldrig videresende en
klientvalgt værdi. Cache-nøgler binder det hoved til kanoniske session- og
video-reference-ID'er, gemmer kun deres SHA-256-afledte nøgler og omfatter både læsninger
og sletning til det samme hoved. Cachen gemmer højst 16 afledte JPEG-
rammer pr. post, udløber dem efter ti minutter og understøtter begrænsede
`start`/`end`-læsninger eller eksplicit sessionssletning.

Hvert hoved er begrænset til 16 poster og 64 MiB kanoniske JPEG-data. Disse
grænser er uafhængige af det globale loft på 64 poster/256 MiB: hovedkvotetryk
fortrænger kun det pågældende hoveds mindst nyligt anvendte poster, før global
LRU-fortrængning overvejes. Udløbne poster fjernes fra både hoved- og
global regnskabsføring ved cache-aktivitet, mens annullering og valideringsfejl
ikke forpligter en delvis udskiftning.

Cachen afviser ikke-kanonisk Base64, overskydende polstring, ikke-JPEG-medier, fejlformede eller
afkortede JPEG'er og JPEG'er, der producerer en advarsel under en begrænset fuld-billed `sharp`-
afkodning. Den genkoder hvert accepteret billede som en kanonisk JPEG, udleder bredde og højde
fra de afkodede bytes i stedet for at stole på kalderfelter og kasserer eventuelle efterfølgende
polyglot-bytes i stedet for at bevare dem. Kun den begrænsede kanoniske komprimerede buffer
opkræves begge kvoter. JSON-wiregrænsen inkluderer Base64-overhead for det 32 MiB
afkodede-input-loft. Hver
gemt afledning registrerer sit validerede JPEG-format/opløsning, samplingpolitik,
afledningsversion, oprettelsestid, serverberegnet indholds-hash og hashed forældrereference
plus den betroede kalderes forældre-indholds-hash. Annullering kontrolleres
mellem asynkrone afkodnings-/hash-faser før den atomare cache-commit.

Denne tranche forbinder endnu ikke en produktionsproducent til ruten og tilbyder ikke valg af varianter med flere opløsninger. Den transparente Video Bridge-anmodningssti medfører derfor intet ekstra arbejde, mens lejerbundet principal-afledning og den fulde FU-08 multi-opløsningslivscyklus forbliver eksplicit opfølgningsarbejde snarere end dokumenteret som komplet adfærd.

Billeder tekstes sekventielt med den konfigurerede Video-model. En tom Video-tilsidesættelse arver Vision-indstillingen; hvis begge er tomme, vælger Vision-auto-routeren den effektive syns-kompatible model. Vellykkede tekster erstatter den originale del med et stabilt `[Video description:` præfiks, der også markerer teksten som en upålidelig medieafledt observation og fortæller downstream-modeller ikke at følge instruktioner fundet i mediet. Cache-nøgler for billedtekster inkluderer JPEG-bytes, prompt, tidsstempel og effektiv model; kun vellykkede tekster caches. Cache-poster bevarer den faktiske vellykkede producentmodel, inklusive en fallback-model; broen rapporterer `mixed`, når forskellige billeder blev produceret af forskellige modeller. Et cache-hit genbruger den producentidentitet i stedet for at ommærke den som den anmodede routingplan. Hele-video-resultatcachen er nøglet på hver input, der ændrer outputtet — prompt, effektiv model, samplingpolitik, billedtælling, semantisk analysemodus, SHA-256 fingeraftrykket af det normaliserede fokus-hint, fokusvindue, `transcript`, `audioTranscript` og kontaktark-flaget — så ændring af nogen af disse dimensioner er et cache-miss, aldrig en forældet genbrug. Den visuelle dedup-politikversion, tærskel og begrænsede antal kandidatbilleder er også eksplicitte i resultat-cache-nøglen og metadata; en politikændring kan derfor ikke genbruge en forældet hele-video-beskrivelse. Resultat-cache v4 metadata bevarer tilstanden og fingeraftrykket, aldrig den rå brugeropgave. Guardrail-metadata rapporterer både de anmodede og effektive analysemodi; en anmodet `focused` modus uden brugbar brugertekst rapporteres som effektivt `full`.

Guardrailen udtrækker hver understøttet videodel, men beskriver ikke mere end `modalityBridgeVideoMaxVideos`. For et mål, der er bevist at have `supportsVideo === false`, bliver mislykkede og over-grænsen-videoer eksplicitte sikre tekstmarkører, så ingen rå video overlever. Når kapaciteten er ukendt, forbliver disse dele uberørte. Mål med `supportsVideo === true` omgår broen. Klientanmodningens afbrydelsessignal forplanter sig gennem download, brokerkø, underprocesser og billedtekstkald; afbrydelser stopper mellem videoer og fejler aldrig åbent til rå medier.

Runtime-indstillinger er DB-baserede og Zod-validerede:

| Nøgle                               | Standard    | Område / adfærd                                                                                        |
| :---------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri runtime, tilvalg                                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske billedtekster; `focused` bruger afgrænset, upålidelig seneste-brugerkontekst  |
| `modalityBridgeVideoModel`          | `""`        | Arver Vision Bridge-modellen                                                                           |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proportional `segment_aware`; detektorfejl falder tilbage til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Ældre vedvarende Video-timeoutværdier over 120 sekunder begrænses til broker-deadline; nye indstillingsskrivninger over denne grænse afvises. `GET /api/modality-bridge/video/runtime` kræver betroet stemplet loopback-lokalitet før autentificering eller runtime-sondering, og kræver derefter management-autentificering. Den returnerer kun `available`, sanerede FFmpeg/ffprobe-versioner og en fast årsag, når runtime er utilgængelig. Det interne udtrækspunkt er ikke en offentlig upload-API: kømætning returnerer `503` plus `Retry-After`, en opkaldsafbrydelse returnerer `499`, og den faste broker-deadline returnerer `504`. Konverterede svar tilføjer `video->text;model=<visionModel>;parts=<videos>` til den centrale `x-omniroute-modality-bridge` header uden at fjerne Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kører på **begge** stadier.

- **`preCall`** kloner payloadet, gennemgår `system`, `messages`, `input` og `prompt` (inklusive almindelige streng-elementer), og anvender `processPII()` (fra `@/shared/utils/inputSanitizer`) på strengfelter `content`/`text`. Når `PII_REDACTION_ENABLED=true`, redigeres detekteret PII i det udgående payload. Dette er uafhængigt af `INPUT_SANITIZER_MODE` (som kun styrer prompt-injektionspolitikken). Når redigering er slået fra, registrerer kaldet detektionstællinger uden at omskrive indhold.
- **`postCall`** dybde-kloner svaret, kører `sanitizePIIResponse()` plus Responses-API-form-maskeren (`maskResponsesOutput` — dækker `output_text` og `output[].content[].text`). Hvis der sker nogen redigering, erstatter det modificerede svar det originale.

Guardrailen blokerer aldrig; den annoterer kun (`meta.detections`, `meta.redacted`) eller omskriver.

### Prompt-injektion (`promptInjection.ts`)

Registrerer fjendtlige strukturer i brugerleveret indhold og håndhæver den konfigurerede politik. Adfærden styres af miljøvariabler og konstruktørmuligheder:

| Indstilling       | Miljøvariabel                                                                                         | Standard | Effekt                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiveret         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | Når `false`, kortslutter guardrail.                                                                                                                                                                  |
| Tilstand          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Injektionspolitik: `block`, `warn` eller `log`. (`redact` accepteres for bagudkompatibilitet, men fjerner **ikke** injektionstekst; anmodning om PII-omskrivning styres af `PII_REDACTION_ENABLED`.) |
| Blokeringstærskel | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minimum alvorlighedsgrad krævet for at blokere. Medium er kun observerende som standard.                                                                                                             |

**Tilstandsprioritet** (`getMode`): kalder `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag tilsidesættelse** (Dashboard →
Indstillinger → Feature Flags) → `INJECTION_GUARD_MODE` env →
`INPUT_SANITIZER_MODE` env → `warn`. En dashboard-tilsidesættelse vinder derfor
over miljøvariablerne, så Feature Flags UI'en styrer den kørende guard live (ingen
genstart). DB-læsningen er fejlsikker: hvis den fejler, falder guarden tilbage
til den miljøbaserede adfærd, og når ingen tilsidesættelse er indstillet, er
adfærden identisk med miljø-kun-opløsning.

Detektionskilder:

1.  `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (fælles detektorsæt
    brugt andre steder i pipelinen).
2.  Indbygget `DEFAULT_GUARD_PATTERNS` (i øjeblikket `system_override_inline` og
    `markdown_system_block`, begge med `high` alvorlighedsgrad).
3.  Valgfrie `customPatterns` sendt via konstruktøropioner (strenge, regex
    eller `{ name, pattern, severity }` poster).

Når `mode === "block"` **og** mindst én detektion opfylder
alvorlighedstærsklen, returnerer `preCall` `{ block: true, message: "Request
rejected: suspicious content detected" }`. I `warn`/`log`-tilstande logger
guardrail'en, men tillader kaldet. Den delte hjælpefunktion
`evaluatePromptInjection()` eksporteres også til kaldere, der skal evaluere
prompter uden at gå gennem registret.

**Scanningsgrænse (v3.8.20):** detektoren inspicerer kun de **første 16 KB** af
samlet prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` før
mønsterløkken køres. Injektionsdirektiver sidder nær toppen af et input, så
dette begrænser regex CPU/GC på payloads på flere hundrede KB uden at svække
detektionen (jf. #3932, #4041).

### Legitimationsmaskering (`credentialMasker.ts`)

Kører på **begge** stadier, sidst i standardkæden (prioritet `95`). Redigerer
velkendte API-nøgle-/hemmelige token-mønstre fra den udgående payload
(meddelelsesindhold, værktøjskaldsargumenter, værktøjsresultater) **og**
udbyderens svar, så en legitimationsoplysning, der er indsat i en prompt (eller
gentaget af et værktøjsresultat), ikke lækkes til den opstrøms udbyder eller
tilbage til klienten.

- **Kun tilvalg**, samme konvention som PII-redigering (Hard Rule
  #20-tilgrænsende): deaktiveret medmindre
  `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er slået fra, er guardrail'en
  en no-op — den blokerer aldrig og omskriver aldrig.
- `redactCredentials()` gennemgår hele payload-/svartræet (`walkValue()`,
  prototype-pollution-sikker, cyklus-sikker via `WeakSet`) og erstatter match
  med en `[REDACTED:<type>]` pladsholder, idet kun de grene, der faktisk
  ændrede sig, klones.
- `CREDENTIAL_PATTERNS` dækker LLM-udbydernøgler (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tokens (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), betalingsnøgler (Stripe,
  Square), cloud-nøgler (AWS access key, Twilio, SendGrid, Mailgun), private
  nøgler / JWT'er, forbindelsesstrenge med legitimationsoplysninger
  (`mongodb://user:pass@...`, osv.), og et generisk
  `Authorization`/`x-api-key`/`api-key`/`apikey` header-værdi-mønster.
  Header-formede nøgler (`authorization`, `x-api-key`, `api-key`, `apikey`)
  redigeres strukturelt (kun værdi, skemaprefiks som `Bearer `/`Basic `
  bevares) snarere end via den generiske tekst-regex.
- Guardrail'en blokerer aldrig; den omskriver kun (`modifiedPayload` /
  `modifiedResponse`) og annoterer (`meta.credentialsRedacted`, `meta.count`).

Regressionsguard: `tests/unit/credential-masker-guardrail.test.ts`.

## Basiskontrakt (`base.ts`)

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
  block?: boolean; // true afbryder kæden
  message?: string; // vises ved blokering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneres af preCall for at omskrive anmodningen
  modifiedResponse?: TValue; // returneres af postCall for at omskrive svaret
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

En guardrail signalerer "ingen ændring" ved at returnere enten `void`, `{}` eller
`{ block: false }`. Returnering af en `modifiedPayload`/`modifiedResponse` erstatter
den værdi, der løber gennem kæden til efterfølgende guardrails.
`signal?: AbortSignal` viderefører kalderens livscyklus til guardrails. En afbrudt anmodning er den bevidste fail-open-undtagelse: mediebroer stopper arbejdet og rydder op uden at gendanne rå medier til et mål, som med sikkerhed ikke understøtter dem.

## Register (`registry.ts`)

Singletonen `guardrailRegistry` eksponerer:

- `register(guardrail)` — tilføjer en guardrail (eller erstatter efter normaliseret navn) og
  sorterer igen efter stigende `priority`.
- `clear()` / `list()` — administrative hjælpefunktioner.
- `runPreCallHooks(payload, context)` — gennemløber aktive guardrails, fører
  payloaden gennem `modifiedPayload` og stopper ved den første `block: true`.
- `runPostCallHooks(response, context)` — samme forløb på svarsiden.
- `resetGuardrailsForTests({ registerDefaults })` — rydder tilstanden og
  genregistrerer eventuelt standarderne for ren testisolering.

Begge kørselsfunktioner returnerer `{ blocked, payload|response, results, guardrail?, message? }`,
hvor `results` er et array af `GuardrailExecutionResult`-poster, som indeholder
felterne `blocked`, `skipped`, `modified`, `error` og `meta` for hver guardrail,
hvilket er nyttigt til sporing.

### Deaktivering af guardrails pr. anmodning

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en
duplikatfri liste over guardrail-navne, som skal springes over for den aktuelle
anmodning. Kilder (alle valgfrie, alle flettes):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` i anmodningens body (på øverste niveau)
- `metadata.disabledGuardrails` i anmodningens body
- Headeren `x-omniroute-disabled-guardrails` (eller den ældre
  `x-disabled-guardrails`)

Værdier kan være arrays af strenge eller en kommasepareret streng; navne
normaliseres til kebab-case med små bogstaver (`pii_masker` → `pii-masker`). Resultatet
videregives via `context.disabledGuardrails` til registret, som springer
matchende guardrails over (`skipped: true` i `results`).

## Udførelsesrækkefølge

For hver anmodning, der går gennem `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` opbygger listen over elementer, der skal springes over, ud fra API-nøglen, body
   og headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kører guardrails i stigende
   prioritetsrækkefølge:
   - Deaktiverede guardrails registreres som `skipped`.
   - Hver guardrails `preCall` kan omskrive payloaden via `modifiedPayload`.
   - Den første `block: true` afbryder kæden, og handleren returnerer
     et afvisningssvar fra den pågældende guardrail.
3. Den (potentielt omskrevne) payload sendes videre til kombinationsrouting og upstream-
   videresendelse.
4. Når svaret er samlet, kører `guardrailRegistry.runPostCallHooks(...)`
   den samme kæde på svaret. `block: true` her kasserer upstream-
   svaret.

Guardrails, der udløser fejl, registreres med `error: <message>` og logges via
`logger.warn`, men kæden fortsætter — den er bevidst designet til at være fail-open.

## Konfiguration

Miljøvariabler, der læses af de indbyggede guardrails:

| Variabel                              | Bruges af                 | Effekt                                                                                                           |
| ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Angiv `false` for at deaktivere detektering fuldstændigt.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Injektionspolitik: `warn`, `block` eller `log`. Den ældre værdi `redact` omskriver ikke injektionstekst.         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Tilstand for injektionsbeskyttelsen; også et DB-feature-flag, der **tilsidesætter** miljøvariablerne (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Den laveste alvorlighedsgrad, som `MODE=block` afviser: `high` (standard), `medium` eller `low`.                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Ældre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Når værdien er `true`, redigeres PII i anmodningen (uafhængigt af injektionstilstanden).                         |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Styrer maskeringsadfærden på svarsiden.                                                                          |

Modality Bridge-guardrails læser kørselskonfigurationen fra det DB-understøttede
indstillingslager (`getSettings()`), ikke fra miljøvariabler. Visions primære nøgler er
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og
`modalityBridgeCacheMaxEntries`. De ældre
`visionBridge*`-nøgler accepteres kun som det dokumenterede læsefallback i én cyklus;
dashboardet skriver med de primære nøgler. Standardværdier og fallback-
resolveren findes i `src/shared/constants/modalityBridgeDefaults.ts`, mens ældre
konstanter er bevaret i `src/shared/constants/visionBridgeDefaults.ts`.

Lyd bruger `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips` samt de delte
`modalityBridgeCache*`-indstillinger. Lyd har intet fallback til ældre nøgler, da disse
nøgler blev introduceret med Modality Bridge-skemaet.

Video bruger `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout` samt de delte `modalityBridgeCache*`-indstillinger.
Funktionen er som standard deaktiveret, fordi FFmpeg/ffprobe er valgfrie driftsmæssige
afhængigheder, og billedtekstning af frames øger latenstid og modelomkostninger.

## Tilpassede guardrails

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

Trin:

1. Opret `src/lib/guardrails/myGuardrail.ts`, som udvider `BaseGuardrail`.
2. Implementer `preCall` og/eller `postCall`.
3. Registrer enten ved importtidspunktet (tilføj fra `registerDefaultGuardrails`), eller
   kald `guardrailRegistry.register(...)` under kørsel — registreringsdatabasen erstatter
   enhver tidligere guardrail med det samme normaliserede navn.
4. Tilføj test under `tests/unit/` (eksisterende eksempler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Test

Brug `resetGuardrailsForTests()` mellem test for at starte fra en kendt tilstand.
Angiv `{ registerDefaults: false }` for at starte med en tom registreringsdatabase og
kun registrere de guardrails, der testes. Vision Bridge accepterer dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge eksponerer de
tilsvarende integrationspunkter for indstillinger, funktionalitet, valg af STT-model,
kontrol af legitimationsoplysninger og transskription. Test kan derfor afprøve begge
forløb uden adgang til database eller netværk.

## Se også

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — fælles detektor, som driver
  beskyttelse mod prompt-injektion og maskering af personhenførbare oplysninger
- `src/shared/constants/visionBridgeDefaults.ts` — standarder for Vision Bridge og
  modelliste for tvungen bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — fælles standarder for kørsel af Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lag (circuit breaker, nedkølingsperioder)
- `docs/reference/ENVIRONMENT.md` — komplet reference til miljøvariabler

## Rutedækning og red-team for injektionsbeskyttelsen (Fase 8 · Blok D)

Injektionsbeskyttelsen (`createInjectionGuard` / `withInjectionGuard`) dækker alle ruter,
der accepterer brugerprompter. Den respekterer `INJECTION_GUARD_MODE` (standardværdien `warn` = kun logning;
`block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardtilstand |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

Tekstudtrækning (`extractMessageContents`) dækker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hver nat, `nightly-llm-security.yml`):** promptfoo validerer, at hver rute blokerer
OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kører prober (springes over uden hemmelighed).
`moderations` er inkluderet for konsistens — operatører i blokeringstilstand kan undtage den via
`resolveDisabledGuardrails`.

Det natlige workflow (`.github/workflows/nightly-llm-security.yml`, cron + manuel
igangsættelse) har to jobs:

- **`promptfoo-guard` (blokerende)** — kører `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Hver adversarial test (f.eks. "ignore all
  previous instructions…", jailbreaks i DAN-stil) kontrollerer, at svaret indeholder
  `error.code === "SECURITY_001"`, dvs. at beskyttelsen faktisk afviste anmodningen.
- **`garak` (vejledende)** — kører garak `--probes promptinject,dan,leakreplay`
  mod en lokal OmniRoute-instans (`http://localhost:20128/v1`). Betinget af en
  udbyderhemmelighed (`PROMPTFOO_PROVIDER_KEY`); springes elegant over og har suffikset
  `|| true`, så jobbet rapporterer uden at få CI til at fejle.

Dækningen af hjælpefunktionen til beskyttelse (`createInjectionGuard` / `withInjectionGuard`)
omfatter alle promptbærende `/v1`-ruter; prompttekst hentes fra
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` af
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
