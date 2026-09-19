# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute turi **dvi** proceso vietiniu mastu veikiančias kanalų sistemas, kurių taikymo sritys skiriasi. Jos yra
viena kitą papildančios; operatoriai turėtų žinoti, kurią iš jų stebi.

## 1. Baitų lygmens viso proceso priėmimas (`chatBodyAdmission.ts`)

- **Taikymo sritis:** buferizuoto turinio / kaupo kelias, skirtas `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` ir kitiems pokalbio formato maršrutams. Apsaugo
  nuo kaupo išsipūtimo dėl didelių programavimo agentų užklausų turinių (#4380).
- **Vienas visam procesui bendras valdiklis, o ne kiekvienam raktui skirti kanalai (#10110).** Kiekvienas API raktas
  (maišos pavidalu) arba `anonymous` seansas priimamas pagal **tą patį** bendrą biudžetą —
  seanso identifikatoriaus maišos reikšmė naudojama TIK kaip sąžiningo planavimo raktas (ciklinis
  laukiančiųjų paskirstymas), bet niekada kaip pajėgumo segmentas. Ankstesnėje šio
  dokumento versijoje buvo aprašyti kiekvienam raktui skirti kanalai su nepriklausomu pajėgumu; šio modelio
  atsisakyta #10110 pakeitime, nes jis leido naudojant netikrus neautentifikuotus kredencialus padauginti
  visam procesui taikomą ribą.
- **Užkarda (#503-fanout): automatiškai nustatomas priėmimo BAITŲ biudžetas, o ne fiksuotas užklausų
  skaičius.** Ankstesnė `CHAT_MAX_HEAVY_IN_FLIGHT` užklausų skaičiaus riba (iki šio pataisymo numatytoji reikšmė buvo `1`)
  sumažindavo programavimo agentų lygiagretų išsišakojimą (keli pagalbiniai agentai / CLI,
  užklausų turiniai įprastai > 256 KB) iki faktinio ~1 lygiagretumo, todėl esant visiškai įprastai apkrovai
  būdavo grąžinama 503 klaida. Dabar ši riba taikoma tik tada, kai operatorius aiškiai
  nustato `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Jei šis kintamasis nenustatytas, priėmimą
  riboja `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — biudžetas, automatiškai nustatomas pagal
  realią proceso atminties ribą (`src/shared/middleware/admissionBudget.ts`):
  25 % griežtesnės iš V8 kaupo ribos ir bet kokios cgroup / konteinerio ribos,
  padalijus iš 8x laikinojo išsipūtimo koeficiento ir apribojus reikšmę nuo 8 MiB iki
  2 GiB. Aiškiai nurodytoms reikšmėms taikomos tos pačios ribos. Taip biudžetas automatiškai prisitaiko nuo
  512 MB konteinerio iki 32 GB stalinio kompiuterio, nereikalaujant derinti aplinkos kintamųjų. Užklausos turinys, kuris
  netelpa į galiojantį biudžetą, iš karto atmetamas su `413 body_exceeds_budget`;
  į ribotą sąžiningumo eilę patenka tik konkurencija tarp atskirai aptarnaujamų užklausų turinių.
  Tiesiogiai veikiantis kelių signalų išteklių apkrovos sekiklis (V8 kaupo santykis,
  cgroup, PSI, OOM įvykiai — `open-sse/utils/resourcePressurePolicy.ts`) sutrumpina
  ribotą laukimo laiką esant `high` apkrovai ir iš karto atmeta užklausas su
  `503 resource_pressure`, kai apkrova yra `critical`, dar prieš priimant bent vieną
  baitą.
- **Derinimas:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — automatiškai nustatomo baitų biudžeto perrašymas
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ankstesnė užklausų skaičiaus riba, taikoma tik pasirinktinai ją įjungus
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — laukimo eilėje trukmė prieš grąžinant 503 (numatytoji reikšmė 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — eilėje esančių baitų kaupo vožtuvas (numatytoji reikšmė 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — nuo #10110 nebenaudojami
    ir neatliekantys jokių veiksmų (priimami dėl konfigūracijos suderinamumo, tačiau ignoruojami)
- **Ataskaitos:** `GET /api/monitoring/health` → `chatAdmission` (#11244), įskaitant
  #503-fanout papildymus `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` ir `countCapEnabled`
  (numatytajame diegime reikšmė yra false — tai patvirtina, kad faktiškai riboja baitų biudžetas, o ne ankstesnė
  užklausų skaičiaus riba).

## 2. Adaptyvios vykdymo aplinkos virtualios juostos (`open-sse/services/admission`)

- **Aprėptis:** priėmimas pagal nuomininko raktą teikėjo išsiuntimui — eilės kaina, delsa
  grindžiamas ribų pritaikymas, skirstymas į juostų eiles ir juostų metrikos.
- **Įjungimas:** **pasirenkamas.** Išjungta, jei nenustatyta `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Be jos
  adaptyvusis valdiklis išlaiko bendros eilės veikseną (#9654 1 kriterijus
  tenkinamas tik operatoriui įjungus juostas).
- **Derinimas:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptyvioji konfigūracija (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Ataskaitos:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (nepermatomi juostų ID, niekada ne pirminiai
  raktai) ir `virtualLanes` — momentinėje kopijoje esanti autoritetinga „juostos įjungtos“ vėliavėlė.

## 3. Išsišakojančios patikros — kiekvieno taikinio priėmimas combo/fusion režimams (#9654, 2 etapas)

Combo (prioriteto / ciklinio paskirstymo) ir fusion režimai išsišakoja į N modelių taikinių pagal vieną pirminę
užklausą. Nuo #9654 2 etapo **kiekvienas išsišakojimo taikinys prieš išsiunčiant patikrinamas** naudojant
kiekvienam taikiniui skirtą patikrą (`PerTargetAdmissionHook`, sukurtą naudojant `createPerTargetAdmissionHook`)
pagal **pirminės užklausos** nuomininko juostą.

- **Aprėptis:** kiekvienas išsišakojimo taikinys, kurį išsiunčia combo, fusion ir chaoso variklis.
  1 sistema (baitų lygmens) nepaveikiama — ji niekada netikrina išsišakojimo taikinių.
- **Įjungimas:** **pasirenkamas kartu su 2 sistema.** Neatlieka jokių veiksmų, kai `OMNIROUTE_CHAT_VIRTUAL_LANES`
  nenustatytas — tokiu režimu pirminė užklausa jau turi bendros eilės nuomą,
  todėl tikrinimas skaičiuotų du kartus ir atmestų combo taikinius.
- **Semantika:**
  - **Griežtai neblokuojanti — praleisti, niekada nestatyti į eilę.** `maxWaitMs 0`: pilna juosta
    praleidžia taikinį, o vietoje jo aptarnauja combo atsarginis mechanizmas (arba fusion išlikusių taikinių
    skydelis). Tai daroma sąmoningai: išsišakojimo taikinys yra perteklinis
    darbas, o jo statymas į eilę dar labiau apkrauna būtent tą perkrovą, kurią juostos turi
    sustabdyti. Todėl `defaultMaxWaitMs` taikomas **tik pirminei užklausai**;
    išsišakojimo patikros niekada nelaukia ir sąmoningai **nėra parametro**, leidžiančio
    joms laukti (problemos istorija rodo, kad laukimo parametrai sukėlė masinių 502/504 klaidų klasę,
    kurios #9654 padeda išvengti — persvarstyti tik jei operatorius praneša, kad praleisti išsišakojimo taikiniai
    blogina atsakymo kokybę).
  - **Atleisti priėmus.** Priimta patikra iškart atleidžia savo nuomą: tai yra
    pajėgumo vartai, o ne rezervavimas. Pirminės užklausos nuoma apima išsišakojimą; laikant dar N
    nuomų būtų išpūsta bendroji aktyvi kaina ir atmestos kitų nuomininkų užklausos. Geriausių pastangų principas,
    o ne rezervacija: tarp patikros ir išsiuntimo juosta gali vėl užsipildyti, todėl esant
    didelei konkurencijai vartai gali įleisti į juostą, kuri taikinio
    išsiuntimo metu jau vėl yra pilna.
  - **Kaina apskaičiuojama pagal tikrąjį išsišakojimo turinį.** Patikra įvertina kainą pagal
    faktinį taikinio turinį — įskaitant iš jo `stream` vėliavėlės išvestą užklausos klasę,
    lygiai taip pat kaip pirminės užklausos kelyje — todėl fusion skydelio nariai (`stream: false`)
    įkainojami pagal neperduodamų srautu užklausų klasę, kurią jie iš tikrųjų užims, o prioriteto / RR
    taikiniai — pagal naudotojo užklausą.
- **Ataskaitos:** patikrai praleidus taikinį po pirmojo taikinio, padidinamas combo kiekvienos užklausos
  `fallbackCount` (atitinkant esamą atsarginio mechanizmo semantiką; matoma combo
  žurnaluose); fusion grąžina 503, kai praleidžiami visi skydelio nariai. Šiuo metu momentinėje kopijoje
  **nėra agreguoto skaitiklio** (pvz., `virtualFanoutSkipped`) —
  jei operatorius praneša negalintis nustatyti, kaip dažnai juostos vartai praleidžia išsišakojimo
  taikinius, tai yra signalas tokį skaitiklį pridėti.

## Kuris rodomas valdymo skydelyje

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptyviosios virtualios juostos** (2 sistema).
- `adaptiveAdmission.virtualLanes === true` → 3 skyriaus išskaidytos užklausos
  taip pat yra aktyvios. Jei naudingojoje apkrovoje `virtualLanes` nėra arba jo reikšmė yra `false`, tai reiškia,
  kad `OMNIROUTE_CHAT_VIRTUAL_LANES` nenustatytas — baitų lygmens juostos (1 sistema)
  vis tiek aktyvios, tačiau niekas, kas priklauso `adaptiveAdmission` (taip pat ir išskaidymo ribojimas),
  neveikia, kol ši funkcija neįjungta.

## Kodėl egzistuoja abi sistemos

Baitų lygmens juostos riboja daug atminties naudojantį analizavimo / glaudinimo kelią, o adaptyviosios juostos
riboja siuntimo sąnaudas kiekvienam nuomininkui. #9654 1 kriterijus („vieno seanso apkrovos šuolis nesukelia 503
kitam“) besąlygiškai užtikrinamas 1 sistemos, o įjungus pasirenkamąją funkciją — ir 2 sistemos.

## 4. Ilgos `/v1/responses` viename procese (pakankamas laisvų išteklių rezervas)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) pridėjo
`tryAcquireHealthyHeadroom`, kad būtų priimama antra struktūriškai sudėtinga užklausa,
kai krūva nesiekia `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. BYTE
kelias, kurį naudoja `admitChatRequest` (kūnai ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
numatytoji reikšmė — 256 KiB, įskaitant `POST /v1/responses`), naudoja **tą pačią** išimtį.

Tai yra palaikomas **vieno proceso** būdas vykdyti daugiau nei dvi lygiagrečias ilgas
SSE `/v1/responses`: didinkite pagrindinę ribą ir pakankamo laisvų išteklių rezervo ribą tik tiek, kiek leidžia krūva
ir viso proceso vykdomų užklausų baitų biudžetas (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Dešimtys ilgų SSE klientų (40–50) yra atminties biudžeto
klausimas, o ne griežtas produkto apribojimas „daugiausia 2“. Esant spaudimui krūvai, užklausos vis tiek atmetamos
su pakartotinai bandyti leidžiančiu `503`, kad nepasikartotų #7849.

Norėdami **padauginti krūvas**, paleiskite N nepriklausomų `DATA_DIR` egzempliorių (#11024). Niekada nenaudokite
`replicas > 1` su vienu SQLite failu (#10350). Šiame skyriuje
iš naujo nesvarstomas mastelio didinimo naudojant DATA_DIR būdas.
