# Compression Rules Format (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Правила стиснення — це JSON-файли, що завантажуються під час виконання. Вони навмисно містять лише дані, щоб нові
мовні пакети та фільтри команд RTK можна було перевіряти без внесення змін до коду рушія.

> **Канонічна схема (джерело істини):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema, чернетка 2020-12).
> Наведені нижче приклади мають ілюстративний характер — у разі сумнівів перевірте свій пакет за допомогою `_schema.json`.

## Пакети правил Caveman

Пакети правил Caveman розташовані в:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Кожен пакет містить заміни, які застосовуються до звичайного тексту після ізоляції захищених областей.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Поля Caveman

| Поле                     | Обов’язкове | Опис                                                                            |
| ------------------------ | ----------- | ------------------------------------------------------------------------------- |
| `language`               | так         | Ключ мови у форматі, подібному до BCP-47, наприклад `en`, `pt-BR`, `es`         |
| `category`               | так         | Назва файлу/категорія пакета, наприклад `filler` або `dedup`                    |
| `rules`                  | так         | Масив правил заміни на основі регулярних виразів                                |
| `rules[].name`           | так         | Стабільна назва правила                                                         |
| `rules[].pattern`        | так         | Вихідний вираз регулярного виразу JavaScript                                    |
| `rules[].flags`          | ні          | Прапорці регулярного виразу JavaScript; типове значення — `gi`                  |
| `rules[].replacement`    | ні          | Рядок заміни або резервне значення, якщо в `replacementMap` немає відповідності |
| `rules[].replacementMap` | ні          | Заміни для конкретних збігів, ключами яких є нормалізований зіставлений текст   |
| `rules[].context`        | ні          | `all`, `user`, `assistant` або `system`; типове значення — `all`                |
| `rules[].category`       | ні          | `filler`, `context`, `structural`, `dedup`, `terse` або `ultra`                 |
| `rules[].minIntensity`   | ні          | `lite`, `full` або `ultra`; типове значення — `lite`                            |
| `rules[].description`    | ні          | Зрозумілий для людини короткий опис правила                                     |

Використовуйте `flags`, коли важливе зіставлення з урахуванням регістру, наприклад для видалення артикля перед текстом
у нижньому регістрі без видалення `the OpenAI API`. Використовуйте `replacementMap`, коли один регулярний вираз має кілька альтернатив,
для яких потрібні різні результати; це дає змогу пакетам правил JSON містити лише дані, зберігаючи поведінку
функціональніших вбудованих функцій заміни TypeScript.

## Пакети фільтрів RTK

Фільтри RTK розташовані за шляхом:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Кожен фільтр описує, як розпізнавати та стискати сімейство виводу команд.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Поля RTK

| Поле                       | Обов’язкове | Опис                                                                               |
| -------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `id`                       | так         | Стабільний ідентифікатор фільтра                                                   |
| `label`                    | так         | Зрозуміла назва для інформаційної панелі                                           |
| `category`                 | так         | Сімейство фільтра: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | ні          | За збігу кількох фільтрів перемагає фільтр із вищим пріоритетом                    |
| `match.outputTypes`        | ні          | Ідентифікатори виводу детектора, які вибирають цей фільтр                          |
| `match.commands`           | ні          | Токени команд, які вибирають цей фільтр                                            |
| `match.patterns`           | ні          | Регулярні вирази, які вибирають цей фільтр за текстом виводу                       |
| `rules.stripAnsi`          | ні          | Видаляє керівні послідовності ANSI перед етапами обробки регулярними виразами      |
| `rules.replace`            | ні          | Упорядковані заміни за регулярними виразами, що застосовуються рядок за рядком     |
| `rules.matchOutput`        | ні          | Правила негайного повернення виводу з необов’язковою умовою `unless`               |
| `rules.includePatterns`    | ні          | Рядки, яким надається перевага під час збереження                                  |
| `rules.dropPatterns`       | ні          | Рядки, які потрібно видалити як шум                                                |
| `rules.collapsePatterns`   | ні          | Повторювані відповідні рядки, які можна згорнути                                   |
| `rules.deduplicate`        | ні          | Згортає дублікати нормалізованих рядків                                            |
| `rules.truncateLineAt`     | ні          | Безпечне для Unicode обмеження кількості символів у кожному рядку                  |
| `rules.maxLines`           | ні          | Максимальна кількість збережених рядків перед збереженням кінцевої частини         |
| `rules.headLines`          | ні          | Початкові рядки, що зберігаються під час обрізання                                 |
| `rules.tailLines`          | ні          | Кінцеві рядки, що зберігаються для актуального контексту                           |
| `rules.onEmpty`            | ні          | Резервне повідомлення, якщо фільтрація видаляє весь вміст                          |
| `rules.filterStderr`       | ні          | Нормалізує поширені префікси stderr перед наступними етапами фільтрації            |
| `preserve.errorPatterns`   | ні          | Рядки помилок, які мають зберігатися після обрізання                               |
| `preserve.summaryPatterns` | ні          | Підсумкові рядки, які мають зберігатися після обрізання                            |
| `tests[]`                  | ні          | Вбудовані перевірочні приклади, які використовує шлюз перевірки RTK                |

RTK застосовує декларативні етапи в такому порядку: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` і `onEmpty`.

Власні фільтри можна завантажувати з таких джерел:

1. Файли проєкту `.rtk/filters.json` — лише після надання відповідного хешу в `.rtk/trust.json` або
   ввімкнення `trustProjectFilters`.
2. Глобальний файл `DATA_DIR/rtk/filters.json`.
3. Вбудовані фільтри.

Власні файли проєкту або глобальні файли можуть містити один об’єкт фільтра чи масив об’єктів фільтрів. Недійсні
власні фільтри пропускаються з діагностичними повідомленнями; недійсні вбудовані фільтри спричиняють помилку перевірки.

Файл довіри проєкту:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Перевизначення середовища `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` дозволяє довіряти фільтрам проєкту без
хешу, і його слід використовувати лише для контрольованої локальної розробки.

## Правила безпеки

- Забезпечуйте ідемпотентність правил: повторне застосування того самого фільтра не повинно пошкоджувати результат.
- За можливості зберігайте точний текст помилок, шляхи до файлів, номери рядків і зведення команд.
- Уникайте правил, які змінюють блоки коду, дані JSON, URL-адреси або секрети.
- Додавайте модульні тести для нових сімейств команд у тести детекторів і фільтрів.
- Додавайте зразки `tests[]` до кожного вбудованого фільтра та до спільних користувацьких фільтрів.

## Валідація

Пакети правил перевіряються перед використанням. Вбудовані пакети Caveman і вбудовані фільтри RTK негайно завершують роботу з помилкою
під час валідації, щоб пошкоджені ресурси випуску було виявлено до постачання. Користувацькі фільтри RTK
пропускаються з діагностичними повідомленнями, якщо синтаксичний аналіз або перевірка довіри завершується невдало.

Цільова валідація:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
