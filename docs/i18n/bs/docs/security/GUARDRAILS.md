# GUARDRAILS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

# Guardrails

> **Izvor istine:** `src/lib/guardrails/`
> **Posljednje ažurirano:** 2026-08-29 — v3.8.51 (Poreklo transkripta Video Bridge-a je deklarisano od strane pozivaoca, još uvijek nije verifikovano na serveru — pojašnjeno prema #11661)

Guardrails sprovode sigurnost, politiku i transformacije sadržaja na granici između OmniRoute-a i upstream provajdera. Svaki guardrail može pregledati (i opciono odbiti, transformisati ili anotirati) payload-ove zahtjeva (`preCall`) i upstream odgovore (`postCall`).

Sistem je **fail-open**: ako guardrail izbaci grešku tokom izvršavanja, registar bilježi grešku i nastavlja sa sljedećim guardrail-om umjesto da obori zahtjev. Blokiranje je eksplicitna odluka (`block: true`), nikada slučajnost.

## Ugrađeni Guardrails

Registar automatski učitava šest guardrail-ova po prioritetu prilikom uvoza (pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Manji brojevi prioriteta se izvršavaju **prvi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Presreće zahtjeve koji sadrže slike usmjerene ka **modelima bez vizije** i ili preusmjerava cijeli zahtjev na model sposoban za viziju ili zamjenjuje dijelove slike tekstualnim opisima koje proizvodi konfigurabilni vision model prije upstream poziva. Ovo omogućava provajderima koji podržavaju samo tekst da transparentno obrađuju multimodalne payload-ove.

Tok:

1. Preskoči ako ciljni model već podržava viziju (osim ako se pojavljuje na listi prisilnog premošćavanja `isVisionBridgeForcedModel`).
2. Ekstrahuj dijelove slike putem `extractImageParts(messages)` (`visionBridgeHelpers.ts`), koji delegira **objedinjenom detektoru medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedini izvor istine koji se dijeli sa combo filterom kompatibilnosti. Ekstrakcija je dozvoljena za dijelove najvišeg nivoa oblika koje `replaceImageParts` može ponovo spojiti (ugovor o ekstrakciji↔zamjeni): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, i Responses API `input_image`. Ugniježđeni pogoci i oblici koji služe samo kao indikatori su materijal za combo-filter i nikada se ne ekstrahuju. Preskoči ako ništa nije pronađeno.
3. Razriješi runtime konfiguraciju putem `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novi `modalityBridge*` ključevi postavki pobjeđuju; naslijeđeni `visionBridge*` ključevi ostaju kao **rezerva za jedan ciklus** (prozor za povratak). Preskoči prije bilo kakvog prolaska kroz medije kada je most onemogućen.
4. Selektor režima (`modalityBridgeVisionMode`, pogledajte tabelu ispod) odlučuje između preusmjeravanja i opisivanja. Preusmjeravanje vraća `modifiedPayload` sa samo zamijenjenim `model`-om, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograniči slike na `maxImages`, sastavi prompt svjestan zadatka, konsultuj keš opisivanja, pozovi vision model **paralelno** (`Promise.allSettled`) i ubaci `[Image N]: <description>` tekstualne dijelove na njihovo mjesto. Neuspjelo opisivanje daje `null` i originalni dio slike se **čuva** (#4012) — osim na combo putanji opisivanja kada svako opisivanje ne uspije, gdje potvrđeni upstream bez vizije dobija `(unavailable — no vision-capable provider connected)` stub umjesto toga (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selektor režima (`modalityBridgeVisionMode`)

| Režim      | Podrazumijevano | Ponašanje                                                                                                                                                                                                                                                                                                     |
| ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Naslijeđena heuristika, netaknuta (#6640/#7204): non-combo/`auto/` modeli se preusmjeravaju na najbolji vision model osim ako originalni model već ima upotrebljive kredencijale (tada opisuje); combo ciljevi uvijek opisuju.                                                                                |
| `describe` |                 | Uvijek opisuj — blok preusmjeravanja se u potpunosti preskače; korisnikov odabrani model uvijek odgovara.                                                                                                                                                                                                     |
| `reroute`  |                 | Prisilno preusmjeravanje: guard za keep-credentialed-model se zaobilazi. Guard za kredencijale **cilja** preusmjeravanja se i dalje primjenjuje — kada ne postoji upotrebljiv vision cilj, zahtjev prelazi na opisivanje tako da sirove slike nikada ne stignu do backend-a koji podržava samo tekst (#8430). |

Prisilni režimi prekidaju izvršenje (short-circuit) **prije** nego što se pokrene auto heuristika; `auto` ponašanje je bajt-identično guardrail-u prije PR-1.

#### Prompt za opisivanje svjestan zadatka (`modalityBridgeVisionTaskAware`)

Podrazumijevano **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje tekst **posljednje korisničke poruke** (skraćeno na 500 znakova) na osnovni prompt za opisivanje, usmjeravajući opis ka onome što je korisnik zapravo tražio (codex-vision-proxy obrazac) i tražeći od vision modela da prepiše vidljivi tekst. Sa isključenim flag-om — ili bez korisničkog teksta — osnovni prompt se koristi nepromijenjen.

Vlastiti OpenAI-kompatibilni zahtjev "describe" self-loop-a (`callVisionModelSingle()` u `visionBridgeHelpers.ts`) uvijek zahtijeva `image_url.detail: "high"` — bezuslovno, za svakog pozivaoca/provajdera, nije ograničen nikakvim klijentskim signalom. Uzorkovanje niskih detalja (low-detail) degradira OCR tačnost upravo za zadatak transkripcije teksta koji ovaj upit traži, tako da sam "describe" poziv uvijek traži visoke detalje bez obzira na to koji nivo detalja je koristio originalni dolazni zahtjev. Ovo utiče samo na tijelo internog "describe" zahtjeva; ne mijenja način na koji OmniRoute prosljeđuje vlastiti `image_url.detail` pozivaoca u primarnom zahtjevu — ta se podrazumijevana vrijednost primjenjuje odvojeno, i samo za detektovane OpenCode klijente, u `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic wire-format grana "describe" self-loop-a nema polje `detail` i na nju ne utiče nijedna od ovih podrazumijevanih vrijednosti.

#### Ograničenje "describe" izlaza (`modalityBridgeVisionMaxChars`)

| Ključ                          | Podrazumijevano | Raspon            |
| ------------------------------ | --------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`             | `0` ili 100–50000 |

`0` (podrazumijevano) znači **bez ograničenja** — opis koji vraća `callVisionModel()` se prosljeđuje neizmijenjen, čuvajući postojeće ponašanje. Bilo koja vrijednost u rasponu 100–50000 skraćuje opis sa sufiksom `…` prije nego što se spoji nazad kao `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`). Povećajte ovo za OCR zadatke bogate detaljima gdje nizvodnom (downstream) modelu treba puna transkripcija; smanjite ga da ograničite upotrebu tokena kod "razgovorljivih" vision modela. Polje na kontrolnoj tabli se nalazi na naprednom panelu (Advanced panel) kartice Vision (`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i ograničava bilo koju vrijednost između 1 i 99 na donju granicu od 100, dok eksplicitnu `0` ostavlja netaknutom — `0` je validna Zod vrijednost sama po sebi (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo "nepostavljena" podrazumijevana vrijednost.

#### "Describe" keš (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL keš za "describe" izlaze, dijeljen na nivou procesa. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` sa uokvirivanjem prefiksa dužine (nema kolizija granica polja). Komponenta modela je **konfigurisani** bridge model, a ne model koji je stvarno odgovorio — `callVisionModel` može interno preći na rezervnu opciju (fall back), a ključiranje po pokušaju bi fragmentiralo keš. Neuspjeli "describe" pozivi se nikada ne keširaju. Postavke:

| Ključ                           | Podrazumijevano | Raspon  |
| ------------------------------- | --------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`          | —       |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000 |

#### Normalizacija udaljenih slika (self-loop describe/base64 preuzimanje)

Kada bridge sam preuzima **udaljenu** sliku — Anthropic "describe" self-poziv i claude-wire-format base64 konverzija (`ensureBase64ImagesForClaudeWire`), oboje putem `fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultujući data URI se propušta kroz `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prije nego što se ugradi u zahtjev vision modela. Slike prevelikih dimenzija se smanjuju na **dužu ivicu od 2048px** (što odgovara ograničenju promjene veličine koje OpenAI/Anthropic već primjenjuju na strani servera), što smanjuje bajtove/kašnjenje pri otpremanju bez promjene onoga što vision model vidi. Promjena veličine koristi `sharp`, učitan putem dinamičkog importa: na platformi gdje se njegov izvorni binarni fajl ne učita, `normalizeDataUri()` **nikada ne baca izuzetak** — vraća se na prosljeđivanje originalnih bajtova, tako da "describe"/base64-konverzija putanja uvijek nastavlja raditi. Bajtovi koji nisu slika (preuzimanje koje nije vratilo sliku koja se može dekodirati) se također prosljeđuju netaknuti. Ova normalizacija je ograničena na slike koje bridge preuzima za svoj vlastiti self-poziv — nikada se ne primjenjuje na sirovi passthrough payload pozivaoca, u skladu sa principom mutacije samo uz pristanak (Hard Rule #20).

#### Šema postavki + migracija

Novi `modalityBridge*` ključevi su Zod-validirani u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, i `modalityBridgeAudio*` grupa koju koristi Audio Bridge. Migracija `141_modality_bridge_settings.sql` kopira postojeće naslijeđene `visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentno, nikada ne prepisuje `modalityBridge*` vrijednost koju je postavio operater); naslijeđeni ključevi ostaju prihvaćeni kao rezervna opcija za čitanje tokom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformisani putem "describe" nose `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (izgrađeno pomoću `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, označeno pomoću `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmjereni zahtjevi ne dobijaju **nikakvo** zaglavlje — payload je ostao netaknut, a zamjena modela je već vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (upravljačka autorizacija, isti nivo kao `GET /api/settings`) vraća in-memory brojače po modalitetu `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio`, i `video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao svoj imenilac; operacija bez mjerenja vremena ne kreira uzorak od nula milisekundi. `bridged` ostaje alias kompatibilan sa prethodnim verzijama za uspješne konverzije; neuspjeli pokušaji ga ne povećavaju. Brojači se resetuju pri ponovnom pokretanju procesa po dizajnu (telemetrija, a ne računovodstvo).

#### Konfiguracija kontrolne table

Namjenska stranica kontrolne ploče je `/dashboard/settings/modality-bridge`. Njene kartice `Vision`, `Audio` i `Video`, kojima se može pristupiti putem URL-a, čuvaju parametre upita prilikom prebacivanja vrijednosti `tab`. Kartica Vision izlaže omogućavanje, način rada, odabir modela (uključujući automatsku zadanu vrijednost), promptove svjesne zadatka, napredna ograničenja za vremensko ograničenje/sliku/dužinu opisa/keš, brojače vremena izvođenja i zaštićeni probni zahtjev. Kartica Audio je također aktivna: izlaže omogućavanje, birač modela samo za STT sa opcijom Auto, ograničenja za vremensko ograničenje/maksimalni broj isječaka, audio brojače i probni test `input_audio`. Kartica Video je funkcionalna: izvještava o stanju izvođenja FFmpeg/ffprobe — jedno od četiri eksplicitna stanja korisničkog sučelja (`unknown` dok je provjera u toku ili nije mogla biti dovršena, `restricted` na hostu kontrolne ploče koji nije loopback gdje se provjera preskače na strani klijenta, `unavailable` nakon što je provjereno i potvrđeno da nedostaje, ili `available` sa verzijama FFmpeg/ffprobe) — zadržava ograničenja za omogućavanje/model/okvir/video/vremensko ograničenje, filtrira birač modela na modele sposobne za viziju i izlaže video brojače.

Bivša kartica Vision Bridge pod postavkama AI je link za kompatibilnost ka novoj stranici; ona više ne posjeduje drugu kopiju obrasca. Media Providers također povezuje radne procese Image-to-Text i Speech-to-Text sa odgovarajućim karticama Modality Bridge bez uklanjanja postojećeg Speech-to-Text igrališta (playground).

**Zaobilaženje prijema self-loop-a:** kada se poziv za opisivanje usmjerava kroz OmniRoute-ov vlastiti `/v1` self-loop (nestandardni model provajdera), pod-zahtjev šalje `x-omniroute-admission-bypass: internal` i autentifikuje se sa razriješenim self-loop akreditivom — lokalnim `sk_omniroute` sentinelom u lokalnom načinu rada, ili ključem okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` konfigurisanog od strane operatera (#1350) tako da `REQUIRE_API_KEY=true` implementacije i dalje mogu pokrenuti poziv za opisivanje. Zaobilaženje se uvažava samo za te tačne akreditive, tako da vanjski klijenti ne mogu koristiti zaglavlje za preskakanje prijema.

Zastarjele zadane vrijednosti se nalaze u `src/shared/constants/visionBridgeDefaults.ts`; nove zadane vrijednosti za način rada/svjesnost o zadatku/keš i rješavač postavki se nalaze u `src/shared/constants/modalityBridgeDefaults.ts`. Zaštitni mehanizam izlaže opciju konstruktora `deps` tako da testovi mogu ubaciti lažne implementacije `getSettings` i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za chat koji sadrže audio prije nego što stignu do cilja za koji nije poznato da prihvata audio ulaz. Nikada ne preusmjerava zahtjev za chat: audio dijelovi se transkribuju kroz postojeću OpenAI-kompatibilnu multipart krajnju tačku (endpoint), a odabrani chat model nastavlja sa tekstualnim transkriptima.

Tok:

1. Razriješite `supportsAudio` kroz `getResolvedModelCapabilities()`. Eksplicitni metapodaci registra provajdera pobjeđuju, zatim statički metapodaci modela, pa sinhronizovani `modalities_input`. Deklarisana ulazna lista bez `audio` je `false`; bez dokaza o sposobnosti ostaje `null`. I `false` i `null` aktiviraju konzervativni most, dok `true` ga zaobilazi.
2. Razriješite `modalityBridgeAudio*` postavke i izvucite audio dijelove najvišeg nivoa koji se mogu spojiti iz svake poruke kroz zajednički detektor `detectMediaParts()`. Podržani oblici na mreži su OpenAI `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni audio se detektuje za usmjeravanje, ali se ne uklanja putem splice putanje. Rad je ograničen sa `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju netaknuti.
3. Poštujte konfigurisanog `provider/model`, ili dozvolite `selectAudioBridgeModel()` da prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS` stabilnim redoslijedom kataloga i odabere prvi model sa upotrebljivim aktivnim akreditivom provajdera.
4. `callAudioTranscription()` pretvara base64/data-URI audio u multipart `file`, ili preuzima udaljeni `audio_url` kroz outbound zaštitu samo za javnost sa DNS pinning-om i ograničenjem od 25 MB. Zatim šalje POST zahtjev sa datotekom i odabranim modelom na lokalni `/v1/audio/transcriptions` self-loop, autentifikovan sa `resolveSelfLoopBearer()`. Postojeća ruta za transkripciju vrši normalnu pretragu akreditiva, rukovanje hlađenjem/ograničenjem stope (rate-limit) i otpremanje provajdera.
5. Uspješni pozivi zamjenjuju svoje dijelove sa `[Audio N]: <transcript>`. Pozivi se pokreću sa `Promise.allSettled`: pojedinačni neuspjeh čuva taj originalni audio dio (ugovor #4012). Ako svaki poziv ne uspije i dokazano je da cilj `supportsAudio === false`, dijelovi postaju `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za nepoznati cilj (`null`), rezultat potpunog neuspjeha ostaje netaknut. Dokazani cilj samo za tekst bez upotrebljivog STT akreditiva dobija isti eksplicitni stub bez izdavanja mrežnog poziva.

Uspješni transkripti koriste Modality Bridge LRU/TTL keš na nivou procesa. Ključ kombinuje audio referencu, stabilnu oznaku operacije `audio-transcription` i odabrani STT model; neuspjesi se nikada ne keširaju. Audio pokušaji ažuriraju zajedničke brojače `bridged`, `cacheHits`, `failures` i `lastUsedAt`. Transformisani odgovori nose `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; netaknuti zahtjevi ne primaju segment Audio Bridge-a.

Postavke vremena izvođenja su podržane bazom podataka i validirane sa Zod:

| Ključ                         | Zadano  | Raspon          |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Zajednički keš ostaje kontrolisan sa `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najvišeg nivoa u `messages` Chat Completions i `input` Responses API-ja prije pozivanja cilja bez poznate izvorne podrške za video. Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URL-ovi i `data:video/*;base64,...` data URI-ji. Obična imena datoteka u tekstu se ne tretiraju kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom kroz zahtjev, provjerom mogućnosti/politike, agregacijom po zahtjevu i korisnim teretom odgovora. Rad po videu — akvizicija, keš cijelog rezultata, opisivanje sekvence kadrova (koja spaja bilo koji audio transkript deklarisan od strane pozivaoca) i metrika/prekid/čišćenje po pokušaju — je sakriven iza `processVideoPart` u `videoBridgePipeline.ts`, koji se poziva jednom po video dijelu unutar petlje `preCall`. Taj modul takođe definiše eksplicitne granice portova `VideoMediaBrokerPort` (pribavljanje bajtova i ekstrakcija uzorkovanih kadrova), `VideoAudioTranscriptionPort` (spajanje audio transkripta deklarisanog od strane pozivaoca sa uzorkovanim titlovima) i `VideoDrilldownPort` (granica perzistencije za detaljan pregled kadrova; još nije povezan sa `processVideoPart` — samo zasebna ruta `/api/modality-bridge/video/drilldown` danas upisuje unose za detaljan pregled).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva podproces. Udaljeni video zapisi se preuzimaju uz ograničenje od 50 MiB; ugrađeni base64 video zapisi imaju konzervativno ograničenje od 36 MiB dekodiranog sadržaja po videu kako bi model/poruke/okvir za kadriranje mogli ostati unutar javnog ograničenja prijema JSON zahtjeva od 50 MiB. Procjene dužine i dekodirane veličine ugrađenog sadržaja se provjeravaju prije alokacije. HTTPS je obavezan na početnom udaljenom URL-u i svakom preusmjeravanju, koristeći postojeću zaštitu samo za javni odlazni saobraćaj sa DNS pinning-om. Bajtovi zatim prelaze tačnu internu granicu brokera `POST /api/modality-bridge/video/extract`. Ta ruta je i `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo autentifikovan zahtjev po procesu putem pouzdane povratne petlje (trusted-loopback) i nikada ne prihvata URL, putanju do sistema datoteka, izvršnu datoteku ili listu argumenata. Cjevovod veličine tijela API-ja i inkrementalni čitač tijela rukovaoca nezavisno sprovode ograničenje ulaza brokera od 50 MiB. Njegov ograničeni red čekanja izvršava jednu ekstrakciju odjednom, dozvoljava četiri posla na čekanju i ograničava ulaz na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna lista dozvoljenih formata isključuje formate plejlista i manifesta. Za dozvoljene kontejnere iz MOV porodice, eksterne reference MOV podataka ostaju onemogućene po zadanim postavkama, a fiksna komanda ih ne uključuje. I `ffprobe` i `ffmpeg` koriste listu dozvoljenih protokola samo za `file`, jednu nit, fiksne nizove argumenata, bez shell-a, a izvršne datoteke se razrješavaju iz `PATH`-a. Priloženi tokovi naslovnih slika (cover streams) nisu kandidati za reprodukciju. Svi tokovi koji se mogu reprodukovati moraju zadovoljiti ograničenja, a eksplicitni podrazumijevani tok ima prednost u odnosu na deterministički povratak na najniži indeks. Video zapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432 izvornih piksela. FFmpeg uzorkuje 1–16 JPEG kadrova središnje tačke, smanjuje dugu ivicu na najviše 1.024 piksela bez povećanja manjih ulaza i nikada ne prima URL. Uzorkovanje je `uniform` po zadanim postavkama. Opcione politike `scene_aware` i eksperimentalne `segment_aware` izvode jedan dodatni fiksni FFmpeg prolaz preko već validiranog lokalnog toka, biraju ograničene `showinfo` vremenske oznake scena i deterministički se vraćaju na iste uniformne središnje tačke u slučaju neuspjeha detektora, isteka vremena, pogrešno formatiranog izlaza ili praznog skupa kandidata. Režim `segment_aware` dodjeljuje uzorke središnjih tačaka proporcionalno validiranim intervalima scena; dokazi i ponašanje povratka (fallback) za `segment_aware` su detaljno opisani u nastavku. Tvrdo ograničenje od 16 kadrova se primjenjuje nakon odabira u svakoj politici. Kada zahtjev `scene_aware` ima budžet od samo jednog kadra, on koristi uniformnu središnju tačku aktivnog punog videa ili fokusnog prozora i prijavljuje `policyEffective: uniform`: jedan odabrani kadar scene ne može sačuvati oba vremenska kraja. Pozivalac može opciono obezbijediti konačan fokusni prozor (`start`/`end` sekunde); granice se ograničavaju na trajanje medija, obrnuti ili beskonačni prozori se odbijaju, a sve politike uzorkovanja se izvode samo unutar normalizovanog intervala. Rezultujući prozor je uključen u metapodatke uzorkovanja i u prefiks nepouzdanog opisa tako da nizvodni modeli mogu razlikovati fokusirani isječak od pune vremenske linije.

Fokus semantičkog titlovanja je zasebna, eksplicitna postavka. Podrazumijevani režim analize `full` čuva postojeći prompt kadra i nikada ne prosljeđuje tekst zahtjeva modelu za titlovanje. U režimu `focused`, most čita samo najnoviji neprazan `text`/`input_text` koji je autorizovao korisnik iz istog Chat ili Responses kontejnera, normalizuje ga na NFC, sažima kontrolne znakove i razmake, i ograničava ga na 500 Unicode kodnih tačaka. Prazan rezultat se vraća na tačan `full` prompt. Upotrebljiv savjet se serijalizuje kao JSON u namjenskom bloku nepouzdanog korisničkog konteksta i može samo dati prioritet vidljivim detaljima; ne može nadjačati zasebno upozorenje protiv praćenja instrukcija vidljivih ili čujnih u medijima. Tekstualni fokus nikada ne zaključuje `start`/`end` niti mijenja vremenski uzorkivač.

#### FU-07 dokazi strukturnog segmenta

`segment_aware` koristi jedan ograničeni prolaz predanalize preko već validiranog lokalnog video toka. Fiksni lanac filtera prvo skalira na najviše 320 piksela širine, detektuje promjene scena i zamrznute intervale, a zatim uzorkuje na 1 kadar u sekundi za zamućenje, prosječnu luma vrijednost i prostorne/vremenske informacije. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, iste liste dozvoljenih protokola samo za `file` i kontejnera, ograničenje izlaza procesa od 1 MiB i najviše 30 sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvata komandu, filter, putanju ili URL iz zahtjeva.

Strukturne vrijednosti su deterministički dokazi uzorkovanja, a ne semantičko razumijevanje videa. One ne zaključuju subjekte, radnje, opise, govor ili namjeru korisnika. Granice scene i zamrzavanja (freeze) formiraju segmente; pokrivenost zamrzavanja, zamućenje, ekspozicija, prostorni detalji i vremenske promjene utječu samo na to kako se dodjeljuje postojeći budžet od 1–16 kadrova. Potpuno zamrznuti segment je ograničen na jedan kadar, dok se nezamrznuti segmenti natječu za preostali budžet. Kada granica ima više nego kadrova, zadržava se ujednačena pokrivenost vremenske linije tako da brzi rani rezovi ne mogu sakriti dugi završni segment. Granice scene unutar rezolucije analize od 1 sekunde od granice zamrzavanja se spajaju.

Nedostajući filteri, pogrešno oblikovani/prazni dokazi, greška detektora ili ograničeni vremenski rok pred-analize rezultiraju "fail open" ponašanjem prema točnoj politici ujednačene središnje točke. Prekid od strane pozivatelja ili rok brokera ne rezultira "fail open" ponašanjem: on prekida podproces u tijeku, sprječava kasniju ekstrakciju kadrova, a privatno privremeno stablo se uklanja u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg fiksure za uštede poziva opisa nakon deduplikacije, dodjelu budžeta za gusti pokret, dokaze o zamućenju/ekspoziciji/SI-TI, brze rezove s dugim repom i lažno pozitivne rezultate postupnog blijeđenja. Bilježi zidno vrijeme pred-analize i, gdje je `/usr/bin/time` dostupan, CPU podprocesa i vršni RSS. Njegove provjere kvalitete su samo strukturni orakuli. Kvaliteta stvarnog modela za opise ostaje `HOLD` jer ovaj alat nema autoriziranu krajnju točku ili zamrznutog suca. Novčane uštede također ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne pruži eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne izmišlja nijedan od ovih rezultata.

Svaki kadar je ograničen na 4 MiB, svi sirovi kadrovi zajedno na 23 MiB, a serijalizirani odgovor brokera na 32 MiB. Privatni privremeni direktorij se uklanja u `finally`. OmniRoute ne uključuje FFmpeg i ne prihvaća prilagođenu putanju izvršne datoteke. Prije dodavanja opisa, most primjenjuje konzervativni prolaz vizualne deduplikacije: svaki JPEG se reducira na 16×16 međuspremnik sive skale i uspoređuje se samo s posljednjim zadržanim kadrom. Za traženi budžet opisa iznad jednog kadra, ekstrakcija osigurava ograničeni skup kandidata do dvostruko većeg budžeta i nikada više od 16 kadrova. Traženo ograničenje se primjenjuje tek nakon deduplikacije, pri čemu se prvi i posljednji odabrani kandidati čuvaju tijekom konačnog prorjeđivanja kada je budžet najmanje dva. Verzionirana politika `grayscale-16x16-mean-cells-v2` koristi veće od srednje delta luma vrijednosti i omjera ćelija sličica čija je normalizirana delta najmanje 0.05. Prag duplikata je konstanta 0.04, odabrana zbog predvidljivosti, a ne izložena kao postavka vremena izvođenja. Ovaj sekundarni signal visokog kontrasta čuva male pokrete i promjene vidljivog teksta koje usporedba samo na temelju srednje vrijednosti može sakriti. Greške komparatora ili dekodera rezultiraju "fail open" ponašanjem i zadržavaju pokrivenost. Izlazni metapodaci razdvajaju ekstrahirane kandidate, uspješno korištene kadrove i odbačene vizualne duplikate.

Eksplicitno označeni video dio može zahtijevati kontakt list s vremenskim oznakama. Most gradi mrežu od najviše 4 stupca i 16 kadrova u JPEG formatu. Svaka ćelija od 512 piksela upisuje svoju izvornu vremensku oznaku u traku visokog kontrasta na dnu, dok iste vremenske oznake ostaju u tekstualnim metapodacima za naknadno povezivanje i reviziju. Kompletni JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG kadrove; prekid od strane klijenta se i dalje propagira kroz operaciju lista.

Dokazi za promociju su namjerno odvojeni od mikro-benchmarka sintetičke kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B alat s verzioniranom shemom za stvarne vizualne modele kompatibilne s OpenAI. Mjeri tokene koje prijavljuje pružatelj usluga, zidnu latenciju od kraja do kraja (uključujući sastavljanje lista), broj poziva modela i zadržavanje činjenica definiranih manifestom. Sirovi odgovori modela se ne zapisuju u izvještaj; zadržavaju se samo SHA-256 sažeci i podudarni ID-ovi činjenica. Alat ne vrši nikakve mrežne ili plaćene pozive modela osim ako se ne proslijedi `--execute-real` i ako su konfigurirani `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog eksplicitnog stvarnog pokretanja, njegova strojno čitljiva presuda ostaje `HOLD`; mjerenja sintetičkog korisnog tereta/broja poziva sama po sebi nisu dokaz za promociju.

Pozivatelji mogu priložiti opcionalni niz `transcript.cues` podržanom video dijelu kada već posjeduju poravnati tekst. Svaki cue mora sadržavati `text`, konačni interval `start`/`end` unutar trajanja analize i `source` s bijele liste (`client`, `embedded` ili `audio-bridge`); `confidence` je po zadanim postavkama `1` i mora ostati između `0` i `1`. Točni duplikati cue-ova se sažimaju. OmniRoute nikada ne započinje transkripciju iz ovih metapodataka: validirani cue-ovi se kopiraju u opisani rezultat s izvorom, pouzdanošću i intervalom, te se prikazuju kao nepouzdana zapažanja uz opise kadrova. Nevažeći tekst, tekst izvan raspona ili tekst bez dokaza o porijeklu se odbacuje umjesto da se miješa u tok opisa. Polje `source` trenutno deklarira pozivatelj, a ne verificira poslužitelj: OmniRoute provodi da vrijednost bude jedan od tri dopuštena niza, ali još uvijek kriptografski ne potvrđuje da oznaka `embedded` ili `audio-bridge` zapravo potječe iz ekstrakcije u vlasništvu poslužitelja. Tretirajte `source` kao nepouzdanu natuknicu dok ta verifikacija ne bude implementirana; ne gradite odluke o autorizaciji na temelju nje.

Napredni pozivalac može obezbijediti već autorizovanu `audioTranscript` traku za isti video. Fuzijski spoj pokreće vizuelna i audio zapažanja pod jednim rokom i signalom za prekid, uređuje ih na zajedničkoj vremenskoj liniji, sažima tačne duplikate i prijavljuje djelimični rezultat kada samo jedna strana uspije. Nevažeći `audioTranscript` degradira na taj djelimični rezultat — vizuelni opis se zadržava, a audio grana bilježi sanitizovani kod greške — umjesto da se cijeli video neuspješno završi. Dostupnost po granama, djelimični flag i sanitizovani kodovi grešaka su sačuvani u opisanom rezultatu, u metapodacima zaštitne ograde (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima fuzije mosta. Podrazumijevana putanja Video Bridge-a ne poziva govor-u-tekst niti preuzima drugu kopiju medija; bez te eksplicitne trake, ostaje samo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se primjenjuje automatski kad god Video Bridge (koji je sam po sebi opcioni) renderuje cue transkripta — ne postoji poseban flag za zadržavanje. Kada zahtjev renderuje bilo koji cue transkripta (deklarisani `transcript` pozivaoca ili fuzionisani `audioTranscript`), zaštitna ograda ga označava kao `videoBridgeObserved` i proizvodi redigovanu sjenku video opisa — identičan prikaz u kojem je tijelo slobodnog teksta svakog cue-a zamijenjeno sa `[redacted-video-transcript]`, izgrađeno zamjenom polja strukturiranog cue-a prije nego što se string sastavi (nikada parsiranjem spljoštenog teksta, tako da nijedan sadržaj cue-a — neprijateljski ili običan, uključujući tijela koja sadrže `]` kao što su `[inaudible]`/`[music]` — ne može preživjeti). Trajno tijelo zahtjeva dnevnika poziva mijenja svaki tekstualni dio izveden iz videa za tu redigovanu sjenku, uparenu po jednakosti sadržaja; `fullText` sidro se ponovo čita iz završenog payload-a zaštitne ograde prije poziva, tako da se podudaranje i dalje uspješno izvršava nakon kasnijih zaštitnih ograda u lancu (maskeri PII i akreditiva, prioriteti 10/95) koji prepisuju tekst opisa na licu mjesta i nakon što sistemski prompt/predaja/ubacivanje u memoriju preoblikuju niz poruka. Tijelo poslato uzvodno modelu ostaje nepromijenjeno. Posmatrani zahtjev takođe ne popunjava nikakvu trajnu memoriju (ekstrakcija izvedena iz zahtjeva i odgovora se preskače), tako da sopstveni odgovor modela ne može ponoviti tekst transkripta u memoriju.

Površine za zadržavanje su i dalje otvorene, praćene za nastavak (**P2**, #12430): sirovi snimak klijentskog zahtjeva prije zaštitne ograde u artefaktu detaljnog dnevnika; `previous_response_id` nastavak sa neuspjehom pri zatvaranju (fail-closed); interne otpreme izvedenog prompta koje ugrađuju transkript unutar sintetizovanog string prompta (faze cjevovoda, predaja konteksta); i tijelo odgovora / kopija semantičkog keša odgovora modela koji citira transkript. Ovo su sirove/response-class ili opcione površine izvan opsega trajno sačuvanog tijela zahtjeva + memorije iz P1.

Interni životni ciklus `/api/modality-bridge/video/drilldown` je poseban supstrat keša sa loopback/token autentifikacijom. Svaka operacija takođe zahtijeva kanonski neprozirni ID principala. Prije nego što se omogući produkcijski pozivalac, on mora izvesti taj ID iz autentifikovanog tenanta i nikada ne smije proslijediti vrijednost koju je odabrao klijent. Ključevi keša vezuju tog principala za kanonske ID-ove sesije i video-reference, pohranjuju samo njihove ključeve izvedene iz SHA-256 i ograničavaju i čitanje i brisanje na istog principala. Keš pohranjuje najviše 16 izvedenih JPEG frejmova po unosu, ističe ih nakon deset minuta i podržava ograničena `start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal je ograničen na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta ograničenja su nezavisna od globalnog limita od 64 unosa/256 MiB: pritisak na kvotu principala izbacuje samo unose tog principala koji su najmanje nedavno korišćeni (LRU) prije nego što se razmotri globalno LRU izbacivanje. Istekli unosi se brišu iz računovodstva i principala i globalnog računovodstva prilikom aktivnosti keša, dok otkazivanje i neuspjeh validacije ne potvrđuju djelimičnu zamjenu.

Keš odbija nekanonski Base64, višak padding-a, medije koji nisu JPEG, deformisane ili skraćene JPEG-ove i JPEG-ove koji proizvode upozorenje tokom ograničenog `sharp` dekodiranja cijele slike. On ponovo kodira svaku prihvaćenu sliku kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivaoca i odbacuje sve prateće poliglotske bajtove umjesto da ih zadrži. Samo se ograničeni kanonski komprimovani bafer naplaćuje prema obje kvote. JSON wire limit uključuje Base64 režijske troškove za limit od 32 MiB dekodiranog ulaza. Svaka pohranjena derivacija bilježi svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju derivacije, vrijeme kreiranja, hash sadržaja izračunat na serveru i hashovanu referencu roditelja plus hash sadržaja roditelja pouzdanog pozivaoca. Otkazivanje se provjerava između asinhronih faza dekodiranja/hashiranja prije atomskog commit-a u keš.

Ova tranša još uvijek ne povezuje produkcijskog proizvođača sa rutom i ne pruža izbor varijanti više rezolucija. Transparentna putanja zahtjeva Video Bridge-a stoga ne izaziva dodatni rad, dok izvođenje principala vezano za tenanta i puni FU-08 životni ciklus više rezolucija ostaju eksplicitni naknadni rad, a ne dokumentovano kao završeno ponašanje.

Okviri se sekvencijalno opisuju pomoću konfigurisanog Video modela. Prazno Video premošćavanje nasljeđuje Vision postavku; ako su oba prazna, Vision auto-ruter bira efektivni model sposoban za viziju. Uspješni opisi zamjenjuju originalni dio stabilnim prefiksom `[Video description:`, koji također označava tekst kao nepouzdano zapažanje izvedeno iz medija i nalaže nizvodnim modelima da ne prate instrukcije pronađene u mediju. Ključevi keša za opise okvira uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; keširaju se samo uspješni opisi. Keširani unosi zadržavaju stvarni uspješni model proizvođača, uključujući rezervni model; most prijavljuje `mixed` kada su različiti okviri proizvedeni različitim modelima. Pogodak u kešu ponovo koristi taj identitet proizvođača umjesto da ga preimenuje u traženi plan rutiranja. Keš rezultata za cijeli video je ključiran prema svakom ulazu koji mijenja izlaz — prompt, efektivni model, politika uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak normalizovanog savjeta fokusa, prozor fokusa, `transcript`, `audioTranscript` i oznaka kontakt-lista — tako da promjena bilo koje od tih dimenzija predstavlja promašaj keša, a nikada zastarjelu ponovnu upotrebu. Verzija politike vizuelne dedup-a, prag i ograničeni broj kandidata-okvira su također eksplicitni u ključu keša rezultata i metapodacima; promjena politike stoga ne može ponovo koristiti zastarjeli opis cijelog videa. Metapodaci v4 keša rezultata čuvaju način rada i otisak, nikada sirovi korisnički zadatak. Metapodaci zaštitne ograde izvještavaju o traženim i efektivnim načinima analize; traženi `focused` način rada bez upotrebljivog korisničkog teksta se izvještava kao efektivno `full`.

Zaštitna ograda izdvaja svaki podržani video dio, ali opisuje ne više od `modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima `supportsVideo === false`, neuspjeli i videozapisi preko ograničenja postaju eksplicitni markeri sigurnog teksta tako da nijedan sirovi video ne preživi. Kada je mogućnost nepoznata, ti dijelovi ostaju netaknuti. Ciljevi sa `supportsVideo === true` zaobilaze most. Signal prekida klijentskog zahtjeva se širi kroz preuzimanje, red brokera, podprocese i pozive za opisivanje; prekidi se zaustavljaju između videozapisa i nikada ne propadaju na sirove medije.

Runtime postavke su podržane bazom podataka i Zod-validirane:

| Ključ                               | Zadano      | Opseg / ponašanje                                                                                      |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Opcioni runtime, opt-in                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničen, nepouzdan kontekst najnovijeg korisnika      |
| `modalityBridgeVideoModel`          | `""`        | Naslijedi Vision Bridge model                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ili proporcionalni `segment_aware`; neuspjeh detektora se vraća na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Naslijeđene sačuvane vrijednosti vremenskog ograničenja za Video iznad 120 sekundi se ograničavaju na rok brokera; novi upisi postavki iznad tog ograničenja se odbijaju. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu stamped loopback lokalnost prije autentifikacije ili runtime sondiranja, a zatim zahtijeva upravljačku autentifikaciju. Vraća samo `available`, sanitizovane FFmpeg/ffprobe verzije i fiksni razlog kada runtime nije dostupan. Interna krajnja tačka za ekstrakciju nije javni API za otpremanje: zasićenje reda vraća `503` plus `Retry-After`, prekid veze pozivaoca vraća `499`, a fiksni rok brokera vraća `504`. Konvertovani odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` u centralno `x-omniroute-modality-bridge` zaglavlje bez uklanjanja Vision ili Audio segmenata.

### PII Masker (`piiMasker.ts`)

Pokreće se na **obje** faze.

- **`preCall`** klonira payload, prolazi kroz `system`, `messages`, `input` i `prompt` (uključujući stavke običnog stringa) i primjenjuje `processPII()` (iz `@/shared/utils/inputSanitizer`) na string `content`/`text` polja. Kada je `PII_REDACTION_ENABLED=true`, detektovani PII se rediguje u odlaznom payloadu. Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji kontroliše samo politiku prompt-injekcije). Kada je redigovanje isključeno, poziv bilježi broj detekcija bez prepisivanja sadržaja.
- **`postCall`** duboko klonira odgovor, pokreće `sanitizePIIResponse()` plus masker oblika Responses-API (`maskResponsesOutput` — pokriva `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog redigovanja, modifikovani odgovor zamjenjuje originalni.

Zaštitna ograda nikada ne blokira; ona samo anotira (`meta.detections`, `meta.redacted`) ili prepisuje.

### Prompt Injection (`promptInjection.ts`)

Detektuje neprijateljske strukture u sadržaju koji je dostavio korisnik i sprovodi konfigurisanu politiku. Ponašanje je vođeno varijablama okruženja i opcijama konstruktora:

| Postavka        | Env var                                                                                               | Zadano | Efekat                                                                                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitna ograda preskače izvršenje.                                                                                                                                                          |
| Način rada      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Politika injekcije: `block`, `warn` ili `log`. (`redact` je prihvaćen radi kompatibilnosti unazad, ali **ne** uklanja tekst injekcije; prepisivanje PII zahtjeva je kontrolisano sa `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna ozbiljnost potrebna za blokiranje. Medium je samo za posmatranje po zadanim postavkama.                                                                                                             |

**Prioritet načina rada** (`getMode`): pozivalac `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Prepisivanje putem kontrolne ploče (dashboard) stoga ima prednost nad env varijablama, tako da Feature Flags UI kontroliše pokrenutu zaštitu uživo (bez ponovnog pokretanja). Čitanje iz baze podataka je sigurno u slučaju greške (fail-safe): ako dođe do greške, zaštita se vraća na ponašanje zasnovano na env varijablama, a kada nije postavljeno nikakvo prepisivanje, ponašanje je identično rezoluciji samo putem env varijabli.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (dijeljeni skup detektora koji se koristi drugdje u cjevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba `high` ozbiljnosti).
3. Opcioni `customPatterns` proslijeđeni putem opcija konstruktora (stringovi, regex ili `{ name, pattern, severity }` zapisi).

Kada je `mode === "block"` **i** barem jedna detekcija ispunjava prag ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected: suspicious content detected" }`. U `warn`/`log` načinima rada, zaštitna ograda bilježi (loguje), ali dozvoljava poziv. Dijeljeni pomoćnik `evaluatePromptInjection()` je također izvezen za pozivaoce koji trebaju procijeniti upite (prompts) bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor pregleda samo **prvih 16 KB** spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u `src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i `evaluatePromptInjection()` koriste `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja petlje uzoraka. Direktive za injekciju se nalaze blizu vrha unosa, tako da ovo ograničava regex CPU/GC na payload-ima od više stotina KB bez slabljenja detekcije (vidi #3932, #4041).

### Masker akreditiva (`credentialMasker.ts`)

Pokreće se u **obje** faze, posljednji u zadanom lancu (prioritet `95`). Uklanja (maskira) poznate uzorke API-ključeva / tajnih tokena iz odlaznog payload-a (sadržaj poruke, argumenti poziva alata, rezultati alata) **i** odgovora provajdera, tako da akreditiv zalijepljen u upit (ili vraćen od strane rezultata alata) ne bude procurio do uzvodnog provajdera ili nazad do klijenta.

- **Samo uz opt-in**, ista konvencija kao i PII maskiranje (blisko Hard Rule #20): onemogućeno osim ako je `settings.credentialRedactionEnabled === true` **ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, zaštitna ograda ne radi ništa — nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` prolazi kroz cijelo stablo payload-a/odgovora (`walkValue()`, sigurno od prototype-pollution, sigurno od ciklusa putem `WeakSet`) i zamjenjuje podudaranja sa `[REDACTED:<type>]` placeholderom, klonirajući samo grane koje su se zapravo promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve LLM provajdera (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ključeve za plaćanje (Stripe, Square), cloud ključeve (AWS access key, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove, connection stringove koji sadrže akreditive (`mongodb://user:pass@...`, itd.) i generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`, `apikey`) se maskiraju strukturno (samo vrijednost, prefiks šeme kao što je `Bearer `/`Basic ` se čuva), a ne putem generičkog tekstualnog regexa.
- Zaštitna ograda nikada ne blokira; ona samo prepisuje (`modifiedPayload` / `modifiedResponse`) i dodaje napomene (`meta.credentialsRedacted`, `meta.count`).

Regresijska zaštita: `tests/unit/credential-masker-guardrail.test.ts`.

## Osnovni ugovor (`base.ts`)

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
  block?: boolean; // true prekida lanac
  message?: string; // prikazuje se prilikom blokiranja
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vraća preCall za prepisivanje zahtjeva
  modifiedResponse?: TValue; // vraća postCall za prepisivanje odgovora
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

Guardrail signalizira „bez promjena” vraćanjem `void`, `{}`, ili `{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje vrijednost koja prolazi kroz lanac za nizvodne guardrail-ove.
`signal?: AbortSignal` prenosi životni ciklus pozivatelja u guardrail-ove. Prekid zahtjeva je namjerni izuzetak tipa „fail-open”: medijski mostovi zaustavljaju rad i čišćenje bez vraćanja sirovih medija na cilj za koji se zna da ih ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje prema normaliziranom nazivu) guardrail i ponovo sortira prema rastućem `priority`.
- `clear()` / `list()` — administrativni pomoćnici.
- `runPreCallHooks(payload, context)` — iterira aktivne guardrail-ove, provlači payload kroz `modifiedPayload` i zaustavlja se na prvom `block: true`.
- `runPostCallHooks(response, context)` — isti tok na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i opcionalno ponovo registruje zadane vrijednosti za čistu izolaciju testova.

Oba pokretača vraćaju `{ blocked, payload|response, results, guardrail?, message? }` gdje je `results` niz `GuardrailExecutionResult` zapisa koji uključuju polja `blocked`, `skipped`, `modified`, `error` i `meta` po guardrail-u, korisna za praćenje.

### Onemogućavanje guardrail-ova po zahtjevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agregira dedupliciranu listu naziva guardrail-ova koje treba preskočiti za trenutni zahtjev. Izvori (svi opcionalni, svi spojeni):

- `apiKeyInfo.disabledGuardrails`
- Tijelo zahtjeva `disabledGuardrails` (najviši nivo)
- Tijelo zahtjeva `metadata.disabledGuardrails`
- Zaglavlje `x-omniroute-disabled-guardrails` (ili naslijeđeno `x-disabled-guardrails`)

Vrijednosti mogu biti nizovi stringova ili string razdvojen zarezima; nazivi se normaliziraju u lowercase kebab-case (`pii_masker` → `pii-masker`). Rezultat se prosljeđuje kroz `context.disabledGuardrails` u registar, koji preskače odgovarajuće guardrail-ove (`skipped: true` u `results`).

## Redoslijed izvršavanja

Za svaki zahtjev koji prolazi kroz `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` gradi listu za preskakanje na osnovu API ključa, tijela zahtjeva i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne mehanizme (guardrails) rastućim redoslijedom prioriteta:
   - Onemogućeni zaštitni mehanizmi se bilježe kao `skipped`.
   - `preCall` svakog zaštitnog mehanizma može prepisati payload putem `modifiedPayload`.
   - Prvi `block: true` prekida lanac i rukovatelj (handler) vraća odgovor o odbijanju od strane zaštitnog mehanizma.
3. (Potencijalno prepisani) payload teče u kombinovano rutiranje i upstream dispatch.
4. Nakon što se odgovor sastavi, `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac na odgovoru. `block: true` ovdje odbacuje upstream odgovor.

Zaštitni mehanizmi koji izbacuju grešku (throw) se bilježe sa `error: <message>` i evidentiraju putem `logger.warn`, ali se lanac nastavlja — fail-open po dizajnu.

## Konfiguracija

Varijable okruženja koje čitaju ugrađeni zaštitni mehanizmi:

| Varijabla                             | Koristi ga                | Efekat                                                                                                       |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Postavite na `false` da potpuno onemogućite detekciju.                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politika injekcije: `warn`, `block` ili `log`. Naslijeđena vrijednost `redact` ne prepisuje tekst injekcije. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim za zaštitu od injekcije; također i DB feature flag koji **nadjačava** varijable okruženja (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                          |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Naslijeđeni alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                      |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Kada je `true`, PII zahtjeva se rediguje (nezavisno od režima injekcije).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kontroliše ponašanje maskera na strani odgovora.                                                             |

Zaštitni mehanizmi Modality Bridge čitaju konfiguraciju vremena izvođenja iz skladišta postavki zasnovanog na bazi podataka (`getSettings()`), a ne iz varijabli okruženja. Primarni ključevi za Vision su `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`. Naslijeđeni `visionBridge*` ključevi se prihvataju samo kao dokumentovani rezervni mehanizam čitanja u jednom ciklusu; upisi na kontrolnoj tabli koriste primarne ključeve. Zadane vrijednosti i rezervni razrješivač se nalaze u `src/shared/constants/modalityBridgeDefaults.ts`, dok su naslijeđene konstante zadržane u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, uz dijeljene `modalityBridgeCache*` postavke. Audio nema rezervni mehanizam za naslijeđene ključeve jer su ovi ključevi uvedeni sa Modality Bridge šemom.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` i `modalityBridgeVideoTimeout`, uz dijeljene `modalityBridgeCache*` postavke. On je onemogućen po zadanim postavkama jer su FFmpeg/ffprobe opcionalne operativne zavisnosti, a opisivanje kadrova (frame captioning) dodaje latenciju i troškove modela.

## Prilagođene zaštitne barijere (Custom Guardrails)

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

Koraci:

1. Kreirajte `src/lib/guardrails/myGuardrail.ts` proširujući `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Registrujte prilikom uvoza (push iz `registerDefaultGuardrails`) ili pozovite `guardrailRegistry.register(...)` tokom izvršavanja — registar zamjenjuje bilo koju prethodnu zaštitnu barijeru sa istim normalizovanim imenom.
4. Dodajte testove pod `tests/unit/` (postojeći primjeri: `tests/unit/guardrails-registry.test.ts`, `tests/unit/prompt-injection-guard.test.ts`, `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova kako biste započeli iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` da započnete sa praznim registrom i registrujete samo zaštitne barijere koje se testiraju. Vision Bridge prihvata ubrizgavanje zavisnosti (dependency injection) (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže ekvivalentne tačke za postavke, mogućnosti, odabir STT modela, provjere vjerodajnica i transkripciju. Testovi stoga mogu provjeriti oba toka bez pristupa bazi podataka ili mreži.

## Vidi također

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — dijeljeni detektor koji pokreće prompt-injection i PII maskiranje
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge podrazumijevane vrijednosti i lista modela za forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — dijeljene Vision/Audio podrazumijevane vrijednosti tokom izvršavanja
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (prekidač strujnog kola, periodi hlađenja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca env varijabli

## Pokrivenost rute injection-guard-a i red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute koje prihvataju korisničke upite. Poštuje `INJECTION_GUARD_MODE` (podrazumijevano `warn` = samo logovanje; `block` = vraća HTTP 400 `SECURITY_001`).

| Tip               | Rute                                                                                                                                                 | Podrazumijevani režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Tekst (postojeći) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                  |
| Generativno       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                  |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                  |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noćni, `nightly-llm-security.yml`):** promptfoo validira da svaka ruta blokira OWASP-LLM korpus u `INJECTION_GUARD_MODE=block`; garak pokreće sonde (preskače bez tajne). `moderations` je uključen radi konzistentnosti — operateri u block-mode-u ga mogu izuzeti putem `resolveDisabledGuardrails`.

Noćni radni tok (`.github/workflows/nightly-llm-security.yml`, cron + ručno pokretanje) ima dva posla:

- **`promptfoo-guard` (blokiranje)** — pokreće `promptfoo eval -c promptfooconfig.yaml` sa `INJECTION_GUARD_MODE=block`. Svaki kontradiktorni slučaj (npr. "ignore all previous instructions…", DAN-stil jailbreak-ovi) potvrđuje da odgovor nosi `error.code === "SECURITY_001"`, tj. da je zaštita zapravo odbila zahtjev.
- **`garak` (savjetodavni)** — pokreće garak `--probes promptinject,dan,leakreplay` protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Ograničeno tajnom provajdera (`PROMPTFOO_PROVIDER_KEY`); preskače se graciozno i ima sufiks `|| true`, tako da izvještava bez neuspjeha CI-a.

Pokrivenost pomoćnika za zaštitu (`createInjectionGuard` / `withInjectionGuard`) obuhvata svaku `/v1` rutu koja nosi upite; tekst upita se izvlači iz `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću `extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
