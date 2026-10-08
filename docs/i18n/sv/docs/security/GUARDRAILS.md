# Guardrails (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sanningskälla:** `src/lib/guardrails/`
> **Senast uppdaterad:** 2026-08-29 — v3.8.51 (Video Bridge-transkriptets ursprung deklareras av anroparen,
> ännu inte serververifierat — förtydligat enligt #11661)

Guardrails upprätthåller säkerhet, policy och innehållstransformationer vid gränsen
mellan OmniRoute och uppströmsleverantörer. Varje guardrail kan inspektera (och
valfritt avvisa, transformera eller kommentera) begärans nyttolaster (`preCall`) och
uppströms svar (`postCall`).

Systemet är **fail-open**: om en guardrail kastar ett fel under exekvering,
registrerar registret felet och fortsätter med nästa guardrail istället för att
misslyckas med begäran. Blockering är ett explicit beslut (`block: true`),
aldrig en olycka.

## Inbyggda Guardrails

Registret laddar automatiskt sex guardrails i prioritetsordning vid import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Namn                | Steg           | Fil                   |
| :-------- | :------------------ | :------------- | :-------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lägre prioritetsnummer körs **först**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbrygga PR-1

Fångar upp bildbärande förfrågningar riktade mot **icke-visionsmodeller** och
antingen omdirigerar hela förfrågan till en visionskapabel modell eller
ersätter bilddelarna med textbeskrivningar producerade av en konfigurerbar
visionsmodell före uppströmsanropet. Detta gör att textbaserade leverantörer
transparent kan hantera multimodala nyttolaster.

Flöde:

1.  Hoppa över om målmodellen redan stöder vision (såvida den inte finns med i
    listan över tvingade bryggor `isVisionBridgeForcedModel`).
2.  Extrahera bilddelar via `extractImageParts(messages)`
    (`visionBridgeHelpers.ts`), som delegerar till den **enhetliga
    mediedetektorn** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` —
    den enda sanningskällan som delas med kombokompatibilitetsfiltret.
    Extraktion är tillåten för toppnivådelar av de former som
    `replaceImageParts` kan sätta tillbaka (extrahera↔ersätt-kontraktet):
    OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
    `source.type:"url"`, och Responses API `input_image`. Kapslade träffar och
    endast-indikatorformer är kombofiltermaterial och extraheras aldrig. Hoppa
    över om inga hittas.
3.  Lös upp körtidskonfiguration via `resolveVisionBridgeRuntimeSettings()`
    (`src/shared/constants/modalityBridgeDefaults.ts`): nya
    `modalityBridge*`-inställningsnycklar vinner; äldre `visionBridge*`-nycklar
    förblir en **en-cykels fallback** (återställningsfönster). Hoppa över före
    all mediagenomgång när bryggan är inaktiverad.
4.  Lägesväljare (`modalityBridgeVisionMode`, se tabellen nedan) bestämmer
    omdirigering kontra beskrivning. Omdirigering returnerar `modifiedPayload`
    med endast `model` utbytt, plus meta
    `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Beskrivningsväg: begränsa bilder till `maxImages`, komponera den
    uppgiftsmedvetna prompten, konsultera beskrivningscachen, anropa
    visionsmodellen **parallellt** (`Promise.allSettled`), och injicera
    `[Bild N]: <beskrivning>` textdelar i deras ställe. En misslyckad
    beskrivning ger `null` och den ursprungliga bilddelen **bevaras** (#4012)
    — utom på kombinationsbeskrivningsvägen när varje beskrivning misslyckades,
    där en bekräftad icke-visionsuppströms får en
    `(otillgänglig — ingen visionskapabel leverantör ansluten)` stub istället
    (#8430).
6.  Returnera `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
    `processingTimeMs`, `visionModel`).

#### Lägesväljare (`modalityBridgeVisionMode`)

| Läge       | Standard | Beteende                                                                                                                                                                                                                                                                                   |
| :--------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Äldre heuristik, orörd (#6640/#7204): icke-kombo/`auto/`-modeller omdirigerar till den bästa visionsmodellen om inte den ursprungliga modellen redan har användbara autentiseringsuppgifter (då beskrivs); kombomål beskriver alltid.                                                      |
| `describe` |          | Beskriv alltid — omdirigeringsblocket hoppas över helt; användarens valda modell svarar alltid.                                                                                                                                                                                            |
| `reroute`  |          | Tvinga omdirigering: skyddet för att behålla autentiserade modeller kringgås. Omdirigerings-**målets** autentiseringsskydd gäller fortfarande — när inget användbart visionsmål finns, faller begäran igenom till beskrivning så att råa bilder aldrig når en textbaserad backend (#8430). |

Tvingade lägen kortsluter **innan** auto-heuristiken körs; `auto`-beteendet är
byte-identiskt med pre-PR-1 guardrailen.

#### Uppgiftsmedveten beskrivningsprompt (`modalityBridgeVisionTaskAware`)

Standard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lägger
till texten från det **senaste användarmeddelandet** (trunkerat till 500
tecken) till den grundläggande beskrivningsprompten, vilket styr beskrivningen
mot vad användaren faktiskt frågade (codex-vision-proxy-mönster) och ber
visionsmodellen att transkribera synlig text. Med flaggan avstängd — eller
ingen användartext — används den grundläggande prompten oförändrad.

Beskrivningens egen OpenAI-kompatibla förfrågan (`callVisionModelSingle()` i `visionBridgeHelpers.ts`) begär alltid `image_url.detail: "high"` – ovillkorligt, för varje anropare/leverantör, inte begränsat av någon klientsignal. Samplingsmetoder med låg detaljgrad försämrar OCR-noggrannheten för just den texttranskriptionsuppgift som denna prompt begär, så beskrivningsanropet i sig begär alltid hög detaljgrad oavsett vilken detaljnivå den ursprungliga inkommande förfrågan använde. Detta påverkar endast den interna beskrivningsförfrågans brödtext; det ändrar inte hur OmniRoute vidarebefordrar anroparens egen `image_url.detail` i den primära förfrågan – den standardinställningen tillämpas separat, och endast för upptäckta OpenCode-klienter, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic wire-format-grenen av beskrivningens självloop har inget `detail`-fält och påverkas inte av någon av standardinställningarna.

#### Beskrivningsutdatagräns (`modalityBridgeVisionMaxChars`)

| Nyckel                         | Standard | Område              |
| :----------------------------- | :------- | :------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` eller 100–50000 |

`0` (standard) betyder **ingen gräns** – beskrivningen som returneras av `callVisionModel()` skickas vidare oförändrad, vilket bevarar det befintliga beteendet. Alla värden i intervallet 100–50000 trunkerar beskrivningen med ett `…`-suffix innan den infogas som `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Höj detta för detaljrika OCR-uppgifter där den nedströmsmodellen behöver hela transkriptionen; sänk det för att begränsa tokenanvändningen på pratsamma visionsmodeller. Dashboardfältet finns på fliken Vision, under panelen Avancerat (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) och klämmer alla värden mellan 1 och 99 upp till golvet 100 samtidigt som ett explicit `0` lämnas orört – `0` är ett giltigt Zod-värde i sig (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), inte bara standardvärdet "ej inställt".

#### Beskrivningscache (`modalityBridge/bridgeCache.ts`)

LRU + TTL-cache i minnet för beskrivningsutdata, delad processövergripande. Nyckel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med längdprefix-inramning (inga fältgränskollisioner). Modellkomponenten är den **konfigurerade** bryggmodellen, inte den modell som faktiskt svarade – `callVisionModel` kan falla tillbaka internt, och nyckling per försök skulle fragmentera cachen. Misslyckade beskrivningar cachas aldrig. Inställningar:

| Nyckel                          | Standard | Område  |
| :------------------------------ | :------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalisering av fjärrbilder (självloop-beskrivning/base64-hämtning)

När bryggan själv hämtar en **fjärrbild** – Anthropic-beskrivningens självanrop och claude-wire-format base64-konverteringen (`ensureBase64ImagesForClaudeWire`), båda via `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` – skickas den resulterande data-URI:n genom `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) innan den bäddas in i visionsmodellförfrågan. Överdimensionerade bilder skalas ner till en **2048px lång kant** (vilket matchar den storleksbegränsning som OpenAI/Anthropic redan tillämpar på serversidan), vilket minskar uppladdningsbyte/latens utan att ändra vad visionsmodellen ser. Storleksändring använder `sharp`, laddad via dynamisk import: på en plattform där dess inbyggda binärfil inte kan laddas, **kastar `normalizeDataUri()` aldrig ett fel** – den faller tillbaka till en genomströmning av de ursprungliga byten, så beskrivnings-/base64-konverteringsvägen fortsätter alltid att fungera. Icke-bildbyten (en hämtning som inte returnerade en avkodningsbar bild) skickas också vidare orörda. Denna normalisering är begränsad till bilder som bryggan hämtar för sitt eget självanrop – den tillämpas aldrig på anroparens råa genomströmning, i enlighet med principen om endast opt-in-mutation (Hård Regel #20).

#### Inställningsschema + migrering

De nya `modalityBridge*`-nycklarna Zod-valideras i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-trion, och `modalityBridgeAudio*`-gruppen som används av Audio Bridge. Migrering `141_modality_bridge_settings.sql` kopierar befintliga äldre `visionBridge*`-värden till de matchande nya nycklarna (idempotent, skriver aldrig över ett operatörsinställt `modalityBridge*`-värde); de äldre nycklarna accepteras som en läs-fallback under en releasecykel.

#### Transparensrubrik + statistik

Beskrivningsomvandlade svar innehåller `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (byggd av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stämplad av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Omdirigerade förfrågningar får **ingen** rubrik – nyttolasten var orörd och modellbytet är redan synligt i svarsbrödtextens `model`-fält.

`GET /api/modality-bridge/stats` (hanteringsautentisering, samma nivå som `GET /api/settings`) returnerar de minnesbaserade räknarna per modalitet `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` för `vision`, `audio` och `video`. `averageLatencyMs` använder `latencySamples`, inte alla försök, som sin nämnare; en operation utan tidsmätning skapar inte ett nollmillisekundsprov. `bridged` förblir det bakåtkompatibla aliaset för lyckade konverteringar; misslyckade försök ökar inte det. Räknare återställs vid processomstart enligt design (telemetri, inte bokföring).

#### Dashboardkonfiguration

Den dedikerade instrumentpanelssidan är
`/dashboard/settings/modality-bridge`. Dess URL-adresserbara flikar `Vision`, `Audio`
och `Video` bevarar frågeparametrar samtidigt som `tab`-värdet ändras.
Fliken Vision exponerar aktivering, läge, modellval (inklusive det automatiska
standardvärdet), uppgiftsmedveten prompting, avancerade tidsgräns-/bild-/beskrivningslängd-/cache-
gränser, körtidsräknare och en skyddad exempelförfrågan. Fliken Audio är också live: den exponerar
aktivering, en STT-endast modellväljare med Auto, tidsgräns-/max-klippgränser, ljudräknare
och ett `input_audio`-exempeltest. Fliken Video är funktionell: den rapporterar
FFmpeg/ffprobe-körtidsstatus – ett av fyra explicita UI-tillstånd (`unknown` medan
sonden pågår eller inte kunde slutföras, `restricted` på en icke-loopback
instrumentpanelvärd där sonden hoppas över på klientsidan, `unavailable` när den har sonderats
och bekräftats saknas, eller `available` med FFmpeg/ffprobe-versionerna) – bevarar
aktivera/modell/ram/video/tidsgränsgränser, filtrerar modellväljaren till vision-kapabla
modeller och exponerar videoräknare.

Det tidigare Vision Bridge-kortet under AI-inställningar är en kompatibilitetslänk till den
nya sidan; den äger inte längre en andra kopia av formuläret. Medieleverantörer länkar också
bild-till-text- och tal-till-text-arbetsflöden till motsvarande Modality Bridge-flikar
utan att ta bort den befintliga tal-till-text-lekplatsen.

**Självloop-åtkomstförbikoppling:** när beskrivningsanropet dirigeras via OmniRoutes
egen `/v1` självloop (icke-standardiserad leverantörsmodell), skickar underförfrågan
`x-omniroute-admission-bypass: internal` och autentiseras med den lösta
självloop-autentiseringen – den lokala `sk_omniroute`-sentinellen i lokalt läge, eller den
operatörskonfigurerade `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` miljönyckeln (#1350) så att
`REQUIRE_API_KEY=true`-distributioner fortfarande kan köra beskrivningsanropet. Förbikopplingen
respekteras endast för dessa exakta autentiseringar, så externa klienter kan inte använda
rubriken för att hoppa över åtkomst.

Äldre standardvärden finns i `src/shared/constants/visionBridgeDefaults.ts`; de
nya läges-/uppgiftsmedvetna/cache-standardvärdena och inställningslösaren finns i
`src/shared/constants/modalityBridgeDefaults.ts`. Skyddsräcket exponerar ett
`deps`-konstruktoralternativ så att tester kan injicera falska `getSettings`- och
`callVisionModel`-implementeringar.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fångar upp ljudbärande chattförfrågningar innan de når ett mål som inte
är känt för att acceptera ljudinmatning. Den omdirigerar aldrig chattförfrågan: ljuddelar
transkriberas via den befintliga OpenAI-kompatibla multipart-slutpunkten och den
valda chattmodellen fortsätter med texttranskriptioner.

Flöde:

1. Lös `supportsAudio` via `getResolvedModelCapabilities()`. Explicit
   leverantörsregistermetadata vinner, sedan statisk modellmetadata, sedan synkroniserade
   `modalities_input`. En deklarerad inmatningslista utan `audio` är `false`; ingen
   kapacitetsbevis förblir `null`. Både `false` och `null` aktiverar den
   konservativa bryggan, medan `true` kringgår den.
2. Lös `modalityBridgeAudio*`-inställningar och extrahera delbara ljuddelar på toppnivå
   från varje meddelande via den delade `detectMediaParts()`-detektorn.
   Stödda trådformer är OpenAI `input_audio`, `audio_url` och
   `source.media_type: "audio/*"`. Kapslat ljud detekteras för routing men tas inte
   bort av splice-sökvägen. Arbetet begränsas av `modalityBridgeAudioMaxClips`;
   senare delar förblir orörda.
3. Respektera en konfigurerad `provider/model`, eller låt `selectAudioBridgeModel()` gå igenom
   `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogordning och välj den första
   modellen med en användbar aktiv leverantörsautentisering.
4. `callAudioTranscription()` konverterar base64/data-URI-ljud till en multipart
   `file`, eller laddar ner en fjärransluten `audio_url` via den endast offentliga utgående
   skyddsräcket med DNS-pinning och en 25 MB-gräns. Den POSTar sedan filen och den valda
   modellen till den lokala `/v1/audio/transcriptions`-självloopen, autentiserad med
   `resolveSelfLoopBearer()`. Den befintliga transkriptionsrutten utför normal
   autentiseringsuppslagning, cooldown/rate-limit-hantering och leverantörsutskick.
5. Framgångsrika anrop ersätter sina delar med `[Audio N]: <transcript>`. Anrop
   körs med `Promise.allSettled`: ett individuellt fel bevarar den ursprungliga
   ljuddelen (#4012-kontrakt). Om varje anrop misslyckas och målet bevisligen
   `supportsAudio === false`, blir delarna
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakt). För
   ett okänt mål (`null`) förblir ett all-failure-resultat orört. Ett bevisat
   text-endast-mål med ingen användbar STT-autentisering får samma explicita
   stub utan att utfärda ett nätverksanrop.

Framgångsrika transkriptioner använder processens Modality Bridge LRU/TTL-cache. Nyckeln
kombinerar ljudreferensen, den stabila `audio-transcription`-operationsetiketten
och den valda STT-modellen; misslyckanden cachas aldrig. Ljudförsök uppdaterar
de delade `bridged`, `cacheHits`, `failures` och `lastUsedAt`-räknarna.
Transformerade svar bär
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; orörda
förfrågningar får inget Audio Bridge-segment.

Körtidsinställningar är DB-stödda och Zod-validerade:

| Nyckel                        | Standard | Område            |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delade cachen förblir kontrollerad av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` och `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fångar upp videodelar på toppnivå i Chat Completions `messages` och Responses API `input` innan ett mål utan känt inbyggt videostöd anropas.
De former som stöds är `input_video`, `video_url`, `video_source`, HTTPS-URL:er,
och `data:video/*;base64,...` data-URI:er. Vanliga filnamn i text behandlas inte
som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) hanterar begärans genomgång,
kapacitets-/policykontrollen, aggregering per begäran och svarsnyttolasten.
Arbete per video — inhämtning, hela-resultat-cachen, beskrivning av en bildsekvens
(som sammanfogar eventuell anropsdeklarerad ljudtranskription), och mätvärden/avbryt/rensning
per försök — är dold bakom `processVideoPart` i `videoBridgePipeline.ts`,
anropas en gång per videodel inuti `preCall`s loop.
Den modulen definierar också de explicita portgränserna `VideoMediaBrokerPort`
(inhämtar byte och extraherar samplade bildrutor), `VideoAudioTranscriptionPort`
(sammanfogar en anropsdeklarerad ljudtranskription med de samplade bildtexterna), och
`VideoDrilldownPort` (gränsen för bildrutans detaljgranskning; ännu inte kopplad
till `processVideoPart` — endast den separata `/api/modality-bridge/video/drilldown`-vägen
skriver detaljgranskningsposter idag).

Den publika `/v1`-begäransvägen importerar eller anropar aldrig en underprocess. Fjärr-videor
laddas ner under en gräns på 50 MiB; inbäddade base64-videor har en
konservativ avkodad gräns på 36 MiB per video så att modell-/meddelande-/inramningskuvertet
kan hålla sig inom den publika JSON-begäransgränsen på 50 MiB. Uppskattningar
av inbäddad längd och avkodad storlek kontrolleras före allokering. HTTPS
krävs för den initiala fjärr-URL:en och varje omdirigering, med hjälp av det
befintliga utgående skyddet endast för publika adresser med DNS-pinning. Byten korsar
sedan den exakta interna `POST /api/modality-bridge/video/extract`-mäklargränsen.
Den vägen är både `LOCAL_ONLY` och `SPAWN_CAPABLE`, accepterar endast en per-process
autentiserad, betrodd loopback-begäran, och accepterar aldrig en URL,
filsystemssökväg, körbar fil eller argumentlista. API:ets pipeline för kroppsstorlek
och hanterarens inkrementella kroppsläsare upprätthåller oberoende en
mäklarinmatningsgräns på 50 MiB. Dess begränsade kö kör en extraktion i taget,
tillåter fyra väntande jobb och begränsar väntande inmatning till 100 MiB.

Inuti mäklaren läser `ffprobe` en privat lokal fil; den fasta format-tillåtelselistan
exkluderar spellist- och manifestformat. För tillåtna MOV-familjecontainrar
förblir externa MOV-datareferenser inaktiverade som standard, och det fasta
kommandot väljer inte att använda dem. Både `ffprobe` och `ffmpeg` använder
protokoll-vitlistan endast för `file`, en tråd, fasta argumentmatriser, ingen shell,
och körbara filer som löses från `PATH`. Bifogade bild-omslagsströmmar är inte
spelbara kandidater. Alla spelbara strömmar måste uppfylla gränserna, och en
explicit standardström föredras före den deterministiska lägsta-index-återgången.
Videor är begränsade till 600 sekunder, 8 192 pixlar per dimension och
33 554 432 källpixlar. FFmpeg samplar 1–16 JPEG-bildrutor i mitten, skalar ner
den långa kanten till högst 1 024 pixlar utan att uppskala mindre inmatningar,
och tar aldrig emot en URL. Sampling är `uniform` som standard. De valfria
`scene_aware` och experimentella `segment_aware` policyerna utför ett ytterligare
fast FFmpeg-pass över den redan validerade lokala strömmen, väljer begränsade
`showinfo`-scentidsstämplar, och återgår deterministiskt till samma enhetliga
mittpunkter vid detektorfel, timeout, felaktig utdata eller en tom kandidatuppsättning.
Segmentmedvetet läge allokerar mittpunktssamplingar proportionellt till de validerade
scenintervallen; segmentmedveten bevisföring och återgångsbeteende beskrivs nedan.
Den hårda gränsen på 16 bildrutor tillämpas efter val i varje policy. När en
scenmedveten begäran endast har en bildrutebudget, använder den den enhetliga
mittpunkten för det aktiva helvideo- eller fokusfönstret och rapporterar
`policyEffective: uniform`: en enda vald scenbildruta kan inte bevara båda
temporala ändar. En anropare kan valfritt tillhandahålla ett ändligt fokusfönster
(`start`/`end` sekunder); gränserna kläms till mediets varaktighet, omvända
eller icke-ändliga fönster avvisas, och alla samplingspolicyer utförs endast
inom det normaliserade intervallet. Det resulterande fönstret inkluderas i
samplingsmetadata och i det opålitliga beskrivningsprefixet så att nedströmsmodeller
kan skilja ett fokuserat utdrag från hela tidslinjen.

Semantisk bildtextfokus är en separat, explicit inställning. Standardläget `full`
analys bevarar den befintliga bildruteprompten och vidarebefordrar aldrig begäranstext
till bildtextmodellen. I `focused` läge läser bryggan endast den senaste icke-tomma
användarutformade `text`/`input_text` från samma Chat- eller Responses-behållare,
normaliserar den till NFC, kollapsar kontrolltecken och blanksteg, och begränsar
den till 500 Unicode-kodpunkter. Ett tomt resultat återgår till den exakta `full`-prompten.
En användbar ledtråd serialiseras som JSON i ett dedikerat block för opålitlig
användarkontext och får endast prioritera observerbara detaljer; den kan inte
åsidosätta den separata varningen mot att följa instruktioner som är synliga
eller hörbara i mediet. Textuell fokus härleder aldrig `start`/`end` eller
ändrar den temporala samplaren.

#### FU-07 strukturell segmentbevisning

`segment_aware` använder ett begränsat föranalyspass över den redan validerade
lokala videoströmmen. Den fasta filterkedjan skalar först till högst 320 pixlar
bred, upptäcker scenförändringar och frysta intervaller, samplar sedan med 1
bildruta per sekund för oskärpa, genomsnittlig luma och spatial/temporal information.
Passet är begränsat till 600 strukturella samplingar, en FFmpeg/filtertråd,
samma protokoll- och container-tillåtelselistor endast för `file`, en 1 MiB
processutdatagräns, och högst 30 sekunder inom mäklarens delade avbryt-/tidsgräns.
Den accepterar aldrig ett kommando, filter, sökväg eller URL från begäran.

De strukturella värdena är deterministiska samplingbevis, inte semantisk
videoförståelse. De härleder inte ämnen, handlingar, bildtexter, tal eller
användarintention. Scen- och frysningsgränser bildar segment; frysnings-
täckning, oskärpa, exponering, rumslig detalj och tidsmässig förändring
påverkar endast hur den befintliga budgeten på 1–16 bildrutor fördelas. Ett
helt fryst segment är begränsat till en bildruta, medan ofrysta segment
konkurrerar om den återstående budgeten. När gränserna överstiger antalet
bildrutor bibehålls en enhetlig tidslinjetäckning så att snabba tidiga klipp
inte kan dölja ett långt efterföljande segment. Scengränser inom 1-sekunds
analysupplösningen för en frysningsgräns slås samman.

Saknade filter, felaktiga/tomma bevis, ett detektorfel eller den begränsade
föranalys-timeouten misslyckas öppet till den exakta enhetliga mittpunkts-
policyn. En anropares avbrott eller en mäklares deadline misslyckas inte
öppet: det avslutar den pågående underprocessen, förhindrar senare
bildrutextraktion, och det privata temporära trädet tas bort i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererar deterministiska verkliga
FFmpeg-fixturer för besparingar vid bildtextanrop efter deduplicering,
budgetallokering för tät rörelse, bevis för oskärpa/exponering/SI-TI,
snabba klipp med en lång svans och falska positiva resultat vid gradvis
nedtoning. Den registrerar väggtid för föranalys och, där `/usr/bin/time`
är tillgängligt, barn-CPU och topp-RSS. Dess kvalitetskontroller är endast
strukturella orakel. Verklig bildtextmodellkvalitet förblir `HOLD` eftersom
denna testbädd inte har någon auktoriserad slutpunkt eller frusen domare.
Monetära besparingar förblir också `HOLD` om inte `--caption-cost-per-call-usd`
tillhandahåller en explicit positiv uppskattning per anrop; skriptet
fabrikerar aldrig något av resultaten.

Varje bildruta är begränsad till 4 MiB, alla råa bildrutor tillsammans till
23 MiB, och det serialiserade mäklar-svaret till 32 MiB. En privat temporär
katalog tas bort i `finally`. OmniRoute paketerar inte FFmpeg och accepterar
inte en anpassad körbar sökväg. Före bildtextning tillämpar bryggan ett
konservativt visuellt dedupliceringssteg: varje JPEG reduceras till en
16×16 gråskale-buffert och jämförs endast med den senast behållna bildrutan.
För en begärd bildtextbudget över en bildruta, tillhandahåller extraktionen
en begränsad kandidatpool på upp till dubbla den budgeten och aldrig mer än
16 bildrutor. Det begärda taket tillämpas först efter deduplicering, med de
första och sista valda kandidaterna bevarade under slutlig gallring när
budgeten är minst två. Den versionerade
`grayscale-16x16-mean-cells-v2`-policyn använder det större av medel-luma-delta
och förhållandet mellan miniatyrbildsceller vars normaliserade delta är minst
0,05. Duplikat-tröskeln är den konstanta 0,04, vald för förutsägbarhet snarare
än exponerad som en körtidsinställning. Denna sekundära högkontrast-signal
bevarar små rörelser och synliga textförändringar som en jämförelse endast
med medelvärde kan dölja. Jämförelse- eller avkodningsfel misslyckas öppet
och behåller täckningen. Utdata-metadata separerar extraherade kandidater,
framgångsrikt använda bildrutor och visuella dubbletter som har släppts.

En explicit markerad videodel kan begära ett tidsstämplat kontaktark. Bryggan
bygger som mest ett 4-kolumns, 16-bildrutors JPEG-rutnät. Varje 512-pixelcell
bränner sin källtidsstämpel i ett högkontrast-bottenband, medan samma
tidsstämplar finns kvar i textuell metadata för efterföljande association och
granskning. Den kompletta JPEG-filen förblir begränsad till 32 MiB. Om `sharp`
inte kan avkoda eller komponera rutnätet, faller bryggan tillbaka till de
individuella JPEG-bildrutorna; ett klientavbrott sprids fortfarande genom
arkoperationen.

Bevis för befordran är medvetet åtskilt från det syntetiska kompositions-
mikrobenchmark-testet. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definierar en schema-versionerad A/B-testbädd för verkliga OpenAI-kompatibla
visionsmodeller. Den mäter leverantörsrapporterade tokens, end-to-end
vägglatens (inklusive arkkomposition), antal modellanrop och manifest-
definierad faktabehållning. Råa modellsvar skrivs inte till rapporten;
endast SHA-256-digest och matchade fakta-ID behålls. Testbädden gör inga
nätverks- eller betalda modellanrop om inte `--execute-real` skickas och
`--model`, `OMNIROUTE_BASE_URL` och `OMNIROUTE_API_KEY` är konfigurerade.
Utan den explicita verkliga körningen förblir dess maskinläsbara dom `HOLD`;
syntetiska nyttolast-/anropsmätningar är inte ensamma bevis för befordran.

Anropare kan bifoga en valfri `transcript.cues`-array till en stödd videodel
när de redan har justerad text. Varje cue måste innehålla `text`, ett ändligt
`start`/`end`-intervall inom den undersökta varaktigheten, och en vitlistad
`source` (`client`, `embedded` eller `audio-bridge`); `confidence` är
standard `1` och måste ligga mellan `0` och `1`. Exakta dubbletter av cues
kollapsas. OmniRoute startar aldrig transkription från denna metadata:
validerade cues kopieras till det beskrivna resultatet med källa,
konfidens och intervall, och återges som opålitliga observationer
tillsammans med bildtexten. Ogiltig, utom räckhåll eller ursprungslös text
avvisas snarare än att blandas in i bildtextströmmen. Fältet `source` är
för närvarande anropardeklarerat, inte serververifierat: OmniRoute ser till
att värdet är en av de tre tillåtna strängarna, men bekräftar ännu inte
kryptografiskt att en `embedded` eller `audio-bridge`-etikett faktiskt
kom från en serverägd extraktion. Behandla `source` som en opålitlig
ledtråd tills den verifieringen är på plats; bygg inte auktoriseringsbeslut
på den.

En avancerad anropare kan tillhandahålla ett redan auktoriserat `audioTranscript`-spår för samma video. Fusionssömmen kör visuella och ljudobservationer under en gemensam tidsfrist och avbrytningssignal, ordnar dem på en gemensam tidslinje, slår ihop exakta dubbletter och rapporterar ett partiellt resultat när endast en sida lyckas. Ett ogiltigt `audioTranscript` degraderas till det partiella resultatet – den visuella beskrivningen behålls och ljudgrenen registrerar en sanerad felkod – istället för att hela videon misslyckas. Tillgänglighet per gren, den partiella flaggan och de sanerade felkoderna bevaras i det beskrivna resultatet, i guardrail-metadata (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), i result-cache-metadata och i bryggans fusionsräknare. Standardvägen för Video Bridge anropar inte tal-till-text eller laddar ner en andra mediekopia; utan det explicita spåret förblir den endast video.

**Transkriptionsbevarande (#12150 P1).** Detta tillämpas automatiskt när Video Bridge (som i sig är opt-in) renderar en transkriptionsmarkör – det finns ingen separat bevarandeflagga. När en begäran renderar någon transkriptionsmarkör (en anropardeklarerad `transcript` eller ett sammanslaget `audioTranscript`), markerar guardrailen den som `videoBridgeObserved` och producerar en redigerad skugga av videobeskrivningen – en identisk rendering där varje markörs fritextinnehåll ersätts med `[redacted-video-transcript]`, byggd genom att ersätta det strukturerade markörfältet innan strängen sätts ihop (aldrig genom att parsas den platta texten, så inget markörinnehåll – fientligt eller vanligt, inklusive innehåll som innehåller `]` som `[inaudible]`/`[music]` – kan överleva). Den beständiga anropsloggens begärandekropp byter ut varje videobaserad textdel mot den redigerade skuggan, matchad genom innehållslikhet; `fullText`-ankaret läses om från den färdiga pre-call guardrail-nyttolasten, så matchningen lyckas fortfarande efter att senare kedje-guardrails (PII- och autentiseringsmaskerarna, prioriteter 10/95) skriver om beskrivningstexten på plats och efter att system-prompt/handoff/memory-injektion omformar meddelandearrayen. Kroppen som skickas uppströms till modellen är oförändrad. En observerad begäran fyller inte heller någon beständig Memory (både begäran- och svarsbaserad extraktion hoppas över), så modellens eget svar kan inte upprepa transkriptionstext till Memory.

Ytterligare bevarade kopior använder samma signal för observerad begäran. Den råa klientbegärans ögonblicksbild före guardrail, den minnesinterna väntande begäran och den tidiga loggen för avvisade begäranden ersätter strukturellt transkriptionsfält i videodelar; strängprompter som syntetiseras av pipeline-steg och kontexthandoff redigeras vid den beständiga begärandekroppens mottagare. Den beständiga `video_content_removed`-markören gör att `previous_response_id`-fortsättningen misslyckas stängd istället för att rekonstruera text som avsiktligt kasserats. Om en observerad begäran förlorar sin per-del-redigeringsskugga före loggning, eller om till och med en av flera videoskuggor inte matchar efter senare begäransmutationer, utelämnas den bevarade begärandekroppen helt istället för att behålla en delvis redigerad transkription.

För en observerad begäran kan ett modellsvar citera vilken del av transkriptionen som helst utan en strukturerad markörgräns. Dess beständiga anropslogg `responseBody` ersätts därför med en utelämnandemarkör; den detaljerade pipeline-artefakten (som kan inkludera uppströms/klientkroppar och strömbitar) bevaras inte. Semantiska, idempotens- och resonemangs-replay-cacher kringgår läsningar och skrivningar för den begäran. Leverantörsbegäran och klient-synliga svar förblir oförändrade. Tidiga keepalive-byte dräneras från den temporära bufferten när den detaljerade artefakten utelämnas. Kiros varningsmeddelande för felaktig EventStream rapporterar endast nyttolastens byteantal, aldrig dess innehåll eller JSON-parserns råa fel. Detta hävdar inte att varje orelaterad leverantörs-/plugin-diagnostik har granskats; den bredare rensningen av bevarade mottagare spåras i #11658.

Den interna `/api/modality-bridge/video/drilldown`-livscykeln är ett separat, loopback-/token-autentiserat cache-substrat. Varje operation kräver också ett kanoniskt opakt huvud-ID (principal ID). Innan en produktionsanropare aktiveras måste den härleda det ID:t från den autentiserade klienten och får aldrig vidarebefordra ett klientvalt värde. Cache-nycklar binder den principalen till kanoniska sessions- och videoreferens-ID:n, lagrar endast deras SHA-256-härledda nycklar och begränsar både läsningar och radering till samma principal. Cachen lagrar högst 16 härledda JPEG-ramar per post, låter dem förfalla efter tio minuter och stöder begränsade `start`/`end`-läsningar eller explicit sessionsradering.

Varje principal är begränsad till 16 poster och 64 MiB kanonisk JPEG-data. Dessa gränser är oberoende av det globala taket på 64 poster/256 MiB: kvotpress från en principal avlägsnar endast den principalens minst nyligen använda poster innan global LRU-avlägsning övervägs. Förfallna poster rensas från både principal- och global redovisning vid cacheaktivitet, medan avbrytning och valideringsfel inte utför en partiell ersättning.

Cachen avvisar icke-kanonisk Base64, överflödig utfyllnad, icke-JPEG-media, felaktiga eller trunkerade JPEGs, och JPEGs som producerar en varning under en begränsad fullbilds `sharp`-avkodning. Den omkodar varje accepterad bild som en kanonisk JPEG, härleder bredd och höjd från de avkodade byten istället för att lita på anroparens fält, och kasserar eventuella efterföljande polyglot-byte istället för att behålla dem. Endast den begränsade kanoniska komprimerade bufferten debiteras båda kvoterna. JSON-trådgränsen inkluderar Base64-overhead för det avkodade inmatningstaket på 32 MiB. Varje lagrad härledning registrerar sitt validerade JPEG-format/upplösning, samplingspolicy, härledningsversion, skapandetid, serverberäknade innehållshash och hashade föräldrareferens plus den betrodda anroparens föräldrainnehållshash. Avbrytning kontrolleras mellan asynkrona avkodnings-/hash-faser före den atomära cache-commit.

Denna del ansluter ännu inte en produktionsproducent till rutten och tillhandahåller inte val av varianter med flera upplösningar. Den transparenta Video Bridge-förfrågningsvägen medför därför inget extra arbete, medan hyresgästbunden huvudderivering och den fullständiga FU-08-livscykeln för flera upplösningar förblir explicit uppföljningsarbete snarare än dokumenterat som komplett beteende.

Bilder textas sekventiellt med den konfigurerade Video-modellen. En tom Video-åsidosättning ärver Vision-inställningen; om båda är tomma, väljer Vision-autoroutern den effektiva synkapabla modellen. Lyckade bildtexter ersätter den ursprungliga delen med ett stabilt `[Video description:`-prefix som också markerar texten som en opålitlig mediaderiverad observation och talar om för nedströmsmodeller att inte följa instruktioner som finns i mediet. Cache-nycklar för bildtexter inkluderar JPEG-byte, prompt, tidsstämpel och effektiv modell; endast lyckade bildtexter cachas. Cache-poster behåller den faktiska framgångsrika producentmodellen, inklusive en fallback-modell; bryggan rapporterar `mixed` när olika bilder producerades av olika modeller. En cache-träff återanvänder den producentidentiteten istället för att omklassificera den som den begärda routingplanen. Hela-video-resultatcachen är nycklad på varje indata som ändrar utdata — prompt, effektiv modell, samplingspolicy, bildantal, semantisk analysläge, SHA-256-fingeravtrycket av den normaliserade fokusledtråden, fokusfönster, `transcript`, `audioTranscript` och kontaktarkflaggan — så att ändra någon av dessa dimensioner är en cache-miss, aldrig en inaktuell återanvändning. Den visuella dedup-policyversionen, tröskeln och det begränsade antalet kandidatbilder är också explicita i resultatcache-nyckeln och metadata; en policyändring kan därför inte återanvända en inaktuell hel-video-beskrivning. Resultatcache v4-metadata behåller läget och fingeravtrycket, aldrig den råa användaruppgiften. Guardrail-metadata rapporterar både de begärda och effektiva analyslägena; ett begärt `focused`-läge utan användbar användartext rapporteras som effektivt `full`.

Guardrailen extraherar varje stödd videodel men beskriver inte fler än `modalityBridgeVideoMaxVideos`. För ett mål som bevisats ha `supportsVideo === false`, blir misslyckade och över-gränsen-videor explicita säkra textmarkörer så att ingen rå video överlever. När kapaciteten är okänd förblir dessa delar orörda. Mål med `supportsVideo === true` kringgår bryggan. Klientförfrågans avbrytningssignal sprids genom nedladdning, mäklarkö, underprocesser och bildtextanrop; avbrott stoppar mellan videor och misslyckas aldrig med att öppna för rå media.

Körtidsinställningar är DB-stödda och Zod-validerade:

| Key                                 | Default     | Range / behavior                                                                                      |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valfri körtid, opt-in                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarar generiska bildtexter; `focused` använder begränsad, opålitlig senaste-användar-kontext |
| `modalityBridgeVideoModel`          | `""`        | Ärver Vision Bridge-modellen                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, eller proportionell `segment_aware`; detektorfel återgår till `uniform`     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Äldre sparade Video-timeoutvärden över 120 sekunder begränsas till mäklarens tidsfrist; nya inställningsskrivningar över den gränsen avvisas. `GET /api/modality-bridge/video/runtime` kräver betrodd stämplad loopback-lokalitet före autentisering eller körtidsprobning, och kräver sedan hanteringsautentisering. Den returnerar endast `available`, sanerade FFmpeg/ffprobe-versioner och en fast anledning när körtiden är otillgänglig. Den interna extraktionsslutpunkten är inte ett offentligt uppladdnings-API: kömättnad returnerar `503` plus `Retry-After`, en anropare-frånkoppling returnerar `499`, och den fasta mäklarens tidsfrist returnerar `504`. Konverterade svar lägger till `video->text;model=<visionModel>;parts=<videos>` till den centrala `x-omniroute-modality-bridge`-headern utan att ta bort Vision- eller Audio-segment.

### PII-maskerare (`piiMasker.ts`)

Körs på **båda** stadierna.

- **`preCall`** klonar nyttolasten, går igenom `system`, `messages`, `input` och `prompt` (inklusive vanliga strängobjekt), och tillämpar `processPII()` (från `@/shared/utils/inputSanitizer`) på strängfälten `content`/`text`. När `PII_REDACTION_ENABLED=true` är aktiverat, redigeras upptäckt PII i den utgående nyttolasten. Detta är oberoende av `INPUT_SANITIZER_MODE` (som endast styr prompt-injektionspolicyn). När redigering är avstängd, registrerar anropet antalet upptäckter utan att skriva om innehållet.
- **`postCall`** djupklonar svaret, kör `sanitizePIIResponse()` plus Responses-API-formmaskeraren (`maskResponsesOutput` — täcker `output_text` och `output[].content[].text`). Om någon redigering sker, ersätter det modifierade svaret originalet.

Guardrailen blockerar aldrig; den annoterar endast (`meta.detections`, `meta.redacted`) eller skriver om.

### Promptinjektion (`promptInjection.ts`)

Upptäcker fientliga strukturer i användarlevererat innehåll och upprätthåller den konfigurerade policyn. Beteendet styrs av miljövariabler och konstruktoralternativ:

| Inställning     | Miljövariabel                                                                                         | Standard | Effekt                                                                                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | När `false`, kortsluter skyddsräcket.                                                                                                                                                                 |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Injektionspolicy: `blockera`, `varna` eller `logga`. (`redact` accepteras för bakåtkompatibilitet men tar **inte** bort injektionstext; begäran om PII-omskrivning styrs av `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minsta allvarlighetsgrad som krävs för att blockera. Medium är endast observerande som standard.                                                                                                      |

**Lägesprioritet** (`getMode`): anroparens `options.mode` →
`INJECTION_GUARD_MODE` **DB-funktionsflaggsåsidosättning** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. En instrumentpanelsåsidosättning vinner därför över miljövariablerna, så
användargränssnittet för funktionsflaggor styr det körande skyddet live (ingen omstart).
DB-läsningen är felsäker: om den misslyckas, återgår skyddet till det
miljöbaserade beteendet, och när ingen åsidosättning är inställd är beteendet
identiskt med enbart miljöbaserad upplösning.

Detektionskällor:

1.  `sanitizeRequest()` från `@/shared/utils/inputSanitizer` (delad detektoruppsättning
    som används på andra ställen i pipelinen).
2.  Inbyggda `DEFAULT_GUARD_PATTERNS` (för närvarande `system_override_inline` och
    `markdown_system_block`, båda med `high` allvarlighetsgrad).
3.  Valfria `customPatterns` som skickas via konstruktoralternativ (strängar, regex,
    eller `{ name, pattern, severity }` poster).

När `mode === "block"` **och** minst en detektion uppfyller
allvarlighetsgränsen, returnerar `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I varnings-/logglägen loggar skyddsräcket men
tillåter anropet. Den delade hjälparen `evaluatePromptInjection()` exporteras
också för anropare som behöver utvärdera prompter utan att gå via registret.

**Skanningsgräns (v3.8.20):** detektorn inspekterar endast de **första 16 KB** av
sammanfogad prompttext — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` och
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` innan
mönsterslingan körs. Injektionsdirektiv sitter nära toppen av en inmatning, så
detta begränsar regex CPU/GC på nyttolaster på flera hundra KB utan att
försvaga detekteringen (jfr #3932, #4041).

### Maskering av autentiseringsuppgifter (`credentialMasker.ts`)

Körs på **båda** stadierna, sist i standardkedjan (prioritet `95`). Maskerar
välkända API-nyckel-/hemlig-token-mönster från den utgående nyttolasten
(meddelandeinnehåll, verktygsanropsargument, verktygsresultat) **och**
leverantörssvaret, så att en autentiseringsuppgift som klistras in i en prompt
(eller ekar tillbaka av ett verktygsresultat) inte läcks till den uppströms
leverantören eller tillbaka till klienten.

- **Endast opt-in**, samma konvention som PII-maskering (Hård Regel #20-relaterad):
  inaktiverad om inte `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. När den är avstängd är skyddsräcket en no-op —
  det blockerar aldrig och skriver aldrig om.
- `redactCredentials()` går igenom hela nyttolast-/svarsträdet (`walkValue()`,
  prototypsföroreningssäker, cykelsäker via `WeakSet`) och ersätter matchningar med
  en `[REDACTED:<type>]` platshållare, och klonar endast de grenar som faktiskt
  ändrats.
- `CREDENTIAL_PATTERNS` täcker LLM-leverantörsnycklar (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalningsnycklar (Stripe, Square),
  molnnycklar (AWS access key, Twilio, SendGrid, Mailgun), privata nycklar / JWTs,
  anslutningssträngar som innehåller autentiseringsuppgifter (`mongodb://user:pass@...`, etc.),
  och ett generiskt `Authorization`/`x-api-key`/`api-key`/`apikey` header-värdemönster.
  Rubrikformade nycklar (`authorization`, `x-api-key`, `api-key`, `apikey`) maskeras
  strukturellt (endast värde, schemaprefix som `Bearer `/`Basic ` bevaras) snarare
  än via den generiska text-regexen.
- Skyddsräcket blockerar aldrig; det skriver bara om (`modifiedPayload` /
  `modifiedResponse`) och annoterar (`meta.credentialsRedacted`, `meta.count`).

Regressionsskydd: `tests/unit/credential-masker-guardrail.test.ts`.

## Baskontrakt (`base.ts`)

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
  block?: boolean; // true kortsluter kedjan
  message?: string; // visas vid blockering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneras av preCall för att skriva om begäran
  modifiedResponse?: TValue; // returneras av postCall för att skriva om svaret
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

En "guardrail" signalerar "ingen ändring" genom att returnera antingen `void`, `{}`, eller
`{ block: false }`. Att returnera en `modifiedPayload`/`modifiedResponse` ersätter
värdet som flödar genom kedjan för nedströms "guardrails".
`signal?: AbortSignal` överför anroparens livscykel till "guardrails". En avbruten begäran är det avsiktliga "fail-open"-undantaget: mediabryggor stoppar arbetet och rensar upp utan att återställa råmedia till ett mål som inte förväntas stödja det.

## Register (`registry.ts`)

Singleton-objektet `guardrailRegistry` exponerar:

- `register(guardrail)` — lägger till (eller ersätter med normaliserat namn) en "guardrail" och
  sorterar om efter stigande `priority`.
- `clear()` / `list()` — administrativa hjälpfunktioner.
- `runPreCallHooks(payload, context)` — itererar aktiva "guardrails", skickar
  "payload" genom `modifiedPayload`, och stoppar vid den första `block: true`.
- `runPostCallHooks(response, context)` — samma flöde på svarsidan.
- `resetGuardrailsForTests({ registerDefaults })` — rensar tillstånd och registrerar
  valfritt om standardinställningarna för ren testisolering.

Båda körarna returnerar `{ blocked, payload|response, results, guardrail?, message? }`
där `results` är en array av `GuardrailExecutionResult`-poster som inkluderar
`blocked`, `skipped`, `modified`, `error` och `meta`-fält per "guardrail",
användbara för spårning.

### Inaktivera Guardrails per Begäran

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggregerar en
avdubblerad lista över "guardrail"-namn som ska hoppas över för den aktuella
begäran. Källor (alla valfria, alla sammanfogade):

- `apiKeyInfo.disabledGuardrails`
- Begärans kropp `disabledGuardrails` (högsta nivån)
- Begärans kropp `metadata.disabledGuardrails`
- Rubrik `x-omniroute-disabled-guardrails` (eller äldre
  `x-disabled-guardrails`)

Värden kan vara arrayer av strängar eller en kommaavgränsad sträng; namn
normaliseras till gemener kebab-case (`pii_masker` → `pii-masker`). Resultatet
skickas via `context.disabledGuardrails` till registret, som hoppar över
matchande "guardrails" (`skipped: true` i `results`).

## Exekveringsordning

För varje förfrågan som flödar genom `src/sse/handlers/chat.ts` och
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` bygger hopplistan från API-nyckel, brödtext
    och rubriker.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` kör skyddsräcken i stigande
    prioritetsordning:
    - Inaktiverade skyddsräcken registreras som `skipped`.
    - Varje skyddsräckes `preCall` kan skriva om nyttolasten via `modifiedPayload`.
    - Den första `block: true` kortsluter kedjan och hanteraren returnerar
      ett avvisningssvar från skyddsräcket.
3.  Den (potentiellt omskrivna) nyttolasten flödar in i kombinationsdirigering och uppströms
    vidarebefordran.
4.  Efter att svaret har sammanställts kör `guardrailRegistry.runPostCallHooks(...)`
    samma kedja på svaret. `block: true` här släpper det uppströms
    svaret.

Skyddsräcken som kastar ett fel registreras med `error: <message>` och loggas via
`logger.warn`, men kedjan fortsätter – fail-open per design.

## Konfiguration

Miljövariabler som läses av de inbyggda skyddsräckena:

| Variabel                              | Används av               | Effekt                                                                                                   |
| :------------------------------------ | :----------------------- | :------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Sätt `false` för att helt inaktivera detektering.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Injektionspolicy: `warn`, `block` eller `log`. Det äldre värdet `redact` skriver inte om injektionstext. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Läge för injektionsskyddet; även en DB-funktionsflagga som **åsidosätter** miljövariablerna (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Minsta allvarlighetsgrad som `MODE=block` avvisar: `high` (standard), `medium` eller `low`.              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Äldre alias för `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | När `true` redigeras PII i förfrågan (oberoende av injektionsläge).                                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedströms) | Styr maskeringsbeteendet på svarssidan.                                                                  |

Modality Bridge-skyddsräckena läser körningskonfiguration från den DB-stödda inställningsbutiken
(`getSettings()`), inte miljövariabler. Visions primära nycklar är
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` och
`modalityBridgeCacheMaxEntries`. De äldre
`visionBridge*`-nycklarna accepteras endast som den dokumenterade en-cykels läs-
fallbacken; instrumentpanelsskrivningar använder de primära nycklarna. Standardvärden och fallback-
upplösaren finns i `src/shared/constants/modalityBridgeDefaults.ts`, med äldre
konstanter bevarade i `src/shared/constants/visionBridgeDefaults.ts`.

Ljud använder `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` och `modalityBridgeAudioMaxClips`, plus de delade
`modalityBridgeCache*`-inställningarna. Ljud har ingen fallback för äldre nycklar eftersom dessa
nycklar introducerades med Modality Bridge-schemat.

Video använder `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` och
`modalityBridgeVideoTimeout`, plus de delade `modalityBridgeCache*`-inställningarna.
Det är inaktiverat som standard eftersom FFmpeg/ffprobe är valfria operativa
beroenden och bildtextning av ramar lägger till latens och modellkostnad.

## Anpassade Guardrails

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

Steg:

1.  Skapa `src/lib/guardrails/myGuardrail.ts` som utökar `BaseGuardrail`.
2.  Implementera `preCall` och/eller `postCall`.
3.  Registrera antingen vid importtillfället (push från `registerDefaultGuardrails`) eller
    anropa `guardrailRegistry.register(...)` vid körning – registret ersätter
    alla tidigare guardrails med samma normaliserade namn.
4.  Lägg till tester under `tests/unit/` (befintliga exempel:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Testning

Använd `resetGuardrailsForTests()` mellan tester för att starta från ett känt tillstånd.
Skicka `{ registerDefaults: false }` för att starta med ett tomt register och
registrera endast de guardrails som testas. Vision Bridge accepterar beroendeinjektion
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge exponerar motsvarande
gränssnitt för inställningar, funktioner, STT-modellval, autentiseringskontroller och transkription.
Tester kan därför utföra båda flödena utan DB- eller nätverksåtkomst.

## Se även

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — delad detektor som driver
  prompt-injektion och PII-maskering
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standardinställningar och
  lista över tvingade-bryggmodeller
- `src/shared/constants/modalityBridgeDefaults.ts` — delade Vision/Audio körningsstandardinställningar
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lager (strömbrytare, nedkylningstider)
- `docs/reference/ENVIRONMENT.md` — fullständig referens för miljövariabler

## Täckning av injektionsskyddsrutter & red-team (Fas 8 · Block D)

Injektionsskyddet (`createInjectionGuard` / `withInjectionGuard`) täcker alla rutter
som accepterar användarprompter. Det respekterar `INJECTION_GUARD_MODE` (standard `warn` = logga endast;
`block` = returnerar HTTP 400 `SECURITY_001`).

| Typ              | Rutter                                                                                                                                               | Standardläge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| Text (befintlig) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | varna        |
| Generativ        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | varna        |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | varna        |

Textutvinning (`extractMessageContents`) täcker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nattlig, `nightly-llm-security.yml`):** promptfoo validerar att varje rutt blockerar
OWASP-LLM-korpusen i `INJECTION_GUARD_MODE=block`; garak kör sonder (hoppar över utan hemlighet).
`moderations` inkluderas för konsekvens – operatörer i block-läge kan undanta den via
`resolveDisabledGuardrails`.

Det nattliga arbetsflödet (`.github/workflows/nightly-llm-security.yml`, cron + manuell
dispatch) har två jobb:

- **`promptfoo-guard` (blockerande)** – kör `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Varje fientligt fall (t.ex. "ignorera alla
  tidigare instruktioner...", DAN-liknande jailbreaks) bekräftar att svaret innehåller
  `error.code === "SECURITY_001"`, dvs. att skyddet faktiskt avvisade begäran.
- **`garak` (rådgivande)** – kör garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Begränsas av en
  leverantörshemlighet (`PROMPTFOO_PROVIDER_KEY`); hoppar över graciöst och är suffixerat
  `|| true`, så det rapporterar utan att CI misslyckas.

Täckningen av skyddshjälpen (`createInjectionGuard` / `withInjectionGuard`)
spänner över varje promptbärande `/v1`-rutt; prompttext hämtas från
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
