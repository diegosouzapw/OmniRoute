# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute має **дві** локальні для процесу системи смуг із різними областями дії. Вони
доповнюють одна одну; операторам слід розуміти, яку саме систему вони переглядають.

## 1. Загальнопроцесний допуск на рівні байтів (`chatBodyAdmission.ts`)

- **Область дії:** шлях буферизованого тіла запиту/купи для `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` та інших маршрутів у форматі чату. Захищає
  від надмірного зростання використання купи через великі тіла запитів агентів
  програмування (#4380).
- **Один глобальний для процесу контролер, а не окремі смуги для кожного ключа (#10110).**
  Кожен API-ключ (хешований) або сеанс `anonymous` отримує допуск у межах
  **одного й того самого** спільного бюджету — хешований ідентифікатор сеансу
  використовується ЛИШЕ як ключ справедливого планування (циклічний розподіл
  між запитами, що очікують), а не як сегмент місткості. У попередній версії
  цього документа описувалися смуги для окремих ключів із незалежною місткістю;
  цю модель було вилучено в #10110, оскільки вона давала змогу неавтентифікованим
  підробленим обліковим даним збільшувати загальнопроцесне обмеження.
- **Шлюз (#503-fanout): автоматично визначений БАЙТОВИЙ бюджет приймання, а не
  фіксована кількість запитів.** Застаріле обмеження кількості запитів
  `CHAT_MAX_HEAVY_IN_FLIGHT` (значення за замовчуванням `1` до цього виправлення)
  зводило розпаралелювання агентів програмування (кілька підагентів/CLI,
  тіла запитів зазвичай > 256 КБ) до фактичної паралельності ~1, що призводило
  до відповідей 503 за цілком нормального навантаження. Тепер воно діє лише
  тоді, коли оператор явно задає `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Якщо
  значення не задано, допуск натомість обмежується
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — бюджетом, що автоматично визначається
  на основі фактичного ліміту пам’яті процесу
  (`src/shared/middleware/admissionBudget.ts`): 25% від меншого з ліміту купи
  V8 та будь-якого ліміту cgroup/контейнера, поділені на 8-кратний коефіцієнт
  тимчасового збільшення, з обмеженням у діапазоні від 8 МіБ до 2 ГіБ. Для
  явних перевизначень застосовуються ті самі межі. Бюджет автоматично
  масштабується від контейнера на 512 МБ до настільного комп’ютера з 32 ГБ
  без налаштування змінних середовища. Тіло запиту, яке не може вміститися
  в межах ефективного бюджету, негайно отримує помилку
  `413 body_exceeds_budget`; до обмеженої черги зі справедливим плануванням
  потрапляють лише окремо обслуговувані тіла запитів, що конкурують за ресурси.
  Оперативний багатосигнальний засіб відстеження навантаження на ресурси
  (співвідношення використання купи V8, cgroup, PSI, події OOM —
  `open-sse/utils/resourcePressurePolicy.ts`) скорочує обмежений час очікування
  за рівня навантаження `high` і негайно відхиляє запити з помилкою
  `503 resource_pressure` за рівня `critical`, ще до приймання будь-яких байтів.
- **Налаштування:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — перевизначення автоматично визначеного байтового бюджету
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — застаріле обмеження кількості запитів, лише за явного ввімкнення
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — час очікування в черзі до відповіді 503 (за замовчуванням 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — запобіжний ліміт купи для байтів у черзі (за замовчуванням 4 МБ)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — застарілі
    параметри, які не виконують жодних дій починаючи з #10110 (приймаються для сумісності конфігурації, але ігноруються)
- **Звіти:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — включно
  з доданими в #503-fanout полями `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` і `countCapEnabled`
  (`false` у розгортанні за замовчуванням — підтверджує, що фактичне обмеження
  визначається байтовим бюджетом, а не застарілим обмеженням кількості запитів).

## 2. Адаптивні віртуальні смуги середовища виконання (`open-sse/services/admission`)

- **Область застосування:** допуск за ключем орендаря до надсилання провайдеру — вартість черги, адаптація лімітів на основі затримки, розподіл за чергами смуг і метрики смуг.
- **Увімкнення:** **за явною згодою.** Вимкнено, якщо не задано `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Без цього адаптивний контролер зберігає поведінку зі спільною чергою (критерій 1 із #9654 виконується лише після того, як оператор увімкне смуги).
- **Налаштування:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + адаптивна конфігурація (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Звіти:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (непрозорі ідентифікатори смуг, без необроблених ключів) і `virtualLanes` — авторитетний прапорець «смуги ввімкнено» у знімку стану.

## 3. Розгалужені перевірки — допуск для кожної цілі combo/fusion (#9654, хвиля 2)

Combo (за пріоритетом / циклічним перебором) і fusion розгалужують N цільових моделей у межах одного батьківського запиту. Починаючи з хвилі 2 у #9654, **кожна ціль розгалуження перевіряється перед надсиланням** окремою перевіркою для цілі (`PerTargetAdmissionHook`, створеною за допомогою `createPerTargetAdmissionHook`) щодо смуги орендаря **батьківського** запиту.

- **Область застосування:** кожна ціль розгалуження, яку надсилають combo, fusion і рушій хаосу. Систему 1 (на рівні байтів) це не зачіпає — вона ніколи не перевіряє цілі розгалуження.
- **Увімкнення:** **за явною згодою разом із системою 2.** Якщо `OMNIROUTE_CHAT_VIRTUAL_LANES` не задано, перевірка не виконує жодних дій — у цьому режимі батьківський запит уже утримує оренду спільної черги, тому перевірка призвела б до подвійного обліку та відхилення цілей combo.
- **Семантика:**
  - **Суворо неблокувальна — пропускати, ніколи не ставити в чергу.** `maxWaitMs 0`: якщо смугу заповнено, ціль пропускається, а замість неї спрацьовує механізм резервного вибору combo (або панель уцілілих цілей fusion). Це зроблено навмисно: ціль розгалуження є надлишковою роботою, а її постановка в чергу створює додаткове навантаження саме на ту перевантаженість, яку мають усувати смуги. Тому `defaultMaxWaitMs` застосовується **лише до батьківського запиту**; розгалужені перевірки ніколи не очікують, і навмисно **не передбачено параметра**, який дозволяв би їм очікувати (історія задачі показує, що параметри очікування спричиняли масові помилки класу 502/504, яким запобігає #9654, — це варто переглянути лише тоді, коли оператор повідомить, що пропуск цілей розгалуження погіршує якість відповіді).
  - **Звільнення після допуску.** Допущена перевірка негайно звільняє свою оренду: це перевірка доступної місткості, а не її утримання. Оренда батьківського запиту охоплює розгалуження; утримання ще N оренд штучно збільшило б спільну активну вартість і призвело б до відхилення інших орендарів. Це перевірка за принципом найкращих зусиль, а не резервування: смуга може знову заповнитися між перевіркою та надсиланням, тому за високої конкуренції шлюз може допустити запит до смуги, яка знову стане повною до моменту надсилання цілі.
  - **Вартість визначається за фактичним тілом розгалуженого запиту.** Перевірка оцінює вартість за фактичним тілом цілі, включно з класом запиту, визначеним за її прапорцем `stream`, так само, як і в батьківському шляху. Тому учасники панелі fusion (`stream: false`) оцінюються за класом без потокового передавання, який вони фактично використовуватимуть, а цілі priority/RR — відповідно до запиту користувача.
- **Звіти:** пропуск перевірки після першої цілі збільшує `fallbackCount` для поточного запиту combo (відповідно до наявної семантики резервного вибору; це видно в журналах combo); fusion повертає 503, якщо пропущено всіх учасників панелі. Наразі у знімку стану **немає агрегованого лічильника** (наприклад, `virtualFanoutSkipped`) — якщо оператор повідомить, що не може визначити, як часто шлюз смуги пропускає цілі розгалуження, це буде підставою додати такий лічильник.

## Що відображається на інформаційній панелі

- `adaptiveAdmission.laneCount` / `laneTenants` → **адаптивні віртуальні смуги** (система 2).
- `adaptiveAdmission.virtualLanes === true` → розгалужені проби з розділу 3
  також активні. Якщо в корисному навантаженні `virtualLanes` відсутній або має значення `false`, це означає,
  що `OMNIROUTE_CHAT_VIRTUAL_LANES` не задано — смуги на рівні байтів (система 1)
  усе ще активні, але нічого в `adaptiveAdmission` (і жодного шлюзування розгалуження)
  не діє, доки цю функцію не буде ввімкнено.

## Чому існують обидві системи

Смуги на рівні байтів обмежують ресурсомісткий щодо пам’яті шлях розбору/стиснення; адаптивні смуги
обмежують витрати на диспетчеризацію для кожного орендаря. Критерій 1 із #9654 («сплеск одного сеансу не спричиняє 503
для іншого») безумовно забезпечується системою 1, а системою 2 — після її явного ввімкнення.

## 4. Тривалі `/v1/responses` в одному процесі (резерв за нормального стану)

У [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) додано
`tryAcquireHealthyHeadroom`, щоб дозволити другий структурно важкий запит,
коли використання купи нижче за `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Шлях BYTE,
який використовується `admitChatRequest` (тіла ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
типово 256 КіБ, включно з `POST /v1/responses`), використовує **той самий** резерв.

Це підтримуваний рецепт для **одного процесу**, що дає змогу обробляти понад два одночасні тривалі
SSE-запити `/v1/responses`: збільшуйте основний ліміт і резерв за нормального стану лише настільки, наскільки дозволяють купа
та загальнопроцесний бюджет байтів запитів у процесі обробки (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Десятки тривалих SSE-клієнтів (40–50) — це питання бюджету пам’яті,
а не жорстке продуктове обмеження «максимум 2». За високого навантаження на купу запити все одно відхиляються
з повторюваною помилкою `503`, щоб проблема #7849 не повернулася.

Щоб **помножити кількість куп**, запустіть N незалежних `DATA_DIR` (#11024). Ніколи не використовуйте
`replicas > 1` для одного файла SQLite (#10350). Цей розділ не переглядає
рецепт горизонтального масштабування за допомогою DATA_DIR.
