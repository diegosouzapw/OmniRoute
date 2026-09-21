# Guardrails (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Patiesības avots:** `src/lib/guardrails/`
> **Pēdējoreiz atjaunināts:** 2026-08-29 — v3.8.51 (Video Bridge transkripta izcelsmi deklarē izsaucējs,
> serveris to vēl nepārbauda — precizēts saskaņā ar #11661)

Aizsargmehānismi nodrošina drošības, politiku un satura transformāciju ievērošanu uz robežas
starp OmniRoute un augšupējiem pakalpojumu sniedzējiem. Katrs aizsargmehānisms var pārbaudīt (un
pēc izvēles noraidīt, transformēt vai anotēt) pieprasījumu lietderīgo slodzi (`preCall`) un
augšupējās atbildes (`postCall`).

Sistēma ir **kļūmju gadījumā atvērta**: ja aizsargmehānisma izpildes laikā rodas izņēmums, reģistrs
reģistrē kļūdu un turpina ar nākamo aizsargmehānismu, nevis izraisa pieprasījuma
kļūmi. Bloķēšana ir apzināts lēmums (`block: true`), nevis nejaušība.

## Iebūvētie aizsargmehānismi

Importēšanas laikā reģistrs prioritāšu secībā automātiski ielādē sešus aizsargmehānismus
(skatiet `registry.ts` → `registerDefaultGuardrails()`):

| Prioritāte | Nosaukums           | Posms(-i)      | Fails                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mazāki prioritātes skaitļi tiek izpildīti **vispirms**.

### Vision Bridge (`visionBridge.ts`) — Modalitāšu tilts PR-1

Pārtver attēlus saturošus pieprasījumus, kas paredzēti **modeļiem bez attēlu atpazīšanas atbalsta**, un vai nu
novirza visu pieprasījumu uz modeli ar attēlu atpazīšanas atbalstu, vai pirms
augšupējā izsaukuma aizstāj attēlu daļas ar teksta aprakstiem, ko izveido konfigurējams attēlu atpazīšanas modelis.
Tas ļauj tikai tekstu atbalstošiem pakalpojumu sniedzējiem pārskatāmi apstrādāt
multimodālas lietderīgās slodzes.

Darbības plūsma:

1. Izlaist, ja mērķa modelis jau atbalsta attēlu atpazīšanu (ja vien tas nav iekļauts
   piespiedu tilta sarakstā `isVisionBridgeForcedModel`).
2. Izgūt attēlu daļas, izmantojot `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kas deleģē darbu **vienotajam multivides
   detektoram** `detectMediaParts()` failā `open-sse/utils/mediaParts.ts` — vienīgajam
   patiesības avotam, kas tiek koplietots ar kombināciju saderības filtru.
   Izguve ir ierobežota ar atļauto sarakstu, kurā ietvertas tādu formu augšējā līmeņa daļas,
   ko `replaceImageParts` var ievietot atpakaļ (izguves↔aizstāšanas līgums): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` un Responses API `input_image`. Ligzdotas atbilstības un
   formas, kas satur tikai indikatorus, ir paredzētas kombināciju filtram un nekad netiek izgūtas.
   Izlaist, ja nekas nav atrasts.
3. Noteikt izpildlaika konfigurāciju, izmantojot `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): jaunajām `modalityBridge*`
   iestatījumu atslēgām ir priekšroka; mantotās `visionBridge*` atslēgas paliek kā **viena cikla
   atkāpšanās variants** (atritināšanas logs). Ja tilts ir atspējots, izlaist pirms jebkādas
   multivides šķērsošanas.
4. Režīma atlasītājs (`modalityBridgeVisionMode`, skatiet tabulu tālāk) nosaka
   novirzīšanu vai aprakstīšanu. Novirzīšana atgriež `modifiedPayload`, kurā nomainīts tikai `model`,
   kā arī metadatus `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprakstīšanas ceļš: ierobežot attēlu skaitu līdz `maxImages`, izveidot uzdevumam pielāgotu uzvedni,
   pārbaudīt aprakstu kešatmiņu, izsaukt attēlu atpazīšanas modeli **paralēli**
   (`Promise.allSettled`) un attēlu vietā ievietot teksta daļas
   `[Image N]: <description>`. Neizdevusies aprakstīšana dod rezultātu `null`, un sākotnējā attēla daļa tiek
   **saglabāta** (#4012) — izņemot kombinētās aprakstīšanas ceļu, kad visas
   aprakstīšanas ir bijušas neveiksmīgas; šādā gadījumā apstiprināta augšupējā sistēma bez attēlu atpazīšanas atbalsta tā vietā saņem
   aizstājējtekstu `(unavailable — no vision-capable provider connected)` (#8430).
6. Atgriezt `modifiedPayload` un metadatus (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režīma atlasītājs (`modalityBridgeVisionMode`)

| Režīms     | Noklusējums | Darbība                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Mantotā heiristika bez izmaiņām (#6640/#7204): modeļi, kas nav kombinēti/`auto/` modeļi, tiek novirzīti uz labāko attēlu atpazīšanas modeli, ja vien sākotnējam modelim jau nav izmantojamu akreditācijas datu (tad tiek veikta aprakstīšana); kombinētie mērķi vienmēr tiek aprakstīti.                                                                        |
| `describe` |             | Vienmēr aprakstīt — novirzīšanas bloks tiek pilnībā izlaists; vienmēr atbild lietotāja izvēlētais modelis.                                                                                                                                                                                                                                                      |
| `reroute`  |             | Piespiedu novirzīšana: akreditācijas datus ieguvušā modeļa saglabāšanas pārbaude tiek apieta. Novirzīšanas **mērķa** akreditācijas datu pārbaude joprojām tiek piemērota — ja nav pieejams izmantojams attēlu atpazīšanas mērķis, pieprasījums pāriet uz aprakstīšanu, lai neapstrādāti attēli nekad nenonāktu tikai tekstu atbalstošā aizmugursistēmā (#8430). |

Piespiedu režīmi veic īsslēguma atgriešanos **pirms** automātiskās heiristikas izpildes; `auto` darbība
baitu līmenī ir identiska aizsargmehānismam pirms PR-1.

#### Uzdevumam pielāgota aprakstīšanas uzvedne (`modalityBridgeVisionTaskAware`)

Pēc noklusējuma **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) bāzes
aprakstīšanas uzvednei pievieno **pēdējā lietotāja ziņojuma** tekstu (saīsinātu līdz 500 rakstzīmēm),
ievirzot aprakstu uz to, ko lietotājs faktiski jautāja
(codex-vision-proxy modelis), un lūdzot attēlu atpazīšanas modelim transkribēt redzamo
tekstu. Ja karodziņš ir izslēgts vai lietotāja teksta nav, bāzes uzvedne tiek izmantota bez izmaiņām.

Aprakstīšanas pašcilpas OpenAI saderīgais pieprasījums (`callVisionModelSingle()`
failā `visionBridgeHelpers.ts`) vienmēr pieprasa `image_url.detail: "high"` —
bez nosacījumiem, visiem izsaucējiem/pakalpojumu sniedzējiem un neatkarīgi no
jebkāda klienta signāla. Zemas detalizācijas paraugu ņemšana pasliktina OCR
precizitāti tieši šajā uzvednē pieprasītajam teksta transkripcijas uzdevumam,
tāpēc pats aprakstīšanas izsaukums vienmēr pieprasa augstu detalizāciju neatkarīgi
no sākotnējā ienākošā pieprasījuma izmantotā detalizācijas līmeņa. Tas ietekmē
tikai iekšējā aprakstīšanas pieprasījuma pamattekstu; tas nemaina veidu, kā
OmniRoute pārsūta izsaucēja paša `image_url.detail` primārajā pieprasījumā —
šī noklusējuma vērtība tiek piemērota atsevišķi un tikai noteiktajiem OpenCode
klientiem funkcijā `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Aprakstīšanas pašcilpas Anthropic
vadu formāta atzarā nav lauka `detail`, un neviens no šiem noklusējumiem to
neietekmē.

#### Apraksta izvades ierobežojums (`modalityBridgeVisionMaxChars`)

| Atslēga                        | Noklusējums | Diapazons         |
| ------------------------------ | ----------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` vai 100–50000 |

`0` (noklusējums) nozīmē **bez ierobežojuma** — funkcijas
`callVisionModel()` atgrieztais apraksts tiek nodots tālāk bez izmaiņām,
saglabājot esošo darbību. Jebkura vērtība diapazonā 100–50000 saīsina aprakstu
un pievieno tam sufiksu `…`, pirms tas tiek ievietots atpakaļ formā
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` failā
`src/lib/guardrails/visionBridge.ts`). Palieliniet šo vērtību OCR uzdevumiem ar
augstu detalizācijas pakāpi, kuros pakārtotajam modelim nepieciešama pilna
transkripcija; samaziniet to, lai ierobežotu tokenu patēriņu runīgiem redzes
modeļiem. Informācijas paneļa lauks atrodas cilnes Vision panelī Advanced
(`modality-bridge-max-chars` failā `ModalityBridgeVisionTab.tsx`) un jebkuru
vērtību no 1 līdz 99 palielina līdz minimālajai vērtībai 100, vienlaikus
atstājot skaidri norādītu `0` nemainītu — `0` pati par sevi ir derīga Zod
vērtība (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nevis
tikai noklusējums “nav iestatīts”.

#### Aprakstu kešatmiņa (`modalityBridge/bridgeCache.ts`)

Procesa mērogā koplietota atmiņas LRU + TTL kešatmiņa aprakstu izvadēm.
Atslēga = `sha256(imageRef + composedPrompt + configuredBridgeModel)` ar
garuma prefiksa kadrēšanu (bez lauku robežu kolīzijām). Modeļa komponents ir
**konfigurētais** tilta modelis, nevis modelis, kas faktiski sniedza atbildi —
`callVisionModel` var iekšēji izmantot rezerves modeli, un atslēgas izveide
katram mēģinājumam sadrumstalotu kešatmiņu. Neizdevušies aprakstīšanas
izsaukumi nekad netiek ievietoti kešatmiņā. Iestatījumi:

| Atslēga                         | Noklusējums | Diapazons |
| ------------------------------- | ----------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`      | —         |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000   |

#### Attālo attēlu normalizēšana (pašcilpas aprakstīšana/base64 izgūšana)

Kad tilts pats izgūst **attālu** attēlu — Anthropic aprakstīšanas pašizsaukumam
un claude vadu formāta base64 konvertēšanai
(`ensureBase64ImagesForClaudeWire`), abos gadījumos izmantojot
`fetchRemoteImageAsDataUri()` failā `visionBridgeHelpers.ts` — iegūtais datu
URI tiek apstrādāts ar `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`), pirms tas tiek iegults redzes modeļa
pieprasījumā. Pārāk lieli attēli tiek samazināti līdz **2048px garākajai
malai** (atbilstoši izmēra ierobežojumam, ko OpenAI/Anthropic jau piemēro
servera pusē), tādējādi samazinot augšupielādes baitu skaitu/latentumu,
nemainot to, ko redz redzes modelis. Izmēru maiņai tiek izmantota pakotne
`sharp`, kas tiek ielādēta ar dinamisku importēšanu: platformā, kurā tās
vietējo bināro failu neizdodas ielādēt, `normalizeDataUri()` **nekad neizmet
izņēmumu** — tā izmanto sākotnējo baitu tiešu pārsūtīšanu, tāpēc
aprakstīšanas/base64 konvertēšanas ceļš vienmēr turpina darboties. Baiti, kas
nav attēls (izgūšana nav atgriezusi dekodējamu attēlu), arī tiek nodoti tālāk
bez izmaiņām. Šī normalizēšana attiecas tikai uz attēliem, kurus tilts izgūst
savam pašizsaukumam — tā nekad netiek piemērota izsaucēja tieši pārsūtītajai
neapstrādātajai slodzei, ievērojot principu, ka izmaiņas veicamas tikai pēc
izvēles (stingrais noteikums #20).

#### Iestatījumu shēma + migrācija

Jaunās `modalityBridge*` atslēgas tiek validētas ar Zod shēmā
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` trijotne un Audio Bridge izmantotā
`modalityBridgeAudio*` grupa. Migrācija `141_modality_bridge_settings.sql`
kopē esošās mantotās `visionBridge*` vērtības uz atbilstošajām jaunajām
atslēgām (idempotenti, nekad nepārrakstot operatora iestatītu
`modalityBridge*` vērtību); mantotās atslēgas vienu laidiena ciklu joprojām
tiek pieņemtas kā lasīšanas rezerves variants.

#### Caurspīdīguma galvene + statistika

Aprakstīšanas rezultātā pārveidotajām atbildēm ir galvene
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(to izveido `buildModalityBridgeHeader()` failā
`modalityBridge/bridgeStats.ts`, un pievieno `withModalityBridgeHeader()`
failā `src/sse/handlers/chatHelpers.ts`). Pārmaršrutētie pieprasījumi
**nesaņem** galveni — slodze netika mainīta, un modeļa maiņa jau ir redzama
atbildes pamatteksta laukā `model`.

`GET /api/modality-bridge/stats` (pārvaldības autentifikācija, tāds pats
līmenis kā `GET /api/settings`) atgriež atmiņā glabātos katras modalitātes
skaitītājus `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modalitātēm `vision`, `audio`
un `video`. `averageLatencyMs` saucēju veido `latencySamples`, nevis visi
mēģinājumi; darbība bez laika mērījuma nerada mākslīgu nulles milisekunžu
paraugu. `bridged` joprojām ir ar iepriekšējām versijām saderīgs sekmīgo
konvertēšanu aizstājvārds; neizdevušies mēģinājumi to nepalielina.
Skaitītāji pēc procesa restartēšanas pēc konstrukcijas tiek atiestatīti
(telemetrija, nevis uzskaite).

#### Informācijas paneļa konfigurācija

Īpašā informācijas paneļa lapa ir
`/dashboard/settings/modality-bridge`. Tās ar URL adresējamās cilnes `Vision`, `Audio`
un `Video`, pārslēdzot `tab` vērtību, saglabā vaicājuma parametrus.
Cilne Vision nodrošina iespējošanu, režīmu, modeļa izvēli (tostarp automātisko
noklusējumu), uzdevumam pielāgotas uzvednes, papildu taimauta/attēla/apraksta garuma/kešatmiņas
ierobežojumus, izpildlaika
skaitītājus un aizsargātu parauga pieprasījumu. Arī cilne Audio ir aktīva: tā nodrošina
iespējošanu, tikai STT paredzētu modeļa atlasītāju ar opciju Auto, taimauta/maksimālā klipa ierobežojumus, audio
skaitītājus un `input_audio` parauga testu. Cilne Video ir funkcionāla: tā ziņo
par FFmpeg/ffprobe izpildlaika stāvokli — vienu no četriem skaidri definētiem lietotāja saskarnes stāvokļiem (`unknown`, kamēr
pārbaude notiek vai to nevarēja pabeigt, `restricted`, ja informācijas paneļa resursdators nav atgriezeniskās cilpas
resursdators un pārbaude tiek izlaista klienta pusē, `unavailable`, kad pārbaude ir pabeigta
un prombūtne apstiprināta, vai `available` ar FFmpeg/ffprobe versijām) — saglabā
iespējošanas/modeļa/kadru/video/taimauta ierobežojumus, filtrē modeļu atlasītāju, atstājot modeļus ar
vizuālās apstrādes iespējām, un nodrošina video skaitītājus.

Iepriekšējā Vision Bridge kartīte AI iestatījumos ir saderības saite uz
jauno lapu; tā vairs neuztur otru veidlapas kopiju. Media Providers sadaļa arī
saista Image-to-Text un Speech-to-Text darbplūsmas ar attiecīgajām Modality
Bridge cilnēm, nenoņemot esošo Speech-to-Text izmēģinājumu vidi.

**Pašcilpas piekļuves pārbaudes apiešana:** kad aprakstīšanas izsaukums tiek maršrutēts caur OmniRoute
paša `/v1` pašcilpu (nestandarta nodrošinātāja modelis), apakšpieprasījums nosūta
`x-omniroute-admission-bypass: internal` un tiek autentificēts ar atrisināto
pašcilpas akreditācijas informāciju — lokālo `sk_omniroute` aizstājējvērtību lokālajā režīmā vai
operatora konfigurēto `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` vides atslēgu (#1350), lai
izvietojumi ar `REQUIRE_API_KEY=true` joprojām varētu izpildīt aprakstīšanas izsaukumu. Apiešana
tiek atļauta tikai šai precīzajai akreditācijas informācijai, tāpēc ārējie klienti nevar izmantot
galveni, lai izlaistu piekļuves pārbaudi.

Mantotās noklusējuma vērtības atrodas `src/shared/constants/visionBridgeDefaults.ts`;
jaunā režīma/uzdevumam pielāgoto/kešatmiņas noklusējuma vērtības un iestatījumu atrisinātājs atrodas
`src/shared/constants/modalityBridgeDefaults.ts`. Aizsargmehānisms nodrošina
`deps` konstruktora opciju, lai testi varētu ievadīt viltotas `getSettings` un
`callVisionModel` implementācijas.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Pārtver tērzēšanas pieprasījumus, kuros ir audio, pirms tie sasniedz mērķi, par kuru nav
zināms, ka tas pieņem audio ievadi. Tas nekad nemaina tērzēšanas pieprasījuma maršrutu: audio daļas tiek
transkribētas, izmantojot esošo ar OpenAI saderīgo vairāku daļu galapunktu, un
izvēlētais tērzēšanas modelis turpina darbu ar teksta transkripcijām.

Plūsma:

1. Atrisināt `supportsAudio`, izmantojot `getResolvedModelCapabilities()`. Prioritāte ir skaidri norādītiem
   nodrošinātāju reģistra metadatiem, pēc tam statiskajiem modeļa metadatiem un tad sinhronizētajam
   `modalities_input`. Deklarēts ievades saraksts bez `audio` dod `false`; ja nav
   iespēju apliecinošu datu, rezultāts ir `null`. Gan `false`, gan `null` aktivizē
   konservatīvo tiltu, savukārt `true` to apiet.
2. Atrisināt `modalityBridgeAudio*` iestatījumus un, izmantojot koplietoto `detectMediaParts()`
   detektoru, iegūt savienojamas augstākā līmeņa
   audio daļas no katra ziņojuma. Atbalstītie pārraides formāti ir OpenAI `input_audio`, `audio_url` un
   `source.media_type: "audio/*"`. Ligzdots audio tiek noteikts maršrutēšanai, taču
   savienošanas ceļš to nenoņem. Darba apjomu ierobežo `modalityBridgeAudioMaxClips`;
   vēlākās daļas paliek neskartas.
3. Izmantot konfigurēto `provider/model` vai ļaut `selectAudioBridgeModel()` funkcijai stabilā
   kataloga secībā iziet cauri `AUDIO_TRANSCRIPTION_PROVIDERS` un atlasīt pirmo
   modeli ar izmantojamu aktīva nodrošinātāja akreditācijas informāciju.
4. `callAudioTranscription()` pārveido base64/data-URI audio par vairāku daļu
   `file` vai lejupielādē attālu `audio_url`, izmantojot tikai publiskiem resursiem paredzēto izejošo savienojumu
   aizsargmehānismu ar DNS piesaisti un 25 MB ierobežojumu. Pēc tam tas ar POST nosūta failu un atlasīto
   modeli uz lokālo `/v1/audio/transcriptions` pašcilpu, autentificējoties ar
   `resolveSelfLoopBearer()`. Esošais transkripcijas maršruts veic parasto
   akreditācijas informācijas uzmeklēšanu, pārtraukuma/rādītāja ierobežojumu apstrādi un nosūtīšanu nodrošinātājam.
5. Veiksmīgi izsaukumi aizstāj attiecīgās daļas ar `[Audio N]: <transcript>`. Izsaukumi
   tiek izpildīti ar `Promise.allSettled`: atsevišķa kļūme saglabā sākotnējo
   audio daļu (#4012 līgums). Ja visi izsaukumi neizdodas un ir pierādīts, ka mērķim
   `supportsAudio === false`, daļas kļūst par
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 līgums). Ja
   mērķis nav zināms (`null`), visu izsaukumu kļūmes gadījumā saturs paliek neskarts. Pierādīts
   tikai teksta mērķis bez izmantojamas STT akreditācijas informācijas saņem to pašu skaidro
   aizstājējtekstu, neveicot tīkla izsaukumu.

Veiksmīgās transkripcijas izmanto visa procesa kopīgo Modality Bridge LRU/TTL kešatmiņu.
Atslēga apvieno audio atsauci, stabilo `audio-transcription` operācijas
etiķeti un atlasīto STT modeli; kļūmes nekad netiek saglabātas kešatmiņā. Audio mēģinājumi atjaunina
koplietotos `bridged`, `cacheHits`, `failures` un `lastUsedAt` skaitītājus.
Pārveidotajās atbildēs ir
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; neskarti
pieprasījumi nesaņem Audio Bridge segmentu.

Izpildlaika iestatījumi tiek glabāti DB un validēti ar Zod:

| Atslēga                       | Noklusējums | Diapazons       |
| ----------------------------- | ----------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —               |
| `modalityBridgeAudioModel`    | `""`        | Auto vai STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10            |

Koplietoto kešatmiņu joprojām kontrolē `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` un `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Pārtver augstākā līmeņa video daļas Chat Completions `messages` un Responses
API `input`, pirms tiek izsaukts mērķis, kuram nav zināms iebūvēts video atbalsts.
Atbalstītie formāti ir `input_video`, `video_url`, `video_source`, HTTPS URL
un `data:video/*;base64,...` datu URI. Vienkārši failu nosaukumi tekstā netiek uzskatīti
par video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) pārvalda pieprasījuma struktūras pārstaigāšanu,
iespēju/politikas pārbaudi, katra pieprasījuma apkopošanu un atbildes lietderīgo slodzi.
Katra video apstrāde — iegūšana, visa rezultāta kešatmiņa, kadru
secības aprakstīšana (apvienojot to ar jebkuru izsaucēja deklarētu audio transkripciju),
kā arī katra mēģinājuma metrika/pārtraukšana/tīrīšana — ir paslēpta aiz `processVideoPart`
modulī `videoBridgePipeline.ts`, kas tiek izsaukts vienreiz katrai video daļai `preCall`
ciklā. Šis modulis definē arī skaidras portu robežas `VideoMediaBrokerPort`
(baitu iegūšanai un atlasīto kadru izvilkšanai), `VideoAudioTranscriptionPort`
(izsaucēja deklarētas audio transkripcijas apvienošanai ar atlasīto kadru aprakstiem) un
`VideoDrilldownPort` (kadru detalizācijas saglabāšanas robežu; tā vēl nav savienota
ar `processVideoPart` — pašlaik detalizācijas ierakstus raksta tikai atsevišķais
`/api/modality-bridge/video/drilldown` maršruts).

Publiskais `/v1` pieprasījuma ceļš nekad neimportē un neizsauc apakšprocesu. Attālie
video tiek lejupielādēti ar 50 MiB ierobežojumu; iekļautajiem base64 video ir
konservatīvs 36 MiB dekodētā apjoma ierobežojums katram video, lai modeļa/ziņojumu/kadrēšanas
apvalks varētu palikt publiskā JSON pieprasījumu pieņemšanas 50 MiB ierobežojuma robežās. Iekļautā
satura garums un aplēstais dekodētais izmērs tiek pārbaudīts pirms atmiņas piešķiršanas. Sākotnējam
attālajam URL un katrai pāradresācijai ir obligāts HTTPS, izmantojot esošo
izejošo savienojumu aizsargmehānismu, kas atļauj tikai publiskas adreses un izmanto DNS piesaisti. Pēc tam baiti šķērso precīzi definēto iekšējo
`POST /api/modality-bridge/video/extract` starpnieka robežu. Šis maršruts ir gan
`LOCAL_ONLY`, gan `SPAWN_CAPABLE`, pieņem tikai katram procesam autentificētu,
uzticamu lokālās cilpas pieprasījumu un nekad nepieņem URL, failu sistēmas ceļu, izpildāmu failu
vai argumentu sarakstu. API ķermeņa izmēra apstrādes konveijers un apstrādātāja inkrementālais ķermeņa
lasītājs neatkarīgi nodrošina starpnieka ievades 50 MiB ierobežojumu. Tā ierobežotā rinda vienlaikus
izpilda vienu izvilkšanu, atļauj četrus gaidošus darbus un ierobežo gaidošās ievades
apjomu līdz 100 MiB.

Starpnieka iekšienē `ffprobe` nolasa privātu lokālo failu; fiksētais formātu
atļauto vērtību saraksts izslēdz atskaņošanas sarakstu un manifestu formātus. Atļautajiem MOV saimes
konteineriem ārējās MOV datu atsauces pēc noklusējuma paliek atspējotas, un
fiksētā komanda tās neiespējo. Gan `ffprobe`, gan `ffmpeg` izmanto tikai
`file` protokolu atļauto vērtību sarakstu, vienu pavedienu, fiksētus argumentu masīvus, neizmanto čaulu,
un izpildāmie faili tiek atrasti no `PATH`. Pievienoto vāka attēlu straumes netiek uzskatītas
par atskaņojamām kandidātēm. Visām atskaņojamajām straumēm jāatbilst ierobežojumiem, un
pirms deterministiskas straumes ar zemāko indeksu izvēles tiek dota priekšroka skaidri norādītai noklusējuma
straumei. Video garums ir ierobežots līdz 600 sekundēm, katra dimensija — līdz 8,192 pikseļiem, bet
avota pikseļu skaits — līdz 33,554,432. FFmpeg atlasa 1–16 viduspunkta JPEG kadrus, samazina
garāko malu līdz ne vairāk kā 1,024 pikseļiem, nepalielinot mazākus ievades attēlus, un
nekad nesaņem URL. Pēc noklusējuma atlases politika ir `uniform`. Izvēles
`scene_aware` un eksperimentālā `segment_aware` politika veic vienu papildu
fiksētu FFmpeg laidienu pār jau validēto lokālo straumi, atlasa ierobežotu skaitu
`showinfo` ainu laikspiedolu un deterministiski atkāpjas uz tiem pašiem
vienmērīgajiem viduspunktiem, ja detektors kļūdās, iestājas noildze, izvade ir nederīga vai kandidātu
kopa ir tukša. Segmentu apzinošais režīms sadala viduspunktu paraugus proporcionāli
validētajiem ainu intervāliem; segmentu apzinošā režīma pierādījumi un atkāpšanās darbība ir
detalizēti aprakstīta tālāk. Stingrais 16 kadru ierobežojums
tiek piemērots pēc atlases visām politikām. Ja ainu apzinošam pieprasījumam ir tikai
viena kadra budžets, tas izmanto aktīvā pilnā video vai fokusa loga vienmērīgo viduspunktu
un ziņo `policyEffective: uniform`: viens atlasīts ainas kadrs
nevar saglabāt abus laika diapazona galus. Izsaucējs pēc izvēles var norādīt
galīgu fokusa logu (`start`/`end` sekundēs); robežas tiek ierobežotas līdz multivides
ilguma robežām, apgriezti vai negalīgi logi tiek noraidīti, un visas atlases
politikas tiek izpildītas tikai normalizētajā intervālā. Iegūtais
logs tiek iekļauts atlases metadatos un neuzticamajā apraksta
prefiksā, lai pakārtotie modeļi varētu atšķirt fokusētu fragmentu no pilnās
laika skalas.

Semantiskais aprakstu fokuss ir atsevišķs, skaidri norādāms iestatījums. Noklusējuma `full`
analīzes režīms saglabā esošo kadru uzvedni un nekad nepārsūta pieprasījuma
tekstu aprakstu modelim. Režīmā `focused` tilts nolasa tikai jaunāko
netukšo lietotāja izveidoto `text`/`input_text` no tā paša Chat vai Responses
konteinera, normalizē to NFC formā, apvieno vadības rakstzīmes un atstarpes
un ierobežo līdz 500 Unicode koda punktiem. Tukšs rezultāts liek atkāpties uz
precīzu `full` uzvedni. Izmantojams norādījums tiek serializēts kā JSON īpašā
neuzticama lietotāja konteksta blokā un drīkst tikai noteikt novērojamo detaļu prioritāti; tas
nevar ignorēt atsevišķo brīdinājumu nesekot norādījumiem, kas ir redzami
vai dzirdami multividē. Tekstuālais fokuss nekad neizsecina `start`/`end` un nemaina
laika atlases mehānismu.

#### FU-07 strukturālie segmentu pierādījumi

`segment_aware` izmanto vienu ierobežotu iepriekšējās analīzes laidienu pār jau validēto
lokālo video straumi. Fiksētā filtru ķēde vispirms samazina platumu līdz ne vairāk kā 320 pikseļiem,
nosaka ainu maiņas un iesaldētus intervālus un pēc tam atlasa 1 kadru sekundē, lai noteiktu
izplūdumu, vidējo spilgtumu un telpisko/laika informāciju. Laidiens ir
ierobežots līdz 600 strukturālajiem paraugiem, vienam FFmpeg/filtra pavedienam, tam pašam
tikai `file` protokolu un konteineru atļauto vērtību sarakstam, 1 MiB procesa izvades ierobežojumam
un ne vairāk kā 30 sekundēm starpnieka kopīgajā pārtraukšanas/termiņa mehānismā. Tas nekad
nepieņem komandu, filtru, ceļu vai URL no pieprasījuma.

Strukturālās vērtības ir deterministiskas iztveršanas pazīmes, nevis semantiska video
izpratne. Tās nenosaka subjektus, darbības, parakstus, runu vai lietotāja
nodomu. Ainu un sastinguma robežas veido segmentus; sastinguma pārklājums, izplūdums,
ekspozīcija, telpiskā detalizācija un izmaiņas laikā ietekmē tikai to, kā tiek sadalīts esošais
1–16 kadru budžets. Pilnībā sastingušam segmentam ir noteikts viena kadra ierobežojums,
savukārt nesastingušie segmenti sacenšas par atlikušo budžetu. Ja robežu
ir vairāk nekā kadru, tiek saglabāts vienmērīgs laika skalas pārklājums, lai strauji agrīnie griezumi
nevarētu paslēpt garu noslēdzošo segmentu. Ainu robežas, kas atrodas 1 sekundes
analīzes izšķirtspējas robežās no sastinguma robežas, tiek apvienotas.

Ja trūkst filtru, pazīmes ir nepareizi formatētas vai tukšas, rodas detektora kļūda vai tiek sasniegts ierobežotais
priekšanalīzes taimauts, sistēma droši atkāpjas uz precīzu vienmērīgu viduspunktu politiku. Zvanītāja
atcelšana vai brokera termiņa beigšanās neizraisa šādu atkāpšanos: tā pārtrauc izpildē esošo
apakšprocesu, novērš turpmāku kadru izgūšanu, un privātais pagaidu direktoriju koks tiek
noņemts blokā `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` ģenerē deterministiskas, reālas FFmpeg
testa sagataves parakstu izsaukumu ietaupījuma novērtēšanai pēc dublikātu noņemšanas, blīvas kustības budžeta sadalei,
izplūduma/ekspozīcijas/SI-TI pazīmēm, straujiem griezumiem ar garu beigu posmu un pakāpeniskas izdzišanas
kļūdaini pozitīviem rezultātiem. Tas reģistrē priekšanalīzes izpildes laiku un, ja ir pieejams `/usr/bin/time`,
apakšprocesa CPU patēriņu un maksimālo RSS. Tā kvalitātes pārbaudes ir tikai strukturāli orākuli.
Reālā parakstu modeļa kvalitātes statuss paliek `HOLD`, jo šim testēšanas ietvaram nav
autorizēta galapunkta vai fiksēta vērtētāja. Arī finansiālā ietaupījuma statuss paliek `HOLD`,
ja vien `--caption-cost-per-call-usd` nenorāda skaidru pozitīvu vienas izsaukuma reizes
izmaksu aplēsi; skripts nekad neizdomā nevienu no šiem rezultātiem.

Katra kadra apjoms ir ierobežots līdz 4 MiB, visu neapstrādāto kadru kopējais apjoms — līdz 23 MiB, bet
serializētā brokera atbilde — līdz 32 MiB. Privāts pagaidu direktorijs tiek noņemts
blokā `finally`. OmniRoute neiekļauj FFmpeg komplektācijā un nepieņem pielāgotu
izpildāmā faila ceļu. Pirms parakstu ģenerēšanas tilts veic konservatīvu vizuālo
dublikātu noņemšanu: katrs JPEG tiek samazināts līdz 16×16 pelēktoņu buferim un
salīdzināts tikai ar pēdējo saglabāto kadru. Ja pieprasītais parakstu budžets
pārsniedz vienu kadru, izgūšana nodrošina ierobežotu kandidātu kopu, kas nepārsniedz
divkāršu budžetu un nekad nav lielāka par 16 kadriem.
Pieprasītais ierobežojums tiek piemērots tikai pēc dublikātu noņemšanas; ja budžets ir vismaz
divi kadri, galīgās retināšanas laikā tiek saglabāti pirmais un pēdējais
atlasītais kandidāts. Versijotā
`grayscale-16x16-mean-cells-v2` politika izmanto lielāko vērtību no vidējās spilgtuma deltas un
to sīktēla šūnu īpatsvara, kuru normalizētā delta ir vismaz 0.05.
Dublikātu slieksnis ir konstante 0.04, kas izvēlēta prognozējamības dēļ, nevis
piedāvāta kā izpildlaika iestatījums. Šis sekundārais
augsta kontrasta signāls saglabā nelielas kustības un redzama teksta izmaiņas, ko
salīdzinājums tikai pēc vidējās vērtības var nepamanīt. Salīdzinātāja vai dekodētāja kļūdu gadījumā sistēma droši
saglabā pārklājumu. Izvades metadati atsevišķi uzrāda izgūtos kandidātus, veiksmīgi izmantotos
kadrus un atmestos vizuālos dublikātus.

Skaidri atzīmēta video daļa var pieprasīt kontaktlapu ar laika zīmogiem.
Tilts izveido JPEG režģi ar ne vairāk kā 4 kolonnām un 16 kadriem. Katra 512 pikseļu šūna
iegulda avota laika zīmogu augsta kontrasta apakšējā joslā, bet tie paši laika zīmogi
tiek saglabāti arī teksta metadatos turpmākai sasaistīšanai un auditēšanai. Pilnā
JPEG apjoms joprojām ir ierobežots līdz 32 MiB. Ja `sharp` nevar dekodēt vai izveidot režģi,
tilts atkāpjas uz atsevišķajiem JPEG kadriem; klienta atcelšana joprojām tiek nodota
kontaktlapas operācijai.

Izlaišanai nepieciešamie pierādījumi ir apzināti nodalīti no sintētiskā kompozīcijas
mikroetalonmērījuma. `scripts/perf/video-bridge-contact-sheet-eval.ts` definē
ar shēmas versiju apzīmētu A/B testēšanas ietvaru reāliem ar OpenAI saderīgiem redzes modeļiem. Tas mēra
pakalpojuma sniedzēja uzrādīto marķieru skaitu, pilno latentumu (iekļaujot kontaktlapas izveidi),
modeļa izsaukumu skaitu un manifestā definēto faktu saglabāšanu. Neapstrādātās modeļa atbildes
netiek ierakstītas pārskatā; tiek saglabāti tikai SHA-256 kontrolsummu kopsavilkumi un atbilstošo faktu ID.
Testēšanas ietvars neveic tīkla vai maksas modeļa izsaukumus, ja vien nav norādīts `--execute-real` un
konfigurēti `--model`, `OMNIROUTE_BASE_URL` un `OMNIROUTE_API_KEY`. Bez
šādas skaidri pieprasītas reālas izpildes tā mašīnlasāmais spriedums paliek `HOLD`; tikai sintētiski
lietderīgās slodzes vai izsaukumu skaita mērījumi nav pierādījums izlaišanai.

Zvanītāji var atbalstītai video daļai pievienot neobligātu `transcript.cues` masīvu,
ja tiem jau ir pieejams sinhronizēts teksts. Katrai norādei jāsatur `text`, galīgs
`start`/`end` intervāls pārbaudītā ilguma robežās un baltajā sarakstā iekļauts
`source` (`client`, `embedded` vai `audio-bridge`); `confidence` noklusējuma vērtība ir
`1`, un tai jāpaliek robežās no `0` līdz `1`. Pilnīgi identiskas norādes tiek apvienotas.
OmniRoute nekad neuzsāk transkripciju, pamatojoties uz šiem metadatiem: validētās norādes tiek
iekopētas aprakstītajā rezultātā kopā ar avotu, ticamību un intervālu un
attēlotas kā neuzticami novērojumi līdzās kadru parakstiem. Nederīgs,
ārpus diapazona esošs teksts vai teksts bez izcelsmes informācijas tiek noraidīts, nevis iekļauts
parakstu plūsmā. Lauku `source` pašlaik deklarē zvanītājs, un serveris to
nepārbauda: OmniRoute nodrošina, ka vērtība ir viena no trim
atļautajām virknēm, taču vēl kriptogrāfiski neapstiprina, ka
`embedded` vai `audio-bridge` etiķete tiešām nāk no serverim piederošas
izgūšanas. Līdz šādas pārbaudes ieviešanai uzskatiet `source` par neuzticamu norādi;
nebalstiet uz to autorizācijas lēmumus.

Pieredzējis izsaucējs tam pašam video var nodrošināt jau autorizētu `audioTranscript` celiņu. Apvienošanas slānis apstrādā vizuālos un audio novērojumus ar vienu izpildes termiņu un pārtraukšanas signālu, sakārto tos kopīgā laika skalā, apvieno pilnīgi identiskus dublikātus un ziņo daļēju rezultātu, ja izdodas tikai viena puse. Nederīgs `audioTranscript` tiek pazemināts līdz šādam daļējam rezultātam — vizuālais apraksts tiek saglabāts, bet audio zars reģistrē sanitizētu kļūmes kodu — tā vietā, lai izraisītu visa video apstrādes kļūmi. Rezultātā tiek saglabāta katra zara pieejamība, daļēja rezultāta karodziņš un sanitizētie kļūmju kodi; tie tiek saglabāti arī aizsargmehānisma metadatos (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), rezultātu kešatmiņas metadatos un tilta apvienošanas skaitītājos. Noklusējuma Video Bridge ceļš neizsauc runas pārveidošanu tekstā un nelejupielādē otru multivides kopiju; bez šī skaidri norādītā celiņa tas turpina darboties tikai ar video.

**Transkripta saglabāšana (#12150 P1).** Tas tiek piemērots automātiski ikreiz, kad Video Bridge (kas pats par sevi ir izvēles iespēja) atveido transkripta norādi — atsevišķa saglabāšanas karodziņa nav. Kad pieprasījumā tiek atveidota jebkāda transkripta norāde (izsaucēja deklarēts `transcript` vai apvienots `audioTranscript`), aizsargmehānisms to atzīmē kā `videoBridgeObserved` un izveido rediģētu video apraksta ēnkopiju — identisku atveidojumu, kurā katras norādes brīvā teksta saturs ir aizstāts ar `[redacted-video-transcript]`; tas tiek izveidots, aizstājot strukturētās norādes lauku pirms virknes salikšanas (nekad neparsējot saplacināto tekstu, tādēļ nekāds norādes saturs — nedz ļaunprātīgs, nedz parasts, tostarp saturs ar `]`, piemēram, `[inaudible]`/`[music]` — nevar saglabāties). Saglabātajā izsaukuma žurnāla pieprasījuma pamattekstā katra no video atvasinātā teksta daļa tiek aizstāta ar šo rediģēto ēnkopiju, veicot atbilstības pārbaudi pēc satura vienādības; enkurs `fullText` tiek atkārtoti nolasīts no pabeigtās pirmsizsaukuma aizsargmehānisma slodzes, tādēļ atbilstības noteikšana joprojām izdodas arī pēc tam, kad vēlākie ķēdes aizsargmehānismi (PII un akreditācijas datu maskētāji ar prioritātēm 10/95) pārraksta apraksta tekstu uz vietas, kā arī pēc tam, kad sistēmas uzvednes, nodošanas vai atmiņas ievietošana pārveido ziņojumu masīvu. Modelim augšup nosūtītais pamatteksts netiek mainīts. Novērots pieprasījums arī neaizpilda pastāvīgo Memory (tiek izlaista gan no pieprasījuma, gan no atbildes atvasinātā izgūšana), tādēļ paša modeļa atbilde nevar atkārtoti ierakstīt transkripta tekstu Memory.

Joprojām atvērtās saglabāšanas virsmas, kas reģistrētas turpmākam darbam (**P2**, #12430): neapstrādātais klienta pieprasījuma momentuzņēmums pirms aizsargmehānisma detalizētā žurnāla artefaktā; `previous_response_id` turpinājuma droša noraidīšana kļūmes gadījumā; no atvasinātām uzvednēm izrietošas iekšējās nosūtīšanas, kas iegulda transkriptu sintezētā virknes uzvednē (konveijera posmi, konteksta nodošana); kā arī tādas modeļa atbildes atbildes pamatteksts un semantiskās kešatmiņas kopija, kurā citēts transkripts. Tās ir neapstrādātu datu/atbilžu klases vai izvēles virsmas ārpus P1 saglabātā pieprasījuma pamatteksta un Memory tvēruma.

Iekšējais `/api/modality-bridge/video/drilldown` dzīves cikls ir atsevišķs, ar atgriezenisko savienojumu un pilnvaru autentifikāciju aizsargāts kešatmiņas substrāts. Katrai darbībai ir nepieciešams arī kanonisks necaurredzams principāla ID. Pirms tiek iespējots ražošanas izsaucējs, tam šis ID ir jāatvasina no autentificētā nomnieka, un tas nekad nedrīkst pārsūtīt klienta izvēlētu vērtību. Kešatmiņas atslēgas saista šo principālu ar kanoniskiem sesijas un video atsauces ID, glabā tikai to no SHA-256 atvasinātās atslēgas un ierobežo gan lasīšanu, gan dzēšanu ar to pašu principālu. Katram ierakstam kešatmiņā tiek glabāti ne vairāk kā 16 atvasināti JPEG kadri, tie zaudē derīgumu pēc desmit minūtēm, un tiek atbalstīti ierobežoti `start`/`end` lasījumi vai tieša sesijas dzēšana.

Katram principālam ir noteikts 16 ierakstu un 64 MiB kanonisko JPEG datu ierobežojums. Šie ierobežojumi nav atkarīgi no globālā 64 ierakstu/256 MiB maksimuma: principāla kvotas pārsnieguma gadījumā vispirms tiek izstumti tikai attiecīgā principāla visilgāk neizmantotie ieraksti, un tikai pēc tam tiek apsvērta globālā LRU izstumšana. Kešatmiņas darbības laikā ieraksti ar beigušos derīguma termiņu tiek izņemti gan no principāla, gan globālās uzskaites, savukārt atcelšanas vai validācijas kļūmes gadījumā daļējs aizstājējs netiek fiksēts.

Kešatmiņa noraida nekanonisku Base64, pārmērīgu aizpildījumu, multividi, kas nav JPEG, bojātus vai aprautus JPEG, kā arī JPEG, kas ierobežotas pilna attēla `sharp` dekodēšanas laikā rada brīdinājumu. Katrs pieņemtais attēls tiek atkārtoti kodēts kā kanonisks JPEG; platums un augstums tiek iegūts no dekodētajiem baitiem, nevis uzticoties izsaucēja laukiem, un visi beigu poliglota baiti tiek atmesti, nevis saglabāti. Abās kvotās tiek ieskaitīts tikai ierobežotais kanoniskais saspiestais buferis. JSON pārraides ierobežojums ietver Base64 papildu apjomu 32 MiB dekodētās ievades maksimumam. Katrs
saglabātais atvasinājums reģistrē tā validēto JPEG formātu/izšķirtspēju, iztveršanas politiku, atvasinājuma versiju, izveides laiku, servera aprēķināto satura jaucējkodu un jaukto vecākobjekta atsauci kopā ar uzticamā izsaucēja vecākobjekta satura jaucējkodu. Atcelšana tiek pārbaudīta starp asinhronās dekodēšanas/jaucējkoda aprēķināšanas fāzēm pirms atomāras fiksēšanas kešatmiņā.

Šajā laidienā maršrutam vēl nav pievienots ražošanas producents un netiek nodrošināta vairāku izšķirtspēju variantu atlase. Tādēļ caurspīdīgais Video Bridge pieprasījuma ceļš nerada papildu darba slodzi, savukārt nomniekam piesaistīta principāla atvasināšana un pilnais FU-08 vairāku izšķirtspēju dzīves cikls joprojām ir nepārprotami turpmāk veicami darbi, nevis dokumentēta, pilnībā pabeigta funkcionalitāte.

Kadri tiek secīgi aprakstīti ar konfigurēto Video modeli. Tukša
Video pārdefinēšanas vērtība pārmanto Vision iestatījumu; ja abi ir tukši, Vision
automātiskais maršrutētājs atlasa faktisko modeli ar attēlu apstrādes atbalstu. Veiksmīgi izveidoti apraksti
aizstāj sākotnējo daļu ar stabilu prefiksu `[Video apraksts:`, kas arī
atzīmē tekstu kā neuzticamu, no multivides iegūtu novērojumu un norāda pakārtotajiem
modeļiem nesekot multividē atrastajām instrukcijām. Kadru aprakstu kešatmiņas atslēgas
ietver JPEG baitus, uzvedni, laikspiedolu un faktisko modeli; kešatmiņā tiek saglabāti tikai
veiksmīgi apraksti. Kešatmiņas ieraksti saglabā faktisko veiksmīgi izmantoto izveidotāja modeli,
tostarp rezerves modeli; tilts ziņo `mixed`, ja dažādus kadrus
izveidojuši dažādi modeļi. Kešatmiņas trāpījums atkārtoti izmanto šī izveidotāja identitāti,
nevis pārdēvē to atbilstoši pieprasītajam maršrutēšanas plānam. Visa video rezultātu
kešatmiņas atslēga ietver katru ievadi, kas maina izvadi — uzvedni, faktisko
modeli, iztveršanas politiku, kadru skaitu, semantiskās analīzes režīmu, normalizētā
fokusa mājiena SHA-256 kontrolsummu, fokusa logu, `transcript`,
`audioTranscript` un kontaktlapas karogu — tāpēc jebkuras no šīm
dimensijām maiņa izraisa kešatmiņas netrāpījumu, nevis novecojuša rezultāta atkārtotu izmantošanu. Vizuālās dublējumu novēršanas politikas
versija, slieksnis un ierobežotais kandidātkadru skaits arī ir skaidri norādīti
rezultātu kešatmiņas atslēgā un metadatos; tādēļ politikas maiņa nevar atkārtoti izmantot novecojušu
visa video aprakstu. Rezultātu kešatmiņas v4 metadati saglabā režīmu un
kontrolsummu, bet nekad neapstrādāto lietotāja uzdevumu. Aizsargmehānisma metadati norāda gan
pieprasīto, gan faktisko analīzes režīmu; pieprasīts `focused` režīms bez
izmantojama lietotāja teksta tiek norādīts kā faktiski `full`.

Aizsargmehānisms izgūst visas atbalstītās video daļas, bet apraksta ne vairāk kā
`modalityBridgeVideoMaxVideos`. Mērķim, par kuru ir pierādīts, ka tam ir
`supportsVideo === false`, neveiksmīgi apstrādāti un limitu pārsnieguši video kļūst par skaidriem droša
teksta marķieriem, lai neviens neapstrādāts video netiktu saglabāts. Ja iespēja nav zināma, šīs daļas
paliek nemainītas. Mērķi ar `supportsVideo === true` apiet tiltu.
Klienta pieprasījuma pārtraukšanas signāls tiek nodots lejupielādei, brokera rindai,
apakšprocesiem un aprakstu izveides izsaukumiem; pārtraukumi aptur apstrādi starp video un nekad kļūmes gadījumā
nepieļauj neapstrādātas multivides tālāku apstrādi.

Izpildlaika iestatījumi tiek glabāti DB un validēti ar Zod:

| Atslēga                             | Noklusējums | Diapazons / darbība                                                                                       |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobligāts izpildlaikā, jāiespējo apzināti                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` saglabā vispārīgus aprakstus; `focused` izmanto ierobežotu, neuzticamu jaunāko lietotāja kontekstu |
| `modalityBridgeVideoModel`          | `""`        | Pārmanto Vision Bridge modeli                                                                             |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` vai proporcionāls `segment_aware`; detektora kļūmes gadījumā izmanto `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                            |

Iepriekš saglabātās Video noildzes vērtības, kas pārsniedz 120 sekundes, tiek ierobežotas līdz
brokera termiņam; jaunu iestatījumu vērtību ierakstīšana virs šī ierobežojuma tiek noraidīta.
`GET /api/modality-bridge/video/runtime` pirms autentifikācijas vai izpildlaika pārbaudes
pieprasa uzticamu, apzīmogotu atgriezeniskās cilpas
lokalitāti un pēc tam pieprasa pārvaldības autentifikāciju.
Tas atgriež tikai `available`, attīrītas FFmpeg/ffprobe versijas un fiksētu
iemeslu, ja izpildlaiks nav pieejams. Iekšējais izgūšanas galapunkts nav
publiska augšupielādes API: rindas piesātinājums atgriež `503` kopā ar `Retry-After`, zvanītāja
atvienošanās atgriež `499`, bet fiksētā brokera termiņa pārsniegšana atgriež `504`. Konvertētās atbildes centrālajai
`x-omniroute-modality-bridge` galvenei pievieno
`video->text;model=<visionModel>;parts=<videos>`, nenoņemot Vision vai Audio segmentus.

### PII maskētājs (`piiMasker.ts`)

Darbojas **abos** posmos.

- **`preCall`** klonē lietderīgo slodzi, apstaigā `system`, `messages`, `input` un
  `prompt` (tostarp vienkāršas virkņu vienības) un piemēro `processPII()` (no
  `@/shared/utils/inputSanitizer`) virkņu `content`/`text` laukiem. Ja
  `PII_REDACTION_ENABLED=true`, atklātie PII tiek aizklāti izejošajā
  lietderīgajā slodzē. Tas nav atkarīgs no `INPUT_SANITIZER_MODE` (kas kontrolē tikai
  uzvednes injekciju politiku). Kad aizklāšana ir izslēgta, izsaukums reģistrē atklāto
  gadījumu skaitu, nepārrakstot saturu.
- **`postCall`** dziļi klonē atbildi, izpilda `sanitizePIIResponse()` kopā ar
  Responses API formas maskētāju (`maskResponsesOutput` — aptver
  `output_text` un `output[].content[].text`). Ja notiek jebkāda aizklāšana,
  modificētā atbilde aizstāj sākotnējo.

Aizsargmehānisms nekad nebloķē; tas tikai pievieno anotācijas (`meta.detections`,
`meta.redacted`) vai pārraksta.

### Uzvednes injekcija (`promptInjection.ts`)

Atklāj pretinieka veidotas struktūras lietotāja nodrošinātajā saturā un piemēro
konfigurēto politiku. Darbību nosaka vides mainīgie un konstruktora
opcijas:

| Iestatījums          | Vides mainīgais                                                                                              | Noklusējums | Ietekme                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Iespējots            | `INPUT_SANITIZER_ENABLED`                                                                                    | `true`      | Ja vērtība ir `false`, aizsargmehānisms nekavējoties pārtrauc izpildi.                                                                                                                            |
| Režīms               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                              | `warn`      | Injekciju politika: `block`, `warn` vai `log`. (`redact` tiek pieņemts atpakaļsaderības dēļ, bet **neizņem** injekcijas tekstu; pieprasījuma PII pārrakstīšanu kontrolē `PII_REDACTION_ENABLED`.) |
| Bloķēšanas slieksnis | `blockThreshold` opcija / `INPUT_SANITIZER_BLOCK_THRESHOLD` (aizstājvārds `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Minimālā bloķēšanai nepieciešamā nopietnības pakāpe. Ar noklusējuma iestatījumu vidēja pakāpe paredzēta tikai novērošanai.                                                                        |

**Režīma prioritāte** (`getMode`): izsaucēja `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijas karodziņa ignorējošā vērtība** (Informācijas panelis → Iestatījumi →
Funkciju karodziņi) → `INJECTION_GUARD_MODE` vides mainīgais → `INPUT_SANITIZER_MODE` vides mainīgais →
`warn`. Tādējādi informācijas paneļa ignorējošajai vērtībai ir prioritāte pār vides mainīgajiem, tāpēc Funkciju
karodziņu lietotāja saskarne kontrolē aktīvo aizsargmehānismu reāllaikā (bez restartēšanas). DB nolasīšana ir kļūmju droša:
ja rodas kļūda, aizsargmehānisms atgriežas pie uz vides mainīgajiem balstītas darbības, un, ja
ignorējošā vērtība nav iestatīta, darbība ir identiska risinājumam, kas izmanto tikai vides mainīgos.

Noteikšanas avoti:

1. `sanitizeRequest()` no `@/shared/utils/inputSanitizer` (kopīgā detektoru
   kopa, kas tiek izmantota arī citviet konveijerā).
2. Iebūvētie `DEFAULT_GUARD_PATTERNS` (pašlaik `system_override_inline` un
   `markdown_system_block`, abiem nopietnības pakāpe ir `high`).
3. Neobligāti `customPatterns`, kas nodoti ar konstruktora opcijām (virknes, regulārās izteiksmes
   vai `{ name, pattern, severity }` ieraksti).

Ja `mode === "block"` **un** vismaz viens atradums sasniedz nopietnības
slieksni, `preCall` atgriež `{ block: true, message: "Request rejected:
suspicious content detected" }`. Režīmos `warn`/`log` aizsargmehānisms reģistrē notikumu žurnālā, bet
atļauj izsaukumu. Kopīgā palīgfunkcija `evaluatePromptInjection()` arī tiek eksportēta
izsaucējiem, kuriem jānovērtē uzvednes, neizmantojot reģistru.

**Skenēšanas ierobežojums (v3.8.20):** detektors pārbauda tikai apvienotā uzvednes teksta
**pirmos 16 KB** — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failā
`src/shared/utils/inputSanitizer.ts`. Gan `detectInjection()`, gan
`evaluatePromptInjection()` pirms šablonu cikla izpildes izmanto
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Injekcijas direktīvas atrodas tuvu ievades sākumam, tāpēc tas
ierobežo regulāro izteiksmju CPU/GC patēriņu vairāku simtu KB lietderīgajām slodzēm, nevājinot noteikšanu (sk.
#3932, #4041).

### Akreditācijas datu maskētājs (`credentialMasker.ts`)

Darbojas **abos** posmos un noklusējuma ķēdē ir pēdējais (prioritāte `95`). Tas aizklāj
labi zināmus API atslēgu / slepeno pilnvaru rakstus izejošajā lietderīgajā slodzē (ziņojumu
saturā, rīku izsaukumu argumentos, rīku rezultātos) **un** nodrošinātāja atbildē, lai
uzvednē ielīmēti akreditācijas dati (vai rīka rezultātā atkārtoti atgriezti dati) netiktu nopludināti
augšupējam nodrošinātājam vai atpakaļ klientam.

- **Tikai pēc izvēles**, tāpat kā PII aizklāšana (saistīts ar Stingro noteikumu #20):
  atspējots, ja vien `settings.credentialRedactionEnabled === true` **vai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kad tas ir izslēgts, aizsargmehānisms neveic nekādas darbības —
  tas nekad nebloķē un neko nepārraksta.
- `redactCredentials()` apstaigā visu lietderīgās slodzes/atbildes koku (`walkValue()`,
  aizsargāts pret prototipa piesārņošanu un cikliem, izmantojot `WeakSet`) un aizstāj atbilstības ar
  `[REDACTED:<type>]` vietturi, klonējot tikai tos zarus, kuri faktiski
  mainījušies.
- `CREDENTIAL_PATTERNS` aptver LLM nodrošinātāju atslēgas (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS pilnvaras (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maksājumu atslēgas (Stripe, Square), mākoņpakalpojumu
  atslēgas (AWS piekļuves atslēga, Twilio, SendGrid, Mailgun), privātās atslēgas / JWT,
  savienojuma virknes, kas satur akreditācijas datus (`mongodb://user:pass@...` utt.), un
  vispārīgu `Authorization`/`x-api-key`/`api-key`/`apikey` galvenes vērtības
  šablonu. Galvenēm līdzīgas atslēgas (`authorization`, `x-api-key`, `api-key`,
  `apikey`) tiek aizklātas strukturāli (tikai vērtība, saglabājot shēmas prefiksu, piemēram,
  `Bearer `/`Basic `), nevis izmantojot vispārīgo teksta regulāro izteiksmi.
- Aizsargmehānisms nekad nebloķē; tas tikai pārraksta (`modifiedPayload` /
  `modifiedResponse`) un pievieno anotācijas (`meta.credentialsRedacted`, `meta.count`).

Regresiju aizsardzība: `tests/unit/credential-masker-guardrail.test.ts`.

## Pamatkontrakts (`base.ts`)

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
  block?: boolean; // true pārtrauc ķēdes izpildi
  message?: string; // tiek parādīts bloķēšanas gadījumā
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall atgriež šo vērtību, lai pārrakstītu pieprasījumu
  modifiedResponse?: TValue; // postCall atgriež šo vērtību, lai pārrakstītu atbildi
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

Drošības mehānisms norāda, ka „nav izmaiņu”, atgriežot `void`, `{}` vai
`{ block: false }`. Atgriežot `modifiedPayload`/`modifiedResponse`, tiek aizstāta
vērtība, kas ķēdē tiek nodota tālāk nākamajiem drošības mehānismiem.
`signal?: AbortSignal` nodod izsaucēja dzīves ciklu drošības mehānismiem. Pieprasījuma pārtraukšana ir apzināts atvērtas kļūmes izņēmums: multivides tilti pārtrauc darbu un veic tīrīšanu, neatjaunojot sākotnējo multividi mērķim, par kuru ir zināms, ka tas to neatbalsta.

## Reģistrs (`registry.ts`)

Vienīgā `guardrailRegistry` instance nodrošina:

- `register(guardrail)` — pievieno drošības mehānismu (vai aizstāj to pēc normalizētā nosaukuma) un
  atkārtoti sakārto pēc `priority` augošā secībā.
- `clear()` / `list()` — administratīvas palīgfunkcijas.
- `runPreCallHooks(payload, context)` — secīgi izpilda aktīvos drošības mehānismus, nododot
  lietderīgo slodzi caur `modifiedPayload`, un apstājas pie pirmā `block: true`.
- `runPostCallHooks(response, context)` — tāda pati plūsma atbildes pusē.
- `resetGuardrailsForTests({ registerDefaults })` — notīra stāvokli un pēc izvēles
  atkārtoti reģistrē noklusējuma mehānismus tīrai testu izolācijai.

Abas izpildfunkcijas atgriež `{ blocked, payload|response, results, guardrail?, message? }`,
kur `results` ir `GuardrailExecutionResult` ierakstu masīvs, kas ietver katra
drošības mehānisma laukus `blocked`, `skipped`, `modified`, `error` un `meta`,
kas ir noderīgi trasēšanai.

### Drošības mehānismu atspējošana katram pieprasījumam

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` apkopo
drošības mehānismu nosaukumu sarakstu bez dublikātiem, kuri pašreizējam
pieprasījumam ir jāizlaiž. Avoti (visi neobligāti, visi tiek apvienoti):

- `apiKeyInfo.disabledGuardrails`
- Pieprasījuma ķermeņa `disabledGuardrails` (augšējā līmenī)
- Pieprasījuma ķermeņa `metadata.disabledGuardrails`
- Galvene `x-omniroute-disabled-guardrails` (vai mantotā
  `x-disabled-guardrails`)

Vērtības var būt virkņu masīvi vai ar komatiem atdalīta virkne; nosaukumi tiek
normalizēti uz mazo burtu kebab-case formātu (`pii_masker` → `pii-masker`). Rezultāts
caur `context.disabledGuardrails` tiek nodots reģistram, kas izlaiž
atbilstošos drošības mehānismus (`skipped: true` laukā `results`).

## Izpildes secība

Katram pieprasījumam, kas tiek apstrādāts caur `src/sse/handlers/chat.ts` un
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` izveido izlaižamo aizsargmehānismu sarakstu no API atslēgas, pieprasījuma pamatteksta
   un galvenēm.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` izpilda aizsargmehānismus augošā
   prioritātes secībā:
   - Atspējotie aizsargmehānismi tiek reģistrēti kā `skipped`.
   - Katra aizsargmehānisma `preCall` var pārrakstīt lietderīgo slodzi, izmantojot `modifiedPayload`.
   - Pirmais `block: true` priekšlaicīgi pārtrauc ķēdi, un apstrādātājs atgriež
     aizsargmehānisma noraidījuma atbildi.
3. (Iespējams, pārrakstītā) lietderīgā slodze tiek nodota kombinētajai maršrutēšanai un augšupstraumes
   nosūtīšanai.
4. Pēc atbildes izveides `guardrailRegistry.runPostCallHooks(...)`
   izpilda to pašu ķēdi atbildei. `block: true` šajā posmā atmet augšupstraumes
   atbildi.

Aizsargmehānismi, kas izmet kļūdu, tiek reģistrēti ar `error: <message>` un ierakstīti žurnālā, izmantojot
`logger.warn`, taču ķēdes izpilde turpinās — pēc konstrukcijas kļūmes gadījumā pieprasījums tiek atļauts.

## Konfigurācija

Iebūvēto aizsargmehānismu nolasītie vides mainīgie:

| Mainīgais                             | Izmanto                     | Ietekme                                                                                                                    |
| ------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Iestatiet uz `false`, lai pilnībā atspējotu noteikšanu.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Injekciju politika: `warn`, `block` vai `log`. Mantotā vērtība `redact` nepārraksta injekcijas tekstu.                     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Injekciju aizsargmehānisma režīms; arī DB funkcionalitātes karodziņš, kas **ignorē un aizstāj** vides mainīgos (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Minimālais nopietnības līmenis, kuru `MODE=block` noraida: `high` (noklusējums), `medium` vai `low`.                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Mantots `INPUT_SANITIZER_BLOCK_THRESHOLD` aizstājvārds.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Ja vērtība ir `true`, pieprasījumā esošā PII tiek aizklāta (neatkarīgi no injekciju režīma).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (lejupstraume) | Kontrolē maskētāja darbību atbildes pusē.                                                                                  |

Modalitātes tilta aizsargmehānismi izpildlaika konfigurāciju nolasa no DB nodrošinātās iestatījumu
krātuves (`getSettings()`), nevis no vides mainīgajiem. Attēlu apstrādes primārās atslēgas ir
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` un
`modalityBridgeCacheMaxEntries`. Mantotās
`visionBridge*` atslēgas tiek pieņemtas tikai kā dokumentētā viena cikla lasīšanas
atkāpšanās iespēja; informācijas paneļa veiktajai rakstīšanai tiek izmantotas primārās atslēgas. Noklusējuma vērtības un atkāpšanās
risinātājs atrodas `src/shared/constants/modalityBridgeDefaults.ts`, bet mantotās
konstantes ir saglabātas failā `src/shared/constants/visionBridgeDefaults.ts`.

Audio apstrāde izmanto `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` un `modalityBridgeAudioMaxClips`, kā arī koplietotos
`modalityBridgeCache*` iestatījumus. Audio apstrādei nav mantoto atslēgu atkāpšanās iespējas, jo šīs
atslēgas tika ieviestas kopā ar Modalitātes tilta shēmu.

Video apstrāde izmanto `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` un
`modalityBridgeVideoTimeout`, kā arī koplietotos `modalityBridgeCache*` iestatījumus.
Tā pēc noklusējuma ir atspējota, jo FFmpeg/ffprobe ir neobligātas darbības
atkarības, bet kadru aprakstu ģenerēšana palielina latentumu un modeļa izmaksas.

## Pielāgotas aizsargbarjeras

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

Darbības:

1. Izveidojiet `src/lib/guardrails/myGuardrail.ts`, paplašinot `BaseGuardrail`.
2. Implementējiet `preCall` un/vai `postCall`.
3. Vai nu reģistrējiet importēšanas laikā (pievienojiet no `registerDefaultGuardrails`), vai
   izsauciet `guardrailRegistry.register(...)` izpildlaikā — reģistrs aizstāj
   jebkuru iepriekšējo aizsargbarjeru ar tādu pašu normalizēto nosaukumu.
4. Pievienojiet testus direktorijā `tests/unit/` (esošie piemēri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testēšana

Starp testiem izmantojiet `resetGuardrailsForTests()`, lai sāktu no zināma stāvokļa.
Nododiet `{ registerDefaults: false }`, lai sāktu ar tukšu reģistru un
reģistrētu tikai testējamās aizsargbarjeras. Vision Bridge atbalsta atkarību
ievadīšanu (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge nodrošina
līdzvērtīgus paplašinājuma punktus iestatījumiem, iespējām, STT modeļa atlasei, akreditācijas datu
pārbaudēm un transkripcijai. Tādēļ testos var pārbaudīt abas plūsmas bez piekļuves
DB vai tīklam.

## Skatiet arī

- `src/lib/guardrails/` — implementācija
- `src/shared/utils/inputSanitizer.ts` — koplietots detektors, kas nodrošina
  uzvedņu injekciju noteikšanu un PII maskēšanu
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge noklusējuma vērtības un
  piespiedu tilta modeļu saraksts
- `src/shared/constants/modalityBridgeDefaults.ts` — koplietoti Vision/Audio izpildlaika noklusējumi
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonāls slānis (ķēdes pārtraucējs, nogaidīšanas periodi)
- `docs/reference/ENVIRONMENT.md` — pilna vides mainīgo atsauce

## Injekciju aizsarga maršrutu pārklājums un red-team testēšana (8. posms · D bloks)

Injekciju aizsargs (`createInjectionGuard` / `withInjectionGuard`) aptver visus maršrutus,
kas pieņem lietotāju uzvednes. Tas ievēro `INJECTION_GUARD_MODE` (noklusējuma vērtība `warn` = tikai reģistrē žurnālā;
`block` = atgriež HTTP 400 `SECURITY_001`).

| Tips            | Maršruti                                                                                                                                             | Noklusējuma režīms |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Teksts (esošie) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn               |
| Ģeneratīvie     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn               |
| Dati            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn               |

Teksta izgūšana (`extractMessageContents`) aptver `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team testēšana (katru nakti, `nightly-llm-security.yml`):** promptfoo pārbauda, vai katrs maršruts bloķē
OWASP-LLM korpusu režīmā `INJECTION_GUARD_MODE=block`; garak izpilda pārbaudes (izlaiž, ja nav noslēpuma).
`moderations` ir iekļauts konsekvences labad — operatori bloķēšanas režīmā to var izslēgt, izmantojot
`resolveDisabledGuardrails`.

Nakts darbplūsmai (`.github/workflows/nightly-llm-security.yml`, cron + manuāla
palaišana) ir divi darbi:

- **`promptfoo-guard` (bloķējošs)** — izpilda `promptfoo eval -c promptfooconfig.yaml`
  ar `INJECTION_GUARD_MODE=block`. Katrs pretiniecisks gadījums (piemēram, "ignorē visus
  iepriekšējos norādījumus…", DAN stila ierobežojumu apiešanas mēģinājumi) pārbauda, vai atbilde satur
  `error.code === "SECURITY_001"`, proti, vai aizsargs patiešām noraidīja pieprasījumu.
- **`garak` (konsultatīvs)** — izpilda garak `--probes promptinject,dan,leakreplay`
  pret lokālu OmniRoute instanci (`http://localhost:20128/v1`). Tā izpilde ir atkarīga no
  pakalpojumu sniedzēja noslēpuma (`PROMPTFOO_PROVIDER_KEY`); ja tā nav, darbs tiek korekti izlaists, un tam ir pievienots
  `|| true`, tādēļ tas sniedz pārskatu, neizraisot CI kļūmi.

Aizsarga palīgfunkcijas (`createInjectionGuard` / `withInjectionGuard`) pārklājums
aptver katru `/v1` maršrutu, kas pieņem uzvednes; uzvednes teksts tiek iegūts no
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`, izmantojot
`extractMessageContents()` failā `src/shared/utils/inputSanitizer.ts`.
