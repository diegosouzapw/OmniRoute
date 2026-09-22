# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ir **divas** procesa lokālas plūsmu sistēmas ar atšķirīgu tvērumu. Tās ir
savstarpēji papildinošas; operatoriem jāzina, kuru no tām viņi aplūko.

## 1. Baitu līmeņa procesa mēroga ielaišanas kontrole (`chatBodyAdmission.ts`)

- **Tvērums:** buferētā ķermeņa/kaudzes ceļš maršrutiem `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` un citiem tērzēšanas formāta maršrutiem. Aizsargā
  pret kaudzes izmantojuma pastiprināšanos lielu kodēšanas aģentu pieprasījumu ķermeņu dēļ (#4380).
- **Viens globāls kontrolieris visam procesam, nevis atsevišķas joslas katrai atslēgai (#10110).** Katra API atslēga
  (jaukta) vai `anonymous` sesija tiek ielaista, izmantojot **vienu un to pašu** kopīgo budžetu —
  jauktais sesijas ID tiek izmantots TIKAI kā godīgas plānošanas atslēga (cikliska
  gaidītāju apkalpošana), nekad kā kapacitātes nodalījums. Iepriekšējā šī
  dokumenta versijā tika aprakstītas atsevišķas joslas katrai atslēgai ar neatkarīgu kapacitāti; šis modelis tika
  noņemts izmaiņā #10110, jo tas ļāva neautentificētiem viltotiem akreditācijas datiem vairākkārt palielināt
  procesa mēroga ierobežojumu.
- **Vārteja (#503-fanout): automātiski atvasināts uzņemšanas BAITU budžets, nevis fiksēts pieprasījumu
  skaits.** Vēsturiskais `CHAT_MAX_HEAVY_IN_FLIGHT` pieprasījumu skaita ierobežojums (pirms
  šī labojuma noklusējuma vērtība bija `1`) samazināja kodēšanas aģentu paralēlo izvēršanu (vairāki apakšaģenti/CLI,
  ķermeņi parasti > 256 KB) līdz faktiskajai vienlaicībai ~1, tādēļ pilnīgi normālas
  slodzes apstākļos tika atgriezts 503. Tagad tas ir saistošs tikai tad, ja operators skaidri
  iestata `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Ja tas nav iestatīts, ielaišanu
  tā vietā ierobežo `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — budžets, kas automātiski atvasināts no
  procesa reālā atmiņas ierobežojuma (`src/shared/middleware/admissionBudget.ts`):
  25% no mazākā starp V8 kaudzes ierobežojumu un jebkuru cgroup/konteinera ierobežojumu,
  dalīti ar īslaicīgā pastiprinājuma koeficientu 8x un ierobežoti diapazonā no 8 MiB līdz
  2 GiB. Tieši norādītām vērtībām tiek piemēroti tie paši ierobežojumi. Tas automātiski mērogojas no
  512 MB konteinera līdz 32 GB galddatoram bez vides mainīgo pielāgošanas. Ķermenim, kas nevar
  ietilpt faktiskajā budžetā, nekavējoties tiek atgriezts `413 body_exceeds_budget`;
  ierobežotajā godīguma rindā nonāk tikai savstarpēji konkurējoši ķermeņi, kurus katru atsevišķi būtu iespējams apkalpot.
  Aktīvs vairāku signālu resursu noslodzes izsekotājs (V8 kaudzes attiecība,
  cgroup, PSI, OOM notikumi — `open-sse/utils/resourcePressurePolicy.ts`) saīsina
  ierobežoto gaidīšanas laiku `high` noslodzes gadījumā un nekavējoties noraida pieprasījumus ar
  `503 resource_pressure` `critical` noslodzes gadījumā, vēl pirms ir uzņemts kaut viens baits.
  Ja pieejams, PSI tiek nolasīts no šīs vienības cgroup faila `memory.pressure`
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` attiecas
  uz visu resursdatoru un tiek izmantots tikai kā rezerves variants fiziskā serverī / cgroup v1, tādēļ resursdators,
  kas izmanto mijmaiņas atmiņu, nevar izraisīt 503 dīkstāvē esošā konteinerā.
- **Pielāgošana:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — automātiski atvasinātā baitu budžeta pārrakstīšana
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — vēsturiskais pieprasījumu skaita ierobežojums, tikai pēc izvēles
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — gaidīšanas laiks rindā pirms 503 (noklusējums: 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — rindā esošo baitu kaudzes drošības vārsts (noklusējums: 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — novecojuši
    bezdarbības iestatījumi kopš #10110 (tiek pieņemti konfigurācijas saderībai, bet ignorēti)
- **Pārskati:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — tostarp
  #503-fanout papildinājumi `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` un `countCapEnabled`
  (noklusējuma izvietojumā `false` — apstiprina, ka faktiski saistošs ir baitu budžets, nevis vēsturiskais
  skaita ierobežojums).

## 2. Adaptīvas izpildlaika virtuālās joslas (`open-sse/services/admission`)

- **Tvērums:** nomnieka atslēgas pielaide pakalpojumu sniedzēja izsaukšanai — rindas izmaksas, latentuma vadīta
  ierobežojumu pielāgošana, ievietošana joslu rindās un joslu metrika.
- **Aktivizēšana:** **pēc izvēles.** Atspējots, ja vien `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Bez tā
  adaptīvais kontrolieris saglabā koplietotās rindas darbību (#9654 1. kritērijs ir spēkā tikai
  pēc tam, kad operators ir iespējojis joslas).
- **Regulēšana:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptīvā konfigurācija (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Pārskati:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (necaurredzami joslu ID, nekad neapstrādātas
  atslēgas) un `virtualLanes` — momentuzņēmumā autoritatīvais karogs, kas norāda, ka joslas ir ieslēgtas.

## 3. Izvēršanas zondes — pielaide katram combo/fusion mērķim (#9654, 2. posms)

Combo (prioritātes / cikliskās secības) un fusion viena vecākpieprasījuma ietvaros izvērš N modeļu
mērķus. Kopš #9654 2. posma **katrs izvēršanas mērķis pirms izsaukšanas tiek pārbaudīts** ar
katram mērķim paredzētu zondi (`PerTargetAdmissionHook`, ko izveido `createPerTargetAdmissionHook`)
attiecībā pret **vecākpieprasījuma** nomnieka joslu.

- **Tvērums:** katrs combo, fusion un haosa dzinēja izsauktais izvēršanas mērķis.
  1. sistēma (baitu līmeņa) netiek ietekmēta — tā nekad nepārbauda izvēršanas mērķus.
- **Aktivizēšana:** **pēc izvēles kopā ar 2. sistēmu.** Nedarbojas, ja `OMNIROUTE_CHAT_VIRTUAL_LANES`
  nav iestatīts — šajā režīmā vecākpieprasījumam jau ir koplietotās rindas noma,
  tāpēc pārbaude veiktu dubultu uzskaiti un noraidītu combo mērķus.
- **Semantika:**
  - **Stingri nebloķējoša — izlaist, nekad neievietot rindā.** `maxWaitMs 0`: pilna josla
    izlaiž mērķi, un tā vietā apkalpo combo atkāpšanās mehānisms (vai fusion izdzīvojušo
    panelis). Tas ir apzināti: izvēršanas mērķis ir lieks
    darbs, un tā ievietošana rindā rada papildu slodzi tieši tajā sastrēgumā, kura
    novēršanai joslas ir paredzētas. Tāpēc `defaultMaxWaitMs` attiecas **tikai uz vecākpieprasījumu**;
    izvēršanas zondes nekad negaida, un apzināti **nav iestatījuma**, kas ļautu
    tām gaidīt (problēmas vēsture rāda, ka gaidīšanas iestatījumi izraisīja masveida 502/504 kļūdas,
    kuras #9654 novērš — pārskatīt tikai tad, ja operators ziņo, ka izlaistie izvēršanas mērķi
    pasliktina atbildes kvalitāti).
  - **Atbrīvošana pēc pielaides.** Pielaista zonde nekavējoties atbrīvo savu nomu: tā ir
    kapacitātes pārbaude, nevis rezervācija. Vecākpieprasījuma noma aptver izvēršanu; N
    papildu nomu turēšana palielinātu koplietojamās aktīvās kapacitātes izmaksas un izraisītu citu nomnieku noraidīšanu. Tas ir labākā iespējamā rezultāta
    princips, nevis rezervācija: josla var atkal piepildīties starp pārbaudi un izsaukšanu, tāpēc
    lielas konkurences apstākļos pārbaude var pielaist mērķi joslā, kas līdz
    mērķa izsaukšanas brīdim atkal ir pilna.
  - **Izmaksas tiek aprēķinātas no faktiskā izvēršanas satura.** Zonde novērtē izmaksas pēc
    mērķa faktiskā satura — tostarp pieprasījuma klases, kas atvasināta no tā `stream`
    karoga, tieši tāpat kā vecākpieprasījuma ceļā — tādēļ fusion paneļa dalībniekiem (`stream: false`)
    tiek noteikta cena atbilstoši neplūsmošanas klasei, kuru tie patiešām izmantos, bet prioritātes/RR
    mērķiem — atbilstoši lietotāja pieprasījumam.
- **Pārskati:** zondes izlaists mērķis pēc pirmā mērķa palielina combo katra pieprasījuma
  `fallbackCount` (atspoguļojot esošo atkāpšanās semantiku; redzams combo
  žurnālos); fusion atgriež 503, ja tiek izlaisti visi paneļa dalībnieki. Pašlaik momentuzņēmumā
  **nav apkopota skaitītāja** (piem., `virtualFanoutSkipped`) —
  ja operators ziņo, ka nevar noteikt, cik bieži joslas pārbaude izlaiž izvēršanas
  mērķus, tas ir pamats šāda skaitītāja pievienošanai.

## Kurš no tiem ir redzams informācijas panelī

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptīvās virtuālās joslas** (2. sistēma).
- `adaptiveAdmission.virtualLanes === true` → aktīvas ir arī 3. sadaļā aprakstītās
  paralēlās pārbaudes. Ja lietderīgajā slodzē `virtualLanes` nav norādīts vai tā vērtība ir `false`, tas nozīmē,
  ka `OMNIROUTE_CHAT_VIRTUAL_LANES` nav iestatīts — baitu līmeņa joslas (1. sistēma)
  joprojām ir aktīvas, taču nekas sadaļā `adaptiveAdmission` (un nekāda paralēlās izpildes ierobežošana)
  nestājas spēkā, kamēr tas nav iespējots.

## Kāpēc pastāv abas sistēmas

Baitu līmeņa joslas ierobežo atmiņietilpīgo parsēšanas/saspiešanas ceļu; adaptīvās joslas
ierobežo nosūtīšanas izmaksas katram nomniekam. #9654 1. kritēriju („vienas sesijas pieprasījumu vilnis
neizraisa 503 citai sesijai”) bez nosacījumiem nodrošina 1. sistēma, bet 2. sistēma — pēc izvēles iespējošanas.

## 4. Ilgstoši `/v1/responses` vienā procesā (veselīgas rezerves)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) pievienoja
`tryAcquireHealthyHeadroom`, lai tiktu pieņemts otrs strukturāli apjomīgs pieprasījums,
kad kaudzes izmantojums ir zemāks par `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. BYTE
ceļš, ko izmanto `admitChatRequest` (ķermeņiem ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
pēc noklusējuma 256 KiB, tostarp `POST /v1/responses`), izmanto **to pašu** izņēmumu.

Šis ir atbalstītais risinājums **vienam procesam**, lai vienlaikus apstrādātu vairāk nekā divus ilgstošus
SSE `/v1/responses`: palieliniet primāro limitu un veselīgās rezerves tikai tik daudz, cik pieļauj kaudze
un visa procesa izpildē esošo baitu budžets (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Desmitiem ilgstošu SSE klientu (40–50) ir jautājums par šo atmiņas budžetu,
nevis stingrs produkta ierobežojums „maks. 2”. Noslogota kaudze joprojām noraida pieprasījumus ar
atkārtojamu `503`, lai #7849 neatkārtotos.

Lai **pavairotu kaudzes**, palaidiet N neatkarīgus `DATA_DIR` (#11024). Nekad neizmantojiet
`replicas > 1` vienam SQLite failam (#10350). Šī sadaļa atkārtoti neapskata
DATA_DIR horizontālās mērogošanas risinājumu.
