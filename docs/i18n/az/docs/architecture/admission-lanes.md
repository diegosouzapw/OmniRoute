# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute müxtəlif əhatə dairələrinə malik **iki** proses-lokal zolaq sisteminə malikdir. Onlar
bir-birini tamamlayır; operatorlar hansına baxdıqlarını bilməlidirlər.

## 1. Bayt səviyyəsində proses üzrə qəbul (`chatBodyAdmission.ts`)

- **Əhatə dairəsi:** `POST /v1/chat/completions`, `/v1/messages`,
  `/v1/responses` və digər çat formalı marşrutlar üçün buferlənmiş gövdə/heap
  yolu. Böyük kodlaşdırma agenti gövdələrinin yaratdığı heap artımından qoruyur
  (#4380).
- **Hər açar üçün ayrıca zolaqlar deyil, proses üzrə vahid qlobal kontroller (#10110).**
  Hər API açarı (heşlənmiş) və ya `anonymous` sessiyası qəbul zamanı **eyni**
  ortaq büdcədən istifadə edir — heşlənmiş sessiya ID-si YALNIZ ədalətli
  planlaşdırma açarı kimi (gözləyənlərin round-robin qaydasında yönləndirilməsi
  üçün) istifadə olunur, heç vaxt tutum bölməsi kimi istifadə edilmir. Bu
  sənədin əvvəlki versiyasında müstəqil tutuma malik, hər açar üçün ayrıca
  zolaqlar təsvir edilirdi; həmin model #10110 çərçivəsində silindi, çünki
  autentifikasiyadan keçməmiş saxta etimadnamələrə proses üzrə həddi
  çoxaltmağa imkan verirdi.
- **Keçid (#503-fanout): sabit sorğu sayı deyil, avtomatik hesablanan qəbul BAYT
  büdcəsi.** Köhnə `CHAT_MAX_HEAVY_IN_FLIGHT` sorğu sayı limiti (bu düzəlişdən
  əvvəl standart olaraq `1`) kodlaşdırma agentlərinin fan-out işini (çoxsaylı
  subagentlər/CLI-lər, adətən > 256 KB olan gövdələr) təxminən 1 effektiv
  paralellik səviyyəsinə endirirdi və tamamilə normal yük altında 503 xətasına
  səbəb olurdu. İndi bu limit yalnız operator
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` dəyişənini açıq şəkildə təyin etdikdə
  tətbiq olunur. Təyin edilmədikdə qəbul əvəzinə
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ilə — prosesin real yaddaş limitindən
  avtomatik hesablanan büdcə ilə
  (`src/shared/middleware/admissionBudget.ts`) məhdudlaşdırılır: V8 heap limiti
  ilə istənilən cgroup/konteyner limitindən daha sərt olanının 25%-i götürülür,
  8x müvəqqəti genişlənmə əmsalına bölünür və 8 MiB ilə 2 GiB arasında
  məhdudlaşdırılır. Açıq şəkildə verilmiş dəyərlərə də eyni məhdudiyyətlər
  tətbiq olunur. Bu, heç bir mühit tənzimləməsi olmadan 512 MB-lıq konteynerdən
  32 GB-lıq masaüstü sistemə qədər avtomatik miqyaslanır. Effektiv büdcəyə
  sığmayan gövdə dərhal `413 body_exceeds_budget` xətası ilə rədd edilir;
  yalnız ayrı-ayrılıqda emal edilə bilən gövdələr arasındakı resurs rəqabəti
  məhdudlaşdırılmış ədalət növbəsinə daxil olur. Çoxsaylı canlı siqnallara
  əsaslanan resurs təzyiqi izləyicisi (V8 heap nisbəti, cgroup, PSI, OOM
  hadisələri — `open-sse/utils/resourcePressurePolicy.ts`) `high` təzyiq
  zamanı məhdud gözləmə müddətini qısaldır, `critical` təzyiq zamanı isə hər
  hansı bayt qəbul edilməzdən əvvəl yükü dərhal `503 resource_pressure` xətası
  ilə rədd edir. Mövcud olduqda PSI bu vahidin cgroup `memory.pressure`
  faylından oxunur (`open-sse/utils/resourcePressureSampler.ts`);
  `/proc/pressure/memory` bütün host üzrədir və yalnız fiziki serverdə /
  cgroup v1-də ehtiyat variant kimi istifadə olunur, beləliklə, svop istifadə
  edən host boş konteynerin 503 xətası qaytarmasına səbəb ola bilməz.
- **Tənzimləmə:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — avtomatik hesablanan bayt büdcəsini əvəz edən dəyər
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — köhnə sorğu sayı limiti, yalnız ayrıca aktivləşdirilir
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503-dən əvvəl növbədə gözləmə müddəti (standart olaraq `RATE_LIMIT_MAX_WAIT_MS`)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — növbədəki baytlar üçün heap klapanı (standart olaraq 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110-dan etibarən köhnəlmiş
    və heç bir əməliyyat yerinə yetirmir (konfiqurasiya uyğunluğu üçün qəbul edilir, nəzərə alınmır)
- **Hesabatlar:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — o
  cümlədən #503-fanout əlavələri: `inflightBytes`, `maxInflightBytes`,
  `budgetSource` (`v8_heap` | `cgroup` | `override`), `pressureSeverity` və
  `countCapEnabled` (standart yerləşdirmədə false — faktiki məhdudlaşdırıcının
  köhnə say limiti deyil, bayt büdcəsi olduğunu təsdiqləyir).

## 2. Adaptiv icra zamanı virtual zolaqları (`open-sse/services/admission`)

- **Əhatə dairəsi:** provayderə yönləndirmə üçün tenant açarı əsasında qəbul — növbə xərci, gecikmə əsasında
  limitin adaptasiyası, zolaq növbələri və zolaq metrikaları.
- **Aktivləşdirmə şərti:** **seçim əsasında.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` olmadıqda deaktivdir. Bu parametr olmadan
  adaptiv kontroller ortaq növbə davranışını saxlayır (#9654 məsələsinin 1-ci meyarı yalnız
  operator zolaqları aktivləşdirdikdən sonra ödənir).
- **Tənzimləmə:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptiv konfiqurasiya (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Hesabatlar:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (qeyri-şəffaf zolaq ID-ləri, heç vaxt xam
  açarlar deyil) və `virtualLanes` — ani görüntüdə «zolaqlar aktivdir» vəziyyətini göstərən mötəbər bayraq.

## 3. Fan-out yoxlamaları — combo/fusion üçün hər hədəf üzrə qəbul (#9654 Dalğa 2)

Combo (prioritet / dairəvi növbələmə) və fusion bir üst sorğu daxilində N model hədəfinə
fan-out edir. #9654 Dalğa 2-dən etibarən **hər bir fan-out hədəfi göndərilməzdən əvvəl**
**üst sorğunun** tenant zolağına qarşı hər hədəf üzrə yoxlama (`PerTargetAdmissionHook`,
`createPerTargetAdmissionHook` tərəfindən yaradılır) vasitəsilə yoxlanılır.

- **Əhatə dairəsi:** combo, fusion və xaos mühərriki tərəfindən göndərilən hər bir fan-out hədəfi.
  Sistem 1-ə (bayt səviyyəsi) təsir edilmir — o, fan-out hədəflərini heç vaxt yoxlamır.
- **Aktivləşdirmə şərti:** **sistem 2 ilə seçim əsasında.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  təyin edilmədikdə heç bir əməliyyat yerinə yetirilmir — həmin rejimdə üst sorğu artıq
  ortaq növbənin icarəsini saxlayır, buna görə də yoxlama xərci iki dəfə hesablaya və combo
  hədəflərini rədd edə bilər.
- **Semantika:**
  - **Ciddi şəkildə bloklamayan — növbəyə qoyma, ötür.** `maxWaitMs 0`: dolu zolaq
    hədəfi ötürür və əvəzinə combo-nun ehtiyat mexanizmi (və ya fusion-un sağ qalanlar
    paneli) xidmət göstərir. Bu, qəsdən belədir: fan-out hədəfi təkrarlanan
    işdir və onu növbəyə qoymaq zolaqların qarşısını almaq üçün nəzərdə tutulduğu
    sıxlığa daha çox yük əlavə edir. Buna görə `defaultMaxWaitMs` yalnız **üst sorğuya**
    tətbiq olunur; fan-out yoxlamaları heç vaxt gözləmir və onların gözləməsini təmin edən
    **heç bir parametr** qəsdən mövcud deyil (məsələlərin tarixçəsi göstərir ki, gözləmə
    parametrləri #9654-ün qarşısını aldığı kütləvi 502/504 sinfinə səbəb olub — buna yalnız
    operator ötürülən fan-out hədəflərinin cavab keyfiyyətinə zərər verdiyini bildirdikdə
    yenidən baxın).
  - **Qəbul zamanı buraxılış.** Qəbul edilmiş yoxlama öz icarəsini dərhal buraxır: bu,
    saxlama deyil, tutum qapısıdır. Üst sorğunun icarəsi fan-out-u əhatə edir; əlavə N
    icarəni saxlamaq ortaq aktiv xərci süni şəkildə artırar və digər tenantları rədd edər.
    Bu, rezervasiya deyil, mümkün olan ən yaxşı cəhddir: zolaq yoxlama ilə göndərilmə
    arasında yenidən dola bilər, buna görə də yüksək rəqabət şəraitində qapı hədəfi,
    göndərildiyi anda yenidən dolmuş zolağa qəbul edə bilər.
  - **Real fan-out gövdəsinə əsasən qiymətləndirilir.** Yoxlama xərci hədəfin faktiki
    gövdəsindən — üst sorğu yolu ilə eyni qaydada onun `stream` bayrağından çıxarılan
    sorğu sinfi də daxil olmaqla — qiymətləndirir; beləliklə, fusion panelinin üzvləri
    (`stream: false`) həqiqətən istifadə edəcəkləri axınsız sinfə, prioritet/RR
    hədəfləri isə istifadəçinin tələb etdiyi sinfə uyğun qiymətləndirilir.
- **Hesabatlar:** ilk hədəfdən sonrakı yoxlama ötürməsi combo-nun hər sorğu üzrə
  `fallbackCount` dəyərini artırır (mövcud ehtiyat semantikasını əks etdirir; combo
  jurnallarında görünür); hər bir panel üzvü ötürüldükdə fusion 503 qaytarır. Hazırda
  ani görüntüdə **heç bir ümumi sayğac** (məsələn, `virtualFanoutSkipped`) yoxdur —
  operator zolaq qapısının fan-out hədəflərini nə qədər tez-tez ötürdüyünü müəyyən edə
  bilmədiyini bildirərsə, bu, belə sayğacın əlavə edilməsi üçün əsasdır.

## İdarəetmə panelində hansı göstərilir

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptiv virtual zolaqlar** (sistem 2).
- `adaptiveAdmission.virtualLanes === true` → 3-cü bölmədəki fan-out yoxlamaları da
  aktivdir. `virtualLanes` sahəsi olmayan və ya `false` olan faydalı yük
  `OMNIROUTE_CHAT_VIRTUAL_LANES` dəyişəninin təyin edilmədiyini bildirir — bayt səviyyəli
  zolaqlar (sistem 1) hələ də aktivdir, lakin bu funksiya aktivləşdirilənədək
  `adaptiveAdmission` çərçivəsində heç nə (həmçinin fan-out keçid nəzarəti) qüvvədə deyil.

## Niyə hər ikisi mövcuddur

Bayt səviyyəli zolaqlar yaddaş tutumlu təhlil/sıxışdırma yolunu məhdudlaşdırır; adaptiv zolaqlar
isə hər bir tenant üzrə yönləndirmə xərcini məhdudlaşdırır. #9654-dəki 1-ci meyar (“bir sessiyanın
yük sıçrayışı digər sessiya üçün 503 xətasına səbəb olmur”) sistem 1 tərəfindən qeyd-şərtsiz,
sistem 2 tərəfindən isə seçim əsasında aktivləşdirildikdən sonra təmin edilir.

## 4. Bir prosesdə uzun `/v1/responses` (sağlam ehtiyat)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437), yığın
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` həddindən aşağı olduqda struktur baxımından
ağır ikinci sorğunun qəbul edilməsi üçün `tryAcquireHealthyHeadroom` əlavə etdi.
`admitChatRequest` tərəfindən istifadə edilən BYTE yolu (həcmi
`OMNIROUTE_CHAT_LARGE_BODY_BYTES` həddinə bərabər və ya ondan böyük olan gövdələr;
standart olaraq 256 KiB, o cümlədən `POST /v1/responses`) **eyni** güzəştdən istifadə edir.

Bu, iki ədəddən çox paralel uzun SSE `/v1/responses` üçün dəstəklənən
**bir prosesli** yanaşmadır: əsas limiti və sağlam ehtiyatı yalnız yığının və proses miqyaslı
emal edilən bayt büdcəsinin (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) imkan verdiyi qədər artırın. Onlarla uzun SSE klientinin (40–50) dəstəklənməsi
məhsulun sərt “maksimum 2” limiti deyil, məhz həmin yaddaş büdcəsi məsələsidir.
Təzyiq altındakı yığın yenə də təkrar cəhd edilə bilən `503` xətası ilə yükü azaldır ki,
#7849 geri qayıtmasın.

**Yığınların sayını artırmaq** üçün N müstəqil `DATA_DIR` (#11024) ilə işləyin.
Bir SQLite faylında heç vaxt `replicas > 1` istifadə etməyin (#10350). Bu bölmə
DATA_DIR miqyaslandırma yanaşmasının yenidən müzakirəyə açılması deyil.
