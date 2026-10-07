# Guardrails (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Posljednje ažuriranje:** 2026-08-29 — v3.8.51 (Porijeklo transkripta Video Bridge-a je deklarisano od strane pozivaoca,
> još nije verifikovano od strane servera — pojašnjeno po #11661)

Zaštitne ograde (Guardrails) nameću sigurnost, politiku i transformacije sadržaja na granici
između OmniRoute-a i uzvodnih provajdera. Svaka zaštitna ograda može pregledati (i
opcionalno odbiti, transformisati ili anotirati) zahtjeve (`preCall`) i
uzvodne odgovore (`postCall`).

Sistem je **fail-open**: ako zaštitna ograda baci grešku tokom izvršavanja, registar
bilježi grešku i nastavlja sa sljedećom zaštitnom ogradom umjesto da odbije
zahtjev. Blokiranje je eksplicitna odluka (`block: true`), nikada slučajnost.

## Ugrađene zaštitne ograde

Registar automatski učitava šest zaštitnih ograda po prioritetnom redoslijedu prilikom uvoza
(pogledajte `registry.ts` → `registerDefaultGuardrails()`):

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

Presreće zahtjeve koji sadrže slike, a namijenjeni su **modelima koji ne podržavaju viziju**, i
ili preusmjerava cijeli zahtjev na model koji podržava viziju ili zamjenjuje dijelove slike
tekstualnim opisima proizvedenim od strane konfigurabilnog modela vizije prije
uzvodnog poziva. Ovo omogućava provajderima samo za tekst da transparentno obrađuju
multimodalne podatke.

Tok:

1. Preskočite ako ciljni model već podržava viziju (osim ako se ne pojavi na
   listi prisilno premoštenih modela `isVisionBridgeForcedModel`).
2. Izdvojite dijelove slike putem `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira na **jedinstveni detektor medija**
   `detectMediaParts()` u `open-sse/utils/mediaParts.ts` —
   jedinstveni izvor istine koji se dijeli sa filterom kompatibilnosti kombinacija.
   Ekstrakcija je dozvoljena za dijelove najvišeg nivoa oblika koje
   `replaceImageParts` može ponovo spojiti (ugovor extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, i Responses API `input_image`. Ugniježđeni pogoci i
   oblici samo indikatora su materijal za kombinovani filter i nikada se ne ekstrahuju.
   Preskočite ako ih nema.
3. Razriješite konfiguraciju vremena izvođenja putem `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki `modalityBridge*`
   pobjeđuju; stari ključevi `visionBridge*` ostaju **jednociklični
   fallback** (prozor za povratak). Preskočite prije bilo kakvog prolaska medija kada je
   most onemogućen.
4. Selektor načina rada (`modalityBridgeVisionMode`, pogledajte tabelu ispod) odlučuje
   preusmjeriti vs opisati. Preusmjeravanje vraća `modifiedPayload` sa samo `model`
   zamijenjenim, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisa: ograničite slike na `maxImages`, sastavite prompt svjestan zadatka,
   konsultujte keš opisa, pozovite model vizije **paralelno**
   (`Promise.allSettled`), i ubacite tekstualne dijelove `[Slika N]: <opis>` na
   njihovo mjesto. Neuspjeli opis daje `null` i originalni dio slike je
   **sačuvan** (#4012) — osim na putanji kombinovanog opisa kada je svaki
   opis neuspješan, gdje potvrđeni uzvodni tok bez vizije dobija
   `(nedostupno — nije povezan provajder sposoban za viziju)` umjesto toga (#8430).
6. Vratite `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor načina rada (`modalityBridgeVisionMode`)

| Način      | Podrazumijevano | Ponašanje                                                                                                                                                                                                                                                                           |
| ---------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Naslijeđena heuristika, netaknuta (#6640/#7204): modeli bez kombinacije/`auto/` preusmjeravaju na najbolji model vizije osim ako originalni model već ima upotrebljive akreditive (onda opisuju); kombinovani ciljevi uvijek opisuju.                                               |
| `describe` |                 | Uvijek opisujte — blok preusmjeravanja se potpuno preskače; korisnikov odabrani model uvijek odgovara.                                                                                                                                                                              |
| `reroute`  |                 | Prisilno preusmjeravanje: čuvar modela sa akreditivima se zaobilazi. Čuvar akreditiva za preusmjeravanje-**cilj** i dalje se primjenjuje — kada ne postoji upotrebljiv cilj vizije, zahtjev prolazi do opisa tako da sirove slike nikada ne dosegnu pozadinu samo za tekst (#8430). |

Prisilni načini rada kratko spajaju **prije** nego što se pokrene auto heuristika; ponašanje `auto`
je bajt-identično zaštitnoj ogradi prije PR-1.

#### Prompt za opis svjestan zadatka (`modalityBridgeVisionTaskAware`)

Podrazumijevano **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje
tekst **posljednje korisničke poruke** (skraćen na 500 znakova) osnovnom
promptu za opis, usmjeravajući opis prema onome što je korisnik zapravo tražio
(obrazac codex-vision-proxy) i tražeći od modela vizije da transkribuje vidljivi
tekst. Kada je zastavica isključena — ili nema korisničkog teksta — osnovni prompt se koristi nepromijenjen.

Vlastiti OpenAI-kompatibilni zahtjev samopetlje opisa (`callVisionModelSingle()`
u `visionBridgeHelpers.ts`) uvijek traži `image_url.detail: "high"` —
bezuvjetno, za svakog pozivatelja/davatelja, bez obzira na bilo kakav klijentski signal.
Uzorkovanje s niskim detaljima smanjuje točnost OCR-a za točno zadatak transkripcije teksta
koji ovaj upit traži, tako da sam poziv opisa uvijek traži visoke
detalje bez obzira na razinu detalja koju je koristio izvorni dolazni zahtjev. Ovo
utječe samo na tijelo internog zahtjeva opisa; ne mijenja način na koji
OmniRoute prosljeđuje vlastiti `image_url.detail` pozivatelja na primarnom zahtjevu —
ta se zadana vrijednost primjenjuje zasebno, i to samo za otkrivene OpenCode klijente, u
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grana Anthropic wire-formata
samopetlje opisa nema polje `detail` i na nju ne utječe nijedna zadana vrijednost.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| :----------------------------- | :----- | :---------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vraća
`callVisionModel()` prolazi neizmijenjen, čuvajući postojeće
ponašanje. Bilo koja vrijednost u rasponu 100–50000 skraćuje opis sa
sufiksom `…` prije nego što se ponovno spoji kao `[Slika N]: <opis>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovo za OCR zadatke s puno detalja gdje nizvodni model treba
potpunu transkripciju; smanjite ga kako biste ograničili upotrebu tokena na brbljavim vizualnim modelima.
Polje nadzorne ploče nalazi se na naprednoj ploči kartice Vision
(`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i ograničava bilo koju
vrijednost između 1 i 99 na donju granicu od 100, dok eksplicitnu `0`
ostavlja netaknutom — `0` je valjana Zod vrijednost sama po sebi
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
"nepostavljena" zadana vrijednost.

#### Predmemorija opisa (`modalityBridge/bridgeCache.ts`)

LRU + TTL predmemorija u memoriji za izlaze opisa, dijeljena na razini procesa.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
okvirom s prefiksom duljine (bez kolizija granica polja). Komponenta modela je
**konfigurirani** model mosta, a ne model koji je zapravo odgovorio —
`callVisionModel` se može interno vratiti na zadano, a ključanje po pokušaju bi
fragmentiralo predmemoriju. Neuspjeli opisi se nikada ne predmemoriraju. Postavke:

| Ključ                           | Zadano | Raspon  |
| :------------------------------ | :----- | :------ |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljene slike (samopetlja opisa/dohvaćanje base64)

Kada most sam dohvati **udaljenu** sliku — Anthropic samopoziv opisa
i claude-wire-format base64 konverzija
(`ensureBase64ImagesForClaudeWire`), oboje putem
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući podaci
URI prolazi kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prije nego što se ugradi u zahtjev vizualnog modela.
Prevelike slike se smanjuju na **2048px dugu stranu** (što odgovara
ograničenju promjene veličine koje OpenAI/Anthropic već primjenjuju na strani poslužitelja), što smanjuje
učitavanje bajtova/latenciju bez promjene onoga što vizualni model vidi. Promjena veličine
koristi `sharp`, učitan putem dinamičkog uvoza: na platformi gdje se njegova izvorna
binarna datoteka ne uspije učitati, `normalizeDataUri()` **nikada ne baca iznimku** — vraća se
na prolaz izvornih bajtova, tako da put opisa/base64 konverzije
uvijek nastavlja raditi. Nebajtovi slike (dohvaćanje koje nije vratilo
dekodiranu sliku) također prolaze netaknuti. Ova normalizacija je
ograničena na slike koje most dohvaća za vlastiti samopoziv — nikada se
ne primjenjuje na sirovi prolazni teret pozivatelja, u skladu s
principom mutacije samo uz pristanak (Tvrdo pravilo #20).

#### Shema postavki + migracija

Novi `modalityBridge*` ključevi su Zod-validirani u `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*` i
grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće naslijeđene
`visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentno, nikada ne prebrisuje
vrijednost `modalityBridge*` koju je postavio operator); naslijeđeni ključevi ostaju prihvaćeni kao
rezervni za čitanje tijekom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformirani opisom nose
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izgrađeno pomoću `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`,
označeno pomoću `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`).
Preusmjereni zahtjevi **nemaju** zaglavlje — teret je bio netaknut, a zamjena modela
je već vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (upravljačka autentifikacija, ista razina kao
`GET /api/settings`) vraća brojače u memoriji po modalitetu
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i
`video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao svoj
nazivnik; operacija bez mjerenja vremena ne stvara uzorak od nula milisekundi.
`bridged` ostaje unatrag kompatibilan alias za uspješne
konverzije; neuspjeli pokušaji ga ne povećavaju.
Brojači se resetiraju pri ponovnom pokretanju procesa po dizajnu
(telemetrija, a ne računovodstvo).

#### Konfiguracija nadzorne ploče

Namjenska stranica kontrolne table je
`/dashboard/settings/modality-bridge`. Njene URL-adresabilne kartice `Vision`, `Audio`
i `Video` čuvaju parametre upita prilikom promjene vrijednosti `tab`.
Kartica Vision prikazuje omogućavanje, način rada, odabir modela (uključujući automatski
podrazumijevani), promptovanje svjesno zadatka (task-aware prompting), napredna ograničenja za timeout/sliku/dužinu opisa/keš, brojače
vremena izvršavanja i zaštićeni probni zahtjev. Kartica Audio je takođe aktivna: prikazuje
omogućavanje, birač modela samo za STT sa opcijom Auto, ograničenja za timeout/max-clip,
audio brojače i `input_audio` probni test. Kartica Video je funkcionalna: izvještava
o stanju izvršavanja FFmpeg/ffprobe — jedno od četiri eksplicitna stanja korisničkog interfejsa (`unknown` dok je ispitivanje u toku ili se nije moglo završiti, `restricted` na hostu kontrolne table koji nije loopback gdje se ispitivanje preskače na strani klijenta, `unavailable` nakon što je ispitano i potvrđeno da nedostaje, ili `available` sa verzijama FFmpeg/ffprobe) — perzistira
ograničenja za omogućavanje/model/frejm/video/timeout, filtrira birač modela na modele sposobne za viziju i prikazuje video brojače.

Bivša Vision Bridge kartica pod AI postavkama je link za kompatibilnost ka
novoj stranici; ona više ne posjeduje drugu kopiju forme. Media Providers takođe
povezuje Image-to-Text i Speech-to-Text tokove rada sa odgovarajućim Modality
Bridge karticama bez uklanjanja postojećeg Speech-to-Text igrališta (playground).

**Zaobilaženje prijema u samopetlji (Self-loop admission bypass):** kada se poziv opisa (describe call) usmjerava kroz vlastitu `/v1` samopetlju OmniRoute-a (nestandardni model provajdera), podzahtjev šalje
`x-omniroute-admission-bypass: internal` i autentifikuje se sa razriješenim
akreditivom samopetlje — lokalnim `sk_omniroute` sentinelom u lokalnom režimu, ili
operatorski konfigurisanim `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ključem (#1350) tako
da `REQUIRE_API_KEY=true` implementacije i dalje mogu pokretati poziv opisa. Zaobilaženje
se uvažava samo za te tačne akreditive, tako da eksterni klijenti ne mogu koristiti
zaglavlje za preskakanje prijema.

Zastarjele podrazumijevane vrijednosti nalaze se u `src/shared/constants/visionBridgeDefaults.ts`;
nove podrazumijevane vrijednosti za mode/task-aware/cache i resolver postavki nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitna ograda (guardrail) izlaže
`deps` opciju konstruktora kako bi testovi mogli ubaciti lažne `getSettings` i
`callVisionModel` implementacije.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće chat zahtjeve koji sadrže audio prije nego što stignu do cilja koji nije
poznat po tome da prihvata audio ulaz. Nikada ne preusmjerava chat zahtjev: audio dijelovi se
transkribuju putem postojeće OpenAI-kompatibilne multipart krajnje tačke, a
odabrani chat model nastavlja sa tekstualnim transkriptima.

Tok (Flow):

1. Razriješi `supportsAudio` putem `getResolvedModelCapabilities()`. Eksplicitni
   metapodaci registra provajdera pobjeđuju, zatim statički metapodaci modela, pa sinhronizovani
   `modalities_input`. Deklarisana lista ulaza bez `audio` je `false`; bez
   dokaza o sposobnostima ostaje `null`. I `false` i `null` aktiviraju
   konzervativni most, dok ga `true` zaobilazi.
2. Razriješi `modalityBridgeAudio*` postavke i izdvoji audio dijelove najvišeg nivoa
   koji se mogu spajati iz svake poruke putem zajedničkog `detectMediaParts()`
   detektora. Podržani oblici su OpenAI `input_audio`, `audio_url` i
   `source.media_type: "audio/*"`. Ugniježđeni audio se detektuje radi rutiranja, ali se ne
   uklanja putanjom spajanja. Rad je ograničen sa `modalityBridgeAudioMaxClips`;
   kasniji dijelovi ostaju netaknuti.
3. Poštuj konfigurisani `provider/model`, ili pusti `selectAudioBridgeModel()` da prođe kroz
   `AUDIO_TRANSCRIPTION_PROVIDERS` u stabilnom redoslijedu kataloga i odabere prvi
   model sa upotrebljivim aktivnim akreditivom provajdera.
4. `callAudioTranscription()` konvertuje base64/data-URI audio u multipart
   `file`, ili preuzima udaljeni `audio_url` putem javnog odlaznog
   zaštitnika sa DNS fiksiranjem i ograničenjem od 25 MB. Zatim šalje POST zahtjev sa datotekom i
   odabranim modelom na lokalnu `/v1/audio/transcriptions` samopetlju,
   autentifikovanu sa `resolveSelfLoopBearer()`. Postojeća ruta transkripcije vrši normalnu
   provjeru akreditiva, rukovanje hlađenjem/ograničenjem brzine i slanje provajderu.
5. Uspješni pozivi zamjenjuju svoje dijelove sa `[Audio N]: <transcript>`. Pozivi
   se izvode sa `Promise.allSettled`: pojedinačni neuspjeh čuva taj originalni
   audio dio (ugovor #4012). Ako svaki poziv ne uspije i dokaže se da je
   cilj `supportsAudio === false`, dijelovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
   nepoznati cilj (`null`), rezultat potpunog neuspjeha ostaje netaknut. Dokazani
   cilj koji podržava samo tekst bez upotrebljivog STT akreditiva dobija isti eksplicitni
   stub bez upućivanja mrežnog poziva.

Uspješni transkripti koriste LRU/TTL keš Modality Bridge-a na nivou procesa.
Ključ kombinuje audio referencu, stabilnu oznaku operacije `audio-transcription`
i odabrani STT model; neuspjesi se nikada ne keširaju. Audio pokušaji ažuriraju
zajedničke brojače `bridged`, `cacheHits`, `failures` i `lastUsedAt`.
Transformisani odgovori nose
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; netaknuti
zahtjevi ne dobijaju Audio Bridge segment.

Postavke vremena izvršavanja su podržane bazom podataka i validirane Zod-om:

| Ključ                         | Podrazumijevano | Opseg           |
| ----------------------------- | --------------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —               |
| `modalityBridgeAudioModel`    | `""`            | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10            |

Zajednički keš ostaje pod kontrolom `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najvišeg nivoa u `messages` Chat Completions i `input` API odgovora prije nego što se pozove cilj bez poznate izvorne video podrške.
Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URL-ovi,
i `data:video/*;base64,...` data URI-ji. Obični nazivi datoteka u tekstu se ne tretiraju
kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) je zadužen za prolazak zahtjeva,
provjeru sposobnosti/politike, agregaciju po zahtjevu i payload odgovora.
Rad po videu — akvizicija, keširanje cijelog rezultata, opisivanje sekvence frejmova
(koja spaja bilo koji transkript zvuka koji je deklarisao pozivalac), i metrike/prekid/čišćenje po pokušaju —
skriven je iza `processVideoPart` u `videoBridgePipeline.ts`, pozvan jednom po video dijelu unutar petlje `preCall`.
Taj modul takođe definiše eksplicitne granice portova `VideoMediaBrokerPort`
(akvizicija bajtova i ekstrakcija uzorkovanih frejmova), `VideoAudioTranscriptionPort`
(spajanje transkripta zvuka koji je deklarisao pozivalac sa uzorkovanim titlovima), i
`VideoDrilldownPort` (granica perzistencije detaljnog prikaza frejmova; još nije povezan
u `processVideoPart` — samo zasebna ruta `/api/modality-bridge/video/drilldown`
danas piše unose za detaljan prikaz).

Javna `/v1` putanja zahtjeva nikada ne uvozi niti poziva podproces. Udaljeni
videozapisi se preuzimaju pod ograničenjem od 50 MiB; inline base64 videozapisi imaju
konzervativno ograničenje od 36 MiB dekodiranog po videu, tako da omotnica modela/poruka/frejminga
može ostati unutar javnog ograničenja prijema JSON zahtjeva od 50 MiB. Inline
procjene dužine i dekodirane veličine provjeravaju se prije alokacije. HTTPS je
obavezan na početnom udaljenom URL-u i svakom preusmjeravanju, koristeći postojeću
javnu izlaznu zaštitu sa DNS pinningom. Bajtovi zatim prelaze tačnu internu
`POST /api/modality-bridge/video/extract` brokersku granicu. Ta ruta je i
`LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo autentifikovani,
pouzdani loopback zahtjev po procesu, i nikada ne prihvata URL, putanju datoteke, izvršnu datoteku,
ili listu argumenata. API pipeline veličine tijela i inkrementalni čitač tijela rukovaoca
nezavisno nameću ograničenje brokerskog unosa od 50 MiB. Njegov ograničeni red
izvršava jednu ekstrakciju istovremeno, dozvoljava četiri posla na čekanju, i ograničava ulaz na čekanju na
100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna dozvoljena lista formata
isključuje formate playliste i manifesta. Za dozvoljene MOV-familije
kontejnera, eksterne MOV reference podataka ostaju podrazumevano onemogućene, i fiksna
komanda ih ne uključuje. I `ffprobe` i `ffmpeg` koriste
whitelist protokola samo za `file`, jednu nit, fiksne nizove argumenata, bez shell-a,
i izvršne datoteke riješene iz `PATH`. Priloženi streamovi slika nisu
kandidati za reprodukciju. Svi streamovi koji se mogu reprodukovati moraju zadovoljiti ograničenja, i
eksplicitni podrazumevani stream je preferiran prije determinističkog fallbacka sa najnižim indeksom.
Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji, i
33.554.432 izvornih piksela. FFmpeg uzorkuje 1–16 središnjih JPEG frejmova, smanjuje
dužu ivicu na najviše 1.024 piksela bez povećanja manjih unosa, i
nikada ne prima URL. Uzorkovanje je `uniform` po podrazumevanoj vrednosti. Opcione
`scene_aware` i eksperimentalne `segment_aware` politike izvode jedan dodatni
fiksni FFmpeg prolaz preko već validiranog lokalnog streama, biraju ograničene
`showinfo` vremenske oznake scene, i deterministički se vraćaju na iste
uniformne središnje tačke u slučaju kvara detektora, isteka vremena, pogrešnog izlaza, ili praznog
skupa kandidata. Segment-aware režim alocira središnje uzorke proporcionalno
validiranim intervalima scene; dokazi o segment-aware ponašanju i fallback ponašanje su
detaljno opisani u nastavku. Tvrdo ograničenje od 16 frejmova se
primjenjuje nakon odabira u svakoj politici. Kada zahtjev osjetljiv na scenu ima samo
budžet za jedan frejm, koristi uniformnu središnju tačku aktivnog cijelog videa ili prozora fokusa
i prijavljuje `policyEffective: uniform`: jedan odabrani frejm scene
ne može sačuvati oba vremenska kraja. Pozivalac može opcionalno pružiti
konačni prozor fokusa (`start`/`end` sekunde); granice su ograničene na trajanje medija,
obrnuti ili beskonačni prozori su odbijeni, i sve politike uzorkovanja
izvode se samo unutar normalizovanog intervala. Rezultirajući
prozor je uključen u metapodatke uzorkovanja i u nepouzdani opis
prefiks tako da nizvodni modeli mogu razlikovati fokusirani izvod od cijele
vremenske linije.

Semantički fokus titlova je zasebna, eksplicitna postavka. Podrazumevani `full`
režim analize čuva postojeći prompt frejma i nikada ne prosljeđuje tekst zahtjeva
modelu titlova. U `focused` režimu, most čita samo najnoviji
neprazan `text`/`input_text` koji je autorizovao korisnik iz istog Chat ili Responses
kontejnera, normalizuje ga na NFC, sažima kontrolne znakove i razmake,
i ograničava ga na 500 Unicode kodnih tačaka. Prazan rezultat se vraća na
tačan `full` prompt. Koristan savjet se serijalizuje kao JSON u namjenskom
bloku nepouzdanog korisničkog konteksta i može samo prioritizirati vidljive detalje;
ne može nadjačati zasebno upozorenje protiv slijeđenja uputstava vidljivih
ili čujnih u medijima. Tekstualni fokus nikada ne zaključuje `start`/`end` ili mijenja
vremenski sampler.

#### FU-07 dokazi strukturnog segmenta

`segment_aware` koristi jedan ograničeni prolaz predanalize preko već validiranog lokalnog video streama. Fiksni lanac filtera prvo skalira na najviše 320 piksela širine, detektuje promjene scene i zamrznute intervale, zatim uzorkuje na 1 frejm u sekundi za zamućenje, prosječnu luminancu i prostorne/vremenske informacije. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, iste `file`-only protokole i dozvoljene liste kontejnera, ograničenje izlaza procesa od 1 MiB, i najviše 30 sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvata komandu, filter, putanju ili URL iz zahtjeva.

Strukturne vrijednosti su deterministički dokazi uzorkovanja, a ne semantičko razumijevanje videa. One ne izvode subjekte, radnje, natpise, govor ili namjeru korisnika. Granice scene i zamrzavanja formiraju segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni detalji i vremenska promjena samo utječu na to kako se dodjeljuje postojeći budžet od 1–16 okvira. Potpuno zamrznuti segment ograničen je na jedan okvir, dok se nezamrznuti segmenti natječu za preostali budžet. Kada granice nadmaše broj okvira, zadržava se uniformna pokrivenost vremenske linije tako da brzi rani rezovi ne mogu sakriti dugi završni segment. Granice scene unutar rezolucije analize od 1 sekunde granice zamrzavanja se spajaju.

Nedostajući filteri, pogrešni/prazni dokazi, greška detektora ili ograničeno vrijeme čekanja prije analize otvaraju se na tačnu uniformnu politiku srednje tačke. Prekid pozivaoca ili rok brokera ne otvara se: on prekida podproces u toku, sprečava kasnije izdvajanje okvira, a privatno privremeno stablo se uklanja u `finally` bloku.

`scripts/perf/video-bridge-fu07-eval.ts` generiše determinističke stvarne FFmpeg fiksature za uštede poziva natpisa nakon deduplikacije, alokaciju budžeta za gusti pokret, dokaze o zamućenju/ekspoziciji/SI-TI, brze rezove sa dugim repom i lažne pozitive postepenog blijedenja. Bilježi stvarno vrijeme prije analize i, gdje je `/usr/bin/time` dostupan, CPU djeteta i vršni RSS. Njegove provjere kvaliteta su samo strukturni orakli. Kvalitet stvarnog modela natpisa ostaje `HOLD` jer ovaj sistem nema ovlaštenu krajnju tačku ili zamrznutog sudiju. Novčane uštede također ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne pruži eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne fabrikuje nijedan rezultat.

Svaki okvir je ograničen na 4 MiB, svi sirovi okviri zajedno na 23 MiB, a serijalizovani odgovor brokera na 32 MiB. Privatni privremeni direktorij se uklanja u `finally` bloku. OmniRoute ne uključuje FFmpeg i ne prihvata prilagođenu putanju izvršne datoteke. Prije kreiranja natpisa, most primjenjuje konzervativni vizuelni prolaz deduplikacije: svaki JPEG se smanjuje na 16×16 sivi bafer i upoređuje se samo sa posljednjim zadržanim okvirom. Za traženi budžet natpisa iznad jednog okvira, ekstrakcija pruža ograničeni bazen kandidata do dvostruko većeg budžeta i nikada više od 16 okvira. Traženo ograničenje se primjenjuje tek nakon deduplikacije, pri čemu se prvi i posljednji odabrani kandidati čuvaju tokom konačnog proređivanja kada je budžet najmanje dva. Verzija `grayscale-16x16-mean-cells-v2` politike koristi veću vrijednost srednje luma delte i omjera ćelija sličica čija je normalizovana delta najmanje 0,05. Prag duplikata je konstanta 0,04, odabrana zbog predvidljivosti, a ne izložena kao postavka za vrijeme izvođenja. Ovaj sekundarni signal visokog kontrasta čuva male pokrete i promjene vidljivog teksta koje poređenje samo po srednjoj vrijednosti može sakriti. Greške komparatora ili dekodera otvaraju se i zadržavaju pokrivenost. Izlazni metapodaci razdvajaju izdvojene kandidate, uspješno korištene okvire i odbačene vizuelne duplikate.

Eksplicitno označeni dio videa može zatražiti kontakt listu sa vremenskim oznakama. Most gradi najviše 4-kolonu, 16-okvirnu JPEG mrežu. Svaka ćelija od 512 piksela urezuje svoju izvornu vremensku oznaku u donju traku visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima za naknadno povezivanje i reviziju. Kompletni JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG okvire; prekid klijenta se i dalje širi kroz operaciju lista.

Dokazi o promociji namjerno su odvojeni od sintetičkog mikromjerila kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiše A/B sistem sa verzijom šeme za stvarne OpenAI-kompatibilne modele vida. Mjeri tokene koje je prijavio provajder, ukupnu latenciju (uključujući kompoziciju lista), broj poziva modela i zadržavanje činjenica definisanih manifestom. Sirovi odgovori modela se ne zapisuju u izvještaj; zadržavaju se samo SHA-256 sažeci i podudarni ID-ovi činjenica. Sistem ne vrši mrežne ili plaćene pozive modela osim ako nije proslijeđen `--execute-real` i konfigurirani su `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog eksplicitnog stvarnog pokretanja, njegova mašinski čitljiva presuda ostaje `HOLD`; sama mjerenja sintetičkog opterećenja/broja poziva nisu dokaz promocije.

Pozivaoci mogu priložiti opcionalni `transcript.cues` niz podržanom dijelu videa kada već posjeduju usklađeni tekst. Svaki znak mora sadržavati `text`, konačni `start`/`end` interval unutar ispitivanog trajanja i dozvoljeni `source` (`client`, `embedded` ili `audio-bridge`); `confidence` podrazumijeva `1` i mora ostati između `0` i `1`. Tačni duplikati znakova se spajaju. OmniRoute nikada ne započinje transkripciju iz ovih metapodataka: validirani znakovi se kopiraju u opisani rezultat sa izvorom, pouzdanošću i intervalom, i prikazuju se kao nepouzdana zapažanja pored natpisa okvira. Nevažeći, van opsega ili tekst bez porijekla se odbija umjesto da se miješa u tok natpisa. Polje `source` je trenutno deklarisano od strane pozivaoca, a ne verifikovano od strane servera: OmniRoute nameće da je vrijednost jedan od tri dozvoljena stringa, ali još uvijek kriptografski ne potvrđuje da je `embedded` ili `audio-bridge` oznaka zaista došla iz ekstrakcije u vlasništvu servera. Tretirajte `source` kao nepouzdanu naznaku dok ta verifikacija ne stigne; ne gradite odluke o autorizaciji na njoj.

Napredni pozivatelj može pružiti već autoriziranu `audioTranscript` traku za isti video. Spoj fuzije obrađuje vizualna i audio zapažanja pod jednim rokom i signalom za prekid, raspoređuje ih na zajedničkoj vremenskoj liniji, spaja tačne duplikate i izvještava o djelomičnom rezultatu kada samo jedna strana uspije. Neispravan `audioTranscript` se degradira na taj djelomični rezultat — vizualni opis se zadržava, a audio grana bilježi pročišćeni kod greške — umjesto da cijeli video ne uspije. Dostupnost po grani, djelomična zastavica i pročišćeni kodovi grešaka čuvaju se u opisanom rezultatu, u metapodacima zaštitne ograde (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima fuzije mosta. Podrazumijevana putanja Video Bridge-a ne poziva pretvaranje govora u tekst niti preuzima drugu kopiju medija; bez te eksplicitne trake, ostaje samo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se automatski primjenjuje kad god Video Bridge (koji je sam po sebi opt-in) renderuje znak transkripta — ne postoji zasebna zastavica za zadržavanje. Kada zahtjev renderuje bilo koji znak transkripta (pozivateljem deklarirani `transcript` ili spojeni `audioTranscript`), zaštitna ograda ga označava kao `videoBridgeObserved` i proizvodi redigovanu sjenu video opisa — identično renderovanje u kojem je slobodni tekstualni sadržaj svakog znaka zamijenjen sa `[redacted-video-transcript]`, izgrađen zamjenom strukturiranog polja znaka prije nego što se string sastavi (nikada parsiranjem spljoštenog teksta, tako da nikakav sadržaj znaka — neprijateljski ili običan, uključujući sadržaje koji sadrže `]` kao što su `[inaudible]`/`[music]` — ne može preživjeti). Tijelo zahtjeva u trajnom zapisu poziva zamjenjuje svaki tekstualni dio izveden iz videa tom redigovanom sjenom, podudarnom po jednakosti sadržaja; `fullText` sidro se ponovo čita iz dovršenog payload-a zaštitne ograde prije poziva, tako da se podudaranje i dalje uspješno odvija nakon što kasniji lančani zaštitni mehanizmi (maskeri PII i akreditiva, prioriteti 10/95) prepišu tekst opisa na mjestu i nakon što injekcija sistemskog upita/predaje/memorije preoblikuje niz poruka. Tijelo poslano uzvodno modelu ostaje nepromijenjeno. Promatrani zahtjev također ne popunjava trajnu Memoriju (preskače se ekstrakcija izvedena i iz zahtjeva i iz odgovora), tako da vlastiti odgovor modela ne može ponoviti tekst transkripta u Memoriju.

Dodatne zadržane kopije koriste isti signal promatranog zahtjeva. Sirovi snimak klijentskog zahtjeva prije zaštitne ograde, zahtjev u memoriji koji čeka obradu i rani zapis odbijenih zahtjeva strukturno zamjenjuju polja transkripta u video dijelovima; string upiti sintetizirani fazama cjevovoda i predajom konteksta rediguju se na odredištu trajnog tijela zahtjeva. Trajni `video_content_removed` marker uzrokuje da nastavak `previous_response_id` ne uspije zatvoreno umjesto da rekonstruiše tekst koji je namjerno odbačen. Ako promatrani zahtjev izgubi svoju sjenu redakcije po dijelovima prije bilježenja, ili čak jedna od nekoliko video sjena ne uspije da se podudari nakon kasnijih mutacija zahtjeva, zadržano tijelo zahtjeva se u potpunosti izostavlja umjesto da se zadrži djelomično redigovan transkript.

Za promatrani zahtjev, odgovor modela može citirati bilo koji dio transkripta bez strukturirane granice znaka. Njegov trajni `responseBody` u zapisu poziva stoga je zamijenjen markerom izostavljanja; detaljni artefakt cjevovoda (koji može uključivati uzvodna/klijentska tijela i dijelove toka) se ne zadržava. Keševi za semantiku, idempotenciju i ponovno izvršavanje razloga zaobilaze čitanja i pisanja za taj zahtjev. Zahtjev provajdera i klijentu vidljiv odgovor ostaju nepromijenjeni. Rani keepalive bajtovi se ispuštaju iz privremenog bafera kada se detaljni artefakt izostavi. Kirovo upozorenje o pogrešno formatiranom EventStream-u izvještava samo o broju bajtova payload-a, nikada o njegovom sadržaju ili sirovoj grešci JSON parsera. Ovo ne tvrdi da je svaka nepovezana dijagnostika provajdera/plugina revidirana; šire čišćenje zadržanih odredišta prati se u #11658.

Interni `/api/modality-bridge/video/drilldown` životni ciklus je zaseban, loopback/token-autentificiran keš supstrat. Svaka operacija također zahtijeva kanonski neprozirni ID principala. Prije nego što se omogući produkcijski pozivatelj, on mora izvesti taj ID iz autentificiranog zakupca i nikada ne smije proslijediti vrijednost koju je odabrao klijent. Keš ključevi povezuju tog principala sa kanonskim ID-ovima sesije i video-reference, pohranjuju samo njihove SHA-256-izvedene ključeve i ograničavaju i čitanja i brisanja na istog principala. Keš pohranjuje najviše 16 izvedenih JPEG okvira po unosu, ističe ih nakon deset minuta i podržava ograničena `start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal je ograničen na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta ograničenja su nezavisna od globalnog plafona od 64 unosa/256 MiB: pritisak kvote principala izbacuje samo najmanje korištene unose tog principala prije nego što se razmotri globalno LRU izbacivanje. Istekli unosi se uklanjaju iz obračuna principala i globalnog obračuna prilikom aktivnosti keša, dok otkazivanje i neuspjeh validacije ne obavezuju djelomičnu zamjenu.

Keš odbija nekanonski Base64, prekomjerno popunjavanje, medije koji nisu JPEG, pogrešno formatirane ili skraćene JPEGe, i JPEGe koji proizvode upozorenje tokom ograničenog `sharp` dekodiranja cijele slike. On ponovo kodira svaku prihvaćenu sliku kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivatelja, i odbacuje sve preostale poliglotske bajtove umjesto da ih zadržava. Samo ograničeni kanonski kompresovani bafer se naplaćuje objema kvotama. JSON žičano ograničenje uključuje Base64 overhead za plafon dekodiranog ulaza od 32 MiB. Svaka pohranjena derivacija bilježi svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju derivacije, vrijeme kreiranja, hash sadržaja izračunat na serveru i hashiranu referencu roditelja plus hash sadržaja roditelja pouzdanog pozivatelja. Otkazivanje se provjerava između asinhronih faza dekodiranja/hashiranja prije atomskog keš commit-a.

Ova tranša još uvijek ne povezuje produkcijskog producenta s rutom i ne pruža odabir varijanti s više rezolucija. Transparentna putanja zahtjeva Video Bridge stoga ne stvara dodatni posao, dok izvođenje principala vezanog za zakupca i potpuni FU-08 životni ciklus s više rezolucija ostaju eksplicitan naknadni rad, a ne dokumentirano kao potpuno ponašanje.

Okviri se sekvencijalno opisuju pomoću konfiguriranog Video modela. Prazno Video premošćivanje nasljeđuje postavku Vision; ako su oba prazna, Vision auto-ruter odabire efektivni model sposoban za viziju. Uspješni opisi zamjenjuju originalni dio stabilnim prefiksom `[Video description:` koji također označava tekst kao nepouzdanu opservaciju izvedenu iz medija i govori nizvodnim modelima da ne slijede upute pronađene u medijima. Ključevi keša opisa okvira uključuju JPEG bajtove, upit, vremensku oznaku i efektivni model; keširaju se samo uspješni opisi. Unosi u keš zadržavaju stvarni uspješni model producenta, uključujući rezervni model; most izvještava `mixed` kada su različiti okviri proizvedeni od strane različitih modela. Pogodak u kešu ponovo koristi taj identitet producenta umjesto da ga preoznači kao traženi plan rutiranja. Keš rezultata cijelog videa ključan je za svaki ulaz koji mijenja izlaz — upit, efektivni model, politika uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak normaliziranog savjeta za fokus, prozor fokusa, `transcript`, `audioTranscript` i zastavicu kontaktne tablice — tako da promjena bilo koje od tih dimenzija rezultira promašajem keša, nikada zastarjelim ponovnim korištenjem. Verzija politike vizualne deduplikacije, prag i ograničeni broj kandidatskih okvira također su eksplicitni u ključu keša rezultata i metapodacima; promjena politike stoga ne može ponovo koristiti zastarjeli opis cijelog videa. Metapodaci keša rezultata v4 zadržavaju način rada i otisak prsta, nikada sirovi korisnički zadatak. Metapodaci zaštitne ograde izvještavaju o traženim i efektivnim načinima analize; traženi `focused` način bez upotrebljivog korisničkog teksta izvještava se kao efektivno `full`.

Zaštitna ograda izdvaja svaki podržani video dio, ali opisuje ne više od `modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima `supportsVideo === false`, neuspjeli i videozapisi iznad ograničenja postaju eksplicitni sigurni tekstualni markeri tako da nijedan sirovi video ne preživljava. Kada je sposobnost nepoznata, ti dijelovi ostaju netaknuti. Ciljevi s `supportsVideo === true` zaobilaze most. Signal prekida zahtjeva klijenta širi se kroz preuzimanje, brokerski red, podprocese i pozive za opisivanje; prekidi se zaustavljaju između videozapisa i nikada ne otvaraju put sirovim medijima.

Postavke vremena izvođenja su podržane bazom podataka (DB-backed) i validirane Zod-om:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                 |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opcionalno vrijeme izvođenja, opt-in                                                               |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničen, nepouzdan kontekst najnovijeg korisnika  |
| `modalityBridgeVideoModel`          | `""`        | Nasljeđuje Vision Bridge model                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ili proporcionalno `segment_aware`; kvar detektora vraća se na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                     |

Naslijeđene trajne vrijednosti Video timeouta iznad 120 sekundi ograničene su na rok brokera; novi zapisi postavki iznad tog ograničenja se odbijaju. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu označenu povratnu lokalnost prije autentifikacije ili provjere vremena izvođenja, a zatim zahtijeva upravljačku autentifikaciju. Vraća samo `available`, sanitizirane FFmpeg/ffprobe verzije i fiksni razlog kada vrijeme izvođenja nije dostupno. Interna krajnja tačka za ekstrakciju nije javni API za upload: zasićenje reda vraća `503` plus `Retry-After`, prekid veze pozivatelja vraća `499`, a fiksni rok brokera vraća `504`. Konvertirani odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` u centralni `x-omniroute-modality-bridge` zaglavlje bez uklanjanja Vision ili Audio segmenata.

### PII Masker (`piiMasker.ts`)

Pokreće se na **obje** faze.

- **`preCall`** klonira payload, prolazi kroz `system`, `messages`, `input` i `prompt` (uključujući stavke običnog stringa), i primjenjuje `processPII()` (iz `@/shared/utils/inputSanitizer`) na string `content`/`text` polja. Kada je `PII_REDACTION_ENABLED=true`, detektovani PII se rediguje u odlaznom payloadu. Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji kontroliše samo politiku prompt-injekcije). Kada je redakcija isključena, poziv bilježi broj detekcija bez prepisivanja sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` plus masker oblika Responses-API-ja (`maskResponsesOutput` — pokriva `output_text` i `output[].content[].text`). Ako dođe do bilo kakve redakcije, modificirani odgovor zamjenjuje originalni.

Zaštitna ograda nikada ne blokira; ona samo anotira (`meta.detections`, `meta.redacted`) ili prepisuje.

### Prompt injekcija (`promptInjection.ts`)

Detektuje adversarijalne strukture u sadržaju koji je dostavio korisnik i primjenjuje konfigurisanu politiku. Ponašanje je vođeno varijablama okruženja i opcijama konstruktora:

| Postavka        | Env var                                                                                               | Zadano | Efekat                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitna ograda se isključuje.                                                                                                                                                                |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Politika ubrizgavanja: `block`, `warn`, ili `log`. (`redact` je prihvaćen radi kompatibilnosti unazad, ali **ne** uklanja tekst ubrizgavanja; zahtjev za prepisivanje PII kontrolira `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna ozbiljnost potrebna za blokiranje. Srednja je samo za posmatranje po zadanim postavkama.                                                                                                             |

**Precedencija načina** (`getMode`): pozivatelj `options.mode` →
`INJECTION_GUARD_MODE` **premošćavanje zastavice funkcije baze podataka** (Kontrolna ploča → Postavke →
Zastavice funkcija) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Premošćavanje sa kontrolne ploče stoga ima prednost nad varijablama okoline, tako da korisničko sučelje Zastavica funkcija kontrolira pokrenutu zaštitu uživo (bez ponovnog pokretanja). Čitanje baze podataka je sigurno od grešaka:
ako dođe do greške, zaštita se vraća na ponašanje zasnovano na okolini, a kada nije postavljeno premošćavanje, ponašanje je identično rješenju samo na osnovu okoline.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora koji se koristi drugdje u cjevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba `high` ozbiljnosti).
3. Opcionalni `customPatterns` proslijeđeni putem opcija konstruktora (stringovi, regex,
   ili `{ name, pattern, severity }` zapisi).

Kada je `mode === "block"` **i** barem jedna detekcija zadovoljava prag ozbiljnosti,
`preCall` vraća `{ block: true, message: "Request rejected: suspicious content detected" }`. U `warn`/`log` načinima rada, zaštitna ograda bilježi, ali dozvoljava poziv. Zajednička pomoćna funkcija `evaluatePromptInjection()` je također izvezena
za pozivatelje koji trebaju procijeniti upite bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor pregleda samo **prvih 16 KB**
spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja
petlje uzoraka. Direktive za ubrizgavanje nalaze se blizu vrha unosa, tako da ovo
ograničava CPU/GC regex-a na teretima od više stotina KB bez slabljenja detekcije (usp.
#3932, #4041).

### Masker vjerodajnica (`credentialMasker.ts`)

Pokreće se u **obje** faze, posljednji u zadanom lancu (prioritet `95`). Redigira
poznate obrasce API ključeva / tajnih tokena iz odlaznog tereta (sadržaj poruke,
argumenti poziva alata, rezultati alata) **i** odgovora pružatelja, tako da
vjerodajnica zalijepljena u upit (ili vraćena rezultatom alata) ne procuri
uzvodnom pružatelju ili nazad klijentu.

- **Samo uz pristanak**, ista konvencija kao i redakcija PII (Tvrdo pravilo #20-susjedno):
  onemogućeno osim ako `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključena, zaštitna ograda je no-op —
  nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` prolazi kroz cijelo stablo tereta/odgovora (`walkValue()`,
  sigurno od zagađenja prototipa, sigurno od ciklusa putem `WeakSet`) i zamjenjuje
  podudaranja sa `[REDACTED:<type>]` zamjenskim tekstom, klonirajući samo grane koje su
  se stvarno promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve pružatelja LLM-a (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve plaćanja (Stripe, Square),
  ključeve oblaka (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove,
  stringove za povezivanje koji sadrže vjerodajnice (`mongodb://user:pass@...`, itd.), i
  generički obrazac vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigiraju se strukturno (samo vrijednost, prefiks sheme poput
  `Bearer `/`Basic ` je sačuvan) umjesto putem generičkog tekstualnog regexa.
- Zaštitna ograda nikada ne blokira; ona samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i bilježi (`meta.credentialsRedacted`, `meta.count`).

Zaštita od regresije: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
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

Zaštitna ograda signalizira "nema promjene" vraćanjem `void`, `{}`, ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja teče kroz lanac za nizvodne zaštitne ograde.
`signal?: AbortSignal` prenosi životni ciklus pozivatelja u zaštitne ograde. Prekid zahtjeva je namjerni izuzetak otvorenog kvara: medijski mostovi zaustavljaju rad i čišćenje bez vraćanja sirovih medija na cilj za koji se zna da ih ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje normaliziranim imenom) zaštitnu ogradu i
  ponovno sortira po rastućem `priority`.
- `clear()` / `list()` — administrativni pomoćnici.
- `runPreCallHooks(payload, context)` — iterira kroz aktivne zaštitne ograde, provlači
  `payload` kroz `modifiedPayload` i zaustavlja se na prvom `block: true`.
- `runPostCallHooks(response, context)` — isti tok na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i opcionalno
  ponovno registrira zadane vrijednosti za čistu izolaciju testova.

Oba pokretača vraćaju `{ blocked, payload|response, results, guardrail?, message? }`
gdje je `results` niz zapisa `GuardrailExecutionResult` koji uključuju
polja `blocked`, `skipped`, `modified`, `error` i `meta` po zaštitnoj ogradi,
korisna za praćenje.

### Onemogućavanje zaštitnih ograda po zahtjevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agregira
dedupliciranu listu imena zaštitnih ograda koje treba preskočiti za trenutni
zahtjev. Izvori (svi opcionalni, svi spojeni):

- `apiKeyInfo.disabledGuardrails`
- Tijelo zahtjeva `disabledGuardrails` (na najvišem nivou)
- Tijelo zahtjeva `metadata.disabledGuardrails`
- Zaglavlje `x-omniroute-disabled-guardrails` (ili zastarjelo
  `x-disabled-guardrails`)

Vrijednosti mogu biti nizovi stringova ili string odvojen zarezima; imena su
normalizirana u mala slova kebab-case (`pii_masker` → `pii-masker`). Rezultat
se prosljeđuje kroz `context.disabledGuardrails` registru, koji preskače
odgovarajuće zaštitne ograde (`skipped: true` u `results`).

## Redoslijed izvršavanja

Za svaki zahtjev koji prolazi kroz `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` gradi listu za preskakanje iz API ključa, tijela i zaglavlja.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne ograde (guardrails) u rastućem redoslijedu prioriteta:
    - Onemogućene zaštitne ograde se bilježe kao `skipped`.
    - `preCall` svake zaštitne ograde može prepisati payload putem `modifiedPayload`.
    - Prvi `block: true` prekida lanac i rukovatelj vraća odgovor o odbijanju zaštitne ograde.
3.  (Potencijalno prepisan) payload ulazi u kombinovano rutiranje i uzvodno slanje.
4.  Nakon što je odgovor sastavljen, `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac na odgovoru. `block: true` ovdje odbacuje uzvodni odgovor.

Zaštitne ograde koje izbace grešku bilježe se sa `error: <message>` i loguju putem
`logger.warn`, ali lanac se nastavlja — dizajnirano da bude "fail-open".

## Konfiguracija

Varijable okruženja koje čitaju ugrađene zaštitne ograde:

| Varijabla                             | Koristi                 | Efekat                                                                                                                          |
| :------------------------------------ | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Postavite `false` da potpuno onemogućite detekciju.                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Politika injekcije: `warn`, `block`, ili `log`. Stara vrijednost `redact` ne prepisuje tekst injekcije.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Način rada za zaštitu od injekcije; također zastavica funkcije baze podataka koja **nadjačava** varijable okruženja (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (podrazumijevano), `medium`, ili `low`.                                   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Stari alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kada je `true`, PII zahtjeva se rediguje (nezavisno od načina injekcije).                                                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno) | Kontroliše ponašanje maskera na strani odgovora.                                                                                |

Zaštitne ograde Modality Bridge čitaju konfiguraciju vremena izvođenja iz skladišta postavki podržanog bazom podataka (`getSettings()`), a ne iz varijabli okruženja. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, i
`modalityBridgeCacheMaxEntries`. Stari
`visionBridge*` ključevi su prihvaćeni samo kao dokumentovani jednociklični rezervni mehanizam za čitanje; upisi na kontrolnoj tabli koriste primarne ključeve. Podrazumijevane vrijednosti i rezervni rješavač nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`, sa starim konstantama zadržanim u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, i `modalityBridgeAudioMaxClips`, plus zajedničke
`modalityBridgeCache*` postavke. Audio nema rezervni mehanizam za stare ključeve jer su ovi ključevi uvedeni sa Modality Bridge shemom.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, i
`modalityBridgeVideoTimeout`, plus zajedničke `modalityBridgeCache*` postavke.
Podrazumijevano je onemogućeno jer su FFmpeg/ffprobe opcionalne operativne zavisnosti, a titlovanje okvira dodaje kašnjenje i troškove modela.

## Prilagođeni Guardrails

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

1.  Kreirajte `src/lib/guardrails/myGuardrail.ts` koji proširuje `BaseGuardrail`.
2.  Implementirajte `preCall` i/ili `postCall`.
3.  Registrujte prilikom uvoza (push iz `registerDefaultGuardrails`) ili
    pozovite `guardrailRegistry.register(...)` tokom izvršavanja — registar zamjenjuje
    bilo koji prethodni guardrail sa istim normalizovanim imenom.
4.  Dodajte testove pod `tests/unit/` (postojeći primjeri:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova da biste počeli iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` da biste počeli sa praznim registrom i
registrovali samo guardraile koji se testiraju. Vision Bridge prihvata ubrizgavanje zavisnosti
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže ekvivalentne šavove za postavke,
mogućnosti, odabir STT modela, provjere akreditiva i transkripciju. Testovi stoga mogu
izvršavati oba toka bez pristupa bazi podataka ili mreži.

## Pogledajte takođe

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — dijeljeni detektor koji pokreće
  prompt-injection i PII maskiranje
- `src/shared/constants/visionBridgeDefaults.ts` — podrazumijevane postavke Vision Bridge-a i
  lista modela sa prisilnim premošćavanjem
- `src/shared/constants/modalityBridgeDefaults.ts` — dijeljene podrazumijevane postavke Vision/Audio runtime-a
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (prekidač strujnog kruga, hlađenja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca varijabli okruženja

## Pokrivenost rute za zaštitu od ubrizgavanja i crveni tim (Faza 8 · Blok D)

Zaštita od ubrizgavanja (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute
koje prihvataju korisničke upite. Poštuje `INJECTION_GUARD_MODE` (podrazumijevano `warn` = samo bilježenje;
`block` = vraća HTTP 400 `SECURITY_001`).

| Tip               | Rute                                                                                                                                                 | Podrazumijevani način rada |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Tekst (postojeći) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                       |
| Generativni       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                       |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                       |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Crveni tim (noćno, `nightly-llm-security.yml`):** promptfoo provjerava da svaka ruta blokira
OWASP-LLM korpus u `INJECTION_GUARD_MODE=block`; garak pokreće sonde (preskače bez tajne).
`moderations` je uključen radi dosljednosti — operatori u blok-modu ga mogu izuzeti putem
`resolveDisabledGuardrails`.

Noćni radni tok (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokiranje)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  sa `INJECTION_GUARD_MODE=block`. Svaki adversarijalni slučaj (npr. "zanemari sve
  prethodne instrukcije...", DAN-stil jailbreakovi) potvrđuje da odgovor nosi
  `error.code === "SECURITY_001"`, tj. da je zaštita zaista odbila zahtjev.
- **`garak` (savjetodavno)** — pokreće garak `--probes promptinject,dan,leakreplay`
  protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Ograničeno tajnom
  dobavljača (`PROMPTFOO_PROVIDER_KEY`); graciozno preskače i ima sufiks
  `|| true`, tako da izvještava bez pada CI-ja.

Pokrivenost pomoćnika za zaštitu (`createInjectionGuard` / `withInjectionGuard`)
obuhvata svaku `/v1` rutu koja nosi upit; tekst upita se izvlači iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
