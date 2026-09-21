# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute имеет **две** локальные для процесса системы полос с разными областями действия. Они
дополняют друг друга; операторы должны понимать, какую именно систему они наблюдают.

## 1. Общепроцессный допуск на уровне байтов (`chatBodyAdmission.ts`)

- **Область действия:** путь буферизованного тела/кучи для `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` и других маршрутов, имеющих форму чата. Защищает
  от разрастания использования кучи из-за больших тел запросов агентов программирования (#4380).
- **Один глобальный для процесса контроллер, а не отдельные полосы для каждого ключа (#10110).** Каждый API-ключ
  (хешированный) или сеанс `anonymous` получает допуск в рамках **одного и того же** общего бюджета —
  хешированный идентификатор сеанса используется ТОЛЬКО как ключ справедливого планирования (циклическое
  распределение между ожидающими), но никогда как сегмент ёмкости. В предыдущей версии этого
  документа описывались отдельные полосы для каждого ключа с независимой ёмкостью; эта модель была
  удалена в #10110, поскольку позволяла неаутентифицированным поддельным учётным данным многократно
  увеличивать общепроцессное ограничение.
- **Шлюз (#503-fanout): автоматически вычисляемый БАЙТОВЫЙ бюджет приёма, а не фиксированное количество
  запросов.** Устаревшее ограничение количества запросов `CHAT_MAX_HEAVY_IN_FLIGHT` (до этого
  исправления значение по умолчанию — `1`) сводило разветвление агентов программирования (несколько субагентов/CLI,
  тела обычно > 256 КБ) к эффективному параллелизму ~1, что приводило к ответам 503
  при совершенно обычной нагрузке. Теперь оно применяется только в том случае, если оператор явно
  задаёт `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Если параметр не задан, допуск вместо этого
  ограничивается `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — бюджетом, автоматически вычисляемым на основе
  фактического ограничения памяти процесса (`src/shared/middleware/admissionBudget.ts`):
  25% от меньшего из лимита кучи V8 и любого лимита cgroup/контейнера,
  делённые на коэффициент временного разрастания 8x и ограниченные диапазоном от 8 МиБ до
  2 ГиБ. Для явных переопределений применяются те же границы. Это обеспечивает автоматическое
  масштабирование от контейнера с 512 МБ до настольного компьютера с 32 ГБ без настройки переменных окружения. Тело, которое
  не помещается в эффективный бюджет, немедленно отклоняется с `413 body_exceeds_budget`;
  в ограниченную очередь справедливого распределения попадает только конкуренция между телами, каждое из которых
  по отдельности может быть обработано. Оперативный многофакторный трекер давления на ресурсы (доля использования кучи V8,
  cgroup, PSI, события OOM — `open-sse/utils/resourcePressurePolicy.ts`) сокращает
  ограниченное время ожидания при `high` уровне давления и немедленно сбрасывает нагрузку с ответом
  `503 resource_pressure` при `critical` уровне давления, ещё до приёма каких-либо байтов.
- **Настройка:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — переопределение автоматически вычисляемого байтового бюджета
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — устаревшее ограничение количества запросов, только с явным включением
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — время ожидания в очереди перед ответом 503 (по умолчанию 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — предохранитель кучи по объёму байтов в очереди (по умолчанию 4 МБ)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — устаревшие
    параметры, не выполняющие никаких действий с #10110 (принимаются для совместимости конфигурации, но игнорируются)
- **Отчёты:** `GET /api/monitoring/health` → `chatAdmission` (#11244), включая
  добавленные в #503-fanout поля `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` и `countCapEnabled`
  (`false` при развёртывании по умолчанию — подтверждает, что фактически применяется байтовый бюджет, а не устаревшее
  ограничение количества запросов).

## 2. Адаптивные виртуальные каналы времени выполнения (`open-sse/services/admission`)

- **Область действия:** допуск по ключу арендатора при отправке провайдеру — стоимость очереди, адаптация
  лимитов с учётом задержки, постановка в очередь канала и метрики каналов.
- **Условие включения:** **требует явного включения.** Отключено, если не задано `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Без этого
  адаптивный контроллер сохраняет поведение общей очереди (критерий 1 из #9654
  выполняется только после того, как оператор включит каналы).
- **Настройка:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + адаптивная конфигурация (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Отчётность:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (непрозрачные идентификаторы каналов, но не исходные
  ключи), а также `virtualLanes` — авторитетный флаг в снимке, указывающий, что каналы включены.

## 3. Разветвлённые пробы — допуск для каждой цели combo/fusion (#9654, волна 2)

Combo (приоритет / циклический перебор) и fusion разветвляют один родительский
запрос на N целевых моделей. Начиная с волны 2 задачи #9654 **каждая цель разветвления проверяется перед отправкой** с помощью
пробы для конкретной цели (`PerTargetAdmissionHook`, создаваемой `createPerTargetAdmissionHook`)
в отношении канала арендатора **родительского** запроса.

- **Область действия:** каждая цель разветвления, отправляемая combo, fusion и движком chaos.
  Система 1 (на уровне байтов) не затрагивается — она никогда не проверяет цели разветвления.
- **Условие включения:** **требует явного включения вместе с системой 2.** Не выполняет никаких действий, если
  `OMNIROUTE_CHAT_VIRTUAL_LANES` не задана — в этом режиме родительский запрос уже удерживает разрешение общей очереди,
  поэтому проверка привела бы к двойному учёту и отклонению целей combo.
- **Семантика:**
  - **Строго неблокирующая — пропуск, а не постановка в очередь.** `maxWaitMs 0`: если канал заполнен,
    цель пропускается, а вместо неё используется механизм резервного выбора combo (или панель
    выживших целей fusion). Это сделано намеренно: цель разветвления представляет собой избыточную
    работу, а её постановка в очередь создаёт дополнительную нагрузку именно на тот перегруженный канал,
    которую каналы и должны предотвращать. Поэтому `defaultMaxWaitMs` применяется **только к родительскому запросу**;
    пробы разветвления никогда не ожидают, и намеренно **не предусмотрено параметра**, который заставил бы
    их ждать (история задачи показывает, что параметры ожидания приводили к массовым ошибкам класса 502/504,
    которые должна предотвращать #9654, — пересматривать это следует только в том случае, если оператор сообщит, что пропуск целей разветвления
    ухудшает качество ответов).
  - **Освобождение после допуска.** Допущенная проба немедленно освобождает своё разрешение: это
    проверка доступной ёмкости, а не её удержание. Разрешение родительского запроса покрывает разветвление; удержание ещё N
    разрешений завысило бы общую стоимость активных запросов и привело бы к отклонению других арендаторов. Это проверка наилучшего качества,
    а не резервирование: канал может снова заполниться между пробой и отправкой, поэтому при
    высокой конкуренции проверка может допустить запрос в канал, который к моменту
    отправки цели уже снова заполнен.
  - **Стоимость рассчитывается по фактическому телу разветвлённого запроса.** Проба оценивает стоимость по
    фактическому телу запроса к цели — включая класс запроса, определённый по его флагу `stream`,
    точно так же, как и для родительского пути, — поэтому участники панели fusion (`stream: false`)
    оцениваются по классу без потоковой передачи, который они действительно будут занимать, а цели priority/RR —
    в соответствии с фактическим запросом пользователя.
- **Отчётность:** пропуск пробы после первой цели увеличивает значение `fallbackCount` combo для данного запроса
  (в соответствии с существующей семантикой резервного выбора; отображается в журналах combo);
  fusion возвращает 503, если пропущены все участники панели. В настоящее время в снимке
  **нет агрегированного счётчика** (например, `virtualFanoutSkipped`) —
  если оператор сообщит, что не может определить, как часто шлюз каналов пропускает цели разветвления,
  это станет основанием для добавления такого счётчика.

## Что именно отображается на панели мониторинга

- `adaptiveAdmission.laneCount` / `laneTenants` → **адаптивные виртуальные полосы** (система 2).
- `adaptiveAdmission.virtualLanes === true` → fan-out-проверки из раздела 3
  также активны. Если в полезной нагрузке `virtualLanes` отсутствует или имеет значение `false`, это означает,
  что `OMNIROUTE_CHAT_VIRTUAL_LANES` не задана — полосы на уровне байтов (система 1)
  по-прежнему активны, но настройки из `adaptiveAdmission` (и ограничение fan-out)
  не действуют, пока эта функция не будет включена.

## Почему существуют обе системы

Полосы на уровне байтов ограничивают ресурсоёмкий по памяти путь разбора/сжатия; адаптивные полосы
ограничивают стоимость диспетчеризации для каждого арендатора. Критерий 1 из #9654 («всплеск одной сессии не приводит
к ошибке 503 для другой») безусловно обеспечивается системой 1, а системой 2 — после её явного включения.

## 4. Длительные `/v1/responses` в одном процессе (healthy-headroom)

В [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) была добавлена
`tryAcquireHealthyHeadroom`, благодаря чему второй структурно тяжёлый запрос допускается,
когда использование кучи ниже `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Путь BYTE,
используемый `admitChatRequest` (тела размером ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
по умолчанию 256 КиБ, включая `POST /v1/responses`), использует **тот же** механизм.

Это поддерживаемый рецепт для **одного процесса**, позволяющий обслуживать более двух одновременных длительных
SSE-запросов `/v1/responses`: увеличивайте основной лимит и лимит healthy-headroom лишь настолько, насколько позволяют куча
и общепроцессный бюджет байтов запросов в обработке (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Возможность обслуживать десятки длительных SSE-клиентов (40–50) определяется именно
этим бюджетом памяти, а не жёстким ограничением продукта «не более 2». При высокой нагрузке на кучу запросы
по-прежнему отклоняются с допускающей повторную попытку ошибкой `503`, чтобы проблема #7849 не возникла снова.

Чтобы **умножить объём доступной кучи**, запустите N независимых `DATA_DIR` (#11024). Никогда не задавайте
`replicas > 1` для одного файла SQLite (#10350). Этот раздел не пересматривает
рецепт масштабирования через DATA_DIR.
