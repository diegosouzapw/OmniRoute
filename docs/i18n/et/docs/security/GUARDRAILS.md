# Guardrails (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

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

Register laadib importimisel prioriteetsuse järjekorras automaatselt kuus kaitsepiiret
(vt `registry.ts` → `registerDefaultGuardrails()`):

| Prioriteet | Nimi                | Etapp/etapid   | Fail                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Väiksema prioriteedinumbriga kaitsepiirded käivitatakse **esimesena**.

### Vision Bridge (`visionBridge.ts`) — modaalsussild PR-1

Püüab kinni pilte sisaldavad päringud, mis on suunatud **pilte mittetoetavatele mudelitele**, ja kas
suunab kogu päringu ümber pilte toetavale mudelile või asendab enne
ülesvoolukutset pildiosad tekstikirjeldustega, mille loob seadistatav pildimudel.
See võimaldab ainult teksti toetavatel teenusepakkujatel multimodaalseid andmekogumeid läbipaistvalt
töödelda.

Töövoog:

1. Jäta vahele, kui sihtmudel juba toetab pilte (välja arvatud juhul, kui see esineb
   sundsillaga mudelite loendis `isVisionBridgeForcedModel`).
2. Eralda pildiosad funktsiooniga `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), mis delegeerib töö **ühtsele meediatuvastajale**
   `detectMediaParts()` failis `open-sse/utils/mediaParts.ts` — see on
   combo-ühilduvusfiltriga jagatud ainus tõeallikas.
   Eraldamine kasutab lubatud loendit, mis hõlmab ainult sellise kujuga tipptaseme osi,
   mida `replaceImageParts` saab tagasi lisada (eraldamise↔asendamise leping): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ja Responses API `input_image`. Pesastatud vasteid ja
   üksnes indikaatorit sisaldavaid kujusid töötleb combo-filter ning neid ei eraldata kunagi.
   Kui ühtegi ei leita, jäta vahele.
3. Lahenda käitusaegne konfiguratsioon funktsiooniga `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): uued `modalityBridge*`
   seadete võtmed on ülimuslikud; pärandvõtmed `visionBridge*` jäävad **ühe tsükli
   varuvariandiks** (tagasipööramisaken). Kui sild on keelatud, jäta töötlus enne
   mis tahes meedia läbimist vahele.
4. Režiimivalija (`modalityBridgeVisionMode`, vt allolevat tabelit) otsustab
   ümbersuunamise või kirjeldamise vahel. Ümbersuunamine tagastab `modifiedPayload`, milles on
   vahetatud ainult `model`, ning metaandmed `{ rerouted, fromModel, toModel, imagesKept }`.
5. Kirjeldamisrada: piira piltide arv väärtusega `maxImages`, koosta ülesandeteadlik viip,
   kontrolli kirjelduste vahemälu, kutsu pildimudelit **paralleelselt**
   (`Promise.allSettled`) ja sisesta piltide asemele tekstiosad
   `[Image N]: <description>`. Nurjunud kirjeldamine annab tulemuseks `null` ja algne pildiosa
   **säilitatakse** (#4012) — välja arvatud combo-kirjeldusrajal, kui kõik
   kirjeldamiskatsed nurjusid; sellisel juhul saab kinnitatud pilte mittetoetav ülesvoolusüsteem
   selle asemel kohatäitja `(unavailable — no vision-capable provider connected)` (#8430).
6. Tagasta `modifiedPayload` + metaandmed (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režiimivalija (`modalityBridgeVisionMode`)

| Režiim     | Vaikimisi | Käitumine                                                                                                                                                                                                                                                                                                                      |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔         | Pärandheuristika muutmata kujul (#6640/#7204): mitte-combo-/`auto/` mudelid suunatakse ümber parimale pildimudelile, välja arvatud juhul, kui algsel mudelil on juba kasutatavad identimisteabe andmed (siis kirjeldatakse); combo-sihtmärke kirjeldatakse alati.                                                              |
| `describe` |           | Kirjelda alati — ümbersuunamisplokk jäetakse täielikult vahele; vastab alati kasutaja valitud mudel.                                                                                                                                                                                                                           |
| `reroute`  |           | Sunni ümbersuunamine: identimisteabega mudeli säilitamise kontroll jäetakse vahele. Ümbersuunamise **sihtmärgi** identimisteabe kontroll kehtib endiselt — kui kasutatavat pildimudelist sihtmärki ei ole, jätkab päring kirjeldamisega, et töötlemata pildid ei jõuaks kunagi ainult teksti toetavasse taustsüsteemi (#8430). |

Sunnitud režiimid lõpetavad töötluse varakult **enne** automaatse heuristika käivitamist; `auto` käitumine
on baiditasemel identne PR-1-eelse kaitsepiirdega.

#### Ülesandeteadlik kirjeldusviip (`modalityBridgeVisionTaskAware`)

Vaikimisi **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) lisab
baaskirjeldusviibale **viimase kasutajasõnumi** teksti (kärbitud 500 märgini),
suunates kirjelduse sellele, mida kasutaja tegelikult küsis
(codex-vision-proxy muster), ja paludes pildimudelil nähtav tekst transkribeerida.
Kui lipp on välja lülitatud — või kasutaja tekst puudub — kasutatakse baasviipa muutmata kujul.

Kirjelduse enesetsükli enda OpenAI-ga ühilduv päring (`callVisionModelSingle()`
failis `visionBridgeHelpers.ts`) taotleb alati väärtust `image_url.detail: "high"` —
tingimusteta, iga kutsuja/pakkuja puhul ning sõltumata kliendi mis tahes signaalist.
Madala detailsusega diskreetimine halvendab OCR-i täpsust just selle
teksti transkribeerimise ülesande puhul, mida see viip taotleb, seega küsib
kirjelduspäring ise alati suurt detailsust olenemata sellest, millist detailsustaset
algne sissetulev päring kasutas. See mõjutab ainult sisemise kirjelduspäringu
keha; see ei muuda viisi, kuidas OmniRoute edastab kutsuja enda
`image_url.detail` väärtuse põhipäringus — see vaikeväärtus rakendatakse eraldi
ja ainult tuvastatud OpenCode'i klientidele funktsioonis
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Kirjelduse
enesetsükli Anthropic-u juhtmevormingu harul pole välja `detail` ja kumbki
vaikeväärtus seda ei mõjuta.

#### Kirjelduse väljundi ülempiir (`modalityBridgeVisionMaxChars`)

| Võti                           | Vaikeväärtus | Vahemik           |
| ------------------------------ | ------------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`          | `0` või 100–50000 |

`0` (vaikeväärtus) tähendab, et **ülempiiri pole** — funktsiooni
`callVisionModel()` tagastatud kirjeldus edastatakse muutmata kujul, säilitades
senise käitumise. Mis tahes väärtus vahemikus 100–50000 kärbib kirjeldust,
lisades lõppu järelliite `…`, enne kui see lisatakse tagasi kujul
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` failis
`src/lib/guardrails/visionBridge.ts`). Suurendage seda detailirohkete OCR-i
ülesannete puhul, kus järgnev mudel vajab täielikku transkriptsiooni; vähendage
seda, et piirata tokenite kasutust jutukate nägemismudelite puhul.
Töölaua väli asub vahekaardi Vision paneelil Advanced
(`modality-bridge-max-chars` failis `ModalityBridgeVisionTab.tsx`) ja tõstab iga
väärtuse vahemikus 1 kuni 99 alumise piirini 100, jättes sõnaselgelt määratud
väärtuse `0` puutumata — `0` on omaette kehtiv Zodi väärtus
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), mitte üksnes
„määramata” vaikeväärtus.

#### Kirjelduste vahemälu (`modalityBridge/bridgeCache.ts`)

Mälusisene LRU- ja TTL-vahemälu kirjelduste väljundite jaoks, mida jagatakse
kogu protsessi ulatuses.
Võti = `sha256(imageRef + composedPrompt + configuredBridgeModel)` koos
pikkuse prefiksiga raamimisega (väljade piiridel kokkupõrkeid ei teki). Mudeli
komponent on **seadistatud** sillamudel, mitte tegelikult vastanud mudel —
`callVisionModel` võib sisemiselt varumudelile üle minna ja võtme määramine iga
katse kohta killustaks vahemälu. Nurjunud kirjeldusi ei salvestata kunagi
vahemällu. Seaded:

| Võti                            | Vaikeväärtus | Vahemik |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Kaugpiltide normaliseerimine (enesetsükli kirjeldus / base64 toomine)

Kui sild toob **kaugpildi** ise — Anthropic-u kirjelduse enesekutse ja
claude-wire-format-vormingu base64-teisendus
(`ensureBase64ImagesForClaudeWire`), mõlemad funktsiooni
`fetchRemoteImageAsDataUri()` kaudu failis `visionBridgeHelpers.ts` — edastatakse
saadud andme-URI enne nägemismudeli päringusse lisamist funktsioonile
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Liiga suured pildid
vähendatakse **2048px pikema servani** (vastavalt suuruse muutmise ülempiirile,
mida OpenAI/Anthropic juba serveri poolel rakendavad), mis vähendab
üleslaaditavate baitide hulka ja latentsust, muutmata seda, mida nägemismudel
näeb. Suuruse muutmiseks kasutatakse paketti `sharp`, mis laaditakse dünaamilise
impordi kaudu: platvormil, kus selle omabinaarfaili laadimine nurjub, ei
põhjusta `normalizeDataUri()` **kunagi erindit** — see edastab algsed baidid
muutmata kujul, nii et kirjeldamise/base64-teisenduse tee töötab alati edasi.
Ka muud kui pildiandmed (toomine, mis ei tagastanud dekodeeritavat pilti)
edastatakse muutmata kujul. See normaliseerimine piirdub piltidega, mille sild
toob oma enesekutse jaoks — seda ei rakendata kunagi kutsuja töötlemata
muutmata edastatavale lastile, kooskõlas ainult sõnaselgel lubamisel muutmise
põhimõttega (range reegel #20).

#### Seadete skeem + migratsioon

Uued `modalityBridge*` võtmed valideeritakse Zodiga skeemis
`updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` kolmik ja Audio Bridge'i kasutatav rühm
`modalityBridgeAudio*`. Migratsioon `141_modality_bridge_settings.sql` kopeerib
olemasolevad pärandvõtmete `visionBridge*` väärtused vastavatesse uutesse
võtmetesse (idempotentselt, kirjutamata kunagi üle operaatori määratud
`modalityBridge*` väärtust); pärandvõtmeid aktsepteeritakse ühe väljalasketsükli
jooksul endiselt lugemise varuvariandina.

#### Läbipaistvuspäis + statistika

Kirjelduseks teisendatud vastused sisaldavad päist
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(loodud funktsiooniga `buildModalityBridgeHeader()` failis
`modalityBridge/bridgeStats.ts`, lisatud funktsiooniga
`withModalityBridgeHeader()` failis `src/sse/handlers/chatHelpers.ts`).
Ümbersuunatud päringud **ei saa** päist — last jäi muutmata ja mudelivahetus on
juba nähtav vastuse keha väljal `model`.

`GET /api/modality-bridge/stats` (haldusautentimine, sama tase nagu
`GET /api/settings`) tagastab mälusisesed modaalsuspõhised loendurid
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` modaalsuste `vision`, `audio` ja
`video` kohta. `averageLatencyMs` kasutab nimetajana väärtust `latencySamples`,
mitte kõiki katseid; ajamõõtmiseta toiming ei tekita kunstlikult
nullmillisekundilist valimit. `bridged` jääb edukate teisenduste tagasiühilduvaks
aliaseks; nurjunud katsed seda ei suurenda.
Loendurid lähtestatakse protsessi taaskäivitamisel taotluslikult
(tegemist on telemeetria, mitte arvestusega).

#### Töölaua konfiguratsioon

Spetsiaalne töölaua leht asub aadressil
`/dashboard/settings/modality-bridge`. Selle URL-i kaudu avatavad vahekaardid `Vision`, `Audio`
ja `Video` säilitavad päringuparameetrid, muutes samal ajal väärtust `tab`.
Vahekaart Vision võimaldab funktsiooni lubada, valida režiimi ja mudeli (sealhulgas automaatse
vaikevaliku), kasutada ülesandeteadlikke viipasid, määrata täpsemaid ajalõpu-, pildi-, kirjelduse pikkuse ja vahemälu
piiranguid, vaadata käitusaegseid
loendureid ning teha kaitstud näidispäringu. Vahekaart Audio on samuti aktiivne: seal saab
funktsiooni lubada, valida ainult STT-mudeleid sisaldavast mudelivalijast koos valikuga Auto, määrata ajalõpu ja klipi maksimaalse pikkuse piiranguid, vaadata heli
loendureid ning teha `input_audio` näidistesti. Vahekaart Video on toimiv: see kuvab
FFmpeg-i/ffprobe'i käitusoleku — ühe neljast selgelt määratletud kasutajaliidese olekust (`unknown`, kui
kontroll on pooleli või seda ei saanud lõpetada, `restricted`, kui töölaua host ei ole tagasisideaadress ja kontroll jäetakse kliendi poolel vahele, `unavailable`, kui kontroll on
tehtud ja puudumine kinnitatud, või `available` koos FFmpeg-i/ffprobe'i versioonidega) — salvestab
lubamise, mudeli, kaadrite, video ja ajalõpu piirangud, filtreerib mudelivalija nägemisvõimeliste
mudelite järgi ning kuvab video loendurid.

Varasem AI-sätete kaart Vision Bridge on ühilduvuslink
uuele lehele; see ei sisalda enam vormi teist koopiat. Media Providers
lingib ka Image-to-Text ja Speech-to-Text töövood vastavatele Modality
Bridge'i vahekaartidele, eemaldamata olemasolevat Speech-to-Texti testkeskkonda.

**Isetsükli vastuvõtukontrollist möödumine:** kui kirjelduskutse suunatakse läbi OmniRoute'i
enda `/v1` isetsükli (mittestandardne teenusepakkuja mudel), saadab alampäring
`x-omniroute-admission-bypass: internal` ja autenditakse lahendatud
isetsükli mandaadiga — kohalikus režiimis kohaliku `sk_omniroute` sentinelväärtusega või
operaatori seadistatud keskkonnavõtmega `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), et
juurutused sättega `REQUIRE_API_KEY=true` saaksid siiski kirjelduskutse käivitada. Möödumine
on lubatud ainult nende täpsete mandaatide puhul, mistõttu välised kliendid ei saa seda
päist vastuvõtukontrolli vahelejätmiseks kasutada.

Pärandvaikeväärtused asuvad failis `src/shared/constants/visionBridgeDefaults.ts`;
uue režiimi, ülesandeteadlikkuse ja vahemälu vaikeväärtused ning sätete lahendaja asuvad failis
`src/shared/constants/modalityBridgeDefaults.ts`. Kaitsemehhanism pakub
`deps` konstruktori suvandit, et testid saaksid sisestada võltsitud `getSettings` ja
`callVisionModel` teostused.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Püüab heli sisaldavad vestluspäringud kinni enne, kui need jõuavad sihtmärgini, mille puhul
ei ole teada, et see aktsepteeriks helisisendit. See ei suuna vestluspäringut kunagi ümber: heliosad
transkribeeritakse olemasoleva OpenAI-ga ühilduva mitmeosalise lõpp-punkti kaudu ja
valitud vestlusmudel jätkab tekstitranskriptidega.

Voog:

1. Lahenda `supportsAudio` funktsiooni `getResolvedModelCapabilities()` kaudu. Esmalt
   eelistatakse teenusepakkujate registri selgesõnalisi metaandmeid, seejärel staatilisi mudeli metaandmeid ja lõpuks sünkroonitud
   `modalities_input` väärtust. Deklareeritud sisendiloend ilma väärtuseta `audio` annab tulemuseks `false`; kui
   võimekuse kohta tõendid puuduvad, jääb väärtuseks `null`. Nii `false` kui ka `null` aktiveerivad
   konservatiivse silla, samas kui `true` jätab selle vahele.
2. Lahenda `modalityBridgeAudio*` sätted ja eralda iga sõnumi ülemiselt tasemelt
   väljalõigatavad heliosad jagatud `detectMediaParts()`
   detektori abil. Toetatud andmevormingud on OpenAI `input_audio`, `audio_url` ja
   `source.media_type: "audio/*"`. Pesastatud heli tuvastatakse marsruutimiseks, kuid
   väljalõikamise käigus seda ei eemaldata. Tööd piirab `modalityBridgeAudioMaxClips`;
   hilisemad osad jäävad puutumata.
3. Kasuta seadistatud väärtust `provider/model` või lase funktsioonil `selectAudioBridgeModel()` läbida
   `AUDIO_TRANSCRIPTION_PROVIDERS` stabiilses kataloogijärjekorras ning valida esimene
   mudel, millel on kasutatav aktiivne teenusepakkuja mandaat.
4. `callAudioTranscription()` teisendab base64-/andme-URI-heli mitmeosaliseks
   `file`-iks või laadib kaug-`audio_url`-i alla ainult avalikke sihtkohti lubava väljamineva ühenduse
   kaitse kaudu, kasutades DNS-i kinnistamist ja 25 MB piirangut. Seejärel saadab see faili ja valitud
   mudeli POST-meetodiga kohalikku `/v1/audio/transcriptions` isetsüklisse, autentides
   funktsiooniga `resolveSelfLoopBearer()`. Olemasolev transkribeerimismarsruut teostab tavapärase
   mandaadiotsingu, jahtumisaja/kiirusepiirangu käsitluse ja teenusepakkujale edastamise.
5. Edukad kutsed asendavad oma osad tekstiga `[Audio N]: <transcript>`. Kutsed
   käivitatakse funktsiooniga `Promise.allSettled`: üksiku kutse nurjumisel säilitatakse algne
   heliosa (#4012 leping). Kui kõik kutsed nurjuvad ja sihtmärgi puhul on tõestatud
   `supportsAudio === false`, asendatakse osad tekstiga
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 leping). Tundmatu
   sihtmärgi (`null`) puhul jääb kõigi kutsete nurjumisel sisu puutumata. Tõestatult
   ainult teksti toetav sihtmärk, millel puudub kasutatav STT-mandaat, saab sama selgesõnalise
   asendusteksti ilma võrgukutset tegemata.

Edukad transkriptid kasutavad protsessiülest Modality Bridge'i LRU-/TTL-vahemälu.
Võti ühendab heliviite, stabiilse toimingusildi `audio-transcription`
ja valitud STT-mudeli; nurjumisi ei salvestata kunagi vahemällu. Helikatsetused uuendavad
jagatud `bridged`, `cacheHits`, `failures` ja `lastUsedAt` loendureid.
Teisendatud vastused sisaldavad päist
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; puutumata
päringud ei saa Audio Bridge'i segmenti.

Käitussätted salvestatakse andmebaasi ja valideeritakse Zodiga:

| Võti                          | Vaikeväärtus | Vahemik         |
| ----------------------------- | ------------ | --------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —               |
| `modalityBridgeAudioModel`    | `""`         | Auto või STT ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10            |

Jagatud vahemälu juhivad endiselt `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ja `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Peatab Chat Completionsi `messages`-i ja Responses API `input`-i tipptaseme videoosad enne sellise sihtmärgi väljakutsumist, millel teadaolevalt puudub video loomulik tugi.
Toetatud vormid on `input_video`, `video_url`, `video_source`, HTTPS-i URL-id ja
`data:video/*;base64,...`-tüüpi andme-URI-d. Tekstis olevaid lihtsaid failinimesid ei käsitleta
videona.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) vastutab päringu läbimise,
võimekuse ja poliitika kontrolli, päringupõhise koondamise ning vastuse kasuliku sisu eest.
Videopõhine töö — hankimine, terviktulemuse vahemälu, kaadrijada
kirjeldamine (mis liidab kõik helistaja deklareeritud heli transkriptsioonid) ning katsepõhised
mõõdikud, katkestamine ja puhastamine — on peidetud funktsiooni `processVideoPart` taha failis
`videoBridgePipeline.ts`, mida kutsutakse `preCall`-i tsüklis iga videoosa kohta üks kord.
See moodul määratleb ka selgesõnalised pordipiirid `VideoMediaBrokerPort`
(baitide hankimine ja diskreeditud kaadrite eraldamine), `VideoAudioTranscriptionPort`
(helistaja deklareeritud heli transkriptsiooni liitmine diskreeditud kaadrite allkirjadega) ja
`VideoDrilldownPort` (kaadrite süvaanalüüsi püsivuspiir; pole veel funktsiooniga
`processVideoPart` ühendatud — praegu kirjutab süvaanalüüsi kirjeid ainult eraldiseisev
`/api/modality-bridge/video/drilldown` marsruut).

Avalik `/v1` päringutee ei impordi ega käivita kunagi alamprotsessi. Kaugvideod
laaditakse alla 50 MiB piiranguga; tekstisisesel base64-videol on ühe video kohta
konservatiivne 36 MiB dekodeeritud mahu piirang, et mudeli, sõnumite ja raamistuse ümbris
mahuks avaliku JSON-päringu vastuvõtupiiri 50 MiB sisse. Tekstisisest pikkust ja
dekodeeritud suuruse hinnanguid kontrollitakse enne mälu eraldamist. Esialgse kaug-URL-i
ja iga ümbersuunamise puhul on nõutav HTTPS, kasutades olemasolevat ainult avalikele
sihtkohtadele mõeldud väljamineva liikluse kaitset koos DNS-i sidumisega. Seejärel ületavad baidid täpse sisemise
`POST /api/modality-bridge/video/extract` vahenduspiiri. See marsruut on ühtaegu
`LOCAL_ONLY` ja `SPAWN_CAPABLE`, võtab vastu ainult protsessipõhiselt autenditud
usaldusväärse tagasisideahela päringu ega aktsepteeri kunagi URL-i, failisüsteemi teed, käivitatavat faili
ega argumentide loendit. API päringukeha suuruse konveier ja töötleja inkrementaalne päringukeha
lugeja rakendavad teineteisest sõltumatult vahendaja sisendile 50 MiB piirangut. Selle piiratud järjekord töötleb
korraga üht eraldustööd, lubab nelja ootel tööd ja piirab ootel sisendi mahuks
100 MiB.

Vahendaja sees loeb `ffprobe` privaatset kohalikku faili; fikseeritud vormingute
lubatud loend välistab esitusloendi- ja manifestivormingud. Lubatud MOV-perekonna
konteinerite puhul jäävad välised MOV-andmeviited vaikimisi keelatuks ja
fikseeritud käsk ei luba neid. Nii `ffprobe` kui ka `ffmpeg` kasutavad
ainult `file`-protokolli lubatud loendit, üht lõime, fikseeritud argumendimassiive, mitte ühtegi kesta,
ning käivitatavad failid leitakse muutujast `PATH`. Manustatud pildiga kaanevood ei ole
esitatavad kandidaadid. Kõik esitatavad vood peavad piirangutele vastama ning
enne deterministlikku väikseima indeksiga varuvalikut eelistatakse selgesõnaliselt vaikimisi määratud voogu.
Videod on piiratud 600 sekundiga, 8192 piksliga mõõtme kohta ja
33 554 432 lähtepiksliga. FFmpeg diskreedib 1–16 keskpunkti JPEG-kaadrit, vähendab
pikema külje kuni 1024 pikslini ilma väiksemaid sisendeid suurendamata ega
saa kunagi URL-i. Diskreetimispoliitika on vaikimisi `uniform`. Valikulised
`scene_aware` ja eksperimentaalne `segment_aware` poliitika teevad juba valideeritud
kohaliku voo üle ühe täiendava fikseeritud FFmpegi läbimise, valivad piiratud arvu
`showinfo` stseeni ajatemplid ning langevad detektori tõrke, ajalõpu, vigase väljundi või tühja
kandidaadikomplekti korral deterministlikult tagasi samadele ühtlastele keskpunktidele.
Segmenditeadlik režiim jaotab keskpunkti diskreete proportsionaalselt valideeritud
stseeniintervallidele; segmenditeadlikke tõendeid ja varukäitumist kirjeldatakse
üksikasjalikult allpool. Range 16 kaadri piirang
rakendatakse kõigi poliitikate puhul pärast valimist. Kui stseeniteadliku päringu
eelarve on ainult üks kaader, kasutab see aktiivse täisvideo või fookusakna ühtlast
keskpunkti ja teatab `policyEffective: uniform`: üks valitud stseenikaader
ei suuda säilitada mõlemat ajalist otsa. Helistaja võib soovi korral esitada
lõpliku fookusakna (`start`/`end` sekundites); piirid kinnitatakse meedia
kestuse vahemikku, ümberpööratud või mittelõplikud aknad lükatakse tagasi ja kõik diskreetimispoliitikad
rakendatakse ainult normaliseeritud intervalli sees. Saadud aken
lisatakse diskreetimise metaandmetesse ja ebausaldusväärse kirjelduse
prefiksisse, et allavoolu mudelid saaksid eristada fookustatud väljavõtet tervest
ajateljest.

Semantiline allkirjade fookus on eraldiseisev selgesõnaline seadistus. Vaikimisi `full`
analüüsirežiim säilitab olemasoleva kaadriviiba ega edasta kunagi päringu
teksti allkirjamudelile. Režiimis `focused` loeb sild ainult uusimat
mittetühja kasutaja loodud `text`/`input_text`-i samast Chati või Responsesi
konteinerist, normaliseerib selle NFC-vormingusse, ahendab juhtmärgid ja tühimärgid
ning piirab selle 500 Unicode'i koodipunktiga. Tühi tulemus langeb tagasi
täpsele `full` viibale. Kasutatav vihje serialiseeritakse JSON-ina spetsiaalses
ebausaldusväärse kasutajakonteksti plokis ja võib ainult vaadeldavaid üksikasju prioriseerida; see
ei saa tühistada eraldiseisvat hoiatust meedias nähtavate või kuuldavate juhiste
eiramiseks. Tekstiline fookus ei tuleta kunagi `start`/`end` väärtusi ega muuda
ajalist diskreetijat.

#### FU-07 struktuursed segmenditõendid

`segment_aware` kasutab üht piiratud eelanalüüsi läbimist juba valideeritud
kohaliku videovoo üle. Fikseeritud filtriahel skaleerib esmalt laiuse kuni 320 pikslini,
tuvastab stseenimuutused ja tardunud intervallid ning diskreedib seejärel hägususe,
keskmise heleduse ja ruumilise/ajalise teabe jaoks kiirusega 1 kaader sekundis. Läbimine on
piiratud 600 struktuurse diskreediga, ühe FFmpegi/filtri lõimega, samade
ainult `file`-protokolli ja konteinerite lubatud loenditega, protsessi väljundi 1 MiB piiranguga
ning maksimaalselt 30 sekundiga vahendaja jagatud katkestus-/tähtaja sees. See ei
aktsepteeri päringust kunagi käsku, filtrit, teed ega URL-i.

Struktuuriväärtused on deterministliku valimi moodustamise tõendid, mitte video semantiline mõistmine. Nende põhjal ei tuletata subjekte, tegevusi, subtiitreid, kõnet ega kasutaja kavatsust. Stseeni- ja tardumispiirid moodustavad segmendid; tardumise ulatus, hägusus, säritus, ruumiline detailsus ja ajaline muutus mõjutavad ainult seda, kuidas olemasolev 1–16 kaadri eelarve jaotatakse. Täielikult tardunud segment on piiratud ühe kaadriga, samal ajal kui mittetardunud segmendid konkureerivad ülejäänud eelarve pärast. Kui piire on rohkem kui kaadreid, säilitatakse ajajoonel ühtlane katvus, et kiired varased lõiked ei saaks pikka lõppsegmenti varjata. Stseenipiirid, mis jäävad tardumispiiri 1-sekundilise analüüsieraldusvõime sisse, ühendatakse.

Puuduvad filtrid, vigased või tühjad tõendid, detektori viga või piiratud eelanalüüsi ajalõpp põhjustavad täpse ühtlaste keskpunktide poliitika kasutamise. Kutsuja katkestus või vahendaja tähtaeg seda varuvarianti ei käivita: see lõpetab poolelioleva alamprotsessi, takistab hilisemat kaadrite eraldamist ning privaatne ajutine kataloogipuu eemaldatakse plokis `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` loob deterministlikud päris FFmpegi testandmed deduplitseerimisjärgse subtiitrikutsete säästu, tiheda liikumise eelarvejaotuse, hägususe/särituse/SI-TI tõendite, pika lõpuosaga kiirete lõigete ja järkjärgulise hajumise valepositiivsete tulemuste jaoks. See salvestab eelanalüüsi tegeliku kestuse ning juhul, kui `/usr/bin/time` on saadaval, alamprotsessi protsessoriaja ja RSS-i tippväärtuse. Selle kvaliteedikontrollid on ainult struktuurilised oraaklid. Päris subtiitrimudeli kvaliteet jääb olekusse `HOLD`, sest sellel testiraamistikul puudub volitatud lõpp-punkt või fikseeritud hindaja. Rahaline sääst jääb samuti olekusse `HOLD`, kui `--caption-cost-per-call-usd` ei anna sõnaselget positiivset kutsepõhist kuluhinnangut; skript ei fabritseeri kumbagi tulemust.

Iga kaader on piiratud 4 MiB-ga, kõik toorkaadrid kokku 23 MiB-ga ja serialiseeritud vahendaja vastus 32 MiB-ga. Privaatne ajutine kataloog eemaldatakse plokis `finally`. OmniRoute ei komplekteeri FFmpegi ega aktsepteeri kohandatud täitmisfaili asukohta. Enne subtiitrite loomist rakendab sild konservatiivset visuaalse deduplitseerimise läbimist: iga JPEG vähendatakse 16×16 halltoonpuhvriks ja seda võrreldakse ainult viimase säilitatud kaadriga. Kui taotletud subtiitrieelarve ületab ühte kaadrit, annab eraldamine piiratud kandidaatide kogumi, mille suurus on kuni kaks korda suurem kui see eelarve, kuid mitte kunagi üle 16 kaadri. Taotletud ülempiiri rakendatakse alles pärast deduplitseerimist ning vähemalt kahe kaadri suuruse eelarve korral säilitatakse lõpliku harvendamise käigus esimene ja viimane valitud kandidaat. Versioonitud poliitika `grayscale-16x16-mean-cells-v2` kasutab keskmise heleduse erinevusest ja nende pisipildi lahtrite suhtarvust suuremat väärtust, mille normaliseeritud erinevus on vähemalt 0,05. Duplikaadilävi on konstant 0,04, mis on valitud prognoositavuse huvides, mitte käitusajal muudetava sättena. See teisene suure kontrastsusega signaal säilitab väikese liikumise ja nähtava teksti muudatused, mida ainult keskmisel põhinev võrdlus võib varjata. Võrdleja või dekoodri vead kasutavad varuvarianti ja säilitavad katvuse. Väljundi metaandmed eristavad eraldatud kandidaate, edukalt kasutatud kaadreid ja eemaldatud visuaalseid duplikaate.

Selgesõnaliselt videoks märgitud osa võib taotleda ajatemplitega kontaktlehte. Sild loob kuni 4 veeru ja 16 kaadriga JPEG-ruudustiku. Iga 512-piksline lahter põletab oma lähteajatempli suure kontrastsusega alumisele ribale, samal ajal kui samad ajatemplid jäävad allavoolu seostamiseks ja auditeerimiseks tekstilistesse metaandmetesse. Täieliku JPEG suurus on endiselt piiratud 32 MiB-ga. Kui `sharp` ei suuda ruudustikku dekodeerida või koostada, kasutab sild varuvariandina üksikuid JPEG-kaadreid; kliendi katkestus levib endiselt läbi kontaktlehe toimingu.

Edutamise tõendid on sünteetilisest kompositsiooni mikrojõudlustestist teadlikult eraldatud. `scripts/perf/video-bridge-contact-sheet-eval.ts` määratleb skeemiversiooniga A/B-testiraamistiku päris OpenAI-ga ühilduvate nägemismudelite jaoks. See mõõdab teenusepakkuja teatatud tokenite arvu, täielikku tegelikku latentsust (sealhulgas kontaktlehe koostamist), mudelikõnede arvu ja manifestis määratletud faktide säilimist. Mudeli toorvastuseid aruandesse ei kirjutata; säilitatakse ainult SHA-256 räsi ja vastendatud faktide ID-d. Testiraamistik ei tee ühtegi võrgu- ega tasulise mudeli kutset, kui pole edastatud `--execute-real` ning `--model`, `OMNIROUTE_BASE_URL` ja `OMNIROUTE_API_KEY` pole konfigureeritud. Ilma sellise sõnaselge päriskäivituseta jääb selle masinloetav otsus olekusse `HOLD`; üksnes sünteetilise kasuliku koormuse või kutsete arvu mõõtmised ei ole edutamise tõendid.

Kutsujad võivad toetatud videoosale lisada valikulise massiivi `transcript.cues`, kui neil on juba joondatud tekst. Iga vihje peab sisaldama välja `text`, kontrollitud kestuse sisse jäävat lõplikku `start`/`end` intervalli ja lubatud loendisse kuuluvat välja `source` (`client`, `embedded` või `audio-bridge`); välja `confidence` vaikeväärtus on `1` ja see peab jääma vahemikku `0` kuni `1`. Täpsed duplikaatvihjed ühendatakse. OmniRoute ei alusta nende metaandmete põhjal kunagi transkribeerimist: valideeritud vihjed kopeeritakse koos allika, usaldusväärsuse ja intervalliga kirjeldatud tulemusse ning renderdatakse kaadrisubtiitrite kõrval mitteusaldusväärsete tähelepanekutena. Sobimatu, lubatud vahemikust väljas või päritoluteabeta tekst lükatakse tagasi, selle asemel et see subtiitrivoogu segada. Väli `source` on praegu kutsuja deklareeritud, mitte serveri kontrollitud: OmniRoute jõustab, et väärtus oleks üks kolmest lubatud stringist, kuid ei kinnita veel krüptograafiliselt, et silt `embedded` või `audio-bridge` pärines tegelikult serveri hallatud eraldamisest. Käsitlege välja `source` mitteusaldusväärse vihjena, kuni see kontroll on kasutusele võetud; ärge rajage sellele autoriseerimisotsuseid.

Edasijõudnud kutsuja võib sama video jaoks esitada juba autoriseeritud `audioTranscript`-raja. Ühenduskiht töötleb visuaalseid ja heli põhiseid vaatlusi ühe tähtaja ja katkestussignaali piires, järjestab need ühisel ajajoonel, liidab täpsed duplikaadid ning tagastab osalise tulemuse, kui ainult üks pool õnnestub. Vigane `audioTranscript` taandub selliseks osaliseks tulemuseks — visuaalne kirjeldus säilitatakse ja heliharu salvestab puhastatud tõrkekoodi — selle asemel, et kogu video töötlemine nurjuks. Harude kaupa saadavus, osalisuse lipp ja puhastatud tõrkekoodid säilitatakse kirjeldatud tulemuses, kaitsepiirete metaandmetes (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), tulemuse vahemälu metaandmetes ja silla ühendamisloendurites. Video Bridge'i vaiketee ei käivita kõne tekstiks teisendamist ega laadi alla teist meediakoopiat; ilma selle sõnaselgelt esitatud rajata jääb töötlus ainult videopõhiseks.

**Transkriptsiooni säilitamine (#12150 P1).** See rakendub automaatselt alati, kui Video Bridge (mis on ise valikuline) renderdab transkriptsioonivihje — eraldi säilitamislippu ei ole. Kui päring renderdab mõne transkriptsioonivihje (kutsuja deklareeritud `transcript` või ühendatud `audioTranscript`), märgistab kaitsepiire selle väärtusega `videoBridgeObserved` ja loob video kirjelduse redigeeritud varikoopia — identse renderduse, milles iga vihje vabatekstiline sisu asendatakse tekstiga `[redacted-video-transcript]`; see koostatakse struktureeritud vihjevälja asendamise teel enne stringi moodustamist (mitte kunagi lamendatud teksti sõeludes, mistõttu ükski vihje sisu — pahatahtlik ega tavapärane, sealhulgas märki `]` sisaldav sisu, nagu `[inaudible]`/`[music]` — ei saa säilida). Püsivasse kõnelogisse salvestatavas päringu kehas asendatakse kõik videost tuletatud tekstiosad selle redigeeritud varikoopiaga, kasutades vastendamiseks sisu võrdsust; ankur `fullText` loetakse uuesti lõpetatud kõne-eelse kaitsepiirde koormist, mistõttu vastendamine õnnestub ka pärast seda, kui järgnevad ahela kaitsepiirded (isikuandmete ja identimisteabe maskeerijad prioriteetidega 10/95) on kirjelduse teksti kohapeal ümber kirjutanud ning pärast seda, kui süsteemiviiba, üleandmise või mälu sisestamine on sõnumimassiivi ümber kujundanud. Mudelile ülesvoolu saadetav keha jääb muutmata. Vaadeldud päring ei täida ka püsivat mälu Memory (nii päringust kui ka vastusest tuletatud eraldamine jäetakse vahele), seega ei saa mudeli enda vastus transkriptsiooni teksti mällu Memory kajastada.

Järeltegevuseks jälgitavad veel avatud säilituspinnad (**P2**, #12430): kaitsepiirde-eelne töötlemata kliendipäringu hetktõmmis üksikasjaliku logi artefaktis; `previous_response_id`-ga jätkamise tõrkekindel sulgemine; tuletatud viipade sisemised edastused, mis põimivad transkriptsiooni sünteesitud stringviiba sisse (konveieri etapid, konteksti üleandmine); ning mudeli vastuse vastusekeha või semantilise vahemälu koopia, mis tsiteerib transkriptsiooni. Need on töötlemata andmete või vastuste klassi kuuluvad või valikulised pinnad, mis jäävad väljapoole P1 püsiva päringukeha ja mälu Memory ulatust.

Sisemise `/api/modality-bridge/video/drilldown` elutsükkel on eraldiseisev, loopback-/loapõhise autentimisega vahemälualus. Iga toiming nõuab ka kanoonilist läbipaistmatut subjekti ID-d. Enne tootmiskutsuja lubamist peab see tuletama nimetatud ID autenditud rentnikust ega tohi kunagi edastada kliendi valitud väärtust. Vahemälu võtmed seovad selle subjekti kanooniliste seansi- ja videoviite ID-dega, talletavad ainult nende SHA-256 põhjal tuletatud võtmed ning piiritlevad nii lugemise kui ka kustutamise sama subjektiga. Vahemälu talletab kirje kohta kuni 16 tuletatud JPEG-kaadrit, aegub need kümne minuti möödudes ning toetab piiratud `start`/`end`-lugemisi või seansi sõnaselget kustutamist.

Iga subjekti kohta on piirang 16 kirjet ja 64 MiB kanoonilisi JPEG-andmeid. Need piirangud ei sõltu globaalsest 64 kirje / 256 MiB ülempiirist: subjekti kvoodisurve korral tõrjutakse enne globaalse LRU-tõrjumise kaalumist välja ainult selle subjekti kõige kauem kasutamata olnud kirjed. Aegunud kirjed eemaldatakse vahemälutoimingute käigus nii subjekti kui ka globaalsest arvestusest, samas kui tühistamise või valideerimise nurjumise korral osalist asendust ei kinnistata.

Vahemälu lükkab tagasi mittekanoonilise Base64-kodeeringu, liigse täidistuse, mitte-JPEG-meedia, vigased või kärbitud JPEG-failid ning JPEG-failid, mis tekitavad piiratud täispildi `sharp`-dekodeerimise käigus hoiatuse. Iga aktsepteeritud pilt kodeeritakse uuesti kanooniliseks JPEG-failiks, laius ja kõrgus tuletatakse dekodeeritud baitidest, selle asemel et usaldada kutsuja välju, ning kõik lõppu lisatud polüglottbaidid kõrvaldatakse, mitte ei säilitata. Mõlema kvoodi arvestusse läheb ainult piiratud kanooniline tihendatud puhver. JSON-i edastuspiirang sisaldab Base64 lisamahtu 32 MiB dekodeeritud sisendi ülempiiri jaoks. Iga
talletatud tuletis salvestab valideeritud JPEG-vormingu ja -eraldusvõime, diskreetimispoliitika, tuletusversiooni, loomisaja, serveri arvutatud sisuräsi ning räsitud ülemviite koos usaldatud kutsuja esitatud ülemsisu räsiga. Tühistamist kontrollitakse asünkroonsete dekodeerimis- ja räsifaaside vahel enne vahemälu atomaarset kinnistamist.

See tööjärk ei ühenda veel tootmiskeskkonna tootjat marsruudiga ega paku mitme eraldusvõimega variantide valimist. Läbipaistev Video Bridge'i päringutee ei põhjusta seetõttu lisatööd, samas kui rentnikuga seotud subjekti tuletamine ja täielik FU-08 mitme eraldusvõimega elutsükkel jäävad sõnaselgelt järeltegevuseks, mitte ei ole dokumenteeritud valmis käitumisena.

Kaadrid varustatakse järjestikku pealdistega, kasutades seadistatud Video mudelit. Tühi
Video alistus pärib Visioni sätte; kui mõlemad on tühjad, valib Visioni
automaatmarsruuter sobiva nägemisvõimekusega mudeli. Õnnestunud pealdised
asendavad algse osa stabiilse prefiksiga `[Video description:`, mis märgib teksti ka
ebausaldusväärse, meediast tuletatud vaatlusena ja käsib järgnevatel
mudelitel meediast leitud juhiseid mitte järgida. Kaadripealdiste vahemälu võtmed
sisaldavad JPEG-baite, viipa, ajatemplit ja tegelikult kasutatavat mudelit; vahemällu
salvestatakse ainult õnnestunud pealdised. Vahemälukirjed säilitavad tegeliku eduka tootjamudeli,
sealhulgas varumudeli; kui eri kaadrid
toodeti eri mudelitega, raporteerib sild `mixed`. Vahemälutabamus kasutab sama tootja identiteeti
selle asemel, et märgistada see uuesti taotletud marsruutimisplaanina. Kogu video tulemuse
vahemälu võti põhineb igal väljundit muutval sisendil — viibal, tegelikult kasutataval
mudelil, diskreetimispoliitikal, kaadrite arvul, semantilise analüüsi režiimil, normaliseeritud
fookusevihje SHA-256
sõrmejäljel, fookuseaknal, väärtusel `transcript`,
väärtusel `audioTranscript` ja kontaktlehe lipul — seega põhjustab ükskõik millise neist
dimensioonidest muutmine vahemälutabatuse puudumise, mitte aegunud tulemuse taaskasutamise. Visuaalse deduplikeerimise poliitika
versioon, lävi ja piiratud kandidaatkaadrite arv on samuti tulemuse
vahemälu võtmes ja metaandmetes selgesõnaliselt esitatud; seetõttu ei saa poliitikamuudatus aegunud
kogu video kirjeldust taaskasutada. Tulemuse vahemälu v4 metaandmed säilitavad režiimi ja
sõrmejälje, kuid mitte kunagi kasutaja töötlemata ülesannet. Kaitsepiirete metaandmed esitavad nii
taotletud kui ka tegelikult kasutatava analüüsirežiimi; taotletud `focused` režiim ilma
kasutatava kasutajatekstita raporteeritakse tegelikult režiimina `full`.

Kaitsepiire eraldab kõik toetatud videoosad, kuid ei kirjelda rohkem kui
`modalityBridgeVideoMaxVideos`. Sihtmudeli korral, mille puhul on tõendatud
`supportsVideo === false`, muudetakse ebaõnnestunud ja piirangut ületavad videod selgesõnalisteks ohututeks
tekstimarkeriteks, et ükski töötlemata video alles ei jääks. Kui võimekus pole teada, jäävad need osad
puutumata. Sihtmudelid, millel on `supportsVideo === true`, mööduvad sillast.
Kliendipäringu katkestussignaal levib läbi allalaadimise, vahendaja järjekorra,
alamprotsesside ja pealdisekutsete; katkestused peatavad töö videote vahel ega lase tõrke korral
kunagi töötlemata meediat läbi.

Käitusaegsed sätted on DB-põhised ja Zod-valideeritud:

| Võti                                | Vaikeväärtus | Vahemik / käitumine                                                                                         |
| ----------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`      | Valikuline käitusaegne funktsioon, tuleb sõnaselgelt lubada                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` säilitab üldised pealdised; `focused` kasutab piiratud, ebausaldusväärset uusimat kasutajakonteksti  |
| `modalityBridgeVideoModel`          | `""`         | Pärib Vision Bridge'i mudeli                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` või proportsionaalne `segment_aware`; detektori tõrke korral kasutatakse `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                              |

Pärandina säilitatud Video ajalõpu väärtused, mis ületavad 120 sekundit, piiratakse
vahendaja tähtajaga; uute sätete kirjutamine üle selle piiri lükatakse tagasi.
`GET /api/modality-bridge/video/runtime` nõuab enne autentimist või käituskeskkonna kontrollimist
usaldusväärset tembeldatud loopback-lokaalsust ja seejärel haldusautentimist.
See tagastab ainult väärtuse `available`, puhastatud FFmpegi/ffprobe'i versioonid ning fikseeritud
põhjuse, kui käituskeskkond pole saadaval. Sisemine eraldamise lõpp-punkt ei ole
avalik üleslaadimis-API: järjekorra täitumine tagastab `503` koos päisega `Retry-After`, helistaja
ühenduse katkemine tagastab `499` ja vahendaja fikseeritud tähtaja ületamine tagastab `504`. Teisendatud vastused lisavad
kesksele päisele `x-omniroute-modality-bridge` väärtuse
`video->text;model=<visionModel>;parts=<videos>`, eemaldamata Visioni või Audio segmente.

### Isikuandmete maskeerija (`piiMasker.ts`)

Töötab **mõlemas** etapis.

- **`preCall`** kloonib kasuliku koormuse, läbib väljad `system`, `messages`, `input` ja
  `prompt` (sealhulgas lihttekstilised stringielemendid) ning rakendab funktsiooni `processPII()` (asukohast
  `@/shared/utils/inputSanitizer`) stringitüüpi väljadele `content`/`text`. Kui
  `PII_REDACTION_ENABLED=true`, redigeeritakse tuvastatud isikuandmed väljaminevas
  kasulikus koormuses. See ei sõltu väärtusest `INPUT_SANITIZER_MODE` (mis juhib ainult
  viibasüsti poliitikat). Kui redigeerimine on välja lülitatud, salvestab kutse tuvastamiste
  arvu sisu ümber kirjutamata.
- **`postCall`** süvakloonib vastuse ning käivitab `sanitizePIIResponse()` koos
  Responses-API vormingu maskeerijaga (`maskResponsesOutput` — hõlmab välju
  `output_text` ja `output[].content[].text`). Kui toimub mis tahes redigeerimine,
  asendab muudetud vastus algse.

Kaitsepiire ei blokeeri kunagi; see ainult annoteerib (`meta.detections`,
`meta.redacted`) või kirjutab ümber.

### Viibasüst (`promptInjection.ts`)

Tuvastab kasutaja esitatud sisus vastandlikke struktuure ja jõustab
seadistatud poliitika. Käitumist juhivad keskkonnamuutujad ja konstruktori
suvandid:

| Seadistus       | Keskkonnamuutuja                                                                                      | Vaikeväärtus | Mõju                                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lubatud         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`       | Kui väärtus on `false`, lõpetab kaitsemehhanism töö kohe.                                                                                                                                                              |
| Režiim          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`       | Sisestusründe poliitika: `block`, `warn` või `log`. (`redact` on tagasiühilduvuse huvides lubatud, kuid see **ei** eemalda sisestusründe teksti; päringu isikuandmete ümberkirjutamist juhib `PII_REDACTION_ENABLED`.) |
| Blokeerimislävi | `blockThreshold` suvand / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Blokeerimiseks nõutav minimaalne raskusaste. Vaikimisi on keskmine raskusaste ainult jälgimiseks.                                                                                                                      |

**Režiimi prioriteetsus** (`getMode`): kutsuja `options.mode` →
`INJECTION_GUARD_MODE` **andmebaasi funktsioonilipu alistus** (juhtpaneel → seaded →
funktsioonilipud) → `INJECTION_GUARD_MODE` keskkonnamuutuja → `INPUT_SANITIZER_MODE` keskkonnamuutuja →
`warn`. Seega on juhtpaneeli alistus keskkonnamuutujatest prioriteetsem, mistõttu juhib funktsioonilippude
kasutajaliides töötavat kaitset reaalajas (taaskäivitamist pole vaja). Andmebaasist lugemine on tõrkekindel:
vea korral naaseb kaitse keskkonnamuutujatel põhineva käitumise juurde ning kui
alistust pole määratud, on käitumine identne ainult keskkonnamuutujatel põhineva lahendusega.

Tuvastusallikad:

1. `sanitizeRequest()` paketist `@/shared/utils/inputSanitizer` (mujal konveieris
   kasutatav ühine detektorite komplekt).
2. Sisseehitatud `DEFAULT_GUARD_PATTERNS` (praegu `system_override_inline` ja
   `markdown_system_block`, mõlemad raskusastmega `high`).
3. Valikulised `customPatterns`, mis edastatakse konstruktori suvandite kaudu (stringid, regulaaravaldised
   või kirjed `{ name, pattern, severity }`).

Kui `mode === "block"` **ja** vähemalt üks tuvastus vastab raskusastme
lävele, tagastab `preCall` väärtuse `{ block: true, message: "Request rejected:
suspicious content detected" }`. Režiimides `warn`/`log` kaitsemehhanism logib, kuid
lubab kutse. Ühine abifunktsioon `evaluatePromptInjection()` on samuti eksporditud
kutsujatele, kes peavad viipasid hindama registrit kasutamata.

**Skannimise piir (v3.8.20):** detektor kontrollib ühendatud viibatekstist ainult **esimest 16 KB** —
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baiti) failis
`src/shared/utils/inputSanitizer.ts`. Nii `detectInjection()` kui ka
`evaluatePromptInjection()` rakendavad enne mustrite tsükli käivitamist funktsiooni `slice(0, MAX_INJECTION_SCAN_BYTES)`.
Sisestusründe juhised asuvad sisendi alguse lähedal, seega piirab see regulaaravaldiste protsessori-/GC-kulu
sadade KB-de suuruste lastide puhul ilma tuvastusvõimet nõrgendamata (vt
#3932, #4041).

### Mandaadimaskija (`credentialMasker.ts`)

Töötab **mõlemas** etapis, vaikeahelas viimasena (prioriteet `95`). Redigeerib
väljaminevast lastist (sõnumi sisu, tööriistakutsete argumendid, tööriistade tulemused) **ja**
teenusepakkuja vastusest tuntud API-võtmete / salajaste lubade mustrid, et
viibale lisatud mandaat (või tööriista tulemuses tagasi kajastatud mandaat) ei lekiks
ülesvoolu teenusepakkujale ega tagasi kliendile.

- **Ainult sõnaselgel lubamisel**, sama põhimõte nagu isikuandmete redigeerimisel (range reegli #20 lähedane):
  keelatud, kui `settings.credentialRedactionEnabled === true` **või**
  `CREDENTIAL_REDACTION_ENABLED=true` pole määratud. Kui see on välja lülitatud, ei tee kaitsemehhanism midagi —
  see ei blokeeri ega kirjuta kunagi ümber.
- `redactCredentials()` läbib kogu lasti/vastuse puu (`walkValue()`,
  prototüübi saastamise eest kaitstud, tsüklite suhtes turvaline tänu `WeakSet`-ile) ja asendab vasted
  kohatäitjaga `[REDACTED:<type>]`, kloonides ainult tegelikult
  muutunud harud.
- `CREDENTIAL_PATTERNS` hõlmab LLM-teenusepakkujate võtmeid (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-i/SaaS-i lubasid (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), maksevõtmeid (Stripe, Square), pilveteenuste
  võtmeid (AWS-i juurdepääsuvõti, Twilio, SendGrid, Mailgun), privaatvõtmeid / JWT-sid,
  mandaate sisaldavaid ühendusstringe (`mongodb://user:pass@...` jne) ning
  üldist `Authorization`/`x-api-key`/`api-key`/`apikey` päiseväärtuse
  mustrit. Päisekujulised võtmed (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigeeritakse struktuurselt (ainult väärtus, skeemi eesliide, nagu
  `Bearer `/`Basic `, säilitatakse), mitte üldise tekstilise regulaaravaldise kaudu.
- Kaitsemehhanism ei blokeeri kunagi; see ainult kirjutab ümber (`modifiedPayload` /
  `modifiedResponse`) ja lisab annotatsioone (`meta.credentialsRedacted`, `meta.count`).

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
