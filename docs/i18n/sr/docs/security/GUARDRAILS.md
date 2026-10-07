# Guardrails (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Извор истине:** `src/lib/guardrails/`
> **Последње ажурирање:** 2026-08-29 — v3.8.51 (порекло транскрипта за Video Bridge декларише позивалац,
> сервер га још увек не верификује — појашњено у складу са #11661)

Заштитне мере примењују безбедносна правила, смернице и трансформације садржаја на граници
између OmniRoute-а и узводних провајдера. Свака заштитна мера може да прегледа (и
опционо одбије, трансформише или анотира) садржаје захтева (`preCall`) и
узводне одговоре (`postCall`).

Систем је **fail-open**: ако заштитна мера баци изузетак током извршавања, регистар
бележи грешку и наставља са следећом заштитном мером уместо да захтев
прогласи неуспешним. Блокирање је изричита одлука (`block: true`), никада случајност.

## Ugrađeni zaštitni mehanizmi

Registrator automatski učitava šest zaštitnih mehanizama po redosledu prioriteta prilikom uvoza (pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niži brojevi prioriteta se izvršavaju **prvi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Presreće zahteve koji sadrže slike, a namenjeni su **modelima bez podrške za viziju**, i ili preusmerava ceo zahtev na model sa podrškom za viziju ili zamenjuje delove slike tekstualnim opisima koje proizvodi podesivi vizuelni model pre poziva uzvodno. Ovo omogućava provajderima samo za tekst da transparentno obrađuju multimodalne pakete podataka.

Tok:

1.  Preskoči ako ciljni model već podržava viziju (osim ako se ne pojavi na listi `isVisionBridgeForcedModel` za forsirani most).
2.  Izvlači delove slike putem `extractImageParts(messages)` (`visionBridgeHelpers.ts`), što delegira na **objedinjeni detektor medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedini izvor istine koji se deli sa filterom kompatibilnosti kombinacija. Ekstrakcija je dozvoljena samo za delove najvišeg nivoa oblika koje `replaceImageParts` može ponovo spojiti (ugovor o ekstrakciji↔zameni): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, i Responses API `input_image`. Ugnježdeni pogoci i oblici samo za indikatore su materijal za kombinovani filter i nikada se ne izvlače. Preskoči ako ništa nije pronađeno.
3.  Rešava konfiguraciju tokom izvršavanja putem `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novi `modalityBridge*` ključevi podešavanja pobeđuju; stari `visionBridge*` ključevi ostaju **jednociklični povratak** (prozor za povratak). Preskoči pre bilo kakvog prolaska kroz medije kada je most onemogućen.
4.  Selektor režima (`modalityBridgeVisionMode`, pogledajte tabelu ispod) odlučuje o preusmeravanju naspram opisa. Preusmeravanje vraća `modifiedPayload` sa samo zamenjenim `model`-om, plus meta podatke `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Putanja opisa: ograničava slike na `maxImages`, sastavlja prompt svestan zadatka, konsultuje keš opisa, poziva vizuelni model **paralelno** (`Promise.allSettled`), i ubacuje tekstualne delove `[Image N]: <description>` na njihovo mesto. Neuspeli opis daje `null` i originalni deo slike je **sačuvan** (#4012) — osim na putanji kombinovanog opisa kada je svaki opis neuspešan, gde potvrđeni uzvodni sistem bez vizije dobija `(nedostupno — nije povezan provajder sa podrškom za viziju)` zamenski tekst umesto toga (#8430).
6.  Vraća `modifiedPayload` + meta podatke (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Selektor režima (`modalityBridgeVisionMode`)

| Režim      | Podrazumevano | Ponašanje                                                                                                                                                                                                                                                                     |
| ---------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔             | Nasleđena heuristika, netaknuta (#6640/#7204): modeli koji nisu kombinovani/`auto/` preusmeravaju se na najbolji vizuelni model, osim ako originalni model već ima upotrebljive akreditive (tada opisuje); kombinovani ciljevi uvek opisuju.                                  |
| `describe` |               | Uvek opisuje — blok za preusmeravanje se u potpunosti preskače; korisnikov izabrani model uvek odgovara.                                                                                                                                                                      |
| `reroute`  |               | Forsirano preusmeravanje: zaštita modela sa akreditivima se zaobilazi. Zaštita akreditiva **cilja** preusmeravanja i dalje važi — kada ne postoji upotrebljiv vizuelni cilj, zahtev prolazi do opisa tako da sirove slike nikada ne stignu do pozadine samo za tekst (#8430). |

Forsirani režimi se kratko spajaju **pre** nego što se pokrene auto heuristika; `auto` ponašanje je bajt-identično zaštitnom mehanizmu pre PR-1.

#### Prompt za opis svestan zadatka (`modalityBridgeVisionTaskAware`)

Podrazumevano **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje tekst **poslednje korisničke poruke** (skraćene na 500 znakova) osnovnom promptu za opis, usmeravajući opis ka onome što je korisnik zaista pitao (codex-vision-proxy obrazac) i tražeći od vizuelnog modela da transkribuje vidljivi tekst. Kada je zastavica isključena — ili nema korisničkog teksta — koristi se nepromenjeni osnovni prompt.

Sopstveni OpenAI-kompatibilni zahtev petlje za opisivanje (`callVisionModelSingle()`
u `visionBridgeHelpers.ts`) uvek traži `image_url.detail: "high"` —
bezuslovno, za svakog pozivaoca/provajdera, bez obzira na signal klijenta.
Uzorkovanje sa niskim detaljima smanjuje tačnost OCR-a za tačno zadatak transkripcije teksta
koji ovaj prompt traži, tako da sam poziv za opisivanje uvek traži visoke detalje
bez obzira na nivo detalja koji je koristio originalni dolazni zahtev. Ovo
utiče samo na telo internog zahteva za opisivanje; ne menja način na koji
OmniRoute prosleđuje `image_url.detail` pozivaoca u primarnom zahtevu —
ta podrazumevana vrednost se primenjuje odvojeno, i samo za detektovane OpenCode klijente, u
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Grana Anthropic wire-formata petlje za opisivanje nema polje `detail`
i na nju ne utiče nijedna podrazumevana vrednost.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Podrazumevano | Opseg             |
| ------------------------------ | ------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` ili 100–50000 |

`0` (podrazumevano) znači **bez ograničenja** — opis koji vraća
`callVisionModel()` se prosleđuje neizmenjen, čuvajući postojeće
ponašanje. Bilo koja vrednost u opsegu 100–50000 skraćuje opis sa
sufiksom `…` pre nego što se ponovo spoji kao `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovo za OCR zadatke sa mnogo detalja gde je nizvodnom modelu potrebna
potpuna transkripcija; smanjite ga da biste ograničili upotrebu tokena na brbljivim vizuelnim modelima.
Polje na kontrolnoj tabli se nalazi na naprednom panelu kartice Vision
(`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i ograničava svaku
vrednost između 1 i 99 do donje granice od 100, dok eksplicitnu `0`
ostavlja netaknutom — `0` je validna Zod vrednost sama po sebi
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
"nepostavljena" podrazumevana vrednost.

#### Keš opisa (`modalityBridge/bridgeCache.ts`)

LRU + TTL keš u memoriji za izlaze opisa, deljen na nivou procesa.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` sa
okvirom sa prefiksom dužine (bez kolizija granica polja). Komponenta modela je
**konfigurisani** bridge model, a ne model koji je zapravo odgovorio —
`callVisionModel` se može interno vratiti na rezervni model, a keširanje po pokušaju bi
fragmentiralo keš. Neuspešni opisi se nikada ne keširaju. Podešavanja:

| Ključ                           | Podrazumevano | Opseg   |
| ------------------------------- | ------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`        | —       |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000 |

#### Normalizacija udaljene slike (opis petlje/base64 preuzimanje)

Kada bridge sam preuzima **udaljenu** sliku — Anthropic self-call za opisivanje i
konverzija base64 u claude-wire-format
(`ensureBase64ImagesForClaudeWire`), oba preko
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultujući URI podataka
prolazi kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) pre nego što se ugradi u zahtev vizuelnog modela.
Prevelike slike se smanjuju na **2048px dugu ivicu** (odgovara
ograničenju veličine koje OpenAI/Anthropic već primenjuju na strani servera), što smanjuje
prenos bajtova/kašnjenje bez promene onoga što vizuelni model vidi. Promena veličine
koristi `sharp`, učitan preko dinamičkog uvoza: na platformi gde njegov izvorni
binarni fajl ne uspe da se učita, `normalizeDataUri()` **nikada ne baca grešku** —
vraća se na prosleđivanje originalnih bajtova, tako da putanja za opisivanje/konverziju base64
uvek nastavlja da radi. Nebajtovi slike (preuzimanje koje nije vratilo
sliku koja se može dekodirati) se takođe prosleđuju netaknuti. Ova normalizacija je
ograničena na slike koje bridge preuzima za svoj self-call — nikada se
ne primenjuje na sirovi payload pozivaoca, u skladu sa
principom mutacije samo uz opt-in (Tvrdo pravilo #20).

#### Šema podešavanja + migracija

Novi `modalityBridge*` ključevi su Zod-validirani u `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*` i
grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće stare
`visionBridge*` vrednosti u odgovarajuće nove ključeve (idempotentno, nikada ne prepisuje
vrednost `modalityBridge*` koju je postavio operator); stari ključevi ostaju prihvaćeni kao
rezervni za čitanje tokom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformisani opisom nose
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izgrađeno pomoću `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`,
pečatirano pomoću `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`).
Preusmereni zahtevi **ne dobijaju** zaglavlje — payload je netaknut i zamena modela
je već vidljiva u polju `model` tela odgovora.

`GET /api/modality-bridge/stats` (upravljačka autentifikacija, isti nivo kao
`GET /api/settings`) vraća brojače u memoriji po modalitetu
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i
`video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao
svoj imenilac; operacija bez merenja vremena ne fabrikuje uzorak od nula milisekundi.
`bridged` ostaje unazad kompatibilan alias za uspešne
konverzije; neuspešni pokušaji ga ne povećavaju.
Brojači se resetuju pri ponovnom pokretanju procesa po dizajnu
(telemetrija, a ne računovodstvo).

#### Konfiguracija kontrolne table

Namenska stranica kontrolne table je
`/dashboard/settings/modality-bridge`. Njene URL-adresabilne kartice `Vision`, `Audio`
i `Video` čuvaju parametre upita prilikom promene vrednosti `tab`.
Kartica Vision izlaže omogućavanje, režim, izbor modela (uključujući automatski
podrazumevani), promptovanje svesno zadatka, napredna ograničenja za timeout/sliku/dužinu opisa/keš,
brojače izvršavanja i zaštićeni primer zahteva. Kartica Audio je takođe aktivna: izlaže
omogućavanje, birač modela samo za STT sa opcijom Auto, ograničenja za timeout/max-clip, audio
brojače i `input_audio` test uzorka. Kartica Video je funkcionalna: izveštava
o stanju izvršavanja FFmpeg/ffprobe — jedno od četiri eksplicitna UI stanja (`unknown` dok
je provera u toku ili nije mogla da se završi, `restricted` na hostu kontrolne table koji nije loopback
gde se provera preskače na strani klijenta, `unavailable` nakon provere
i potvrde da nedostaje, ili `available` sa verzijama FFmpeg/ffprobe) — čuva
ograničenja za omogućavanje/model/frejm/video/timeout, filtrira birač modela na modele sposobne za viziju
i izlaže video brojače.

Nekadašnja kartica Vision Bridge pod AI podešavanjima je link za kompatibilnost ka
novoj stranici; ona više ne poseduje drugu kopiju obrasca. Media Providers takođe
povezuje Image-to-Text i Speech-to-Text radne tokove sa odgovarajućim karticama Modality
Bridge-a, bez uklanjanja postojećeg Speech-to-Text playground-a.

**Zaobilaženje prijema self-loop-a:** kada poziv `describe` prolazi kroz OmniRoute-ov
sopstveni `/v1` self-loop (nestandardni model provajdera), podzahtev šalje
`x-omniroute-admission-bypass: internal` i autentifikuje se sa rešenim
self-loop akreditivom — lokalnim `sk_omniroute` sentinelom u lokalnom režimu, ili
operatorom konfigurisanim `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ključem (#1350) tako
da `REQUIRE_API_KEY=true` implementacije i dalje mogu da izvrše poziv `describe`.
Zaobilaženje se poštuje samo za te tačne akreditive, tako da eksterni klijenti ne mogu
koristiti zaglavlje za preskakanje prijema.

Stara podrazumevana podešavanja nalaze se u `src/shared/constants/visionBridgeDefaults.ts`;
nova podrazumevana podešavanja za režim/svesnost zadatka/keš i rešavač podešavanja nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitna ograda izlaže `deps`
opciju konstruktora tako da testovi mogu da ubrizgaju lažne implementacije `getSettings`
i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahteve za ćaskanje koji sadrže audio pre nego što stignu do cilja za koji se ne zna
da prihvata audio ulaz. Nikada ne preusmerava zahtev za ćaskanje: audio delovi se
transkribuju putem postojećeg multipart endpoint-a kompatibilnog sa OpenAI-jem, a izabrani
model za ćaskanje nastavlja sa tekstualnim transkriptima.

Tok:

1.  Rešava `supportsAudio` putem `getResolvedModelCapabilities()`. Eksplicitni
    metapodaci registra provajdera pobeđuju, zatim statički metapodaci modela, pa sinhronizovani
    `modalities_input`. Deklarisana ulazna lista bez `audio` je `false`; bez
    dokaza o sposobnosti ostaje `null`. I `false` i `null` aktiviraju
    konzervativni most, dok `true` ga zaobilazi.
2.  Rešava `modalityBridgeAudio*` podešavanja i izdvaja spojive audio delove najvišeg
    nivoa iz svake poruke putem zajedničkog `detectMediaParts()` detektora.
    Podržani oblici žice su OpenAI `input_audio`, `audio_url` i
    `source.media_type: "audio/*"`. Ugnježdeni audio se detektuje za rutiranje, ali ga
    putanja spajanja ne uklanja. Rad je ograničen sa `modalityBridgeAudioMaxClips`;
    kasniji delovi ostaju netaknuti.
3.  Poštuje konfigurisani `provider/model`, ili pušta `selectAudioBridgeModel()` da prođe
    kroz `AUDIO_TRANSCRIPTION_PROVIDERS` u stabilnom redosledu kataloga i izabere prvi
    model sa upotrebljivim aktivnim akreditivom provajdera.
4.  `callAudioTranscription()` konvertuje base64/data-URI audio u multipart `file`,
    ili preuzima udaljeni `audio_url` putem javno-jedinog izlaznog čuvara sa DNS pinning-om
    i ograničenjem od 25 MB. Zatim POST-uje datoteku i izabrani model na lokalni
    `/v1/audio/transcriptions` self-loop, autentifikovan sa `resolveSelfLoopBearer()`.
    Postojeća ruta za transkripciju obavlja normalno pretraživanje akreditiva,
    rukovanje hlađenjem/ograničenjem stope i dispečiranje provajdera.
5.  Uspešni pozivi zamenjuju svoje delove sa `[Audio N]: <transcript>`. Pozivi
    se izvršavaju sa `Promise.allSettled`: pojedinačni neuspeh čuva taj originalni audio
    deo (ugovor #4012). Ako svi pozivi ne uspeju i dokazano je da cilj
    `supportsAudio === false`, delovi postaju
    `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
    nepoznati cilj (`null`), rezultat potpunog neuspeha ostaje netaknut. Dokazani
    cilj samo za tekst bez upotrebljivog STT akreditiva prima isti eksplicitni stub
    bez izdavanja mrežnog poziva.

Uspešni transkripti koriste LRU/TTL keš Modality Bridge-a na nivou procesa.
Ključ kombinuje audio referencu, stabilnu `audio-transcription` oznaku operacije
i izabrani STT model; neuspesi se nikada ne keširaju. Pokušaji audio zapisa
ažuriraju zajedničke brojače `bridged`, `cacheHits`, `failures` i `lastUsedAt`.
Transformisani odgovori nose
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; netaknuti
zahtevi ne primaju Audio Bridge segment.

Podešavanja izvršavanja su podržana bazom podataka i Zod-validirana:

| Ključ                         | Podrazumevano | Opseg           |
| ----------------------------- | ------------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —               |
| `modalityBridgeAudioModel`    | `""`          | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10            |

Zajednički keš ostaje kontrolisan sa `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video delove najvišeg nivoa u `messages` Chat Completions i `input` API-ja za odgovore pre nego što se pozove cilj bez poznate izvorne video podrške.
Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URL-ovi i `data:video/*;base64,...` URI-ji podataka. Obični nazivi datoteka u tekstu se ne tretiraju kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) je zadužen za prolazak zahteva, proveru mogućnosti/politike, agregaciju po zahtevu i sadržaj odgovora.
Rad po videu — akvizicija, keš celokupnog rezultata, opisivanje sekvence frejmova (koja spaja bilo koji audio transkript koji je deklarisao pozivalac) i metrika/prekid/čišćenje po pokušaju — skriven je iza `processVideoPart` u `videoBridgePipeline.ts`, pozvanog jednom po video delu unutar `preCall` petlje.
Taj modul takođe definiše eksplicitne granice portova `VideoMediaBrokerPort` (akvizicija bajtova i ekstrakcija uzorkovanih frejmova), `VideoAudioTranscriptionPort` (spajanje audio transkripta koji je deklarisao pozivalac sa uzorkovanim titlovima) i `VideoDrilldownPort` (granica perzistencije za detaljnu analizu frejmova; još uvek nije povezan sa `processVideoPart` — samo zasebna ruta `/api/modality-bridge/video/drilldown` danas upisuje unose za detaljnu analizu).

Javna `/v1` putanja zahteva nikada ne uvozi niti poziva podproces. Udaljeni video snimci se preuzimaju sa ograničenjem od 50 MiB; inline base64 video snimci imaju konzervativno ograničenje od 36 MiB dekodiranog po videu, tako da model/poruke/okvirni omotač mogu ostati unutar javnog JSON ograničenja prijema zahteva od 50 MiB. Inline dužina i procene dekodirane veličine se proveravaju pre alokacije. HTTPS je obavezan na početnom udaljenom URL-u i svakom preusmeravanju, koristeći postojeću javnu odlaznu zaštitu sa DNS pinningom. Bajti zatim prelaze tačnu internu `POST /api/modality-bridge/video/extract` brokersku granicu. Ta ruta je i `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo po-procesno autentifikovan, pouzdan loopback zahtev i nikada ne prihvata URL, putanju datoteke, izvršnu datoteku ili listu argumenata. API pipeline za veličinu tela i inkrementalni čitač tela rukovaoca nezavisno primenjuju ograničenje brokerskog ulaza od 50 MiB. Njegov ograničeni red pokreće jednu ekstrakciju istovremeno, dozvoljava četiri posla na čekanju i ograničava ulaz na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna lista dozvoljenih formata isključuje formate plejlista i manifesta. Za dozvoljene MOV-familije kontejnera, eksterne MOV reference podataka ostaju podrazumevano onemogućene, a fiksna komanda ih ne omogućava. I `ffprobe` i `ffmpeg` koriste `file`-only protokol belu listu, jednu nit, fiksne nizove argumenata, bez shell-a i izvršne datoteke rešene iz `PATH`. Priloženi tokovi slika (cover streams) nisu kandidati za reprodukciju. Svi tokovi koji se mogu reprodukovati moraju zadovoljiti ograničenja, a eksplicitni podrazumevani tok je preferiran pre determinističkog povratka na najniži indeks. Video snimci su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432 izvornih piksela. FFmpeg uzorkuje 1–16 središnjih JPEG frejmova, smanjuje dužu ivicu na najviše 1.024 piksela bez povećavanja manjih ulaza i nikada ne prima URL. Uzorkovanje je podrazumevano `uniform`. Opcione `scene_aware` i eksperimentalne `segment_aware` politike izvode jedan dodatni fiksni FFmpeg prolaz preko već validiranog lokalnog toka, biraju ograničene `showinfo` vremenske oznake scena i deterministički se vraćaju na iste uniformne središnje tačke u slučaju kvara detektora, isteka vremena, neispravnog izlaza ili praznog skupa kandidata. Režim svesnosti segmenta (segment-aware) alocira središnje uzorke proporcionalno validiranim intervalima scena; dokazi svesnosti segmenta i ponašanje povratka su detaljno opisani u nastavku. Strogo ograničenje od 16 frejmova primenjuje se nakon selekcije u svakoj politici. Kada zahtev svestan scene ima budžet od samo jednog frejma, koristi uniformnu središnju tačku aktivnog celog videa ili prozora fokusa i prijavljuje `policyEffective: uniform`: jedan odabrani frejm scene ne može sačuvati oba temporalna kraja. Pozivalac može opcionalno da obezbedi konačan prozor fokusa (`start`/`end` sekunde); granice su ograničene na trajanje medija, obrnuti ili beskonačni prozori se odbijaju, a sve politike uzorkovanja se izvode samo unutar normalizovanog intervala. Dobijeni prozor je uključen u metapodatke uzorkovanja i u nepouzdani prefiks opisa, tako da nizvodni modeli mogu razlikovati fokusirani isečak od pune vremenske linije.

Fokus semantičkih titlova je zasebna, eksplicitna postavka. Podrazumevani `full` režim analize čuva postojeći prompt frejma i nikada ne prosleđuje tekst zahteva modelu titlova. U `focused` režimu, most čita samo najnoviji neprazan `text`/`input_text` koji je autorizovao korisnik iz istog Chat ili Responses kontejnera, normalizuje ga na NFC, sažima kontrolne karaktere i beline, i ograničava ga na 500 Unicode kodnih tačaka. Prazan rezultat se vraća na tačan `full` prompt. Upotrebljiv nagoveštaj se serijalizuje kao JSON u namenskom bloku nepouzdanog korisničkog konteksta i može samo da prioritizuje uočljive detalje; ne može nadjačati zasebno upozorenje protiv praćenja instrukcija vidljivih ili čujnih u medijima. Tekstualni fokus nikada ne zaključuje `start`/`end` niti menja temporalni uzorkivač.

#### FU-07 dokazi strukturnog segmenta

`segment_aware` koristi jedan ograničeni prolaz pre-analize preko već validiranog lokalnog video toka. Fiksni lanac filtera prvo skalira na najviše 320 piksela širine, detektuje promene scene i zamrznute intervale, zatim uzorkuje na 1 frejm u sekundi za zamućenje, prosečnu lumu i prostorne/temporalne informacije. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, iste `file`-only protokole i liste dozvoljenih kontejnera, ograničenje izlaza procesa od 1 MiB i najviše 30 sekundi unutar brokerskog deljenog prekida/roka. Nikada ne prihvata komandu, filter, putanju ili URL iz zahteva.

Strukturne vrednosti su deterministički dokazi uzorkovanja, a ne semantičko razumevanje videa. One ne izvode subjekte, radnje, natpise, govor ili nameru korisnika. Granice scene i zamrzavanja formiraju segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni detalji i vremenska promena samo utiču na to kako se dodeljuje postojeći budžet od 1–16 okvira. Potpuno zamrznut segment je ograničen na jedan kadar, dok se nezamrznuti segmenti takmiče za preostali budžet. Kada granice nadmaše okvire, zadržava se uniformna pokrivenost vremenske linije, tako da brzi rani rezovi ne mogu sakriti dugi završni segment. Granice scene unutar rezolucije analize od 1 sekunde granice zamrzavanja se spajaju.

Nedostajući filteri, loše formirani/prazni dokazi, greška detektora ili vremensko ograničenje pre-analize otkazuju i vraćaju se na tačnu uniformnu politiku srednje tačke. Prekid pozivaoca ili rok brokera ne otkazuje: on prekida podproces u toku, sprečava kasniju ekstrakciju okvira, a privatno privremeno stablo se uklanja u `finally` bloku.

`scripts/perf/video-bridge-fu07-eval.ts` generiše determinističke stvarne FFmpeg fiksature za uštede nakon deduplikacije poziva natpisa, alokaciju budžeta za gusti pokret, dokaze o zamućenju/ekspoziciji/SI-TI, brze rezove sa dugim repom i lažne pozitive postepenog bledenja. Beleži vreme pre-analize i, gde je `/usr/bin/time` dostupan, CPU deteta i maksimalni RSS. Njegove provere kvaliteta su samo strukturni orakli. Kvalitet stvarnog modela natpisa ostaje `HOLD` jer ovaj sistem nema ovlašćenu krajnju tačku ili zamrznutog sudiju. Novčane uštede takođe ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne pruži eksplicitnu pozitivnu procenu po pozivu; skripta nikada ne fabrikuje nijedan rezultat.

Svaki kadar je ograničen na 4 MiB, svi sirovi kadrovi zajedno na 23 MiB, a serijalizovani odgovor brokera na 32 MiB. Privatni privremeni direktorijum se uklanja u `finally` bloku. OmniRoute ne uključuje FFmpeg i ne prihvata prilagođenu putanju izvršne datoteke. Pre natpisa, most primenjuje konzervativni vizuelni prolaz deduplikacije: svaki JPEG se svodi na 16×16 sivi bafer i poredi se samo sa poslednjim zadržanim kadrom. Za traženi budžet natpisa iznad jednog kadra, ekstrakcija obezbeđuje ograničeni bazen kandidata do dvostruko većeg budžeta i nikada više od 16 kadrova. Traženo ograničenje se primenjuje tek nakon deduplikacije, pri čemu se prvi i poslednji odabrani kandidati čuvaju tokom konačnog proređivanja kada je budžet najmanje dva. Verziona `grayscale-16x16-mean-cells-v2` politika koristi veću vrednost srednje luma delte i odnosa ćelija sličica čija je normalizovana delta najmanje 0,05. Prag duplikata je konstanta 0,04, odabrana zbog predvidljivosti, a ne izložena kao postavka vremena izvršavanja. Ovaj sekundarni signal visokog kontrasta čuva male promene pokreta i vidljivog teksta koje poređenje samo po srednjoj vrednosti može sakriti. Greške komparatora ili dekodera otkazuju i zadržavaju pokrivenost. Izlazni metapodaci razdvajaju ekstrahovane kandidate, uspešno korišćene kadrove i vizuelne duplikate koji su odbačeni.

Eksplicitno označeni video deo može zahtevati kontakt listu sa vremenskim oznakama. Most gradi JPEG mrežu sa najviše 4 kolone i 16 kadrova. Svaka ćelija od 512 piksela upisuje svoju izvornu vremensku oznaku u donju traku visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima za kasniju asocijaciju i reviziju. Kompletni JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može da dekodira ili sastavi mrežu, most se vraća na pojedinačne JPEG kadrove; prekid klijenta se i dalje propagira kroz operaciju lista.

Dokazi o promociji su namerno odvojeni od sintetičkog mikromerila kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiše A/B sistem sa verzijom šeme za stvarne OpenAI-kompatibilne modele vida. Meri tokene koje je prijavio provajder, end-to-end latenciju (uključujući kompoziciju lista), broj poziva modela i zadržavanje činjenica definisanih manifestom. Sirovi odgovori modela se ne upisuju u izveštaj; zadržavaju se samo SHA-256 digesti i podudarni ID-ovi činjenica. Sistem ne vrši mrežni ili plaćeni poziv modela osim ako nije prosleđen `--execute-real` i ako su konfigurisani `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog eksplicitnog stvarnog pokretanja, njegova mašinski čitljiva presuda ostaje `HOLD`; sintetička merenja opterećenja/broja poziva sama po sebi nisu dokaz promocije.

Pozivaoci mogu priložiti opcioni `transcript.cues` niz podržanom video delu kada već poseduju usklađen tekst. Svaki znak mora sadržati `text`, konačni `start`/`end` interval unutar ispitivanog trajanja i belu listu `source` (`client`, `embedded` ili `audio-bridge`); `confidence` podrazumevano iznosi `1` i mora ostati između `0` i `1`. Tačni duplikati znakova se spajaju. OmniRoute nikada ne započinje transkripciju iz ovih metapodataka: validirani znakovi se kopiraju u opisani rezultat sa izvorom, pouzdanošću i intervalom, i prikazuju se kao nepouzdana zapažanja pored natpisa okvira. Nevažeći, van opsega ili tekst bez porekla se odbija umesto da se meša u tok natpisa. Polje `source` je trenutno deklarisano od strane pozivaoca, a ne verifikovano od strane servera: OmniRoute primenjuje da vrednost bude jedan od tri dozvoljena niza, ali još uvek kriptografski ne potvrđuje da je `embedded` ili `audio-bridge` oznaka zaista došla iz ekstrakcije u vlasništvu servera. Tretirajte `source` kao nepouzdanu naznaku dok se ta verifikacija ne uspostavi; ne gradite odluke o autorizaciji na njoj.

Napredni pozivalac može obezbediti već autorizovanu `audioTranscript` traku za isti video. Spoj fuzije obrađuje vizuelna i audio zapažanja pod jednim rokom i signalom za prekid, raspoređuje ih na zajedničkoj vremenskoj liniji, spaja tačne duplikate i prijavljuje delimičan rezultat kada samo jedna strana uspe. Nevažeći `audioTranscript` se degradira na taj delimični rezultat — vizuelni opis se zadržava, a audio grana beleži sanitizovani kod greške — umesto da se ceo video ne uspe. Dostupnost po grani, delimična zastavica i sanitizovani kodovi grešaka čuvaju se u opisanom rezultatu, u `guardrail` metapodacima (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima fuzije mosta. Podrazumevana putanja Video Bridge-a ne poziva pretvaranje govora u tekst niti preuzima drugu kopiju medija; bez te eksplicitne trake, ostaje samo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se automatski primenjuje kad god Video Bridge (koji je sam po sebi opt-in) renderuje signal transkripta — ne postoji posebna zastavica za zadržavanje. Kada zahtev renderuje bilo koji signal transkripta (pozivaocem deklarisan `transcript` ili fuzionisani `audioTranscript`), `guardrail` ga označava kao `videoBridgeObserved` i proizvodi redigovanu senku video opisa — identično renderovanje u kojem je telo slobodnog teksta svakog signala zamenjeno sa `[redacted-video-transcript]`, izgrađeno zamenom strukturiranog polja signala pre nego što se string sastavi (nikada parsiranjem spljoštenog teksta, tako da nijedan sadržaj signala — adverzalni ili običan, uključujući tela koja sadrže `]` kao što su `[inaudible]`/`[music]` — ne može preživeti). Telo zahteva u trajnom logu poziva zamenjuje svaki tekstualni deo izveden iz videa tom redigovanom senkom, usklađenom po jednakosti sadržaja; `fullText` sidro se ponovo čita iz završenog `guardrail` paketa pre poziva, tako da se podudaranje i dalje uspešno obavlja nakon što kasniji `chain guardrail`-ovi (maskeri PII i akreditiva, prioriteti 10/95) prepišu tekst opisa na mestu i nakon što `system-prompt`/`handoff`/`memory injection` preoblikuje niz poruka. Telo poslato uzvodno modelu ostaje nepromenjeno. Posmatrani zahtev takođe ne popunjava trajnu memoriju (preskače se ekstrakcija izvedena i iz zahteva i iz odgovora), tako da sopstveni odgovor modela ne može da ponovi tekst transkripta u memoriju.

Dodatne zadržane kopije koriste isti signal posmatranog zahteva. Sirovi snimak klijentskog zahteva pre `guardrail`-a, zahtev u memoriji koji čeka i log ranih odbijenih zahteva strukturno zamenjuju polja transkripta u video delovima; string promptovi sintetizovani fazama `pipeline`-a i `context handoff`-om rediguju se na `sink`-u trajnog tela zahteva. Trajni `video_content_removed` marker čini da se nastavak `previous_response_id` zatvori umesto da rekonstruiše tekst koji je namerno odbačen. Ako posmatrani zahtev izgubi svoju senku redakcije po delovima pre logovanja, ili čak jedna od nekoliko video senki ne uspe da se podudari nakon kasnijih mutacija zahteva, zadržano telo zahteva se u potpunosti izostavlja umesto da se zadrži delimično redigovan transkript.

Za posmatrani zahtev, odgovor modela može citirati bilo koji deo transkripta bez strukturirane granice signala. Njegovo trajno `responseBody` u logu poziva se stoga zamenjuje markerom izostavljanja; detaljan `pipeline` artefakt (koji može uključivati uzvodna/klijentska tela i delove strima) se ne zadržava. Semantički, idempotencijski i keševi za ponavljanje razmišljanja zaobilaze čitanja i pisanja za taj zahtev. Zahtev provajdera i klijentu vidljiv odgovor ostaju nepromenjeni. Rani `keepalive` bajtovi se ispuštaju iz privremenog bafera kada se detaljan artefakt izostavi. Kirovo upozorenje o loše formiranom EventStream-u prijavljuje samo broj bajtova paketa, nikada njegov sadržaj ili sirovu grešku JSON parsera. Ovo ne tvrdi da je svaka nepovezana dijagnostika provajdera/plugina revidirana; šire čišćenje zadržanih `sink`-ova prati se u #11658.

Interni `/api/modality-bridge/video/drilldown` životni ciklus je zaseban, `loopback`/token-autentifikovan keš supstrat. Svaka operacija takođe zahteva kanonski neprozirni ID principala. Pre nego što se omogući pozivalac u produkciji, on mora izvesti taj ID iz autentifikovanog `tenant`-a i nikada ne sme proslediti vrednost koju je odabrao klijent. Ključevi keša vezuju tog principala za kanonske ID-ove sesije i video-reference, čuvaju samo njihove SHA-256-izvedene ključeve i ograničavaju i čitanja i brisanja na istog principala. Keš čuva najviše 16 izvedenih JPEG frejmova po unosu, ističe ih nakon deset minuta i podržava ograničena `start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal je ograničen na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta ograničenja su nezavisna od globalnog plafona od 64 unosa/256 MiB: pritisak kvote principala izbacuje samo najmanje korišćene unose tog principala pre nego što se razmotri globalno LRU izbacivanje. Istekli unosi se uklanjaju iz obračuna principala i globalnog obračuna prilikom aktivnosti keša, dok otkazivanje i neuspeh validacije ne obavezuju delimičnu zamenu.

Keš odbija nekanonski Base64, višak paddinga, ne-JPEG medije, loše formirane ili skraćene JPEG-ove i JPEG-ove koji proizvode upozorenje tokom ograničenog `sharp` dekodiranja cele slike. Svaku prihvaćenu sliku ponovo kodira kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umesto da veruje poljima pozivaoca i odbacuje sve preostale poliglotske bajtove umesto da ih zadržava. Samo ograničeni kanonski kompresovani bafer se naplaćuje obe kvote. JSON `wire` limit uključuje Base64 `overhead` za plafon od 32 MiB dekodiranog ulaza. Svaka uskladištena derivacija beleži svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju derivacije, vreme kreiranja, `server-computed content hash` i `hashed parent reference` plus `trusted caller's parent-content hash`. Otkazivanje se proverava između asinhronih faza dekodiranja/heširanja pre atomskog `cache commit`-a.

Ova tranša još uvek ne povezuje produkcijski producent sa rutom i ne
pruža izbor varijanti sa više rezolucija. Transparentna putanja zahteva Video Bridge-a
stoga ne zahteva dodatni rad, dok izvođenje principala vezanog za zakupca i
kompletan FU-08 životni ciklus sa više rezolucija ostaju eksplicitan naknadni rad,
a ne dokumentovano kao kompletno ponašanje.

Okviri se sekvencijalno opisuju pomoću konfigurisanog Video modela. Prazno
Video premošćenje nasleđuje Vision podešavanje; ako su oba prazna, Vision
auto-ruter bira efektivni model sposoban za viziju. Uspešni opisi
zamenjuju originalni deo stabilnim prefiksom `[Video description:` koji takođe
označava tekst kao nepouzdanu opservaciju izvedenu iz medija i govori nizvodnim
modelima da ne prate uputstva pronađena u medijima. Ključevi keša opisa okvira
uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; keširaju se
samo uspešni opisi. Unosi u keš zadržavaju stvarni uspešni model producenta,
uključujući rezervni model; most prijavljuje `mixed` kada su različiti okviri
proizvedeni od strane različitih modela. Pogodak u kešu ponovo koristi taj
identitet producenta umesto da ga preimenuje kao traženi plan rutiranja. Keš
rezultata celog videa je ključan za svaki ulaz koji menja izlaz — prompt,
efektivni model, politika uzorkovanja, broj okvira, režim semantičke analize,
SHA-256 otisak normalizovanog nagoveštaja fokusa, prozor fokusa, `transcript`,
`audioTranscript` i zastavica kontakt-lista — tako da promena bilo koje od tih
dimenzija rezultira promašajem keša, nikada zastarelom ponovnom upotrebom.
Verzija politike vizuelne deduplikacije, prag i ograničen broj kandidatskih
okvira su takođe eksplicitni u ključu keša rezultata i metapodacima; promena
politike stoga ne može ponovo koristiti zastareli opis celog videa. Metapodaci
keša rezultata v4 čuvaju režim i otisak, nikada sirovi korisnički zadatak.
Metapodaci zaštitne ograde prijavljuju i tražene i efektivne režime analize;
traženi `focused` režim bez upotrebljivog korisničkog teksta prijavljuje se kao
efektivno `full`.

Zaštitna ograda izdvaja svaki podržani video deo, ali opisuje najviše
`modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima
`supportsVideo === false`, neuspeli i video snimci preko limita postaju
eksplicitni sigurni tekstualni markeri tako da nijedan sirovi video ne preživi.
Kada je sposobnost nepoznata, ti delovi ostaju netaknuti. Ciljevi sa
`supportsVideo === true` zaobilaze most. Signal za prekid klijentskog zahteva
se propagira kroz preuzimanje, brokerski red, podprocese i pozive za opis;
prekidi se zaustavljaju između video snimaka i nikada ne otvaraju put sirovim
medijima.

Podešavanja izvršavanja su podržana DB-om i Zod-validirana:

| Key                                 | Default     | Range / behavior                                                                                      |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opciono izvršavanje, opt-in                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničen, nepouzdan kontekst najnovijeg korisnika     |
| `modalityBridgeVideoModel`          | `""`        | Nasleđuje Vision Bridge model                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ili proporcionalno `segment_aware`; neuspeh detektora se vraća na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Stare sačuvane vrednosti vremenskog ograničenja videa iznad 120 sekundi se
ograničavaju na brokerski rok; novi zapisi podešavanja iznad tog limita se
odbijaju. `GET /api/modality-bridge/video/runtime` zahteva pouzdanu,
pečatiranu lokalnost povratne sprege pre autentifikacije ili provere
izvršavanja, a zatim zahteva menadžersku autentifikaciju. Vraća samo
`available`, sanitizovane FFmpeg/ffprobe verzije i fiksni razlog kada
izvršavanje nije dostupno. Interna ekstrakciona krajnja tačka nije javni API
za otpremanje: zasićenje reda vraća `503` plus `Retry-After`, prekid veze
pozivaoca vraća `499`, a fiksni brokerski rok vraća `504`. Konvertovani
odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` u centralni
`x-omniroute-modality-bridge` zaglavlje bez uklanjanja Vision ili Audio
segmenata.

### PII Masker (`piiMasker.ts`)

Pokreće se na **obe** faze.

- **`preCall`** klonira payload, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke običnog stringa) i primenjuje `processPII()`
  (iz `@/shared/utils/inputSanitizer`) na polja stringa `content`/`text`. Kada
  je `PII_REDACTION_ENABLED=true`, detektovani PII se rediguje u odlaznom
  payloadu. Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji kontroliše samo
  politiku prompt-injekcije). Kada je redakcija isključena, poziv beleži broj
  detekcija bez prepisivanja sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` plus
  masker oblika Responses-API-ja (`maskResponsesOutput` — pokriva
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakve
  redakcije, modifikovani odgovor zamenjuje originalni.

Zaštitna ograda nikada ne blokira; ona samo anotira (`meta.detections`,
`meta.redacted`) ili prepisuje.

### Prompt Injection (`promptInjection.ts`)

Detektuje adversarijalne strukture u sadržaju koji je dostavio korisnik i
primenjuje konfigurisanu politiku. Ponašanje je vođeno varijablama okruženja i
opcijama konstruktora:

| Postavka        | Env var                                                                                               | Podrazumevano | Efekat                                                                                                                                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`        | Kada je `false`, zaštitna ograda se kratko spaja.                                                                                                                                                             |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`        | Politika ubrizgavanja: `block`, `warn`, ili `log`. (`redact` je prihvaćen radi kompatibilnosti unazad, ali **ne** uklanja tekst ubrizgavanja; zahtev za prepisivanje PII kontroliše `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | `blockThreshold` opcija / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Minimalna ozbiljnost potrebna za blokiranje. Srednja je samo za posmatranje po podrazumevanoj vrednosti.                                                                                                      |

**Prioritet režima** (`getMode`): pozivalac `options.mode` →
`INJECTION_GUARD_MODE` **premošćavanje DB funkcije-zastavice** (Kontrolna tabla → Podešavanja →
Funkcijske zastavice) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Premošćavanje kontrolne table stoga pobeđuje nad env varijablama, tako da UI funkcije-zastavice
kontroliše pokrenutu zaštitu uživo (bez ponovnog pokretanja). Čitanje baze podataka je sigurno od grešaka:
ako dođe do greške, zaštita se vraća na ponašanje zasnovano na env varijablama, a kada nije
postavljeno premošćavanje, ponašanje je identično rešavanju samo putem env varijabli.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora
   koji se koristi drugde u cevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba `high` ozbiljnosti).
3. Opcioni `customPatterns` prosleđeni putem opcija konstruktora (stringovi, regex,
   ili `{ name, pattern, severity }` zapisi).

Kada je `mode === "block"` **i** barem jedna detekcija ispunjava prag ozbiljnosti,
`preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U `warn`/`log` režimima zaštitna ograda beleži, ali
dozvoljava poziv. Zajednička pomoćna funkcija `evaluatePromptInjection()` je takođe izvezena
za pozivaoce koji treba da procene promptove bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor pregleda samo **prvih 16 KB**
spojenog teksta prompta — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` pre pokretanja
petlje uzoraka. Direktive za ubrizgavanje se nalaze blizu vrha unosa, tako da ovo
ograničava CPU/GC regex-a na višekilobajtnim opterećenjima bez slabljenja detekcije (uporedi
#3932, #4041).

### Masker akreditiva (`credentialMasker.ts`)

Pokreće se na **obe** faze, poslednji u podrazumevanom lancu (prioritet `95`). Rediguje
poznate obrasce API ključeva / tajnih tokena iz odlaznog opterećenja (sadržaj poruke,
argumenti poziva alata, rezultati alata) **i** odgovora provajdera, tako da
akreditiv zalepljen u prompt (ili vraćen kao rezultat alata) ne procuri
uzvodnom provajderu ili nazad klijentu.

- **Samo opt-in**, ista konvencija kao redigovanje PII (Teško pravilo #20-povezano):
  onemogućeno osim ako `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, zaštitna ograda je no-op —
  nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` prolazi kroz celo stablo opterećenja/odgovora (`walkValue()`,
  sigurno od zagađenja prototipa, sigurno od ciklusa putem `WeakSet`) i zamenjuje podudaranja sa
  placeholderom `[REDACTED:<type>]`, klonirajući samo grane koje su se
  stvarno promenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve provajdera LLM-a (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve plaćanja (Stripe, Square),
  ključeve oblaka (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove,
  stringove za povezivanje koji sadrže akreditive (`mongodb://user:pass@...`, itd.), i
  generički obrazac vrednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`,
  `apikey`) se rediguju strukturno (samo vrednost, prefiks šeme kao što je
  `Bearer `/`Basic ` se čuva) umesto putem generičkog tekstualnog regex-a.
- Zaštitna ograda nikada ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i anotira (`meta.credentialsRedacted`, `meta.count`).

Regresiona zaštita: `tests/unit/credential-masker-guardrail.test.ts`.

## Основни уговор (`base.ts`)

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
  block?: boolean; // true тренутно прекида ланац
  message?: string; // приказује се приликом блокирања
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // враћа га preCall ради измене захтева
  modifiedResponse?: TValue; // враћа га postCall ради измене одговора
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

Заштитни механизам сигнализира „без измена“ враћањем вредности `void`, `{}` или
`{ block: false }`. Враћање `modifiedPayload`/`modifiedResponse` замењује
вредност која се прослеђује кроз ланац наредним заштитним механизмима.
`signal?: AbortSignal` преноси животни циклус позиваоца у заштитне механизме. Прекид захтева је намерни fail-open изузетак: медијски мостови заустављају рад и обављају чишћење без враћања необрађеног медијског садржаја одредишту за које се зна да га не подржава.

## Регистар (`registry.ts`)

Синглтон `guardrailRegistry` излаже:

- `register(guardrail)` — додаје заштитни механизам (или га замењује на основу нормализованог назива) и
  поново сортира према растућој вредности `priority`.
- `clear()` / `list()` — административне помоћне функције.
- `runPreCallHooks(payload, context)` — пролази кроз активне заштитне механизме, прослеђује
  payload кроз `modifiedPayload` и зауставља се на првом `block: true`.
- `runPostCallHooks(response, context)` — исти ток на страни одговора.
- `resetGuardrailsForTests({ registerDefaults })` — брише стање и опционо
  поново региструје подразумеване механизме ради чисте изолације тестова.

Оба покретача враћају `{ blocked, payload|response, results, guardrail?, message? }`,
где је `results` низ записа `GuardrailExecutionResult` који садрже
поља `blocked`, `skipped`, `modified`, `error` и `meta` за сваки заштитни механизам,
што је корисно за праћење.

### Онемогућавање заштитних механизама по захтеву

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` обједињује
листу назива заштитних механизама без дупликата које треба прескочити за тренутни
захтев. Извори (сви су опциони и сви се обједињују):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` у телу захтева (на највишем нивоу)
- `metadata.disabledGuardrails` у телу захтева
- Заглавље `x-omniroute-disabled-guardrails` (или застарело
  `x-disabled-guardrails`)

Вредности могу бити низови стрингова или стринг са вредностима раздвојеним зарезима; називи се
нормализују на мала слова у kebab-case формату (`pii_masker` → `pii-masker`). Резултат
се прослеђује преко `context.disabledGuardrails` регистру, који прескаче
одговарајуће заштитне механизме (`skipped: true` у `results`).

## Редослед извршавања

За сваки захтев који пролази кроз `src/sse/handlers/chat.ts` и
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` саставља листу за прескакање на основу API кључа, тела
   и заглавља.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` покреће заштитне механизме према растућем
   редоследу приоритета:
   - Онемогућени заштитни механизми се евидентирају као `skipped`.
   - `preCall` сваког заштитног механизма може да измени корисни садржај помоћу `modifiedPayload`.
   - Први `block: true` прекида ланац, а обрађивач враћа
     одговор о одбијању од стране заштитног механизма.
3. Корисни садржај (који је можда измењен) прослеђује се комбинованом рутирању и
   отпремању узводном сервису.
4. Након састављања одговора, `guardrailRegistry.runPostCallHooks(...)`
   покреће исти ланац над одговором. `block: true` у овој фази одбацује одговор
   узводног сервиса.

Заштитни механизми који баце изузетак евидентирају се са `error: <message>` и бележе путем
`logger.warn`, али се ланац наставља — систем је намерно пројектован да настави рад у случају грешке.

## Конфигурација

Променљиве окружења које читају уграђени заштитни механизми:

| Променљива                            | Користи је              | Ефекат                                                                                                                 |
| ------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Поставите на `false` да бисте потпуно онемогућили откривање.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Политика за убризгавање: `warn`, `block` или `log`. Застарела вредност `redact` не мења текст убризгавања.             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Режим заштите од убризгавања; такође DB заставица функције која **има предност** над променљивама окружења (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Минимална озбиљност коју `MODE=block` одбија: `high` (подразумевано), `medium` или `low`.                              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Застарели алијас за `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Када је `true`, PII подаци у захтеву се редигују (независно од режима за убризгавање).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (низводно) | Контролише понашање маскирања на страни одговора.                                                                      |

Заштитни механизми Modality Bridge-а читају конфигурацију у време извршавања из складишта
подешавања заснованог на бази података (`getSettings()`), а не из променљивих окружења. Примарни кључеви за Vision су
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` и
`modalityBridgeCacheMaxEntries`. Застарели
`visionBridge*` кључеви прихватају се само као документована резервна опција за читање током једног циклуса;
контролна табла уписује примарне кључеве. Подразумеване вредности и механизам за разрешавање резервних вредности
налазе се у `src/shared/constants/modalityBridgeDefaults.ts`, док су застареле
константе задржане у `src/shared/constants/visionBridgeDefaults.ts`.

Audio користи `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` и `modalityBridgeAudioMaxClips`, као и дељена
`modalityBridgeCache*` подешавања. Audio нема резервну подршку за застареле кључеве јер су ови
кључеви уведени са Modality Bridge шемом.

Video користи `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` и
`modalityBridgeVideoTimeout`, као и дељена `modalityBridgeCache*` подешавања.
Подразумевано је онемогућен јер су FFmpeg/ffprobe опционе оперативне
зависности, а описивање кадрова повећава кашњење и трошкове модела.

## Прилагођени заштитни механизми

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

Кораци:

1. Направите `src/lib/guardrails/myGuardrail.ts` који проширује `BaseGuardrail`.
2. Имплементирајте `preCall` и/или `postCall`.
3. Или га региструјте приликом увоза (додавањем из `registerDefaultGuardrails`) или
   позовите `guardrailRegistry.register(...)` током извршавања — регистар замењује
   сваки претходни заштитни механизам са истим нормализованим називом.
4. Додајте тестове у `tests/unit/` (постојећи примери:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Тестирање

Користите `resetGuardrailsForTests()` између тестова како бисте започели из познатог стања.
Проследите `{ registerDefaults: false }` да бисте започели са празним регистром и
регистровали само заштитне механизме који се тестирају. Vision Bridge прихвата убризгавање
зависности (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge излаже
еквивалентне тачке раздвајања за подешавања, могућности, избор STT модела, проверу
акредитива и транскрипцију. Тестови стога могу да провере оба тока без приступа бази
података или мрежи.

## Погледајте и

- `src/lib/guardrails/` — имплементација
- `src/shared/utils/inputSanitizer.ts` — дељени детектор на којем се заснивају
  откривање убризгавања упита и маскирање личних података
- `src/shared/constants/visionBridgeDefaults.ts` — подразумеване вредности за Vision Bridge и
  листа модела са принудним премошћавањем
- `src/shared/constants/modalityBridgeDefaults.ts` — дељене подразумеване вредности извршавања за Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ортогонални слој (прекидач кола, периоди мировања)
- `docs/reference/ENVIRONMENT.md` — потпуна референца променљивих окружења

## Покривеност рута заштитом од убризгавања и red-team тестирање (Фаза 8 · Блок D)

Заштита од убризгавања (`createInjectionGuard` / `withInjectionGuard`) покрива све руте
које прихватају корисничке упите. Поштује `INJECTION_GUARD_MODE` (подразумевано `warn` = само евидентирање;
`block` = враћа HTTP 400 `SECURITY_001`).

| Тип               | Руте                                                                                                                                                 | Подразумевани режим |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Текст (постојеће) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Генеративне       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Подаци            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Издвајање текста (`extractMessageContents`) обухвата `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (сваке ноћи, `nightly-llm-security.yml`):** promptfoo проверава да свака рута блокира
OWASP-LLM корпус када је `INJECTION_GUARD_MODE=block`; garak покреће пробе (прескаче се без тајне).
`moderations` је укључен ради доследности — оператори у режиму блокирања могу га изузети путем
`resolveDisabledGuardrails`.

Ноћни ток рада (`.github/workflows/nightly-llm-security.yml`, cron + ручно
покретање) има два задатка:

- **`promptfoo-guard` (блокирајући)** — покреће `promptfoo eval -c promptfooconfig.yaml`
  са `INJECTION_GUARD_MODE=block`. Сваки супарнички случај (нпр. „игнориши сва
  претходна упутства…“, покушаји заобилажења ограничења у DAN стилу) потврђује да одговор садржи
  `error.code === "SECURITY_001"`, односно да је заштита заиста одбила захтев.
- **`garak` (саветодавни)** — покреће garak `--probes promptinject,dan,leakreplay`
  над локалном OmniRoute инстанцом (`http://localhost:20128/v1`). Условљен је
  тајном добављача (`PROMPTFOO_PROVIDER_KEY`); безбедно се прескаче и има суфикс
  `|| true`, тако да извештава без обарања CI процеса.

Покривеност помоћне функције заштите (`createInjectionGuard` / `withInjectionGuard`)
обухвата сваку `/v1` руту која прихвата упите; текст упита се преузима из
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` помоћу
`extractMessageContents()` у `src/shared/utils/inputSanitizer.ts`.
