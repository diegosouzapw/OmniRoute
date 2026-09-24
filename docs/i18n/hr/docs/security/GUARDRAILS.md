# Guardrails (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Posljednje ažuriranje:** 2026-08-29 — v3.8.51 (podrijetlo transkripta za Video Bridge deklarira pozivatelj,
> poslužitelj ga još ne provjerava — pojašnjeno prema #11661)

Zaštitne ograde provode sigurnosna pravila, pravila korištenja i transformacije sadržaja na granici
između OmniRoutea i nadređenih pružatelja usluga. Svaka zaštitna ograda može pregledati (i
po potrebi odbiti, transformirati ili označiti) sadržaje zahtjeva (`preCall`) i
odgovore nadređenih pružatelja (`postCall`).

Sustav je **fail-open**: ako zaštitna ograda tijekom izvršavanja izazove iznimku, registar
bilježi pogrešku i nastavlja sa sljedećom zaštitnom ogradom umjesto prekidanja
zahtjeva. Blokiranje je izričita odluka (`block: true`), nikada slučajnost.

## Ugrađene zaštitne ograde

Registar pri uvozu automatski učitava šest zaštitnih ograda prema redoslijedu prioriteta
(pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza/faze      | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niži brojevi prioriteta izvršavaju se **prvi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Presreće zahtjeve koji sadrže slike i usmjereni su prema **modelima bez podrške za vid** te
ili preusmjerava cijeli zahtjev na model s podrškom za vid ili prije
poziva nadređenog pružatelja zamjenjuje slikovne dijelove tekstualnim opisima koje je izradio
podesivi model za vid. Time se pružateljima koji podržavaju samo tekst omogućuje transparentna obrada
multimodalnih sadržaja.

Tijek:

1. Preskoči ako ciljni model već podržava vid (osim ako se nalazi na
   popisu modela za koje je most prisilan `isVisionBridgeForcedModel`).
2. Izdvoji slikovne dijelove putem `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji obradu delegira **objedinjenom detektoru
   medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinstvenom
   izvoru istine koji se dijeli s filtrom kompatibilnosti kombinacija.
   Izdvajanje je ograničeno popisom dopuštenih vršnih dijelova oblika
   koje `replaceImageParts` može ponovno umetnuti (ugovor izdvajanje↔zamjena): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` i Responses API `input_image`. Ugniježđena podudaranja i
   oblici koji služe samo kao indikatori namijenjeni su filtru kombinacija i nikada se ne izdvajaju.
   Preskoči ako ništa nije pronađeno.
3. Odredi konfiguraciju za vrijeme izvođenja putem `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki `modalityBridge*`
   imaju prednost; naslijeđeni ključevi `visionBridge*` ostaju kao **rezervna opcija tijekom jednog
   ciklusa** (razdoblje za povratak na prethodnu verziju). Preskoči prije bilo kakvog prolaska kroz medije kada je
   most onemogućen.
4. Odabir načina rada (`modalityBridgeVisionMode`, pogledajte tablicu u nastavku) određuje
   preusmjeravanje ili opisivanje. Preusmjeravanje vraća `modifiedPayload` u kojem je zamijenjen samo
   `model`, uz metapodatke `{ rerouted, fromModel, toModel, imagesKept }`.
5. Put opisivanja: ograniči broj slika na `maxImages`, sastavi upit prilagođen zadatku,
   provjeri predmemoriju opisa, pozovi model za vid **paralelno**
   (`Promise.allSettled`) i umetni tekstualne dijelove `[Image N]: <description>` na
   njihovo mjesto. Neuspjelo opisivanje daje `null`, a izvorni slikovni dio ostaje
   **sačuvan** (#4012) — osim na putu opisivanja kombinacija kada su svi
   pokušaji opisivanja neuspješni; tada potvrđena nadređena usluga bez podrške za vid umjesto toga dobiva zamjenski tekst
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrati `modifiedPayload` + metapodatke (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Odabir načina rada (`modalityBridgeVisionMode`)

| Način rada | Zadano | Ponašanje                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | Naslijeđena heuristika, neizmijenjena (#6640/#7204): modeli koji nisu kombinirani ili su `auto/` preusmjeravaju se na najbolji model za vid, osim ako izvorni model već ima upotrebljive vjerodajnice (tada se opisuje); kombinirani ciljevi uvijek se opisuju.                                                                                  |
| `describe` |        | Uvijek opisuj — blok za preusmjeravanje potpuno se preskače; model koji je korisnik odabrao uvijek odgovara.                                                                                                                                                                                                                                     |
| `reroute`  |        | Prisilno preusmjeravanje: zaobilazi se zaštita koja zadržava model s vjerodajnicama. Zaštita vjerodajnica **cilja** preusmjeravanja i dalje se primjenjuje — kada ne postoji upotrebljiv ciljni model za vid, zahtjev prelazi na opisivanje kako neobrađene slike nikada ne bi dospjele do pozadinskog sustava koji podržava samo tekst (#8430). |

Prisilni načini rada prekidaju obradu **prije** pokretanja automatske heuristike; ponašanje načina `auto`
identično je, bajt po bajt, zaštitnoj ogradi prije PR-1.

#### Upit za opisivanje prilagođen zadatku (`modalityBridgeVisionTaskAware`)

Zadano je **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) osnovnom
upitu za opisivanje dodaje tekst **posljednje korisničke poruke** (skraćen na 500 znakova),
usmjeravajući opis prema onome što je korisnik doista zatražio
(obrazac codex-vision-proxy) i tražeći od modela za vid da transkribira vidljivi
tekst. Kada je zastavica isključena — ili nema korisničkog teksta — osnovni se upit upotrebljava neizmijenjen.

Vlastiti OpenAI-kompatibilni zahtjev samopetlje za opisivanje (`callVisionModelSingle()`
u `visionBridgeHelpers.ts`) uvijek zahtijeva `image_url.detail: "high"` —
bezuvjetno, za svakog pozivatelja/pružatelja usluge i neovisno o bilo kojem signalu klijenta.
Uzorkovanje s niskom razinom detalja smanjuje točnost OCR-a upravo za zadatak
transkripcije teksta koji ovaj upit zahtijeva, stoga sam poziv za opisivanje uvijek
zahtijeva visoku razinu detalja, neovisno o razini detalja korištenoj u izvornom
dolaznom zahtjevu. To utječe samo na interno tijelo zahtjeva za opisivanje; ne mijenja
način na koji OmniRoute prosljeđuje pozivateljevu vlastitu vrijednost `image_url.detail`
u primarnom zahtjevu — ta se zadana vrijednost primjenjuje zasebno i samo za
prepoznate OpenCode klijente, u `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Grana samopetlje za opisivanje u
Anthropicovu žičanom formatu nema polje `detail` i na nju ne utječe nijedna od tih
zadanih vrijednosti.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vrati
`callVisionModel()` prosljeđuje se bez izmjena, čime se zadržava postojeće
ponašanje. Svaka vrijednost u rasponu 100–50000 skraćuje opis dodavanjem
sufiksa `…` prije nego što se ponovno umetne kao `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovu vrijednost za OCR zadatke s mnogo detalja, u kojima je nizvodnom
modelu potrebna potpuna transkripcija; smanjite je kako biste ograničili potrošnju
tokena kod opširnih modela za obradu slike. Polje na nadzornoj ploči nalazi se na
ploči Advanced kartice Vision
(`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i svaku
vrijednost između 1 i 99 podiže na minimalnih 100, dok eksplicitnu vrijednost
`0` ostavlja netaknutom — `0` je samostalno valjana Zod vrijednost
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
zadana vrijednost koja označava da postavka nije postavljena.

#### Predmemorija opisa (`modalityBridge/bridgeCache.ts`)

LRU + TTL predmemorija u memoriji za izlaze opisa, zajednička cijelom procesu.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
uokvirivanjem prefiksom duljine (bez kolizija granica polja). Komponenta modela
jest **konfigurirani** model mosta, a ne model koji je stvarno odgovorio —
`callVisionModel` može interno prijeći na rezervni model, a izrada ključa za
svaki pokušaj fragmentirala bi predmemoriju. Neuspjeli opisi nikad se ne
predmemoriraju. Postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljenih slika (dohvaćanje za samopetlju opisa/base64)

Kada most sam dohvaća **udaljenu** sliku — za Anthropicov samopoziv za
opisivanje i pretvorbu u base64 za claude-wire-format
(`ensureBase64ImagesForClaudeWire`), u oba slučaja putem
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — dobiveni podatkovni
URI prosljeđuje se kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prije ugrađivanja u zahtjev za model za
obradu slike. Prevelike slike smanjuju se na **2048px po duljoj stranici**
(što odgovara ograničenju promjene veličine koje OpenAI/Anthropic već
primjenjuju na strani poslužitelja), čime se smanjuju količina prenesenih
podataka i latencija bez promjene onoga što model za obradu slike vidi. Za
promjenu veličine upotrebljava se `sharp`, učitan dinamičkim uvozom: na
platformi na kojoj se njegova nativna binarna datoteka ne uspije učitati,
`normalizeDataUri()` **nikad ne baca iznimku** — vraća se na neizmijenjeno
prosljeđivanje izvornih bajtova, tako da put za opisivanje/pretvorbu u base64
uvijek nastavlja raditi. Bajtovi koji nisu slika (dohvaćanje koje nije vratilo
sliku koju je moguće dekodirati) također se prosljeđuju neizmijenjeni. Ta je
normalizacija ograničena na slike koje most dohvaća za vlastiti samopoziv —
nikad se ne primjenjuje na neobrađeni teret pozivatelja koji se izravno
prosljeđuje, u skladu s načelom izmjena samo uz pristanak (strogo pravilo
#20).

#### Shema postavki + migracija

Novi ključevi `modalityBridge*` provjeravaju se Zodom u
`updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojka `modalityBridgeCache*` i grupa
`modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće zastarjele vrijednosti
`visionBridge*` u odgovarajuće nove ključeve (idempotentno i bez prepisivanja
vrijednosti `modalityBridge*` koju je postavio operator); zastarjeli se
ključevi još jedan ciklus izdanja prihvaćaju kao pričuvni izvor za čitanje.

#### Zaglavlje transparentnosti + statistika

Odgovori transformirani opisivanjem sadrže
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izrađuje ga `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`,
a postavlja `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`).
Preusmjereni zahtjevi **nemaju** zaglavlje — teret nije izmijenjen, a zamjena
modela već je vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (autentikacija za upravljanje, ista razina kao
za `GET /api/settings`) vraća brojače po modalitetu koji se čuvaju u memoriji:
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i
`video`. `averageLatencyMs` kao nazivnik koristi `latencySamples`, a ne sve
pokušaje; operacija bez mjerenja vremena ne stvara izmišljeni uzorak od nula
milisekundi. `bridged` ostaje unatrag kompatibilan pseudonim za uspješne
pretvorbe; neuspjeli pokušaji ne povećavaju njegovu vrijednost.
Brojači se namjerno poništavaju pri ponovnom pokretanju procesa
(telemetrija, a ne obračun).

#### Konfiguracija nadzorne ploče

Namjenska stranica nadzorne ploče nalazi se na
`/dashboard/settings/modality-bridge`. Njezine kartice `Vision`, `Audio` i
`Video`, kojima se može pristupiti putem URL-a, zadržavaju parametre upita pri promjeni
vrijednosti `tab`. Kartica Vision omogućuje uključivanje, odabir načina rada i modela
(uključujući automatsku zadanu vrijednost), upite prilagođene zadatku, napredna ograničenja
vremena čekanja/slike/duljine opisa/predmemorije, brojače izvođenja i zaštićeni ogledni
zahtjev. Kartica Audio također je aktivna: omogućuje uključivanje, odabir modela isključivo
za STT s opcijom Auto, ograničenja vremena čekanja/maksimalnog trajanja isječka, brojače za
zvuk i ogledni test `input_audio`. Kartica Video je funkcionalna: prikazuje stanje izvođenja
FFmpeg/ffprobe — jedno od četiri izričita stanja korisničkog sučelja (`unknown` dok je
provjera u tijeku ili se nije mogla dovršiti, `restricted` na hostu nadzorne ploče koji nije
povratna petlja, gdje se provjera preskače na klijentskoj strani, `unavailable` nakon provjere
i potvrde da nedostaje ili `available` s verzijama FFmpeg/ffprobe) — trajno sprema ograničenja
uključivanja/modela/okvira/videozapisa/vremena čekanja, filtrira odabir modela na modele s
podrškom za vid i prikazuje brojače za videozapise.

Prethodna kartica Vision Bridge u postavkama umjetne inteligencije sada je poveznica za
kompatibilnost prema novoj stranici; više ne sadržava drugu kopiju obrasca. Media Providers
također povezuje tijekove rada Image-to-Text i Speech-to-Text s odgovarajućim karticama
Modality Bridge, bez uklanjanja postojećeg okruženja za isprobavanje Speech-to-Text.

**Zaobilaženje provjere dopuštenja za vlastitu povratnu petlju:** kada se poziv za opisivanje
usmjerava kroz vlastitu `/v1` povratnu petlju OmniRoutea (nestandardni model pružatelja),
podzahtjev šalje `x-omniroute-admission-bypass: internal` i autentificira se razriješenom
vjerodajnicom vlastite povratne petlje — lokalnom kontrolnom vrijednošću `sk_omniroute` u
lokalnom načinu rada ili ključem okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` koji je
konfigurirao operater (#1350), tako da implementacije s `REQUIRE_API_KEY=true` i dalje mogu
izvršiti poziv za opisivanje. Zaobilaženje se prihvaća samo za te točne vjerodajnice, stoga
vanjski klijenti ne mogu upotrijebiti zaglavlje kako bi preskočili provjeru dopuštenja.

Naslijeđene zadane vrijednosti nalaze se u `src/shared/constants/visionBridgeDefaults.ts`;
nove zadane vrijednosti načina rada/prilagodbe zadatku/predmemorije i razrješivač postavki
nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`. Zaštitni mehanizam izlaže
opciju konstruktora `deps` kako bi testovi mogli umetnuti lažne implementacije `getSettings`
i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za razgovor koji sadrže zvuk prije nego što stignu do cilja za koji nije
poznato da prihvaća zvučni ulaz. Nikada ne preusmjerava zahtjev za razgovor: zvučni dijelovi
transkribiraju se putem postojećeg višedijelnog krajnjeg čvora kompatibilnog s OpenAI-jem, a
odabrani model za razgovor nastavlja rad s tekstnim transkriptima.

Tijek:

1. Razriješite `supportsAudio` putem `getResolvedModelCapabilities()`. Izričiti metapodaci
   registra pružatelja imaju prednost, zatim statički metapodaci modela, a potom sinkronizirani
   `modalities_input`. Deklarirani popis ulaza bez stavke `audio` daje `false`; ako nema
   dokaza o mogućnostima, vrijednost ostaje `null`. I `false` i `null` aktiviraju
   konzervativni most, dok ga `true` zaobilazi.
2. Razriješite postavke `modalityBridgeAudio*` i izdvojite zamjenjive zvučne dijelove najviše
   razine iz svake poruke putem zajedničkog detektora `detectMediaParts()`. Podržani formati
   prijenosa jesu OpenAI-jevi `input_audio`, `audio_url` i
   `source.media_type: "audio/*"`. Ugniježđeni zvuk otkriva se radi usmjeravanja, ali ga
   putanja zamjene ne uklanja. Količina obrade ograničena je postavkom
   `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju nepromijenjeni.
3. Poštujte konfiguraciju `provider/model` ili dopustite funkciji
   `selectAudioBridgeModel()` da prolazi kroz `AUDIO_TRANSCRIPTION_PROVIDERS` stabilnim
   redoslijedom kataloga i odabere prvi model s upotrebljivom aktivnom vjerodajnicom
   pružatelja.
4. `callAudioTranscription()` pretvara zvuk u formatu base64/podatkovnog URI-ja u
   višedijelnu datoteku `file` ili preuzima udaljeni `audio_url` putem zaštite za isključivo
   javne izlazne veze, uz DNS prikvačivanje i ograničenje od 25 MB. Zatim metodom POST šalje
   datoteku i odabrani model lokalnoj vlastitoj povratnoj petlji
   `/v1/audio/transcriptions`, autentificiranoj funkcijom `resolveSelfLoopBearer()`.
   Postojeća ruta za transkripciju obavlja uobičajeno pronalaženje vjerodajnica, obradu
   razdoblja mirovanja/ograničenja učestalosti i prosljeđivanje pružatelju.
5. Uspješni pozivi zamjenjuju svoje dijelove tekstom `[Audio N]: <transcript>`. Pozivi se
   izvršavaju s `Promise.allSettled`: pojedinačni neuspjeh zadržava taj izvorni zvučni dio
   (ugovor #4012). Ako svi pozivi ne uspiju, a za cilj je dokazano
   `supportsAudio === false`, dijelovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za nepoznati cilj
   (`null`) rezultat u kojem svi pozivi ne uspiju ostaje nepromijenjen. Cilj za koji je
   dokazano da podržava samo tekst i koji nema upotrebljivu STT vjerodajnicu dobiva isti
   izričiti zamjenski tekst bez slanja mrežnog poziva.

Uspješni transkripti koriste LRU/TTL predmemoriju Modality Bridgea na razini cijelog procesa.
Ključ kombinira referencu zvuka, stabilnu oznaku operacije `audio-transcription` i odabrani
STT model; neuspjesi se nikada ne pohranjuju u predmemoriju. Pokušaji obrade zvuka ažuriraju
zajedničke brojače `bridged`, `cacheHits`, `failures` i `lastUsedAt`. Transformirani odgovori
nose `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nepromijenjeni
zahtjevi ne dobivaju segment Audio Bridge.

Postavke izvođenja pohranjene su u bazi podataka i provjerene pomoću Zoda:

| Ključ                         | Zadano  | Raspon          |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Zajedničkom predmemorijom i dalje upravljaju `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće dijelove videozapisa najviše razine u `messages` dovršetaka razgovora i `input`
API-ja Responses prije nego što se pozove cilj bez poznate izvorne podrške za video.
Podržani su oblici `input_video`, `video_url`, `video_source`, HTTPS URL-ovi
i podatkovni URI-ji `data:video/*;base64,...`. Obični nazivi datoteka u tekstu ne smatraju se
videozapisima.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja obilaskom zahtjeva,
provjerom mogućnosti/pravila, agregacijom po zahtjevu i korisnim sadržajem odgovora.
Rad po videozapisu — dohvaćanje, predmemorija cjelokupnog rezultata, opisivanje slijeda
kadrova (koje objedinjuje svaki zvučni transkript koji je naveo pozivatelj) te
metrike/prekid/čišćenje po pokušaju — skriven je iza `processVideoPart` u
`videoBridgePipeline.ts`, koji se poziva jednom za svaki dio videozapisa unutar petlje metode `preCall`.
Taj modul također definira eksplicitne granice portova `VideoMediaBrokerPort`
(dohvaćanje bajtova i izdvajanje uzorkovanih kadrova), `VideoAudioTranscriptionPort`
(objedinjavanje zvučnog transkripta koji je naveo pozivatelj s opisima uzorkovanih kadrova) i
`VideoDrilldownPort` (granica pohrane za detaljnu analizu kadrova; još nije povezana
s `processVideoPart` — danas samo zasebna ruta `/api/modality-bridge/video/drilldown`
zapisuje unose detaljne analize).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva podproces. Udaljeni
videozapisi preuzimaju se uz ograničenje od 50 MiB; ugrađeni videozapisi u formatu base64 imaju
konzervativno ograničenje od 36 MiB dekodiranih podataka po videozapisu kako bi omotnica
modela/poruka/uokvirivanja ostala unutar javnog ograničenja prihvata JSON zahtjeva od 50 MiB. Duljina ugrađenih
podataka i procjene dekodirane veličine provjeravaju se prije alokacije. HTTPS je
obavezan za početni udaljeni URL i svako preusmjeravanje, uz postojeću
zaštitu odlaznog prometa samo prema javnim odredištima s vezivanjem DNS-a. Bajtovi zatim prelaze točno određenu internu
granicu posrednika `POST /api/modality-bridge/video/extract`. Ta je ruta istodobno
`LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvaća samo autentificiran zahtjev pouzdane
povratne veze unutar procesa i nikada ne prihvaća URL, putanju datotečnog sustava, izvršnu datoteku
ili popis argumenata. Obrada ograničenja veličine tijela API-ja i inkrementalni čitač tijela
rukovatelja neovisno provode ograničenje ulaza posrednika od 50 MiB. Njegov ograničeni red čekanja obrađuje
jedno izdvajanje istodobno, dopušta četiri posla na čekanju i ograničava ulazne podatke na čekanju na
100 MiB.

Unutar posrednika `ffprobe` čita privatnu lokalnu datoteku; fiksni popis
dopuštenih formata isključuje formate popisa za reprodukciju i manifesta. Za dopuštene spremnike
iz porodice MOV vanjske MOV reference na podatke ostaju prema zadanim postavkama onemogućene, a
fiksna naredba ih ne omogućuje. I `ffprobe` i `ffmpeg` koriste
popis dopuštenih protokola koji sadrži samo `file`, jednu dretvu, fiksne nizove argumenata, bez ljuske,
te izvršne datoteke pronađene putem `PATH`. Tokovi naslovnih slika u privitku nisu
kandidati za reprodukciju. Svi tokovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a
eksplicitni zadani tok ima prednost pred determinističkim rezervnim odabirom s najnižim indeksom.
Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i
33.554.432 izvorna piksela. FFmpeg uzorkuje 1–16 JPEG kadrova iz sredine intervala, smanjuje
dulji rub na najviše 1.024 piksela bez povećavanja manjih ulaznih sadržaja i
nikada ne prima URL. Uzorkovanje je prema zadanim postavkama `uniform`. Neobavezna
pravila `scene_aware` i eksperimentalno `segment_aware` izvode jedan dodatni
fiksni prolaz FFmpeg-a preko već provjerenog lokalnog toka, odabiru ograničene
vremenske oznake scena `showinfo` i deterministički se vraćaju na iste
ujednačene sredine intervala u slučaju pogreške detektora, isteka vremena, neispravnog izlaza ili praznog
skupa kandidata. Način rada koji uzima u obzir segmente dodjeljuje uzorke iz sredine intervala razmjerno
provjerenim intervalima scena; dokazi za način rada koji uzima u obzir segmente i ponašanje pri povratku
detaljno su opisani u nastavku. Čvrsto ograničenje od 16 kadrova
primjenjuje se nakon odabira u svakom pravilu. Kada zahtjev koji uzima u obzir scene ima proračun od samo
jednog kadra, koristi ujednačenu sredinu aktivnog cijelog videozapisa ili fokusnog
prozora i prijavljuje `policyEffective: uniform`: jedan odabrani kadar scene
ne može sačuvati oba vremenska kraja. Pozivatelj po želji može navesti
konačan fokusni prozor (`start`/`end` u sekundama); granice se ograničavaju na trajanje
medija, obrnuti ili nekonačni prozori se odbijaju, a sva pravila
uzorkovanja primjenjuju se samo unutar normaliziranog intervala. Dobiveni
prozor uključuje se u metapodatke uzorkovanja i u prefiks nepouzdanog opisa
kako bi modeli u nastavku obrade mogli razlikovati fokusirani isječak od cijele
vremenske crte.

Semantički fokus opisa zasebna je, eksplicitna postavka. Zadani način analize `full`
zadržava postojeći upit za kadrove i nikada ne prosljeđuje tekst zahtjeva
modelu za opisivanje. U načinu `focused` most čita samo najnoviji
neprazni `text`/`input_text` koji je napisao korisnik iz istog spremnika Chat ili Responses,
normalizira ga u NFC, sažima kontrolne znakove i razmake
te ga ograničava na 500 Unicode kodnih točaka. Prazan rezultat vraća se na
točan upit načina `full`. Upotrebljiva naznaka serijalizira se kao JSON u namjenskom
bloku nepouzdanog korisničkog konteksta i smije samo dati prednost uočljivim pojedinostima; ne
može nadjačati zasebno upozorenje protiv slijeđenja uputa vidljivih
ili čujnih u mediju. Tekstualni fokus nikada ne izvodi zaključak o `start`/`end` niti mijenja
vremenski uzorkivač.

#### FU-07 strukturni dokazi segmenata

`segment_aware` koristi jedan ograničeni prolaz predanalize preko već provjerenog
lokalnog videotoka. Fiksni lanac filtara najprije smanjuje širinu na najviše 320 piksela,
otkriva promjene scena i zamrznute intervale, a zatim uzorkuje brzinom od 1 kadra u
sekundi radi zamućenja, prosječne luminancije te prostornih/vremenskih informacija. Prolaz je
ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filtarsku dretvu, isti
protokol samo `file` i iste popise dopuštenih spremnika, ograničenje izlaza procesa od 1 MiB
te najviše 30 sekundi unutar zajedničkog prekida/roka posrednika. Nikada
ne prihvaća naredbu, filtar, putanju ni URL iz zahtjeva.

Strukturne vrijednosti deterministički su dokazi uzorkovanja, a ne semantičko razumijevanje videozapisa. Ne izvode zaključke o subjektima, radnjama, titlovima, govoru ni namjeri korisnika. Granice scena i zamrznutih dijelova tvore segmente; pokrivenost zamrznutih dijelova, zamućenje, ekspozicija, prostorni detalji i vremenska promjena utječu samo na raspodjelu postojećeg proračuna od 1 do 16 sličica. Potpuno zamrznuti segment ograničen je na jednu sličicu, dok se nezamrznuti segmenti natječu za preostali proračun. Kada broj granica premašuje broj sličica, zadržava se jednolika pokrivenost vremenske crte kako brzi rezovi na početku ne bi mogli sakriti dugačak završni segment. Granice scena unutar analitičke razlučivosti od 1 sekunde u odnosu na granicu zamrznutog dijela objedinjuju se.

Ako filtri nedostaju, dokazi su neispravni ili prazni, detektor prijavi pogrešku ili istekne ograničeno vrijeme preliminarne analize, sustav se vraća na točno definirano pravilo jednolikih srednjih točaka. Prekid koji pokrene pozivatelj ili istek roka brokera ne uzrokuje takav povratak: tada se prekida podproces koji je u tijeku, sprječava se naknadno izdvajanje sličica, a privatno privremeno stablo uklanja se u bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg testne podatke za uštede poziva za opis nakon deduplikacije, raspodjelu proračuna pri gustom kretanju, dokaze o zamućenju, ekspoziciji i SI-TI-ju, brze rezove s dugim završnim segmentom te lažno pozitivne rezultate pri postupnom zatamnjenju. Bilježi proteklo vrijeme preliminarne analize te, kada je dostupan `/usr/bin/time`, procesorsko vrijeme podređenog procesa i vršnu vrijednost RSS-a. Njegove provjere kvalitete služe samo kao strukturni orakuli. Kvaliteta stvarnog modela za opise ostaje `HOLD` jer ovaj testni okvir nema ovlaštenu krajnju točku ni zamrznuti evaluacijski model. Novčane uštede također ostaju `HOLD`, osim ako `--caption-cost-per-call-usd` ne navede izričitu pozitivnu procjenu troška po pozivu; skripta nikada ne izmišlja nijedan od tih rezultata.

Svaka sličica ograničena je na 4 MiB, sve neobrađene sličice zajedno na 23 MiB, a serijalizirani odgovor brokera na 32 MiB. Privatni privremeni direktorij uklanja se u bloku `finally`. OmniRoute ne uključuje FFmpeg i ne prihvaća prilagođenu putanju izvršne datoteke. Prije izrade opisa most primjenjuje konzervativni prolaz vizualne deduplikacije: svaki JPEG svodi se na međuspremnik sivih tonova veličine 16×16 i uspoređuje samo s posljednjom zadržanom sličicom. Za zatraženi proračun opisa veći od jedne sličice izdvajanje daje ograničeni skup kandidata do dvostruke vrijednosti tog proračuna, ali nikada više od 16 sličica. Zatraženo ograničenje primjenjuje se tek nakon deduplikacije, pri čemu se tijekom završnog prorjeđivanja čuvaju prvi i posljednji odabrani kandidat kada je proračun najmanje dvije sličice. Verzijska politika `grayscale-16x16-mean-cells-v2` upotrebljava veću vrijednost između srednje promjene luminancije i udjela ćelija minijature čija je normalizirana promjena najmanje 0,05. Prag za duplikate stalna je vrijednost 0,04, odabrana radi predvidljivosti umjesto da bude izložena kao postavka tijekom izvođenja. Taj sekundarni signal visokog kontrasta čuva male pokrete i promjene vidljivog teksta koje usporedba zasnovana samo na srednjoj vrijednosti može prikriti. Pogreške uspoređivača ili dekodera ne zaustavljaju obradu, nego zadržavaju pokrivenost. Izlazni metapodaci zasebno navode izdvojene kandidate, uspješno upotrijebljene sličice i odbačene vizualne duplikate.

Izričito označeni dio videozapisa može zatražiti kontaktnu tablu s vremenskim oznakama. Most izrađuje JPEG mrežu s najviše 4 stupca i 16 sličica. Svaka ćelija od 512 piksela utiskuje vremensku oznaku izvora u donju traku visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima radi naknadnog povezivanja i revizije. Cijeli JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG sličice; prekid klijenta i dalje se prenosi kroz operaciju izrade kontaktne table.

Dokazi za promicanje namjerno su odvojeni od sintetičkog mikromjerila performansi sastavljanja. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B testni okvir s verzioniranom shemom za stvarne modele vida kompatibilne s OpenAI-jem. Mjeri broj tokena koji prijavljuje pružatelj, ukupnu latenciju od početka do kraja (uključujući sastavljanje kontaktne table), broj poziva modela i očuvanje činjenica definiranih manifestom. Neobrađeni odgovori modela ne zapisuju se u izvješće; zadržavaju se samo SHA-256 sažeci i ID-ovi podudarnih činjenica. Testni okvir ne upućuje nikakav mrežni ni plaćeni poziv modelu osim ako je proslijeđen `--execute-real` te su konfigurirani `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez takvog izričitog stvarnog izvođenja njegov strojno čitljiv ishod ostaje `HOLD`; sama sintetička mjerenja veličine korisnog tereta i broja poziva nisu dokaz za promicanje.

Pozivatelji mogu priložiti neobavezno polje `transcript.cues` podržanom dijelu videozapisa ako već posjeduju vremenski usklađen tekst. Svaka oznaka mora sadržavati `text`, konačni interval `start`/`end` unutar ispitanog trajanja i `source` s popisa dopuštenih vrijednosti (`client`, `embedded` ili `audio-bridge`); zadana vrijednost za `confidence` jest `1` i mora ostati između `0` i `1`. Potpuno jednake oznake sažimaju se u jednu. OmniRoute nikada ne pokreće transkripciju iz tih metapodataka: provjerene oznake kopiraju se u opisani rezultat zajedno s izvorom, pouzdanošću i intervalom te se prikazuju kao nepouzdana opažanja uz opise sličica. Nevaljan tekst, tekst izvan raspona ili tekst bez podataka o podrijetlu odbacuje se umjesto da se pomiješa s tokom opisa. Polje `source` trenutačno deklarira pozivatelj i poslužitelj ga ne provjerava: OmniRoute osigurava da je vrijednost jedan od triju dopuštenih nizova, ali još ne potvrđuje kriptografski da je oznaka `embedded` ili `audio-bridge` doista nastala izdvajanjem kojim upravlja poslužitelj. Smatrajte `source` nepouzdanim pokazateljem dok se ta provjera ne uvede; nemojte na njemu temeljiti odluke o autorizaciji.

Napredni pozivatelj može navesti već autorizirani zapis `audioTranscript`
za isti videozapis. Spoj za fuziju izvršava vizualna i zvučna opažanja unutar
jednog roka i signala za prekid, raspoređuje ih na zajedničkoj vremenskoj crti,
sažima potpuno jednake duplikate i prijavljuje djelomičan rezultat kada uspije
samo jedna strana. Nevaljani `audioTranscript` svodi se na taj djelomičan
rezultat — vizualni opis se zadržava, a zvučna grana bilježi pročišćeni kôd
pogreške — umjesto da cijeli videozapis završi neuspjehom. Dostupnost po granama,
oznaka djelomičnog rezultata i pročišćeni kodovi pogrešaka zadržavaju se u
opisanom rezultatu, u metapodacima zaštitnih ograda (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), u metapodacima predmemorije rezultata i u brojačima
fuzije mosta. Zadani put Video Bridgea ne poziva pretvaranje govora u tekst
niti preuzima drugu kopiju medija; bez tog eksplicitnog zapisa ostaje ograničen
na videozapis.

**Zadržavanje transkripta (#12150 P1).** To se automatski primjenjuje kad god
Video Bridge (koji je i sam opcionalan) generira oznaku transkripta — ne postoji
zasebna oznaka za zadržavanje. Kada zahtjev generira bilo koju oznaku transkripta
(`transcript` koji je deklarirao pozivatelj ili spojeni `audioTranscript`),
zaštitna ograda označava ga kao `videoBridgeObserved` i stvara redigiranu kopiju
opisa videozapisa — identičan prikaz u kojem je tijelo slobodnog teksta svake
oznake zamijenjeno tekstom `[redacted-video-transcript]`, izrađenim zamjenom
strukturiranog polja oznake prije sastavljanja niza (nikada raščlanjivanjem
spljoštenog teksta, tako da nikakav sadržaj oznake — zlonamjeran ili uobičajen,
uključujući tijela koja sadržavaju `]`, poput `[inaudible]`/`[music]` — ne može
ostati). Tijelo zahtjeva u trajno pohranjenom zapisniku poziva zamjenjuje svaki
tekstualni dio izveden iz videozapisa tom redigiranom kopijom, uparenom prema
jednakosti sadržaja; sidro `fullText` ponovno se čita iz dovršenog sadržaja
zaštitne ograde prije poziva, tako da uparivanje i dalje uspijeva nakon što
kasnije lančane zaštitne ograde (maskeri osobnih identifikacijskih podataka i
vjerodajnica, prioriteti 10/95) izmijene tekst opisa na mjestu te nakon što
umetanje sistemske upute, predaje konteksta ili memorije preoblikuje polje
poruka. Tijelo poslano uzvodno modelu ostaje nepromijenjeno. Promatrani zahtjev
također ne popunjava trajnu memoriju Memory (preskače se izdvajanje izvedeno i iz
zahtjeva i iz odgovora), pa odgovor samog modela ne može ponoviti tekst
transkripta u memoriji Memory.

Površine za zadržavanje koje su i dalje otvorene, a prate se za naknadnu obradu
(**P2**, #12430): neobrađena snimka klijentskog zahtjeva prije zaštitne ograde u
artefaktu detaljnog zapisnika; nastavak `previous_response_id` koji se zatvara u
slučaju pogreške; interni pozivi izvedenih upita koji ugrađuju transkript unutar
sintetizirane tekstualne upute (faze cjevovoda, predaja konteksta); te tijelo
odgovora / kopija odgovora modela u semantičkoj predmemoriji koja citira
transkript. To su neobrađene površine ili površine klase odgovora, odnosno
opcionalne površine izvan P1 opsega trajno pohranjenog tijela zahtjeva i memorije
Memory.

Interni životni ciklus `/api/modality-bridge/video/drilldown` zaseban je
predmemorijski supstrat autentificiran povratnom vezom/tokenom. Svaka operacija
također zahtijeva kanonski neprozirni ID principala. Prije nego što se produkcijski
pozivatelj omogući, mora izvesti taj ID iz autentificiranog zakupca i nikada ne
smije proslijediti vrijednost koju je odabrao klijent. Ključevi predmemorije
vežu taj principal uz kanonske ID-ove sesije i reference videozapisa, pohranjuju
samo njihove ključeve izvedene s pomoću SHA-256 te ograničavaju i čitanje i
brisanje na isti principal. Predmemorija po unosu pohranjuje najviše 16 izvedenih
JPEG okvira, uklanja ih nakon deset minuta te podržava ograničena čitanja
`start`/`end` ili eksplicitno brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta su
ograničenja neovisna o globalnoj gornjoj granici od 64 unosa/256 MiB: pritisak
kvote principala uklanja samo najdulje nekorištene unose tog principala prije
razmatranja globalnog LRU uklanjanja. Istekli unosi uklanjaju se i iz evidencije
po principalu i iz globalne evidencije pri aktivnosti predmemorije, dok otkazivanje
i neuspjeh validacije ne pohranjuju djelomičnu zamjenu.

Predmemorija odbacuje nekanonski Base64, prekomjernu dopunu, medije koji nisu JPEG,
neispravne ili prekinute JPEG datoteke te JPEG datoteke koje generiraju upozorenje
tijekom ograničenog dekodiranja cijele slike alatom `sharp`. Svaku prihvaćenu sliku
ponovno kodira kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova
umjesto da vjeruje poljima pozivatelja te odbacuje sve završne poliglotske bajtove
umjesto da ih zadržava. Objema kvotama zaračunava se samo ograničeni kanonski
komprimirani međuspremnik. Ograničenje JSON prijenosa uključuje Base64 dodatak za
gornju granicu dekodiranog ulaza od 32 MiB. Svako
pohranjeno izvođenje bilježi svoj validirani JPEG format/razlučivost, pravilo
uzorkovanja, verziju izvođenja, vrijeme stvaranja, poslužiteljski izračunat sažetak
sadržaja te sažetak nadređene reference zajedno sa sažetkom sadržaja nadređenog
elementa pouzdanog pozivatelja. Otkazivanje se provjerava između asinkronih faza
dekodiranja/izračuna sažetka prije atomskog spremanja u predmemoriju.

Ova tranša još ne povezuje produkcijskog proizvođača s rutom i ne omogućuje
odabir varijante s više razlučivosti. Transparentni put zahtjeva Video Bridgea
stoga ne uzrokuje nikakav dodatni rad, dok izvođenje principala vezano uz zakupca
i puni FU-08 životni ciklus s više razlučivosti ostaju eksplicitni naknadni
zadaci umjesto da budu dokumentirani kao dovršeno ponašanje.

Kadrovima se sekvencijalno dodaju opisi pomoću konfiguriranog modela za videozapise. Prazno
nadjačavanje za videozapise nasljeđuje postavku za Vision; ako su obje vrijednosti prazne,
automatski usmjerivač za Vision odabire odgovarajući model s podrškom za obradu slika. Uspješni
opisi zamjenjuju izvorni dio stabilnim prefiksom `[Video description:`, koji također
označava tekst kao nepouzdano opažanje izvedeno iz medijskog sadržaja i upućuje modele
u nastavku obrade da ne slijede upute pronađene u medijskom sadržaju. Ključevi predmemorije
opisa kadrova uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; predmemoriraju
se samo uspješni opisi. Unosi predmemorije zadržavaju stvarni model koji je uspješno proizveo
rezultat, uključujući rezervni model; most prijavljuje `mixed` kada su različite kadrove
proizveli različiti modeli. Pogodak u predmemoriji ponovno upotrebljava identitet tog modela
umjesto da ga ponovno označi kao zatraženi plan usmjeravanja. Predmemorija rezultata za cijeli
videozapis indeksirana je prema svakom ulazu koji mijenja izlaz — promptu, efektivnom
modelu, pravilima uzorkovanja, broju kadrova, načinu semantičke analize, SHA-256
otisku normaliziranog nagovještaja fokusa, prozoru fokusa, `transcript`,
`audioTranscript` i zastavici kontaktne tablice — pa promjena bilo koje od tih
dimenzija uzrokuje promašaj predmemorije, a nikada ponovnu uporabu zastarjelog rezultata.
Verzija pravila vizualne deduplikacije, prag i ograničeni broj kandidata za kadrove također
su eksplicitno navedeni u ključu i metapodacima predmemorije rezultata; promjena pravila
stoga ne može ponovno upotrijebiti zastarjeli opis cijelog videozapisa. Metapodaci
predmemorije rezultata v4 zadržavaju način rada i otisak, ali nikada sirovi korisnički
zadatak. Metapodaci zaštitnog mehanizma navode i zatraženi i efektivni način analize;
zatraženi način `focused` bez upotrebljivog korisničkog teksta prijavljuje se kao
efektivno `full`.

Zaštitni mehanizam izdvaja svaki podržani dio videozapisa, ali ne opisuje više od
`modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima
`supportsVideo === false`, neuspjeli videozapisi i oni iznad ograničenja pretvaraju se
u eksplicitne sigurne tekstne oznake kako nijedan neobrađeni videozapis ne bi preostao.
Kada mogućnost nije poznata, ti dijelovi ostaju nepromijenjeni. Ciljevi sa
`supportsVideo === true` zaobilaze most. Signal prekida klijentskog zahtjeva
propagira se kroz preuzimanje, red brokera, podprocese i pozive za opisivanje; prekidi
zaustavljaju obradu između videozapisa i nikada ne dopuštaju nastavak s neobrađenim
medijskim sadržajem.

Postavke tijekom izvođenja pohranjuju se u bazi podataka i provjeravaju pomoću Zoda:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                            |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobavezno tijekom izvođenja, mora se izričito omogućiti                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zadržava generičke opise; `focused` upotrebljava ograničeni, nepouzdani kontekst posljednjeg korisnika |
| `modalityBridgeVideoModel`          | `""`        | Nasljeđuje model mosta Vision                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                          |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; neuspjeh detektora vraća se na `uniform`         |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                           |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                |

Naslijeđene trajno pohranjene vrijednosti vremenskog ograničenja za videozapise iznad
120 sekundi ograničavaju se na krajnji rok brokera; nova zapisivanja postavki iznad tog
ograničenja odbijaju se. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu,
označenu loopback lokalnost prije autentifikacije ili ispitivanja okruženja izvođenja,
a zatim zahtijeva upravljačku autentifikaciju. Vraća samo `available`, sanitizirane
verzije FFmpeg/ffprobe i fiksni razlog kada okruženje izvođenja nije dostupno. Interna
krajnja točka za izdvajanje nije javni API za prijenos: zasićenje reda vraća `503` uz
`Retry-After`, prekid veze pozivatelja vraća `499`, a fiksni krajnji rok brokera vraća
`504`. Pretvoreni odgovori dodaju
`video->text;model=<visionModel>;parts=<videos>` u središnje zaglavlje
`x-omniroute-modality-bridge` bez uklanjanja segmenata Vision ili Audio.

### Masker osobnih podataka (`piiMasker.ts`)

Izvodi se u **obje** faze.

- **`preCall`** klonira sadržaj, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke koje su obični nizovi znakova) te primjenjuje `processPII()` (iz
  `@/shared/utils/inputSanitizer`) na polja `content`/`text` koja sadrže nizove znakova. Kada je
  `PII_REDACTION_ENABLED=true`, otkriveni osobni podaci redigiraju se u odlaznom
  sadržaju. To ne ovisi o `INPUT_SANITIZER_MODE` (koji kontrolira samo
  pravila za ubacivanje prompta). Kada je redigiranje isključeno, poziv bilježi broj
  otkrivanja bez izmjene sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` zajedno
  s maskerom za strukturu Responses API-ja (`maskResponsesOutput` — obuhvaća
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog redigiranja,
  izmijenjeni odgovor zamjenjuje izvorni.

Zaštitni mehanizam nikada ne blokira; samo dodaje napomene (`meta.detections`,
`meta.redacted`) ili prepisuje sadržaj.

### Ubacivanje prompta (`promptInjection.ts`)

Otkriva zlonamjerne strukture u sadržaju koji je dostavio korisnik i provodi
konfigurirana pravila. Ponašanjem upravljaju varijable okruženja i opcije konstruktora:

| Postavka        | Varijabla okruženja                                                                                   | Zadano | Učinak                                                                                                                                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitna mjera odmah prekida izvođenje.                                                                                                                                                                            |
| Način rada      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Pravilo za injekcije: `block`, `warn` ili `log`. (`redact` se prihvaća radi kompatibilnosti sa starijim verzijama, ali **ne** uklanja tekst injekcije; prepisivanjem osobnih podataka u zahtjevu upravlja `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Najmanja razina ozbiljnosti potrebna za blokiranje. Srednja razina prema zadanim se postavkama samo promatra.                                                                                                                       |

**Redoslijed prvenstva načina rada** (`getMode`): pozivateljev `options.mode` →
**nadjačavanje zastavicom značajke u bazi podataka** za `INJECTION_GUARD_MODE` (Nadzorna ploča → Postavke →
Zastavice značajki) → varijabla okruženja `INJECTION_GUARD_MODE` → varijabla okruženja `INPUT_SANITIZER_MODE` →
`warn`. Nadjačavanje putem nadzorne ploče stoga ima prednost pred varijablama okruženja, pa korisničko sučelje
Zastavice značajki upravlja aktivnom zaštitom u stvarnom vremenu (bez ponovnog pokretanja). Čitanje iz baze podataka sigurno je u slučaju pogreške:
ako dođe do pogreške, zaštita se vraća na ponašanje temeljeno na varijablama okruženja, a kada
nadjačavanje nije postavljeno, ponašanje je identično razrješavanju isključivo putem varijabli okruženja.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora
   koji se koristi drugdje u procesnom lancu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutačno `system_override_inline` i
   `markdown_system_block`, oba s razinom ozbiljnosti `high`).
3. Neobavezni `customPatterns` proslijeđeni putem opcija konstruktora (nizovi znakova, regularni izrazi
   ili zapisi `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** barem jedna detekcija doseže prag
ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U načinima rada `warn`/`log` zaštitna mjera bilježi događaj, ali
dopušta poziv. Zajednički pomoćnik `evaluatePromptInjection()` također se izvozi
za pozivatelje koji trebaju procijeniti upite bez prolaska kroz registar.

**Ograničenje skeniranja (v3.8.20):** detektor pregledava samo **prvih 16 KB**
spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` primjenjuju `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja
petlje uzoraka. Direktive za injekciju nalaze se pri vrhu unosa, pa se time
ograničava opterećenje CPU-a/GC-a uzrokovano regularnim izrazima na sadržajima veličine više stotina KB bez slabljenja detekcije (usp.
#3932, #4041).

### Maskiranje vjerodajnica (`credentialMasker.ts`)

Izvodi se u **objema** fazama, posljednje u zadanom lancu (prioritet `95`). Redigira
poznate uzorke API ključeva / tajnih tokena iz odlaznog sadržaja (sadržaja poruke,
argumenata poziva alata, rezultata alata) **i** odgovora pružatelja usluge, tako da
vjerodajnica zalijepljena u upit (ili vraćena u rezultatu alata) ne procuri
vanjskom pružatelju usluge ni natrag klijentu.

- **Samo uz izričito uključivanje**, prema istoj konvenciji kao redigiranje osobnih podataka (povezano sa Strogim pravilom #20):
  onemogućeno je osim ako je `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključena, zaštitna mjera ne radi ništa —
  nikada ne blokira niti prepisuje sadržaj.
- `redactCredentials()` prolazi kroz cijelo stablo sadržaja/odgovora (`walkValue()`,
  sigurno od onečišćenja prototipa, sigurno pri ciklusima zahvaljujući `WeakSet`) i zamjenjuje podudaranja
  rezerviranim mjestom `[REDACTED:<type>]`, klonirajući samo grane koje su se doista
  promijenile.
- `CREDENTIAL_PATTERNS` obuhvaća ključeve pružatelja LLM usluga (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve za plaćanje (Stripe, Square), ključeve
  usluga u oblaku (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove,
  nizove za povezivanje koji sadržavaju vjerodajnice (`mongodb://user:pass@...` itd.) i
  generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigiraju se strukturno (samo vrijednost, uz očuvanje prefiksa sheme poput
  `Bearer `/`Basic `), a ne pomoću generičkog tekstualnog regularnog izraza.
- Zaštitna mjera nikada ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i dodaje bilješke (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true prekida lanac
  message?: string; // prikazuje se pri blokiranju
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vraća ga preCall kako bi izmijenio zahtjev
  modifiedResponse?: TValue; // vraća ga postCall kako bi izmijenio odgovor
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

Zaštitna kontrola signalizira „bez promjene” vraćanjem vrijednosti `void`, `{}` ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja se prosljeđuje kroz lanac sljedećim zaštitnim kontrolama.
`signal?: AbortSignal` prenosi životni ciklus pozivatelja u zaštitne kontrole. Prekid zahtjeva namjerna je iznimka s otvorenim propuštanjem: medijski mostovi zaustavljaju rad i obavljaju čišćenje bez vraćanja neobrađenog medijskog sadržaja cilju za koji je poznato da ga ne podržava.

## Registar (`registry.ts`)

Jedinstvena instanca `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje zaštitnu kontrolu (ili je zamjenjuje prema normaliziranom nazivu) i
  ponovno ih razvrstava prema rastućem `priority`.
- `clear()` / `list()` — administrativne pomoćne funkcije.
- `runPreCallHooks(payload, context)` — prolazi kroz aktivne zaštitne kontrole, prosljeđuje
  korisni sadržaj putem `modifiedPayload` i zaustavlja se na prvom `block: true`.
- `runPostCallHooks(response, context)` — isti tijek na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i po potrebi
  ponovno registrira zadane vrijednosti radi čiste izolacije testova.

Oba izvršitelja vraćaju `{ blocked, payload|response, results, guardrail?, message? }`,
pri čemu je `results` polje zapisa `GuardrailExecutionResult` koji uključuju
polja `blocked`, `skipped`, `modified`, `error` i `meta` za svaku zaštitnu kontrolu,
što je korisno za praćenje.

### Onemogućavanje zaštitnih kontrola po zahtjevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` objedinjuje
deduplicirani popis naziva zaštitnih kontrola koje treba preskočiti za trenutačni
zahtjev. Izvori (svi neobavezni, svi se spajaju):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` u tijelu zahtjeva (na najvišoj razini)
- `metadata.disabledGuardrails` u tijelu zahtjeva
- Zaglavlje `x-omniroute-disabled-guardrails` (ili zastarjelo
  `x-disabled-guardrails`)

Vrijednosti mogu biti polja nizova znakova ili niz znakova odvojen zarezima; nazivi se
normaliziraju na kebab-case malim slovima (`pii_masker` → `pii-masker`). Rezultat
se prosljeđuje putem `context.disabledGuardrails` registru, koji preskače
odgovarajuće zaštitne kontrole (`skipped: true` u `results`).

## Redoslijed izvršavanja

Za svaki zahtjev koji prolazi kroz `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` izrađuje popis za preskakanje na temelju API ključa, tijela zahtjeva
   i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne mehanizme uzlaznim
   redoslijedom prioriteta:
   - Onemogućeni zaštitni mehanizmi bilježe se kao `skipped`.
   - `preCall` svakog zaštitnog mehanizma može izmijeniti sadržaj putem `modifiedPayload`.
   - Prvi `block: true` prekida lanac, a rukovatelj vraća
     odgovor o odbijanju od strane zaštitnog mehanizma.
3. Potencijalno izmijenjeni sadržaj prosljeđuje se kombiniranom usmjeravanju i
   otpremi prema uzvodnom sustavu.
4. Nakon sastavljanja odgovora, `guardrailRegistry.runPostCallHooks(...)`
   pokreće isti lanac nad odgovorom. `block: true` u ovom koraku odbacuje odgovor
   uzvodnog sustava.

Zaštitni mehanizmi koji izazovu pogrešku bilježe se s `error: <message>` i zapisuju putem
`logger.warn`, ali se lanac nastavlja — prema dizajnu, u slučaju pogreške zahtjev se propušta.

## Konfiguracija

Varijable okruženja koje čitaju ugrađeni zaštitni mehanizmi:

| Varijabla                             | Koristi je              | Učinak                                                                                                                       |
| ------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Postavite na `false` kako biste potpuno onemogućili otkrivanje.                                                              |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Pravilo za ubacivanje naredbi: `warn`, `block` ili `log`. Naslijeđena vrijednost `redact` ne mijenja tekst ubačenih naredbi. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Način rada zaštite od ubacivanja naredbi; ujedno i DB zastavica značajke koja **nadjačava** varijable okruženja (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Najniža razina ozbiljnosti koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                                    |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Naslijeđeni pseudonim za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kada je `true`, osobni podaci u zahtjevu se redigiraju (neovisno o načinu rada za ubacivanje naredbi).                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno) | Upravlja ponašanjem maskiranja na strani odgovora.                                                                           |

Zaštitni mehanizmi Modality Bridgea čitaju konfiguraciju tijekom izvođenja iz spremišta
postavki temeljenog na bazi podataka (`getSettings()`), a ne iz varijabli okruženja. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Naslijeđeni
ključevi `visionBridge*` prihvaćaju se samo kao dokumentirana pričuvna opcija čitanja za jedan ciklus;
nadzorna ploča zapisuje primarne ključeve. Zadane vrijednosti i razrješivač pričuvnih vrijednosti
nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`, dok su naslijeđene
konstante zadržane u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, zajedno s dijeljenim
postavkama `modalityBridgeCache*`. Audio nema pričuvnu opciju za naslijeđene ključeve jer su ti
ključevi uvedeni sa shemom Modality Bridge.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, zajedno s dijeljenim postavkama `modalityBridgeCache*`.
Prema zadanim je postavkama onemogućen jer su FFmpeg/ffprobe neobavezne operativne
ovisnosti, a opisivanje kadrova povećava latenciju i trošak modela.

## Prilagođeni zaštitni mehanizmi

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

1. Izradite `src/lib/guardrails/myGuardrail.ts` koji proširuje `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Registrirajte ga pri uvozu (dodavanjem iz `registerDefaultGuardrails`) ili
   pozovite `guardrailRegistry.register(...)` tijekom izvođenja — registar zamjenjuje
   svaki prethodni zaštitni mehanizam s istim normaliziranim nazivom.
4. Dodajte testove u `tests/unit/` (postojeći primjeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Upotrijebite `resetGuardrailsForTests()` između testova kako biste započeli iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` kako biste započeli s praznim registrom i
registrirali samo zaštitne mehanizme koji se testiraju. Vision Bridge prihvaća ubrizgavanje
ovisnosti (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge pruža
ekvivalentne spojne točke za postavke, mogućnosti, odabir STT modela, provjere
vjerodajnica i transkripciju. Testovima je stoga moguće provjeriti oba toka bez pristupa
bazi podataka ili mreži.

## Vidi također

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — zajednički detektor koji omogućuje
  otkrivanje ubacivanja u upite i maskiranje osobnih podataka
- `src/shared/constants/visionBridgeDefaults.ts` — zadane postavke za Vision Bridge i
  popis modela s obveznim premošćivanjem
- `src/shared/constants/modalityBridgeDefaults.ts` — zajedničke zadane postavke izvođenja za Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (prekidač strujnog kruga, razdoblja mirovanja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca varijabli okruženja

## Pokrivenost ruta zaštitom od ubacivanja i red-team testiranje (Faza 8 · Blok D)

Zaštita od ubacivanja (`createInjectionGuard` / `withInjectionGuard`) obuhvaća sve rute
koje prihvaćaju korisničke upite. Poštuje `INJECTION_GUARD_MODE` (zadano `warn` = samo zapisivanje;
`block` = vraća HTTP 400 `SECURITY_001`).

| Vrsta             | Rute                                                                                                                                                 | Zadani način rada |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Tekst (postojeće) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn              |
| Generativne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn              |
| Podatkovne        | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn              |

Izdvajanje teksta (`extractMessageContents`) obuhvaća `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (svake noći, `nightly-llm-security.yml`):** promptfoo provjerava blokira li svaka ruta
OWASP-LLM korpus kada je `INJECTION_GUARD_MODE=block`; garak pokreće sonde (preskače se bez tajne).
`moderations` je uključen radi dosljednosti — operateri ga u načinu blokiranja mogu izuzeti putem
`resolveDisabledGuardrails`.

Noćni tijek rada (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokirajući)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  uz `INJECTION_GUARD_MODE=block`. Svaki suparnički slučaj (npr. „zanemari sve
  prethodne upute…”, pokušaji zaobilaženja zaštite u stilu DAN-a) provjerava sadrži li odgovor
  `error.code === "SECURITY_001"`, odnosno je li zaštita doista odbila zahtjev.
- **`garak` (savjetodavni)** — pokreće garak `--probes promptinject,dan,leakreplay`
  nad lokalnom instancom OmniRoute (`http://localhost:20128/v1`). Uvjetovan je
  tajnom pružatelja (`PROMPTFOO_PROVIDER_KEY`); uredno se preskače i ima sufiks
  `|| true`, pa izvješćuje bez rušenja CI-ja.

Pokrivenost pomoćne funkcije zaštite (`createInjectionGuard` / `withInjectionGuard`)
obuhvaća svaku `/v1` rutu koja prenosi upit; tekst upita dohvaća se iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` putem funkcije
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
