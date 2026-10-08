# Quota Sharing Engine (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Ссылка на документ**: `docs/routing/QUOTA_SHARE.md`
> Часть группы B (планы 16 + 22).

---

## Обзор

Механизм совместного использования квот справедливо распределяет ограниченную по времени квоту провайдера (например, 5-часовое окно Codex или 1500 запросов/ч для Kimi) между несколькими API-ключами, использующими одно и то же подключение.

**Решаемая проблема:** OmniRoute проксирует множество API-ключей через одну и ту же учётную запись вышестоящего провайдера. Без логики совместного использования всплеск запросов от ключа A может исчерпать квоту провайдера на текущий час, из-за чего ключи B и C будут заблокированы до сброса окна. Механизм предотвращает это следующим образом:

1. Отслеживает потребление каждого ключа в скользящем окне по каждому измерению (%, запросы, токены, $).
2. Применяет алгоритм справедливого распределения с полным использованием ресурсов: ключ может заимствовать неиспользуемые доли, пока общий пул не насыщен.
3. Применяет результат на критическом пути (`chatCore.ts`) до того, как запрос поступит вышестоящему исполнителю.

---

## Алгоритм: справедливое распределение с полным использованием ресурсов

Реализован в `src/lib/quota/fairShare.ts`.

### Режимы

| Условие                                    | Режим       | Поведение                                                                         |
| ------------------------------------------ | ----------- | --------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Щедрый**  | Ключ может заимствовать вплоть до общего лимита за вычетом суммарного потребления |
| `globalUsedPercent >= saturationThreshold` | **Строгий** | Строго применяется индивидуальная справедливая доля                               |

Значение `saturationThreshold` по умолчанию — `0.5` (переменная окружения `QUOTA_SATURATION_THRESHOLD`).

### Решение по каждому измерению

Для каждого активного измерения в пуле механизм вычисляет:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = текущее скользящее значение для этого ключа (из QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Затем:

- **`policy = hard`**: если `consumed > fairShareAllowed` и режим строгий → **заблокировать**.
- **`policy = soft`**: если `consumed > fairShareAllowed` и режим строгий → **оштрафовать** (понизить приоритет в комбинации; никогда не блокировать жёстко).
- **`policy = burst`**: разрешать, пока имеется запас общего пула, независимо от справедливой доли.

### Абсолютный предел

`capValue` + `capUnit` в настройках распределения задают жёсткий потолок, не зависящий от режима или политики. Запрос всегда **блокируется** по любому измерению, для которого `consumed >= capValue`.

### Проверка нескольких измерений

Запрос блокируется, если **хотя бы одно** измерение в пуле требует блокировки. Измерения независимы — исчерпание 5h% не влияет на измерение weekly%.

### Заимствование

В щедром режиме ключ с потреблением ниже выделенной доли может использовать избыток неиспользованных долей других ключей. Формула:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

где `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Общий потолок (поле `limit` пула для этого измерения) всегда остаётся жёстким пределом.

---

## Счётчик скользящего окна

Реализован в `src/lib/quota/sqliteQuotaStore.ts` и `redisQuotaStore.ts`.

Два сегмента для каждой пары `(apiKeyId, dimensionKey)`:

- `curr`: текущий сегмент (`floor(nowMs / windowMs)`)
- `prev`: предыдущий сегмент (`curr - 1`)

Эффективное значение скользящего окна:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Точность**: приблизительно 99%. Погрешность составляет не более 1% размера окна на границе между сегментами (неотъемлемое свойство приближения с двумя сегментами).

### Конкурентный доступ

Драйвер SQLite: мьютекс в памяти для каждого ключа `(apiKeyId | dimensionKey)` предотвращает состояние гонки при чтении, изменении и записи. Шаблон аналогичен защите от лавинообразных запросов в `src/sse/services/auth.ts`.

Драйвер Redis: Lua-скрипт EVAL для атомарного увеличения значения — выполняется как одна команда Redis.

---

## Драйверы

### SQLite (по умолчанию, не требует установки)

- Таблица: `quota_consumption` (см. миграции `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Лучше всего подходит для развертываний с одним экземпляром.
- Все данные хранятся в существующей базе данных OmniRoute SQLite (`DATA_DIR/storage.sqlite`).

### Redis (необязательно, для нескольких экземпляров)

- Требуется npm-пакет `ioredis`.
- Счетчики хранятся в Redis; метаданные (пулы/распределения) по-прежнему хранятся в SQLite.
- Лучше всего подходит для развертываний с несколькими репликами, где счетчики должны быть общими.

### Переключение драйверов

Через интерфейс настроек (`/dashboard/settings` → Quota Store) или переменные окружения:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Настройка БД имеет приоритет над переменной окружения. Если указан `driver=redis`, но URL отсутствует или
`ioredis` не установлен, фабрика переключается на SQLite и записывает предупреждение в журнал.

Порядок выбора драйвера:

1. Настройка БД `quotaStore.driver`
2. Переменная окружения `QUOTA_STORE_DRIVER`
3. По умолчанию: `sqlite`

---

## Многомерность

Пул может иметь несколько измерений. Каждое измерение независимо:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // глобальный предел пула для этого измерения
}
```

**Пример: план Codex** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Чтобы запрос был разрешен, он должен удовлетворять всем измерениям.

---

## Определитель плана

Реализован в `src/lib/quota/planResolver.ts`.

Приоритет (от высшего к низшему):

1. **Ручное переопределение в БД** — таблица `provider_plans`, отдельно для каждого `connectionId`.
2. **Известный каталог** — `src/lib/quota/planRegistry.ts` (только данные).
3. **Пустой план** — измерения отсутствуют, требуется ручная настройка.

### Известный каталог

| Провайдер             | Измерения                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, неизвестен), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | По умолчанию отсутствует — требуется ручная настройка         |

---

## Интеграция с конвейером

### PRE-хук (`open-sse/handlers/chatCore.ts`)

Выполняется перед вышестоящим исполнителем, после проверок аутентификации и политик:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() для каждого измерения
      → fairShare.decideFairShare()
      → если заблокировано → вернуть 429 (buildErrorBody, жесткое правило №12)
      → если разрешено + снизить приоритет → установить quotaSoftPenalty=true для кандидата
  → executor.execute()
```

**Разрешение при сбое**: если `enforceQuotaShare` выбрасывает исключение, запрос пропускается,
а в журнал записывается `pino.warn`. Это предотвращает блокировку всего трафика
из-за ошибки механизма квот.

### POST-хук (учет потребления)

После успешного ответа:

```
исполнитель возвращает успешный результат
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() для каждого измерения
      → разрешение при сбое: ошибки записываются как pino.warn и никогда не передаются клиенту
```

**Примечание о расхождении**: если `consume` завершается с ошибкой после отправки ответа, скользящий счетчик занижает потребление.
Сигнал насыщения от провайдера (например, `anthropic-ratelimit-unified-5h-utilization`)
корректирует глобальную оценку при следующем запросе.

### Мягкий штраф для комбинации (`open-sse/services/combo.ts`)

Когда `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // по умолчанию 0.7
}
```

Штраф применяется после всех остальных коэффициентов оценки. Он снижает вероятность
выбора насыщенного ключа автоматической комбинацией, не блокируя его полностью.

---

## Обзор интерфейса

### `/dashboard/costs/quota-share` — Главная страница пулов

Компоненты (все находятся в `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Компонент              | Назначение                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Вводная карточка, объясняющая новым пользователям совместное использование квот         |
| `CreatePoolModal`      | Создание нового пула квот (подключение + имя + начальные распределения)                 |
| `PoolCard`             | Сводка по пулу: имя, подключение, количество распределений                              |
| `DimensionBar`         | Составная полоса по каждому измерению: доля каждого ключа + общее использование         |
| `AllocationTable`      | Таблица с потреблением, справедливой долей, дефицитом/избытком и флагом заимствования   |
| `BurnRateChart`        | Линейный график скорости расходования EMA (ленивая загрузка Recharts через `dynamic()`) |
| `EditAllocationsModal` | Редактирование весов распределения, лимитов и политик пула                              |

Хуки страницы:

- `usePools` — выполняет `GET /api/quota/pools` каждые 30 с.
- `usePoolUsage` — выполняет `GET /api/quota/pools/[id]/usage` по запросу.
- `useLocalStoragePoolMigration` — запускается один раз при монтировании для переноса устаревших данных из LS.

### `/dashboard/costs/quota-share/plans` — Настройка тарифного плана провайдера

- `ProviderPlanConfigClient.tsx`: раскрывающийся список для выбора провайдера, просмотра итогового
  плана (автоматически из каталога или с ручным переопределением) и редактирования измерений.
- Изменения записываются через `PUT /api/quota/plans/[connectionId]`.
- При удалении используется план из каталога или пустой план.

---

## Переменные окружения

| Переменная                         | По умолчанию | Описание                                                                          |
| ---------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`     | Используемый драйвер: `sqlite` или `redis`                                        |
| `QUOTA_STORE_REDIS_URL`            | _(пусто)_    | URL Redis, например `redis://localhost:6379`                                      |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`        | 0..1; `>= threshold` активирует строгий режим                                     |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`        | 0..1; множитель совокупной оценки для мягкой политики                             |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`         | Количество дней до удаления старых сегментов `quota_consumption` сборщиком мусора |

Настройки БД (`quotaStore.*`) переопределяют переменные окружения.

---

## Устранение неполадок

### Redis настроен, но подключение не устанавливается

Убедитесь, что `ioredis` установлен (`npm ls ioredis`) и `QUOTA_STORE_REDIS_URL`
доступен. При ошибке подключения фабрика переключается на SQLite (событие записывается
в журнал с уровнем `warn`).

### `peek` возвращает устаревшие данные / работает в режиме fail-open

Если `peek` выбрасывает исключение, `enforceQuotaShare` интерпретирует результат как «разрешить» (fail-open).
Проверьте журналы `pino` на наличие записей `quota:enforce` и `quota:factory`, чтобы определить
первопричину.

### Расхождение счётчика потребления

Если фактическое потребление у провайдера отличается от показаний счётчиков, это ожидаемо:
скользящее окно из 2 сегментов имеет погрешность около 1% на границах окна, а `consume`
выполняется после отправки ответа без ожидания результата. Сигнал насыщения (`saturationSignals.ts`)
считывает фактическую утилизацию провайдера с TTL 30 с и соответствующим образом корректирует `globalUsedPercent`.

### Для скорости расходования пула отображается «нет данных»

Для `computeBurnRate` требуется не менее 2 исторических образцов. Для новых пулов без предыдущих
вызовов `consume` будут отображаться `tokensPerSecond: 0` и `timeToExhaustionMs: null`.

---

## Миграция из localStorage

При первой загрузке `/dashboard/costs/quota-share` хук `useLocalStoragePoolMigration`
проверяет:

1. `localStorage.getItem("omniroute:quota-share:pools")` не является пустым.
2. `GET /api/quota/pools` возвращает `[]` (БД пуста).

Если оба условия выполняются, хук пакетно отправляет каждый устаревший пул в `POST /api/quota/pools`,
а затем удаляет ключ localStorage. Миграция идемпотентна: условие 2 предотвращает
повторную миграцию.

---

## Классификация внутренней стратегии

`quota-share` — это стратегия маршрутизации **только для внутреннего использования** (`INTERNAL_ROUTING_STRATEGY_VALUES` в
`src/shared/constants/routingStrategies.ts`). Она используется исключительно системными
комбинациями пулов `qtSd/` и намеренно исключена из `ROUTING_STRATEGY_VALUES`, поэтому никогда
не отображается в UI или API как доступный пользователю вариант.

---

## Покрытие тестами

Движок quota-share поставляется с двумя уровнями автоматизированного тестирования:

| Набор тестов           | Команда                                                                | Что проверяется                                                                                                                                                                                                                          |
| :--------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Модульные (29 тестов)  | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Планировщик DRR, блокировка при насыщении, ограничения параллелизма, вычисление fairShare, постановка невыполненных запросов в очередь                                                                                                   |
| Интеграционная матрица | `npm run test:combo:matrix`                                            | Сквозное решение о маршрутизации через реальный конвейер комбинаций; справедливость DRR и снижение приоритета при насыщении через рабочие точки интеграции (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Интеграционная матрица запускается в CI вместе со всеми 19 общедоступными стратегиями. Модульный набор
можно запускать отдельно.

---

## Краткое описание схемы БД

Три таблицы, добавленные миграциями `078`, `079` и `085`:

- `quota_pools` + `quota_allocations` — определения пулов и распределения по ключам.
- `quota_consumption` — скользящие счётчики с 2 сегментами для каждой пары `(apiKeyId, dimensionKey)`.
- `provider_plans` — задаваемые вручную переопределения тарифных планов провайдеров (измерения в формате JSON для каждого connectionId).

Все таблицы добавляются с помощью идемпотентных миграций `CREATE TABLE IF NOT EXISTS`.
