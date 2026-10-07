# Guardrails (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tõeallikas:** `src/lib/guardrails/`
> **Viimati uuendatud:** 2026-08-29 — v3.8.51 (Video Bridge'i transkriptsiooni päritolu deklareerib kutsuja,
> server ei ole seda veel kontrollinud — täpsustatud vastavalt #11661-le)

Kaitsepiirded rakendavad ohutust, poliitikaid ja sisuteisendusi OmniRoute'i ning
ülesvoolu teenusepakkujate vahelisel piiril. Iga kaitsepiire saab kontrollida (ja
valikuliselt tagasi lükata, teisendada või annoteerida) päringu andmekogumeid (`preCall`) ja
ülesvoolu vastuseid (`postCall`).

Süsteem on **tõrke korral läbilaskev**: kui kaitsepiire tekitab käitamisel erindi, salvestab register
vea ja jätkab järgmise kaitsepiirdega, selle asemel et päring nurjata.
Blokeerimine on teadlik otsus (`block: true`), mitte kunagi juhus.

## Sisseehitatud kaitsepiirded

Register laadib impordil automaatselt kuus kaitsepiiret prioriteedi järjekorras
(vt `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteet | Nimi                | Etapp(id)      | Fail                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Madalama prioriteediga numbrid käivituvad **esimesena**.

### Nägemissild (`visionBridge.ts`) — Modaalsussild PR-1

Püüab kinni pilti sisaldavad päringud, mis on suunatud **mitte-nägemismudelitele**, ja kas suunab kogu päringu ümber nägemisvõimelisele mudelile või asendab pildi osad konfigureeritava nägemismudeli poolt toodetud tekstikirjeldustega enne ülesvoolu kutset. See võimaldab ainult tekstilistel pakkujatel läbipaistvalt käsitleda mitmemodaalseid andmekogumeid.

Voog:

1.  Jäta vahele, kui sihtmudel juba toetab nägemist (välja arvatud juhul, kui see ilmub sunnitud silla loendisse `isVisionBridgeForcedModel`).
2.  Eraldab pildi osad funktsiooni `extractImageParts(messages)` (`visionBridgeHelpers.ts`) kaudu, mis delegeerib **ühtsele meediumidetektorile** `detectMediaParts()` failis `open-sse/utils/mediaParts.ts` — see on ainus tõeallikas, mida jagatakse kombineeritud ühilduvusfiltriga. Eraldamine on lubatud ainult nende kujundite tipptaseme osadele, mida `replaceImageParts` saab tagasi liita (ekstraheerimise↔asendamise leping): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ja Responses API `input_image`. Pesastatud tabamused ja ainult indikaatoriga kujundid on kombineeritud filtri materjal ja neid ei ekstraheerita kunagi. Jäta vahele, kui midagi ei leitud.
3.  Lahendab käitusaja konfiguratsiooni funktsiooni `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) kaudu: uued `modalityBridge*` seadete võtmed võidavad; pärand `visionBridge*` võtmed jäävad **ühe tsükli varuks** (tagasipöördumise aken). Jäta vahele enne mis tahes meediumide läbimist, kui sild on keelatud.
4.  Režiimi valija (`modalityBridgeVisionMode`, vt allolevat tabelit) otsustab ümbersuunamise vs kirjeldamise. Ümbersuunamine tagastab `modifiedPayload'i`, kus on vahetatud ainult `model`, pluss meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Kirjeldamise tee: piira pilte `maxImages'iga`, koosta ülesandeteadlik viip, konsulteeri kirjeldamise vahemäluga, kutsu nägemismudel **paralleelselt** (`Promise.allSettled`) ja süsti nende asemele tekstiosad `[Pilt N]: <kirjeldus>`. Ebaõnnestunud kirjeldus annab `null` ja algne pildi osa **säilitatakse** (#4012) — välja arvatud kombineeritud kirjeldamise teel, kui kõik kirjeldused ebaõnnestusid, kus kinnitatud mitte-nägemise ülesvoolu saab selle asemel `(pole saadaval — nägemisvõimeline pakkuja pole ühendatud)` stubi (#8430).
6.  Tagastab `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Režiimi valija (`modalityBridgeVisionMode`)

| Režiim     | Vaikimisi | Käitumine                                                                                                                                                                                                                                                                                                |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔         | Pärandheuristika, puutumatu (#6640/#7204): mitte-kombo/`auto`/ mudelid suunatakse ümber parimale nägemismudelile, välja arvatud juhul, kui algsel mudelil on juba kasutatavad mandaadid (siis kirjeldatakse); kombo sihtmärgid kirjeldavad alati.                                                        |
| `describe` |           | Kirjelda alati — ümbersuunamise plokk jäetakse täielikult vahele; kasutaja valitud mudel vastab alati.                                                                                                                                                                                                   |
| `reroute`  |           | Sunnitud ümbersuunamine: mandaatidega mudeli hoidmise kaitsepiire on mööda hiilitud. Ümbersuunamise-**sihtmärgi** mandaadi kaitsepiire kehtib endiselt — kui puudub kasutatav nägemissihtmärk, läheb päring kirjeldamisele, nii et toorpildid ei jõua kunagi ainult tekstilisse taustaprogrammi (#8430). |

Sunnitud režiimid lühistavad **enne** automaatse heuristika käivitumist; `auto` käitumine on bait-identne PR-1 eelse kaitsepiirdega.

#### Ülesandeteadlik kirjeldamise viip (`modalityBridgeVisionTaskAware`)

Vaikimisi **tõene**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisab **viimase kasutajasõnumi** teksti (lühendatud 500 tähemärgini) baaskirjeldamise viibale, suunates kirjelduse selle poole, mida kasutaja tegelikult küsis (codex-vision-proxy muster) ja paludes nägemismudelil transkribeerida nähtavat teksti. Kui lipp on välja lülitatud — või puudub kasutajatekst — kasutatakse baasviipa muutmata kujul.

Isekirjelduse enda OpenAI-ga ühilduv päring (`callVisionModelSingle()`
failis `visionBridgeHelpers.ts`) küsib alati `image_url.detail: "high"` –
tingimusteta, iga kutsuja/pakkuja jaoks, ilma kliendi signaalita.
Madala detailsusega proovivõtt halvendab OCR-i täpsust just selle tekstitranskriptsiooni ülesande puhul, mida see viip küsib, seega küsib isekirjeldus alati kõrget detailsust, olenemata sellest, millist detailsuse taset algne sissetulev päring kasutas. See mõjutab ainult sisemise kirjelduspäringu keha; see ei muuda seda, kuidas OmniRoute edastab kutsuja enda `image_url.detail` esmasele päringule –
see vaikeseade rakendatakse eraldi ja ainult tuvastatud OpenCode klientidele, funktsioonis
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropicu traadiformaadi harul isekirjelduse silmusel puudub `detail` väli ja see ei ole kummagi vaikeseade poolt mõjutatud.

#### Kirjelduse väljundi piirang (`modalityBridgeVisionMaxChars`)

| Võti                           | Vaikimisi | Vahemik           |
| :----------------------------- | :-------- | :---------------- |
| `modalityBridgeVisionMaxChars` | `0`       | `0` või 100–50000 |

`0` (vaikimisi) tähendab **piiranguta** – `callVisionModel()` tagastatud kirjeldus edastatakse muutmata kujul, säilitades olemasoleva käitumise. Mis tahes väärtus vahemikus 100–50000 kärbib kirjeldust `…` sufiksiga enne, kui see tagasi liidetakse kui `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` failis `src/lib/guardrails/visionBridge.ts`).
Suurendage seda detailirohkete OCR-ülesannete puhul, kus allavoolu mudel vajab täielikku transkriptsiooni; vähendage seda, et piirata tokenite kasutust jutukate nägemismudelite puhul.
Armatuurlaua väli asub Visioni vahekaardi Advanced paneelil
(`modality-bridge-max-chars` failis `ModalityBridgeVisionTab.tsx`) ja piirab mis tahes väärtuse vahemikus 1 kuni 99 kuni 100-ni, jättes samal ajal selgesõnalise `0` puutumata – `0` on iseseisvalt kehtiv Zodi väärtus
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mitte ainult "määramata" vaikeseade.

#### Kirjelduse vahemälu (`modalityBridge/bridgeCache.ts`)

Mälusisene LRU + TTL vahemälu kirjelduste väljundite jaoks, jagatud protsessiüleselt.
Võti = `sha256(imageRef + composedPrompt + configuredBridgeModel)` pikkuse-eestikeelse raamimisega (väljade piiride kokkupõrkeid pole). Mudeli komponent on **konfigureeritud** silla mudel, mitte mudel, mis tegelikult vastas –
`callVisionModel` võib sisemiselt tagasi langeda ja iga katse kohta võtme loomine fragmenteeriks vahemälu. Ebaõnnestunud kirjeldusi ei vahemälu kunagi. Seaded:

| Võti                            | Vaikimisi | Vahemik |
| :------------------------------ | :-------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`    | —       |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000 |

#### Kaugpildi normaliseerimine (isekujunduse kirjeldus/base64 toomine)

Kui sild toob ise **kaugpildi** – Anthropicu isekõne kirjeldus ja claude-traadiformaadi base64 teisendus
(`ensureBase64ImagesForClaudeWire`), mõlemad läbi
`fetchRemoteImageAsDataUri()` failis `visionBridgeHelpers.ts` – siis saadud andme-URI läbib `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) enne, kui see sisestatakse nägemismudeli päringusse. Ülemõõdulised pildid skaleeritakse alla **2048px pikkusele servale** (vastates OpenAI/Anthropicu juba serveripoolselt rakendatavale suuruse piirangule), mis vähendab üleslaadimise baite/latentsust, muutmata seda, mida nägemismudel näeb. Suuruse muutmine
kasutab `sharp`-i, mis laaditakse dünaamilise impordi kaudu: platvormil, kus selle natiivne binaar ei lae, `normalizeDataUri()` **ei viska kunagi viga** – see langeb tagasi algsete baitide läbipääsule, nii et kirjeldus/base64-teisenduse tee töötab alati edasi. Mittepildilised baidid (toomine, mis ei tagastanud dekodeeritavat pilti) edastatakse samuti puutumata. See normaliseerimine on piiratud piltidega, mida sild toob oma isekõne jaoks – seda ei rakendata kunagi kutsuja toorele läbipääsuandmele, mis on kooskõlas ainult sissevalitud mutatsiooni põhimõttega (Raske Reegel #20).

#### Seadete skeem + migratsioon

Uued `modalityBridge*` võtmed on Zod-valideeritud funktsioonis `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` kolmik ja
`modalityBridgeAudio*` grupp, mida kasutab Audio Bridge. Migratsioon
`141_modality_bridge_settings.sql` kopeerib olemasolevad pärand `visionBridge*` väärtused vastavatele uutele võtmetele (idempotentne, ei kirjuta kunagi üle operaatori määratud `modalityBridge*` väärtust); pärandvõtmed jäävad aktsepteerituks lugemise varuna ühe väljalasketsükli jooksul.

#### Läbipaistvuse päis + statistika

Kirjeldusega muudetud vastused sisaldavad
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(koostatud `buildModalityBridgeHeader()` poolt failis `modalityBridge/bridgeStats.ts`,
tembeldatud `withModalityBridgeHeader()` poolt failis `src/sse/handlers/chatHelpers.ts`).
Ümbersuunatud päringud **ei saa** päist – andmed jäid puutumata ja mudeli vahetus on juba nähtav vastuse keha `model` väljal.

`GET /api/modality-bridge/stats` (halduse autentimine, sama tase kui
`GET /api/settings`) tagastab mälusisesed modaalsusepõhised loendurid
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` `vision`, `audio` ja
`video` jaoks. `averageLatencyMs` kasutab nimetajana `latencySamples`, mitte kõiki katseid;
ajastamata operatsioon ei loo null-millisekundi näidist. `bridged` jääb tagasiühilduvaks
aliaseks edukate teisenduste jaoks; ebaõnnestunud katsed seda ei suurenda.
Loendurid lähtestatakse protsessi taaskäivitamisel disaini järgi
(telemeetria, mitte arvestus).

#### Armatuurlaua konfiguratsioon

Spetsiaalne armatuurlaua leht on
`/dashboard/settings/modality-bridge`. Selle URL-aadressiga `Vision`, `Audio`
ja `Video` vahelehed säilitavad päringuparameetrid, muutes samal ajal `tab` väärtust.
Visioni vaheleht pakub lubamist, režiimi, mudeli valikut (sh automaatset
vaikeseadet), ülesandeteadlikku viipamist, täiustatud ajalõpu/pildi/kirjelduse pikkuse/vahemälu
piiranguid, käitusaja
loendureid ja kaitstud näidispäringut. Audio vaheleht on samuti aktiivne: see pakub
lubamist, ainult STT-mudeli valijat koos automaatse valikuga, ajalõpu/maksimaalse klipi piiranguid, heli
loendureid ja `input_audio` näidistesti. Video vaheleht on funktsionaalne: see teatab
FFmpeg/ffprobe käitusaja olekust – ühest neljast selgest kasutajaliidese olekust (`unknown` ajal, mil
sond on pooleli või ei saanud lõpule viia, `restricted` mitte-tagasisideahelaga
armatuurlaua hostil, kus sond jäetakse kliendipoolselt vahele, `unavailable` pärast sondimist
ja kinnitatud puudumist või `available` koos FFmpeg/ffprobe versioonidega) – säilitab
lubamise/mudeli/kaadri/video/ajalõpu piiranguid, filtreerib mudelivalija nägemisvõimelistele
mudelitele ja pakub videoloendureid.

Endine Vision Bridge kaart AI seadete all on ühilduvuslink
uuele lehele; see ei oma enam vormi teist koopiat. Meediapakkujad
lingivad ka pildist-tekstiks ja kõnest-tekstiks töövoogusid vastavate Modality
Bridge vahelehtedega, eemaldamata olemasolevat kõnest-tekstiks mänguväljakut.

**Iseenda silmuse sissepääsu möödaviik:** kui kirjelduskutse marsruutitakse läbi OmniRoute'i
enda `/v1` isesilmuse (mittestandardne pakkuja mudel), saadab alamtaotlus
`x-omniroute-admission-bypass: internal` ja autentitakse lahendatud
isesilmuse mandaadiga – kohaliku `sk_omniroute` sentinelliga kohalikus režiimis või
operaatori konfigureeritud `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` keskkonnavõtmega (#1350), nii et
`REQUIRE_API_KEY=true` juurutused saavad endiselt kirjelduskutset käivitada. Möödaviik
kehtib ainult nende täpsete mandaatide puhul, nii et välised kliendid ei saa
päist kasutada sissepääsu vahelejätmiseks.

Pärandvaikeseaded asuvad failis `src/shared/constants/visionBridgeDefaults.ts`;
uued režiimi/ülesandeteadlikud/vahemälu vaikeseaded ja seadete lahendaja asuvad failis
`src/shared/constants/modalityBridgeDefaults.ts`. Kaitsepiire pakub
`deps` konstruktori valikut, nii et testid saavad süstida võltsitud `getSettings` ja
`callVisionModel` implementatsioone.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Peatab heli sisaldavad vestluspäringud enne, kui need jõuavad sihtkohta, mis ei
ole teadaolevalt helisisendit aktsepteeriv. See ei suuna vestluspäringut kunagi ümber: heliosad
transkribeeritakse olemasoleva OpenAI-ühilduva mitmeosalise lõpp-punkti kaudu ja valitud
vestlusmudel jätkab teksttranskriptsioonidega.

Voog:

1. Lahenda `supportsAudio` läbi `getResolvedModelCapabilities()`. Selge
   pakkuja-registri metaandmed võidavad, seejärel staatilised mudeli metaandmed, seejärel sünkroonitud
   `modalities_input`. Deklareeritud sisendiloend ilma `audio` on `false`;
   võimaluste tõendid jäävad `null`. Nii `false` kui ka `null` aktiveerivad
   konservatiivse silla, samas kui `true` möödub sellest.
2. Lahenda `modalityBridgeAudio*` seaded ja eralda iga sõnumi splaissitavad tipptaseme
   heliosad jagatud `detectMediaParts()` detektori kaudu. Toetatud
   juhtme kujud on OpenAI `input_audio`, `audio_url` ja
   `source.media_type: "audio/*"`. Pesastatud heli tuvastatakse marsruutimiseks, kuid
   splaissitee seda ei eemalda. Töö on piiratud `modalityBridgeAudioMaxClips`;
   hilisemad osad jäävad puutumata.
3. Järgi konfigureeritud `provider/model` või lase `selectAudioBridgeModel()`
   läbida `AUDIO_TRANSCRIPTION_PROVIDERS` stabiilses kataloogijärjestuses ja valida
   esimene mudel, millel on kasutatav aktiivne pakkuja mandaat.
4. `callAudioTranscription()` teisendab base64/data-URI heli mitmeosaliseks
   `file` või laadib alla kaug `audio_url` ainult avaliku väljamineva
   kaitse kaudu DNS-i kinnitamise ja 25 MB piiranguga. Seejärel POSTib see faili ja valitud
   mudeli kohalikule `/v1/audio/transcriptions` isesilmusele, autentituna
   `resolveSelfLoopBearer()` abil. Olemasolev transkriptsioonitee teostab tavalise
   mandaadi otsingu, jahtumise/määrade piiramise käitlemise ja pakkuja väljasaatmise.
5. Edukad kõned asendavad oma osad `[Audio N]: <transcript>`-iga. Kõned
   käivitatakse `Promise.allSettled`-iga: individuaalne ebaõnnestumine säilitab selle algse
   heliosa (#4012 leping). Kui iga kõne ebaõnnestub ja sihtkoht on tõestatud
   `supportsAudio === false`, muutuvad osad
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 leping).
   Tundmatu sihtkoha (`null`) puhul jääb kõikide ebaõnnestumiste tulemus puutumata. Tõestatud
   ainult tekstiga sihtkoht, millel pole kasutatavat STT mandaati, saab sama selge
   tüve ilma võrgukõnet tegemata.

Edukad transkriptsioonid kasutavad protsessipõhist Modality Bridge LRU/TTL vahemälu.
Võti ühendab heliviite, stabiilse `audio-transcription` operatsiooni
sildi ja valitud STT mudeli; ebaõnnestumisi ei salvestata kunagi vahemällu. Helikatsetused
värskendavad jagatud `bridged`, `cacheHits`, `failures` ja `lastUsedAt` loendureid.
Transformeeritud vastused sisaldavad
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; puutumata
päringud ei saa Audio Bridge segmenti.

Käitusaja seaded on DB-põhised ja Zod-valideeritud:

| Võti                          | Vaikimisi | Vahemik         |
| ----------------------------- | --------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`    | —               |
| `modalityBridgeAudioModel`    | `""`      | Auto või STT ID |
| `modalityBridgeAudioTimeout`  | `60000`   | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`       | 1–10            |

Jagatud vahemälu jääb kontrolli alla `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries` abil.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Peatab tipptasemel videosisu vestluse lõpetamise `messages` ja vastuste API `input` enne sihtmärki, millel puudub teadaolev natiivne videotoetus.
Toetatud kujud on `input_video`, `video_url`, `video_source`, HTTPS URL-id
ja `data:video/*;base64,...` andme-URI-d. Lihtsaid failinimesid tekstis ei käsitleta
videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) haldab päringu läbimist,
võimekuse/poliitika kontrolli, päringupõhist koondamist ja vastuse andmepaketti.
Videopõhine töö – hankimine, kogu tulemuste vahemälu, kaadrijada kirjeldamine
(mis ühendab kõik helistaja deklareeritud helitranskriptsioonid) ja katsepõhised
mõõdikud/katkestamine/puhastamine – on peidetud `processVideoPart` taha
`videoBridgePipeline.ts` moodulis, mida kutsutakse iga videopartii kohta
üks kord `preCall` tsükli sees. See moodul määratleb ka selged pordi piirid
`VideoMediaBrokerPort` (baitide hankimine ja proovitud kaadrite eraldamine),
`VideoAudioTranscriptionPort` (helistaja deklareeritud helitranskriptsiooni
ühendamine proovitud subtiitritega) ja `VideoDrilldownPort` (kaadri süvaanalüüsi
püsivuse piir; pole veel `processVideoPart` külge ühendatud – ainult eraldi
`/api/modality-bridge/video/drilldown` marsruut kirjutab täna süvaanalüüsi
kirjeid).

Avalik `/v1` päringutee ei impordi ega käivita alamprotsessi. Kaugvideod
laaditakse alla 50 MiB piirangu piires; sisemistel base64 videodel on
konservatiivne 36 MiB dekodeeritud videopõhine piirang, et mudeli/sõnumite/raamimise
ümbrik saaks jääda avaliku JSON-päringu vastuvõtupiirangu 50 MiB sisse.
Sisemise pikkuse ja dekodeeritud suuruse hinnangud kontrollitakse enne
mälu eraldamist. HTTPS on nõutav esialgsel kaug-URL-il ja igal ümbersuunamisel,
kasutades olemasolevat ainult avalikku väljaminevat kaitset DNS-i kinnitamisega.
Seejärel läbivad baidid täpse sisemise `POST /api/modality-bridge/video/extract`
vahendaja piiri. See marsruut on nii `LOCAL_ONLY` kui ka `SPAWN_CAPABLE`,
aktsepteerib ainult protsessipõhiselt autentitud, usaldusväärse tagasiside
päringu ja ei aktsepteeri kunagi URL-i, failisüsteemi teed, käivitatavat faili
ega argumentide loendit. API keha suuruse torujuhe ja käitleja inkrementaalne
keha lugeja jõustavad iseseisvalt 50 MiB vahendaja sisendi piirangu. Selle
piiratud järjekord käivitab ühe eraldamise korraga, lubab neli ootel tööd ja
piirab ootel sisendi 100 MiB-ga.

Vahendaja sees loeb `ffprobe` privaatset kohalikku faili; fikseeritud vormingu
lubatud loend välistab esitusloendi ja manifesti vormingud. Lubatud MOV-perekonna
konteinerite puhul jäävad välised MOV-andmete viited vaikimisi keelatuks ja
fikseeritud käsk ei vali neid. Nii `ffprobe` kui ka `ffmpeg` kasutavad ainult
`file`-protokolli valget nimekirja, ühte lõime, fikseeritud argumentide massiive,
ilma kestata ja käivitatavaid faile, mis on lahendatud `PATH`-ist. Lisatud pildi
kaanevood ei ole esitatavad kandidaadid. Kõik esitatavad vood peavad vastama
piirangutele ja eelistatakse selget vaikimisi voogu enne deterministlikku
madalaima indeksi varuvarianti. Videod on piiratud 600 sekundiga, 8192 piksliga
mõõtme kohta ja 33 554 432 lähtepiksliga. FFmpeg võtab proove 1–16 keskmise
JPEG-kaadri kohta, skaleerib pikema serva maksimaalselt 1024 pikslini ilma
väiksemaid sisendeid suurendamata ja ei saa kunagi URL-i. Proovivõtt on vaikimisi
`uniform`. Valikulised `scene_aware` ja eksperimentaalsed `segment_aware`
poliitikad teostavad ühe täiendava fikseeritud FFmpeg-läbipääsu juba valideeritud
kohaliku voo üle, valivad piiratud `showinfo` stseeni ajatemplid ja langevad
deteministlikult samadele ühtsetele keskpunktidele detektori rikke, ajapiirangu,
valesti vormindatud väljundi või tühja kandidaatide hulga korral. Segmenditeadlik
režiim eraldab keskpunkti proovid proportsionaalselt valideeritud stseeni
intervallidega; segmenditeadlikud tõendid ja varuvariandi käitumine on
üksikasjalikult kirjeldatud allpool. Raske 16-kaadri piirang rakendatakse
pärast valikut igas poliitikas. Kui stseeniteadlikul päringul on ainult
ühe kaadri eelarve, kasutab see aktiivse täisvideo või fookusakna ühtset
keskpunkti ja teatab `policyEffective: uniform`: üks valitud stseenikaader
ei saa säilitada mõlemat ajalist otsa. Helistaja võib valikuliselt pakkuda
piiratud fookusakna (`start`/`end` sekundit); piirid on piiratud meedia
kestusega, tagurpidi või piiramatud aknad lükatakse tagasi ja kõik proovivõtu
poliitikad teostatakse ainult normaliseeritud intervalli sees. Tulemuseks
olev aken lisatakse proovivõtu metaandmetesse ja usaldamatusse kirjelduse
eestisse, et allavoolu mudelid saaksid eristada fookustatud väljavõtet
täielikust ajajoonest.

Semantiline subtiitrite fookus on eraldi, selge seade. Vaikimisi `full`
analüüsi režiim säilitab olemasoleva kaadri viipa ja ei edasta kunagi
päringu teksti subtiitrite mudelile. `focused` režiimis loeb sild ainult
viimase mittetühja kasutaja loodud `text`/`input_text` samast vestluse
või vastuste konteinerist, normaliseerib selle NFC-ks, tihendab
juhtelemente ja tühikuid ning piirab selle 500 Unicode'i koodipunktiga.
Tühi tulemus langeb tagasi täpsele `full` viipale. Kasutatav vihje
serialiseeritakse JSON-ina spetsiaalses usaldamatus kasutajakonteksti
plokis ja see võib ainult prioriseerida jälgitavaid detaile; see ei saa
tühistada eraldi hoiatust meedias nähtavate või kuuldavate juhiste
järgimise eest. Tekstiline fookus ei järelda kunagi `start`/`end` ega
muuda ajalist proovivõtjat.

#### FU-07 struktuursete segmentide tõendid

`segment_aware` kasutab ühte piiratud eelanalüüsi läbipääsu juba valideeritud
kohaliku videovoo üle. Fikseeritud filtrijada skaleerib esmalt maksimaalselt
320 pikslit laiaks, tuvastab stseenimuutused ja külmutatud intervallid,
seejärel võtab proove 1 kaader sekundis hägususe, keskmise heleduse ning
ruumilise/ajalise teabe jaoks. Läbipääs on piiratud 600 struktuurse prooviga,
ühe FFmpeg/filtri lõimega, sama `file`-ainult protokolli ja konteineri
lubatud loenditega, 1 MiB protsessi väljundi piiranguga ja maksimaalselt
30 sekundiga vahendaja jagatud katkestamise/tähtaja sees. See ei aktsepteeri
kunagi käsku, filtrit, teed ega URL-i päringust.

Struktuursed väärtused on deterministlikud valimite tõendid, mitte semantiline video mõistmine. Need ei järelda subjekte, tegevusi, pealdisi, kõnet ega kasutaja kavatsust. Stseeni- ja külmutuspiirid moodustavad segmente; külmutuse ulatus, hägusus, säritus, ruumiline detail ja ajaline muutus mõjutavad ainult seda, kuidas olemasolev 1–16 kaadri eelarve jaotatakse. Täielikult külmutatud segment on piiratud ühe kaadriga, samas kui külmutamata segmendid konkureerivad ülejäänud eelarve pärast. Kui piire on rohkem kui kaadreid, säilitatakse ühtlane ajajoone katvus, nii et kiired varajased lõiked ei saa varjata pikka järelsegmenti. Stseenipiirid külmutuspiiri 1-sekundilise analüüsi resolutsiooni piires ühendatakse.

Puuduvad filtrid, vigased/tühjad tõendid, detektori viga või piiratud eelanalüüsi ajalõpp avavad täpse ühtlase keskpunkti poliitika. Kutsuja katkestus või vahendaja tähtaeg ei avane: see lõpetab käimasoleva alamprotsessi, takistab hilisemat kaadrite eraldamist ja privaatne ajutine puu eemaldatakse `finally` plokis.

`scripts/perf/video-bridge-fu07-eval.ts` genereerib deterministlikke reaalseid FFmpeg-i seadistusi duplikaatide eemaldamise järgse pealdiste kutsete säästu, tiheda liikumise eelarve jaotuse, hägususe/särituse/SI-TI tõendite, pika sabaga kiirete lõigete ja järkjärgulise hajumise valepositiivsete tulemuste jaoks. See salvestab eelanalüüsi tegeliku aja ja, kui `/usr/bin/time` on saadaval, lapseprotsessi CPU ja tipp-RSS-i. Selle kvaliteedikontrollid on ainult struktuursed oraaklid. Reaalse pealdiste mudeli kvaliteet jääb `HOLD` olekusse, sest sellel rakendusel puudub volitatud lõpp-punkt või külmutatud hindaja. Rahaline kokkuhoid jääb samuti `HOLD` olekusse, välja arvatud juhul, kui `--caption-cost-per-call-usd` annab selgesõnalise positiivse kõne kohta käiva hinnangu; skript ei fabritseeri kunagi kumbagi tulemust.

Iga kaader on piiratud 4 MiB-ga, kõik toorkaadrid kokku 23 MiB-ga ja serialiseeritud vahendaja vastus 32 MiB-ga. Privaatne ajutine kataloog eemaldatakse `finally` plokis. OmniRoute ei sisalda FFmpeg-i ega aktsepteeri kohandatud käivitatava faili teed. Enne pealdistamist rakendab sild konservatiivset visuaalset duplikaatide eemaldamise läbimist: iga JPEG vähendatakse 16×16 halltoonides puhvriks ja seda võrreldakse ainult viimati säilitatud kaadriga. Kui nõutav pealdiste eelarve on üle ühe kaadri, pakub eraldamine piiratud kandidaatide kogumit, mis on kuni kaks korda suurem sellest eelarvest ja mitte kunagi rohkem kui 16 kaadrit. Nõutav piirang rakendatakse alles pärast duplikaatide eemaldamist, kusjuures esimene ja viimane valitud kandidaat säilitatakse lõpliku hõrendamise käigus, kui eelarve on vähemalt kaks. Versioonitud `grayscale-16x16-mean-cells-v2` poliitika kasutab suuremat keskmise luma delta ja pisipildi elementide suhte vahel, mille normaliseeritud delta on vähemalt 0,05. Duplikaadi lävi on konstant 0,04, mis on valitud ennustatavuse, mitte käitusaja seadena avaldamise pärast. See sekundaarne suure kontrastsusega signaal säilitab väikese liikumise ja nähtava teksti muutused, mida ainult keskmise võrdlus võib varjata. Võrdleja või dekoodri vead avanevad ja säilitavad katvuse. Väljundi metaandmed eraldavad eraldatud kandidaadid, edukalt kasutatud kaadrid ja visuaalselt eemaldatud duplikaadid.

Selgesõnaliselt märgistatud videopartii võib taotleda ajatempliga kontaktlehte. Sild loob maksimaalselt 4-veerulise, 16-kaadrilise JPEG-võrgu. Iga 512-piksliline lahter põletab oma allika ajatempli suure kontrastsusega alumisse ribasse, samal ajal kui samad ajatemplid jäävad tekstilisse metaandmetesse allavoolu seostamiseks ja auditeerimiseks. Täielik JPEG jääb piiratuks 32 MiB-ga. Kui `sharp` ei suuda võrku dekodeerida või koostada, langeb sild tagasi üksikutele JPEG-kaadritele; kliendi katkestus levib endiselt läbi lehe toimingu.

Edendamise tõendid on tahtlikult eraldatud sünteetilisest kompositsiooni mikrovõrdlustest. `scripts/perf/video-bridge-contact-sheet-eval.ts` defineerib skeemi-versioonitud A/B rakenduse reaalsete OpenAI-ga ühilduvate nägemismudelite jaoks. See mõõdab pakkuja teatatud tokeneid, otsast-lõpuni tegelikku latentsust (kaasa arvatud lehe koostamine), mudeli kutsete arvu ja manifestis määratletud faktide säilitamist. Toormudeli vastuseid aruandesse ei kirjutata; säilitatakse ainult SHA-256 kokkuvõtted ja vastavad faktide ID-d. Rakendus ei tee võrgu- ega tasulisi mudelikõnesid, välja arvatud juhul, kui `--execute-real` on edastatud ja `--model`, `OMNIROUTE_BASE_URL` ning `OMNIROUTE_API_KEY` on konfigureeritud. Ilma selle selgesõnalise reaalse käivituseta jääb selle masinloetav otsus `HOLD` olekusse; sünteetilised andmekogumi/kutsete arvu mõõtmised üksi ei ole edendamise tõendid.

Kutsujad võivad lisada valikulise `transcript.cues` massiivi toetatud videopartiile, kui neil on juba joondatud tekst. Iga vihje peab sisaldama `text`-i, piiratud `start`/`end` intervalli uuritud kestuse sees ja lubatud `source`-i (`client`, `embedded` või `audio-bridge`); `confidence` vaikimisi on `1` ja peab jääma vahemikku `0` kuni `1`. Täpsed duplikaatvihjed tihendatakse. OmniRoute ei alusta kunagi transkriptsiooni sellest metaandmetest: valideeritud vihjed kopeeritakse kirjeldatud tulemusse koos allika, usaldusväärsuse ja intervalliga ning esitatakse usaldamatute vaatlustena kaadrite pealdiste kõrval. Kehtetu, vahemikust väljas või päritoluta tekst lükatakse tagasi, selle asemel et seda pealdiste voogu segada. Väli `source` on praegu kutsuja deklareeritud, mitte serveri poolt kontrollitud: OmniRoute tagab, et väärtus on üks kolmest lubatud stringist, kuid ei kinnita veel krüptograafiliselt, et `embedded` või `audio-bridge` silt tegelikult pärines serveri omanduses olevast eraldamisest. Käsitlege `source`-i usaldamatuna vihjena, kuni see kinnitus saabub; ärge ehitage sellele autoriseerimisotsuseid.

Kogenud helistaja võib pakkuda juba autoriseeritud `audioTranscript` rada sama video jaoks. Fusiõmblus käivitab visuaalsed ja helivaatlused ühe tähtaja ja katkestussignaali all, järjestades need ühisele ajajoonele, ühendab täpsed duplikaadid ja annab osalise tulemuse, kui ainult üks pool õnnestub. Kehtetu `audioTranscript` degradeerub sellele osalisele tulemusele – visuaalne kirjeldus säilitatakse ja heliharu salvestab puhastatud veakoodi – selle asemel, et kogu video ebaõnnestuks. Harupõhine kättesaadavus, osaline lipp ja puhastatud veakoodid säilitatakse kirjeldatud tulemuses, piirdeaia metaandmetes (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), tulemuste vahemälu metaandmetes ja silla fusiooniloendurites. Vaikimisi Video Bridge'i tee ei kutsu esile kõnet tekstiks ega laadi alla teist meediakoopiat; ilma selle selgesõnalise rajata jääb see ainult videoks.

**Transkriptsiooni säilitamine (#12150 P1).** See rakendub automaatselt alati, kui Video Bridge (ise valikuline) renderdab transkriptsiooni vihje – eraldi säilituslippu ei ole. Kui päring renderdab mis tahes transkriptsiooni vihje (helistaja deklareeritud `transcript` või ühendatud `audioTranscript`), märgib piirdeaed selle `videoBridgeObserved` ja loob video kirjelduse redigeeritud varju – identse renderduse, milles iga vihje vaba teksti sisu asendatakse `[redacted-video-transcript]`, mis on loodud struktureeritud vihje välja asendamisega enne stringi kokkupanekut (mitte kunagi lamendatud teksti parsimisega, nii et ükski vihje sisu – vaenulik või tavaline, sealhulgas `]` sisaldavad kehad, nagu `[inaudible]`/`[music]` – ei saa ellu jääda). Püsiv kõnelogi päringu keha vahetab iga videost tuletatud tekstiosa selle redigeeritud varju vastu, mis on sobitatud sisu võrdsuse alusel; `fullText` ankur loetakse uuesti lõpetatud eelkõne piirdeaia andmekogumist, nii et vaste õnnestub ka pärast hilisemaid ahela piirdeaedu (PII ja mandaatide maskeerijad, prioriteedid 10/95) kirjelduse teksti kohapeal ümber kirjutamist ja pärast süsteemi viipa/üleandmise/mälu süstimise sõnumimassiivi ümberkujundamist. Mudelile ülesvoolu saadetud keha jääb muutmata. Vaadeldud päring ei täida ka püsivat mälu (nii päringust kui ka vastusest tuletatud ekstraheerimine jäetakse vahele), nii et mudeli enda vastus ei saa transkriptsiooni teksti mällu kordada.

Täiendavad säilitatud koopiad kasutavad sama vaadeldud päringu signaali. Toores eel-piirdeaia kliendipäringu hetktõmmis, mälus ootel olev päring ja varajane tagasilükatud päringu logi asendavad struktuurselt transkriptsiooni väljad videoosades; torujuhtme etappide ja konteksti üleandmise poolt sünteesitud stringi viibad redigeeritakse püsiva päringu keha sihtkohas. Püsiv `video_content_removed` marker paneb `previous_response_id` jätkamise ebaõnnestuma suletud olekus, selle asemel et taastada teksti, mis oli tahtlikult kõrvaldatud. Kui vaadeldud päring kaotab oma osapõhise redigeerimisvarju enne logimist või isegi üks mitmest videovarjust ei sobi pärast hilisemaid päringu mutatsioone, jäetakse säilitatud päringu keha täielikult välja, selle asemel et säilitada osaliselt redigeeritud transkriptsioon.

Vaadeldud päringu puhul võib mudeli vastus tsiteerida mis tahes osa transkriptsioonist ilma struktureeritud vihje piirita. Selle püsiv kõnelogi `responseBody` asendatakse seetõttu väljajätmise markeriga; üksikasjalik torujuhtme artefakt (mis võib sisaldada ülesvoolu/kliendi kehasid ja voo tükke) ei säilitata. Semantilised, idempotentsuse ja põhjenduste taasesituse vahemälud mööduvad selle päringu lugemistest ja kirjutamistest. Pakkuja päring ja kliendile nähtav vastus jäävad muutmata. Varajased elushoidmise baidid tühjendatakse ajutisest puhvrist, kui üksikasjalik artefakt jäetakse välja. Kiro valesti vormistatud EventStreami hoiatus teatab ainult andmekogumi baitide arvu, mitte kunagi selle sisu ega JSON-parseri toorest viga. See ei väida, et iga mitteseotud pakkuja/plugina diagnostika oleks auditeeritud; laiemat säilitatud sihtkoha pühkimist jälgitakse #11658.

Sisemine `/api/modality-bridge/video/drilldown` elutsükkel on eraldi, tagasiside/tokeniga autentitud vahemälu alus. Iga toiming nõuab ka kanoonilist läbipaistvat põhi-ID-d. Enne tootmiskõneleja lubamist peab see tuletama selle ID autentitud rentnikust ja ei tohi kunagi edastada kliendi valitud väärtust. Vahemälu võtmed seovad selle põhi-ID kanooniliste seansi- ja videoviite-ID-dega, salvestavad ainult nende SHA-256-st tuletatud võtmed ja piiravad nii lugemisi kui ka kustutamist sama põhi-ID-ga. Vahemälu salvestab maksimaalselt 16 tuletatud JPEG-kaadrit kirje kohta, aegub need kümne minuti pärast ja toetab piiratud `start`/`end` lugemisi või selgesõnalist seansi kustutamist.

Iga põhi-ID on piiratud 16 kirje ja 64 MiB kanoonilise JPEG-andmetega. Need piirangud on sõltumatud globaalsest 64-kirje/256 MiB piirist: põhi-ID kvoodisurve eemaldab ainult selle põhi-ID kõige vähem kasutatud kirjed enne globaalse LRU eemaldamise kaalumist. Aegunud kirjed pühitakse nii põhi-ID kui ka globaalsest arvestusest vahemälu tegevuse korral, samas kui tühistamine ja valideerimise ebaõnnestumine ei kinnita osalist asendamist.

Vahemälu lükkab tagasi mittekannoonilise Base64, liigse täite, mitte-JPEG meedia, valesti vormistatud või kärbitud JPEG-d ja JPEG-d, mis tekitavad hoiatuse piiratud täispildi `sharp` dekodeerimise ajal. See kodeerib iga aktsepteeritud pildi uuesti kanooniliseks JPEG-ks, tuletab laiuse ja kõrguse dekodeeritud baitidest, selle asemel et usaldada helistaja välju, ja viskab ära kõik järelpolüglotibaadid, selle asemel et neid säilitada. Ainult piiratud kanooniline tihendatud puhver arvestatakse mõlema kvoodi alla. JSON-i traadi piir sisaldab Base64 üldkulusid 32 MiB dekodeeritud sisendi piiri jaoks. Iga salvestatud tuletis salvestab oma valideeritud JPEG-vormingu/eraldusvõime, proovivõtupoliitika, tuletise versiooni, loomisaja, serveri arvutatud sisu räsi ja räsi vanemviite pluss usaldusväärse helistaja vanema sisu räsi. Tühistamist kontrollitakse asünkroonsete dekodeerimise/räsimise faaside vahel enne aatomilist vahemälu kinnitamist.

See trantšš ei ühenda veel tootmisprodukti marsruudiga ega paku
mitme eraldusvõimega variandi valikut. Läbipaistev Video Bridge'i päringu
tee ei too seega kaasa lisatööd, samas kui üürnikuga seotud põhiosa tuletamine ja
täielik FU-08 mitme eraldusvõimega elutsükkel jäävad selgesõnaliseks järeltegevuseks,
mitte ei ole dokumenteeritud kui täielik käitumine.

Kaadrid on järjestikku pealkirjastatud konfigureeritud videomudeliga. Tühi
video alistamine pärib Visioni seade; kui mõlemad on tühjad, valib Visioni
automaatne marsruuter efektiivse nägemisvõimelise mudeli. Edukad pealkirjad
asendavad algse osa stabiilse `[Video description:` eesliitega, mis
märgib teksti ka usaldamatuks meediast tuletatud vaatluseks ja ütleb allavoolu
mudelitele, et nad ei järgiks meedias leiduvaid juhiseid. Kaadri-pealkirja vahemälu võtmed
sisaldavad JPEG-baite, viipa, ajatemplit ja efektiivset mudelit;
vahemällu salvestatakse ainult edukad pealkirjad. Vahemälu kirjed säilitavad tegeliku eduka
tootjamudeli, sealhulgas varumudeli; sild teatab `mixed`, kui erinevad kaadrid
on toodetud erinevate mudelite poolt. Vahemälu tabamus taaskasutab selle tootja identiteedi
selle asemel, et seda ümber märgistada kui taotletud marsruutimisplaani. Kogu video tulemuste
vahemälu on võtmetatud iga sisendi järgi, mis muudab väljundit – viip, efektiivne
mudel, proovivõtupoliitika, kaadrite arv, semantilise analüüsi režiim,
normaliseeritud fookuse vihje SHA-256 sõrmejälg, fookuse aken, `transcript`,
`audioTranscript` ja kontaktlehe lipp – nii et mis tahes nende dimensioonide muutmine
on vahemälu möödalaskmine, mitte kunagi aegunud taaskasutus. Visuaalse dedup-poliitika
versioon, lävi ja piiratud kandidaatkaadrite arv on samuti tulemuste vahemälu
võtmes ja metaandmetes selgesõnalised; poliitika muutus ei saa seega taaskasutada
aegunud kogu video kirjeldust. Tulemuste vahemälu v4 metaandmed säilitavad režiimi ja
sõrmejälje, mitte kunagi toore kasutaja ülesande. Piirde metaandmed teatavad nii
taotletud kui ka efektiivsetest analüüsirežiimidest; taotletud `focused` režiim ilma
kasutatava kasutajatekstita teatatakse efektiivselt `full` režiimina.

Piire eraldab kõik toetatud videoosad, kuid kirjeldab mitte rohkem kui
`modalityBridgeVideoMaxVideos`. Sihtmärgi puhul, mis on tõestatult
`supportsVideo === false`, muutuvad ebaõnnestunud ja üle piiri videod selgesõnalisteks
ohututeks tekstmarkeriteks, nii et toorvideot ei jää alles. Kui võimekus on teadmata,
jäävad need osad puutumata. Sihtmärgid, millel on `supportsVideo === true`, mööduvad sillast.
Kliendi päringu katkestussignaal levib allalaadimise, maakleri järjekorra,
alamprotsesside ja pealkirja kutsete kaudu; katkestused peatuvad videote vahel ja ei
ebaõnnestu kunagi avatult toormeediasse.

Käitusaja seaded on DB-põhised ja Zod-valideeritud:

| Võti                                | Vaikimisi   | Vahemik / käitumine                                                                                   |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Valikuline käitusaeg, opt-in                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` säilitab üldised pealkirjad; `focused` kasutab piiratud, usaldamatut uusimat kasutajakonteksti |
| `modalityBridgeVideoModel`          | `""`        | Pärib Vision Bridge'i mudeli                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` või proportsionaalne `segment_aware`; detektori rike langeb tagasi `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Pärandatud püsivad video ajalõpu väärtused üle 120 sekundi piiratakse
maakleri tähtajaga; uued seadete kirjutamised üle selle piiri lükatakse tagasi.
`GET /api/modality-bridge/video/runtime` nõuab usaldusväärset tembeldatud
tagasiside lokaalsust enne autentimist või käitusaja sondeerimist, seejärel nõuab
haldusautentimist. See tagastab ainult `available`, puhastatud FFmpeg/ffprobe versioonid
ja fikseeritud põhjuse, kui käitusaeg pole saadaval. Sisemine eraldamise lõpp-punkt
ei ole avalik üleslaadimise API: järjekorra küllastus tagastab `503` pluss `Retry-After`,
helistaja lahtiühendamine tagastab `499` ja fikseeritud maakleri tähtaeg tagastab `504`.
Konverteeritud vastused lisavad `video->text;model=<visionModel>;parts=<videos>`
kesksele `x-omniroute-modality-bridge` päisele, eemaldamata Visioni või Audio segmente.

### PII Masker (`piiMasker.ts`)

Töötab **mõlemal** etapil.

- **`preCall`** kloonib andmepaketi, läbib `system`, `messages`, `input` ja
  `prompt` (sealhulgas tavalised stringi elemendid) ning rakendab `processPII()`
  (failist `@/shared/utils/inputSanitizer`) stringi `content`/`text` väljadele. Kui
  `PII_REDACTION_ENABLED=true`, redigeeritakse tuvastatud PII väljaminevas
  andmepaketis. See on sõltumatu `INPUT_SANITIZER_MODE`-st (mis kontrollib ainult
  viipa-sisestamise poliitikat). Kui redigeerimine on välja lülitatud, salvestab
  kõne tuvastuste arvu sisu ümber kirjutamata.
- **`postCall`** kloonib sügavalt vastuse, käivitab `sanitizePIIResponse()` pluss
  Responses-API-kujulise maskeri (`maskResponsesOutput` – hõlmab
  `output_text` ja `output[].content[].text`). Kui toimub redigeerimine,
  asendab muudetud vastus algse.

Piire ei blokeeri kunagi; see ainult annoteerib (`meta.detections`,
`meta.redacted`) või kirjutab ümber.

### Viipa sisestamine (`promptInjection.ts`)

Tuvastab vaenulikud struktuurid kasutaja sisestatud sisus ja jõustab
konfigureeritud poliitika. Käitumist juhivad keskkonnamuutujad ja konstruktori
valikud:

| Seade           | Keskkonnamuutuja                                                                                     | Vaikimisi | Mõju                                                                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lubatud         | `INPUT_SANITIZER_ENABLED`                                                                            | `true`    | Kui `false`, lühistab kaitsepiire.                                                                                                                                                                           |
| Režiim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`    | Süstimise poliitika: `block`, `warn` või `log`. (`redact` on aktsepteeritud tagasiühilduvuse huvides, kuid **ei** eemalda süstimisteksti; PII ümberkirjutamise taotlust kontrollib `PII_REDACTION_ENABLED`.) |
| Blokeerimislävi | `blockThreshold` valik / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Blokeerimiseks vajalik minimaalne tõsidus. Keskmine on vaikimisi ainult jälgitav.                                                                                                                            |

**Režiimi eelisjärjekord** (`getMode`): kutsuja `options.mode` →
`INJECTION_GUARD_MODE` **andmebaasi funktsioonilipu ülekirjutamine** (Armatuurlaud → Seaded →
Funktsioonilipud) → `INJECTION_GUARD_MODE` keskkonnamuutuja → `INPUT_SANITIZER_MODE` keskkonnamuutuja →
`warn`. Seega armatuurlaua ülekirjutamine võidab keskkonnamuutujate üle, nii et funktsioonilippude
kasutajaliides kontrollib töötavat kaitset reaalajas (ilma taaskäivitamiseta). Andmebaasi lugemine on
veakindel: kui see annab vea, langeb kaitse tagasi keskkonnapõhisele käitumisele ja kui
ülekirjutamist pole määratud, on käitumine identne ainult keskkonnapõhise lahendusega.

Tuvastusallikad:

1.  `sanitizeRequest()` failist `@/shared/utils/inputSanitizer` (jagatud detektorite komplekt, mida
    kasutatakse mujal töövoos).
2.  Sisseehitatud `DEFAULT_GUARD_PATTERNS` (praegu `system_override_inline` ja
    `markdown_system_block`, mõlemad `high` tõsidusega).
3.  Valikulised `customPatterns`, mis edastatakse konstruktori valikute kaudu (stringid, regulaaravaldised
    või `{ name, pattern, severity }` kirjed).

Kui `mode === "block"` **ja** vähemalt üks tuvastus vastab tõsiduslävele, tagastab `preCall`
`{ block: true, message: "Request rejected: suspicious content detected" }`. Režiimides `warn`/`log`
logib kaitsepiire, kuid lubab kutse. Jagatud abifunktsioon `evaluatePromptInjection()` on samuti
eksporditud kutsujatele, kes peavad viipasid hindama ilma registri kaudu minemata.

**Skaneerimispiir (v3.8.20):** detektor kontrollib ainult ühendatud viipateksti **esimest 16 KB** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failis
`src/shared/utils/inputSanitizer.ts`. Nii `detectInjection()` kui ka `evaluatePromptInjection()`
`slice(0, MAX_INJECTION_SCAN_BYTES)` enne mustrikorduse käivitamist. Süstimisdirektiivid asuvad
sisendi ülemises osas, seega piirab see regulaaravaldiste CPU/GC kasutust sadade KB suuruste
andmemahtude korral, nõrgestamata tuvastust (vt #3932, #4041).

### Volituste maskeerija (`credentialMasker.ts`)

Töötab **mõlemas** etapis, vaikimisi ahela viimasena (prioriteet `95`). Redigeerib tuntud API-võtme /
salajase märgi mustreid väljaminevast andmemahust (sõnumi sisu, tööriistakutse argumendid, tööriista
tulemused) **ja** pakkuja vastusest, nii et viipasse kleebitud (või tööriista tulemusena tagasi
kajastatud) volitust ei lekitata ülesvoolu pakkujale ega tagasi kliendile.

- **Ainult sisse lülitatav**, sama konventsioon nagu PII redigeerimisel (Raske reegel #20-lähedane):
  keelatud, välja arvatud juhul, kui `settings.credentialRedactionEnabled === true` **või**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kui see on välja lülitatud, on kaitsepiire tegevusetu – see
  ei blokeeri ega kirjuta kunagi ümber.
- `redactCredentials()` läbib kogu andmemahu/vastuse puu (`walkValue()`, prototüübi-saastekindel,
  tsüklikindel `WeakSet` kaudu) ja asendab vasted `[REDACTED:<type>]` kohatäitega, kloonides ainult
  need harud, mis tegelikult muutusid.
- `CREDENTIAL_PATTERNS` hõlmab LLM-i pakkuja võtmeid (OpenAI, OpenAI-proj, Anthropic, Google,
  Hugging Face, Replicate), VCS/SaaS-märke (GitHub, Slack, Linear, Notion, npm, Postman, Discord),
  maksevõtmeid (Stripe, Square), pilvevõtmeid (AWS-i pääsuvõti, Twilio, SendGrid, Mailgun),
  privaatvõtmeid / JWT-sid, volitusi sisaldavaid ühendusstringe (`mongodb://user:pass@...` jne) ja
  üldist `Authorization`/`x-api-key`/`api-key`/`apikey` päise-väärtuse mustrit. Päisekujulised
  võtmed (`authorization`, `x-api-key`, `api-key`, `apikey`) redigeeritakse struktuurselt (ainult
  väärtus, skeemi eesliide nagu `Bearer `/`Basic ` säilitatakse), mitte üldise
  tekstiregulaaravaldisega.
- Kaitsepiire ei blokeeri kunagi; see ainult kirjutab ümber (`modifiedPayload` /
  `modifiedResponse`) ja annoteerib (`meta.credentialsRedacted`, `meta.count`).

Regressioonikaitse: `tests/unit/credential-masker-guardrail.test.ts`.

## Baasleping (`base.ts`)

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
  block?: boolean; // true katkestab ahela kohe
  message?: string; // kuvatakse blokeerimisel
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // tagastatakse preCall poolt päringu ümberkirjutamiseks
  modifiedResponse?: TValue; // tagastatakse postCall poolt vastuse ümberkirjutamiseks
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

Kaitsepiire annab „muudatus puudub” märku, tagastades kas `void`, `{}` või
`{ block: false }`. Väärtuse `modifiedPayload`/`modifiedResponse` tagastamine asendab
ahelas allavoolu kaitsepiiretele edastatava väärtuse.
`signal?: AbortSignal` edastab kutsuja elutsükli kaitsepiiretesse. Päringu katkestamine on tahtlik tõrke korral jätkamise erand: meediasillad peatavad töö ja puhastavad ressursid, taastamata töötlemata meediat sihtkohale, mis teadaolevalt seda ei toeta.

## Register (`registry.ts`)

Üksikeksemplar `guardrailRegistry` võimaldab järgmist:

- `register(guardrail)` — lisab kaitsepiirde (või asendab selle normaliseeritud nime alusel) ja
  sordib uuesti kasvava `priority` järgi.
- `clear()` / `list()` — haldusabimeetodid.
- `runPreCallHooks(payload, context)` — läbib aktiivsed kaitsepiirded, edastab
  lasti läbi `modifiedPayload` ja peatub esimese `block: true` korral.
- `runPostCallHooks(response, context)` — sama voog vastuse poolel.
- `resetGuardrailsForTests({ registerDefaults })` — tühjendab oleku ja soovi korral
  registreerib vaikeseaded uuesti, et tagada testide puhas isoleeritus.

Mõlemad käitajad tagastavad `{ blocked, payload|response, results, guardrail?, message? }`,
kus `results` on kirjete `GuardrailExecutionResult` massiiv, mis sisaldab
iga kaitsepiirde välju `blocked`, `skipped`, `modified`, `error` ja `meta`,
mis on kasulikud jälitamiseks.

### Kaitsepiirete keelamine päringupõhiselt

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` koondab
duplikaatideta loendi kaitsepiirete nimedest, mis tuleb praeguse
päringu puhul vahele jätta. Allikad (kõik valikulised, kõik ühendatakse):

- `apiKeyInfo.disabledGuardrails`
- Päringu keha `disabledGuardrails` (tipptasemel)
- Päringu keha `metadata.disabledGuardrails`
- Päis `x-omniroute-disabled-guardrails` (või pärandvormingus
  `x-disabled-guardrails`)

Väärtused võivad olla stringide massiivid või komadega eraldatud string; nimed
normaliseeritakse väiketähtedega kebab-kirjapilti (`pii_masker` → `pii-masker`). Tulemus
edastatakse registrile `context.disabledGuardrails` kaudu, mis jätab
sobivad kaitsepiirded vahele (`skipped: true` väljal `results`).

## Käivitusjärjekord

Iga päringu puhul, mis liigub läbi `src/sse/handlers/chat.ts` ja
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` koostab API võtme, päringu keha ja päiste
   põhjal vahelejäetavate kaitsepiirete loendi.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` käivitab kaitsepiirded prioriteedi
   kasvavas järjekorras:
   - Keelatud kaitsepiirded märgitakse olekuga `skipped`.
   - Iga kaitsepiirde `preCall` võib `modifiedPayload` kaudu andmekoormuse ümber kirjutada.
   - Esimene `block: true` katkestab ahela ja töötleja tagastab
     kaitsepiirde tagasilükkamisvastuse.
3. (Võimalikult ümber kirjutatud) andmekoormus liigub kombineeritud marsruutimise ja
   ülesvoolu saatmise etappi.
4. Pärast vastuse koostamist käivitab `guardrailRegistry.runPostCallHooks(...)`
   vastuse jaoks sama ahela. Siinne `block: true` kõrvaldab ülesvoolu
   vastuse.

Erindi visanud kaitsepiirded registreeritakse kujul `error: <message>` ja logitakse
`logger.warn` kaudu, kuid ahela täitmine jätkub — see on kavandatud tõrke korral lubama.

## Konfiguratsioon

Sisseehitatud kaitsepiirete loetavad keskkonnamuutujad:

| Muutuja                               | Kasutaja                 | Mõju                                                                                                    |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Tuvastamise täielikuks keelamiseks määrake väärtuseks `false`.                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Süstimise poliitika: `warn`, `block` või `log`. Pärandväärtus `redact` ei kirjuta süstimisteksti ümber. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Süstimiskaitse režiim; ühtlasi DB funktsioonilipp, mis **alistab** keskkonnamuutujad (DB > ENV).        |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | Minimaalne raskusaste, mille `MODE=block` tagasi lükkab: `high` (vaikimisi), `medium` või `low`.        |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | Muutuja `INPUT_SANITIZER_BLOCK_THRESHOLD` pärandalias.                                                  |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | Kui väärtus on `true`, redigeeritakse päringu isikuandmed (süstimisrežiimist sõltumatult).              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (allavoolu) | Juhib vastusepoolse maskeri käitumist.                                                                  |

Modality Bridge'i kaitsepiirded loevad käitusaegset konfiguratsiooni DB-põhisest
sätete hoidlast (`getSettings()`), mitte keskkonnamuutujatest. Visioni peamised võtmed on
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ja
`modalityBridgeCacheMaxEntries`. Pärandvõtmeid
`visionBridge*` aktsepteeritakse ainult dokumenteeritud ühe tsükli pikkuse lugemise
varuvariandina; juhtpaneel kirjutab peamistesse võtmetesse. Vaikeväärtused ja varuvariandi
lahendaja asuvad failis `src/shared/constants/modalityBridgeDefaults.ts`, pärand-
konstandid on säilitatud failis `src/shared/constants/visionBridgeDefaults.ts`.

Audio kasutab võtmeid `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ja `modalityBridgeAudioMaxClips` ning lisaks jagatud
`modalityBridgeCache*` sätteid. Audiol puudub pärandvõtmete varuvariant, sest need
võtmed võeti kasutusele koos Modality Bridge'i skeemiga.

Video kasutab võtmeid `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ja
`modalityBridgeVideoTimeout` ning lisaks jagatud `modalityBridgeCache*` sätteid.
See on vaikimisi keelatud, sest FFmpeg/ffprobe on valikulised käituskeskkonna
sõltuvused ning kaadrite kirjeldamine lisab viivitust ja mudeli kasutamise kulu.

## Kohandatud kaitsepiirded

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

Sammud:

1. Looge `src/lib/guardrails/myGuardrail.ts`, mis laiendab klassi `BaseGuardrail`.
2. Rakendage `preCall` ja/või `postCall`.
3. Registreerige kas importimise ajal (lisage funktsioonist `registerDefaultGuardrails`) või
   kutsuge käitusajal välja `guardrailRegistry.register(...)` — register asendab
   kõik varasemad sama normaliseeritud nimega kaitsepiirded.
4. Lisage testid kataloogi `tests/unit/` (olemasolevad näited:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testimine

Kasutage testide vahel funktsiooni `resetGuardrailsForTests()`, et alustada teadaolevast olekust.
Tühja registriga alustamiseks edastage `{ registerDefaults: false }` ja
registreerige ainult testitavad kaitsepiirded. Vision Bridge toetab sõltuvuste
sisestamist (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge pakub
samaväärseid liideseid seadete, võimekuste, STT-mudeli valimise, mandaatide
kontrollimise ja transkribeerimise jaoks. Seega saavad testid kontrollida mõlemat
voogu ilma andmebaasi- või võrgujuurdepääsuta.

## Vaadake ka

- `src/lib/guardrails/` — teostus
- `src/shared/utils/inputSanitizer.ts` — ühine tuvastaja, millel põhinevad
  promptisüsti tuvastamine ja isikuandmete maskeerimine
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge'i vaikeväärtused ja
  sunnitud sillaga mudelite loend
- `src/shared/constants/modalityBridgeDefaults.ts` — Visioni/Audio ühised käitusaja vaikeväärtused
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonaalne kiht (kaitselüliti, ooteajad)
- `docs/reference/ENVIRONMENT.md` — keskkonnamuutujate täielik teatmik

## Süstikaitse marsruutide katvus ja red-team-testimine (8. etapp · plokk D)

Süstikaitse (`createInjectionGuard` / `withInjectionGuard`) hõlmab kõiki marsruute,
mis võtavad vastu kasutaja prompte. See järgib muutujat `INJECTION_GUARD_MODE` (vaikimisi `warn` = ainult logimine;
`block` = tagastab HTTP 400 `SECURITY_001`).

| Tüüp               | Marsruudid                                                                                                                                           | Vaikerežiim |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Tekst (olemasolev) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn        |
| Genereeriv         | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn        |
| Andmed             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn        |

Teksti eraldamine (`extractMessageContents`) hõlmab välju `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team-testimine (igal ööl, `nightly-llm-security.yml`):** promptfoo kontrollib, et iga marsruut blokeeriks
OWASP-LLM-i korpuse režiimis `INJECTION_GUARD_MODE=block`; garak käitab sonde (jäetakse saladuse puudumisel vahele).
`moderations` on järjepidevuse huvides kaasatud — plokirežiimi operaatorid saavad selle funktsiooni
`resolveDisabledGuardrails` kaudu erandiks määrata.

Igaöisel töövoolel (`.github/workflows/nightly-llm-security.yml`, cron + käsitsi
käivitamine) on kaks tööd:

- **`promptfoo-guard` (blokeeriv)** — käitab käsku `promptfoo eval -c promptfooconfig.yaml`
  režiimiga `INJECTION_GUARD_MODE=block`. Iga ründejuhtum (nt „ignoreeri kõiki
  varasemaid juhiseid…“, DAN-stiilis turvapiirangutest möödahiilimised) kontrollib, et vastus sisaldaks
  `error.code === "SECURITY_001"`, st et kaitse lükkas päringu tegelikult tagasi.
- **`garak` (nõuandev)** — käitab garakit võtmega `--probes promptinject,dan,leakreplay`
  kohaliku OmniRoute'i eksemplari (`http://localhost:20128/v1`) suhtes. Käivitamine sõltub
  teenusepakkuja saladusest (`PROMPTFOO_PROVIDER_KEY`); selle puudumisel jäetakse töö korrektselt vahele ja sellele on lisatud
  `|| true`, mistõttu esitatakse aruanne ilma CI-d nurjamata.

Kaitse abifunktsiooni (`createInjectionGuard` / `withInjectionGuard`)
katvus hõlmab kõiki prompte kandvaid `/v1` marsruute; prompti tekst võetakse väljadest
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` funktsiooniga
`extractMessageContents()` failis `src/shared/utils/inputSanitizer.ts`.
