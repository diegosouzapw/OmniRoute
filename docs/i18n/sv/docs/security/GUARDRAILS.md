# Guardrails (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sanningskälla:** `src/lib/guardrails/`
> **Senast uppdaterad:** 2026-08-29 — v3.8.51 (Video Bridge-transkriptets proveniens deklareras av anroparen,
> men verifieras ännu inte av servern — förtydligat enligt #11661)

Skyddsräcken tillämpar säkerhet, policyer och innehållstransformeringar vid gränsen
mellan OmniRoute och uppströmsleverantörer. Varje skyddsräcke kan inspektera (och
valfritt avvisa, transformera eller annotera) nyttolaster för begäranden (`preCall`) och
uppströmssvar (`postCall`).

Systemet är **fail-open**: om ett skyddsräcke utlöser ett undantag under körning
registrerar registret felet och fortsätter med nästa skyddsräcke i stället för att
begäranden misslyckas. Blockering är ett uttryckligt beslut (`block: true`), aldrig en olyckshändelse.

## Inbyggda skyddsräcken

Registret läser automatiskt in sex skyddsräcken i prioritetsordning vid import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Namn                | Steg           | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lägre prioritetsnummer körs **först**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbrygga PR-1

Fångar upp begäranden som innehåller bilder och är riktade till **modeller utan bildstöd** och
dirigerar antingen om hela begäranden till en modell med bildstöd eller ersätter bilddelarna
med textbeskrivningar som producerats av en konfigurerbar bildmodell före
uppströmsanropet. Detta gör att leverantörer med endast textstöd transparent kan hantera
multimodala nyttolaster.

Flöde:

1. Hoppa över om målmodellen redan stöder bilder (såvida den inte förekommer i
   listan för tvingad bryggning `isVisionBridgeForcedModel`).
2. Extrahera bilddelar via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerar till den **enhetliga mediedetektorn**
   `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den enda
   sanningskällan som delas med kombinationskompatibilitetsfiltret.
   Extraktionen begränsas med en tillåtelselista till delar på toppnivå med de former
   som `replaceImageParts` kan infoga igen (kontraktet extrahera↔ersätt): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` och Responses API `input_image`. Kapslade träffar och
   former med endast indikatorer hör till kombinationsfiltret och extraheras aldrig.
   Hoppa över om inga hittas.
3. Lös körningskonfigurationen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nya inställningsnycklar av typen `modalityBridge*`
   har företräde; äldre nycklar av typen `visionBridge*` förblir en **reservlösning under en cykel**
   (återställningsfönster). Hoppa över innan någon mediegenomsökning sker när
   bryggan är inaktiverad.
4. Lägesväljaren (`modalityBridgeVisionMode`, se tabellen nedan) avgör
   omdirigering kontra beskrivning. Omdirigering returnerar `modifiedPayload` där endast `model`
   har bytts ut, plus metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivningsflödet: begränsa antalet bilder till `maxImages`, skapa den uppgiftsmedvetna prompten,
   kontrollera beskrivningscachen, anropa bildmodellen **parallellt**
   (`Promise.allSettled`) och infoga textdelar av typen `[Image N]: <description>` på
   deras plats. En misslyckad beskrivning ger `null` och den ursprungliga bilddelen
   **bevaras** (#4012) — förutom i kombinationsbeskrivningsflödet när samtliga
   beskrivningar misslyckades, då en bekräftad uppströmsleverantör utan bildstöd får en
   `(unavailable — no vision-capable provider connected)`-platshållare i stället (#8430).
6. Returnera `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Lägesväljare (`modalityBridgeVisionMode`)

| Läge       | Standard | Beteende                                                                                                                                                                                                                                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Äldre heuristik, oförändrad (#6640/#7204): modeller som inte är kombinationsmodeller/`auto/` omdirigeras till den bästa bildmodellen, såvida inte den ursprungliga modellen redan har användbara autentiseringsuppgifter (då används beskrivning); kombinationsmål använder alltid beskrivning.               |
| `describe` |          | Beskriv alltid — omdirigeringsblocket hoppas över helt; användarens valda modell svarar alltid.                                                                                                                                                                                                               |
| `reroute`  |          | Tvinga omdirigering: skyddet som behåller modellen med autentiseringsuppgifter kringgås. Autentiseringsskyddet för omdirigerings**målet** gäller fortfarande — när inget användbart bildmål finns går begäranden vidare till beskrivning så att råa bilder aldrig når en backend med endast textstöd (#8430). |

Tvingade lägen kortsluter **innan** autoheuristiken körs; beteendet för `auto`
är byteidentiskt med skyddsräcket före PR-1.

#### Uppgiftsmedveten beskrivningsprompt (`modalityBridgeVisionTaskAware`)

Standardvärdet är **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lägger till
texten från det **senaste användarmeddelandet** (trunkerad till 500 tecken) till den grundläggande
beskrivningsprompten, vilket styr beskrivningen mot det som användaren faktiskt frågade efter
(mönstret codex-vision-proxy) och ber bildmodellen transkribera synlig
text. När flaggan är avstängd — eller om det saknas användartext — används grundprompten oförändrad.

Describe-självslingans egen OpenAI-kompatibla begäran (`callVisionModelSingle()`
i `visionBridgeHelpers.ts`) begär alltid `image_url.detail: "high"` —
ovillkorligen, för varje anropare/leverantör, utan att styras av någon klientsignal.
Sampling med låg detaljnivå försämrar OCR-noggrannheten för just den
texttranskriberingsuppgift som denna prompt begär, så describe-anropet begär alltid
hög detaljnivå oavsett vilken detaljnivå den ursprungliga inkommande begäran använde. Detta
påverkar endast den interna kroppen för describe-begäran; det ändrar inte hur
OmniRoute vidarebefordrar anroparens egen `image_url.detail` i den primära begäran —
det standardvärdet tillämpas separat, och endast för identifierade OpenCode-klienter, i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Describe-självslingans
gren för Anthropics wire-format har inget `detail`-fält
och påverkas inte av något av standardvärdena.

#### Gräns för describe-utdata (`modalityBridgeVisionMaxChars`)

| Nyckel                         | Standardvärde | Intervall           |
| ------------------------------ | ------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` eller 100–50000 |

`0` (standardvärdet) betyder **ingen gräns** — beskrivningen som returneras av
`callVisionModel()` skickas vidare oförändrad, vilket bevarar det befintliga
beteendet. Alla värden i intervallet 100–50000 trunkerar beskrivningen med
suffixet `…` innan den infogas som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Höj detta för detaljrika OCR-uppgifter där modellen nedströms behöver den
fullständiga transkriberingen; sänk det för att begränsa tokenanvändningen för pratsamma visionsmodeller.
Instrumentpanelens fält finns i panelen Advanced på fliken Vision
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) och höjer alla
värden mellan 1 och 99 till minimivärdet 100, samtidigt som ett uttryckligt `0`
lämnas orört — `0` är i sig ett giltigt Zod-värde
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), inte bara
standardvärdet för ”inte angivet”.

#### Describe-cache (`modalityBridge/bridgeCache.ts`)

LRU- och TTL-cache i minnet för describe-utdata, delad över hela processen.
Nyckel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med
längdprefixramning (inga kollisioner mellan fältgränser). Modellkomponenten är
den **konfigurerade** bryggmodellen, inte modellen som faktiskt svarade —
`callVisionModel` kan använda en reservmodell internt, och nycklar per försök skulle
fragmentera cachen. Misslyckade describe-anrop cachas aldrig. Inställningar:

| Nyckel                          | Standardvärde | Intervall |
| ------------------------------- | ------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`        | —         |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000   |

#### Normalisering av fjärrbilder (självslingans describe-anrop/base64-hämtning)

När bryggan själv hämtar en **fjärrbild** — Anthropics describe-självanrop
och base64-konverteringen för claude-wire-format
(`ensureBase64ImagesForClaudeWire`), båda via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — skickas den resulterande
data-URI:n genom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) innan den bäddas in i visionsmodellens
begäran. För stora bilder skalas ned till en **långsida på 2048 px** (vilket motsvarar
storleksgränsen som OpenAI/Anthropic redan tillämpar på serversidan), vilket minskar
uppladdningsmängden/latensen utan att ändra vad visionsmodellen ser. Storleksändringen
använder `sharp`, som läses in via dynamisk import: på en plattform där dess systemspecifika
binärfil inte kan läsas in kastar `normalizeDataUri()` **aldrig ett undantag** — den faller
tillbaka på att skicka vidare originalbyten oförändrade, så sökvägen för describe/base64-konvertering
fortsätter alltid att fungera. Byte som inte utgör en bild (en hämtning som inte returnerade en
avkodningsbar bild) skickas också vidare orörda. Denna normalisering är
begränsad till bilder som bryggan hämtar för sitt eget självanrop — den
tillämpas aldrig på anroparens råa payload som skickas vidare, i enlighet med
principen att mutation endast sker efter aktivt val (hård regel nr 20).

#### Inställningsschema + migrering

De nya `modalityBridge*`-nycklarna Zod-valideras i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trion `modalityBridgeCache*` och gruppen
`modalityBridgeAudio*` som används av Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierar befintliga äldre
`visionBridge*`-värden till motsvarande nya nycklar (idempotent och skriver aldrig över
ett `modalityBridge*`-värde som angetts av en operatör); de äldre nycklarna fortsätter att
accepteras som reserv vid läsning under en versionscykel.

#### Transparensheader + statistik

Describe-transformerade svar innehåller
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(skapad av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
tillagd av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerade begäranden får **ingen** header — payloaden var orörd och modellbytet
är redan synligt i svarskroppens `model`-fält.

`GET /api/modality-bridge/stats` (administrationsautentisering, samma nivå som
`GET /api/settings`) returnerar räknarna per modalitet i minnet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` för `vision`, `audio` och
`video`. `averageLatencyMs` använder `latencySamples`, inte alla försök, som
nämnare; en åtgärd utan tidsmätning skapar inte ett påhittat prov på noll millisekunder.
`bridged` förblir det bakåtkompatibla aliaset för lyckade
konverteringar; misslyckade försök ökar det inte.
Räknarna nollställs avsiktligt när processen startas om
(telemetri, inte redovisning).

#### Konfiguration i instrumentpanelen

Den dedikerade dashboardsidan är
`/dashboard/settings/modality-bridge`. Dess URL-adresserbara flikar `Vision`, `Audio`
och `Video` bevarar frågeparametrarna när värdet för `tab` ändras.
Fliken Vision tillhandahåller aktivering, läge, modellval (inklusive det automatiska
standardvalet), uppgiftsmedvetna prompter, avancerade gränser för tidsgräns/bild/beskrivningslängd/cache,
körtidsräknare och en skyddad exempelförfrågan. Fliken Audio är också aktiv: den tillhandahåller
aktivering, en modellväljare enbart för STT med Auto, gränser för tidsgräns/maximal klipplängd, ljudräknare
och ett exempeltest för `input_audio`. Fliken Video är funktionell: den rapporterar
körningsstatusen för FFmpeg/ffprobe — ett av fyra uttryckliga UI-tillstånd (`unknown` medan
kontrollen pågår eller inte kunde slutföras, `restricted` på en dashboardvärd som inte är
loopback där kontrollen hoppas över på klientsidan, `unavailable` när kontrollen har utförts
och bekräftat att verktygen saknas, eller `available` med versionerna för FFmpeg/ffprobe) — sparar
gränser för aktivering/modell/bildrutor/video/tidsgräns, filtrerar modellväljaren till modeller
med stöd för bildbehandling och visar videoräknare.

Det tidigare Vision Bridge-kortet under AI-inställningarna är en kompatibilitetslänk till den
nya sidan; det äger inte längre en andra kopia av formuläret. Media Providers länkar också
arbetsflödena Image-to-Text och Speech-to-Text till motsvarande flikar i Modality
Bridge utan att ta bort den befintliga Speech-to-Text-testmiljön.

**Förbikoppling av åtkomstkontroll för självloop:** när describe-anropet dirigeras genom OmniRoutes
egen `/v1`-självloop (modell från en icke-standardleverantör) skickar underförfrågan
`x-omniroute-admission-bypass: internal` och autentiseras med den matchade
självloopens autentiseringsuppgift — den lokala platshållaren `sk_omniroute` i lokalt läge eller
den operatörskonfigurerade miljönyckeln `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), så att
distributioner med `REQUIRE_API_KEY=true` fortfarande kan köra describe-anropet. Förbikopplingen
accepteras endast för exakt dessa autentiseringsuppgifter, så externa klienter kan inte använda
huvudet för att hoppa över åtkomstkontrollen.

Äldre standardvärden finns i `src/shared/constants/visionBridgeDefaults.ts`; de
nya standardvärdena för läge/uppgiftsmedvetenhet/cache och inställningsmatcharen finns i
`src/shared/constants/modalityBridgeDefaults.ts`. Skyddsmekanismen exponerar ett
konstruktoralternativ `deps` så att tester kan injicera falska implementationer av `getSettings` och
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fångar upp chattförfrågningar som innehåller ljud innan de når ett mål som inte är
känt för att acceptera ljudindata. Den omdirigerar aldrig chattförfrågan: ljuddelar
transkriberas via den befintliga OpenAI-kompatibla multipart-slutpunkten och den
valda chattmodellen fortsätter med texttranskriptioner.

Flöde:

1. Fastställ `supportsAudio` via `getResolvedModelCapabilities()`. Explicit
   metadata i leverantörsregistret har företräde, därefter statisk modellmetadata och sedan synkroniserade
   `modalities_input`. En deklarerad indatalista utan `audio` är `false`; om inga
   belägg för kapaciteten finns kvar blir värdet `null`. Både `false` och `null` aktiverar den
   konservativa bryggan, medan `true` kringgår den.
2. Matcha inställningarna `modalityBridgeAudio*` och extrahera skarvbara ljuddelar på toppnivå
   från varje meddelande med hjälp av den delade detektorn `detectMediaParts()`.
   De wire-format som stöds är OpenAI `input_audio`, `audio_url` och
   `source.media_type: "audio/*"`. Kapslat ljud detekteras för dirigering men
   tas inte bort av skarvningsflödet. Arbetet begränsas av `modalityBridgeAudioMaxClips`;
   senare delar lämnas orörda.
3. Använd ett konfigurerat `provider/model`, eller låt `selectAudioBridgeModel()` gå igenom
   `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogordning och välja den första
   modellen med en användbar aktiv autentiseringsuppgift för leverantören.
4. `callAudioTranscription()` konverterar base64-/data-URI-ljud till en multipart-
   `file`, eller hämtar en fjärrresurs via `audio_url` genom det skyddade utgående flödet
   som endast tillåter offentliga resurser, med DNS-låsning och en gräns på 25 MB. Därefter POSTas filen och den valda
   modellen till den lokala självloopen `/v1/audio/transcriptions`, autentiserad med
   `resolveSelfLoopBearer()`. Den befintliga transkriptionsrutten utför normal
   uppslagning av autentiseringsuppgifter, hantering av nedkylningsperioder/hastighetsbegränsningar och dirigering till leverantören.
5. Lyckade anrop ersätter sina delar med `[Audio N]: <transcript>`. Anropen
   körs med `Promise.allSettled`: ett enskilt misslyckande bevarar den ursprungliga
   ljuddelen (#4012-kontraktet). Om alla anrop misslyckas och målet bevisligen har
   `supportsAudio === false` blir delarna
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontraktet). För
   ett okänt mål (`null`) lämnas innehållet orört om alla anrop misslyckas. Ett bevisat
   mål som endast stöder text och saknar användbara STT-autentiseringsuppgifter får samma uttryckliga
   platshållare utan att något nätverksanrop görs.

Lyckade transkriptioner använder den processgemensamma LRU-/TTL-cachen för Modality Bridge.
Nyckeln kombinerar ljudreferensen, den stabila åtgärdsetiketten `audio-transcription`
och den valda STT-modellen; misslyckanden cachas aldrig. Ljudförsök uppdaterar
de delade räknarna `bridged`, `cacheHits`, `failures` och `lastUsedAt`.
Transformerade svar innehåller
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; orörda
förfrågningar får inget Audio Bridge-segment.

Körtidsinställningarna lagras i databasen och valideras med Zod:

| Nyckel                        | Standardvärde | Intervall         |
| ----------------------------- | ------------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                 |
| `modalityBridgeAudioModel`    | `""`          | Auto eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10              |

Den delade cachen styrs fortfarande av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` och `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fångar upp videodelar på toppnivå i Chat Completions `messages` och Responses
API `input` innan ett mål utan känt inbyggt videostöd anropas.
Formaten som stöds är `input_video`, `video_url`, `video_source`, HTTPS-URL:er
och data-URI:er av typen `data:video/*;base64,...`. Vanliga filnamn i text behandlas
inte som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ansvarar för traversering av begäran,
kontroll av kapacitet/policy, aggregering per begäran och svarsnyttolasten.
Arbete per video — hämtning, cachelagring av hela resultatet, beskrivning av en
bildrutesekvens (som sammanfogar eventuella ljudtranskriptioner som anroparen har angett)
samt mätvärden/avbrott/uppstädning per försök — döljs bakom `processVideoPart` i
`videoBridgePipeline.ts`, som anropas en gång per videodel inuti loopen i `preCall`.
Den modulen definierar även de uttryckliga portgränserna `VideoMediaBrokerPort`
(hämtning av byte och extrahering av samplade bildrutor), `VideoAudioTranscriptionPort`
(sammanfogning av en ljudtranskription som anroparen har angett med de samplade bildtexterna)
och `VideoDrilldownPort` (beständighetsgränsen för detaljgranskning av bildrutor; ännu inte
ansluten till `processVideoPart` — i nuläget är det endast den separata rutten
`/api/modality-bridge/video/drilldown` som skriver detaljgranskningsposter).

Den publika sökvägen för `/v1`-begäranden importerar eller anropar aldrig en underprocess.
Fjärrvideor hämtas med en gräns på 50 MiB; infogade base64-videor har en
konservativ avkodad gräns på 36 MiB per video, så att modell-/meddelande-/inramningshöljet
kan hållas inom den publika JSON-gränsen på 50 MiB för godkännande av begäranden. Infogad
längd och uppskattad avkodad storlek kontrolleras före allokering. HTTPS
krävs för den ursprungliga fjärr-URL:en och varje omdirigering, med hjälp av det befintliga
utgående skyddet som endast tillåter publika adresser och använder DNS-låsning. Dessa byte passerar sedan exakt den interna
brokergränsen `POST /api/modality-bridge/video/extract`. Den rutten är både
`LOCAL_ONLY` och `SPAWN_CAPABLE`, accepterar endast en autentiserad begäran per process
från en betrodd loopback-adress och accepterar aldrig en URL, filsystemsökväg, körbar fil
eller argumentlista. API-pipelinen för brödtextstorlek och hanterarens inkrementella läsare
av brödtexten upprätthåller oberoende av varandra en indatagräns på 50 MiB för brokern. Dess
begränsade kö kör en extrahering åt gången, tillåter fyra väntande jobb och begränsar väntande
indata till 100 MiB.

Inuti brokern läser `ffprobe` en privat lokal fil; den fasta tillåtelselistan för format
utesluter spelliste- och manifestformat. För tillåtna containrar i MOV-familjen
förblir externa MOV-datareferenser inaktiverade som standard, och det fasta kommandot
aktiverar dem inte. Både `ffprobe` och `ffmpeg` använder en protokollista som endast
tillåter `file`, en tråd, fasta argumentmatriser, inget skal och körbara filer som
slås upp via `PATH`. Omslagsströmmar med bifogade bilder är inte uppspelningsbara
kandidater. Alla uppspelningsbara strömmar måste uppfylla gränserna, och en
uttryckligen angiven standardström föredras före den deterministiska reservlösningen
med lägst index. Videor begränsas till 600 sekunder, 8 192 pixlar per dimension och
33 554 432 källpixlar. FFmpeg samplar 1–16 JPEG-bildrutor vid mittpunkter, skalar ned
den långa kanten till högst 1 024 pixlar utan att skala upp mindre indata och
tar aldrig emot en URL. Samplingsmetoden är `uniform` som standard. De valfria
policyerna `scene_aware` och experimentella `segment_aware` utför ytterligare en
fast FFmpeg-passering över den redan validerade lokala strömmen, väljer begränsade
scenstämplar från `showinfo` och återgår deterministiskt till samma jämnt fördelade
mittpunkter vid detektorfel, tidsgräns, felaktigt formaterade utdata eller en tom
kandidatuppsättning. Segmentmedvetet läge fördelar mittpunktssamplingar proportionellt
mellan de validerade scenintervallen; segmentmedvetna belägg och reservbeteende
beskrivs närmare nedan. Den fasta gränsen på 16 bildrutor
tillämpas efter urvalet i varje policy. När en scenmedveten begäran endast har en
budget på en bildruta använder den den jämnt fördelade mittpunkten i det aktiva
helvideo- eller fokusfönstret och rapporterar `policyEffective: uniform`: en enda
vald scenbildruta kan inte bevara båda tidsmässiga ändarna. En anropare kan valfritt
ange ett ändligt fokusfönster (`start`/`end` i sekunder); gränserna begränsas till
mediets varaktighet, omvända eller icke-ändliga fönster avvisas och samtliga
samplingspolicyer utförs endast inom det normaliserade intervallet. Det resulterande
fönstret inkluderas i samplingsmetadata och i det obetrodda beskrivningsprefixet,
så att efterföljande modeller kan skilja ett fokuserat utdrag från hela tidslinjen.

Semantiskt bildtextfokus är en separat, uttrycklig inställning. Standardläget `full`
för analys bevarar den befintliga bildruteprompten och vidarebefordrar aldrig
begärandetext till bildtextmodellen. I läget `focused` läser bryggan endast den senaste
icke-tomma användarskapade `text`/`input_text` från samma Chat- eller Responses-container,
normaliserar den till NFC, komprimerar kontrolltecken och blanksteg samt begränsar den
till 500 Unicode-kodpunkter. Ett tomt resultat återgår till den exakta `full`-prompten.
En användbar ledtråd serialiseras som JSON i ett särskilt block för obetrodd
användarkontext och får endast prioritera observerbara detaljer; den kan inte åsidosätta
den separata varningen om att inte följa instruktioner som är synliga eller hörbara
i mediet. Textuellt fokus härleder aldrig `start`/`end` och ändrar inte den tidsmässiga
samplaren.

#### FU-07 strukturella segmentbelägg

`segment_aware` använder en begränsad föranalyspassering över den redan validerade
lokala videoströmmen. Den fasta filterkedjan skalar först till högst 320 pixlars
bredd, identifierar scenbyten och frusna intervall och samplar sedan 1 bildruta per
sekund för oskärpa, genomsnittlig luminans samt rumslig/tidsmässig information.
Passeringen är begränsad till 600 strukturella samplingar, en FFmpeg-/filtertråd,
samma protokoll- och containertillåtelselistor som endast tillåter `file`, en gräns
på 1 MiB för processutdata och högst 30 sekunder inom brokerns delade avbrotts-/tidsgräns.
Den accepterar aldrig ett kommando, filter, en sökväg eller URL från begäran.

De strukturella värdena är deterministiska samplingsdata, inte semantisk
videoförståelse. De härleder inte motiv, handlingar, bildtexter, tal eller
användarens avsikt. Scen- och frysningsgränser bildar segment; frysningstäckning,
oskärpa, exponering, rumslig detaljrikedom och tidsmässig förändring påverkar
endast hur den befintliga bildramsbudgeten på 1–16 ramar fördelas. Ett helt fryst
segment begränsas till en bildram, medan icke-frysta segment konkurrerar om den
återstående budgeten. När antalet gränser överstiger antalet bildramar behålls
en jämn täckning av tidslinjen, så att snabba tidiga klipp inte kan dölja ett
långt avslutande segment. Scengränser inom analysupplösningen på 1 sekund från
en frysningsgräns slås samman.

Saknade filter, felaktiga/tomma analysdata, ett detektorfel eller tidsgränsen för
den begränsade föranalysen leder till en öppen feltolerans med exakt samma policy
för likformigt fördelade mittpunkter. Ett avbrott från anroparen eller en
tidsgräns i brokern leder inte till öppen feltolerans: det avslutar den pågående
underprocessen, förhindrar efterföljande extrahering av bildramar och det privata
temporära trädet tas bort i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererar deterministiska, verkliga
FFmpeg-fixturer för besparingar av bildtextanrop efter deduplicering,
budgetfördelning vid hög rörelseintensitet, analysdata för oskärpa/exponering/SI-TI,
snabba klipp med ett långt slutparti samt falska positiva resultat vid gradvisa
övertoningar. Skriptet registrerar föranalysens faktiska förflutna tid och, där
`/usr/bin/time` är tillgängligt, den underordnade processens CPU-användning och
maximala RSS. Dess kvalitetskontroller är enbart strukturella orakel. Kvaliteten
hos den verkliga bildtextmodellen förblir `HOLD`, eftersom denna testmiljö saknar
en auktoriserad slutpunkt eller en fryst bedömare. Monetära besparingar förblir
också `HOLD` om inte `--caption-cost-per-call-usd` anger en explicit positiv
kostnadsuppskattning per anrop; skriptet fabricerar aldrig något av resultaten.

Varje bildram är begränsad till 4 MiB, alla råa bildramar tillsammans till 23 MiB
och det serialiserade brokersvaret till 32 MiB. En privat temporär katalog tas
bort i `finally`. OmniRoute inkluderar inte FFmpeg och accepterar inte en
anpassad sökväg till den körbara filen. Före genereringen av bildtexter tillämpar
bryggan en konservativ visuell dedupliceringsomgång: varje JPEG reduceras till
en gråskalebuffert på 16×16 och jämförs endast med den senast behållna bildramen.
För en begärd bildtextbudget på fler än en bildram tillhandahåller extraheringen
en begränsad kandidatpool på upp till dubbla budgeten och aldrig fler än 16
bildramar. Det begärda taket tillämpas först efter dedupliceringen, och den första
och sista valda kandidaten bevaras under den slutliga gallringen när budgeten är
minst två. Den versionshanterade policyn
`grayscale-16x16-mean-cells-v2` använder det större värdet av den genomsnittliga
luminansskillnaden och andelen miniatyrceller vars normaliserade skillnad är minst
0,05. Tröskelvärdet för dubbletter är konstanten 0,04, vald för förutsägbarhet
snarare än exponerad som en körningsinställning. Denna sekundära signal med hög
kontrast bevarar små rörelser och ändringar i synlig text som en jämförelse
baserad enbart på medelvärdet kan dölja. Fel i jämförelsekomponenten eller
avkodaren leder till öppen feltolerans och bibehållen täckning. Utgående metadata
skiljer mellan extraherade kandidater, framgångsrikt använda bildramar och
borttagna visuella dubbletter.

En uttryckligen markerad videodel kan begära en tidsstämplad kontaktkarta. Bryggan
skapar ett JPEG-rutnät med högst 4 kolumner och 16 bildramar. Varje cell på 512
pixlar bränner in källans tidsstämpel i ett nedre band med hög kontrast, medan
samma tidsstämplar finns kvar i textbaserade metadata för efterföljande koppling
och granskning. Den fullständiga JPEG-bilden förblir begränsad till 32 MiB. Om
`sharp` inte kan avkoda eller sätta samman rutnätet återgår bryggan till de
enskilda JPEG-bildramarna; ett klientavbrott sprids fortfarande genom
kontaktkarteåtgärden.

Underlag för produktionssättning hålls avsiktligt åtskilt från det syntetiska
mikrobenchmarktestet för sammansättning.
`scripts/perf/video-bridge-contact-sheet-eval.ts` definierar en
schemaversionerad A/B-testmiljö för verkliga OpenAI-kompatibla synmodeller. Den
mäter leverantörsrapporterade token, total faktisk svarstid från början till slut
(inklusive sammansättning av kontaktkartan), antal modellanrop och bibehållande
av manifestdefinierade fakta. Råa modellsvar skrivs inte till rapporten; endast
SHA-256-kontrollsummor och matchade fakta-ID:n behålls. Testmiljön gör inga
nätverksanrop eller anrop till betalda modeller om inte `--execute-real` anges
och `--model`, `OMNIROUTE_BASE_URL` och `OMNIROUTE_API_KEY` har konfigurerats.
Utan denna explicita verkliga körning förblir dess maskinläsbara utlåtande
`HOLD`; enbart syntetiska mätningar av nyttolast och antal anrop utgör inte
underlag för produktionssättning.

Anropare kan bifoga en valfri `transcript.cues`-matris till en videodel som stöds
när de redan har tidsjusterad text. Varje cue måste innehålla `text`, ett ändligt
`start`/`end`-intervall inom den avlästa varaktigheten och en tillåten `source`
(`client`, `embedded` eller `audio-bridge`); `confidence` har standardvärdet `1`
och måste ligga mellan `0` och `1`. Exakt duplicerade cues slås samman. OmniRoute
startar aldrig transkribering från dessa metadata: validerade cues kopieras till
det beskrivna resultatet med källa, konfidens och intervall och återges som
obetrodda observationer tillsammans med bildtexterna. Ogiltig text, text utanför
intervallet eller text utan härkomstuppgifter avvisas i stället för att blandas
in i bildtextströmmen. Fältet `source` deklareras för närvarande av anroparen och
verifieras inte av servern: OmniRoute säkerställer att värdet är en av de tre
tillåtna strängarna, men bekräftar ännu inte kryptografiskt att etiketten
`embedded` eller `audio-bridge` faktiskt kommer från en serverägd extrahering.
Behandla `source` som en obetrodd ledtråd tills denna verifiering införs; basera
inte auktoriseringsbeslut på det.

En avancerad anropare kan tillhandahålla ett redan auktoriserat `audioTranscript`-spår
för samma video. Fusionsgränssnittet kör visuella observationer och ljudobservationer inom
en gemensam tidsgräns och avbrottssignal, ordnar dem på en gemensam tidslinje, slår samman
exakta dubbletter och rapporterar ett partiellt resultat när endast den ena sidan lyckas.
Ett ogiltigt `audioTranscript` degraderas till detta partiella resultat — den visuella
beskrivningen behålls och ljudgrenen registrerar en sanerad felkod —
i stället för att hela videon misslyckas. Tillgänglighet per gren, flaggan för partiellt resultat
och de sanerade felkoderna bevaras i det beskrivna resultatet, i
skyddsräckesmetadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i resultatcachens metadata och i bryggans
fusionsräknare. Standardsökvägen för Video Bridge anropar inte tal-till-text
och hämtar inte en andra kopia av mediet; utan detta uttryckliga spår förblir den
endast video.

**Lagring av transkript (#12150 P1).** Detta tillämpas automatiskt när
Video Bridge (som i sig är valfri) renderar en transkriptmarkör — det finns ingen separat
lagringsflagga. När en begäran renderar någon transkriptmarkör (ett av anroparen deklarerat
`transcript` eller ett fusionerat `audioTranscript`) markerar skyddsräcket den som
`videoBridgeObserved` och skapar en maskerad skuggversion av videobeskrivningen —
en identisk rendering där fritextinnehållet i varje markör ersätts med
`[redacted-video-transcript]`, skapad genom att det strukturerade markörfältet ersätts
innan strängen sätts samman (aldrig genom parsning av den utplattade texten, så inget
markörinnehåll — fientligt eller normalt, inklusive innehåll som innehåller `]`, såsom
`[inaudible]`/`[music]` — kan finnas kvar). Den beständigt lagrade anropsloggens begärandetext
ersätter varje videohärledd textdel med denna maskerade skuggversion, matchad genom
innehållslikhet; ankaret `fullText` läses på nytt från den färdiga
skyddsräckesnyttolasten före anropet, så matchningen lyckas fortfarande efter att senare
skyddsräcken i kedjan (maskerarna för personuppgifter och autentiseringsuppgifter, prioritet
10/95) har skrivit om beskrivningstexten på plats och efter att injicering av
systemprompt/överlämning/minne har omformat meddelandematrisen. Texten som skickas
uppströms till modellen är oförändrad. En observerad begäran fyller inte heller i något
beständigt Memory (både begärande- och svarshärledd extrahering hoppas över), så modellens
eget svar kan inte återge transkripttext i Memory.

Lagringsytor som fortfarande är öppna och följs upp (**P2**, #12430): den råa
ögonblicksbilden av klientbegäran före skyddsräcket i artefakten för detaljerad loggning;
felsäkert avslag för fortsättning med `previous_response_id`; interna
dispatch-anrop för härledda prompter som bäddar in transkriptet i en syntetiserad
strängprompt (pipeline-steg, kontextöverlämning); samt svarsbrödtexten/den semantiska
cachekopian av ett modellsvar som citerar transkriptet. Dessa är rådata-/svarsklassade
eller valfria ytor utanför P1:s omfattning för beständigt lagrad begärandetext + Memory.

Den interna livscykeln `/api/modality-bridge/video/drilldown` är ett separat,
loopback-/tokenautentiserat cacheunderlag. Varje åtgärd kräver också ett
kanoniskt opakt huvudmanns-ID. Innan en produktionsanropare aktiveras måste den
härleda detta ID från den autentiserade klientorganisationen och får aldrig vidarebefordra
ett värde som valts av klienten. Cachenycklar binder denna huvudman till kanoniska
sessions- och videoreferens-ID:n, lagrar endast deras SHA-256-härledda nycklar och
begränsar både läsning och borttagning till samma huvudman. Cachen lagrar högst 16
härledda JPEG-bildrutor per post, låter dem upphöra efter tio minuter och stöder
begränsade `start`/`end`-läsningar eller uttrycklig borttagning av sessionen.

Varje huvudman är begränsad till 16 poster och 64 MiB kanoniska JPEG-data. Dessa
gränser är oberoende av det globala taket på 64 poster/256 MiB: kvottryck för en
huvudman avlägsnar endast den huvudmannens minst nyligen använda poster innan
global LRU-avlägsning övervägs. Utgångna poster rensas från både huvudmannens och
den globala redovisningen vid cacheaktivitet, medan avbrott och valideringsfel inte
sparar en partiell ersättning.

Cachen avvisar icke-kanonisk Base64, överflödig utfyllnad, media som inte är JPEG,
felaktiga eller trunkerade JPEG-filer samt JPEG-filer som genererar en varning under en
begränsad fullständig bildavkodning med `sharp`. Den kodar om varje godkänd bild som en
kanonisk JPEG, härleder bredd och höjd från de avkodade bytevärdena i stället för att lita
på anroparens fält och kasserar eventuella efterföljande polyglottbytevärden i stället för
att behålla dem. Endast den begränsade kanoniska komprimerade bufferten belastar båda
kvoterna. JSON-överföringsgränsen inkluderar Base64-overhead för taket på 32 MiB för
avkodade indata. Varje
lagrad härledning registrerar dess validerade JPEG-format/upplösning, samplingspolicy,
härledningsversion, skapelsetid, serverberäknade innehållshash och hashade
överordnade referens samt den betrodda anroparens innehållshash för den överordnade
referensen. Avbrott kontrolleras mellan asynkrona avkodnings-/hashfaser före den
atomära cachelagringen.

Denna leveransomgång ansluter ännu inte en produktionsproducent till routen och
tillhandahåller inte val av varianter med flera upplösningar. Den transparenta
begärandesökvägen för Video Bridge medför därför inget ytterligare arbete, medan
klientorganisationsbunden härledning av huvudman och hela FU-08-livscykeln med flera
upplösningar förblir uttryckligt uppföljningsarbete snarare än dokumenterat som
fullständigt beteende.

Bildrutor textbeskrivs sekventiellt med den konfigurerade Video-modellen. En tom
Video-åsidosättning ärver Vision-inställningen. Om båda är tomma väljer Visions
automatiska router den faktiska modellen med stöd för bildanalys. Lyckade textbeskrivningar
ersätter den ursprungliga delen med ett stabilt `[Video description:`-prefix som även
markerar texten som en ej betrodd observation härledd från media och instruerar efterföljande
modeller att inte följa instruktioner som hittas i mediet. Cachenycklar för bildrutetextning
inkluderar JPEG-byten, prompten, tidsstämpeln och den faktiska modellen. Endast lyckade
textbeskrivningar cachas. Cacheposter behåller den faktiska producentmodell som lyckades,
inklusive en reservmodell. Bryggan rapporterar `mixed` när olika bildrutor
producerades av olika modeller. En cacheträff återanvänder producentens identitet
i stället för att märka om den som den begärda routningsplanen. Resultatcachen
för hela videon använder en nyckel som baseras på varje indata som ändrar utdata — prompt, faktisk
modell, samplingspolicy, antal bildrutor, semantiskt analysläge, SHA-256-
fingeravtrycket för den normaliserade fokusledtråden, fokusfönster, `transcript`,
`audioTranscript` och kontaktkarteflaggan — så att en ändring av någon av dessa
dimensioner ger en cachemiss, aldrig återanvändning av inaktuella data. Policyn för visuell deduplicering,
dess version, tröskelvärde och begränsade antal kandidatbildrutor anges också uttryckligen i
resultatcachens nyckel och metadata. En policyändring kan därför inte återanvända en inaktuell
beskrivning av hela videon. Metadata för resultatcache v4 behåller läget och
fingeravtrycket, aldrig användarens råa uppgift. Skyddsräckets metadata rapporterar både det
begärda och det faktiska analysläget. Ett begärt `focused`-läge utan
användbar användartext rapporteras som faktiskt `full`.

Skyddsräcket extraherar alla videodelar som stöds men beskriver inte fler än
`modalityBridgeVideoMaxVideos`. För ett mål som bevisligen har
`supportsVideo === false` blir misslyckade videor och videor över gränsen uttryckliga, säkra
textmarkörer så att ingen rå video finns kvar. När kapaciteten är okänd lämnas dessa delar
orörda. Mål med `supportsVideo === true` kringgår bryggan.
Klientbegärans avbrottssignal vidarebefordras genom hämtning, brokerkön,
underprocesser och anrop för textbeskrivning. Avbrott stoppar bearbetningen mellan videor och tillåter aldrig
rå media genom ett öppet felläge.

Körtidsinställningarna lagras i databasen och valideras med Zod:

| Nyckel                              | Standardvärde | Intervall/beteende                                                                                                       |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`       | Valfri vid körning, måste aktiveras explicit                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` bevarar generiska textbeskrivningar; `focused` använder begränsad, ej betrodd kontext från den senaste användaren |
| `modalityBridgeVideoModel`          | `""`          | Ärv modellen för Vision Bridge                                                                                           |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware` eller proportionell `segment_aware`; detektorfel faller tillbaka till `uniform`                 |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                                           |

Äldre beständigt lagrade timeoutvärden för Video över 120 sekunder begränsas till
brokerns tidsgräns. Nya inställningsskrivningar över den gränsen avvisas.
`GET /api/modality-bridge/video/runtime` kräver betrodd, stämplad loopback-
lokalitet före autentisering eller körningskontroll och kräver därefter
administratörsautentisering. Det returnerar endast `available`, sanerade FFmpeg/ffprobe-versioner och ett fast
skäl när körningsmiljön inte är tillgänglig. Den interna extraktionsslutpunkten är inte
ett offentligt API för uppladdningar: en mättad kö returnerar `503` plus `Retry-After`, en frånkoppling
från anroparen returnerar `499` och brokerns fasta tidsgräns returnerar `504`. Konverterade svar lägger till
`video->text;model=<visionModel>;parts=<videos>` i den centrala
`x-omniroute-modality-bridge`-headern utan att ta bort Vision- eller Audio-segment.

### PII-maskerare (`piiMasker.ts`)

Körs i **båda** stegen.

- **`preCall`** klonar nyttolasten, går igenom `system`, `messages`, `input` och
  `prompt` (inklusive objekt som består av rena strängar) och tillämpar `processPII()` (från
  `@/shared/utils/inputSanitizer`) på strängfälten `content`/`text`. När
  `PII_REDACTION_ENABLED=true` maskeras identifierade personuppgifter i den utgående
  nyttolasten. Detta är oberoende av `INPUT_SANITIZER_MODE` (som endast styr
  policyn för promptinjektion). När maskering är avstängd registrerar anropet antalet
  upptäckter utan att skriva om innehållet.
- **`postCall`** djupklonar svaret och kör `sanitizePIIResponse()` samt
  maskeraren för Responses API-formatet (`maskResponsesOutput` — omfattar
  `output_text` och `output[].content[].text`). Om någon maskering sker ersätter det
  modifierade svaret originalet.

Skyddsräcket blockerar aldrig. Det lägger endast till annoteringar (`meta.detections`,
`meta.redacted`) eller skriver om innehåll.

### Promptinjektion (`promptInjection.ts`)

Identifierar skadliga strukturer i innehåll som användaren tillhandahåller och tillämpar den
konfigurerade policyn. Beteendet styrs av miljövariabler och konstruktoralternativ:

| Inställning        | Miljövariabel                                                                                               | Standardvärde | Effekt                                                                                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiverad          | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`        | När värdet är `false` avslutas skyddsmekanismen i förtid.                                                                                                                                                             |
| Läge               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`        | Policy för injektionsangrepp: `block`, `warn` eller `log`. (`redact` godtas för bakåtkompatibilitet men tar **inte** bort injektionstext; omskrivning av personuppgifter i begäran styrs av `PII_REDACTION_ENABLED`.) |
| Blockeringströskel | alternativet `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Lägsta allvarlighetsgrad som krävs för blockering. Medium är endast observerande som standard.                                                                                                                        |

**Lägesprioritet** (`getMode`): anroparens `options.mode` →
**åsidosättning via DB-funktionsflaggan** `INJECTION_GUARD_MODE` (Instrumentpanel → Inställningar →
Funktionsflaggor) → miljövariabeln `INJECTION_GUARD_MODE` → miljövariabeln `INPUT_SANITIZER_MODE` →
`warn`. En åsidosättning via instrumentpanelen har därför företräde framför
miljövariablerna, så gränssnittet för funktionsflaggor styr det aktiva skyddet
direkt (ingen omstart krävs). DB-läsningen är felsäker: om ett fel uppstår
återgår skyddet till det miljövariabelbaserade beteendet, och när ingen
åsidosättning har angetts är beteendet identiskt med en lösning som endast
använder miljövariabler.

Detekteringskällor:

1. `sanitizeRequest()` från `@/shared/utils/inputSanitizer` (gemensam uppsättning
   detektorer som används på andra ställen i bearbetningskedjan).
2. Inbyggda `DEFAULT_GUARD_PATTERNS` (för närvarande `system_override_inline` och
   `markdown_system_block`, båda med allvarlighetsgraden `high`).
3. Valfria `customPatterns` som skickas via konstruktoralternativ (strängar, reguljära
   uttryck eller poster av typen `{ name, pattern, severity }`).

När `mode === "block"` **och** minst en detektering uppfyller tröskeln för
allvarlighetsgrad returnerar `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I lägena `warn`/`log` loggar skyddsmekanismen
händelsen men tillåter anropet. Den delade hjälpfunktionen
`evaluatePromptInjection()` exporteras också för anropare som behöver utvärdera
promptar utan att gå via registret.

**Skanningsgräns (v3.8.20):** detektorn granskar endast de **första 16 KB** av
den sammanfogade prompttexten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` och
`evaluatePromptInjection()` anropar `slice(0, MAX_INJECTION_SCAN_BYTES)` innan
mönsterloopen körs. Injektionsdirektiv finns nära början av indata, så detta
begränsar regexrelaterad CPU-/GC-belastning för nyttolaster på flera hundra KB
utan att försvaga detekteringen (se #3932, #4041).

### Maskering av autentiseringsuppgifter (`credentialMasker.ts`)

Körs i **båda** stegen, sist i standardkedjan (prioritet `95`). Maskerar
välkända mönster för API-nycklar/hemliga token i den utgående nyttolasten
(meddelandeinnehåll, argument för verktygsanrop och verktygsresultat) **samt**
leverantörens svar, så att en autentiseringsuppgift som klistras in i en prompt
(eller återges av ett verktygsresultat) inte läcker till den externa leverantören
eller tillbaka till klienten.

- **Endast genom aktivt val**, enligt samma konvention som maskering av
  personuppgifter (i anslutning till Hård regel #20): inaktiverad om inte
  `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. När den är avstängd gör skyddsmekanismen
  ingenting — den blockerar aldrig och skriver aldrig om.
- `redactCredentials()` går igenom hela nyttolast-/svarsträdet (`walkValue()`,
  skyddad mot prototype pollution och säker mot cykler via `WeakSet`) och
  ersätter träffar med platshållaren `[REDACTED:<type>]`, samtidigt som endast
  de grenar som faktiskt ändrats klonas.
- `CREDENTIAL_PATTERNS` omfattar nycklar för LLM-leverantörer (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-token
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), betalningsnycklar
  (Stripe, Square), molnnycklar (AWS-åtkomstnyckel, Twilio, SendGrid, Mailgun),
  privata nycklar/JWT:er, anslutningssträngar som innehåller
  autentiseringsuppgifter (`mongodb://user:pass@...` osv.) samt ett generiskt
  mönster för rubrikvärdena `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Rubrikformade nycklar (`authorization`, `x-api-key`, `api-key`, `apikey`)
  maskeras strukturellt (endast värdet, medan schemaprefix som
  `Bearer `/`Basic ` bevaras) i stället för via det generiska textregexet.
- Skyddsmekanismen blockerar aldrig; den skriver endast om (`modifiedPayload` /
  `modifiedResponse`) och lägger till metadata (`meta.credentialsRedacted`,
  `meta.count`).

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

En skyddsmekanism signalerar ”ingen ändring” genom att returnera antingen `void`, `{}` eller
`{ block: false }`. Om `modifiedPayload`/`modifiedResponse` returneras ersätts
värdet som flödar genom kedjan för efterföljande skyddsmekanismer.
`signal?: AbortSignal` förmedlar anroparens livscykel till skyddsmekanismerna. Ett avbrott av begäran är det avsiktliga fail-open-undantaget: mediebryggor avbryter arbetet och städar upp utan att återställa råmedia till ett mål som man vet saknar stöd för det.

## Register (`registry.ts`)

Singleton-instansen `guardrailRegistry` exponerar:

- `register(guardrail)` — lägger till en skyddsmekanism (eller ersätter den utifrån normaliserat namn) och
  sorterar om efter stigande `priority`.
- `clear()` / `list()` — administrativa hjälpfunktioner.
- `runPreCallHooks(payload, context)` — itererar över aktiva skyddsmekanismer, leder
  nyttolasten vidare genom `modifiedPayload` och stoppar vid den första `block: true`.
- `runPostCallHooks(response, context)` — samma flöde på svarssidan.
- `resetGuardrailsForTests({ registerDefaults })` — rensar tillståndet och återregistrerar
  eventuellt standardinställningarna för ren testisolering.

Båda körfunktionerna returnerar `{ blocked, payload|response, results, guardrail?, message? }`,
där `results` är en array med `GuardrailExecutionResult`-poster som innehåller
fälten `blocked`, `skipped`, `modified`, `error` och `meta` per skyddsmekanism,
vilket är användbart för spårning.

### Inaktivera skyddsmekanismer per begäran

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` sammanställer en
dubblettfri lista över namn på skyddsmekanismer som ska hoppas över för den aktuella
begäran. Källor (samtliga valfria, samtliga sammanfogade):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` i begärans innehåll (på toppnivå)
- `metadata.disabledGuardrails` i begärans innehåll
- Headern `x-omniroute-disabled-guardrails` (eller den äldre
  `x-disabled-guardrails`)

Värden kan vara arrayer av strängar eller en kommaseparerad sträng; namn
normaliseras till kebab-case med gemener (`pii_masker` → `pii-masker`). Resultatet
skickas via `context.disabledGuardrails` till registret, som hoppar över
matchande skyddsmekanismer (`skipped: true` i `results`).

## Körningsordning

För varje begäran som går genom `src/sse/handlers/chat.ts` och
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` skapar listan över skyddsregler som ska hoppas över utifrån API-nyckel, brödtext
   och headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kör skyddsreglerna i stigande
   prioritetsordning:
   - Inaktiverade skyddsregler registreras som `skipped`.
   - Varje skyddsregels `preCall` kan skriva om nyttolasten via `modifiedPayload`.
   - Den första `block: true` kortsluter kedjan och hanteraren returnerar
     ett avvisningssvar från skyddsregeln.
3. Den (eventuellt omskrivna) nyttolasten går vidare till kombinationsdirigering och uppströms
   distribution.
4. När svaret har sammanställts kör `guardrailRegistry.runPostCallHooks(...)`
   samma kedja på svaret. `block: true` här tar bort svaret
   från uppströmstjänsten.

Skyddsregler som utlöser undantag registreras med `error: <message>` och loggas via
`logger.warn`, men kedjan fortsätter — den är utformad enligt principen fail-open.

## Konfiguration

Miljövariabler som läses av de inbyggda skyddsreglerna:

| Variabel                              | Används av               | Effekt                                                                                                           |
| ------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Ange `false` för att inaktivera identifiering helt.                                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Injektionspolicy: `warn`, `block` eller `log`. Det äldre värdet `redact` skriver inte om injektionstext.         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Läge för injektionsskyddet; även en funktionsflagga i databasen som **åsidosätter** miljövariablerna (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Lägsta allvarlighetsgrad som `MODE=block` avvisar: `high` (standard), `medium` eller `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Äldre alias för `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | När värdet är `true` maskeras personuppgifter i begäran (oberoende av injektionsläget).                          |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedströms) | Styr maskeringsbeteendet på svarssidan.                                                                          |

Modality Bridge-skyddsreglerna läser körningskonfiguration från det databasbaserade inställningslagret
(`getSettings()`), inte från miljövariabler. De primära nycklarna för Vision är
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` och
`modalityBridgeCacheMaxEntries`. De äldre
`visionBridge*`-nycklarna accepteras endast som den dokumenterade reservlösningen för läsning under en cykel;
skrivningar från kontrollpanelen använder de primära nycklarna. Standardvärdena och reservlösaren
finns i `src/shared/constants/modalityBridgeDefaults.ts`, medan äldre
konstanter behålls i `src/shared/constants/visionBridgeDefaults.ts`.

Audio använder `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` och `modalityBridgeAudioMaxClips` samt de delade
`modalityBridgeCache*`-inställningarna. Audio har ingen reservlösning för äldre nycklar eftersom dessa
nycklar introducerades med Modality Bridge-schemat.

Video använder `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` och
`modalityBridgeVideoTimeout` samt de delade `modalityBridgeCache*`-inställningarna.
Funktionen är inaktiverad som standard eftersom FFmpeg/ffprobe är valfria driftsberoenden
och bildrutetextning ökar latensen och modellkostnaden.

## Anpassade skyddsräcken

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

1. Skapa `src/lib/guardrails/myGuardrail.ts` som utökar `BaseGuardrail`.
2. Implementera `preCall` och/eller `postCall`.
3. Registrera antingen vid import (anropa från `registerDefaultGuardrails`) eller
   anropa `guardrailRegistry.register(...)` under körning — registret ersätter
   alla tidigare skyddsräcken med samma normaliserade namn.
4. Lägg till tester under `tests/unit/` (befintliga exempel:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testning

Använd `resetGuardrailsForTests()` mellan tester för att börja från ett känt tillstånd.
Skicka `{ registerDefaults: false }` för att börja med ett tomt register och
registrera endast de skyddsräcken som testas. Vision Bridge stöder
beroendeinjektion (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge exponerar
motsvarande gränssnitt för inställningar, funktioner, val av STT-modell,
autentiseringskontroller och transkribering. Tester kan därför köra båda flödena utan
åtkomst till databas eller nätverk.

## Se även

- `src/lib/guardrails/` — implementering
- `src/shared/utils/inputSanitizer.ts` — delad detektor som driver
  promptinjektions- och PII-maskering
- `src/shared/constants/visionBridgeDefaults.ts` — standardvärden för Vision Bridge och
  modellista för tvingad brygga
- `src/shared/constants/modalityBridgeDefaults.ts` — delade standardvärden vid körning för Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lager (kretsbrytare, nedkylningsperioder)
- `docs/reference/ENVIRONMENT.md` — fullständig referens för miljövariabler

## Ruttäckning och red-team-testning för injektionsskydd (Fas 8 · Block D)

Injektionsskyddet (`createInjectionGuard` / `withInjectionGuard`) omfattar alla rutter
som tar emot användarprompter. Det respekterar `INJECTION_GUARD_MODE` (standardvärdet `warn` = endast loggning;
`block` = returnerar HTTP 400 `SECURITY_001`).

| Typ              | Rutter                                                                                                                                               | Standardläge |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (befintlig) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generativt       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Textextrahering (`extractMessageContents`) omfattar `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team-testning (varje natt, `nightly-llm-security.yml`):** promptfoo verifierar att varje rutt blockerar
OWASP-LLM-korpusen när `INJECTION_GUARD_MODE=block`; garak kör sonderingar (hoppas över utan hemlighet).
`moderations` ingår för konsekvens — operatörer i blockeringsläge kan undanta den via
`resolveDisabledGuardrails`.

Det nattliga arbetsflödet (`.github/workflows/nightly-llm-security.yml`, cron + manuell
körning) har två jobb:

- **`promptfoo-guard` (blockerande)** — kör `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Varje antagonistiskt fall (t.ex. ”ignorera alla
  tidigare instruktioner…”, jailbreaks i DAN-stil) verifierar att svaret innehåller
  `error.code === "SECURITY_001"`, dvs. att skyddet faktiskt avvisade begäran.
- **`garak` (rådgivande)** — kör garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Villkoras av en
  leverantörshemlighet (`PROMPTFOO_PROVIDER_KEY`); hoppas över utan fel och har suffixet
  `|| true`, så att det rapporterar utan att få CI att misslyckas.

Täckningen för skyddshjälpen (`createInjectionGuard` / `withInjectionGuard`)
omfattar varje `/v1`-rutt som tar emot prompter; prompttext hämtas från
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
