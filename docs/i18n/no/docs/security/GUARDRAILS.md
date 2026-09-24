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

## Innebygde sikkerhetsbarrierer

Registeret laster automatisk seks sikkerhetsbarrierer i prioritert rekkefølge ved import
(se `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Navn                | Trinn(er)      | Fil                   |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lavere prioritetsnumre kjører **først**.

### Vision Bridge (`visionBridge.ts`) – Modality Bridge PR-1

Fanger opp bildebærende forespørsler rettet mot **ikke-synsmodeller** og enten
videresender hele forespørselen til en syns-kompatibel modell eller erstatter
bildedelene med tekstbeskrivelser produsert av en konfigurerbar synsmodell
før oppstrømskallet. Dette lar tekstbaserte leverandører transparent håndtere
multimodale nyttelaster.

Flyt:

1. Hopp over hvis målmodellen allerede støtter syn (med mindre den vises i
   listen over tvungne broer `isVisionBridgeForcedModel`).
2. Trekk ut bildedeler via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), som delegerer til den **enhetlige
   mediedetektoren** `detectMediaParts()` i `open-sse/utils/mediaParts.ts` –
   den eneste kilden til sannhet delt med kompatibilitetsfilteret for kombinasjoner.
   Ekstraksjon er tillatt for toppnivådeler av formene
   `replaceImageParts` kan spleise tilbake (kontrakten for ekstraksjon↔erstatning):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, og Responses API `input_image`. Nestede treff og
   indikator-bare former er materiale for kombinasjonsfilteret og blir aldri
   ekstrahert. Hopp over hvis ingen funnet.
3. Løs kjøretidskonfigurasjon via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nye `modalityBridge*`
   innstillingsnøkler vinner; eldre `visionBridge*` nøkler forblir en
   **én-syklus tilbakefall** (tilbakerullingsvindu). Hopp over før noen
   mediegjennomgang når broen er deaktivert.
4. Modusvelger (`modalityBridgeVisionMode`, se tabellen nedenfor) bestemmer
   videresending vs. beskrivelse. Videresending returnerer `modifiedPayload`
   med kun `model` byttet, pluss meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beskrivelsesbane: begrens bilder til `maxImages`, sett sammen den
   oppgavebevisste ledeteksten, konsulter beskrivelsesbufferen, kall
   synsmodellen **parallelt** (`Promise.allSettled`), og injiser
   `[Image N]: <description>` tekstbiter i deres sted. En mislykket
   beskrivelse gir `null`, og den originale bildedelen blir
   **bevart** (#4012) – unntatt på kombinasjonsbeskrivelsesbanen når hver
   beskrivelse mislyktes, hvor en bekreftet ikke-syns-oppstrøm får en
   `(utilgjengelig – ingen syns-kompatibel leverandør tilkoblet)` stub i stedet (#8430).
6. Returner `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Modusvelger (`modalityBridgeVisionMode`)

| Modus      | Standard | Oppførsel                                                                                                                                                                                                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eldre heuristikk, urørt (#6640/#7204): ikke-kombinasjons-/`auto`/modeller videresender til den beste synsmodellen med mindre den originale modellen allerede har brukbare legitimasjoner (da beskriver den); kombinasjonsmål beskriver alltid.                                           |
| `describe` |          | Beskriv alltid – videresendingsblokken hoppes over helt; brukerens valgte modell svarer alltid.                                                                                                                                                                                          |
| `reroute`  |          | Tving videresending: beskyttelsen for modeller med legitimasjon omgås. Videresendings-**mål**-legitimasjonsbeskyttelsen gjelder fortsatt – når ingen brukbar synsmål eksisterer, faller forespørselen gjennom til beskrivelse slik at råbilder aldri når en tekstbasert backend (#8430). |

Tvungne moduser kortslutter **før** auto-heuristikken kjører; `auto`-oppførselen
er byte-identisk med sikkerhetsbarrieren før PR-1.

#### Oppgavebevisst beskrivelsesprompt (`modalityBridgeVisionTaskAware`)

Standard **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) legger til
teksten fra den **siste brukermeldingen** (avkortet til 500 tegn) til den
grunnleggende beskrivelsesprompten, og styrer beskrivelsen mot det brukeren
faktisk spurte om (codex-vision-proxy-mønster) og ber synsmodellen om å
transkribere synlig tekst. Med flagget av – eller ingen brukertekst – brukes
den grunnleggende prompten uendret.

Beskriv-selvsløyfens egen OpenAI-kompatible forespørsel (`callVisionModelSingle()` i `visionBridgeHelpers.ts`) ber alltid om `image_url.detail: "high"` – ubetinget, for hver anroper/leverandør, ikke styrt av noe klientsignal. Lavdetaljert sampling forringer OCR-nøyaktigheten for nøyaktig den teksttranskripsjonsoppgaven denne prompten ber om, så beskriv-kallet ber alltid om høy detaljgrad uavhengig av hvilket detaljnivå den opprinnelige innkommende forespørselen brukte. Dette påvirker kun den interne beskriv-forespørselsteksten; det endrer ikke hvordan OmniRoute videresender anroperens egen `image_url.detail` på den primære forespørselen – den standarden brukes separat, og kun for oppdagede OpenCode-klienter, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic-wire-format-grenen av beskriv-selvsløyfen har ingen `detail`-felt og påvirkes ikke av noen av standardinnstillingene.

#### Beskriv utdatagrense (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range               |
| ------------------------------ | ------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` eller 100–50000 |

`0` (standard) betyr **ingen grense** – beskrivelsen returnert av `callVisionModel()` sendes gjennom uendret, og bevarer den eksisterende oppførselen. Enhver verdi i området 100–50000 avkorter beskrivelsen med et `…`-suffiks før den settes inn igjen som `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` i `src/lib/guardrails/visionBridge.ts`). Øk denne for detaljrike OCR-oppgaver der nedstrømsmodellen trenger full transkripsjon; senk den for å begrense token-bruk på pratsomme visjonsmodeller. Dashboard-feltet finnes på Vision-fanens Avansert-panel (`modality-bridge-max-chars` i `ModalityBridgeVisionTab.tsx`) og klemmer enhver verdi mellom 1 og 99 opp til 100-gulvet, samtidig som en eksplisitt `0` forblir uberørt – `0` er en gyldig Zod-verdi i seg selv (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ikke bare standardverdien for "ikke satt".

#### Beskriv-buffer (`modalityBridge/bridgeCache.ts`)

LRU + TTL-buffer i minnet for beskriv-utdata, delt prosess-bredt. Nøkkel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` med lengdeprefiks-innramming (ingen feltgrense-kollisjoner). Modelldelen er den **konfigurerte** bro-modellen, ikke modellen som faktisk svarte – `callVisionModel` kan falle tilbake internt, og nøkling per forsøk ville fragmentere bufferen. Mislykkede beskrivelser blir aldri bufret. Innstillinger:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Fjernbilde-normalisering (selvsløyfe beskriv/base64-henting)

Når broen selv henter et **fjernbilde** – Anthropic-beskriv-selvkall og claude-wire-format base64-konvertering (`ensureBase64ImagesForClaudeWire`), begge via `fetchRemoteImageAsDataUri()` i `visionBridgeHelpers.ts` – sendes den resulterende data-URI-en gjennom `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) før den bygges inn i visjonsmodellforespørselen. Overdimensjonerte bilder nedskaleres til en **2048px lang kant** (som matcher størrelsesbegrensningen OpenAI/Anthropic allerede bruker på serversiden), noe som reduserer opplastingsbytes/latens uten å endre hva visjonsmodellen ser. Størrelsesendring bruker `sharp`, lastet via dynamisk import: på en plattform der dens native binærfil ikke klarer å laste, **kaster `normalizeDataUri()` aldri en feil** – den faller tilbake til en gjennomstrømning av de originale bytene, slik at beskriv/base64-konverteringsbanen alltid fortsetter å fungere. Ikke-bilde-bytes (en henting som ikke returnerte et dekodert bilde) sendes også gjennom uberørt. Denne normaliseringen er begrenset til bilder broen henter for sitt eget selvkall – den blir aldri brukt på anroperens rå gjennomstrømningsnyttelast, i samsvar med prinsippet om kun opt-in-mutasjon (Hard Regel #20).

#### Innstillingsskjema + migrering

De nye `modalityBridge*`-nøklene Zod-valideres i `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*`-trioen, og `modalityBridgeAudio*`-gruppen som brukes av Audio Bridge. Migrering `141_modality_bridge_settings.sql` kopierer eksisterende eldre `visionBridge*`-verdier til de matchende nye nøklene (idempotent, overskriver aldri en operatør-satt `modalityBridge*`-verdi); de eldre nøklene forblir akseptert som en lesefallback for én utgivelsessyklus.

#### Gjennomsiktighetshode + statistikk

Beskriv-transformerende svar bærer `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (bygget av `buildModalityBridgeHeader()` i `modalityBridge/bridgeStats.ts`, stemplet av `withModalityBridgeHeader()` i `src/sse/handlers/chatHelpers.ts`). Omdirigerte forespørsler får **ingen** header – nyttelasten var uberørt og modellbyttet er allerede synlig i svartekstens `model`-felt.

`GET /api/modality-bridge/stats` (administrasjonsautentisering, samme nivå som `GET /api/settings`) returnerer de minnebaserte tellerne per modalitet `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio` og `video`. `averageLatencyMs` bruker `latencySamples`, ikke alle forsøk, som sin nevner; en operasjon uten tidsmåling fabrikerer ikke et null-millisekunds utvalg. `bridged` forblir det bakoverkompatible aliaset for vellykkede konverteringer; mislykkede forsøk øker den ikke. Tellerne nullstilles ved prosessomstart etter design (telemetri, ikke regnskap).

#### Dashboard-konfigurasjon

Den dedikerte dashbordsiden er
`/dashboard/settings/modality-bridge`. Dens URL-adresserbare `Vision` (Syn), `Audio`
(Lyd) og `Video` (Video)-faner bevarer spørreparametere mens `tab`-verdien byttes.
Syn-fanen eksponerer aktivering, modus, modellvalg (inkludert den automatiske
standardinnstillingen), oppgavebevisst prompting, avanserte tidsavbrudd/bilde/beskrivelseslengde/buffer-
grenser, kjøretids-
tellere og en beskyttet prøveforespørsel. Lyd-fanen er også live: den eksponerer
aktivering, en STT-kun modellvelger med Auto, tidsavbrudd/maks-klipp-grenser, lyd-
tellere og en `input_audio`-prøvetest. Video-fanen er funksjonell: den rapporterer
FFmpeg/ffprobe-kjøretidsstatusen – en av fire eksplisitte UI-tilstander (`unknown` mens
sonden er underveis eller ikke kunne fullføres, `restricted` på en ikke-loopback
dashbordvert der sonden hoppes over på klientsiden, `unavailable` når den er sjekket
og bekreftet manglende, eller `available` med FFmpeg/ffprobe-versjonene) – vedvarer
aktiverings-/modell-/ramme-/video-/tidsavbruddsgrenser, filtrerer modellvelgeren til syns-kompatible
modeller, og eksponerer videotellere.

Det tidligere Vision Bridge-kortet under AI-innstillinger er en kompatibilitetslenke til den
nye siden; den eier ikke lenger en andre kopi av skjemaet. Medieleverandører
kobler også bilde-til-tekst og tale-til-tekst-arbeidsflyter til de tilsvarende Modality
Bridge-fanene uten å fjerne den eksisterende tale-til-tekst-lekeplassen.

**Selvsløyfe-adgangsomgåelse:** når beskrivelseskallet rutes gjennom OmniRoutes
egen `/v1` selvsløyfe (ikke-standard leverandørmodell), sender underforespørselen
`x-omniroute-admission-bypass: internal` og autentiseres med den løste
selvsløyfe-legitimasjonen – den lokale `sk_omniroute`-sentinelen i lokal modus, eller den
operatørkonfigurerte `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` miljønøkkelen (#1350) slik at
`REQUIRE_API_KEY=true`-distribusjoner fortsatt kan kjøre beskrivelseskallet. Omgåelsen
respekteres kun for disse nøyaktige legitimasjonene, slik at eksterne klienter ikke kan bruke
headeren til å hoppe over adgangskontroll.

Eldre standardinnstillinger ligger i `src/shared/constants/visionBridgeDefaults.ts`; de
nye modus-/oppgavebevisste/buffer-standardinnstillingene og innstillingsløseren ligger i
`src/shared/constants/modalityBridgeDefaults.ts`. Sikkerhetsmekanismen eksponerer et
`deps`-konstruktøralternativ slik at tester kan injisere falske `getSettings`- og
`callVisionModel`-implementeringer.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Avskjærer lydbærende chatforespørsler før de når et mål som ikke er
kjent for å akseptere lydinndata. Den omdirigerer aldri chatforespørselen: lyddeler
transkriberes gjennom det eksisterende OpenAI-kompatible multipart-endepunktet, og den
valgte chatmodellen fortsetter med teksttranskripsjoner.

Flyt:

1.  Løs `supportsAudio` gjennom `getResolvedModelCapabilities()`. Eksplisitt
    leverandørregistermetadata vinner, deretter statisk modellmetadata, deretter synkronisert
    `modalities_input`. En deklarert inndataliste uten `audio` er `false`; ingen
    kapasitetsbevis forblir `null`. Både `false` og `null` aktiverer den
    konservative broen, mens `true` omgår den.
2.  Løs `modalityBridgeAudio*`-innstillinger og trekk ut delbare toppnivå
    lyddeler fra hver melding gjennom den delte `detectMediaParts()`-
    detektoren. Støttede wire-former er OpenAI `input_audio`, `audio_url`, og
    `source.media_type: "audio/*"`. Nestet lyd oppdages for ruting, men fjernes ikke
    av splice-banen. Arbeidet er begrenset av `modalityBridgeAudioMaxClips`;
    senere deler forblir uberørt.
3.  Respekter en konfigurert `provider/model`, eller la `selectAudioBridgeModel()` gå
    gjennom `AUDIO_TRANSCRIPTION_PROVIDERS` i stabil katalogrekkefølge og velge den første
    modellen med en brukbar aktiv leverandørlegitimasjon.
4.  `callAudioTranscription()` konverterer base64/data-URI-lyd til en multipart
    `file`, eller laster ned en ekstern `audio_url` gjennom den offentlige utgående
    sikkerhetsmekanismen med DNS-pinning og en 25 MB grense. Den POSTer deretter filen og den valgte
    modellen til den lokale `/v1/audio/transcriptions`-selvsløyfen, autentisert med
    `resolveSelfLoopBearer()`. Den eksisterende transkripsjonsruten utfører normal
    legitimasjonsoppslag, nedkjølings-/rate-begrensningshåndtering og leverandørutsendelse.
5.  Vellykkede kall erstatter delene sine med `[Audio N]: <transcript>`. Kall
    kjøres med `Promise.allSettled`: en individuell feil bevarer den originale
    lyddelen (#4012-kontrakt). Hvis hvert kall mislykkes og målet er bevist
    `supportsAudio === false`, blir delene
    `[Audio N]: (utilgjengelig — ingen STT-leverandør tilkoblet)` (#8430-kontrakt). For
    et ukjent mål (`null`), forblir et resultat med bare feil uberørt. Et bevist
    tekst-kun mål uten brukbar STT-legitimasjon mottar den samme eksplisitte
    stubben uten å utstede et nettverkskall.

Vellykkede transkripsjoner bruker den prosessomfattende Modality Bridge LRU/TTL-bufferen.
Nøkkelen kombinerer lydreferansen, den stabile `audio-transcription`-operasjonsetiketten,
og valgt STT-modell; feil bufres aldri. Lydforsøk oppdaterer
de delte `bridged`, `cacheHits`, `failures` og `lastUsedAt`-tellerne.
Transformerte svar bærer
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; uberørte
forespørsler mottar ikke et Audio Bridge-segment.

Kjøretidsinnstillinger er DB-støttet og Zod-validert:

| Nøkkel                        | Standard | Område            |
| :---------------------------- | :------- | :---------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                 |
| `modalityBridgeAudioModel`    | `""`     | Auto eller STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000       |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10              |

Den delte bufferen forblir kontrollert av `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` og `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Avskjærer video-deler på toppnivå i Chat Completions `messages` og Responses API `input` før et mål uten kjent innebygd videostøtte kalles.
Støttede former er `input_video`, `video_url`, `video_source`, HTTPS-URL-er,
og `data:video/*;base64,...` data-URI-er. Rene filnavn i tekst behandles ikke
som video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) eier forespørselstraversering,
kapasitets-/policy-sjekken, aggregering per forespørsel, og responsnyttelasten.
Arbeid per video – anskaffelse, hele-resultat-bufferen, beskrivelse av en
bilderamme-sekvens (som smelter sammen eventuell anroper-deklarert lydtranskripsjon),
og beregninger/avbrudd/opprydding per forsøk – er skjult bak `processVideoPart`
i `videoBridgePipeline.ts`, kalt én gang per videodel inne i `preCall`s løkke.
Den modulen definerer også de eksplisitte portgrensene `VideoMediaBrokerPort`
(anskaffer bytes og trekker ut samplede rammer), `VideoAudioTranscriptionPort`
(smelter sammen en anroper-deklarert lydtranskripsjon med de samplede bildetekstene),
og `VideoDrilldownPort` (ramme-drilldown-persistensgrensen; ennå ikke koblet
til `processVideoPart` – bare den separate `/api/modality-bridge/video/drilldown`-ruten
skriver drilldown-oppføringer i dag).

Den offentlige `/v1`-forespørselsbanen importerer eller påkaller aldri en underprosess.
Fjernvideoer lastes ned under en grense på 50 MiB; innebygde base64-videoer har
en konservativ 36 MiB dekodet per-video-grense slik at modell-/meldinger-/innrammingskonvolutten
kan forbli innenfor den offentlige JSON-forespørselens opptaksgrense på 50 MiB.
Innebygd lengde og dekodede størrelsesestimater kontrolleres før allokering.
HTTPS er påkrevd på den opprinnelige fjern-URL-en og hver omdirigering, ved
bruk av den eksisterende offentlige-bare utgående vakten med DNS-pinning.
Bytesene krysser deretter den nøyaktige interne `POST /api/modality-bridge/video/extract`-meglergrensen.
Den ruten er både `LOCAL_ONLY` og `SPAWN_CAPABLE`, aksepterer bare en
per-prosess autentisert, klarert-loopback-forespørsel, og aksepterer aldri
en URL, filsystembane, kjørbar fil eller argumentliste. API-kroppsstørrelsespipelinen
og håndtererens inkrementelle kroppsleser håndhever uavhengig en 50 MiB
meglerinngangsgrense. Den begrensede køen kjører én utvinning om gangen,
tillater fire ventende jobber, og begrenser ventende inngang til 100 MiB.

Inne i megleren leser `ffprobe` en privat lokal fil; den faste format-tillatelseslisten
ekskluderer spilleliste- og manifestformater. For tillatte MOV-familie-containere
forblir eksterne MOV-datareferanser deaktivert som standard, og den faste
kommandoen velger ikke å bruke dem. Både `ffprobe` og `ffmpeg` bruker
`file`-only protokoll-hvitlisten, én tråd, faste argumentmatriser, ingen shell,
og kjørbare filer løst fra `PATH`. Vedlagte bilde-cover-strømmer er ikke
spillbare kandidater. Alle spillbare strømmer må tilfredsstille grensene,
og en eksplisitt standardstrøm foretrekkes før den deterministiske laveste-indeks-tilbakefallet.
Videoer er begrenset til 600 sekunder, 8 192 piksler per dimensjon, og
33 554 432 kildepiksler. FFmpeg sampler 1–16 midtpunkt JPEG-rammer, skalerer
ned den lange kanten til maksimalt 1 024 piksler uten å oppskalere mindre
innganger, og mottar aldri en URL. Sampling er `uniform` som standard.
De valgfrie `scene_aware` og eksperimentelle `segment_aware` policyene utfører
ett ekstra fast FFmpeg-pass over den allerede validerte lokale strømmen,
velger begrensede `showinfo` scene-tidsstempler, og faller deterministisk
tilbake til de samme uniforme midtpunktene ved detektorfeil, tidsavbrudd,
feilformet utdata, eller et tomt kandidatsett. Segment-aware-modus allokerer
midtpunktprøver proporsjonalt med de validerte sceneintervallene;
segment-aware bevis og tilbakefall-atferd er beskrevet nedenfor.
Den harde 16-rammers grensen brukes etter valg i hver policy.
Når en scene-aware-forespørsel bare har ett-rammes budsjett, bruker den
det uniforme midtpunktet av det aktive full-video- eller fokusvinduet og
rapporterer `policyEffective: uniform`: en enkelt valgt scene-ramme kan
ikke bevare begge tidsmessige ender. En anroper kan valgfritt oppgi et
endelig fokusvindu (`start`/`end` sekunder); grenser klemmes til mediets
varighet, reverserte eller ikke-endelige vinduer avvises, og alle
samplingpolicyer utføres bare innenfor det normaliserte intervallet.
Det resulterende vinduet inkluderes i samplingmetadata og i det
ikke-klarerte beskrivelsesprefiks slik at nedstrømsmodeller kan skille
et fokusert utdrag fra hele tidslinjen.

Semantisk bildetekstfokus er en separat, eksplisitt innstilling.
Standard `full` analysemodus bevarer den eksisterende ramme-prompten og
videresender aldri forespørselstekst til bildetekstmodellen. I `focused`-modus
leser broen bare den nyeste ikke-tomme brukerforfattede `text`/`input_text`
fra samme Chat- eller Responses-container, normaliserer den til NFC,
kollapser kontrolltegn og mellomrom, og begrenser den til 500 Unicode-kodepunkter.
Et tomt resultat faller tilbake til den nøyaktige `full`-prompten.
Et brukbart hint serialiseres som JSON i en dedikert ikke-klarert-brukerkontekstblokk
og kan bare prioritere observerbare detaljer; det kan ikke overstyre den
separate advarselen mot å følge instruksjoner som er synlige eller hørbare i media.
Tekstuelt fokus utleder aldri `start`/`end` eller endrer den tidsmessige sampler.

#### FU-07 strukturelt segmentbevis

`segment_aware` bruker ett begrenset forhåndsanalysepass over den allerede
validerte lokale videostrømmen. Den faste filterkjeden skalerer først til
maksimalt 320 piksler bredt, oppdager sceneskifter og frosne intervaller,
deretter sampler den med 1 bilde per sekund for uskarphet, gjennomsnittlig
luminans, og romlig/tidsmessig informasjon. Passet er begrenset til 600
strukturelle prøver, én FFmpeg/filtertråd, de samme `file`-only protokoll-
og container-tillatelseslistene, en 1 MiB prosessutdata-grense, og maksimalt
30 sekunder innenfor meglerens delte avbrudd/frist. Den aksepterer aldri
en kommando, filter, bane eller URL fra forespørselen.

De strukturelle verdiene er deterministisk prøvetakingsbevis, ikke semantisk videoforståelse. De utleder ikke subjekter, handlinger, bildetekster, tale eller brukerintensjon. Scene- og frysegrenser danner segmenter; frysedekning, uskarphet, eksponering, romlig detalj og tidsmessig endring påvirker kun hvordan det eksisterende budsjettet på 1–16 bilder fordeles. Et fullstendig frosset segment er begrenset til ett bilde, mens ikke-frosne segmenter konkurrerer om det gjenværende budsjettet. Når grenser er flere enn bilder, opprettholdes jevn tidslinjedekning slik at raske tidlige kutt ikke kan skjule et langt etterfølgende segment. Scenegrenser innenfor 1-sekunds analyseoppløsningen til en frysegrense slås sammen.

Manglende filtre, feilformet/tomt bevis, en detektorfeil, eller den begrensede forhåndsanalyse-tidsavbruddet faller tilbake til den nøyaktige ensartede midtpunkts-policyen. En avbrytelse fra anroperen eller en meglerfrist fører ikke til 'fail open': den avslutter den pågående underprosessen, forhindrer senere bildeutvinning, og det private midlertidige treet fjernes i `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` genererer deterministiske, ekte FFmpeg-fiksturer for besparelser ved bildetekstkall etter deduplisering, budsjettallokering for tett bevegelse, uskarphet/eksponering/SI-TI-bevis, raske kutt med lang hale, og falske positiver ved gradvis nedtoning. Den registrerer veggtid før analyse og, der `/usr/bin/time` er tilgjengelig, barneprosessens CPU og topp RSS. Kvalitetskontrollene er kun strukturelle orakler. Kvaliteten på den virkelige bildetekstmodellen forblir `HOLD` fordi denne testrammen ikke har et autorisert endepunkt eller en frossen dommer. Monetære besparelser forblir også `HOLD` med mindre `--caption-cost-per-call-usd` angir et eksplisitt positivt estimat per kall; skriptet fabrikkerer aldri noen av resultatene.

Hvert bilde er begrenset til 4 MiB, alle råbilder samlet til 23 MiB, og den serialiserte meglerresponsen til 32 MiB. En privat midlertidig katalog fjernes i `finally`. OmniRoute inkluderer ikke FFmpeg og aksepterer ikke en egendefinert kjørbar sti. Før bildeteksting bruker broen en konservativ visuell dedupliseringspass: hver JPEG reduseres til en 16×16 gråtonebuffer og sammenlignes kun med det sist beholdte bildet. For et forespurt bildetekstbudsjett over ett bilde, leverer utvinningen en begrenset kandidatpool på opptil det dobbelte av det budsjettet og aldri mer enn 16 bilder. Den forespurte grensen anvendes kun etter deduplisering, med de første og siste valgte kandidatene bevart under den endelige uttynningen når budsjettet er minst to. Den versjonerte `grayscale-16x16-mean-cells-v2`-policyen bruker den største av gjennomsnittlig luma-delta og forholdet mellom miniatyrbildeceller hvis normaliserte delta er minst 0.05. Duplikatterskelen er den konstante 0.04, valgt for forutsigbarhet snarere enn eksponert som en kjøretidsinnstilling. Dette sekundære høy-kontrast signalet bevarer små bevegelser og synlige tekstendringer som en kun-gjennomsnittlig sammenligning kan skjule. Komparator- eller dekoderfeil faller tilbake til 'fail open' og beholder dekningen. Utdata-metadata skiller utvunnede kandidater, vellykket brukte bilder og visuelt droppete duplikater.

En eksplisitt merket videodel kan be om et tidsstemplet kontaktark. Broen bygger maksimalt et 4-kolonners, 16-bilders JPEG-rutenett. Hver 512-piksel celle brenner sin kildetidsstempel inn i et høy-kontrast bunnbånd, mens de samme tidsstemplene forblir i tekstlig metadata for nedstrøms assosiasjon og revisjon. Den komplette JPEG forblir begrenset til 32 MiB. Hvis `sharp` ikke kan dekode eller komponere rutenettet, faller broen tilbake til de individuelle JPEG-bildene; en klientavbrytelse forplanter seg fortsatt gjennom arkoperasjonen.

Kampanjebesvis er bevisst atskilt fra den syntetiske komposisjonsmikrobenchmarken. `scripts/perf/video-bridge-contact-sheet-eval.ts` definerer en skjemaversjonert A/B-testramme for ekte OpenAI-kompatible visjonsmodeller. Den måler leverandørrapporterte tokens, ende-til-ende vegglatens (inkludert arkkomposisjon), antall modellkall og manifestdefinert faktaoppbevaring. Rå modellresponser skrives ikke til rapporten; kun SHA-256-digester og matchede fakta-ID-er beholdes. Testrammen foretar ingen nettverks- eller betalte modellkall med mindre `--execute-real` er sendt med og `--model`, `OMNIROUTE_BASE_URL`, og `OMNIROUTE_API_KEY` er konfigurert. Uten den eksplisitte virkelige kjøringen forblir dens maskinlesbare dom `HOLD`; syntetiske nyttelast-/kallantallsmålinger alene er ikke kampanjebesvis.

Anropere kan legge ved en valgfri `transcript.cues`-array til en støttet videodel når de allerede besitter justert tekst. Hver cue må inneholde `text`, et endelig `start`/`end`-intervall innenfor den undersøkte varigheten, og en hvitlistet `source` (`client`, `embedded`, eller `audio-bridge`); `confidence` er som standard `1` og må forbli mellom `0` og `1`. Nøyaktige duplikat-cues slås sammen. OmniRoute starter aldri transkripsjon fra disse metadataene: validerte cues kopieres inn i det beskrevne resultatet med kilde, konfidens og intervall, og gjengis som upålitelige observasjoner ved siden av bildetekstene. Ugyldig, utenfor-rekkevidde, eller proveniens-fri tekst avvises i stedet for å blandes inn i bildetekststrømmen. Feltet `source` er for tiden anroper-deklarert, ikke server-verifisert: OmniRoute håndhever at verdien er en av de tre tillatte strengene, men bekrefter ennå ikke kryptografisk at en `embedded` eller `audio-bridge`-etikett faktisk kom fra en server-eid utvinning. Behandle `source` som et upålitelig hint til den verifiseringen er på plass; ikke bygg autorisasjonsbeslutninger på den.

En avansert anroper kan oppgi et allerede autorisert `audioTranscript`-spor for den samme videoen. Fusjonssømmen kjører visuelle og lydobservasjoner under én tidsfrist og avbrytelsessignal, ordner dem på en felles tidslinje, slår sammen eksakte duplikater, og rapporterer et delvis resultat når bare én side lykkes. Et ugyldig `audioTranscript` degraderes til det delvise resultatet – den visuelle beskrivelsen beholdes og lydgrenen registrerer en renset feilkode – i stedet for å feile hele videoen. Tilgjengelighet per gren, det delvise flagget og de rensede feilkodene bevares i det beskrevne resultatet, i guardrail-metadata (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), i resultatbuffer-metadata, og i bridge-fusjonstellerne. Standard Video Bridge-bane påkaller ikke tale-til-tekst eller laster ned en andre mediekopi; uten det eksplisitte sporet forblir den kun video.

**Transkriptbevaring (#12150 P1).** Dette gjelder automatisk når Video Bridge (som er valgfri) gjengir en transkript-cue – det er ingen separat bevaringsflagg. Når en forespørsel gjengir en transkript-cue (en anroper-deklarert `transcript` eller en fusjonert `audioTranscript`), merker guardrail den som `videoBridgeObserved` og produserer en redigert skygge av videobeskrivelsen – en identisk gjengivelse der hver cues fritekst-kropp erstattes av `[redacted-video-transcript]`, bygget ved å erstatte det strukturerte cue-feltet før strengen settes sammen (aldri ved å parse den flate teksten, slik at ingen cue-innhold – fiendtlig eller vanlig, inkludert kropper som inneholder `]` som `[inaudible]`/`[music]` – kan overleve). Den vedvarende anropslogg-forespørselskroppen bytter ut hver video-avledet tekstdel med den redigerte skyggen, matchet av innholds-likhet; `fullText`-ankeret leses på nytt fra den ferdige pre-call guardrail-nyttelasten, slik at matchen fortsatt lykkes etter at senere kjede-guardrails (PII- og legitimasjonsmaskerere, prioriteter 10/95) omskriver beskrivelsesteksten på plass og etter at system-prompt/handoff/minneinjeksjon omformer meldingsarrayet. Kroppen som sendes oppstrøms til modellen er uendret. En observert forespørsel fyller heller ikke noe varig minne (både forespørsels- og respons-avledet ekstraksjon hoppes over), slik at modellens eget svar ikke kan gjenspeile transkripttekst inn i minnet.

Ytterligere bevarte kopier bruker det samme signalet for observerte forespørsler. Det rå pre-guardrail klientforespørsels-øyeblikksbildet, den ventende forespørselen i minnet, og den tidlige loggen for avviste forespørsler erstatter strukturelt transkriptfelt i videodeler; streng-prompter syntetisert av pipeline-stadier og kontekst-overføring redigeres ved den vedvarende forespørselskropp-sinken. Den vedvarende `video_content_removed`-markøren gjør at `previous_response_id`-fortsettelsen feiler lukket i stedet for å rekonstruere tekst som ble bevisst forkastet. Hvis en observert forespørsel mister sin per-del-redigeringsskygge før logging, eller til og med en av flere videoskygger ikke klarer å matche etter senere forespørselsmutasjoner, utelates den bevarte forespørselskroppen helt i stedet for å beholde et delvis redigert transkript.

For en observert forespørsel kan en modellrespons sitere en hvilken som helst del av transkriptet uten en strukturert cue-grense. Dens vedvarende anropslogg `responseBody` erstattes derfor av en utelatelsesmarkør; den detaljerte pipeline-artefakten (som kan inkludere oppstrøms/klientkropper og strøm-biter) beholdes ikke. Semantiske, idempotens- og resonnerings-replay-cacher omgår lesinger og skrivinger for den forespørselen. Leverandørforespørselen og den klient-synlige responsen forblir uendret. Tidlige keepalive-bytes tømmes fra den midlertidige bufferen når den detaljerte artefakten utelates. Kiros advarsel om feilformet EventStream rapporterer kun nyttelastens byte-antall, aldri dens innhold eller JSON-parserens rå feil. Dette hevder ikke at hver urelaterte leverandør-/plugin-diagnostikk er revidert; den bredere "retained-sink sweep" spores i #11658.

Den interne `/api/modality-bridge/video/drilldown`-livssyklusen er et separat, loopback/token-autentisert cache-substrat. Hver operasjon krever også en kanonisk ugjennomsiktig hoved-ID. Før en produksjonsanroper aktiveres, må den utlede den ID-en fra den autentiserte leietakeren og må aldri videresende en klientvalgt verdi. Cache-nøkler binder den hoved-ID-en til kanoniske sesjons- og videoreferanse-ID-er, lagrer kun deres SHA-256-avledede nøkler, og omfatter både lesinger og sletting til den samme hoved-ID-en. Cachen lagrer maksimalt 16 avledede JPEG-rammer per oppføring, utløper dem etter ti minutter, og støtter avgrensede `start`/`end`-lesinger eller eksplisitt sesjonssletting.

Hver hoved-ID er begrenset til 16 oppføringer og 64 MiB kanoniske JPEG-data. Disse grensene er uavhengige av det globale taket på 64 oppføringer/256 MiB: kvotetrykk for hoved-ID-en fjerner kun den hoved-ID-ens minst nylig brukte oppføringer før global LRU-fjerning vurderes. Utløpte oppføringer fjernes fra både hoved-ID- og global regnskapsføring ved cache-aktivitet, mens kansellering og valideringsfeil ikke forplikter en delvis erstatning.

Cachen avviser ikke-kanonisk Base64, overflødig utfylling, ikke-JPEG-medier, feilformede eller trunkerte JPEGer, og JPEGer som produserer en advarsel under en avgrenset fullbilde `sharp`-dekoding. Den re-enkoder hvert aksepterte bilde som en kanonisk JPEG, utleder bredde og høyde fra de dekodede bytene i stedet for å stole på anroperfelt, og forkaster eventuelle etterfølgende polyglot-bytes i stedet for å beholde dem. Kun den avgrensede kanoniske komprimerte bufferen belastes begge kvotene. JSON-wiregrensen inkluderer Base64-overhead for taket på 32 MiB dekodet inndata. Hver lagrede avledning registrerer sitt validerte JPEG-format/oppløsning, samplingspolicy, avledningsversjon, opprettelsestid, serverberegnet innholdshash, og hashet foreldre-referanse pluss den pålitelige anroperens foreldre-innholdshash. Kansellering kontrolleres mellom asynkrone dekode-/hash-faser før den atomiske cache-forpliktelsen.

Denne tranchen kobler ennå ikke en produksjonsprodusent til ruten og tilbyr ikke valg av varianter med flere oppløsninger. Den transparente Video Bridge-forespørselsbanen medfører derfor ingen ekstra arbeid, mens leietakerbundet prinsippderivasjon og den fullstendige FU-08 fleroppløsningslivssyklusen forblir eksplisitt oppfølgingsarbeid i stedet for å være dokumentert som fullstendig oppførsel.

Rammer tekstes sekvensielt med den konfigurerte Video-modellen. En tom Video-overstyring arver Vision-innstillingen; hvis begge er tomme, velger Vision auto-ruteren den effektive synsaktiverte modellen. Vellykkede tekster erstatter den originale delen med et stabilt `[Video description:`-prefiks som også markerer teksten som en upålitelig medieavledet observasjon og forteller nedstrømsmodeller å ikke følge instruksjoner funnet i mediet. Cache-nøkler for rammetekster inkluderer JPEG-bytes, prompt, tidsstempel og effektiv modell; kun vellykkede tekster blir bufret. Cache-oppføringer beholder den faktiske vellykkede produsentmodellen, inkludert en reservemodell; broen rapporterer `mixed` når forskjellige rammer ble produsert av forskjellige modeller. Et cache-treff gjenbruker den produsentidentiteten i stedet for å ometikettere den som den forespurte ruteplanen. Hele-video-resultatcachen er nøklet på hver inndata som endrer utdata — prompt, effektiv modell, samplingspolicy, antall rammer, semantisk analysemodus, SHA-256-fingeravtrykket av det normaliserte fokus-hintet, fokusvindu, `transcript`, `audioTranscript`, og kontaktark-flagget — så endring av noen av disse dimensjonene er et cache-bom, aldri en utdatert gjenbruk. Den visuelle dedupliseringspolicyversjonen, terskelen og det begrensede antallet kandidatrammer er også eksplisitt i resultat-cache-nøkkelen og metadata; en policyendring kan derfor ikke gjenbruke en utdatert hele-video-beskrivelse. Resultat-cache v4-metadata beholder modus og fingeravtrykk, aldri den rå brukeroppgaven. Guardrail-metadata rapporterer både de forespurte og effektive analysemodusene; en forespurt `focused`-modus uten brukbar brukertekst rapporteres som effektivt `full`.

Guardrailen trekker ut hver støttet videodel, men beskriver ikke mer enn `modalityBridgeVideoMaxVideos`. For et mål som er bevist å ha `supportsVideo === false`, blir mislykkede og over-grensen-videoer eksplisitte sikre tekstmarkører slik at ingen rå video overlever. Når kapasiteten er ukjent, forblir disse delene uberørt. Mål med `supportsVideo === true` omgår broen. Klientforespørselens avbrytelsessignal forplanter seg gjennom nedlasting, meglerkø, underprosesser og tekstingsanrop; avbrytelser stopper mellom videoer og feiler aldri åpent til rå medier.

Kjøretidsinnstillinger er DB-støttet og Zod-validert:

| Nøkkel                              | Standard    | Område / oppførsel                                                                                      |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valgfri kjøretid, påmelding                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bevarer generiske tekster; `focused` bruker begrenset, upålitelig siste-brukerkontekst           |
| `modalityBridgeVideoModel`          | `""`        | Arver Vision Bridge-modellen                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, eller proporsjonal `segment_aware`; detektorfeil faller tilbake til `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                          |

Eldre vedvarende Video-tidsavbruddsverdier over 120 sekunder blir begrenset til meglerens frist; nye innstillingsskrivinger over den grensen avvises. `GET /api/modality-bridge/video/runtime` krever pålitelig stemplet loopback-lokalitet før autentisering eller kjøretidssondering, deretter krever den administrasjonsautentisering. Den returnerer kun `available`, sanitiserte FFmpeg/ffprobe-versjoner, og en fast årsak når kjøretiden er utilgjengelig. Det interne uttrekksendepunktet er ikke en offentlig opplastings-API: kømetning returnerer `503` pluss `Retry-After`, en anropsfrakobling returnerer `499`, og den faste meglerfristen returnerer `504`. Konverterte svar legger til `video->text;model=<visionModel>;parts=<videos>` til den sentrale `x-omniroute-modality-bridge`-headeren uten å fjerne Vision- eller Audio-segmenter.

### PII-maskering (`piiMasker.ts`)

Kjører på **begge** stadier.

- **`preCall`** kloner nyttelasten, går gjennom `system`, `messages`, `input` og `prompt` (inkludert enkle streng-elementer), og bruker `processPII()` (fra `@/shared/utils/inputSanitizer`) på strengfeltene `content`/`text`. Når `PII_REDACTION_ENABLED=true`, blir oppdaget PII redigert i den utgående nyttelasten. Dette er uavhengig av `INPUT_SANITIZER_MODE` (som kun kontrollerer policy for prompt-injeksjon). Når redigering er av, registrerer anropet antall deteksjoner uten å omskrive innholdet.
- **`postCall`** dyp-kloner svaret, kjører `sanitizePIIResponse()` pluss Responses-API-form-maskereren (`maskResponsesOutput` — dekker `output_text` og `output[].content[].text`). Hvis noen redigering skjer, erstatter det modifiserte svaret det originale.

Guardrailen blokkerer aldri; den annoterer kun (`meta.detections`, `meta.redacted`) eller omskriver.

### Prompt-injeksjon (`promptInjection.ts`)

Oppdager fiendtlige strukturer i brukerlevert innhold og håndhever den konfigurerte policyen. Oppførselen styres av miljøvariabler og konstruktøralternativer:

| Innstilling        | Miljøvariabel                                                                                             | Standard | Effekt                                                                                                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivert           | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Når `false`, utfører vernet en kortslutning (short-circuit).                                                                                                                                                          |
| Modus              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Injiseringretningslinje: `block`, `warn`, eller `log`. (`redact` aksepteres for bakoverkompatibilitet, men fjerner **ikke** injiseringstekst; forespørsel om PII-omskriving kontrolleres av `PII_REDACTION_ENABLED`.) |
| Blokkeringsterskel | `blockThreshold`-alternativ / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Minimum alvorlighetsgrad som kreves for å blokkere. Medium er kun observasjon som standard.                                                                                                                           |

**Modus-prioritet** (`getMode`): `options.mode` fra kaller →
`INJECTION_GUARD_MODE` **DB-funksjonsflagg-overstyring** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE`-miljøvariabel → `INPUT_SANITIZER_MODE`-miljøvariabel →
`warn`. En dashboard-overstyring vinner derfor over miljøvariablene, slik at
brukergrensesnittet for funksjonsflagg kontrollerer det kjørende vernet umiddelbart (ingen omstart). DB-lesingen er feilsikker:
hvis den feiler, faller vernet tilbake til den miljøbaserte oppførselen, og når ingen
overstyring er satt, er oppførselen identisk med oppløsning basert kun på miljøvariabler.

Det Kilder:

1. `sanitizeRequest()` fra `@/shared/utils/inputSanitizer` (delt detektorsett
   som brukes andre steder i pipelinen).
2. Innebygde `DEFAULT_GUARD_PATTERNS` (for tiden `system_override_inline` og
   `markdown_system_block`, begge med `high` alvorlighetsgrad).
3. Valgfrie `customPatterns` sendt via konstruktøralternativer (strenger, regex
   eller `{ name, pattern, severity }`-oppføringer).

Når `mode === "block"` **og** minst én deteksjon oppfyller alvorlighetsgradterskelen,
returnerer `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. I `warn`- og `log`-modus logger vernet, men
tillater kallet. Den delte hjelperen `evaluatePromptInjection()` eksporteres også
for kallere som trenger å evaluere ledetekster uten å gå gjennom registeret.

**Skanningsgrense (v3.8.20):** detektoren sjekker bare de **første 16 KB** av
sammenslått ledeteksttekst — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) i
`src/shared/utils/inputSanitizer.ts`. Både `detectInjection()` og
`evaluatePromptInjection()` kjører `slice(0, MAX_INJECTION_SCAN_BYTES)` før de
kjører mønsterløkken. Injiseringdirektiver befinner seg nær starten av et inndata,
slik at dette begrenser regex CPU/GC på nyttelast på mange hundre KB uten å svekke
deteksjonen (jf. #3932, #4041).

### Legitimasjonsmasker (`credentialMasker.ts`)

Kjører på **begge** trinn, sist i standardkjeden (prioritet `95`). Fjerner
kjente API-nøkkel-/hemmelige token-mønstre fra utgående nyttelast (meldingsinnhold,
verktøykall-argumenter, verktøyresultater) **og** leverandørresponsen, slik at en
legitimasjon som limes inn i en ledetekst (eller ekkoes tilbake av et verktøyresultat)
ikke lekker ut til oppstrømsleverandøren eller tilbake til klienten.

- **Kun valgfri (Opt-in)**, samme konvensjon som PII-maskering (Hard Rule #20-tilsvarende):
  deaktivert med mindre `settings.credentialRedactionEnabled === true` **eller**
  `CREDENTIAL_REDACTION_ENABLED=true`. Når den er av, gjør vernet ingenting —
  det blokkerer aldri og skriver aldri om.
- `redactCredentials()` går gjennom hele nyttelast-/responstreet (`walkValue()`,
  sikker mot prototypreduksjon, syklussikker via `WeakSet`) og erstatter treff med
  en `[REDACTED:<type>]`-plassholder, der den kun kloner grener som faktisk
  har endret seg.
- `CREDENTIAL_PATTERNS` dekker LLM-leverandørnøkler (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), betalingsnøkler (Stripe, Square), sky-
  nøkler (AWS access key, Twilio, SendGrid, Mailgun), private nøkler / JWT-er,
  legitimasjonsbærende tilkoblingsstrenger (`mongodb://user:pass@...` osv.), og
  et generelt mønster for `Authorization`/`x-api-key`/`api-key`/`apikey`-hodeverdier.
  Hodearkede nøkler (`authorization`, `x-api-key`, `api-key`,
  `apikey`) maskeres strukturert (kun verdi, skjema-prefiks som
  `Bearer `/`Basic ` bevares) i stedet for via den generelle teksten-regexen.
- Vernet blokkerer aldri; det skriver bare om (`modifiedPayload` /
  `modifiedResponse`) og annoterer (`meta.credentialsRedacted`, `meta.count`).

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
