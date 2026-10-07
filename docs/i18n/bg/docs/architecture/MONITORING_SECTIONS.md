# Monitoring & Costs — Navigation Structure (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Реализирано в Група B (план 16). Вижте `src/shared/constants/sidebarVisibility.ts`.

---

## Навигация от най-високо ниво

Страничната лента на таблото за управление (след Група B) съдържа следните секции от най-високо ниво в този ред:

```
Начало
Доставчици
Комбинации
API ключове
Настройки
Анализи
Разходи          ← НОВО (Група B, план 16)
Наблюдение       ← РЕОРГАНИЗИРАНО (Група B, план 16)
...
```

---

## Секция „Разходи“ (нова, ниво 1)

Префикс на пътя: `/dashboard/costs/`

| Елемент                 | URL                                  | Описание                                              |
| ----------------------- | ------------------------------------ | ----------------------------------------------------- |
| Общ преглед             | `/dashboard/costs`                   | Обобщено табло за разходите (преместено от „Анализи“) |
| Ценообразуване          | `/dashboard/costs/pricing`           | Таблица с цени за всеки модел                         |
| Бюджет                  | `/dashboard/costs/budget`            | Бюджетни прагове + предупреждения                     |
| Споделяне на квоти      | `/dashboard/costs/quota-share`       | Пулове за споделяне на квоти + използване             |
| Конфигурация на планове | `/dashboard/costs/quota-share/plans` | Заместващи настройки на планове за всеки доставчик    |

**Обосновка**: „Ценообразуване“, „Бюджет“ и „Споделяне на квоти“ преди се намираха под
`Наблюдение > Параметри на разходите`. Преместването им в отделна секция от най-високо ниво
ги прави лесни за откриване, без да е необходимо навигиране през инструментите за наблюдаемост.

---

## Секция „Наблюдение“ (реорганизирана)

Секцията „Наблюдение“ вече съдържа **Активност най-отгоре**, последвана от **3 подгрупи**:

```
Наблюдение
├── Активност             ← Хронологичен поток (елемент от най-високо ниво)
├── Група „Регистри“
│   ├── Регистри (всички)
│   ├── Регистри на проксито
│   └── Конзолни регистри
├── Група „Одит“
│   ├── Одитен регистър
│   ├── MCP одит
│   └── A2A одит
└── Група „Система“
    ├── Състояние
    └── Среда за изпълнение
```

### Какво е променено спрямо старата структура

| Преди                                                                                      | След                                                |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| „Активност“ = раздел в „Регистри“, който визуализираше одитния регистър                    | „Активност“ = отделен поток (`/dashboard/activity`) |
| Група „Параметри на разходите“ в „Наблюдение“                                              | Преместена в секцията „Разходи“                     |
| Плосък списък: Регистри, Активност (регистри), Одит, Състояние, Среда, Цени, Бюджет, Квоти | Структура с 3 групи + отделна секция „Разходи“      |

---

## „Активност“ спрямо „Одитен регистър“

Те вече са отделни:

| Измерение                | Активност (`/dashboard/activity`)                          | Одитен регистър (`/dashboard/audit`)      |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------- |
| **Предназначение**       | Поток от събития за потребителя („какво се случи наскоро“) | Регистър за съответствие/сигурност        |
| **Източник на данни**    | `GET /api/compliance/audit-log?level=high`                 | `GET /api/compliance/audit-log?level=all` |
| **Формат**               | Хронология, групирана по дни, с разбираеми глаголи + икони | Подробна пагинирана таблица, 50/страница  |
| **Филтри**               | Категория на типа събитие                                  | Действие, сериозност, извършител, период  |
| **Експортиране**         | Не е налично                                               | Експортиране като JSON                    |
| **Филтър по извършител** | Не е приложимо                                             | Може да се филтрира по извършител         |
| **Показвани събития**    | Само действия от високо ниво (списък с разрешени действия) | Всички одитни събития                     |

### Списък с разрешени действия от високо ниво

Дефиниран е в `src/lib/audit/highLevelActions.ts`. Определя кои събития се показват в
потока „Активност“. Списъкът с разрешени действия включва:

- Събития за добавяне/премахване/тестване на доставчик
- Създаване/актуализиране/изтриване на комбинация
- Жизнен цикъл на API ключове (създаване, отмяна, завъртане)
- Достигнат бюджетен праг
- Влизане/излизане при удостоверяване
- Създаване на сесия на облачен агент
- Регистриране на MCP инструмент
- Създаване/изтриване на webhook
- Промени в пулове/планове за квоти (`quota.*` действия, Група B)
- Събития на платформата (актуализиране, внедряване)
- Инсталиране/премахване на умение

Събитията, които не са в този списък, се показват само в одитния регистър.

### Добавяне на ново действие от високо ниво

Редактирайте `src/lib/audit/highLevelActions.ts` и добавете низа на действието към
`HIGH_LEVEL_ACTIONS`. Това изисква PR (списъкът е част от кода и не може да се конфигурира чрез БД).
Съответната икона може да бъде добавена в `src/lib/audit/activityIcons.ts`.

---

## Пренасочване: `/dashboard/logs/activity`

Старият път `/dashboard/logs/activity` се пренасочва постоянно (HTTP 308) към
`/dashboard/activity` чрез `permanentRedirect()` в
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Остарелият идентификатор на страничната лента `logs-activity` е запазен в `HIDEABLE_SIDEBAR_ITEM_IDS`
(но е премахнат от `SIDEBAR_DEFINITIONS`), за да не се нарушат потребителските предварително зададени конфигурации,
които се позовават на стария идентификатор.

---

## i18n

Пространства от имена, добавени от Група B:

| Ключ на пространството от имена | Обхваща                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| `sidebar.costsSection`          | Етикет на секцията „Разходи“                                                          |
| `sidebar.activity`              | Елемент „Активност“ в страничната лента                                               |
| `sidebar.logsGroup`             | Етикет на подгрупата „Регистри“                                                       |
| `sidebar.systemGroup`           | Етикет на подгрупата „Система“                                                        |
| `sidebar.costsOverview`         | Елемент за общ преглед на разходите                                                   |
| `activity.*`                    | Всички низове на страницата „Активност“ (заглавие, глаголи, филтри, празно състояние) |

Езиците — източник на достоверни данни, са `pt-BR` и `en`. Всички останали 40 езика използват
английски като резервен чрез механизма за резервен език на `next-intl` (конфигуриран в `src/i18n/config.ts`).
