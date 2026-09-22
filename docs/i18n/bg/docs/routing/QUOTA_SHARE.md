# Quota Sharing Engine (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Препратка към документа**: `docs/routing/QUOTA_SHARE.md`
> Част от група B (планове 16 + 22).

---

## Общ преглед

Механизмът за споделяне на квоти разпределя справедливо времево базираната квота на доставчика (напр. 5-часов прозорец на Codex, 1500 заявки/ч за Kimi) между множество API ключове, които споделят една и съща връзка.

**Проблемът, който решава:** OmniRoute проксира множество API ключове към един и същ акаунт при доставчика нагоре по веригата. Без логика за споделяне внезапен пик от ключ A може да изчерпи квотата на доставчика за часа, оставяйки ключове B и C блокирани до нулирането на прозореца. Механизмът предотвратява това чрез:

1. Проследяване на текущото потребление на всеки ключ по измерение (%, заявки, токени, $).
2. Прилагане на запазващ натоварването алгоритъм за справедливо разпределение: даден ключ може да заема от неизползваните дялове, докато глобалният пул не е наситен.
3. Налагане на резултата в критичния път (`chatCore.ts`), преди заявката да достигне изпълнителя нагоре по веригата.

---

## Алгоритъм: Запазващо натоварването справедливо разпределение

Реализиран в `src/lib/quota/fairShare.ts`.

### Режими

| Условие                                    | Режим        | Поведение                                                        |
| ------------------------------------------ | ------------ | ---------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Щедър**    | Ключът може да заема до глобалния лимит минус общото потребление |
| `globalUsedPercent >= saturationThreshold` | **Стриктен** | Стриктно налагане на индивидуалния справедлив дял                |

По подразбиране `saturationThreshold = 0.5` (променлива на средата `QUOTA_SATURATION_THRESHOLD`).

### Решение за всяко измерение

За всяко активно измерение в пула механизмът изчислява:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = текущата стойност за този ключ в плъзгащия се прозорец (от QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

След това:

- **`policy = hard`**: ако `consumed > fairShareAllowed` и режимът е стриктен → **блокиране**.
- **`policy = soft`**: ако `consumed > fairShareAllowed` и режимът е стриктен → **санкциониране** (понижаване на приоритета в комбинацията; никога твърдо блокиране).
- **`policy = burst`**: разрешаване, докато има свободен глобален капацитет, независимо от справедливия дял.

### Абсолютен лимит

`capValue` + `capUnit` за дадено разпределение представляват твърда горна граница, независима от режима или политиката. Всяко измерение, при което `consumed >= capValue`, винаги **блокира** заявката.

### Проверка по множество измерения

Заявката се блокира, ако **което и да е** измерение в пула би я блокирало. Измеренията са независими — изчерпването на 5h% не засяга измерението weekly%.

### Заемане

В щедър режим ключ, чието разпределение не е изчерпано, може да използва излишъка от неусвоените дялове на други ключове. Формулата е:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

където `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Глобалният таван (`limit` на пула за това измерение) винаги е твърдата горна граница.

---

## Брояч с плъзгащ се прозорец

Реализиран в `src/lib/quota/sqliteQuotaStore.ts` и `redisQuotaStore.ts`.

Две кофи за всяка двойка `(apiKeyId, dimensionKey)`:

- `curr`: текуща кофа (`floor(nowMs / windowMs)`)
- `prev`: предишна кофа (`curr - 1`)

Ефективна стойност в плъзгащия се прозорец:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Точност**: ~99% точност. Грешката е най-много 1% от размера на прозореца на границата между кофите (присъщо на приближението с 2 кофи).

### Паралелност

Драйвер за SQLite: вътрешнопроцесен мютекс за всеки ключ `(apiKeyId | dimensionKey)` предотвратява състоянието на съревнование при четене-промяна-запис. Шаблонът следва механизма срещу лавинообразни едновременни заявки в `src/sse/services/auth.ts`.

Драйвер за Redis: Lua EVAL скрипт за атомарно увеличаване — изпълнява се като една команда на Redis.

---

## Драйвери

### SQLite (по подразбиране, без инсталация)

- Таблица: `quota_consumption` (вижте миграциите `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Най-подходящ за внедрявания с една инстанция.
- Всички постоянни данни се съхраняват в съществуващата SQLite база данни на OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (по избор, за множество инстанции)

- Изисква npm пакета `ioredis`.
- Броячите се съхраняват в Redis; метаданните (пулове/разпределения) остават в SQLite.
- Най-подходящ за внедрявания с множество реплики, при които броячите трябва да бъдат споделени.

### Превключване между драйвери

Чрез потребителския интерфейс за настройки (`/dashboard/settings` → Хранилище за квоти) или чрез променливи на средата:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Настройката в базата данни има предимство пред тази от средата. Ако `driver=redis`, но липсва URL или
`ioredis` не е инсталиран, фабриката се връща към SQLite и записва предупреждение в журнала.

Ред за избор на драйвер:

1. Настройка в базата данни `quotaStore.driver`
2. Променлива на средата `QUOTA_STORE_DRIVER`
3. По подразбиране: `sqlite`

---

## Множество измерения

Един пул може да има няколко измерения. Всяко измерение е независимо:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // глобален таван на пула за това измерение
}
```

**Пример: план Codex** (5h% + седмичен %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

За да бъде разрешена дадена заявка, тя трябва да удовлетворява всички измерения.

---

## Разрешаване на планове

Реализирано в `src/lib/quota/planResolver.ts`.

Приоритет (от най-висок към най-нисък):

1. **Ръчно заместване в базата данни** — таблицата `provider_plans`, за всеки `connectionId`.
2. **Познат каталог** — `src/lib/quota/planRegistry.ts` (само данни).
3. **Празен план** — няма измерения, изисква се ръчна конфигурация.

### Познат каталог

| Доставчик             | Измерения                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, неизвестен), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Няма стойност по подразбиране — изисква се ръчна конфигурация |

---

## Интеграция в конвейера

### PRE кука (`open-sse/handlers/chatCore.ts`)

Изпълнява се преди изпълнителя към външната услуга, след проверките за удостоверяване и правилата:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() за всяко измерение
      → fairShare.decideFairShare()
      → при блокиране → връщане на 429 (buildErrorBody, строго правило №12)
      → при разрешаване + понижаване на приоритета → задаване на quotaSoftPenalty=true за кандидата
  → executor.execute()
```

**Разрешаване при грешка**: ако `enforceQuotaShare` хвърли грешка, заявката се допуска
със запис `pino.warn` в журнала. Това предотвратява блокирането на целия
трафик поради грешка в механизма за квоти.

### POST кука (записване на потреблението)

След успешен отговор:

```
executor връща успех
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() за всяко измерение
      → разрешаване при грешка: грешките се записват като pino.warn и никога не се предават на клиента
```

**Бележка за отклонението**: ако `consume` се провали след отговора, подвижният брояч отчита
по-ниска стойност от действителната. Сигналът за насищане от доставчика (напр. `anthropic-ratelimit-unified-5h-utilization`)
коригира глобалната оценка при следващата заявка.

### Меко наказание за комбинации (`open-sse/services/combo.ts`)

Когато `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // по подразбиране 0.7
}
```

Наказанието се прилага след всички останали фактори за оценяване. То намалява вероятността
автоматичната комбинация да избере наситен ключ, без да го блокира напълно.

---

## Преглед на потребителския интерфейс

### `/dashboard/costs/quota-share` — Основна страница с пулове

Компоненти (всички в `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Компонент              | Предназначение                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Въвеждаща карта, обясняваща споделянето на квоти на нови потребители                            |
| `CreatePoolModal`      | Създаване на нов пул от квоти (връзка + име + начални разпределения)                            |
| `PoolCard`             | Обобщение за всеки пул: име, връзка, брой разпределения                                         |
| `DimensionBar`         | Лента по измерение: дял на всеки ключ + общо използване                                         |
| `AllocationTable`      | Таблица с потребление, справедлив дял, дефицит/излишък и флаг за заемане                        |
| `BurnRateChart`        | Линейна диаграма на EMA скоростта на изчерпване (Recharts се зарежда отложено чрез `dynamic()`) |
| `EditAllocationsModal` | Редактиране на теглата, ограниченията и политиките за пул                                       |

Хукове на страницата:

- `usePools` — извлича `GET /api/quota/pools` на всеки 30 сек.
- `usePoolUsage` — извлича `GET /api/quota/pools/[id]/usage` при заявка.
- `useLocalStoragePoolMigration` — изпълнява се веднъж при монтиране, за да мигрира наследените LS данни.

### `/dashboard/costs/quota-share/plans` — Конфигурация на план на доставчик

- `ProviderPlanConfigClient.tsx`: падащо меню за избор на доставчик, преглед на определения
  план (автоматично от каталога или чрез ръчно заместване) и редактиране на измеренията.
- Промените се записват чрез `PUT /api/quota/plans/[connectionId]`.
- Изтриването връща към каталожния или към празен план.

---

## Променливи на средата

| Променлива                         | По подразбиране | Описание                                                         |
| ---------------------------------- | --------------- | ---------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`        | Драйвер за използване: `sqlite` или `redis`                      |
| `QUOTA_STORE_REDIS_URL`            | _(празно)_      | URL на Redis, напр. `redis://localhost:6379`                     |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`           | 0..1; `>= праг` активира строг режим                             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`           | 0..1; множител за комбинираната оценка при мека политика         |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`            | Дни преди GC да премахне старите сегменти на `quota_consumption` |

Настройките на БД (`quotaStore.*`) имат предимство пред променливите на средата.

---

## Отстраняване на проблеми

### Redis е конфигуриран, но не се свързва

Проверете дали `ioredis` е инсталиран (`npm ls ioredis`) и дали
`QUOTA_STORE_REDIS_URL` е достъпен. При неуспешна връзка фабриката преминава към
SQLite (регистрира се на ниво `warn`).

### `peek` връща остарели данни / допуска при грешка

Ако `peek` хвърли грешка, `enforceQuotaShare` третира резултата като „разреши“
(допускане при грешка). Проверете логовете на `pino` за записи `quota:enforce` и
`quota:factory`, за да установите основната причина.

### Отклонение на брояча за потребление

Ако действителното потребление при доставчика се различава от броячите, това е
очаквано — плъзгащият прозорец с 2 сегмента има ~1% грешка по границите на
прозореца, а `consume` се изпълнява без изчакване след отговора. Сигналът за
насищане (`saturationSignals.ts`) отчита реалното натоварване при доставчика с
TTL от 30 сек. и съответно коригира `globalUsedPercent`.

### Пулът показва „няма данни“ за скоростта на изчерпване

`computeBurnRate` изисква поне 2 исторически извадки. Новите пулове без предишни
извиквания на `consume` ще показват `tokensPerSecond: 0` и `timeToExhaustionMs: null`.

---

## Миграция от localStorage

При първоначалното зареждане на `/dashboard/costs/quota-share` hook-ът `useLocalStoragePoolMigration`
проверява:

1. `localStorage.getItem("omniroute:quota-share:pools")` не е празен.
2. `GET /api/quota/pools` връща `[]` (базата данни е празна).

Ако и двете условия са изпълнени, всеки наследен пул се изпраща пакетно към `POST /api/quota/pools`,
след което ключът от localStorage се премахва. Миграцията е идемпотентна: условие 2 предотвратява
повторното мигриране.

---

## Класификация на вътрешната стратегия

`quota-share` е стратегия за маршрутизиране **само за вътрешна употреба** (`INTERNAL_ROUTING_STRATEGY_VALUES` в
`src/shared/constants/routingStrategies.ts`). Тя се използва изключително от създадени от системата
комбинации от пулове `qtSd/` и умишлено е изключена от `ROUTING_STRATEGY_VALUES`, така че никога да не
се показва като опция, която потребителят може да избере в потребителския интерфейс или API.

---

## Покритие с тестове

Двигателят quota-share се предоставя с два слоя автоматизирано покритие:

| Набор                 | Команда                                                                | Какво покрива                                                                                                                                                                                                                                    |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Модулни (29 теста)    | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR планировчик, ограничаване при насищане, лимити за паралелност, изчисления на fairShare, поставяне на изчакващи заявки в опашка                                                                                                               |
| Интеграционна матрица | `npm run test:combo:matrix`                                            | Цялостно решение за маршрутизиране през реалния конвейер за комбинации; DRR справедливост + понижаване на приоритета при насищане чрез активни точки за интеграция (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Интеграционната матрица се изпълнява в CI заедно с всичките 19 публични стратегии. Модулният набор
може да се изпълнява самостоятелно.

---

## Обобщение на схемата на базата данни

Три таблици, добавени чрез миграции `078`, `079` и `085`:

- `quota_pools` + `quota_allocations` — дефиниции на пулове и разпределения за отделните ключове.
- `quota_consumption` — текущи броячи с 2 времеви сегмента за всяка двойка `(apiKeyId, dimensionKey)`.
- `provider_plans` — ръчно зададени замествания на плановете на доставчиците (измерения във формат JSON за всеки connectionId).

Всички таблици са добавени чрез идемпотентни миграции с `CREATE TABLE IF NOT EXISTS`.
