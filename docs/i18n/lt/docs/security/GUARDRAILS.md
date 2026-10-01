# Guardrails (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

Registras automatiškai įkelia šešias apsaugos priemones prioriteto tvarka importuojant
(žr. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritetas | Pavadinimas         | Etapas (-ai)   | Failas                |
| ----------- | ------------------- | -------------- | --------------------- |
| `5`         | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`         | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`         | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`        | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`        | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`        | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mažesni prioriteto numeriai vykdomi **pirmiausia**.

### Vizijos tiltas (`visionBridge.ts`) – Modality Bridge PR-1

Perima užklausas su vaizdais, skirtas **ne vizijos modeliams**, ir arba nukreipia visą užklausą į vizijos modelį, arba pakeičia vaizdo dalis teksto aprašymais, sugeneruotais konfigūruojamu vizijos modeliu prieš iškvietimą. Tai leidžia tik teksto teikėjams skaidriai apdoroti daugiamodalius duomenis.

Eiga:

1. Praleisti, jei tikslinis modelis jau palaiko viziją (nebent jis yra priverstinio tilto sąraše `isVisionBridgeForcedModel`).
2. Išskirti vaizdo dalis per `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kuri deleguoja į **vieningą medijos detektorių** `detectMediaParts()` faile `open-sse/utils/mediaParts.ts` – vienintelį tiesos šaltinį, bendrinamą su kombinuotu suderinamumo filtru.
   Išskyrimas leidžiamas tik aukščiausio lygio dalims, kurias `replaceImageParts` gali sujungti atgal (išskyrimo↔pakeitimo sutartis): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ir Responses API `input_image`. Įdėtiniai atitikmenys ir tik indikatorinės formos yra kombinuoto filtro medžiaga ir niekada nėra išskiriamos. Praleisti, jei nerasta.
3. Išspręsti vykdymo konfigūraciją per `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nauji `modalityBridge*` nustatymų raktai laimi; senieji `visionBridge*` raktai lieka **vieno ciklo atsarginiu variantu** (grąžinimo langas). Praleisti prieš bet kokį medijos apdorojimą, kai tiltas yra išjungtas.
4. Režimo selektorius (`modalityBridgeVisionMode`, žr. lentelę žemiau) sprendžia, ar nukreipti, ar aprašyti. Nukreipimas grąžina `modifiedPayload` tik su pakeistu `model`, plius meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprašymo kelias: apriboti vaizdus iki `maxImages`, sudaryti užduotį atitinkantį raginimą, patikrinti aprašymo talpyklą, iškviesti vizijos modelį **lygiagrečiai**
   (`Promise.allSettled`) ir įterpti `[Image N]: <description]` teksto dalis jų vietoje. Nepavykęs aprašymas grąžina `null`, o originali vaizdo dalis yra **išsaugoma** (#4012) – išskyrus kombinuoto aprašymo kelią, kai visi aprašymai nepavyko, kur patvirtintas ne vizijos šaltinis gauna `(nepasiekiamas – neprijungtas joks vizijos teikėjas)` vietoj (#8430).
6. Grąžinti `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režimo selektorius (`modalityBridgeVisionMode`)

| Režimas | Numatytasis | Elgesys  
| `auto` | ✔ | Senoji heuristika, nepakeista (#6640/#7204): ne kombinuoti/`auto/` modeliai nukreipia į geriausią vizijos modelį, nebent originalus modelis jau turi tinkamus kredencialus (tada aprašo); kombinuoti tikslai visada aprašo. |
| `describe` | | Visada aprašyti – nukreipimo blokas praleidžiamas visiškai; vartotojo pasirinktas modelis visada atsako. |
| `reroute` | | Priverstinis nukreipimas: kredencialų turinčio modelio apsauga apeinama. Nukreipimo-**tikslinio** kredencialų apsauga vis dar taikoma – kai nėra tinkamo vizijos tikslo, užklausa patenka į aprašymą, kad neapdoroti vaizdai niekada nepasiektų tik teksto galinės sistemos (#8430). |

Priverstiniai režimai trumpina grandinę **prieš** automatinės heuristikos paleidimą; `auto` elgesys yra identiškas prieš PR-1 apsaugos priemonei.

#### Užduotį atitinkantis aprašymo raginimas (`modalityBridgeVisionTaskAware`)

Numatytasis **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) prideda **paskutinio vartotojo pranešimo** tekstą (sutrumpintą iki 500 simbolių) prie bazinio aprašymo raginimo, nukreipdamas aprašymą link to, ko vartotojas iš tikrųjų prašė (codex-vision-proxy modelis) ir prašydamas vizijos modelio transkribuoti matomą tekstą. Išjungus vėliavėlę – arba be vartotojo teksto – bazinis raginimas naudojamas nepakeistas.

Aprašymo savarankiško ciklo nuosava su OpenAI suderinama užklausa (`callVisionModelSingle()` faile `visionBridgeHelpers.ts`) visada prašo `image_url.detail: "high"` – besąlygiškai, kiekvienam iškvietėjui/teikėjui, nepriklausomai nuo jokio kliento signalo. Mažo detalumo mėginių ėmimas pablogina OCR tikslumą būtent teksto transkripcijos užduočiai, kurios prašo šis raginimas, todėl pats aprašymo iškvietimas visada prašo didelio detalumo, nepriklausomai nuo to, kokio detalumo lygio buvo naudojama pradinė gaunama užklausa. Tai paveikia tik vidinį aprašymo užklausos turinį; tai nekeičia, kaip OmniRoute persiunčia iškvietėjo `image_url.detail` pirminėje užklausoje – tas numatytasis nustatymas taikomas atskirai ir tik aptiktiems OpenCode klientams, `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic formato aprašymo savarankiško ciklo šaka neturi `detail` lauko ir jai neturi įtakos joks numatytasis nustatymas.

#### Aprašymo išvesties apribojimas (`modalityBridgeVisionMaxChars`)

| Raktas                         | Numatytasis | Diapazonas         |
| ------------------------------ | ----------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`         | `0` arba 100–50000 |

`0` (numatytasis) reiškia **be apribojimų** – `callVisionModel()` grąžinamas aprašymas perduodamas nepakeistas, išsaugant esamą elgesį. Bet kokia reikšmė 100–50000 diapazone sutrumpina aprašymą su `…` priesaga, prieš jį įterpiant atgal kaip `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` faile `src/lib/guardrails/visionBridge.ts`). Padidinkite šią reikšmę detalėms turtingoms OCR užduotims, kur pasrovinis modelis reikalauja visos transkripcijos; sumažinkite ją, kad apribotumėte žetonų naudojimą kalbiškuose vizijos modeliuose. Prietaisų skydelio laukas yra Vizijos skirtuko Išplėstiniame skydelyje (`modality-bridge-max-chars` faile `ModalityBridgeVisionTab.tsx`) ir apriboja bet kokią reikšmę tarp 1 ir 99 iki 100 apatinės ribos, paliekant aiškų `0` nepakeistą – `0` yra savaime galiojanti Zod reikšmė (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), o ne tik „nenustatytas“ numatytasis.

#### Aprašymo talpykla (`modalityBridge/bridgeCache.ts`)

Atminties LRU + TTL talpykla aprašymo išvestims, bendrinama visame procese.
Raktas = `sha256(imageRef + composedPrompt + configuredBridgeModel)` su
ilgio prefikso rėmeliu (jokių lauko ribų susidūrimų). Modelio komponentas yra
**sukonfigūruotas** tilto modelis, o ne modelis, kuris iš tikrųjų atsakė –
`callVisionModel` gali viduje grįžti prie atsarginio varianto, o raktų kūrimas kiekvienam bandymui suskaidytų talpyklą. Nepavykę aprašymai niekada nėra talpinami. Nustatymai:

| Raktas                          | Numatytasis | Diapazonas |
| ------------------------------- | ----------- | ---------- |
| `modalityBridgeCacheEnabled`    | `true`      | —          |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000    |

#### Nuotolinio vaizdo normalizavimas (savarankiško ciklo aprašymas/base64 gavimas)

Kai tiltas pats gauna **nuotolinį** vaizdą – Anthropic aprašymo savarankiškas iškvietimas ir claude-wire-format base64 konversija
(`ensureBase64ImagesForClaudeWire`), abu per
`fetchRemoteImageAsDataUri()` faile `visionBridgeHelpers.ts` – gautas duomenų
URI perduodamas per `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prieš įterpiant jį į vizijos modelio
užklausą. Per dideli vaizdai sumažinami iki **2048px ilgio kraštinės** (atitinka
OpenAI/Anthropic jau taikomą serverio pusės dydžio apribojimą), o tai sumažina
įkėlimo baitus/vėlavimą nekeičiant to, ką mato vizijos modelis. Dydžio keitimui
naudojamas `sharp`, įkeliamas per dinaminį importą: platformoje, kurioje jo
vietinis dvejetainis failas nepavyksta įkelti, `normalizeDataUri()` **niekada nemeta išimties** – jis grįžta
prie originalių baitų perdavimo, todėl aprašymo/base64 konversijos
kelias visada veikia. Ne vaizdo baitai (gavimas, kuris negrąžino dekoduojamo vaizdo)
taip pat perduodami nepakeisti. Šis normalizavimas taikomas vaizdams, kuriuos
tiltas gauna savo savarankiškam iškvietimui – jis niekada
netaikomas iškvietėjo neapdorotam perdavimo duomenų paketui, atsižvelgiant į
tik pasirinktinio mutacijos principą (Griežta taisyklė #20).

#### Nustatymų schema + migracija

Nauji `modalityBridge*` raktai yra patvirtinami Zod pagalba `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trejetas ir
`modalityBridgeAudio*` grupė, naudojama Garso tilto. Migracija
`141_modality_bridge_settings.sql` nukopijuoja esamas senas
`visionBridge*` reikšmes į atitinkamus naujus raktus (idempotentiška, niekada neperrašo
operatoriaus nustatytos `modalityBridge*` reikšmės); senieji raktai lieka priimami kaip
skaitymo atsarginis variantas vienam išleidimo ciklui.

#### Skaidrumo antraštė + statistika

Aprašymu transformuoti atsakymai turi
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(sukurtas `buildModalityBridgeHeader()` faile `modalityBridge/bridgeStats.ts`,
pažymėtas `withModalityBridgeHeader()` faile `src/sse/handlers/chatHelpers.ts`).
Peradresuotos užklausos **neturi** antraštės – duomenų paketas nebuvo paliestas, o modelio
keitimas jau matomas atsakymo turinio `model` lauke.

`GET /api/modality-bridge/stats` (valdymo autentifikavimas, tas pats lygis kaip
`GET /api/settings`) grąžina atmintyje esančius kiekvienos modalumo skaitiklius
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` vizijai, garsui ir
vaizdui. `averageLatencyMs` naudoja `latencySamples`, o ne visus bandymus, kaip savo
vardiklį; operacija be laiko matavimo nesukuria nulio milisekundžių
pavyzdžio. `bridged` išlieka atgaliniu suderinamuoju sėkmingų
konversijų pseudonimu; nepavykę bandymai jo nepadidina.
Skaitikliai atstatomi paleidus procesą iš naujo pagal numatytąjį nustatymą
(telemetrija, o ne apskaita).

#### Prietaisų skydelio konfigūracija

Skirta prietaisų skydelio pusė yra
`/dashboard/settings/modality-bridge`. Jos URL adresuojami `Vision`, `Audio` ir
`Video` skirtukai išsaugo užklausos parametrus keičiant `tab` reikšmę.
„Vision“ skirtukas atskleidžia įjungimą, režimą, modelio pasirinkimą (įskaitant automatinį
numatytąjį), užduotį atitinkantį raginimą, išplėstinius laiko limito / vaizdo / aprašymo ilgio / talpyklos
apribojimus, vykdymo laiko skaitiklius ir apsaugotą pavyzdinę užklausą. „Audio“ skirtukas taip pat veikia: jis atskleidžia
įjungimą, tik STT modelio pasirinkiklį su „Auto“, laiko limito / maksimalaus klipo apribojimus, garso
skaitiklius ir `input_audio` pavyzdinį testą. „Video“ skirtukas yra funkcionalus: jis praneša
FFmpeg/ffprobe vykdymo būseną – vieną iš keturių aiškių vartotojo sąsajos būsenų (`unknown`, kol
zondas vykdomas arba negalėjo būti baigtas, `restricted` ne grįžtamojo ryšio prietaisų skydelio pagrindiniame kompiuteryje,
kur zondas praleidžiamas kliento pusėje, `unavailable`, kai patikrinus patvirtinama, kad trūksta, arba
`available` su FFmpeg/ffprobe versijomis) – išsaugo įjungimo / modelio / kadro / vaizdo / laiko limito apribojimus,
filtruoja modelio pasirinkiklį, kad būtų rodomi vaizdo įrašus palaikantys modeliai, ir atskleidžia vaizdo įrašų skaitiklius.

Ankstesnė „Vision Bridge“ kortelė, esanti AI nustatymuose, yra suderinamumo nuoroda į
naują puslapį; ji nebeturi antros formos kopijos. „Media Providers“ taip pat
susieja „Image-to-Text“ ir „Speech-to-Text“ darbo eigas su atitinkamais „Modality
Bridge“ skirtukais, nepašalindama esamos „Speech-to-Text“ žaidimų aikštelės.

**Savaiminio ciklo leidimo apėjimas:** kai aprašymo iškvietimas nukreipiamas per OmniRoute
savaiminį `/v1` ciklą (nestandartinis teikėjo modelis), papildoma užklausa siunčia
`x-omniroute-admission-bypass: internal` ir yra autentifikuojama su išspręstu
savaiminio ciklo kredencialu – vietiniu `sk_omniroute` sargybiniu vietiniu režimu, arba
operatoriaus sukonfigūruotu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` aplinkos kintamojo raktu (#1350),
kad `REQUIRE_API_KEY=true` diegimai vis tiek galėtų vykdyti aprašymo iškvietimą.
Apėjimas galioja tik tiems tiksliems kredencialams, todėl išoriniai klientai negali
naudoti antraštės, kad praleistų leidimą.

Palikimo numatytosios reikšmės yra `src/shared/constants/visionBridgeDefaults.ts`;
naujo režimo / užduoties atpažinimo / talpyklos numatytosios reikšmės ir nustatymų sprendiklis yra
`src/shared/constants/modalityBridgeDefaults.ts`. Apsaugos mechanizmas atskleidžia
`deps` konstruktoriaus parinktį, kad testai galėtų įterpti netikras `getSettings` ir
`callVisionModel` implementacijas.

### Garso tiltas (`audioBridge.ts`) – Modality Bridge PR-3

Perima garso turinčias pokalbių užklausas, kol jos pasiekia tikslą, kuris nėra
žinomas kaip priimantis garso įvestį. Jis niekada nenukreipia pokalbio užklausos:
garso dalys transkribuojamos per esamą su OpenAI suderinamą daugiašalį galinį tašką,
o pasirinktas pokalbių modelis tęsia darbą su teksto transkripcijomis.

Eiga:

1.  Išspręskite `supportsAudio` per `getResolvedModelCapabilities()`. Aiškūs
    teikėjo registro metaduomenys laimi, tada statiniai modelio metaduomenys, tada sinchronizuoti
    `modalities_input`. Deklaruotas įvesties sąrašas be `audio` yra `false`; jokių
    galimybių įrodymų nelieka (`null`). Tiek `false`, tiek `null` aktyvuoja
    konservatyvų tiltą, o `true` jį apeina.
2.  Išspręskite `modalityBridgeAudio*` nustatymus ir ištraukite sujungiamas aukščiausio lygio
    garso dalis iš kiekvieno pranešimo per bendrą `detectMediaParts()` detektorių.
    Palaikomos laidų formos yra OpenAI `input_audio`, `audio_url` ir
    `source.media_type: "audio/*"`. Įdėtas garsas aptinkamas nukreipimui, bet
    nepašalinamas sujungimo keliu. Darbas apribojamas `modalityBridgeAudioMaxClips`;
    vėlesnės dalys lieka nepaliestos.
3.  Gerbkite sukonfigūruotą `provider/model` arba leiskite `selectAudioBridgeModel()`
    pereiti `AUDIO_TRANSCRIPTION_PROVIDERS` stabilia katalogo tvarka ir pasirinkti
    pirmąjį modelį su tinkamu aktyviu teikėjo kredencialu.
4.  `callAudioTranscription()` konvertuoja base64/data-URI garsą į daugiašalį
    `file` arba atsisiunčia nuotolinį `audio_url` per tik viešą išorinę apsaugą
    su DNS prisegimu ir 25 MB apribojimu. Tada jis POST'ina failą ir pasirinktą
    modelį į vietinį `/v1/audio/transcriptions` savaiminį ciklą, autentifikuotą
    naudojant `resolveSelfLoopBearer()`. Esamas transkripcijos maršrutas atlieka
    įprastą kredencialų paiešką, atvėsimo / dažnio apribojimo valdymą ir teikėjo
    išsiuntimą.
5.  Sėkmingi iškvietimai pakeičia savo dalis į `[Audio N]: <transkripcija>`. Iškvietimai
    vykdomi su `Promise.allSettled`: individualus gedimas išsaugo tą originalią
    garso dalį (#4012 sutartis). Jei kiekvienas iškvietimas nepavyksta ir tikslas
    yra įrodytas kaip `supportsAudio === false`, dalys tampa
    `[Audio N]: (neprieinama – nėra prijungto STT teikėjo)` (#8430 sutartis).
    Nežinomam tikslui (`null`) visų gedimų rezultatas lieka nepaliestas. Įrodytas
    tik teksto tikslas be tinkamo STT kredencialo gauna tą patį aiškų šabloną,
    neišduodant tinklo iškvietimo.

Sėkmingos transkripcijos naudoja visos sistemos „Modality Bridge“ LRU/TTL talpyklą.
Raktas apjungia garso nuorodą, stabilią `audio-transcription` operacijos etiketę
ir pasirinktą STT modelį; gedimai niekada nėra talpinami. Garso bandymai atnaujina
bendrus `bridged`, `cacheHits`, `failures` ir `lastUsedAt` skaitiklius.
Transformuoti atsakymai turi `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nepaliestos užklausos negauna garso tilto segmento.

Vykdymo laiko nustatymai yra saugomi duomenų bazėje ir patvirtinami Zod:

| Key                           | Default | Range          |
| :---------------------------- | :------ | :------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

Bendra talpykla lieka valdoma `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ir `modalityBridgeCacheMaxEntries`.

### Vaizdo tiltas (`videoBridge.ts`, `videoBridgePipeline.ts`)

Perima aukščiausio lygio vaizdo įrašų dalis pokalbių užbaigimo `messages` ir atsakymų API `input` prieš iškviečiant tikslą be žinomos vietinės vaizdo įrašų palaikymo.
Palaikomi formatai yra `input_video`, `video_url`, `video_source`, HTTPS URL ir `data:video/*;base64,...` duomenų URI. Paprasti failų pavadinimai tekste nėra traktuojami kaip vaizdo įrašai.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) valdo užklausų peržiūrą, galimybių/politikos patikrinimą, agregavimą pagal užklausą ir atsakymo duomenų srautą.
Darbas su kiekvienu vaizdo įrašu – įsigijimas, viso rezultato talpykla, kadrų sekos aprašymas (kuris sujungia bet kokį skambinančiojo deklaruotą garso transkriptą) ir metrikos/nutraukimo/valymo veiksmai pagal bandymą – yra paslėptas už `processVideoPart` `videoBridgePipeline.ts` faile, iškviečiamas vieną kartą kiekvienai vaizdo įrašo daliai `preCall` ciklo metu.
Šis modulis taip pat apibrėžia aiškias prievadų ribas `VideoMediaBrokerPort` (baitų įsigijimas ir atrinktų kadrų ištraukimas), `VideoAudioTranscriptionPort` (skambinančiojo deklaruoto garso transkripto sujungimas su atrinktais subtitrais) ir `VideoDrilldownPort` (kadrų išsamios informacijos išsaugojimo riba; dar neįtraukta į `processVideoPart` – tik atskiras `/api/modality-bridge/video/drilldown` maršrutas šiandien rašo išsamios informacijos įrašus).

Viešasis `/v1` užklausos kelias niekada neimportuoja ir neiškviečia papildomo proceso. Nuotoliniai vaizdo įrašai atsisiunčiami su 50 MiB riba; įterpti base64 vaizdo įrašai turi konservatyvią 36 MiB iššifruotą ribą vienam vaizdo įrašui, kad modelio/pranešimų/įrėminimo apvalkalas galėtų likti viešojo JSON užklausos priėmimo ribose, t. y. 50 MiB. Įterptojo ilgio ir iššifruoto dydžio įvertinimai tikrinami prieš paskirstymą. HTTPS reikalingas pradiniam nuotoliniam URL ir kiekvienam peradresavimui, naudojant esamą tik viešą išorinę apsaugą su DNS prisegimu. Tada baitai kerta tikslią vidinę `POST /api/modality-bridge/video/extract` brokerio ribą. Šis maršrutas yra ir `LOCAL_ONLY`, ir `SPAWN_CAPABLE`, priima tik vienam procesui autentifikuotą, patikimą atgalinio ryšio užklausą ir niekada nepriima URL, failų sistemos kelio, vykdomojo failo ar argumentų sąrašo. API kūno dydžio srautas ir tvarkyklės laipsniškas kūno skaitytuvas nepriklausomai taiko 50 MiB brokerio įvesties ribą. Jo ribota eilė vienu metu vykdo vieną ištraukimą, leidžia keturis laukiančius darbus ir riboja laukiančią įvestį iki 100 MiB.

Brokerio viduje `ffprobe` nuskaito privatų vietinį failą; fiksuotas formatų leidžiamų sąrašas neįtraukia grojaraščių ir manifestų formatų. Leidžiamiems MOV šeimos konteineriams išorinės MOV duomenų nuorodos išlieka išjungtos pagal numatytuosius nustatymus, o fiksuota komanda jų neįjungia. Tiek `ffprobe`, tiek `ffmpeg` naudoja tik `file` protokolo baltąjį sąrašą, vieną giją, fiksuotus argumentų masyvus, be apvalkalo ir vykdomuosius failus, išspręstus iš `PATH`. Pridėtos nuotraukos viršelio srautai nėra tinkami grojimui. Visi grojami srautai turi atitikti ribas, o aiškus numatytasis srautas yra pageidaujamas prieš deterministinį mažiausio indekso atsarginį variantą. Vaizdo įrašai yra apriboti iki 600 sekundžių, 8 192 pikselių vienai dimensijai ir 33 554 432 šaltinio pikselių. FFmpeg atrenka 1–16 vidurio JPEG kadrų, sumažina ilgąją kraštinę iki ne daugiau kaip 1 024 pikselių, nedidindamas mažesnių įvesties duomenų, ir niekada negauna URL. Atranka pagal numatytuosius nustatymus yra `uniform`. Pasirenkamos `scene_aware` ir eksperimentinės `segment_aware` politikos atlieka vieną papildomą fiksuotą FFmpeg praleidimą per jau patvirtintą vietinį srautą, pasirenka ribotas `showinfo` scenos laiko žymas ir deterministiškai grįžta prie tų pačių vienodų vidurio taškų, jei detektorius sugenda, baigiasi laikas, išvestis yra neteisinga arba kandidatų rinkinys yra tuščias. Segmentų atpažinimo režimas proporcingai paskirsto vidurio taškų pavyzdžius patvirtintiems scenos intervalams; segmentų atpažinimo įrodymai ir atsarginis elgesys išsamiau aprašyti toliau. Kieta 16 kadrų riba taikoma po pasirinkimo kiekvienoje politikoje. Kai scenos atpažinimo užklausa turi tik vieno kadro biudžetą, ji naudoja vienodą aktyvaus viso vaizdo įrašo arba fokusavimo lango vidurio tašką ir praneša `policyEffective: uniform`: vienas pasirinktas scenos kadras negali išsaugoti abiejų laiko galų. Skambinantysis gali pasirinktinai pateikti baigtinį fokusavimo langą (`start`/`end` sekundės); ribos yra apribojamos iki medijos trukmės, atvirkštiniai arba nebaigtiniai langai atmetami, o visos atrankos politikos atliekamos tik normalizuotame intervale. Gautas langas įtraukiamas į atrankos metaduomenis ir į nepatikimą aprašymo priešdėlį, kad tolesni modeliai galėtų atskirti fokusuotą ištrauką nuo visos laiko juostos.

Semantinis antraščių fokusavimas yra atskiras, aiškus nustatymas. Numatytasis `full` analizės režimas išsaugo esamą kadro raginimą ir niekada neperduoda užklausos teksto antraščių modeliui. `focused` režimu tiltas nuskaito tik naujausią ne tuščią vartotojo sukurtą `text`/`input_text` iš to paties pokalbio ar atsakymų konteinerio, normalizuoja jį į NFC, suglaudina valdymo simbolius ir tarpus bei apriboja jį iki 500 Unicode kodų taškų. Tuščias rezultatas grįžta prie tikslaus `full` raginimo. Naudingas patarimas serializuojamas kaip JSON specialiame nepatikimo vartotojo konteksto bloke ir gali tik nustatyti stebimų detalių prioritetus; jis negali pakeisti atskiro įspėjimo dėl nurodymų, matomų ar girdimų medijoje, vykdymo. Tekstinis fokusavimas niekada nenustato `start`/`end` ar nekeičia laiko imtuvo.

#### FU-07 struktūrinio segmento įrodymai

`segment_aware` naudoja vieną ribotą išankstinės analizės praleidimą per jau patvirtintą vietinį vaizdo srautą. Fiksuota filtrų grandinė pirmiausia sumažina mastelį iki ne daugiau kaip 320 pikselių pločio, aptinka scenos pokyčius ir užšaldytus intervalus, tada atrenka 1 kadrą per sekundę, kad nustatytų suliejimą, vidutinį šviesumą ir erdvinę/laikinę informaciją. Praleidimas yra apribotas iki 600 struktūrinių pavyzdžių, vienos FFmpeg/filtro gijos, to paties tik `file` protokolo ir konteinerių leidžiamų sąrašų, 1 MiB proceso išvesties ribos ir ne daugiau kaip 30 sekundžių brokerio bendrame nutraukimo/termino laike. Jis niekada nepriima komandos, filtro, kelio ar URL iš užklausos.

Struktūrinės vertės yra deterministiniai mėginių ėmimo įrodymai, o ne semantinis vaizdo įrašų supratimas. Jos nenustato subjektų, veiksmų, antraščių, kalbos ar vartotojo ketinimų. Scenos ir sustabdymo ribos sudaro segmentus; sustabdymo aprėptis, suliejimas, ekspozicija, erdvinės detalės ir laiko pokyčiai tik įtakoja, kaip paskirstomas esamas 1–16 kadrų biudžetas. Visiškai sustabdytas segmentas apribojamas vienu kadru, o nesustabdyti segmentai konkuruoja dėl likusio biudžeto. Kai ribų skaičius viršija kadrų skaičių, išlaikoma vienoda laiko juostos aprėptis, kad greiti ankstyvi iškirpimai negalėtų paslėpti ilgo vėluojančio segmento. Scenos ribos, esančios 1 sekundės analizės skiriamojoje geboje nuo sustabdymo ribos, sujungiamos.

Trūkstami filtrai, netinkami/tušti įrodymai, detektoriaus klaida arba apribotas išankstinės analizės laiko limitas atveria tikslią vienodo vidurio taško politiką. Skambintojo nutraukimas arba tarpininko terminas neatveria: tai nutraukia vykdomą posistemį, neleidžia vėliau išgauti kadrų, o privati laikina medžio struktūra pašalinama `finally` bloke.

`scripts/perf/video-bridge-fu07-eval.ts` generuoja deterministinius tikrus FFmpeg fiksatorius, skirtus sutaupyti po dublikatų pašalinimo antraščių iškvietimams, tankaus judesio biudžeto paskirstymui, suliejimo/ekspozicijos/SI-TI įrodymams, greitiems kirpimams su ilga uodega ir laipsniškam išblukimui, sukeliantiems klaidingus teigiamus rezultatus. Jis registruoja išankstinės analizės realųjį laiką ir, jei `/usr/bin/time` yra prieinamas, vaiko CPU ir didžiausią RSS. Jo kokybės patikrinimai yra tik struktūriniai orakulai. Tikra antraščių modelio kokybė išlieka `HOLD`, nes ši testavimo sistema neturi autorizuoto galinio taško ar patvirtinto vertintojo. Piniginiai sutaupymai taip pat išlieka `HOLD`, nebent `--caption-cost-per-call-usd` pateikia aiškų teigiamą iškvietimo kainos įvertinimą; scenarijus niekada nesukuria nė vieno rezultato.

Kiekvienas kadras apribotas iki 4 MiB, visi neapdoroti kadrai kartu iki 23 MiB, o serializuotas tarpininko atsakymas iki 32 MiB. Privatus laikinasis katalogas pašalinamas `finally` bloke. OmniRoute nekomplektuoja FFmpeg ir nepriima pasirinktinio vykdomojo failo kelio. Prieš kuriant antraštes, tiltas taiko konservatyvų vizualinio dublikatų pašalinimo etapą: kiekvienas JPEG sumažinamas iki 16×16 pilkumo atspalvių buferio ir lyginamas tik su paskutiniu išsaugotu kadru. Kai prašomas antraščių biudžetas viršija vieną kadrą, ištraukimas pateikia apribotą kandidatų telkinį, kuris yra iki dviejų kartų didesnis už tą biudžetą ir niekada neviršija 16 kadrų. Prašomas apribojimas taikomas tik po dublikatų pašalinimo, o pirmasis ir paskutinis pasirinkti kandidatai išsaugomi galutinio retinimo metu, kai biudžetas yra bent du. Versijuota `grayscale-16x16-mean-cells-v2` politika naudoja didesnę iš vidutinės liumos deltos ir miniatiūrų langelių, kurių normalizuota delta yra bent 0.05, santykio. Dublikatų slenkstis yra konstanta 0.04, pasirinkta dėl nuspėjamumo, o ne kaip vykdymo laiko nustatymas. Šis antrinis didelio kontrasto signalas išsaugo nedidelius judesius ir matomo teksto pokyčius, kuriuos vien tik vidurkio palyginimas gali paslėpti. Palyginimo ar dekoderio klaidos atveria ir išlaiko aprėptį. Išvesties metaduomenys atskiria išgautus kandidatus, sėkmingai panaudotus kadrus ir atmestus vizualinius dublikatus.

Aiškiai pažymėta vaizdo įrašo dalis gali prašyti kontaktinio lapo su laiko žymėmis. Tiltas sukuria daugiausiai 4 stulpelių, 16 kadrų JPEG tinklelį. Kiekviena 512 pikselių langelis įrašo savo šaltinio laiko žymę į didelio kontrasto apatinę juostą, o tos pačios laiko žymės lieka tekstiniuose metaduomenyse, skirtuose tolesniam susiejimui ir auditui. Visas JPEG išlieka apribotas iki 32 MiB. Jei `sharp` negali dekoduoti ar sukomponuoti tinklelio, tiltas grįžta prie atskirų JPEG kadrų; kliento nutraukimas vis tiek perduodamas per lapo operaciją.

Reklamos įrodymai yra sąmoningai atskirti nuo sintetinės kompozicijos mikroetalono. `scripts/perf/video-bridge-contact-sheet-eval.ts` apibrėžia schemos versijos A/B testavimo sistemą, skirtą tikriems su OpenAI suderinamiems vizijos modeliams. Ji matuoja tiekėjo praneštus žetonus, bendrą realųjį delsą (įskaitant lapo kompoziciją), modelio iškvietimų skaičių ir manifeste apibrėžtą faktų išsaugojimą. Neapdoroti modelio atsakymai į ataskaitą nerašomi; išsaugomi tik SHA-256 santraukos ir atitinkami faktų ID. Testavimo sistema neatlieka jokių tinklo ar mokamų modelio iškvietimų, nebent perduodamas `--execute-real` ir sukonfigūruoti `--model`, `OMNIROUTE_BASE_URL` bei `OMNIROUTE_API_KEY`. Be šio aiškaus realaus vykdymo, jos mašininis verdiktas išlieka `HOLD`; vien tik sintetiniai naudingosios apkrovos/iškvietimų skaičiaus matavimai nėra reklamos įrodymai.

Skambintojai gali pridėti pasirenkamą `transcript.cues` masyvą prie palaikomos vaizdo įrašo dalies, jei jau turi suderintą tekstą. Kiekvienas signalas turi turėti `text`, baigtinį `start`/`end` intervalą zondo trukmės viduje ir baltajame sąraše esantį `source` (`client`, `embedded` arba `audio-bridge`); `confidence` numatytoji reikšmė yra `1` ir turi būti tarp `0` ir `1`. Tikslūs pasikartojantys signalai yra sugrupavami. OmniRoute niekada nepradeda transkripcijos iš šių metaduomenų: patvirtinti signalai nukopijuojami į aprašytą rezultatą su šaltiniu, patikimumu ir intervalu, ir pateikiami kaip nepatikimi stebėjimai kartu su kadrų antraštėmis. Netinkamas, už diapazono ribų esantis arba kilmės neturintis tekstas atmetamas, o ne maišomas į antraščių srautą. `source` laukas šiuo metu yra deklaruojamas skambintojo, o ne patvirtinamas serverio: OmniRoute užtikrina, kad reikšmė yra viena iš trijų leidžiamų eilučių, tačiau dar kriptografiškai nepatvirtina, kad `embedded` arba `audio-bridge` etiketė iš tikrųjų atėjo iš serverio valdomo ištraukimo. Laikykite `source` nepatikimu patarimu, kol nebus atliktas patvirtinimas; nekurdami autorizacijos sprendimų remdamiesi juo.

Pažangus iškvietėjas gali pateikti jau autorizuotą `audioTranscript` takelį tam pačiam vaizdo įrašui. Suliejimo siūlė apdoroja vaizdinius ir garso stebėjimus pagal vieną terminą ir nutraukimo signalą, išdėsto juos bendroje laiko juostoje, pašalina tikslias kopijas ir praneša apie dalinį rezultatą, kai sėkmingai pavyksta tik vienai pusei. Neteisingas `audioTranscript` pablogėja iki to dalinio rezultato – vizualinis aprašymas išsaugomas, o garso šaka įrašo išvalytą gedimo kodą – užuot sugadinus visą vaizdo įrašą. Kiekvienos šakos prieinamumas, dalinis žymeklis ir išvalyti gedimo kodai išsaugomi aprašytame rezultate, apsaugos metaduomenyse (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), rezultatų talpyklos metaduomenyse ir tilto suliejimo skaitikliuose. Numatytasis „Video Bridge“ kelias neiškviečia kalbos į tekstą konvertavimo ir neatsisiunčia antros medijos kopijos; be to aiškaus takelio jis lieka tik vaizdo įrašu.

**Transkripto išsaugojimas (#12150 P1).** Tai taikoma automatiškai, kai „Video Bridge“ (pati pasirenkama) atvaizduoja transkripto užuominą – atskiro išsaugojimo žymeklio nėra. Kai užklausa atvaizduoja bet kokią transkripto užuominą (iškvietėjo deklaruotą `transcript` arba sulietą `audioTranscript`), apsauga pažymi ją `videoBridgeObserved` ir sukuria redaguotą vaizdo aprašymo šešėlį – identišką atvaizdavimą, kuriame kiekvienos užuominos laisvo teksto turinys pakeičiamas `[redacted-video-transcript]`, sukuriamą pakeičiant struktūrizuotą užuominos lauką prieš surenkant eilutę (niekada neanalizuojant išlyginto teksto, todėl joks užuominos turinys – priešiškas ar įprastas, įskaitant turinius, kuriuose yra `]` pvz., `[inaudible]`/`[music]` – negali išlikti). Išsaugotas skambučių žurnalo užklausos turinys pakeičia kiekvieną iš vaizdo įrašo gautą teksto dalį tuo redaguotu šešėliu, suderintu pagal turinio lygybę; `fullText` inkaro reikšmė iš naujo nuskaitoma iš baigto priešskambučio apsaugos naudingosios apkrovos, todėl atitikimas vis dar sėkmingas po to, kai vėlesnės grandinės apsaugos (PII ir kredencialų maskuotojai, prioritetai 10/95) perrašo aprašymo tekstą vietoje ir po to, kai sistemos raginimas/perdavimas/atminties įterpimas pakeičia pranešimų masyvą. Į modelį siunčiamas turinys lieka nepakitęs. Stebima užklausa taip pat neužpildo jokios patvarios atminties (praleidžiamas tiek užklausos, tiek atsakymo pagrindu gautas ištraukimas), todėl paties modelio atsakymas negali atkartoti transkripto teksto į atmintį.

Papildomos išsaugotos kopijos naudoja tą patį stebimos užklausos signalą. Neapdorotas kliento užklausos momentinis vaizdas prieš apsaugą, atmintyje esanti laukianti užklausa ir ankstyvas atmestų užklausų žurnalas struktūriškai pakeičia transkripto laukus vaizdo dalyse; eilutės raginimai, sugeneruoti konvejerio etapų ir konteksto perdavimo, yra redaguojami išsaugotos užklausos turinio sraute. Išsaugotas `video_content_removed` žymeklis priverčia `previous_response_id` tęsinį užsidaryti, užuot atkūrus tekstą, kuris buvo tyčia atmestas. Jei stebima užklausa praranda savo dalinį redagavimo šešėlį prieš registravimą, arba net vienas iš kelių vaizdo šešėlių nesutampa po vėlesnių užklausos mutacijų, išsaugotas užklausos turinys visiškai praleidžiamas, užuot išsaugojus iš dalies redaguotą transkriptą.

Stebimos užklausos atveju modelio atsakymas gali cituoti bet kurią transkripto dalį be struktūrizuotos užuominos ribos. Todėl jo išsaugotas skambučių žurnalo `responseBody` pakeičiamas praleidimo žymekliu; išsamus konvejerio artefaktas (kuris gali apimti aukštesnio lygio/kliento turinius ir srauto fragmentus) nėra išsaugomas. Semantinės, idempotentiškumo ir samprotavimo pakartojimo talpyklos apeina skaitymo ir rašymo operacijas šiai užklausai. Teikėjo užklausa ir klientui matomas atsakymas lieka nepakitę. Ankstyvieji „keepalive“ baitai ištuštinami iš laikinojo buferio, kai išsamus artefaktas praleidžiamas. Kiro neteisingai suformuoto „EventStream“ įspėjimas praneša tik naudingosios apkrovos baitų skaičių, niekada jos turinio ar JSON analizatoriaus neapdorotos klaidos. Tai nereiškia, kad kiekviena nesusijusi teikėjo/įskiepio diagnostika buvo audituota; platesnis išsaugotų srautų valymas stebimas #11658.

Vidinis `/api/modality-bridge/video/drilldown` gyvavimo ciklas yra atskiras, grįžtamojo ryšio/žetonu autentifikuotas talpyklos pagrindas. Kiekvienai operacijai taip pat reikalingas kanoninis nepermatomas pagrindinio subjekto ID. Prieš įjungiant gamybos iškvietėją, jis turi gauti tą ID iš autentifikuoto nuomininko ir niekada neturi persiųsti kliento pasirinktos reikšmės. Talpyklos raktai susieja tą pagrindinį subjektą su kanoniniais sesijos ir vaizdo įrašų nuorodų ID, saugo tik jų SHA-256 gautus raktus ir apriboja tiek skaitymo, tiek ištrynimo operacijas tam pačiam pagrindiniam subjektui. Talpykla saugo daugiausiai 16 išvestinių JPEG kadrų vienam įrašui, juos pasibaigus dešimčiai minučių ištrina ir palaiko ribotus `start`/`end` skaitymus arba aiškų sesijos ištrynimą.

Kiekvienas pagrindinis subjektas yra apribotas iki 16 įrašų ir 64 MiB kanoninių JPEG duomenų. Šie apribojimai nepriklauso nuo bendros 64 įrašų/256 MiB ribos: pagrindinio subjekto kvotos spaudimas pašalina tik to pagrindinio subjekto rečiausiai naudotus įrašus, prieš pradedant svarstyti visuotinį LRU pašalinimą. Pasibaigę įrašai pašalinami tiek iš pagrindinio subjekto, tiek iš visuotinės apskaitos, kai vykdoma talpyklos veikla, o atšaukimas ir patvirtinimo klaida neįpareigoja dalinio pakeitimo.

Talpykla atmeta nekanoninį Base64, perteklinį užpildymą, ne JPEG mediją, neteisingai suformuotus ar sutrumpintus JPEG failus ir JPEG failus, kurie sukelia įspėjimą riboto viso vaizdo `sharp` dekodavimo metu. Ji iš naujo užkoduoja kiekvieną priimtą vaizdą kaip kanoninį JPEG, išveda plotį ir aukštį iš dekoduotų baitų, užuot pasitikėjusi iškvietėjo laukais, ir atmeta visus uodegos poligloto baitus, užuot juos išsaugojusi. Tik ribotas kanoninis suglaudintas buferis yra įskaitomas į abi kvotas. JSON perdavimo limitas apima Base64 papildomas išlaidas 32 MiB dekoduoto įvesties ribai. Kiekvienas saugomas išvedimas įrašo savo patvirtintą JPEG formatą/raišką, mėginių ėmimo politiką, išvedimo versiją, sukūrimo laiką, serverio apskaičiuotą turinio maišą ir maišytą tėvinę nuorodą, taip pat patikimo iškvietėjo tėvinio turinio maišą. Atšaukimas tikrinamas tarp asinchroninių dekodavimo/maišos fazių prieš atominį talpyklos įrašymą.

Ši atkarpa dar neprijungia gamybos gamintojo prie maršruto ir nepateikia
kelių raiškų variantų pasirinkimo. Skaidrus „Video Bridge“ užklausos
kelias todėl nesukelia papildomo darbo, o nuomininkui priskirtas pagrindinis išvedimas ir
visas FU-08 kelių raiškų gyvavimo ciklas lieka aiškus tolesnis darbas, o ne
dokumentuojamas kaip baigtas elgesys.

Kvadrai nuosekliai antraštinami su sukonfigūruotu vaizdo modeliu. Tuščias
vaizdo perrašymas paveldi „Vision“ nustatymą; jei abu yra tušti, „Vision“
automatinis maršrutizatorius pasirenka efektyvų vaizdo palaikymo modelį. Sėkmingos antraštės
pakeičia originalią dalį stabiliu `[Video description:` priešdėliu, kuris taip pat
pažymi tekstą kaip nepatikimą, iš medijos gautą stebėjimą ir nurodo tolesniems
modeliams nevykdyti medijoje rastų instrukcijų. Kvadro antraštės talpyklos raktai
apima JPEG baitus, užklausą, laiko žymę ir efektyvų modelį; talpykloje saugomos tik
sėkmingos antraštės. Talpyklos įrašai išsaugo faktinį sėkmingą gamintojo modelį,
įskaitant atsarginį modelį; tiltas praneša `mixed`, kai skirtingi kadrai
buvo sukurti skirtingų modelių. Talpyklos atitikimas pakartotinai naudoja tą gamintojo tapatybę
vietoj to, kad ją pervadintų kaip prašomą maršrutizavimo planą. Viso vaizdo rezultato
talpykla yra raktuojama pagal kiekvieną įvestį, kuri keičia išvestį – užklausą, efektyvų
modelį, mėginių ėmimo politiką, kadrų skaičių, semantinės analizės režimą, SHA-256
normalizuoto fokusavimo užuominos piršto atspaudą, fokusavimo langą, `transcript`,
`audioTranscript` ir kontaktinio lapo vėliavėlę – todėl pakeitus bet kurią iš šių
dimensijų, talpykla nepasiekiama, niekada nepasikartojama pasenusi. Vaizdinės dedup politikos
versija, slenkstis ir apribotas kandidatinių kadrų skaičius taip pat yra aiškiai nurodyti
rezultatų talpyklos rakte ir metaduomenyse; todėl politikos pakeitimas negali pakartotinai naudoti pasenusio
viso vaizdo aprašymo. Rezultatų talpyklos v4 metaduomenys išsaugo režimą ir
piršto atspaudą, niekada neapdorotą vartotojo užduotį. Apsaugos metaduomenys praneša tiek
prašomus, tiek efektyvius analizės režimus; prašomas `focused` režimas be
naudojamo vartotojo teksto pranešamas kaip efektyviai `full`.

Apsauga išskiria kiekvieną palaikomą vaizdo dalį, bet aprašo ne daugiau kaip
`modalityBridgeVideoMaxVideos`. Tikslui, kuris, kaip įrodyta, turi
`supportsVideo === false`, nepavykę ir viršijantys limitą vaizdo įrašai tampa aiškiais saugaus
teksto žymekliais, todėl neapdorotas vaizdo įrašas neišlieka. Kai galimybė nežinoma, tos dalys
lieka nepaliestos. Tikslai su `supportsVideo === true` apeina tiltą.
Kliento užklausos nutraukimo signalas sklinda per atsisiuntimą, tarpininko eilę,
paprocesius ir antraštės iškvietimus; nutraukimai sustoja tarp vaizdo įrašų ir niekada
nepavyksta atidaryti neapdorotos medijos.

Vykdymo laiko nustatymai yra pagrįsti DB ir patvirtinti Zod:

| Raktas                              | Numatytasis | Diapazonas / elgesys                                                                                      |
| :---------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Pasirenkamas vykdymo laikas, pasirinkimas                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` išsaugo bendrąsias antraštes; `focused` naudoja apribotą, nepatikimą naujausią vartotojo kontekstą |
| `modalityBridgeVideoModel`          | `""`        | Paveldi „Vision Bridge“ modelį                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                      |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` arba proporcingas `segment_aware`; detektoriaus gedimas grįžta prie `uniform`    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                       |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                            |

Senosios išsaugotos vaizdo įrašo laiko viršijimo vertės, viršijančios 120 sekundžių, apribojamos
iki tarpininko termino; nauji nustatymų įrašai, viršijantys tą limitą, atmetami.
`GET /api/modality-bridge/video/runtime` reikalauja patikimos antspauduotos grįžtamojo ryšio
vietos prieš autentifikavimą ar vykdymo laiko tikrinimą, tada reikalauja valdymo
autentifikavimo. Jis grąžina tik `available`, išvalytas FFmpeg/ffprobe versijas ir fiksuotą
priežastį, kai vykdymo laikas nepasiekiamas. Vidinis ištraukimo galinis taškas nėra
viešas įkėlimo API: eilės persipildymas grąžina `503` plius `Retry-After`, skambinančiojo
atsijungimas grąžina `499`, o fiksuotas tarpininko terminas grąžina `504`. Konvertuoti atsakymai prideda
`video->text;model=<visionModel>;parts=<videos>` prie centrinės
`x-omniroute-modality-bridge` antraštės, nepašalinant „Vision“ ar „Audio“ segmentų.

### PII maskuoklis (`piiMasker.ts`)

Veikia **abiejuose** etapuose.

- **`preCall`** klonuoja duomenų paketą, eina per `system`, `messages`, `input` ir
  `prompt` (įskaitant paprastus eilutės elementus) ir taiko `processPII()` (iš
  `@/shared/utils/inputSanitizer`) eilutės `content`/`text` laukams. Kai
  `PII_REDACTION_ENABLED=true`, aptikta PII redaguojama siunčiamame
  duomenų pakete. Tai nepriklauso nuo `INPUT_SANITIZER_MODE` (kuri kontroliuoja tik
  užklausos įterpimo politiką). Kai redagavimas išjungtas, iškvietimas registruoja aptikimo
  skaičių, neperrašant turinio.
- **`postCall`** giliai klonuoja atsakymą, paleidžia `sanitizePIIResponse()` plius
  „Responses-API-shape“ maskuoklį (`maskResponsesOutput` – apima
  `output_text` ir `output[].content[].text`). Jei atliekamas koks nors redagavimas,
  pakeistas atsakymas pakeičia originalų.

Apsauga niekada neužblokuoja; ji tik anotuojasi (`meta.detections`,
`meta.redacted`) arba perrašo.

### Užklausos įterpimas (`promptInjection.ts`)

Aptinka priešiškas struktūras vartotojo pateiktame turinyje ir įgyvendina
sukonfigūruotą politiką. Elgesį lemia aplinkos kintamieji ir konstruktoriaus
parinktys:

| Nustatymas          | Aplinkos kintamasis                                                                                            | Numatytoji reikšmė | Poveikis                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Įjungta             | `INPUT_SANITIZER_ENABLED`                                                                                      | `true`             | Kai `false`, apsaugos mechanizmas išsijungia.                                                                                                                                        |
| Režimas             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                | `warn`             | Įterpimo politika: `block`, `warn` arba `log`. (`redact` priimamas dėl atgalinio suderinamumo, bet **ne**pašalina įterpimo teksto; PII perrašymas valdomas `PII_REDACTION_ENABLED`.) |
| Blokavimo slenkstis | `blockThreshold` parinktis / `INPUT_SANITIZER_BLOCK_THRESHOLD` (pseudonimas `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`             | Minimalus reikalingas rimtumas blokavimui. Numatytuoju atveju „Medium“ yra tik stebėjimo režimas.                                                                                    |

**Režimo pirmumas** (`getMode`): iškvietėjo `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijų žymės perrašymas** (Prietaisų skydelis →
Nustatymai → Funkcijų žymės) → `INJECTION_GUARD_MODE` aplinkos kintamasis →
`INPUT_SANITIZER_MODE` aplinkos kintamasis → `warn`. Todėl prietaisų skydelio
perrašymas yra viršesnis už aplinkos kintamuosius, taigi funkcijų žymių
vartotojo sąsaja valdo veikiantį apsaugos mechanizmą realiuoju laiku (nereikia
perkrauti). Duomenų bazės skaitymas yra atsparus gedimams: jei įvyksta klaida,
apsaugos mechanizmas grįžta prie aplinkos kintamaisiais pagrįsto elgesio, o kai
perrašymas nenustatytas, elgesys yra identiškas tik aplinkos kintamųjų
sprendimui.

Aptikimo šaltiniai:

1.  `sanitizeRequest()` iš `@/shared/utils/inputSanitizer` (bendras detektorių
    rinkinys, naudojamas kitur konvejerio grandinėje).
2.  Integruoti `DEFAULT_GUARD_PATTERNS` (šiuo metu `system_override_inline` ir
    `markdown_system_block`, abu `high` rimtumo).
3.  Pasirenkami `customPatterns`, perduodami per konstruktoriaus parinktis
    (eilutės, reguliarieji reiškiniai arba `{ name, pattern, severity }`
    įrašai).

Kai `mode === "block"` **ir** bent vienas aptikimas atitinka rimtumo slenkstį,
`preCall` grąžina `{ block: true, message: "Request rejected: suspicious
content detected" }`. `warn`/`log` režimais apsaugos mechanizmas registruoja
įvykį, bet leidžia iškvietimą. Bendras pagalbinis metodas
`evaluatePromptInjection()` taip pat eksportuojamas iškvietėjams, kuriems
reikia įvertinti užklausas, neperėjus per registrą.

**Skenavimo riba (v3.8.20):** detektorius tikrina tik **pirmuosius 16 KB**
sujungto užklausos teksto — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384
baitai) faile `src/shared/utils/inputSanitizer.ts`. Tiek `detectInjection()`,
tiek `evaluatePromptInjection()` naudoja `slice(0, MAX_INJECTION_SCAN_BYTES)`
prieš paleidžiant šablonų ciklą. Įterpimo direktyvos yra įvesties pradžioje,
todėl tai apriboja reguliariųjų reiškinių procesoriaus/GC naudojimą šimtų KB
dydžio duomenų siuntose, nesusilpninant aptikimo (žr. #3932, #4041).

### Kredencialų maskuoklis (`credentialMasker.ts`)

Veikia **abiejuose** etapuose, paskutinis numatytojoje grandinėje (prioritetas
`95`). Redaguoja gerai žinomus API rakto / slaptų žetonų šablonus iš siunčiamo
duomenų paketo (pranešimo turinio, įrankio iškvietimo argumentų, įrankio
rezultatų) **ir** teikėjo atsakymo, kad į užklausą įklijuotas kredencialas
(arba įrankio rezultato atkartotas) nebūtų nutekintas aukštesnio lygio
teikėjui ar atgal klientui.

- **Tik pasirinktinai**, ta pati konvencija kaip PII redagavimas (Griežta
  taisyklė #20-greta): išjungta, nebent
  `settings.credentialRedactionEnabled === true` **arba**
  `CREDENTIAL_REDACTION_ENABLED=true`. Išjungus, apsaugos mechanizmas nieko
  nedaro – jis niekada neblokuoja ir niekada neperrašo.
- `redactCredentials()` pereina per visą duomenų paketo/atsakymo medį
  (`walkValue()`, saugus nuo prototipo užteršimo, saugus nuo ciklų per
  `WeakSet`) ir pakeičia atitikmenis `[REDACTED:<type>]` vietos žymekliu,
  klonuodamas tik tas šakas, kurios iš tikrųjų pasikeitė.
- `CREDENTIAL_PATTERNS` apima LLM teikėjų raktus (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS žetonus (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), mokėjimo raktus (Stripe,
  Square), debesies raktus (AWS prieigos raktas, Twilio, SendGrid, Mailgun),
  privačius raktus / JWT, prisijungimo duomenis turinčias prisijungimo
  eilutes (`mongodb://user:pass@...` ir kt.) ir bendrą
  `Authorization`/`x-api-key`/`api-key`/`apikey` antraštės reikšmės šabloną.
  Antraštės formos raktai (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redaguojami struktūriškai (tik reikšmė, išsaugomas schemos
  priešdėlis, pvz., `Bearer `/`Basic `), o ne per bendrąjį teksto reguliarųjį
  reiškinį.
- Apsaugos mechanizmas niekada neblokuoja; jis tik perrašo
  (`modifiedPayload` / `modifiedResponse`) ir anotuojasi
  (`meta.credentialsRedacted`, `meta.count`).

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
