# RTK Compression (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Стиснення RTK — це рушій OmniRoute для стиснення виводу термінала та інструментів з урахуванням команд. Його
розроблено для сесій агентів програмування, у яких контекст здебільшого зростає через журнали тестів, вивід збірки,
шум менеджерів пакетів, транскрипти оболонки, вивід Docker, вивід git і трасування стека.

RTK може працювати безпосередньо з `defaultMode: "rtk"` або як перший крок у складеному конвеєрі, зазвичай:

```txt
rtk -> caveman
```

Такий порядок спочатку стискає шумний машинний вивід, а потім дає Caveman змогу ущільнити решту тексту.

За даними основного проєкту RTK, економія для виводу команд становить `60-90%`. Приклад сесії з його README скорочує
`~118,000` стандартних токенів до `~23,900` токенів RTK, що означає економію `79.7%` (`~80%`). OmniRoute використовує
цей середній показник основного проєкту для розрахунку сумарної економії разом зі стисненням вхідних даних Caveman:

```txt
Середнє RTK:           економія 80%
Вхідні дані Caveman:   економія 46%
Разом:                 1 - (1 - 0.80) * (1 - 0.46) = економія 89.2%
Діапазон:              1 - (1 - 0.60..0.90) * (1 - 0.46) = економія 78.4-94.6%
```

## Що він стискає

Вбудований каталог наразі містить 49 фільтрів у таких категоріях:

| Категорія | Приклади                                                      |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, тести Go, тести Cargo       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, загальні журнали оболонки               |
| `docker`  | `docker ps`, журнали Docker                                   |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | Вивід JSON, трасування стека, загальний резервний вивід       |

Детектор у `open-sse/services/compression/engines/rtk/commandDetector.ts` класифікує вивід
перед вибором фільтра. Фільтри також можуть зіставлятися за шаблоном команди або регулярним виразом для виводу, коли самого
класу команди недостатньо.

## Визначення фільтрів

RTK завантажує фільтри в такому порядку:

1. Фільтри проєкту з `.rtk/filters.toml` і `.rtk/filters.json`, лише якщо їм довіряють.
2. Глобальні фільтри з `DATA_DIR/rtk/filters.toml` і `DATA_DIR/rtk/filters.json`.
3. Вбудовані фільтри з `open-sse/services/compression/engines/rtk/filters/`.

У межах однієї області фільтри схеми RTK TOML v1 мають пріоритет над фільтрами OmniRoute JSON. Вирази TOML
`match_command` перевіряються перед зіставленням за типом команди, тому імпортований фільтр для конкретної команди
може перевизначити ширший фільтр у цій області. Область проєкту все одно має пріоритет над глобальною
областю незалежно від формату файлу.

Фільтри проєкту навмисно потребують підтвердження довіри, оскільки фільтри з регулярними виразами можуть змінювати спосіб
відображення виводу інструментів для агентів. Файл фільтрів проєкту приймається, якщо виконується одна з таких умов:

- `rtkConfig.trustProjectFilters` має значення `true`.
- Установлено `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` містить відповідний хеш SHA-256 для файлу фільтрів проєкту.

Приклад файлу довіри:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Хеші зберігаються окремо: `filtersSha256` підтверджує довіру до `.rtk/filters.json`, а `filtersTomlSha256`
— до `.rtk/filters.toml`. Редагування будь-якого з цих файлів робить недійсним лише його власний запис довіри. Глобальні файли
встановлюються адміністратором і використовують наявний механізм довіри до глобальних фільтрів.

Користувацькі фільтри можуть бути одним об’єктом фільтра або масивом об’єктів фільтрів. Недійсні користувацькі фільтри
пропускаються та відображаються в діагностиці `/api/context/rtk/filters`. Недійсні вбудовані фільтри спричиняють негайне завершення роботи.

## Сумісність зі схемою RTK TOML v1

OmniRoute може аналізувати, перевіряти, тестувати та встановлювати декларативні файли фільтрів, що використовують схему RTK TOML v1.
Підтримуються поля `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` і вбудовані тести `[[tests.<filter>]]`.
Невідомі поля, недійсні або небезпечні регулярні вирази, одночасне використання правил видалення та збереження, файли розміром понад
1 MiB і посилання на невідомі фільтри відхиляються. Файл, вбудовані тести якого завершилися невдало, можна
перевірити для аналізу, але не можна встановити чи завантажити. Помилки завантаження користувацьких файлів і надалі
обробляються за принципом fail-open: недійсний файл пропускається, а решта фільтрів продовжують працювати.

OmniRoute отримує вивід інструмента після того, як клієнт уже захопив його, тому `filter_stderr = true`
не може змінити захоплення процесу. Поле приймається як таке, що не виконує жодних дій, а під час перевірки повертається попередження.
Це навмисно описано як **сумісність зі схемою RTK TOML v1**, а не повна сумісність
із виконуваним файлом RTK, оболонковими хуками, реалізаціями команд Rust або структурою його сховища довіри.

Розширене подання RTK на інформаційній панелі приймає вставлений або завантажений TOML. Перевірка виконується лише для читання.
Під час встановлення файл `DATA_DIR/rtk/filters.toml` записується атомарно з обмежувальними дозволами, а активний
каталог фільтрів оновлюється без перезапуску. Для заміни наявного файлу потрібне явне підтвердження `overwrite`,
і спочатку створюється `DATA_DIR/rtk/filters.toml.bak`.

## DSL фільтрів

Фільтри використовують схему JSON, описану в документі [Формат правил стиснення](./COMPRESSION_RULES_FORMAT.md).
Середовище виконання застосовує ці етапи в такому порядку:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Важливі поля:

| Поле                         | Призначення                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| `rules.stripAnsi`            | Видаляти колірні та керівні послідовності термінала перед зіставленням  |
| `rules.filterStderr`         | Нормалізувати поширені префікси stderr перед зіставленням/фільтруванням |
| `rules.replace`              | Застосовувати впорядковані заміни за регулярними виразами               |
| `rules.matchOutput`          | Повертати стислий підсумок, коли вивід відповідає відомій умові         |
| `rules.matchOutput[].unless` | Пропускати скорочений результат, якщо присутній шаблон помилки/збою     |
| `rules.dropPatterns`         | Видаляти зайві рядки                                                    |
| `rules.includePatterns`      | Надавати перевагу рядкам, що містять практично корисну інформацію       |
| `rules.collapsePatterns`     | Згортати повторювані відповідні рядки                                   |
| `rules.deduplicate`          | Явна згода для кожного фільтра: згортати послідовні дублікати рядків    |
| `rules.truncateLineAt`       | Безпечно для Unicode скорочувати кожен рядок                            |
| `rules.onEmpty`              | Резервне повідомлення, якщо всі рядки відфільтровано                    |
| `tests[]`                    | Вбудовані зразки, які використовуються шлюзом перевірки                 |

Очікується, що вбудовані фільтри міститимуть вбудовані зразки `tests[]`. Користувацькі фільтри також мають
їх містити, особливо якщо вони спільно використовуються в різних проєктах.

## Дедуплікація рядків (два рівні)

RTK згортає дублікати рядків на двох незалежних рівнях:

1. **`deduplicate` для окремого фільтра (за бажанням, типове значення `false`).** Фільтр може встановити `rules.deduplicate: true`,
   щоб згортати послідовні дублікати рядків _у межах виводу, що відповідає цьому фільтру_, перед обрізанням.
   Це виконується всередині `lineFilter.ts`. Для застарілих фільтрів ця функція автоматично вмикається, якщо фільтр визначає
   `collapsePatterns`. Схема: `deduplicate: z.boolean().default(false)` у
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Загальний для рушія `deduplicateThreshold` (типове значення `3`).** Після виконання всіх фільтрів рушій згортає
   будь-яку послідовність із `>= deduplicateThreshold` однакових послідовних рядків у всьому результаті
   (`deduplicateRepeatedLines`, застосовується в `engines/rtk/index.ts`). Під час
   нормалізації значення обмежується діапазоном 2–100.

Прохід для окремого фільтра виконується першим (усередині фільтра), а загальний прохід рушія — останнім (над об’єднаним
виводом), тому вони поєднуються без подвійного підрахунку.

## Групування рядків (`enableGrouping`)

Коли `rtkConfig.enableGrouping` має значення `true` (типове значення `false`), RTK виконує додатковий прохід `groupSimilarLines`
над результатом після дедуплікації, який згортає послідовності _майже еквівалентних_ (але не ідентичних побайтово)
послідовних рядків. `rtkConfig.groupingThreshold` (типове значення `3`) — це мінімальна довжина послідовності, яка запускає
групування. Це структурний аналог `deduplicateThreshold`: дедуплікація обробляє точні повторення,
а групування — «однакову структуру з невеликими відмінностями». Обидва параметри є частиною JSON `rtkConfig`,
що зберігається в таблиці `key_value` (див. розділ «Конфігурація» вище), тому налаштування зберігається після перезапусків.

## Видалення коментарів із коду (`stripCodeComments` / `preserveDocstrings`)

Коли ввімкнено `rtkConfig.applyToCodeBlocks`, RTK також може видаляти коментарі з відокремлених блоків коду:

- `stripCodeComments` (типове значення `false`) — вмикається за бажанням. Коли має значення `true`, RTK видаляє коментарі з відокремлених блоків JavaScript
  і TypeScript. Історично цей параметр зчитувався, але ніколи не застосовувався, тому типовим залишається
  режим «зберігати», щоб уникнути непомітної зміни в робочому середовищі.
- `preserveDocstrings` (типове значення `true`) — під час видалення коментарів блокові коментарі JSDoc/`/** … */`
  зберігаються (вони містять документацію API, цінність якої перевищує витрати байтів). Установіть `false`, щоб також
  видаляти їх.

Видалення коментарів реалізовано в `open-sse/services/compression/engines/rtk/codeStripper.ts`. Воно використовує
**парсер TypeScript** (а не регулярний вираз), тому рядкові літерали, шаблонні літерали та літерали регулярних виразів ніколи не приймаються
за коментарі, а за виявлення JSX обробка повністю припиняється (щоб коментарі в контейнерах виразів JSX
ніколи не пошкоджувалися). Наразі видалення коментарів застосовується **лише до JavaScript і TypeScript** — для інших
мов із набору `CodeLanguage` засобу видалення (Python, Rust, Go, Ruby, Java) виконується згортання порожніх рядків і
пробілів, але коментарі не видаляються. Оброблений блок позначається тегом `rtk:code-strip` у
`rulesApplied`.

> **Примітка — GCF / табличне кодування є окремим рушієм.** RTK **не** містить табличний/стовпчиковий кодувальник JSON «GCF»
> (Graph Compact Format). Цей кодувальник, який замінив старіший кодувальник
> `omni-tabular`, розміщено в рушії **headroom**
> (`open-sse/services/compression/engines/headroom/`, а вбудований кодек — у
> `headroom/gcf/`). Він не пов’язаний із конвеєром фільтрів RTK, описаним тут.

## Конфігурація

Глобальні налаштування доступні через `/api/settings/compression`. Налаштування, специфічні для RTK, також
доступні через `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` і `disabledFilters` використовують ідентифікатори фільтрів, наприклад `test-vitest` або `git-diff`.

Повну структуру `rtkConfig` визначено в `RtkConfig` / `DEFAULT_RTK_CONFIG` у
`open-sse/services/compression/types.ts`. Увесь об’єкт зберігається як єдине значення JSON у
таблиці SQLite `key_value` з `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) і нормалізується під час читання за допомогою `normalizeRtkConfig`. Тому кожне поле нижче
— включно з `enableGrouping`, `groupingThreshold`, `stripCodeComments` і `preserveDocstrings` —
проходить повний цикл через те саме сховище та зберігається після перезапуску.

| Ключ                   | Типове значення | Призначення                                                                                       |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`             | Для всього рушія: мінімальна кількість послідовних однакових рядків для згортання (у межах 2–100) |
| `enableGrouping`       | `false`         | За бажанням: згортати послідовності майже еквівалентних рядків                                    |
| `groupingThreshold`    | `3`             | Мінімальна кількість послідовних схожих рядків, за якої запускається групування                   |
| `stripCodeComments`    | `false`         | За бажанням: видаляти коментарі з огороджених блоків коду (потребує `applyToCodeBlocks`)          |
| `preserveDocstrings`   | `true`          | Під час видалення коментарів зберігати блоки JSDoc/`/** … */`                                     |

## API

| Маршрут                            | Метод | Призначення                                                                       |
| ---------------------------------- | ----- | --------------------------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET   | Прочитати конфігурацію RTK                                                        |
| `/api/context/rtk/config`          | PUT   | Оновити конфігурацію RTK                                                          |
| `/api/context/rtk/filters`         | GET   | Отримати список каталогу фільтрів і діагностику завантаження                      |
| `/api/context/rtk/import`          | POST  | Перевірити або встановити файли схеми RTK TOML версії 1                           |
| `/api/context/rtk/test`            | POST  | Попередньо переглянути стиснення RTK для одного текстового корисного навантаження |
| `/api/context/rtk/raw-output/[id]` | GET   | Прочитати збережений необроблений вивід із прихованими чутливими даними           |
| `/api/compression/preview`         | POST  | Попередньо переглянути будь-який режим стиснення                                  |

Корисне навантаження для тестування RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Корисне навантаження для попереднього перегляду стиснення:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Маршрути керування потребують автентифікації керування панеллю або відповідної політики API-ключа.

Корисне навантаження для перевірки RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Використовуйте `"action": "install"`, щоб установити перевірений файл глобально. Додавайте `"overwrite": true` лише
після перегляду та підтвердження заміни наявного глобального файлу.

## Відновлення необробленого виводу

Зазвичай RTK повертає лише стиснений текст. Для налагодження `rawOutputRetention` може зберігати необроблений вивід із замаскованими конфіденційними даними:

| Значення   | Поведінка                                                               |
| ---------- | ----------------------------------------------------------------------- |
| `never`    | Не зберігати необроблений вивід                                         |
| `failures` | Зберігати лише вивід, що, ймовірно, свідчить про помилку                |
| `always`   | Зберігати кожен стиснений RTK необроблений вивід після маскування даних |

Збережені файли записуються до:

```txt
DATA_DIR/rtk/raw-output/
```

Перед збереженням конфіденційні дані маскуються, зокрема поширені bearer-токени, ключі API, токени Slack, ключі доступу AWS і значення у форматі присвоєння `token=...`, `secret=...`, `password=...`. Аналітика зберігає лише ідентифікатор посилання, розмір і метадані хешу.

## Перевірочний шлюз

Цільовий перевірочний шлюз запускає вбудовані інлайн-тести фільтрів без виклику зовнішніх команд оболонки:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Розширений шлюз RTK:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Перед випуском запустіть розширений шлюз стиснення:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Розширення RTK

1. Додайте або оновіть JSON-файл фільтра.
2. Додайте щонайменше один зразок `tests[]`, який підтверджує важливу поведінку.
3. Для нових сімейств команд додайте фікстуру до `tests/unit/compression/fixtures/rtk/`.
4. Під час додавання нового класу виводу забезпечте покриття виявлення команд.
5. Запустіть перевірочний і розширений шлюзи RTK.
6. Якщо фільтр локальний для проєкту, зафіксуйте `.rtk/filters.json` у репозиторії та оновлюйте `.rtk/trust.json` лише після перевірки.

---

## Рівні інтенсивності (v3.8.16+)

RTK підтримує **3 рівні інтенсивності**, що забезпечують різний баланс між **агресивністю стиснення** та **безпекою**. Рівень задається через `config.intensity` у конфігурації рушія.

### 3 рівні

| Рівень               | Поріг скорочення    | Економія токенів | Ризик        | Найкраще підходить для                             |
| -------------------- | ------------------- | ---------------- | ------------ | -------------------------------------------------- |
| `minimal`            | 24 рядки на розділ  | ~20-40%          | Дуже низький | Робочого середовища з критично важливим контекстом |
| `standard` (типовий) | 24 рядки на розділ  | ~50-70%          | Низький      | Щоденних сеансів програмування                     |
| `aggressive`         | 16 рядків на розділ | ~70-90%          | Середній     | Тривалих сеансів і максимальної економії           |

### Де відбувається скорочення

Поріг скорочення впливає на `lineFilter.ts`:

```ts
// З open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Зберігаються як **початок**, так і **кінець** кожного розділу; коли спрацьовує скорочення, вміст усередині вилучається.

### Що зберігається, а що скорочується

| Вміст                           | minimal         | standard        | aggressive      |
| ------------------------------- | --------------- | --------------- | --------------- |
| Помилки / трасування стека      | ✅ зберігаються | ✅ зберігаються | ✅ зберігаються |
| Невдалі тести                   | ✅ зберігаються | ✅ зберігаються | ✅ зберігаються |
| Помилки збірки                  | ✅ зберігаються | ✅ зберігаються | ✅ зберігаються |
| Успішні тести (детально)        | ✅ зберігаються | 🟡 згортаються  | 🟡 згортаються  |
| Звичайний вивід (інфологування) | 🟡 згортається  | 🟡 згортається  | ❌ вилучається  |
| Індикатори прогресу             | 🟡 згортаються  | ❌ вилучаються  | ❌ вилучаються  |
| Банер / ASCII-графіка           | 🟡 згортаються  | ❌ вилучаються  | ❌ вилучаються  |

### Вибір відповідної інтенсивності

```
                  Втрата контексту катастрофічна?
                  │
      ┌───────────┼───────────┐
      │           │           │
     ТАК          НІ       НЕ ВПЕВНЕНІ
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Наскільки      Спочатку спробуйте
      │      важлива        `standard` (працює
      │      пропускна      у 80% випадків)
      │      здатність?
      │           │
      │      ┌────┴────┐
      │      │         │
      │   НИЗЬКА     ВИСОКА
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Налаштування інтенсивності

**Для окремої комбінації** (у конфігурації комбінації):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Програмно**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) є
`CompressionEngine` і не має методу `updateConfig`. Натомість оновлюйте конфігурацію рушія
через допоміжну функцію реєстру:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Перевірка результату

Скористайтеся **перевірочним шлюзом** (див. нижче), щоб підтвердити безпечність фільтра за вибраного рівня інтенсивності:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Фільтри не пройшли перевірку за агресивної інтенсивності");
}
```

---

## Розробка власних фільтрів (v3.8.16+)

Каталог `engines/rtk/filters/` містить **понад 49 вбудованих JSON-файлів фільтрів**. Ви можете додати власні фільтри для стиснення виводу спеціалізованих інструментів, які не охоплено стандартними налаштуваннями.

### Схема фільтра (Zod)

```ts
{
  "id": "string",                      // Обов’язково. Ідентифікатор фільтра (kebab-case, наприклад, "python-traceback")
  "label": "string",                   // Обов’язково. Зрозуміла для користувача назва фільтра
  "description": "string",             // Необов’язково (за замовчуванням: ""). Короткий опис того, що робить фільтр
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Необов’язково (0–100, за замовчуванням: 50). Порядок виконання (вище значення = раніше виконання)
  "match": {
    "commands": ["string"],            // Назви команд для зіставлення (наприклад, "python", "pytest")
    "patterns": ["string"],            // Регулярні вирази для зіставлення з виводом
    "outputTypes": ["string"]          // Виявлені класи виводу (наприклад, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Необов’язково (за замовчуванням: false). Видаляти ANSI-коди кольорів
    "replace": [                       // Правила пошуку й заміни (за замовчуванням: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Завершувати обробку при збігу з шаблоном (за замовчуванням: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Пропустити, якщо цей шаблон збігається
      }
    ],
    "includePatterns": ["string"],     // Рядки, які слід зберегти (регулярні вирази, за замовчуванням: [])
    "dropPatterns": ["string"],        // Рядки, які слід видалити (регулярні вирази, за замовчуванням: [])
    "collapsePatterns": ["string"],    // Рядки, які слід згорнути до одного входження (за замовчуванням: [])
    "deduplicate": boolean,            // Необов’язково (за замовчуванням: false). Видаляти дублікати рядків
    "truncateLineAt": number,          // Необов’язково (за замовчуванням: 0). Обрізати рядки до максимальної кількості символів
    "maxLines": number,                // Необов’язково (за замовчуванням: 0). Жорстке обмеження загальної кількості рядків
    "headLines": number,               // Необов’язково (за замовчуванням: 20). Зберігати перші N рядків відповідного виводу
    "tailLines": number,               // Необов’язково (за замовчуванням: 20). Зберігати останні N рядків відповідного виводу
    "onEmpty": "string",               // Необов’язково (за замовчуванням: ""). Резервне повідомлення, якщо всі рядки відфільтровано
    "filterStderr": boolean            // Необов’язково (за замовчуванням: false). Також фільтрувати вивід stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Шаблони, які завжди потрібно зберігати (за замовчуванням: [])
    "summaryPatterns": ["string"]      // Шаблони для підсумкового рядка (за замовчуванням: [])
  },
  "tests": [                           // Вбудовані тести для перевірки (за замовчуванням: [])
    {
      "name": "string",               // Обов’язково. Назва тесту
      "input": "sample output",        // Обов’язково. Зразок вхідного тексту
      "expected": "expected output",   // Обов’язково. Очікуваний стиснений вивід
      "command": "optional command"    // Необов’язково. Контекст команди
    }
  ]
}
```

### Приклад: фільтр зворотного трасування Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Завантаження власних фільтрів

Розмістіть файл у розпізнаваному розташуванні:

```
~/.omniroute/rtk/filters/my-filter.json     # Рівень користувача
<project>/.rtk/filters/my-filter.json      # Рівень проєкту
```

Фільтри автоматично завантажуються під час запуску через `loadRtkFilters()` у `open-sse/services/compression/engines/rtk/filterLoader.ts`. Завантажувач знаходить фільтри в таких розташуваннях:

- Вбудований каталог: `open-sse/services/compression/engines/rtk/filters/`
- Каталог користувача: `~/.omniroute/rtk/filters/`
- Каталог проєкту: `<project>/.rtk/filters/`

Щоб завантажити фільтри програмно:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Параметри: customFiltersEnabled (завантажувати фільтри користувача/проєкту, увімкнено за замовчуванням),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Валідація

Під час завантаження фільтри перевіряються за схемою Zod. Фільтр із неправильною структурою не завантажиться, а помилку буде записано до журналу:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Щоб перевірити всі встановлені фільтри, викличте `runRtkFilterTests()`, експортовану з `open-sse/services/compression/engines/rtk/verify.ts`.

### Рекомендації

1. **Завжди додавайте `tests[]`** — вони доводять, що ваш фільтр працює, і запобігають регресіям
2. **Використовуйте `matchOutput` для ранніх виходів** — якщо один рядок передає суть, замініть ним увесь блок
3. **Віддавайте перевагу `keep`, а не `strip`** — явні правила «завжди зберігати» безпечніші за «завжди видаляти»
4. **Тестуйте на всіх 3 рівнях інтенсивності** — `minimal` не повинен вносити змін, а `aggressive` має й надалі зберігати помилки
5. **Використовуйте поле `unless`** — захищайте ранні виходи умовою «не спрацьовувати, якщо присутній X»

---

## Відновлення необробленого виводу та шлюз перевірки

Коли RTK агресивно стискає вивід, ви можете **відновити оригінальний текст** для налагодження, аудиту або повторного відтворення.

### Як працює відновлення необробленого виводу

```
Оригінальний вивід (10K токенів)
        │
        ▼
Стиснення RTK (з rawOutput.enabled=true)
        │
        ├─▶ Стиснений вивід (2K токенів)  ──▶ до LLM
        │
        └─▶ Оригінальний вивід (10K токенів)   ──▶ збережено в БД
                                                  (пов’язано через request_id)
```

### Увімкнення зберігання необробленого виводу

**Для окремого запиту** (у комбінованій конфігурації):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Обмеження 1MB
    }
  }
}
```

**За замовчуванням**: `rawOutput.enabled: false` (заощаджує місце у сховищі).

### Вартість зберігання

| На один запит                 | Обмеження 1MB | Обмеження 10MB |
| ----------------------------- | ------------- | -------------- |
| Середній стиснений вивід      | ~5KB          | ~5KB           |
| Збережений необроблений вивід | ~50-500KB     | ~500KB-5MB     |
| За 1000 запитів/день          | 50-500MB/день | 500MB-5GB/день |

> **Рекомендація**: вмикайте зберігання необробленого виводу лише для **сеансів налагодження** або **вибіркового аудиту**, а не на постійній основі.

### Відновлення оригіналу

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId зі статистики стиснення
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` повертається в `CompressionStats.rtkRawOutputPointers[]` після стиснення.
Сигнатуру функції див. у `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Шлюз перевірки

**Перевірка фільтрів RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) перевіряє всі фільтри за їхніми `tests[]` і гарантує правильну поведінку на всіх 3 рівнях інтенсивності.

**Викличте `runRtkFilterTests()`**, щоб запустити перевірку:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Що вона перевіряє**:

1. Кожен фільтр завантажується та проходить перевірку схеми
2. Кожен запис `tests[]` створює очікуваний вивід
3. Інтенсивність `minimal` не виконує перетворень (зберігає оригінал і застосовує лише структурні фільтри)
4. Інтенсивність `aggressive` зберігає помилки, невдалі результати тестів і трасування стека
5. Стиснений вивід ніколи не перевищує за розміром оригінальні вхідні дані

- Джерело: `open-sse/services/compression/engines/rtk/` (63 файли, ~70KB)

- **Перед злиттям зміни фільтра** — завжди переконуйтеся, що тести проходять
- **Після оновлення рушія RTK** — схема могла змінитися
- **Періодично під час моніторингу** — захищає від розбіжностей у тестових фікстурах
- **Під час додавання нового інструмента або сімейства команд** — підтверджує, що новий фільтр працює

---

## Дивіться також

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Повний огляд конвеєра стиснення
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Реєстр рушіїв і вбудовані рушії
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Власні рушії, мовні пакети, багаторівневі конвеєри
- Джерело: `open-sse/services/compression/engines/rtk/` (63 файли, ~70 КБ)
