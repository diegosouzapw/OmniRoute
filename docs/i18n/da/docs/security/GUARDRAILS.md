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

## Indbyggede guardrails

Registreringsdatabasen indlæser automatisk seks guardrails i prioritetsrækkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Fase(r)        | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetstal køres **først**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbro PR-1

Opfanger requests med billeder, som er rettet mod **modeller uden vision**, og enten
omdirigerer hele requesten til en model med vision eller erstatter billeddelene
med tekstbeskrivelser, der produceres af en konfigurerbar visionmodel, før
upstream-kaldet. Dette gør det muligt for udbydere, der kun understøtter tekst, at håndtere
multimodale payloads transparent.

Forløb:

1. Spring over, hvis målmodellen allerede understøtter vision (medmindre den findes på
   listen over modeller, hvor broen er gennemtvunget, `isVisionBridgeForcedModel`).
2. Udtræk billeddele via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **fælles mediedetektor**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den
   eneste sandhedskilde, der deles med combo-kompatibilitetsfilteret.
   Udtrækning er begrænset til en tilladelsesliste over dele på øverste niveau med de former,
   som `replaceImageParts` kan indsætte igen (udtræk↔erstat-kontrakten): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic-URL
   `source.type:"url"` og Responses API `input_image`. Indlejrede fund og
   former, der kun fungerer som indikatorer, tilhører combo-filteret og udtrækkes aldrig.
   Spring over, hvis ingen findes.
3. Bestem runtime-konfigurationen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): Nye `modalityBridge*`-
   indstillingsnøgler har forrang; ældre `visionBridge*`-nøgler forbliver en
   **fallback i én cyklus** (tilbagerulningsvindue). Spring over før nogen
   mediegennemgang, når broen er deaktiveret.
4. Tilstandsvælgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) afgør,
   om der skal omdirigeres eller beskrives. Omdirigering returnerer `modifiedPayload`, hvor kun
   `model` er udskiftet, samt metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesforløb: Begræns antallet af billeder til `maxImages`, sammensæt den opgavebevidste prompt,
   slå op i beskrivelsescachen, kald visionmodellen **parallelt**
   (`Promise.allSettled`), og indsæt tekstdele af typen `[Image N]: <description>` i
   deres sted. En mislykket beskrivelse giver `null`, og den oprindelige billeddel
   **bevares** (#4012) — undtagen i combo-beskrivelsesforløbet, når alle
   beskrivelser mislykkedes, hvor en bekræftet upstream uden vision i stedet får en
   `(unavailable — no vision-capable provider connected)`-stub (#8430).
6. Returner `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Tilstandsvælger (`modalityBridgeVisionMode`)

| Tilstand   | Standard | Adfærd                                                                                                                                                                                                                                                                                                                                               |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Ældre heuristik, uændret (#6640/#7204): Modeller, der ikke er combo-/`auto/`-modeller, omdirigeres til den bedste visionmodel, medmindre den oprindelige model allerede har anvendelige legitimationsoplysninger (så beskrives der); combo-mål beskrives altid.                                                                                      |
| `describe` |          | Beskriv altid — omdirigeringsblokken springes helt over; den model, brugeren har valgt, leverer altid svaret.                                                                                                                                                                                                                                        |
| `reroute`  |          | Gennemtving omdirigering: Beskyttelsen, der bevarer modellen med legitimationsoplysninger, omgås. Beskyttelsen af legitimationsoplysninger for omdirigerings-**målet** gælder stadig — når der ikke findes et anvendeligt visionmål, fortsætter requesten til beskrivelse, så rå billeder aldrig når en backend, der kun understøtter tekst (#8430). |

Gennemtvungne tilstande afbryder **før**, auto-heuristikken kører; `auto`-adfærden
er byte-identisk med guardrailen før PR-1.

#### Opgavebevidst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standardværdien er **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) føjer
teksten fra den **sidste brugermeddelelse** (afkortet til 500 tegn) til den grundlæggende
beskrivelsesprompt, så beskrivelsen målrettes det, brugeren faktisk spurgte om
(codex-vision-proxy-mønsteret), og beder visionmodellen om at transskribere synlig
tekst. Når flaget er slået fra — eller der ikke er nogen brugertekst — bruges den grundlæggende prompt uændret.

Describe-self-loopets egen OpenAI-kompatible anmodning (`callVisionModelSingle()`
i `visionBridgeHelpers.ts`) anmoder altid om `image_url.detail: "high"` —
ubetinget, for hver kalder/udbyder og ikke afhængigt af noget klientsignal.
Sampling med lav detaljegrad forringer OCR-nøjagtigheden for netop den
teksttransskriptionsopgave, som denne prompt anmoder om, så selve
describe-kaldet anmoder altid om høj detaljegrad, uanset hvilket detaljeniveau
den oprindelige indgående anmodning brugte. Dette påvirker kun den interne
describe-anmodnings body; det ændrer ikke, hvordan OmniRoute videresender
kalderens egen `image_url.detail` i den primære anmodning — denne standardværdi
anvendes separat og kun for registrerede OpenCode-klienter i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Anthropic wire-format-grenen af describe-self-loopet har intet `detail`-felt
og påvirkes ikke af nogen af standardværdierne.

#### Grænse for describe-output (`modalityBridgeVisionMaxChars`)

| Nøgle                          | Standardværdi | Interval            |
| ------------------------------ | ------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` eller 100–50000 |

`0` (standardværdien) betyder **ingen grænse** — beskrivelsen, som returneres
af `callVisionModel()`, videregives uændret, så den eksisterende adfærd
bevares. Enhver værdi i intervallet 100–50000 afkorter beskrivelsen med
suffikset `…`, før den indsættes igen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Forøg denne værdi for detaljetunge OCR-opgaver, hvor downstream-modellen har
brug for den fulde transskription; sænk den for at begrænse tokenforbruget
fra snakkesalige vision-modeller. Dashboardfeltet findes i panelet Avanceret
på fanen Vision (`modality-bridge-max-chars` i
`ModalityBridgeVisionTab.tsx`) og hæver enhver værdi mellem 1 og 99 til
minimumsværdien 100, mens et eksplicit `0` efterlades uændret — `0` er i sig
selv en gyldig Zod-værdi
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) og ikke blot
standardværdien for "ikke angivet".

#### Describe-cache (`modalityBridge/bridgeCache.ts`)

LRU- og TTL-cache i hukommelsen til describe-output, delt på tværs af hele
processen. Nøgle = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
med længdepræfiksrammer (ingen kollisioner mellem feltgrænser). Modelkomponenten
er den **konfigurerede** bridge-model, ikke den model, der faktisk svarede —
`callVisionModel` kan internt falde tilbage til en anden model, og
nøgleopdeling pr. forsøg ville fragmentere cachen. Mislykkede
describe-operationer caches aldrig. Indstillinger:

| Nøgle                           | Standardværdi | Interval |
| ------------------------------- | ------------- | -------- |
| `modalityBridgeCacheEnabled`    | `true`        | —        |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440   |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000  |

#### Normalisering af eksterne billeder (self-loop-describe/base64-hentning)

Når bridgen selv henter et **eksternt** billede — Anthropics describe-self-call
og base64-konverteringen til claude-wire-format
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den
resulterende data-URI gennem `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`), før den indlejres i anmodningen til
vision-modellen. For store billeder nedskaleres til en **lang side på 2048px**
(svarende til den størrelsesgrænse, som OpenAI/Anthropic allerede anvender på
serversiden), hvilket reducerer uploadstørrelse og latenstid uden at ændre,
hvad vision-modellen ser. Ændring af størrelse bruger `sharp`, indlæst via
dynamisk import: På en platform, hvor dens native binære fil ikke kan
indlæses, kaster `normalizeDataUri()` **aldrig en fejl** — den falder tilbage
til at videregive de oprindelige bytes uændret, så describe-/base64-
konverteringsstien altid fortsætter med at fungere. Bytes, der ikke
repræsenterer et billede (en hentning, som ikke returnerede et billede, der
kunne afkodes), videregives også uændret. Denne normalisering er begrænset til
billeder, som bridgen henter til sit eget self-call — den anvendes aldrig på
kalderens rå passthrough-payload, i overensstemmelse med princippet om kun at
ændre ved eksplicit tilvalg (fast regel nr. 20).

#### Indstillingsskema + migrering

De nye `modalityBridge*`-nøgler Zod-valideres i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trioen `modalityBridgeCache*` og gruppen
`modalityBridgeAudio*`, som bruges af Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierer eksisterende ældre
`visionBridge*`-værdier til de tilsvarende nye nøgler (idempotent og
overskriver aldrig en `modalityBridge*`-værdi, som en operatør har angivet);
de ældre nøgler accepteres fortsat som fallback ved læsning i én
udgivelsescyklus.

#### Transparensheader + statistik

Describe-transformerede svar indeholder
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(oprettet af `buildModalityBridgeHeader()` i
`modalityBridge/bridgeStats.ts` og tilføjet af
`withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerede anmodninger får **ingen** header — payloaden var uændret, og
modelskiftet er allerede synligt i svarbodyens `model`-felt.

`GET /api/modality-bridge/stats` (administrationsgodkendelse, samme niveau som
`GET /api/settings`) returnerer tællerne pr. modalitet i hukommelsen
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruger `latencySamples` som nævner, ikke alle
forsøg; en operation uden tidsmåling opretter ikke en kunstig måling på nul
millisekunder. `bridged` forbliver det bagudkompatible alias for vellykkede
konverteringer; mislykkede forsøg øger det ikke.
Tællerne nulstilles som tilsigtet, når processen genstartes
(telemetri, ikke bogføring).

#### Dashboardkonfiguration

Den dedikerede dashboardside er
`/dashboard/settings/modality-bridge`. Dens URL-adresserbare faner `Vision`, `Audio`
og `Video` bevarer forespørgselsparametre, når der skiftes mellem `tab`-værdier.
Fanen Vision indeholder aktivering, tilstand, modelvalg (herunder den automatiske
standard), opgavebevidste prompts, avancerede grænser for timeout/billede/beskrivelseslængde/cache,
kørselstællere og en sikret eksempelanmodning. Fanen Audio er også aktiv: Den indeholder
aktivering, en modelvælger kun til STT med Auto, grænser for timeout/maksimal kliplængde,
lydtællere og en `input_audio`-eksempeltest. Fanen Video er funktionel: Den rapporterer
kørselstilstanden for FFmpeg/ffprobe — én af fire eksplicitte UI-tilstande (`unknown`, mens
proben kører eller ikke kunne fuldføres, `restricted` på en dashboardvært, der ikke er
loopback, hvor proben springes over på klientsiden, `unavailable`, når der er probet,
og det er bekræftet, at de mangler, eller `available` med FFmpeg/ffprobe-versionerne) — gemmer
grænser for aktivering/model/billedrater/video/timeout, filtrerer modelvælgeren til modeller
med understøttelse af vision og viser videotællere.

Det tidligere Vision Bridge-kort under AI-indstillinger er et kompatibilitetslink til den
nye side; det indeholder ikke længere en ekstra kopi af formularen. Media Providers
linker også arbejdsgange for Image-to-Text og Speech-to-Text til de tilsvarende Modality
Bridge-faner uden at fjerne den eksisterende Speech-to-Text-legeplads.

**Omgåelse af adgangskontrol for self-loop:** Når describe-kaldet dirigeres gennem OmniRoutes
eget `/v1`-self-loop (ikke-standardiseret udbydermodel), sender underanmodningen
`x-omniroute-admission-bypass: internal` og godkendes med den fastlagte
self-loop-legitimationsoplysning — den lokale `sk_omniroute`-sentinel i lokal tilstand eller
den operatørkonfigurerede miljønøgle `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), så
installationer med `REQUIRE_API_KEY=true` stadig kan køre describe-kaldet. Omgåelsen
accepteres kun for netop disse legitimationsoplysninger, så eksterne klienter ikke kan bruge
headeren til at springe adgangskontrollen over.

Ældre standardværdier findes i `src/shared/constants/visionBridgeDefaults.ts`; de
nye standardværdier for tilstand/opgavebevidsthed/cache og indstillingsresolveren findes i
`src/shared/constants/modalityBridgeDefaults.ts`. Sikringsmekanismen tilbyder en
`deps`-konstruktørindstilling, så tests kan injicere falske implementeringer af `getSettings`
og `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Opfanger chatanmodninger med lyd, før de når et mål, som ikke vides at acceptere
lydinput. Den omdirigerer aldrig chatanmodningen: Lyddele transskriberes via det
eksisterende OpenAI-kompatible multipart-slutpunkt, og den valgte chatmodel fortsætter
med teksttransskriptioner.

Forløb:

1. Fastlæg `supportsAudio` via `getResolvedModelCapabilities()`. Eksplicitte
   metadata fra udbyderregistret har forrang, derefter statiske modelmetadata og til sidst
   synkroniserede `modalities_input`. En deklareret inputliste uden `audio` er `false`;
   uden evidens for egenskaben forbliver værdien `null`. Både `false` og `null` aktiverer
   den konservative bridge, mens `true` omgår den.
2. Fastlæg `modalityBridgeAudio*`-indstillingerne, og udtræk lyddele på øverste niveau,
   der kan splejses, fra hver besked via den delte `detectMediaParts()`-detektor.
   Understøttede wire-formater er OpenAI `input_audio`, `audio_url` og
   `source.media_type: "audio/*"`. Indlejret lyd registreres til routing, men fjernes ikke
   af splejsningsstien. Arbejdet begrænses af `modalityBridgeAudioMaxClips`;
   senere dele forbliver uberørte.
3. Respekter en konfigureret `provider/model`, eller lad `selectAudioBridgeModel()` gennemgå
   `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrækkefølge og vælge den første
   model med en anvendelig aktiv udbyderlegitimationsoplysning.
4. `callAudioTranscription()` konverterer base64-/data-URI-lyd til en multipart-
   `file` eller downloader en ekstern `audio_url` gennem den offentlighedsbegrænsede
   udgående sikringsmekanisme med DNS-fastlåsning og en grænse på 25 MB. Den POSTer derefter
   filen og den valgte model til det lokale `/v1/audio/transcriptions`-self-loop, godkendt med
   `resolveSelfLoopBearer()`. Den eksisterende transskriptionsrute udfører normal
   opslag af legitimationsoplysninger, håndtering af nedkøling/hastighedsbegrænsning og
   videresendelse til udbyderen.
5. Vellykkede kald erstatter deres dele med `[Audio N]: <transcript>`. Kaldene
   køres med `Promise.allSettled`: En individuel fejl bevarer den oprindelige
   lyddel (#4012-kontrakten). Hvis alle kald mislykkes, og målet beviseligt har
   `supportsAudio === false`, bliver delene til
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakten). For
   et ukendt mål (`null`) forbliver resultatet uberørt, hvis alle kald mislykkes. Et
   beviseligt tekstbaseret mål uden en anvendelig STT-legitimationsoplysning modtager den
   samme eksplicitte pladsholder uden at udføre et netværkskald.

Vellykkede transskriptioner bruger Modality Bridges procesomfattende LRU/TTL-cache. Nøglen
kombinerer lydreferencen, den stabile `audio-transcription`-operationsetiket og den valgte
STT-model; fejl caches aldrig. Lydforsøg opdaterer de delte tællere `bridged`,
`cacheHits`, `failures` og `lastUsedAt`. Transformerede svar indeholder
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte
anmodninger modtager ikke et Audio Bridge-segment.

Kørselsindstillingerne er databaseunderstøttede og Zod-validerede:

| Nøgle                         | Standard | Interval          |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delte cache styres fortsat af `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Opfanger videodele på øverste niveau i Chat Completions-`messages` og Responses
API-`input`, før et mål uden kendt indbygget videounderstøttelse kaldes.
Understøttede formater er `input_video`, `video_url`, `video_source`, HTTPS-URL'er
og `data:video/*;base64,...`-data-URI'er. Almindelige filnavne i tekst behandles
ikke som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) håndterer gennemgang af anmodningen,
kontrol af funktionalitet/politik, aggregering pr. anmodning og svarpayloaden.
Arbejdet pr. video — indhentning, cachelagring af hele resultatet, beskrivelse af en
billedsekvens (som integrerer en eventuel lydtransskription angivet af kalderen) samt
målinger/afbrydelse/oprydning pr. forsøg — er skjult bag `processVideoPart` i
`videoBridgePipeline.ts`, som kaldes én gang pr. videodel i `preCall`'s løkke.
Dette modul definerer også de eksplicitte portgrænser `VideoMediaBrokerPort`
(indhentning af bytes og udtrækning af samplede billeder), `VideoAudioTranscriptionPort`
(integrering af en lydtransskription angivet af kalderen med billedteksterne fra de
samplede billeder) og `VideoDrilldownPort` (persistensgrænsen for billednedbrydning;
endnu ikke forbundet med `processVideoPart` — i dag er det kun den separate
`/api/modality-bridge/video/drilldown`-rute, der skriver nedbrydningsposter).

Den offentlige `/v1`-anmodningssti importerer eller starter aldrig en underproces.
Fjernvideoer downloades med en grænse på 50 MiB; indlejrede base64-videoer har en
konservativ grænse på 36 MiB dekodet pr. video, så model-/besked-/indramningskonvolutten
kan forblive inden for den offentlige adgangsgrænse på 50 MiB for JSON-anmodninger.
Indlejret længde og estimater af dekodet størrelse kontrolleres før allokering. HTTPS
kræves for den oprindelige fjern-URL og alle omdirigeringer ved hjælp af den eksisterende
udgående beskyttelse, der kun tillader offentlige adresser, med DNS-fastlåsning. De
resulterende bytes passerer derefter den præcise interne brokergrænse
`POST /api/modality-bridge/video/extract`. Denne rute er både `LOCAL_ONLY` og
`SPAWN_CAPABLE`, accepterer kun en godkendt, betroet loopback-anmodning pr. proces
og accepterer aldrig en URL, filsystemsti, eksekverbar fil eller argumentliste.
API'ens pipeline for grænser på brødtekststørrelse og handlerens inkrementelle
brødtekstlæser håndhæver uafhængigt en inputgrænse på 50 MiB for brokeren. Dens
begrænsede kø kører én udtrækning ad gangen, tillader fire ventende job og begrænser
ventende input til 100 MiB.

Inde i brokeren læser `ffprobe` en privat lokal fil; den faste tilladelsesliste over
formater udelukker afspilningsliste- og manifestformater. For tilladte containere i
MOV-familien forbliver eksterne MOV-datareferencer deaktiveret som standard, og den
faste kommando aktiverer dem ikke. Både `ffprobe` og `ffmpeg` bruger en
protokoltilladelsesliste med kun `file`, én tråd, faste argumentarrays, ingen shell
og eksekverbare filer fundet via `PATH`. Vedhæftede coverbilledstreams er ikke
kandidater til afspilning. Alle afspillelige streams skal overholde grænserne, og
en eksplicit standardstream foretrækkes før det deterministiske alternativ med
laveste indeks. Videoer er begrænset til 600 sekunder, 8.192 pixels pr. dimension
og 33.554.432 kildepixels. FFmpeg sampler 1–16 JPEG-billeder ved midtpunkter, skalerer
den lange kant ned til højst 1.024 pixels uden at opskalere mindre input og modtager
aldrig en URL. Sampling er som standard `uniform`. De valgfrie politikker
`scene_aware` og eksperimentelle `segment_aware` udfører én yderligere fast
FFmpeg-gennemgang af den allerede validerede lokale stream, vælger et begrænset antal
`showinfo`-scenetidsstempler og falder deterministisk tilbage til de samme ensartede
midtpunkter ved detektorfejl, timeout, forkert udformet output eller et tomt
kandidatsæt. Segmentbevidst tilstand fordeler midtpunktssamples proportionalt på de
validerede sceneintervaller; segmentbevidst evidens og fallbackadfærd beskrives
nedenfor. Den hårde grænse på 16 billeder anvendes efter udvælgelsen i hver politik.
Når en scenebevidst anmodning kun har et budget på ét billede, bruger den det
ensartede midtpunkt i det aktive fuldvideo- eller fokusvindue og rapporterer
`policyEffective: uniform`: Ét enkelt valgt scenebillede kan ikke bevare begge
tidsmæssige ender. En kalder kan valgfrit angive et endeligt fokusvindue
(`start`/`end` i sekunder); grænserne begrænses til mediets varighed, omvendte eller
ikke-endelige vinduer afvises, og alle samplingpolitikker udføres kun inden for det
normaliserede interval. Det resulterende vindue inkluderes i samplingmetadataene og
i det ikke-betroede beskrivelsespræfiks, så efterfølgende modeller kan skelne et
fokuseret uddrag fra hele tidslinjen.

Semantisk billedtekstfokus er en separat, eksplicit indstilling. Standardtilstanden
`full` for analyse bevarer den eksisterende billedprompt og videresender aldrig
anmodningstekst til billedtekstmodellen. I tilstanden `focused` læser broen kun den
seneste ikke-tomme brugerforfattede `text`/`input_text` fra den samme Chat- eller
Responses-container, normaliserer den til NFC, samler kontroltegn og mellemrum og
begrænser den til 500 Unicode-kodepunkter. Et tomt resultat falder tilbage til den
præcise `full`-prompt. Et anvendeligt hint serialiseres som JSON i en dedikeret blok
med ikke-betroet brugerkontekst og må kun prioritere observerbare detaljer; det kan
ikke tilsidesætte den separate advarsel mod at følge instruktioner, der er synlige
eller hørbare i mediet. Tekstligt fokus udleder aldrig `start`/`end` og ændrer ikke
den tidsmæssige sampler.

#### FU-07 strukturel segmentevidens

`segment_aware` bruger én begrænset foranalyse-gennemgang af den allerede validerede
lokale videostream. Den faste filterkæde skalerer først til højst 320 pixels i bredden,
registrerer sceneskift og frosne intervaller og sampler derefter med 1 billede pr.
sekund for sløring, gennemsnitlig luminans og rumlig/tidsmæssig information.
Gennemgangen er begrænset til 600 strukturelle samples, én FFmpeg-/filtertråd, de samme
tilladelseslister for protokollen `file` og containere, en grænse på 1 MiB for
procesoutput og højst 30 sekunder inden for brokerens delte afbrydelse/deadline. Den
accepterer aldrig en kommando, et filter, en sti eller en URL fra anmodningen.

De strukturelle værdier er deterministisk sampling-evidens, ikke semantisk
videoforståelse. De udleder ikke motiver, handlinger, undertekster, tale eller
brugerens hensigt. Scene- og frysningsgrænser danner segmenter; frysningsdækning,
sløring, eksponering, rumlige detaljer og tidsmæssige ændringer påvirker kun,
hvordan det eksisterende budget på 1–16 billeder fordeles. Et fuldstændigt
fastfrosset segment begrænses til ét billede, mens ikke-fastfrosne segmenter
konkurrerer om det resterende budget. Når der er flere grænser end billeder,
bevares en ensartet dækning af tidslinjen, så hurtige klip tidligt i videoen
ikke kan skjule et langt afsluttende segment. Scenegrænser inden for
analyseopløsningen på 1 sekund fra en frysningsgrænse slås sammen.

Manglende filtre, ugyldig/tom evidens, en detektorfejl eller timeout for den
afgrænsede foranalyse medfører fallback til den nøjagtige politik med ensartede
midtpunkter. En afbrydelse fra kalderen eller en broker-deadline medfører ikke
fallback: Den afslutter den igangværende underproces, forhindrer efterfølgende
billedudtrækning, og det private midlertidige træ fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, reelle
FFmpeg-fixtures til besparelser på billedtekstkald efter deduplikering,
budgetfordeling ved tæt bevægelse, evidens for sløring/eksponering/SI-TI,
hurtige klip med en lang afslutning og falske positiver ved gradvis udtoning.
Scriptet registrerer foranalysens vægtidsforbrug og, hvor `/usr/bin/time` er
tilgængelig, den underordnede proces' CPU-forbrug og maksimale RSS. Dets
kvalitetskontroller er udelukkende strukturelle orakler. Kvaliteten af den
reelle billedtekstmodel forbliver `HOLD`, fordi denne testsele ikke har noget
autoriseret endpoint eller nogen fastfrosset bedømmer. Monetære besparelser
forbliver også `HOLD`, medmindre `--caption-cost-per-call-usd` angiver et
eksplicit positivt estimat pr. kald; scriptet fabrikerer aldrig nogen af
resultaterne.

Hvert billede er begrænset til 4 MiB, alle rå billeder tilsammen til 23 MiB og
det serialiserede broker-svar til 32 MiB. En privat midlertidig mappe fjernes i
`finally`. OmniRoute inkluderer ikke FFmpeg og accepterer ikke en brugerdefineret
sti til den eksekverbare fil. Før generering af billedtekster anvender broen en
konservativ visuel deduplikeringsgennemgang: Hver JPEG reduceres til en
16×16-gråtonebuffer og sammenlignes kun med det senest bevarede billede. For et
ønsket billedtekstbudget på mere end ét billede leverer udtrækningen en
afgrænset pulje af kandidater på op til det dobbelte af budgettet og aldrig mere
end 16 billeder. Den ønskede grænse anvendes først efter deduplikering, og den
første og sidste valgte kandidat bevares under den endelige udtynding, når
budgettet er mindst to. Den versionsstyrede
`grayscale-16x16-mean-cells-v2`-politik bruger den største værdi af den
gennemsnitlige luminansforskel og andelen af miniaturebilledceller, hvis
normaliserede forskel er mindst 0,05. Duplikattærsklen er konstanten 0,04, der
er valgt af hensyn til forudsigelighed frem for at være eksponeret som en
kørselsindstilling. Dette sekundære signal med høj kontrast bevarer små
bevægelser og ændringer i synlig tekst, som en sammenligning udelukkende baseret
på gennemsnittet kan skjule. Fejl i sammenligningsfunktionen eller dekoderen
medfører fallback og bevarer dækningen. Outputmetadata skelner mellem udtrukne
kandidater, billeder der er anvendt korrekt, og fjernede visuelle duplikater.

En eksplicit markeret videodel kan anmode om et kontaktark med tidsstempler.
Broen opbygger højst et JPEG-gitter med 4 kolonner og 16 billeder. Hver celle på
512 pixel indbrænder kildens tidsstempel i et bundbånd med høj kontrast, mens de
samme tidsstempler bevares i tekstmetadata til efterfølgende tilknytning og
revision. Den komplette JPEG er fortsat begrænset til 32 MiB. Hvis `sharp` ikke
kan afkode eller sammensætte gitteret, falder broen tilbage til de individuelle
JPEG-billeder; en klientafbrydelse videreføres stadig gennem kontaktarkhandlingen.

Evidens til promovering holdes bevidst adskilt fra den syntetiske
mikrobenchmark for sammensætning. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definerer en skemaversioneret A/B-testsele til reelle OpenAI-kompatible
visionsmodeller. Den måler udbyderrapporterede tokens, samlet væglatenstid
(inklusive sammensætning af kontaktarket), antal modelkald og bevarelse af
manifestdefinerede fakta. Rå modelsvar skrives ikke til rapporten; kun
SHA-256-digests og ID'er for matchede fakta bevares. Testseltet foretager ingen
netværkskald eller betalte modelkald, medmindre `--execute-real` angives, og
`--model`, `OMNIROUTE_BASE_URL` og `OMNIROUTE_API_KEY` er konfigureret. Uden
denne eksplicitte reelle kørsel forbliver dets maskinlæsbare resultat `HOLD`;
syntetiske målinger af payload og antal kald udgør ikke i sig selv evidens til
promovering.

Kaldere kan knytte et valgfrit `transcript.cues`-array til en understøttet
videodel, når de allerede har justeret tekst. Hver cue skal indeholde `text`,
et endeligt `start`/`end`-interval inden for den sonderede varighed og en
hvidlistet `source` (`client`, `embedded` eller `audio-bridge`); `confidence`
har som standard værdien `1` og skal forblive mellem `0` og `1`. Helt identiske
cues slås sammen. OmniRoute starter aldrig transskription ud fra disse metadata:
Validerede cues kopieres til det beskrevne resultat med kilde, konfidens og
interval og gengives som observationer, der ikke er tillid til, sammen med
billedteksterne. Ugyldig tekst, tekst uden for intervallet eller tekst uden
proveniens afvises frem for at blive blandet ind i billedtekststrømmen.
Feltet `source` er i øjeblikket deklareret af kalderen og ikke verificeret af
serveren: OmniRoute håndhæver, at værdien er en af de tre tilladte strenge, men
bekræfter endnu ikke kryptografisk, at en `embedded`- eller
`audio-bridge`-etiket faktisk stammer fra en udtrækning, der ejes af serveren.
Betragt `source` som et tip, der ikke er tillid til, indtil denne verifikation
er implementeret; basér ikke godkendelsesbeslutninger på det.

En avanceret kalder kan levere et allerede autoriseret `audioTranscript`-spor
til den samme video. Fusionslaget kører visuelle observationer og lydobservationer under
én deadline og ét afbrydelsessignal, ordner dem på en fælles tidslinje, slår
eksakte dubletter sammen og rapporterer et delvist resultat, når kun én side lykkes.
Et ugyldigt `audioTranscript` nedgraderes til dette delvise resultat — den visuelle
beskrivelse bevares, og lydgrenen registrerer en renset fejlkode —
i stedet for at hele videoen fejler. Tilgængeligheden pr. gren, flaget for delvist resultat
og de rensede fejlkoder bevares i det beskrevne resultat, i
guardrail-metadataene (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i resultatcachens metadata og i broens
fusionstællere. Standardstien i Video Bridge kalder ikke tale-til-tekst
eller downloader en ekstra kopi af mediet; uden dette eksplicitte spor forbliver den
udelukkende videobaseret.

**Opbevaring af transskription (#12150 P1).** Dette gælder automatisk, når
Video Bridge (som i sig selv er tilvalgsbaseret) gengiver et transskriptionssegment — der findes ikke et separat
opbevaringsflag. Når en anmodning gengiver et transskriptionssegment (et `transcript`, som
kalderen har angivet, eller et fusioneret `audioTranscript`), markerer guardrailen det som
`videoBridgeObserved` og genererer en redigeret skyggeversion af videobeskrivelsen —
en identisk gengivelse, hvor brødteksten i hvert segment erstattes med
`[redacted-video-transcript]`, opbygget ved at erstatte det strukturerede segmentfelt,
før strengen sammensættes (aldrig ved at fortolke den flade tekst, så intet
segmentindhold — fjendtligt eller almindeligt, herunder brødtekster med `]` såsom
`[inaudible]`/`[music]` — kan overleve). Anmodningsteksten i den persistente kaldslog erstatter
hver tekstkomponent, der er afledt af videoen, med denne redigerede skyggeversion matchet efter
indholdslighed; `fullText`-ankeret genindlæses fra det færdige pre-call-guardrail-
payload, så matchet stadig lykkes, efter at senere guardrails i kæden (maskerne for PII og
legitimationsoplysninger med prioriteterne 10/95) omskriver beskrivelsesteksten på stedet, og
efter at injektion af systemprompt, overdragelse og hukommelse omformer meddelelsesarrayet. Den
tekst, der sendes opstrøms til modellen, er uændret. En observeret anmodning udfylder
heller ingen varig Memory (både anmodnings- og svarafledt udtrækning springes over),
så modellens eget svar ikke kan gengive transskriptionstekst i Memory.

Der er stadig åbne opbevaringsflader, som spores i en opfølgning (**P2**, #12430): det rå
snapshot af klientanmodningen før guardrailen i artefaktet med den detaljerede log;
fail-closed for fortsættelse med `previous_response_id`; interne afsendelser med
afledte prompts, som indlejrer transskriptionen i en syntetiseret promptstreng
(pipelinefaser, kontekstoverdragelse); samt svarteksten/den semantiske caches kopi
af et modelsvar, der citerer transskriptionen. Disse er rådata-/svarklasseflader eller
tilvalgsbaserede flader uden for P1's omfang for persistent anmodningstekst + Memory.

Den interne livscyklus for `/api/modality-bridge/video/drilldown` er et separat,
loopback-/tokenautentificeret cachefundament. Hver handling kræver også et
kanonisk, uigennemsigtigt principal-id. Før en produktionskalder aktiveres, skal den
udlede dette id fra den autentificerede tenant og må aldrig videresende en
klientvalgt værdi. Cachenøgler binder denne principal til kanoniske sessions- og
videoreference-id'er, gemmer kun deres SHA-256-afledte nøgler og afgrænser både læsning
og sletning til den samme principal. Cachen gemmer højst 16 afledte JPEG-
billeder pr. post, lader dem udløbe efter ti minutter og understøtter afgrænsede
`start`/`end`-læsninger eller eksplicit sletning af sessionen.

Hver principal er begrænset til 16 poster og 64 MiB kanoniske JPEG-data. Disse
grænser er uafhængige af det globale loft på 64 poster/256 MiB: pres på en principals
kvote fjerner kun den pågældende principals poster efter princippet mindst nyligt anvendt,
før global LRU-fjernelse overvejes. Udløbne poster fjernes fra både principalens
og den globale opgørelse ved cacheaktivitet, mens annullering og valideringsfejl ikke
gemmer en delvis erstatning.

Cachen afviser ikke-kanonisk Base64, overflødig udfyldning, medier, der ikke er JPEG,
fejlformede eller trunkerede JPEG-filer samt JPEG-filer, der genererer en advarsel under en
afgrænset `sharp`-afkodning af hele billedet. Den genkoder hvert accepteret billede som en
kanonisk JPEG, udleder bredde og højde fra de afkodede bytes i stedet for at stole på
kalderens felter og kasserer eventuelle efterfølgende polyglot-bytes i stedet for at bevare dem.
Kun den afgrænsede kanoniske komprimerede buffer belastes begge kvoter. JSON-grænsen
på overførselslaget omfatter Base64-overhead for loftet på 32 MiB afkodet input. Hver
gemt afledning registrerer det validerede JPEG-format og den validerede opløsning, samplingpolitik,
afledningsversion, oprettelsestidspunkt, serverberegnet indholdshash og hashet overordnet
reference samt den betroede kalders hash af det overordnede indhold. Der kontrolleres for
annullering mellem asynkrone afkodnings-/hashfaser før den atomare cachelagring.

Denne tranche forbinder endnu ikke en produktionsproducer med ruten og tilbyder ikke
valg mellem varianter med flere opløsninger. Den transparente anmodningssti i Video Bridge
medfører derfor intet ekstra arbejde, mens tenant-bundet afledning af principalen og
den fulde FU-08-livscyklus med flere opløsninger fortsat er eksplicit opfølgningsarbejde
i stedet for at blive dokumenteret som fuldt implementeret adfærd.

Frames forsynes sekventielt med billedtekster ved hjælp af den konfigurerede Video-model. En tom
Video-tilsidesættelse nedarver Vision-indstillingen; hvis begge er tomme, vælger Visions
automatiske router den effektive model med understøttelse af billeder. Vellykkede billedtekster
erstatter den oprindelige del med et stabilt `[Video description:`-præfiks, som også
markerer teksten som en observation fra et medie, der ikke er tillid til, og instruerer efterfølgende
modeller i ikke at følge instruktioner, der findes i mediet. Cachenøgler for billedtekster til frames
omfatter JPEG-bytene, prompten, tidsstemplet og den effektive model; kun vellykkede
billedtekster caches. Cacheposter bevarer den faktiske producentmodel, der lykkedes,
herunder en fallback-model; broen rapporterer `mixed`, når forskellige frames
blev produceret af forskellige modeller. Et cachehit genbruger denne producentidentitet
i stedet for at ommærke den som den anmodede routingplan. Resultatcachen for hele videoen
har en nøgle baseret på alle input, der ændrer outputtet — prompt, effektiv
model, samplingpolitik, antal frames, semantisk analysetilstand, SHA-256-
fingeraftrykket af det normaliserede fokushint, fokusvindue, `transcript`,
`audioTranscript` og kontaktarkflaget — så ændring af en hvilken som helst af disse
dimensioner medfører et cachemiss og aldrig genbrug af et forældet resultat. Versionen,
tærsklen og det begrænsede antal kandidatframes for den visuelle deduplikeringspolitik
er også eksplicitte i resultatcachens nøgle og metadata; en politikændring kan derfor ikke
genbruge en forældet beskrivelse af hele videoen. Metadata i resultatcache v4 bevarer
tilstanden og fingeraftrykket, aldrig brugerens rå opgave. Guardrail-metadata rapporterer
både den anmodede og den effektive analysetilstand; en anmodet `focused`-tilstand uden
brugbar brugertekst rapporteres som reelt værende `full`.

Guardrailen udtrækker alle understøttede videodele, men beskriver ikke mere end
`modalityBridgeVideoMaxVideos`. For et mål, der beviseligt har
`supportsVideo === false`, bliver mislykkede videoer og videoer over grænsen til eksplicitte,
sikre tekstmarkører, så ingen rå video bevares. Når kapabiliteten er ukendt, forbliver
disse dele uberørte. Mål med `supportsVideo === true` omgår broen.
Klientanmodningens afbrydelsessignal videreføres gennem download, broker-kø,
underprocesser og kald til generering af billedtekster; afbrydelser stopper mellem videoer
og falder aldrig tilbage til at tillade rå medier.

Kørselsindstillinger gemmes i databasen og valideres med Zod:

| Nøgle                               | Standard    | Interval/adfærd                                                                                                  |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri ved kørsel, kræver aktivt tilvalg                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske billedtekster; `focused` bruger begrænset, ikke-betroet kontekst fra den seneste bruger |
| `modalityBridgeVideoModel`          | `""`        | Nedarver Vision Bridge-modellen                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                             |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proportional `segment_aware`; detektorfejl falder tilbage til `uniform`           |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                              |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                   |

Ældre, vedvarende gemte Video-timeoutværdier over 120 sekunder begrænses til
brokerens deadline; nye skrivninger af indstillinger over denne grænse afvises.
`GET /api/modality-bridge/video/runtime` kræver betroet, stemplet loopback-
lokalitet før godkendelse eller kontrol af kørselstilstanden og kræver derefter
administrationsgodkendelse. Den returnerer kun `available`, rensede FFmpeg/ffprobe-versioner
og en fast årsag, når kørselstilstanden ikke er tilgængelig. Det interne udtrækningsendepunkt er ikke
et offentligt upload-API: kømætning returnerer `503` plus `Retry-After`, en afbrydelse
fra kalderen returnerer `499`, og brokerens faste deadline returnerer `504`. Konverterede svar føjer
`video->text;model=<visionModel>;parts=<videos>` til den centrale
`x-omniroute-modality-bridge`-header uden at fjerne Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kører på **begge** stadier.

- **`preCall`** kloner payloaden, gennemgår `system`, `messages`, `input` og
  `prompt` (herunder elementer, der er simple strenge) og anvender `processPII()` (fra
  `@/shared/utils/inputSanitizer`) på `content`/`text`-felter med strenge. Når
  `PII_REDACTION_ENABLED=true`, redigeres registrerede PII-oplysninger bort i den udgående
  payload. Dette er uafhængigt af `INPUT_SANITIZER_MODE` (som kun styrer
  politikken for promptinjektion). Når bortredigering er deaktiveret, registrerer kaldet antallet
  af detektioner uden at omskrive indholdet.
- **`postCall`** dybdekloner svaret og kører `sanitizePIIResponse()` samt
  maskeringen til Responses API-formatet (`maskResponsesOutput` — dækker
  `output_text` og `output[].content[].text`). Hvis en bortredigering foretages, erstatter
  det ændrede svar originalen.

Guardrailen blokerer aldrig; den tilføjer kun annotationer (`meta.detections`,
`meta.redacted`) eller omskriver.

### Promptinjektion (`promptInjection.ts`)

Registrerer kontradiktoriske strukturer i brugerleveret indhold og håndhæver den
konfigurerede politik. Adfærden styres af miljøvariabler og constructor-
indstillinger:

| Indstilling       | Miljøvariabel                                                                                                | Standardværdi | Effekt                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aktiveret         | `INPUT_SANITIZER_ENABLED`                                                                                    | `true`        | Når den er `false`, kortslutter sikkerhedskontrollen.                                                                                                                                                              |
| Tilstand          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                              | `warn`        | Injektionspolitik: `block`, `warn` eller `log`. (`redact` accepteres af hensyn til bagudkompatibilitet, men fjerner **ikke** injektionstekst; omskrivning af PII i anmodninger styres af `PII_REDACTION_ENABLED`.) |
| Blokeringstærskel | Indstillingen `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Den laveste alvorlighedsgrad, der kræves for at blokere. Medium er som standard kun til observation.                                                                                                               |

**Tilstandsprioritet** (`getMode`): kalderens `options.mode` →
**tilsidesættelse via DB-funktionsflaget** `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → miljøvariablen `INJECTION_GUARD_MODE` → miljøvariablen `INPUT_SANITIZER_MODE` →
`warn`. En tilsidesættelse fra dashboardet har derfor forrang for miljøvariablerne, så brugergrænsefladen
Feature Flags styrer den kørende sikkerhedskontrol direkte (uden genstart). DB-læsningen er fejlsikker:
Hvis der opstår en fejl, falder sikkerhedskontrollen tilbage til den miljøvariabelbaserede adfærd, og når der ikke
er angivet nogen tilsidesættelse, er adfærden identisk med en løsning, der kun bruger miljøvariabler.

Detektionskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (fælles sæt af detektorer,
   som bruges andre steder i pipelinen).
2. Indbyggede `DEFAULT_GUARD_PATTERNS` (i øjeblikket `system_override_inline` og
   `markdown_system_block`, begge med alvorlighedsgraden `high`).
3. Valgfrie `customPatterns`, der overføres via konstruktørindstillinger (strenge, regulære udtryk
   eller poster af typen `{ name, pattern, severity }`).

Når `mode === "block"` **og** mindst én detektion opfylder tærsklen for
alvorlighedsgrad, returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I tilstandene `warn`/`log` logger sikkerhedskontrollen, men
tillader kaldet. Den fælles hjælpefunktion `evaluatePromptInjection()` eksporteres også
til kaldere, som har brug for at evaluere prompts uden at gå gennem registreringsdatabasen.

**Scanningsgrænse (v3.8.20):** Detektoren undersøger kun de **første 16 KB** af
den sammenkædede prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` udfører `slice(0, MAX_INJECTION_SCAN_BYTES)`, før
mønsterløkken køres. Injektionsdirektiver findes nær begyndelsen af et input, så dette
begrænser regex-CPU/GC for payloads på flere hundrede KB uden at svække detektionen (jf.
#3932, #4041).

### Maskering af legitimationsoplysninger (`credentialMasker.ts`)

Kører på **begge** stadier, sidst i standardkæden (prioritet `95`). Bortredigerer
velkendte mønstre for API-nøgler og hemmelige tokens fra den udgående payload (meddelelsesindhold,
argumenter til værktøjskald, værktøjsresultater) **og** udbyderens svar, så
legitimationsoplysninger, der er indsat i en prompt (eller returneret af et værktøjsresultat), ikke lækkes
til den eksterne udbyder eller tilbage til klienten.

- **Kun ved aktivt tilvalg**, samme konvention som bortredigering af PII (relateret til Hard Rule #20):
  deaktiveret, medmindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er slået fra, gør sikkerhedskontrollen intet —
  den blokerer aldrig og omskriver aldrig.
- `redactCredentials()` gennemgår hele payload-/svartræet (`walkValue()`,
  sikkert mod prototypeforurening og cyklussikkert via `WeakSet`) og erstatter match med
  en `[REDACTED:<type>]`-pladsholder, idet kun de grene, der faktisk
  er ændret, klones.
- `CREDENTIAL_PATTERNS` dækker nøgler til LLM-udbydere (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøgler (Stripe, Square), cloudnøgler
  (AWS-adgangsnøgle, Twilio, SendGrid, Mailgun), private nøgler/JWT'er,
  forbindelsesstrenge med legitimationsoplysninger (`mongodb://user:pass@...` osv.) samt
  et generisk mønster for header-værdierne `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Header-formede nøgler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) bortredigeres strukturelt (kun værdien, mens skemapræfikser som
  `Bearer `/`Basic ` bevares) i stedet for via det generiske tekst-regex.
- Sikkerhedskontrollen blokerer aldrig; den omskriver kun (`modifiedPayload` /
  `modifiedResponse`) og tilføjer annoteringer (`meta.credentialsRedacted`, `meta.count`).

Regressionskontrol: `tests/unit/credential-masker-guardrail.test.ts`.

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
