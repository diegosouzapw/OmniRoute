# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute има **два** система локалних трака на нивоу процеса, са различитим опсезима деловања. Они се
међусобно допуњују; оператори треба да знају који од њих посматрају.

## 1. Пријем на нивоу бајтова за цео процес (`chatBodyAdmission.ts`)

- **Обухват:** путања баферованог тела/heap меморије за `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` и остале руте обликоване као ћаскање. Штити
  од увећања употребе heap меморије услед великих тела захтева агената за програмирање (#4380).
- **Један глобални контролер по процесу, а не засебне траке по кључу (#10110).** Сваки API кључ
  (хеширан) или `anonymous` сесија користи **исти** дељени буџет —
  хеширани идентификатор сесије користи се ИСКЉУЧИВО као кључ за правично распоређивање (round-robin
  распоређивање захтева на чекању), никада као засебна партиција капацитета. Претходна верзија овог
  документа описивала је траке по кључу са независним капацитетом; тај модел је
  уклоњен у #10110 јер је омогућавао да лажни неаутентификовани акредитиви вишеструко увећају
  ограничење на нивоу целог процеса.
- **Пропусна контрола (#503-fanout): аутоматски изведен БАЈТНИ буџет за унос, а не фиксни број
  захтева.** Застарело ограничење броја захтева `CHAT_MAX_HEAVY_IN_FLIGHT` (подразумевано `1`
  пре ове исправке) сводило је разгранавање агената за програмирање (више подагената/CLI-јева,
  тела која су редовно > 256 KB) на ефективну конкурентност од ~1, што је доводило до одговора 503
  под потпуно нормалним оптерећењем. Сада се примењује само када оператер изричито
  постави `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Ако није постављено, пријем је уместо тога
  ограничен помоћу `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — буџета који се аутоматски изводи из
  стварног меморијског ограничења процеса (`src/shared/middleware/admissionBudget.ts`):
  25% строжег ограничења између V8 heap лимита и било ког cgroup/container лимита,
  подељено фактором пролазног увећања од 8x, уз ограничење између 8 MiB и
  2 GiB. Изричита подешавања користе иста ограничења. Ово се аутоматски прилагођава од
  контејнера од 512 MB до десктопа са 32 GB, без подешавања окружења. Тело које не може
  да стане у ефективни буџет одмах се одбија са `413 body_exceeds_budget`;
  само надметање између тела која се појединачно могу обрадити улази у ограничени
  ред са правичним распоређивањем. Активни пратилац притиска на ресурсе са више сигнала (однос V8 heap меморије,
  cgroup, PSI, OOM догађаји — `open-sse/utils/resourcePressurePolicy.ts`) скраћује
  ограничено чекање под притиском `high` и одмах одбацује захтеве са
  `503 resource_pressure` под притиском `critical`, пре него што се иједан бајт уопште
  унесе. PSI се чита из cgroup датотеке `memory.pressure` ове јединице када постоји
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` важи
  за цео хост и користи се само као резервна опција на физичком серверу / cgroup v1, тако да хост
  који користи swap меморију не може да изазове 503 у неактивном контејнеру.
- **Подешавање:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — замена за аутоматски изведен бајтни буџет
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — застарело ограничење броја захтева, само уз изричито укључивање
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — чекање у реду пре одговора 503 (подразумевано 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap вентил за бајтове у реду (подразумевано 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — застареле
    опције без дејства од #10110 (прихватају се ради компатибилности конфигурације, али се занемарују)
- **Извештаји:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — укључујући
  додатке из #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` и `countCapEnabled`
  (false у подразумеваном окружењу — потврђује да се заиста примењује бајтни буџет, а не застарело
  ограничење броја захтева).

## 2. Адаптивне виртуелне траке током извршавања (`open-sse/services/admission`)

- **Опсег:** контрола пријема по кључу закупца за прослеђивање добављачу — трошак реда, прилагођавање
  ограничења вођено кашњењем, стављање у ред по тракама и метрике трака.
- **Услов:** **укључује се по избору.** Онемогућено је осим ако је `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Без тога,
  адаптивни контролер задржава понашање дељеног реда (критеријум 1 из #9654 важи тек
  када оператер омогући траке).
- **Подешавање:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + адаптивна конфигурација (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Извештаји:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (непрозирни ID-ови трака, никада необрађени
  кључеви) и `virtualLanes` — меродавна заставица „траке су укључене“ у снимку стања.

## 3. Fan-out провере — контрола пријема по циљу за combo/fusion (#9654, Талас 2)

Combo (приоритетни / кружни) и fusion прослеђују захтев ка N циљних модела у оквиру једног надређеног
захтева. Од #9654, Талас 2, **сваки fan-out циљ пролази контролу пре прослеђивања** путем
провере по циљу (`PerTargetAdmissionHook`, коју гради `createPerTargetAdmissionHook`)
у односу на траку закупца **надређеног** захтева.

- **Опсег:** сваки fan-out циљ који прослеђују combo, fusion и механизам хаоса.
  Систем 1 (на нивоу бајтова) остаје непромењен — он никада не проверава fan-out циљеве.
- **Услов:** **укључује се по избору заједно са системом 2.** Не ради ништа када
  `OMNIROUTE_CHAT_VIRTUAL_LANES` није постављен — надређени захтев у том режиму већ држи закуп
  дељеног реда, па би провера двоструко обрачунала трошак и одбацила combo циљеве.
- **Семантика:**
  - **Строго неблокирајуће — прескочи, никада не стављај у ред.** `maxWaitMs 0`: пуна трака
    доводи до прескакања циља, па га уместо тога опслужује combo механизам за прелазак на резерву
    (или fusion панел преосталих циљева). Ово је намерно: fan-out циљ представља сувишан
    рад, а његово стављање у ред додаје још оптерећења управо на загушење које траке треба
    да спрече. Зато се `defaultMaxWaitMs` примењује **само на надређени захтев**;
    fan-out провере никада не чекају и намерно **не постоји параметар** којим би се
    чекање омогућило (историја проблема показује да су параметри чекања изазивали масовне грешке
    класе 502/504 које #9654 спречава — поново размотрити само ако оператер пријави да
    прескочени fan-out циљеви нарушавају квалитет одговора).
  - **Ослобађање при пријему.** Прихваћена провера одмах ослобађа свој закуп: она је
    капија капацитета, а не задржавање. Закуп надређеног захтева покрива fan-out; задржавање још N
    закупа би увећало дељени активни трошак и довело до одбијања других закупаца. По принципу најбољег покушаја,
    а не као резервација: трака се може поново попунити између провере и прослеђивања, па под
    великим надметањем капија може одобрити пријем у траку која је поново пуна до
    тренутка прослеђивања циља.
  - **Цена се одређује на основу стварног fan-out тела.** Провера процењује трошак из
    стварног тела циља — укључујући класу захтева изведену из његове заставице `stream`,
    потпуно исто као на путањи надређеног захтева — тако да се члановима fusion панела (`stream: false`)
    цена одређује према класи без стримовања коју ће заиста заузети, а приоритетним/RR
    циљевима према ономе што је корисник затражио.
- **Извештаји:** прескакање провере после првог циља увећава combo вредност
  `fallbackCount` за тај захтев (одражавајући постојећу семантику преласка на резерву; видљиво у combo
  евиденцијама); fusion враћа 503 када су сви чланови панела прескочени. Тренутно
  **не постоји збирни бројач** (нпр. `virtualFanoutSkipped`) у снимку стања —
  ако оператер пријави да не може да утврди колико често капија траке прескаче fan-out
  циљеве, то је повод да се такав бројач дода.

## Који се приказује на контролној табли

- `adaptiveAdmission.laneCount` / `laneTenants` → **адаптивне виртуелне траке** (систем 2).
- `adaptiveAdmission.virtualLanes === true` → активне су и fan-out провере из одељка 3.
  Ако у payload-у `virtualLanes` недостаје или има вредност `false`, то значи да
  `OMNIROUTE_CHAT_VIRTUAL_LANES` није постављена — траке на нивоу бајтова (систем 1)
  и даље су активне, али ништа у оквиру `adaptiveAdmission` (нити fan-out
  ограничавање) не важи док се ова опција не омогући.

## Зашто постоје оба система

Траке на нивоу бајтова ограничавају путању рашчлањивања/компресије која интензивно
користи меморију; адаптивне траке ограничавају трошак отпремања по закупцу. Критеријум
1 из #9654 („налет саобраћаја једне сесије не доводи до одговора 503 за другу“)
безусловно спроводи систем 1, а систем 2 када је изричито омогућен.

## 4. Дуги `/v1/responses` у једном процесу (резерва при здравом стању)

У [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) додат је
`tryAcquireHealthyHeadroom`, тако да се други структурно захтеван захтев прихвата
када је заузеће heap меморије испод `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`.
BYTE путања коју користи `admitChatRequest` (тела ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
подразумевано 256 KiB, укључујући `POST /v1/responses`) користи **исти** изузетак.

Ово је подржани рецепт за **један процес** за више од два истовремена дуга SSE
`/v1/responses`: повећајте примарни лимит и резерву при здравом стању само онолико
колико дозвољавају heap меморија и буџет бајтова захтева у обради на нивоу целог
процеса (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Десетине дуготрајних SSE
клијената (40–50) представљају питање тог меморијског буџета, а не чврсто
ограничење производа на „највише 2“. Heap под оптерећењем и даље одбацује захтеве
уз поновљиви `503`, тако да се проблем #7849 не врати.

Да бисте **умножили heap меморије**, покрените N независних директоријума
`DATA_DIR` (#11024). Никада немојте користити `replicas > 1` над једном SQLite
датотеком (#10350). Овај одељак не представља поновно разматрање рецепта за
хоризонтално скалирање помоћу `DATA_DIR`.
