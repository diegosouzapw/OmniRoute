# Guardrails (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Bron van waarheid:** `src/lib/guardrails/`
> **Laatst bijgewerkt:** 2026-08-29 — v3.8.51 (de herkomst van Video Bridge-transcripties wordt door de aanroeper opgegeven,
> en wordt nog niet door de server geverifieerd — verduidelijkt conform #11661)

Guardrails dwingen veiligheidsregels, beleidsregels en inhoudstransformaties af op de grens
tussen OmniRoute en upstreamproviders. Elke guardrail kan requestpayloads (`preCall`) en
upstreamresponses (`postCall`) inspecteren (en optioneel weigeren, transformeren of annoteren).

Het systeem is **fail-open**: als een guardrail tijdens de uitvoering een fout veroorzaakt,
registreert het register de fout en gaat het verder met de volgende guardrail in plaats van
het request te laten mislukken. Blokkeren is een expliciete beslissing (`block: true`), nooit een ongeluk.

## Ingebouwde Guardrails

Het register laadt automatisch zes guardrails in prioriteitsvolgorde bij import
(zie `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteit | Naam                | Fase(s)        | Bestand               |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lagere prioriteitsnummers worden **eerst** uitgevoerd.

### Vision Bridge (`visionBridge.ts`) — Modaliteitsbrug PR-1

Onderschept beeld-dragende verzoeken gericht op **niet-visie modellen** en leidt
ofwel het hele verzoek om naar een visie-capabel model, of vervangt de
beeldonderdelen door tekstbeschrijvingen geproduceerd door een configureerbaar
visiemodel vóór de upstream aanroep. Dit stelt tekst-alleen providers in staat
om transparant multimodale payloads te verwerken.

Stroom:

1.  Overslaan als het doelmodel al visie ondersteunt (tenzij het voorkomt in de
    geforceerde-bruglijst `isVisionBridgeForcedModel`).
2.  Extraheer beeldonderdelen via `extractImageParts(messages)`
    (`visionBridgeHelpers.ts`), die delegeert naar de **uniforme mediadetector**
    `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — de enige bron van
    waarheid gedeeld met het combo-compatibiliteitsfilter. Extractie is
    toegestaan voor top-level onderdelen van de vormen die `replaceImageParts`
    kan terugplaatsen (het extract↔vervang contract): OpenAI `image_url`,
    Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`,
    en Responses API `input_image`. Geneste treffers en alleen-indicator vormen
    zijn combo-filtermateriaal en worden nooit geëxtraheerd. Overslaan als er
    geen gevonden zijn.
3.  Los runtime configuratie op via `resolveVisionBridgeRuntimeSettings()`
    (`src/shared/constants/modalityBridgeDefaults.ts`): nieuwe
    `modalityBridge*` instellingssleutels winnen; legacy `visionBridge*`
    sleutels blijven een **één-cyclus terugval** (rollback venster). Overslaan
    vóór elke media-traversal wanneer de brug is uitgeschakeld.
4.  Modusselector (`modalityBridgeVisionMode`, zie onderstaande tabel) beslist
    omleiden versus beschrijven. Omleiden retourneert `modifiedPayload` met
    alleen `model` verwisseld, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Beschrijfpad: beperk afbeeldingen tot `maxImages`, stel de taakbewuste
    prompt samen, raadpleeg de beschrijvingscache, roep het visiemodel
    **parallel** aan (`Promise.allSettled`), en injecteer `[Afbeelding N]: <beschrijving>`
    tekstgedeelten op hun plaats. Een mislukte beschrijving levert `null` op en
    het originele beeldonderdeel wordt **behouden** (#4012) — behalve op het
    combo-beschrijfpad wanneer elke beschrijving mislukte, waar een bevestigde
    niet-visie upstream een `(niet beschikbaar — geen visie-capabele provider verbonden)`
    stub krijgt in plaats daarvan (#8430).
6.  Retourneer `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
    `processingTimeMs`, `visionModel`).

#### Modusselector (`modalityBridgeVisionMode`)

| Modus      | Standaard | Gedrag                                                                                                                                                                                                                                                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔         | Legacy heuristiek, ongewijzigd (#6640/#7204): niet-combo/`auto/` modellen leiden om naar het beste visiemodel tenzij het originele model al bruikbare credentials heeft (dan beschrijven); combo-doelen beschrijven altijd.                                                                            |
| `describe` |           | Altijd beschrijven — het omleidingsblok wordt volledig overgeslagen; het door de gebruiker gekozen model antwoordt altijd.                                                                                                                                                                             |
| `reroute`  |           | Forceer omleiding: de keep-credentialed-model guard wordt omzeild. De credential guard van het omleidings-**doel** blijft van toepassing — wanneer er geen bruikbaar visiedoel bestaat, valt het verzoek terug op beschrijven zodat ruwe afbeeldingen nooit een tekst-alleen backend bereiken (#8430). |

Geforceerde modi kortsluiten **voordat** de auto-heuristiek wordt uitgevoerd;
`auto`-gedrag is byte-identiek aan de pre-PR-1 guardrail.

#### Taakbewuste beschrijvingsprompt (`modalityBridgeVisionTaskAware`)

Standaard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) voegt
de tekst van het **laatste gebruikersbericht** (afgekapt tot 500 tekens) toe
aan de basisbeschrijvingsprompt, waardoor de beschrijving wordt gestuurd naar
wat de gebruiker daadwerkelijk vroeg (codex-vision-proxy patroon) en het
visiemodel wordt gevraagd zichtbare tekst te transcriberen. Met de vlag uit —
of zonder gebruikerstekst — wordt de basisprompt ongewijzigd gebruikt.

De `callVisionModelSingle()`-aanvraag van de beschrijvende self-loop, die compatibel is met OpenAI (`visionBridgeHelpers.ts`), vraagt altijd `image_url.detail: "high"` aan — onvoorwaardelijk, voor elke aanroeper/provider, niet afhankelijk van enig clientsignaal. Sampling met lage detailniveaus vermindert de OCR-nauwkeurigheid precies voor de teksttranscriptietaak die deze prompt vraagt, dus de beschrijvingsaanroep zelf vraagt altijd om hoge details, ongeacht het detailniveau dat de oorspronkelijke inkomende aanvraag gebruikte. Dit beïnvloedt alleen de interne beschrijvingsaanvraagbody; het verandert niet hoe OmniRoute de `image_url.detail` van de aanroeper doorstuurt bij de primaire aanvraag — die standaardwaarde wordt afzonderlijk toegepast, en alleen voor gedetecteerde OpenCode-clients, in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). De Anthropic wire-format-tak van de beschrijvende self-loop heeft geen `detail`-veld en wordt door geen van beide standaardwaarden beïnvloed.

#### Beschrijvingsuitvoerlimiet (`modalityBridgeVisionMaxChars`)

| Sleutel                        | Standaard | Bereik           |
| :----------------------------- | :-------- | :--------------- |
| `modalityBridgeVisionMaxChars` | `0`       | `0` of 100–50000 |

`0` (standaard) betekent **geen limiet** — de beschrijving die door `callVisionModel()` wordt geretourneerd, wordt ongewijzigd doorgestuurd, waardoor het bestaande gedrag behouden blijft. Elke waarde in het bereik van 100–50000 verkort de beschrijving met een `…`-achtervoegsel voordat deze wordt teruggevoegd als `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Verhoog dit voor detailrijke OCR-taken waarbij het downstreammodel de volledige transcriptie nodig heeft; verlaag het om het tokengebruik te beperken bij spraakzame vision-modellen. Het dashboardveld bevindt zich op het tabblad Vision's Advanced-paneel (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) en klemt elke waarde tussen 1 en 99 af tot de ondergrens van 100, terwijl een expliciete `0` onaangeroerd blijft — `0` is een geldige Zod-waarde op zich (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), niet slechts de "niet-ingestelde" standaardwaarde.

#### Beschrijvingscache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL-cache voor beschrijvingsuitvoer, gedeeld over het hele proces.
Sleutel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` met lengte-prefix framing (geen veldgrensconflicten). De modelcomponent is het **geconfigureerde** brugmodel, niet het model dat daadwerkelijk heeft geantwoord — `callVisionModel` kan intern terugvallen, en het cachen per poging zou de cache fragmenteren. Mislukte beschrijvingen worden nooit gecachet. Instellingen:

| Sleutel                         | Standaard | Bereik  |
| :------------------------------ | :-------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Normalisatie van externe afbeeldingen (self-loop beschrijven/base64 ophalen)

Wanneer de brug zelf een **externe** afbeelding ophaalt — de Anthropic describe self-call en de claude-wire-format base64-conversie (`ensureBase64ImagesForClaudeWire`), beide via `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — wordt de resulterende data-URI door `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) geleid voordat deze wordt ingebed in de vision-modelaanvraag. Te grote afbeeldingen worden verkleind tot een **2048px lange zijde** (overeenkomend met de resize-limiet die OpenAI/Anthropic al server-side toepassen), wat uploadbytes/latentie vermindert zonder te veranderen wat het vision-model ziet. Het verkleinen gebruikt `sharp`, geladen via dynamische import: op een platform waar de native binary niet kan laden, **werpt `normalizeDataUri()` nooit een fout** — het valt terug op een passthrough van de originele bytes, zodat het beschrijvings-/base64-conversiepad altijd blijft werken. Niet-afbeeldingsbytes (een fetch die geen decodeerbare afbeelding retourneerde) worden ook onaangeroerd doorgestuurd. Deze normalisatie is beperkt tot afbeeldingen die de brug ophaalt voor zijn eigen self-call — het wordt nooit toegepast op de ruwe passthrough-payload van de aanroeper, in overeenstemming met het opt-in-only mutatieprincipe (Hard Rule #20).

#### Instellingenschema + migratie

De nieuwe `modalityBridge*`-sleutels worden Zod-gevalideerd in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, het `modalityBridgeCache*`-trio, en de `modalityBridgeAudio*`-groep die door de Audio Bridge wordt gebruikt. Migratie `141_modality_bridge_settings.sql` kopieert bestaande legacy `visionBridge*`-waarden naar de overeenkomende nieuwe sleutels (idempotent, overschrijft nooit een door de operator ingestelde `modalityBridge*`-waarde); de legacy-sleutels blijven geaccepteerd als een read-fallback voor één releasecyclus.

#### Transparantieheader + statistieken

Transformaties van beschrijvingen dragen `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (gebouwd door `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, gestempeld door `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Omgeleide aanvragen krijgen **geen** header — de payload was onaangeroerd en de modelwissel is al zichtbaar in het `model`-veld van de response body.

`GET /api/modality-bridge/stats` (management authenticatie, zelfde niveau als `GET /api/settings`) retourneert de in-memory per-modaliteit tellers `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` voor `vision`, `audio`, en `video`. `averageLatencyMs` gebruikt `latencySamples`, niet alle pogingen, als zijn noemer; een bewerking zonder timing fabriceert geen nul-milliseconde sample. `bridged` blijft de achterwaarts compatibele alias voor succesvolle conversies; mislukte pogingen verhogen deze niet. Tellers worden gereset bij procesherstart volgens ontwerp (telemetrie, geen boekhouding).

#### Dashboardconfiguratie

De speciale dashboardpagina is
`/dashboard/settings/modality-bridge`. De via URL adresseerbare `Vision`-, `Audio`-
en `Video`-tabbladen behouden queryparameters bij het wisselen van de `tab`-waarde.
Het Vision-tabblad toont inschakeling, modus, modelselectie (inclusief de automatische
standaard), taakbewuste prompting, geavanceerde time-out-/afbeeldings-/beschrijvingslengte-/cachelimieten,
runtime-tellers en een beveiligde voorbeeldverzoek. Het Audio-tabblad is ook live: het toont
inschakeling, een STT-only modelkiezer met Auto, time-out-/max-clip-limieten, audio-
tellers en een `input_audio`-voorbeeldtest. Het Video-tabblad is functioneel: het rapporteert
de FFmpeg/ffprobe runtime-status — een van de vier expliciete UI-statussen (`unknown` terwijl
de probe bezig is of niet kon worden voltooid, `restricted` op een niet-loopback
dashboardhost waar de probe client-side wordt overgeslagen, `unavailable` zodra geprobeerd
en bevestigd ontbrekend, of `available` met de FFmpeg/ffprobe-versies) — behoudt
inschakel-/model-/frame-/video-/time-outlimieten, filtert de modelkiezer tot vision-compatibele
modellen en toont videotellers.

De voormalige Vision Bridge-kaart onder AI-instellingen is een compatibiliteitslink naar de
nieuwe pagina; het bevat geen tweede kopie van het formulier meer. Mediaproviders linken ook
Image-to-Text- en Speech-to-Text-workflows naar de corresponderende Modality Bridge-tabbladen
zonder de bestaande Speech-to-Text-playground te verwijderen.

**Self-loop toelatingsbypass:** wanneer de `describe`-aanroep via OmniRoute's
eigen `/v1` self-loop (niet-standaard provider-model) wordt gerouteerd, stuurt
de subaanvraag `x-omniroute-admission-bypass: internal` en wordt deze geauthenticeerd
met de opgeloste self-loop-referentie — de lokale `sk_omniroute`-sentinel in lokale modus,
of de door de operator geconfigureerde `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` omgevingssleutel
(#1350) zodat `REQUIRE_API_KEY=true`-implementaties de `describe`-aanroep nog steeds kunnen uitvoeren.
De bypass wordt alleen gehonoreerd voor die exacte referenties, dus externe clients kunnen de header
niet gebruiken om de toelating over te slaan.

Legacy-standaardwaarden bevinden zich in `src/shared/constants/visionBridgeDefaults.ts`; de
nieuwe modus-/taakbewuste/cache-standaardwaarden en de instellingenresolver bevinden zich in
`src/shared/constants/modalityBridgeDefaults.ts`. De guardrail exposeert een
`deps`-constructoroptie zodat tests nep `getSettings`- en
`callVisionModel`-implementaties kunnen injecteren.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Onderschept chatverzoeken met audio voordat ze een doel bereiken waarvan niet
bekend is dat het audio-invoer accepteert. Het routeert het chatverzoek nooit
opnieuw: audiodelen worden getranscribeerd via het bestaande OpenAI-compatibele
multipart-eindpunt en het gekozen chatmodel gaat verder met teksttranscripties.

Flow:

1.  Los `supportsAudio` op via `getResolvedModelCapabilities()`. Expliciete
    provider-registry metadata wint, dan statische modelmetadata, dan gesynchroniseerde
    `modalities_input`. Een gedeclareerde invoerlijst zonder `audio` is `false`;
    geen bewijs van capaciteit blijft `null`. Zowel `false` als `null` activeren
    de conservatieve bridge, terwijl `true` deze omzeilt.
2.  Los `modalityBridgeAudio*`-instellingen op en extraheer spliceable top-level
    audiodelen uit elk bericht via de gedeelde `detectMediaParts()`-detector.
    Ondersteunde draadvormen zijn OpenAI `input_audio`, `audio_url` en
    `source.media_type: "audio/*"`. Geneste audio wordt gedetecteerd voor routering,
    maar niet verwijderd door het splice-pad. Werk wordt begrensd door
    `modalityBridgeAudioMaxClips`; latere delen blijven onaangeroerd.
3.  Eer een geconfigureerde `provider/model`, of laat `selectAudioBridgeModel()`
    `AUDIO_TRANSCRIPTION_PROVIDERS` doorlopen in stabiele catalogusvolgorde en
    selecteer het eerste model met een bruikbare actieve providerreferentie.
4.  `callAudioTranscription()` converteert base64/data-URI-audio naar een multipart
    `file`, of downloadt een externe `audio_url` via de alleen-openbare uitgaande
    guard met DNS-pinning en een limiet van 25 MB. Het POST dan het bestand en
    het geselecteerde model naar de lokale `/v1/audio/transcriptions` self-loop,
    geauthenticeerd met `resolveSelfLoopBearer()`. De bestaande transcriptieroute
    voert normale referentie-opzoeking, cooldown-/rate-limit-afhandeling en
    provider-dispatch uit.
5.  Succesvolle aanroepen vervangen hun delen door `[Audio N]: <transcript>`.
    Aanroepen worden uitgevoerd met `Promise.allSettled`: een individuele fout
    behoudt dat originele audioddeel (contract #4012). Als elke aanroep mislukt
    en het doel bewezen `supportsAudio === false` is, worden de delen
    `[Audio N]: (niet beschikbaar — geen STT-provider verbonden)` (contract #8430).
    Voor een onbekend doel (`null`) blijft een resultaat met alleen fouten onaangeroerd.
    Een bewezen tekst-only doel zonder bruikbare STT-referentie ontvangt dezelfde
    expliciete stub zonder een netwerkaanroep te doen.

Succesvolle transcripties gebruiken de procesbrede Modality Bridge LRU/TTL-cache.
De sleutel combineert de audioreferentie, het stabiele `audio-transcription`-bewerkinglabel
en het geselecteerde STT-model; mislukkingen worden nooit gecached. Audiopogingen
updaten de gedeelde `bridged`, `cacheHits`, `failures` en `lastUsedAt` tellers.
Getransformeerde antwoorden bevatten
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; onaangeroerde
verzoeken ontvangen geen Audio Bridge-segment.

Runtime-instellingen zijn DB-ondersteund en Zod-gevalideerd:

| Sleutel                       | Standaard | Bereik         |
| :---------------------------- | :-------- | :------------- |
| `modalityBridgeAudioEnabled`  | `true`    | —              |
| `modalityBridgeAudioModel`    | `""`      | Auto of STT ID |
| `modalityBridgeAudioTimeout`  | `60000`   | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`       | 1–10           |

De gedeelde cache blijft gecontroleerd door `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` en `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Onderschept video-onderdelen op het hoogste niveau in Chat Completions `messages` en Responses
API `input` voordat een doel zonder bekende native video-ondersteuning wordt aangeroepen.
Ondersteunde vormen zijn `input_video`, `video_url`, `video_source`, HTTPS URL's,
en `data:video/*;base64,...` data-URI's. Gewone bestandsnamen in tekst worden niet behandeld
als video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) is eigenaar van de aanvraagtraversal, de
mogelijkheids-/beleidscontrole, aggregatie per aanvraag en de antwoordpayload.
Werk per video — acquisitie, de cache voor het hele resultaat, het beschrijven van een
framevolgorde (die elke door de beller gedeclareerde audiotranscriptie samenvoegt) en
statistieken/afbreken/opschonen per poging — is verborgen achter `processVideoPart` in
`videoBridgePipeline.ts`, eenmaal per video-onderdeel aangeroepen binnen de lus van `preCall`.
Die module definieert ook de expliciete poortgrenzen `VideoMediaBrokerPort`
(bytes verwerven en bemonsterde frames extraheren), `VideoAudioTranscriptionPort`
(een door de beller gedeclareerde audiotranscriptie samenvoegen met de bemonsterde ondertitels) en
`VideoDrilldownPort` (de persistentiegrens voor framedrilldown; nog niet gekoppeld
aan `processVideoPart` — alleen de afzonderlijke route `/api/modality-bridge/video/drilldown`
schrijft vandaag drilldown-items).

Het openbare `/v1` aanvraagpad importeert of roept nooit een subprocess aan. Externe
video's worden gedownload onder een limiet van 50 MiB; inline base64-video's hebben een
conservatieve 36 MiB gedecodeerde limiet per video, zodat de model-/berichten-/framing-envelop
binnen de openbare JSON-aanvraagtoelatingslimiet van 50 MiB kan blijven. Inline
lengte- en gedecodeerde-grootte-schattingen worden gecontroleerd vóór toewijzing. HTTPS is
vereist op de initiële externe URL en elke omleiding, met behulp van de bestaande
alleen-openbare uitgaande beveiliging met DNS-pinning. De bytes passeren vervolgens de exacte interne
`POST /api/modality-bridge/video/extract` brokergrens. Die route is zowel
`LOCAL_ONLY` als `SPAWN_CAPABLE`, accepteert alleen een per-proces geauthenticeerde,
vertrouwde-loopback-aanvraag, en accepteert nooit een URL, bestandssysteempad, uitvoerbaar bestand
of argumentenlijst. De API-body-size-pipeline en de incrementele body-lezer van de handler
handhaven onafhankelijk een 50 MiB broker-invoerlimiet. De begrensde wachtrij voert
één extractie tegelijk uit, staat vier openstaande taken toe en beperkt de openstaande invoer tot
100 MiB.

Binnen de broker leest `ffprobe` een privé lokaal bestand; de vaste formaat-allowlist
sluit afspeellijst- en manifestformaten uit. Voor toegestane MOV-familie
containers blijven externe MOV-gegevensreferenties standaard uitgeschakeld, en de
vaste opdracht kiest er niet voor. Zowel `ffprobe` als `ffmpeg` gebruiken de
`file`-only protocol-whitelist, één thread, vaste argumentarrays, geen shell,
en uitvoerbare bestanden opgelost vanuit `PATH`. Bijgevoegde-afbeelding-coverstreams zijn geen
afspeelbare kandidaten. Alle afspeelbare streams moeten voldoen aan de limieten, en een
expliciete standaardstream heeft de voorkeur boven de deterministische laagste-index
terugval. Video's zijn beperkt tot 600 seconden, 8.192 pixels per dimensie, en
33.554.432 bronpixels. FFmpeg bemonstert 1-16 middenpunt JPEG-frames, schaalt
de lange zijde naar maximaal 1.024 pixels zonder kleinere invoer op te schalen, en
ontvangt nooit een URL. Bemonstering is standaard `uniform`. De optionele
`scene_aware` en experimentele `segment_aware` beleidsregels voeren één extra
vaste FFmpeg-pas uit over de reeds gevalideerde lokale stream, selecteren begrensde
`showinfo` scènetijdstempels, en vallen deterministisch terug op dezelfde
uniforme middenpunten bij detectorfout, time-out, misvormde uitvoer of een lege
kandidatenset. Segmentbewuste modus wijst middenpuntmonsters proportioneel toe aan
de gevalideerde scène-intervallen; segmentbewijs en terugvalgedrag worden
hieronder gedetailleerd. De harde limiet van 16 frames wordt
toegepast na selectie in elk beleid. Wanneer een scènebewuste aanvraag slechts een
budget van één frame heeft, gebruikt deze het uniforme middenpunt van het actieve volledige-video- of focusvenster
en rapporteert `policyEffective: uniform`: een enkel geselecteerd scèneframe
kan niet beide temporele uiteinden behouden. Een beller kan optioneel een
eindig focusvenster (`start`/`end` seconden) opgeven; grenzen worden geklemd tot de media
duur, omgekeerde of niet-eindige vensters worden afgewezen, en alle bemonsteringsbeleidsregels
worden alleen uitgevoerd binnen het genormaliseerde interval. Het resulterende
venster wordt opgenomen in de bemonsteringsmetadata en in het onvertrouwde beschrijvingsvoorvoegsel,
zodat downstreammodellen een gefocust fragment kunnen onderscheiden van de volledige
tijdlijn.

Semantische ondertitelfocus is een afzonderlijke, expliciete instelling. De standaard `full`
analysemodus behoudt de bestaande frameprompt en stuurt nooit aanvraagtekst
door naar het ondertitelmodel. In de `focused` modus leest de bridge alleen de nieuwste
niet-lege, door de gebruiker geschreven `text`/`input_text` uit dezelfde Chat- of Responses-
container, normaliseert deze naar NFC, comprimeert controlekarakters en witruimte,
en beperkt deze tot 500 Unicode-codepunten. Een leeg resultaat valt terug op de
exacte `full` prompt. Een bruikbare hint wordt geserialiseerd als JSON in een speciale
onvertrouwde-gebruikerscontextblok en mag alleen waarneembare details prioriteren; het
kan de afzonderlijke waarschuwing tegen het opvolgen van instructies die zichtbaar
of hoorbaar zijn in de media niet overschrijven. Tekstuele focus leidt nooit `start`/`end` af
of verandert de temporele sampler.

#### FU-07 structureel segmentbewijs

`segment_aware` gebruikt één begrensde vooranalyse-pas over de reeds gevalideerde
lokale videostream. De vaste filterketen schaalt eerst tot maximaal 320 pixels
breed, detecteert scèneveranderingen en bevroren intervallen, en bemonstert vervolgens met 1 frame per
seconde voor onscherpte, gemiddelde luma en ruimtelijke/temporele informatie. De pas is
beperkt tot 600 structurele monsters, één FFmpeg/filterthread, hetzelfde
`file`-only protocol en container-allowlists, een 1 MiB proces-outputlimiet,
en maximaal 30 seconden binnen de gedeelde abort/deadline van de broker. Het
accepteert nooit een commando, filter, pad of URL van de aanvraag.

De structurele waarden zijn deterministische bemonsteringsevidentie, geen semantisch videobegrip. Ze leiden geen onderwerpen, acties, bijschriften, spraak of gebruikersintentie af. Scène- en bevriezingsgrenzen vormen segmenten; bevriezingsdekking, onscherpte, belichting, ruimtelijk detail en temporele verandering beïnvloeden alleen hoe het bestaande budget van 1-16 frames wordt toegewezen. Een volledig bevroren segment is beperkt tot één frame, terwijl niet-bevroren segmenten strijden om het resterende budget. Wanneer grenzen het aantal frames overschrijden, blijft een uniforme tijdlijndekking behouden, zodat snelle vroege cuts geen lang achterblijvend segment kunnen verbergen. Scènegrenzen binnen de 1-seconde analyse resolutie van een bevriezingsgrens worden samengevoegd.

Ontbrekende filters, misvormde/lege evidentie, een detectorfout of de begrensde pre-analyse timeout vallen terug op het exacte uniforme middenbeleid. Een afbreking door de aanroeper of een broker deadline valt niet terug: het beëindigt het lopende subprocess, voorkomt latere frame-extractie en de private tijdelijke boom wordt verwijderd in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genereert deterministische echte FFmpeg-fixtures voor besparingen op bijschrift-aanroepen na deduplicatie, toewijzing van het budget voor dichte beweging, bewijs van onscherpte/belichting/SI-TI, snelle cuts met een lange staart en valse positieven bij geleidelijke vervaging. Het registreert de wall-time van de pre-analyse en, indien `/usr/bin/time` beschikbaar is, de CPU van het kindproces en de piek RSS. De kwaliteitscontroles zijn alleen structurele orakels. De kwaliteit van het echte bijschriftmodel blijft `HOLD` omdat deze testomgeving geen geautoriseerd eindpunt of bevroren beoordelaar heeft. Monetaire besparingen blijven ook `HOLD`, tenzij `--caption-cost-per-call-usd` een expliciete positieve schatting per aanroep levert; het script fabriceert nooit een van beide resultaten.

Elk frame is beperkt tot 4 MiB, alle ruwe frames samen tot 23 MiB, en de geserialiseerde brokerrespons tot 32 MiB. Een private tijdelijke map wordt verwijderd in `finally`. OmniRoute bundelt geen FFmpeg en accepteert geen aangepast uitvoerbaar pad. Voordat bijschriften worden toegevoegd, past de bridge een conservatieve visuele deduplicatiepas toe: elke JPEG wordt gereduceerd tot een 16×16 grijswaardenbuffer en wordt alleen vergeleken met het laatst behouden frame. Voor een aangevraagd bijschriftbudget van meer dan één frame levert de extractie een begrensde kandidaatpool van maximaal tweemaal dat budget en nooit meer dan 16 frames. De aangevraagde limiet wordt pas na deduplicatie toegepast, waarbij de eerste en laatste geselecteerde kandidaten worden behouden tijdens de uiteindelijke verdunning wanneer het budget ten minste twee is. Het versiebeheerde `grayscale-16x16-mean-cells-v2`-beleid gebruikt de grootste van de gemiddelde luma-delta en de verhouding van thumbnailcellen waarvan de genormaliseerde delta ten minste 0,05 is. De drempel voor duplicaten is de constante 0,04, gekozen voor voorspelbaarheid in plaats van blootgesteld als een runtime-instelling. Dit secundaire signaal met hoog contrast behoudt kleine bewegingen en zichtbare tekstwijzigingen die een vergelijking op basis van alleen het gemiddelde kan verbergen. Vergelijkings- of decoderfouten vallen terug en behouden de dekking. Uitvoermetadata scheidt geëxtraheerde kandidaten, succesvol gebruikte frames en visuele duplicaten die zijn verwijderd.

Een expliciet gemarkeerd videodeel kan een contactblad met tijdstempels aanvragen. De bridge bouwt maximaal een 4-koloms, 16-frames JPEG-raster. Elke cel van 512 pixels brandt zijn bron-tijdstempel in een contrastrijke onderband, terwijl dezelfde tijdstempels in tekstuele metadata blijven voor stroomafwaartse associatie en audit. De complete JPEG blijft beperkt tot 32 MiB. Als `sharp` het raster niet kan decoderen of samenstellen, valt de bridge terug op de individuele JPEG-frames; een client-abort wordt nog steeds doorgegeven aan de bladbewerking.

Promotie-evidentie is bewust gescheiden van de synthetische compositie-microbenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` definieert een schema-versiebeheerde A/B-harness voor echte OpenAI-compatibele vision-modellen. Het meet door de provider gerapporteerde tokens, end-to-end wall-latency (inclusief bladcompositie), aantal modelaanroepen en manifest-gedefinieerde feitenretentie. Ruwe modelantwoorden worden niet naar het rapport geschreven; alleen SHA-256-hashes en overeenkomende feiten-ID's worden behouden. De harness doet geen netwerk- of betaalde modelaanroep, tenzij `--execute-real` wordt doorgegeven en `--model`, `OMNIROUTE_BASE_URL` en `OMNIROUTE_API_KEY` zijn geconfigureerd. Zonder die expliciete echte uitvoering blijft het machineleesbare oordeel `HOLD`; synthetische payload/call-count metingen alleen zijn geen promotie-evidentie.

Aanroepers kunnen een optionele `transcript.cues`-array koppelen aan een ondersteund videodeel wanneer ze al uitgelijnde tekst bezitten. Elke cue moet `text` bevatten, een eindig `start`/`end`-interval binnen de onderzochte duur, en een op de witte lijst geplaatste `source` (`client`, `embedded` of `audio-bridge`); `confidence` is standaard `1` en moet tussen `0` en `1` blijven. Exacte dubbele cues worden samengevoegd. OmniRoute start nooit transcriptie vanuit deze metadata: gevalideerde cues worden gekopieerd naar het beschreven resultaat met bron, vertrouwen en interval, en worden weergegeven als onbetrouwbare waarnemingen naast de frame-bijschriften. Ongeldige, buiten bereik of herkomstloze tekst wordt afgewezen in plaats van gemengd in de bijschriftstroom. Het `source`-veld wordt momenteel door de aanroeper gedeclareerd, niet door de server geverifieerd: OmniRoute dwingt af dat de waarde een van de drie toegestane strings is, maar bevestigt nog niet cryptografisch dat een `embedded` of `audio-bridge`-label daadwerkelijk afkomstig is van een door de server beheerde extractie. Behandel `source` als een onbetrouwbare hint totdat die verificatie is geïmplementeerd; bouw er geen autorisatiebeslissingen op.

Een geavanceerde beller kan een reeds geautoriseerde `audioTranscript`-track voor dezelfde video aanleveren. De fusienaad verwerkt visuele en audio-observaties onder één deadline en abortsignaal, ordent ze op een gemeenschappelijke tijdlijn, voegt exacte duplicaten samen en rapporteert een gedeeltelijk resultaat wanneer slechts één zijde slaagt. Een ongeldige `audioTranscript` degradeert naar dat gedeeltelijke resultaat — de visuele beschrijving wordt behouden en de audio-tak registreert een gesaneerde foutcode — in plaats van de hele video te laten mislukken. Beschikbaarheid per tak, de gedeeltelijke vlag en de gesaneerde foutcodes blijven behouden in het beschreven resultaat, in de guardrail-metadata (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), in de resultaat-cache-metadata en in de bridge-fusietellers. Het standaard Video Bridge-pad roept geen spraak-naar-tekst aan of downloadt geen tweede mediakopie; zonder die expliciete track blijft het alleen video.

**Transcriptbewaring (#12150 P1).** Dit wordt automatisch toegepast wanneer de Video Bridge (zelf opt-in) een transcriptcue rendert — er is geen aparte bewaringsvlag. Wanneer een verzoek een transcriptcue rendert (een door de beller gedeclareerde `transcript` of een gefuseerde `audioTranscript`), markeert de guardrail deze als `videoBridgeObserved` en produceert een geredigeerde schaduw van de videobeschrijving — een identieke weergave waarin de vrije-tekstinhoud van elke cue wordt vervangen door `[redacted-video-transcript]`, opgebouwd door het gestructureerde cue-veld te vervangen voordat de string wordt samengesteld (nooit door de afgeplatte tekst te parsen, zodat geen cue-inhoud — vijandig of gewoon, inclusief inhoud die `]` bevat, zoals `[inaudible]`/`[music]` — kan overleven). De bewaarde call-log-requestbody wisselt elk van video afgeleid tekstdeel voor die geredigeerde schaduw, gematcht op inhoudsgelijkheid; de `fullText`-anker wordt opnieuw gelezen uit de voltooide pre-call guardrail-payload, zodat de match nog steeds slaagt na latere keten-guardrails (de PII- en credential-maskers, prioriteiten 10/95) de beschrijvingstekst ter plaatse herschrijven en nadat systeem-prompt/handoff/geheugeninjectie de berichtenarray hervormt. De body die stroomopwaarts naar het model wordt gestuurd, blijft ongewijzigd. Een geobserveerd verzoek vult ook geen duurzaam Geheugen (zowel aanvraag- als antwoord-afgeleide extractie worden overgeslagen), zodat het eigen antwoord van het model geen transcripttekst in het Geheugen kan echoën.

Aanvullende bewaarde kopieën gebruiken hetzelfde geobserveerde-verzoeksignaal. De ruwe pre-guardrail client-request snapshot, in-memory pending request en vroege rejected-request log vervangen structureel transcriptvelden in videodelen; stringprompts gesynthetiseerd door pijplijnfasen en contextoverdracht worden geredigeerd bij de persisted-request-body sink. De bewaarde `video_content_removed`-marker zorgt ervoor dat `previous_response_id`-voortzetting gesloten faalt in plaats van tekst te reconstrueren die opzettelijk is weggegooid. Als een geobserveerd verzoek zijn per-deel redactieschaduw verliest vóór logboekregistratie, of zelfs een van de verschillende videoschaduwen niet overeenkomt na latere verzoekmutaties, wordt de bewaarde requestbody volledig weggelaten in plaats van een gedeeltelijk geredigeerd transcript te bewaren.

Voor een geobserveerd verzoek kan een modelantwoord elk deel van het transcript citeren zonder een gestructureerde cue-grens. De bewaarde call-log `responseBody` wordt daarom vervangen door een weglatingsmarker; het gedetailleerde pijplijnartefact (dat upstream/client bodies en stream chunks kan bevatten) wordt niet bewaard. Semantische, idempotentie- en redenering-replay-caches omzeilen lees- en schrijfbewerkingen voor dat verzoek. Het providerverzoek en de voor de client zichtbare respons blijven ongewijzigd. Vroege keepalive-bytes worden uit de tijdelijke buffer geleegd wanneer het gedetailleerde artefact wordt weggelaten. Kiro's waarschuwing voor een misvormde EventStream rapporteert alleen het aantal payload-bytes, nooit de inhoud of de ruwe fout van de JSON-parser. Dit beweert niet dat elke ongerelateerde provider/plugin-diagnose is gecontroleerd; de bredere retained-sink sweep wordt bijgehouden in #11658.

De interne `/api/modality-bridge/video/drilldown`-levenscyclus is een afzonderlijk, loopback/token-geauthenticeerd cache-substraat. Elke bewerking vereist ook een canonieke ondoorzichtige principal-ID. Voordat een productie-beller wordt ingeschakeld, moet deze die ID afleiden van de geauthenticeerde tenant en mag deze nooit een door de client geselecteerde waarde doorsturen. Cache-sleutels binden die principal aan canonieke sessie- en video-referentie-ID's, slaan alleen hun SHA-256-afgeleide sleutels op en beperken zowel lees- als verwijderbewerkingen tot dezelfde principal. De cache slaat maximaal 16 afgeleide JPEG-frames per item op, laat ze na tien minuten verlopen en ondersteunt begrensde `start`/`end`-leesbewerkingen of expliciete sessieverwijdering.

Elke principal is beperkt tot 16 items en 64 MiB aan canonieke JPEG-gegevens. Die limieten staan los van het globale plafond van 64 items/256 MiB: quotadruk van de principal verwijdert alleen de minst recent gebruikte items van die principal voordat globale LRU-verwijdering wordt overwogen. Verlopen items worden zowel van de principal- als de globale boekhouding verwijderd bij cache-activiteit, terwijl annulering en validatiefouten geen gedeeltelijke vervanging vastleggen.

De cache weigert niet-canonieke Base64, overtollige padding, niet-JPEG-media, misvormde of afgekorte JPEGs, en JPEGs die een waarschuwing produceren tijdens een begrensde volledige-afbeelding `sharp`-decodering. Het hercodeert elke geaccepteerde afbeelding als een canonieke JPEG, leidt breedte en hoogte af van de gedecodeerde bytes in plaats van de velden van de beller te vertrouwen, en verwijdert eventuele achterblijvende polyglot-bytes in plaats van ze te behouden. Alleen de begrensde canonieke gecomprimeerde buffer wordt aan beide quota toegerekend. De JSON-draadlimiet omvat Base64-overhead voor het 32 MiB gedecodeerde-invoerplafond. Elke opgeslagen afleiding registreert zijn gevalideerde JPEG-formaat/resolutie, samplingbeleid, afleidingsversie, aanmaaktijd, door de server berekende inhouds-hash, en gehashte ouderreferentie plus de ouder-inhouds-hash van de vertrouwde beller. Annulering wordt gecontroleerd tussen asynchrone decodeer-/hash-fasen vóór de atomische cache-commit.

Deze tranche verbindt nog geen productieproducer met de route en biedt geen multi-resolutie variantselectie. Het transparante Video Bridge-aanvraagpad brengt daarom geen extra werk met zich mee, terwijl tenant-gebonden principaalafleiding en de volledige FU-08 multi-resolutie levenscyclus expliciet vervolgwerk blijven in plaats van gedocumenteerd als voltooid gedrag.

Frames worden sequentieel van bijschriften voorzien met het geconfigureerde Video-model. Een lege Video-overschrijving erft de Vision-instelling; als beide leeg zijn, selecteert de Vision auto-router het effectieve vision-geschikte model. Succesvolle bijschriften vervangen het originele deel door een stabiel `[Video description:` voorvoegsel dat de tekst ook markeert als een onbetrouwbare, van media afgeleide observatie en downstream-modellen instrueert om geen instructies uit de media op te volgen. Cache-sleutels voor frame-bijschriften omvatten de JPEG-bytes, prompt, tijdstempel en het effectieve model; alleen succesvolle bijschriften worden in de cache opgeslagen. Cache-items behouden het daadwerkelijke succesvolle producer-model, inclusief een fallback-model; de bridge rapporteert `mixed` wanneer verschillende frames door verschillende modellen zijn geproduceerd. Een cache-hit hergebruikt die producer-identiteit in plaats van deze opnieuw te labelen als het aangevraagde routeringsplan. De hele-video resultaatcache wordt gesleuteld op elke invoer die de uitvoer verandert — prompt, effectief model, samplingbeleid, frame-aantal, semantische analysemodus, de SHA-256-vingerafdruk van de genormaliseerde focus-hint, focusvenster, `transcript`, `audioTranscript`, en de contact-sheet vlag — dus het wijzigen van een van die dimensies resulteert in een cache-miss, nooit in een verouderd hergebruik. De visuele dedup-beleidsversie, drempelwaarde en het begrensde aantal kandidaat-frames zijn ook expliciet in de resultaatcache-sleutel en metadata; een beleidswijziging kan daarom geen verouderde hele-video beschrijving hergebruiken. Resultaatcache v4 metadata behoudt de modus en vingerafdruk, nooit de ruwe gebruikerstaak. Guardrail-metadata rapporteert zowel de aangevraagde als de effectieve analysemodi; een aangevraagde `focused` modus zonder bruikbare gebruikerstekst wordt gerapporteerd als effectief `full`.

De guardrail extraheert elk ondersteund videodeel, maar beschrijft niet meer dan `modalityBridgeVideoMaxVideos`. Voor een doel dat bewezen `supportsVideo === false` heeft, worden mislukte en overschreden video's expliciete veilige tekstmarkers, zodat er geen ruwe video overblijft. Wanneer de capaciteit onbekend is, blijven die delen onaangeroerd. Doelen met `supportsVideo === true` omzeilen de bridge. Het abortsignaal van de clientaanvraag propageert door download, broker-wachtrij, subprocessen en bijschriftoproepen; aborts stoppen tussen video's en falen nooit open naar ruwe media.

Runtime-instellingen zijn DB-ondersteund en Zod-gevalideerd:

| Key                                 | Default     | Range / behavior                                                                                                    |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Optionele runtime, opt-in                                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` behoudt generieke bijschriften; `focused` gebruikt begrensde, onbetrouwbare context van de laatste gebruiker |
| `modalityBridgeVideoModel`          | `""`        | Erft het Vision Bridge-model                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, of proportioneel `segment_aware`; detectorfout valt terug op `uniform`                    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Verouderde opgeslagen Video-timeoutwaarden boven 120 seconden worden begrensd tot de broker-deadline; nieuwe instellingen die boven die limiet worden geschreven, worden geweigerd. `GET /api/modality-bridge/video/runtime` vereist vertrouwde gestempelde loopback-localiteit vóór authenticatie of runtime-onderzoek, en vereist vervolgens management-authenticatie. Het retourneert alleen `available`, gesaneerde FFmpeg/ffprobe-versies, en een vaste reden wanneer de runtime niet beschikbaar is. Het interne extractie-eindpunt is geen openbare upload-API: wachtrijverzadiging retourneert `503` plus `Retry-After`, een verbroken verbinding van de beller retourneert `499`, en de vaste broker-deadline retourneert `504`. Geconverteerde antwoorden voegen `video->text;model=<visionModel>;parts=<videos>` toe aan de centrale `x-omniroute-modality-bridge` header zonder Vision- of Audio-segmenten te verwijderen.

### PII Masker (`piiMasker.ts`)

Draait op **beide** fasen.

- **`preCall`** kloont de payload, doorloopt `system`, `messages`, `input` en `prompt` (inclusief gewone string-items), en past `processPII()` (van `@/shared/utils/inputSanitizer`) toe op string `content`/`text` velden. Wanneer `PII_REDACTION_ENABLED=true`, wordt gedetecteerde PII geredigeerd in de uitgaande payload. Dit staat los van `INPUT_SANITIZER_MODE` (dat alleen het prompt-injectiebeleid regelt). Wanneer redactie is uitgeschakeld, registreert de oproep detectietellingen zonder de inhoud te herschrijven.
- **`postCall`** kloont de respons diep, voert `sanitizePIIResponse()` uit plus de Responses-API-vorm masker (`maskResponsesOutput` — dekt `output_text` en `output[].content[].text`). Als er redactie plaatsvindt, vervangt de gewijzigde respons de originele.

De guardrail blokkeert nooit; het annoteert (`meta.detections`, `meta.redacted`) of herschrijft alleen.

### Prompt Injectie (`promptInjection.ts`)

Detecteert vijandige structuren in door de gebruiker geleverde inhoud en handhaaft het geconfigureerde beleid. Gedrag wordt bepaald door omgevingsvariabelen en constructor-opties:

| Instelling      | Omgevingsvariabele                                                                                   | Standaard | Effect                                                                                                                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ingeschakeld    | `INPUT_SANITIZER_ENABLED`                                                                            | `true`    | Indien `false`, wordt de guardrail kortgesloten.                                                                                                                                                                                       |
| Modus           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`    | Injectiebeleid: `block`, `warn`, of `log`. (`redact` wordt geaccepteerd voor achterwaartse compatibiliteit, maar verwijdert **niet** de injectietekst; het herschrijven van PII-verzoeken wordt beheerd door `PII_REDACTION_ENABLED`.) |
| Blokkeerdrempel | `blockThreshold` optie / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Minimale ernst vereist om te blokkeren. Medium is standaard alleen observerend.                                                                                                                                                        |

**Modusvoorrang** (`getMode`): aanroeper `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Instellingen →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Een dashboard-override wint daarom van de omgevingsvariabelen, dus de
Feature Flags UI beheert de actieve guard live (geen herstart). De DB-leesactie
is fail-safe: als er een fout optreedt, valt de guard terug op het
omgevingsvariabele-gebaseerde gedrag, en wanneer er geen override is ingesteld,
is het gedrag identiek aan omgevingsvariabele-alleen-resolutie.

Detectiebronnen:

1.  `sanitizeRequest()` van `@/shared/utils/inputSanitizer` (gedeelde
    detectorset die elders in de pijplijn wordt gebruikt).
2.  Ingebouwde `DEFAULT_GUARD_PATTERNS` (momenteel `system_override_inline` en
    `markdown_system_block`, beide `high` ernst).
3.  Optionele `customPatterns` doorgegeven via constructor-opties (strings,
    regex, of `{ name, pattern, severity }` records).

Wanneer `mode === "block"` **en** ten minste één detectie voldoet aan de
ernstdrempel, retourneert `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. In `warn`/`log` modi logt de guardrail, maar
staat de aanroep toe. De gedeelde helper `evaluatePromptInjection()` wordt ook
geëxporteerd voor aanroepers die prompts moeten evalueren zonder via het
register te gaan.

**Scanbereik (v3.8.20):** de detector inspecteert alleen de **eerste 16 KB**
van samengevoegde prompttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384
bytes) in `src/shared/utils/inputSanitizer.ts`. Zowel `detectInjection()` als
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` voordat de
patroonlus wordt uitgevoerd. Injectiedirectieven bevinden zich bovenaan een
invoer, dus dit beperkt regex CPU/GC op payloads van honderden KB's zonder de
detectie te verzwakken (zie #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Wordt uitgevoerd in **beide** fasen, als laatste in de standaardketen
(prioriteit `95`). Redigeert bekende API-sleutel-/geheime-tokenpatronen uit de
uitgaande payload (berichtinhoud, tool-call argumenten, toolresultaten) **en**
de providerrespons, zodat een referentie die in een prompt is geplakt (of
teruggegeven door een toolresultaat) niet wordt gelekt naar de upstream
provider of terug naar de client.

- **Alleen opt-in**, dezelfde conventie als PII-redactie (Hard Rule
  #20-aangrenzend): uitgeschakeld tenzij
  `settings.credentialRedactionEnabled === true` **of**
  `CREDENTIAL_REDACTION_ENABLED=true`. Als het uit staat, is de guardrail een
  no-op — het blokkeert nooit en herschrijft nooit.
- `redactCredentials()` doorloopt de volledige payload/responsboom
  (`walkValue()`, prototype-pollution-veilig, cyclus-veilig via `WeakSet`) en
  vervangt overeenkomsten door een `[REDACTED:<type>]` placeholder, waarbij
  alleen de takken worden gekloond die daadwerkelijk zijn gewijzigd.
- `CREDENTIAL_PATTERNS` omvat LLM-providersleutels (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tokens (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), betaalsleutels (Stripe,
  Square), cloudsleutels (AWS access key, Twilio, SendGrid, Mailgun), private
  sleutels / JWT's, referentie-dragende verbindingsreeksen
  (`mongodb://user:pass@...`, etc.), en een generiek
  `Authorization`/`x-api-key`/`api-key`/`apikey` header-waarde patroon.
  Header-vormige sleutels (`authorization`, `x-api-key`, `api-key`,
  `apikey`) worden structureel geredigeerd (alleen waarde, schema-voorvoegsel
  zoals `Bearer `/`Basic ` behouden) in plaats van via de generieke tekst
  regex.
- De guardrail blokkeert nooit; het herschrijft alleen (`modifiedPayload` /
  `modifiedResponse`) en annoteert (`meta.credentialsRedacted`, `meta.count`).

Regressie guard: `tests/unit/credential-masker-guardrail.test.ts`.

## Basiscontract (`base.ts`)

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
  block?: boolean; // true onderbreekt de keten
  message?: string; // wordt weergegeven bij blokkering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // geretourneerd door preCall om het verzoek te herschrijven
  modifiedResponse?: TValue; // geretourneerd door postCall om het antwoord te herschrijven
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

Een guardrail geeft aan dat er „geen wijziging” is door `void`, `{}` of
`{ block: false }` te retourneren. Het retourneren van een `modifiedPayload`/`modifiedResponse`
vervangt de waarde die door de keten naar volgende guardrails stroomt.
`signal?: AbortSignal` brengt de levenscyclus van de aanroeper over naar guardrails. Het afbreken van een verzoek is de bewuste fail-open-uitzondering: mediabruggen stoppen hun werkzaamheden en ruimen op zonder onbewerkte media terug te zetten voor een doel waarvan bekend is dat het deze niet ondersteunt.

## Register (`registry.ts`)

De singleton `guardrailRegistry` biedt het volgende:

- `register(guardrail)` — voegt een guardrail toe (of vervangt deze op basis van de genormaliseerde naam) en
  sorteert opnieuw op oplopende `priority`.
- `clear()` / `list()` — administratieve hulpfuncties.
- `runPreCallHooks(payload, context)` — doorloopt actieve guardrails, geeft de
  payload via `modifiedPayload` door en stopt bij de eerste `block: true`.
- `runPostCallHooks(response, context)` — dezelfde stroom aan de antwoordzijde.
- `resetGuardrailsForTests({ registerDefaults })` — wist de status en registreert
  optioneel de standaardwaarden opnieuw voor een schone testisolatie.

Beide uitvoerfuncties retourneren `{ blocked, payload|response, results, guardrail?, message? }`,
waarbij `results` een array is van `GuardrailExecutionResult`-records met
de velden `blocked`, `skipped`, `modified`, `error` en `meta` per guardrail,
die nuttig zijn voor tracering.

### Guardrails per verzoek uitschakelen

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` verzamelt een
ontdubbelde lijst met namen van guardrails die voor het huidige verzoek moeten
worden overgeslagen. Bronnen (allemaal optioneel en allemaal samengevoegd):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` in de verzoekbody (op het hoogste niveau)
- `metadata.disabledGuardrails` in de verzoekbody
- Header `x-omniroute-disabled-guardrails` (of verouderde
  `x-disabled-guardrails`)

Waarden kunnen arrays van tekenreeksen of een door komma's gescheiden tekenreeks zijn; namen worden
genormaliseerd naar kebab-case in kleine letters (`pii_masker` → `pii-masker`). Het resultaat
wordt via `context.disabledGuardrails` doorgegeven aan het register, dat
overeenkomende guardrails overslaat (`skipped: true` in `results`).

## Uitvoeringsvolgorde

Voor elk verzoek dat door `src/sse/handlers/chat.ts` en
`open-sse/handlers/chatCore.ts` stroomt:

1. `resolveDisabledGuardrails(...)` stelt de lijst met over te slaan guardrails samen op basis van de API-sleutel, body
   en headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` voert guardrails uit in oplopende
   prioriteitsvolgorde:
   - Uitgeschakelde guardrails worden geregistreerd als `skipped`.
   - De `preCall` van elke guardrail kan de payload herschrijven via `modifiedPayload`.
   - De eerste `block: true` breekt de keten voortijdig af en de handler retourneert
     een afwijzingsrespons van de guardrail.
3. De (mogelijk herschreven) payload wordt doorgegeven aan combinatieroutering en
   upstream-dispatch.
4. Nadat de respons is samengesteld, voert `guardrailRegistry.runPostCallHooks(...)`
   dezelfde keten uit op de respons. `block: true` verwijdert hier de upstream-respons.

Guardrails die een fout veroorzaken, worden geregistreerd met `error: <message>` en gelogd via
`logger.warn`, maar de keten wordt voortgezet — bewust volgens het fail-open-principe.

## Configuratie

Omgevingsvariabelen die door de ingebouwde guardrails worden gelezen:

| Variabele                             | Gebruikt door             | Effect                                                                                                              |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Stel in op `false` om detectie volledig uit te schakelen.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Injectiebeleid: `warn`, `block` of `log`. De verouderde waarde `redact` herschrijft injectietekst niet.             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Modus voor de injectieguardrail; tevens een DB-functievlag die de omgevingsvariabelen **overschrijft** (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimale ernst die door `MODE=block` wordt afgewezen: `high` (standaard), `medium` of `low`.                        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Verouderde alias voor `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Wanneer ingesteld op `true`, worden persoonsgegevens in verzoeken geredigeerd (onafhankelijk van de injectiemodus). |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Bepaalt het gedrag van de masker aan de responszijde.                                                               |

De Modality Bridge-guardrails lezen runtimeconfiguratie uit de DB-gebaseerde opslag voor
instellingen (`getSettings()`), niet uit omgevingsvariabelen. De primaire sleutels van Vision zijn
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` en
`modalityBridgeCacheMaxEntries`. De verouderde
`visionBridge*`-sleutels worden alleen geaccepteerd als de gedocumenteerde terugvaloptie voor één cyclus bij het
lezen; schrijfbewerkingen vanuit het dashboard gebruiken de primaire sleutels. Standaardwaarden en de terugvalresolver
staan in `src/shared/constants/modalityBridgeDefaults.ts`, waarbij verouderde
constanten behouden blijven in `src/shared/constants/visionBridgeDefaults.ts`.

Audio gebruikt `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` en `modalityBridgeAudioMaxClips`, plus de gedeelde
`modalityBridgeCache*`-instellingen. Audio heeft geen terugvaloptie voor verouderde sleutels, omdat deze
sleutels zijn geïntroduceerd met het Modality Bridge-schema.

Video gebruikt `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` en
`modalityBridgeVideoTimeout`, plus de gedeelde `modalityBridgeCache*`-instellingen.
Dit is standaard uitgeschakeld omdat FFmpeg/ffprobe optionele operationele
afhankelijkheden zijn en het maken van bijschriften voor frames extra latentie en modelkosten met zich meebrengt.

## Aangepaste guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Dagbudget overschreden" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Stappen:

1. Maak `src/lib/guardrails/myGuardrail.ts` aan en breid `BaseGuardrail` uit.
2. Implementeer `preCall` en/of `postCall`.
3. Registreer de guardrail tijdens het importeren (door deze vanuit `registerDefaultGuardrails` toe te voegen) of
   roep tijdens runtime `guardrailRegistry.register(...)` aan — het register vervangt
   elke eerdere guardrail met dezelfde genormaliseerde naam.
4. Voeg tests toe onder `tests/unit/` (bestaande voorbeelden:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testen

Gebruik `resetGuardrailsForTests()` tussen tests om vanuit een bekende status te beginnen.
Geef `{ registerDefaults: false }` door om met een leeg register te beginnen en
registreer alleen de guardrails die worden getest. Vision Bridge ondersteunt dependency-
injectie (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge biedt
vergelijkbare injectiepunten voor instellingen, mogelijkheden, selectie van het STT-model,
controle van referenties en transcriptie. Tests kunnen daardoor beide stromen uitvoeren zonder toegang
tot een database of netwerk.

## Zie ook

- `src/lib/guardrails/` — implementatie
- `src/shared/utils/inputSanitizer.ts` — gedeelde detector die
  promptinjectie en maskering van persoonsgegevens mogelijk maakt
- `src/shared/constants/visionBridgeDefaults.ts` — standaardinstellingen voor Vision Bridge en
  lijst met modellen waarvoor de bridge wordt afgedwongen
- `src/shared/constants/modalityBridgeDefaults.ts` — gedeelde standaardinstellingen voor de runtime van Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonale laag (circuitbreaker, afkoelperiodes)
- `docs/reference/ENVIRONMENT.md` — volledige referentie voor omgevingsvariabelen

## Routedekking en red-teamtests voor de injectieguard (Fase 8 · Blok D)

De injectieguard (`createInjectionGuard` / `withInjectionGuard`) dekt alle routes
die gebruikersprompts accepteren. Deze respecteert `INJECTION_GUARD_MODE` (standaard `warn` = alleen loggen;
`block` = retourneert HTTP 400 `SECURITY_001`).

| Type             | Routes                                                                                                                                               | Standaardmodus |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Tekst (bestaand) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generatief       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Gegevens         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Tekstextractie (`extractMessageContents`) ondersteunt `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-teamtests (nachtelijks, `nightly-llm-security.yml`):** promptfoo valideert dat elke route
de OWASP-LLM-corpus blokkeert wanneer `INJECTION_GUARD_MODE=block`; garak voert probes uit (wordt zonder geheim overgeslagen).
`moderations` is voor consistentie opgenomen — operators kunnen deze route in blokkeermodus uitzonderen via
`resolveDisabledGuardrails`.

De nachtelijke workflow (`.github/workflows/nightly-llm-security.yml`, cron + handmatige
activering) heeft twee taken:

- **`promptfoo-guard` (blokkerend)** — voert `promptfoo eval -c promptfooconfig.yaml` uit
  met `INJECTION_GUARD_MODE=block`. Elk vijandig testgeval (bijvoorbeeld "negeer alle
  eerdere instructies…", jailbreaks in DAN-stijl) controleert dat het antwoord
  `error.code === "SECURITY_001"` bevat, wat betekent dat de guard het verzoek daadwerkelijk heeft geweigerd.
- **`garak` (adviserend)** — voert garak `--probes promptinject,dan,leakreplay` uit
  tegen een lokale OmniRoute-instantie (`http://localhost:20128/v1`). Dit is afhankelijk van een
  providergeheim (`PROMPTFOO_PROVIDER_KEY`); zonder dit geheim wordt de taak zonder fouten overgeslagen en
  de opdracht heeft het achtervoegsel `|| true`, zodat er wel wordt gerapporteerd zonder dat CI mislukt.

De dekking van de guardhelper (`createInjectionGuard` / `withInjectionGuard`)
omvat elke `/v1`-route die prompts verwerkt; prompttekst wordt opgehaald uit
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` door
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
