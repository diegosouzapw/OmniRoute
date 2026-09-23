# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute'il on **kaks** protsessisisest, erineva ulatusega rajasüsteemi. Need
täiendavad teineteist; operaatorid peaksid teadma, kumba neist nad vaatavad.

## 1. Baiditasemel protsessiülene vastuvõtt (`chatBodyAdmission.ts`)

- **Ulatus:** puhverdatud päringukeha/kuhja tee marsruutidele `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` ja teistele vestluskujulistele marsruutidele. Kaitseb
  suurte programmeerimisagentide päringukehade põhjustatud kuhjamälu võimenduse eest (#4380).
- **Üks protsessiülene kontroller, mitte võtmekohased rajad (#10110).** Iga API-võti
  (räsitud) või `anonymous`-seanss kasutab vastuvõtul **sama** jagatud eelarvet —
  räsitud seansi ID-d kasutatakse AINULT õiglase ajastamise võtmena (ootajate
  tsükliline teenindamine), mitte kunagi mahu sektsioonina. Selle dokumendi varasem
  versioon kirjeldas sõltumatu mahuga võtmekohaseid radu; see mudel eemaldati
  muudatuses #10110, sest see võimaldas autentimata võltsitud mandaatidega
  protsessiülest piiri mitmekordistada.
- **Värav (#503-fanout): automaatselt tuletatud sisendi BAIDIEELARVE, mitte fikseeritud
  päringute arv.** Päringute arvul põhinev pärandpiirang `CHAT_MAX_HEAVY_IN_FLIGHT`
  (enne seda parandust vaikimisi `1`) vähendas programmeerimisagentide hargnemise
  (mitu alamagenti/CLI-d, päringukehad tavaliselt > 256 KB) tegeliku paralleelsuse
  ligikaudu üheni, mistõttu tagastati täiesti tavapärase koormuse korral 503.
  Nüüd rakendub see ainult siis, kui operaator määrab selgesõnaliselt
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Kui see on määramata, juhib vastuvõttu
  selle asemel `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — protsessi tegelikust
  mälupiirist automaatselt tuletatud eelarve (`src/shared/middleware/admissionBudget.ts`):
  25% V8 kuhja piirangu ja mis tahes cgroup'i/konteineri piirangu väiksemast väärtusest,
  jagatuna 8-kordse ajutise võimendusteguriga ning piiratud vahemikku 8 MiB kuni
  2 GiB. Selgesõnalistele ülekirjutustele kehtivad samad piirid. See skaleerub
  ilma keskkonnamuutujate häälestamiseta 512 MB konteinerist 32 GB lauaarvutini.
  Päringukeha, mis tegelikku eelarvesse ei mahu, lükatakse kohe tagasi veaga
  `413 body_exceeds_budget`; piiratud õiglasesse järjekorda lisatakse ainult
  omavahelist ressursikonkurentsi põhjustavad päringukehad, mida eraldi oleks
  võimalik teenindada. Mitme signaaliga reaalajas ressursisurve jälgija (V8 kuhja
  suhtarv, cgroup, PSI, OOM-sündmused — `open-sse/utils/resourcePressurePolicy.ts`)
  lühendab piiratud ooteaega `high` surve korral ja tõrjub päringu kohe veaga
  `503 resource_pressure` `critical` surve korral, enne kui ühtegi baiti üldse
  vastu võetakse. PSI-d loetakse võimaluse korral selle üksuse cgroup'i failist
  `memory.pressure` (`open-sse/utils/resourcePressureSampler.ts`);
  `/proc/pressure/memory` hõlmab kogu hosti ja seda kasutatakse ainult varuvariandina
  füüsilises keskkonnas / cgroup v1 korral, et saalimist kasutav host ei põhjustaks
  jõudeolevas konteineris 503 vastust.
- **Häälestamine:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — automaatselt tuletatud baidieelarve ülekirjutus
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — päringute arvul põhinev pärandpiirang, ainult valikulisel aktiveerimisel
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — järjekorra ooteaeg enne 503 vastust (vaikimisi 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — järjekorras olevate baitide kuhjamälu kaitseklapp (vaikimisi 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — alates
    muudatusest #10110 aegunud mittetoimivad sätted (konfiguratsiooni ühilduvuse nimel aktsepteeritakse, kuid eiratakse)
- **Aruanded:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — sealhulgas
  #503-fanout täiendused `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` ja `countCapEnabled`
  (vaikejuurutuses false — kinnitab, et tegelikult rakendub baidieelarve, mitte
  pärandiks olev päringute arvuline piirang).

## 2. Kohanduvad käitusaegsed virtuaalrajad (`open-sse/services/admission`)

- **Ulatus:** rentnikuvõtmepõhine vastuvõtt teenusepakkujale edastamiseks — järjekorra maksumus, latentsusest juhitud
  limiidi kohandamine, radade järjekorrad ja radade mõõdikud.
- **Lüliti:** **lubatakse soovi korral.** Keelatud, kui `OMNIROUTE_CHAT_VIRTUAL_LANES=true` pole määratud. Ilma selleta
  säilitab kohanduv kontroller jagatud järjekorra käitumise (kriteerium 1 probleemist #9654 kehtib ainult
  pärast seda, kui operaator on rajad lubanud).
- **Häälestamine:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + kohanduv konfiguratsioon (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Aruanded:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (läbipaistmatud raja-ID-d, mitte kunagi töötlemata
  võtmed) ja `virtualLanes` — hetktõmmise autoriteetne lipp, mis näitab, et rajad on sisse lülitatud.

## 3. Hargnemispäringud — sihtmärgipõhine vastuvõtt combo/fusioni jaoks (#9654, 2. etapp)

Combo (prioriteet / tsükliline valik) ja fusion hargnevad ühe ülempäringu all N mudelisihtmärgiks.
Alates #9654 2. etapist **kontrollitakse iga hargnemissihtmärki enne edastamist**
sihtmärgipõhise päringuga (`PerTargetAdmissionHook`, mille loob `createPerTargetAdmissionHook`)
**ülempäringu** rentnikuraja suhtes.

- **Ulatus:** iga combo, fusioni ja kaosemootori edastatav hargnemissihtmärk.
  Süsteemi 1 (baiditaseme) see ei mõjuta — see ei kontrolli kunagi hargnemissihtmärke.
- **Lüliti:** **lubatakse soovi korral koos süsteemiga 2.** Kui `OMNIROUTE_CHAT_VIRTUAL_LANES`
  pole määratud, ei tee see midagi — selles režiimis hoiab ülempäring juba jagatud järjekorra rendilepingut,
  seega loendaks kontrollimine combo sihtmärgid topelt ja lükkaks need tagasi.
- **Semantika:**
  - **Rangelt mitteblokeeriv — jäta vahele, ära pane kunagi järjekorda.** `maxWaitMs 0`: täis rada
    jätab sihtmärgi vahele ning selle asemel teenindab combo varumehhanism (või fusioni ellujäänud
    paneel). See on tahtlik: hargnemissihtmärk on üleliigne
    töö ja selle järjekorda panemine lisab koormust just sellele ummikule, mida rajad
    on mõeldud vältima. Seetõttu kehtib `defaultMaxWaitMs` **ainult ülempäringule**;
    hargnemispäringud ei oota kunagi ja teadlikult **puudub säte**, millega
    neid ootama panna (probleemi ajalugu näitab, et ootamissätted põhjustasid massiliste 502/504 vastuste klassi,
    mida #9654 ennetab — vaadake see uuesti üle ainult siis, kui operaator teatab, et vahele jäetud hargnemissihtmärgid
    kahjustavad vastuse kvaliteeti).
  - **Vabastamine vastuvõtmisel.** Vastuvõetud päring vabastab oma rendilepingu kohe: see on
    läbilaskevõime värav, mitte reserveering. Ülempäringu rendileping hõlmab hargnemist; veel N
    rendilepingu hoidmine paisutaks jagatud aktiivset maksumust ja põhjustaks teiste rentnike tagasilükkamise. See on parima võimaliku tulemuse põhimõttel,
    mitte reserveering: rada võib päringu ja edastamise vahel uuesti täituda, seega võib
    värav suure konkurentsi korral lubada päringu rajale, mis on sihtmärgi edastamise
    ajaks taas täis.
  - **Hinnastatakse tegeliku hargnemiskeha põhjal.** Päring hindab maksumust
    sihtmärgi tegeliku keha põhjal — sealhulgas selle `stream`
    lipust tuletatud päringuklassi järgi, täpselt nagu ülempäringu puhul — seega hinnastatakse fusioni paneeliliikmed (`stream: false`)
    vastavalt mittevoogedastusklassile, mida nad tegelikult kasutavad, ning prioriteedi-/RR-sihtmärgid
    vastavalt kasutaja taotlusele.
- **Aruanded:** esimesele sihtmärgile järgnev päringu vahelejätmine suurendab combo päringupõhist
  `fallbackCount` väärtust (kajastades olemasolevat varuvaliku semantikat; nähtav combo
  logides); fusion tagastab 503, kui kõik paneeliliikmed jäetakse vahele. Praegu
  hetktõmmisel **puudub koondloendur** (nt `virtualFanoutSkipped`) —
  kui operaator teatab, et ta ei suuda kindlaks teha, kui tihti rajavärav hargnemissihtmärke
  vahele jätab, on see ajend sellise loenduri lisamiseks.

## Kumb neist kuvatakse töölaual

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptiivsed virtuaalrajad** (süsteem 2).
- `adaptiveAdmission.virtualLanes === true` → jaotise 3 väljapoole hargnevad proovipäringud on
  samuti aktiivsed. Andmekoormus, milles `virtualLanes` puudub või on `false`, tähendab,
  et `OMNIROUTE_CHAT_VIRTUAL_LANES` pole määratud — baiditaseme rajad (süsteem 1) on
  endiselt aktiivsed, kuid miski `adaptiveAdmission` all (ega väljapoole hargnemise piiramine)
  ei rakendu enne selle lubamist.

## Miks mõlemad olemas on

Baiditaseme rajad piiravad mälumahukat parsimis-/tihendusteed; adaptiivsed rajad
piiravad väljastuskulu rentniku kohta. #9654 kriteeriumi 1 („ühe seansi koormuspuhang ei põhjusta
teisele 503 vastust“) jõustab süsteem 1 tingimusteta ja süsteem 2 pärast valikulist lubamist.

## 4. Pikad `/v1/responses` päringud ühes protsessis (terve puhvermaht)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) lisas
`tryAcquireHealthyHeadroom`, et lubada teine struktuurselt koormav päring,
kui kuhja kasutus jääb alla `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Funktsiooni
`admitChatRequest` kasutatav BYTE-tee (kehad ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
vaikimisi 256 KiB, sealhulgas `POST /v1/responses`) kasutab **sama** erandit.

See on toetatud **ühe protsessi** lahendus rohkem kui kahe samaaegse pika
SSE `/v1/responses` päringu jaoks: suurendage põhi- ja terve puhvermahu piire ainult nii palju,
kui kuhi ja kogu protsessi lennus olevate baitide eelarve (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) võimaldavad. Kümnete pikkade SSE klientide (40–50) korral on küsimus just selles mälueelarves,
mitte jäigas tootelimiidis „max 2“. Surve all olev kuhi jätab endiselt päringuid kõrvale,
tagastades uuesti proovitava `503`, et #7849 ei naaseks.

**Kuhjade arvu mitmekordistamiseks** käitage N sõltumatut `DATA_DIR`-i (#11024). Ärge kunagi kasutage
ühe SQLite-faili puhul seadet `replicas > 1` (#10350). See jaotis ei käsitle uuesti
DATA_DIR-i horisontaalse skaleerimise lahendust.
