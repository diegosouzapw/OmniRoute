# Guardrails (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Pirminis tiesos šaltinis:** `src/lib/guardrails/`
> **Paskutinį kartą atnaujinta:** 2026-08-29 — v3.8.51 („Video Bridge“ transkripcijos kilmę deklaruoja iškvietėjas,
> serveris jos dar nepatvirtina — patikslinta pagal #11661)

Apsaugos priemonės užtikrina saugos, politikos ir turinio transformacijas ties
riba tarp „OmniRoute“ ir išorinių teikėjų. Kiekviena apsaugos priemonė gali tikrinti
(ir pasirinktinai atmesti, transformuoti arba anotuoti) užklausų naudingąsias apkrovas (`preCall`) ir
išorinių teikėjų atsakymus (`postCall`).

Sistema yra **fail-open**: jei vykdant apsaugos priemonę įvyksta išimtis, registras
įrašo klaidą ir tęsia darbą su kita apsaugos priemone, užuot atmetęs
užklausą. Blokavimas visada yra sąmoningas sprendimas (`block: true`), o ne atsitiktinumas.

## Integruotos apsaugos priemonės

Importuojant registras automatiškai įkelia šešias apsaugos priemones prioriteto tvarka
(žr. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritetas | Pavadinimas         | Etapas (-ai)   | Failas                |
| ----------- | ------------------- | -------------- | --------------------- |
| `5`         | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`         | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`         | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`        | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`        | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`        | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mažesnį prioriteto numerį turinčios priemonės vykdomos **pirmos**.

### Vaizdo tiltas (`visionBridge.ts`) — Modalumo tiltas PR-1

Perima užklausas su vaizdais, skirtas **vaizdų nepalaikantiems modeliams**, ir
arba nukreipia visą užklausą į vaizdus palaikantį modelį, arba prieš
išorinį iškvietimą pakeičia vaizdų dalis tekstiniais aprašymais, sugeneruotais
konfigūruojamo vaizdų modelio. Taip tik tekstą palaikantys teikėjai gali skaidriai apdoroti
daugiarūšes naudingąsias apkrovas.

Eiga:

1. Praleisti, jei tikslinis modelis jau palaiko vaizdus (nebent jis yra
   priverstinio tilto sąraše `isVisionBridgeForcedModel`).
2. Išskirti vaizdų dalis naudojant `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kuri perduoda darbą **suvienodintam medijos
   detektoriui** `detectMediaParts()`, esančiam `open-sse/utils/mediaParts.ts` — tai
   vienintelis tiesos šaltinis, bendras su derinio suderinamumo filtru.
   Išskyrimas pagal leidžiamųjų sąrašą taikomas tik aukščiausio lygio tokių formų dalims,
   kurias `replaceImageParts` gali vėl įterpti (išskyrimo↔pakeitimo sutartis): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ir Responses API `input_image`. Įdėtiniai atitikmenys ir
   tik indikatorius turinčios formos yra derinio filtro medžiaga ir niekada neišskiriami.
   Praleisti, jei nieko nerasta.
3. Nustatyti vykdymo laiko konfigūraciją naudojant `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nauji `modalityBridge*`
   nustatymų raktai turi pirmenybę; seni `visionBridge*` raktai lieka kaip **vieno ciklo
   atsarginis variantas** (grąžinimo langas). Jei tiltas išjungtas, praleisti prieš
   pradedant bet kokį medijos naršymą.
4. Režimo parinkiklis (`modalityBridgeVisionMode`, žr. toliau pateiktą lentelę) pasirenka
   nukreipimą arba aprašymą. Nukreipimas grąžina `modifiedPayload`, kurioje pakeistas tik
   `model`, ir metaduomenis `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprašymo kelias: apriboti vaizdų skaičių iki `maxImages`, sudaryti užduotį atitinkančią užklausą,
   patikrinti aprašymų podėlį, iškviesti vaizdų modelį **lygiagrečiai**
   (`Promise.allSettled`) ir vietoje vaizdų įterpti tekstines dalis
   `[Image N]: <description>`. Nepavykus aprašyti grąžinama `null`, o pradinė vaizdo dalis
   **išsaugoma** (#4012), išskyrus derinio aprašymo kelią, kai nepavyko visi
   aprašymai: tokiu atveju patvirtintam vaizdų nepalaikančiam išoriniam teikėjui pateikiamas
   pakaitinis tekstas `(unavailable — no vision-capable provider connected)` (#8430).
6. Grąžinti `modifiedPayload` ir metaduomenis (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režimo parinkiklis (`modalityBridgeVisionMode`)

| Režimas    | Numatytasis | Veikimas                                                                                                                                                                                                                                                                                                                  |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Nepakeista ankstesnė euristika (#6640/#7204): ne derinio / `auto/` modeliai nukreipiami į geriausią vaizdų modelį, nebent pradinis modelis jau turi tinkamus prisijungimo duomenis (tada aprašoma); derinio tikslai visada aprašomi.                                                                                      |
| `describe` |             | Visada aprašyti — nukreipimo blokas visiškai praleidžiamas; visada atsako naudotojo pasirinktas modelis.                                                                                                                                                                                                                  |
| `reroute`  |             | Priverstinis nukreipimas: modelio su prisijungimo duomenimis išlaikymo apsauga apeinama. Nukreipimo **tikslo** prisijungimo duomenų apsauga vis tiek taikoma — kai nėra tinkamo vaizdų tikslo, užklausa perduodama aprašymui, kad neapdoroti vaizdai niekada nepasiektų tik tekstą palaikančios galinės sistemos (#8430). |

Priverstiniai režimai nutraukia vykdymą **prieš** paleidžiant automatinę euristiką; `auto` veikimas
baitų lygmeniu yra identiškas iki PR-1 buvusios apsaugos priemonės veikimui.

#### Užduotį atitinkanti aprašymo užklausa (`modalityBridgeVisionTaskAware`)

Numatytoji reikšmė — **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) prie
bazinės aprašymo užklausos prideda **paskutinio naudotojo pranešimo** tekstą (sutrumpintą
iki 500 simbolių), taip nukreipdama aprašymą į tai, ko naudotojas iš tikrųjų klausė
(`codex-vision-proxy` šablonas), ir prašydama vaizdų modelio transkribuoti matomą
tekstą. Kai ši žyma išjungta arba nėra naudotojo teksto, bazinė užklausa naudojama nepakeista.

Aprašymo vidinio ciklo OpenAI suderinama užklausa (`callVisionModelSingle()`
faile `visionBridgeHelpers.ts`) visada nustato `image_url.detail: "high"` —
besąlygiškai, kiekvienam iškvietėjui / teikėjui, neatsižvelgiant į jokį kliento
signalą. Mažo detalumo atranka sumažina OCR tikslumą būtent teksto transkribavimo
užduočiai, kurios prašoma šiame raginime, todėl pats aprašymo iškvietimas visada
prašo didelio detalumo, nepaisydamas to, kokį detalumo lygį naudojo pradinė
gaunama užklausa. Tai veikia tik vidinį aprašymo užklausos turinį; tai nekeičia,
kaip OmniRoute persiunčia paties iškvietėjo `image_url.detail` pirminėje
užklausoje — ši numatytoji reikšmė pritaikoma atskirai ir tik aptiktiems OpenCode
klientams, naudojant `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Aprašymo vidinio ciklo Anthropic
perdavimo formato šaka neturi `detail` lauko, todėl nė viena numatytoji reikšmė
jai įtakos nedaro.

#### Aprašymo išvesties riba (`modalityBridgeVisionMaxChars`)

| Raktas                         | Numatytoji reikšmė | Diapazonas         |
| ------------------------------ | ------------------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`                | `0` arba 100–50000 |

`0` (numatytoji reikšmė) reiškia **be ribos** — `callVisionModel()` grąžintas
aprašymas perduodamas nepakeistas, taip išsaugant esamą veikseną. Bet kokia
reikšmė iš 100–50000 diapazono sutrumpina aprašymą ir prideda `…` galūnę prieš
įterpiant jį kaip `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` faile `src/lib/guardrails/visionBridge.ts`).
Padidinkite šią reikšmę daug detalių turinčioms OCR užduotims, kai tolesniam
modeliui reikia visos transkripcijos; sumažinkite ją, kad apribotumėte žetonų
naudojimą su pernelyg išsamiais vaizdo modeliais. Valdymo skydelio laukas yra
Vision skirtuko Advanced skydelyje (`modality-bridge-max-chars` faile
`ModalityBridgeVisionTab.tsx`) ir bet kokią reikšmę nuo 1 iki 99 padidina iki
minimalios 100 reikšmės, tačiau aiškiai nurodytą `0` palieka nepakeistą — `0`
yra savarankiška tinkama Zod reikšmė
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), o ne vien
numatytoji „nenustatyta“ reikšmė.

#### Aprašymo podėlis (`modalityBridge/bridgeCache.ts`)

Atmintyje laikomas LRU + TTL podėlis aprašymo išvestims, bendrinamas viso proceso
mastu. Raktas = `sha256(imageRef + composedPrompt + configuredBridgeModel)` su
ilgio prefiksais atskirtiems laukams (be kolizijų tarp laukų ribų). Modelio
komponentas yra **sukonfigūruotas** tilto modelis, o ne faktiškai atsakęs
modelis — `callVisionModel` viduje gali naudoti atsarginį modelį, o rakto
sudarymas pagal kiekvieną bandymą suskaidytų podėlį. Nesėkmingi aprašymai niekada
nekaupiami podėlyje. Nustatymai:

| Raktas                          | Numatytoji reikšmė | Diapazonas |
| ------------------------------- | ------------------ | ---------- |
| `modalityBridgeCacheEnabled`    | `true`             | —          |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000    |

#### Nuotolinių vaizdų normalizavimas (vidinio ciklo aprašymas / base64 gavimas)

Kai tiltas pats gauna **nuotolinį** vaizdą — Anthropic aprašymo vidiniam
iškvietimui arba claude perdavimo formato base64 konvertavimui
(`ensureBase64ImagesForClaudeWire`), abiem atvejais naudojant
`fetchRemoteImageAsDataUri()` faile `visionBridgeHelpers.ts` — gautas duomenų URI
prieš įterpiant jį į vaizdo modelio užklausą perduodamas per
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Per didelių vaizdų
**ilgoji kraštinė sumažinama iki 2048px** (tai atitinka dydžio ribą, kurią
OpenAI / Anthropic jau taiko serverio pusėje), todėl sumažėja įkeliamų duomenų
kiekis ir delsa, nekeičiant to, ką mato vaizdo modelis. Dydžiui keisti naudojamas
`sharp`, įkeliamas dinaminiu importu: platformoje, kurioje nepavyksta įkelti jo
savosios dvejetainės bibliotekos, `normalizeDataUri()` **niekada negeneruoja
išimties** — vietoje to pradiniai baitai perduodami nepakeisti, todėl aprašymo /
base64 konvertavimo kelias visada lieka veikiantis. Ne vaizdo baitai (kai gavus
duomenis nebuvo grąžintas iškoduojamas vaizdas) taip pat perduodami nepakeisti.
Šis normalizavimas taikomas tik vaizdams, kuriuos tiltas gauna savo vidiniam
iškvietimui — jis niekada netaikomas neapdorotam iškvietėjo tiesiogiai
perduodamam turiniui, laikantis tik aiškiai įjungiamų pakeitimų principo
(griežta taisyklė Nr. 20).

#### Nustatymų schema + migracija

Nauji `modalityBridge*` raktai tikrinami naudojant Zod schemoje
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` trejetas ir Audio Bridge naudojama
`modalityBridgeAudio*` grupė. Migracija `141_modality_bridge_settings.sql`
nukopijuoja esamas senąsias `visionBridge*` reikšmes į atitinkamus naujus
raktus (idempotentiškai ir niekada neperrašo operatoriaus nustatytos
`modalityBridge*` reikšmės); vieną leidimo ciklą senieji raktai ir toliau
priimami kaip atsarginis skaitymo šaltinis.

#### Skaidrumo antraštė + statistika

Aprašymu transformuotuose atsakymuose pateikiama
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(sukuriama naudojant `buildModalityBridgeHeader()` faile
`modalityBridge/bridgeStats.ts`, pridedama naudojant
`withModalityBridgeHeader()` faile `src/sse/handlers/chatHelpers.ts`).
Peradresuotos užklausos **negauna** antraštės — turinys nebuvo pakeistas, o
modelio pakeitimas jau matomas atsakymo turinio `model` lauke.

`GET /api/modality-bridge/stats` (valdymo autentifikavimas, tas pats lygis kaip
`GET /api/settings`) grąžina atmintyje laikomus kiekvieno modalumo skaitiklius
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`, skirtus `vision`, `audio` ir
`video`. `averageLatencyMs` vardikliui naudoja `latencySamples`, o ne visus
bandymus; operacija be trukmės matavimo nesukuria netikro nulio milisekundžių
mėginio. `bridged` išlieka su ankstesnėmis versijomis suderinamas sėkmingų
konvertavimų alternatyvus pavadinimas; nesėkmingi bandymai jo nepadidina.
Pagal numatytą veikseną skaitikliai nustatomi iš naujo paleidus procesą
(tai telemetrija, o ne apskaita).

#### Valdymo skydelio konfigūracija

Specialusis skydelio puslapis yra
`/dashboard/settings/modality-bridge`. Jo per URL pasiekiami skirtukai „Vaizdas“, „Garsas“
ir „Vaizdo įrašas“ perjungiant `tab` reikšmę išsaugo užklausos parametrus.
Skirtuke „Vaizdas“ galima įjungti funkciją, pasirinkti režimą ir modelį (įskaitant automatinį
numatytąjį pasirinkimą), konfigūruoti užduotį atitinkančias užklausas, išplėstinius skirtojo laiko, vaizdų, aprašo ilgio ir podėlio
apribojimus, peržiūrėti vykdymo
skaitiklius ir saugiai išsiųsti pavyzdinę užklausą. Skirtukas „Garsas“ taip pat veikia: jame galima
įjungti funkciją, pasirinkti tik STT skirtą modelį su parinktimi „Automatiškai“, nustatyti skirtojo laiko ir didžiausio klipų skaičiaus apribojimus, peržiūrėti garso
skaitiklius ir atlikti pavyzdinį `input_audio` bandymą. Skirtukas „Vaizdo įrašas“ yra funkcionalus: jame rodoma
FFmpeg/ffprobe vykdymo aplinkos būsena — viena iš keturių aiškiai apibrėžtų sąsajos būsenų (`unknown`, kol
patikra vykdoma arba jos nepavyko užbaigti, `restricted`, kai skydelio
pagrindinis kompiuteris nėra grįžtamojo ryšio adreso, todėl patikra praleidžiama kliento pusėje, `unavailable`, kai patikrinus
patvirtinama, kad priemonės nėra, arba `available`, kartu nurodant FFmpeg/ffprobe versijas) — išsaugomi
įjungimo, modelio, kadrų, vaizdo įrašo ir skirtojo laiko apribojimai, modelių parinkiklyje paliekami tik vaizdą apdorojantys
modeliai ir pateikiami vaizdo įrašų skaitikliai.

Ankstesnė „Vision Bridge“ kortelė DI nustatymuose dabar yra suderinamumo nuoroda į
naująjį puslapį; joje nebėra antrosios formos kopijos. „Media Providers“ taip pat
susieja vaizdo konvertavimo į tekstą ir kalbos konvertavimo į tekstą darbo eigas su atitinkamais „Modality
Bridge“ skirtukais, nepašalindama esamos kalbos konvertavimo į tekstą bandymų aplinkos.

**Priėmimo patikros apėjimas saviciklyje:** kai aprašymo iškvieta nukreipiama per paties OmniRoute
`/v1` saviciklį (nestandartinį teikėjo modelį), papildoma užklausa siunčia
`x-omniroute-admission-bypass: internal` ir autentifikuojama naudojant nustatytą
saviciklio kredencialą — vietinį `sk_omniroute` žymeklį vietiniu režimu arba
operatoriaus sukonfigūruotą `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` aplinkos raktą (#1350), kad
diegimuose su `REQUIRE_API_KEY=true` vis tiek būtų galima vykdyti aprašymo iškvietą. Apėjimas
leidžiamas tik naudojant būtent šiuos kredencialus, todėl išoriniai klientai negali naudoti šios
antraštės priėmimo patikrai praleisti.

Seni numatytieji nustatymai yra faile `src/shared/constants/visionBridgeDefaults.ts`;
nauji režimo, užduoties suvokimo ir podėlio numatytieji nustatymai bei nustatymų sprendiklis yra faile
`src/shared/constants/modalityBridgeDefaults.ts`. Apsaugos mechanizmas pateikia
`deps` konstruktoriaus parinktį, kad testuose būtų galima įterpti netikras `getSettings` ir
`callVisionModel` realizacijas.

### Garso tiltas (`audioBridge.ts`) — „Modality Bridge“ PR-3

Perima pokalbių užklausas su garsu prieš joms pasiekiant paskirties tašką, apie kurį nėra
žinoma, kad jis priima garso įvestį. Pokalbio užklausa niekada nenukreipiama kitu maršrutu: garso dalys
transkribuojamos per esamą su OpenAI suderinamą kelių dalių galinį tašką, o
pasirinktas pokalbio modelis tęsia darbą naudodamas tekstines transkripcijas.

Eiga:

1. Nustatyti `supportsAudio` per `getResolvedModelCapabilities()`. Pirmenybė teikiama aiškiai
   teikėjų registre nurodytiems metaduomenims, po jų — statiniams modelio metaduomenims, tada sinchronizuotiems
   `modalities_input`. Deklaruotas įvesčių sąrašas be `audio` reiškia `false`; jei
   nėra jokių galimybes patvirtinančių duomenų, lieka `null`. Tiek `false`, tiek `null` įjungia
   konservatyvų tiltą, o `true` jį apeina.
2. Nustatyti `modalityBridgeAudio*` nuostatas ir, naudojant bendrą `detectMediaParts()`
   detektorių, iš kiekvieno pranešimo išgauti sujungiamas aukščiausio lygio
   garso dalis. Palaikomi perdavimo formatai: OpenAI `input_audio`, `audio_url` ir
   `source.media_type: "audio/*"`. Įdėtasis garsas aptinkamas maršrutizavimo tikslais, tačiau
   sujungimo procedūra jo nepašalina. Apdorojimo apimtį riboja `modalityBridgeAudioMaxClips`;
   vėlesnės dalys lieka nepakeistos.
3. Naudoti sukonfigūruotą `provider/model` arba leisti `selectAudioBridgeModel()` stabilia
   katalogo tvarka pereiti per `AUDIO_TRANSCRIPTION_PROVIDERS` ir pasirinkti pirmą
   modelį, kuriam yra tinkamas aktyvaus teikėjo kredencialas.
4. `callAudioTranscription()` konvertuoja base64/data-URI garsą į kelių dalių
   `file` arba atsisiunčia nuotolinį `audio_url` per tik viešuosius adresus leidžiančią išeinančio ryšio
   apsaugą, naudodama DNS susiejimą ir 25 MB ribą. Tada failas ir pasirinktas
   modelis POST metodu siunčiami į vietinį `/v1/audio/transcriptions` saviciklį, autentifikuojamą naudojant
   `resolveSelfLoopBearer()`. Esamas transkripcijos maršrutas atlieka įprastą
   kredencialų paiešką, atvėsimo laikotarpio ir spartos apribojimų valdymą bei iškvietimo perdavimą teikėjui.
5. Sėkmingai apdorotos dalys pakeičiamos į `[Audio N]: <transcript>`. Iškvietimai
   vykdomi naudojant `Promise.allSettled`: nepavykus atskiram iškvietimui, išsaugoma atitinkama pradinė
   garso dalis (#4012 sutartis). Jei visi iškvietimai nepavyksta ir įrodyta, kad paskirties modelio
   `supportsAudio === false`, dalys pakeičiamos į
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 sutartis). Kai
   paskirties modelis nežinomas (`null`), nepavykus visiems iškvietimams turinys lieka nepakeistas. Įrodytai
   tik tekstą priimantis paskirties modelis, kuriam nėra tinkamo STT kredencialo, gauna tą patį aiškų
   pakaitinį tekstą nesiunčiant tinklo užklausos.

Sėkmingos transkripcijos naudoja visam procesui bendrą „Modality Bridge“ LRU/TTL podėlį. Raktas
sudarytas iš garso nuorodos, stabilios `audio-transcription` operacijos
žymos ir pasirinkto STT modelio; nesėkmingi rezultatai niekada neįrašomi į podėlį. Garso apdorojimo bandymai atnaujina
bendrus `bridged`, `cacheHits`, `failures` ir `lastUsedAt` skaitiklius.
Transformuoti atsakymai turi
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nepakeistos
užklausos negauna „Audio Bridge“ segmento.

Vykdymo aplinkos nustatymai saugomi DB ir tikrinami naudojant Zod:

| Raktas                        | Numatytoji reikšmė | Diapazonas              |
| ----------------------------- | ------------------ | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —                       |
| `modalityBridgeAudioModel`    | `""`               | Automatinis arba STT ID |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10                    |

Bendrą podėlį ir toliau valdo `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ir `modalityBridgeCacheMaxEntries`.

### Vaizdo įrašų tiltas (`videoBridge.ts`, `videoBridgePipeline.ts`)

Perima aukščiausiojo lygmens vaizdo įrašų dalis iš Chat Completions `messages` ir Responses
API `input` prieš iškviečiant paskirties sistemą, kuri neturi žinomo savaiminio vaizdo įrašų palaikymo.
Palaikomi formatai: `input_video`, `video_url`, `video_source`, HTTPS URL
ir `data:video/*;base64,...` duomenų URI. Paprasti failų vardai tekste nelaikomi
vaizdo įrašais.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) valdo užklausos perėjimą,
galimybių ir politikos patikrą, kiekvienos užklausos agregavimą bei atsakymo naudingąją apkrovą.
Kiekvieno vaizdo įrašo apdorojimas — gavimas, viso rezultato podėlis, kadrų
sekos aprašymas (sujungiantis bet kokią iškvietėjo deklaruotą garso transkripciją) ir kiekvieno bandymo
metrikos, nutraukimas bei išvalymas — yra paslėptas už `processVideoPart`, esančio
`videoBridgePipeline.ts`, kuris iškviečiamas po vieną kartą kiekvienai vaizdo įrašo daliai `preCall` cikle.
Šiame modulyje taip pat apibrėžiamos aiškios prievadų ribos `VideoMediaBrokerPort`
(baitų gavimas ir atrinktų kadrų išskyrimas), `VideoAudioTranscriptionPort`
(iškvietėjo deklaruotos garso transkripcijos sujungimas su atrinktų kadrų antraštėmis) ir
`VideoDrilldownPort` (išsamios kadrų analizės išsaugojimo riba; ji dar nesujungta
su `processVideoPart` — šiuo metu išsamios analizės įrašus kuria tik atskiras
`/api/modality-bridge/video/drilldown` maršrutas).

Viešasis `/v1` užklausų kelias niekada neimportuoja ir neiškviečia poprocesio. Nuotoliniai
vaizdo įrašai atsisiunčiami taikant 50 MiB ribą; įterptiesiems base64 vaizdo įrašams taikoma
konservatyvi 36 MiB dekoduoto turinio riba vienam vaizdo įrašui, kad modelio, pranešimų ir įrėminimo apvalkalas
tilptų į viešosioms JSON užklausoms taikomą 50 MiB priėmimo ribą. Įterptojo turinio
ilgis ir apskaičiuotas dekoduotas dydis patikrinami prieš skiriant atmintį. Pradiniam nuotoliniam URL ir
kiekvienam peradresavimui privalomas HTTPS, naudojant esamą tik viešuosius adresus leidžiančią
išeinančių ryšių apsaugą su DNS susiejimu. Tada baitai perduodami per tikslią vidinę
`POST /api/modality-bridge/video/extract` tarpininko ribą. Šis maršrutas yra ir
`LOCAL_ONLY`, ir `SPAWN_CAPABLE`, priima tik kiekvienam procesui autentifikuotą,
patikimą grįžtamojo ryšio sąsajos užklausą ir niekada nepriima URL, failų sistemos kelio, vykdomojo failo
ar argumentų sąrašo. API kūno dydžio apdorojimo grandinė ir tvarkytuvo inkrementinis kūno
skaitytuvas nepriklausomai užtikrina 50 MiB tarpininko įvesties ribą. Jo ribotoje eilėje vienu
metu vykdomas vienas išskyrimas, leidžiamos keturios laukiančios užduotys, o bendras laukiančios įvesties dydis
ribojamas iki 100 MiB.

Tarpininko viduje `ffprobe` skaito privatų vietinį failą; fiksuotame formatų
leidžiamajame sąraše nėra grojaraščių ir manifestų formatų. Leidžiamiems MOV šeimos
konteineriams išorinės MOV duomenų nuorodos pagal numatytąsias nuostatas lieka išjungtos, o
fiksuota komanda jų neįjungia. Ir `ffprobe`, ir `ffmpeg` naudoja tik `file`
protokolą leidžiantį sąrašą, vieną giją, fiksuotus argumentų masyvus, nenaudoja apvalkalo,
o vykdomieji failai surandami pagal `PATH`. Pridėto paveikslėlio viršelio srautai nelaikomi
atkūrimo kandidatais. Visi atkuriami srautai turi atitikti ribas, o aiškiai
nurodytam numatytajam srautui teikiama pirmenybė prieš deterministinį mažiausio indekso
atsarginį pasirinkimą. Vaizdo įrašų trukmė ribojama iki 600 sekundžių, kiekvienas matmuo — iki
8 192 pikselių, o šaltinio pikselių skaičius — iki 33 554 432. FFmpeg atrenka 1–16 JPEG kadrų
iš intervalų vidurio, sumažina ilgesniąją kraštinę daugiausia iki 1 024 pikselių, nedidindamas
mažesnių įvesčių, ir niekada negauna URL. Pagal numatytąsias nuostatas atrankos politika yra
`uniform`. Pasirenkamos `scene_aware` ir eksperimentinė `segment_aware` politikos atlieka
vieną papildomą fiksuotą FFmpeg perėjimą per jau patikrintą vietinį srautą, atrenka ribotą
`showinfo` scenų laiko žymų skaičių ir, aptiktuvui sugedus, pasibaigus skirtam laikui, gavus
netinkamai suformuotą išvestį arba tuščią kandidatų rinkinį, deterministiškai grįžta prie tų pačių
tolygiai išdėstytų vidurio taškų. Segmentus atsižvelgianti veiksena paskirsto vidurio taškų mėginius
proporcingai patikrintiems scenų intervalams; segmentus atsižvelgiančios veiksenos įrodymai ir
atsarginė elgsena išsamiai aprašyti toliau. Griežta 16 kadrų riba
taikoma po atrankos, neatsižvelgiant į politiką. Kai scenas atsižvelgiančiai užklausai skirtas tik
vieno kadro biudžetas, ji naudoja aktyvaus viso vaizdo įrašo arba fokusavimo lango tolygios atrankos
vidurio tašką ir nurodo `policyEffective: uniform`: vienas pasirinktas scenos kadras
negali išsaugoti abiejų laiko intervalo galų. Iškvietėjas gali pasirinktinai pateikti
baigtinį fokusavimo langą (`start`/`end` sekundėmis); ribos apribojamos pagal medijos
trukmę, atvirkštiniai arba nebaigtiniai langai atmetami, o visos atrankos
politikos taikomos tik normalizuotame intervale. Gautas
langas įtraukiamas į atrankos metaduomenis ir nepatikimo aprašo
priešdėlį, kad tolesni modeliai galėtų atskirti fokusuotą ištrauką nuo visos
laiko juostos.

Semantinis antraščių fokusavimas yra atskira, aiškiai nurodoma nuostata. Numatytoji `full`
analizės veiksena išlaiko esamą kadrų užklausą ir niekada neperduoda užklausos
teksto antraščių modeliui. `focused` veiksenoje tiltas nuskaito tik naujausią
netuščią naudotojo pateiktą `text`/`input_text` iš to paties Chat arba Responses
konteinerio, normalizuoja jį į NFC, sutraukia valdymo simbolius bei tarpus
ir apriboja iki 500 Unicode kodų taškų. Gavus tuščią rezultatą, grįžtama prie
tikslios `full` užklausos. Tinkama užuomina serializuojama kaip JSON specialiame
nepatikimo naudotojo konteksto bloke ir gali tik suteikti pirmenybę stebimoms detalėms; ji
negali panaikinti atskiro įspėjimo nevykdyti medijoje matomų ar girdimų
nurodymų. Tekstinis fokusavimas niekada nenumano `start`/`end` reikšmių ir nekeičia
laikinės atrankos mechanizmo.

#### FU-07 struktūriniai segmentų įrodymai

`segment_aware` naudoja vieną ribotą išankstinės analizės perėjimą per jau patikrintą
vietinį vaizdo įrašo srautą. Fiksuota filtrų grandinė pirmiausia sumažina plotį daugiausia
iki 320 pikselių, aptinka scenų pokyčius ir sustingusius intervalus, o tada atrenka po 1 kadrą
per sekundę suliejimui, vidutiniam šviesiui ir erdvinei bei laiko informacijai įvertinti. Perėjimas
ribojamas iki 600 struktūrinių mėginių, vienos FFmpeg ar filtro gijos, tų pačių
tik `file` protokolą ir konteinerius leidžiančių sąrašų, 1 MiB proceso išvesties ribos
ir daugiausia 30 sekundžių tarpininko bendrame nutraukimo ar galutinio termino intervale. Jis niekada
nepriima komandos, filtro, kelio ar URL iš užklausos.

Struktūrinės reikšmės yra deterministinės atrankos įrodymai, o ne semantinis vaizdo
įrašo supratimas. Jos nenustato subjektų, veiksmų, subtitrų, kalbos ar naudotojo
ketinimų. Scenų ir sustingimo ribos sudaro segmentus; sustingimo aprėptis, suliejimas,
ekspozicija, erdvinis detalumas ir laikiniai pokyčiai lemia tik tai, kaip paskirstomas
esamas 1–16 kadrų biudžetas. Visiškai sustingusiam segmentui skiriamas daugiausia vienas kadras,
o nesustingę segmentai varžosi dėl likusio biudžeto. Kai ribų yra
daugiau nei kadrų, išlaikoma tolygi laiko juostos aprėptis, kad greiti ankstyvieji montažo perėjimai
nepaslėptų ilgo baigiamojo segmento. Scenų ribos, patenkančios į 1 sekundės
analizės skiriamąją gebą aplink sustingimo ribą, sujungiamos.

Jei trūksta filtrų, įrodymai yra netinkamo formato ar tušti, įvyksta detektoriaus klaida arba baigiasi ribotos
išankstinės analizės skirtasis laikas, grįžtama prie tikslios tolygaus vidurio taško strategijos. Iškvietėjo
nutraukimas ar tarpininko termino pabaiga tokio grįžimo nesukelia: tai nutraukia vykdomą
subprocesą, neleidžia vėliau išgauti kadrų, o privatus laikinasis medis
pašalinamas bloke `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuoja deterministinius tikrus FFmpeg
testinius duomenis, skirtus įvertinti aprašų iškvietimų sutaupymą po dublikatų šalinimo, intensyvaus judėjimo biudžeto paskirstymą,
suliejimo, ekspozicijos ir SI-TI įrodymus, greitus montažo perėjimus su ilga pabaiga bei
klaidingus teigiamus rezultatus laipsniško užtemimo atvejais. Jis registruoja išankstinės analizės bendrąjį laiką ir, kai
pasiekiama `/usr/bin/time`, antrinio proceso CPU laiką bei didžiausią RSS. Jo kokybės patikros yra tik struktūriniai etalonai.
Tikrojo aprašų modelio kokybė tebėra `HOLD`, nes ši testavimo sistema neturi
autorizuoto galinio taško ar fiksuoto vertintojo. Piniginis sutaupymas taip pat tebėra `HOLD`,
nebent `--caption-cost-per-call-usd` pateikia aiškų teigiamą vieno iškvietimo
kainos įvertį; scenarijus niekada neišgalvoja nė vieno iš šių rezultatų.

Kiekvienas kadras ribojamas iki 4 MiB, visi neapdoroti kadrai kartu – iki 23 MiB, o
serializuotas tarpininko atsakymas – iki 32 MiB. Privatus laikinasis katalogas pašalinamas
bloke `finally`. OmniRoute nepateikia FFmpeg kartu su paketu ir nepriima pasirinktinio
vykdomojo failo kelio. Prieš kurdamas aprašus, tiltas pritaiko konservatyvų vaizdinio
dublikatų šalinimo etapą: kiekvienas JPEG sumažinamas iki 16×16 pilkio tonų buferio ir
lyginamas tik su paskutiniu išsaugotu kadru. Kai prašomas aprašų biudžetas
viršija vieną kadrą, išgavimas pateikia
ribotą kandidatų rinkinį, ne didesnį nei dvigubas biudžetas ir niekada neviršijantį 16 kadrų.
Prašoma viršutinė riba taikoma tik pašalinus dublikatus, o pirmas ir paskutinis
pasirinkti kandidatai išsaugomi atliekant galutinį retinimą, kai biudžetas yra bent
du. Versijuotoje
`grayscale-16x16-mean-cells-v2` strategijoje naudojama didesnioji iš vidutinio skaisčio pokyčio ir
miniatiūros langelių, kurių normalizuotas pokytis yra bent 0,05, santykio reikšmė.
Dublikatų slenkstis yra konstanta 0,04, pasirinkta dėl nuspėjamumo, o ne
pateikta kaip vykdymo laiko nuostata. Šis antrinis
didelio kontrasto signalas išsaugo nedidelius judesius ir matomo teksto pokyčius, kuriuos
vien tik vidurkiu paremtas palyginimas gali paslėpti. Įvykus lygintuvo ar dekoderio klaidoms, išlaikoma
aprėptis. Išvesties metaduomenyse atskiriami išgauti kandidatai, sėkmingai panaudoti
kadrai ir pašalinti vaizdiniai dublikatai.

Aiškiai pažymėta vaizdo įrašo dalis gali paprašyti kontaktinio lapo su laiko žymomis.
Tiltas sukuria ne daugiau kaip 4 stulpelių ir 16 kadrų JPEG tinklelį. Kiekviename 512 pikselių langelyje
jo šaltinio laiko žyma įrašoma didelio kontrasto apatinėje juostoje, o tos pačios laiko žymos
išlieka tekstiniuose metaduomenyse, kad tolesniuose etapuose būtų galima jas susieti ir audituoti. Visam
JPEG tebetaikoma 32 MiB riba. Jei `sharp` negali dekoduoti ar sukomponuoti tinklelio,
tiltas grįžta prie atskirų JPEG kadrų; kliento nutraukimas vis tiek perduodamas
kontaktinio lapo operacijai.

Paaukštinimo įrodymai sąmoningai atskirti nuo sintetinio komponavimo
mikrotesto. `scripts/perf/video-bridge-contact-sheet-eval.ts` apibrėžia
pagal schemą versijuojamą A/B testavimo sistemą, skirtą tikriems su OpenAI suderinamiems regos modeliams. Ji matuoja
teikėjo nurodytą žetonų skaičių, bendrąją delsą nuo pradžios iki pabaigos (įskaitant kontaktinio lapo komponavimą),
modelio iškvietimų skaičių ir manifeste apibrėžtų faktų išsaugojimą. Neapdoroti modelio atsakymai
į ataskaitą neįrašomi; išsaugomos tik SHA-256 santraukos ir sutapusių faktų ID.
Testavimo sistema neatlieka jokių tinklo ar mokamų modelio iškvietimų, nebent perduodama `--execute-real` ir
sukonfigūruoti `--model`, `OMNIROUTE_BASE_URL` bei `OMNIROUTE_API_KEY`. Be
tokio aiškaus tikrojo vykdymo jos mašininiu būdu nuskaitomas verdiktas lieka `HOLD`; vien sintetiniai
naudingosios apkrovos ar iškvietimų skaičiaus matavimai nėra paaukštinimo įrodymai.

Iškvietėjai prie palaikomos vaizdo įrašo dalies gali pridėti pasirinktinį `transcript.cues` masyvą,
kai jau turi sinchronizuotą tekstą. Kiekviena ištrauka turi turėti `text`, baigtinį
`start`/`end` intervalą, patenkantį į nustatytą trukmę, ir į leidžiamųjų sąrašą įtrauktą
`source` (`client`, `embedded` arba `audio-bridge`); numatytoji `confidence` reikšmė yra
`1` ir ji turi likti tarp `0` ir `1`. Visiškai vienodos ištraukos sujungiamos.
OmniRoute niekada nepradeda transkribavimo pagal šiuos metaduomenis: patikrintos ištraukos
nukopijuojamos į aprašytą rezultatą kartu su šaltiniu, pasitikėjimo reikšme ir intervalu bei
pateikiamos kaip nepatikimi stebėjimai greta kadrų aprašų. Netinkamas,
už diapazono ribų esantis arba kilmės informacijos neturintis tekstas atmetamas, o ne įmaišomas į
aprašų srautą. Lauką `source` šiuo metu deklaruoja iškvietėjas, jo
serveris netikrina: OmniRoute užtikrina, kad reikšmė būtų viena iš trijų
leidžiamų eilučių, tačiau kol kas kriptografiškai nepatvirtina, kad
`embedded` ar `audio-bridge` žyma iš tiesų gauta iš serveriui priklausančio
išgavimo proceso. Kol toks tikrinimas neįdiegtas, laikykite `source` nepatikima užuomina;
negrįskite juo autorizavimo sprendimų.

Patyręs iškvietėjas tam pačiam vaizdo įrašui gali pateikti jau autorizuotą `audioTranscript` takelį. Suliejimo sluoksnis apdoroja vaizdo ir garso stebėjimus taikydamas vieną terminą bei nutraukimo signalą, išrikiuoja juos bendroje laiko juostoje, sutraukia visiškai vienodus pasikartojimus ir pateikia dalinį rezultatą, kai sėkmingai apdorojama tik viena pusė. Dėl netinkamo `audioTranscript` taip pat pateikiamas dalinis rezultatas — vaizdo aprašas išsaugomas, o garso šakoje įrašomas išvalytas klaidos kodas — užuot nutraukus viso vaizdo įrašo apdorojimą. Kiekvienos šakos pasiekiamumas, dalinio rezultato žyma ir išvalyti klaidų kodai išsaugomi aprašytame rezultate, apsaugos mechanizmo metaduomenyse (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), rezultatų podėlio metaduomenyse ir tilto suliejimo skaitikliuose. Numatytasis Video Bridge kelias nekviečia kalbos vertimo į tekstą funkcijos ir neatsisiunčia antros medijos kopijos; be aiškiai pateikto takelio jis ir toliau apdoroja tik vaizdą.

**Transkripcijos saugojimas (#12150 P1).** Tai taikoma automatiškai, kai Video Bridge (kuris pats yra pasirenkamas) atvaizduoja transkripcijos repliką — atskiros saugojimo žymos nėra. Kai užklausoje atvaizduojama bet kokia transkripcijos replika (iškvietėjo deklaruotas `transcript` arba sulietas `audioTranscript`), apsaugos mechanizmas pažymi ją kaip `videoBridgeObserved` ir sukuria nuasmenintą vaizdo įrašo aprašo šešėlinę kopiją — identišką atvaizdavimą, kuriame kiekvienos replikos laisvos formos teksto turinys pakeičiamas į `[redacted-video-transcript]`. Ji sukuriama pakeičiant struktūrinį replikos lauką prieš sudarant eilutę (niekada neanalizuojant sujungto teksto, todėl negali išlikti joks replikos turinys — nei priešiškas, nei įprastas, įskaitant turinį su `]`, pvz., `[inaudible]`/`[music]`). Išsaugomame iškvietimų žurnalo užklausos turinyje kiekviena iš vaizdo įrašo gauta tekstinė dalis pakeičiama ta nuasmeninta šešėline kopija, atitinkančia pagal turinio lygybę; `fullText` atrama iš naujo nuskaitoma iš galutinio apsaugos mechanizmo naudingojo turinio prieš iškvietimą, todėl atitiktis išlieka net vėlesniems grandinės apsaugos mechanizmams (AII ir kredencialų maskuokliams, kurių prioritetai yra 10/95) vietoje perrašius aprašo tekstą ir sistemos raginimo / perdavimo / Memory įterpimui pakeitus pranešimų masyvo struktūrą. Modeliui siunčiamas turinys lieka nepakeistas. Stebima užklausa taip pat neužpildo jokios ilgalaikės Memory (praleidžiamas tiek iš užklausos, tiek iš atsakymo gaunamos informacijos išgavimas), todėl paties modelio atsakymas negali pakartotinai įrašyti transkripcijos teksto į Memory.

Vis dar atviri saugojimo paviršiai, registruojami tolesniam darbui (**P2**, #12430): neapdorota kliento užklausos momentinė kopija prieš apsaugos mechanizmą išsamaus žurnalo artefakte; `previous_response_id` tęsinys, kuris gedimo atveju turi būti uždarytas; išvestinių raginimų vidiniai perdavimai, kurie įterpia transkripciją į susintetintą eilutės tipo raginimą (konvejerio etapai, konteksto perdavimas); ir modelio atsakymo, kuriame cituojama transkripcija, atsakymo turinys / semantinio podėlio kopija. Tai yra neapdorotų duomenų / atsakymų klasės arba pasirenkami paviršiai, nepatenkantys į P1 išsaugomo užklausos turinio ir Memory aprėptį.

Vidinis `/api/modality-bridge/video/drilldown` gyvavimo ciklas yra atskiras, atgalinio ryšio / prieigos rakto autentifikuojamas podėlio pagrindas. Kiekvienai operacijai taip pat būtinas kanoninis neskaidrus pagrindinio subjekto ID. Prieš įgalinant gamybinį iškvietėją, jis turi išvesti tą ID iš autentifikuoto nuomininko ir niekada neperduoti kliento pasirinktos reikšmės. Podėlio raktai susieja tą pagrindinį subjektą su kanoniniais seanso ir vaizdo įrašo nuorodos ID, saugo tik jų iš SHA-256 išvestus raktus ir apriboja tiek skaitymą, tiek šalinimą tuo pačiu pagrindiniu subjektu. Podėlyje saugoma ne daugiau kaip 16 išvestinių JPEG kadrų viename įraše, jie nustoja galioti po dešimties minučių; palaikomi apriboti `start`/`end` skaitymai arba aiškiai nurodytas seanso pašalinimas.

Kiekvienam pagrindiniam subjektui leidžiama ne daugiau kaip 16 įrašų ir 64 MiB kanoninių JPEG duomenų. Šie apribojimai nepriklauso nuo bendros 64 įrašų / 256 MiB ribos: dėl spaudimo pagrindinio subjekto kvotai pirmiausia šalinami tik rečiausiai pastaruoju metu naudoti to pagrindinio subjekto įrašai ir tik tada svarstomas bendras LRU šalinimas. Podėlio veiklos metu nebegaliojantys įrašai pašalinami tiek iš pagrindinio subjekto, tiek iš bendros apskaitos, o atšaukimo ar patikros trikties atveju dalinis pakaitalas neįrašomas.

Podėlis atmeta nekanoninę Base64 koduotę, perteklinį užpildą, ne JPEG mediją, netinkamai suformuotus ar sutrumpintus JPEG failus ir JPEG failus, kuriuos visiškai dekoduojant apribotu `sharp` dekoderiu pateikiamas įspėjimas. Kiekvienas priimtas vaizdas iš naujo užkoduojamas kaip kanoninis JPEG, plotis ir aukštis nustatomi iš dekoduotų baitų, o ne pasikliaujant iškvietėjo laukais, ir visi pabaigoje esantys poliglotiniai baitai atmetami, užuot juos išsaugojus. Į abi kvotas įskaičiuojamas tik apribotas kanoninis suglaudintas buferis. JSON perdavimo riba apima Base64 papildomą dydį, taikomą 32 MiB dekoduotos įvesties ribai. Kiekviename
išsaugotame išvestiniame rezultate įrašomi jo patikrintas JPEG formatas / skiriamoji geba, diskretizavimo strategija, išvedimo versija, sukūrimo laikas, serverio apskaičiuota turinio maiša ir pirminės nuorodos maiša, taip pat patikimo iškvietėjo pateikta pirminio turinio maiša. Atšaukimas tikrinamas tarp asinchroninių dekodavimo / maišos skaičiavimo etapų prieš atomiškai įrašant į podėlį.

Ši darbų dalis dar nesusieja gamybinio kūrėjo su maršrutu ir neužtikrina kelių skiriamųjų gebų variantų pasirinkimo. Todėl skaidrus Video Bridge užklausos kelias neatlieka jokio papildomo darbo, o su nuomininku susieto pagrindinio subjekto išvedimas ir visas FU-08 kelių skiriamųjų gebų gyvavimo ciklas tebėra aiškiai nurodyti kaip būsimi darbai, o ne aprašomi kaip visiškai įgyvendintas veikimas.

Kadrai nuosekliai aprašomi naudojant sukonfigūruotą Video modelį. Tuščias
Video perrašymas paveldi Vision nuostatą; jei abu laukai tušti, Vision
automatinis maršruto parinkiklis pasirenka faktinį vaizdus palaikantį modelį. Sėkmingi aprašai
pakeičia pradinę dalį stabilia `[Video description:` pradžia, kuri taip pat
pažymi tekstą kaip nepatikimą iš medijos gautą stebėjimą ir nurodo tolesniems
modeliams nevykdyti medijoje rastų instrukcijų. Kadrų aprašų podėlio raktai
apima JPEG baitus, užklausą, laiko žymą ir faktinį modelį; podėlyje saugomi tik
sėkmingi aprašai. Podėlio įrašai išsaugo faktinį sėkmingai rezultatą sugeneravusį modelį,
įskaitant atsarginį modelį; kai skirtingus kadrus sugeneruoja skirtingi modeliai,
tiltas pateikia `mixed`. Aptikus įrašą podėlyje, pakartotinai panaudojama to
generatoriaus tapatybė, užuot priskyrus jam prašytą maršruto parinkimo planą. Viso vaizdo įrašo rezultatų
podėlio raktą sudaro visi išvestį keičiantys įvesties duomenys — užklausa, faktinis
modelis, atrankos politika, kadrų skaičius, semantinės analizės režimas, normalizuotos
fokusavimo užuominos SHA-256 kontrolinis kodas, fokusavimo langas, `transcript`,
`audioTranscript` ir kontaktinio lapo žyma — todėl pakeitus bet kurį iš šių
aspektų podėlio įrašas nelaikomas tinkamu ir pasenęs rezultatas niekada nepanaudojamas pakartotinai. Vaizdų dubliavimo šalinimo politikos
versija, slenkstis ir ribotas kandidatinių kadrų skaičius taip pat aiškiai įtraukiami į
rezultatų podėlio raktą bei metaduomenis; todėl pakeitus politiką negalima pakartotinai panaudoti pasenusio
viso vaizdo įrašo aprašo. Rezultatų podėlio v4 metaduomenyse saugomas režimas ir
kontrolinis kodas, bet niekada nesaugoma neapdorota naudotojo užduotis. Apsaugos mechanizmo metaduomenyse pateikiami ir
prašytas, ir faktinis analizės režimai; prašytas `focused` režimas be
tinkamo naudotojo teksto pateikiamas kaip faktiškai `full`.

Apsaugos mechanizmas išskiria visas palaikomas vaizdo įrašų dalis, tačiau aprašo ne daugiau nei
`modalityBridgeVideoMaxVideos`. Jei įrodyta, kad tiksliniam objektui galioja
`supportsVideo === false`, nepavykę ir limitą viršijantys vaizdo įrašai paverčiami aiškiomis saugiomis
teksto žymomis, kad neliktų jokio neapdoroto vaizdo įrašo. Kai galimybė nežinoma, tos dalys
paliekamos nepakeistos. Tiksliniai objektai, kuriems galioja `supportsVideo === true`, apeina tiltą.
Kliento užklausos nutraukimo signalas perduodamas atsisiuntimui, tarpininko eilei,
poprocesiams ir aprašų iškvietimams; nutraukus vykdymą, apdorojimas sustoja tarp vaizdo įrašų ir niekada
nepereina į nesaugų režimą, kuriame būtų naudojama neapdorota medija.

Vykdymo aplinkos nuostatos saugomos DB ir tikrinamos naudojant Zod:

| Raktas                              | Numatytoji reikšmė | Diapazonas / veikimas                                                                                           |
| ----------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`            | Pasirenkama vykdymo aplinkos funkcija, kurią reikia aiškiai įjungti                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`           | `full` išsaugo bendruosius aprašus; `focused` naudoja ribotą, nepatikimą naujausią naudotojo kontekstą          |
| `modalityBridgeVideoModel`          | `""`               | Paveldi Vision Bridge modelį                                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`                | 1–16                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`        | `uniform`, `scene_aware` arba proporcinis `segment_aware`; detektoriaus trikties atveju grįžtama prie `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`                | 1–4                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`           | 1000–120000 ms                                                                                                  |

Senosios išsaugotos Video skirtojo laiko reikšmės, viršijančios 120 sekundžių, apribojamos iki
tarpininko termino; nauji nuostatų įrašymai, viršijantys šią ribą, atmetami.
`GET /api/modality-bridge/video/runtime` prieš autentifikavimą ar vykdymo aplinkos tikrinimą
reikalauja patikimos, pažymėtos grįžtamojo ryšio vietos,
o tada reikalauja valdymo autentifikavimo.
Grąžinami tik `available`, išvalytos FFmpeg/ffprobe versijos ir nekintama
priežastis, kai vykdymo aplinka nepasiekiama. Vidinis išskyrimo galinis taškas nėra
vieša įkėlimo API: perpildžius eilę grąžinamas `503` su `Retry-After`, skambinančiajam
atsijungus grąžinamas `499`, o pasiekus nekintamą tarpininko terminą grąžinamas `504`. Konvertuotuose atsakymuose prie centrinės
`x-omniroute-modality-bridge` antraštės pridedama
`video->text;model=<visionModel>;parts=<videos>`, nepašalinant Vision ar Audio segmentų.

### PII maskavimo priemonė (`piiMasker.ts`)

Vykdoma **abiejuose** etapuose.

- **`preCall`** klonuoja naudingąją apkrovą, pereina per `system`, `messages`, `input` ir
  `prompt` (įskaitant paprasto teksto elementus) ir pritaiko `processPII()` (iš
  `@/shared/utils/inputSanitizer`) eilutiniams `content`/`text` laukams. Kai
  `PII_REDACTION_ENABLED=true`, aptikti PII užmaskuojami siunčiamoje
  naudingojoje apkrovoje. Tai nepriklauso nuo `INPUT_SANITIZER_MODE` (kuris valdo tik
  užklausų injekcijos politiką). Kai maskavimas išjungtas, iškvietimas įrašo aptikimų
  skaičių nekeisdamas turinio.
- **`postCall`** giliai klonuoja atsakymą, vykdo `sanitizePIIResponse()` ir
  Responses-API struktūros maskavimo priemonę (`maskResponsesOutput` — apima
  `output_text` ir `output[].content[].text`). Jei atliekamas bent vienas maskavimas,
  pakeistas atsakymas pakeičia pradinį.

Apsaugos mechanizmas niekada neblokuoja; jis tik prideda anotacijas (`meta.detections`,
`meta.redacted`) arba perrašo.

### Užklausų injekcija (`promptInjection.ts`)

Aptinka priešiškas struktūras naudotojo pateiktame turinyje ir įgyvendina
sukonfigūruotą politiką. Veikimą lemia aplinkos kintamieji ir konstruktoriaus
parinktys:

| Nustatymas          | Aplinkos kintamasis                                                                                                         | Numatytoji reikšmė | Poveikis                                                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Įjungta             | `INPUT_SANITIZER_ENABLED`                                                                                                   | `true`             | Kai `false`, apsaugos mechanizmas nutraukia vykdymą.                                                                                                                                             |
| Režimas             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                             | `warn`             | Injekcijų politika: `block`, `warn` arba `log`. (`redact` priimamas dėl atgalinio suderinamumo, tačiau **nepašalina** injekcijos teksto; užklausos AID perrašymą valdo `PII_REDACTION_ENABLED`.) |
| Blokavimo slenkstis | `blockThreshold` parinktis / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alternatyvus pavadinimas `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`             | Mažiausias blokavimui būtinas pavojingumo lygis. Pagal numatytąsias nuostatas vidutinis lygis tik stebimas.                                                                                      |

**Režimo pirmumas** (`getMode`): iškvietėjo `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijos vėliavėlės perrašymas** (Valdymo skydas → Nustatymai →
Funkcijų vėliavėlės) → `INJECTION_GUARD_MODE` aplinkos kintamasis → `INPUT_SANITIZER_MODE` aplinkos kintamasis →
`warn`. Todėl valdymo skydelio perrašymas turi pirmenybę prieš aplinkos
kintamuosius, tad Funkcijų vėliavėlių NS leidžia tiesiogiai valdyti veikiančią
apsaugą (nereikia paleisti iš naujo). DB nuskaitymas yra saugus gedimo atveju:
jei įvyksta klaida, apsauga grįžta prie aplinkos kintamaisiais pagrįstos elgsenos,
o kai perrašymas nenustatytas, elgsena yra tokia pati kaip naudojant tik aplinkos
kintamuosius.

Aptikimo šaltiniai:

1. `sanitizeRequest()` iš `@/shared/utils/inputSanitizer` (bendras aptiktuvų
   rinkinys, naudojamas kitose apdorojimo grandinės vietose).
2. Integruoti `DEFAULT_GUARD_PATTERNS` (šiuo metu `system_override_inline` ir
   `markdown_system_block`, abiejų pavojingumo lygis – `high`).
3. Pasirinktiniai `customPatterns`, perduodami per konstruktoriaus parinktis (eilutės, reguliarieji
   reiškiniai arba `{ name, pattern, severity }` įrašai).

Kai `mode === "block"` **ir** bent vienas aptikimas pasiekia pavojingumo
slenkstį, `preCall` grąžina `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn` / `log` režimais apsaugos mechanizmas
registruoja įvykį žurnale, tačiau leidžia iškvietimą. Bendrinama pagalbinė funkcija
`evaluatePromptInjection()` taip pat eksportuojama iškvietėjams, kuriems reikia
įvertinti užklausas nenaudojant registro.

**Nuskaitymo riba (v3.8.20):** aptiktuvas tikrina tik **pirmuosius 16 KB**
sujungto užklausos teksto — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baitai)
faile `src/shared/utils/inputSanitizer.ts`. Tiek `detectInjection()`, tiek
`evaluatePromptInjection()` prieš vykdydami šablonų ciklą naudoja
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Injekcijos direktyvos būna netoli įvesties
pradžios, todėl taip apribojamas reguliariųjų reiškinių CPU / GC naudojimas
kelių šimtų KB naudingosiose apkrovose nesusilpninant aptikimo (žr.
#3932, #4041).

### Kredencialų maskuoklis (`credentialMasker.ts`)

Veikia **abiejuose** etapuose, numatytojoje grandinėje paskutinis (prioritetas
`95`). Iš siunčiamos naudingosios apkrovos (pranešimų turinio, įrankių iškvietimo
argumentų, įrankių rezultatų) **ir** teikėjo atsakymo pašalina gerai žinomus API
raktų / slaptųjų prieigos raktų šablonus, kad į užklausą įklijuotas kredencialas
(arba įrankio rezultato pakartotinai pateiktas kredencialas) nebūtų nutekintas
išoriniam teikėjui arba atgal klientui.

- **Tik pasirinktinai įjungiamas**, pagal tą pačią taisyklę kaip AID redagavimas
  (susiję su griežtąja taisykle Nr. 20): išjungtas, nebent
  `settings.credentialRedactionEnabled === true` **arba**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kai išjungta, apsaugos mechanizmas nieko
  nedaro — jis niekada neblokuoja ir nieko neperrašo.
- `redactCredentials()` pereina visą naudingosios apkrovos / atsakymo medį
  (`walkValue()`, apsaugota nuo prototipo užteršimo, apsaugota nuo ciklų naudojant
  `WeakSet`) ir atitiktis pakeičia `[REDACTED:<type>]` vietos rezervavimo ženklu,
  klonuodama tik faktiškai pakeistas šakas.
- `CREDENTIAL_PATTERNS` apima LLM teikėjų raktus (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS / SaaS prieigos raktus (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), mokėjimų raktus (Stripe, Square), debesijos
  raktus (AWS prieigos raktą, Twilio, SendGrid, Mailgun), privačiuosius raktus / JWT,
  kredencialus turinčias ryšio eilutes (`mongodb://user:pass@...` ir pan.) bei
  bendrinį `Authorization` / `x-api-key` / `api-key` / `apikey` antraštės reikšmės
  šabloną. Antraštes atitinkantys raktai (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redaguojami struktūriškai (tik reikšmė, išsaugant schemos priešdėlį,
  pvz., `Bearer ` / `Basic `), o ne naudojant bendrinį teksto reguliarųjį reiškinį.
- Apsaugos mechanizmas niekada neblokuoja; jis tik perrašo (`modifiedPayload` /
  `modifiedResponse`) ir prideda anotacijas (`meta.credentialsRedacted`, `meta.count`).

Regresijos apsauga: `tests/unit/credential-masker-guardrail.test.ts`.

## Bazinė sutartis (`base.ts`)

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
  block?: boolean; // true nutraukia grandinę
  message?: string; // pateikiamas blokuojant
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // grąžinamas iš preCall užklausai perrašyti
  modifiedResponse?: TValue; // grąžinamas iš postCall atsakymui perrašyti
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

Apsaugos priemonė nurodo, kad pakeitimų nėra, grąžindama `void`, `{}` arba
`{ block: false }`. Grąžinus `modifiedPayload` / `modifiedResponse`, grandine
perduodama reikšmė pakeičiama tolesnėms apsaugos priemonėms.
`signal?: AbortSignal` perduoda iškvietėjo gyvavimo ciklą apsaugos priemonėms. Užklausos nutraukimas yra sąmoninga „fail-open“ išimtis: medijos tarpininkai sustabdo darbą ir atlaisvina išteklius, neatkurdami neapdorotos medijos paskirties vietai, kuri, kaip žinoma, jos nepalaiko.

## Registras (`registry.ts`)

Vienintelis egzempliorius `guardrailRegistry` suteikia:

- `register(guardrail)` — prideda apsaugos priemonę (arba pakeičia pagal normalizuotą pavadinimą) ir
  iš naujo surikiuoja didėjančia `priority` tvarka.
- `clear()` / `list()` — administravimo pagalbinės funkcijos.
- `runPreCallHooks(payload, context)` — iteruoja aktyvias apsaugos priemones, perduoda
  naudingąją apkrovą per `modifiedPayload` ir sustoja ties pirmuoju `block: true`.
- `runPostCallHooks(response, context)` — tokia pati eiga atsakymo pusėje.
- `resetGuardrailsForTests({ registerDefaults })` — išvalo būseną ir pasirinktinai
  iš naujo užregistruoja numatytąsias apsaugos priemones, kad testai būtų visiškai izoliuoti.

Abi vykdymo funkcijos grąžina `{ blocked, payload|response, results, guardrail?, message? }`,
kur `results` yra `GuardrailExecutionResult` įrašų masyvas, apimantis kiekvienos
apsaugos priemonės laukus `blocked`, `skipped`, `modified`, `error` ir `meta`,
naudingus sekimui.

### Apsaugos priemonių išjungimas atskiroms užklausoms

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` surenka pasikartojimų
neturintį apsaugos priemonių, kurios turi būti praleistos vykdant dabartinę
užklausą, pavadinimų sąrašą. Šaltiniai (visi neprivalomi, visi sujungiami):

- `apiKeyInfo.disabledGuardrails`
- Užklausos turinio `disabledGuardrails` (aukščiausiu lygiu)
- Užklausos turinio `metadata.disabledGuardrails`
- Antraštė `x-omniroute-disabled-guardrails` (arba senoji
  `x-disabled-guardrails`)

Reikšmės gali būti eilučių masyvai arba kableliais atskirta eilutė; pavadinimai
normalizuojami į mažosiomis raidėmis rašomą kebabo stilių (`pii_masker` → `pii-masker`). Rezultatas
perduodamas registrui per `context.disabledGuardrails`, o registras praleidžia
atitinkančias apsaugos priemones (`skipped: true` lauke `results`).

## Vykdymo tvarka

Kiekvienai užklausai, perduodamai per `src/sse/handlers/chat.ts` ir
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` sudaro praleidžiamų apsaugos priemonių sąrašą pagal API raktą, užklausos turinį
   ir antraštes.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` vykdo apsaugos priemones didėjančia
   prioriteto tvarka:
   - Išjungtos apsaugos priemonės pažymimos kaip `skipped`.
   - Kiekvienos apsaugos priemonės `preCall` gali perrašyti naudingąją apkrovą per `modifiedPayload`.
   - Pirmasis `block: true` nutraukia grandinę, o apdorojimo programa grąžina
     apsaugos priemonės atmetimo atsakymą.
3. Galimai perrašyta naudingoji apkrova perduodama kombinuotajam maršrutizavimui ir išsiunčiama
   aukštesniojo lygio paslaugai.
4. Surinkus atsakymą, `guardrailRegistry.runPostCallHooks(...)`
   paleidžia tą pačią grandinę atsakymui. Šiame etape `block: true` atmeta aukštesniojo lygio paslaugos
   atsakymą.

Klaidą sukeliančios apsaugos priemonės pažymimos įrašu `error: <message>`, o klaida registruojama per
`logger.warn`, tačiau grandinė tęsiama — taip sąmoningai įgyvendinamas veikimo tęstinumas klaidos atveju.

## Konfigūracija

Integruotųjų apsaugos priemonių nuskaitomi aplinkos kintamieji:

| Kintamasis                            | Naudoja               | Poveikis                                                                                                                     |
| ------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`    | Nustačius `false`, aptikimas visiškai išjungiamas.                                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`    | Įterpimo politika: `warn`, `block` arba `log`. Ankstesnė reikšmė `redact` įterpimo teksto neperrašo.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`    | Įterpimo apsaugos režimas; taip pat DB funkcijos vėliavėlė, kuri **perrašo** aplinkos kintamuosius (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`    | Mažiausias griežtumo lygis, kurį `MODE=block` atmeta: `high` (numatytasis), `medium` arba `low`.                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`    | Ankstesnis `INPUT_SANITIZER_BLOCK_THRESHOLD` alternatyvus pavadinimas.                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`          | Kai nustatyta `true`, užklausoje esanti asmens identifikavimo informacija užmaskuojama (nepriklausomai nuo įterpimo režimo). |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (toliau) | Valdo atsakymo pusės maskavimo priemonės veikimą.                                                                            |

„Modality Bridge“ apsaugos priemonės vykdymo konfigūraciją nuskaito iš DB pagrįstos nustatymų
saugyklos (`getSettings()`), o ne iš aplinkos kintamųjų. Pagrindiniai vaizdo apdorojimo raktai yra
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ir
`modalityBridgeCacheMaxEntries`. Ankstesni
`visionBridge*` raktai priimami tik kaip dokumentuotas vieno ciklo nuskaitymo
atsarginis variantas; valdymo skydelio įrašymo operacijos naudoja pagrindinius raktus. Numatytosios reikšmės ir atsarginio varianto
sprendiklis yra faile `src/shared/constants/modalityBridgeDefaults.ts`, o ankstesnės
konstantos paliktos faile `src/shared/constants/visionBridgeDefaults.ts`.

Garso apdorojimas naudoja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ir `modalityBridgeAudioMaxClips` bei bendrus
`modalityBridgeCache*` nustatymus. Garso apdorojimas neturi atsarginio ankstesnių raktų varianto, nes šie
raktai buvo įtraukti kartu su „Modality Bridge“ schema.

Vaizdo įrašų apdorojimas naudoja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ir
`modalityBridgeVideoTimeout` bei bendrus `modalityBridgeCache*` nustatymus.
Pagal numatytuosius nustatymus jis išjungtas, nes FFmpeg/ffprobe yra pasirenkamos operacinės
priklausomybės, o kadrų aprašų generavimas padidina delsą ir modelio naudojimo sąnaudas.

## Pasirinktinės apsaugos priemonės

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

Veiksmai:

1. Sukurkite `src/lib/guardrails/myGuardrail.ts`, išplečiantį `BaseGuardrail`.
2. Įgyvendinkite `preCall` ir (arba) `postCall`.
3. Užregistruokite importavimo metu (įtraukite per `registerDefaultGuardrails`) arba
   vykdymo metu iškvieskite `guardrailRegistry.register(...)` — registras pakeičia
   bet kurią ankstesnę apsaugos priemonę tuo pačiu normalizuotu pavadinimu.
4. Pridėkite testus aplanke `tests/unit/` (esami pavyzdžiai:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testavimas

Tarp testų naudokite `resetGuardrailsForTests()`, kad pradėtumėte nuo žinomos būsenos.
Perduokite `{ registerDefaults: false }`, kad pradėtumėte nuo tuščio registro ir
užregistruotumėte tik testuojamas apsaugos priemones. „Vision Bridge“ palaiko priklausomybių
įterpimą (`deps.getSettings`, `deps.callVisionModel`); „Audio Bridge“ suteikia
atitinkamus sąsajos taškus nustatymams, galimybėms, STT modelio pasirinkimui, prisijungimo duomenų
patikroms ir transkripcijai. Todėl testais galima patikrinti abu srautus be prieigos
prie DB ar tinklo.

## Taip pat žr.

- `src/lib/guardrails/` — įgyvendinimas
- `src/shared/utils/inputSanitizer.ts` — bendras aptikimo mechanizmas, kuriuo grindžiami
  raginimų injekcijos aptikimas ir PII maskavimas
- `src/shared/constants/visionBridgeDefaults.ts` — numatytosios „Vision Bridge“ reikšmės ir
  priverstinio tilto modelių sąrašas
- `src/shared/constants/modalityBridgeDefaults.ts` — bendrosios „Vision“ / „Audio“ vykdymo aplinkos numatytosios reikšmės
- `docs/architecture/RESILIENCE_GUIDE.md` — nepriklausomas sluoksnis (grandinės pertraukiklis, atvėsimo laikotarpiai)
- `docs/reference/ENVIRONMENT.md` — išsamus aplinkos kintamųjų žinynas

## Injekcijos apsaugos maršrutų aprėptis ir „red-team“ testavimas (8 etapas · D blokas)

Injekcijos apsauga (`createInjectionGuard` / `withInjectionGuard`) apima visus maršrutus,
kurie priima naudotojų raginimus. Ji atsižvelgia į `INJECTION_GUARD_MODE` (numatytoji reikšmė `warn` = tik registruoti žurnale;
`block` = grąžina HTTP 400 `SECURITY_001`).

| Tipas           | Maršrutai                                                                                                                                            | Numatytasis režimas |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Tekstas (esami) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generatyviniai  | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Duomenys        | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Teksto išskyrimas (`extractMessageContents`) apima `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**„Red-team“ testavimas (kasnakt, `nightly-llm-security.yml`):** promptfoo patikrina, ar kiekvienas maršrutas blokuoja
OWASP-LLM rinkinį, kai `INJECTION_GUARD_MODE=block`; garak vykdo zondus (praleidžiama, jei nėra slaptojo rakto).
`moderations` įtrauktas nuoseklumo sumetimais — operatoriai, naudojantys blokavimo režimą, gali jam taikyti išimtį per
`resolveDisabledGuardrails`.

Kasnakt vykdoma darbo eiga (`.github/workflows/nightly-llm-security.yml`, cron + rankinis
paleidimas) turi dvi užduotis:

- **`promptfoo-guard` (blokuojanti)** — vykdo `promptfoo eval -c promptfooconfig.yaml`
  su `INJECTION_GUARD_MODE=block`. Kiekvienu priešišku atveju (pvz., „nepaisyk visų
  ankstesnių instrukcijų…“, DAN tipo apsaugos apėjimai) patvirtinama, kad atsakyme yra
  `error.code === "SECURITY_001"`, t. y. apsauga iš tikrųjų atmetė užklausą.
- **`garak` (patariamoji)** — vykdo garak `--probes promptinject,dan,leakreplay`
  vietiniame „OmniRoute“ egzemplioriuje (`http://localhost:20128/v1`). Vykdymas priklauso nuo
  teikėjo slaptojo rakto (`PROMPTFOO_PROVIDER_KEY`); jo nesant užduotis korektiškai praleidžiama, o pabaigoje pridėta
  `|| true`, todėl rezultatai pateikiami nesukeliant CI nesėkmės.

Apsaugos pagalbinės priemonės (`createInjectionGuard` / `withInjectionGuard`)
aprėptis apima kiekvieną raginimus priimantį `/v1` maršrutą; raginimo tekstas paimamas iš
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`, naudojant
`extractMessageContents()` faile `src/shared/utils/inputSanitizer.ts`.
