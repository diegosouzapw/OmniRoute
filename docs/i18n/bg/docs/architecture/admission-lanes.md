# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute има **две** локални за процеса системи от канали с различни обхвати. Те са
взаимнодопълващи се; операторите трябва да знаят коя от тях наблюдават.

## 1. Допуск на ниво байтове за целия процес (`chatBodyAdmission.ts`)

- **Обхват:** пътят за буферирано тяло/heap за `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` и другите маршрути с форма на чат. Предпазва
  от увеличаване на използването на heap при големи тела от coding agent-и (#4380).
- **Един глобален контролер за процеса, а не отделни канали за всеки ключ (#10110).** Всеки API ключ
  (хеширан) или `anonymous` сесия се допуска спрямо **един и същ** споделен бюджет —
  хешираният идентификатор на сесията се използва САМО като ключ за справедливо планиране (round-robin
  разпределяне между чакащите), никога като дял от капацитета. Предишна версия на този
  документ описваше отделни канали за всеки ключ с независим капацитет; този модел беше
  премахнат в #10110, тъй като позволяваше на неавтентицирани фалшиви идентификационни данни да умножават
  ограничението за целия процес.
- **Ограничител (#503-fanout): автоматично изведен БАЙТОВ бюджет за приемане, а не фиксиран брой
  заявки.** Старото ограничение по брой заявки `CHAT_MAX_HEAVY_IN_FLIGHT` (по подразбиране `1`
  преди тази корекция) свеждаше fan-out на coding agent-ите (множество подагенти/CLI инструменти,
  тела обичайно > 256 KB) до ефективна конкурентност от ~1, което водеше до 503
  при напълно нормално натоварване. Сега то се прилага само когато оператор изрично
  зададе `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Ако не е зададено, допускането вместо това
  се ограничава от `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — бюджет, автоматично изведен от
  реалния лимит на паметта на процеса (`src/shared/middleware/admissionBudget.ts`):
  25% от по-малкия лимит между V8 heap и който и да е cgroup/container лимит,
  разделени на 8x коефициент за временно увеличение, ограничени между 8 MiB и
  2 GiB. Изричните замени използват същите граници. Това се мащабира автоматично от
  512 MB контейнер до 32 GB настолен компютър без настройване чрез променливи на средата. Тяло, което не може
  да се вмести в ефективния бюджет, се отхвърля незабавно с `413 body_exceeds_budget`;
  само конкуренцията между тела, всяко от които може да бъде обслужено самостоятелно, влиза в ограничената
  опашка за справедливо обслужване. Активен тракер за ресурсно натоварване с множество сигнали (съотношение на V8 heap,
  cgroup, PSI, OOM събития — `open-sse/utils/resourcePressurePolicy.ts`) съкращава
  ограниченото изчакване при `high` натоварване и отхвърля незабавно с
  `503 resource_pressure` при `critical` натоварване, още преди да бъдат приети каквито и да е
  байтове. PSI се чете от cgroup `memory.pressure` на тази единица, когато е наличен
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` обхваща
  целия хост и се използва само като резервен вариант на физически сървър / cgroup v1, така че хост,
  използващ swap, да не може да предизвика 503 за неактивен контейнер.
- **Настройване:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — замяна на автоматично изведения байтов бюджет
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — старо ограничение по брой заявки, само при изрично активиране
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — изчакване в опашката преди 503 (по подразбиране 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap клапан за байтовете в опашката (по подразбиране 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — остарели
    no-op настройки от #10110 насам (приемат се за съвместимост на конфигурацията, но се игнорират)
- **Отчети:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — включително
  добавените в #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` и `countCapEnabled`
  (false при внедряване по подразбиране — потвърждава, че действително ограничава байтовият бюджет, а не старото
  ограничение по брой).

## 2. Адаптивни виртуални ленти по време на изпълнение (`open-sse/services/admission`)

- **Обхват:** допускане по ключ на клиент за изпращане към доставчик — цена на опашката, адаптиране на лимитите според латентността, поставяне в опашки по ленти и метрики за лентите.
- **Активиране:** **по избор.** Деактивирано е, освен ако `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Без него адаптивният контролер запазва поведението със споделена опашка (критерий 1 от #9654 е изпълнен само след като оператор активира лентите).
- **Настройка:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + адаптивна конфигурация (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Отчети:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (непрозрачни идентификатори на ленти, никога необработени ключове) и `virtualLanes` — достоверният флаг „лентите са включени“ в моментната снимка.

## 3. Разгънати проверки — допускане за всяка цел при combo/fusion (#9654 Wave 2)

Combo (приоритетно / циклично) и fusion разгъват N моделни цели в рамките на една родителска заявка. От #9654 Wave 2 насам **всяка разгъната цел се проверява за допускане преди изпращане** чрез проверка за всяка цел (`PerTargetAdmissionHook`, създадена от `createPerTargetAdmissionHook`) спрямо клиентската лента на **родителя**.

- **Обхват:** всяка разгъната цел, изпратена от combo, fusion и chaos engine. Система 1 (на ниво байтове) не е засегната — тя никога не проверява разгънати цели.
- **Активиране:** **по избор със система 2.** Не извършва нищо, когато `OMNIROUTE_CHAT_VIRTUAL_LANES` не е зададена — в този режим родителската заявка вече държи допуска за споделената опашка, така че проверката би довела до двойно отчитане и отхвърляне на combo цели.
- **Семантика:**
  - **Строго неблокираща — пропускане, никога поставяне в опашка.** `maxWaitMs 0`: запълнена лента води до пропускане на целта и вместо нея обслужването се поема от механизма за резервен избор на combo (или панела с оцелели цели на fusion). Това е умишлено: разгънатата цел представлява излишна работа, а поставянето ѝ в опашка натрупва допълнително натоварване точно върху претоварването, което лентите трябва да спрат. Поради това `defaultMaxWaitMs` се прилага **само към родителската заявка**; разгънатите проверки никога не изчакват и умишлено **няма настройка**, която да ги кара да изчакват (историята на проблема показва, че настройките за изчакване са довели до масовите грешки от клас 502/504, които #9654 предотвратява — да се преразгледа само ако оператор съобщи, че пропуснатите разгънати цели влошават качеството на отговорите).
  - **Освобождаване при допускане.** Допусната проверка освобождава допуска си незабавно: тя е ограничител на капацитета, а не задържане. Допускът на родителя покрива разгъването; задържането на още N допуска би завишило общата активна цена и би довело до отхвърляне на други клиенти. Това е най-добро усилие, а не резервация: лентата може да се запълни отново между проверката и изпращането, така че при силна конкуренция ограничителят може да допусне цел в лента, която отново е запълнена до момента на изпращането ѝ.
  - **Оценяване според действителното тяло на разгънатата заявка.** Проверката оценява цената въз основа на действителното тяло на целта — включително класа на заявката, изведен от нейния флаг `stream`, точно както при пътя на родителя — така че членовете на панела на fusion (`stream: false`) се оценяват според класа без поточно предаване, който действително ще заемат, а целите с приоритетно/циклично разпределение — според заявеното от потребителя.
- **Отчети:** пропускане от проверката след първата цел увеличава `fallbackCount` на combo за съответната заявка (отразявайки съществуващата семантика за резервен избор; видимо в регистрационните файлове на combo); fusion връща 503, когато всички членове на панела са пропуснати. Понастоящем в моментната снимка **няма обобщен брояч** (напр. `virtualFanoutSkipped`) — ако оператор съобщи, че не може да установи колко често ограничителят на лентата пропуска разгънати цели, това е основание да бъде добавен такъв.

## Кое се показва в таблото за управление

- `adaptiveAdmission.laneCount` / `laneTenants` → **адаптивни виртуални ленти** (система 2).
- `adaptiveAdmission.virtualLanes === true` → разклонените сонди от раздел 3 също са
  активни. Полезен товар, в който `virtualLanes` липсва или е `false`, означава, че
  `OMNIROUTE_CHAT_VIRTUAL_LANES` не е зададена — лентите на ниво байтове (система 1) все
  още са активни, но нищо под `adaptiveAdmission` (както и никакво ограничаване на
  разклоняването) не е в сила, докато настройката не бъде активирана.

## Защо съществуват и двете

Лентите на ниво байтове ограничават изискващия много памет път за анализиране/компресиране;
адаптивните ленти ограничават разхода за разпределяне за всеки клиент. Критерий 1 от #9654
(„пиковото натоварване на една сесия не води до 503 за друга“) се прилага безусловно от
система 1 и от система 2, след като бъде активирана чрез изрично включване.

## 4. Продължителни `/v1/responses` в един процес (резерв при добро състояние)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) добави
`tryAcquireHealthyHeadroom`, така че да бъде допусната втора заявка с високо структурно
натоварване, когато heap паметта е под `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Пътят
BYTE, използван от `admitChatRequest` (тела ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
по подразбиране 256 KiB, включително `POST /v1/responses`), използва **същия** резерв.

Това е поддържаната рецепта за **един процес** при повече от две едновременни продължителни
SSE `/v1/responses`: увеличавайте основния капацитет + резерва при добро състояние само
доколкото позволяват heap паметта и общопроцесният бюджет за байтове в обработка
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Десетки продължителни SSE клиенти
(40–50) са въпрос на този бюджет за памет, а не на твърдо продуктово ограничение „максимум
2“. При натоварена heap памет заявките продължават да се отхвърлят с позволяващ повторен
опит `503`, така че #7849 да не се появи отново.

За да **умножите heap паметите**, стартирайте N независими `DATA_DIR` (#11024). Никога не
използвайте `replicas > 1` с един SQLite файл (#10350). Този раздел не отваря отново
рецептата за хоризонтално мащабиране чрез DATA_DIR.
