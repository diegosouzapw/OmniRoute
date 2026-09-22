# Quota Sharing Engine (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Посилання на документ**: `docs/routing/QUOTA_SHARE.md`
> Частина групи B (плани 16 + 22).

---

## Огляд

Рушій спільного використання квоти справедливо розподіляє часову квоту провайдера (наприклад, 5-годинне вікно Codex або 1500 запитів/год для Kimi) між кількома API-ключами, які використовують одне й те саме підключення.

**Проблема, яку він вирішує:** OmniRoute проксіює багато API-ключів через той самий обліковий запис зовнішнього провайдера. Без логіки спільного використання сплеск запитів від ключа A може вичерпати квоту провайдера на годину, через що ключі B і C залишатимуться заблокованими до скидання вікна.
Рушій запобігає цьому таким чином:

1. Відстежує ковзне споживання кожного ключа за кожним виміром (%, запити, токени, $).
2. Застосовує справедливий алгоритм розподілу зі збереженням завантаження: ключ може позичати невикористані частки, доки глобальний пул не насичений.
3. Застосовує результат на критичному шляху (`chatCore.ts`) до того, як запит потрапить до зовнішнього виконавця.

---

## Алгоритм: справедливий розподіл зі збереженням завантаження

Реалізовано в `src/lib/quota/fairShare.ts`.

### Режими

| Умова                                      | Режим       | Поведінка                                                                           |
| ------------------------------------------ | ----------- | ----------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Щедрий**  | Ключ може позичати в межах глобального ліміту за вирахуванням загального споживання |
| `globalUsedPercent >= saturationThreshold` | **Суворий** | Суворо застосовувати індивідуальну справедливу частку                               |

Стандартне значення `saturationThreshold = 0.5` (змінна середовища `QUOTA_SATURATION_THRESHOLD`).

### Рішення для кожного виміру

Для кожного активного виміру в пулі рушій обчислює:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = поточне ковзне значення для цього ключа (з QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Потім:

- **`policy = hard`**: якщо `consumed > fairShareAllowed` і режим суворий → **заблокувати**.
- **`policy = soft`**: якщо `consumed > fairShareAllowed` і режим суворий → **штрафувати** (знизити пріоритет у комбінації; ніколи не блокувати жорстко).
- **`policy = burst`**: дозволяти, доки існує глобальний вільний ресурс, незалежно від справедливої частки.

### Абсолютна межа

`capValue` + `capUnit` у розподілі задають жорстку верхню межу, незалежну від режиму чи політики. Будь-який вимір, для якого `consumed >= capValue`, завжди **блокує** запит.

### Перевірка за кількома вимірами

Запит блокується, якщо **будь-який** вимір у пулі призводить до блокування. Виміри незалежні — вичерпання 5h% не впливає на вимір weekly%.

### Позичання

У щедрому режимі ключ, виділену квоту якого використано не повністю, може скористатися надлишком із невикористаних часток інших ключів. Формула:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

де `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Глобальна верхня межа (`limit` пулу для цього виміру) завжди залишається жорстким обмеженням.

---

## Лічильник ковзного вікна

Реалізовано в `src/lib/quota/sqliteQuotaStore.ts` і `redisQuotaStore.ts`.

Два сегменти для кожної пари `(apiKeyId, dimensionKey)`:

- `curr`: поточний сегмент (`floor(nowMs / windowMs)`)
- `prev`: попередній сегмент (`curr - 1`)

Ефективне ковзне значення:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Точність**: приблизно 99%. Похибка становить щонайбільше 1% від розміру вікна на межі між сегментами (що притаманно наближенню з двома сегментами).

### Конкурентність

Драйвер SQLite: внутрішньопроцесне взаємне блокування для кожного ключа `(apiKeyId | dimensionKey)` запобігає стану гонитви під час читання-зміни-запису. Шаблон відповідає механізму захисту від лавиноподібних запитів у `src/sse/services/auth.ts`.

Драйвер Redis: Lua-скрипт EVAL для атомарного збільшення — виконується як одна команда Redis.

---

## Драйвери

### SQLite (за замовчуванням, не потребує встановлення)

- Таблиця: `quota_consumption` (див. міграції `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Найкраще підходить для розгортань з одним екземпляром.
- Усі дані зберігаються в наявній базі даних SQLite OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (необов’язково, для кількох екземплярів)

- Потребує npm-пакет `ioredis`.
- Лічильники зберігаються в Redis; метадані (пули/розподіли) залишаються в SQLite.
- Найкраще підходить для розгортань із кількома репліками, де лічильники мають бути спільними.

### Перемикання драйверів

Через інтерфейс налаштувань (`/dashboard/settings` → Сховище квот) або через змінні середовища:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Налаштування БД має вищий пріоритет, ніж змінна середовища. Якщо `driver=redis`, але URL відсутня або
`ioredis` не встановлено, фабрика повертається до SQLite і записує попередження в журнал.

Порядок вибору драйвера:

1. Налаштування БД `quotaStore.driver`
2. Змінна середовища `QUOTA_STORE_DRIVER`
3. За замовчуванням: `sqlite`

---

## Багатовимірність

Пул може мати кілька вимірів. Кожен вимір є незалежним:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // глобальна межа пулу для цього виміру
}
```

**Приклад: план Codex** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Щоб запит було дозволено, він має відповідати всім вимірам.

---

## Визначення плану

Реалізовано в `src/lib/quota/planResolver.ts`.

Пріоритетність (від найвищої до найнижчої):

1. **Ручне перевизначення в БД** — таблиця `provider_plans`, окремо для кожного `connectionId`.
2. **Відомий каталог** — `src/lib/quota/planRegistry.ts` (лише дані).
3. **Порожній план** — виміри відсутні, потрібне ручне налаштування.

### Відомий каталог

| Постачальник          | Виміри                                                        |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, невідомо), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Без значення за замовчуванням — потрібне ручне налаштування   |

---

## Інтеграція з конвеєром

### Хук PRE (`open-sse/handlers/chatCore.ts`)

Виконується перед висхідним виконавцем, після перевірок автентифікації та політик:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() для кожного виміру
      → fairShare.decideFairShare()
      → якщо блокування → повернути 429 (buildErrorBody, жорстке правило №12)
      → якщо дозволено + зниження пріоритету → встановити quotaSoftPenalty=true для кандидата
  → executor.execute()
```

**Пропуск у разі помилки**: якщо `enforceQuotaShare` викидає виняток, запит пропускається
із записом `pino.warn` у журналі. Це запобігає блокуванню всього трафіку через помилку
рушія квот.

### Хук POST (запис споживання)

Після успішної відповіді:

```
executor повертає успішний результат
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() для кожного виміру
      → пропуск у разі помилки: помилки записуються як pino.warn і ніколи не передаються клієнту
```

**Примітка щодо розбіжності**: якщо `consume` завершується помилкою після відповіді, ковзний лічильник
недораховує споживання. Сигнал насичення від постачальника (наприклад, `anthropic-ratelimit-unified-5h-utilization`)
коригує глобальну оцінку під час наступного запиту.

### М’який штраф комбінації (`open-sse/services/combo.ts`)

Коли `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // за замовчуванням 0.7
}
```

Штраф застосовується після всіх інших коефіцієнтів оцінювання. Він знижує ймовірність
вибору насиченого ключа автоматичною комбінацією, не блокуючи його повністю.

---

## Огляд інтерфейсу

### `/dashboard/costs/quota-share` — Головна сторінка пулів

Компоненти (усі в `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Компонент              | Призначення                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Вступна картка, що пояснює спільне використання квот новим користувачам                   |
| `CreatePoolModal`      | Створення нового пулу квот (підключення + назва + початкові розподіли)                    |
| `PoolCard`             | Зведення для кожного пулу: назва, підключення, кількість розподілів                       |
| `DimensionBar`         | Складена смуга для кожного виміру: частка кожного ключа + загальне використання           |
| `AllocationTable`      | Таблиця зі споживанням, справедливою часткою, дефіцитом/надлишком і прапорцем запозичення |
| `BurnRateChart`        | Лінійний графік швидкості споживання EMA (ліниве завантаження Recharts через `dynamic()`) |
| `EditAllocationsModal` | Редагування ваг розподілу, обмежень і політик пулу                                        |

Хуки сторінки:

- `usePools` — виконує `GET /api/quota/pools` кожні 30 с.
- `usePoolUsage` — виконує `GET /api/quota/pools/[id]/usage` за запитом.
- `useLocalStoragePoolMigration` — запускається один раз під час монтування для міграції застарілих даних LS.

### `/dashboard/costs/quota-share/plans` — Конфігурація тарифного плану постачальника

- `ProviderPlanConfigClient.tsx`: розкривний список для вибору постачальника, перегляду визначеного
  плану (автоматично з каталогу або з ручним перевизначенням) і редагування вимірів.
- Зміни записуються через `PUT /api/quota/plans/[connectionId]`.
- Видалення повертає план до каталожного або порожнього стану.

---

## Змінні середовища

| Змінна                             | Значення за замовчуванням | Опис                                                                        |
| ---------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`                  | Використовуваний драйвер: `sqlite` або `redis`                              |
| `QUOTA_STORE_REDIS_URL`            | _(порожньо)_              | URL-адреса Redis, наприклад `redis://localhost:6379`                        |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`                     | 0..1; `>= threshold` активує суворий режим                                  |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`                     | 0..1; множник комбінованої оцінки для м’якої політики                       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`                      | Кількість днів до видалення старих сегментів `quota_consumption` під час GC |

Налаштування БД (`quotaStore.*`) перевизначають змінні середовища.

---

## Усунення несправностей

### Redis налаштовано, але підключення не встановлюється

Перевірте, чи встановлено `ioredis` (`npm ls ioredis`) і чи доступна адреса
`QUOTA_STORE_REDIS_URL`. У разі помилки підключення фабрика повертається до SQLite
(це реєструється на рівні `warn`).

### `peek` повертає застарілі дані / працює у відкритому режимі в разі збою

Якщо `peek` спричиняє виняток, `enforceQuotaShare` трактує результат як «дозволити»
(відкритий режим у разі збою). Перевірте журнали `pino` на наявність записів
`quota:enforce` і `quota:factory`, щоб визначити першопричину.

### Розбіжність лічильника споживання

Якщо фактичне використання в постачальника відрізняється від показників лічильників,
це очікувано — ковзне вікно з 2 сегментів має похибку ~1% на межах вікна, а `consume`
виконується асинхронно після надсилання відповіді без очікування результату. Сигнал
насичення (`saturationSignals.ts`) зчитує фактичну утилізацію ресурсів постачальника
з TTL 30 с і відповідно коригує `globalUsedPercent`.

### Пул показує «немає даних» для швидкості споживання

`computeBurnRate` потребує щонайменше 2 історичних зразків. Нові пули без попередніх
викликів `consume` показуватимуть `tokensPerSecond: 0` і `timeToExhaustionMs: null`.

---

## Міграція з localStorage

Під час першого завантаження `/dashboard/costs/quota-share` хук `useLocalStoragePoolMigration`
перевіряє:

1. `localStorage.getItem("omniroute:quota-share:pools")` не є порожнім.
2. `GET /api/quota/pools` повертає `[]` (БД порожня).

Якщо обидві умови виконуються, він пакетно надсилає кожен застарілий пул до `POST /api/quota/pools`,
а потім видаляє ключ localStorage. Міграція є ідемпотентною: умова 2 запобігає
повторній міграції.

---

## Внутрішня класифікація стратегії

`quota-share` — це стратегія маршрутизації **лише для внутрішнього використання** (`INTERNAL_ROUTING_STRATEGY_VALUES` у
`src/shared/constants/routingStrategies.ts`). Вона використовується виключно створеними системою
комбінаціями пулів `qtSd/` і навмисно виключена з `ROUTING_STRATEGY_VALUES`, тому ніколи
не з'являється як доступний користувачеві варіант у UI або API.

---

## Покриття тестами

Рушій quota-share постачається з двома рівнями автоматизованого покриття:

| Набір                 | Команда                                                                | Що покриває                                                                                                                                                                                                                                           |
| :-------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Модульний (29 тестів) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Планувальник DRR, блокування за насиченням, обмеження паралельності, математичні розрахунки fairShare, постановка невиконаних завдань у чергу                                                                                                         |
| Інтеграційна матриця  | `npm run test:combo:matrix`                                            | Наскрізне рішення щодо маршрутизації через реальний конвеєр комбінацій; справедливість DRR + зниження пріоритету через насичення за допомогою активних точок інтеграції (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Інтеграційна матриця виконується в CI разом з усіма 19 публічними стратегіями. Модульний набір
можна запускати окремо.

---

## Огляд схеми БД

Три таблиці, додані міграціями `078`, `079` і `085`:

- `quota_pools` + `quota_allocations` — визначення пулів і розподіли для окремих ключів.
- `quota_consumption` — ковзні лічильники з 2 сегментів для кожної пари `(apiKeyId, dimensionKey)`.
- `provider_plans` — ручне перевизначення тарифних планів провайдера (виміри у форматі JSON для кожного connectionId).

Усі таблиці додано за допомогою ідемпотентних міграцій `CREATE TABLE IF NOT EXISTS`.
