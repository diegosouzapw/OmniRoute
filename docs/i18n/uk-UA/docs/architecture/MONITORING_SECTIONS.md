# Monitoring & Costs — Navigation Structure (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Реалізовано в групі B (план 16). Див. `src/shared/constants/sidebarVisibility.ts`.

---

## Навігація верхнього рівня

Бічна панель інформаційної панелі (після групи B) містить такі розділи верхнього рівня в зазначеному порядку:

```
Головна
Провайдери
Комбінації
Ключі API
Налаштування
Аналітика
Витрати       ← НОВЕ (група B, план 16)
Моніторинг     ← РЕОРГАНІЗОВАНО (група B, план 16)
...
```

---

## Розділ «Витрати» (новий, рівень 1)

Префікс шляху: `/dashboard/costs/`

| Елемент            | URL                                  | Опис                                             |
| ------------------ | ------------------------------------ | ------------------------------------------------ |
| Огляд              | `/dashboard/costs`                   | Зведена панель витрат (перенесено з «Аналітики») |
| Ціноутворення      | `/dashboard/costs/pricing`           | Таблиця цін для кожної моделі                    |
| Бюджет             | `/dashboard/costs/budget`            | Порогові значення бюджету та сповіщення          |
| Спільна квота      | `/dashboard/costs/quota-share`       | Пули спільних квот і їх використання             |
| Конфігурація плану | `/dashboard/costs/quota-share/plans` | Перевизначення планів для кожного провайдера     |

**Обґрунтування**: раніше «Ціноутворення», «Бюджет» і «Спільна квота» були в розділі
`Моніторинг > Параметри витрат`. Перенесення їх в окремий розділ верхнього рівня
робить їх доступними без потреби переходити через інструменти спостережуваності.

---

## Розділ «Моніторинг» (реорганізовано)

У розділі «Моніторинг» тепер **«Активність» розташована зверху**, а за нею йдуть **3 підгрупи**:

```
Моніторинг
├── Активність              ← Стрічка часової шкали (елемент верхнього рівня)
├── Група журналів
│   ├── Журнали (усі)
│   ├── Журнали проксі
│   └── Журнали консолі
├── Група аудиту
│   ├── Журнал аудиту
│   ├── Аудит MCP
│   └── Аудит A2A
└── Системна група
    ├── Стан
    └── Середовище виконання
```

### Що змінилося порівняно зі старою структурою

| До                                                                                                    | Після                                                 |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| «Активність» = вкладка в «Журналах», яка відображала журнал аудиту                                    | «Активність» = окрема стрічка (`/dashboard/activity`) |
| Група «Параметри витрат» у «Моніторингу»                                                              | Перенесено до розділу «Витрати»                       |
| Плоский список: журнали, активність (журнали), аудит, стан, середовище виконання, ціни, бюджет, квота | Структура з 3 груп + окремий розділ «Витрати»         |

---

## «Активність» і «Журнал аудиту»

Тепер це два окремі компоненти:

| Характеристика       | Активність (`/dashboard/activity`)                                           | Журнал аудиту (`/dashboard/audit`)                  |
| -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| **Призначення**      | Орієнтована на користувача стрічка подій («що сталося нещодавно»)            | Журнал відповідності вимогам / безпеки              |
| **Джерело даних**    | `GET /api/compliance/audit-log?level=high`                                   | `GET /api/compliance/audit-log?level=all`           |
| **Формат**           | Часова шкала, згрупована за днями, зі зрозумілими дієсловами та піктограмами | Щільна таблиця з пагінацією, 50 записів на сторінку |
| **Фільтри**          | Категорія типу події                                                         | Дія, рівень серйозності, виконавець, діапазон дат   |
| **Експорт**          | Недоступний                                                                  | Експорт у JSON                                      |
| **Фільтр виконавця** | Не застосовується                                                            | Фільтрація за виконавцем                            |
| **Показані події**   | Лише дії верхнього рівня (список дозволених)                                 | Усі події аудиту                                    |

### Список дозволених дій верхнього рівня

Визначений у `src/lib/audit/highLevelActions.ts`. Керує тим, які події з’являються
у стрічці активності. Список дозволених дій включає:

- Події додавання, видалення та тестування провайдерів
- Створення, оновлення та видалення комбінацій
- Життєвий цикл ключів API (створення, відкликання, ротація)
- Досягнення порогового значення бюджету
- Вхід і вихід із системи
- Створення сесії хмарного агента
- Реєстрація інструмента MCP
- Створення та видалення вебхуків
- Зміни пулу квот або плану (дії `quota.*`, група B)
- Події платформи (оновлення, розгортання)
- Встановлення та видалення навичок

Події, яких немає в цьому списку, відображаються лише в журналі аудиту.

### Додавання нової дії верхнього рівня

Відредагуйте `src/lib/audit/highLevelActions.ts` і додайте рядок дії до
`HIGH_LEVEL_ACTIONS`. Для цього потрібен PR (список визначено в коді, його не можна
налаштувати через БД). Відповідну піктограму можна додати до
`src/lib/audit/activityIcons.ts`.

---

## Перенаправлення: `/dashboard/logs/activity`

Старий шлях `/dashboard/logs/activity` постійно перенаправляється (HTTP 308) на
`/dashboard/activity` за допомогою `permanentRedirect()` у
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Застарілий ідентифікатор бічної панелі `logs-activity` збережено в `HIDEABLE_SIDEBAR_ITEM_IDS`
(але видалено із `SIDEBAR_DEFINITIONS`), щоб не порушити роботу користувацьких наборів
налаштувань, які посилаються на старий ідентифікатор.

---

## i18n

Простори імен, додані групою B:

| Ключ простору імен      | Охоплює                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Назву розділу «Витрати»                                                       |
| `sidebar.activity`      | Елемент «Активність» на бічній панелі                                         |
| `sidebar.logsGroup`     | Назву підгрупи журналів                                                       |
| `sidebar.systemGroup`   | Назву системної підгрупи                                                      |
| `sidebar.costsOverview` | Елемент огляду витрат                                                         |
| `activity.*`            | Усі рядки сторінки «Активність» (заголовок, дієслова, фільтри, порожній стан) |

Основні локалі: `pt-BR` і `en`. Для решти 40 локалей використовується резервна
англійська локалізація через механізм резервної локалі `next-intl` (налаштований у
`src/i18n/config.ts`).
