# Guardrails (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

## Iebūvētās aizsardzības barjeras

Reģistrs automātiski ielādē sešas aizsardzības barjeras prioritātes secībā importēšanas laikā (skat. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritāte | Nosaukums           | Posms(-i)      | Fails                 |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Zemāki prioritātes numuri tiek izpildīti **pirmie**.

### Vizuālais tilts (`visionBridge.ts`) — Modalitātes tilts PR-1

Pārtver attēlus saturošus pieprasījumus, kas paredzēti **modeļiem bez vizuālās uztveres**, un vai nu pārvirza visu pieprasījumu uz vizuāli spējīgu modeli, vai arī aizstāj attēlu daļas ar teksta aprakstiem, ko ģenerējis konfigurējams vizuālais modelis pirms augšupējā izsaukuma. Tas ļauj tikai teksta nodrošinātājiem caurspīdīgi apstrādāt multimodālas datu plūsmas.

Plūsma:

1.  Izlaist, ja mērķa modelis jau atbalsta vizuālo uztveri (izņemot gadījumus, ja tas parādās piespiedu tilta sarakstā `isVisionBridgeForcedModel`).
2.  Izvilkt attēlu daļas, izmantojot `extractImageParts(messages)` (`visionBridgeHelpers.ts`), kas deleģē uz **vienoto mediju detektoru** `detectMediaParts()` failā `open-sse/utils/mediaParts.ts` — vienīgo patiesības avotu, kas tiek koplietots ar kombinēto saderības filtru. Izvilkšana ir atļauta tikai augstākā līmeņa daļām, kuras `replaceImageParts` var atkal ievietot (izvilkšanas↔aizstāšanas līgums): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` un Responses API `input_image`. Ligzdotie atradumi un tikai indikatoru formas ir kombinētā filtra materiāls un nekad netiek izvilktas. Izlaist, ja nekas netiek atrasts.
3.  Atrisināt izpildlaika konfigurāciju, izmantojot `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): jaunās `modalityBridge*` iestatījumu atslēgas uzvar; mantotās `visionBridge*` atslēgas paliek kā **vienreizējs atkritiens** (atgriešanas logs). Izlaist pirms jebkādas mediju pārlūkošanas, ja tilts ir atspējots.
4.  Režīma selektors (`modalityBridgeVisionMode`, skat. tabulu zemāk) izlemj par pārvirzīšanu vai aprakstīšanu. Pārvirzīšana atgriež `modifiedPayload` ar tikai nomainītu `model`, kā arī meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Apraksta ceļš: ierobežot attēlus līdz `maxImages`, sastādīt uzdevumam atbilstošu uzvedni, konsultēties ar aprakstu kešatmiņu, izsaukt vizuālo modeli **paralēli** (`Promise.allSettled`) un ievietot `[Image N]: <apraksts>` teksta daļas to vietā. Neveiksmīgs apraksts atgriež `null` un oriģinālā attēla daļa tiek **saglabāta** (#4012) — izņemot kombinētā apraksta ceļā, ja visi apraksti neizdevās, kur apstiprināts augšupējais savienojums bez vizuālās uztveres saņem `(nav pieejams — nav pievienots vizuāli spējīgs nodrošinātājs)` aizstājēju (#8430).
6.  Atgriezt `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Režīma selektors (`modalityBridgeVisionMode`)

| Režīms     | Noklusējums | Uzvedība                                                                                                                                                                                                                                                                                                                              |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Mantotā heuristika, neskarta (#6640/#7204): modeļi, kas nav kombinēti/`auto/`, tiek pārvirzīti uz labāko vizuālo modeli, ja vien oriģinālajam modelim jau nav izmantojamu akreditācijas datu (tad aprakstīt); kombinētie mērķi vienmēr apraksta.                                                                                      |
| `describe` |             | Vienmēr aprakstīt — pārvirzīšanas bloks tiek pilnībā izlaists; lietotāja izvēlētais modelis vienmēr atbild.                                                                                                                                                                                                                           |
| `reroute`  |             | Piespiedu pārvirzīšana: akreditēto modeļu saglabāšanas aizsardzība tiek apieta. Pārvirzīšanas-**mērķa** akreditācijas datu aizsardzība joprojām ir spēkā — ja nav pieejams izmantojams vizuālais mērķis, pieprasījums tiek novirzīts uz aprakstīšanu, lai neapstrādāti attēli nekad nesasniegtu tikai teksta aizmugursistēmu (#8430). |

Piespiedu režīmi īssavienojas **pirms** automātiskās heuristikas izpildes; `auto` uzvedība ir baitu ziņā identiska pirms-PR-1 aizsardzības barjerai.

#### Uzdevumam atbilstoša apraksta uzvedne (`modalityBridgeVisionTaskAware`)

Noklusējums **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) pievieno **pēdējās lietotāja ziņas** tekstu (saīsinātu līdz 500 rakstzīmēm) pamata apraksta uzvednei, virzot aprakstu uz to, ko lietotājs faktiski jautāja (codex-vision-proxy modelis) un lūdzot vizuālajam modelim pārrakstīt redzamo tekstu. Ja karodziņš ir izslēgts — vai nav lietotāja teksta — pamata uzvedne tiek izmantota nemainīga.

Apraksta pašcilpas paša OpenAI-saderīgais pieprasījums (`callVisionModelSingle()` failā `visionBridgeHelpers.ts`) vienmēr pieprasa `image_url.detail: "high"` — bez nosacījumiem, katram izsaucējam/nodrošinātājam, nevis atkarībā no klienta signāla. Zemas detalizācijas paraugu ņemšana pasliktina OCR precizitāti tieši teksta transkripcijas uzdevumam, ko pieprasa šis uzvedne, tāpēc apraksta izsaukums pats vienmēr pieprasa augstu detalizāciju neatkarīgi no tā, kāds detalizācijas līmenis tika izmantots sākotnējā ienākošajā pieprasījumā. Tas ietekmē tikai iekšējo apraksta pieprasījuma pamattekstu; tas nemaina to, kā OmniRoute pārsūta izsaucēja paša `image_url.detail` primārajā pieprasījumā — šis noklusējums tiek piemērots atsevišķi un tikai atklātiem OpenCode klientiem, funkcijā `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Apraksta pašcilpas Anthropic vadu formāta zaram nav `detail` lauka, un to neietekmē neviens no noklusējumiem.

#### Apraksta izvades ierobežojums (modalityBridgeVisionMaxChars)

| Atslēga                        | Noklusējums | Diapazons         |
| ------------------------------ | ----------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` vai 100–50000 |

`0` (noklusējums) nozīmē **bez ierobežojuma** — apraksts, ko atgriež `callVisionModel()`, tiek nodots nemodificēts, saglabājot esošo uzvedību. Jebkura vērtība diapazonā no 100 līdz 50000 saīsina aprakstu ar `…` sufiksu, pirms tas tiek atkal ievietots kā `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` failā `src/lib/guardrails/visionBridge.ts`). Palieliniet šo vērtību detalizētiem OCR uzdevumiem, kur pakārtotajam modelim nepieciešama pilna transkripcija; samaziniet to, lai ierobežotu marķieru lietojumu pļāpīgajos redzes modeļos. Paneļa lauks atrodas cilnes Vision Advanced panelī (`modality-bridge-max-chars` failā `ModalityBridgeVisionTab.tsx`) un ierobežo jebkuru vērtību no 1 līdz 99 līdz 100, atstājot skaidru `0` neskartu — `0` ir derīga Zod vērtība pati par sevi (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nevis tikai "nenoteikts" noklusējums.

#### Apraksta kešatmiņa (modalityBridge/bridgeCache.ts)

Atmiņā esoša LRU + TTL kešatmiņa apraksta izvadei, koplietota visā procesā. Atslēga = `sha256(imageRef + composedPrompt + configuredBridgeModel)` ar garuma prefiksu kadrēšanu (bez lauku robežu sadursmēm). Modeļa komponents ir **konfigurētais** tilta modelis, nevis modelis, kas faktiski atbildēja — `callVisionModel` var iekšēji atgriezties pie noklusējuma, un atslēgu veidošana katram mēģinājumam sadrumstalotu kešatmiņu. Neizdevušies apraksti nekad netiek kešoti. Iestatījumi:

| Atslēga                         | Noklusējums | Diapazons |
| ------------------------------- | ----------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`      | —         |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000   |

#### Attālā attēla normalizācija (pašcilpas apraksts/base64 ielāde)

Kad tilts pats ielādē **attālu** attēlu — Anthropic apraksta pašizsaukums un claude-vadu formāta base64 konversija (`ensureBase64ImagesForClaudeWire`), abi caur `fetchRemoteImageAsDataUri()` failā `visionBridgeHelpers.ts` — iegūtais datu URI tiek apstrādāts ar `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`), pirms tas tiek iegults redzes modeļa pieprasījumā. Pārāk lieli attēli tiek samazināti līdz **2048px garai malai** (atbilstot izmēru maiņas ierobežojumam, ko OpenAI/Anthropic jau piemēro servera pusē), kas samazina augšupielādes baitus/latentumu, nemainot to, ko redz redzes modelis. Izmēru maiņai tiek izmantots `sharp`, ielādēts, izmantojot dinamisku importu: platformā, kur tā vietējais binārais fails neizdodas ielādēt, `normalizeDataUri()` **nekad nemet kļūdu** — tas atgriežas pie sākotnējo baitu caurlaides, tāpēc apraksta/base64 konversijas ceļš vienmēr turpina darboties. Ne-attēlu baiti (ielāde, kas neatgrieza atšifrējamu attēlu) arī tiek nodoti neskarti. Šī normalizācija attiecas tikai uz attēliem, ko tilts ielādē savam pašizsaukumam — tā nekad netiek piemērota izsaucēja neapstrādātajai caurlaides datu plūsmai, kas atbilst tikai izvēles mutācijas principam (Cietā regula #20).

#### Iestatījumu shēma + migrācija

Jaunās `modalityBridge*` atslēgas tiek Zod-validētas funkcijā `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio un `modalityBridgeAudio*` grupa, ko izmanto Audio Bridge. Migrācija `141_modality_bridge_settings.sql` kopē esošās mantotās `visionBridge*` vērtības uz atbilstošajām jaunajām atslēgām (idempotenta, nekad nepārraksta operatora iestatītu `modalityBridge*` vērtību); mantotās atslēgas paliek pieņemtas kā lasīšanas rezerves variants vienam izlaišanas ciklam.

#### Caurspīdīguma galvene + statistika

Apraksta pārveidotās atbildes satur `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (izveidots ar `buildModalityBridgeHeader()` failā `modalityBridge/bridgeStats.ts`, apzīmogots ar `withModalityBridgeHeader()` failā `src/sse/handlers/chatHelpers.ts`). Pārvirzītie pieprasījumi nesaņem **nekādu** galveni — datu plūsma netika skarta, un modeļa maiņa jau ir redzama atbildes pamatteksta `model` laukā.

`GET /api/modality-bridge/stats` (pārvaldības autentifikācija, tāds pats līmenis kā `GET /api/settings`) atgriež atmiņā esošos katras modalitātes skaitītājus `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` attiecībā uz `vision`, `audio` un `video`. `averageLatencyMs` izmanto `latencySamples`, nevis visus mēģinājumus, kā savu saucēju; darbība bez laika mērīšanas nerada nulles milisekundes paraugu. `bridged` paliek atpakaļsaderīgs veiksmīgu konversiju aizstājvārds; neizdevušies mēģinājumi to nepalielina. Skaitītāji tiek atiestatīti procesa restartēšanas laikā pēc dizaina (telemetrija, nevis grāmatvedība).

#### Paneļa konfigurācija

Īpašā informācijas paneļa lapa ir
`/dashboard/settings/modality-bridge`. Tās URL-adresējamās cilnes `Vision`, `Audio`
un `Video` saglabā vaicājuma parametrus, pārslēdzot `tab` vērtību.
Cilne Vision atklāj iespējošanu, režīmu, modeļa izvēli (ieskaitot automātisko
noklusējumu), uzdevumam pielāgotu uzvedni, uzlabotus taimauta/attēla/apraksta garuma/kešatmiņas
ierobežojumus, izpildlaika skaitītājus un aizsargātu parauga pieprasījumu. Cilne Audio
arī ir aktīva: tā atklāj iespējošanu, tikai STT modeļa izvēlni ar Auto,
taimauta/maksimālā klipa ierobežojumus, audio skaitītājus un `input_audio` parauga testu.
Cilne Video ir funkcionāla: tā ziņo par FFmpeg/ffprobe izpildlaika stāvokli —
vienu no četriem skaidriem UI stāvokļiem (`unknown`, kamēr zonde tiek veikta vai
nevarēja pabeigt, `restricted` uz ne-loopback informācijas paneļa resursdatora,
kur zonde tiek izlaista klienta pusē, `unavailable` pēc pārbaudes un apstiprinātas
trūkuma, vai `available` ar FFmpeg/ffprobe versijām) — saglabā
iespējošanas/modeļa/kadra/video/taimauta ierobežojumus, filtrē modeļa izvēlni uz
redzes spējīgiem modeļiem un atklāj video skaitītājus.

Bijušā Vision Bridge karte zem AI iestatījumiem ir saderības saite uz
jauno lapu; tai vairs nav otrās veidlapas kopijas. Mediju nodrošinātāji arī
saista attēla-uz-tekstu un runas-uz-tekstu darbplūsmas ar atbilstošajām Modality
Bridge cilnēm, nenoņemot esošo Speech-to-Text rotaļu laukumu.

**Pašcilpas piekļuves apietne:** kad apraksta izsaukums tiek maršrutēts caur OmniRoute
paša `/v1` pašcilpu (nestandarta nodrošinātāja modelis), apakšpieprasījums nosūta
`x-omniroute-admission-bypass: internal` un tiek autentificēts ar atrisināto
pašcilpas akreditācijas datiem — lokālo `sk_omniroute` sargkodu lokālajā režīmā,
vai operatora konfigurēto `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` vides atslēgu (#1350),
lai `REQUIRE_API_KEY=true` izvietojumi joprojām varētu veikt apraksta izsaukumu.
Apietne tiek ievērota tikai šiem precīzajiem akreditācijas datiem, tāpēc ārējie
klienti nevar izmantot galveni, lai apietu piekļuvi.

Mantotie noklusējumi atrodas `src/shared/constants/visionBridgeDefaults.ts`;
jaunie režīma/uzdevumam pielāgotie/kešatmiņas noklusējumi un iestatījumu atrisinātājs
atrodas `src/shared/constants/modalityBridgeDefaults.ts`. Aizsargs atklāj `deps`
konstruktora opciju, lai testi varētu injicēt viltotas `getSettings` un
`callVisionModel` implementācijas.

### Audio tilts (`audioBridge.ts`) — Modality Bridge PR-3

Pārtver audio saturošus tērzēšanas pieprasījumus, pirms tie sasniedz mērķi, kas nav
zināms kā audio ievades pieņēmējs. Tas nekad nepārmaršrutē tērzēšanas pieprasījumu:
audio daļas tiek transkribētas, izmantojot esošo OpenAI saderīgo daudzdaļu galapunktu,
un izvēlētais tērzēšanas modelis turpina ar teksta transkripcijām.

Plūsma:

1. Atrisināt `supportsAudio` caur `getResolvedModelCapabilities()`. Uzvar
   skaidra nodrošinātāja reģistra metadati, tad statiskie modeļa metadati, tad
   sinhronizētie `modalities_input`. Deklarēts ievades saraksts bez `audio` ir
   `false`; nav spēju pierādījumu paliek `null`. Gan `false`, gan `null`
   aktivizē konservatīvo tiltu, savukārt `true` to apiet.
2. Atrisināt `modalityBridgeAudio*` iestatījumus un izvilkt saliekamās augstākā
   līmeņa audio daļas no katra ziņojuma, izmantojot kopīgo `detectMediaParts()`
   detektoru. Atbalstītās vadu formas ir OpenAI `input_audio`, `audio_url` un
   `source.media_type: "audio/*"`. Ligzdots audio tiek atklāts maršrutēšanai,
   bet netiek noņemts ar savienojuma ceļu. Darbs ir ierobežots ar
   `modalityBridgeAudioMaxClips`; vēlākās daļas paliek neskartas.
3. Ievērot konfigurētu `provider/model`, vai ļaut `selectAudioBridgeModel()`
   pārlūkot `AUDIO_TRANSCRIPTION_PROVIDERS` stabilā kataloga secībā un izvēlēties
   pirmo modeli ar izmantojamu aktīvu nodrošinātāja akreditācijas datiem.
4. `callAudioTranscription()` konvertē base64/data-URI audio uz daudzdaļu `file`,
   vai lejupielādē attālo `audio_url` caur tikai publisko izejošo aizsargu ar
   DNS piespraušanu un 25 MB ierobežojumu. Pēc tam tas POST pieprasa failu un
   izvēlēto modeli uz lokālo `/v1/audio/transcriptions` pašcilpu, autentificējoties
   ar `resolveSelfLoopBearer()`. Esošais transkripcijas maršruts veic parastu
   akreditācijas datu meklēšanu, atdzišanas/ātruma ierobežojumu apstrādi un
   nodrošinātāja nosūtīšanu.
5. Veiksmīgi izsaukumi aizstāj savas daļas ar `[Audio N]: <transcript>`. Izsaukumi
   tiek veikti ar `Promise.allSettled`: individuāla kļūme saglabā to oriģinālo
   audio daļu (#4012 līgums). Ja katrs izsaukums neizdodas un mērķis ir pierādīts
   `supportsAudio === false`, daļas kļūst par
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 līgums).
   Nezināmam mērķim (`null`) visu kļūmju rezultāts paliek neskarts. Pierādīts
   tikai teksta mērķis bez izmantojamiem STT akreditācijas datiem saņem to pašu
   skaidro aizstājēju, neveicot tīkla izsaukumu.

Veiksmīgas transkripcijas izmanto procesa mēroga Modality Bridge LRU/TTL kešatmiņu.
Atslēga apvieno audio atsauci, stabilo `audio-transcription` operācijas etiķeti
un izvēlēto STT modeli; kļūmes nekad netiek kešatmiņā saglabātas. Audio mēģinājumi
atjaunina kopīgos `bridged`, `cacheHits`, `failures` un `lastUsedAt` skaitītājus.
Pārveidotās atbildes satur
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; neskartie
pieprasījumi nesaņem Audio Bridge segmentu.

Izpildlaika iestatījumi ir balstīti uz DB un Zod-validēti:

| Atslēga                       | Noklusējums | Diapazons       |
| ----------------------------- | ----------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —               |
| `modalityBridgeAudioModel`    | `""`        | Auto vai STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10            |

Kopīgo kešatmiņu joprojām kontrolē `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` un `modalityBridgeCacheMaxEntries`.

### Video tilts (`videoBridge.ts`, `videoBridgePipeline.ts`)

Pārtver augstākā līmeņa video daļas tērzēšanas pabeigšanas `messages` un atbilžu API `input` pirms tiek izsaukts mērķis bez zināma vietējā video atbalsta.
Atbalstītās formas ir `input_video`, `video_url`, `video_source`, HTTPS URL
un `data:video/*;base64,...` datu URI. Vienkārši failu nosaukumi tekstā netiek
uzskatīti par video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) pieder pieprasījumu pārvietošana,
spēju/politikas pārbaude, pieprasījumu apkopojums un atbildes datu slodze.
Darbs ar katru video — iegūšana, visa rezultātu kešatmiņa, kadru secības aprakstīšana
(kas apvieno jebkuru zvanītāja deklarēto audio transkriptu) un mēģinājumu metrika/atcelšana/tīrīšana —
ir paslēpts aiz `processVideoPart` modulī `videoBridgePipeline.ts`,
kas tiek izsaukts vienu reizi katrai video daļai `preCall` cilpā.
Šis modulis definē arī skaidras porta robežas `VideoMediaBrokerPort`
(baitu iegūšana un paraugu kadru ekstrakcija), `VideoAudioTranscriptionPort`
(zvanītāja deklarētā audio transkripta apvienošana ar paraugu subtitriem) un
`VideoDrilldownPort` (kadru detalizētas informācijas saglabāšanas robeža;
vēl nav savienota ar `processVideoPart` — tikai atsevišķais
`/api/modality-bridge/video/drilldown` maršruts šodien raksta detalizētas informācijas ierakstus).

Publiskais `/v1` pieprasījuma ceļš nekad neimportē un neizsauc apakšprocesu.
Attālie video tiek lejupielādēti ar 50 MiB ierobežojumu;
iekļautajiem base64 video ir konservatīvs 36 MiB atkodēts ierobežojums katram video,
lai modelis/ziņojumi/kadru aploksne varētu palikt publiskā JSON pieprasījuma
pieņemšanas ierobežojumā 50 MiB. Iekļautā garuma un atkodētā izmēra aplēses
tiek pārbaudītas pirms piešķiršanas. HTTPS ir nepieciešams sākotnējā attālajā URL
un katrā pāradresācijā, izmantojot esošo tikai publisko izejošo aizsardzību ar DNS piesaisti.
Pēc tam baiti šķērso precīzu iekšējo `POST /api/modality-bridge/video/extract` brokera robežu.
Šis maršruts ir gan `LOCAL_ONLY`, gan `SPAWN_CAPABLE`, pieņem tikai katram procesam
autentificētu, uzticamu atgriezeniskās saites pieprasījumu un nekad nepieņem URL,
failu sistēmas ceļu, izpildāmu failu vai argumentu sarakstu.
API ķermeņa izmēra cauruļvads un apstrādātāja pakāpeniskais ķermeņa lasītājs
neatkarīgi nodrošina 50 MiB brokera ievades ierobežojumu.
Tā ierobežotā rinda vienlaikus veic vienu ekstrakciju,
ļauj veikt četrus gaidošos darbus un ierobežo gaidošo ievadi līdz 100 MiB.

Brokera iekšienē `ffprobe` nolasa privātu lokālu failu;
fiksētais formātu atļauju saraksts izslēdz atskaņošanas sarakstu un manifesta formātus.
Atļautajiem MOV-saimes konteineriem ārējās MOV datu atsauces pēc noklusējuma paliek atspējotas,
un fiksētā komanda tās neizvēlas. Gan `ffprobe`, gan `ffmpeg` izmanto
tikai `file` protokola balto sarakstu, vienu pavedienu, fiksētus argumentu masīvus,
bez čaulas un izpildāmos failus, kas atrisināti no `PATH`.
Pievienoto attēlu vāka straumes nav atskaņojami kandidāti.
Visām atskaņojamām straumēm jāatbilst ierobežojumiem,
un skaidra noklusējuma straume ir vēlama pirms deterministiskā zemākā indeksa atgriešanās.
Video ir ierobežoti līdz 600 sekundēm, 8192 pikseļiem katrā dimensijā un
33 554 432 avota pikseļiem. FFmpeg paraugi 1–16 viduspunkta JPEG kadri,
samazina garo malu līdz ne vairāk kā 1024 pikseļiem, nepalielinot mazākas ievades,
un nekad nesaņem URL. Paraugu ņemšana pēc noklusējuma ir `uniform`.
Izvēles `scene_aware` un eksperimentālās `segment_aware` politikas veic
vienu papildu fiksētu FFmpeg caurlaidi pār jau validēto lokālo straumi,
atlasa ierobežotas `showinfo` ainas laika zīmogus un deterministiski atgriežas
pie tiem pašiem vienveidīgajiem viduspunktiem detektora kļūmes, taimauta,
nepareizi formatētas izvades vai tukšas kandidātu kopas gadījumā.
Segmentu apzinātais režīms piešķir viduspunkta paraugus proporcionāli validētajiem ainu intervāliem;
segmentu apzinātā pierādījumi un atgriešanās uzvedība ir detalizēti aprakstīta zemāk.
Cietā 16 kadru ierobežojums tiek piemērots pēc atlases katrā politikā.
Ja ainas apzinātam pieprasījumam ir tikai viena kadra budžets,
tas izmanto aktīvā pilna video vai fokusa loga vienveidīgo viduspunktu
un ziņo `policyEffective: uniform`: viens atlasīts ainas kadrs nevar saglabāt
abus laika galus. Zvanītājs var pēc izvēles nodrošināt ierobežotu fokusa logu
(`start`/`end` sekundes); robežas tiek ierobežotas līdz multivides ilgumam,
apgriezti vai neierobežoti logi tiek noraidīti, un visas paraugu ņemšanas politikas
tiek veiktas tikai normalizētajā intervālā.
Iegūtais logs tiek iekļauts paraugu ņemšanas metadatos un neuzticamā apraksta prefiksā,
lai pakārtotie modeļi varētu atšķirt fokusētu izvilkumu no pilnas laika skalas.

Semantiskais parakstu fokuss ir atsevišķs, skaidrs iestatījums.
Noklusējuma `full` analīzes režīms saglabā esošo kadra uzvedni un nekad
nenodod pieprasījuma tekstu parakstu modelim.
`focused` režīmā tilts nolasa tikai jaunāko ne-tukšo lietotāja veidoto
`text`/`input_text` no tā paša tērzēšanas vai atbilžu konteinera,
normalizē to uz NFC, sabrūk vadības rakstzīmes un atstarpes,
un ierobežo to līdz 500 Unicode koda punktiem.
Tukšs rezultāts atgriežas pie precīzas `full` uzvednes.
Lietojams padoms tiek serializēts kā JSON īpašā neuzticamā lietotāja konteksta blokā
un var tikai prioritizēt novērojamās detaļas;
tas nevar ignorēt atsevišķo brīdinājumu par instrukciju ievērošanu,
kas redzamas vai dzirdamas medijos. Tekstuālais fokuss nekad neizsecina
`start`/`end` vai nemaina laika paraugu ņēmēju.

#### FU-07 strukturālo segmentu pierādījumi

`segment_aware` izmanto vienu ierobežotu iepriekšējas analīzes caurlaidi
pār jau validēto lokālo video straumi. Fiksētā filtru ķēde vispirms mērogo
līdz ne vairāk kā 320 pikseļiem platumā, nosaka ainu izmaiņas un iesaldētos intervālus,
pēc tam ņem paraugus ar 1 kadru sekundē, lai noteiktu izplūšanu, vidējo spilgtumu
un telpisko/laika informāciju. Caurlaide ir ierobežota līdz 600 strukturāliem paraugiem,
vienam FFmpeg/filtru pavedienam, tiem pašiem `file` protokola un konteineru atļauju sarakstiem,
1 MiB procesa izvades ierobežojumam un ne vairāk kā 30 sekundēm brokera kopīgajā atcelšanas/termiņa ierobežojumā.
Tas nekad nepieņem komandu, filtru, ceļu vai URL no pieprasījuma.

Strukturālās vērtības ir deterministiski paraugu ņemšanas pierādījumi, nevis semantiska video izpratne. Tās nenosaka subjektus, darbības, parakstus, runu vai lietotāja nodomu. Ainas un iesaldēšanas robežas veido segmentus; iesaldēšanas pārklājums, izplūšana, ekspozīcija, telpiskā detaļa un laika izmaiņas ietekmē tikai to, kā tiek sadalīts esošais 1–16 kadru budžets. Pilnībā iesaldēts segments ir ierobežots ar vienu kadru, savukārt neiesaldēti segmenti sacenšas par atlikušo budžetu. Ja robežu skaits pārsniedz kadru skaitu, tiek saglabāts vienmērīgs laika skalas pārklājums, lai ātri agrīni griezumi nevarētu paslēpt garu beigu segmentu. Ainas robežas 1 sekundes analīzes izšķirtspējā no iesaldēšanas robežas tiek apvienotas.

Trūkstoši filtri, nepareizi veidoti/tukši pierādījumi, detektora kļūda vai ierobežots pirmsanalīzes taimauts atveras uz precīzu vienmērīgu viduspunkta politiku. Zvanītāja pārtraukums vai brokera termiņš neatveras: tas pārtrauc notiekošo apakšprocesu, novērš vēlāku kadru ekstrakciju, un privātā pagaidu koka struktūra tiek noņemta `finally` blokā.

`scripts/perf/video-bridge-fu07-eval.ts` ģenerē deterministiskus reālus FFmpeg fiksatorus pēcdedup parakstu izsaukumu ietaupījumiem, blīvas kustības budžeta sadalei, izplūšanas/ekspozīcijas/SI-TI pierādījumiem, ātriem griezumiem ar garu asti un pakāpeniskas izbalēšanas viltus pozitīvajiem rezultātiem. Tas reģistrē pirmsanalīzes kopējo laiku un, ja `/usr/bin/time` ir pieejams, bērnu CPU un maksimālo RSS. Tā kvalitātes pārbaudes ir tikai strukturāli orākuli. Reālā parakstu modeļa kvalitāte paliek `HOLD`, jo šim rīkam nav autorizēta galapunkta vai iesaldēta vērtētāja. Naudas ietaupījumi arī paliek `HOLD`, ja vien `--caption-cost-per-call-usd` nenodrošina skaidru pozitīvu izsaukuma izmaksu aplēsi; skripts nekad neizdomā nevienu no šiem rezultātiem.

Katrs kadrs ir ierobežots līdz 4 MiB, visi neapstrādātie kadri kopā līdz 23 MiB, un serializētā brokera atbilde līdz 32 MiB. Privāts pagaidu direktorijs tiek noņemts `finally` blokā. OmniRoute neiekļauj FFmpeg un nepieņem pielāgotu izpildāmā faila ceļu. Pirms parakstu pievienošanas tilts veic konservatīvu vizuālās deduplikācijas gājienu: katrs JPEG tiek samazināts līdz 16×16 pelēktoņu buferim un tiek salīdzināts tikai ar pēdējo saglabāto kadru. Pieprasītajam parakstu budžetam, kas pārsniedz vienu kadru, ekstrakcija nodrošina ierobežotu kandidātu kopumu, kas ir līdz divreiz lielāks par šo budžetu un nekad nepārsniedz 16 kadrus. Pieprasītais ierobežojums tiek piemērots tikai pēc deduplikācijas, saglabājot pirmo un pēdējo izvēlēto kandidātu galīgās retināšanas laikā, ja budžets ir vismaz divi. Versijas `grayscale-16x16-mean-cells-v2` politika izmanto lielāko no vidējās lūmenas deltas un sīktēlu šūnu attiecības, kuru normalizētā delta ir vismaz 0,05. Dublikātu slieksnis ir konstante 0,04, kas izvēlēta paredzamības dēļ, nevis atklāta kā izpildlaika iestatījums. Šis sekundārais augsta kontrasta signāls saglabā nelielas kustības un redzama teksta izmaiņas, ko var paslēpt tikai vidējā salīdzināšana. Salīdzinātāja vai dekodētāja kļūdas atveras un saglabā pārklājumu. Izvades metadati atdala ekstrahētos kandidātus, veiksmīgi izmantotos kadrus un nomestos vizuālos dublikātus.

Skaidri atzīmēta video daļa var pieprasīt laika zīmogotu kontaktu lapu. Tilts veido maksimāli 4 kolonnu, 16 kadru JPEG režģi. Katra 512 pikseļu šūna ieraksta savu avota laika zīmogu augsta kontrasta apakšējā joslā, savukārt tie paši laika zīmogi paliek teksta metadatos turpmākai saistīšanai un auditam. Pilnais JPEG joprojām ir ierobežots līdz 32 MiB. Ja `sharp` nevar dekodēt vai sastādīt režģi, tilts atgriežas pie atsevišķiem JPEG kadriem; klienta pārtraukums joprojām izplatās caur lapas operāciju.

Veicināšanas pierādījumi ir apzināti atdalīti no sintētiskās kompozīcijas mikrosalīdzinājuma. `scripts/perf/video-bridge-contact-sheet-eval.ts` definē shēmas versijas A/B rīku reāliem OpenAI saderīgiem redzes modeļiem. Tas mēra pakalpojumu sniedzēja ziņotos žetonus, kopējo latentumu (ieskaitot lapas kompozīciju), modeļa izsaukumu skaitu un manifestā definētu faktu saglabāšanu. Neapstrādātas modeļa atbildes netiek ierakstītas ziņojumā; tiek saglabāti tikai SHA-256 apkopojumi un atbilstošie faktu ID. Rīks neveic tīkla vai maksas modeļa izsaukumus, ja vien nav nodots `--execute-real` un nav konfigurēti `--model`, `OMNIROUTE_BASE_URL` un `OMNIROUTE_API_KEY`. Bez šīs skaidrās reālās izpildes tā mašīnlasāmais spriedums paliek `HOLD`; sintētiskās slodzes/izsaukumu skaita mērījumi vien nav veicināšanas pierādījumi.

Zvanītāji var pievienot papildu `transcript.cues` masīvu atbalstītai video daļai, ja viņiem jau ir saskaņots teksts. Katram signālam jāietver `text`, galīgs `start`/`end` intervāls pārbaudītajā ilgumā un baltajā sarakstā iekļauts `source` (`client`, `embedded` vai `audio-bridge`); `confidence` pēc noklusējuma ir `1` un tam jāpaliek starp `0` un `1`. Precīzi dublikātu signāli tiek apvienoti. OmniRoute nekad nesāk transkripciju no šiem metadatiem: apstiprinātie signāli tiek kopēti aprakstītajā rezultātā ar avotu, pārliecību un intervālu, un tiek attēloti kā neuzticami novērojumi līdzās kadru parakstiem. Nederīgs, ārpus diapazona vai bez izcelsmes teksts tiek noraidīts, nevis sajaukts parakstu plūsmā. `source` lauks pašlaik ir zvanītāja deklarēts, nevis servera pārbaudīts: OmniRoute nodrošina, ka vērtība ir viena no trim atļautajām virknēm, taču vēl kriptogrāfiski neapstiprina, ka `embedded` vai `audio-bridge` marķējums patiešām nācis no servera īpašumā esošas ekstrakcijas. Uztveriet `source` kā neuzticamu mājienu, līdz šī pārbaude tiek ieviesta; nebalstiet uz to autorizācijas lēmumus.

Uzlabots zvanītājs var nodrošināt jau autorizētu `audioTranscript` ierakstu
tam pašam videoklipam. Saplūšanas šuve apvieno vizuālos un audio novērojumus zem
viena termiņa un pārtraukšanas signāla, sakārto tos kopīgā laika skalā, apvieno
precīzus dublikātus un ziņo par daļēju rezultātu, ja tikai viena puse ir veiksmīga.
Nederīgs `audioTranscript` samazinās līdz šim daļējam rezultātam — vizuālais
apraksts tiek saglabāts, un audio atzars ieraksta sanitāru kļūdas kodu —
tā vietā, lai atteiktu visu videoklipu. Katra atzara pieejamība, daļējais karodziņš
un sanitārie kļūdu kodi tiek saglabāti aprakstītajā rezultātā,
aizsardzības metadatos (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), rezultātu kešatmiņas metadatos un tilta
saplūšanas skaitītājos. Noklusējuma Video Bridge ceļš neizsauc runas-uz-tekstu
vai nelejuplādē otru multivides kopiju; bez šī skaidrā ieraksta tas paliek
tikai video.

**Transkripta saglabāšana (#12150 P1).** Tas tiek automātiski piemērots ikreiz, kad
Video Bridge (pats ir izvēles) atveido transkripta norādi — nav atsevišķa
saglabāšanas karodziņa. Kad pieprasījums atveido jebkuru transkripta norādi (zvanītāja deklarēts
`transcript` vai sapludināts `audioTranscript`), aizsardzība to atzīmē kā
`videoBridgeObserved` un izveido rediģētu video apraksta ēnu —
identisku atveidojumu, kurā katras norādes brīvā teksta saturs tiek aizstāts ar
`[redacted-video-transcript]`, kas tiek veidots, aizstājot strukturēto norādes lauku
pirms virknes salikšanas (nekad neanalizējot saplacināto tekstu, tāpēc neviens norādes
saturs — pretiniecisks vai parasts, ieskaitot saturu, kas satur `]` piemēram,
`[inaudible]`/`[music]` — nevar izdzīvot). Saglabātais zvanu žurnāla pieprasījuma saturs apmaina
katru no video atvasināto teksta daļu ar šo rediģēto ēnu, saskaņojot pēc satura
vienlīdzības; `fullText` enkurs tiek atkārtoti nolasīts no pabeigtās pirmszvanu aizsardzības
datu plūsmas, tāpēc saskaņošana joprojām ir veiksmīga pēc vēlāku ķēdes aizsardzību (PII un
akreditācijas datu maskētāji, prioritātes 10/95) apraksta teksta pārrakstīšanas vietā un
pēc sistēmas uzvednes/nodošanas/atmiņas injekcijas ziņojumu masīva pārveidošanas.
Modelim nosūtītais saturs paliek nemainīgs. Novērots pieprasījums arī neaizpilda
nekādu ilgstošu atmiņu (tiek izlaista gan pieprasījuma, gan atbildes atvasināta ekstrakcija),
tāpēc modeļa paša atbilde nevar atspoguļot transkripta tekstu atmiņā.

Papildu saglabātās kopijas izmanto to pašu novērotā pieprasījuma signālu. Neapstrādāts
pirmsaizsardzības klienta pieprasījuma momentuzņēmums, atmiņā esošais gaidošais pieprasījums un agrīns
noraidīto pieprasījumu žurnāls strukturāli aizstāj transkripta laukus video daļās;
virknes uzvednes, ko sintezē cauruļvada posmi un konteksta nodošana, tiek rediģētas
saglabātā pieprasījuma satura izlietnē. Saglabātais `video_content_removed` marķieris
liek `previous_response_id` turpinājumam neizdoties slēgtā veidā, nevis rekonstruēt
tekstu, kas tika apzināti izmests. Ja novērots pieprasījums zaudē savu
daļēju rediģēšanas ēnu pirms reģistrēšanas, vai pat viena no vairākām video ēnām
neizdodas saskaņot pēc vēlākām pieprasījuma mutācijām, saglabātais pieprasījuma saturs tiek
pilnībā izlaists, nevis saglabāts daļēji rediģēts transkripts.

Novērota pieprasījuma gadījumā modeļa atbilde var citēt jebkuru transkripta daļu
bez strukturētas norādes robežas. Tā saglabātais zvanu žurnāla
`responseBody` tādēļ tiek aizstāts ar izlaiduma marķieri; detalizētais
cauruļvada artefakts (kas var ietvert augšupējos/klienta saturu un straumes fragmentus)
netiek saglabāts. Semantiskās, idempotences un pamatojuma atkārtošanas kešatmiņas apiet
lasījumus un rakstījumus šim pieprasījumam. Pakalpojumu sniedzēja pieprasījums un klientam redzamā
atbilde paliek nemainīgas. Agrīnie uzturēšanas baiti tiek iztukšoti no pagaidu
bufera, kad detalizētais artefakts tiek izlaists. Kiro kļūdainā EventStream
brīdinājums ziņo tikai par datu plūsmas baitu skaitu, nekad par tā saturu vai JSON
parsera neapstrādāto kļūdu.
Tas nenozīmē, ka katra nesaistīta pakalpojumu sniedzēja/spraudņa diagnostika ir
pārbaudīta; plašāka saglabātās izlietnes pārbaude tiek izsekota #11658.

Iekšējais `/api/modality-bridge/video/drilldown` dzīves cikls ir atsevišķs,
cilpas/tokena autentificēts kešatmiņas substrāts. Katra operācija prasa arī
kanonisku necaurspīdīgu galvenā ID. Pirms ražošanas zvanītājs tiek iespējots, tam ir
jāatvasina šis ID no autentificētā nomnieka un nekad nedrīkst pārsūtīt
klienta izvēlētu vērtību. Kešatmiņas atslēgas saista šo galveno ar kanonisku sesiju un
video-atsauces ID, saglabā tikai to SHA-256 atvasinātās atslēgas un ierobežo gan lasījumus,
gan dzēšanu tam pašam galvenajam. Kešatmiņa saglabā ne vairāk kā 16 atvasinātus JPEG
kadru katram ierakstam, izdzēš tos pēc desmit minūtēm un atbalsta ierobežotus
`start`/`end` lasījumus vai skaidru sesijas dzēšanu.

Katram galvenajam ir ierobežojums līdz 16 ierakstiem un 64 MiB kanonisko JPEG datu. Šie
ierobežojumi ir neatkarīgi no globālā 64 ierakstu/256 MiB griestiem: galvenā kvotas
spiediens izmet tikai šī galvenā vismazāk nesen izmantotos ierakstus pirms globālās
LRU izmetšanas apsvēršanas. Izbeigušies ieraksti tiek izņemti gan no galvenās, gan
globālās uzskaites kešatmiņas darbības laikā, savukārt atcelšana un validācijas kļūme
neveic daļēju aizstāšanu.

Kešatmiņa noraida nekanonisku Base64, pārmērīgu polsterējumu, ne-JPEG multivides, nepareizi formatētus vai
apgrieztus JPEG attēlus un JPEG attēlus, kas rada brīdinājumu ierobežotas pilna attēla `sharp`
dekodēšanas laikā. Tā atkārtoti kodē katru pieņemto attēlu kā kanonisku JPEG, atvasina platumu un augstumu
no dekodētajiem baitiem, nevis uzticas zvanītāja laukiem, un izmet visus beigu
poliglota baitus, nevis tos saglabā. Tikai ierobežotais kanoniskais saspiestais buferis
tiek iekļauts abās kvotās. JSON vadu ierobežojums ietver Base64 pieskaitāmās izmaksas 32 MiB
dekodētās ievades griestiem. Katra
saglabātā atvasināšana ieraksta tās validēto JPEG formātu/izšķirtspēju, paraugu ņemšanas politiku,
atvasināšanas versiju, izveides laiku, servera aprēķināto satura jaucējkodu un jaucējkodu vecāku
atsauci, kā arī uzticamā zvanītāja vecāku satura jaucējkodu. Atcelšana tiek pārbaudīta
starp asinhronām dekodēšanas/jaucējkodu fāzēm pirms atomiskās kešatmiņas apstiprināšanas.

Šī tranše vēl nesavieno ražošanas producentu ar maršrutu un nenodrošina
vairāku izšķirtspēju variantu izvēli. Caurspīdīgais Video Bridge pieprasījuma
ceļš tādējādi nerada papildu darbu, savukārt nomniekam piesaistītā galvenā atvasināšana un
pilns FU-08 vairāku izšķirtspēju dzīves cikls paliek kā skaidri turpmākie darbi,
nevis tiek dokumentēti kā pabeigta uzvedība.

Kadru paraksti tiek secīgi veidoti ar konfigurēto Video modeli. Tukšs
Video ignorēšanas iestatījums manto Vision iestatījumu; ja abi ir tukši, Vision
automātiskais maršrutētājs izvēlas efektīvo redzes spējīgo modeli. Veiksmīgi paraksti
aizstāj oriģinālo daļu ar stabilu `[Video description:` prefiksu, kas arī
atzīmē tekstu kā neuzticamu no medijiem atvasinātu novērojumu un norāda
pakārtotajiem modeļiem nesekot medijos atrastajām instrukcijām. Kadru parakstu kešatmiņas atslēgas
ietver JPEG baitus, uzvedni, laika zīmogu un efektīvo modeli; tiek kešatmiņā saglabāti tikai veiksmīgi
paraksti. Kešatmiņas ieraksti saglabā faktisko veiksmīgo producenta modeli,
ieskaitot rezerves modeli; tilts ziņo `mixed`, ja dažādus kadrus
ražoja dažādi modeļi. Kešatmiņas trāpījums atkārtoti izmanto šo producenta identitāti
tā vietā, lai to pārsauktu par pieprasīto maršrutēšanas plānu. Visa video rezultātu
kešatmiņa tiek atslēgta ar katru ievadi, kas maina izvadi — uzvedni, efektīvo
modeli, paraugu ņemšanas politiku, kadru skaitu, semantiskās analīzes režīmu,
normalizētā fokusa mājiena SHA-256 pirkstu nospiedumu, fokusa logu, `transcript`,
`audioTranscript` un kontaktu lapas karodziņu — tādējādi jebkuras no šīm
dimensijām maiņa ir kešatmiņas kļūda, nekad novecojusi atkārtota izmantošana. Vizuālās
dublēšanas politikas versija, slieksnis un ierobežotais kandidātu kadru skaits
ir arī skaidri norādīti rezultātu kešatmiņas atslēgā un metadatos; tādējādi politikas
maiņa nevar atkārtoti izmantot novecojušu visa video aprakstu. Rezultātu kešatmiņas
v4 metadati saglabā režīmu un pirkstu nospiedumu, nekad neapstrādātu lietotāja uzdevumu.
Aizsardzības metadati ziņo gan par pieprasītajiem, gan efektīvajiem analīzes režīmiem;
pieprasītais `focused` režīms bez izmantojama lietotāja teksta tiek ziņots kā efektīvi `full`.

Aizsardzības sistēma izvelk katru atbalstīto video daļu, bet apraksta ne vairāk kā
`modalityBridgeVideoMaxVideos`. Mērķim, kas ir pierādīts, ka tam ir
`supportsVideo === false`, neizdevušies un pārsniegtie video kļūst par skaidriem drošiem
teksta marķieriem, lai neviens neapstrādāts video nepaliktu. Ja spēja nav zināma,
šīs daļas paliek neskartas. Mērķi ar `supportsVideo === true` apiet tiltu.
Klienta pieprasījuma pārtraukšanas signāls izplatās lejupielādē, brokera rindā,
apakšprocesos un parakstu izsaukumos; pārtraukumi apstājas starp video un nekad
neizdodas atvērt neapstrādātus medijus.

Izpildlaika iestatījumi ir balstīti uz DB un Zod-validēti:

| Atslēga                             | Noklusējums | Diapazons / uzvedība                                                                                         |
| :---------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Izvēles izpildlaiks, pieteikšanās                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` saglabā vispārīgus parakstus; `focused` izmanto ierobežotu, neuzticamu jaunāko lietotāja kontekstu    |
| `modalityBridgeVideoModel`          | `""`        | Manto Vision Bridge modeli                                                                                   |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` vai proporcionāls `segment_aware`; detektora kļūmes gadījumā atgriežas uz `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                               |

Mantotās saglabātās video taimauta vērtības virs 120 sekundēm tiek ierobežotas līdz
brokera termiņam; jauni iestatījumu ieraksti virs šī ierobežojuma tiek noraidīti.
`GET /api/modality-bridge/video/runtime` prasa uzticamu zīmogotu atgriezeniskās saites
lokalitāti pirms autentifikācijas vai izpildlaika pārbaudes, pēc tam prasa pārvaldības
autentifikāciju. Tas atgriež tikai `available`, sanitizētas FFmpeg/ffprobe versijas un
fiksētu iemeslu, ja izpildlaiks nav pieejams. Iekšējais ekstrakcijas galapunkts nav
publiska augšupielādes API: rindas piesātinājums atgriež `503` plus `Retry-After`,
zvanītāja atvienošanās atgriež `499`, un fiksētais brokera termiņš atgriež `504`.
Konvertētās atbildes pievieno `video->text;model=<visionModel>;parts=<videos>`
centrālajai `x-omniroute-modality-bridge` galvenei, neizņemot Vision vai Audio segmentus.

### PII maskētājs (`piiMasker.ts`)

Darbojas **abos** posmos.

- **`preCall`** klonē lietderīgo slodzi, pārlūko `system`, `messages`, `input` un
  `prompt` (ieskaitot vienkāršus virknes elementus) un lieto `processPII()` (no
  `@/shared/utils/inputSanitizer`) virknes `content`/`text` laukiem. Kad
  `PII_REDACTION_ENABLED=true`, atklātā PII tiek rediģēta izejošajā lietderīgajā slodzē.
  Tas ir neatkarīgi no `INPUT_SANITIZER_MODE` (kas kontrolē tikai
  uzvednes injekcijas politiku). Kad rediģēšana ir izslēgta, izsaukums reģistrē
  atklāšanas skaitu, nepārrakstot saturu.
- **`postCall`** dziļi klonē atbildi, palaiž `sanitizePIIResponse()` plus
  Responses-API-shape maskētāju (`maskResponsesOutput` — aptver
  `output_text` un `output[].content[].text`). Ja notiek kāda rediģēšana,
  modificētā atbilde aizstāj oriģinālo.

Aizsardzības sistēma nekad nebloķē; tā tikai anotē (`meta.detections`,
`meta.redacted`) vai pārraksta.

### Uzvednes injekcija (`promptInjection.ts`)

Atklāj pretinieku struktūras lietotāja sniegtajā saturā un piemēro
konfigurēto politiku. Uzvedību nosaka vides mainīgie un konstruktora
opcijas:

| Iestatījums     | Env var                                                                                               | Noklusējums | Efekts                                                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Ja `false`, aizsargsistēma tiek apieta.                                                                                                                                                     |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Injekcijas politika: `block`, `warn` vai `log`. (`redact` tiek pieņemts atpakaļsaderībai, bet **nenoņem** injekcijas tekstu; PII pārrakstīšana tiek kontrolēta ar `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | Minimālā nepieciešamā smaguma pakāpe bloķēšanai. Vidēja ir tikai novērošanas režīmā pēc noklusējuma.                                                                                        |

**Režīma prioritāte** (`getMode`): izsaucēja `options.mode` →
`INJECTION_GUARD_MODE` **DB funkciju karodziņa ignorēšana** (Informācijas panelis → Iestatījumi →
Funkciju karodziņi) → `INJECTION_GUARD_MODE` vides mainīgais → `INPUT_SANITIZER_MODE` vides mainīgais →
`warn`. Tādējādi informācijas paneļa ignorēšana ir pārāka par vides mainīgajiem, tāpēc funkciju
karodziņu lietotāja saskarne kontrolē darbojošos aizsargu tiešraidē (bez restartēšanas). DB lasīšana ir
droša pret kļūdām: ja rodas kļūda, aizsargs atgriežas pie vides mainīgajos balstītas uzvedības, un,
ja nav iestatīta ignorēšana, uzvedība ir identiska tikai vides mainīgajos balstītai izšķirtspējai.

Atklāšanas avoti:

1.  `sanitizeRequest()` no `@/shared/utils/inputSanitizer` (kopīgs detektoru kopums, ko izmanto citur
    cauruļvadā).
2.  Iebūvētie `DEFAULT_GUARD_PATTERNS` (pašlaik `system_override_inline` un
    `markdown_system_block`, abiem `high` smaguma pakāpe).
3.  Neobligātie `customPatterns`, kas tiek nodoti, izmantojot konstruktora opcijas (virknes, regulārās
    izteiksmes vai `{ name, pattern, severity }` ieraksti).

Kad `mode === "block"` **un** vismaz viena atklāšana atbilst smaguma
slieksnim, `preCall` atgriež `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`/`log` režīmos aizsargsistēma reģistrē, bet
atļauj izsaukumu. Kopīgais palīgs `evaluatePromptInjection()` tiek eksportēts arī
izsaucējiem, kuriem nepieciešams novērtēt uzvednes, neizmantojot reģistru.

**Skenēšanas ierobežojums (v3.8.20):** detektors pārbauda tikai **pirmos 16 KB**
apvienotā uzvednes teksta — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failā
`src/shared/utils/inputSanitizer.ts`. Gan `detectInjection()`, gan
`evaluatePromptInjection()` izmanto `slice(0, MAX_INJECTION_SCAN_BYTES)` pirms modeļa cilpas
palaišanas. Injekcijas direktīvas atrodas tuvu ievades sākumam, tāpēc tas ierobežo
regulāro izteiksmju CPU/GC izmantošanu simtiem KB lielās datu plūsmās, nepasliktinot
atklāšanu (sal. #3932, #4041).

### Akreditācijas datu maskētājs (`credentialMasker.ts`)

Darbojas **abos** posmos, pēdējais noklusējuma ķēdē (prioritāte `95`). Rediģē
labi zināmus API atslēgu / slepeno žetonu modeļus no izejošās datu plūsmas
(ziņojuma saturs, rīka izsaukuma argumenti, rīka rezultāti) **un** pakalpojumu
sniedzēja atbildes, lai akreditācijas dati, kas ielīmēti uzvednē (vai atspoguļoti
rīka rezultātā), netiktu nopludināti augšupējam pakalpojumu sniedzējam vai atpakaļ
klientam.

- **Tikai ar piekrišanu**, tāda pati konvencija kā PII rediģēšanai (stingrais noteikums #20-blakus):
  atspējots, ja vien `settings.credentialRedactionEnabled === true` **vai**
  `CREDENTIAL_REDACTION_ENABLED=true`. Ja tas ir izslēgts, aizsargsistēma ir bezdarbīga —
  tā nekad nebloķē un nekad nepārraksta.
- `redactCredentials()` pārlūko pilnu datu plūsmas/atbildes koku (`walkValue()`,
  drošs pret prototipu piesārņojumu, drošs pret cikliem, izmantojot `WeakSet`) un aizstāj
  atbilstības ar `[REDACTED:<type>]` vietturi, klonējot tikai tās zarus, kas patiešām
  mainījās.
- `CREDENTIAL_PATTERNS` aptver LLM pakalpojumu sniedzēju atslēgas (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS žetonus (GitHub, Slack, Linear,
  Notion, npm, Postman, Discord), maksājumu atslēgas (Stripe, Square), mākoņpakalpojumu
  atslēgas (AWS piekļuves atslēga, Twilio, SendGrid, Mailgun), privātās atslēgas / JWT,
  akreditācijas datus saturošas savienojuma virknes (`mongodb://user:pass@...` utt.) un
  vispārīgu `Authorization`/`x-api-key`/`api-key`/`apikey` galvenes vērtības modeli.
  Galvenes formas atslēgas (`authorization`, `x-api-key`, `api-key`, `apikey`) tiek
  rediģētas strukturāli (tikai vērtība, shēmas prefikss, piemēram, `Bearer `/`Basic `,
  tiek saglabāts), nevis izmantojot vispārīgu teksta regulāro izteiksmi.
- Aizsargsistēma nekad nebloķē; tā tikai pārraksta (`modifiedPayload` /
  `modifiedResponse`) un anotē (`meta.credentialsRedacted`, `meta.count`).

Regresijas aizsargs: `tests/unit/credential-masker-guardrail.test.ts`.

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
