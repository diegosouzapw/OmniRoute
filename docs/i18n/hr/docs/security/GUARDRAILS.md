# Guardrails (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Zadnje ažurirano:** 2026-08-29 — v3.8.51 (Podrijetlo transkripta Video Bridgea deklarira pozivatelj,
> još nije potvrđeno od strane poslužitelja — pojašnjeno prema #11661)

Guardrails (zaštitne ograde) provode sigurnost, pravila i transformacije sadržaja na granici
između OmniRoute-a i uzvodnih (upstream) pružatelja usluga. Svaki guardrail može pregledati (i
opcionalno odbiti, transformirati ili anotirati) terete zahtjeva (`preCall`) i
uzvodne odgovore (`postCall`).

Sustav je **fail-open**: ako guardrail izbaci pogrešku tijekom izvršavanja, registar
bilježi pogrešku i nastavlja sa sljedećim guardrailom umjesto prekidanja
zahtjeva. Blokiranje je eksplicitna odluka (`block: true`), nikada slučajnost.

## Ugrađeni Guardrails

Registar automatski učitava šest guardraila prema redoslijedu prioriteta prilikom uvoza
(vidi `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niži brojevi prioriteta izvode se **prvi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Presreće zahtjeve koji sadrže slike usmjerene prema **modelima koji ne podržavaju viziju** i ili
preusmjerava cijeli zahtjev na model s vizualnim sposobnostima ili zamjenjuje dijelove
slika tekstualnim opisima koje generira konfigurabilni vizualni model prije
uzvodnog poziva. To omogućuje pružateljima usluga koji podržavaju samo tekst da transparentno obrađuju
multimodalne terete.

Tijek (Flow):

1. Preskoči ako ciljni model već podržava viziju (osim ako se ne nalazi na
   popisu prisilnog premošćivanja `isVisionBridgeForcedModel`).
2. Izdvoji dijelove slika putem `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira na **unificirani detektor medija**
   `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinstveni izvor
   istine podijeljen s combo filtrom kompatibilnosti.
   Ekstrakcija je dopuštena samo za dijelove na najvišoj razini oblika koje
   `replaceImageParts` može ponovno spojiti (ugovor extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, i Responses API `input_image`. Ugniježđeni pogoci i
   oblici koji su samo indikatori su materijal za combo-filtar i nikada se ne izdvajaju.
   Preskoči ako ništa nije pronađeno.
3. Razriješi konfiguraciju u vremenu izvršavanja putem `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki `modalityBridge*`
   pobjeđuju; naslijeđeni `visionBridge*` ključevi ostaju **fallback za jedan ciklus**
   (prozor za povratak/rollback). Preskoči prije bilo kakvog prolaska kroz medije kada je
   bridge onemogućen.
4. Selektor načina rada (`modalityBridgeVisionMode`, vidi tablicu ispod) odlučuje
   između preusmjeravanja (reroute) naspram opisivanja (describe). Reroute vraća `modifiedPayload` sa samo
   zamijenjenim `model` parametrom, plus meta podatke `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja (describe): ograniči broj slika na `maxImages`, sastavi prompt svjestan zadatka,
   provjeri cache opisa, pozovi vizualni model **paralelno**
   (`Promise.allSettled`), i umetni `[Image N]: <description>` tekstualne dijelove na
   njihovo mjesto. Neuspjelo opisivanje rezultira s `null` i izvorni dio slike se
   **zadržava** (#4012) — osim na combo describe putanji kada svako
   opisivanje ne uspije, gdje potvrđeni ne-vizualni uzvodni model dobiva
   zamjenski tekst `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrati `modifiedPayload` + meta podatke (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor načina rada (`modalityBridgeVisionMode`)

| Način rada | Zadano | Ponašanje                                                                                                                                                                                                                                                                                           |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Naslijeđena heuristika, netaknuta (#6640/#7204): ne-combo/`auto/` modeli preusmjeravaju se na najbolji vizualni model osim ako izvorni model već ima upotrebljive vjerodajnice (tada opisuje); combo ciljevi uvijek opisuju.                                                                        |
| `describe` |        | Uvijek opiši — blok za preusmjeravanje se u potpunosti preskače; model koji je korisnik odabrao uvijek odgovara.                                                                                                                                                                                    |
| `reroute`  |        | Prisili preusmjeravanje: zaštita za modele s vjerodajnicama se zaobilazi. Zaštita vjerodajnica za **cilj** preusmjeravanja i dalje vrijedi — kada ne postoji upotrebljiv vizualni cilj, zahtjev prelazi na opisivanje kako sirove slike nikada ne bi dosegle isključivo tekstualni backend (#8430). |

Prisilni načini rada rade kratki spoj **prije** nego što se pokrene auto heuristika; `auto` ponašanje
je identično u bajt guardrailu prije PR-1.

#### Prompt za opisivanje svjestan zadatka (`modalityBridgeVisionTaskAware`)

Zadano **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje
tekst **zadnje korisničke poruke** (skraćen na 500 znakova) osnovnom
promptu za opisivanje, usmjeravajući opis prema onome što je korisnik zapravo pitao
(codex-vision-proxy uzorak) i tražeći od vizualnog modela da transkribira vidljivi
tekst. S isključenom zastavicom — ili bez korisničkog teksta — osnovni prompt se koristi nepromijenjen.

Vlastiti OpenAI-kompatibilni zahtjev petlje za opisivanje (`callVisionModelSingle()` u `visionBridgeHelpers.ts`) uvijek traži `image_url.detail: "high"` — bezuvjetno, za svakog pozivatelja/davatelja, nije uvjetovan nikakvim klijentskim signalom. Uzorkovanje niske razine detalja smanjuje točnost OCR-a za upravo zadatak transkripcije teksta koji ovaj prompt traži, tako da sam poziv za opisivanje uvijek traži visoku razinu detalja bez obzira na razinu detalja koju je koristio izvorni dolazni zahtjev. Ovo utječe samo na interno tijelo zahtjeva za opisivanje; ne mijenja način na koji OmniRoute prosljeđuje pozivateljev vlastiti `image_url.detail` na primarnom zahtjevu — ta se zadana vrijednost primjenjuje zasebno, i to samo za detektirane OpenCode klijente, u `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grana Anthropic wire-formata petlje za opisivanje nema polje `detail` i na nju ne utječe ni jedna zadana vrijednost.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vraća `callVisionModel()` prosljeđuje se neizmijenjeno, čuvajući postojeće ponašanje. Bilo koja vrijednost u rasponu 100–50000 skraćuje opis sa sufiksom `…` prije nego što se vrati kao `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`). Povećajte ovo za OCR zadatke s puno detalja gdje nizvodni model treba potpunu transkripciju; smanjite ovo kako biste ograničili upotrebu tokena na opširnim vizualnim modelima. Polje na nadzornoj ploči nalazi se na naprednom panelu kartice Vision (`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i ograničava svaku vrijednost između 1 i 99 na donju granicu od 100, dok eksplicitnu `0` ostavlja netaknutom — `0` je valjana Zod vrijednost sama po sebi (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo "nepostavljena" zadana vrijednost.

#### Predmemorija opisa (`modalityBridge/bridgeCache.ts`)

LRU + TTL predmemorija u memoriji za izlaze opisa, dijeljena na razini procesa. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s okvirom s prefiksom duljine (bez kolizija granica polja). Komponenta modela je **konfigurirani** bridge model, a ne model koji je zapravo odgovorio — `callVisionModel` se može interno vratiti na rezervnu opciju, a ključanje po pokušaju fragmentiralo bi predmemoriju. Neuspjeli opisi se nikada ne keširaju. Postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljene slike (samopetlja opisivanja/dohvaćanja base64)

Kada bridge sam dohvaća **udaljenu** sliku — Anthropic samopoziv za opisivanje i konverzija base64 u claude-wire-format (`ensureBase64ImagesForClaudeWire`), oboje putem `fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući URI podataka prolazi kroz `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prije nego što se ugradi u zahtjev vizualnog modela. Prevelike slike se smanjuju na **dužu stranicu od 2048 piksela** (odgovara ograničenju promjene veličine koje OpenAI/Anthropic već primjenjuju na strani poslužitelja), što smanjuje bajtove prijenosa/kašnjenje bez promjene onoga što vizualni model vidi. Promjena veličine koristi `sharp`, učitan putem dinamičkog uvoza: na platformi gdje se njegova izvorna binarna datoteka ne učita, `normalizeDataUri()` **nikada ne baca iznimku** — vraća se na prosljeđivanje izvornih bajtova, tako da put opisivanja/base64 konverzije uvijek nastavlja raditi. Bajtovi koji nisu slika (dohvaćanje koje nije vratilo sliku koja se može dekodirati) također se prosljeđuju netaknuti. Ova normalizacija je ograničena na slike koje bridge dohvaća za vlastiti poziv — nikada se ne primjenjuje na izvorni payload pozivatelja koji se prosljeđuje, u skladu s principom mutacije samo uz opt-in (Tvrdo pravilo #20).

#### Shema postavki + migracija

Novi `modalityBridge*` ključevi su Zod-validirani u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, i grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija `141_modality_bridge_settings.sql` kopira postojeće naslijeđene `visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentno, nikada ne prebrisuje `modalityBridge*` vrijednost koju je postavio operator); naslijeđeni ključevi ostaju prihvaćeni kao rezervna opcija za čitanje tijekom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformirani opisom nose `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (izgrađeno pomoću `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, označeno pomoću `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmjereni zahtjevi **ne** dobivaju zaglavlje — payload je ostao netaknut i zamjena modela je već vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (upravljačka autentifikacija, ista razina kao `GET /api/settings`) vraća brojače po modalitetu u memoriji `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i `video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao svoj nazivnik; operacija bez mjerenja vremena ne stvara uzorak od nula milisekundi. `bridged` ostaje unatrag kompatibilan alias za uspješne konverzije; neuspjeli pokušaji ga ne povećavaju. Brojači se resetiraju pri ponovnom pokretanju procesa po dizajnu (telemetrija, a ne računovodstvo).

#### Konfiguracija nadzorne ploče

Namjenska nadzorna stranica je
`/dashboard/settings/modality-bridge`. Njezine URL-adresabilne kartice `Vision`, `Audio`
i `Video` zadržavaju parametre upita prilikom prebacivanja vrijednosti `tab`.
Kartica Vision izlaže omogućavanje, način rada, odabir modela (uključujući automatsku
zadanu vrijednost), promptiranje svjesno zadatka, napredna ograničenja za timeout/sliku/duljinu-opisa/cache,
brojače vremena izvođenja
i zaštićeni uzorak zahtjeva. Kartica Audio je također aktivna: izlaže
omogućavanje, birač modela samo za STT s opcijom Auto, ograničenja za timeout/maksimalni-isječak, audio
brojače i `input_audio` uzorak testa. Kartica Video je funkcionalna: izvještava
o stanju izvođenja FFmpeg/ffprobe — jedno od četiri eksplicitna UI stanja (`unknown` dok
je sonda u tijeku ili se nije mogla dovršiti, `restricted` na nadzornoj ploči koja nije
loopback host gdje se sonda preskače na strani klijenta, `unavailable` nakon što je sondirana
i potvrđeno da nedostaje, ili `available` s verzijama FFmpeg/ffprobe) — zadržava
ograničenja za omogućavanje/model/okvir/video/timeout, filtrira birač modela na modele
sposobne za viziju i izlaže video brojače.

Bivša kartica Vision Bridge pod AI postavkama je veza za kompatibilnost na
novu stranicu; više ne posjeduje drugu kopiju obrasca. Media Providers također
povezuje tijekove rada Image-to-Text i Speech-to-Text s odgovarajućim karticama Modality
Bridge bez uklanjanja postojećeg Speech-to-Text igrališta.

**Zaobilaženje prijema samopetlje:** kada poziv `describe` prolazi kroz OmniRouteovu
vlastitu `/v1` samopetlju (nestandardni model pružatelja), podzahtjev šalje
`x-omniroute-admission-bypass: internal` i autentificira se s razriješenim
vjerodajnicama samopetlje — lokalnim `sk_omniroute` sentinelom u lokalnom načinu rada, ili
operatorom konfiguriranim `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ključem (#1350) tako
da `REQUIRE_API_KEY=true` implementacije i dalje mogu pokrenuti poziv `describe`. Zaobilaženje
se poštuje samo za te točne vjerodajnice, tako da vanjski klijenti ne mogu koristiti
zaglavlje za preskakanje prijema.

Zadane vrijednosti naslijeđa nalaze se u `src/shared/constants/visionBridgeDefaults.ts`;
nove zadane vrijednosti za način rada/svjesnost zadatka/cache i rješavač postavki nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitna ograda izlaže
opciju konstruktora `deps` tako da testovi mogu ubrizgati lažne implementacije `getSettings` i
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za chat koji sadrže audio prije nego što stignu do cilja koji
nije poznat po prihvaćanju audio ulaza. Nikada ne preusmjerava zahtjev za chat: audio dijelovi se
transkribiraju putem postojećeg OpenAI-kompatibilnog multipart endpointa, a
odabrani model chata nastavlja s tekstualnim transkriptima.

Tijek:

1.  Razriješite `supportsAudio` putem `getResolvedModelCapabilities()`. Eksplicitni
    metapodaci registra pružatelja usluga imaju prednost, zatim statični metapodaci modela, zatim sinkronizirani
    `modalities_input`. Deklarirani popis ulaza bez `audio` je `false`; nema dokaza o
    sposobnosti ostaje `null`. I `false` i `null` aktiviraju konzervativni most,
    dok ga `true` zaobilazi.
2.  Razriješite `modalityBridgeAudio*` postavke i izdvojite spojive audio dijelove najviše razine
    iz svake poruke putem zajedničkog `detectMediaParts()` detektora. Podržani oblici žice su
    OpenAI `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni audio se
    detektira za usmjeravanje, ali ga put spajanja ne uklanja. Rad je ograničen
    `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju netaknuti.
3.  Poštujte konfigurirani `provider/model`, ili neka `selectAudioBridgeModel()` prođe kroz
    `AUDIO_TRANSCRIPTION_PROVIDERS` u stabilnom redoslijedu kataloga i odabere prvi
    model s upotrebljivim aktivnim vjerodajnicama pružatelja usluga.
4.  `callAudioTranscription()` pretvara base64/data-URI audio u multipart
    `file`, ili preuzima udaljeni `audio_url` putem javno-jedine izlazne
    zaštite s DNS pinningom i ograničenjem od 25 MB. Zatim POST-a datoteku i odabrani
    model na lokalnu `/v1/audio/transcriptions` samopetlju, autentificiranu s
    `resolveSelfLoopBearer()`. Postojeća ruta transkripcije obavlja normalno
    pretraživanje vjerodajnica, rukovanje hlađenjem/ograničenjem stope i dispečiranje pružatelja usluga.
5.  Uspješni pozivi zamjenjuju svoje dijelove s `[Audio N]: <transcript>`. Pozivi
    se izvode s `Promise.allSettled`: pojedinačni neuspjeh čuva taj izvorni
    audio dio (ugovor #4012). Ako svaki poziv ne uspije i dokazano je da cilj
    `supportsAudio === false`, dijelovi postaju
    `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
    nepoznati cilj (`null`), rezultat svih neuspjeha ostaje netaknut. Dokazani
    samo tekstualni cilj bez upotrebljivih STT vjerodajnica prima isti eksplicitni
    stub bez izdavanja mrežnog poziva.

Uspješni transkripti koriste procesno-široki Modality Bridge LRU/TTL cache.
Ključ kombinira audio referencu, stabilnu `audio-transcription` oznaku operacije
i odabrani STT model; neuspjesi se nikada ne keširaju. Audio pokušaji ažuriraju
zajedničke brojače `bridged`, `cacheHits`, `failures` i `lastUsedAt`.
Transformirani odgovori nose
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; netaknuti
zahtjevi ne primaju Audio Bridge segment.

Postavke vremena izvođenja podržane su bazom podataka i Zod-validirane:

| Ključ                         | Zadano  | Raspon          |
| :---------------------------- | :------ | :-------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Zajednički cache ostaje kontroliran putem `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najviše razine u `messages` i `Responses` API `input` prije nego što se pozove cilj bez poznate izvorne video podrške.
Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URL-ovi,
i `data:video/*;base64,...` data URI-ji. Obični nazivi datoteka u tekstu se ne tretiraju
kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom zahtjeva,
provjerom sposobnosti/pravila, agregacijom po zahtjevu i odgovorom.
Rad po videu — akvizicija, cjelokupna predmemorija rezultata, opisivanje niza sličica
(koji spaja bilo koji transkript zvuka koji je deklarirao pozivatelj), i metrike/prekid/čišćenje po pokušaju —
skriven je iza `processVideoPart` u `videoBridgePipeline.ts`, pozvan jednom po video dijelu unutar petlje `preCall`.
Taj modul također definira eksplicitne granice portova `VideoMediaBrokerPort`
(prikupljanje bajtova i izdvajanje uzorkovanih sličica), `VideoAudioTranscriptionPort`
(spajanje transkripta zvuka koji je deklarirao pozivatelj s uzorkovanim titlovima) i
`VideoDrilldownPort` (granica postojanosti detaljne analize sličica; još nije povezana
s `processVideoPart` — samo zasebna ruta `/api/modality-bridge/video/drilldown`
danas piše unose za detaljnu analizu).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva podproces. Udaljeni
videozapisi preuzimaju se s ograničenjem od 50 MiB; ugrađeni base64 videozapisi imaju
konzervativno ograničenje od 36 MiB dekodiranih po videu, tako da omotnica modela/poruka/okvira
može ostati unutar javnog ograničenja prijema JSON zahtjeva od 50 MiB. Procjene
ugrađene duljine i dekodirane veličine provjeravaju se prije alokacije. HTTPS je
obavezan na početnom udaljenom URL-u i svakom preusmjeravanju, koristeći postojeću
samo-javnu izlaznu zaštitu s DNS pinningom. Bajtovi zatim prelaze točnu internu
granicu brokera `POST /api/modality-bridge/video/extract`. Ta ruta je i
`LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvaća samo po-procesno autentificiran,
pouzdani povratni zahtjev i nikada ne prihvaća URL, putanju datoteke, izvršnu datoteku
ili popis argumenata. API cjevovod za veličinu tijela i inkrementalni čitač tijela rukovatelja
neovisno provode ograničenje unosa brokera od 50 MiB. Njegov ograničeni red
izvršava jedno izdvajanje odjednom, dopušta četiri posla na čekanju i ograničava ulaz na čekanju na
100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna dopuštena lista formata
isključuje formate popisa za reprodukciju i manifesta. Za dopuštene MOV-family
kontejnere, vanjske MOV reference podataka ostaju onemogućene prema zadanim postavkama, i
fiksna naredba ih ne uključuje. I `ffprobe` i `ffmpeg` koriste
`file`-only protokol bijelu listu, jednu nit, fiksne nizove argumenata, bez ljuske,
i izvršne datoteke riješene iz `PATH`. Priloženi tokovi naslovnih slika nisu
kandidati za reprodukciju. Svi tokovi koji se mogu reproducirati moraju zadovoljiti ograničenja, i
eksplicitni zadani tok je preferiran prije determinističkog najnižeg indeksa
povratka. Videozapisi su ograničeni na 600 sekundi, 8,192 piksela po dimenziji, i
33,554,432 izvornih piksela. FFmpeg uzorkuje 1–16 središnjih JPEG sličica, smanjuje
dužu stranu na najviše 1,024 piksela bez povećanja manjih ulaza, i
nikada ne prima URL. Uzorkovanje je `uniform` prema zadanim postavkama. Opcijske
`scene_aware` i eksperimentalne `segment_aware` politike izvode jedan dodatni
fiksni FFmpeg prolaz preko već validiranog lokalnog toka, odabiru ograničene
`showinfo` vremenske oznake scene, i deterministički se vraćaju na iste
uniformne središnje točke u slučaju kvara detektora, isteka vremena, pogrešnog izlaza, ili praznog
skupa kandidata. Način svjestan segmenta dodjeljuje središnje uzorke proporcionalno
validiranim intervalima scene; dokazi svjesni segmenta i ponašanje povratka
detaljno su opisani u nastavku. Tvrdo ograničenje od 16 sličica primjenjuje se
nakon odabira u svakoj politici. Kada zahtjev svjestan scene ima samo
proračun za jednu sličicu, koristi uniformnu središnju točku aktivnog cijelog videa ili fokusa
prozora i izvještava `policyEffective: uniform`: jedna odabrana sličica scene
ne može sačuvati oba vremenska kraja. Pozivatelj može opcionalno pružiti
konačni prozor fokusa (`start`/`end` sekunde); granice su ograničene na trajanje medija,
obrnuti ili beskonačni prozori su odbijeni, i sve politike uzorkovanja
izvode se samo unutar normaliziranog intervala. Rezultirajući
prozor je uključen u metapodatke uzorkovanja i u nepouzdani opis
prefiks tako da nizvodni modeli mogu razlikovati fokusirani izvadak od cijele
vremenske trake.

Fokus semantičkih titlova je zasebna, eksplicitna postavka. Zadani `full`
način analize čuva postojeći upit za sličice i nikada ne prosljeđuje tekst zahtjeva
modelu titlova. U `focused` načinu, most čita samo najnoviji
neprazni `text`/`input_text` koji je napisao korisnik iz istog Chat ili Responses
kontejnera, normalizira ga na NFC, sažima kontrolne znakove i razmake,
i ograničava ga na 500 Unicode kodnih točaka. Prazan rezultat vraća se na
točan `full` upit. Koristan savjet serijalizira se kao JSON u namjenskom
bloku nepouzdanog korisničkog konteksta i može samo prioritizirati vidljive detalje;
ne može nadjačati zasebno upozorenje protiv slijeđenja uputa vidljivih
ili čujnih u mediju. Tekstualni fokus nikada ne zaključuje `start`/`end` niti mijenja
vremenski uzorkivač.

#### FU-07 dokazi strukturnog segmenta

`segment_aware` koristi jedan ograničeni prolaz pre-analize preko već validiranog lokalnog video toka. Fiksni lanac filtera prvo skalira na najviše 320 piksela širine, detektira promjene scene i zamrznute intervale, zatim uzorkuje na 1 sličicu u sekundi za zamućenje, prosječnu luma i prostorne/vremenske informacije. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, isti `file`-only protokol i dopuštene liste kontejnera, ograničenje izlaza procesa od 1 MiB i najviše 30 sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvaća naredbu, filter, putanju ili URL iz zahtjeva.

Strukturne vrijednosti su deterministički dokazi uzorkovanja, a ne semantičko razumijevanje videa. One ne izvode subjekte, radnje, opise, govor ili korisničku namjeru. Granice scena i zamrzavanja tvore segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni detalji i vremenska promjena samo utječu na to kako se dodjeljuje postojeći budžet od 1 do 16 sličica. Potpuno zamrznuti segment ograničen je na jednu sličicu, dok se nezamrznuti segmenti natječu za preostali budžet. Kada granice nadmašuju broj sličica, zadržava se uniformna pokrivenost vremenske trake kako brzi rani rezovi ne bi mogli sakriti dugi završni segment. Granice scena unutar rezolucije analize od 1 sekunde granice zamrzavanja se spajaju.

Nedostajući filtri, pogrešni/prazni dokazi, pogreška detektora ili ograničeno vremensko ograničenje pre-analize otvaraju se prema točnoj uniformnoj politici središnje točke. Prekid pozivatelja ili rok posrednika ne otvara se: on prekida podproces u tijeku, sprječava kasnije izdvajanje sličica, a privatno privremeno stablo uklanja se u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg fiksature za uštede poziva opisa nakon deduplikacije, dodjelu budžeta za gusti pokret, dokaze o zamućenju/ekspoziciji/SI-TI, brze rezove s dugim repom i lažne pozitive postupnog blijeđenja. Bilježi vrijeme zida pre-analize i, gdje je dostupan `/usr/bin/time`, CPU podređenog procesa i vršni RSS. Njegove provjere kvalitete su samo strukturni orakli. Kvaliteta stvarnog modela opisa ostaje `HOLD` jer ovaj sustav nema ovlaštenu krajnju točku ili zamrznutog suca. Novčane uštede također ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne pruži eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne izmišlja nijedan rezultat.

Svaka sličica je ograničena na 4 MiB, sve sirove sličice zajedno na 23 MiB, a serijalizirani odgovor posrednika na 32 MiB. Privatni privremeni direktorij uklanja se u `finally`. OmniRoute ne uključuje FFmpeg i ne prihvaća prilagođenu putanju izvršne datoteke. Prije opisivanja, most primjenjuje konzervativni vizualni prolaz deduplikacije: svaki JPEG se smanjuje na 16×16 sivih tonova i uspoređuje se samo s posljednjom zadržanom sličicom. Za zatraženi budžet opisa iznad jedne sličice, izdvajanje pruža ograničeni skup kandidata do dvostruko većeg budžeta i nikada više od 16 sličica. Zatraženo ograničenje primjenjuje se tek nakon deduplikacije, pri čemu se prvi i posljednji odabrani kandidati čuvaju tijekom konačnog prorjeđivanja kada je budžet najmanje dva. Verzionirana politika `grayscale-16x16-mean-cells-v2` koristi veću vrijednost između prosječne delta luma i omjera ćelija minijatura čija je normalizirana delta najmanje 0.05. Prag duplikata je konstanta 0.04, odabrana zbog predvidljivosti, a ne kao postavka za vrijeme izvođenja. Ovaj sekundarni signal visokog kontrasta čuva male pokrete i promjene vidljivog teksta koje usporedba samo po prosjeku može sakriti. Pogreške komparatora ili dekodera otvaraju se i zadržavaju pokrivenost. Izlazni metapodaci odvajaju izdvojene kandidate, uspješno korištene sličice i odbačene vizualne duplikate.

Eksplicitno označeni dio videa može zatražiti kontaktni list s vremenskim oznakama. Most gradi najviše JPEG mrežu od 4 stupca i 16 sličica. Svaka ćelija od 512 piksela urezuje svoju izvornu vremensku oznaku u donju traku visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima za daljnje povezivanje i reviziju. Cijeli JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG sličice; prekid klijenta i dalje se širi kroz operaciju lista.

Dokazi o promociji namjerno su odvojeni od sintetičkog mikrobenchmarka kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B sustav s verzijom sheme za stvarne vizualne modele kompatibilne s OpenAI-jem. Mjeri tokene koje je prijavio pružatelj, ukupnu latenciju zida (uključujući kompoziciju lista), broj poziva modela i zadržavanje činjenica definiranih manifestom. Sirovi odgovori modela ne zapisuju se u izvješće; zadržavaju se samo SHA-256 sažeci i podudarni ID-ovi činjenica. Sustav ne obavlja mrežne ili plaćene pozive modela osim ako se ne proslijedi `--execute-real` i konfiguriraju `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog eksplicitnog stvarnog pokretanja, njegova strojno čitljiva presuda ostaje `HOLD`; samo sintetička mjerenja korisnog tereta/broja poziva nisu dokaz promocije.

Pozivatelji mogu priložiti opcionalni `transcript.cues` niz podržanom dijelu videa kada već posjeduju poravnati tekst. Svaki znak mora sadržavati `text`, konačni `start`/`end` interval unutar ispitane duljine, i dopušteni `source` (`client`, `embedded`, ili `audio-bridge`); `confidence` zadano je `1` i mora ostati između `0` i `1`. Točni duplikati znakova se sažimaju. OmniRoute nikada ne započinje transkripciju iz ovih metapodataka: validirani znakovi kopiraju se u opisani rezultat s izvorom, pouzdanošću i intervalom, te se prikazuju kao nepouzdana opažanja uz opise sličica. Nevažeći tekst, tekst izvan raspona ili tekst bez izvora se odbacuje umjesto da se miješa u tok opisa. Polje `source` trenutno deklarira pozivatelj, a ne provjerava poslužitelj: OmniRoute osigurava da je vrijednost jedan od tri dopuštena niza, ali još ne potvrđuje kriptografski da je oznaka `embedded` ili `audio-bridge` doista došla iz ekstrakcije u vlasništvu poslužitelja. Tretirajte `source` kao nepouzdani savjet dok se ta provjera ne implementira; ne gradite odluke o autorizaciji na temelju toga.

Napredni pozivatelj može pružiti već autoriziranu `audioTranscript` stazu za isti video. Spojna točka spaja vizualna i audio opažanja pod jednim rokom i signalom za prekid, raspoređuje ih na zajedničkoj vremenskoj liniji, spaja točne duplikate i izvještava o djelomičnom rezultatu kada samo jedna strana uspije. Nevaljana `audioTranscript` degradira na taj djelomični rezultat — vizualni opis se zadržava, a audio grana bilježi pročišćeni kod pogreške — umjesto da cijeli video propadne. Dostupnost po grani, zastavica djelomičnosti i pročišćeni kodovi pogrešaka čuvaju se u opisanom rezultatu, u metapodacima zaštitne ograde (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), u metapodacima predmemorije rezultata i u brojačima spajanja mosta. Zadani put Video Bridgea ne poziva pretvaranje govora u tekst niti preuzima drugu kopiju medija; bez te eksplicitne staze, ostaje samo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se automatski primjenjuje kad god Video Bridge (koji je sam po sebi opt-in) prikaže znak transkripta — ne postoji zasebna zastavica za zadržavanje. Kada zahtjev prikaže bilo koji znak transkripta (pozivateljem deklarirani `transcript` ili spojeni `audioTranscript`), zaštitna ograda ga označava kao `videoBridgeObserved` i proizvodi redigiranu sjenu video opisa — identičan prikaz u kojem je slobodni tekstualni sadržaj svakog znaka zamijenjen s `[redacted-video-transcript]`, izgrađen zamjenom strukturiranog polja znaka prije sastavljanja niza (nikada parsiranjem spljoštenog teksta, tako da nikakav sadržaj znaka — neprijateljski ili običan, uključujući sadržaje koji sadrže `]` poput `[inaudible]`/`[music]` — ne može preživjeti). Tijelo zahtjeva u trajnom zapisu poziva zamjenjuje svaki tekstualni dio izveden iz videa tom redigiranom sjenom, podudarnom po jednakosti sadržaja; `fullText` sidro se ponovno čita iz dovršenog payload-a zaštitne ograde prije poziva, tako da se podudaranje i dalje uspješno odvija nakon što kasnije zaštitne ograde u lancu (maskeri PII-ja i vjerodajnica, prioriteti 10/95) prepišu tekst opisa na mjestu i nakon što injekcija sistemskog upita/predaje/memorije preoblikuje niz poruka. Tijelo poslano uzvodno modelu ostaje nepromijenjeno. Promatrani zahtjev također ne popunjava trajnu memoriju (preskače se ekstrakcija izvedena i iz zahtjeva i iz odgovora), tako da vlastiti odgovor modela ne može ponoviti tekst transkripta u memoriju.

Dodatne zadržane kopije koriste isti signal promatranog zahtjeva. Sirova snimka klijentskog zahtjeva prije zaštitne ograde, zahtjev u memoriji na čekanju i rani zapis odbijenog zahtjeva strukturno zamjenjuju polja transkripta u video dijelovima; string upiti sintetizirani fazama cjevovoda i predajom konteksta redigiraju se na odredištu trajnog tijela zahtjeva. Trajni marker `video_content_removed` uzrokuje da se nastavak `previous_response_id` zatvori s greškom umjesto da rekonstruira tekst koji je namjerno odbačen. Ako promatrani zahtjev izgubi svoju sjenu redakcije po dijelovima prije bilježenja, ili čak jedna od nekoliko video sjena ne uspije se podudariti nakon kasnijih mutacija zahtjeva, zadržano tijelo zahtjeva se u potpunosti izostavlja umjesto zadržavanja djelomično redigiranog transkripta.

Za promatrani zahtjev, odgovor modela može citirati bilo koji dio transkripta bez granice strukturiranog znaka. Njegov trajni `responseBody` u zapisu poziva stoga je zamijenjen markerom izostavljanja; detaljni artefakt cjevovoda (koji može uključivati uzvodna/klijentska tijela i dijelove streama) se ne zadržava. Semantičke, idempotencijske i predmemorije za ponavljanje zaključivanja zaobilaze čitanja i pisanja za taj zahtjev. Zahtjev pružatelja i klijentu vidljiv odgovor ostaju nepromijenjeni. Rani keepalive bajtovi se ispuštaju iz privremenog međuspremnika kada se detaljni artefakt izostavi. Kirovo upozorenje o pogrešno formatiranom EventStreamu izvještava samo o broju bajtova payload-a, nikada o njegovom sadržaju ili sirovoj pogrešci JSON parsera. Ovo ne tvrdi da je svaka nepovezana dijagnostika pružatelja/dodatka revidirana; šire čišćenje zadržanih odredišta prati se u #11658.

Interni životni ciklus `/api/modality-bridge/video/drilldown` je zaseban, povratni/token-autenticirani supstrat predmemorije. Svaka operacija također zahtijeva kanonski neprozirni ID principala. Prije nego što se omogući pozivatelj u produkciji, mora izvesti taj ID iz autenticiranog najmoprimca i nikada ne smije proslijediti vrijednost koju je odabrao klijent. Ključevi predmemorije povezuju tog principala s kanonskim ID-ovima sesije i video-reference, pohranjuju samo njihove SHA-256 izvedene ključeve i ograničavaju i čitanja i brisanja na istog principala. Predmemorija pohranjuje najviše 16 izvedenih JPEG okvira po unosu, istječe ih nakon deset minuta i podržava ograničena `start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal je ograničen na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta ograničenja su neovisna o globalnom ograničenju od 64 unosa/256 MiB: pritisak kvote principala izbacuje samo najmanje nedavno korištene unose tog principala prije nego što se razmotri globalno LRU izbacivanje. Istekli unosi se uklanjaju iz računovodstva principala i globalnog računovodstva pri aktivnosti predmemorije, dok otkazivanje i neuspjeh validacije ne obvezuju djelomičnu zamjenu.

Predmemorija odbija nekanonski Base64, višak punjenja, medije koji nisu JPEG, pogrešno formatirane ili skraćene JPEG-ove, te JPEG-ove koji proizvode upozorenje tijekom ograničenog `sharp` dekodiranja cijele slike. Svaku prihvaćenu sliku ponovno kodira kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivatelja, i odbacuje sve zaostale poliglotske bajtove umjesto da ih zadržava. Samo ograničeni kanonski komprimirani međuspremnik tereti se na obje kvote. JSON žičano ograničenje uključuje Base64 režiju za gornju granicu od 32 MiB dekodiranog ulaza. Svaka pohranjena derivacija bilježi svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju derivacije, vrijeme stvaranja, hash sadržaja izračunat na poslužitelju i hashiranu referencu roditelja plus hash sadržaja roditelja pouzdanog pozivatelja. Otkazivanje se provjerava između asinkronih faza dekodiranja/hashiranja prije atomskog predmemorijskog commita.

Ova tranša još ne povezuje produkcijski producent s rutom i ne pruža odabir varijanti s više rezolucija. Transparentni put zahtjeva Video Bridge stoga ne stvara dodatni posao, dok izvođenje principala vezanog uz najmoprimca i potpuni FU-08 životni ciklus s više rezolucija ostaju eksplicitan naknadni rad, a ne dokumentirano kao potpuno ponašanje.

Okviri se sekvencijalno opisuju konfiguriranim Video modelom. Prazno Video premošćivanje nasljeđuje postavku Vision; ako su oba prazna, Vision automatski usmjerivač odabire učinkovit model sposoban za viziju. Uspješni opisi zamjenjuju izvorni dio stabilnim prefiksom `[Video description:` koji također označava tekst kao nepouzdano opažanje izvedeno iz medija i govori nizvodnim modelima da ne slijede upute pronađene u mediju. Ključevi predmemorije opisa okvira uključuju JPEG bajtove, upit, vremensku oznaku i učinkovit model; samo se uspješni opisi spremaju u predmemoriju. Unosi u predmemoriju zadržavaju stvarni uspješni model producenta, uključujući rezervni model; most izvještava `mixed` kada su različite okvire proizveli različiti modeli. Pogodak u predmemoriji ponovno koristi taj identitet producenta umjesto da ga preoznači kao traženi plan usmjeravanja. Predmemorija rezultata cijelog videa ključana je na temelju svakog unosa koji mijenja izlaz — upit, učinkovit model, politika uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak normaliziranog savjeta za fokus, prozor fokusa, `transcript`, `audioTranscript` i zastavica kontaktne tablice — tako da promjena bilo koje od tih dimenzija rezultira promašajem predmemorije, nikada zastarjelim ponovnim korištenjem. Verzija politike vizualnog dedupliciranja, prag i ograničeni broj kandidatskih okvira također su eksplicitni u ključu predmemorije rezultata i metapodacima; promjena politike stoga ne može ponovno koristiti zastarjeli opis cijelog videa. Metapodaci predmemorije rezultata v4 zadržavaju način rada i otisak, nikada sirovi korisnički zadatak. Metapodaci zaštitne ograde izvještavaju i tražene i učinkovite načine analize; traženi `focused` način bez upotrebljivog korisničkog teksta izvještava se kao učinkovito `full`.

Zaštitna ograda izdvaja svaki podržani video dio, ali opisuje najviše `modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima `supportsVideo === false`, neuspjeli i prekoračeni videozapisi postaju eksplicitne sigurne tekstualne oznake tako da nijedan sirovi video ne preživi. Kada je mogućnost nepoznata, ti dijelovi ostaju netaknuti. Ciljevi s `supportsVideo === true` zaobilaze most. Signal za prekid klijentskog zahtjeva širi se kroz preuzimanje, brokerski red, podprocese i pozive za opis; prekidi se zaustavljaju između videozapisa i nikada ne otvaraju sirove medije.

Postavke vremena izvođenja su podržane bazom podataka i Zod-validirane:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                  |
| :---------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobavezno vrijeme izvođenja, opt-in                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničeni, nepouzdani kontekst najnovijeg korisnika |
| `modalityBridgeVideoModel`          | `""`        | Nasljeđuje Vision Bridge model                                                                      |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; kvar detektora vraća se na `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                      |

Naslijeđene trajne vrijednosti Video timeouta iznad 120 sekundi ograničene su na rok brokera; novi zapisi postavki iznad tog ograničenja se odbijaju. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu lokalnost povratne petlje s vremenskom oznakom prije autentifikacije ili provjere vremena izvođenja, a zatim zahtijeva upravljačku autentifikaciju. Vraća samo `available`, sanirane FFmpeg/ffprobe verzije i fiksni razlog kada vrijeme izvođenja nije dostupno. Interna krajnja točka za ekstrakciju nije javni API za prijenos: zasićenje reda vraća `503` plus `Retry-After`, prekid veze pozivatelja vraća `499`, a fiksni rok brokera vraća `504`. Konvertirani odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` u središnji `x-omniroute-modality-bridge` zaglavlje bez uklanjanja Vision ili Audio segmenata.

### PII Masker (`piiMasker.ts`)

Radi na **objema** fazama.

- **`preCall`** klonira payload, prolazi kroz `system`, `messages`, `input` i `prompt` (uključujući obične string stavke) i primjenjuje `processPII()` (iz `@/shared/utils/inputSanitizer`) na string `content`/`text` polja. Kada je `PII_REDACTION_ENABLED=true`, otkriveni PII se redigira u odlaznom payloadu. To je neovisno o `INPUT_SANITIZER_MODE` (koji kontrolira samo politiku prompt-injekcije). Kada je redakcija isključena, poziv bilježi broj otkrivanja bez prepisivanja sadržaja.
- **`postCall`** duboko klonira odgovor, pokreće `sanitizePIIResponse()` plus masker oblika Responses-API-ja (`maskResponsesOutput` — pokriva `output_text` i `output[].content[].text`). Ako dođe do bilo kakve redakcije, modificirani odgovor zamjenjuje izvorni.

Zaštitna ograda nikada ne blokira; ona samo bilježi (`meta.detections`, `meta.redacted`) ili prepisuje.

### Prompt Injection (`promptInjection.ts`)

Otkriva neprijateljske strukture u korisnički dostavljenom sadržaju i provodi konfiguriranu politiku. Ponašanje je vođeno varijablama okoline i opcijama konstruktora:

| Postavka        | Env var                                                                                               | Zadano | Učinak                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitna ograda se kratko spaja.                                                                                                                                                                          |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Politika ubrizgavanja: `block`, `warn` ili `log`. (`redact` je prihvaćen radi kompatibilnosti unatrag, ali **ne** uklanja tekst ubrizgavanja; zahtjev za prepisivanje PII-ja kontrolira se putem `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna ozbiljnost potrebna za blokiranje. Srednja je po zadanim postavkama samo za promatranje.                                                                                                                         |

**Prioritet načina rada** (`getMode`): pozivatelj `options.mode` →
`INJECTION_GUARD_MODE` **Premošćivanje značajke zastavice baze podataka** (Nadzorna ploča → Postavke →
Zastavice značajki) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Premošćivanje s nadzorne ploče stoga ima prednost nad varijablama okruženja, tako da korisničko sučelje zastavica značajki kontrolira pokrenutu zaštitu uživo (bez ponovnog pokretanja). Čitanje iz baze podataka je otporno na pogreške: ako dođe do pogreške, zaštita se vraća na ponašanje temeljeno na varijablama okruženja, a kada nije postavljeno premošćivanje, ponašanje je identično rješenju samo na temelju varijabli okruženja.

Izvori detekcije:

1.  `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora koji se koristi drugdje u cjevovodu).
2.  Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
    `markdown_system_block`, oba `high` ozbiljnosti).
3.  Neobavezni `customPatterns` proslijeđeni putem opcija konstruktora (stringovi, regex ili
    `{ name, pattern, severity }` zapisi).

Kada je `mode === "block"` **i** barem jedna detekcija zadovoljava prag
ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U `warn`/`log` načinima rada zaštitna ograda bilježi, ali
dopušta poziv. Zajednička pomoćna funkcija `evaluatePromptInjection()` također se izvozi
za pozivatelje koji trebaju procijeniti upite bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor pregledava samo **prvih 16 KB**
spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja
petlje uzoraka. Direktive za ubrizgavanje nalaze se blizu vrha unosa, tako da ovo
ograničava CPU/GC regexa na teretima od više stotina KB bez slabljenja detekcije (usp.
#3932, #4041).

### Masker vjerodajnica (`credentialMasker.ts`)

Pokreće se u **obje** faze, posljednji u zadanom lancu (prioritet `95`). Redigira
poznate uzorke API ključeva / tajnih tokena iz odlaznog tereta (sadržaj poruke,
argumenti poziva alata, rezultati alata) **i** odgovora pružatelja, tako da
vjerodajnica zalijepljena u upit (ili vraćena kao rezultat alata) ne procuri
uzvodnom pružatelju ili natrag klijentu.

- **Samo uz pristanak**, ista konvencija kao i redakcija PII-ja (Tvrdo pravilo #20-susjedno):
  onemogućeno osim ako `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključena, zaštitna ograda je no-op —
  nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` prolazi cijelo stablo tereta/odgovora (`walkValue()`,
  sigurno od zagađenja prototipa, sigurno od ciklusa putem `WeakSet`) i zamjenjuje
  podudarnosti s `[REDACTED:<type>]` zamjenskim znakom, klonirajući samo grane koje su
  se stvarno promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve pružatelja LLM-a (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve plaćanja (Stripe, Square),
  ključeve oblaka (AWS access key, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove,
  nizove za povezivanje koji sadrže vjerodajnice (`mongodb://user:pass@...`, itd.), i
  generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`, `apikey`)
  redigiraju se strukturno (samo vrijednost, prefiks sheme poput `Bearer `/`Basic `
  je sačuvan) umjesto putem generičkog tekstualnog regexa.
- Zaštitna ograda nikada ne blokira; ona samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i bilježi (`meta.credentialsRedacted`, `meta.count`).

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

Zaštitna ograda signalizira "bez promjene" vraćanjem `void`, `{}`, ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja prolazi kroz lanac za nizvodne zaštitne ograde.
`signal?: AbortSignal` prenosi životni ciklus pozivatelja u zaštitne ograde. Prekid zahtjeva je namjerna iznimka otvorenog kvara: medijski mostovi zaustavljaju rad i čišćenje bez vraćanja sirovih medija na cilj za koji se zna da ih ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje normaliziranim imenom) zaštitnu ogradu i
  ponovno sortira po uzlaznom `priority`.
- `clear()` / `list()` — administrativni pomoćnici.
- `runPreCallHooks(payload, context)` — iterira aktivne zaštitne ograde, provlači
  payload kroz `modifiedPayload` i zaustavlja se na prvom `block: true`.
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
- Tijelo zahtjeva `disabledGuardrails` (najviša razina)
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

1. `resolveDisabledGuardrails(...)` gradi popis za preskakanje iz API ključa, tijela
   i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne ograde uzlaznim
   redoslijedom prioriteta:
   - Onemogućene zaštitne ograde bilježe se kao `skipped`.
   - `preCall` svake zaštitne ograde može prepisati teret putem `modifiedPayload`.
   - Prvi `block: true` kratko spaja lanac i rukovatelj vraća
     odgovor o odbijanju zaštitne ograde.
3. (Potencijalno prepisan) teret teče u kombinirano usmjeravanje i uzvodnu
   dispečersku službu.
4. Nakon što je odgovor sastavljen, `guardrailRegistry.runPostCallHooks(...)`
   pokreće isti lanac na odgovoru. `block: true` ovdje odbacuje uzvodni
   odgovor.

Zaštitne ograde koje bacaju iznimku bilježe se s `error: <message>` i bilježe putem
`logger.warn`, ali lanac se nastavlja — dizajnirano je da se otvara u slučaju kvara.

## Konfiguracija

Varijable okoline koje čitaju ugrađene zaštitne ograde:

| Varijabla                             | Koristi se od strane    | Učinak                                                                                                                           |
| :------------------------------------ | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Postavite `false` da biste u potpunosti onemogućili detekciju.                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Politika ubrizgavanja: `warn`, `block` ili `log`. Zastarjela vrijednost `redact` ne prepisuje tekst ubrizgavanja.                |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Način rada za zaštitu od ubrizgavanja; također zastavica značajke baze podataka koja **nadjačava** varijable okoline (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                                              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Zastarjeli alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                           |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kada je `true`, PII zahtjeva se redigira (neovisno o načinu ubrizgavanja).                                                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno) | Kontrolira ponašanje maskera na strani odgovora.                                                                                 |

Zaštitne ograde Modality Bridgea čitaju konfiguraciju vremena izvođenja iz pohrane postavki podržane bazom podataka
(`getSettings()`), a ne iz varijabli okoline. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Zastarjeli
`visionBridge*` ključevi prihvaćaju se samo kao dokumentirani jednociklični
povratni mehanizam čitanja; pisanja na nadzornoj ploči koriste primarne ključeve. Zadane vrijednosti i povratni
mehanizam rješavanja nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`, s
zastarjelim konstantama zadržanim u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, plus zajedničke
`modalityBridgeCache*` postavke. Audio nema povratni mehanizam za zastarjele ključeve jer su ti
ključevi uvedeni sa shemom Modality Bridgea.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, plus zajedničke `modalityBridgeCache*` postavke.
Onemogućen je prema zadanim postavkama jer su FFmpeg/ffprobe opcionalne operativne
ovisnosti, a titlovanje okvira dodaje kašnjenje i troškove modela.

## Prilagođene zaštitne ograde

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Dnevni budžet prekoračen" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Koraci:

1. Stvorite `src/lib/guardrails/myGuardrail.ts` proširujući `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Registrirajte se prilikom uvoza (push iz `registerDefaultGuardrails`) ili
   pozovite `guardrailRegistry.register(...)` tijekom izvođenja — registar zamjenjuje
   bilo koju prethodnu zaštitnu ogradu s istim normaliziranim imenom.
4. Dodajte testove pod `tests/unit/` (postojeći primjeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova za početak iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` za početak s praznim registrom i
registrirajte samo zaštitne ograde koje se testiraju. Vision Bridge prihvaća ubrizgavanje ovisnosti
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže ekvivalentne šavove za postavke, mogućnosti, odabir STT modela, provjere vjerodajnica i transkripciju. Testovi stoga mogu vježbati oba toka bez pristupa bazi podataka ili mreži.

## Vidi također

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — zajednički detektor koji pokreće
  ubrizgavanje upita i maskiranje PII
- `src/shared/constants/visionBridgeDefaults.ts` — zadane postavke Vision Bridgea i
  popis modela prisilnog premošćivanja
- `src/shared/constants/modalityBridgeDefaults.ts` — zajedničke zadane postavke Vision/Audio runtimea
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (prekidač, hlađenja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca varijabli okoline

## Pokrivenost rute zaštite od ubrizgavanja i crveni tim (Faza 8 · Blok D)

Zaštita od ubrizgavanja (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute
koje prihvaćaju korisničke upite. Poštuje `INJECTION_GUARD_MODE` (zadano `warn` = samo zapisivanje;
`block` = vraća HTTP 400 `SECURITY_001`).

| Vrsta             | Rute                                                                                                                                                 | Zadani način rada |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Tekst (postojeći) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn              |
| Generativni       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn              |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn              |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Crveni tim (noćni, `nightly-llm-security.yml`):** promptfoo provjerava da svaka ruta blokira
OWASP-LLM korpus u `INJECTION_GUARD_MODE=block`; garak pokreće sonde (preskače bez tajne).
`moderations` je uključen radi dosljednosti — operatori u blok-načinu mogu ga izuzeti putem
`resolveDisabledGuardrails`.

Noćni tijek rada (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokiranje)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Svaki adversarijalni slučaj (npr. "zanemari sve
  prethodne upute…", jailbreakovi u DAN stilu) potvrđuje da odgovor nosi
  `error.code === "SECURITY_001"`, tj. da je zaštita stvarno odbila zahtjev.
- **`garak` (savjetodavno)** — pokreće garak `--probes promptinject,dan,leakreplay`
  protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Ograničeno tajnom
  davatelja (`PROMPTFOO_PROVIDER_KEY`); graciozno preskače i ima sufiks
  `|| true`, tako da izvještava bez neuspjeha CI-ja.

Pokrivenost pomoćne funkcije zaštite (`createInjectionGuard` / `withInjectionGuard`)
obuhvaća svaku `/v1` rutu koja nosi upit; tekst upita se izvlači iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
