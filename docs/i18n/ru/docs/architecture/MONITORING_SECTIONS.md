# Monitoring & Costs — Navigation Structure (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Реализовано в группе B (план 16). См. `src/shared/constants/sidebarVisibility.ts`.

---

## Навигация верхнего уровня

Боковая панель дашборда (после изменений группы B) содержит следующие разделы верхнего уровня в указанном порядке:

```
Главная
Провайдеры
Комбинации
Ключи API
Настройки
Аналитика
Затраты        ← НОВЫЙ (группа B, план 16)
Мониторинг     ← РЕОРГАНИЗОВАН (группа B, план 16)
...
```

---

## Раздел «Затраты» (новый, уровень 1)

Префикс пути: `/dashboard/costs/`

| Элемент          | URL                                  | Описание                                          |
| ---------------- | ------------------------------------ | ------------------------------------------------- |
| Обзор            | `/dashboard/costs`                   | Сводный дашборд затрат (перенесён из «Аналитики») |
| Цены             | `/dashboard/costs/pricing`           | Таблица цен по моделям                            |
| Бюджет           | `/dashboard/costs/budget`            | Пороговые значения бюджета и оповещения           |
| Совместные квоты | `/dashboard/costs/quota-share`       | Пулы Quota Share и их использование               |
| Настройка планов | `/dashboard/costs/quota-share/plans` | Переопределения планов для отдельных провайдеров  |

**Обоснование**: ранее разделы «Цены», «Бюджет» и «Совместные квоты» находились в
`Мониторинг > Параметры затрат`. Их перенос в отдельный раздел верхнего уровня
упрощает их поиск без необходимости переходить через инструменты наблюдаемости.

---

## Раздел «Мониторинг» (реорганизован)

Теперь в верхней части раздела «Мониторинг» находится **Активность**, за которой следуют **3 подгруппы**:

```
Мониторинг
├── Активность             ← Лента временной шкалы (элемент верхнего уровня)
├── Группа журналов
│   ├── Журналы (все)
│   ├── Журналы прокси
│   └── Журналы консоли
├── Группа аудита
│   ├── Журнал аудита
│   ├── Аудит MCP
│   └── Аудит A2A
└── Системная группа
    ├── Состояние
    └── Среда выполнения
```

### Что изменилось по сравнению со старой структурой

| Раньше                                                                                      | Теперь                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| «Активность» = вкладка внутри «Журналов», отображавшая журнал аудита                        | «Активность» = отдельная лента (`/dashboard/activity`) |
| Группа «Параметры затрат» в разделе «Мониторинг»                                            | Перенесена в раздел «Затраты»                          |
| Плоский список: журналы, активность (журналы), аудит, состояние, среда, цены, бюджет, квота | Структура из 3 групп + отдельный раздел «Затраты»      |

---

## Активность и журнал аудита

Теперь это два разных раздела:

| Характеристика           | Активность (`/dashboard/activity`)                                     | Журнал аудита (`/dashboard/audit`)                      |
| ------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| **Назначение**           | Пользовательская лента событий («что произошло недавно»)               | Журнал соответствия требованиям / безопасности          |
| **Источник данных**      | `GET /api/compliance/audit-log?level=high`                             | `GET /api/compliance/audit-log?level=all`               |
| **Формат**               | Временная шкала с группировкой по дням, понятными глаголами и значками | Плотная таблица с пагинацией, по 50 записей на страницу |
| **Фильтры**              | Категория типа события                                                 | Действие, серьёзность, субъект, диапазон дат            |
| **Экспорт**              | Недоступен                                                             | Экспорт в JSON                                          |
| **Фильтр субъекта**      | Неприменим                                                             | Фильтрация по субъекту                                  |
| **Показываемые события** | Только высокоуровневые действия (список разрешённых действий)          | Все события аудита                                      |

### Список разрешённых высокоуровневых действий

Определён в `src/lib/audit/highLevelActions.ts`. Он управляет тем, какие события отображаются в
ленте активности. В список разрешённых действий входят:

- События добавления, удаления и тестирования провайдеров
- Создание, обновление и удаление комбинаций
- Жизненный цикл ключей API (создание, отзыв, ротация)
- Достижение порогового значения бюджета
- Вход и выход при аутентификации
- Создание сеанса облачного агента
- Регистрация инструмента MCP
- Создание и удаление вебхуков
- Изменения пулов квот и планов (действия `quota.*`, группа B)
- События платформы (обновление, развёртывание)
- Установка и удаление навыков

События, которых нет в этом списке, отображаются только в журнале аудита.

### Добавление нового высокоуровневого действия

Измените `src/lib/audit/highLevelActions.ts` и добавьте строку действия в
`HIGH_LEVEL_ACTIONS`. Для этого требуется PR (список определён в коде и не может настраиваться через БД).
Соответствующий значок можно добавить в `src/lib/audit/activityIcons.ts`.

---

## Перенаправление: `/dashboard/logs/activity`

Старый путь `/dashboard/logs/activity` постоянно перенаправляется (HTTP 308) на
`/dashboard/activity` через `permanentRedirect()` в
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Устаревший идентификатор боковой панели `logs-activity` сохранён в `HIDEABLE_SIDEBAR_ITEM_IDS`
(но удалён из `SIDEBAR_DEFINITIONS`), чтобы не нарушить работу пользовательских предустановок,
ссылающихся на старый идентификатор.

---

## i18n

Пространства имён, добавленные группой B:

| Ключ пространства имён  | Что охватывает                                                                   |
| ----------------------- | -------------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Метка раздела «Затраты»                                                          |
| `sidebar.activity`      | Элемент «Активность» на боковой панели                                           |
| `sidebar.logsGroup`     | Метка подгруппы журналов                                                         |
| `sidebar.systemGroup`   | Метка системной подгруппы                                                        |
| `sidebar.costsOverview` | Элемент обзора затрат                                                            |
| `activity.*`            | Все строки страницы «Активность» (заголовок, глаголы, фильтры, пустое состояние) |

Исходные локали: `pt-BR` и `en`. Для всех остальных 40 локалей используется
английский язык через механизм резервной локали `next-intl` (настроен в `src/i18n/config.ts`).
