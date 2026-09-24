# Guardrails (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sannhetskilde:** `src/lib/guardrails/`
> **Sist oppdatert:** 2026-08-29 — v3.8.51 (opprinnelsen til Video Bridge-transkripsjoner oppgis av kalleren,
> og er ennå ikke verifisert av serveren — presisert i henhold til #11661)

Sikkerhetsmekanismer håndhever sikkerhet, retningslinjer og innholdstransformasjoner i grensesnittet
mellom OmniRoute og oppstrømsleverandører. Hver sikkerhetsmekanisme kan inspisere (og
eventuelt avvise, transformere eller annotere) forespørselsnyttelaster (`preCall`) og
oppstrømssvar (`postCall`).

Systemet er **fail-open**: Hvis en sikkerhetsmekanisme utløser et unntak under kjøring, registrerer
registeret feilen og fortsetter med neste sikkerhetsmekanisme i stedet for å la
forespørselen mislykkes. Blokkering er en eksplisitt beslutning (`block: true`), aldri et uhell.

## Innebygde sikkerhetsmekanismer

Registeret laster automatisk inn seks sikkerhetsmekanismer i prioritert rekkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Trinn          | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetstall kjøres **først**.

### Vision Bridge (`visionBridge.ts`) — Modalitetsbro PR-1

Fanger opp forespørsler som inneholder bilder og er rettet mot **modeller uten bildestøtte**, og
omdirigerer enten hele forespørselen til en modell med bildestøtte eller erstatter
bildedelene med tekstbeskrivelser generert av en konfigurerbar bildemodell før
oppstrømskallet. Dette gjør det mulig for leverandører som kun støtter tekst, å håndtere
multimodale nyttelaster på en transparent måte.

Flyt:

1. Hopp over hvis målmodellen allerede støtter bilder (med mindre den finnes i
   listen over modeller som tvinges gjennom broen, `isVisionBridgeForcedModel`).
2. Trekk ut bildedeler via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **samlede
   mediedetektoren** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` — den
   eneste sannhetskilden som deles med kompatibilitetsfilteret for kombinasjoner.
   Uttrekkingen er begrenset til toppelementer med formater som
   `replaceImageParts` kan flette inn igjen (uttrekk↔erstatning-kontrakten): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` og Responses API `input_image`. Nøstede treff og
   former som kun fungerer som indikatorer, er materiale for kombinasjonsfilteret og trekkes aldri ut.
   Hopp over hvis ingen blir funnet.
3. Løs kjøretidskonfigurasjonen via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): Nye `modalityBridge*`-
   innstillingsnøkler har forrang; eldre `visionBridge*`-nøkler beholdes som et
   **tilbakefall i én syklus** (tilbakestillingsvindu). Hopp over før noen
   mediegjennomgang hvis broen er deaktivert.
4. Modusvelgeren (`modalityBridgeVisionMode`, se tabellen nedenfor) velger
   mellom omdirigering og beskrivelse. Omdirigering returnerer `modifiedPayload`, der bare
   `model` er byttet ut, samt metadata `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesforløp: Begrens bilder til `maxImages`, sett sammen den oppgavebevisste ledeteksten,
   slå opp i beskrivelsesbufferen, kall bildemodellen **parallelt**
   (`Promise.allSettled`), og sett inn tekstdeler av typen `[Image N]: <description>`
   i stedet. En mislykket beskrivelse gir `null`, og den opprinnelige bildedelen
   **beholdes** (#4012) — bortsett fra i kombinasjonsforløpet for beskrivelser når alle
   beskrivelser mislyktes. Da mottar en bekreftet oppstrømstjeneste uten bildestøtte i stedet
   en plassholder `(utilgjengelig — ingen tilkoblet leverandør med bildestøtte)` (#8430).
6. Returner `modifiedPayload` + metadata (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusvelger (`modalityBridgeVisionMode`)

| Modus      | Standard | Atferd                                                                                                                                                                                                                                                                                                           |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eldre heuristikk, uendret (#6640/#7204): Modeller som ikke er kombinasjonsmodeller, samt `auto/`-modeller, omdirigeres til den beste bildemodellen med mindre den opprinnelige modellen allerede har brukbar legitimasjon (da brukes beskrivelse); kombinasjonsmål beskrives alltid.                             |
| `describe` |          | Beskriv alltid — omdirigeringsblokken hoppes fullstendig over; modellen brukeren valgte, svarer alltid.                                                                                                                                                                                                          |
| `reroute`  |          | Tving omdirigering: Beskyttelsen som beholder modellen med legitimasjon, omgås. Legitimasjonsbeskyttelsen for omdirigerings-**målet** gjelder fortsatt — når det ikke finnes et brukbart mål med bildestøtte, går forespørselen videre til beskrivelse, slik at råbilder aldri når en ren teksttjeneste (#8430). |

Tvungne moduser kortslutter **før** autoheuristikken kjøres; `auto`-atferden
er byteidentisk med sikkerhetsmekanismen fra før PR-1.

#### Oppgavebevisst beskrivelsesledetekst (`modalityBridgeVisionTaskAware`)

Standardverdien er **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) legger til
teksten i den **siste brukermeldingen** (avkortet til 500 tegn) i den grunnleggende
beskrivelsesledeteksten. Dette styrer beskrivelsen mot det brukeren faktisk spurte om
(codex-vision-proxy-mønsteret), og ber bildemodellen transkribere synlig
tekst. Når flagget er av — eller det ikke finnes noen brukertekst — brukes den grunnleggende ledeteksten uendret.

Describe-selvsløyfens egen OpenAI-kompatible forespørsel (`callVisionModelSingle()`
i `visionBridgeHelpers.ts`) ber alltid om `image_url.detail: "high"` —
ubetinget, for alle kallere/leverandører, uten å være styrt av noe klientsignal.
Sampling med lav detaljgrad reduserer OCR-nøyaktigheten for nettopp
teksttranskriberingsoppgaven denne prompten ber om, så selve describe-kallet ber
alltid om høy detaljgrad, uavhengig av hvilket detaljnivå den opprinnelige
innkommende forespørselen brukte. Dette påvirker bare den interne
forespørselskroppen for describe; det endrer ikke hvordan OmniRoute videresender
kallerens egen `image_url.detail` i den primære forespørselen — denne
standardverdien brukes separat, og bare for registrerte OpenCode-klienter, i
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Anthropic-wireformatgrenen av describe-selvsløyfen har ikke noe `detail`-felt
og påvirkes ikke av noen av standardverdiene.

#### Grense for describe-resultat (`modalityBridgeVisionMaxChars`)

| Nøkkel                         | Standardverdi | Område              |
| ------------------------------ | ------------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` eller 100–50000 |

`0` (standardverdien) betyr **ingen grense** — beskrivelsen som returneres av
`callVisionModel()`, sendes videre uendret og bevarer eksisterende
oppførsel. Enhver verdi i området 100–50000 avkorter beskrivelsen med et
`…`-suffiks før den settes inn igjen som `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`).
Øk denne for detaljtunge OCR-oppgaver der den nedstrøms modellen trenger hele
transkripsjonen; reduser den for å begrense tokenbruken fra pratsomme
synsmodeller. Dashbordfeltet finnes i Avansert-panelet i Vision-fanen
(`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og justerer alle
verdier mellom 1 og 99 opp til minimumsverdien 100, samtidig som en eksplisitt
`0` beholdes uendret — `0` er en gyldig Zod-verdi i seg selv
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke bare
standardverdien for «ikke angitt».

#### Describe-hurtigbuffer (`modalityBridge/bridgeCache.ts`)

LRU- og TTL-hurtigbuffer i minnet for describe-resultater, delt på tvers av
hele prosessen. Nøkkel = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
med lengdeprefiks-innramming (ingen kollisjoner mellom feltgrenser).
Modellkomponenten er den **konfigurerte** bro-modellen, ikke modellen som faktisk
svarte — `callVisionModel` kan bruke en reserve internt, og nøkkelbruk per
forsøk ville fragmentert hurtigbufferen. Mislykkede describe-kall
hurtigbufres aldri. Innstillinger:

| Nøkkel                          | Standardverdi | Område  |
| ------------------------------- | ------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`        | —       |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000 |

#### Normalisering av eksterne bilder (describe-selvsløyfe/base64-henting)

Når broen selv henter et **eksternt** bilde — Anthropics describe-selvkall og
base64-konverteringen for claude-wireformat
(`ensureBase64ImagesForClaudeWire`), begge via
`fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` — sendes den
resulterende data-URI-en gjennom `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) før den bygges inn i forespørselen til
synsmodellen. For store bilder skaleres ned til en **langside på 2048 px**
(samsvarende med grensen for størrelsesendring som OpenAI/Anthropic allerede
bruker på serversiden), noe som reduserer opplastingsmengde og ventetid uten å
endre hva synsmodellen ser. Størrelsesendringen bruker `sharp`, lastet via
dynamisk import: På en plattform der den plattformspesifikke binærfilen ikke
kan lastes, vil `normalizeDataUri()` **aldri utløse et unntak** — den faller
tilbake til å sende de opprinnelige bytene uendret, slik at describe- og
base64-konverteringsflyten alltid fortsetter å fungere. Byter som ikke
representerer et bilde (en henting som ikke returnerte et dekodbart bilde),
sendes også videre uendret. Denne normaliseringen er begrenset til bilder som
broen henter for sitt eget selvkall — den brukes aldri på kallerens ubehandlede
nyttelast som sendes videre, i samsvar med prinsippet om at mutasjon kun skal
skje ved aktivt samtykke (Hard regel #20).

#### Innstillingsskjema + migrering

De nye `modalityBridge*`-nøklene Zod-valideres i `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-trioen og
`modalityBridgeAudio*`-gruppen som brukes av Audio Bridge. Migreringen
`141_modality_bridge_settings.sql` kopierer eksisterende eldre
`visionBridge*`-verdier til de tilsvarende nye nøklene (idempotent og
overskriver aldri en `modalityBridge*`-verdi angitt av en operatør); de eldre
nøklene fortsetter å være godkjent som reserveløsning ved lesing i én
utgivelsessyklus.

#### Innsynshode + statistikk

Describe-transformerte svar inneholder
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(bygget av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`,
påført av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`).
Omdirigerte forespørsler får **ikke** noe hode — nyttelasten var uendret, og
modellbyttet er allerede synlig i svarobjektets `model`-felt.

`GET /api/modality-bridge/stats` (administrasjonsautentisering, samme nivå som
`GET /api/settings`) returnerer modalitetsvise tellere i minnet
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og
`video`. `averageLatencyMs` bruker `latencySamples`, ikke alle forsøk, som
nevner; en operasjon uten tidsmåling oppretter ikke en kunstig prøve på null
millisekunder. `bridged` forblir det bakoverkompatible aliaset for vellykkede
konverteringer; mislykkede forsøk øker det ikke.
Tellerne tilbakestilles ved prosessomstart etter hensikten
(telemetri, ikke regnskapsføring).

#### Konfigurasjon i dashbordet

Den dedikerte dashboardsiden er
`/dashboard/settings/modality-bridge`. De URL-adresserbare fanene `Vision`, `Audio`
og `Video` bevarer spørringsparametere når `tab`-verdien endres.
Vision-fanen tilbyr aktivering, modus, modellvalg (inkludert den automatiske
standardverdien), oppgavebevisst prompting, avanserte grenser for tidsavbrudd/bilder/beskrivelseslengde/hurtigbuffer,
kjøretidstellere og en beskyttet eksempelforespørsel. Audio-fanen er også aktiv: den tilbyr
aktivering, en modellvelger kun for STT med Auto, grenser for tidsavbrudd/maksimal klipplengde, lydtellere
og en eksempeltest med `input_audio`. Video-fanen fungerer: den rapporterer
kjøretidstilstanden for FFmpeg/ffprobe — én av fire eksplisitte UI-tilstander (`unknown` mens
sonderingen pågår eller ikke kunne fullføres, `restricted` på en dashboardvert som ikke bruker loopback,
der sonderingen hoppes over på klientsiden, `unavailable` etter at sondering er utført
og manglende støtte er bekreftet, eller `available` med FFmpeg/ffprobe-versjonene) — lagrer
grenser for aktivering/modell/bildefrekvens/video/tidsavbrudd, filtrerer modellvelgeren til modeller med
støtte for visjon og viser videotellere.

Det tidligere Vision Bridge-kortet under AI-innstillingene er en kompatibilitetslenke til den
nye siden; det har ikke lenger en egen kopi av skjemaet. Media Providers
kobler også arbeidsflytene Image-to-Text og Speech-to-Text til de tilsvarende Modality
Bridge-fanene uten å fjerne den eksisterende Speech-to-Text-testarenaen.

**Omgåelse av adgangskontroll for selvløkke:** Når describe-kallet rutes gjennom OmniRoutes
egen `/v1`-selvløkke (modell fra en ikke-standard leverandør), sender underforespørselen
`x-omniroute-admission-bypass: internal` og autentiseres med den utledede
selvløkkelegitimasjonen — den lokale `sk_omniroute`-sentinellen i lokal modus, eller
miljønøkkelen `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` konfigurert av operatøren (#1350), slik at
distribusjoner med `REQUIRE_API_KEY=true` fortsatt kan kjøre describe-kallet. Omgåelsen
godtas bare for akkurat disse legitimasjonsopplysningene, så eksterne klienter kan ikke bruke
headeren til å hoppe over adgangskontrollen.

Eldre standardverdier finnes i `src/shared/constants/visionBridgeDefaults.ts`; de
nye standardverdiene for modus/oppgavebevissthet/hurtigbuffer og innstillingsresolveren finnes i
`src/shared/constants/modalityBridgeDefaults.ts`. Beskyttelsesmekanismen tilbyr et
`deps`-konstruktørvalg slik at tester kan injisere falske implementasjoner av `getSettings` og
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fanger opp chatforespørsler som inneholder lyd, før de når et mål som ikke er
kjent for å godta lydinndata. Den omdirigerer aldri chatforespørselen: lyddeler
transkriberes gjennom det eksisterende OpenAI-kompatible multipart-endepunktet, og den
valgte chatmodellen fortsetter med teksttranskripsjoner.

Flyt:

1. Utled `supportsAudio` gjennom `getResolvedModelCapabilities()`. Eksplisitte
   metadata fra leverandørregisteret har prioritet, deretter statiske modellmetadata og så synkronisert
   `modalities_input`. En deklarert inndataliste uten `audio` gir `false`; hvis det ikke finnes
   noen indikasjon på funksjonaliteten, forblir verdien `null`. Både `false` og `null` aktiverer den
   konservative broen, mens `true` omgår den.
2. Utled `modalityBridgeAudio*`-innstillingene og trekk ut skjøtbare lydkomponenter på toppnivå
   fra hver melding gjennom den delte `detectMediaParts()`-detektoren.
   Støttede overføringsformater er OpenAI `input_audio`, `audio_url` og
   `source.media_type: "audio/*"`. Nøstet lyd oppdages for ruting, men
   fjernes ikke av skjøtebanen. Arbeidsmengden begrenses av `modalityBridgeAudioMaxClips`;
   senere deler forblir urørt.
3. Bruk en konfigurert `provider/model`, eller la `selectAudioBridgeModel()` gå gjennom
   `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrekkefølge og velge den første
   modellen med brukbar, aktiv leverandørlegitimasjon.
4. `callAudioTranscription()` konverterer base64-/data-URI-lyd til en multipart-
   `file`, eller laster ned en ekstern `audio_url` gjennom den offentlige utgående
   beskyttelsesmekanismen med DNS-pinning og en grense på 25 MB. Deretter POSTes filen og den valgte
   modellen til den lokale `/v1/audio/transcriptions`-selvløkken, autentisert med
   `resolveSelfLoopBearer()`. Den eksisterende transkripsjonsruten utfører normalt
   oppslag av legitimasjon, håndtering av nedkjøling/hastighetsbegrensning og leverandørdirigering.
5. Vellykkede kall erstatter delene sine med `[Audio N]: <transcript>`. Kall
   kjøres med `Promise.allSettled`: En individuell feil bevarer den opprinnelige
   lyddelen (#4012-kontrakt). Hvis alle kall mislykkes og det er bevist at målet har
   `supportsAudio === false`, blir delene
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-kontrakt). For
   et ukjent mål (`null`) forblir resultatet urørt dersom alle kall mislykkes. Et påvist
   mål som bare støtter tekst og ikke har brukbar STT-legitimasjon, mottar den samme eksplisitte
   plassholderen uten at det utføres et nettverkskall.

Vellykkede transkripsjoner bruker den prosessomfattende LRU-/TTL-hurtigbufferen for Modality Bridge.
Nøkkelen kombinerer lydreferansen, den stabile operasjonsetiketten `audio-transcription`
og den valgte STT-modellen; feil bufres aldri. Lydforsøk oppdaterer de delte
tellerne `bridged`, `cacheHits`, `failures` og `lastUsedAt`.
Transformerte svar inneholder
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; urørte
forespørsler får ikke et Audio Bridge-segment.

Kjøretidsinnstillingene støttes av databasen og valideres med Zod:

| Nøkkel                        | Standard | Område            |
| ----------------------------- | -------- | ----------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delte hurtigbufferen styres fortsatt av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fanger opp videodeler på toppnivå i Chat Completions `messages` og Responses
API `input` før et mål uten kjent innebygd videostøtte kalles.
Støttede formater er `input_video`, `video_url`, `video_source`, HTTPS-URL-er
og `data:video/*;base64,...`-data-URI-er. Vanlige filnavn i tekst behandles ikke
som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) håndterer gjennomgang av forespørselen,
kapabilitets-/policykontrollen, aggregering per forespørsel og responsnyttelasten.
Arbeid per video – innhenting, hurtigbufferen for hele resultatet, beskrivelse av en
bildesekvens (som kombineres med eventuell lydtranskripsjon angitt av innringeren) samt
målinger/avbrudd/opprydding per forsøk – er skjult bak `processVideoPart` i
`videoBridgePipeline.ts`, som kalles én gang per videodel i løkken til `preCall`.
Denne modulen definerer også de eksplisitte portgrensene `VideoMediaBrokerPort`
(innhenting av byte og uttrekking av utvalgte bilder), `VideoAudioTranscriptionPort`
(kombinering av en lydtranskripsjon angitt av innringeren med tekstingen for de utvalgte
bildene) og `VideoDrilldownPort` (persistensgrensen for detaljanalyse av bilder; ennå ikke
koblet til `processVideoPart` – i dag er det bare den separate ruten
`/api/modality-bridge/video/drilldown` som skriver detaljanalyseoppføringer).

Den offentlige `/v1`-forespørselsbanen importerer eller starter aldri en underprosess.
Eksterne videoer lastes ned med en grense på 50 MiB. Innebygde base64-videoer har en
konservativ grense på 36 MiB dekodet per video, slik at konvolutten for
modell/meldinger/innramming kan holde seg innenfor den offentlige grensen på 50 MiB for
godkjenning av JSON-forespørsler. Innebygd lengde og estimater for dekodet størrelse
kontrolleres før allokering. HTTPS kreves for den opprinnelige eksterne URL-en og hver
viderekobling, ved bruk av det eksisterende vernet for kun offentlige utgående
forbindelser med DNS-festing. Deretter krysser bytene den nøyaktige interne
`POST /api/modality-bridge/video/extract`-grensen til mellomleddet. Denne ruten er både
`LOCAL_ONLY` og `SPAWN_CAPABLE`, godtar bare en autentisert forespørsel per prosess fra
en klarert tilbakekoblingsadresse og godtar aldri en URL, filsystembane, kjørbar fil
eller argumentliste. API-ets behandlingskjede for brødtekststørrelse og behandlerens
inkrementelle leser for brødtekst håndhever uavhengig av hverandre en inndatagrense på
50 MiB for mellomleddet. Den avgrensede køen kjører én uttrekking om gangen, tillater
fire ventende jobber og begrenser ventende inndata til 100 MiB.

I mellomleddet leser `ffprobe` en privat lokal fil. Den faste tillatelseslisten for
formater utelukker spilleliste- og manifestformater. For tillatte beholdere i
MOV-familien forblir eksterne MOV-datareferanser deaktivert som standard, og den faste
kommandoen aktiverer dem ikke. Både `ffprobe` og `ffmpeg` bruker tillatelseslisten for
kun `file`-protokollen, én tråd, faste argumentmatriser, ikke noe skall og kjørbare filer
som slås opp fra `PATH`. Omslagsstrømmer med vedlagte bilder er ikke kandidater for
avspilling. Alle avspillbare strømmer må oppfylle grensene, og en eksplisitt
standardstrøm foretrekkes før det deterministiske alternativet med lavest indeks.
Videoer er begrenset til 600 sekunder, 8 192 piksler per dimensjon og 33 554 432
kildepiksler. FFmpeg henter 1–16 JPEG-bilder fra midtpunkter, skalerer ned den lengste
kanten til maksimalt 1 024 piksler uten å oppskalere mindre inndata og mottar aldri en
URL. Utvalgsmetoden er `uniform` som standard. De valgfrie policyene `scene_aware` og
eksperimentelle `segment_aware` utfører én ekstra fast FFmpeg-passering over den allerede
validerte lokale strømmen, velger avgrensede `showinfo`-tidsstempler for scener og går
deterministisk tilbake til de samme jevnt fordelte midtpunktene ved detektorfeil,
tidsavbrudd, feilformatert utdata eller et tomt kandidatsett. Segmentbevisst modus
fordeler midtpunktsutvalg proporsjonalt mellom de validerte sceneintervallene.
Segmentbevisste bevis og reserveatferd beskrives nærmere nedenfor. Den absolutte grensen
på 16 bilder anvendes etter utvelgelsen i alle policyer. Når en scenebevisst forespørsel
bare har et budsjett på ett bilde, brukes det jevnt fordelte midtpunktet i det aktive
vinduet for hele videoen eller fokusområdet, og `policyEffective: uniform` rapporteres:
Ett enkelt valgt scenebilde kan ikke bevare begge ender av tidsforløpet. En innringer
kan valgfritt angi et endelig fokusvindu (`start`/`end` i sekunder). Grensene avkortes
til mediets varighet, reverserte eller ikke-endelige vinduer avvises, og alle
utvalgspolicyer utføres bare innenfor det normaliserte intervallet. Det resulterende
vinduet inkluderes i utvalgsmetadataene og i prefikset for den uklarerte beskrivelsen,
slik at nedstrømsmodeller kan skille et fokusert utdrag fra hele tidslinjen.

Semantisk fokus for teksting er en separat, eksplisitt innstilling. Standard analysemodus
`full` bevarer den eksisterende bildeledeteksten og videresender aldri forespørselstekst
til tekstingsmodellen. I modusen `focused` leser broen bare den nyeste ikke-tomme,
brukerforfattede `text`/`input_text` fra den samme Chat- eller Responses-beholderen,
normaliserer den til NFC, slår sammen kontrolltegn og mellomrom og begrenser den til
500 Unicode-kodepunkter. Et tomt resultat går tilbake til den nøyaktige `full`-ledeteksten.
Et brukbart hint serialiseres som JSON i en egen blokk for uklarert brukerkontekst og kan
bare prioritere observerbare detaljer. Det kan ikke overstyre den separate advarselen mot
å følge instruksjoner som er synlige eller hørbare i mediet. Tekstlig fokus utleder aldri
`start`/`end` og endrer ikke den tidsmessige utvalgsfunksjonen.

#### FU-07 strukturelle segmentbevis

`segment_aware` bruker én avgrenset forhåndsanalysepassering over den allerede validerte
lokale videostrømmen. Den faste filterkjeden skalerer først ned til maksimalt 320 piksler
i bredden, oppdager sceneendringer og fryste intervaller og henter deretter 1 bilde per
sekund for analyse av uskarphet, gjennomsnittlig luminans og romlig/tidsmessig
informasjon. Passeringen er begrenset til 600 strukturelle utvalg, én FFmpeg-/filtertråd,
de samme tillatelseslistene for kun `file`-protokollen og beholdere, en grense på 1 MiB
for prosessutdata og maksimalt 30 sekunder innenfor mellomleddets delte avbrudd/tidsfrist.
Den godtar aldri en kommando, et filter, en bane eller en URL fra forespørselen.

De strukturelle verdiene er deterministisk samplingsbevis, ikke semantisk
videoforståelse. De utleder ikke motiver, handlinger, bildetekster, tale eller
brukerintensjon. Scene- og frysegrenser danner segmenter; frysedekning, uskarphet,
eksponering, romlig detaljnivå og tidsmessig endring påvirker bare hvordan det
eksisterende budsjettet på 1–16 bilder fordeles. Et fullstendig fryst segment
begrenses til ett bilde, mens segmenter som ikke er fryst, konkurrerer om det
resterende budsjettet. Når antallet grenser overstiger antallet bilder,
beholdes jevn dekning av tidslinjen, slik at raske klipp tidlig i videoen ikke
kan skjule et langt avsluttende segment. Scenegrenser innenfor
analyseoppløsningen på 1 sekund rundt en frysegrense slås sammen.

Manglende filtre, feilformatert/tomt bevismateriale, en detektorfeil eller
tidsavbrudd i den begrensede forhåndsanalysen feiler åpent til nøyaktig den
uniforme midtpunktspolicyen. Et avbrudd fra anroperen eller en tidsfrist fra
megleren feiler ikke åpent: det avslutter den pågående underprosessen,
forhindrer senere bildeekstraksjon, og det private midlertidige treet fjernes
i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, reelle
FFmpeg-fixturer for besparelser i bildetekstanrop etter deduplisering,
budsjettfordeling ved tett bevegelse, bevismateriale for uskarphet/eksponering/SI-TI,
raske klipp med en lang avslutning og falske positiver ved gradvis fading.
Det registrerer veggklokketiden for forhåndsanalysen og, der `/usr/bin/time`
er tilgjengelig, CPU-bruk for underprosessen og maksimal RSS. Kvalitetskontrollene
er kun strukturelle orakler. Kvaliteten til den reelle bildetekstmodellen forblir
`HOLD` fordi dette testoppsettet ikke har noe autorisert endepunkt eller noen
fastlåst dommer. Økonomiske besparelser forblir også `HOLD` med mindre
`--caption-cost-per-call-usd` oppgir et eksplisitt positivt kostnadsestimat per
anrop; skriptet fabrikerer aldri noen av resultatene.

Hvert bilde er begrenset til 4 MiB, alle råbilder samlet til 23 MiB, og det
serialiserte meglersvaret til 32 MiB. En privat midlertidig katalog fjernes i
`finally`. OmniRoute inkluderer ikke FFmpeg og godtar ikke en egendefinert
bane til den kjørbare filen. Før generering av bildetekster bruker broen en
konservativ visuell dedupliseringspassering: Hver JPEG reduseres til en
16×16 gråtonebuffer og sammenlignes bare med det siste bildet som ble beholdt.
For et forespurt bildetekstbudsjett på mer enn ett bilde leverer ekstraksjonen
et begrenset utvalg av kandidater på opptil det dobbelte av budsjettet og aldri
mer enn 16 bilder. Den forespurte grensen brukes først etter deduplisering, og
den første og siste valgte kandidaten beholdes under den endelige uttynningen
når budsjettet er minst to. Den versjonerte policyen
`grayscale-16x16-mean-cells-v2` bruker den største verdien av gjennomsnittlig
luminansdelta og andelen miniatyrbildeceller der det normaliserte deltaet er
minst 0.05. Duplikatterskelen er konstanten 0.04, valgt for forutsigbarhet
fremfor å eksponeres som en kjøretidsinnstilling. Dette sekundære signalet med
høy kontrast bevarer små bevegelser og endringer i synlig tekst som en
sammenligning basert kun på gjennomsnitt kan skjule. Feil i sammenligneren
eller dekoderen feiler åpent og beholder dekningen. Utdataenes metadata skiller
mellom ekstraherte kandidater, bilder som ble brukt, og visuelle duplikater
som ble forkastet.

En eksplisitt merket videodel kan be om et tidsstemplet kontaktark. Broen
bygger et JPEG-rutenett med maksimalt 4 kolonner og 16 bilder. Hver celle på
512 piksler brenner kildens tidsstempel inn i et bunnfelt med høy kontrast,
mens de samme tidsstemplene beholdes i tekstlige metadata for senere
assosiering og revisjon. Hele JPEG-filen er fortsatt begrenset til 32 MiB.
Hvis `sharp` ikke kan dekode eller sette sammen rutenettet, faller broen tilbake
til de individuelle JPEG-bildene; et klientavbrudd forplanter seg fortsatt
gjennom kontaktarkoperasjonen.

Bevismateriale for produksjonssetting holdes bevisst atskilt fra den syntetiske
mikroreferansetesten for komposisjon. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definerer et skjemaversjonert A/B-testoppsett for reelle OpenAI-kompatible
synsmodeller. Det måler tokens rapportert av leverandøren, ende-til-ende-latens
målt med veggklokke (inkludert sammensetting av kontaktarket), antall
modellanrop og bevaring av fakta definert i manifestet. Rå modelsvar skrives
ikke til rapporten; bare SHA-256-digester og samsvarende fakta-ID-er beholdes.
Testoppsettet foretar ingen nettverksanrop eller betalte modellanrop med mindre
`--execute-real` sendes inn og `--model`, `OMNIROUTE_BASE_URL` og
`OMNIROUTE_API_KEY` er konfigurert. Uten en slik eksplisitt reell kjøring
forblir den maskinlesbare konklusjonen `HOLD`; syntetiske målinger av
nyttelast/antall anrop alene er ikke bevismateriale for produksjonssetting.

Anropere kan legge ved en valgfri `transcript.cues`-matrise i en støttet
videodel når de allerede har justert tekst. Hver cue må inneholde `text`, et
endelig `start`/`end`-intervall innenfor den undersøkte varigheten og en
hvitelistet `source` (`client`, `embedded` eller `audio-bridge`);
`confidence` er som standard `1` og må være mellom `0` og `1`. Helt identiske
cues slås sammen. OmniRoute starter aldri transkripsjon fra disse metadataene:
Validerte cues kopieres inn i det beskrevne resultatet sammen med kilde,
konfidens og intervall, og gjengis som uklarerte observasjoner ved siden av
bildetekstene. Ugyldig tekst, tekst utenfor intervallet eller tekst uten
proveniens avvises i stedet for å blandes inn i bildetekststrømmen. Feltet
`source` er for øyeblikket deklarert av anroperen, ikke verifisert av serveren:
OmniRoute håndhever at verdien er én av de tre tillatte strengene, men
bekrefter ennå ikke kryptografisk at en `embedded`- eller `audio-bridge`-etikett
faktisk kom fra en ekstraksjon eid av serveren. Behandle `source` som et
uklarert hint frem til denne verifiseringen er på plass; ikke baser
autorisasjonsbeslutninger på det.

En avansert kallende part kan oppgi et allerede autorisert `audioTranscript`-spor
for den samme videoen. Flettingspunktet kjører visuelle observasjoner og
lydobservasjoner under én tidsfrist og ett avbruddssignal, ordner dem på en
felles tidslinje, slår sammen eksakte duplikater og rapporterer et delresultat
når bare én side lykkes. Et ugyldig `audioTranscript` reduseres til dette
delresultatet — den visuelle beskrivelsen beholdes, og lydgrenen registrerer en
sanitert feilkode — i stedet for at hele videoen mislykkes. Tilgjengelighet per
gren, delresultatflagget og de saniterte feilkodene bevares i
beskrivelsesresultatet, i sikkerhetsfiltermetadataene (`audioFusionRuns`/
`audioFusionPartials`/`audioFusionFailureCodes`), i resultatbufferens metadata
og i broens flettetellere. Standardbanen for Video Bridge starter ikke
tale-til-tekst eller laster ned en ekstra kopi av mediet; uten dette eksplisitte
sporet forblir den begrenset til video.

**Oppbevaring av transkripsjoner (#12150 P1).** Dette gjelder automatisk hver
gang Video Bridge (som i seg selv er valgfri) gjengir en transkripsjonsmarkør —
det finnes ikke noe eget oppbevaringsflagg. Når en forespørsel gjengir en
transkripsjonsmarkør (et `transcript` angitt av den kallende parten eller et
flettet `audioTranscript`), merker sikkerhetsfilteret den som
`videoBridgeObserved` og lager en sladdet skyggekopi av videobeskrivelsen — en
identisk gjengivelse der fritekstinnholdet i hver markør erstattes med
`[redacted-video-transcript]`, bygd ved å erstatte det strukturerte markørfeltet
før strengen settes sammen (aldri ved å analysere den utflatete teksten, slik at
intet markørinnhold — skadelig eller ordinært, inkludert innhold med `]`, som
`[inaudible]`/`[music]` — kan overleve). Forespørselsinnholdet i den lagrede
kalloggen bytter ut hver videoavledede tekstdel med denne sladdede skyggekopien,
identifisert ved innholdslikhet; `fullText`-ankeret leses på nytt fra den
ferdigstilte nyttelasten til sikkerhetsfilteret før kallet, slik at samsvaret
fortsatt lykkes etter at senere sikkerhetsfiltre i kjeden (maskering av
personopplysninger og påloggingsopplysninger, prioriteter 10/95) omskriver
beskrivelsesteksten på stedet, og etter at innsetting av systeminstruks,
overlevering og minne omformer meldingsmatrisen. Innholdet som sendes oppstrøms
til modellen, er uendret. En observert forespørsel fyller heller ikke ut noe
varig minne (både forespørsels- og responsavledet uthenting hoppes over), slik at
modellens eget svar ikke kan gjengi transkripsjonstekst i minnet.

Oppbevaringsflater som fortsatt er åpne og spores for en oppfølging (**P2**,
#12430): det rå øyeblikksbildet av klientforespørselen før sikkerhetsfilteret i
den detaljerte loggartefakten; lukket feilmodus for fortsettelse med
`previous_response_id`; interne utsendinger av avledede instrukser som bygger
inn transkripsjonen i en syntetisert strenginstruks (pipelinefaser,
konteksoverlevering); og responsinnholdet / kopien i den semantiske bufferen av
et modellsvar som siterer transkripsjonen. Dette er rå-/responsklassifiserte
eller valgfrie flater utenfor P1-omfanget for lagret forespørselsinnhold + minne.

Den interne livssyklusen `/api/modality-bridge/video/drilldown` er et separat,
tilbakekoblings-/tokenautentisert buffergrunnlag. Hver operasjon krever også en
kanonisk, ugjennomsiktig hovedaktør-ID. Før en produksjonskallende part
aktiveres, må den utlede denne ID-en fra den autentiserte leietakeren og må
aldri videresende en verdi valgt av klienten. Buffernøkler binder denne
hovedaktøren til kanoniske økt- og videoreferanse-ID-er, lagrer bare deres
SHA-256-avledede nøkler og avgrenser både lesing og sletting til den samme
hovedaktøren. Bufferen lagrer maksimalt 16 avledede JPEG-bilderammer per
oppføring, lar dem utløpe etter ti minutter og støtter avgrensede
`start`-/`end`-lesinger eller eksplisitt sletting av økter.

Hver hovedaktør er begrenset til 16 oppføringer og 64 MiB med kanoniske
JPEG-data. Disse grensene er uavhengige av den globale grensen på 64
oppføringer/256 MiB: kvotepress for en hovedaktør fjerner bare den aktuelle
hovedaktørens minst nylig brukte oppføringer før global LRU-fjerning vurderes.
Utløpte oppføringer fjernes fra både hovedaktørens og den globale regnskapsføringen
ved bufferaktivitet, mens avbrytelse og valideringsfeil ikke lagrer en delvis
erstatning.

Bufferen avviser ikke-kanonisk Base64, overflødig utfylling, medier som ikke er
JPEG, ugyldige eller avkortede JPEG-filer samt JPEG-filer som utløser en
advarsel under en avgrenset `sharp`-dekoding av hele bildet. Den omkoder hvert
godkjente bilde som en kanonisk JPEG, utleder bredde og høyde fra de dekodede
bytene i stedet for å stole på feltene fra den kallende parten, og forkaster
eventuelle etterfølgende polyglottbytter i stedet for å beholde dem. Bare den
avgrensede, kanoniske, komprimerte bufferen belastes begge kvotene. JSON-grensen
på overføringsnivå inkluderer Base64-overhead for grensen på 32 MiB for dekodet
inndata. Hver lagrede avledning registrerer sitt validerte JPEG-format og sin
oppløsning, samplingspolicy, avledningsversjon, opprettelsestid,
serverberegnede innholdshash og hash-kodede overordnede referanse samt den
betrodde kallende partens innholdshash for den overordnede ressursen.
Avbrytelse kontrolleres mellom asynkrone dekodings-/hashfaser før den atomiske
bufferlagringen.

Denne leveransen kobler ennå ikke en produksjonsprodusent til ruten og tilbyr
ikke valg av varianter med flere oppløsninger. Den transparente
Video Bridge-forespørselsbanen medfører derfor ikke noe ekstra arbeid, mens
leietakerbundet utledning av hovedaktør og hele FU-08-livssyklusen med flere
oppløsninger fortsatt er eksplisitt oppfølgingsarbeid og ikke dokumenteres som
fullført funksjonalitet.

Bilder tekstes sekvensielt med den konfigurerte Video-modellen. En tom
Video-overstyring arver Vision-innstillingen. Hvis begge er tomme, velger
Vision-autoruteren den aktive modellen med støtte for bildeanalyse. Vellykkede
bildetekster erstatter den opprinnelige delen med et stabilt `[Video description:`-prefiks
som også markerer teksten som en uklarert observasjon avledet fra medier, og ber
nedstrømsmodeller om ikke å følge instruksjoner som finnes i mediet. Nøkler for
hurtigbufferen for bildetekster inkluderer JPEG-bytene, ledeteksten, tidsstempelet
og den aktive modellen. Bare vellykkede bildetekster bufres. Hurtigbufferoppføringer
beholder den faktiske produsentmodellen som lyktes, inkludert en reservemodell.
Broen rapporterer `mixed` når ulike bilder ble produsert av ulike modeller. Et
hurtigbuffertreff gjenbruker denne produsentidentiteten i stedet for å merke den
på nytt som den forespurte rutingsplanen. Resultathurtigbufferen for hele videoen
har en nøkkel basert på alle inndata som endrer resultatet — ledetekst, aktiv
modell, samplingspolicy, antall bilder, modus for semantisk analyse, SHA-256-
fingeravtrykket til det normaliserte fokushintet, fokusvinduet, `transcript`,
`audioTranscript` og kontaktarkflagget — så endring av en hvilken som helst av
disse dimensjonene gir et hurtigbuffermiss, aldri gjenbruk av et utdatert
resultat. Versjonen, terskelen og det begrensede antallet kandidatbilder for
policyen for visuell deduplisering er også eksplisitte i nøkkelen og metadataene
til resultathurtigbufferen. En policyendring kan derfor ikke gjenbruke en
utdatert beskrivelse av hele videoen. Metadata for resultathurtigbuffer v4
beholder modusen og fingeravtrykket, aldri den rå brukeroppgaven. Metadata for
sikkerhetsmekanismen rapporterer både forespurt og aktiv analysemodus. En
forespurt `focused`-modus uten brukbar brukertekst rapporteres som faktisk
`full`.

Sikkerhetsmekanismen trekker ut alle støttede videodeler, men beskriver ikke
flere enn `modalityBridgeVideoMaxVideos`. For et mål som dokumentert har
`supportsVideo === false`, blir mislykkede videoer og videoer over grensen
erstattet med eksplisitte, sikre tekstmarkører, slik at ingen rå video blir
igjen. Når funksjonaliteten er ukjent, forblir disse delene urørt. Mål med
`supportsVideo === true` omgår broen. Avbruddssignalet fra klientforespørselen
forplanter seg gjennom nedlasting, broker-kø, underprosesser og kall for
bildeteksting. Avbrudd stopper mellom videoer og slipper aldri råmedier gjennom
ved feil.

Kjøretidsinnstillinger lagres i databasen og valideres med Zod:

| Nøkkel                              | Standard    | Område / atferd                                                                                        |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri kjøretidsfunksjon, må aktiveres eksplisitt                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` beholder generelle bildetekster; `focused` bruker begrenset, uklarert kontekst fra siste bruker |
| `modalityBridgeVideoModel`          | `""`        | Arver Vision Bridge-modellen                                                                           |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` eller proporsjonal `segment_aware`; detektorfeil faller tilbake til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Eldre lagrede Video-tidsavbruddsverdier over 120 sekunder begrenses til
broker-fristen. Nye innstillinger over denne grensen avvises.
`GET /api/modality-bridge/video/runtime` krever klarert, stemplet lokal
loopback-tilhørighet før autentisering eller sondering av kjøretidsmiljøet, og
krever deretter administrasjonstilgang. Endepunktet returnerer bare `available`,
rensede FFmpeg/ffprobe-versjoner og en fast årsak når kjøretidsmiljøet er
utilgjengelig. Det interne uttrekkingsendepunktet er ikke et offentlig API for
opplasting: En mettet kø returnerer `503` pluss `Retry-After`, en frakobling fra
kalleren returnerer `499`, og den faste broker-fristen returnerer `504`.
Konverterte svar legger til
`video->text;model=<visionModel>;parts=<videos>` i den sentrale
`x-omniroute-modality-bridge`-headeren uten å fjerne Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kjøres i **begge** faser.

- **`preCall`** kloner nyttelasten, går gjennom `system`, `messages`, `input` og
  `prompt` (inkludert elementer som er rene strenger), og bruker `processPII()`
  (fra `@/shared/utils/inputSanitizer`) på `content`-/`text`-felt av strengtypen.
  Når `PII_REDACTION_ENABLED=true`, blir oppdaget PII maskert i den utgående
  nyttelasten. Dette er uavhengig av `INPUT_SANITIZER_MODE` (som bare styrer
  policyen for ledetekstinjeksjon). Når maskering er deaktivert, registrerer
  kallet antall oppdagelser uten å skrive om innholdet.
- **`postCall`** dypkloner svaret, kjører `sanitizePIIResponse()` samt
  maskeringen for Responses API-formatet (`maskResponsesOutput` — dekker
  `output_text` og `output[].content[].text`). Hvis maskering utføres, erstatter
  det endrede svaret originalen.

Sikkerhetsmekanismen blokkerer aldri. Den annoterer bare (`meta.detections`,
`meta.redacted`) eller skriver om.

### Ledetekstinjeksjon (`promptInjection.ts`)

Oppdager ondsinnede strukturer i brukerlevert innhold og håndhever den
konfigurerte policyen. Atferden styres av miljøvariabler og konstruktør-
alternativer:

| Innstilling        | Miljøvariabel                                                                                               | Standardverdi | Effekt                                                                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivert           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`        | Når den er `false`, kortsluttes sikkerhetsmekanismen.                                                                                                                                                 |
| Modus              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`        | Injeksjonspolicy: `block`, `warn` eller `log`. (`redact` godtas for bakoverkompatibilitet, men fjerner **ikke** injeksjonstekst; omskriving av PII i forespørsler styres av `PII_REDACTION_ENABLED`.) |
| Blokkeringsterskel | `blockThreshold`-alternativet / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Laveste alvorlighetsgrad som kreves for å blokkere. Med standardinnstillingen blir middels alvorlighetsgrad bare observert.                                                                           |

**Modusprioritet** (`getMode`): anroperens `options.mode` →
**overstyring med DB-funksjonsflagg for `INJECTION_GUARD_MODE`** (Kontrollpanel → Innstillinger →
Funksjonsflagg) → miljøvariabelen `INJECTION_GUARD_MODE` → miljøvariabelen `INPUT_SANITIZER_MODE` →
`warn`. En overstyring fra kontrollpanelet har derfor prioritet over miljøvariablene, slik at brukergrensesnittet for funksjonsflagg styrer den kjørende sikkerhetsmekanismen direkte (uten omstart). DB-lesingen er feilsikker:
Hvis den feiler, faller sikkerhetsmekanismen tilbake på den miljøvariabelbaserte virkemåten, og når ingen
overstyring er angitt, er virkemåten identisk med en løsning som bare bruker miljøvariabler.

Deteksjonskilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektor-
   sett som brukes andre steder i behandlingskjeden).
2. Innebygde `DEFAULT_GUARD_PATTERNS` (for øyeblikket `system_override_inline` og
   `markdown_system_block`, begge med alvorlighetsgraden `high`).
3. Valgfrie `customPatterns` som sendes via konstruktøralternativer (strenger, regulære uttrykk
   eller `{ name, pattern, severity }`-oppføringer).

Når `mode === "block"` **og** minst én deteksjon oppfyller terskelen for
alvorlighetsgrad, returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I modusene `warn`/`log` logger sikkerhetsmekanismen hendelsen, men
tillater kallet. Den delte hjelpefunksjonen `evaluatePromptInjection()` eksporteres også
for anropere som må evaluere ledetekster uten å gå gjennom registeret.

**Skannegrense (v3.8.20):** Detektoren undersøker bare de **første 16 KB** av
den sammenføyde ledeteksten — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` bruker `slice(0, MAX_INJECTION_SCAN_BYTES)` før
mønsterløkken kjøres. Injeksjonsdirektiver ligger nær toppen av inndataene, så dette
begrenser CPU-/GC-bruken for regulære uttrykk i nyttelaster på flere hundre KB uten å svekke deteksjonen (jf.
#3932, #4041).

### Maskering av påloggingsinformasjon (`credentialMasker.ts`)

Kjører i **begge** faser, sist i standardkjeden (prioritet `95`). Sladder
velkjente mønstre for API-nøkler / hemmelige tokener fra den utgående nyttelasten (meldingsinnhold,
verktøykallargumenter, verktøyresultater) **og** leverandørresponsen, slik at
påloggingsinformasjon som limes inn i en ledetekst (eller gjentas i et verktøyresultat), ikke lekker
til den oppstrøms leverandøren eller tilbake til klienten.

- **Kun etter aktivt valg**, etter samme konvensjon som PII-sladding (tilgrensende til hard regel nr. 20):
  deaktivert med mindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er slått av, gjør sikkerhetsmekanismen ingenting —
  den blokkerer aldri og skriver aldri om.
- `redactCredentials()` går gjennom hele nyttelast-/responstreet (`walkValue()`,
  sikret mot prototypeforurensning og syklussikkert via `WeakSet`) og erstatter treff med
  en `[REDACTED:<type>]`-plassholder, samtidig som bare grenene som faktisk
  ble endret, klones.
- `CREDENTIAL_PATTERNS` dekker nøkler for LLM-leverandører (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokener (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøkler (Stripe, Square), sky-
  nøkler (AWS-tilgangsnøkkel, Twilio, SendGrid, Mailgun), private nøkler / JWT-er,
  tilkoblingsstrenger som inneholder påloggingsinformasjon (`mongodb://user:pass@...` osv.), samt
  et generisk mønster for hodeverdier av typen `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Hodelignende nøkler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) sladdes strukturelt (bare verdien, mens skjemaprefikser som
  `Bearer `/`Basic ` beholdes) i stedet for via det generiske regulære tekstuttrykket.
- Sikkerhetsmekanismen blokkerer aldri; den skriver bare om (`modifiedPayload` /
  `modifiedResponse`) og legger til merknader (`meta.credentialsRedacted`, `meta.count`).

Regresjonsvern: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true kortslutter kjeden
  message?: string; // vises ved blokkering
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returneres av preCall for å omskrive forespørselen
  modifiedResponse?: TValue; // returneres av postCall for å omskrive svaret
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

En sikkerhetsmekanisme signaliserer «ingen endring» ved å returnere enten `void`, `{}` eller
`{ block: false }`. Hvis en `modifiedPayload`/`modifiedResponse` returneres, erstattes
verdien som flyter gjennom kjeden for etterfølgende sikkerhetsmekanismer.
`signal?: AbortSignal` viderefører livssyklusen til den som kaller, inn i sikkerhetsmekanismene. Avbrudd av en forespørsel er det tilsiktede fail-open-unntaket: mediebroer stopper arbeidet og rydder opp uten å gjenopprette råmedier til et mål som man vet ikke støtter dem.

## Register (`registry.ts`)

Singleton-objektet `guardrailRegistry` eksponerer:

- `register(guardrail)` — legger til en sikkerhetsmekanisme (eller erstatter etter normalisert navn) og
  sorterer på nytt etter stigende `priority`.
- `clear()` / `list()` — administrative hjelpefunksjoner.
- `runPreCallHooks(payload, context)` — itererer gjennom aktive sikkerhetsmekanismer, fører
  nyttelasten videre gjennom `modifiedPayload` og stopper ved den første `block: true`.
- `runPostCallHooks(response, context)` — samme flyt på svarsiden.
- `resetGuardrailsForTests({ registerDefaults })` — tømmer tilstanden og registrerer eventuelt
  standardinnstillingene på nytt for ren testisolasjon.

Begge kjørerne returnerer `{ blocked, payload|response, results, guardrail?, message? }`,
der `results` er en matrise med `GuardrailExecutionResult`-oppføringer som inneholder
feltene `blocked`, `skipped`, `modified`, `error` og `meta` per sikkerhetsmekanisme,
noe som er nyttig for sporing.

### Deaktivere sikkerhetsmekanismer per forespørsel

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` samler en
duplikatfri liste over navn på sikkerhetsmekanismer som skal hoppes over for den gjeldende
forespørselen. Kilder (alle valgfrie, alle slås sammen):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` i forespørselskroppen (på toppnivå)
- `metadata.disabledGuardrails` i forespørselskroppen
- Headeren `x-omniroute-disabled-guardrails` (eller den eldre
  `x-disabled-guardrails`)

Verdier kan være matriser med strenger eller en kommaseparert streng. Navn
normaliseres til kebab-case med små bokstaver (`pii_masker` → `pii-masker`). Resultatet
sendes via `context.disabledGuardrails` til registeret, som hopper over
samsvarende sikkerhetsmekanismer (`skipped: true` i `results`).

## Utførelsesrekkefølge

For hver forespørsel som går gjennom `src/sse/handlers/chat.ts` og
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` bygger listen over elementer som skal hoppes over, basert på API-nøkkel, body
   og headere.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` kjører sikkerhetsmekanismene i stigende
   prioritetsrekkefølge:
   - Deaktiverte sikkerhetsmekanismer registreres som `skipped`.
   - Hver sikkerhetsmekanismes `preCall` kan skrive om payloaden via `modifiedPayload`.
   - Den første `block: true` avbryter kjeden, og handleren returnerer
     et avvisningssvar fra sikkerhetsmekanismen.
3. Den (potensielt omskrevne) payloaden går videre til kombinasjonsruting og oppstrøms
   videresending.
4. Etter at svaret er satt sammen, kjører `guardrailRegistry.runPostCallHooks(...)`
   den samme kjeden på svaret. `block: true` her forkaster det oppstrøms
   svaret.

Sikkerhetsmekanismer som utløser unntak, registreres med `error: <message>` og logges via
`logger.warn`, men kjeden fortsetter — fail-open med hensikt.

## Konfigurasjon

Miljøvariabler som leses av de innebygde sikkerhetsmekanismene:

| Variabel                              | Brukes av                | Effekt                                                                                                                |
| ------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Sett til `false` for å deaktivere deteksjon fullstendig.                                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Retningslinje for injeksjon: `warn`, `block` eller `log`. Den eldre verdien `redact` skriver ikke om injeksjonstekst. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Modus for injeksjonsbeskyttelsen; også et funksjonsflagg i databasen som **overstyrer** miljøvariablene (DB > ENV).   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Laveste alvorlighetsgrad som `MODE=block` avviser: `high` (standard), `medium` eller `low`.                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Eldre alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Når satt til `true`, blir PII i forespørselen sladdet (uavhengig av injeksjonsmodus).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nedstrøms) | Styrer maskeringsatferd på svarsiden.                                                                                 |

Sikkerhetsmekanismene i Modality Bridge leser kjøretidskonfigurasjon fra det databasebaserte innstillingslageret
(`getSettings()`), ikke fra miljøvariabler. De primære nøklene for Vision er
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` og
`modalityBridgeCacheMaxEntries`. De eldre
`visionBridge*`-nøklene godtas bare som den dokumenterte reservemekanismen for lesing i én syklus;
skriving fra kontrollpanelet bruker de primære nøklene. Standardverdier og fallback-resolveren
finnes i `src/shared/constants/modalityBridgeDefaults.ts`, mens eldre
konstanter beholdes i `src/shared/constants/visionBridgeDefaults.ts`.

Audio bruker `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` og `modalityBridgeAudioMaxClips`, i tillegg til de delte
`modalityBridgeCache*`-innstillingene. Audio har ingen fallback til eldre nøkler fordi disse
nøklene ble introdusert med Modality Bridge-skjemaet.

Video bruker `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` og
`modalityBridgeVideoTimeout`, i tillegg til de delte `modalityBridgeCache*`-innstillingene.
Den er deaktivert som standard fordi FFmpeg/ffprobe er valgfrie driftsavhengigheter,
og teksting av bilderammer øker latensen og modellkostnaden.

## Egendefinerte sikkerhetsmekanismer

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

Trinn:

1. Opprett `src/lib/guardrails/myGuardrail.ts` som utvider `BaseGuardrail`.
2. Implementer `preCall` og/eller `postCall`.
3. Registrer enten ved importtidspunktet (legg til fra `registerDefaultGuardrails`), eller
   kall `guardrailRegistry.register(...)` under kjøring — registeret erstatter
   eventuelle tidligere sikkerhetsmekanismer med samme normaliserte navn.
4. Legg til tester under `tests/unit/` (eksisterende eksempler:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testing

Bruk `resetGuardrailsForTests()` mellom testene for å starte fra en kjent tilstand.
Send `{ registerDefaults: false }` for å starte med et tomt register og
registrere bare sikkerhetsmekanismene som testes. Vision Bridge støtter avhengighets-
injeksjon (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge tilbyr
tilsvarende koblingspunkter for innstillinger, funksjonalitet, valg av STT-modell, kontroll
av legitimasjon og transkribering. Testene kan derfor kjøre begge flytene uten tilgang
til database eller nettverk.

## Se også

- `src/lib/guardrails/` — implementasjon
- `src/shared/utils/inputSanitizer.ts` — delt detektor som driver
  beskyttelse mot promptinjeksjon og maskering av personopplysninger
- `src/shared/constants/visionBridgeDefaults.ts` — standardinnstillinger for Vision Bridge og
  modelliste for tvungen brokobling
- `src/shared/constants/modalityBridgeDefaults.ts` — delte standardinnstillinger for kjøring av Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalt lag (automatsikring, nedkjølingsperioder)
- `docs/reference/ENVIRONMENT.md` — fullstendig referanse for miljøvariabler

## Rutedekning og red-team-testing for injeksjonsbeskyttelse (fase 8 · blokk D)

Injeksjonsbeskyttelsen (`createInjectionGuard` / `withInjectionGuard`) dekker alle ruter
som godtar brukerprompter. Den tar hensyn til `INJECTION_GUARD_MODE` (standardverdien `warn` = bare logging;
`block` = returnerer HTTP 400 `SECURITY_001`).

| Type                 | Ruter                                                                                                                                                | Standardmodus |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekst (eksisterende) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativ            | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Data                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Tekstuttrekk (`extractMessageContents`) dekker `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hver natt, `nightly-llm-security.yml`):** promptfoo validerer at hver rute blokkerer
OWASP-LLM-korpuset i `INJECTION_GUARD_MODE=block`; garak kjører sonder (hoppes over uten hemmelighet).
`moderations` er inkludert for konsistens — operatører i blokkeringsmodus kan unnta den via
`resolveDisabledGuardrails`.

Den nattlige arbeidsflyten (`.github/workflows/nightly-llm-security.yml`, cron + manuell
utløsning) har to jobber:

- **`promptfoo-guard` (blokkerende)** — kjører `promptfoo eval -c promptfooconfig.yaml`
  med `INJECTION_GUARD_MODE=block`. Hvert angrepstilfelle (f.eks. «ignorer alle
  tidligere instruksjoner …», jailbreaks i DAN-stil) kontrollerer at svaret inneholder
  `error.code === "SECURITY_001"`, dvs. at sikkerhetsmekanismen faktisk avviste forespørselen.
- **`garak` (rådgivende)** — kjører garak `--probes promptinject,dan,leakreplay`
  mot en lokal OmniRoute-instans (`http://localhost:20128/v1`). Avhenger av en
  leverandørhemmelighet (`PROMPTFOO_PROVIDER_KEY`); hoppes kontrollert over og har suffikset
  `|| true`, slik at den rapporterer uten at CI feiler.

Dekningen av hjelpefunksjonen for beskyttelse (`createInjectionGuard` / `withInjectionGuard`)
omfatter alle `/v1`-ruter som inneholder prompter; prompttekst hentes fra
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` av
`extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
