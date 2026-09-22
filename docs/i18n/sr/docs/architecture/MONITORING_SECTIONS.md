# Monitoring & Costs — Navigation Structure (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Имплементирано у Групи B (план 16). Погледајте `src/shared/constants/sidebarVisibility.ts`.

---

## Навигација високог нивоа

Бочна трака контролне табле (након Групе B) има следеће одељке највишег нивоа, овим редоследом:

```
Почетна
Провајдери
Комбинације
API кључеви
Подешавања
Аналитика
Трошкови       ← НОВО (Група B, план 16)
Надгледање      ← РЕОРГАНИЗОВАНО (Група B, план 16)
...
```

---

## Одељак Трошкови (нов, ниво 1)

Префикс путање: `/dashboard/costs/`

| Ставка              | URL                                  | Опис                                                          |
| ------------------- | ------------------------------------ | ------------------------------------------------------------- |
| Преглед             | `/dashboard/costs`                   | Обједињена контролна табла трошкова (премештена из Аналитике) |
| Цене                | `/dashboard/costs/pricing`           | Табела цена по моделу                                         |
| Буџет               | `/dashboard/costs/budget`            | Прагови буџета + упозорења                                    |
| Дељење квоте        | `/dashboard/costs/quota-share`       | Групе за дељење квоте + употреба                              |
| Конфигурација плана | `/dashboard/costs/quota-share/plans` | Замене поставки плана по провајдеру                           |

**Образложење**: Цене, Буџет и Дељење квоте раније су се налазили у оквиру
`Надгледање > Параметри трошкова`. Њихово премештање у наменски одељак највишег нивоа
омогућава да се лакше пронађу без навигације кроз алате за опсервабилност.

---

## Одељак Надгледање (реорганизован)

Одељак Надгледање сада има **Активност на врху**, након чега следе **3 подгрупе**:

```
Надгледање
├── Активност             ← Хронолошки ток (ставка највишег нивоа)
├── Група Дневници
│   ├── Дневници (сви)
│   ├── Дневници проксија
│   └── Дневници конзоле
├── Група Ревизија
│   ├── Дневник ревизије
│   ├── MCP ревизија
│   └── A2A ревизија
└── Група Систем
    ├── Стање
    └── Извршавање
```

### Шта је промењено у односу на стару структуру

| Пре                                                                                          | После                                            |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Активност = картица у оквиру Дневника која је приказивала Дневник ревизије                   | Активност = наменски ток (`/dashboard/activity`) |
| Група Параметри трошкова у оквиру Надгледања                                                 | Премештена у одељак Трошкови                     |
| Равна листа: Дневници, Активност (дневници), Ревизија, Стање, Извршавање, Цене, Буџет, Квота | Структура са 3 групе + наменски одељак Трошкови  |

---

## Активност у односу на Дневник ревизије

Ово су сада две различите ставке:

| Димензија              | Активност (`/dashboard/activity`)                            | Дневник ревизије (`/dashboard/audit`)     |
| ---------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| **Сврха**              | Ток догађаја намењен кориснику („шта се недавно догодило“)   | Дневник усклађености / безбедности        |
| **Извор података**     | `GET /api/compliance/audit-log?level=high`                   | `GET /api/compliance/audit-log?level=all` |
| **Формат**             | Временска линија, груписана по дану, читљиви глаголи + иконе | Збијена пагинирана табела, 50 по страници |
| **Филтери**            | Категорија типа догађаја                                     | Радња, озбиљност, актер, период           |
| **Извоз**              | Није доступан                                                | JSON извоз                                |
| **Филтер актера**      | Није применљиво                                              | Могуће филтрирање по актеру               |
| **Приказани догађаји** | Само радње високог нивоа (листа дозвољених радњи)            | Сви догађаји ревизије                     |

### Листа дозвољених радњи високог нивоа

Дефинисана је у `src/lib/audit/highLevelActions.ts`. Она одређује који се догађаји приказују у
току Активности. Листа дозвољених радњи обухвата:

- Догађаје додавања/уклањања/тестирања провајдера
- Креирање/ажурирање/брисање комбинације
- Животни циклус API кључа (креирање, опозив, ротирање)
- Достизање прага буџета
- Пријављивање/одјављивање при аутентификацији
- Креирање сесије агента у облаку
- Регистрацију MCP алата
- Креирање/брисање веб-хука
- Промене групе/плана квоте (`quota.*` радње, Група B)
- Догађаје платформе (ажурирање, постављање)
- Инсталирање/уклањање вештине

Догађаји који нису на овој листи појављују се само у Дневнику ревизије.

### Додавање нове радње високог нивоа

Измените `src/lib/audit/highLevelActions.ts` и додајте ниску радње у
`HIGH_LEVEL_ACTIONS`. За ово је потребан PR (листа је дефинисана у коду и не може се конфигурисати путем базе података).
Одговарајућа икона може се додати у `src/lib/audit/activityIcons.ts`.

---

## Преусмеравање: `/dashboard/logs/activity`

Стара путања `/dashboard/logs/activity` трајно се преусмерава (HTTP 308) на
`/dashboard/activity` путем `permanentRedirect()` у
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Застарели ID бочне траке `logs-activity` задржан је у `HIDEABLE_SIDEBAR_ITEM_IDS`
(али је уклоњен из `SIDEBAR_DEFINITIONS`) како се не би нарушиле корисничке унапред дефинисане поставке које
упућују на стари ID.

---

## i18n

Простори имена које је додала Група B:

| Кључ простора имена     | Обухвата                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| `sidebar.costsSection`  | Ознаку одељка Трошкови                                                |
| `sidebar.activity`      | Ставку Активност у бочној траци                                       |
| `sidebar.logsGroup`     | Ознаку подгрупе Дневници                                              |
| `sidebar.systemGroup`   | Ознаку подгрупе Систем                                                |
| `sidebar.costsOverview` | Ставку прегледа трошкова                                              |
| `activity.*`            | Све ниске странице Активност (наслов, глаголи, филтери, празно стање) |

Референтни локали су: `pt-BR` и `en`. Свих осталих 40 локала подразумевано користи
енглески путем резервног механизма пакета `next-intl` (конфигурисаног у `src/i18n/config.ts`).
